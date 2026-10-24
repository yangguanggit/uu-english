(() => {
  'use strict';
  /* BearChildThemes: feature-owned state behind a single factory. */
  window.BearChildThemes = {
    create({ root, heading, open, openBook, startQuiz }) {
      const $ = (id) => document.getElementById(id);
      const D = BEAR_FOUNDATIONS;
      const esc = BearGrowth.esc;
      const art = (entries, options = {}) => BearVisuals.render(entries, options);
      function renderThemes() {
        root.innerHTML =
          heading(
            '🧭',
            '选一个主题，一起去发现',
            `${BEAR_LEARNING_THEMES.length} 条主题路线：认识单词，玩场景，再读一本故事。`,
          ) +
          `<div class="theme-shelf">${BEAR_LEARNING_THEMES.map((t) => `<button class="theme-cover" data-topic="${t.id}">${art(t.art, { className: 'theme-cover-art' })}<h3>${t.title}</h3><p>${t.words.join(' · ')}</p><small>${BearCurriculum.words(t.id).length} 个关联词 · 场景 · 绘本 →</small></button>`).join('')}</div>`;
        root
          .querySelectorAll('[data-topic]')
          .forEach((b) => (b.onclick = () => openTheme(b.dataset.topic)));
      }
      async function downloadedTopics() {
        const entry = window.BearNavigation.capture();
        let available = [],
          error = '';
        try {
          const rows = await BearOffline.status();
          for (const row of rows) if (await BearOffline.verify(row.id)) available.push(row);
        } catch {
          error = '暂时无法读取离线主题。可以稍后重试，或先在线学习。';
        }
        if (!window.BearNavigation.isCurrent(entry)) return;
        open('theme');
        root.innerHTML =
          heading('📦', '已下载主题', '这里只展示可以直接学习的离线内容。') +
          (available.length
            ? '<div class="theme-path">' +
              available
                .map(
                  (t) =>
                    `<button class="continue-button" data-saved-theme="${t.id}">${esc(t.title)}</button>`,
                )
                .join('') +
              '</div>'
            : `<section class="feature-card offline-empty"><span aria-hidden="true">🎒</span><h3>${error ? '离线小书包暂时打不开' : '小书包里还没有主题'}</h3><p>${error || '请家长在「家长空间 → 离线学习」下载喜欢的主题。下载好后，你就能在这里直接听读。'}</p><button id="offline-recheck" class="continue-button">重新检查小书包</button><p>现在也可以点左上角返回，继续在线探索。</p></section>`);
        root
          .querySelectorAll('[data-saved-theme]')
          .forEach((b) => (b.onclick = () => openTheme(b.dataset.savedTheme)));
        $('offline-recheck')?.addEventListener('click', downloadedTopics);
        window.BearNavigation.visit('downloaded', downloadedTopics);
      }
      function openTheme(id) {
        const t = BEAR_LEARNING_THEMES.find((t) => t.id === id);
        if (!t) return;
        open('theme');
        root.innerHTML =
          heading(
            t.emoji,
            t.title,
            `先认识三个故事关键词，再玩场景、读绘本。${BearCurriculum.words(t.id).length} 个关联词将在每日路线中逐步安排。`,
          ) +
          art(t.art, { className: 'theme-detail-art' }) +
          `<div class="theme-path"><button id="theme-words" class="continue-button">① 听三个故事关键词</button><button id="theme-scene" class="continue-button">② 玩场景游戏</button><button id="theme-book" class="continue-button">③ 读主题绘本</button><button id="theme-exchange" class="text-button">再和米米交流三轮 →</button></div><button id="theme-back" class="text-button">返回首页</button>`;
        $('theme-words').onclick = () => {
          startQuiz({
            ids: t.words.map((text) => D.words.find((w) => w.text === text).id),
            i: 0,
            hinted: false,
            wrong: false,
            selected: false,
            key: null,
            phase: 'learn',
            topic: id,
          });
        };
        $('theme-scene').onclick = () => {
          window.BearHub.show('scenes', { track: false });
          window.BearLesson.open(t.scene, false, 1, true);
        };
        $('theme-book').onclick = () => openBook(t.book);
        $('theme-exchange').onclick = () => window.BearHub.openDailyExchange(t.scene);
        $('theme-back').onclick = () => window.BearNavigation.back();
        window.BearNavigation.visit('theme:' + id, () => openTheme(id));
      }
      return { render: renderThemes, open: openTheme, downloaded: downloadedTopics };
    },
  };
})();
