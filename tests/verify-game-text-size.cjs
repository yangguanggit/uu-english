const assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('./helpers/browser.cjs'),{output}=require('./helpers/paths.cjs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(process.env.BEAR_TEST_URL||'http://localhost:8080/');
 const selectors={puzzle:'.spelling-pieces>button',moles:'.spelling-holes strong',blocks:'.spelling-sky>span',match:'.spelling-match-card strong',memory:'.spelling-match-card strong',treasure:'.treasure-cell small',balloons:'.word-balloon strong',bingo:'.bingo-grid strong',train:'.train-platform>button',detective:'.detective-clues>button strong'};
 for(const width of [320,768,1440]){
  await page.setViewportSize({width,height:950});
  for(const kind of ['words','sentences'])for(const [mode,selector] of Object.entries(selectors)){
   await page.evaluate(()=>BearFeatures.open('spelling-games'));
   await page.locator(`[data-spelling-kind=${kind}]`).click();await page.locator(`[data-spelling-mode=${mode}]`).click();await page.locator('#spelling-start').click();
   let standard,control;
   for(const [size,scale] of [['standard',1],['large',1.15],['extra',1.3]]){
    await page.evaluate(size=>BearLearning.settings({textSize:size}),size);
    const actual=await page.locator(selector).first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    const nav=await page.locator('#spelling-listen').evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    if(size==='standard'){standard=actual;control=nav;}
    assert.ok(Math.abs(actual-standard*scale)<.05,`${width}/${kind}/${mode}/${size}: ${actual} vs ${standard*scale}`);
    assert.equal(nav,control,'control font must stay independent');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${width}/${kind}/${mode}/${size}: page overflow`);
   }
   if(kind==='sentences'&&['memory','train','balloons'].includes(mode)){
    await page.locator('#spelling-arena').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(output,`game-extra-${mode}-${width}.png`),fullPage:true});
   }
  }
 }
 assert.deepEqual(errors,[]);console.log('PASS 10 games × words/sentences × 3 text sizes × 3 viewports; independent controls and no horizontal overflow');
}finally{await browser.close();}})().catch(error=>{console.error(error);process.exitCode=1;});
