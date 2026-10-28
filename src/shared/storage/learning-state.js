/* Local evidence and scheduling. Raw audio and transcripts are never persisted. */
(() => {
  const childId=window.BearProfiles.current().id,KEY=window.BearProfiles.storageKey('bear-learning-v1'),words=window.BEAR_FOUNDATIONS.words;
  const empty=()=>({version:1,foundation:{},items:{},days:{},awards:[],placed:[],settings:{mode:'explorer',chinese:true,speed:'medium',speedChosen:false,voice:'child',voiceChosen:false,planMinutes:10,readerMode:'follow',textSize:'standard'},parentDone:[],reading:{},activity:{},favorites:[],recent:[],growth:{assessment:null,draft:null,issues:[],sessions:{},games:{},gameDrafts:{},practice:{recent:{},transfers:{}},lab:{sentences:{},roles:{}},reviews:[]}});
  const hydrate=saved=>{const s=empty();if(saved?.version===1)Object.assign(s,saved,{settings:{...s.settings,...saved.settings},reading:saved.reading||{},growth:{...s.growth,...saved.growth}});if(saved?.settings?.voiceChosen===undefined){s.settings.voiceChosen=!!saved?.settings?.voice&&saved.settings.voice!=='adult';if(!s.settings.voiceChosen)s.settings.voice='child';}if(!s.settings.speedChosen&&s.settings.speed==='normal')s.settings.speed='medium';if(s.settings.speed==='extraSlow')s.settings.speed='slow';return s;};
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  let state=empty(),persistent=true,clock=0;
  const pending=new Map(),eventCache=new Map();
  const uuid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const epochFor=key=>localStorage.getItem(key+':epoch')||'';
  const stemFor=(key,epoch)=>epoch?`${key}:journal:${epoch}`:key;
  let activeEpoch='',journalSize=0,maintenance=null;
  const award=(s,key)=>{if(!s.awards.includes(key))s.awards.push(key);};
  function item(s,id){const defaults={heard:0,selected:0,practiced:0,recorded:0,recognized:0,independent:0,wrong:0,hinted:0,streak:0,due:0,last:0},x=s.items[id]||(s.items[id]={});for(const [key,value] of Object.entries(defaults))if(!Number.isFinite(x[key]))x[key]=value;return x;}
  const taskKeys=['review','learn','game','book','exchange'];
  const required=p=>p.required||taskKeys;
  // Legacy plans have no revision; their immutable content is a stable identity.
  const planRevision=p=>p.revision||JSON.stringify([p.theme,p.scene,p.book,p.learn,p.review,p.minutes,p.required]);
  function finishTask(s,date,key){const p=s.days[date];if(!p)return;if(!p.done.includes(key))p.done.push(key);if(required(p).every(k=>p.done.includes(k)))award(s,`day:${date}`);}
  function apply(s,e,versions={},floor='',schedules={},scheduleFloor=''){const {action,args:a,now,date}=e;
    // Field clocks survive compaction. Delayed writes still contribute counters,
    // but cannot overwrite a more recent selection or reading position.
    const latest=(path,write)=>{const key=JSON.stringify(path),previous=Object.hasOwn(versions,key)?versions[key]:floor;if(e.id<=previous)return;write();versions[key]=e.id;};
    switch(action){
      case 'record':{
        if(window.BearProfiles.obsoleteDialogue(a.id))break;
        const hadItem=Object.hasOwn(s.items,a.id);
        const x=item(s,a.id);x.last=Math.max(x.last,now);
        // Scene aggregates do not prove that its separate, fixed demonstration was practiced.
        // Numeric flag follows the existing numeric-only evidence/backup schema.
        if(a.id.startsWith('scene:'))x.summaryOnly=a.countActivity===false?(hadItem?x.summaryOnly||0:1):0;
        if(a.foundation&&['practiced','recorded'].includes(a.type))latest(['foundation',a.id],()=>{if(e.id>(versions[JSON.stringify(['foundationClear'])]||''))s.foundation[a.id]={mode:a.type,time:new Date(now).toISOString()};});
        const day=s.activity[date]||(s.activity[date]={counts:{},ids:[],helpIds:[]});
        // A resource can inherit evidence without counting the same physical attempt twice.
        if(a.countActivity!==false)day.counts[a.type]=(day.counts[a.type]||0)+1;
        if(!day.ids.includes(a.id))day.ids.push(a.id);if(a.type==='wrong'||a.type==='hinted'||a.hinted){day.helpIds||=[];if(!day.helpIds.includes(a.id))day.helpIds.push(a.id);}
        if(Object.hasOwn(x,a.type)&&typeof x[a.type]==='number')x[a.type]++;
        if(a.hinted&&a.type!=='hinted')x.hinted++;
        // Keep the successful run after the latest reset, so a delayed reset can
        // split that run even after its source journal has been compacted.
        const schedule=schedules[a.id]||(schedules[a.id]={floor:scheduleFloor,streak:x.streak,due:x.due,success:[]});
        if(e.id>schedule.floor){
          const point={id:e.id,now};
          if(a.type==='wrong'||a.hinted){
            if(!schedule.reset||e.id>schedule.reset.id){schedule.reset=point;schedule.success=schedule.success.filter(p=>p.id>e.id);}
          }else if(a.type==='selected'||a.type==='independent'){
            if(!schedule.reset||e.id>schedule.reset.id)schedule.success.push(point);
          }else if(!schedule.first||e.id<schedule.first.id)schedule.first=point;
          schedule.success.sort((a,b)=>a.id.localeCompare(b.id));
          x.streak=(schedule.reset?0:schedule.streak)+schedule.success.length;
          const last=schedule.success.at(-1);
          x.due=last?last.now+[1,3,7,14][Math.min(x.streak-1,3)]*86400000:schedule.reset?schedule.reset.now+5*60000:schedule.due|| (schedule.first?schedule.first.now+86400000:0);
        }
        if(['practiced','recorded','recognized','independent'].includes(a.type))award(s,'voice');break;
      }
      case 'plan':if(!s.days[date])s.days[date]=structuredClone(a.plan);else if(!s.days[date].book)Object.assign(s.days[date],{book:a.plan.book,theme:a.plan.theme});break;
      case 'planChoice':latest(['plan',date],()=>{s.days[date]=structuredClone(a.plan);});break;
      case 'favorite':latest(['favorite',a.key],()=>{
        // Historical journal entries stored toggles; new entries carry explicit intent.
        const chosen=typeof a.chosen==='boolean'?a.chosen:!s.favorites.includes(a.key);
        s.favorites=chosen?[...new Set([...s.favorites,a.key])]:s.favorites.filter(x=>x!==a.key);
      });break;
      case 'visit':s.recent=[{key:a.key,time:Math.max(now,s.recent.find(x=>x.key===a.key)?.time||0)},...s.recent.filter(x=>x.key!==a.key)].sort((a,b)=>b.time-a.time).slice(0,30);break;
      case 'task':if(a.context===undefined||(a.context&&a.context.date===date&&s.days[date]&&a.context.revision===planRevision(s.days[date])))finishTask(s,date,a.key);break;
      case 'sceneComplete':award(s,'scene');if(s.days[date]?.scene===a.id)finishTask(s,date,'game');break;
      case 'exchange':award(s,'exchange');if(s.days[date]?.scene===a.id)finishTask(s,date,'exchange');break;
      case 'completeBook':award(s,'book');if(s.days[date]?.book===a.id)finishTask(s,date,'book');break;
      case 'award':award(s,a.key);break;
      case 'settings':for(const [key,value] of Object.entries(a.change))latest(['settings',key],()=>{s.settings[key]=value;if(key==='voice')s.settings.voiceChosen=true;});if(s.settings.speed==='extraSlow')s.settings.speed='slow';break;
      case 'place':s.placed=s.placed.includes(a.id)?s.placed.filter(x=>x!==a.id):[...s.placed,a.id];break;
      case 'parentDone':{const key=`${date}:${a.id}`;if(!s.parentDone.includes(key))s.parentDone.push(key);award(s,'family');break;}
      case 'reading':{
        const previous=s.reading[a.id]||{page:0,heard:[],answer:false};
        const next=s.reading[a.id]={...previous,interactions:{...(previous.interactions||{})},heard:[...new Set([...previous.heard,...(a.change.heard||[])])],read:[...new Set([...(previous.read||[]),...(a.change.read||[])])]};
        for(const [key,value] of Object.entries(a.change))if(!['heard','read','interactions'].includes(key))latest(['reading',a.id,key],()=>{next[key]=value;});
        for(const [key,value] of Object.entries(a.change.interactions||{}))latest(['reading',a.id,'interactions',key],()=>{next.interactions[key]=value;});break;
      }
      case 'growthLab':{s.growth.lab||={sentences:{},roles:{}};latest(['lab',a.kind,a.id],()=>{s.growth.lab[a.kind][a.id]=a.value;});break;}
      case 'growthReview':latest(['review',a.value.resource,a.value.page,a.value.type],()=>{s.growth.reviews=[...(s.growth.reviews||[]).filter(x=>!(x.resource===a.value.resource&&x.page===a.value.page&&x.type===a.value.type)),a.value].slice(-6000);});break;
      case 'growthPractice':{
        const p=s.growth.practice||={recent:{},transfers:{}};
        if(a.kind==='recent')latest(['practice','recent',a.id],()=>{p.recent[a.id]=a.value;});
        else if(a.kind==='transfer'){
          const path=row=>JSON.stringify(['practice','transfers',a.id,row.day,row.context]);
          const key=path(a.value),previous=versions[key]??versions[JSON.stringify(['practice','transfers'])]??floor;
          if(e.id<=previous)break;
          versions[key]=e.id;
          const rows=[...(p.transfers[a.id]||[]).filter(row=>!(row.day===a.value.day&&row.context===a.value.context)),a.value];
          // Preserve chronological evidence even when an earlier event arrives after a checkpoint.
          rows.sort((a,b)=>(versions[path(a)]||floor).localeCompare(versions[path(b)]||floor));
          p.transfers[a.id]=rows.slice(-12);
        }else for(const [key,value] of Object.entries(a.value))latest(['practice',key],()=>{p[key]=value;});
        break;
      }
      case 'growthDraft':latest(['draft'],()=>{s.growth.draft=a.value;});break;
      case 'growthAssessment':latest(['assessment'],()=>{s.growth.assessment=a.value;});latest(['draft'],()=>{s.growth.draft=null;});break;
      case 'growthIssue':s.growth.issues=[...s.growth.issues,a.value].slice(-100);break;
      case 'growthIssueRemove':s.growth.issues=s.growth.issues.filter(x=>x.id!==a.id);break;
      case 'growthSession':{const session=s.growth.sessions[date]||(s.growth.sessions[date]={seconds:0,restAt:0});session.seconds+=a.seconds;break;}
      case 'growthRest':{const session=s.growth.sessions[date]||(s.growth.sessions[date]={seconds:0,restAt:0});session.restAt=session.seconds;break;}
      case 'growthGameDraft':latest(['gameDraft',a.id],()=>{s.growth.gameDrafts[a.id]=a.value;});break;
      case 'growthGame':latest(['game',a.id],()=>{s.growth.games[a.id]={...a.value,time:now};});break;
      case 'foundationMark':latest(['foundation',a.id],()=>{if(e.id>(versions[JSON.stringify(['foundationClear'])]||''))s.foundation[a.id]={mode:a.mode,time:new Date(now).toISOString()};});break;
      case 'clearFoundation':latest(['foundationClear'],()=>{for(const id of Object.keys(s.foundation))latest(['foundation',id],()=>{delete s.foundation[id];});});break;
      case 'clear':Object.assign(s,empty());break;
    }
  }
  // Append-only events preserve concurrent edits; checkpoints reclaim only captured events.
  // A reset changes the epoch before deleting old keys, so stale tabs cannot replay them.
  function readJournal(id=childId,includePending=true){
    if(!window.BearProfiles.has(id))return {state:empty(),ids:[]};
    const key=window.BearProfiles.storageKey('bear-learning-v1',id);
    for(let attempt=0;attempt<8;attempt++){
      const epoch=epochFor(key),stem=stemFor(key,epoch),baseKey=stem+':base',prefix=stem+':op:',checkpointKey=stem+':checkpoint';
      const checkpointText=localStorage.getItem(checkpointKey),checkpoint=JSON.parse(checkpointText||'null');
      const base=localStorage.getItem(baseKey);
      const raw=checkpoint?.state||JSON.parse(base===null?(epoch?'null':localStorage.getItem(key)||'null'):base);
      const next=hydrate(raw),included=new Set(checkpoint?.included||[]),events=new Map(),ids=[];
      const versions={...checkpoint?.versions},schedules=structuredClone(checkpoint?.schedules||{});
      // Old checkpoints have no scheduling history; their captured schedule is a baseline.
      const scheduleFloor=checkpoint?.scheduleFloor??(checkpoint&&!checkpoint.schedules?checkpoint.lastId||[...included].sort().at(-1)||'':'');
      // Legacy checkpoints have no field clocks: protect their captured state.
      const floor=checkpoint?.floor??(checkpoint&&!checkpoint.versions?[...included].sort().at(-1)||'':'');
      clock=Math.max(clock,Number((checkpoint?.lastId||floor||'0').split('-')[0]));
      let lastId=checkpoint?.lastId||floor;
      if(!Object.hasOwn(raw||{},'foundation')){
        let legacy;try{legacy=epoch?null:JSON.parse(localStorage.getItem(window.BearProfiles.storageKey('bear-foundation-v1',id))||'{}');}catch{}
        const known=new Set([...window.BEAR_FOUNDATIONS.letters,...window.BEAR_FOUNDATIONS.phonemes,...words].map(u=>u.id));
        if(legacy&&typeof legacy==='object'&&!Array.isArray(legacy))for(const [unit,mark] of Object.entries(legacy)){
          if(!known.has(unit)||!mark||!['practiced','recorded'].includes(mark.mode)||!Number.isFinite(Date.parse(mark.time)))continue;
          const now=Date.parse(mark.time),event={id:String(now).padStart(16,'0')+'-legacy-foundation-'+unit,action:'foundationMark',args:{id:unit,mode:mark.mode},now};
          localStorage.setItem(prefix+event.id,JSON.stringify(event));
        }
      }
      if(!checkpoint&&(base===null||!Object.hasOwn(raw||{},'foundation'))&&epochFor(key)===epoch)localStorage.setItem(baseKey,JSON.stringify(next));
      // Capture keys before reading: another child's cleanup must not shift scan indices.
      for(const name of Object.keys(localStorage)){
        if(!name.startsWith(prefix))continue;
        const eventId=name.slice(prefix.length);ids.push(eventId);if(included.has(eventId))continue;
        let event=eventCache.get(name);if(!event){event=JSON.parse(localStorage.getItem(name));if(!event)continue;eventCache.set(name,event);}
        events.set(event.id,event);
      }
      if(id===childId&&includePending&&epoch===activeEpoch)for(const [eventId,event] of pending)events.set(eventId,event);
      for(const event of [...events.values()].sort((a,b)=>a.id.localeCompare(b.id))){clock=Math.max(clock,Number(event.id.split('-')[0]));apply(next,event,versions,floor,schedules,scheduleFloor);if(event.id>lastId)lastId=event.id;}
      // A checkpoint may have removed keys during the scan. Retry from its new state.
      if(epochFor(key)!==epoch||localStorage.getItem(checkpointKey)!==checkpointText)continue;
      if(id===childId)journalSize=ids.length;
      return {state:window.BearProfiles.repairLearning(next),epoch,key,stem,prefix,baseKey,checkpointKey,ids,versions,floor,lastId,schedules,scheduleFloor};
    }
    throw Error('学习记录正在其他页面更新，请稍后重试');
  }
  function snapshot(id=childId){return readJournal(id).state;}
  function refresh(){
    try{
      const epoch=epochFor(KEY);
      if(epoch!==activeEpoch){activeEpoch=epoch;pending.clear();eventCache.clear();state=empty();}
      state=snapshot();
      if(journalSize>=256)void compact();
    }catch{persistent=false;}
    return state;
  }
  function notify(){applySettings();window.dispatchEvent(new CustomEvent('bear:progress'));}
  function compact(){
    if(maintenance)return maintenance;
    // Web Locks serialize checkpoint writers only; normal event appends remain synchronous.
    // Without this API keep the journal rather than risk losing concurrent edits.
    if(!globalThis.navigator?.locks?.request)return Promise.resolve(false);
    maintenance=navigator.locks.request('bear-journal:'+KEY,{ifAvailable:true},lock=>{
      if(!lock||!window.BearProfiles.has(childId))return false;
      const view=readJournal(childId,false);if(!view.ids.length)return false;
      const checkpoint={state:view.state,included:view.ids,versions:view.versions,floor:view.floor,lastId:view.lastId,schedules:view.schedules,scheduleFloor:view.scheduleFloor};
      if(epochFor(KEY)!==view.epoch)return false;
      localStorage.setItem(view.checkpointKey,JSON.stringify(checkpoint));
      if(epochFor(KEY)!==view.epoch){localStorage.removeItem(view.checkpointKey);return false;}
      // Never delete a later append. Included IDs also prevent double replay after a crash.
      for(const id of view.ids){localStorage.removeItem(view.prefix+id);eventCache.delete(view.prefix+id);}
      localStorage.removeItem(view.baseKey);
      if(!view.epoch)localStorage.removeItem(KEY);
      return true;
    }).catch(()=>false).finally(()=>{maintenance=null;});
    return maintenance;
  }
  function change(action,args={}){
    if(!window.BearProfiles.has(childId)||window.BearProfiles.current().id!==childId)return;
    refresh();const epoch=activeEpoch,stem=stemFor(KEY,epoch),now=Date.now();clock=Math.max(clock+1,now);
    const event={id:String(clock).padStart(16,'0')+'-'+uuid(),action,args:structuredClone(args),now,date:today()};
    pending.set(event.id,event);apply(state,event);
    try{
      for(const [id,value] of pending){
        if(epochFor(KEY)!==epoch)break;
        const key=stem+':op:'+id;localStorage.setItem(key,JSON.stringify(value));pending.delete(id);
        if(epochFor(KEY)!==epoch){localStorage.removeItem(key);break;}
      }
      persistent=!pending.size;
    }catch{persistent=false;}
    refresh();notify();
  }
  function clear(){
    if(!window.BearProfiles.has(childId)||window.BearProfiles.current().id!==childId)return;
    // The old materialized snapshot is redundant once a base/checkpoint exists.
    const oldEpoch=epochFor(KEY),oldStem=stemFor(KEY,oldEpoch);
    if(localStorage.getItem(oldStem+':base')!==null||localStorage.getItem(oldStem+':checkpoint')!==null)localStorage.removeItem(KEY);
    const epoch=uuid();
    try{localStorage.setItem(KEY+':epoch',epoch);}catch{throw Error('暂时无法清除记录，请检查浏览器存储权限后重试；尚未切换记录。');}
    activeEpoch=epoch;pending.clear();eventCache.clear();state=empty();journalSize=0;
    const keep=stemFor(KEY,epoch)+':';
    for(const key of Object.keys(localStorage)){
      if(epochFor(KEY)!==epoch)break;
      if((key===KEY||key.startsWith(KEY+':'))&&key!==KEY+':epoch'&&!key.startsWith(keep))localStorage.removeItem(key);
    }
    for(const store of ['bear-foundation-v1','little-bear-breakfast-v1']){
      const key=window.BearProfiles.storageKey(store,childId);
      for(const stored of Object.keys(localStorage))if(stored===key||stored.startsWith(key+':'))localStorage.removeItem(stored);
    }
    if(childId==='first')for(const store of ['bear-learning-v1','bear-foundation-v1','little-bear-breakfast-v1'])for(const key of Object.keys(localStorage))if(key===store||key.startsWith(store+':'))localStorage.removeItem(key);
    persistent=true;notify();
  }
  function dueFrom(s){return words.filter(w=>s.items[w.id]).sort((a,b)=>{const x=item(s,a.id),y=item(s,b.id);return ((x.due<=Date.now()?0:1)-(y.due<=Date.now()?0:1))||x.due-y.due||y.wrong-x.wrong;});}
  function makePlan(s,theme,previous=null){
    const minutes=[5,10,15].includes(s.settings.planMinutes)?s.settings.planMinutes:10;
    const count=minutes===5?1:minutes===15?5:3;
    const pool=window.BearCurriculum?.words(theme.id)||theme.words.map(text=>words.find(w=>w.text===text));
    const learn=[...pool].sort((a,b)=>{
      const score=w=>{const x=s.items[w.id];return x?(x.streak>0?(x.selected||0):0)+(x.independent||0)*2:0;};
      return score(a)-score(b);
    }).slice(0,count).map(w=>w.id);
    const due=dueFrom(s).map(w=>w.id),old=[...new Set([...(previous?.learn||[]),...due])].slice(0,3);
    const review=[...new Set([...old,...learn])].slice(0,3);
    return {revision:uuid(),review,learn,warmup:!due.length&&!previous,newCount:learn.filter(id=>!s.items[id]).length,scene:theme.scene,book:theme.book,theme:theme.id,done:[],minutes,required:minutes===5?['review','learn','game']:taskKeys,reviewFrom:previous?.date||null};
  }
  function plan(){
    refresh();const date=today();if(!state.days[date]){
      const history=Object.keys(state.days).filter(d=>d<date).sort(),previous=state.days[history.at(-1)];
      const all=window.BEAR_LEARNING_THEMES,index=previous?Math.max(0,all.findIndex(t=>t.id===previous.theme)):0;
      const unfinished=previous&&!required(previous).every(k=>previous.done.includes(k));
      const recommended=state.growth.assessment?.theme;const theme=all[unfinished?index:previous?(index+1)%all.length:Math.max(0,all.findIndex(t=>t.id===recommended))];
      const next=unfinished?{...structuredClone(previous),continuedFrom:history.at(-1)}:makePlan(state,theme,previous?{...previous,date:history.at(-1)}:null);
      change('plan',{plan:next});
    }
    if(!state.days[date].book){const theme=window.BEAR_LEARNING_THEMES.find(t=>t.scene===state.days[date].scene)||window.BEAR_LEARNING_THEMES[0];change('plan',{plan:{book:theme.book,theme:theme.id}});}
    return state.days[date];
  }
  const fileToUnit=new Map([...window.BEAR_FOUNDATIONS.letters,...window.BEAR_FOUNDATIONS.phonemes,...words].map(u=>[u.audio,u.id]));
  const taskContext=(p=plan())=>({date:today(),revision:planRevision(p)});
  window.BearLearning={today,plan,snapshot,required,taskContext,
    growth(action,args){if(['growthLab','growthReview','growthPractice','growthDraft','growthAssessment','growthIssue','growthIssueRemove','growthSession','growthRest','growthGame','growthGameDraft'].includes(action))change(action,args);},
    choosePlan(themeId,minutes){const theme=window.BEAR_LEARNING_THEMES.find(t=>t.id===themeId);if(!theme||![5,10,15].includes(minutes))throw Error('请选择有效主题和学习时长');change('settings',{change:{planMinutes:minutes}});change('planChoice',{plan:makePlan(refresh(),theme)});return plan();},
    favorite(key,chosen=!refresh().favorites.includes(key)){change('favorite',{key,chosen});},visit(key){change('visit',{key});},due(){return dueFrom(refresh());},record(id,type,{hinted=false,foundation=false,countActivity=true}={}){if(typeof id!=='string'||(id.startsWith('dialogue:')&&window.BearGrowth&&!window.BearGrowth.parseDialogueKey(id)))return;change('record',{id,type,hinted,foundation,countActivity});},foundation:()=>refresh().foundation,clearFoundation(){change('clearFoundation');},
    task(key,context=taskContext()){plan();change('task',{key,context});},sceneComplete(id){plan();change('sceneComplete',{id});},exchange(id){plan();change('exchange',{id});},
    award(key){change('award',{key});},get:refresh,persistent:()=>persistent,
    heard(file){const id=fileToUnit.get(file.replace(/\.(wav|mp3)$/, ''));if(id)change('record',{id,type:'heard',hinted:false});},
    settings(changeSet){change('settings',{change:changeSet});},place(id){change('place',{id});},parentDone(id){change('parentDone',{id});},
    reading(id,update){if(update)change('reading',{id,change:update});return refresh().reading[id]||{page:0,heard:[],answer:false};},
    completeBook(id){plan();change('completeBook',{id});},clear,compact
  };
  function applySettings(){document.body.dataset.childMode=state.settings.mode;document.body.dataset.learningTextSize=['standard','large','extra'].includes(state.settings.textSize)?state.settings.textSize:'standard';document.body.classList.toggle('chinese-folded',!state.settings.chinese);}
  window.addEventListener('storage',e=>{if(window.BearProfiles.has(childId)&&window.BearProfiles.current().id===childId&&(e.key===null||e.key===KEY+':epoch'||e.key?.startsWith(stemFor(KEY,epochFor(KEY))+':'))){refresh();notify();}});
  refresh();applySettings();
})();
