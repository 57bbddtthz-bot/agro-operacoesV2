const CACHE='agro-operacoes-v6-loginfix';
const ASSETS=['./','./index.html','./style.css','./app.js','./modulos.js','./menu.js','./manifest.json'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(ASSETS.map(async path=>{
    try{await cache.add(path)}catch(error){console.warn('Não foi possível armazenar',path,error)}
  }));
  await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key.startsWith('agro-operacoes-')&&key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    if(cached)return cached;
    try{return await fetch(event.request)}
    catch(error){if(event.request.mode==='navigate')return caches.match('./index.html');throw error}
  })());
});
