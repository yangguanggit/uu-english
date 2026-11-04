(() => {
  'use strict';
  /* BearChildExplore: feature-owned state behind a single factory. */
  window.BearChildExplore = {
    create({ root, heading, open, downloadedTopics }) {
      const $ = (id) => document.getElementById(id);
      function renderExplore() {
        root.innerHTML =
          heading('🧭', '今天想探索什么？', '选一个喜欢的玩法，跟着自己的节奏学。') +
          `<section class="explore-main" aria-label="主要学习入口">${[
            ['foundation', '🔤', '基础学习', '字母、音标、自然拼读、常用单词与句型积木'],
            ['spelling-games', '🎮', '拼读游戏', '10 种玩法：听音、拼词、串句、记忆与寻宝'],
            [
              'scenes',
              '🏡',
              '场景对话',
              `${BEAR_CATEGORIES.length} 类场景，${LITTLE_BEAR_ROUTE.length} 段交流对话`,
            ],
            ['simulation', '🧳', '场景模拟', '选择练习范围，最多去五站'],
          ]
            .map(
              ([id, icon, title, desc]) =>
                `<button class="explore-card" data-explore-section="${id}"><span>${icon}</span><h3>${title}</h3><p>${desc}</p></button>`,
            )
            .join('')}</section><h3 class="section-caption">还想玩什么？</h3><section class="explore-tools" aria-label="更多学习与奖励">${[
            ['growth-games', '🧺', '听指令动手玩', '购物装篮、整理书包、声音排排队'],
            [
              'themes',
              '🧭',
              '主题小路线',
              `${BEAR_LEARNING_THEMES.length} 条主题：单词 → 场景 → 绘本`,
            ],
            ['review', '🎒', '复习小口袋', '单词、场景句子与故事问题一起复习'],
            ['home', '🧸', '米米的小家', '7 种奖励装饰，点击摆放'],
          ]
            .map(
              ([id, icon, title, desc]) =>
                `<button class="explore-card" data-explore-feature="${id}"><span>${icon}</span><h3>${title}</h3><p>${desc}</p></button>`,
            )
            .join(
              '',
            )}<button class="explore-card" id="explore-offline"><span>📦</span><h3>已下载主题</h3><p>断网也能继续听读</p></button></section>`;
        root.querySelectorAll('[data-explore-section]').forEach(
          (b) =>
            (b.onclick = () => {
              b.dataset.exploreSection === 'spelling-games'
                ? open('spelling-games')
                : BearHub.show(b.dataset.exploreSection);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }),
        );
        root
          .querySelectorAll('[data-explore-feature]')
          .forEach(
            (b) =>
              (b.onclick = () =>
                b.dataset.exploreFeature === 'growth-games'
                    ? BearGrowth.games()
                    : open(b.dataset.exploreFeature)),
          );
        $('explore-offline').onclick = downloadedTopics;
      }
      return { render: renderExplore };
    },
  };
})();
