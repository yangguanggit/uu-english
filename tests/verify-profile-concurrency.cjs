// Exercise real same-origin app instances, including browsers without Web Locks.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']}),results=[];
 try{for(const fallback of [false,true])for(const scenario of ['capacity','delete','restore','switch']){
  const c=await browser.newContext({serviceWorkers:'block'});
  if(fallback)await c.addInitScript(()=>Object.defineProperty(navigator,'locks',{value:undefined,configurable:true}));
  try{
   const p=await c.newPage();await p.goto('http://localhost:8080/robots.txt');
   await p.evaluate(()=>{const f=document.createElement('iframe');f.id='a';f.src='/';document.body.append(f);});
   await p.waitForFunction(()=>document.getElementById('a').contentWindow.BearProfiles);
   if(scenario==='capacity')await p.evaluate(async()=>{const a=document.getElementById('a').contentWindow.BearProfiles;for(let i=1;i<19;i++)await a.add('孩子'+i);});
   if(scenario==='switch')await p.evaluate(()=>document.getElementById('a').contentWindow.BearProfiles.add('切换目标'));
   await p.evaluate(()=>{const f=document.createElement('iframe');f.id='b';f.src='/';document.body.append(f);});
   await p.waitForFunction(()=>document.getElementById('b').contentWindow.BearProfiles);
   const result=await p.evaluate(async scenario=>{
    const a=document.getElementById('a').contentWindow.BearProfiles,b=document.getElementById('b').contentWindow.BearProfiles;
    if(scenario==='switch'){
     const target=a.list().find(x=>x.id!=='first').id,prototype=document.getElementById('a').contentWindow.Storage.prototype,set=prototype.setItem;
     let rename;
     // Queue a stale-page rename exactly while the other page publishes its switch.
     prototype.setItem=function(k,v){const result=set.call(this,k,v);if(k==='bear-profiles-v1'&&JSON.parse(v).active===target&&!rename)rename=b.rename('原档案改名');return result;};
     await a.switchTo(target);await rename;
     return {target,live:JSON.parse(localStorage.getItem('bear-profiles-v1'))};
    }
    if(scenario==='delete'){
     const prototype=document.getElementById('a').contentWindow.Storage.prototype,set=prototype.setItem;
     let afterDelete;
     prototype.setItem=function(k,v){const result=set.call(this,k,v);if(k==='bear-profiles-v1'&&!JSON.parse(v).children.some(x=>x.id==='first')&&!afterDelete)afterDelete=Promise.allSettled([b.rename('已删除档案'),b.switchTo('first')]);return result;};
     await a.remove('first');const outcomes=await afterDelete;
     return {outcomes:[{status:'fulfilled'},...outcomes.map(x=>({status:x.status}))],live:JSON.parse(localStorage.getItem('bear-profiles-v1'))};
    }
    const operations=scenario==='capacity'?[a.add('新增孩子'),b.rename('改名后的档案'),b.add('另一个孩子')]:[a.import(JSON.stringify(a.export())),b.add('新增孩子')];
    const outcomes=await Promise.allSettled(operations);
    return {outcomes:outcomes.map(x=>({status:x.status,id:x.value})),live:JSON.parse(localStorage.getItem('bear-profiles-v1'))};
   },scenario);
   if(scenario==='capacity'){
   assert.equal(result.live.children.length,20);
   assert.equal(result.outcomes.filter(x=>x.status==='fulfilled').length,2);
   assert.equal(result.outcomes[1].status,'fulfilled');
   assert.equal(result.live.children.find(x=>x.id==='first').name,'改名后的档案');
   for(const outcome of [result.outcomes[0],result.outcomes[2]])if(outcome.status==='fulfilled')assert.ok(result.live.children.some(x=>x.id===outcome.id));
   }else if(scenario==='delete'){assert.equal(result.live.children.length,1);assert.equal(result.live.children.some(x=>x.id==='first'),false);assert.deepEqual(result.outcomes.map(x=>x.status),['fulfilled','rejected','rejected']);}
   else if(scenario==='switch'){assert.equal(result.live.children.length,2);assert.equal(result.live.active,result.target);assert.equal(result.live.children.find(x=>x.id==='first').name,'原档案改名');assert.equal(result.live.children.find(x=>x.id===result.target).name,'切换目标');}
   else{assert.equal(result.live.children.length,3);assert.ok(result.outcomes.every(x=>x.status==='fulfilled'));assert.ok(result.live.children.some(x=>x.name.includes('恢复')));assert.ok(result.live.children.some(x=>x.name==='新增孩子'));}
   results.push({fallback,scenario,passed:true});console.log('PASS profiles: '+(fallback?'IndexedDB fallback':'Web Locks')+' '+scenario);
  }finally{await c.close();}
 }}finally{await browser.close();fs.writeFileSync(path.join(output,'profile-concurrency.json'),JSON.stringify(results,null,2));}
})().catch(e=>{console.error(e);process.exitCode=1;});
