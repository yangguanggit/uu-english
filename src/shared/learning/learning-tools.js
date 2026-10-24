/* Shared catalog, evidence-based review and weekly reporting. No raw speech is stored. */
(() => {
  const L=BearLearning,D=BEAR_FOUNDATIONS,S=LITTLE_BEAR_SCENES;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const word=id=>D.words.find(w=>w.id===id);
  function catalog(){return [...D.words.map(w=>({key:w.id,kind:'words',title:w.text,desc:w.zh+' '+w.ipa,icon:w.picture,terms:w.themeTitle,open(){BearHub.show('foundation');BearFoundation.openUnit(w.id);}})),...LITTLE_BEAR_ROUTE.map(id=>{const s=S[id];return {key:'scene:'+id,kind:'scenes',title:s.catalogTitle,desc:s.categoryTitle+' · '+s.speech.en,icon:s.emoji,terms:s.speech.zh+' '+s.dialogue.map(t=>t.answer+' '+t.zh).join(' '),open(){BearHub.show('scenes',{track:false});BearLesson.open(id);}};}),...BEAR_BOOKS.map(b=>({key:'book:'+b.id,kind:'books',title:b.title,desc:b.level+' · '+b.scene,icon:b.emoji,terms:b.pages.map(p=>p[1]+' '+p[2]).join(' '),open(){BearFeatures.openBook(b.id);}}))];}
  function validKey(key){return catalog().some(x=>x.key===key);}
  function mark(key){if(validKey(key))L.visit(key);}
  function favoriteMarkup(chosen){return `<svg class="favorite-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 3.5h10a1 1 0 0 1 1 1V21l-6-4-6 4V4.5a1 1 0 0 1 1-1Z"/></svg><span>${chosen?'已收藏':'收藏'}</span>`;}
  function favoriteButton(key){const chosen=L.get().favorites.includes(key);return `<button class="text-button favorite-content" data-favorite="${esc(key)}" aria-pressed="${chosen}" aria-label="${chosen?'取消收藏':'收藏'}">${favoriteMarkup(chosen)}</button>`;}
  function refreshFavorites(root, favorites=L.get().favorites){root.querySelectorAll('[data-favorite]').forEach(b=>{const chosen=favorites.includes(b.dataset.favorite);b.setAttribute('aria-pressed',String(chosen));b.setAttribute('aria-label',chosen?'取消收藏':'收藏');b.innerHTML=favoriteMarkup(chosen);});}
  function bindFavorites(root){root.querySelectorAll('[data-favorite]').forEach(b=>b.onclick=()=>{const chosen=b.getAttribute('aria-pressed')!=='true';L.favorite(b.dataset.favorite,chosen);refreshFavorites(root);root.dispatchEvent(new CustomEvent('bear:favorite-changed'));});}
  let favoriteSignature=JSON.stringify(L.get().favorites);
  window.addEventListener('bear:progress',()=>{
    const favorites=L.get().favorites,signature=JSON.stringify(favorites);
    if(signature===favoriteSignature)return;
    favoriteSignature=signature;refreshFavorites(document,favorites);
    document.querySelectorAll('.learning-library').forEach(box=>box.dispatchEvent(new CustomEvent('bear:favorite-changed')));
  });

  function mountSearch(root,options={}){
    const box=document.createElement('section');box.className='learning-library feature-card';
    box.innerHTML='<label class="library-search-label" for="library-search">搜索单词、场景或绘本</label><div class="library-search-bar"><input id="library-search" type="search" placeholder="输入英文或中文" autocomplete="off"><select id="library-kind" aria-label="内容类型"><option value="all">全部</option><option value="favorites">我的收藏</option><option value="recent">最近学过</option><option value="words">单词</option><option value="scenes">场景</option><option value="books">绘本</option></select></div><p id="library-count" role="status"></p><div id="library-results" class="library-results"></div><button class="text-button" id="library-more" hidden>再展示一些</button>';
    root.querySelector('.feature-heading').after(box);let filter=['recent','favorites','all','words','scenes','books'].includes(options.filter)?options.filter:'all',query=typeof options.query==='string'?options.query:'',limit=Number.isInteger(options.limit)?Math.max(12,Math.min(1000,options.limit)):12;
    box.querySelector('#library-search').value=query;
    const all=catalog();
    function draw(){Object.assign(options,{filter,query,limit});const state=L.get(),needle=query.toLowerCase();let pool=all.filter(x=>!needle||`${x.title} ${x.desc} ${x.terms}`.toLowerCase().includes(needle));
      if(filter==='favorites')pool=pool.filter(x=>state.favorites.includes(x.key));
      else if(filter==='recent')pool=state.recent.map(r=>pool.find(x=>x.key===r.key)).filter(Boolean);
      else if(filter!=='all')pool=pool.filter(x=>x.kind===filter);
      const kind=box.querySelector('#library-kind');kind.value=filter;BearSelect.refresh(kind);
      box.querySelector('#library-count').textContent=pool.length?`找到 ${pool.length} 项，展示 ${Math.min(limit,pool.length)} 项`:filter==='recent'?'学习过的内容会出现在这里。':filter==='favorites'?'点击内容旁的收藏书签，把想再练的内容收藏起来。':'暂时没找到，换个词试试。';
      box.querySelector('#library-results').innerHTML=pool.slice(0,limit).map(x=>`<div class="library-result"><button data-library-open="${esc(x.key)}"><span aria-hidden="true">${x.icon}</span><strong>${esc(x.title)}</strong><small>${esc(x.desc)}</small></button>${favoriteButton(x.key)}</div>`).join('');
      box.querySelector('#library-more').hidden=pool.length<=limit;
      box.querySelectorAll('[data-library-open]').forEach(b=>b.onclick=()=>{const entry=all.find(x=>x.key===b.dataset.libraryOpen);entry.open();});bindFavorites(box);
    }
    box.addEventListener('bear:favorite-changed',draw);
    BearSelect.mountAll(box);box.querySelector('#library-kind').onchange=e=>{filter=e.target.value;limit=12;draw();};
    box.querySelector('#library-search').oninput=e=>{query=e.target.value.trim();limit=12;draw();};box.querySelector('#library-more').onclick=()=>{limit+=24;draw();};draw();
  }
  function reviewItem(id){
    const w=word(id);if(w)return {id,kind:'单词',title:w.text,zh:w.zh,icon:w.picture,answer:w.id,choices:[w,...D.words.filter(x=>x.id!==id&&x.theme===w.theme).slice(0,2)].map(x=>({value:x.id,label:x.picture+' '+x.text})),play:()=>BearLesson.playFile(w.audio+'.wav',w.text)};
    if(id.startsWith('dialogue:')){const review=window.BearGrowth.reviewDialogue(id),turn=review?.turn;if(!turn)return null;const s=S[review.scene];return {id,kind:'场景回应',title:turn.npc,zh:turn.npcZh+' · '+turn.zh,icon:s.emoji,answer:turn.answer,choices:[...new Set([turn.answer,...review.turns.map(t=>t.answer)])].map(value=>({value,label:value})),play:()=>BearLesson.play(turn.npc)};}
    if(id.startsWith('scene:')){const s=S[id.slice(6)];if(!s)return null;return {id,kind:'场景句子',title:s.catalogTitle,zh:s.speech.zh,icon:s.emoji,answer:s.speech.en,choices:[...new Set([s.speech.en,...LITTLE_BEAR_ROUTE.map(k=>S[k].speech.en).filter(t=>t!==s.speech.en).slice(0,2)])].map(value=>({value,label:value})),play:()=>BearLesson.play(s.speech.en)};}
    if(id.startsWith('question:book:')){const b=BEAR_BOOKS.find(b=>b.id===id.slice(14));if(!b)return null;return {id,kind:'绘本理解',title:b.question,zh:b.question,icon:b.emoji,answer:b.answer,choices:b.choices.map(text=>{const w=D.words.find(w=>w.text===text);return {value:text,label:(w?.picture||'')+' '+text};}),play:()=>{const i=b.pages.length-1;BearLesson.playFile(b.pages[i][4]||`story-${b.id}-${i}.wav`,b.pages[i][1]);}};}
    return null;
  }
  const reviewEvidence=(id,x)=>!(id.startsWith('scene:')&&x?.summaryOnly===1);
  function reviewPool(limit=5){const state=L.get(),now=Date.now();const p=L.plan(),offlineIds=new Set([...BearCurriculum.words(p.theme).map(w=>w.id),...p.review,...p.learn,'scene:'+p.scene,'question:book:'+p.book,...[0,1,2].flatMap(i=>['dialogue:'+p.scene+':'+i,...(window.BEAR_SCENE_BRANCHES[p.scene]?.paths||[]).map((_,path)=>`dialogue:${p.scene}:${path}:${i}`)])]);const candidates=Object.entries(state.items).map(([id,x])=>({entry:reviewItem(id),x})).filter(x=>x.entry&&reviewEvidence(x.entry.id,x.x)&&(navigator.onLine||offlineIds.has(x.entry.id)));
    const due=candidates.filter(({x})=>x.due<=now),ranked=(due.length?due:candidates).sort((a,b)=>((b.x.wrong||0)+(b.x.hinted||0))-((a.x.wrong||0)+(a.x.hinted||0))||(a.x.due||0)-(b.x.due||0));const firstKinds=[...new Map(ranked.map(x=>x.entry.kind).map(kind=>[kind,ranked.find(x=>x.entry.kind===kind)])).values()];return [...firstKinds,...ranked.filter(x=>!firstKinds.includes(x))].slice(0,limit).map(x=>x.entry);
  }
  let reviewCheckpoint=()=>null;
  function validReview(saved){return saved&&Array.isArray(saved.ids)&&saved.ids.length>0&&saved.ids.length<=5&&saved.ids.every(id=>typeof id==='string'&&reviewItem(id))&&Number.isInteger(saved.index)&&saved.index>=0&&saved.index<=saved.ids.length;}
  function restoreReview(root,saved){if(!validReview(saved))return;mixedReview(root,saved.ids.map(reviewItem),()=>{if(saved.daily){L.task('review',saved.taskContext||null);BearFeatures.open('today');}else BearFeatures.open('review');},{saved,daily:saved.daily===true});}
  function mixedReview(root,pool,onDone,{saved=null,daily=false,taskContext=daily?L.taskContext():null}={}){let index=saved?.index||0,hinted=saved?.hinted===true,wrong=saved?.wrong===true,answered=saved?.answered===true;
    if(saved)taskContext=saved.taskContext||null;
    reviewCheckpoint=()=>({ids:pool.map(x=>x.id),index,hinted,wrong,answered,daily,taskContext});
    function render(){BearLesson.pause();const x=pool[index];if(!x){root.innerHTML='<section class="feature-card"><h2>这一轮复习完成啦！</h2><p>做过提示的内容会更早回来，下次继续练。</p><button id="mixed-done" class="continue-button">收好这次练习</button></section>';root.querySelector('#mixed-done').onclick=onDone;return;}
      root.innerHTML=`<div class="feature-heading"><span>🎒</span><div><h2>单词和句子，再见一面</h2><p>${index+1} / ${pool.length} · ${x.kind}</p></div></div><section class="quiz-card"><h3>${esc(x.kind==='单词'?'听声音，找到单词':x.title)}</h3><button id="mixed-listen" class="continue-button">♫ 再听示范</button><div class="mixed-choices">${[...x.choices].sort((a,b)=>a.value.localeCompare(b.value)).map(c=>`<button data-mixed-answer="${esc(c.value)}">${c.label}</button>`).join('')}</div><button id="mixed-hint" class="text-button">看看中文提示</button><p id="mixed-feedback" role="status"></p><button id="mixed-next" class="continue-button" hidden>${index+1===pool.length?'完成这一轮':'下一个'} →</button></section>`;
      const gate=BearGrowth.listenGate(root,x.play,[...root.querySelectorAll('[data-mixed-answer]')],'#mixed-feedback');root.querySelector('#mixed-listen').onclick=gate.play;root.querySelector('#mixed-hint').onclick=()=>{if(answered)return;hinted=true;L.record(x.id,'hinted');root.querySelector('#mixed-feedback').textContent=x.zh;};
      root.querySelectorAll('[data-mixed-answer]').forEach(b=>b.onclick=()=>{if(answered||!gate.ready())return;if(b.dataset.mixedAnswer!==x.answer){wrong=true;L.record(x.id,'wrong');root.querySelector('#mixed-feedback').textContent='再听一遍，想一想。';return;}answered=true;L.record(x.id,'selected',{hinted:hinted||wrong});if(word(x.id))BearGrowth.transfer(x.id,!hinted&&!wrong,'review');b.classList.add('selected');root.querySelector('#mixed-feedback').textContent=hinted||wrong?'找到啦，下次再巩固一下。':'这次独立选对啦！';root.querySelector('#mixed-next').hidden=false;});
      if(answered){root.querySelector('#mixed-next').hidden=false;root.querySelector('#mixed-feedback').textContent='这一题已经选对啦，可以继续。';}
      root.querySelector('#mixed-next').onclick=()=>{if(!answered||index>=pool.length)return;index++;hinted=false;wrong=false;answered=false;render();if(index===pool.length)BearGrowth.boundary();};gate.onSkip=()=>{gate.dispose();BearLesson.pause();answered=true;hinted=true;root.querySelector('#mixed-feedback').textContent='本题跳过，不计错；下次再听一听。';root.querySelector('#mixed-next').hidden=false;};if(!answered)gate.play();else gate.dispose();
    }
    BearNavigation.visit('mixed-review',render);render();
  }
  function week(){const state=L.get(),dates=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);dates.push(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);}
    const days=dates.map(date=>({date,...(state.activity[date]||{counts:{},ids:[]})})),counts={},ids=new Set();for(const day of days){Object.entries(day.counts).forEach(([k,v])=>counts[k]=(counts[k]||0)+v);day.ids.forEach(id=>ids.add(id));}
    const helped=new Set(days.flatMap(d=>d.helpIds||[]));
    const weak=[...helped].filter(id=>reviewItem(id)&&reviewEvidence(id,state.items[id])&&(state.items[id]?.streak||0)===0).sort((a,b)=>(state.items[a].due||0)-(state.items[b].due||0)).slice(0,5);
    return {days,counts,ids:[...ids],weak,active:days.filter(d=>d.ids.length).length,start:dates[0],end:dates.at(-1)};
  }
  function familyGame(weak){const id=weak[0]||BearLearning.plan().learn[0],entry=reviewItem(id),w=word(id);if(w)return `找找看：把${w.zh}和另一件物品放在一起，家长说“${w.text}”，让孩子找出来，再交换角色。`;
    const sceneId=id.startsWith('dialogue:')?window.BearGrowth.parseDialogueKey(id)?.scene:id.startsWith('scene:')?id.slice(6):null;
    if(sceneId&&S[sceneId])return S[sceneId].parent.tip;
    return `故事接龙：一起回忆“${entry?.title||'今天的故事'}”，让孩子指图片或用一个英文词回应，再交换角色。`;
  }
  function weeklyMarkup(){const w=week();return `<section class="feature-card weekly-report"><h3>最近七天 · 陪伴小报告</h3><p>${w.start} 至 ${w.end} · 本地日期</p><div class="weekly-summary"><span>练习 ${w.active} 天</span><span>接触 ${w.ids.length} 项内容</span><span>选择正确 ${w.counts.selected||0} 次</span></div><div class="weekly-days">${w.days.map(d=>`<div><small>${d.date.slice(5)}</small><strong>${d.ids.length}</strong><span>项内容</span></div>`).join('')}</div><p>自行跟读 ${w.counts.practiced||0} 次 · 录音 ${w.counts.recorded||0} 次 · 提示后识别 ${w.counts.recognized||0} 次 · 无提示识别 ${w.counts.independent||0} 次</p><h4>${w.weak.length?'接下来一起巩固':'下一次可以这样陪练'}</h4><p>${w.weak.length?w.weak.map(id=>esc(reviewItem(id).title)).join(' / '):'选今天主题中的一个词，在生活里指一指、说一说。'}</p><button id="weekly-review" class="text-button">${w.weak.length?'开始这些内容的巩固':'查看今天的路线'} →</button><h4>本周亲子小游戏</h4><p>${esc(familyGame(w.weak))}</p><p class="report-note">周报从本版本开始按日记载；旧记录保留在累计统计中。次数仅描述活动，不代表掌握程度或发音质量。</p></section>`;}
  window.BearLearningTools={reviewCheckpoint:()=>reviewCheckpoint(),validReview,restoreReview,catalog,validKey,mark,favoriteButton,bindFavorites,mountSearch,reviewItem,reviewPool,mixedReview,week,weeklyMarkup};
})();
