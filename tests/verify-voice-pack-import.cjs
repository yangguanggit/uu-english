// Real import/encoding/dedup transactions in a disposable project. FFmpeg is build-tool only.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {execFileSync}=require('node:child_process'),{root,output}=require('./helpers/paths.cjs');
const {hash}=require('../scripts/audio-layout.cjs');
const temp=fs.mkdtempSync(path.join(output,'voice-import-'));
try{
 for(const dir of ['audio/adult/words','audio/adult/letters','audio/standard/phonemes','audio/metadata','scripts','src/shared/audio','incoming'])fs.mkdirSync(path.join(temp,dir),{recursive:true});
 for(const file of ['voice-pack.cjs','audio-layout.cjs'])fs.copyFileSync(path.join(root,'scripts',file),path.join(temp,'scripts',file));
 function signal(hz){const rate=24000,n=rate/5,b=Buffer.alloc(44+n*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(n*2,40);for(let i=0;i<n;i++)b.writeInt16LE(Math.round(5000*Math.sin(i*2*Math.PI*hz/rate)),44+i*2);return b;}
 const rows=[{file:'word.wav',text:'milk',locale:'en-US',module:'words'},{file:'chinese.wav',text:'牛奶',locale:'zh-CN',module:'words'},{file:'letter.wav',text:'A',sourceText:'a',characterMode:'LTRL',locale:'en-US',module:'letters'},{file:'repeat.wav',text:'milk',locale:'en-US',module:'scenes'},{file:'osu-english-test.wav',synthesis:'original-human-recording',module:'phonemes'}];
 const clips={};for(const row of rows){row.asset=(row.synthesis?'standard/phonemes/':'adult/'+(row.module==='letters'?'letters/':'words/'))+row.file;row.sha256=hash(signal(200));fs.writeFileSync(path.join(temp,'audio',row.asset),signal(200));if(!row.synthesis)clips[row.file]={file:row.asset,sha256:row.sha256,baseRate:1};}
 fs.writeFileSync(path.join(temp,'audio/metadata/learning-manifest.json'),JSON.stringify(rows));
 fs.writeFileSync(path.join(temp,'src/shared/audio/voice-packs.js'),'window.BEAR_STANDARD_AUDIO = '+JSON.stringify({'osu-english-test.wav':{file:rows.at(-1).asset,sha256:rows.at(-1).sha256,baseRate:1}})+'; window.BEAR_VOICE_PACKS = '+JSON.stringify([{id:'adult',label:'成人',ready:true,original:true,clips}])+';');
 for(const [file,hz] of [['word.wav',400],['chinese.wav',450],['letter.wav',500],['adult.wav',200]])fs.writeFileSync(path.join(temp,'incoming',file),signal(hz));
 const tool=require(path.join(temp,'scripts/voice-pack.cjs')),packFile=path.join(temp,'incoming/pack.json');
 const fresh=()=>({id:'child',label:'儿童',source:'synthetic test signals only',speakers:{en:'test-en',zh:'test-zh'},reviewed:true,clips:Object.fromEntries(rows.filter(r=>!r.synthesis).map(row=>[row.file,{file:row.file==='repeat.wav'?'word.wav':row.file,baseRate:row.file==='repeat.wav'?.75:1}]))});
 function snapshot(){const result={};function walk(relative=''){for(const name of fs.readdirSync(path.join(temp,relative))){const file=path.join(relative,name),p=path.join(temp,file),stat=fs.lstatSync(p);if(stat.isSymbolicLink())result[file]='link:'+fs.readlinkSync(p);else if(stat.isDirectory()){result[file]='directory';walk(file);}else result[file]=hash(fs.readFileSync(p));}}walk();return result;}
 function reject(change,pattern){const input=fresh();change(input);fs.writeFileSync(packFile,JSON.stringify(input));const before=snapshot();assert.throws(()=>tool.importPack(packFile),pattern);assert.deepEqual(snapshot(),before);}
 reject(p=>delete p.clips['letter.wav'],/Missing/);reject(p=>p.reviewed=false,/listening review/);
 for(const id of ['adult','standard','metadata'])reject(p=>p.id=id,/Provide id/);
 reject(p=>p.clips['word.wav'].file='../word.wav',/Missing or invalid/);reject(p=>p.clips['word.wav'].file='adult.wav',/must not relabel/);
 assert.throws(()=>tool.mp3(Buffer.from('ID3 fake audio')),/MP3/);
 const outside=path.join(temp,'outside');fs.mkdirSync(outside);
 const audioRoot=path.join(temp,'audio'),voiceDirectory=path.join(audioRoot,'child');
 function rejectLink(label,prepare){fs.writeFileSync(packFile,JSON.stringify(fresh()));const cleanup=prepare(),before=snapshot();try{assert.throws(()=>tool.importPack(packFile),/without links|outside project/,label);assert.deepEqual(snapshot(),before,label);}finally{cleanup();}}
 for(const target of [outside,path.join(audioRoot,'adult')])rejectLink('voice directory link',()=>{fs.symlinkSync(target,voiceDirectory,'dir');return ()=>fs.unlinkSync(voiceDirectory);});
 for(const [directory,saved] of [[audioRoot,path.join(temp,'saved-audio')],[path.join(temp,'src/shared/audio'),path.join(temp,'saved-registry')]])rejectLink('root/registry parent link',()=>{fs.renameSync(directory,saved);fs.symlinkSync(saved,directory,'dir');return ()=>{fs.unlinkSync(directory);fs.renameSync(saved,directory);};});
 for(const hz of [500,600,null])rejectLink('same/different/dangling recording link',()=>{fs.mkdirSync(path.join(voiceDirectory,'letters'),{recursive:true});const target=path.join(outside,'linked.wav');if(hz!==null)fs.writeFileSync(target,signal(hz));fs.symlinkSync(target,path.join(voiceDirectory,'letters/letter.wav'));return ()=>{fs.rmSync(voiceDirectory,{recursive:true});if(fs.existsSync(target))fs.unlinkSync(target);};});
 const metadataFile=path.join(temp,'audio/metadata/child-voice-manifest.json');
 for(const exists of [false,true])rejectLink('metadata link',()=>{const target=path.join(outside,'metadata.json');if(exists)fs.writeFileSync(target,'{}');fs.symlinkSync(target,metadataFile);return ()=>{fs.unlinkSync(metadataFile);if(fs.existsSync(target))fs.unlinkSync(target);};});
 fs.writeFileSync(packFile,JSON.stringify(fresh()));tool.importPack(packFile);
 let packs=tool.validateRegistry(),child=packs.find(p=>p.id==='child');
 assert.equal(Object.keys(child.clips).length,4);assert.equal(new Set(Object.values(child.clips).map(c=>c.file)).size,3);
 assert.equal(child.clips['word.wav'].file,child.clips['repeat.wav'].file);assert.ok(child.clips['word.wav'].file.startsWith('child/shared/'));
 assert.equal(child.clips['repeat.wav'].baseRate,.75);assert.ok(child.clips['word.wav'].file.endsWith('.mp3'));assert.ok(child.clips['letter.wav'].file.endsWith('.wav'));
 function checkMetadata(pack,file){
  const metadata=JSON.parse(fs.readFileSync(file));assert.equal(metadata.source,pack.source);assert.equal(metadata.logicalClips,4);assert.equal(metadata.installedFiles,new Set(Object.values(pack.clips).map(c=>c.file)).size);
  for(const record of metadata.recordings){const row=rows.find(r=>r.file===record.logicalFile),clip=pack.clips[row.file];assert.equal(record.file,clip.file);assert.equal(record.sha256,clip.sha256);assert.equal(record.baseRate,clip.baseRate);assert.equal(record.voice,pack.speakers[row.locale==='zh-CN'?'zh':'en']);assert.equal(record.text,row.characterMode==='LTRL'?'A.':row.text);assert.ok(Math.abs(record.seconds-.2)<.001,'decoded duration');assert.equal(record.sourceSha256,hash(fs.readFileSync(path.join(temp,'incoming',record.sourceAsset))));}
 }
 checkMetadata(child,metadataFile);
 const installed=snapshot();tool.importPack(packFile);assert.deepEqual(snapshot(),installed,'repeat import byte identity');
 // Passing installed MP3 to import must not re-encode it.
 const encoded=fs.readFileSync(path.join(temp,'audio',child.clips['word.wav'].file));assert.deepEqual(tool.encodeRecording(encoded,false).bytes,encoded);
 // Force late commit failure after replacements, new files and obsolete shared-file removal.
 fs.writeFileSync(path.join(temp,'incoming/word.wav'),signal(650));fs.writeFileSync(path.join(temp,'incoming/repeat.wav'),signal(400));const changed=fresh();changed.clips['repeat.wav'].file='repeat.wav';fs.writeFileSync(packFile,JSON.stringify(changed));
 const before=snapshot(),rename=fs.renameSync;fs.renameSync=function(a,b){if(b===path.join(temp,'src/shared/audio/voice-packs.js'))throw Error('simulated registry commit failure');return rename(a,b);};
 try{assert.throws(()=>tool.importPack(packFile),/simulated registry/);}finally{fs.renameSync=rename;}
 assert.deepEqual(snapshot(),before,'late failure restores mappings, removed/shared recordings, replacements and directories');
 const failManifestRename=fs.renameSync;fs.renameSync=function(a,b){if(b===metadataFile)throw Error('simulated metadata commit failure');return failManifestRename(a,b);};
 try{assert.throws(()=>tool.importPack(packFile),/simulated metadata/);}finally{fs.renameSync=failManifestRename;}
 assert.deepEqual(snapshot(),before,'metadata commit failure restores all media and both old manifests');
 tool.importPack(packFile);packs=tool.validateRegistry();child=packs.find(p=>p.id==='child');assert.equal(new Set(Object.values(child.clips).map(c=>c.file)).size,4);assert.equal(fs.existsSync(path.join(temp,'audio/child/shared/repeat.mp3')),false,'obsolete shared recording removed');
 checkMetadata(child,metadataFile);
 const extra={...changed,id:'another-voice',label:'另一音色'};fs.writeFileSync(packFile,JSON.stringify(extra));tool.importPack(packFile);packs=tool.validateRegistry();assert.equal(packs.length,3);fs.writeFileSync(packFile,JSON.stringify(changed));
 checkMetadata(packs.find(p=>p.id==='another-voice'),path.join(temp,'audio/metadata/another-voice-voice-manifest.json'));
 const metadataBytes=fs.readFileSync(metadataFile),stale=JSON.parse(metadataBytes);stale.recordings[0].sha256='stale';fs.writeFileSync(metadataFile,JSON.stringify(stale));assert.throws(()=>tool.validateRegistry(),/production record mismatch/);fs.writeFileSync(metadataFile,metadataBytes);
 for(const field of ['installedFiles','logicalClips']){
  const wrong=JSON.parse(metadataBytes);wrong[field]++;
  fs.writeFileSync(metadataFile,JSON.stringify(wrong));
  assert.throws(()=>tool.validateRegistry(),/production counts mismatch/,field);
  fs.writeFileSync(metadataFile,metadataBytes);
 }
 // Import existing MP3 without another lossy encode, and measure its decoded duration.
 const mp3Pack=JSON.parse(JSON.stringify(extra));
 for(const logical of ['word.wav','chinese.wav','repeat.wav']){const source=fs.readFileSync(path.join(temp,'audio',child.clips[logical].file)),file=logical.replace('.wav','.mp3');fs.writeFileSync(path.join(temp,'incoming',file),source);mp3Pack.clips[logical].file=file;}
 fs.writeFileSync(packFile,JSON.stringify(mp3Pack));tool.importPack(packFile);const another=tool.validateRegistry().find(p=>p.id==='another-voice');checkMetadata(another,path.join(temp,'audio/metadata/another-voice-voice-manifest.json'));
 for(const logical of ['word.wav','chinese.wav','repeat.wav'])assert.deepEqual(fs.readFileSync(path.join(temp,'audio',another.clips[logical].file)),fs.readFileSync(path.join(temp,'incoming',mp3Pack.clips[logical].file)));
 fs.writeFileSync(packFile,JSON.stringify(changed));
 fs.writeFileSync(path.join(temp,'audio',child.clips['chinese.wav'].file),'tampered');assert.throws(()=>tool.validateRegistry(),/checksum mismatch/);assert.throws(()=>tool.importPack(packFile),/Existing asset hash mismatch/);
 const plan=path.join(temp,'plan.json');execFileSync(process.execPath,[path.join(temp,'scripts/voice-pack.cjs'),'--plan',plan]);assert.equal(Object.keys(JSON.parse(fs.readFileSync(plan)).clips).length,4);assert.throws(()=>execFileSync(process.execPath,[path.join(temp,'scripts/voice-pack.cjs'),'--plan',plan],{stdio:'pipe'}));
 console.log('PASS voice import: WAV/MP3 production metadata and decoded durations, encoding once, dedup, per-reference rates, media/metadata link rejection, stale metadata rejection, idempotence and registry/metadata commit rollback');
}finally{fs.rmSync(temp,{recursive:true,force:true});}
