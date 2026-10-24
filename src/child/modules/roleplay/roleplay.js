(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    P = BearPracticeDrafts,
    esc = G.esc;
  const root = () => document.getElementById('features-panel');
  const page = BearPracticePage.open;
  function role(id) {
    if (!Object.hasOwn(BEAR_SCENE_BRANCHES, id)) return;
    page('lab:role:' + id, () => renderRole(id));
  }
  function renderRole(id) {
    BearPracticePage.cleanup();
    const box = root(),
      game = LITTLE_BEAR_SCENES[id],
      b = BEAR_SCENE_BRANCHES[id];
    let s = structuredClone(
        L.get().growth.lab?.roles[id] || {
          path: 0,
          turn: 0,
          phase: 'learner',
          heard: [],
          practiced: [],
        },
      ),
      live = true,
      waiting = false,
      expected = null;
    const save = () => P.save('roles', id, s),
      turn = () => BearRoleplayData.turns(id, s.path)[s.turn];
    function draw() {
      box.innerHTML = `<div class="feature-heading"><span>${game.emoji}</span><div><h2>角色互换 · UU 先说</h2><p>${esc(game.categoryTitle + ' · ' + game.catalogTitle)} · ${s.turn === 3 ? '已完成 3 / 3 轮' : `第 ${s.turn + 1} / 3 轮`}</p></div></div><section class="feature-card lab-card"><p>UU 来发起话题或介绍，米米来回应。原来的场景交流进度保留。</p><label>选择这次交流的分支<select id="role-path" aria-label="交流分支">${b.paths.map((p, i) => `<option value="${i}" ${s.path === i ? 'selected' : ''}>${esc(p.zh)}</option>`).join('')}</select></label><p>切换分支会重新开始本次角色练习。</p>${s.turn === 3 ? `<h3>三轮交流完成啦！</h3><p>自行跟读 ${s.practiced.length} 轮 · 听完对方回应 ${s.heard.length} 轮。跳过的声音未计为听完。</p><button id="role-restart" class="continue-button">再换一次角色练习</button>` : `<small>UU · 我先说</small><h3 lang="en">${esc(turn().say)}</h3><p>${esc(turn().zh)}</p><button id="role-listen" class="text-button">♫ 听我这句示范</button><button id="role-said" class="continue-button" ${s.phase !== 'learner' ? 'hidden' : ''}>我试着说过了，听米米回应</button><div id="role-partner" ${s.phase !== 'partner' ? 'hidden' : ''}><small>米米回应</small><h3 lang="en">${esc(turn().reply)}</h3><p>${esc(turn().replyZh)}</p><button id="role-replay" class="text-button">♫ 重听米米回应</button><button id="role-next" class="continue-button" ${s.heard.includes(s.turn) ? '' : 'disabled'}>${s.turn === 2 ? '完成这三轮' : '下一轮 →'}</button><button id="role-skip" class="text-button">暂时听不到，跳过声音继续</button></div>`}<p id="role-status" role="status"></p><p class="feature-note">这是自行开口练习，不评测发音；不会据此增加原关卡星星或判定已掌握。</p></section>`;
      const $ = (id) => box.querySelector('#' + id);
      $('role-path').onchange = () => {
        BearLesson.pause();
        waiting = false;
        s = {
          path: Number($('role-path').value),
          turn: 0,
          phase: 'learner',
          heard: [],
          practiced: [],
        };
        save();
        draw();
      };
      if (s.turn === 3) {
        $('role-restart').onclick = () => {
          s = { path: s.path, turn: 0, phase: 'learner', heard: [], practiced: [] };
          save();
          draw();
        };
        return;
      }
      $('role-listen').onclick = () => {
        waiting = false;
        BearLesson.play(turn().say);
      };
      $('role-said').onclick = () => {
        if (s.phase !== 'learner') return;
        if (!s.practiced.includes(s.turn)) s.practiced.push(s.turn);
        s.phase = 'partner';
        save();
        draw();
        playPartner();
      };
      $('role-replay').onclick = playPartner;
      $('role-next').onclick = () => {
        if (!s.heard.includes(s.turn)) return;
        advance();
      };
      $('role-skip').onclick = advance;
      G.feedbackButton?.(box.querySelector('.lab-card'), 'scene:' + id);
    }
    function advance() {
      BearLesson.pause();
      waiting = false;
      s.turn++;
      s.phase = s.turn === 3 ? 'done' : 'learner';
      save();
      draw();
      G.boundary();
    }
    function playPartner() {
      if (!live || s.phase !== 'partner') return;
      BearLesson.pause();
      expected = BEAR_EXTRA_AUDIO[turn().reply] + '.wav';
      waiting = true;
      box.querySelector('#role-status').textContent = '先听米米回应，再进入下一轮。';
      BearLesson.playFile(expected, turn().reply);
    }
    const ended = (e) => {
      if (!live || !waiting || s.phase !== 'partner' || e.detail?.file !== expected) return;
      waiting = false;
      if (!s.heard.includes(s.turn)) s.heard.push(s.turn);
      save();
      box.querySelector('#role-next').disabled = false;
      box.querySelector('#role-status').textContent = '米米回应完啦，可以继续。';
    };
    const failed = () => {
      if (!live || !waiting) return;
      box.querySelector('#role-status').textContent =
        '回应还没听完，请重听；暂时无法播放也可跳过，不计为听完。';
    };
    window.addEventListener('bear:audio-ended', ended);
    window.addEventListener('bear:audio-failed', failed);
    window.addEventListener('bear:audio-stopped', failed);
    const observer = new MutationObserver(() => {
      if (live && !box.querySelector('#role-path')) BearPracticePage.cleanup();
    });
    observer.observe(box, { childList: true });
    BearPracticePage.onLeave(() => {
      live = false;
      waiting = false;
      observer.disconnect();
      window.removeEventListener('bear:audio-ended', ended);
      window.removeEventListener('bear:audio-failed', failed);
      window.removeEventListener('bear:audio-stopped', failed);
    });
    draw();
    if (s.phase === 'partner') playPartner();
    else if (s.turn < 3) BearLesson.play(turn().say);
  }
  window.BearRoleplay = { open: role };
})();
