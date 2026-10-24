// Isolated browser storage: physical deletion, checkpoint crash recovery and tab concurrency.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
 const results=[];
 async function test(name,run){
  const context=await browser.newContext({serviceWorkers:'block'}),page=await context.newPage(),errors=[];
  context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));page.on('pageerror',e=>errors.push(e.message));
  try{await page.goto('http://localhost:8080/');await run(page,context);assert.deepEqual(errors,[]);results.push({name,passed:true});console.log('PASS '+name);}
  catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL '+name+': '+e.message);}
  finally{await context.close();}
 }
 try{
 await test('clear removes history and migrated copies while preserving another child and shared storage',async p=>{
  const result=await p.evaluate(async ()=>{
   BearLearning.record('word-apple','practiced',{foundation:true});BearLearning.favorite('word-apple');
   BearLearning.reading(BEAR_BOOKS[0].id,{page:2,heard:[0,1]});BearLearning.settings({voice:'adult',speed:'slow'});
   const other=await BearProfiles.add('保留档案'),otherKey=BearProfiles.storageKey('bear-learning-v1',other);
   const saved=structuredClone(BearLearning.get());localStorage.setItem(otherKey,JSON.stringify(saved));
   localStorage.setItem('bear-shared-test','unchanged');
   for(const store of ['bear-foundation-v1','little-bear-breakfast-v1'])localStorage.setItem(BearProfiles.storageKey(store),'["old"]');
   localStorage.setItem('bear-learning-v1','{"private":"old"}');
   const key=BearProfiles.storageKey('bear-learning-v1'),oldKeys=Object.keys(localStorage).filter(k=>k===key||k.startsWith(key+':'));
   BearLearning.clear();
   const s=BearLearning.get(),backup=JSON.stringify(BearProfiles.export());BearProfiles.inspect(backup);
   return {oldRemaining:oldKeys.filter(k=>localStorage.getItem(k)!==null),items:s.items,foundation:s.foundation,reading:s.reading,favorites:s.favorites,voice:s.settings.voice,speed:s.settings.speed,
    otherUnchanged:localStorage.getItem(otherKey)===JSON.stringify(saved),shared:localStorage.getItem('bear-shared-test'),legacy:localStorage.getItem('bear-learning-v1'),scene:localStorage.getItem(BearProfiles.storageKey('little-bear-breakfast-v1'))};
  });
  assert.deepEqual(result,{oldRemaining:[],items:{},foundation:{},reading:{},favorites:[],voice:'child',speed:'medium',otherUnchanged:true,shared:'unchanged',legacy:null,scene:null});
  await p.reload();assert.equal(await p.evaluate(()=>BearLearning.get().items['word-apple']),undefined);
 });
 await test('stale unsaved events do not return after another tab clears; new events merge',async(a,c)=>{
  const b=await c.newPage();await b.goto('http://localhost:8080/');
  await b.evaluate(()=>{const native=Storage.prototype.setItem;window.restoreStorage=()=>Storage.prototype.setItem=native;Storage.prototype.setItem=function(k,v){if(k.includes(':op:'))throw new DOMException('Full','QuotaExceededError');return native.call(this,k,v);};BearLearning.record('word-apple','practiced');});
  assert.equal(await b.evaluate(()=>BearLearning.persistent()),false);
  await a.evaluate(()=>BearLearning.clear());
  await b.evaluate(()=>{restoreStorage();BearLearning.record('word-cat','practiced');});
  await a.evaluate(()=>BearLearning.record('word-cat','practiced'));
  for(const p of [a,b]){await p.reload();const items=await p.evaluate(()=>BearLearning.get().items);assert.equal(items['word-apple'],undefined);assert.equal(items['word-cat'].practiced,2);}
 });
 await test('automatic compaction and parallel writes preserve exact counts and backup recovery',async(a,c)=>{
  const b=await c.newPage();await b.goto('http://localhost:8080/');
  await Promise.all([a,b].map(p=>p.evaluate(()=>{for(let i=0;i<180;i++)BearLearning.record('word-cat','practiced');})));
  await a.waitForFunction(()=>Object.keys(localStorage).some(k=>k.startsWith(BearProfiles.storageKey('bear-learning-v1')+':')&&k.endsWith(':checkpoint')),null,{polling:100});
  await a.evaluate(async()=>{await BearLearning.compact();await BearLearning.compact();});
  const restoredInOtherTab=b.waitForEvent('load');
  const result=await a.evaluate(async ()=>{
   const key=BearProfiles.storageKey('bear-learning-v1'),ops=Object.keys(localStorage).filter(k=>k.startsWith(key+':')&&k.includes(':op:')).length;
   const backup=JSON.stringify(BearProfiles.export());await BearProfiles.import(backup);
   return {count:BearLearning.get().items['word-cat'].practiced,ops,restored:BearProfiles.export().children.at(-1).learning.items['word-cat'].practiced};
  });
  assert.equal(result.count,360);assert.equal(result.restored,360);assert.equal(result.ops,0);
  await restoredInOtherTab;assert.equal(await b.evaluate(()=>BearLearning.get().items['word-cat'].practiced),360);
 });
 await test('checkpoint write failure and interrupted deletion keep each event exactly once',async p=>{
  const result=await p.evaluate(async()=>{
   for(let i=0;i<12;i++)BearLearning.record('word-cat','practiced');
   const set=Storage.prototype.setItem,remove=Storage.prototype.removeItem;
   Storage.prototype.setItem=function(k,v){if(k.endsWith(':checkpoint'))throw new DOMException('Full','QuotaExceededError');return set.call(this,k,v);};
   const failed=await BearLearning.compact(),before=BearLearning.get().items['word-cat'].practiced;Storage.prototype.setItem=set;
   let interrupted=false;Storage.prototype.removeItem=function(k){if(k.includes(':op:')&&!interrupted){interrupted=true;throw Error('Simulated interruption');}return remove.call(this,k);};
   const partial=await BearLearning.compact();Storage.prototype.removeItem=remove;
   const after=BearLearning.get().items['word-cat'].practiced;BearLearning.record('word-cat','practiced');
   const retry=await BearLearning.compact();return {failed,before,partial,after,retry,count:BearLearning.get().items['word-cat'].practiced};
  });
  assert.deepEqual(result,{failed:false,before:12,partial:false,after:12,retry:true,count:13});
  await p.reload();assert.equal(await p.evaluate(()=>BearLearning.get().items['word-cat'].practiced),13);
 });
 await test('checkpoint keeps late appends and excludes unsaved events until storage recovers',async p=>{
  const result=await p.evaluate(async()=>{
   BearLearning.record('word-cat','practiced');const set=Storage.prototype.setItem;
   Storage.prototype.setItem=function(k,v){if(k.includes(':op:'))throw new DOMException('Full','QuotaExceededError');return set.call(this,k,v);};
   BearLearning.record('word-cat','practiced');await BearLearning.compact();Storage.prototype.setItem=set;
   const visible=BearLearning.get().items['word-cat'].practiced;
   BearLearning.record('word-cat','practiced');
   Storage.prototype.setItem=function(k,v){const result=set.call(this,k,v);if(k.endsWith(':checkpoint')){Storage.prototype.setItem=set;BearLearning.record('word-cat','practiced');}return result;};
   await BearLearning.compact();return {visible,count:BearLearning.get().items['word-cat'].practiced};
  });assert.deepEqual(result,{visible:2,count:4});
  await p.reload();assert.equal(await p.evaluate(()=>BearLearning.get().items['word-cat'].practiced),4);
 });
 await test('late old writes cannot replace newer checkpoint fields; additive evidence still merges',async(a,c)=>{
  const b=await c.newPage();await b.goto('http://localhost:8080/');
  await a.evaluate(()=>{
   const set=Storage.prototype.setItem;window.restoreStorage=()=>Storage.prototype.setItem=set;
   Storage.prototype.setItem=function(k,v){if(k.includes(':op:'))throw new DOMException('Full','QuotaExceededError');return set.call(this,k,v);};
   BearLearning.settings({voice:'adult',speed:'slow'});
   BearLearning.reading(BEAR_BOOKS[0].id,{page:1,heard:[0],interactions:{spot:false}});
   BearLearning.growth('growthGameDraft',{id:'test',value:{step:1}});
   BearLearning.record('word-cat','practiced');
  });
  await b.evaluate(async()=>{
   BearLearning.settings({voice:'child'});
   BearLearning.reading(BEAR_BOOKS[0].id,{page:3,heard:[2],interactions:{spot:true}});
   BearLearning.growth('growthGameDraft',{id:'test',value:{step:3}});
   BearLearning.record('word-cat','practiced');
   await BearLearning.compact();
   BearLearning.settings({chinese:false});await BearLearning.compact();
  });
  await a.evaluate(()=>{restoreStorage();BearLearning.settings({planMinutes:5});});
  for(const p of [a,b]){
   const value=await p.evaluate(()=>{const s=BearLearning.get(),r=s.reading[BEAR_BOOKS[0].id];return {voice:s.settings.voice,speed:s.settings.speed,chinese:s.settings.chinese,minutes:s.settings.planMinutes,page:r.page,heard:r.heard.sort(),spot:r.interactions.spot,draft:s.growth.gameDrafts.test,count:s.items['word-cat'].practiced};});
   assert.deepEqual(value,{voice:'child',speed:'slow',chinese:false,minutes:5,page:3,heard:[0,2],spot:true,draft:{step:3},count:2});
  }
  await b.evaluate(()=>BearLearning.compact());await a.reload();
  assert.equal(await a.evaluate(()=>BearLearning.get().settings.voice),'child');
  assert.equal(await a.evaluate(()=>BearLearning.get().items['word-cat'].practiced),2);
 });
 await test('old-format checkpoints retain selections and advance the logical clock',async p=>{
  const result=await p.evaluate(async()=>{
   BearLearning.settings({voice:'child'});await BearLearning.compact();
   const key=Object.keys(localStorage).find(k=>k.endsWith(':checkpoint')),checkpoint=JSON.parse(localStorage.getItem(key));
   const newest=checkpoint.lastId,late={id:'0000000000000001-legacy-delayed',action:'settings',args:{change:{voice:'adult'}},now:1,date:BearLearning.today()};
   delete checkpoint.versions;delete checkpoint.floor;delete checkpoint.lastId;
   localStorage.setItem(key,JSON.stringify(checkpoint));localStorage.setItem(key.replace(/:checkpoint$/,':op:')+late.id,JSON.stringify(late));
   const retained=BearLearning.get().settings.voice;await BearLearning.compact();
   BearLearning.settings({voice:'adult'});return {retained,newer:BearLearning.get().settings.voice,last:JSON.parse(localStorage.getItem(key)).lastId>=newest};
  });assert.deepEqual(result,{retained:'child',newer:'adult',last:true});
 });
 await test('storage-denied clear keeps progress and displays an error without reload',async p=>{
  await p.evaluate(()=>{BearLearning.record('word-cat','practiced');BearFeatures.openParents('profiles');});
  const n=(await p.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);
  await p.locator('#parent-gate-answer').fill(String(n[0]+n[1]));await p.locator('#parent-gate-form button[type=submit]').click();
  await p.locator('[data-parent-open=backup]').click();await p.locator('details').filter({has:p.locator('#clear-learning')}).locator('summary').click();await p.locator('#clear-learning').click();
  await p.evaluate(()=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.endsWith(':epoch'))throw new DOMException('Denied','SecurityError');return set.call(this,k,v);};});
  await p.locator('#confirm-clear').click();assert.match(await p.locator('#clear-error').innerText(),/无法清除/);
  assert.equal(await p.evaluate(()=>BearLearning.get().items['word-cat'].practiced),1);
 });
 await test('reset during checkpoint creation discards the stale checkpoint',async p=>{
  const result=await p.evaluate(async()=>{
   BearLearning.record('word-cat','practiced');const set=Storage.prototype.setItem;let oldCheckpoint;
   Storage.prototype.setItem=function(k,v){const result=set.call(this,k,v);if(k.endsWith(':checkpoint')){oldCheckpoint=k;Storage.prototype.setItem=set;BearLearning.clear();BearLearning.record('word-apple','practiced');}return result;};
   const compacted=await BearLearning.compact();return {compacted,stale:localStorage.getItem(oldCheckpoint),cat:!!BearLearning.get().items['word-cat'],apple:BearLearning.get().items['word-apple'].practiced};
  });assert.deepEqual(result,{compacted:false,stale:null,cat:false,apple:1});
 });
 await test('delayed resets and successes preserve chronological scheduling across repeated checkpoints',async(p,c)=>{
  const b=await c.newPage();await b.goto('http://localhost:8080/');
  let sequence=0;
  for(const compact of [false,true])for(const delayed of ['wrong','selected']){
   const base=1800000000000+(sequence++)*10000;
   await p.evaluate(()=>BearLearning.clear());
   await p.evaluate(({type,base})=>{const set=Storage.prototype.setItem;window.restoreWrites=()=>Storage.prototype.setItem=set;window.originalNow=Date.now;Date.now=()=>base-1000;BearLearning.record('word-apple','selected');Date.now=()=>base;Storage.prototype.setItem=function(k,v){if(k.includes(':op:'))throw new DOMException('Full','QuotaExceededError');return set.call(this,k,v);};BearLearning.record('word-apple',type);},{type:delayed,base});
   await b.evaluate(async ({compact,base,delayed})=>{const old=Date.now;Date.now=()=>base+1000;if(delayed==='selected')BearLearning.record('word-apple','wrong');if(compact)await BearLearning.compact();Date.now=()=>base+2000;BearLearning.record('word-apple','selected');if(compact)await BearLearning.compact();Date.now=old;},{compact,base,delayed});
   const result=await p.evaluate(async()=>{restoreWrites();Date.now=originalNow;BearLearning.settings({chinese:false});await BearLearning.compact();const x=BearLearning.get().items['word-apple'];return {streak:x.streak,due:x.due,selected:x.selected,wrong:x.wrong,familiar:BearGrowth.familiar('word-apple')};});
   assert.deepEqual(result,{streak:1,due:base+2000+86400000,selected:delayed==='selected'?3:2,wrong:1,familiar:true});
  }
 });
 await test('without Web Locks compaction safely retains events and clear still deletes history',async p=>{
  const result=await p.evaluate(async()=>{
   Object.defineProperty(navigator,'locks',{value:undefined,configurable:true});BearLearning.record('word-cat','practiced');
   const compacted=await BearLearning.compact(),count=BearLearning.get().items['word-cat'].practiced;
   BearLearning.clear();return {compacted,count,cleared:!BearLearning.get().items['word-cat']};
  });assert.deepEqual(result,{compacted:false,count:1,cleared:true});
 });
 }finally{await browser.close();fs.writeFileSync(path.join(output,'learning-journal.json'),JSON.stringify(results,null,2));}
 assert.equal(results.filter(r=>!r.passed).length,0,JSON.stringify(results.filter(r=>!r.passed)));
})().catch(e=>{console.error(e);process.exitCode=1;});
