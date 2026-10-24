/* One child navigation and a parent gate scoped to a single parent visit. */
(() => {
  let parentMode=false,active='today',pending='practice',answer=0,origin;
  const $=id=>document.getElementById(id);
  const header=document.querySelector('.site-header');
  function measureHeader(){
    const height=header.getBoundingClientRect().height;
    document.body.style.setProperty('--app-header-size',`${height}px`);
    document.documentElement.style.setProperty('--app-header-height',`${height+12}px`);
  }
  measureHeader();
  new ResizeObserver(measureHeader).observe(header);
  let current=null,trail=[],restoring=false,ready=false,resumingParent=null;
  const resumeChildId=BearProfiles.current().id,resumeKey=BearProfiles.storageKey('bear-navigation-v1');
  const signature=()=>{const p=new URLSearchParams(location.search);return JSON.stringify(['view','lesson','tab'].map(k=>p.get(k)));};
  let saved;
  try{saved=JSON.parse(sessionStorage.getItem(resumeKey));}catch{}
  function checkpoint(entry){
    if(!entry)return;
    entry.scroll=scrollY;
    if(entry.key==='section:foundation')entry.data=BearFoundation.checkpoint();
    else if(entry.key==='feature:phonics')entry.data=BearPhonics.checkpoint();
    else if(entry.key.startsWith('lesson:'))entry.data={lesson:BearLesson.checkpoint(),hub:BearHub.checkpoint()};
    else if(entry.key.startsWith('section:'))entry.data=BearHub.checkpoint();
    else if(entry.key==='mixed-review')entry.data=BearLearningTools.reviewCheckpoint();
    else if(entry.key==='quiz')entry.data=BearFeatures.checkpoint();
    else if(entry.key==='feature:books')entry.data=BearFeatures.checkpoint();
    else if(entry.key==='feature:library')entry.data=BearFeatures.checkpoint();
    else if(entry.key==='feature:parents'||entry.key.startsWith('parent-detail:'))entry.data=BearFeatures.checkpoint();
  }
  function save(){
    if(!ready||restoring||!current||!BearProfiles.has(resumeChildId)||BearProfiles.current().id!==resumeChildId)return;
    try{checkpoint(current);sessionStorage.setItem(resumeKey,JSON.stringify(resumingParent||{version:1,signature:signature(),entries:[...trail,current].map(({key,tab,parent,scroll,data})=>({key,tab,parent,scroll,data}))}));}catch{}
  }
  function route(entry){
    const key=entry?.key;
    if(typeof key!=='string')return null;
    const [kind,id]=key.split(':');
    if(kind==='feature'&&['landing','explore','themes','today','review','phonics','books','home','parents','library'].includes(id))return ()=>{
      if(id==='books'){BearFeatures.openBooks(entry.data?.bookLevel||'L1');return;}
      if(id==='library'){BearFeatures.openLibrary(entry.data||{});return;}
      if(id==='phonics')BearPhonics.restore(entry.data);
      if(id==='parents'){BearFeatures.openParents(entry.data?.parentTab||'practice');return;}
      BearFeatures.open(id);
    };
    if(kind==='lab'&&(id==='sentences'&&BEAR_SENTENCE_PATTERNS.some(p=>p.id===key.slice(14))||id==='role'&&Object.hasOwn(LITTLE_BEAR_SCENES,key.slice(9))))return ()=>id==='sentences'?BearSentenceBlocks.open(key.slice(14)):BearRoleplay.open(key.slice(9));
    if(kind==='growth'&&['assessment','assessment-result','games','game-basket','game-bag','game-order'].includes(id))return ()=>BearGrowth.restore(id);
    if(kind==='parent-detail'&&['updates','assessment','quality','report','weak','familyGame','plan','playback','children','backup','downloads','storage'].includes(id))return ()=>BearFeatures.openParents(entry.data?.parentTab||'practice',id);
    if(kind==='section'&&['foundation','scenes','simulation'].includes(id))return ()=>{BearHub.restore(entry.data);BearHub.show(id);if(id==='foundation')BearFoundation.restore(entry.data);};
    if(kind==='book'&&BEAR_BOOKS.some(b=>b.id===id))return ()=>{BearFeatures.open('books');BearFeatures.openBook(id);};
    if(kind==='theme'&&BEAR_LEARNING_THEMES.some(t=>t.id===id))return ()=>BearFeatures.openTheme(id);
    if(key==='downloaded')return ()=>BearFeatures.openDownloaded();
    if(key==='mixed-review'&&BearLearningTools.validReview(entry.data))return ()=>BearFeatures.restoreMixedReview(entry.data);
    if(key==='quiz'&&BearFeatures.validQuiz(entry.data))return ()=>BearFeatures.restoreQuiz(entry.data);
    if(kind==='lesson'&&entry.data?.lesson&&Object.hasOwn(LITTLE_BEAR_SCENES,entry.data.lesson.id))return ()=>{
      BearHub.show(id==='simulation'?'simulation':'scenes');BearHub.restore(entry.data.hub);
      BearLesson.restore(entry.data.lesson);
    };
    return null;
  }
  function resume(){
    ready=true;
    if(saved?.version!==1||saved.signature!==signature()||!Array.isArray(saved.entries)||!saved.entries.length||saved.entries.length>40)return false;
    if(saved.entries.some(e=>!e||typeof e!=='object'||Array.isArray(e)))return false;
    const entries=saved.entries.map(e=>({...e,requiresParentGate:e.parent===true,scroll:Number.isFinite(e.scroll)?Math.max(0,e.scroll):0,restore:route(e)}));
    if(entries.some(e=>!e.restore||!['today','explore','books'].includes(e.tab)||typeof e.parent!=='boolean'))return false;
    const last=entries.at(-1);
    if(last.parent){
      BearFeatures.open('landing');resumingParent=saved;requestParents(last.data?.parentTab||'practice');return true;
    }
    restoring=true;
    try{last.restore();current=last;trail=entries.slice(0,-1);parentMode=false;active=last.tab;sync();backState();}
    catch{current=null;trail=[];return false;}
    finally{restoring=false;}
    requestAnimationFrame(()=>{window.scrollTo({top:last.scroll,behavior:'instant'});save();});
    return true;
  }
  window.addEventListener('pagehide',save);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)save();});
  const backButton=document.createElement('button');backButton.id='page-back';backButton.className='page-back';backButton.type='button';backButton.hidden=true;backButton.setAttribute('aria-label','返回上一级');backButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5-7 7 7 7M7 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';document.querySelector('.site-header').prepend(backButton);
  function backState(){backButton.hidden=trail.length===0;document.body.classList.toggle('has-page-back',trail.length>0);}
  function visit(key,restore,{root=false,tab=active}={}){if(restoring)return;if(root){trail=[];current=null;}else if(!current){const base=tab==='today'?'landing':tab==='books'?'books':'explore';current={key:'feature:'+base,restore:()=>BearFeatures.open(base),tab,parent:false,scroll:0};}const entry={key,restore,tab:root?tab:(current?.tab||tab),parent:parentMode,scroll:0};if(current?.key===key){current={...entry,scroll:current.scroll};}else{const index=trail.findIndex(e=>e.key===key);if(index>=0){current={...entry,tab:trail[index].tab};trail=trail.slice(0,index);}else{if(current)trail.push(current);current=entry;}}active=current.tab;sync();backState();save();}
  function back(){if(!trail.length)return;const target=trail.at(-1);if(target.requiresParentGate){requestParents(target.data?.parentTab||'practice');return;}window.BearSelect?.close();const previous=trail.pop();current=previous;parentMode=previous.parent;active=previous.tab;restoring=true;try{previous.restore();}finally{restoring=false;parentMode=previous.parent;active=previous.tab;sync();backState();window.scrollTo({top:previous.scroll||0,behavior:'instant'});save();}}
  backButton.onclick=back;document.addEventListener('click',()=>{checkpoint(current);},true);
  const gate=document.createElement('dialog');gate.id='parent-gate';gate.className='parent-gate';gate.setAttribute('aria-labelledby','parent-gate-title');
  gate.innerHTML='<form id="parent-gate-form"><span class="gate-icon" aria-hidden="true">🌱</span><h2 id="parent-gate-title">请家长帮忙</h2><p>完成小验证，进入家长空间。</p><label for="parent-gate-answer" id="parent-gate-question"></label><input id="parent-gate-answer" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="3" required aria-describedby="parent-gate-error" placeholder="输入计算结果"><p id="parent-gate-error" role="status"></p><button class="continue-button" type="submit">进入家长空间</button><button id="parent-gate-cancel" type="button" class="text-button">返回学习</button></form>';document.body.append(gate);
  function close(){gate.close();$('parent-gate-answer').value='';origin?.focus();}
  function sync(){document.body.classList.toggle('parent-area',parentMode);document.body.classList.toggle('child-area',!parentMode);document.body.dataset.childTab=active;$('return-child').hidden=!parentMode;document.querySelectorAll('[data-child-nav]').forEach(b=>{const current=b.dataset.childNav===active;b.classList.toggle('active',current);if(current)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});window.BearSelect?.close();}
  function view(next){parentMode=next==='parents';active=['landing','today','library'].includes(next)?'today':next==='books'?'books':parentMode?active:'explore';sync();}
  function requestParents(tab='practice'){if(parentMode){BearFeatures.openParents(tab);return;}if(gate.open)return;pending=tab;origin=document.activeElement;const a=12+Math.floor(Math.random()*28),b=13+Math.floor(Math.random()*27);answer=a+b;$('parent-gate-question').textContent=`${a} + ${b} = ?`;$('parent-gate-error').textContent='';$('parent-gate-answer').value='';window.BearLesson.pause();window.BearFoundation.pause();window.BearFeatures.pause();gate.showModal();$('parent-gate-answer').focus();}
  $('parent-gate-form').onsubmit=e=>{e.preventDefault();if(!/^\d+$/.test($('parent-gate-answer').value.trim())||Number($('parent-gate-answer').value)!==answer){$('parent-gate-error').textContent='结果不对，请家长再试一次。';$('parent-gate-answer').select();return;}const resumed=resumingParent?.entries.at(-1),scroll=resumed?.scroll||0,detail=resumed?.key?.startsWith('parent-detail:')?resumed.key.slice(14):null;resumingParent=null;close();parentMode=true;BearFeatures.openParents(pending,detail);window.scrollTo({top:scroll,behavior:'instant'});save();document.querySelector('.parent-tabs [aria-selected=true]')?.focus({preventScroll:true});};$('parent-gate-cancel').onclick=()=>{resumingParent=null;close();save();};gate.addEventListener('cancel',e=>{e.preventDefault();resumingParent=null;close();save();});
  function go(tab){trail=[];current=null;parentMode=false;if(tab==='books')BearFeatures.openBooks();else window.BearFeatures.open(tab==='today'?'landing':tab);window.scrollTo({top:0,behavior:'instant'});}
  window.BearNavigation={resume,save,view,visit,back,capture:()=>current,isCurrent:entry=>entry===current,section(){parentMode=false;active='explore';sync();},requestParents,isParent:()=>parentMode};
  document.querySelectorAll('[data-child-nav]').forEach(b=>b.onclick=()=>go(b.dataset.childNav));$('return-child').onclick=()=>go('today');sync();
})();
