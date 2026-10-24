(() => {
  'use strict';
  /* BearChildRewards: feature-owned state behind a single factory. */
  window.BearChildRewards = {
    create({ root, heading, open, openBook, openParents, openPhonics }) {
      const $ = (id) => document.getElementById(id);
      const L = BearLearning;

      const esc = BearGrowth.esc;
      const decorations = [
        { id: 'rug', emoji: '🌼', name: '小花地毯', key: 'voice', why: '完成一次开口练习' },
        { id: 'cup', emoji: '☕', name: '早餐杯', key: 'scene', why: '完成一个场景游戏' },
        { id: 'plant', emoji: '🪴', name: '窗边绿植', key: 'exchange', why: '完成三轮交流' },
        { id: 'lamp', emoji: '💡', name: '阅读小灯', key: 'book', why: '完成一本绘本并答题' },
        { id: 'blocks', emoji: '🧩', name: '字母积木', key: 'phonics', why: '完成一次拼读挑战' },
        { id: 'frame', emoji: '🖼️', name: '全家福', key: 'family', why: '和家长完成一分钟陪练' },
        { id: 'star', emoji: '⭐', name: '冒险星星', key: 'day:', why: '完成任意一天的小冒险' },
      ];
      function unlocked(d) {
        return L.get().awards.some((k) =>
          d.key.endsWith(':') ? k.startsWith(d.key) : k === d.key,
        );
      }
      function renderHome(message = '') {
        const placed = L.get().placed,
          earned = decorations.filter(unlocked);
        root.innerHTML =
          heading(
            '🧸',
            '米米的小家',
            '这是你的学习奖励小屋。完成练习，获得装饰，再把礼物摆进家里。',
          ) +
          `<p class="home-summary">已获得 ${earned.length} / ${decorations.length} 件装饰 · 已摆放 ${decorations.filter((d) => placed.includes(d.id) && unlocked(d)).length} 件</p><div class="mimi-room"><div class="room-window">☀️<br>🌳</div><span class="room-bear">🐻</span><div class="room-furniture">${decorations
            .filter((d) => placed.includes(d.id) && unlocked(d))
            .map((d) => `<span title="${d.name}">${d.emoji}</span>`)
            .join(
              '',
            )}</div><p>UU & MIMI · OUR LITTLE HOME</p></div><p class="feature-note">点已获得的装饰可以摆放或收起；点还没获得的装饰，看看怎样得到它。</p><div class="decoration-grid">${decorations.map((d) => `<button data-decoration="${d.id}" class="feature-card ${unlocked(d) ? '' : 'locked'}" aria-pressed="${placed.includes(d.id)}" aria-label="${d.name}，${unlocked(d) ? (placed.includes(d.id) ? '点击收起' : '点击摆放') : '未解锁，点击查看获取方法'}"><span aria-hidden="true">${d.emoji}</span><strong>${d.name}</strong><small>${unlocked(d) ? (placed.includes(d.id) ? '已摆好 · 点击收起' : '已获得 · 点击摆放') : '🔒 ' + d.why}</small></button>`).join('')}</div><section class="home-action-panel"><p id="home-feedback" role="status">${esc(message || '选一件喜欢的装饰，米米会告诉你怎么获得。')}</p><button id="home-unlock-task" class="continue-button" hidden></button></section>`;
        root.querySelectorAll('[data-decoration]').forEach(
          (btn) =>
            (btn.onclick = () => {
              const d = decorations.find((x) => x.id === btn.dataset.decoration);
              if (unlocked(d)) {
                const removing = L.get().placed.includes(d.id);
                L.place(d.id);
                renderHome(
                  removing
                    ? `已收起${d.name}，想摆放时再点一下。`
                    : `${d.name}已摆进小家啦！再点一下可以收起。`,
                );
                root.querySelector(`[data-decoration="${d.id}"]`).focus({ preventScroll: true });
              } else {
                $('home-feedback').textContent = `${d.name}还没获得：${d.why}，就能解锁。`;
                const action = $('home-unlock-task');
                action.hidden = false;
                action.textContent = {
                  voice: '去跟读一个单词',
                  scene: '去玩场景游戏',
                  exchange: '去练三轮交流',
                  book: '去读今天的绘本',
                  phonics: '去完成拼读挑战',
                  family: '请家长来陪练',
                  'day:': '继续今天的冒险',
                }[d.key];
                action.onclick = () =>
                  ({
                    voice: () => {
                      BearHub.show('foundation');
                      BearFoundation.openTab('words');
                    },
                    scene: () => BearHub.show('scenes'),
                    exchange: () => BearHub.show('simulation'),
                    book: () => openBook(L.plan().book),
                    phonics: () => {
                      BearHub.show('foundation');
                      openPhonics('word-cat');
                    },
                    family: () => openParents('practice'),
                    'day:': () => open('today'),
                  })[d.key]();
                action.focus({ preventScroll: true });
                action.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
              }
            }),
        );
      }
      return { render: renderHome };
    },
  };
})();
