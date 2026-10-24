(() => {
  'use strict';
  /* BearChildLibrary: feature-owned state behind a single factory. */
  window.BearChildLibrary = {
    create({ root, heading, open }) {
      const $ = (id) => document.getElementById(id);
      const L = BearLearning;
      const esc = BearGrowth.esc;

      let libraryState = { filter: 'all', query: '', limit: 12 };
      function openLibrary(options = {}) {
        libraryState = { filter: 'all', query: '', limit: 12, ...options };
        open('library');
      }
      function renderLibrary() {
        root.innerHTML = heading(
          '🔎',
          '找一找学习内容',
          '搜一搜、翻一翻，找到想再学的单词、场景或绘本。',
        );
        BearLearningTools.mountSearch(root, libraryState);
      }
      function mountTodayLibrary() {
        const all = BearLearningTools.catalog(),
          state = L.get(),
          recent = state.recent
            .map((r) => all.find((x) => x.key === r.key))
            .filter(Boolean)
            .slice(0, 6);
        const box = document.createElement('section');
        box.className = 'today-library feature-card';
        box.setAttribute('aria-labelledby', 'today-library-title');
        box.innerHTML = `<h3 id="today-library-title">找一找学习内容</h3><button id="today-library-search" class="today-search-entry" aria-label="搜索单词、场景或绘本"><span aria-hidden="true">⌕</span><span>搜索单词、场景或绘本</span><b aria-hidden="true">›</b></button>${recent.length ? `<div class="today-recent-heading"><h4>最近学过</h4><button id="today-recent-all" class="text-button">查看全部 →</button></div><div class="today-recent-rail" role="list" aria-label="最近学过，可左右滑动">${recent.map((x) => `<div role="listitem"><button data-today-recent="${esc(x.key)}" class="today-recent-card"><span aria-hidden="true">${x.icon}</span><small>${{ words: '单词', scenes: '场景', books: '绘本' }[x.kind]}</small><strong>${esc(x.title)}</strong><p>${esc(x.desc)}</p></button></div>`).join('')}</div>` : ''}<button id="today-favorites" class="today-favorites"><span aria-hidden="true">☆</span><strong>我的收藏</strong><span>${state.favorites.length} 项</span><b aria-hidden="true">›</b></button>`;
        root.append(box);
        $('today-library-search').onclick = () => {
          openLibrary();
          requestAnimationFrame(() => $('library-search')?.focus({ preventScroll: true }));
        };
        $('today-recent-all')?.addEventListener('click', () => openLibrary({ filter: 'recent' }));
        $('today-favorites').onclick = () => openLibrary({ filter: 'favorites' });
        box
          .querySelectorAll('[data-today-recent]')
          .forEach(
            (b) => (b.onclick = () => all.find((x) => x.key === b.dataset.todayRecent)?.open()),
          );
      }
      return {
        open: openLibrary,
        render: renderLibrary,
        mountToday: mountTodayLibrary,
        checkpoint: () => ({ ...libraryState }),
      };
    },
  };
})();
