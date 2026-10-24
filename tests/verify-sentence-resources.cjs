// Verify authored sentences, both voice packs, served decodability and offline inclusion.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {root}=require('./helpers/paths.cjs'),{chromium}=require('./helpers/browser.cjs');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data/scenes/sentence-patterns.js'),'utf8'),context);
const patterns=JSON.parse(JSON.stringify(context.window.BEAR_SENTENCE_PATTERNS));
const adult=new Map(JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/learning-manifest.json'))).map(r=>[r.file,r]));
const child=new Map(JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/child-voice-manifest.json'))).recordings.map(r=>[r.file,r]));
assert.equal(patterns.length,10);assert.equal(new Set(patterns.map(p=>p.id)).size,10);
assert.equal(new Set(patterns.flatMap(p=>p.examples.map(e=>e.text))).size,100);
for(const p of patterns){assert.equal(p.examples.length,10);for(const e of p.examples){
 assert.match(e.zh,/[\u4e00-\u9fff]/);assert.ok(e.blocks.length>=2);
 assert.equal(e.blocks.join(' ').replace(/\s+([,.!?])/g,'$1'),e.text);
 assert.equal(adult.get(e.file)?.text,e.text,'Wrong adult recording: '+e.text);
}}
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true,args:['--mute-audio']});try{
 const page=await browser.newPage({serviceWorkers:'block'});await page.goto('http://localhost:8080/');
 const rows=await page.evaluate(()=>BEAR_SENTENCE_PATTERNS.flatMap(p=>p.examples.map(e=>({text:e.text,sceneValid:!!LITTLE_BEAR_SCENES[e.scene],offline:BearLesson.filesForScene(e.scene).includes(e.file),file:e.file,child:BearVoices.resolve(e.file,'child').file}))));
 for(const r of rows){assert.equal(r.sceneValid,true);assert.equal(r.offline,true);assert.equal(child.get(r.child)?.text,r.text.replace(/\bUU\b/g,'U U'));}
 const files=[...new Set(rows.flatMap(r=>[adult.get(r.file).asset,r.child]))];
 const count=await page.evaluate(async files=>{const audio=new AudioContext();try{for(const file of files){const response=await fetch('audio/'+file.split('/').map(encodeURIComponent).join('/'));if(!response.ok)throw Error('Missing audio '+file);const decoded=await audio.decodeAudioData(await response.arrayBuffer());if(decoded.duration<.1)throw Error('Empty audio '+file);}return files.length;}finally{await audio.close();}},files);
 console.log(`PASS 10 × 10 unique sentences, exact adult/child text mapping, ${count} served audio decodes and associated offline scenes`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
