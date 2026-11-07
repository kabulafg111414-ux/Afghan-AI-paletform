const CORS_HEADERS = {
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin"
};
const CATEGORIES = new Set(["food","education","health","disability","emergency","referral"]);
const DISTRICTS = new Set(["Kabul","Other","Prefer not to say"]);
const json = (data, status=200, headers={}) => new Response(JSON.stringify(data), {
  status, headers: { "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store", ...headers }
});
function cors(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!env.ALLOWED_ORIGIN || origin !== env.ALLOWED_ORIGIN) return null;
  return { ...CORS_HEADERS, "Access-Control-Allow-Origin": origin };
}
function b64(bytes) {
  let s=""; for (const b of new Uint8Array(bytes)) s+=String.fromCharCode(b);
  return btoa(s);
}
function unb64(s) {
  const raw=atob(s); return Uint8Array.from(raw,c=>c.charCodeAt(0));
}
async function sha256(text) {
  return b64(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text)));
}
async function encryptPayload(payload, env) {
  if (!env.CONTACT_ENCRYPTION_KEY) throw new Error("Encryption is not configured");
  const keyBytes=unb64(env.CONTACT_ENCRYPTION_KEY);
  if (keyBytes.length!==32) throw new Error("Encryption key must be 32 bytes");
  const key=await crypto.subtle.importKey("raw",keyBytes,{name:"AES-GCM"},false,["encrypt"]);
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const ciphertext=await crypto.subtle.encrypt({name:"AES-GCM",iv},key,new TextEncoder().encode(JSON.stringify(payload)));
  return {iv:b64(iv),ciphertext:b64(ciphertext)};
}
async function verifyTurnstile(token, request, env) {
  if (!env.TURNSTILE_SECRET || !token) return false;
  const form=new FormData();
  form.append("secret",env.TURNSTILE_SECRET);
  form.append("response",token);
  const ip=request.headers.get("CF-Connecting-IP");
  if (ip) form.append("remoteip",ip);
  const response=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",body:form});
  if (!response.ok) return false;
  const result=await response.json();
  return result.success===true && (!result.hostname || result.hostname===new URL(env.ALLOWED_ORIGIN).hostname);
}
function cleanText(value,max) {
  return typeof value==="string" ? value.trim().replace(/[<>]/g,"").slice(0,max) : "";
}
async function rateLimit(request, env) {
  // Fail closed: do not accept public requests if the abuse-control KV binding is missing.
  if (!env.RATE_LIMIT) throw new Error("Rate limiting is not configured");
  const ip=request.headers.get("CF-Connecting-IP") || "unknown";
  const key="support:"+await sha256(ip);
  const existing=await env.RATE_LIMIT.get(key);
  if (existing) return true;
  await env.RATE_LIMIT.put(key,"1",{expirationTtl:300});
  return false;
}
async function createRequest(request, env, headers) {
  if (await rateLimit(request,env)) return json({error:"لطفاً پنج دقیقه بعد دوباره تلاش کنید."},429,headers);
  let body;
  try {
    const raw=await request.text();
    if (new TextEncoder().encode(raw).byteLength > 8192) return json({error:"حجم درخواست بیش از حد مجاز است."},413,headers);
    body=JSON.parse(raw);
  } catch { return json({error:"درخواست نامعتبر است."},400,headers); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({error:"درخواست نامعتبر است."},400,headers);
  const category=cleanText(body.category,24);
  const district=cleanText(body.district,32);
  const summary=cleanText(body.summary,1200);
  const contact=cleanText(body.contact,32);
  const consent=body.consent===true;
  if (!CATEGORIES.has(category) || !DISTRICTS.has(district) || summary.length<20 || !consent) {
    return json({error:"لطفاً نوع حمایت، ساحه، شرح کوتاه و رضایت‌نامه را درست تکمیل کنید."},400,headers);
  }
  if (contact && !/^[+0-9() -]{8,24}$/.test(contact)) return json({error:"شماره تماس معتبر نیست."},400,headers);
  if (!(await verifyTurnstile(cleanText(body.turnstileToken,2048),request,env))) {
    return json({error:"تأیید ضدسوءاستفاده ناموفق بود. صفحه را تازه کنید و دوباره تلاش نمایید."},403,headers);
  }
  const ticket="AFS-"+crypto.randomUUID().slice(0,8).toUpperCase();
  const statusToken=b64(crypto.getRandomValues(new Uint8Array(32))).replace(/[+/=]/g,"");
  const tokenHash=await sha256(statusToken);
  const encrypted=await encryptPayload({category,district,summary,contact:contact||null},env);
  await env.DB.prepare(
    "INSERT INTO support_requests (ticket_id, status_token_hash, payload_ciphertext, payload_iv, status, created_at) VALUES (?, ?, ?, ?, 'received', ?)"
  ).bind(ticket,tokenHash,encrypted.ciphertext,encrypted.iv,new Date().toISOString()).run();
  return json({ok:true,ticket,statusToken,message:"درخواست شما ثبت شد. رمز پیگیری را در جای امن نگهدارید؛ فقط یک بار نمایش داده می‌شود."},201,headers);
}
async function checkStatus(request, env, headers) {
  const url=new URL(request.url);
  const ticket=cleanText(url.searchParams.get("ticket"),32);
  const token=cleanText(url.searchParams.get("token"),256);
  if (!ticket || !token) return json({error:"شماره و رمز پیگیری لازم است."},400,headers);
  const tokenHash=await sha256(token);
  const row=await env.DB.prepare("SELECT status, created_at FROM support_requests WHERE ticket_id=? AND status_token_hash=?").bind(ticket,tokenHash).first();
  if (!row) return json({error:"درخواست پیدا نشد؛ معلومات پیگیری را بررسی کنید."},404,headers);
  return json({ticket,status:row.status,createdAt:row.created_at},200,headers);
}
export default {
  async fetch(request,env) {
    const headers=cors(request,env);
    if (!headers) return json({error:"Origin is not allowed."},403);
    if (request.method==="OPTIONS") return new Response(null,{status:204,headers});
    const path=new URL(request.url).pathname;
    try {
      if (path==="/api/support/requests" && request.method==="POST") return await createRequest(request,env,headers);
      if (path==="/api/support/status" && request.method==="GET") return await checkStatus(request,env,headers);
      return json({error:"Not found"},404,headers);
    } catch (error) {
      // Never log submitted content or secrets.
      console.error("Support API error: request processing failed");
      return json({error:"سیستم موقتاً در دسترس نیست. لطفاً بعداً تلاش کنید."},503,headers);
    }
  }
};