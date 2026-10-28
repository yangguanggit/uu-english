(() => {
  'use strict';
  const G = BearGrowth,
    L = BearLearning,
    D = BEAR_FOUNDATIONS,
    esc = G.esc;
  const root = () => document.getElementById('features-panel'),
    openPage = BearActivityPage.open;
  function mountReading(box, b, page, { resume = () => {} } = {}) {
    const task = G.readingTasks(b),
      last = page === b.pages.length - 1;
    if (page !== task.page && !last) return;
    const saved = () => L.reading(b.id).interactions || {},
      update = (change) => L.reading(b.id, { interactions: { ...saved(), ...change } });
    const section = document.createElement('section');
    section.className = 'reading-interaction feature-card';
    section.dataset.readingInteraction = last ? 'order' : 'spot';
    if (!last && task.word) {
      const complete = saved().spot === true;
      section.innerHTML = `<h3>🔎 故事里找一找</h3><p class="learning-copy">这一页提到了哪个词？</p><div class="growth-options">${[
        ...task.choices,
      ]
        .reverse()
        .map(
          (w) =>
            `<button class="learning-copy" data-story-spot="${w.id}" ${complete ? 'disabled' : ''}>${w.picture} ${w.text}</button>`,
        )
        .join(
          '',
        )}</div><p id="story-spot-status" role="status">${complete ? '这次小发现已记下。' : ''}</p><button id="story-interaction-skip" class="text-button">稍后再玩，继续听故事</button>`;
      let wrong = false,
        answered = complete;
      section.querySelectorAll('[data-story-spot]').forEach(
        (btn) =>
          (btn.onclick = () => {
            if (answered) return;
            if (btn.dataset.storySpot !== task.word.id) {
              wrong = true;
              L.record(task.word.id, 'wrong');
              section.querySelector('#story-spot-status').textContent =
                '再看一看这一页的句子和图片。';
              return;
            }
            answered = true;
            L.record(task.word.id, 'selected', { hinted: true });
            update({ spot: true });
            section.querySelectorAll('[data-story-spot]').forEach((b) => (b.disabled = true));
            section.querySelector('#story-spot-status').textContent = wrong
              ? '找到了！下次再试着独立认一认。'
              : '找到故事里的词啦！';
          }),
      );
      section.querySelector('#story-interaction-skip').onclick = () => {
        update({ spotSkipped: true });
        resume();
      };
    } else if (last) {
      let order = [],
        mistake = false;
      section.innerHTML = `<details class="story-activity"><summary>🧩 故事排排队</summary><p>先发生什么，再发生什么？按顺序点选三句。</p><div id="story-order-progress" class="growth-drop learning-copy"></div><div class="growth-options story-order">${[
        ...task.indices,
      ]
        .reverse()
        .map(
          (i) =>
            `<button class="learning-copy" data-story-order="${i}">${esc(b.pages[i][1])}<small class="translation">${esc(b.pages[i][2])}</small></button>`,
        )
        .join(
          '',
        )}</div><p id="story-order-status" role="status">${saved().order ? '上次已完成，可以再练一遍。' : ''}</p></details><details class="story-activity"><summary>💬 换你讲故事</summary><p>选一个喜欢的角色，用一个词或一句英语讲讲发生了什么。可以用上方配音按钮录下这一页，再回听。</p><button id="story-retell" class="text-button">我试着讲过了，记下来</button><p id="story-retell-status" role="status">${saved().retell ? '已记录一次自主复述尝试，未验证内容。' : ''}</p></details>`;
      section.querySelectorAll('[data-story-order]').forEach(
        (btn) =>
          (btn.onclick = () => {
            const i = Number(btn.dataset.storyOrder);
            if (order.includes(i)) return;
            if (i !== task.indices[order.length]) {
              mistake = true;
              section.querySelector('#story-order-status').textContent =
                '回到前面的页面看看，故事最先发生了什么？';
              return;
            }
            order.push(i);
            btn.disabled = true;
            section.querySelector('#story-order-progress').textContent = order
              .map((i, n) => `${n + 1}. ${b.pages[i][1]}`)
              .join(' → ');
            if (order.length === 3) {
              update({ order: true, orderHelped: mistake });
              section.querySelector('#story-order-status').textContent = '故事顺序排好啦！';
            }
          }),
      );
      section.querySelector('#story-retell').onclick = () => {
        if (saved().retell) return;
        update({ retell: true });
        L.record('book:' + b.id, 'practiced');
        section.querySelector('#story-retell-status').textContent =
          '已记录自主复述尝试，未验证内容或发音。';
      };
    }
    box.querySelector('.story-page').append(section);
    if (last) G.mountComprehension(section, b);
  }
  window.BearReadingActivities = {
    mount: mountReading,
    pauseForReading(b, page) {
      const t = G.readingTasks(b),
        p = L.reading(b.id).interactions;
      return page === t.page && !p?.spot && !p?.spotSkipped;
    },
  };
})();
