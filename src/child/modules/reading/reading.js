(() => {
  'use strict';
  /* BearChildReading: feature-owned state behind a single factory. */
  window.BearChildReading = {
    create({ root, heading, open, playWord, setView, isActive }) {
      const $ = (id) => document.getElementById(id);
      const L = BearLearning;
      const D = BEAR_FOUNDATIONS;
      const word = (id) => D.words.find((w) => w.id === id);
      const esc = BearGrowth.esc;
      const art = (entries, options = {}) => BearVisuals.render(entries, options);
      const books = BEAR_BOOKS;
      let book = null,
        page = 0,
        storyHeard = false,
        bookAnswers = {},
        consent = false,
        bookRecording = false;
      const pageFile = () => book.pages[page][4] || `story-${book.id}-${page}.wav`;
      const mic = new MicrophonePractice({
        onState(state, message) {
          if (state === 'idle' || state === 'error') {
            bookRecording = false;
            const audio = $('book-recording');
            if (audio) {
              audio.pause();
              audio.removeAttribute('src');
              audio.load();
              audio.hidden = true;
            }
            if ($('book-save')) $('book-save').hidden = true;
          }
          const b = $('book-record');
          if (b) {
            b.textContent =
              state === 'listening'
                ? '⏹ 结束配音'
                : state === 'requesting'
                  ? '正在请求麦克风…'
                  : '🎙️ 我来给 UU 配音';
            b.disabled = ['requesting', 'starting', 'processing'].includes(state) || !mic.available;
          }
          $('book-mic-status')?.replaceChildren(document.createTextNode(message));
        },
        onServiceUnavailable(message) {
          if ($('book-mic-status')) $('book-mic-status').textContent = message;
        },
        onRecognized() {},
        onRecording(url) {
          if (!$('book-recording')) return;
          $('book-recording').src = url;
          $('book-recording').hidden = false;
          $('book-save').hidden = false;
          $('book-save').disabled = false;
          $('book-save').textContent = '记下这次配音练习';
          bookRecording = true;
        },
      });
      let readerContinuous = false,
        readerAdvanceTimer;
      const STORY_PAUSE_MS = 1000;
      let bookLevel = L.get().settings.readingLevel || 'L1';
      const readerMode = () => L.get().settings.readerMode || 'follow';

      function pause() {
        cancelReaderAdvance();
        readerContinuous = false;
        document.body.classList.remove('reading-immersive');
        mic.cancel();
        bookRecording = false;
        storyHeard = false;
      }
      function cancelReaderAdvance() {
        clearTimeout(readerAdvanceTimer);
        readerAdvanceTimer = null;
      }
      function openBooks(level = L.get().settings.readingLevel || 'L1') {
        bookLevel = BEAR_READING_LEVELS.some((x) => x.id === level) ? level : 'L1';
        open('books');
      }
      function renderBooks() {
        setView('books');
        window.BearNavigation.view('books');
        document.body.classList.remove('home-landing');
        mic.cancel();
        bookRecording = false;
        document.body.classList.remove('reading-immersive');
        book = null;
        const state = L.get(),
          levels = BEAR_READING_LEVELS.filter((x) => x.id === bookLevel);
        const card = (b) => {
          const progress = state.reading[b.id],
            read = new Set([...(progress?.heard || []), ...(progress?.read || [])]).size;
          return `<button data-book="${b.id}" class="explore-card book-cover"><span class="book-grade">${b.level}</span>${art(b.coverArt, { className: 'book-cover-art' })}<h3>${b.title}</h3><p>${b.pages.length} 页</p><span class="book-reading-status">${read === b.pages.length && progress?.answer ? '✓ 已读完并答对问题' : read ? '已读 ' + read + ' / ' + b.pages.length + ' 页' : '翻开新故事 →'}</span></button>`;
        };
        root.innerHTML =
          heading(
            '📖',
            '分级小书架',
            `${books.length} 本原创故事，从看图认词到连贯阅读，找到适合自己的那一级。`,
          ) +
          `<nav class="feature-tabs book-levels" aria-label="阅读分级">${BEAR_READING_LEVELS.map((g) => `<button data-book-level="${g.id}" data-rail-key="${g.id}" aria-pressed="${bookLevel === g.id}">${BearCategoryRail.label(g.id+' '+g.title,books.filter((b) => b.level === g.id).length)}</button>`).join('')}</nav><p class="reading-level-note">按句式和故事结构逐步增加难度；可以自由选级，先听再读，也能回到喜欢的故事。</p>${levels
            .map((g) => {
              const shelf = books.filter((b) => b.level === g.id);
              return `<section class="reading-level-section" aria-labelledby="reading-level-${g.id}"><div class="reading-level-heading"><span aria-hidden="true">${g.icon}</span><div><h3 id="reading-level-${g.id}">${g.id} · ${g.title}<small>${shelf.length} 本</small></h3><p>${g.description}</p><small>${g.skills}</small></div></div><div class="explore-grid book-shelf">${shelf.map(card).join('')}</div></section>`;
            })
            .join('')}`;
        const recentBooks=state.recent.map(entry=>books.find(b=>'book:'+b.id===entry.key)).filter(Boolean);
        const unfinished=[...recentBooks,...books].find(b=>{
          const r=state.reading[b.id];
          return r&&(r.page>0||r.heard?.length||r.read?.length)&&
            !(new Set([...(r.heard||[]),...(r.read||[])]).size===b.pages.length&&r.answer);
        });
        if(unfinished){const r=state.reading[unfinished.id];root.querySelector('.book-levels').insertAdjacentHTML('afterend',`<button class="continue-reading" data-book="${unfinished.id}"><span>📖</span><div><small>接着读这本 · ${unfinished.level}</small><strong>${unfinished.title}</strong><p>从第 ${(r.page||0)+1} 页继续</p></div><b>继续阅读 →</b></button>`);}
        BearPageLayout.categories(root,['.book-levels']);
        const changeLevel = (level) => {
          if (level === bookLevel) return;
          window.BearLesson.pause();
          bookLevel = level;
          renderBooks();
          BearNavigation.save();
        };
        BearCategoryRail.mount(root.querySelector('.book-levels'), {selector:'[data-book-level]', active:bookLevel, surfaces:[root], ignore:'.category-rail,.feature-tabs', change:changeLevel});
        root
          .querySelectorAll('[data-book]')
          .forEach((btn) => (btn.onclick = () => openBook(btn.dataset.book)));
      }
      function bookVocabulary(b, known = L.get().items) {
        const ids = [...new Set(b.pages.flatMap((p) => p[3]))]
          .map((t) => D.words.find((w) => w.text === t))
          .filter(Boolean);
        const count = ids.filter((w) => {
          const x = known[w.id];
          return x && x.streak > 0 && (x.selected || 0) + (x.independent || 0) > 0;
        }).length;
        return `无提示练习证据 ${count}/${ids.length} · ${count >= ids.length / 2 ? '可以尝试自己读，随时听示范' : '建议先听故事、认识关键词'}`;
      }
      function openBook(id) {
        setView('books');
        book = books.find((b) => b.id === id);
        if (!book) return;
        BearLearningTools.mark('book:' + id);
        readerContinuous = readerMode() === 'listen';
        const progress = L.reading(id);
        page = progress.page;
        bookAnswers = Object.fromEntries(progress.heard.map((i) => [i, true]));
        bookAnswers.answer = progress.answer || progress.interactions?.understood === true;
        renderPage();
        if (readerMode() !== 'independent') playPage();
        window.BearNavigation.visit('book:' + id, () => openBook(id));
        root.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      function storePage() {
        const progress = L.reading(book.id);
        bookAnswers.answer ||= progress.answer || progress.interactions?.understood === true;
        L.reading(book.id, {
          page,
          heard: Object.keys(bookAnswers)
            .filter((k) => /^\d+$/.test(k) && bookAnswers[k])
            .map(Number),
          answer: !!bookAnswers.answer,
        });
      }
      function stopContinuous() {
        cancelReaderAdvance();
        readerContinuous = false;
        if ($('reader-continuous')) $('reader-continuous').textContent = '继续连续播放';
      }
      function playPage() {
        cancelReaderAdvance();
        mic.cancel();
        storyHeard = false;
        window.BearLesson.playFile(pageFile(), book.pages[page][1]);
      }
      function renderPage() {
        cancelReaderAdvance();
        mic.cancel();
        bookRecording = false;
        storyHeard = false;
        window.BearLesson.pause();
        const b = book,
          p = b.pages[page],
          done = bookAnswers[page] || readerMode() !== 'follow';
        if (readerMode() === 'independent') {
          const old = L.reading(b.id);
          L.reading(b.id, { read: [...new Set([...(old.read || []), page])] });
        }
        document.body.classList.add('reading-immersive');
        storePage();
        root.innerHTML = `<div class="story-top"><button id="books-back" class="text-button">← 绘本书架</button>${BearLearningTools.favoriteButton('book:' + b.id)}<strong>${b.title}</strong><button id="reader-chinese" class="text-button">${L.get().settings.chinese ? '收起中文' : '显示中文'}</button><span>${page + 1} / ${b.pages.length}</span></div><div class="feature-tabs reader-modes" data-tab-level="secondary" aria-label="绘本阅读模式">${[
          ['listen', '听故事'],
          ['follow', '跟读'],
          ['independent', '自己读'],
        ]
          .map(
            ([id, label]) =>
              `<button data-reader-mode="${id}" data-rail-key="${id}" aria-pressed="${readerMode() === id}">${label}</button>`,
          )
          .join(
            '',
          )}<button id="reader-continuous" ${readerMode() === 'listen' ? '' : 'hidden'}>${readerContinuous ? '暂停连续播放' : '继续连续播放'}</button></div><details class="reader-info"><summary>故事玩法与学习提示</summary><p>${b.scene} · ${b.pages.length} 页 · 听故事 / 跟读 / 自己读</p><p>${bookVocabulary(b)}</p></details><p class="swipe-hint">← 向右滑上一页 · 向左滑下一页 →</p><div class="story-reader"><button id="book-prev" class="story-page-turn previous" aria-label="上一页" ${page === 0 ? 'disabled' : ''}><b aria-hidden="true">‹</b><span>上一页</span></button><article class="story-page">${art(b.pageArt[page], { className: 'story-art', layout: b.pageLayouts?.[page] || '' })}<p class="story-sentence" lang="en-US" tabindex="0" role="button" aria-label="重听这一句">${esc(p[1])}</p><p class="translation">${p[2]}</p><div class="story-words">${p[3]
          .map((text) => {
            const w = D.words.find((x) => x.text === text);
            const ref = b.pageArt[page].find(
                (x) => typeof x === 'object' && x.word === text && x.variant,
              ),
              picture = ref ? BearArtwork.render(ref.variant + ' ' + text, w?.picture) : w?.picture;
            return w ? `<button data-story-word="${w.id}">${picture} ${w.text}</button>` : '';
          })
          .join(
            '',
          )}</div><button id="book-listen" class="continue-button">♫ 再听这一页</button><div class="book-dubbing"><button id="book-record" class="record-button" ${mic.available ? '' : 'disabled'}>🎙️ 我来给 UU 配音</button><p id="book-mic-status" role="status"></p><audio id="book-recording" controls hidden aria-label="回听本页配音"></audio><button id="book-save" class="text-button" hidden>记下这次配音练习</button></div>${
          page === b.pages.length - 1
            ? `<div class="book-question"><h3>${b.question}</h3>${b.choices
                .map((text) => {
                  const w = D.words.find((x) => x.text === text);
                  return `<button data-book-answer="${text}">${w.picture} ${text}</button>`;
                })
                .join('')}<p id="book-answer-feedback" role="status"></p></div>`
            : ''
        }<p id="book-status" role="status">${readerMode() === 'independent' ? '自己读模式：自由翻页，点句子可以听示范。' : readerMode() === 'listen' ? '听故事模式：自动连续播放，可暂停或自由翻页。' : done ? '这一页已经听完啦。' : '跟读模式：听完整页，再翻下一页。'}</p></article><button id="book-next" class="story-page-turn next" aria-label="${page === b.pages.length - 1 ? '收好阅读小灯' : '下一页'}" ${done ? '' : 'disabled'}><b aria-hidden="true">${page === b.pages.length - 1 ? '☆' : '›'}</b><span>${page === b.pages.length - 1 ? '收奖励' : '下一页'}</span></button></div>`;
        BearLearningTools.bindFavorites(root);
        BearCategoryRail.mount(root.querySelector('.reader-modes'), {selector:'[data-reader-mode]', active:readerMode(), surfaces:[root], ignore:'.category-rail,.feature-tabs,.story-reader', change(next){readerContinuous=next==='listen';L.settings({readerMode:next});renderPage();if(readerMode()!=='independent')playPage();}});
        $('reader-continuous').onclick = () => {
          readerContinuous = !readerContinuous;
          $('reader-continuous').textContent = readerContinuous ? '暂停连续播放' : '继续连续播放';
          if (readerContinuous) playPage();
          else BearLesson.pause();
        };
        const sentence = root.querySelector('.story-sentence');
        sentence.onclick = () => {
          stopContinuous();
          playPage();
        };
        sentence.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            sentence.click();
          }
        };
        $('reader-chinese').onclick = () => {
          document.body.classList.remove('peek-chinese');
          L.settings({ chinese: !L.get().settings.chinese });
          $('reader-chinese').textContent = L.get().settings.chinese ? '收起中文' : '显示中文';
        };
        $('books-back').onclick = () => window.BearNavigation.back();
        $('book-listen').onclick = playPage;
        root.querySelectorAll('[data-story-word]').forEach(
          (btn) =>
            (btn.onclick = () => {
              stopContinuous();
              mic.cancel();
              storyHeard = false;
              playWord(word(btn.dataset.storyWord));
            }),
        );
        const start = () => {
          stopContinuous();
          window.BearLesson.pause();
          mic.start({ phrase: p[1], words: [], recognize: false });
        };
        $('book-record').onclick = () => {
          if (mic.state === 'listening') {
            mic.finish();
            return;
          }
          if (consent) start();
          else
            window.BearLesson.requestConsent(() => {
              consent = true;
              start();
            });
        };
        $('book-save').onclick = () => {
          if (bookRecording && mic.state === 'ready') {
            bookRecording = false;
            $('book-save').disabled = true;
            $('book-save').textContent = '已记下这次配音练习';
            L.record(`book:${b.id}`, 'recorded');
            $('book-status').textContent = '已记下配音练习，原始声音仅留在本页。';
          }
        };
        $('book-prev').onclick = () => {
          turnPage(-1);
        };
        $('book-next').onclick = () => {
          if (page < b.pages.length - 1) {
            turnPage(1);
          } else {
            if (!bookAnswers.answer) {
              $('book-status').textContent = '先回答故事的小问题，再收好阅读小灯吧。';
              return;
            }
            const progress = L.reading(b.id);
            if (!b.pages.every((_, i) => bookAnswers[i] || (progress.read || []).includes(i))) {
              $('book-status').textContent = '先读完所有页面，再收好阅读小灯。';
              return;
            }
            L.completeBook(b.id);
            BearGrowth.boundary?.();
            open(L.plan().book === b.id ? 'today' : 'home');
          }
        };
        BearGrowth.mountReading(root, b, page, {
          resume() {
            if (readerMode() === 'listen') {
              readerContinuous = true;
              if (bookAnswers[page]) turnPage(1);
              else $('reader-continuous').textContent = '暂停连续播放';
            } else $('book-status').textContent = '已记下稍后再玩，可以继续翻页。';
          },
        });
        BearGrowth.feedbackButton(root.querySelector('.story-top'), 'book:' + b.id, page);
        attachSwipe();
        const answerButtons = [...root.querySelectorAll('[data-book-answer]')];
        const lockAnswer = () => {
          answerButtons.forEach((btn) => {
            btn.disabled = true;
            btn.classList.toggle('selected', btn.dataset.bookAnswer === b.answer);
          });
        };
        if (answerButtons.length && bookAnswers.answer) {
          lockAnswer();
          $('book-answer-feedback').textContent = '这道题已完成，可以继续读故事或收好阅读小灯。';
        }
        answerButtons.forEach((btn) => {
          btn.onclick = () => {
            // Read persisted state so re-rendering, refreshing or reopening cannot score twice.
            const progress = L.reading(b.id);
            if (progress.answer || progress.interactions?.understood) {
              bookAnswers.answer = true;
              lockAnswer();
              $('book-answer-feedback').textContent = '这道题已完成，可以继续读故事或收好阅读小灯。';
              return;
            }
            const ok = btn.dataset.bookAnswer === b.answer;
            if (!ok) {
              L.reading(b.id, { interactions: { understoodHelped: true } });
              L.record('question:book:' + b.id, 'wrong');
              $('book-answer-feedback').textContent = '再看看前面的故事，试一试。';
              return;
            }
            const helped = progress.interactions?.understoodHelped === true;
            L.record('question:book:' + b.id, 'selected', { hinted: helped });
            L.reading(b.id, {
              answer: true,
              interactions: { understood: true, understoodHelped: helped },
            });
            const w = D.words.find((w) => w.text === b.answer);
            if (w) BearGrowth.transfer(w.id, !helped, 'book-' + b.id);
            bookAnswers.answer = true;
            storePage();
            lockAnswer();
            $('book-answer-feedback').textContent = helped
              ? '找到啦，下次再巩固一下！'
              : '答对啦！谢谢你认真听故事。';
          };
        });
      }
      function turnPage(direction) {
        if (direction < 0 && page === 0) return;
        if (direction > 0) {
          if (page === book.pages.length - 1) return;
          if (readerMode() === 'follow' && !bookAnswers[page]) {
            $('book-status').textContent = '先听完这一页，再向左滑动翻页。';
            return;
          }
        }
        page += direction;
        renderPage();
        if (readerMode() !== 'independent') playPage();
      }
      function attachSwipe() {
        const reader = root.querySelector('.story-page');
        let gesture = null;
        reader.style.touchAction = 'pan-y';
        reader.addEventListener('pointerdown', (e) => {
          if (
            !e.isPrimary ||
            e.pointerType === 'mouse' ||
            e.target.closest('button,a,input,select,audio,.select-control')
          )
            return;
          gesture = { id: e.pointerId, x: e.clientX, y: e.clientY, time: performance.now() };
        });
        reader.addEventListener('pointerup', (e) => {
          if (!gesture || gesture.id !== e.pointerId) return;
          const start = gesture;
          gesture = null;
          const dx = e.clientX - start.x,
            dy = e.clientY - start.y;
          if (
            performance.now() - start.time > 1000 ||
            Math.abs(dx) < 60 ||
            Math.abs(dx) < Math.abs(dy) * 1.5
          )
            return;
          turnPage(dx < 0 ? 1 : -1);
        });
        reader.addEventListener('pointercancel', () => (gesture = null));
        reader.addEventListener('lostpointercapture', () => (gesture = null));
      }
      window.addEventListener('bear:audio', (e) => {
        if (isActive() && book && !root.hidden) {
          const match = e.detail.file === pageFile();
          storyHeard = match;
          root.querySelector('.story-sentence')?.classList.toggle('reading', match);
        }
      });
      window.addEventListener('bear:audio-stopped', () => {
        cancelReaderAdvance();
        storyHeard = false;
        root.querySelector('.story-sentence')?.classList.remove('reading');
      });
      window.addEventListener('bear:audio-ended', (e) => {
        if (!isActive() || !book || root.hidden || e.detail.file !== pageFile()) return;
        bookAnswers[page] = true;
        storePage();
        storyHeard = false;
        $('book-next').disabled = false;
        $('book-status').textContent = '这一页听完啦，翻页看看吧。';
        root.querySelector('.story-sentence')?.classList.remove('reading');
        if (readerContinuous && readerMode() === 'listen' && page < book.pages.length - 1) {
          if (BearGrowth.pauseForReading(book, page)) {
            stopContinuous();
            $('book-status').textContent = '故事停一停，找一找这一页的词；也可以稍后再玩。';
            return;
          }
          cancelReaderAdvance();
          const id = book.id,
            finishedPage = page;
          $('book-status').textContent = '这一句听完啦，稍停一下，继续故事…';
          readerAdvanceTimer = setTimeout(() => {
            readerAdvanceTimer = null;
            if (
              isActive() &&
              book?.id === id &&
              page === finishedPage &&
              !root.hidden &&
              readerContinuous &&
              readerMode() === 'listen'
            )
              turnPage(1);
          }, STORY_PAUSE_MS);
        }
      });
      return {
        open: openBook,
        openBooks,
        render: renderBooks,
        pause,
        checkpoint: () => ({ bookLevel }),
      };
    },
  };
})();
