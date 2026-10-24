/* Resolve lesson assets without changing their logical IDs or learning events. */
(() => {
  const packs=window.BEAR_VOICE_PACKS;
  const original=packs.find(p=>p.id==='adult');
  const requested=()=>BearLearning.get().settings.voice||'child';
  const current=()=>packs.find(p=>p.id===requested()&&p.ready)||original;
  function has(file,id=current().id){
    if(file.startsWith('osu-english-'))return !!window.BEAR_STANDARD_AUDIO?.[file];
    const pack=packs.find(p=>p.id===id&&p.ready)||original;
    return !!pack.clips?.[file];
  }
  function resolve(file,id=current().id){
    const pack=packs.find(p=>p.id===id&&p.ready)||original;
    // Standard phoneme demonstrations are shared, never pitch-shifted or synthesized.
    if(file.startsWith('osu-english-')){const clip=window.BEAR_STANDARD_AUDIO[file];if(!clip)throw Error('缺少标准单音映射：'+file);return {file:clip.file,baseRate:1,shared:true,voice:'standard'};}
    const clip=pack.clips[file];
    if(!clip)throw Error('所选音色缺少这条示范音频，请切换音色后重试。');
    return {file:clip.file,baseRate:clip.baseRate,shared:false,voice:pack.id};
  }
  function note(){
    const selected=packs.find(p=>p.id===requested());
    if(!selected?.ready)return '已保存的音色在此设备尚未就绪，暂用成人发音；音频备齐后可切换。音标及自然拼读单音保留标准真人录音。';
    const child=packs.find(p=>p.id==='child');
    return `${child?.ready?'音色用于字母、单词、中英文释义、场景和绘本。':'儿童音频待接入，当前保留成人发音。'}音标及自然拼读单音保留标准真人录音。`;
  }
  window.BearVoices={list:()=>packs.map(p=>({id:p.id,label:p.label,ready:p.ready})),current:()=>current().id,requested,has,resolve,note};
})();
