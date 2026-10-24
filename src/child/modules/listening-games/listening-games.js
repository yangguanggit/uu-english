(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    D = BEAR_FOUNDATIONS,
    esc = G.esc;
  const root = () => document.getElementById('features-panel'),
    openPage = BearActivityPage.open;
  function games() {
    openPage('games', renderGames);
  }
  function renderGames() {
    root().innerHTML = `<div class="feature-heading"><span>🧺</span><div><h2>听指令，动手玩</h2><p>复用今天的主题词，每轮三个小任务。</p></div></div><div class="explore-grid">${[
      ['basket', '🧺', '购物装篮', '听英文，把物品放进篮子'],
      ['bag', '🎒', '整理小书包', '按声音找到要带的东西'],
      ['order', '🔢', '声音排排队', '依次听三个词，再按顺序点选'],
    ]
      .map(
        ([id, icon, title, desc]) =>
          `<button class="explore-card" data-growth-game="${id}"><span>${icon}</span><h3>${title}</h3><p>${desc}</p>${L.get().growth.games[id] ? '<small>上次完成 3 个小任务</small>' : ''}</button>`,
      )
      .join('')}</div>`;
    root()
      .querySelectorAll('[data-growth-game]')
      .forEach((b) => (b.onclick = () => startGame(b.dataset.growthGame)));
  }
  function gameWords(mode) {
    const p = L.plan(),
      pool =
        mode === 'bag' && navigator.onLine
          ? D.words.filter((w) => w.theme === 'school')
          : BearCurriculum.words(p.theme);
    const unique = [
      ...new Map(
        [...pool, ...p.review.map((id) => D.words.find((w) => w.id === id))]
          .filter(Boolean)
          .map((w) => [w.id, w]),
      ).values(),
    ];
    return G.rotate(unique, 'game-' + mode, 3);
  }
  function startGame(mode, restart = false) {
    if (!['basket', 'bag', 'order'].includes(mode)) return;
    const draft = !restart && L.get().growth.gameDrafts?.[mode];
    let targets = draft ? draft.ids.map((id) => D.words.find((w) => w.id === id)) : gameWords(mode),
      index = draft?.index || 0,
      correct = draft?.correct || 0,
      wrong = draft?.wrong || false,
      chosen = targets.slice(0, index);
    const queue = G.shuffle([...targets]);
    const checkpoint = () =>
      L.growth('growthGameDraft', {
        id: mode,
        value: { ids: targets.map((w) => w.id), index, correct, wrong },
      });
    checkpoint();
    function play() {
      if (mode === 'order') {
        BearLesson.playFiles(
          targets.slice(index).map((w) => ({ file: w.audio + '.wav', label: w.text })),
        );
      } else BearLesson.playFile(targets[index].audio + '.wav', targets[index].text);
    }
    function draw() {
      BearLesson.pause();
      const box = root();
      if (index === targets.length) {
        L.growth('growthGame', { id: mode, value: { correct, total: 3 } });
        box.innerHTML = `<section class="feature-card"><h2>收好三个小发现！</h2><p>无提示选对 ${correct}/3；需要帮助的词会更早回来。</p><button id="game-again" class="continue-button">再玩一轮</button><button id="game-exit" class="text-button">换个玩法</button></section>`;
        box.querySelector('#game-again').onclick = () => startGame(mode, true);
        box.querySelector('#game-exit').onclick = games;
        G.boundary?.();
        return;
      }
      box.innerHTML = `<div class="feature-heading"><span>${mode === 'bag' ? '🎒' : mode === 'order' ? '🔢' : '🧺'}</span><div><h2>${mode === 'bag' ? '整理小书包' : mode === 'order' ? '声音排排队' : '购物装篮'}</h2><p>${index + 1} / 3 · ${mode === 'order' ? '按刚才听到的顺序点选' : '听一听，再把物品放进' + (mode === 'bag' ? '书包' : '篮子')}</p></div></div><section class="quiz-card"><button id="game-listen" class="continue-button">♫ ${mode === 'order' ? '听剩下的词' : '听这个声音'}</button><div class="growth-drop" role="group" aria-label="已收集的物品">${chosen.map((w) => `<span>${w.picture} ${w.zh}</span>`).join('') || '选中物品后，点下方放入'}</div><div class="growth-options">${queue
        .filter((w) => !chosen.includes(w))
        .map(
          (w) =>
            `<button draggable="true" data-pack="${w.id}" aria-pressed="false" aria-label="${esc(w.zh)}"><span>${w.picture}</span><small>${w.zh}</small></button>`,
        )
        .join(
          '',
        )}</div><button id="game-place" class="continue-button" disabled>放入${mode === 'bag' ? '书包' : mode === 'order' ? '队列' : '篮子'}</button><p id="game-feedback" role="status"></p><button id="game-hint" class="text-button">看看中文提示</button><button id="game-back" class="text-button">返回玩法选择</button></section>`;
      let selected = null,
        locked = false;
      const gate = G.listenGate(
        box,
        play,
        [...box.querySelectorAll('[data-pack]')],
        '#game-feedback',
      );
      const pick = (id) => {
        if (locked || !gate.ready()) return;
        selected = id;
        box
          .querySelectorAll('[data-pack]')
          .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pack === id)));
        box.querySelector('#game-place').disabled = false;
      };
      const place = () => {
        if (!selected || locked) return;
        const w = targets[index];
        if (selected !== w.id) {
          wrong = true;
          checkpoint();
          L.record(w.id, 'wrong');
          box.querySelector('#game-feedback').textContent = '再听一次，试试别的物品。';
          return;
        }
        locked = true;
        L.record(w.id, 'selected', { hinted: wrong });
        G.transfer(w.id, !wrong, 'game-' + mode);
        if (!wrong) correct++;
        chosen.push(w);
        index++;
        wrong = false;
        checkpoint();
        gate.dispose();
        draw();
      };
      box.querySelectorAll('[data-pack]').forEach((b) => {
        b.onclick = () => pick(b.dataset.pack);
        b.ondragstart = (e) => {
          pick(b.dataset.pack);
          e.dataTransfer.setData('text/plain', b.dataset.pack);
        };
      });
      const zone = box.querySelector('.growth-drop');
      zone.ondragover = (e) => e.preventDefault();
      zone.ondrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        if (queue.some((w) => w.id === id) && !chosen.some((w) => w.id === id)) {
          pick(id);
          place();
        }
      };
      box.querySelector('#game-place').onclick = place;
      box.querySelector('#game-listen').onclick = gate.play;
      box.querySelector('#game-hint').onclick = () => {
        wrong = true;
        checkpoint();
        L.record(targets[index].id, 'hinted');
        box.querySelector('#game-feedback').textContent = '这次要找：' + targets[index].zh;
      };
      box.querySelector('#game-back').onclick = games;
      gate.onSkip = () => {
        wrong = true;
        L.record(targets[index].id, 'hinted');
        chosen.push(targets[index]);
        index++;
        wrong = false;
        checkpoint();
        gate.dispose();
        draw();
      };
      gate.play();
    }
    openPage('game-' + mode, draw);
  }
  window.BearListeningGames = { open: games, start: startGame };
})();
