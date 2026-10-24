// Isolated profiles only: grouped parent navigation, restricted storage and offline filtering.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});
 const results=[];fs.mkdirSync(output,{recursive:true});
 async function gate(p){const n=(await p.locator('#parent-gate-question').innerText()).match(/\d+/g).map(Number);await p.locator('#parent-gate-answer').fill(String(n[0]+n[1]));await p.locator('#parent-gate-form button[type=submit]').click();}
 async function parents(p,tab='practice'){await p.evaluate(t=>BearFeatures.openParents(t),tab);if(await p.locator('#parent-gate').evaluate(e=>e.open))await gate(p);}
 async function check(name,fn,setup){const context=await browser.newContext({serviceWorkers:'block',viewport:{width:390,height:900}});const page=await context.newPage(),errors=[];page.setDefaultTimeout(6000);page.on('pageerror',e=>errors.push(e.message));try{if(setup)await setup(page);await page.goto('http://localhost:8080/');await fn(page);assert.deepEqual(errors,[]);results.push({name,passed:true});console.log('PASS '+name);}catch(e){results.push({name,passed:false,error:e.stack});console.error('FAIL '+name+': '+e.message);}finally{await context.close();}}
 try{
 await check('custom selects retain their accessible purpose and selected value',async p=>{
  await parents(p,'profiles');await p.locator('[data-parent-open=quality]').click();
  await p.locator('summary').filter({hasText:'查找审校记录'}).click();
  assert.equal(await p.locator('#review-filter-button').getAttribute('aria-label'),'筛选状态：全部');
  await p.locator('#review-filter-button').click();
  assert.equal(await p.locator('.select-options').getAttribute('aria-label'),'筛选状态');
  await p.locator('.select-option[data-value=pending]').click();
  assert.equal(await p.locator('#review-filter').inputValue(),'pending');
  assert.equal(await p.locator('#review-filter-button').getAttribute('aria-label'),'筛选状态：待审');
  await p.evaluate(()=>{
   const box=document.createElement('section');box.id='label-fixture';
   box.innerHTML='<span id="reference-label">引用名称</span><select id="reference-select" aria-labelledby="reference-label" aria-label="次要名称"><option>甲</option></select><select id="explicit-select" aria-label="显式名称"><option>乙</option></select><label for="external-select">外部名称</label><select id="external-select"><option>丙</option></select><label>包裹名称<select id="wrapped-select"><option>丁</option></select></label><select id="unnamed-select"><option>戊</option></select>';
   document.body.append(box);BearSelect.mountAll(box);
  });
  for(const [id,title,value] of [['reference','引用名称','甲'],['explicit','显式名称','乙'],['external','外部名称','丙'],['wrapped','包裹名称','丁'],['unnamed','选择选项','戊']]){
   const button=p.locator('#'+id+'-select-button');
   assert.equal(await button.getAttribute('aria-label'),title+'：'+value);
   await button.press('Enter');assert.equal(await p.locator('.select-options').getAttribute('aria-label'),title);
   await button.press('Escape');
  }
 });
 await check('restricted local storage keeps parent tabs and settings usable',async p=>{
  await parents(p,'profiles');assert.equal(await p.locator('.parent-tabs button').count(),3);
  await p.locator('[data-parent-open=playback]').click();await p.locator('#playback-voice-button').click();await p.locator('.select-option[data-value=adult]').click();assert.equal(await p.evaluate(()=>BearLearning.get().settings.voice),'adult');
  await p.locator('#page-back').click();await p.locator('[data-parent-open=backup]').click();assert.match(await p.locator('#backup-reminder').innerText(),/无法保存/);
 },p=>p.addInitScript(()=>{Storage.prototype.getItem=function(){throw new DOMException('Access denied','SecurityError');};Storage.prototype.setItem=function(){throw new DOMException('Access denied','SecurityError');};}));
 await check('an unavailable reminder timestamp does not prevent a valid backup download',async p=>{
  await parents(p,'profiles');await p.locator('[data-parent-open=backup]').click();const download=p.waitForEvent('download');await p.locator('#export-backup').click();assert.match((await download).suggestedFilename(),/学习进度/);assert.match(await p.locator('#family-status').innerText(),/已生成/);
 },p=>p.addInitScript(()=>{for(const method of ['getItem','setItem']){const native=Storage.prototype[method];Storage.prototype[method]=function(key,...args){if(key==='bear-backup-last-export')throw new DOMException('Access denied','SecurityError');return native.call(this,key,...args);};}}));
 await check('empty weekly recommendation opens the actual daily route; weak items still start review',async p=>{
  await parents(p);await p.locator('[data-parent-open=weak]').click();assert.match(await p.locator('#weekly-review').innerText(),/查看今天的路线/);await p.locator('#weekly-review').click();assert.equal(await p.evaluate(()=>BearNavigation.isParent()),false);assert.equal(await p.evaluate(()=>BearNavigation.capture().key),'feature:today');
  await p.evaluate(()=>BearLearning.record('word-cat','wrong'));await parents(p);await p.locator('[data-parent-open=weak]').click();assert.match(await p.locator('#weekly-review').innerText(),/巩固/);await p.locator('#weekly-review').click();assert.equal(await p.locator('[data-mixed-answer]').count()>0,true);
 });
 await check('all secondary pages have working top back, refresh gate and correct root tabs at three widths',async p=>{
  const pages={practice:['report','weak','familyGame'],profiles:['plan','playback','children','backup'],offline:['downloads','storage']};
  for(const width of [320,768,1440]){await p.setViewportSize({width,height:900});for(const [tab,details] of Object.entries(pages)){
   await parents(p,tab);assert.equal(await p.locator('#page-back').isVisible(),false);assert.equal(await p.locator('[data-parent-detail]:visible').count(),0);
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   await p.screenshot({path:path.join(output,`parent-${tab}-${width}.png`),fullPage:true});
   for(const id of details){await p.locator(`[data-parent-open=${id}]`).click();assert.equal(await p.locator(`[data-parent-detail=${id}]`).isVisible(),true);assert.equal(await p.locator('[data-parent-detail]:visible').count(),1);assert.equal(await p.locator('#page-back').isVisible(),true);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width}/${id}`);
    if(id==='playback'){const voice=await p.locator('.voice-control').boundingBox(),speed=await p.locator('#playback-speed-button').boundingBox();assert.ok(voice.y<speed.y);await p.locator('#playback-speed-button').click();await p.locator('.select-option[data-value=slow]').click();assert.equal(await p.evaluate(()=>BearLearning.get().settings.speed),'slow');await p.locator('button[data-child-mode=little]').click();assert.equal(await p.locator('[data-parent-detail=playback]').isVisible(),true);}
    assert.equal(await p.locator('.site-header').evaluate(e=>[...e.children].filter(n=>getComputedStyle(n).display!=='none').every(n=>n.getBoundingClientRect().left>=0&&n.getBoundingClientRect().right<=innerWidth)),true,'header fits viewport');
    await p.evaluate(()=>window.scrollTo(0,0));if(width===320)await p.screenshot({path:path.join(output,`parent-detail-${id}-${width}.png`),fullPage:true});
    await p.locator('#page-back').click();assert.equal(await p.locator('#page-back').isVisible(),false);assert.equal(await p.locator(`#parent-tab-${tab}`).getAttribute('aria-selected'),'true');
   }
  }}
  await parents(p,'profiles');await p.locator('[data-parent-open=plan]').click();await p.locator('#plan-minutes-button').click();await p.locator('.select-option[data-value="5"]').click();await p.locator('#apply-plan').click();assert.equal(await p.evaluate(()=>BearLearning.plan().minutes),5);
  await p.reload();assert.equal(await p.locator('#parent-gate').evaluate(e=>e.open),true);await gate(p);assert.equal(await p.locator('[data-parent-detail=plan]').isVisible(),true);await p.locator('#page-back').click();assert.equal(await p.locator('#child-select-button').isVisible(),true);
  await p.locator('[data-parent-open=backup]').click();await p.locator('#parent-tab-offline').click();assert.equal(await p.locator('[data-parent-detail]:visible').count(),0);assert.equal(await p.locator('#page-back').isVisible(),false);
 });
 await check('offline management searches all themes and filters downloaded packs',async p=>{
  await p.evaluate(()=>{BearOffline.status=async()=>[{id:BEAR_LEARNING_THEMES[0].id},{id:BEAR_LEARNING_THEMES[1].id}];BearOffline.bundle=async id=>({bytes:1024,files:[]});BearOffline.verify=async id=>id===BEAR_LEARNING_THEMES[0].id;});
  await parents(p,'offline');await p.waitForFunction(()=>document.querySelector('#offline-summary').textContent.startsWith('1 /'));
  await p.locator('[data-parent-open=downloads]').click();assert.equal(await p.locator('#offline-list [data-theme-title]:visible').count(),50);
  await p.locator('#offline-downloaded-only').check();assert.equal(await p.locator('#offline-list [data-theme-title]:visible').count(),2);assert.equal(await p.locator('#offline-list [data-theme-title]:visible').filter({hasText:'待更新'}).count(),1);
  await p.locator('#offline-search').fill('不存在的主题');assert.equal(await p.locator('#offline-list [data-theme-title]:visible').count(),0);assert.match(await p.locator('#offline-filter-count').innerText(),/0/);
  await p.locator('#offline-search').fill('');await p.locator('#offline-downloaded-only').uncheck();assert.equal(await p.locator('#offline-list [data-theme-title]:visible').count(),50);
 });
 }finally{await browser.close();fs.writeFileSync(path.join(output,'parent-pages.json'),JSON.stringify(results,null,2));}
 assert.equal(results.filter(r=>!r.passed).length,0,JSON.stringify(results.filter(r=>!r.passed)));
})().catch(e=>{console.error(e);process.exitCode=1;});
