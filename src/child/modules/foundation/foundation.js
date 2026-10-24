(() => {
  const data=window.BEAR_FOUNDATIONS, $=id=>document.getElementById(id);
  let tab='letters',theme=data.themes[0].id,unit=data.letters[0],consent=false,recordingPending=false,foundationSignature='';
  const labels={letters:['字母学习','26 个大小写字母 · 听名称，再跟读'],phonemes:['音标学习','24 个入门音标 · 英语教学真人示范'],phonics:['自然拼读',`${data.words.length} 个词条 · 字母组合 · 听音拼词`],words:['常用单词',`${data.words.length} 个生活单词 · 英文接中文 · 看图跟读`],sentences:['句型积木','10 类句型 · 100 句 · 换一块，说一句']};
  function navigation(active, phonics=false){
    return `<nav class="foundation-tabs category-rail${phonics?' phonics-foundation-nav':''}" aria-label="基础学习分类">${Object.entries(labels).map(([id,[title]])=>`<button ${phonics?'data-phonics-tab':'data-foundation-tab'}="${id}" data-rail-key="${id}" aria-pressed="${active===id}" ${active===id?'aria-current="page"':''}>${title}</button>`).join('')}</nav>`;
  }
  const navigationBindings=new WeakMap();
  function bindNavigation(root, active){
    navigationBindings.get(root)?.();
    const dispose=BearCategoryRail.mount(root.querySelector('.foundation-tabs'),{selector:'[data-rail-key]',active,surfaces:['letters','phonemes'].includes(active)?[root]:[],ignore:'.category-rail,.feature-tabs,dialog',change(next){
      mic.cancel();BearLesson.pause();
      if(next==='sentences'){BearSentenceBlocks.open();return;}
      if(next==='phonics'){BearFeatures.openPhonics();return;}
      if(root.id!=='foundation-panel')BearHub.show('foundation');
      BearFoundation.openTab(next);
    }});
    navigationBindings.set(root,dispose);
  }
  const mic=new MicrophonePractice({
    onState(state,message){
      if(state==='idle'||state==='error')recordingPending=false;
      const b=$('foundation-record');if(!b)return;
      b.dataset.state=state;b.disabled=['requesting','starting','processing'].includes(state)||!mic.available;
      b.textContent={idle:'🎙️ 录下我的跟读',requesting:'正在请求麦克风…',starting:'正在启动…',listening:'正在录音 · 点一下结束',processing:'正在整理录音…',ready:'再录一次',error:'重新请求麦克风'}[state];
      $('foundation-mic-status').textContent=message;
      if(state==='idle'||state==='error'){const audio=$('foundation-recording');audio.pause();audio.removeAttribute('src');audio.load();audio.hidden=true;$('foundation-save-recording').hidden=true;}
    },
    onServiceUnavailable(message){$('foundation-mic-status').textContent=message;},
    onRecognized(){},
    onRecording(url){recordingPending=true;$('foundation-recording').src=url;$('foundation-recording').hidden=false;const save=$('foundation-save-recording');save.hidden=false;save.disabled=false;save.textContent='完成这次录音练习';}
  });
  function save(mode){
    if(mode==='recorded'){
      if(!recordingPending||mic.state!=='ready')return;
      recordingPending=false;
      $('foundation-save-recording').disabled=true;
      $('foundation-save-recording').textContent='已记下这次录音练习';
    }
    window.BearLearning.record(unit.id,mode==='recorded'?'recorded':'practiced',{foundation:true});
    $('foundation-feedback').textContent=mode==='recorded'?'已记下这次录音练习；未评估发音。':'已记下这次自行跟读；未验证实际语音。';
    window.BearGrowth?.boundary?.();renderList();$('foundation-progress').textContent=`本机已练习 ${Object.keys(window.BearLearning.foundation()).length} 项`;
  }
  function renderList(history=window.BearLearning.foundation()){
    foundationSignature=JSON.stringify(history);
    const list=$('foundation-unit-grid');list.replaceChildren();
    data[tab].filter(u=>tab!=='words'||u.theme===theme).forEach(u=>{
      const b=document.createElement('button');b.className='foundation-unit';b.dataset.unit=u.id;b.classList.toggle('active',u.id===unit.id);b.setAttribute('aria-pressed',String(u.id===unit.id));
      b.innerHTML=`${u.picture?`<span aria-hidden="true">${u.picture}</span>`:''}<strong>${u.display}</strong>${u.kind==='words'?`<span class="word-ipa" lang="en-US">${u.ipa}</span>`:''}<small>${u.kind==='words'?u.zh:u.kind==='phonemes'?u.word:'字母名'}${history[u.id]?' · ✓':''}</small>`;
      b.onclick=()=>{mic.cancel();window.BearLesson.pause();selectUnit(u);};list.append(b);
    });
  }
  const wide=matchMedia('(min-width:768px)');
  function syncLibrary(){const d=$('foundation-library-dialog');if(!d)return;if(d.open)d.close();if(wide.matches)d.setAttribute('open','');}
  wide.addEventListener('change',syncLibrary);
  function selectUnit(u){mic.cancel();BearLesson.pause();unit=u;const d=$('foundation-library-dialog');if(d?.open&&!wide.matches)d.close();renderPlayer();renderList();playUnit();}
  function playUnit(){
    mic.cancel();
    if(tab==='words')window.BearLesson.playFiles([{file:`${unit.audio}.wav`,label:unit.text},{file:`${unit.zhAudio}.wav`,label:unit.zh}]);
    else window.BearLesson.playFile(`${unit.audio}.${unit.extension||'wav'}`,tab==='phonemes'?`音标 ${unit.display}`:unit.text);
  }
  function renderPlayer(){
    const pool=data[tab].filter(u=>tab!=='words'||u.theme===theme),index=pool.indexOf(unit);const trigger=$('foundation-library-open');if(trigger)trigger.textContent=`选择${tab==='words'?'单词':tab==='letters'?'字母':'音标'} · ${unit.display} ▾`;window.BearLearningTools?.mark(unit.id);const p=$('foundation-player');p.innerHTML=`<div class="unit-pagination"><button id="unit-prev" aria-label="上一个学习内容" ${index===0?'disabled':''}>‹ 上一个</button><span>${index+1} / ${pool.length}</span><button id="unit-next" aria-label="下一个学习内容" ${index===pool.length-1?'disabled':''}>下一个 ›</button></div><div class="foundation-hero"><span class="foundation-tag">${labels[tab][0]}</span><div class="foundation-picture ${tab}" aria-hidden="true">${unit.picture||unit.display}</div><h2>${tab==='words'?`${unit.text} <span class="word-ipa" lang="en-US">${unit.ipa}</span>`:tab==='phonemes'?`${unit.word} <span class="word-ipa" lang="en-US">${unit.ipa}</span> · ${unit.zh}`:`字母 ${unit.label}`}</h2><p>${tab==='words'?`<button id="foundation-chinese" class="foundation-translation" aria-label="听中文释义：${unit.zh}">${unit.zh} <span aria-hidden="true">♫</span></button>`:unit.tip||unit.zh}</p>${tab==='phonemes'?`<p class="phoneme-recording-note">${unit.recordingNote}</p>`:''}<div class="foundation-audio-actions"><button id="foundation-listen" class="continue-button">♫ ${tab==='phonemes'?'听音标示范':tab==='letters'?'听字母名称':'听英文和中文'}</button>${tab==='phonemes'?'<button id="foundation-example" class="text-button">听例词发音 →</button>':''}${tab==='words'?'<button id="foundation-phonics" class="text-button">🧩 练这个单词的自然拼读 →</button>':''}</div></div><div class="foundation-practice"><strong>轮到你，跟着说一说</strong><p>${tab==='phonemes'?'先模仿单音，再试着读例词。':'听完示范，用自己的声音读一遍。'}录音可回听，不做发音评分。</p><button id="foundation-record" class="record-button" data-state="idle">🎙️ 录下我的跟读</button><p id="foundation-mic-status" class="recognition-help" role="status"></p><audio id="foundation-recording" class="recording-preview" controls hidden aria-label="回听基础跟读录音"></audio><button id="foundation-save-recording" class="continue-button" hidden>完成这次录音练习</button><button id="foundation-practiced" class="text-button">我跟读过了，记下这次练习 →</button><p id="foundation-feedback" class="feedback" role="status"></p></div>`;
    if(tab==='words'){p.querySelector('.foundation-audio-actions').insertAdjacentHTML('beforeend',BearLearningTools.favoriteButton(unit.id));BearLearningTools.bindFavorites(p);}
    window.BearGrowth?.feedbackButton(p.querySelector('.foundation-audio-actions'),unit.id);
    $('unit-prev').onclick=()=>{if(index>0)selectUnit(pool[index-1]);};$('unit-next').onclick=()=>{if(index<pool.length-1)selectUnit(pool[index+1]);};
    $('foundation-listen').onclick=playUnit;
    $('foundation-phonics')?.addEventListener('click',()=>BearFeatures.openPhonics(unit.id));
    if(tab==='words')$('foundation-chinese').onclick=()=>{mic.cancel();window.BearLesson.playFile(`${unit.zhAudio}.wav`,unit.zh);};
    if(tab==='phonemes')$('foundation-example').onclick=()=>{mic.cancel();window.BearLesson.play(unit.word);};
    $('foundation-record').disabled=!mic.available;
    if(!mic.available)$('foundation-record').textContent='当前窗口不支持录音，可自行跟读';
    const start=()=>{window.BearLesson.pause();mic.start({phrase:tab==='phonemes'?`${unit.display}，再读例词 ${unit.word}`:unit.label,words:[],recognize:false});};
    $('foundation-record').onclick=()=>{if(mic.state==='listening'){mic.finish();return;}if(consent)start();else window.BearLesson.requestConsent(()=>{consent=true;start();});};
    $('foundation-save-recording').onclick=()=>{save('recorded');};
    $('foundation-practiced').onclick=()=>{mic.cancel();save('practiced');};
  }
  function render(){
    const root=$('foundation-panel');root.innerHTML=`<div class="section-heading"><div><h2>基础学习</h2><p>听一听、看一看，再勇敢读出来。</p></div><span id="foundation-progress"></span></div>${navigation(tab)}<nav id="word-themes" class="word-themes category-rail" data-tab-level="secondary" aria-label="常用单词分类" ${tab==='words'?'':'hidden'}>${data.themeSections.flatMap(section=>section.ids).map(id=>{const t=data.themes.find(t=>t.id===id);return `<button data-word-theme="${t.id}" data-rail-key="${t.id}" aria-pressed="${t.id===theme}">${BearCategoryRail.label(t.emoji+' '+t.title,data.words.filter(u=>u.theme===t.id).length)}</button>`;}).join('')}</nav><button id="foundation-library-open" class="library-trigger" aria-haspopup="dialog">选择学习内容 ▾</button><div class="foundation-layout"><section id="foundation-player" class="foundation-player" aria-label="发音与跟读"></section><dialog id="foundation-library-dialog" class="foundation-library" aria-label="选择学习内容"><div class="section-title"><h3>${labels[tab][0]}小卡片</h3><span>${tab==='words'?'点选听英文＋中文':'点一张，开始练习'}</span><button id="foundation-library-close" aria-label="关闭卡片库">×</button></div><div id="foundation-unit-grid" class="foundation-unit-grid ${tab}"></div>${tab==='phonemes'?'<p class="source-note">真人音标录音：Philip Neal Whitman，<a href="https://ielp.ehe.osu.edu/sep/resources/interactive-ipa-charts/" target="_blank" rel="noopener">俄亥俄州立大学英语口语项目</a>。从官方英语图表无损提取，原文件未变速、变调或增益处理；家长空间可选择播放语速（保留音高）。辅音以 Cə、əCə 示范；/p t k/ 采用与例词词首一致的送气变体。CC BY-NC 非商业学习使用。<br>音标单音为同一位真人，例词跟随家长端所选音色。24 个入门音标，非完整课程。</p>':''}</dialog></div>`;
    BearPageLayout.categories(root,['.foundation-tabs','#word-themes']);
    $('foundation-library-open').onclick=()=>$('foundation-library-dialog').showModal();$('foundation-library-close').onclick=()=>$('foundation-library-dialog').close();syncLibrary();
    bindNavigation(root,tab);
    if(tab==='words')BearCategoryRail.mount(root.querySelector('#word-themes'),{selector:'[data-word-theme]',active:theme,surfaces:[root],ignore:'.category-rail,.feature-tabs,dialog',change(next){mic.cancel();BearLesson.pause();theme=next;unit=data.words.find(u=>u.theme===theme);render();playUnit();}});
    renderPlayer();renderList();$('foundation-progress').textContent=`本机已练习 ${Object.keys(window.BearLearning.foundation()).length} 项`;
  }
  window.BearFoundation={navigation,bindNavigation,tabs:()=>Object.entries(labels).map(([id,[title]])=>[id,title]),checkpoint:()=>({unitId:unit.id}),restore(saved){const u=[...data.letters,...data.phonemes,...data.words].find(x=>x.id===saved?.unitId);if(u){unit=u;tab=u.kind;theme=u.theme||theme;render();}},render,openTab(next){if(next==='sentences'){mic.cancel();BearSentenceBlocks.open();return;}if(next==='phonics'){mic.cancel();BearFeatures.openPhonics();return;}if(!['letters','phonemes','words'].includes(next))return;mic.cancel();BearLesson.pause();tab=next;unit=data[tab].find(u=>tab!=='words'||u.theme===theme);render();playUnit();},openUnit(id){const u=[...data.letters,...data.phonemes,...data.words].find(x=>x.id===id);if(!u)return;mic.cancel();window.BearLesson.pause();unit=u;tab=u.kind;theme=u.theme||theme;render();playUnit();},pause(){mic.cancel();const d=$('foundation-library-dialog');if(d?.open&&!wide.matches)d.close();},clear(){window.BearLearning.clearFoundation();render();}};
  window.addEventListener('bear:progress',()=>{if($('foundation-unit-grid')){
    const history=window.BearLearning.foundation();
    // Listening, favorites and settings do not change card practice marks.
    // Preserve these nodes and keyboard focus instead of rebuilding on every event.
    if(JSON.stringify(history)!==foundationSignature)renderList(history);
    $('foundation-progress').textContent=`本机已练习 ${Object.keys(history).length} 项`;
  }});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&mic.state==='listening')mic.finish();});
  window.addEventListener('pagehide',()=>mic.cancel());
})();
