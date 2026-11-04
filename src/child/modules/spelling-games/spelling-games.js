/* Play styles share curated sound/spelling targets and the existing media player. */
(() => {
  'use strict';
  const modes = [['puzzle', '🧩', '拼图小工坊', '点选字母组合或短语，把声音拼完整'], ['moles', '🌱', '打地鼠', '听一听，找到下一块，接成单词或句子'], ['blocks', '🧱', '方块拼拼乐', '移动下落方块，落到对应的位置'], ['match', '✨', '双语消消乐', '英文和中文，找到一对就消除'], ['memory', '🎴', '记忆翻翻卡', '翻开两张卡，记住它们，找到好朋友'], ['treasure', '🏝️', '听音寻宝', '听英文线索，带 UU 走到对应的宝箱'], ['balloons', '🎈', '气球接龙', '接住正确的气球，把单词和句子串起来'], ['bingo', '🌟', '声音宾果', '听声音，找格子，集齐一条线的印章'], ['train', '🚂', '词句小火车', '自由排好车厢，检查顺序后发车'], ['detective', '🔎', '声音小侦探', '听正确示范，找出被换错的一块']];
  const kinds = [['words', '单词'], ['sentences', '句子']];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const shuffle = items => { const a = [...items]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const maps = new Map(BEAR_PHONICS_DATA.map(row => [row.id, row]));
  const catalogCache = new Map();
  function targets(kind, group) {
    const key=kind+':'+group;if(catalogCache.has(key))return catalogCache.get(key);
    const rows=makeTargets(kind,group);catalogCache.set(key,rows);return rows;
  }
  function makeTargets(kind, group) {
    if (kind === 'sentences') return BEAR_SENTENCE_PATTERNS.filter(p => !group || p.id === group).flatMap(p => p.examples.map((e, i) => ({id:p.id+':'+i, text:e.text, zh:e.zh, picture:'💬', chunks:e.blocks, files:[{file:e.file,label:e.text}], pattern:p.id, example:i})));
    return BEAR_FOUNDATIONS.words.filter(w => !group || w.theme === group).map(w => ({id:w.id, text:w.text, zh:w.zh, picture:w.picture, chunks:maps.get(w.id).parts.filter(p=>p.text.trim()&&p.text!=='-').map(p=>p.text), files:[{file:w.audio+'.wav',label:w.text},{file:w.zhAudio+'.wav',label:w.zh}]}));
  }
  const chunkCache=new Map();
  function allChunks(kind){if(!chunkCache.has(kind))chunkCache.set(kind,[...new Set(targets(kind,'').flatMap(row=>row.chunks))]);return chunkCache.get(kind);}
  window.BearSpellingGames = {
    targets,
    create({root, heading, open}) {
      let mode='puzzle', kind='words', group='', level=null, buddy='bear', game=null, timer=null, matchSelection=null, matchLocked=false, drag=null;
      const effects=new Set();
      function later(fn,ms){const id=setTimeout(()=>{effects.delete(id);fn();},ms);effects.add(id);}
      function feedback(ok,count=true){if(game&&count){BearGameAdventure.hit(game,ok);BearGameAdventure.paint(root,game,mode);}const board=$('spelling-board');if(!board)return;board.querySelector('.spelling-pop')?.remove();if(ok){const pop=document.createElement('span');pop.className='spelling-pop';pop.textContent=game.cheer.streak>0&&game.cheer.streak%3===0?'🌟 连击！点亮一颗星光':'✦ 接好啦！';pop.setAttribute('aria-hidden','true');board.append(pop);later(()=>pop.remove(),700);}board.classList.remove('is-hit','is-miss');void board.offsetWidth;board.classList.add(ok?'is-hit':'is-miss');later(()=>board.classList.remove('is-hit','is-miss'),600);}
      const levels=BearGameLevels.levels;
      const progressKey=()=>BearGameLevels.key(mode,kind,group);
      const cleared=()=>BearLearning.get().growth.spelling?.[progressKey()]||[];
      const unlocked=()=>Math.min(cleared().length,levels.length-1);
      const difficulty=()=>levels[game?.level??level??0];
      const levelPool=()=>BearGameLevels.pool(targets(kind,group),kind,game?.level??level??0);
      function markLevel(){if(!cleared().includes(game.level))BearLearning.growth('spellingStage',{key:progressKey(),level:game.level});}
      function startLevel(next=level){
        if(!BearGameLevels.validLevel(next)||next>unlocked())return;
        level=next;const pool=BearGameLevels.pool(targets(kind,group),kind,level),ids=shuffle(pool).slice(0,levels[level].questions).map(row=>row.id);
        if(!ids.length)return;
        game={mode,kind,group,level,cheer:BearGameAdventure.create(buddy),ids,index:0,filled:[],order:[],queue:[],column:0,fall:0,running:false,done:false,finished:false,hinted:false};prepare();enter();
      }
      function matchTargets(id=target()?.id){const pool=levelPool(),start=pool.findIndex(t=>t.id===id),rows=[];const count=['match','memory'].includes(mode)?difficulty().pairs:3;for(let i=0;i<pool.length&&rows.length<count;i++){const row=pool[(start+i)%pool.length];if(rows.every(other=>other.text!==row.text&&other.zh!==row.zh))rows.push(row);}return rows;}
      function makeBingoBoard(){
        const requests=matchTargets(),rows=[...requests];
        for(const row of shuffle(levelPool())){if(rows.length>=difficulty().bingo)break;if(rows.every(other=>other.text!==row.text&&other.zh!==row.zh))rows.push(row);}
        const positions=rows.length===9?[0,4,8]:[0,1,2],required=shuffle(requests),others=shuffle(rows.filter(row=>!requests.includes(row)));
        return rows.map((_,i)=>positions.indexOf(i)>=0&&positions.indexOf(i)<required.length?required[positions.indexOf(i)].id:others.shift().id);
      }
      function recordTarget(row){
        if(kind==='words')BearLearning.record(row.id,'selected',{hinted:true});
        else {const previous=structuredClone(BearLearning.get().growth.lab?.sentences[row.pattern]||{choice:0,order:[],completed:[],attempts:0});if(!previous.completed.includes(row.example))previous.completed.push(row.example);previous.attempts=Math.min(1000000,previous.attempts+1);BearPracticeDrafts.save('sentences',row.pattern,previous);}
      }
      const $ = id => root.querySelector('#'+id);
      function pause() { effects.forEach(clearTimeout);effects.clear();matchSelection=null;matchLocked=false;drag=null;root.querySelector('.spelling-drag-ghost')?.remove();root.querySelector('.spelling-pop')?.remove();root.querySelector('#spelling-board')?.classList.remove('is-hit','is-miss');root.querySelectorAll('.spelling-match-card.is-faceup:not(.is-cleared)').forEach(card=>{card.classList.remove('is-faceup');card.setAttribute('aria-label','未翻开的卡片');});root.querySelectorAll('.spelling-match-card.is-selected').forEach(card=>{card.classList.remove('is-selected');card.setAttribute('aria-pressed','false');});clearInterval(timer); timer=null; if(game)game.running=false; if(game&&$('spelling-running'))updateFall(); }
      function groups() { return kind==='words'?BEAR_FOUNDATIONS.themes:BEAR_SENTENCE_PATTERNS; }
      function menu() {
        return `<nav class="category-rail spelling-modes" aria-label="拼读游戏玩法">${modes.map(([id,icon,title])=>`<button data-spelling-mode="${id}" data-rail-key="${id}" aria-pressed="${mode===id}">${icon} ${title}</button>`).join('')}</nav><nav class="category-rail spelling-kinds" data-tab-level="secondary" aria-label="拼读游戏内容">${kinds.map(([id,title])=>`<button data-spelling-kind="${id}" data-rail-key="${id}" aria-pressed="${kind===id}">${BearCategoryRail.label(title,targets(id,'').length)}</button>`).join('')}</nav>`;
      }
      function bindMenus(playing=false) {
        BearPageLayout.categories(root,['.spelling-modes','.spelling-kinds']);
        BearCategoryRail.mount(root.querySelector('.spelling-modes'),{selector:'[data-spelling-mode]',active:mode,change(next){pause();mode=next;level=null;game=null;if(playing)open('spelling-games');else renderHome();BearNavigation.save();}});
        BearCategoryRail.mount(root.querySelector('.spelling-kinds'),{selector:'[data-spelling-kind]',active:kind,surfaces:[root],ignore:'.category-rail,.feature-tabs,[data-no-category-swipe]',change(next){pause();kind=next;group='';level=null;game=null;if(playing)open('spelling-games');else renderHome();BearNavigation.save();}});
      }
      function renderHome() {
        pause();
        if(level===null||level>unlocked())level=unlocked();
        const pool=targets(kind,group),stagePool=BearGameLevels.pool(pool,kind,level),count=Math.min(levels[level].questions,stagePool.length),selected=modes.find(x=>x[0]===mode);
        root.innerHTML=heading('🎮','拼读游戏','先听声音，再拼单词、串句子。从萌芽岛到梦想星，完成一关，再向前一步。')+menu()+`<section class="feature-card spelling-start"><span class="spelling-mascot" aria-hidden="true">${selected[1]}</span><div class="spelling-preview" aria-hidden="true">${mode==='train'?'<span>🚂 I</span><span>like</span><span>apples.</span>':mode==='bingo'?'<span>☆</span><b>→</b><span>🌟</span>':mode==='detective'?'<span>🔎</span><b>→</b><span>✓</span>':mode==='memory'?'<span>?</span><b>↔</b><span>?</span>':mode==='treasure'?'<span>🧸 UU</span><b>→</b><span>🎁</span>':mode==='balloons'?'<span>🎈 c</span><span>🎈 a</span><span>🎈 t</span>':mode==='match'?'<span>apple</span><b>✨</b><span>苹果</span>':mode==='moles'?'<span>🐹 c</span><span>🐹 a</span><span>🐹 t</span>':'<span>c</span><span>a</span><span>t</span>'}</div><h3>${selected[2]} · ${kind==='words'?'拼单词':'串句子'}</h3><p>${selected[3]}</p>${BearGameAdventure.picker(buddy)}<label>选择练习范围<select id="spelling-group" aria-label="拼读游戏练习范围"><option value="">全部${kind==='words'?'单词':'句型'}</option>${groups().map(g=>`<option value="${g.id}" ${g.id===group?'selected':''}>${esc(BearCategoryRail.label(g.title,targets(kind,g.id).length))}</option>`).join('')}</select></label><nav class="game-levels category-rail" aria-label="游戏关卡">${levels.map((stage,i)=>`<button data-game-level="${i}" data-rail-key="${i}" aria-pressed="${level===i}" ${i>unlocked()?'disabled':''}><span>${i>unlocked()?'🔒':cleared().includes(i)?'✓':stage.icon} 第 ${i+1} 关 · ${stage.name}</span><small>${Math.min(stage.questions,BearGameLevels.pool(pool,kind,i).length)} 题${cleared().includes(i)?' · 已通关':''}</small></button>`).join('')}</nav><p>${pool.length} ${kind==='words'?'个单词':'句表达'} · 第 ${level+1} 关 ${count} 题${count<levels[level].questions?'（所选范围题量有限，可切换全部内容）':''}</p><p class="source-note">按积木数量、长度和特殊拼读组合逐步加难；可重听、提示，通关不等于口语达标。</p><button id="spelling-start" class="continue-button">挑战第 ${level+1} 关 · ${count} 题 →</button>${game&&game.level===level&&game.mode===mode&&game.kind===kind&&game.group===group?'<button id="spelling-resume" class="text-button">继续刚才这一关 →</button>':''}<p class="source-note">不赶时间，答错也没关系。听一听，再试一次。</p></section>`;
        bindMenus();BearSelect.mountAll(root);root.querySelectorAll('[data-game-buddy]').forEach(button=>button.onclick=()=>{buddy=button.dataset.gameBuddy;root.querySelectorAll('[data-game-buddy]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));if(game)game.cheer.buddy=buddy;save();});
        $('spelling-group').onchange=e=>{group=e.target.value;level=null;game=null;renderHome();BearNavigation.save();};
        BearCategoryRail.mount(root.querySelector('.game-levels'),{selector:'[data-game-level]',active:String(level),change(next){if(Number(next)>unlocked())return;level=Number(next);game=null;renderHome();save();}});
        $('spelling-start').onclick=()=>startLevel();
        if($('spelling-resume'))$('spelling-resume').onclick=enter;
      }
      const target = () => targets(kind,group).find(x=>x.id===game?.ids[game.index]);
      function prepare() {const t=target();game.train=[];game.spotIndex=Math.floor(Math.random()*t.chunks.length);const alternatives=allChunks(kind).filter(text=>text!==t.chunks[game.spotIndex]);game.spotWrong=alternatives[Math.floor(Math.random()*alternatives.length)];game.bingoBoard=mode==='bingo'?makeBingoBoard():[];game.matches=[];game.deck=shuffle(matchTargets().flatMap((_,i)=>[i*2,i*2+1]));game.chestOrder=shuffle(matchTargets().map((_,i)=>i));game.position=4;game.filled=[];game.order=[];game.queue=shuffle(t.chunks.map((_,i)=>i));game.column=0;game.fall=0;game.running=false;game.done=false;game.finished=false;game.hinted=false;}
      function enter() {open('spelling-games');if(game.finished)renderResult();else draw();BearNavigation.visit('spelling:play',enter,{tab:'explore'});}
      function play() {const t=mode==='bingo'&&!game.done?matchTargets()[game.matches.length]:target();if(t)BearLesson.playFiles(['treasure','bingo'].includes(mode)&&!game.done?[t.files[0]]:t.files);}
      function status(text) {if($('spelling-status'))$('spelling-status').textContent=text;}
      function save() {BearNavigation.save();}
      function complete() {
        if(game.done)return;
        game.done=true;feedback(true,false);game.running=false;clearInterval(timer);timer=null;
        const t=target();
        recordTarget(t);
        if(game.index===game.ids.length-1)markLevel();
        update();status(mode==='bingo'?'宾果！集齐印章啦，再跟着读一读。':mode==='train'?'车厢接好，UU 的小火车出发啦！':mode==='detective'?'线索修好啦！一起听正确示范。':mode==='treasure'?'找到宝藏啦！听示范，再跟着说一说。':mode==='memory'||mode==='match'?'全部配对成功！一起再读一遍。':'拼好啦！听完整示范，再跟着读一读。');play();save();BearGrowth.boundary?.();
      }
      function choose(index) {
        if(game.done)return;
        const t=target(),next=game.filled.length;
        if(t.chunks[index]!==t.chunks[next]){feedback(false);game.hinted=true;status('再听一听，找下一块。也可以点「看一眼提示」。');save();return;}
        if(game.order.includes(index))return;
        feedback(true);game.order.push(index);game.filled.push(next);update();status('接上啦，继续找下一块！');
        if(game.filled.length===t.chunks.length)complete();else save();
      }
      function drop() {
        if(!game||game.done||!$('spelling-falling'))return;
        const t=target(),piece=game.queue[0],slot=game.column;
        game.fall=0;
        if(game.filled.includes(slot)||t.chunks[slot]!==t.chunks[piece]){feedback(false);game.hinted=true;status('这里还不合适，移动到空着的对应位置再落下。');update();save();return;}
        feedback(true);game.filled.push(slot);game.queue.shift();status('稳稳落好一块！');
        if(game.filled.length===t.chunks.length)complete();else{update();save();}
      }
      function move(delta) {if(!game||game.done)return;game.column=Math.max(0,Math.min(target().chunks.length-1,game.column+delta));updateFall();save();}
      function updateFall() {const tile=$('spelling-falling');if(!tile||!game)return;const t=target();if(!t)return;tile.textContent=t.chunks[game.queue[0]]||'';tile.style.setProperty('--column',game.column);tile.style.setProperty('--fall',Math.min(game.fall,90)+'%');const scroll=root.querySelector('.spelling-drop-scroll'),tileBox=tile.getBoundingClientRect(),view=scroll.getBoundingClientRect();if(tileBox.left<view.left||tileBox.right>view.right)scroll.scrollLeft+=tileBox.left-view.left-(scroll.clientWidth-tileBox.width)/2;$('spelling-left').disabled=game.column===0||game.done;$('spelling-right').disabled=game.column===t.chunks.length-1||game.done;$('spelling-drop').disabled=game.done;$('spelling-running').disabled=game.done;$('spelling-running').textContent=game.running?'暂停下落':'开始自动下落';}
      function toggleRunning() {
        if(game.done)return;game.running=!game.running;clearInterval(timer);timer=null;
        if(game.running)timer=setInterval(()=>{if(document.hidden||document.querySelector('dialog:modal')||!root.querySelector('#spelling-board')){game.running=false;clearInterval(timer);timer=null;updateFall();return;}game.fall+=2;if(game.fall>=90)drop();else updateFall();},180);
        updateFall();save();
      }
      function update() {
        const t=target(),slots=$('spelling-slots');BearGameAdventure.paint(root,game,mode);
        slots.innerHTML=t.chunks.map((text,i)=>`<span data-spelling-slot="${i}" class="${game.filled.includes(i)?'filled':i===game.filled.length?'is-next':''}" aria-label="第 ${i+1} 块${game.filled.includes(i)?' '+esc(text):'，空位'}">${game.filled.includes(i)?esc(text):i+1}</span>`).join('');
        const arena=$('spelling-arena');
        if(mode==='match'||mode==='memory'){
          slots.hidden=true;
          const rows=matchTargets(),cards=game.deck.map(index=>({row:rows[Math.floor(index/2)],side:index%2?'zh':'en'}));
          arena.innerHTML=`<div class="spelling-match-grid ${mode==='memory'?'memory-grid':''}">${cards.map(({row,side})=>`<button data-match-id="${esc(row.id)}" data-match-side="${side}" aria-label="${mode==='memory'&&!game.matches?.includes(row.id)?'未翻开的卡片':esc(side==='en'?row.text:row.zh)}" class="spelling-match-card ${mode==='memory'?'memory-card':''} ${game.matches?.includes(row.id)?'is-cleared':''}" ${game.matches?.includes(row.id)||game.done?'disabled':''} lang="${side==='en'?'en':'zh'}"><small>${side==='en'?'EN · 英文':'中 · 释义'}</small><strong>${esc(side==='en'?row.text:row.zh)}</strong>${mode==='memory'?'<span class="memory-back" aria-hidden="true">✦<small>UU</small></span>':''}<span class="match-spark" aria-hidden="true">✦</span></button>`).join('')}</div>`;
          arena.querySelectorAll('[data-match-id]').forEach(button=>button.onclick=()=>selectMatch(button));
        }
        if(mode==='bingo'){slots.hidden=true;BearSpellingBoards.bingo({arena,game,goal:matchTargets().length,rows:game.bingoBoard.map(id=>targets(kind,group).find(row=>row.id===id)),onPick(row){const requests=matchTargets();if(row.id!==requests[game.matches.length].id){game.hinted=true;feedback(false);status('再听听这一个声音，找对应的格子。');save();return;}game.matches.push(row.id);$('spelling-answer').hidden=true;feedback(true);if(row.id!==t.id)recordTarget(row);if(game.matches.length===requests.length){game.filled=t.chunks.map((_,i)=>i);complete();}else{update();status('盖好一个印章，听听下一个声音！');play();save();}}});}
        if(mode==='train'){slots.hidden=true;BearSpellingBoards.train({arena,game,target:t,onChange(){update();status('车厢可以取下重排，排好后再发车。');save();},onCheck(){if(game.train.length!==t.chunks.length)return;if(game.train.some((index,i)=>t.chunks[index]!==t.chunks[i])){game.hinted=true;feedback(false);status('有车厢顺序不对，点车厢取下来，再听听示范。');save();return;}feedback(true);game.order=[...game.train];game.filled=t.chunks.map((_,i)=>i);complete();}});}
        if(mode==='detective'){slots.hidden=true;BearSpellingBoards.detective({arena,game,target:t,onPick(index){if(index!==game.spotIndex){game.hinted=true;feedback(false);status('这一块和示范一样，再听听其他线索。');save();return;}feedback(true);game.filled=t.chunks.map((_,i)=>i);complete();}});}
        if(mode==='balloons')BearSpellingBoards.balloons({arena,game,target:t,onChoose:choose});
        if(mode==='treasure'){slots.hidden=true;BearSpellingBoards.treasure({arena,game,choices:matchTargets(),onMove:save,onPick(row){if(row.id===t.id){feedback(true);game.filled=t.chunks.map((_,i)=>i);complete();}else{game.hinted=true;feedback(false);status('这个礼物还不是线索里的，再听一次，去找别的宝箱吧。');save();}}});}
        if(mode==='puzzle')arena.innerHTML=`<div class="spelling-pieces">${game.queue.map(i=>`<button data-spelling-piece="${i}" ${game.order.includes(i)||game.done?'disabled':''} lang="en">${esc(t.chunks[i])}</button>`).join('')}</div>`;
        if(mode==='moles'){
          const wanted=t.chunks[game.filled.length],alternatives=allChunks(kind).filter(x=>x!==wanted);
          const choices=shuffle([wanted,...shuffle(alternatives).slice(0,difficulty().choices-1)]);
          arena.innerHTML=`<div class="spelling-holes">${choices.map(text=>`<button data-mole="${esc(text||'')}" ${game.done?'disabled':''}><span aria-hidden="true">🐹</span><strong lang="en">${esc(text||'✓')}</strong></button>`).join('')}</div>`;
        }
        arena.querySelectorAll('[data-spelling-piece]').forEach(b=>b.onclick=()=>choose(Number(b.dataset.spellingPiece)));
        arena.querySelectorAll('[data-mole]').forEach(b=>b.onclick=()=>{const i=t.chunks.findIndex((s,i)=>s===b.dataset.mole&&!game.order.includes(i));if(i<0){feedback(false);game.hinted=true;status('小地鼠还没带来这一块，听一听再找。');save();}else choose(i);});
        if(mode==='blocks'){updateFall();$('spelling-falling').hidden=game.done;}
        $('spelling-next').hidden=!game.done;$('spelling-hint').disabled=game.done;$('spelling-retry').disabled=game.done;
        $('spelling-board').classList.toggle('is-complete',game.done);
        $('spelling-meter').style.setProperty('--progress',((['match','memory','bingo'].includes(mode)?(game.matches?.length||0)/matchTargets().length:mode==='train'?game.train.length/t.chunks.length:game.filled.length/t.chunks.length)*100)+'%');
        $('spelling-stars').textContent=`★ ${game.index+(game.done?1:0)}/${game.ids.length}`;
        $('spelling-stars').setAttribute('aria-label',`第 ${game.level+1} 关，已完成 ${game.index+(game.done?1:0)} 题，共 ${game.ids.length} 题`);
        if(mode==='puzzle')bindDrag();
        $('spelling-round-progress').textContent=mode==='bingo'?`第 ${game.index+1}/${game.ids.length} 局 · 已盖章 ${game.matches.length}/${matchTargets().length}`:mode==='train'?`第 ${game.index+1}/${game.ids.length} 趟 · 已上车 ${game.train.length}/${t.chunks.length} 节`:mode==='detective'?`第 ${game.index+1}/${game.ids.length} 案 · ${game.done?'线索已修好':'找出一块不同的线索'}`:mode==='treasure'?`第 ${game.index+1}/${game.ids.length} 站 · ${game.done?'宝藏已找到':'带 UU 去找礼物'}`:['match','memory'].includes(mode)?`第 ${game.index+1}/${game.ids.length} 题 · 已配对 ${game.matches?.length||0}/${matchTargets().length} 对`:`第 ${game.index+1}/${game.ids.length} 题 · 已放好 ${game.filled.length}/${t.chunks.length} 块`;
      }
      function selectMatch(button) {
        if(game.done||button.disabled||matchLocked)return;
        if(mode==='memory'){button.classList.add('is-faceup');button.setAttribute('aria-label',button.querySelector('strong').textContent);if(button.dataset.matchSide==='en'){const row=matchTargets().find(row=>row.id===button.dataset.matchId);BearLesson.playFiles([row.files[0]]);}}
        if(!matchSelection){matchSelection=button;button.classList.add('is-selected');button.setAttribute('aria-pressed','true');return;}
        const first=matchSelection;matchSelection=null;
        first.classList.remove('is-selected');first.setAttribute('aria-pressed','false');
        if(first===button){if(mode==='memory'){button.classList.remove('is-faceup');button.setAttribute('aria-label','未翻开的卡片');}return;}
        if(first.dataset.matchId!==button.dataset.matchId||first.dataset.matchSide===button.dataset.matchSide){feedback(false);game.hinted=true;status('还不是一对，记住它们的位置，再找找。');if(mode==='memory'){matchLocked=true;later(()=>{for(const card of [first,button]){card.classList.remove('is-faceup');card.setAttribute('aria-label','未翻开的卡片');}matchLocked=false;},1000);}save();return;}
        const row=matchTargets().find(t=>t.id===button.dataset.matchId);
        game.matches.push(row.id);feedback(true);
        for(const card of [first,button]){card.classList.add('is-cleared');card.disabled=true;}
        BearLesson.playFiles(row.files);
        status('配对成功！小星星收好啦。');
        if(row.id!==target().id)recordTarget(row);
        $('spelling-meter').style.setProperty('--progress',(game.matches.length/matchTargets().length*100)+'%');
        $('spelling-round-progress').textContent=`第 ${game.index+1}/${game.ids.length} 题 · 已配对 ${game.matches.length}/${matchTargets().length} 对`;
        if(game.matches.length===matchTargets().length){game.filled=target().chunks.map((_,i)=>i);complete();}else save();
      }
      function bindDrag(){
        root.querySelectorAll('[data-spelling-piece]:not(:disabled)').forEach(button=>{
          let suppress=false;
          button.onclick=()=>{if(!suppress)choose(Number(button.dataset.spellingPiece));};
          button.onpointerdown=e=>{if(e.button!==0)return;suppress=false;drag={id:e.pointerId,x:e.clientX,y:e.clientY,button,moved:false};button.setPointerCapture(e.pointerId);};
          button.onpointermove=e=>{
            if(!drag||drag.id!==e.pointerId)return;
            if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<8)return;
            drag.moved=true;suppress=true;
            let ghost=root.querySelector('.spelling-drag-ghost');
            if(!ghost){ghost=document.createElement('span');ghost.className='spelling-drag-ghost';ghost.textContent=button.textContent;root.append(ghost);}
            ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';
          };
          button.onpointerup=e=>{
            if(!drag||drag.id!==e.pointerId)return;
            const moved=drag.moved;drag=null;root.querySelector('.spelling-drag-ghost')?.remove();
            if(moved){const slot=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-spelling-slot]');if(slot&&Number(slot.dataset.spellingSlot)===game.filled.length)choose(Number(button.dataset.spellingPiece));else{feedback(false);status('把积木放到亮起的空位试试。');save();}later(()=>{suppress=false;},0);}
          };
          button.onpointercancel=()=>{drag=null;root.querySelector('.spelling-drag-ghost')?.remove();suppress=false;};
        });
      }
      function draw() {
        pause();const t=target();if(!t){renderHome();return;}
        root.innerHTML=heading('🎮',modes.find(x=>x[0]===mode)[2],modes.find(x=>x[0]===mode)[3])+menu()+`<section id="spelling-board" class="feature-card spelling-board" data-no-category-swipe><div class="spelling-hud"><span>${modes.find(x=>x[0]===mode)[1]} 第 ${game.level+1} 关 · ${levels[game.level].name} ${mode==='bingo'?'声音盖章屋':mode==='train'?'UU 的小火车':mode==='detective'?'声音调查站':mode==='memory'?'翻开小小惊喜':mode==='treasure'?'UU 的宝藏岛':mode==='balloons'?'气球花园':mode==='match'?'找到好朋友':mode==='moles'?'小地鼠送积木':mode==='blocks'?'积木降落站':'声音拼图岛'}</span><span id="spelling-stars" aria-label="本轮完成进度"></span></div><div id="spelling-meter" class="spelling-meter"><span></span></div><div id="spelling-adventure"></div><div class="spelling-question"><span class="spelling-mascot" aria-hidden="true">${['treasure','bingo'].includes(mode)?'🧭':t.picture}</span><div><p id="spelling-round-progress"></p><h3 class="learning-copy">${mode==='bingo'&&!game.done?'听声音，找格子':mode==='treasure'&&!game.done?'听线索，找宝藏':esc(t.zh)}</h3></div><button id="spelling-listen" class="text-button">♫ 再听一遍</button></div><details class="spelling-help"><summary>怎么玩？</summary><p class="spelling-instruction">${mode==='bingo'?'听示范，点对应的中文或图画，盖满一条线的印章。':mode==='train'?'点积木上车，点车厢可取下重排；排好后按「检查并发车」。':mode==='detective'?'先听正确示范，再点出被换错的一块；只播放正确的读音。':mode==='memory'?'每次翻两张，英文和中文是一对。配错会在 1 秒后盖回。':mode==='treasure'?'听英文，点相邻格找礼物，也可以用方向按钮移动。':mode==='balloons'?'按顺序点气球，把上方的空位接好；没有时间限制。':mode==='match'?'点一张英文，再点对应中文，配成一对就消除。':mode==='puzzle'?'把积木拖到亮起的空位，也可以按顺序点选。':mode==='blocks'?'左右移动方块，再按「落下」。也可以开启慢慢下落。':'按顺序找到下一块。答错也没关系，可以重听和看提示。'}</p></details>${mode==='blocks'?`<div class="spelling-drop-scroll" data-no-category-swipe><div class="spelling-drop-board" style="--columns:${t.chunks.length}" tabindex="0" role="group" aria-label="方块游戏，左右方向键移动，空格落下"><div class="spelling-sky"><span id="spelling-falling" lang="en"></span></div><div id="spelling-slots" class="spelling-slots"></div></div></div><div class="spelling-controls"><button id="spelling-left" aria-label="向左移动">← 左移</button><button id="spelling-drop">↓ 落下</button><button id="spelling-right" aria-label="向右移动">右移 →</button><button id="spelling-running" class="text-button">开始自动下落</button></div>`:'<div id="spelling-slots" class="spelling-slots" aria-label="已拼好的内容"></div>'}<div id="spelling-arena"></div><p id="spelling-status" class="spelling-feedback" role="status"></p><p id="spelling-answer" class="learning-copy" hidden lang="en">${esc(t.text)}</p><div class="spelling-actions"><button id="spelling-hint" class="text-button">看一眼提示</button><button id="spelling-retry" class="text-button">重新拼这题</button><button id="spelling-next" class="continue-button" hidden>${game.index===game.ids.length-1?'查看通关收获 →':'下一题 →'}</button><button id="spelling-exit" class="text-button">换个玩法</button></div><p class="source-note">这是听音、选块和排序练习；不评估发音，也不计为独立口语达标。</p></section>`;
        bindMenus(true);update();
        $('spelling-listen').onclick=play;
        $('spelling-hint').onclick=()=>{game.hinted=true;$('spelling-answer').hidden=false;if(['treasure','bingo'].includes(mode)){const row=mode==='bingo'?matchTargets()[game.matches.length]:target();$('spelling-answer').textContent=row.text+' · '+row.zh;}status(mode==='treasure'?'宝藏线索在这里，带 UU 去找找吧。':mode==='memory'||mode==='match'?'记住英文和中文，找找它们的好朋友。':'看一眼，再听一遍，试着把积木接好。');play();save();};
        $('spelling-retry').onclick=()=>{BearLesson.pause();if(game.done){status('这题已经完成，点下一题继续，或换个玩法再练。');return;}game.cheer.streak=0;prepare();draw();save();};
        $('spelling-next').onclick=()=>{if(!game.done)return;BearLesson.pause();if(game.index+1===game.ids.length){pause();renderResult();return;}game.index++;prepare();draw();save();};
        $('spelling-exit').onclick=()=>{pause();open('spelling-games');};
        if(mode==='blocks'){
          $('spelling-left').onclick=()=>move(-1);$('spelling-right').onclick=()=>move(1);$('spelling-drop').onclick=drop;$('spelling-running').onclick=toggleRunning;
          root.querySelector('.spelling-drop-board').onkeydown=e=>{if(document.hidden||!['ArrowLeft','ArrowRight',' '].includes(e.key))return;e.preventDefault();if(e.key===' ')drop();else move(e.key==='ArrowLeft'?-1:1);};
        }
        root.querySelector('#spelling-board').scrollIntoView({block:'start',behavior:'instant'});
        if(!game.done)play();
      }
      function renderResult() {
        game.finished=true;markLevel();
        root.innerHTML=heading('🌟',`第 ${game.level+1} 关，通关啦！`,`完成 ${game.ids.length} 题 · ${levels[game.level].name}${game.level<levels.length-1?' · 下一关已解锁':' · 十关全部完成，还可以换个玩法或内容继续挑战'}`)+`<section class="feature-card spelling-result"><p class="spelling-passport">${modes.find(x=>x[0]===mode)[1]} ${modes.find(x=>x[0]===mode)[2]} · 本关完成</p>${BearGameAdventure.badge(game.level,cleared())}<p class="adventure-summary">✦ 收集 ${game.cheer.sparks} 颗星光 · 最长连续接对 ${game.cheer.best} 次</p><div class="spelling-recap">${game.ids.map(id=>targets(kind,group).find(x=>x.id===id)).map(t=>`<button type="button" data-recap-id="${esc(t.id)}" aria-label="重听 ${esc(t.text)}"><span aria-hidden="true">${t.picture}</span><strong lang="en">${esc(t.text)}</strong><span>${esc(t.zh)}</span><small>♫ 点卡片重听</small></button>`).join('')}</div>${game.level<levels.length-1?'<button id="spelling-next-level" class="continue-button">挑战下一关 →</button>':''}<button id="spelling-again" class="text-button">重玩这一关</button><button id="spelling-home" class="text-button">回到拼读游戏</button><p class="source-note">完成的是听音与排序练习，不代表发音或口语已达标。</p></section>`;
        root.querySelectorAll('[data-recap-id]').forEach(button=>button.onclick=()=>{const row=targets(kind,group).find(row=>row.id===button.dataset.recapId);BearLesson.playFiles(row.files);});
        if($('spelling-next-level'))$('spelling-next-level').onclick=()=>{const next=game.level+1;BearLesson.pause();startLevel(next);};$('spelling-again').onclick=()=>{BearLesson.pause();startLevel(game.level);};$('spelling-home').onclick=()=>{game=null;open('spelling-games');};save();
      }
      function checkpoint() {return {mode,kind,group,level,buddy,game:game?structuredClone(game):null,playing:!!root.querySelector('#spelling-board,.spelling-result')};}
      function restore(saved) {
        pause();game=null;
        if(!saved||!modes.some(m=>m[0]===saved.mode)||!kinds.some(k=>k[0]===saved.kind))return false;
        mode=saved.mode;kind=saved.kind;buddy=BearGameAdventure.buddy(saved.buddy).id;group=groups().some(g=>g.id===saved.group)?saved.group:'';level=BearGameLevels.validLevel(saved.level)?Math.min(saved.level,unlocked()):unlocked();
        const g=saved.game,pool=targets(kind,group);
        if(!g||g.mode!==mode||g.kind!==kind||g.group!==group||!BearGameLevels.validLevel(g.level)||g.level!==level||g.level>unlocked()||!Array.isArray(g.ids)||!g.ids.length||g.ids.length>levels[g.level].questions||new Set(g.ids).size!==g.ids.length||g.ids.some(id=>!pool.some(t=>t.id===id))||!Number.isInteger(g.index)||g.index<0||g.index>=g.ids.length)return false;
        const eligible=BearGameLevels.pool(pool,kind,g.level);if(g.ids.length!==Math.min(levels[g.level].questions,eligible.length)||g.ids.some(id=>!eligible.some(row=>row.id===id)))return false;
        const n=pool.find(t=>t.id===g.ids[g.index]).chunks.length;
        const list=(a)=>Array.isArray(a)&&a.length<=n&&new Set(a).size===a.length&&a.every(i=>Number.isInteger(i)&&i>=0&&i<n);
        if(!list(g.filled)||!list(g.order)||!list(g.queue)||!Number.isInteger(g.column)||g.column<0||g.column>=n||typeof g.done!=='boolean'||typeof g.finished!=='boolean'||g.finished&&(!g.done||g.index!==g.ids.length-1)||g.done!==(g.filled.length===n))return false;
        const paired=['match','memory'].includes(mode),boardMode=paired||mode==='treasure',rows=matchTargets(g.ids[g.index]);
        if(boardMode){const deckSize=rows.length*2;if(!Array.isArray(g.deck)||g.deck.length!==deckSize||new Set(g.deck).size!==deckSize||g.deck.some(i=>!Number.isInteger(i)||i<0||i>=deckSize))return false;}
        if(paired&&(!Array.isArray(g.matches)||new Set(g.matches).size!==g.matches.length||g.matches.some(id=>!rows.some(row=>row.id===id))||g.done!==(g.matches.length===rows.length)||!g.done&&g.filled.length!==0))return false;
        if(mode==='treasure'&&(!Number.isInteger(g.position)||g.position<0||g.position>8||!Array.isArray(g.chestOrder)||g.chestOrder.length!==rows.length||new Set(g.chestOrder).size!==rows.length||g.chestOrder.some(i=>!Number.isInteger(i)||i<0||i>=rows.length)||!g.done&&g.filled.length!==0||g.done&&rows[g.chestOrder[[0,2,8].indexOf(g.position)]]?.id!==g.ids[g.index]))return false;
        if(mode==='train'&&(!list(g.train)||g.done&&(g.train.length!==n||g.train.some((v,i)=>pool.find(t=>t.id===g.ids[g.index]).chunks[v]!==pool.find(t=>t.id===g.ids[g.index]).chunks[i]))||!g.done&&g.filled.length!==0))return false;
        if(mode==='detective'&&(!Number.isInteger(g.spotIndex)||g.spotIndex<0||g.spotIndex>=n||typeof g.spotWrong!=='string'||g.spotWrong===pool.find(t=>t.id===g.ids[g.index]).chunks[g.spotIndex]||!allChunks(kind).includes(g.spotWrong)||!g.done&&g.filled.length!==0))return false;
        if(mode==='bingo'){if(!Array.isArray(g.bingoBoard)||g.bingoBoard.length<rows.length||g.bingoBoard.length>9||new Set(g.bingoBoard).size!==g.bingoBoard.length||g.bingoBoard.some(id=>!pool.some(t=>t.id===id))||rows.some(row=>!g.bingoBoard.includes(row.id))||!Array.isArray(g.matches)||g.matches.length>rows.length||g.matches.some((id,i)=>id!==rows[i].id)||g.done!==(g.matches.length===rows.length)||!g.done&&g.filled.length!==0)return false;const board=g.bingoBoard.map(id=>pool.find(t=>t.id===id));if(new Set(board.map(row=>row.text)).size!==board.length||new Set(board.map(row=>row.zh)).size!==board.length)return false;}
        if(mode==='blocks'&&(g.queue.length+g.filled.length!==n))return false;
        if(!['blocks','match','memory','treasure','bingo','detective'].includes(mode)&&(g.queue.length!==n||g.order.length!==g.filled.length||g.filled.some((v,i)=>v!==i)||g.order.some((v,i)=>pool.find(t=>t.id===g.ids[g.index]).chunks[v]!==pool.find(t=>t.id===g.ids[g.index]).chunks[i])))return false;
        if(g.cheer!==undefined&&!BearGameAdventure.valid(g.cheer))return false;
        game=structuredClone({...g,cheer:g.cheer||BearGameAdventure.create(buddy),running:false,fall:0});buddy=game.cheer.buddy;return saved.playing===true;
      }
      return {renderHome,pause,checkpoint,restore,resume(){if(game)enter();}};
    },
  };
})();
