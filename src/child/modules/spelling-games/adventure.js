/* Cosmetic play goals share the round snapshot; they are never oral-skill evidence. */
(() => {
  'use strict';
  const buddies=[{id:'bear',icon:'🧸',name:'UU'},{id:'rabbit',icon:'🐰',name:'兔兔'},{id:'cat',icon:'🐱',name:'喵喵'}];
  const missions={
    puzzle:['🌉','搭起声音桥','每拼好一题，就为伙伴搭好一段桥。','桥搭好啦，去下一座小岛！'],
    moles:['🥕','地鼠的丰收日','帮地鼠听清声音，每题收好一篮胡萝卜。','胡萝卜收好啦！'],
    blocks:['🏰','积木城堡','把声音方块安放好，一起建起城堡。','城堡又高了一层！'],
    match:['🌼','好朋友花园','让英文和中文成为朋友，种出一片花园。','又开出一朵花！'],
    memory:['🦋','蝴蝶捉迷藏','记住好朋友的位置，帮蝴蝶找到花朵。','蝴蝶找到花朵啦！'],
    treasure:['💎','小岛寻宝记','听线索、走小路，每题找到一颗宝石。','宝石找到啦！'],
    balloons:['🌈','彩虹旅行','依次接好声音气球，让伙伴飞向彩虹。','再向彩虹飞近一点！'],
    bingo:['⭐','星星邮局','听清每封声音来信，盖好印章送出信件。','声音来信送到啦！'],
    train:['🎟️','小火车环游记','排好每列声音车厢，收集旅途车票。','小火车到站啦！'],
    detective:['🔍','声音侦探社','听示范、修线索，每题完成一张侦探委托。','这张委托完成啦！'],
  };
  const buddy=id=>buddies.find(row=>row.id===id)||buddies[0];
  const create=id=>({buddy:buddy(id).id,streak:0,best:0,sparks:0});
  function valid(value){return !!value&&typeof value==='object'&&buddies.some(row=>row.id===value.buddy)&&['streak','best','sparks'].every(key=>Number.isInteger(value[key])&&value[key]>=0&&value[key]<=10000)&&value.best>=value.streak;}
  function hit(game,ok){const state=game.cheer;if(!ok){state.streak=0;return;}state.streak=Math.min(10000,state.streak+1);state.best=Math.max(state.best,state.streak);if(state.streak%3===0)state.sparks=Math.min(10000,state.sparks+1);}
  function picker(selected){return `<fieldset class="adventure-picker"><legend>选一位冒险伙伴</legend><div>${buddies.map(row=>`<button type="button" data-game-buddy="${row.id}" aria-pressed="${row.id===selected}"><span aria-hidden="true">${row.icon}</span>${row.name}</button>`).join('')}</div></fieldset>`;}
  function paint(root,game,mode){
    const host=root.querySelector('#spelling-adventure');if(!host)return;
    const state=game.cheer,friend=buddy(state.buddy),mission=missions[mode],count=game.index+Number(game.done);
    host.innerHTML=`<div class="adventure-friend"><button type="button" data-buddy-wave aria-label="和${friend.name}打个招呼">${friend.icon}</button><div><strong>${mission[0]} ${mission[1]}</strong><p data-buddy-message>${game.done?mission[3]:mission[2]}</p></div></div><div class="adventure-route" role="img" aria-label="冒险收集进度，已收集 ${count}，共 ${game.ids.length}">${game.ids.map((_,i)=>`<span class="${i<count?'is-collected':i===count?'is-current':''}" aria-hidden="true">${i<count?mission[0]:i===count?friend.icon:'·'}</span>`).join('')}</div><div class="adventure-combo" aria-label="连续接对 ${state.streak} 次，获得 ${state.sparks} 颗星光"><span>${state.streak>=3?'🔥':'🌱'} 连续接对 <b>${state.streak}</b> 次</span><span>✦ 星光 <b>${state.sparks}</b></span><span class="combo-seeds" aria-hidden="true">${Array.from({length:3},(_,i)=>`<i class="${i<state.streak%3?'is-lit':''}">✦</i>`).join('')}</span></div>`;
    let wave=0;host.querySelector('[data-buddy-wave]').onclick=()=>{const messages=['我陪着你，慢慢听，一起找！','遇到难题可以重听，也可以看提示。','每试一次，都是向前走一步！'];host.querySelector('[data-buddy-message]').textContent=messages[wave++%messages.length];};
  }
  function badge(level,cleared){return `<div class="adventure-badge" aria-label="第 ${level+1} 关冒险徽章"><span aria-hidden="true">${BearGameLevels.levels[level].icon}</span><strong>${BearGameLevels.levels[level].name}冒险家</strong><p>十枚冒险徽章 · 已收集 ${cleared.length} 枚</p></div>`;}
  window.BearGameAdventure={buddies,buddy,create,valid,hit,picker,paint,badge,missions};
})();
