(() => {
  const $=id=>document.getElementById(id),categories=window.BEAR_CATEGORIES,scenes=window.LITTLE_BEAR_SCENES;
  const totalGames=categories.reduce((sum,c)=>sum+c.games.length,0);
  document.querySelectorAll('[data-section="scenes"] small').forEach(el=>el.textContent=`${categories.length} 类场景 · ${totalGames} 个小任务`);
  let section='foundation',categoryId=categories[0].id,simulation=null,simulationScope='learned';
  function stop(){window.BearFeatures?.pause();window.BearFoundation.pause();window.BearLesson.pause();}
  function show(next,{track=true}={}){
    stop();if(next!=='extras')window.BearNavigation?.section(next);document.body.classList.remove('home-landing','explore-open','reading-immersive');section=next;document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',next!=='extras'&&b.dataset.nav==='adventure'));document.title=`UU说英语 · ${{foundation:'基础学习',scenes:'场景游戏',simulation:'场景模拟',extras:'探索工坊'}[next]}`;
    document.querySelectorAll('[data-section]').forEach(b=>{b.classList.toggle('active',b.dataset.section===next);b.setAttribute('aria-pressed',String(b.dataset.section===next));});
    $('foundation-panel').hidden=next!=='foundation';$('catalog-panel').hidden=next!=='scenes';$('simulation-panel').hidden=next!=='simulation';$('lesson-workspace').hidden=true;$('features-panel').hidden=next!=='extras';
    if(next==='foundation')window.BearFoundation.render();
    if(next==='scenes')renderCatalog();
    if(next==='simulation')renderSimulationHome();
    if(next!=='extras'&&track)window.BearNavigation?.visit('section:'+next,()=>show(next),{tab:'explore'});
    document.querySelector('.greeting-copy').textContent={foundation:'从一个声音开始，慢慢认识英语的小世界。',scenes:'先选一个地方，再和米米完成五个日常交流小游戏。',extras:'从今天的小任务出发，听、说、读、玩，每一次尝试都有小收获。',simulation:'把练过的英语带进生活，去不同情境里和朋友聊一聊。'}[next];
  }
  function renderCatalog(){
    const selected=categories.find(c=>c.id===categoryId),groups=window.BEAR_CATEGORY_SECTIONS,groupIndex=groups.findIndex(g=>g.ids.includes(categoryId)),group=groups[groupIndex];
    const history=BearLearning.get().items;const practiced=id=>{const x=history['scene:'+id];return !!(x?.practiced||x?.recorded||x?.recognized||x?.independent);};const resume=selected.games.find(id=>!practiced(id))||selected.games[0];
    $('catalog-panel').innerHTML=`<div class="section-heading"><div><p class="eyebrow">LITTLE ENGLISH, EVERYWHERE</p><h2>场景游戏</h2><p>${categories.length} 类场景与主题 · 每类 5 关 · 共 ${totalGames} 个小游戏</p></div></div><nav class="category-rail scene-groups" id="scene-groups" aria-label="场景大分类">${groups.map((g,i)=>`<button data-scene-group="${i}" data-rail-key="${i}" aria-pressed="${i===groupIndex}">${g.title}</button>`).join('')}</nav><nav class="category-rail scene-categories" data-tab-level="secondary" id="category-grid" aria-label="${group.title}小分类">${group.ids.map(id=>{const c=categories.find(c=>c.id===id);return `<button data-category="${c.id}" data-rail-key="${c.id}" aria-pressed="${c.id===categoryId}">${BearCategoryRail.label(c.emoji+' '+c.title,c.games.length)}</button>`;}).join('')}</nav><div class="scene-catalog-layout"><section class="scene-overview"><span aria-hidden="true">${selected.emoji}</span><h3>${selected.title}</h3><p>${selected.description}</p><button class="continue-button" data-resume-game="${resume}">从第 ${selected.games.indexOf(resume)+1} 关练起 →</button><small>五个任务，也可以自由选择</small></section><div id="game-select" class="game-select scene-task-list">${selected.games.map((id,index)=>{const game=scenes[id];return `<button data-game="${id}" class="game-card"><span class="game-number">0${index+1}</span><span class="game-emoji">${game.emoji}</span><strong>${game.catalogTitle}</strong><small>${game.speech.en}</small><span class="game-start">${practiced(id)?'练习过 · 再试试':'开始 →'}</span></button>`;}).join('')}</div></div>`;
    BearPageLayout.categories($('catalog-panel'),['#scene-groups','#category-grid']);
    BearCategoryRail.mount($('scene-groups'),{selector:'[data-scene-group]',active:String(groupIndex),change(next){categoryId=groups[Number(next)].ids[0];renderCatalog();window.BearNavigation?.save();}});
    BearCategoryRail.mount($('category-grid'),{selector:'[data-category]',active:categoryId,surfaces:[$('catalog-panel')],ignore:'.category-rail,.feature-tabs',change(next){categoryId=next;renderCatalog();window.BearNavigation?.save();}});
    $('catalog-panel').querySelectorAll('[data-game],[data-resume-game]').forEach(b=>b.onclick=()=>{stop();window.BearLesson.open(b.dataset.game||b.dataset.resumeGame);$('lesson-workspace').scrollIntoView({block:'start',behavior:'instant'});});
  }
  function lessonChanged(id,mode){
    if(section==='simulation'&&mode==='simulation'&&simulation){
      simulation.games[simulation.index]=id;
      simulation.results=simulation.results.slice(0,simulation.index);
      renderSimulationBar();
    }
    const game=scenes[id];categoryId=game.categoryId;window.BearNavigation?.visit('lesson:'+mode,()=>{show(mode==='simulation'?'simulation':'scenes',{track:false});window.BearLesson.open(id,mode==='simulation');},{tab:'explore'});
    if(section==='scenes'&&mode==='game'){$('catalog-panel').hidden=true;$('lesson-workspace').hidden=false;$('scene-picker').hidden=false;$('back-catalog').textContent=`← 返回${game.categoryTitle}关卡选择`;}
    if(section==='simulation'&&mode==='simulation'){$('lesson-workspace').hidden=false;$('scene-picker').hidden=true;$('back-catalog').textContent='← 返回场景模拟';}
  }
  function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function renderSimulationHome(){
    $('simulation-panel').innerHTML=`<div class="simulation-intro"><span class="simulation-art" aria-hidden="true">🧳</span><p class="eyebrow">A LITTLE REAL-WORLD ADVENTURE</p><h2>下一站，会遇见谁？</h2><p>选择练习范围，最多去 5 个不同场景。<br>每到一站，听对方说，试着回应三轮。</p><div class="feature-tabs simulation-scopes" aria-label="场景练习范围">${[['learned','练过的场景'],['today','今天主题'],['all','全部随机']].map(([id,title])=>`<button data-simulation-scope="${id}" data-rail-key="${id}" aria-pressed="${simulationScope===id}">${title}</button>`).join('')}</div><p id="simulation-scope-note" role="status"></p><div class="simulation-stops">🏡 <span>···</span> 🚇 <span>···</span> 🎡 <span>···</span> 📚</div><button class="continue-button" id="start-simulation">带上英语，随机出发 →</button><small>有示范、有回应提示，也能录音回听。按情境练交流。</small></div>`;
    BearCategoryRail.mount($('simulation-panel').querySelector('.simulation-scopes'),{selector:'[data-simulation-scope]',active:simulationScope,surfaces:[$('simulation-panel')],ignore:'.category-rail,.feature-tabs',change(next){simulationScope=next;renderSimulationHome();window.BearNavigation?.save();}});
    const state=BearLearning.get(),learned=id=>Object.keys(state.items).some(key=>key==='scene:'+id||key.startsWith('dialogue:'+id+':'));
    const eligible=simulationScope==='today'?[BearLearning.plan().scene]:window.LITTLE_BEAR_ROUTE.filter(id=>simulationScope==='all'||learned(id));
    $('simulation-scope-note').textContent=eligible.length?`${eligible.length} 个可练任务；优先巩固需要提示的内容。`:'还没有练过的场景，先玩场景游戏，或选择「今天主题」「全部随机」。';
    $('start-simulation').disabled=!eligible.length;
    $('start-simulation').onclick=()=>{
      const score=id=>Object.entries(state.items).filter(([key])=>key==='scene:'+id||key.startsWith('dialogue:'+id+':')).reduce((n,[,x])=>n+(x.wrong||0)+(x.hinted||0),0);
      const pool=shuffled(categories).map(c=>({...c,games:shuffled(c.games.filter(id=>eligible.includes(id)))})).filter(c=>c.games.length);
      if(simulationScope!=='all')pool.sort((a,b)=>Math.max(...b.games.map(score))-Math.max(...a.games.map(score)));
      const games=pool.slice(0,5).map(c=>simulationScope==='all'?c.games[0]:c.games.sort((a,b)=>score(b)-score(a))[0]);
      simulation={games,index:0,results:[]};openSimulation();
    };
  }
  function renderSimulationBar(){
    const game=scenes[simulation.games[simulation.index]];
    $('simulation-panel').innerHTML=`<div class="simulation-bar"><div><span class="foundation-tag" id="simulation-position">场景模拟 · 第 ${simulation.index+1}/${simulation.games.length} 站 · ${simulation.round===3?'已完成 3/3 轮':`第 ${(simulation.round||0)+1}/3 轮`}</span><h2>${game.emoji} ${game.categoryTitle} · ${game.catalogTitle}</h2><p>本站共三轮，听对方说，再用英语回应。${simulation.index===simulation.games.length-1?'完成后收好本次交流小结。':'完成后可以前往下一站。'}</p></div><div class="simulation-dots" aria-label="已完成 ${simulation.results.length} 个场景">${simulation.games.map((id,i)=>`<span class="${i<simulation.results.length?'done':i===simulation.index?'current':''}">${i<simulation.results.length?'✓':i+1}</span>`).join('')}</div></div>`;
  }
  function openSimulation(){stop();simulation.round=0;renderSimulationBar();window.BearLesson.open(simulation.games[simulation.index],true);}
  function simulationCompleted(id,modes){
    if(!simulation||simulation.results.length!==simulation.index)return;
    simulation.games[simulation.index]=id;
    simulation.results.push({sceneId:id,modes:[...modes]});renderSimulationBar();
    if(simulation.index===simulation.games.length-1)document.getElementById('continue-button').textContent='完成这次交流 →';
  }
  function nextSimulation(){
    if(!simulation){window.BearFeatures?.open('today');return;}
    if(simulation.results.length!==simulation.index+1)return;
    if(simulation.index<simulation.games.length-1){simulation.index++;openSimulation();return;}
    stop();$('lesson-workspace').hidden=true;
    const recorded=simulation.results.flatMap(r=>r.modes).filter(m=>m==='recorded').length,recognized=simulation.results.flatMap(r=>r.modes).filter(m=>m==='recognized').length;
    $('simulation-panel').innerHTML=`<div class="simulation-intro"><span class="simulation-art">🌟</span><h2>${simulation.games.length} 站交流，完成啦！</h2><p>你在 ${simulation.games.length} 个不同场景或主题，完成了 ${simulation.games.length*3} 轮小交流。</p><div class="simulation-recap">${simulation.results.map(r=>`<span>${scenes[r.sceneId].emoji} ${scenes[r.sceneId].categoryTitle}</span>`).join('')}</div><p class="source-note">${recognized} 轮识别到目标词，${recorded} 轮完成录音，其余为自行跟读。均未评估发音或独立交流能力。</p><button class="continue-button" id="restart-simulation">再来一次随机冒险 →</button><button class="text-button" id="return-games">回到场景游戏</button></div>`;
    $('restart-simulation').onclick=()=>{renderSimulationHome();$('start-simulation').click();};$('return-games').onclick=()=>show('scenes');
  }
  document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>show(b.dataset.section));
  document.querySelectorAll('[data-nav="adventure"]').forEach(b=>b.onclick=()=>{show('scenes');$('learning-modes').scrollIntoView({block:'start',behavior:'instant'});});
  $('back-catalog').onclick=()=>window.BearNavigation.back();
  function dialogueProgress(completed){
    if(!simulation)return '';
    simulation.round=completed;
    const position=`第 ${simulation.index+1}/${simulation.games.length} 站`;
    const label=$('simulation-position');
    if(label)label.textContent=`场景模拟 · ${position} · ${completed===3?'已完成 3/3 轮':`第 ${completed+1}/3 轮`}`;
    return position;
  }
  window.BearHub={checkpoint:()=>structuredClone({categoryId,simulationScope,simulation}),
    restore(saved){if(!saved)return;if(categories.some(c=>c.id===saved.categoryId))categoryId=saved.categoryId;if(['learned','today','all'].includes(saved.simulationScope))simulationScope=saved.simulationScope;
      const s=saved.simulation;
      if(s&&Array.isArray(s.games)&&s.games.length>0&&s.games.length<=5&&s.games.every(id=>Object.hasOwn(scenes,id))&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.games.length&&Array.isArray(s.results))simulation=structuredClone(s);
      if(section==='scenes')renderCatalog();if(section==='simulation')renderSimulationHome();
    },show,lessonChanged,simulationCompleted,nextSimulation,dialogueProgress,openDailyExchange(id){show('simulation',{track:false});simulation=null;window.BearLesson.open(id,true,1,true);}};
  show('foundation');
})();
