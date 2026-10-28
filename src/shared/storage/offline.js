/* Explicit theme downloads, all-or-nothing completion and verified browser cache. */
(() => {
  const BUILD='1.0.1',CACHE=`bear-themes-${BUILD}`,SHELL=`bear-shell-${BUILD}`,origin=location.origin;
  const MEDIA='bear-media-sha256-v1';
  let catalogPromise,registration;
  const ready=(async()=>{
    if(!('serviceWorker' in navigator)||!isSecureContext)throw Error('离线包需要 HTTPS 或 localhost，请使用支持离线存储的浏览器');
    registration=await navigator.serviceWorker.register('sw.js',{scope:'./'});
    await navigator.serviceWorker.ready;
    if(!navigator.serviceWorker.controller)await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('离线服务尚未就绪，请刷新后重试')),12000);navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(timer);resolve();},{once:true});});
    return registration;
  })();ready.catch(()=>{});
  const catalog=()=>catalogPromise||(catalogPromise=fetch('offline-assets.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('离线目录加载失败');return r.json();}).catch(error=>{catalogPromise=null;throw error;}));
  const url=file=>new URL(file,location.href).href;
  async function bundle(themeId){
    const t=BEAR_LEARNING_THEMES.find(t=>t.id===themeId);if(!t)throw Error('未知主题');
    const data=await catalog(),related=BEAR_BOOKS.filter(b=>b.id===t.book||b.topic===t.id),p=BearLearning.plan();
    const texts=new Set([...BearCurriculum.words(t.id).map(w=>w.text),...related.flatMap(b=>[...b.pages.flatMap(p=>p[3]),...b.choices])]);
    const words=BEAR_FOUNDATIONS.words.filter(w=>texts.has(w.text)||(p.theme===t.id&&p.review.includes(w.id)));
    // A theme includes its entire five-game scene category and both paths of each game.
    const sceneIds=BEAR_CATEGORIES.find(category=>category.games.includes(t.scene))?.games||[t.scene];
    const files=new Set(sceneIds.flatMap(id=>BearLesson.filesForScene(id)));
    words.forEach(w=>{files.add(w.audio+'.wav');files.add(w.zhAudio+'.wav');const map=BEAR_PHONICS_DATA.find(x=>x.id===w.id);map.parts.forEach(part=>BearPhonics.soundFiles(part.sound).forEach(file=>files.add(file)));});
    related.forEach(b=>b.pages.forEach((p,i)=>files.add(p[4]||`story-${b.id}-${i}.wav`)));
    // Optional legacy slow variants are listed only when a physical asset exists.
    const originals=[...files].filter(f=>{
      if(f.endsWith('-slow.wav')&&!BearVoices.has(f,'adult'))return false;
      return data.audio[BearVoices.resolve(f,'adult').file]!==undefined;
    });
    for(const file of files)if(!file.endsWith('-slow.wav')&&data.audio[BearVoices.resolve(file,'adult').file]===undefined)throw Error('此主题有素材未就绪，请稍后重试');
    // Package every installed voice so a parent can switch while offline.
    const media=[...new Set(originals.flatMap(file=>BearVoices.list().filter(p=>p.ready).map(p=>BearVoices.resolve(file,p.id).file)))];
    if(media.some(file=>data.audio[file]===undefined))throw Error('所选音色资源目录未更新，请刷新后重试');
    return {theme:t,files:media.map(f=>'audio/'+f),bytes:media.reduce((n,f)=>n+data.audio[f],0)};
  }
  const marker=id=>url(`__offline_theme__/${id}`);
  const pendingMarker=id=>url(`__offline_pending__/${id}`);
  async function packageRows(cache){
    const rows=[];
    for(const key of await cache.keys())if(key.url.includes('/__offline_theme__/')||key.url.includes('/__offline_pending__/')){
      const response=await cache.match(key);if(response)rows.push({...await response.json(),incomplete:key.url.includes('/__offline_pending__/')});
    }
    return rows;
  }
  async function status(){
    await ready;const rows=new Map(),names=(await caches.keys()).filter(k=>k.startsWith('bear-themes-')).sort();
    for(const name of names){
      const local=new Map();
      for(const row of await packageRows(await caches.open(name)))if(!local.has(row.id)||!row.incomplete)local.set(row.id,row);
      for(const row of local.values())if(!rows.has(row.id)||name===CACHE)rows.set(row.id,{...row,needsUpdate:name!==CACHE||row.incomplete});
    }
    return [...rows.values()];
  }
  const blobKey=hash=>url('__media_blob__/'+hash);
  async function correct(response,hash){return !!response&&hash&&[...new Uint8Array(await crypto.subtle.digest('SHA-256',await response.clone().arrayBuffer()))].map(b=>b.toString(16).padStart(2,'0')).join('')===hash;}

  let busy=false;
  async function mutate(write){
    if(busy)throw Error('请等待当前离线包操作完成');
    // Cache Storage is shared by every page and child on this origin.
    // Refuse unsafe mutations when a browser cannot provide an origin-wide lock.
    if(!navigator.locks?.request)throw Error('浏览器不支持安全管理离线包，请更新浏览器后重试');
    busy=true;
    try{await ready;return await navigator.locks.request('bear-offline-storage',write);}
    finally{busy=false;}
  }
  async function verifyFiles(row,data,cache){
    for(const file of row.files)if(row.hashes?.[file]!==data.hashes[file.slice(6)]||!await correct(await cache.match(url(file)),row.hashes[file]))return false;
    const shell=await caches.open(SHELL);
    for(const file of data.shell){const response=await shell.match(url(file));if(!response||(file!=='offline-assets.json'&&!await correct(response,data.shellHashes?.[file])))return false;}
    return true;
  }
  async function download(id,onProgress=()=>{}){
    return mutate(async()=>{const data=await catalog(),pack=await bundle(id),cache=await caches.open(CACHE),shell=await caches.open(SHELL),shared=await caches.open(MEDIA),oldNames=(await caches.keys()).filter(n=>n.startsWith('bear-themes-')&&n!==CACHE);
      const row={id,title:pack.theme.title,count:pack.files.length,bytes:pack.bytes,files:pack.files,hashes:Object.fromEntries(pack.files.map(f=>[f,data.hashes[f.slice(6)]])),build:BUILD,revision:data.revision};
      // Persist the recovery manifest before writing any media. Failed or interrupted
      // attempts remain manageable, while the last completed marker is preserved.
      const previous=await cache.match(pendingMarker(id)),pending=previous?await previous.json():null;
      const recovery={...row,files:[...new Set([...(pending?.files||[]),...row.files])],hashes:{...pending?.hashes,...row.hashes}};
      await cache.put(pendingMarker(id),new Response(JSON.stringify(recovery),{headers:{'Content-Type':'application/json'}}));
      const needed=pack.files.length+data.shell.length;let completed=0;
      // Only a fully downloaded shell + complete media set receives a readiness marker.
      for(const file of data.shell){const response=await fetch(file,{cache:'reload'});if(!response.ok)throw Error('页面下载失败，请重试');if(data.shellHashes?.[file]&&!await correct(response,data.shellHashes[file]))throw Error('页面版本已变化，请刷新后重新下载主题');await shell.put(url(file),response);onProgress(++completed,needed);}
      for(const file of pack.files){
        const hash=data.hashes[file.slice(6)];if(!hash)throw Error('音频目录缺少校验信息，请刷新重试');
        let response=await shared.match(blobKey(hash));
        if(!await correct(response,hash))response=await cache.match(url(file));
        if(!await correct(response,hash))for(const name of oldNames){const candidate=await(await caches.open(name)).match(url(file));if(await correct(candidate,hash)){response=candidate;break;}}
        if(!await correct(response,hash)){response=await fetch(file,{cache:'reload'});if(!response.ok||!await correct(response,hash))throw Error('音频校验未通过，请重试');}
        await shared.put(blobKey(hash),response.clone());await cache.put(url(file),response);onProgress(++completed,needed);
      }
      if(!await verifyFiles(row,data,cache))throw Error('离线包未完整保存，请检查浏览器空间后重试');
      await cache.put(marker(id),new Response(JSON.stringify(row),{headers:{'Content-Type':'application/json'}}));
      await cache.delete(pendingMarker(id));
      await pruneMedia();
      return row;
    });
  }
  async function pruneMedia(removingId=null){
    const retainedHashes=new Set();
    for(const name of (await caches.keys()).filter(k=>k.startsWith('bear-themes-'))){
      const cache=await caches.open(name),rows=(await packageRows(cache)).filter(row=>row.id!==removingId),retained=new Set(rows.flatMap(r=>r.files).map(url));
      rows.forEach(r=>Object.values(r.hashes||{}).forEach(h=>retainedHashes.add(h)));
      // Include legacy untracked leftovers, but never another package's media.
      for(const key of await cache.keys())if(key.url.startsWith(url('audio/'))&&!retained.has(key.url))await cache.delete(key);
    }
    const shared=await caches.open(MEDIA);for(const key of await shared.keys())if(!retainedHashes.has(key.url.split('/').at(-1)))await shared.delete(key);
  }
  async function remove(id){
    return mutate(async()=>{
      // Retain recovery metadata until cleanup succeeds, including deletion failures.
      await pruneMedia(id);
      for(const name of (await caches.keys()).filter(k=>k.startsWith('bear-themes-'))){
        const cache=await caches.open(name);await cache.delete(marker(id));await cache.delete(pendingMarker(id));
      }
    });
  }
  // A failed verification must retain package metadata so its cached files can be removed.
  window.BearOffline={ready,bundle,status,download,remove,cleanup(){return mutate(()=>pruneMedia());},async dailyReady(){const p=BearLearning.plan();if(!await this.verify(p.theme))return false;const cache=await caches.open(CACHE);for(const id of p.review){const w=BEAR_FOUNDATIONS.words.find(w=>w.id===id);for(const file of [w.audio,w.zhAudio])if(!await cache.match(url('audio/'+BearVoices.resolve(file+'.wav').file)))return false;}return true;},async verify(id){await ready;const cache=await caches.open(CACHE),response=await cache.match(marker(id));if(!response)return false;const row=await response.json(),data=await catalog(),pack=await bundle(id);if(row.build!==BUILD||row.revision!==data.revision||pack.files.some(f=>!row.files.includes(f)))return false;return verifyFiles(row,data,cache);}};
})();
