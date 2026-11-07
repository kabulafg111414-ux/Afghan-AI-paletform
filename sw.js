const CACHE_NAME='afghan-ai-v16';
const APP_SHELL=[
 './',
 './index.html',
 './styles.css',
 './app.js',
 './manifest.json',
 './icon.svg',
 './social-support-center.html',
 './assets/afghan-ai-social-hero.svg'
];

self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await cache.addAll(APP_SHELL);
  await self.skipWaiting();
 })());
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
 const isAppAsset=
  url.pathname.endsWith('/index.html')||
  url.pathname.endsWith('/styles.css')||
  url.pathname.endsWith('/app.js')||
  url.pathname.endsWith('/manifest.json')||
  url.pathname.endsWith('/sw.js')||
  url.pathname.endsWith('/icon.svg')||
  url.pathname.endsWith('/social-support-center.html')||
  url.pathname.endsWith('/assets/afghan-ai-social-hero.svg')||
  request.mode==='navigate';

 if(!isAppAsset)return;

 event.respondWith((async()=>{
  const cache=await caches.open(CACHE_NAME);
  const isSocialPage=url.pathname.endsWith('/social-support-center.html');
  const cacheKey=isSocialPage?'./social-support-center.html':(request.mode==='navigate'?'./index.html':request);
  try{
   const fresh=await fetch(request,{cache:'no-cache'});
   if(fresh.ok)await cache.put(cacheKey,fresh.clone());
   return fresh;
  }catch(error){
   const cached=await cache.match(request,{ignoreSearch:true})||
    (url.pathname.endsWith('/social-support-center.html')?await cache.match('./social-support-center.html'):null)||
    (url.pathname.endsWith('/assets/afghan-ai-social-hero.svg')?await cache.match('./assets/afghan-ai-social-hero.svg'):null)||
    await cache.match('./index.html');
   if(cached)return cached;
   throw error;
  }
 })());
});
