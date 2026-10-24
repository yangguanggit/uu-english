// Reject links in every path component, including an otherwise valid runtime directory.
const fs=require('node:fs'),path=require('node:path');
function regularFile(root,relative){
  if(path.isAbsolute(relative)||relative.split(/[\\/]/).some(part=>!part||part==='.'||part==='..'))throw Error('Invalid runtime path: '+relative);
  let current=root;
  const parts=relative.split('/');
  for(let i=0;i<parts.length;i++){
    current=path.join(current,parts[i]);
    const stat=fs.lstatSync(current);
    if(stat.isSymbolicLink()||(i===parts.length-1?!stat.isFile():!stat.isDirectory()))throw Error('Runtime path must be a regular file without links: '+relative);
  }
  return current;
}
function audioFiles(root){
  const directory=path.join(root,'audio'),stat=fs.lstatSync(directory);
  if(stat.isSymbolicLink()||!stat.isDirectory())throw Error('Audio directory must not be a link');
  const files=[];
  function walk(relative=''){
    for(const name of fs.readdirSync(path.join(directory,relative))){
      const file=relative?relative+'/'+name:name,entry=fs.lstatSync(path.join(directory,file));
      if(entry.isSymbolicLink())throw Error('Audio links are not allowed: '+file);
      if(entry.isDirectory()){walk(file);continue;}
      if(!/\.(wav|mp3)$/.test(file))continue;
      if(!require('./audio-layout.cjs').physicalName(file,file.split('/')[0])||file.startsWith('metadata/'))throw Error('Audio media must be inside a voice directory: '+file);
      regularFile(root,'audio/'+file);files.push(file);
    }
  }
  walk();return files;
}
module.exports={regularFile,audioFiles};
