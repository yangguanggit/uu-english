// Offline voice-pack workflow. No cloud keys or synthesis requests enter the H5 app.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),registry=path.join(root,'src/shared/audio/voice-packs.js');
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const {logicalName,moduleFor,physicalName,planAssets}=require('./audio-layout.cjs');
const {execFileSync}=require('node:child_process');
// Check each existing component, including dangling links and unchanged files.
// New recordings may not exist yet; their existing parents must still be safe.
function projectFile(relative,allowMissing=false){
  if(typeof relative!=='string'||path.isAbsolute(relative)||relative.split(/[\\/]/).some(part=>!part||part==='.'||part==='..'))throw Error('Invalid project path');
  const target=path.resolve(root,relative),anchor=fs.realpathSync(root),parts=relative.split('/');
  let current=root;
  for(let i=0;i<parts.length;i++){
    current=path.join(current,parts[i]);
    let stat;
    try{stat=fs.lstatSync(current);}catch(error){
      if(allowMissing&&error.code==='ENOENT')return target;
      throw error;
    }
    if(stat.isSymbolicLink()||(i===parts.length-1?!stat.isFile():!stat.isDirectory()))throw Error('Project path must be a regular file without links: '+relative);
    const resolved=path.relative(anchor,fs.realpathSync(current));
    if(path.isAbsolute(resolved)||resolved==='..'||resolved.startsWith('..'+path.sep))throw Error('Path resolves outside project: '+relative);
  }
  return target;
}
const required=()=>JSON.parse(fs.readFileSync(projectFile('audio/metadata/learning-manifest.json'),'utf8')).filter(row=>row.synthesis!=='original-human-recording');
function readRegistry(){const context={window:{}};vm.runInNewContext(fs.readFileSync(projectFile('src/shared/audio/voice-packs.js'),'utf8'),context,{timeout:100});return JSON.parse(JSON.stringify(context.window));}
function readPacks(){return readRegistry().BEAR_VOICE_PACKS;}
function validateRegistry(){
  const registryData=readRegistry(),packs=registryData.BEAR_VOICE_PACKS,ids=new Set(),rows=required();
  if(!Array.isArray(packs)||!packs.some(p=>p.id==='adult'&&p.original&&p.ready))throw Error('Adult voice must remain available');
  function check(clip,voice,logical){
    if(!clip||!physicalName(clip.file,voice)||!Number.isFinite(clip.baseRate)||clip.baseRate<=0||clip.baseRate>1)throw Error('Missing or invalid voice clip: '+logical);
    const bytes=fs.readFileSync(projectFile('audio/'+clip.file));
    if(clip.sha256!==hash(bytes))throw Error('Voice clip checksum mismatch: '+logical);
    if(clip.file.endsWith('.wav'))wav(bytes);else mp3(bytes);
  }
  for(const pack of packs){
    if(!/^[a-z][a-z0-9-]{0,39}$/.test(pack.id)||ids.has(pack.id)||['standard','metadata'].includes(pack.id)||typeof pack.label!=='string'||!pack.label.trim()||typeof pack.ready!=='boolean')throw Error('Invalid voice pack');
    ids.add(pack.id);
    if(pack.original&&pack.id!=='adult')throw Error('Only adult may use the original recordings');
    if(!pack.ready)continue;
    if(!pack.original&&(pack.reviewed!==true||typeof pack.source!=='string'||!pack.source.trim()||![pack.speakers?.en,pack.speakers?.zh].every(v=>typeof v==='string'&&v.trim())))throw Error('Voice pack needs source, speakers and listening review');
    for(const row of rows){
      if(!logicalName(row.file))throw Error('Invalid logical audio filename');
      const clip=pack.clips?.[row.file];check(clip,pack.id,row.file);
      if(row.characterMode==='LTRL'&&!clip.file.endsWith('.wav'))throw Error('Letter names must retain original WAV');
      if(pack.original&&(clip.file!==row.asset||clip.sha256!==row.sha256))throw Error('Adult manifest mismatch: '+row.file);
    }
    if(!pack.original){
      const metadata=JSON.parse(fs.readFileSync(projectFile('audio/metadata/'+pack.id+'-voice-manifest.json'),'utf8'));
      if(metadata.source!==pack.source||metadata.speakers?.['en-US']!==pack.speakers.en||metadata.speakers?.['zh-CN']!==pack.speakers.zh||!Array.isArray(metadata.recordings)||metadata.recordings.length!==rows.length)throw Error('Voice production manifest mismatch: '+pack.id);
      if(metadata.logicalClips!==rows.length||metadata.installedFiles!==new Set(rows.map(row=>pack.clips[row.file].file)).size)throw Error('Voice production counts mismatch: '+pack.id);
      const records=new Map(metadata.recordings.map(r=>[r.logicalFile,r]));
      if(records.size!==rows.length)throw Error('Duplicate production records: '+pack.id);
      for(const row of rows){const record=records.get(row.file),clip=pack.clips[row.file];if(!record||record.file!==clip.file||record.sha256!==clip.sha256||record.baseRate!==clip.baseRate||!Number.isFinite(record.seconds)||record.seconds<.08||record.text!==productionText(row)||record.voice!==pack.speakers[row.locale==='zh-CN'?'zh':'en'])throw Error('Voice production record mismatch: '+row.file);}
    }
  }
  for(const [logical,clip] of Object.entries(registryData.BEAR_STANDARD_AUDIO||{})){
    if(!logicalName(logical)||!logical.startsWith('osu-english-')||!clip.file.endsWith('.wav'))throw Error('Invalid standard sound mapping');
    check(clip,'standard',logical);
  }
  const standardRows=JSON.parse(fs.readFileSync(projectFile('audio/metadata/learning-manifest.json'),'utf8')).filter(row=>row.synthesis==='original-human-recording');
  for(const row of standardRows){const clip=registryData.BEAR_STANDARD_AUDIO?.[row.file];if(!clip||clip.file!==row.asset||clip.sha256!==row.sha256)throw Error('Standard manifest mismatch: '+row.file);}
  return packs;
}
function wav(bytes){
  if(bytes.length<44||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WAVE'||bytes.readUInt32LE(4)+8!==bytes.length)throw Error('Expected a complete PCM WAV recording');
  let format,data;
  for(let at=12;at+8<=bytes.length;){const n=bytes.readUInt32LE(at+4),end=at+8+n;if(end>bytes.length)throw Error('Truncated WAV');const id=bytes.toString('ascii',at,at+4);if(id==='fmt '){if(n<16)throw Error('Invalid WAV format');format={codec:bytes.readUInt16LE(at+8),channels:bytes.readUInt16LE(at+10),rate:bytes.readUInt32LE(at+12),byteRate:bytes.readUInt32LE(at+16),bits:bytes.readUInt16LE(at+22)};}if(id==='data')data=n;at=end+(n%2);}
  if(!format||format.codec!==1||![1,2].includes(format.channels)||![16,24].includes(format.bits)||format.rate<16000||format.rate>48000||format.byteRate!==format.rate*format.channels*format.bits/8||!(data/format.byteRate>=.08))throw Error('Expected audible 16/24-bit PCM WAV at 16–48 kHz');
  return {seconds:data/format.byteRate,sampleRate:format.rate,channels:format.channels,bits:format.bits};
}
function mp3(bytes){
  let start=0;
  if(bytes.toString('ascii',0,3)==='ID3'){
    if(bytes.length<10||[6,7,8,9].some(i=>bytes[i]>127))throw Error('Invalid MP3 tag');
    start=10+((bytes[6]<<21)|(bytes[7]<<14)|(bytes[8]<<7)|bytes[9]);
  }
  // Require complete consecutive MPEG Layer III frames, not just an ID3 prefix.
  let frames=0;
  while(start+4<=bytes.length){
    const n=bytes.readUInt32BE(start),version=(n>>>19)&3,layer=(n>>>17)&3,rateIndex=(n>>>10)&3,bitrateIndex=(n>>>12)&15;
    if((n>>>21)!==2047||version===1||layer!==1||rateIndex===3||bitrateIndex===0||bitrateIndex===15)break;
    const rates=[44100,48000,32000],bitrates=version===3?[0,32,40,48,56,64,80,96,112,128,160,192,224,256,320]:[0,8,16,24,32,40,48,56,64,80,96,112,128,144,160];
    const rate=rates[rateIndex]/(version===3?1:version===2?2:4),size=Math.floor((version===3?144:72)*bitrates[bitrateIndex]*1000/rate)+((n>>>9)&1);
    if(start+size>bytes.length)throw Error('Truncated MP3 frame');
    start+=size;frames++;
  }
  if(frames<3||!(start===bytes.length||(bytes.length-start===128&&bytes.toString('ascii',start,start+3)==='TAG')))throw Error('Expected complete MP3 recording');
}
function encodeRecording(bytes,letter){
  if(bytes.toString('ascii',0,4)!=='RIFF'){if(letter)throw Error('Letter recordings require original WAV');mp3(bytes);return {bytes,extension:'mp3'};}
  wav(bytes);if(letter)return {bytes,extension:'wav'};
  const temporary=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'uu-voice-encode-'));
  try{
    const input=path.join(temporary,'source.wav'),output=path.join(temporary,'voice.mp3');fs.writeFileSync(input,bytes);
    execFileSync(process.env.FFMPEG_BIN||'ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-n','-i',input,'-map_metadata','-1','-ac','1','-ar','24000','-c:a','libmp3lame','-b:a','64k',output],{timeout:120000});
    const encoded=fs.readFileSync(output);mp3(encoded);return {bytes:encoded,extension:'mp3'};
  }finally{fs.rmSync(temporary,{recursive:true,force:true});}
}
function recordingInfo(bytes,extension){
  if(extension==='wav')return wav(bytes);
  // Decode the final MP3, including its encoder delay/padding. Frame counts alone
  // overestimate short recordings and would break release duration validation.
  const temporary=fs.mkdtempSync(path.join(require('node:os').tmpdir(),'uu-voice-inspect-'));
  try{
    const input=path.join(temporary,'voice.mp3');fs.writeFileSync(input,bytes);
    const pcm=execFileSync(process.env.FFMPEG_BIN||'ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-i',input,'-f','s16le','-ac','1','-ar','24000','pipe:1'],{timeout:120000,maxBuffer:64*1024*1024});
    const seconds=pcm.length/48000;if(seconds<.08)throw Error('Decoded recording is too short');
    return {seconds};
  }finally{fs.rmSync(temporary,{recursive:true,force:true});}
}
function writePlan(output){
  const clips=Object.fromEntries(required().map(row=>[row.file,{file:'',baseRate:1,text:row.text,sourceText:row.sourceText||row.text,locale:row.locale,instruction:row.characterMode==='LTRL'?'只读字母名称，不读 capital / letter 或例词':'朗读完整文本；UU 读作 U U；以正常语速生成，不做变调'}]));
  fs.writeFileSync(output,JSON.stringify({id:'child',label:'儿童',source:'',speakers:{en:'',zh:''},reviewed:false,clips},null,2)+'\n',{flag:'wx'});
  console.log(`Voice production plan: ${output} (${Object.keys(clips).length} logical clips; duplicate texts may share a recording)`);
}
const productionText=row=>row.characterMode==='LTRL'?row.text.toUpperCase()+'.':(row.sourceText||row.text).replace(/\bUU\b/g,'U U');
function importPack(filename){
  const input=JSON.parse(fs.readFileSync(filename,'utf8'));
  if(!/^[a-z][a-z0-9-]{0,39}$/.test(input.id)||['adult','standard','metadata'].includes(input.id)||typeof input.label!=='string'||!input.label.trim()||input.label.length>20||input.reviewed!==true||typeof input.source!=='string'||!input.source.trim()||![input.speakers?.en,input.speakers?.zh].every(v=>typeof v==='string'&&v.trim()))throw Error('Provide id, label, source, en/zh speakers, and reviewed:true after listening review');
  const rows=required(),originalHashes=new Set(rows.flatMap(row=>[hash(fs.readFileSync(projectFile('audio/'+row.asset))),row.sourceSha256].filter(Boolean))),entries=[],encoded=new Map(),sources=new Map();
  for(const row of rows){
    const entry=input.clips?.[row.file];
    if(!entry||typeof entry.file!=='string'||!entry.file||path.isAbsolute(entry.file)||entry.file.split(/[\\/]/).some(p=>!p||p==='.'||p==='..')||! /\.(wav|mp3)$/.test(entry.file)||!Number.isFinite(entry.baseRate)||entry.baseRate<=0||entry.baseRate>1)throw Error('Missing or invalid recording: '+row.file);
    const bytes=fs.readFileSync(path.resolve(path.dirname(filename),entry.file)),sha256=hash(bytes);
    sources.set(row.file,{sourceAsset:entry.file,sourceSha256:sha256});
    if(originalHashes.has(sha256))throw Error('A new voice must not relabel an existing adult recording: '+row.file);
    const key=sha256+':'+(row.characterMode==='LTRL');
    if(!encoded.has(key))encoded.set(key,encodeRecording(bytes,row.characterMode==='LTRL'));
    entries.push({logical:row.file,module:moduleFor(row),baseRate:entry.baseRate,...encoded.get(key)});
  }
  const {clips,assets}=planAssets(input.id,entries);
  for(const file of assets.keys())projectFile('audio/'+file,true);
  const manifestRelative='audio/metadata/'+input.id+'-voice-manifest.json',manifestPath=projectFile(manifestRelative,true);
  const manifestBefore=fs.existsSync(manifestPath)?fs.readFileSync(manifestPath):null;
  const info=new Map([...assets].map(([file,bytes])=>[file,recordingInfo(bytes,file.split('.').at(-1))]));
  const metadata={source:input.source,speakers:{'en-US':input.speakers.en,'zh-CN':input.speakers.zh},logicalClips:rows.length,installedFiles:assets.size,review:{confirmed:input.reviewed,scope:typeof input.reviewScope==='string'?input.reviewScope:'Scope not supplied; reviewed:true provided by pack author'},storage:{layout:'voice/module/file',deduplication:'Identical bytes within the same voice only'},recordings:rows.map(row=>{
    const clip=clips[row.file];
    return {logicalFile:row.file,text:productionText(row),voice:input.speakers[row.locale==='zh-CN'?'zh':'en'],...clip,...sources.get(row.file),...info.get(clip.file),encoding:clip.file.endsWith('.wav')?'PCM WAV':'MP3'};
  })};
  const packs=readPacks(),pack={id:input.id,label:input.label,ready:true,source:input.source,speakers:input.speakers,reviewed:true,clips},index=packs.findIndex(p=>p.id===input.id);
  if(index<0)packs.push(pack);else packs[index]=pack;
  // Reject every unsafe destination before creating directories, copying media,
  // or changing the registry; a late linked clip must not allow earlier writes.
  for(const file of assets.keys())projectFile('audio/'+file,true);
  const created=[],directories=[],replaced=[],removed=[],previous=readPacks().find(p=>p.id===input.id),temp=registry+'.'+crypto.randomUUID()+'.tmp',manifestTemp=manifestPath+'.'+crypto.randomUUID()+'.tmp';
  let manifestCommitted=false;
  const oldAssets=new Map();
  for(const clip of Object.values(previous?.clips||{})){
    if(!physicalName(clip.file,input.id))throw Error('Invalid installed voice path');
    if(oldAssets.has(clip.file))continue;
    const target=projectFile('audio/'+clip.file),bytes=fs.readFileSync(target);
    if(hash(bytes)!==clip.sha256)throw Error('Existing asset hash mismatch: '+clip.file);
    oldAssets.set(clip.file,bytes);
  }
  try{
    for(const [file,bytes] of assets){
      const target=projectFile('audio/'+file,true);
      const missing=[];for(let dir=path.dirname(target);!fs.existsSync(dir);dir=path.dirname(dir))missing.push(dir);
      fs.mkdirSync(path.dirname(target),{recursive:true});directories.push(...missing.reverse());
      projectFile('audio/'+file,true);
      if(fs.existsSync(target)){
        const old=fs.readFileSync(target);
        if(hash(old)!==hash(bytes)){
          const known=Object.values(previous?.clips||{}).find(clip=>clip.file===file);
          if(known?.file!==file||known.sha256!==hash(old))throw Error('Existing asset hash mismatch: '+file);
          replaced.push([target,old]);fs.writeFileSync(target,bytes);
        }
      }else{fs.writeFileSync(target,bytes,{flag:'wx'});created.push(target);}
    }
    for(const [file,bytes] of oldAssets)if(!assets.has(file)){const target=projectFile('audio/'+file);fs.unlinkSync(target);removed.push([target,bytes]);}
    projectFile('src/shared/audio/voice-packs.js');
    fs.writeFileSync(temp,'/* Generated by scripts/voice-pack.cjs. */\nwindow.BEAR_STANDARD_AUDIO = '+JSON.stringify(readRegistry().BEAR_STANDARD_AUDIO||{},null,2)+';\nwindow.BEAR_VOICE_PACKS = '+JSON.stringify(packs,null,2)+';\n',{flag:'wx'});
    projectFile(manifestRelative,true);
    fs.writeFileSync(manifestTemp,JSON.stringify(metadata,null,2)+'\n',{flag:'wx'});
    fs.renameSync(manifestTemp,manifestPath);manifestCommitted=true;
    fs.renameSync(temp,registry);
  }catch(error){if(manifestCommitted){if(manifestBefore)fs.writeFileSync(manifestPath,manifestBefore);else fs.rmSync(manifestPath);}for(const [target,bytes] of removed)fs.writeFileSync(target,bytes);for(const [target,bytes] of replaced)fs.writeFileSync(target,bytes);for(const file of created)fs.rmSync(file);for(const file of [temp,manifestTemp])if(fs.existsSync(file))fs.rmSync(file);for(const dir of directories.reverse())if(fs.existsSync(dir)&&fs.readdirSync(dir).length===0)fs.rmdirSync(dir);throw error;}
  console.log(`Imported ${input.id}: ${rows.length} mappings, ${assets.size} recordings. Run npm run build before preview or deployment.`);
}
module.exports={required,readPacks,validateRegistry,wav,mp3,encodeRecording,writePlan,importPack};
if(require.main===module){try{const [mode,file]=process.argv.slice(2);if(mode==='--plan'&&file)writePlan(path.resolve(file));else if(mode==='--import'&&file)importPack(path.resolve(file));else if(mode==='--check')console.log('Voice packs valid: '+validateRegistry().map(p=>`${p.id} (${p.ready?'ready':'pending'})`).join(', '));else throw Error('Usage: node scripts/voice-pack.cjs --plan <new-output.json> | --import <reviewed-pack.json> | --check');}catch(error){console.error(error.message);process.exitCode=1;}}
