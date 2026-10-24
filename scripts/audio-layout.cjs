// Logical curriculum IDs stay stable; physical recordings may have many callers.
const crypto=require('node:crypto');
const modules=['letters','words','phonemes','phonics','sentences','scenes','stories','shared'];
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const logicalName=file=>typeof file==='string'&&/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.wav$/.test(file);
function moduleFor(row){
 if(modules.includes(row.module))return row.module;
 if(row.characterMode==='LTRL'||row.file.startsWith('foundation-letter-'))return 'letters';
 if(row.file.startsWith('foundation-'))return 'words';
 if(row.file.startsWith('phoneme-example-'))return 'phonemes';
 if(row.file.startsWith('osu-english-'))return 'phonics';
 if(row.file.startsWith('story-'))return 'stories';
 return 'scenes';
}
function physicalName(file,voice){
 if(typeof file!=='string'||typeof voice!=='string'||!/^[a-z][a-z0-9-]{0,39}$/.test(voice)||!file.startsWith(voice+'/'))return false;
 const parts=file.split('/');
 return parts.length===3&&modules.includes(parts[1])&&/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(wav|mp3)$/.test(parts[2]);
}
function planAssets(voice,rows){
 if(!/^[a-z][a-z0-9-]{0,39}$/.test(voice)||voice==='metadata')throw Error('Invalid voice ID');
 const groups=new Map(),seen=new Set(),clips={},assets=new Map();
 for(const row of rows){
  if(!logicalName(row.logical)||seen.has(row.logical)||!modules.includes(row.module)||!['wav','mp3'].includes(row.extension)||!Number.isFinite(row.baseRate)||row.baseRate<=0||row.baseRate>1)throw Error('Invalid audio layout entry: '+row.logical);
  seen.add(row.logical);const sha256=hash(row.bytes),key=row.extension+':'+sha256;
  if(!groups.has(key))groups.set(key,[]);groups.get(key).push({...row,sha256});
 }
 for(const group of groups.values()){
  group.sort((a,b)=>a.logical.localeCompare(b.logical,'en'));
  const first=group[0],module=new Set(group.map(row=>row.module)).size>1?'shared':first.module;
  const file=voice+'/'+module+'/'+first.logical.replace(/\.wav$/,'.'+first.extension);
  if(assets.has(file))throw Error('Audio destination collision: '+file);
  assets.set(file,first.bytes);
  for(const row of group)clips[row.logical]={file,sha256:row.sha256,baseRate:row.baseRate};
 }
 return {clips,assets};
}
module.exports={modules,hash,logicalName,moduleFor,physicalName,planAssets};
