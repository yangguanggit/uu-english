(() => {
  'use strict';
  /* BearChildToday: feature-owned state behind a single factory. */
  window.BearChildToday = {
    create({ root, heading, open, openBook, downloadedTopics, mountTodayLibrary, startQuiz }) {
      const $ = (id) => document.getElementById(id);
      const L = BearLearning;
      const D = BEAR_FOUNDATIONS;
      const S = LITTLE_BEAR_SCENES;
      const word = (id) => D.words.find((w) => w.id === id);
      const esc = BearGrowth.esc;
      const art = (entries, options = {}) => BearVisuals.render(entries, options);
      const books = BEAR_BOOKS;
      const themeFor = (p) =>
        BEAR_LEARNING_THEMES.find((t) => t.id === p.theme) || BEAR_LEARNING_THEMES[0];
      function banner() {
        const p = L.plan();
        $('daily-trail').innerHTML =
          `<div><strong>☀️ 今日小冒险</strong><span>约 ${p.minutes || 10} 分钟 · 已完成 ${L.required(p).filter((k) => p.done.includes(k)).length}/${L.required(p).length} 段</span></div><button class="text-button" id="open-today">${L.required(p).every((k) => p.done.includes(k)) ? '看看今天的收获' : '继续今日任务'} →</button>`;
        $('open-today').onclick = () => open('today');
      }
      async function continueDaily() {
        if (!navigator.onLine) {
          try {
            if (!(await BearOffline.dailyReady())) {
              await downloadedTopics();
              return;
            }
          } catch {
            await downloadedTopics();
            return;
          }
        }
        const p = L.plan(),
          next = L.required(p).find((k) => !p.done.includes(k));
        if (!next) {
          open('home');
          return;
        }
        open('today');
        startTask(next);
      }
      function renderLanding() {
        const p = L.plan(),
          t = themeFor(p),
          child = window.BearProfiles.current();
        const steps={review:[p.warmup?'热身':'复习',p.warmup?'主题词热身':'复习词句和故事',1],learn:['单词',`认识 ${p.learn.length} 个单词`,2],game:['场景',S[p.scene].catalogTitle,3],book:['绘本',books.find(b=>b.id===p.book).title,3],exchange:['交流','和米米交流三轮',2]},required=L.required(p),next=required.find(k=>!p.done.includes(k));
        root.innerHTML = `<section class="adventure-hero"><div class="adventure-cover">${art(t.art, {className:'adventure-art'})}</div><div class="adventure-copy"><p class="eyebrow">${esc(child.name)} · 今天的主题</p><h2>${t.title}</h2><p class="adventure-next" id="today-next-label">${next?`下一步：${esc(steps[next][1])} · 约 ${steps[next][2]} 分钟`:'今天的冒险完成啦，看看你的小收获！'}</p><div class="trail-dots trail-steps" aria-label="已完成 ${required.filter(k=>p.done.includes(k)).length} / ${required.length} 段">${required.map((k,i)=>`<span class="${p.done.includes(k)?'done':k===next?'current':''}" ${k===next?'aria-current="step"':''}><b>${p.done.includes(k)?'✓':i+1}</b><small>${steps[k][0]}</small></span>`).join('')}</div><button id="continue-adventure" class="continue-button">${next?'继续今天的冒险':'看看今天的收获'} →</button><button id="daily-overview" class="text-button">看看今天的小路线</button></div></section>`;
        $('continue-adventure').onclick = continueDaily;
        $('daily-overview').onclick = () => open('today');
        BearGrowth.entry(root);
        mountTodayLibrary();
      }
      function renderToday() {
        const p = L.plan(),
          t = themeFor(p),
          tasks = [
            ['review', '🎒', p.warmup ? '主题词热身' : '复习词句和故事', '约 1 分钟'],
            ['learn', '🌱', `认识 ${p.learn.map((id) => word(id).text).join(' / ')}`, '约 2 分钟'],
            ['game', '🎮', S[p.scene].catalogTitle, '约 3 分钟'],
            ['book', '📖', books.find((b) => b.id === p.book).title, '约 3 分钟'],
            ['exchange', '💬', '和米米交流三轮', '约 2 分钟'],
          ];
        root.innerHTML =
          heading(
            t.emoji,
            `今天的小冒险 · ${t.title}`,
            '同一主题，先认识单词，再交流、读故事。按进度继续，先复习再学新内容。',
          ) +
          `<p class="feature-note">${p.continuedFrom ? '接着上次未完成的主题继续，已完成部分会保留。' : '今天按 ' + (p.minutes || 10) + ' 分钟计划安排。'} ${p.minutes === 5 ? '先完成前三段，绘本和交流可自选加练。' : ''}</p><div class="daily-path">${tasks.map(([key, icon, title, time], i) => `<button data-task="${key}" class="daily-task ${p.done.includes(key) ? 'done' : ''}"><span class="task-bubble">${p.done.includes(key) ? '✓' : icon}</span><div><small>${L.required(p).includes(key) ? '第 ' + (i + 1) + ' 段' : '自选加练'} · ${time}</small><h3>${title}</h3><p>${p.done.includes(key) ? '今天已完成，可以再练一遍' : '点这里开始 →'}</p></div></button>`).join('')}</div><div class="feature-note">${p.warmup ? '还没有足够的历史记录，第一段先听今天的主题词热身。' : '优先巩固到期内容，答错或用过提示的词句会更早回来。'} 随时可以休息，回来继续。</div><button id="daily-next" class="continue-button">${L.required(p).every((k) => p.done.includes(k)) ? '去装饰米米的小家' : '开始 / 继续下一段'} →</button>`;
        root
          .querySelectorAll('[data-task]')
          .forEach((b) => (b.onclick = () => startTask(b.dataset.task)));
        $('daily-next').onclick = continueDaily;
        mountTodayLibrary();
      }
      function startTask(key) {
        const p = L.plan();
        const taskContext = L.taskContext(p);
        if (key === 'book') {
          openBook(p.book);
          return;
        }
        if (key === 'review' && navigator.onLine) {
          const pool = BearLearningTools.reviewPool(5);
          if (pool.length) {
            BearLearningTools.mixedReview(
              root,
              pool,
              () => {
                L.task('review', taskContext);
                open('today');
              },
              { daily: true, taskContext },
            );
            return;
          }
        }
        if (key === 'review' || key === 'learn') {
          startQuiz({
            ids: p[key],
            i: 0,
            hinted: false,
            wrong: false,
            selected: false,
            key,
            taskContext,
            phase: key === 'learn' ? 'learn' : 'test',
          });
          return;
        }
        if (key === 'exchange') window.BearHub.openDailyExchange(p.scene);
        else {
          window.BearHub.show('scenes', { track: false });
          window.BearLesson.open(p.scene, false, 1, true);
        }
        if (key === 'exchange') {
          $('simulation-panel').innerHTML =
            '<div class="feature-note">今日交流 · 完成三轮后，点击上方「继续今日任务」查看进度。</div>';
        }
        $('lesson-workspace').scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      return { banner, renderLanding, render: renderToday };
    },
  };
})();
