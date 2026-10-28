/* Practice variation, listening readiness, contextual dialogue and transfer evidence. */
(() => {
  'use strict';
  const G=BearGrowth,L=BearLearning,D=BEAR_FOUNDATIONS,esc=G.esc;
  function shuffle(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function practice(){return {recent:{},transfers:{},...L.get().growth.practice};}
  function rotate(pool,key,count){const p=practice(),recent=p.recent[key]||[],fresh=shuffle(pool.filter(w=>!recent.includes(w.id))),old=shuffle(pool.filter(w=>recent.includes(w.id)));const result=[...fresh,...old].slice(0,count);L.growth('growthPractice',{kind:'recent',id:key,value:[...new Set([...result.map(w=>w.id),...recent])].slice(0,Math.min(12,Math.max(count,pool.length-count)))});return result;}
  function distractors(w){const strong=G.familiar(w.id);return shuffle(D.words.filter(x=>x.id!==w.id&&(strong?x.theme===w.theme:x.theme!==w.theme))).slice(0,2);}
  function questionBank(){
    let draft=L.get().growth.draft;if(!draft?.seed){draft={...draft,answers:draft?.answers||[],seed:Math.floor(Math.random()*2147483646)+1};L.growth('growthDraft',{value:draft});}
    let seed=draft.seed;const random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
    const themes=shuffle([...new Set(D.words.map(w=>w.theme))],random),pick=pool=>shuffle(pool,random)[0];
    const questions=themes.slice(0,4).map(theme=>{const w=pick(D.words.filter(w=>w.theme===theme)),others=shuffle(D.words.filter(x=>x.id!==w.id&&x.theme===theme),random).slice(0,2);return {kind:'words',prompt:'听一听，找到对应的图片',answer:w.id,choices:shuffle([w,...others],random).map(x=>({id:x.id,label:x.picture+' '+x.zh})),play:()=>BearLesson.playFile(w.audio+'.wav',w.text)};});
    const sounds=shuffle([['/æ/','a','e','i'],['/ɪ/','i','a','u'],['/e/','e','a','o'],['/ʌ/','u','i','a']],random),sound=sounds.find(a=>D.phonemes.some(p=>p.display===a[0]))||sounds[0],p=D.phonemes.find(p=>p.display===sound[0]);
    questions.push({kind:'sounds',prompt:'听这个单音，选择对应的字母',answer:sound[1],choices:shuffle(sound.slice(1),random).map(x=>({id:x,label:x})),play:()=>BearLesson.playFile(p.audio+'.'+(p.extension||'wav'),p.display)});
    const w=pick(D.words.filter(w=>['cat','sun','hot','dog','pen','bus'].includes(w.text)));questions.push({kind:'sounds',prompt:'听这个词，选择对应的拼写',answer:w.text,choices:shuffle([w,...shuffle(D.words.filter(x=>x.text!==w.text&&x.text.length===3),random).slice(0,2)],random).map(x=>({id:x.text,label:x.text})),play:()=>BearLesson.playFile(w.audio+'.wav',w.text)});
    const scenes=shuffle(Object.values(LITTLE_BEAR_SCENES),random);for(const s of scenes.slice(0,2)){const distractors=scenes.filter(x=>x.speech.zh!==s.speech.zh).filter((x,i,a)=>a.findIndex(y=>y.speech.zh===x.speech.zh)===i).slice(0,2);questions.push({kind:'sentences',prompt:'听一句英文，选出它的意思',answer:s.id,choices:shuffle([s,...distractors],random).map(x=>({id:x.id,label:esc(x.speech.zh)})),play:()=>BearLesson.play(s.speech.en)});}return questions;
  }
  // One lifecycle gate per rendered question. Listeners are removed on navigation/render.
  let activeGate;
  function listenGate(box,play,buttons,statusSelector){
    activeGate?.dispose();let ready=false,waiting=false,disposed=false,expected=null;
    const status=box.querySelector(statusSelector),skip=document.createElement('button');skip.className='text-button';skip.textContent='没听清 / 暂时无法播放，跳过且不计错';skip.hidden=true;status.after(skip);
    const lock=value=>buttons.forEach(b=>b.disabled=value);
    const stopped=()=>{if(waiting){ready=false;lock(true);status.textContent='声音已中断，请重听或跳过，不计错。';skip.hidden=false;}};
    const failed=()=>{if(!waiting)return;ready=false;lock(true);skip.hidden=false;status.textContent='声音未播放完成，请重听；也可以跳过，不计错。';};
    const loading=e=>{expected=e.detail.file;waiting=true;ready=false;lock(true);};
    const ended=e=>{if(!waiting||expected&&e.detail?.file!==expected)return;waiting=false;ready=true;lock(false);skip.hidden=false;status.textContent='听完啦，现在选一选。';};
    const gate={ready:()=>ready,onSkip:null,dispose(){disposed=true;window.removeEventListener('bear:audio-ended',ended);window.removeEventListener('bear:audio-loading',loading);window.removeEventListener('bear:audio-failed',failed);window.removeEventListener('bear:audio-stopped',stopped);observer.disconnect();if(activeGate===gate)activeGate=null;}};
    // Start waiting before synchronous missing-asset failures, but ignore the player's initial stop.
    gate.play=()=>{if(disposed)return;waiting=false;ready=false;lock(true);status.textContent='先听完声音，再选择。';skip.hidden=false;let failure=false;const sync=()=>{failure=true;};window.addEventListener('bear:audio-failed',sync);play();window.removeEventListener('bear:audio-failed',sync);waiting=true;if(failure)failed();};
    skip.onclick=()=>gate.onSkip?.();window.addEventListener('bear:audio-ended',ended);window.addEventListener('bear:audio-loading',loading);window.addEventListener('bear:audio-failed',failed);window.addEventListener('bear:audio-stopped',stopped);const observer=new MutationObserver(()=>{if(!status.isConnected)gate.dispose();});observer.observe(box,{childList:true,subtree:true});lock(true);activeGate=gate;return gate;
  }
  function transfer(id,correct,context){L.growth('growthPractice',{kind:'transfer',id,value:{day:L.today(),context,correct}});}
  function recommendation(){const p=practice(),all=Object.entries(p.transfers),passed=all.filter(([id,rows])=>{const good=rows.filter(x=>x.correct);return G.familiar(id)&&new Set(good.map(x=>x.day)).size>=2&&new Set(good.map(x=>x.context)).size>=2&&rows.at(-1).correct;}).map(([id])=>id),level=L.get().settings.readingLevel||'L1';return {passed,level,next:'L'+Math.min(10,Number(level.slice(1))+1),ready:passed.length>=5&&level!=='L10'};}
  // Every scene has two authored paths. Selected equivalent replies resolve the same path.
  const branches=BEAR_SCENE_BRANCHES;
  const accepted=values=>[...new Set(values.flatMap(G.replies))];
  function chosenPath(game,state){const b=branches[game.id],reply=G.normalize(state.replyHistory?.[0]||'');return b?.paths.find(p=>accepted(p.choices||[p.pick]).some(x=>G.normalize(x)===reply))||b?.paths[0];}
  function dialogue(game,state){
    const b=branches[game.id];if(!b)return game.dialogue;const path=chosenPath(game,state);
    return [{npc:b.question,npcZh:b.zh,answer:b.paths[0].pick,zh:'说出自己的选择',accepted:accepted(b.paths.flatMap(p=>p.choices||[p.pick]))},
      {npc:path.npc,npcZh:path.npcZh,answer:path.answer,zh:path.answerZh,accepted:accepted(path.answers)},
      {npc:path.end,npcZh:path.endZh,answer:path.endAnswer,zh:path.endAnswerZh,accepted:accepted(path.endAnswers)}];
  }
  // New evidence identifies the authored path; old keys keep their original fixed dialogue.
  function parseDialogueKey(id){
    const match=typeof id==='string'&&/^dialogue:([^:]+):(?:(\d+):)?([0-2])$/.exec(id);
    if(!match||!Object.hasOwn(LITTLE_BEAR_SCENES,match[1]))return null;
    const scene=match[1],round=Number(match[3]),path=match[2]===undefined?null:Number(match[2]);
    if(path!==null&&!branches[scene]?.paths[path])return null;
    return {scene,path,round};
  }
  function dialogueKey(game,state){
    if(!Number.isInteger(state.dialogueIndex)||state.dialogueIndex<0||state.dialogueIndex>2)return null;
    const b=branches[game.id];
    if(!b)return `dialogue:${game.id}:${state.dialogueIndex}`;
    const reply=state.dialogueIndex===0?state.selectedReply:state.replyHistory?.[0];
    const path=chosenPath(game,{replyHistory:[reply||b.paths[0].pick]});
    return `dialogue:${game.id}:${b.paths.indexOf(path)}:${state.dialogueIndex}`;
  }
  function reviewDialogue(id){
    const key=parseDialogueKey(id);if(!key)return null;
    const game=LITTLE_BEAR_SCENES[key.scene];
    if(key.path===null)return {...key,turn:game.dialogue[key.round],turns:game.dialogue};
    const path=branches[key.scene].paths[key.path];
    const turns=dialogue(game,{replyHistory:[path.pick]});
    // Recall the chosen intent, rather than making another valid branch a distractor.
    turns[0]={...turns[0],answer:path.pick,zh:path.zh};
    return {...key,turn:turns[key.round],turns};
  }
  function replyMeaning(game,state){if(state.dialogueIndex!==0)return dialogue(game,state)[state.dialogueIndex]?.zh;return branches[game.id]?.paths.find(p=>accepted(p.choices||[p.pick]).some(x=>G.normalize(x)===G.normalize(state.selectedReply||'')))?.zh;}
  function outcome(game,state){return chosenPath(game,state)?.result;}
  const sceneResources=[];
  function registerSceneResources(provider){sceneResources.push(provider);}
  function sceneTexts(id){
    const s=LITTLE_BEAR_SCENES[id],texts=[...G.replies(s.speech.en),...s.dialogue.flatMap(t=>[t.npc,...G.replies(t.answer)])],b=branches[id];
    if(b){texts.push(b.question);for(const path of b.paths){texts.push(...accepted(path.choices||[path.pick]),path.npc,path.end,...accepted(path.answers),...accepted(path.endAnswers));}}
    return [...new Set([...texts,...sceneResources.flatMap(provider=>provider(id).texts||[])])];
  }
  function sceneFiles(id){return [...new Set([...sceneTexts(id).map(t=>window.BEAR_EXTRA_AUDIO?.[t]).filter(Boolean).map(f=>f+'.wav'),...sceneResources.flatMap(provider=>provider(id).files||[])])];}
  function mountComprehension(section,b){
    const task=BEAR_READING_ACTIVITIES[b.id],saved=L.reading(b.id).interactions||{},detail=document.createElement('details');detail.className='story-activity';
    detail.innerHTML=`<summary>📚 ${esc(task.skill)} · ${b.level}</summary><p class="learning-copy">${esc(task.discuss)}</p><blockquote class="learning-copy">${esc(task.quote)}</blockquote><button class="text-button discuss-done">我试着想过、讲过了</button><p class="discuss-status" role="status">${saved.discussed?'已记录讨论尝试，未验证回答。':''}</p>`;
    // The reader owns the single answer handler and its persisted evidence.
    // Keep this alias for the comprehension activity's existing controls.
    section.closest('.story-page').querySelectorAll('[data-book-answer]').forEach(btn=>{btn.dataset.understand=btn.dataset.bookAnswer;});
    detail.querySelector('.discuss-done').onclick=()=>{L.reading(b.id,{interactions:{discussed:true}});detail.querySelector('.discuss-status').textContent='已记录讨论尝试，未验证内容或发音。';};section.prepend(detail);
  }

  const validate=G.validate;G.validate=g=>{if(!validate(g))return false;if(!g?.practice)return true;const p=g.practice,obj=x=>!!x&&typeof x==='object'&&!Array.isArray(x);return obj(p)&&obj(p.recent)&&obj(p.transfers)&&Object.keys(p.recent).length<=10&&Object.entries(p.recent).every(([k,v])=>['game-basket','game-bag','game-order'].includes(k)&&Array.isArray(v)&&v.length<=12&&v.every(id=>D.words.some(w=>w.id===id)))&&Object.keys(p.transfers).length<=500&&Object.entries(p.transfers).every(([id,v])=>D.words.some(w=>w.id===id)&&Array.isArray(v)&&v.length<=12&&v.every(x=>obj(x)&&/^\d{4}-\d{2}-\d{2}$/.test(x.day)&&typeof x.correct==='boolean'&&typeof x.context==='string'&&(['daily','review','game-basket','game-bag','game-order'].includes(x.context)||BEAR_BOOKS.some(b=>'book-'+b.id===x.context))));};
  Object.assign(G,{shuffle,rotate,distractors,questionBank,listenGate,transfer,recommendation,dialogue,dialogueKey,parseDialogueKey,reviewDialogue,replyMeaning,outcome,sceneFiles,sceneTexts,registerSceneResources,mountComprehension,branches});
})();
