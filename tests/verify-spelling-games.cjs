const assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
try{const context=await browser.newContext({viewport:{width:390,height:950}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.BEAR_TEST_URL||'http://localhost:8080/');
await page.locator('[data-child-nav=explore]').click();assert.deepEqual(await page.locator('[data-explore-section]').evaluateAll(bs=>bs.map(b=>b.dataset.exploreSection)),['foundation','spelling-games','scenes','simulation']);assert.match(await page.locator('[data-explore-section=scenes]').innerText(),/场景对话/);
await page.locator('[data-explore-section=spelling-games]').click();assert.equal(await page.locator('#page-back').isVisible(),true);assert.equal(await page.locator('[data-spelling-mode]').count(),10);
assert.deepEqual(await page.evaluate(()=>['words','sentences'].map(k=>BearSpellingGames.targets(k,'').length)),[500,100]);
assert.deepEqual(await page.evaluate(async()=>{const catalog=await(await fetch('offline-assets.json')).json();return ['words','sentences'].flatMap(k=>BearSpellingGames.targets(k,'')).flatMap(t=>['adult','child'].flatMap(voice=>t.files.filter(f=>!Object.hasOwn(catalog.audio,BearVoices.resolve(f.file,voice).file)).map(f=>f.file)));}),[]);
const snapshot=()=>page.evaluate(()=>BearFeatures.spellingCheckpoint());
async function target(){return page.evaluate(()=>{const s=BearFeatures.spellingCheckpoint();return BearSpellingGames.targets(s.kind,s.group).find(t=>t.id===s.game.ids[s.game.index]);});}
async function solve(limit=50){let s=await snapshot(),t=await target();for(let guard=0;guard<limit&&!s.game.done;guard++){
 if(['match','memory'].includes(s.mode)){const cards=page.locator('[data-match-id]:not(:disabled)'),id=await cards.first().getAttribute('data-match-id');const pair=page.locator(`[data-match-id="${id}"]`);await pair.nth(0).click();await pair.nth(1).click();}
 else if(s.mode==='treasure'){const zh=t.zh,destination=await page.locator('[data-treasure-cell]').evaluateAll((bs,zh)=>Number(bs.find(b=>b.querySelector('small')?.textContent===zh).dataset.treasureCell),zh);const pos=s.game.position,delta=Math.floor(pos/3)!==Math.floor(destination/3)?destination>pos?3:-3:destination>pos?1:-1;await page.locator(`[data-treasure-cell="${pos+delta}"]`).click();}
 else if(s.mode==='balloons'){const index=t.chunks.findIndex((text,i)=>text===t.chunks[s.game.filled.length]&&!s.game.order.includes(i));await page.locator(`[data-balloon="${index}"]`).click();}
 else if(s.mode==='bingo'){const label=await page.evaluate(()=>{const old=BearLesson.playFiles;let label;BearLesson.playFiles=files=>{label=files[0].label;};document.querySelector('#spelling-listen').click();BearLesson.playFiles=old;return label;}),id=await page.evaluate(label=>BearSpellingGames.targets(BearFeatures.spellingCheckpoint().kind,'').find(row=>row.text===label).id,label);await page.locator(`[data-bingo-id="${id}"]`).click();}
 else if(s.mode==='train'){if(s.game.train.length===t.chunks.length)await page.locator('[data-train-check]').click();else{const index=t.chunks.findIndex((text,i)=>text===t.chunks[s.game.train.length]&&!s.game.train.includes(i));await page.locator(`[data-train-piece="${index}"]`).click();}}
 else if(s.mode==='detective'){await page.locator(`[data-spot="${s.game.spotIndex}"]`).click();}
 else if(s.mode==='blocks'){const value=t.chunks[s.game.queue[0]],slot=t.chunks.findIndex((text,i)=>text===value&&!s.game.filled.includes(i));while(s.game.column!==slot){await page.locator(s.game.column<slot?'#spelling-right':'#spelling-left').click();s=await snapshot();}await page.locator('#spelling-drop').click();}
 else if(s.mode==='puzzle'){const index=t.chunks.findIndex((text,i)=>text===t.chunks[s.game.filled.length]&&!s.game.order.includes(i));await page.locator(`[data-spelling-piece="${index}"]`).click();}
 else {const buttons=page.locator('[data-mole]'),index=await buttons.evaluateAll((bs,w)=>bs.findIndex(b=>b.dataset.mole===w),t.chunks[s.game.filled.length]);await buttons.nth(index).click();}
 s=await snapshot();}if(limit===50){assert.equal(s.game.done,true);assert.equal(await page.locator('#spelling-next').isVisible(),true);}}
for(const mode of ['puzzle','moles','blocks','match','memory','treasure','balloons','bingo','train','detective'])for(const kind of ['words','sentences']){
 await page.evaluate(()=>BearFeatures.open('spelling-games'));await page.locator(`[data-spelling-mode=${mode}]`).click();await page.locator(`[data-spelling-kind=${kind}]`).click();await page.locator('#spelling-start').click();
 assert.equal((await snapshot()).game.ids.length,5);
 // A wrong move must not consume a piece; hints are explicit.
 const s=await snapshot(),t=await target();
 if(mode==='puzzle'){const bad=t.chunks.findIndex(text=>text!==t.chunks[0]);if(bad>=0){await page.locator(`[data-spelling-piece="${bad}"]`).click();assert.deepEqual((await snapshot()).game.filled,[]);}}
 if(['match','memory'].includes(mode)){const cards=page.locator('[data-match-id]');await cards.nth(0).click();await cards.nth(0).click();assert.equal(await page.locator('.is-selected').count(),0);const pair=await cards.evaluateAll(bs=>{const a=bs[0],b=bs.find(b=>b.dataset.matchId!==a.dataset.matchId);return [a.dataset.matchId,a.dataset.matchSide,b.dataset.matchId,b.dataset.matchSide];});await page.locator(`[data-match-id="${pair[0]}"][data-match-side="${pair[1]}"]`).click();await page.locator(`[data-match-id="${pair[2]}"][data-match-side="${pair[3]}"]`).click();assert.deepEqual((await snapshot()).game.matches,[]);if(mode==='memory'){assert.equal(await page.locator('.is-faceup').count(),2);await page.waitForFunction(()=>!document.querySelector('.is-faceup'));}}
 if(mode==='puzzle'){const index=t.chunks.findIndex(text=>text===t.chunks[0]),piece=page.locator(`[data-spelling-piece="${index}"]`),a=await piece.boundingBox(),b=await page.locator('[data-spelling-slot="0"]').boundingBox();await page.mouse.move(a.x+a.width/2,a.y+a.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2,b.y+b.height/2,{steps:10});await page.mouse.up();assert.equal((await snapshot()).game.filled.length,1);}
 if(mode==='blocks'){const bad=t.chunks.findIndex(text=>text!==t.chunks[s.game.queue[0]]);if(bad>=0){while((await snapshot()).game.column<bad)await page.locator('#spelling-right').click();await page.locator('#spelling-drop').click();assert.deepEqual((await snapshot()).game.filled,[]);}}
 if(mode==='balloons'){const bad=t.chunks.findIndex(text=>text!==t.chunks[0]);if(bad>=0){await page.locator(`[data-balloon="${bad}"]`).click();assert.deepEqual((await snapshot()).game.filled,[]);}}
 if(mode==='treasure'){assert.equal(await page.locator('[data-treasure-cell="0"]').isDisabled(),true);assert.equal(await page.locator('#spelling-board h3').innerText(),'听线索，找宝藏');const emitted=await page.evaluate(()=>{const old=BearLesson.playFiles,files=[];BearLesson.playFiles=value=>files.push(value);document.querySelector('#spelling-listen').click();BearLesson.playFiles=old;return files;});assert.equal(emitted[0].length,1);assert.equal(emitted[0][0].label,t.text);const wrongCell=await page.locator('[data-treasure-cell]').evaluateAll((bs,zh)=>Number(bs.find(b=>b.querySelector('small')&&b.querySelector('small').textContent!==zh).dataset.treasureCell),t.zh);for(let guard=0;guard<8&&(await snapshot()).game.position!==wrongCell;guard++){const pos=(await snapshot()).game.position,next=Math.floor(pos/3)!==Math.floor(wrongCell/3)?pos+(wrongCell>pos?3:-3):pos+(wrongCell>pos?1:-1);await page.locator(`[data-treasure-cell="${next}"]`).click();}assert.equal((await snapshot()).game.done,false);const pos=(await snapshot()).game.position,key=pos%3===0?'ArrowLeft':'ArrowRight';await page.locator('.treasure-island').focus();await page.keyboard.press(key);assert.equal((await snapshot()).game.position,pos);}
 if(mode==='bingo'){const bad=await page.locator('[data-bingo-id]').evaluateAll((bs,id)=>bs.find(b=>b.dataset.bingoId!==id).dataset.bingoId,t.id);await page.locator(`[data-bingo-id="${bad}"]`).click();assert.deepEqual((await snapshot()).game.matches,[]);}
 if(mode==='detective'){const bad=t.chunks.findIndex((_,i)=>i!==s.game.spotIndex);if(bad>=0){await page.locator(`[data-spot="${bad}"]`).click();assert.equal((await snapshot()).game.done,false);assert.equal((await snapshot()).game.filled.length,0);}}
 if(mode==='train'){assert.equal(await page.locator('[data-train-check]').isDisabled(),true);const wrong=[...t.chunks.keys()].reverse();if(wrong.some((v,i)=>t.chunks[v]!==t.chunks[i])){for(const index of wrong)await page.locator(`[data-train-piece="${index}"]`).click();await page.locator('[data-train-check]').click();assert.equal((await snapshot()).game.done,false);await page.locator('[data-train-seat="0"]').click();assert.equal((await snapshot()).game.train.length,t.chunks.length-1);while((await snapshot()).game.train.length)await page.locator('[data-train-undo]').click();}}
 await page.locator('#spelling-hint').click();assert.equal(await page.locator('#spelling-answer').isVisible(),true);
 // Reload mid-round preserves the round, pieces and navigation, but resumes paused.
 await solve(1);const before=await snapshot();await page.reload();assert.deepEqual((await snapshot()).game.ids,before.game.ids);assert.deepEqual((await snapshot()).game.cheer,before.game.cheer);assert.deepEqual((await snapshot()).game.filled,before.game.filled);if(['match','memory'].includes(mode)){assert.deepEqual((await snapshot()).game.matches,before.game.matches);assert.deepEqual((await snapshot()).game.deck,before.game.deck);if(mode==='memory')assert.equal(await page.locator('.is-faceup').count(),0);}if(mode==='train')assert.deepEqual((await snapshot()).game.train,before.game.train);if(mode==='bingo'){assert.deepEqual((await snapshot()).game.bingoBoard,before.game.bingoBoard);assert.deepEqual((await snapshot()).game.matches,before.game.matches);}if(mode==='detective'){assert.equal((await snapshot()).game.spotIndex,before.game.spotIndex);assert.equal((await snapshot()).game.spotWrong,before.game.spotWrong);}if(mode==='treasure')assert.equal((await snapshot()).game.position,before.game.position);await page.locator('#page-back').click();await page.locator('#spelling-resume').click();assert.deepEqual((await snapshot()).game.filled,before.game.filled);assert.equal((await snapshot()).game.running,false);assert.equal(await page.locator('#spelling-board').isVisible(),true);
 for(let i=0;i<5;i++){await solve();if(mode==='bingo'){const done=(await snapshot()).game,positions=done.matches.map(id=>done.bingoBoard.indexOf(id)).sort((a,b)=>a-b);assert.deepEqual(positions,done.bingoBoard.length===9?[0,4,8]:Array.from({length:done.matches.length},(_,i)=>i));}await page.locator('#spelling-next').click();}
 assert.equal(await page.locator('.spelling-result').isVisible(),true);await page.reload();assert.equal(await page.locator('.spelling-result').isVisible(),true);
 for(const width of [320,768,1440]){await page.setViewportSize({width,height:950});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
 console.log('PASS '+mode+'/'+kind+': five questions, incorrect moves, hints, paused refresh and result');
}
// Exercise real completion across all ten stages, then revisit earlier stages.
await page.evaluate(()=>BearFeatures.open('spelling-games'));
await page.locator('[data-spelling-mode=detective]').click();await page.locator('[data-spelling-kind=words]').click();
assert.equal(await page.locator('[data-game-level="2"]').isDisabled(),true);
for(let level=1;level<10;level++){
 await page.locator(`[data-game-level="${level}"]`).click();await page.locator('#spelling-start').click();
 const count=[5,6,8,10,12,14,16,18,20,22][level];assert.equal((await snapshot()).game.ids.length,count);
 for(let i=0;i<count;i++){await solve();await page.locator('#spelling-next').click();}
 assert.equal(await page.locator('.spelling-result').isVisible(),true);
 const progress=await page.evaluate(()=>BearLearning.get().growth.spelling[BearGameLevels.key('detective','words','')]);
 assert.deepEqual(progress,Array.from({length:level+1},(_,i)=>i));
 await page.reload();assert.equal(await page.locator('.spelling-result').isVisible(),true);
 if(level===9)assert.equal(await page.locator('#spelling-next-level').count(),0);
 await page.locator('#spelling-home').click();
}
await page.locator('[data-game-level="0"]').click();await page.locator('#spelling-start').click();await page.locator('#spelling-exit').click();
assert.equal(await page.locator('[data-game-level="9"]').isDisabled(),false);
const ranking=await page.evaluate(()=>['words','sentences'].flatMap(kind=>['',...(kind==='words'?BEAR_FOUNDATIONS.themes:BEAR_SENTENCE_PATTERNS).map(row=>row.id)].map(group=>{
 const rows=BearSpellingGames.targets(kind,group),ids=new Set(rows.map(row=>row.id));
 return {kind,group,stages:BearGameLevels.levels.map((_,level)=>{
  const pool=BearGameLevels.pool(rows,kind,level),scores=pool.map(row=>BearGameLevels.score(row,kind));
  return {min:Math.min(...scores),mean:scores.reduce((sum,n)=>sum+n,0)/scores.length,count:pool.length,unique:new Set(pool.map(row=>row.id)).size,inScope:pool.every(row=>ids.has(row.id))};
 })};
})));
for(const {kind,group,stages} of ranking)for(let i=0;i<stages.length;i++){
 const stage=stages[i],label=`${kind}/${group||'all'}/stage ${i+1}`;
 assert.ok(stage.count>0,label);assert.equal(stage.unique,stage.count,label);assert.ok(stage.inScope,label);
 if(i){assert.ok(stage.min>=stages[i-1].min,label+' minimum difficulty');assert.ok(stage.mean+1e-9>=stages[i-1].mean,label+' mean difficulty');}
}
assert.deepEqual(await page.evaluate(()=>{const row=BearSpellingGames.targets('words','')[0];return BearGameLevels.levels.map((_,level)=>[BearGameLevels.pool([],'words',level).length,BearGameLevels.pool([row],'words',level).length]);}),Array.from({length:10},()=>[0,1]));
assert.equal(await page.evaluate(()=>BearGameLevels.validateProgress({[BearGameLevels.key('puzzle','words','')]:[0,2]})),false);
// Upper stages must also restore bigger boards in every mode, for both content types.
await page.setViewportSize({width:320,height:950});
for(const mode of ['puzzle','moles','blocks','match','memory','treasure','balloons','bingo','train','detective'])for(const kind of ['words','sentences']){
 await page.evaluate(({mode,kind})=>{for(let level=0;level<9;level++)BearLearning.growth('spellingStage',{key:BearGameLevels.key(mode,kind,''),level});BearFeatures.open('spelling-games');},{mode,kind});
 await page.locator(`[data-spelling-mode=${mode}]`).click();await page.locator(`[data-spelling-kind=${kind}]`).click();await page.locator('[data-game-level="9"]').click();await page.locator('#spelling-start').click();
 assert.equal((await snapshot()).game.ids.length,22);
 if(['match','memory'].includes(mode))assert.equal(await page.locator('[data-match-id]').count(),12);
 if(mode==='bingo')assert.equal(await page.locator('[data-bingo-id]').count(),9);
 await solve(1);const saved=await snapshot();await page.reload();assert.deepEqual((await snapshot()).game.ids,saved.game.ids);await solve();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
}
const savedStages=await page.evaluate(()=>{const text=BearProfiles.backupText(),rows=BearProfiles.inspect(text);return rows[0].learning.growth.spelling;});assert.deepEqual(savedStages['["detective","words",""]'],[0,1,2,3,4,5,6,7,8,9]);
console.log('PASS ten progressive stages, actual difficulty ordering, locking, persistence, backups and upper-stage boards');
// Saved evidence is exportable; creating another child cannot copy game evidence into it.
assert.equal(await page.evaluate(()=>{const text=BearProfiles.backupText();return BearProfiles.inspect(text).length===1;}),true);
await page.evaluate(()=>BearFeatures.open('spelling-games'));await page.locator('[data-spelling-mode=blocks]').click();await page.locator('[data-spelling-kind=words]').click();await page.locator('#spelling-start').click();await page.locator('#spelling-running').click();assert.equal((await snapshot()).game.running,true);await page.waitForFunction(()=>BearFeatures.spellingCheckpoint().game.fall>0);
await page.locator('[data-spelling-mode=moles]').click();assert.equal(await page.locator('#spelling-start').isVisible(),true);await page.locator('[data-spelling-mode=blocks]').click();await page.locator('#spelling-start').click();await page.locator('#spelling-running').click();await page.locator('#page-back').click();assert.equal(await page.locator('#spelling-start').isVisible(),true);assert.equal((await snapshot()).game.running,false);
await page.locator('#page-back').click();assert.equal(await page.locator('[data-explore-section=spelling-games]').isVisible(),true);
for(const width of [320,768,1440]){await page.setViewportSize({width,height:950});await page.locator('[data-explore-section=spelling-games]').click();await page.locator('[data-spelling-mode=blocks]').click();await page.locator('#spelling-start').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:path.join(output,'spelling-blocks-'+width+'.png')});await page.locator('#spelling-exit').click();await page.locator('#page-back').click();}
const evidence=await page.evaluate(async()=>{const id=await BearProfiles.add('另一个孩子');return {original:Object.keys(BearLearning.get().items).length,other:Object.keys(BearLearning.snapshot(id).items).length,stages:BearLearning.snapshot(id).growth.spelling,backup:BearProfiles.inspect(BearProfiles.backupText()).length};});assert.ok(evidence.original>0);assert.equal(evidence.other,0);assert.deepEqual(evidence.stages,{});assert.equal(evidence.backup,2);
const restored=await page.evaluate(async()=>{const backup=BearProfiles.backupText();await BearProfiles.import(backup);const rows=BearProfiles.export().children;return rows.find(row=>row.name.includes('恢复')&&row.learning.growth.spelling?.['["detective","words",""]'])?.learning.growth.spelling['["detective","words",""]'];});assert.deepEqual(restored,[0,1,2,3,4,5,6,7,8,9]);
assert.deepEqual(errors,[]);await context.close();console.log('PASS game entry, all 600 curated targets, twenty mode/content combinations, export validation, timer cleanup, back navigation and responsive boards');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
