const CACHE = 'agro-operacoes-v10-climate-clicks-20261030';
const CORE = ['./','./index.html','./style.css','./app.js','./modulos.js','./menu.js','./manifest.json'];
self.addEventListener('install', event => event.waitUntil((async()=>{
  const cache = await caches.open(CACHE);
  await Promise.all(CORE.map(async path => { try { const r=await fetch(path,{cache:'reload'}); if(r.ok) await cache.put(path,r); } catch(e) {} }));
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith('agro-operacoes-')&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    try {
      const response=await fetch(event.request,{cache:'no-store'});
      if(response && response.ok && (url.pathname.endsWith('.js')||url.pathname.endsWith('.css')||url.pathname.endsWith('.html')||url.pathname.endsWith('/'))) await cache.put(event.request,response.clone());
      return response;
    } catch(error) {
      const cached=await cache.match(event.request) || await cache.match(url.pathname);
      if(cached) return cached;
      if(event.request.mode==='navigate') return (await cache.match('./index.html')) || Response.error();
      return Response.error();
    }
  })());
});
