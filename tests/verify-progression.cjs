// Disposable browser contexts only. No actual child records or production data are touched.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']}),results=[];
 async function check(name,run){const context=await browser.newContext({serviceWorkers:'block',acceptDownloads:true,viewport:{width:390,height:900}}),p=await context.newPage(),errors=[];p.setDefaultTimeout(9000);p.on('pageerror',e=>errors.push(e.message));try{await p.goto('http://localhost:8080/');await run(p,context);assert.deepEqual(errors,[]);results.push({name,passed:true});console.log('PASS '+name);}catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL '+name+' '+e.stack);await p.screenshot({path:path.join(output,'progression-failure-'+results.length+'.png'),fullPage:true});}finally{await context.close();}}
 const finish=async p=>{await p.locator('#assessment-listen,#game-listen').click();await p.evaluate(()=>{let audio=document.getElementById('lesson-audio');for(let i=0;audio&&i<5;i++){audio.onended();audio=document.getElementById('lesson-audio');}});};
 async function parents(p,detail){await p.evaluate(d=>BearFeatures.openParents('profiles',d),detail);if(await p.locator('#parent-gate').evaluate(e=>e.open)){const n=(await p.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);await p.locator('#parent-gate-answer').fill(String(n[0]+n[1]));await p.locator('#parent-gate-form button[type=submit]').click();if(detail)await p.locator(`[data-parent-open=${detail}]`).click();}}
 try{
 await check('question bank rotates by retake and remains stable across refresh and backup',async p=>{
  const value=await p.evaluate(()=>{const first=BearGrowth.assessmentQuestions().map(q=>q.answer),same=BearGrowth.assessmentQuestions().map(q=>q.answer);BearLearning.growth('growthDraft',{value:{answers:[]}});const next=BearGrowth.assessmentQuestions().map(q=>q.answer);BearProfiles.inspect(JSON.stringify(BearProfiles.export()));return {first,same,next};});assert.deepEqual(value.first,value.same);assert.notDeepEqual(value.first,value.next);await p.reload();assert.deepEqual(await p.evaluate(()=>BearGrowth.assessmentQuestions().map(q=>q.answer)),value.next);
 });
 await check('failed or interrupted listening cannot be answered and skip is unscored',async p=>{
  await p.route('**/audio/**',route=>route.abort());await p.evaluate(()=>BearGrowth.assessment());assert.equal(await p.locator('[data-assess-answer]').first().isDisabled(),true);await p.waitForFunction(()=>document.getElementById('assessment-feedback').textContent.includes('未播放完成'));await p.locator('button').filter({hasText:'没听清 / 暂时无法播放'}).click();await p.locator('#assessment-next').click();const state=await p.evaluate(()=>({answers:BearLearning.get().growth.draft.answers,items:BearLearning.get().items}));assert.equal(state.answers[0].skipped,true);assert.equal(Object.values(state.items).some(x=>x.wrong>0),false);
 });
 await check('real audio completion unlocks answers; skipped placement and failed scenes do not lower evidence',async p=>{
  await p.evaluate(()=>BearGrowth.assessment());await p.locator('#assessment-listen').click();await p.waitForFunction(()=>!document.querySelector('[data-assess-answer]').disabled,null,{timeout:15000});
  await p.evaluate(()=>{BearLearning.settings({readingLevel:'L5',phonicsStage:'blends'});BearLearning.growth('growthDraft',{value:{answers:Array.from({length:8},(_,i)=>({kind:i<4?'words':i<6?'sounds':'sentences',correct:false,skipped:true}))}});BearGrowth.assessment();});assert.equal(await p.evaluate(()=>BearLearning.get().growth.assessment.level),'L5');
  await p.route('**/audio/**',route=>route.abort());await p.evaluate(()=>{BearHub.show('scenes');BearLesson.open('breakfast',false,1,true);});await p.waitForFunction(()=>document.getElementById('audio-status').textContent.includes('失败'));await p.locator('#food-grid [data-food=bread]').click();assert.equal(await p.evaluate(()=>BearLearning.get().items['scene:breakfast']?.wrong||0),0);
 });
 await check('onboarding completes after audio; selected question and progress survive refresh',async p=>{
  await p.evaluate(()=>BearGrowth.assessment());for(let i=0;i<8;i++){const id=await p.evaluate(i=>BearGrowth.assessmentQuestions()[i].answer,i);await finish(p);await p.locator(`[data-assess-answer="${id}"]`).click();await p.locator('#assessment-next').click();if(i===2)await p.reload();}assert.equal(await p.evaluate(()=>BearLearning.get().growth.assessment.level),'L3');
 });
 await check('games rotate words, resume targets and preserve independent counts',async p=>{
  const sets=[];for(let round=0;round<3;round++){await p.evaluate(()=>BearGrowth.startGame('bag',true));const ids=await p.evaluate(()=>BearLearning.get().growth.gameDrafts.bag.ids);sets.push(ids);for(let i=0;i<3;i++){await finish(p);await p.locator(`[data-pack="${ids[i]}"]`).click();await p.locator('#game-place').click();if(i===0){await p.reload();assert.deepEqual(await p.evaluate(()=>BearLearning.get().growth.gameDrafts.bag.ids),ids);}}assert.equal(await p.evaluate(()=>BearLearning.get().growth.games.bag.correct),3);}assert.ok(sets.some(ids=>JSON.stringify(ids)!==JSON.stringify(sets[0])));
 });
 await check('250 semantic scenes follow 500 paths, resume and end at three rounds; exact audio exists in both voices',async p=>{
  const all=await p.evaluate(()=>{
   let paths=0;for(const [id,b] of Object.entries(BearGrowth.branches))for(const branch of b.paths){
    BearHub.show('simulation');BearLesson.open(id,true,1,true);
    const choose=text=>{const button=[...document.querySelectorAll('[data-reply]')].find(b=>b.dataset.reply===text);if(!button)throw Error('Missing reply '+id+':'+text);button.click();};
    choose(branch.pick);document.getElementById('practice-button').click();
    if(document.querySelector('.dialogue-partner strong').textContent!==branch.npc)throw Error('Wrong path '+id);
    choose(branch.answers[1]);document.getElementById('practice-button').click();
    choose(branch.endAnswers[1]);document.getElementById('practice-button').click();
    if(BearLesson.checkpoint().state.dialogueIndex!==3||!document.getElementById('bubble-chinese').textContent.includes(branch.result))throw Error('Not finished '+id);
    paths++;
   }return paths;
  });assert.equal(all,500);
  // Both paths of representative early, expanded and last scenes survive a real reload.
  for(const id of ['breakfast','kitchen-cup','clinic-tummy','aquarium-place-3','airport-seat','hotel-leave']){
   const b=await p.evaluate(id=>BearGrowth.branches[id],id);for(const branch of b.paths){
    await p.evaluate(id=>{BearHub.show('simulation');BearLesson.open(id,true,1,true);},id);
    await p.getByRole('button',{name:branch.pick,exact:true}).click();await p.locator('#practice-button').click();await p.reload();
    assert.equal(await p.locator('.dialogue-partner strong').innerText(),branch.npc);
    await p.locator('#practice-button').click();await p.locator('#practice-button').click();assert.ok((await p.locator('#bubble-chinese').innerText()).includes(branch.result));
   }
  }
  const missing=await p.evaluate(async()=>{const catalog=await(await fetch('offline-assets.json')).json(),missing=[];for(const [text,stem] of Object.entries(BEAR_EXTRA_AUDIO))for(const voice of ['child','adult']){const f=BearVoices.resolve(stem+'.wav',voice).file;if(!catalog.audio[f])missing.push(text+voice);}return missing;});assert.deepEqual(missing,[]);
 });
 await check('all books have grounded level prompts and comprehension attempts survive backup',async p=>{
  assert.deepEqual(await p.evaluate(()=>BEAR_BOOKS.filter(b=>!BEAR_READING_ACTIVITIES[b.id]||BEAR_READING_ACTIVITIES[b.id].question!==b.question||!b.pages.some(p=>p[1]===BEAR_READING_ACTIVITIES[b.id].quote)).map(b=>b.id)),[]);
  await p.evaluate(()=>{BearLearning.settings({readerMode:'independent'});BearFeatures.open('books');BearFeatures.openBook('milk');BearLesson.pause();});while(!await p.locator('[data-understand]').count())await p.locator('#book-next').click();await p.locator('.story-activity summary').first().click();await p.locator('[data-understand=water]').click();await p.locator('.discuss-done').click();assert.deepEqual(await p.evaluate(()=>{BearProfiles.inspect(JSON.stringify(BearProfiles.export()));const x=BearLearning.reading('milk').interactions;return [x.understood,x.discussed];}),[true,true]);await p.screenshot({path:path.join(output,'progression-book-390.png'),fullPage:true});
 });
 await check('progression requires delayed transfer, current positive evidence and parent confirmation',async p=>{
  await p.evaluate(()=>{const ids=BEAR_FOUNDATIONS.words.slice(0,5).map(w=>w.id),transfers={};for(const id of ids){BearLearning.record(id,'selected');transfers[id]=[{day:'2026-10-17',context:'review',correct:true},{day:BearLearning.today(),context:'game-bag',correct:true}];}BearLearning.growth('growthPractice',{value:{transfers}});});assert.equal(await p.evaluate(()=>BearGrowth.recommendation().ready),true);await parents(p,'assessment');await p.locator('summary').filter({hasText:'跨情境巩固与进阶建议'}).click();assert.equal(await p.evaluate(()=>BearLearning.get().settings.readingLevel||'L1'),'L1');await p.locator('#growth-level-up').click();assert.equal(await p.evaluate(()=>BearLearning.get().settings.readingLevel),'L2');const valid=await p.evaluate(()=>{BearProfiles.inspect(JSON.stringify(BearProfiles.export()));const id=BEAR_FOUNDATIONS.words[0].id;BearLearning.record(id,'wrong');return BearGrowth.recommendation().passed.includes(id);});assert.equal(valid,false);
 });
 await check('update check distinguishes content revision, requires backup confirmation and handles offline',async p=>{
  await parents(p,'updates');await p.locator('#app-check-update').click();await p.waitForFunction(()=>document.getElementById('app-update-status').textContent.includes('最新内容'));await p.route('**/offline-assets.json?check=*',async route=>{const response=await route.fetch(),data=await response.json();data.revision='f'.repeat(64);await route.fulfill({response,json:data});});await p.locator('#app-check-update').click();await p.locator('#app-update-actions').waitFor({state:'visible'});assert.equal(await p.locator('#app-apply-update').isDisabled(),true);const download=p.waitForEvent('download');await p.locator('#app-update-backup').click();assert.match((await download).suggestedFilename(),/更新前进度/);await p.locator('#app-backup-saved').check();assert.equal(await p.locator('#app-apply-update').isEnabled(),true);await p.screenshot({path:path.join(output,'progression-parent-390.png'),fullPage:true});await p.unroute('**/offline-assets.json?check=*');await p.route('**/offline-assets.json?check=*',route=>route.abort());await p.locator('#app-check-update').click();await p.waitForFunction(()=>document.getElementById('app-update-status').textContent.includes('暂时无法'));assert.equal(await p.evaluate(()=>!!BearLearning.get().growth),true);
 });
 }finally{fs.writeFileSync(path.join(output,'progression-results.json'),JSON.stringify(results,null,2));await browser.close();}if(results.some(r=>!r.passed))process.exitCode=1;
})();
