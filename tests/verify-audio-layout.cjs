// Physical file placement must not change curriculum IDs or recorded learning events.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
const {root}=require('./helpers/paths.cjs'),{audioFiles,regularFile}=require('../scripts/runtime-files.cjs');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/learning-manifest.json'))),catalog=JSON.parse(fs.readFileSync(path.join(root,'offline-assets.json')));
const packs=require('../scripts/voice-pack.cjs').validateRegistry(),scope={window:{BEAR_VOICE_PACKS:packs},BearLearning:{get:()=>({settings:{voice:'child'}})}};
vm.runInNewContext(fs.readFileSync(path.join(root,'src/shared/audio/voice-packs.js'),'utf8'),scope);
vm.runInNewContext(fs.readFileSync(path.join(root,'src/shared/audio/voices.js'),'utf8'),scope);const resolve=scope.window.BearVoices.resolve;
const files=audioFiles(root);assert.deepEqual([...files].sort(),Object.keys(catalog.audio).sort());
assert.equal(fs.readdirSync(path.join(root,'audio')).some(file=>/\.(wav|mp3)$/.test(file)),false);
for(const row of manifest){
 assert.ok(!row.file.includes('/'),'Logical ID must stay stable');assert.equal(resolve(row.file,'adult').file,row.asset);regularFile(root,'audio/'+row.asset);
 for(const voice of ['adult','child']){const result=resolve(row.file,voice);assert.equal(Object.hasOwn(catalog.audio,result.file),true,row.file+':'+voice);if(row.synthesis==='original-human-recording'){assert.equal(result.shared,true);assert.ok(result.file.startsWith('standard/'));}else {assert.ok(require('../scripts/audio-layout.cjs').physicalName(result.file,voice));const clip=packs.find(p=>p.id===voice).clips[row.file];assert.equal(result.baseRate,clip.baseRate);if(row.characterMode==='LTRL')assert.ok(result.file.endsWith('.wav'));else assert.ok(result.file.endsWith('.mp3'));}}
}
const digests=new Set();
for(const file of files){const voice=file.split('/')[0],key=voice+':'+catalog.hashes[file];assert.equal(digests.has(key),false,'Duplicate physical recording: '+file);digests.add(key);}
const referenced=new Set([...packs.filter(p=>p.ready).flatMap(p=>Object.values(p.clips).map(c=>c.file)),...Object.values(scope.window.BEAR_STANDARD_AUDIO).map(c=>c.file)]);
assert.deepEqual([...referenced].sort(),[...files].sort(),'No unreferenced or missing media');
assert.equal(fs.existsSync(path.join(root,'dist/audio/metadata/learning-manifest.json')),false);
assert.equal(fs.existsSync(path.join(root,'dist/audio/metadata/child-voice-manifest.json')),false);
console.log(`PASS ${files.length} files in voice directories; all logical IDs resolve in adult/child modes, standard recordings shared, source metadata excluded from dist`);
