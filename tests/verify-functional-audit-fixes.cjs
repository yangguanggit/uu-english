// Regression cases from the functional audit; isolated profiles, no real child data.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']}),results=[];
 async function check(name,run,{clock=false}={}){
  const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:900}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  try{if(clock)await page.clock.install();await page.goto('http://localhost:8080/');await run(page);assert.deepEqual(errors,[]);results.push({name,passed:true});console.log('PASS '+name);}
  catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL '+name+' '+e.message);}
  finally{await context.close();}
 }
 try{
 await check('branch dialogue review preserves the selected water path, audio, refresh and backup',async p=>{
  await p.evaluate(()=>{BearHub.show('simulation');BearLesson.open('breakfast',true,1);});
  await p.locator('[data-reply="Water, please."]').click();await p.locator('#help-button').click();await p.locator('#practice-button').click();
  let rows=await p.evaluate(()=>BearLearningTools.reviewPool(5).filter(x=>x.kind==='场景回应'));
  assert.equal(rows[0].answer,'Water, please.');assert.equal(rows[0].title,'Milk or water?');assert.ok(!rows[0].choices.some(x=>x.value==='Milk, please.'));
  assert.equal(await p.evaluate(()=>BearLearningTools.reviewPool(5).some(x=>x.kind==='场景句子')),false,'Scene summary must not introduce an unpracticed fixed sentence');
  assert.ok(!(await p.evaluate(()=>BearLearningTools.week().weak)).includes('scene:breakfast'));
  await p.locator('#practice-button').click();await p.reload();
  const state=await p.evaluate(()=>{const s=BearLearning.get();return Object.keys(s.items).filter(id=>id.startsWith('dialogue:')).map(id=>BearLearningTools.reviewItem(id));});
  assert.equal(state.length,2);assert.ok(state.some(x=>x.title==='Here is your water.'&&x.answer==='Thank you!'));
  const data=await p.evaluate(async ()=>{const text=JSON.stringify(BearProfiles.export()),learning=BearProfiles.inspect(text)[0].learning;await BearProfiles.import(text);const other=BearProfiles.list().find(x=>x.name.includes('恢复'));return {learning,restored:BearLearning.snapshot(other.id)};});assert.deepEqual(data.restored.items,data.learning.items);
  const water=state.find(x=>x.answer==='Water, please.');
  await p.evaluate(id=>{const x=BearLearningTools.reviewItem(id);BearFeatures.open('review');BearLearningTools.mixedReview(document.getElementById('features-panel'),[x],()=>{});},water.id);
  const expectedFile=await p.evaluate(()=>BearVoices.resolve(BEAR_EXTRA_AUDIO['Milk or water?']+'.wav').file);assert.ok((await p.locator('#lesson-audio').getAttribute('src')).endsWith(expectedFile));
  await p.evaluate(()=>document.getElementById('lesson-audio').onended());await p.locator('[data-mixed-answer="Water, please."]').click();assert.equal(await p.locator('#mixed-next').isVisible(),true);
  const offline=await p.evaluate(()=>{BearLearning.choosePlan('breakfast',10);Object.defineProperty(navigator,'onLine',{configurable:true,value:false});return BearLearningTools.reviewPool(5).map(x=>x.id);});assert.ok(offline.includes(water.id));
 });
 await check('one spoken round counts once while both scene and dialogue evidence persist',async p=>{
  await p.evaluate(()=>{BearHub.show('simulation');BearLesson.open('breakfast',true,1);});
  for(let i=0;i<3;i++)await p.locator('#practice-button').click();
  const values=await p.evaluate(()=>({count:BearLearningTools.week().counts.practiced,scene:BearLearning.get().items['scene:breakfast'].practiced,round:BearLesson.checkpoint().state.dialogueIndex}));
  assert.deepEqual(values,{count:3,scene:3,round:3});await p.reload();assert.equal(await p.evaluate(()=>BearLearningTools.week().counts.practiced),3);
 });
 await check('completed dialogue help never changes evidence or invalidates a backup',async p=>{
  await p.evaluate(()=>{BearHub.show('simulation');BearLesson.open('breakfast',true,1);});
  for(let i=0;i<3;i++)await p.locator('#practice-button').click();
  const before=await p.evaluate(()=>BearLearning.get().items);
  await p.locator('#help-button').click();await p.evaluate(()=>BearLesson.reveal());
  assert.deepEqual(await p.evaluate(()=>BearLearning.get().items),before);
  assert.equal(await p.evaluate(()=>BearGrowth.dialogueKey(LITTLE_BEAR_SCENES.breakfast,{dialogueIndex:3})),null);
  await p.evaluate(()=>BearProfiles.inspect(JSON.stringify(BearProfiles.export())));
 });
 await check('known fourth-round artifacts repair on restore and journal replay, preserving valid progress',async p=>{
  const result=await p.evaluate(async ()=>{
   BearLearning.record('word-cat','practiced');const backup=BearProfiles.export(),learning=backup.children[0].learning,date=BearLearning.today();
   const bad=['dialogue:breakfast:3','dialogue:breakfast:0:3'];
   for(const id of bad)learning.items[id]={hinted:1};
   learning.activity[date].ids.push(...bad);learning.activity[date].helpIds.push(...bad);
   const rows=BearProfiles.inspect(JSON.stringify(backup));await BearProfiles.import(JSON.stringify(backup));
   const child=BearProfiles.list().find(c=>c.name.includes('恢复'));
   const key=BearProfiles.storageKey('bear-learning-v1',child.id);
   localStorage.setItem(key+':base',JSON.stringify(learning));
   const now=Date.now(),event={id:String(now).padStart(16,'0')+'-artifact',action:'record',args:{id:bad[1],type:'hinted'},now,date};
   localStorage.setItem(key+':op:'+event.id,JSON.stringify(event));
   const restored=BearLearning.snapshot(child.id);
   const invalid=structuredClone(backup);invalid.children[0].learning.items['dialogue:breakfast:0:4']={hinted:1};
   let rejected=false;try{BearProfiles.inspect(JSON.stringify(invalid));}catch{rejected=true;}
   return {rows:rows[0].learning,restored,rejected};
  });
  for(const state of [result.rows,result.restored]){
   assert.equal(state.items['word-cat'].practiced,1);
   assert.ok(!Object.keys(state.items).some(k=>k.startsWith('dialogue:')));
   assert.ok(Object.values(state.activity).every(d=>[...d.ids,...d.helpIds].every(k=>!k.startsWith('dialogue:'))));
  }
  assert.equal(result.rejected,true);
  await p.reload();await p.evaluate(()=>BearProfiles.inspect(JSON.stringify(BearProfiles.export())));
 });
 await check('mixed review shows rest at completion, without repeating on completed-page render',async p=>{
  await p.evaluate(()=>{BearLearning.record('word-cat','practiced');BearLearning.settings({restMinutes:5});BearFeatures.open('review');});
  await p.locator('#begin-review').click();await p.clock.runFor(20000);
  await p.evaluate(()=>BearLearning.growth('growthSession',{seconds:300}));assert.equal(await p.locator('#learning-rest').count(),0);
  await p.locator('#mixed-listen').click();await p.evaluate(()=>document.getElementById('lesson-audio').onended());
  await p.locator('[data-mixed-answer="word-cat"]').click();await p.locator('#mixed-next').click();
  assert.equal(await p.locator('#learning-rest').evaluate(e=>e.open),true);await p.locator('#rest-later').click();
  await p.reload();assert.match(await p.locator('#features-panel').innerText(),/这一轮复习完成/);assert.equal(await p.locator('#learning-rest').count(),0);
  await p.evaluate(()=>{BearLearning.settings({restMinutes:0});BearLearning.growth('growthSession',{seconds:300});const x=BearLearningTools.reviewItem('word-cat');BearLearningTools.mixedReview(document.getElementById('features-panel'),[x],()=>{},{daily:true});});
  await p.evaluate(()=>document.getElementById('lesson-audio').onended());await p.locator('[data-mixed-answer="word-cat"]').click();await p.locator('#mixed-next').click();assert.equal(await p.locator('#learning-rest').count(),0);
 },{clock:true});
 await check('phonics navigation includes sentence blocks and opens them without horizontal overflow',async p=>{
  await p.evaluate(()=>BearHub.show('foundation'));const expected=await p.locator('[data-foundation-tab]').evaluateAll(bs=>bs.map(b=>b.dataset.foundationTab));
  await p.locator('[data-foundation-tab="phonics"]').click();
  assert.deepEqual(await p.locator('[data-phonics-tab]').evaluateAll(bs=>bs.map(b=>b.dataset.phonicsTab)),expected);
  for(const width of [320,768,1440]){await p.setViewportSize({width,height:900});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);}
  await p.locator('[data-phonics-tab="sentences"]').click();assert.equal(await p.locator('#sentence-check').count(),1);
 });
 await check('book comprehension counts once across repeat clicks, navigation, refresh and backup',async p=>{
  await p.evaluate(()=>{BearLearning.settings({readerMode:'independent'});BearFeatures.open('books');BearFeatures.openBook('milk');});
  for(let i=0;i<5;i++)await p.locator('#book-next').click();
  await p.locator('[data-book-answer="water"]').click();
  const before=await p.evaluate(()=>({item:BearLearning.get().items['question:book:milk'],counts:BearLearningTools.week().counts}));
  await p.evaluate(()=>{for(let i=0;i<3;i++)document.querySelector('[data-book-answer="water"]').click();document.querySelector('[data-book-answer="milk"]').click();});
  assert.deepEqual(await p.evaluate(()=>({item:BearLearning.get().items['question:book:milk'],counts:BearLearningTools.week().counts})),before);
  assert.equal(await p.locator('[data-book-answer="water"]').isDisabled(),true);
  await p.locator('#book-prev').click();await p.locator('#book-next').click();await p.reload();
  assert.equal(await p.locator('[data-book-answer="water"]').isDisabled(),true);
  await p.evaluate(()=>document.querySelector('[data-book-answer="water"]').click());
  assert.deepEqual(await p.evaluate(()=>BearLearning.get().items['question:book:milk']),before.item);
  const restored=await p.evaluate(async ()=>{const text=JSON.stringify(BearProfiles.export());await BearProfiles.import(text);const child=BearProfiles.list().find(c=>c.name.includes('恢复'));const s=BearLearning.snapshot(child.id);return {item:s.items['question:book:milk'],answer:s.reading.milk.answer,interactions:s.reading.milk.interactions};});
  assert.equal(restored.answer,true);assert.equal(restored.interactions.understood,true);assert.equal(restored.interactions.understoodHelped,false);assert.deepEqual(restored.item,before.item);
 });
 await check('book wrong answer persists through refresh and corrected answer keeps assisted evidence',async p=>{
  await p.evaluate(()=>{BearLearning.settings({readerMode:'independent'});BearFeatures.open('books');BearFeatures.openBook('milk');});
  for(let i=0;i<5;i++)await p.locator('#book-next').click();
  await p.locator('[data-book-answer="milk"]').click();await p.reload();
  const pending=await p.evaluate(()=>{const text=JSON.stringify(BearProfiles.export());return BearProfiles.inspect(text)[0].learning.reading.milk;});
  assert.equal(pending.answer,false);assert.equal(pending.interactions.understoodHelped,true);
  const restoredId=await p.evaluate(async ()=>{await BearProfiles.import(JSON.stringify(BearProfiles.export()));return BearProfiles.list().find(c=>c.name.includes('恢复')).id;});
  await Promise.all([p.waitForNavigation(),p.evaluate(async id=>await BearProfiles.switchTo(id),restoredId)]);
  await p.evaluate(()=>{BearFeatures.open('books');BearFeatures.openBook('milk');});
  assert.equal(await p.locator('[data-book-answer="water"]').isDisabled(),false);
  await p.locator('[data-book-answer="water"]').click();
  const state=await p.evaluate(()=>({item:BearLearning.get().items['question:book:milk'],reading:BearLearning.reading('milk'),transfer:BearLearning.get().growth.practice.transfers['word-water'].at(-1),now:Date.now()}));
  assert.equal(state.item.selected,1);assert.equal(state.item.wrong,1);assert.equal(state.item.hinted,1);assert.equal(state.item.streak,0);assert.ok(Math.abs(state.item.due-state.now-300000)<5000);
  assert.equal(state.reading.interactions.understoodHelped,true);assert.equal(state.transfer.correct,false);assert.equal(state.reading.answer,true);
 });
 await check('legacy completed book answers remain locked without changing historical evidence',async p=>{
  await p.evaluate(()=>{BearLearning.settings({readerMode:'independent'});BearLearning.reading('milk',{page:5,answer:true});BearFeatures.open('books');BearFeatures.openBook('milk');});
  assert.equal(await p.locator('[data-book-answer="water"]').isDisabled(),true);
  await p.evaluate(()=>document.querySelector('[data-book-answer="water"]').click());
  assert.equal(await p.evaluate(()=>BearLearning.get().items['question:book:milk']||null),null);
 });
 await check('static scene descriptions match the loaded course totals',async p=>{
  const x=await p.evaluate(async()=>({html:await(await fetch('index.html')).text(),categories:BEAR_CATEGORIES.length,games:LITTLE_BEAR_ROUTE.length}));
  assert.ok(x.html.includes(`${x.categories} 类生活场景与主题的 ${x.games} 个交流小游戏`));
  assert.ok(x.html.includes(`${x.categories} 类场景 · ${x.games} 个小任务`));
 });
 await check('all 500 paths resolve current review content and legacy backups remain valid',async p=>{
  const result=await p.evaluate(()=>{
   const failures=[];let total=0;
   for(const [scene,b] of Object.entries(BEAR_SCENE_BRANCHES))for(const [path,p] of b.paths.entries()){
    const expected=[[b.question,p.pick],[p.npc,p.answer],[p.end,p.endAnswer]];
    for(let round=0;round<3;round++){
     const id=BearGrowth.dialogueKey(LITTLE_BEAR_SCENES[scene],{dialogueIndex:round,selectedReply:round===0?p.pick:null,replyHistory:[p.pick]}),review=BearLearningTools.reviewItem(id);
     if(id!==`dialogue:${scene}:${path}:${round}`||review?.title!==expected[round][0]||review?.answer!==expected[round][1])failures.push(id);
     total++;
    }
   }
   BearLearning.record('dialogue:breakfast:0','practiced');
   const legacy=BearLearningTools.reviewItem('dialogue:breakfast:0');
   const backup=BearProfiles.export();BearProfiles.inspect(JSON.stringify(backup));
   const invalid=['dialogue:breakfast:2:0','dialogue:breakfast:0:4','dialogue:missing:0:0'];
   const rejected=invalid.every(id=>{const b=structuredClone(backup);b.children[0].learning.items[id]={practiced:1};try{BearProfiles.inspect(JSON.stringify(b));return false;}catch{return true;}});
   return {failures,total,legacy:{title:legacy.title,answer:legacy.answer},rejected};
  });
  assert.deepEqual(result,{failures:[],total:1500,legacy:{title:'What would you like?',answer:'Milk, please.'},rejected:true});
 });
 await check('sentence blocks and role swap count active time and show rest only at task boundaries',async p=>{
  await p.evaluate(()=>{BearLearning.settings({restMinutes:5});BearSentenceBlocks.open();document.dispatchEvent(new Event('pointerdown'));});
  await p.clock.runFor(20000);assert.ok(await p.evaluate(()=>(BearLearning.get().growth.sessions[BearLearning.today()]?.seconds||0)>=15));
  await p.evaluate(()=>BearLearning.growth('growthSession',{seconds:300}));assert.equal(await p.locator('#learning-rest').count(),0);
  const n=await p.evaluate(()=>BEAR_SENTENCE_PATTERNS[0].examples[0].blocks.length);for(let i=0;i<n;i++)await p.locator(`[data-block="${i}"]`).click();await p.locator('#sentence-check').click();assert.equal(await p.locator('#learning-rest').evaluate(e=>e.open),true);await p.screenshot({path:path.join(output,'audit-fixed-rest.png'),fullPage:true});await p.locator('#rest-later').click();
  await p.evaluate(()=>{BearRoleplay.open('breakfast');document.dispatchEvent(new Event('pointerdown'));});const start=await p.evaluate(()=>BearLearning.get().growth.sessions[BearLearning.today()].seconds);await p.clock.runFor(20000);assert.ok(await p.evaluate(start=>BearLearning.get().growth.sessions[BearLearning.today()].seconds>start,start));
  await p.evaluate(()=>BearLearning.growth('growthSession',{seconds:300}));assert.equal(await p.locator('#learning-rest').count(),0);await p.locator('#role-said').click();await p.locator('#role-skip').click();assert.equal(await p.locator('#learning-rest').evaluate(e=>e.open),true);await p.locator('#rest-later').click();
  await p.evaluate(()=>BearLearning.settings({restMinutes:0}));await p.locator('#role-said').click();await p.locator('#role-skip').click();assert.equal(await p.locator('#learning-rest').count(),0);
  for(const width of [320,768,1440]){await p.setViewportSize({width,height:900});assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await p.screenshot({path:path.join(output,`audit-fixed-role-${width}.png`),fullPage:true});}
 },{clock:true});
 }finally{await browser.close();fs.writeFileSync(path.join(output,'functional-audit-fixes.json'),JSON.stringify(results,null,2));}
 assert.equal(results.filter(x=>!x.passed).length,0);
})().catch(e=>{console.error(e);process.exitCode=1;});
