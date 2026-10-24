// Catalog/asset consistency only; this is not a pronunciation or listening score.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {root,output}=require('./helpers/paths.cjs');
const tools=require('../scripts/voice-pack.cjs'),pack=tools.validateRegistry().find(p=>p.id==='child');
assert.equal(pack?.ready,true);
const manifest=JSON.parse(fs.readFileSync(path.join(root,'audio/metadata/child-voice-manifest.json'),'utf8'));
const index=new Map(manifest.recordings.map(r=>[r.logicalFile,r]));
const expectedText=row=>row.characterMode==='LTRL'?row.text.toUpperCase()+'.':(row.sourceText||row.text).replace(/\bUU\b/g,'U U');
let references=0;const recordings=new Map(),warnings=[];
for(const row of tools.required()){
 const text=expectedText(row),voice=manifest.speakers[row.locale],record=index.get(row.file),clip=pack.clips[row.file];
 assert.ok(record,'Missing production text/speaker: '+row.file);
 assert.equal(record.text,text);assert.equal(record.voice,voice);
 assert.equal(clip.file,record.file,'Stale or wrong audio mapping: '+row.file);
 assert.equal(clip.baseRate,1,'Child audio must use native rate: '+row.file);
 assert.equal(record.baseRate,1);
 assert.ok(require('../scripts/audio-layout.cjs').physicalName(record.file,'child'));
 assert.equal(record.logicalFile,row.file);
 recordings.set(record.file,record);references++;
}
for(const [file,record] of recordings){
 const bytes=fs.readFileSync(path.join(root,'audio',file));if(file.endsWith('.wav'))tools.wav(bytes);else tools.mp3(bytes);
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),record.sha256);
 if(!file.endsWith('.wav'))continue;
 assert.equal(record.sha256,record.sourceSha256,'Letter WAV bytes must remain original');
 let data,format;for(let at=12;at+8<=bytes.length;){const n=bytes.readUInt32LE(at+4),id=bytes.toString('ascii',at,at+4);if(id==='fmt ')format={rate:bytes.readUInt32LE(at+12),channels:bytes.readUInt16LE(at+10),bits:bytes.readUInt16LE(at+22)};if(id==='data')data=bytes.subarray(at+8,at+8+n);at+=8+n+(n%2);}
 assert.deepEqual(format,{rate:24000,channels:1,bits:16});
 assert.ok(Math.abs(data.length/48000-record.seconds)<.001,'Duration mismatch: '+file);
 let energy=0,peak=0,clipped=0,active=0;
 for(let i=0;i<data.length;i+=2){const n=Math.abs(data.readInt16LE(i));energy+=n*n;peak=Math.max(peak,n);if(n>=32760)clipped++;if(n>=200)active++;}
 assert.ok(peak>=200&&Math.sqrt(energy/(data.length/2))>=30,'Silent clip: '+file);
 assert.ok(active>=240,'Less than 10ms of audible speech: '+file);
 if(clipped/(data.length/2)>.001)warnings.push({file,text:record.text,type:'clipping',fraction:clipped/(data.length/2)});
}
assert.deepEqual(warnings,[],'Inspect potentially clipped audio');
fs.mkdirSync(output,{recursive:true});fs.writeFileSync(path.join(output,'child-audio-catalog.json'),JSON.stringify({passed:true,references,uniqueFiles:recordings.size,checks:['text','speaker','mapping','hash','native rate','MP3/WAV format','duration','non-silence','clipping'],pronunciationVerified:false,warnings},null,2));
console.log(`PASS child catalog: ${references} references / ${recordings.size} recordings; pronunciation not assessed by this check`);
