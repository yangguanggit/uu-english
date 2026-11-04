/* Small board renderers keep movement and presentation separate from saved learning evidence. */
(() => {
  'use strict';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chestCells = [0, 2, 8];
  function treasure({arena, game, choices, onMove, onPick}) {
    function move(cell, direction) {
      const from = game.position;
      if (game.done || cell < 0 || cell > 8 || Math.abs(Math.floor(from / 3) - Math.floor(cell / 3)) + Math.abs(from % 3 - cell % 3) !== 1) return;
      game.position = cell;
      const hadFocus = arena.contains(document.activeElement);
      draw();
      if (hadFocus) {const control = direction && arena.querySelector(`[data-treasure-step="${direction}"]:not(:disabled)`);(control || arena.querySelector('.treasure-island')).focus({preventScroll:true});}
      onMove();
      const chest = chestCells.indexOf(cell);
      if (chest >= 0 && game.chestOrder[chest] !== undefined) onPick(choices[game.chestOrder[chest]]);
    }
    function draw() {
      arena.innerHTML = `<div class="treasure-island" tabindex="0" role="group" aria-label="听音寻宝地图"><div class="treasure-map">${Array.from({length:9}, (_, cell) => {
        const row = choices[game.chestOrder[chestCells.indexOf(cell)]];
        const adjacent = Math.abs(Math.floor(game.position / 3) - Math.floor(cell / 3)) + Math.abs(game.position % 3 - cell % 3) === 1;
        return `<button data-treasure-cell="${cell}" class="treasure-cell ${row?'has-chest':''} ${cell===game.position?'has-uu':''}" ${game.done||!adjacent?'disabled':''} aria-label="${cell===game.position?'UU 所在位置':row?esc(row.zh):'小路'}"><span aria-hidden="true">${cell===game.position?'🧸':row?row.picture:cell===6?'🌼':'·'}</span>${row?`<small>${esc(row.zh)}</small>`:''}${cell===game.position?'<b>UU</b>':''}</button>`;
      }).join('')}</div><div class="treasure-pad" aria-label="移动 UU"><button data-treasure-step="up" aria-label="向上走">↑</button><button data-treasure-step="left" aria-label="向左走">←</button><span aria-hidden="true">🧭</span><button data-treasure-step="right" aria-label="向右走">→</button><button data-treasure-step="down" aria-label="向下走">↓</button></div></div>`;
      arena.querySelectorAll('[data-treasure-cell]').forEach(button => button.onclick = () => move(Number(button.dataset.treasureCell)));
      const steps = {up:-3, left:-1, right:1, down:3};
      arena.querySelectorAll('[data-treasure-step]').forEach(button => {
        const direction = button.dataset.treasureStep, next = game.position + steps[direction];
        button.disabled = game.done || next < 0 || next > 8 || direction==='left'&&game.position%3===0 || direction==='right'&&game.position%3===2;
        button.onclick = () => move(next, direction);
      });
      arena.querySelector('.treasure-island').onkeydown = event => {
        const direction = {ArrowUp:'up',ArrowLeft:'left',ArrowRight:'right',ArrowDown:'down'}[event.key];
        if (!direction) return;
        event.preventDefault();const button = arena.querySelector(`[data-treasure-step="${direction}"]`);if (!button.disabled) move(game.position + steps[direction], direction);
      };
    }
    draw();
  }
  function balloons({arena, game, target, onChoose}) {
    arena.innerHTML = `<div class="balloon-sky" role="group" aria-label="按顺序接住气球"><span class="balloon-cloud" aria-hidden="true">☁︎</span><div class="balloon-fleet">${game.queue.map((index, i) => `<button class="word-balloon balloon-color-${i%4}" data-balloon="${index}" style="--sway-delay:${i%4*-.6}s" ${game.done||game.order.includes(index)?'disabled':''} lang="en"><span class="balloon-body"><strong>${esc(target.chunks[index])}</strong><i aria-hidden="true">▽</i></span></button>`).join('')}</div><div class="balloon-meadow" aria-hidden="true">🌷 🌿 🧸 🌼</div></div>`;
    arena.querySelectorAll('[data-balloon]').forEach(button => button.onclick = () => onChoose(Number(button.dataset.balloon)));
  }
  function bingo({arena, game, rows, goal, onPick}) {
    arena.innerHTML = `<div class="sound-bingo" role="group" aria-label="声音宾果卡"><p>听示范，找到它，收集 ${goal} 个声音印章</p><div class="bingo-grid">${rows.map(row => `<button data-bingo-id="${esc(row.id)}" class="${game.matches.includes(row.id)?'is-stamped':''}" ${game.done||game.matches.includes(row.id)?'disabled':''}><span aria-hidden="true">${game.matches.includes(row.id)?'⭐':row.picture}</span><strong>${esc(row.zh)}</strong>${game.matches.includes(row.id)?'<small>已找到 ✓</small>':''}</button>`).join('')}</div><div class="bingo-stamps" aria-label="已收集印章">${Array.from({length:goal},(_,i)=>`<span>${i<game.matches.length?'🌟':'☆'}</span>`).join('')}</div></div>`;
    arena.querySelectorAll('[data-bingo-id]').forEach(button => button.onclick = () => onPick(rows.find(row=>row.id===button.dataset.bingoId)));
  }
  function train({arena, game, target, onChange, onCheck}) {
    arena.innerHTML = `<div class="word-train"><div class="train-track" role="group" aria-label="车厢顺序，点击已有车厢可取下"><span class="train-engine" aria-hidden="true">🚂</span>${target.chunks.map((_,slot) => `<button data-train-seat="${slot}" ${game.done||slot>=game.train.length?'disabled':''} aria-label="${slot<game.train.length?'取下第 '+(slot+1)+' 节 '+esc(target.chunks[game.train[slot]]):'第 '+(slot+1)+' 节空车厢'}">${slot<game.train.length?esc(target.chunks[game.train[slot]]):slot+1}</button>`).join('')}</div><div class="train-platform" role="group" aria-label="待上车的积木">${game.queue.map(index=>`<button data-train-piece="${index}" lang="en" ${game.done||game.train.includes(index)?'disabled':''}>${esc(target.chunks[index])}</button>`).join('')}</div><div class="train-controls"><button data-train-undo ${game.done||!game.train.length?'disabled':''}>↶ 撤回一节</button><button data-train-check class="continue-button" ${game.done||game.train.length!==target.chunks.length?'disabled':''}>🚂 检查并发车</button></div></div>`;
    arena.querySelectorAll('[data-train-piece]').forEach(button=>button.onclick=()=>{game.train.push(Number(button.dataset.trainPiece));onChange();});
    arena.querySelectorAll('[data-train-seat]').forEach(button=>button.onclick=()=>{game.train.splice(Number(button.dataset.trainSeat),1);onChange();});
    arena.querySelector('[data-train-undo]').onclick=()=>{game.train.pop();onChange();};
    arena.querySelector('[data-train-check]').onclick=onCheck;
  }
  function detective({arena, game, target, onPick}) {
    arena.innerHTML = `<div class="sound-detective"><div class="detective-desk" aria-hidden="true">🕵️ <span>声音调查站</span> 🔎</div><div class="detective-clues" role="group" aria-label="听示范，找出被调换的一块">${target.chunks.map((text,index)=>`<button data-spot="${index}" ${game.done?'disabled':''} class="${game.done&&index===game.spotIndex?'is-repaired':''}" lang="en"><small>线索 ${index+1}</small><strong>${esc(!game.done&&index===game.spotIndex?game.spotWrong:text)}</strong>${game.done&&index===game.spotIndex?'<span>修好啦 ✓</span>':''}</button>`).join('')}</div><p>示范里有一块和这里不同，点它帮 UU 修好。</p></div>`;
    arena.querySelectorAll('[data-spot]').forEach(button=>button.onclick=()=>onPick(Number(button.dataset.spot)));
  }
  window.BearSpellingBoards = {treasure, balloons, bingo, train, detective};
})();
