// Production media is encoded once; ordinary builds copy it byte-for-byte.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const {root}=require('./helpers/paths.cjs'),{audioFiles}=require('../scripts/runtime-files.cjs'),{hash}=require('../scripts/audio-layout.cjs');
const source=JSON.parse(fs.readFileSync(path.join(root,'offline-assets.json'))),dist=path.join(root,'dist'),catalog=JSON.parse(fs.readFileSync(path.join(dist,'offline-assets.json')));
assert.deepEqual(catalog,source);assert.equal(JSON.parse(fs.readFileSync(path.join(dist,'.build.json'))).audioEncoding,'pre-encoded');
assert.deepEqual(audioFiles(dist).sort(),Object.keys(catalog.audio).sort());
for(const [file,size] of Object.entries(catalog.audio)){
 const bytes=fs.readFileSync(path.join(dist,'audio',file));assert.equal(bytes.length,size);assert.equal(hash(bytes),catalog.hashes[file]);assert.deepEqual(bytes,fs.readFileSync(path.join(root,'audio',file)));
}
for(const [url,digest] of Object.entries(catalog.shellHashes))assert.equal(hash(fs.readFileSync(path.join(dist,url==='./'?'index.html':url.split('?')[0]))),digest,url);
const scope={window:{},BearLearning:{get:()=>({settings:{voice:'child'}})}};
for(const file of ['voice-packs.js','voices.js'])vm.runInNewContext(fs.readFileSync(path.join(dist,'src/shared/audio',file),'utf8'),scope);
const rows=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/learning-manifest.json')));
for(const row of rows)for(const voice of ['adult','child']){
 const file=scope.window.BearVoices.resolve(row.file,voice).file;assert.ok(Object.hasOwn(catalog.audio,file));
 if(voice==='adult'&&(row.characterMode==='LTRL'||row.synthesis==='original-human-recording'))assert.equal(catalog.hashes[file],row.sourceSha256,'protected recording changed');
}
console.log(`PASS release: ${Object.keys(catalog.audio).length} physical recordings; source/dist byte identity, shell/media hashes and protected originals`);
