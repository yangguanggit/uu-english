const BUILD='1.0.0',SHELL=`bear-shell-${BUILD}`,THEMES=`bear-themes-${BUILD}`;
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  const request=event.request,u=new URL(request.url);
  if(request.method!=='GET'||u.origin!==self.location.origin||u.pathname.startsWith('/__'))return;
  const scope=new URL(self.registration.scope).pathname;
  const local=u.pathname.slice(scope.length);
  if(local==='offline-assets.json'&&u.searchParams.has('check')){event.respondWith(fetch(request));return;}
  if(local.startsWith('audio/')){
    // Explicit package repair must reach the server, even if the old cached body is corrupt.
    if(request.cache==='reload'){event.respondWith(fetch(request));return;}
    event.respondWith((async()=>{
      const cached=await(await caches.open(THEMES)).match(request,{ignoreSearch:true});
      if(!cached)return fetch(request);
      // Native media commonly requests byte ranges; synthesize correct 206 responses offline.
      const range=request.headers.get('range');if(!range)return cached;
      const data=await cached.arrayBuffer(),m=/^bytes=(\d*)-(\d*)$/.exec(range);
      if(!m)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${data.byteLength}`}});
      const start=m[1]?Number(m[1]):Math.max(0,data.byteLength-Number(m[2])),end=m[1]?(m[2]?Math.min(Number(m[2]),data.byteLength-1):data.byteLength-1):data.byteLength-1;
      if(start>end||start>=data.byteLength)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${data.byteLength}`}});
      return new Response(data.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('Content-Type')||(local.endsWith('.mp3')?'audio/mpeg':'audio/wav'),'Content-Length':String(end-start+1),'Content-Range':`bytes ${start}-${end}/${data.byteLength}`,'Accept-Ranges':'bytes'}});
    })());return;
  }
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).catch(async()=>{
      const cache=await caches.open(SHELL),cached=await cache.match(new URL('./',self.registration.scope).href);
      if(!cached)return Response.error();
      // Older downloaded shells may predate the server's frame restrictions.
      const headers=new Headers(cached.headers);
      headers.append('Content-Security-Policy',"frame-ancestors 'self'");
      if(!headers.has('X-Frame-Options'))headers.set('X-Frame-Options','SAMEORIGIN');
      headers.set('X-Content-Type-Options','nosniff');
      return new Response(cached.body,{status:cached.status,statusText:cached.statusText,headers});
    }));return;
  }
  if(/\.(js|css|json)$/.test(local))event.respondWith((async()=>{
    // Online uses current source; offline shell is scoped to this exact app version.
    try{return await fetch(request);}catch{return await(await caches.open(SHELL)).match(request,{ignoreSearch:true})||Response.error();}
  })());
});
