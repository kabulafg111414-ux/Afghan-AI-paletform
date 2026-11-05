const CACHE_NAME='afghan-ai-v4';
const APP_SHELL=['./','./index.html','./styles.css','./app.js','./manifest.json','./icon.svg'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)));
 self.skipWaiting();
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('afghan-ai-')&&key!==CACHE_NAME).map(key=>caches.delete(key)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const url=new URL(request.url);
 const isAppAsset=url.pathname.endsWith('/index.html')||url.pathname.endsWith('/styles.css')||url.pathname.endsWith('/app.js')||url.pathname.endsWith('/manifest.json')||url.pathname.endsWith('/sw.js')||url.pathname.endsWith('/icon.svg')||request.mode==='navigate';
 if(isAppAsset){
  event.respondWith((async()=>{
   const cache=await caches.open(CACHE_NAME);
   try{
    const fresh=await fetch(request,{cache:'no-cache'});
    if(fresh.ok){
     const key=request.mode==='navigate'?'./index.html':request;
     await cache.put(key,fresh.clone());
    }
    return fresh;
   }catch(error){
    const cached=await cache.match(request)||await cache.match('./index.html');
    if(cached)return cached;
    throw error;
   }
  })());
 }
});
