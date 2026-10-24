/* Each child owns all three persisted stores; microphone/audio stay in page memory. */
(() => {
  const INDEX='bear-profiles-v1', stores=['bear-learning-v1','bear-foundation-v1','little-bear-breakfast-v1'];
  const read=k=>{try{return localStorage.getItem(k);}catch{return null;}};
  let index;
  try{index=JSON.parse(read(INDEX));}catch{}
  if(!index||index.version!==1||!Array.isArray(index.children)||!index.children.some(c=>c.id===index.active)){
    index={version:1,active:'first',children:[{id:'first',name:'小探险家'}]};
    // Write the index last; interrupted migration can safely retry without deleting originals.
    try{for(const key of stores){const old=read(key);if(old&&!read(`bear-child:first:${key}`))localStorage.setItem(`bear-child:first:${key}`,old);}localStorage.setItem(INDEX,JSON.stringify(index));}catch{}
  }
  const pageChildId=index.active;
  let writes=0,reloadPending=false;
  window.addEventListener('storage',e=>{if(e.key===INDEX){
    try{const next=JSON.parse(read(INDEX));for(const child of index.children)if(!next.children.some(c=>c.id===child.id))clearSession(child.id);}catch{}
    // Do not interrupt an in-flight mutation or replace its target with another tab's active child.
    if(writes)reloadPending=true;else location.reload();
  }});
  const storageKey=(key,id=index.active)=>`bear-child:${id}:${key}`;
  const persist=next=>{localStorage.setItem(INDEX,JSON.stringify(next));index=next;};
  // Serialize the complete read/modify/write across tabs. IndexedDB transactions
  // provide the same exclusion on HTTP browsers without the Web Locks API.
  let lockDatabase;
  function acquireIndexLock(write){
    const run=()=>{const live=JSON.parse(localStorage.getItem(INDEX));if(!live?.children?.length||!live.children.some(c=>c.id===live.active))throw Error('档案列表不可用，请刷新后重试');index=live;return write();};
    if(globalThis.navigator?.locks?.request)return navigator.locks.request(INDEX,run);
    if(!globalThis.indexedDB)return Promise.reject(Error('浏览器不支持安全保存档案，请更换浏览器后重试'));
    lockDatabase||=new Promise((resolve,reject)=>{const request=indexedDB.open('bear-profile-locks',1);request.onupgradeneeded=()=>request.result.createObjectStore('locks');request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();lockDatabase=null;};resolve(db);};request.onerror=()=>{lockDatabase=null;reject(Error('无法锁定档案存储，请检查浏览器存储权限'));};});
    return lockDatabase.then(db=>new Promise((resolve,reject)=>{
      const transaction=db.transaction('locks','readwrite');let result,error;
      transaction.objectStore('locks').get(INDEX).onsuccess=()=>{try{result=run();}catch(e){error=e;transaction.abort();}};
      transaction.oncomplete=()=>resolve(result);
      transaction.onabort=transaction.onerror=()=>reject(error||Error('保存档案失败，请重试'));
    }));
  }
  function withIndexLock(write){
    writes++;
    return Promise.resolve().then(()=>acquireIndexLock(write)).finally(()=>{writes--;if(!writes&&reloadPending){reloadPending=false;setTimeout(()=>{if(writes)reloadPending=true;else location.reload();},0);}});
  }
  const name=value=>{const n=String(value||'').trim();if(!n||n.length>20)throw Error('请填写 1–20 字的孩子昵称');return n;};
  const id=()=>globalThis.crypto?.randomUUID?.()||`child-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  function clearSession(childId){const prefix=`bear-child:${childId}:`;for(const key of Object.keys(sessionStorage))if(key.startsWith(prefix))sessionStorage.removeItem(key);}
  function clearChild(childId){
    const prefix=`bear-child:${childId}:`;
    for(const key of Object.keys(localStorage))if(key.startsWith(prefix))localStorage.removeItem(key);
    // The first profile may have been migrated from the original, unscoped stores.
    if(childId==='first')for(const key of stores)for(const stored of Object.keys(localStorage))if(stored===key||stored.startsWith(key+':'))localStorage.removeItem(stored);
    clearSession(childId);
  }
  function restorePlan(rows){
    let retained=index.children,removed=[];
    if(retained.length+rows.length>20&&retained.length===1&&retained[0].name==='小探险家'){
      const child=retained[0],s=window.BearLearning.snapshot(child.id),defaults={mode:'explorer',chinese:true,speed:'medium',speedChosen:false,voice:'child',voiceChosen:false,planMinutes:10,readerMode:'follow'};
      const empty=['items','foundation','reading','activity'].every(key=>Object.keys(s[key]||{}).length===0)&&['awards','placed','parentDone','favorites','recent'].every(key=>!(s[key]||[]).length)&&Object.values(s.days||{}).every(day=>!day.done.length)&&Object.entries(s.settings).every(([key,value])=>defaults[key]===value)&&JSON.parse(read(storageKey(stores[2],child.id))||'[]').length===0;
      if(empty&&!s.growth?.reviews?.length&&!Object.keys(s.growth?.lab?.sentences||{}).length&&!Object.keys(s.growth?.lab?.roles||{}).length&&!s.growth?.assessment&&!s.growth?.draft&&!s.growth?.issues?.length&&!Object.keys(s.growth?.sessions||{}).length&&!Object.keys(s.growth?.games||{}).length&&!Object.keys(s.growth?.gameDrafts||{}).length&&!Object.keys(s.growth?.practice?.recent||{}).length&&!Object.keys(s.growth?.practice?.transfers||{}).length){retained=[];removed=[child];}
    }
    if(retained.length+rows.length>20)throw Error('恢复后超过 20 个档案，请先备份并删除不需要的档案后重试');
    return {retained,removed};
  }
  const fail=()=>{throw Error('备份格式不正确，原记录未修改');};
  const object=x=>x&&typeof x==='object'&&!Array.isArray(x);
  function validateFoundation(value){
    const units=new Set([...BEAR_FOUNDATIONS.words,...BEAR_FOUNDATIONS.letters,...BEAR_FOUNDATIONS.phonemes].map(x=>x.id));
    if(!object(value)||Object.entries(value).some(([key,x])=>!units.has(key)||!object(x)||!['recorded','practiced'].includes(x.mode)||typeof x.time!=='string'||!Number.isFinite(Date.parse(x.time))))fail();
    return value;
  }
  // Older completed-page Help buttons wrote a nonexistent fourth round.
  // Repair only that known shape; malformed scenes, paths and other rounds still fail validation.
  function obsoleteDialogue(id){
    const m=typeof id==='string'&&/^dialogue:([^:]+):(?:(0|[1-9]\d*):)?3$/.exec(id);
    return !!(m&&Object.hasOwn(window.LITTLE_BEAR_SCENES||{},m[1])&&(m[2]===undefined||window.BEAR_SCENE_BRANCHES?.[m[1]]?.paths[Number(m[2])]));
  }
  function repairLearning(s){
    if(object(s?.items))for(const id of Object.keys(s.items))if(obsoleteDialogue(id))delete s.items[id];
    if(object(s?.activity))for(const day of Object.values(s.activity))if(object(day))for(const key of ['ids','helpIds'])if(Array.isArray(day[key]))day[key]=day[key].filter(id=>!obsoleteDialogue(id));
    // Historical aggregate counts cannot be reconstructed reliably; leave them intact.
    return s;
  }
  function validateLearning(s){
    if(!object(s)||s.version!==1||!object(s.items)||!object(s.days)||!object(s.settings))fail();
    repairLearning(s);
    const units=new Set([...BEAR_FOUNDATIONS.words,...BEAR_FOUNDATIONS.letters,...BEAR_FOUNDATIONS.phonemes].map(x=>x.id));
    const phonicsUnits=new Set(BEAR_FOUNDATIONS.words.map(w=>'phonics:'+w.id));
    const knownUnit=k=>!!window.BearGrowth?.parseDialogueKey(k)||(/^question:book:/.test(k)&&BEAR_BOOKS.some(b=>b.id===k.slice(14)))||units.has(k)||(/^scene:/.test(k)&&Object.hasOwn(LITTLE_BEAR_SCENES,k.slice(6)))||phonicsUnits.has(k)||/^phonics:(cat|hat|sun)$/.test(k)||(/^book:/.test(k)&&BEAR_BOOKS.some(b=>b.id===k.slice(5)));
    for(const [k,v] of Object.entries(s.items)){if(!knownUnit(k)||!object(v)||Object.values(v).some(n=>!Number.isFinite(n)||n<0))fail();}
    for(const [date,p] of Object.entries(s.days)){
      if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!object(p)||!Object.hasOwn(LITTLE_BEAR_SCENES,p.scene))fail();
      for(const key of ['review','learn'])if(!Array.isArray(p[key])||p[key].length<1||p[key].length>5||p[key].some(k=>!BEAR_FOUNDATIONS.words.some(w=>w.id===k)))fail();
      if(!Array.isArray(p.done)||new Set(p.done).size!==p.done.length||p.done.some(k=>!['review','learn','game','book','exchange'].includes(k)))fail();
      if(p.minutes!==undefined&&![5,10,15].includes(p.minutes))fail();
      if(p.required&&(!Array.isArray(p.required)||p.required.some(k=>!['review','learn','game','book','exchange'].includes(k))||!p.required.length||new Set(p.required).size!==p.required.length))fail();
      if(p.book&&!BEAR_BOOKS.some(b=>b.id===p.book))fail();
      if(p.theme&&!BEAR_LEARNING_THEMES.some(t=>t.id===p.theme))fail();
      if(p.revision!==undefined&&(typeof p.revision!=='string'||p.revision.length<1||p.revision.length>100))fail();
    }
    if(!['little','explorer'].includes(s.settings.mode)||typeof s.settings.chinese!=='boolean'||(s.settings.speed&&!['extraSlow','slow','medium','normal'].includes(s.settings.speed)))fail();
    if(s.settings.voice!==undefined&&(typeof s.settings.voice!=='string'||!/^[a-z][a-z0-9-]{0,39}$/.test(s.settings.voice)))fail();
    if(s.settings.voiceChosen!==undefined&&typeof s.settings.voiceChosen!=='boolean')fail();
    if(s.settings.planMinutes!==undefined&&![5,10,15].includes(s.settings.planMinutes))fail();
    if(s.settings.readerMode!==undefined&&!['listen','follow','independent'].includes(s.settings.readerMode))fail();
    if(s.settings.phonicsStage!==undefined&&!BEAR_PHONICS_COURSE.some(c=>c.id===s.settings.phonicsStage))fail();
    if(s.favorites!==undefined&&(!Array.isArray(s.favorites)||s.favorites.some(k=>typeof k!=='string'||!BearLearningTools.validKey(k))))fail();
    if(s.recent!==undefined&&(!Array.isArray(s.recent)||s.recent.length>30||s.recent.some(r=>!object(r)||!BearLearningTools.validKey(r.key)||!Number.isFinite(r.time)||r.time<0)))fail();
    if(s.activity!==undefined){if(!object(s.activity))fail();for(const [date,day] of Object.entries(s.activity))if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!object(day)||!object(day.counts)||Object.entries(day.counts).some(([k,v])=>!['heard','selected','practiced','recorded','recognized','independent','wrong','hinted'].includes(k)||!Number.isFinite(v)||v<0)||!Array.isArray(day.ids)||day.ids.some(k=>typeof k!=='string'||!knownUnit(k))||(day.helpIds!==undefined&&(!Array.isArray(day.helpIds)||day.helpIds.some(k=>typeof k!=='string'||!knownUnit(k)))))fail();}
    for(const key of ['awards','placed','parentDone'])if(!Array.isArray(s[key])||s[key].some(x=>typeof x!=='string'||x.length>100))fail();
    if(s.reading){if(!object(s.reading))fail();for(const [key,v] of Object.entries(s.reading)){const b=BEAR_BOOKS.find(b=>b.id===key);if(!b||!object(v))fail();if(v.read!==undefined&&(!Array.isArray(v.read)||v.read.some(i=>!Number.isInteger(i)||i<0||i>=b?.pages.length)))fail();if(!b||!object(v)||!Number.isInteger(v.page)||v.page<0||v.page>=b.pages.length||!Array.isArray(v.heard)||v.heard.some(i=>!Number.isInteger(i)||i<0||i>=b.pages.length)||typeof v.answer!=='boolean')fail();}}
    if(s.foundation!==undefined)validateFoundation(s.foundation);
    if(!BearGrowth.validate(s.growth))fail();
    if(s.settings.readingLevel!==undefined&&!BEAR_READING_LEVELS.some(l=>l.id===s.settings.readingLevel))fail();
    if(s.settings.restMinutes!==undefined&&![0,5,10,15,20].includes(s.settings.restMinutes))fail();
    if(s.settings.onboardingSkipped!==undefined&&typeof s.settings.onboardingSkipped!=='boolean')fail();
    if(s.reading&&Object.values(s.reading).some(v=>v.interactions!==undefined&&(!object(v.interactions)||Object.entries(v.interactions).some(([k,x])=>!['spot','spotSkipped','order','orderHelped','retell','understood','understoodHelped','discussed'].includes(k)||typeof x!=='boolean'))))fail();
    // Return only the supported schema; ignore imported executable-looking or unknown fields.
    return Object.fromEntries(['version','foundation','items','days','settings','awards','placed','parentDone','reading','activity','favorites','recent','growth'].filter(k=>s[k]!==undefined).map(k=>[k,s[k]]));
  }
  // One UTF-8 byte limit for both download entry points and every import path.
  const backupLimitBytes=64*1024*1024;
  function checkBackupSize(bytes){if(!Number.isFinite(bytes)||bytes<0||bytes>backupLimitBytes)throw Error('备份文件超过 64 MiB');}
  function parseBackup(text){
    if(typeof text!=='string')fail();
    checkBackupSize(new Blob([text]).size);
    let b;try{b=JSON.parse(text);}catch{fail();}
    if(b?.format!=='little-bear-backup'||b.version!==1||!Array.isArray(b.children)||!b.children.length||b.children.length>20)fail();
    return b.children.map(c=>{
      const learning=validateLearning(c.learning);if(learning.settings.voice&&learning.settings.voiceChosen===undefined)learning.settings={...learning.settings,voiceChosen:true};const foundation=validateFoundation(learning.foundation??c.foundation??{}),scenes=c.scenes||[];
      if(!Array.isArray(scenes)||scenes.length>30||scenes.some(x=>!object(x)||!Number.isFinite(Date.parse(x.time))||!['recognized','practiced','recorded'].includes(x.speech)||!Object.hasOwn(LITTLE_BEAR_SCENES,x.sceneId||'breakfast')||(x.dialogueModes&&!Array.isArray(x.dialogueModes))))fail();
      return {name:name(c.name),learning:{...learning,foundation},foundation,scenes};
    });
  }
  window.BearProfiles={obsoleteDialogue,repairLearning,storageKey,current:()=>({...index.children.find(c=>c.id===index.active)}),list:()=>index.children.map(c=>({...c})),
    has(childId){try{const live=JSON.parse(localStorage.getItem(INDEX));return (live?.children||index.children).some(c=>c.id===childId);}catch{return index.children.some(c=>c.id===childId);}},
    add(value){return withIndexLock(()=>{if(index.children.length>=20)throw Error('最多保存 20 个孩子档案');const child={id:id(),name:name(value)};persist({...index,children:[...index.children,child]});return child.id;});},
    rename(value){const target=pageChildId;return withIndexLock(()=>{if(!index.children.some(c=>c.id===target))throw Error('这个档案已被删除，请刷新后重试');persist({...index,children:index.children.map(c=>c.id===target?{...c,name:name(value)}:c)});});},
    remove(childId){return withIndexLock(()=>{
      if(!index.children.some(c=>c.id===childId))throw Error('找不到这个档案');
      const children=index.children.filter(c=>c.id!==childId);
      if(!children.length)children.push({id:id(),name:'小探险家'});
      persist({...index,children,active:children.some(c=>c.id===index.active)?index.active:children[0].id});
      clearChild(childId);
    });},
    async switchTo(childId){await withIndexLock(()=>{if(!index.children.some(c=>c.id===childId))throw Error('找不到这个档案');persist({...index,active:childId});});location.reload();},
    export(){const live=JSON.parse(read(INDEX));return {format:'little-bear-backup',version:1,created:new Date().toISOString(),children:(live?.children||index.children).map(c=>{const learning=window.BearLearning.snapshot(c.id);return {name:c.name,learning,foundation:learning.foundation,scenes:JSON.parse(read(storageKey(stores[2],c.id))||'[]')};})};},
    backupLimitBytes,checkBackupSize,
    backupText(){const text=JSON.stringify(this.export());checkBackupSize(new Blob([text]).size);return text;},
    inspect:parseBackup,
    restoreInfo(text){const rows=parseBackup(text);return {count:rows.length,replacesEmptyDefault:restorePlan(rows).removed.length>0};},
    import(text){return withIndexLock(()=>{const rows=parseBackup(text),{retained,removed}=restorePlan(rows),created=[];try{
      for(const row of rows){let restoredName=row.name.slice(0,16)+'（恢复）',n=2;while([...retained,...created].some(c=>c.name===restoredName))restoredName=row.name.slice(0,12)+`（恢复${n++}）`;const child={id:id(),name:restoredName};created.push(child);for(const [key,value] of [[stores[0],row.learning],[stores[2],row.scenes]])localStorage.setItem(storageKey(key,child.id),JSON.stringify(value));}
      const children=[...retained,...created];persist({...index,children,active:children.some(c=>c.id===index.active)?index.active:created[0].id});
    }catch(e){for(const c of created)clearChild(c.id);throw Error('恢复未完成，可能是浏览器空间不足；原档案仍保留');}for(const child of removed)clearChild(child.id);return created.length;});}
  };
})();
