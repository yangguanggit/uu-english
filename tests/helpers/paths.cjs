const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const output=process.env.BEAR_VERIFY_OUTPUT||path.resolve(root,'../english-learning-diagnostics/current');
fs.mkdirSync(output,{recursive:true});
module.exports={root,output};
