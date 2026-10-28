(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const lessonChildId = window.BearProfiles.current().id,
    STORE_KEY = window.BearProfiles.storageKey('little-bear-breakfast-v1');
  const scenes = window.LITTLE_BEAR_SCENES;
  const route = window.LITTLE_BEAR_ROUTE.map((id) => scenes[id]);
  const stationNumber = (scene) =>
    String(
      route.filter((item) => item.categoryId === scene.categoryId).indexOf(scene) + 1,
    ).padStart(2, '0');
  const nextScene = () => route[(route.indexOf(game) + 1) % route.length];
  let mode = 'game';
  let challengeLevel = 1,
    answerHinted = true;
  let taskSceneId = route[0].id;
  let game = route[0];
  let foods = game.options;
  const freshState = () => ({
    step: 0,
    completed: [],
    speech: null,
    food: null,
    choice: null,
    attempts: 0,
    heardPrompt: false,
    finalProgress: 0,
    sorted: [],
    selectedToy: null,
    quantity: 0,
    dialogueIndex: 0,
    dialogueModes: [],
    replyHistory: [],
    branchStarted: false,
  });
  const sessions = new Map();
  let state = freshState();
  sessions.set(game.id, state);
  const kitchenArt = document.querySelector('#scene .scene-illustration > .kitchen').outerHTML;
  document.body.insertAdjacentHTML('afterbegin', window.LITTLE_BEAR_SYMBOLS);
  const promptsFor = (scene) => [
    scene.listen,
    { ...scene.speech, subtitle: '先听米米示范，再用自己的声音试试看' },
    { ...scene.final, subtitle: scene.final.zh },
  ];
  let prompts = promptsFor(game);
  let microphoneConsent = false;
  let microphone;
  let toastTimer;
  let records = [];
  let storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    if (Array.isArray(saved))
      records = saved
        .filter(
          (item) =>
            item &&
            Number.isFinite(Date.parse(item.time)) &&
            ['recognized', 'practiced', 'recorded'].includes(item.speech) &&
            Object.hasOwn(scenes, item.sceneId || 'breakfast'),
        )
        .slice(-30);
  } catch {
    storageAvailable = false;
  }

  function toast(message) {
    $('toast').textContent = message;
    $('toast').classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4200);
  }

  const player = BearAudioPlayer.create({
    toast,
    diagnose: (...args) => diagnose(...args),
    onFailure() {
      if (state.step === 0 && !state.completed.includes(0)) state.heardPrompt = false;
    },
    onPlaying(label) {
      if ((state.step === 1 || isDialogueActive()) && label === speechTarget().en)
        answerHinted = true;
    },
    onEnded(label) {
      if (state.step === 0 && label === game.listen.en) state.heardPrompt = true;
    },
  });
  const speak = player.play,
    stopAudio = player.stop;

  function setBubble(en, zh) {
    $('bubble-english').textContent = en;
    $('bubble-chinese').textContent = zh;
  }

  function feedback(message, hint = false) {
    $('feedback').textContent = message;
    $('feedback').classList.toggle('hint', hint);
  }

  function updateProgress() {
    const count = state.completed.length;
    $('progress-count').innerHTML = `${count}<span>/3</span>`;
    $('progress-ring').style.setProperty('--progress', `${count * 120}deg`);
    $('progress-heading').textContent =
      count === 3
        ? '这一站的小冒险完成啦！'
        : count === 0
          ? '准备好出发了吗？'
          : '你的小星星又多了一颗！';
    $('progress-description').textContent =
      count === 3
        ? '谢谢你，今天的冒险小伙伴'
        : `本关已完成 ${count} / 3 项任务，还差 ${3 - count} 项`;
    document.querySelectorAll('[data-step]').forEach((element) => {
      const index = Number(element.dataset.step);
      const done = state.completed.includes(index);
      element.classList.toggle('active', index === state.step && !done);
      element.classList.toggle('done', done);
      element.querySelector('span').textContent = done ? '✓' : String(index + 1);
      if (index === state.step) element.setAttribute('aria-current', 'step');
      else element.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-mission]').forEach((element) => {
      const index = Number(element.dataset.mission);
      const done = state.completed.includes(index);
      element.classList.toggle('current', index === state.step && !done);
      element.classList.toggle('done', done);
      element.querySelector('.mission-state').textContent = done
        ? '已完成 ✓'
        : index === state.step
          ? '进行中'
          : '待探索';
      if (index === 2 && (game.final.kind === 'dialogue' || state.branchStarted)) {
        element.querySelector('strong').textContent =
          `来回聊三轮 · 已完成 ${state.dialogueIndex}/3 轮`;
        element.querySelector('p').textContent = '说出选择、回应对方，再礼貌结束';
        if (state.dialogueIndex === 3 && !done)
          element.querySelector('.mission-state').textContent = '三轮已完成';
      }
    });
  }

  function currentPrompt() {
    if (state.step === 2 && game.final.kind === 'sequence') {
      const next =
        game.final.sequence[Math.min(state.finalProgress, game.final.sequence.length - 1)];
      return { ...prompts[2], en: next.en, zh: next.zh, subtitle: next.zh };
    }
    return prompts[state.step];
  }

  function foodCard(food) {
    const button = document.createElement('button');
    button.className = 'food-option';
    button.dataset.food = food.id;
    button.setAttribute('aria-label', `${food.en}，${food.zh}`);
    button.innerHTML = `<span class="selection-mark"><svg><use href="#icon-check"/></svg></span><svg viewBox="0 0 100 100" aria-hidden="true">${food.art}</svg><strong>${food.en}</strong><small>${food.zh}</small>`;
    button.addEventListener('click', () => selectFood(food, button));
    return button;
  }

  function finalReady() {
    if (state.branchStarted) return state.dialogueIndex === 3;
    if (game.final.kind === 'choice') return Boolean(state.choice);
    if (game.final.kind === 'hotspot') return state.choice === game.final.answer;
    if (game.final.kind === 'sequence') return state.finalProgress === game.final.sequence.length;
    if (game.final.kind === 'counter') return state.quantity === game.final.target;
    if (game.final.kind === 'dialogue') return state.dialogueIndex === game.dialogue.length;
    return state.sorted.length === game.final.objects.length;
  }

  function updateVisuals() {
    if (game.id === 'breakfast') {
      $('served-milk').setAttribute(
        'visibility',
        state.completed.includes(0) ? 'visible' : 'hidden',
      );
      $('served-food').setAttribute('visibility', state.choice ? 'visible' : 'hidden');
      $('served-food-use').setAttribute('href', `#food-${state.choice || 'apple'}`);
    } else if (game.final.kind === 'sequence') {
      game.final.sequence.forEach((task, index) =>
        $(task.visual).setAttribute(
          'visibility',
          index < state.finalProgress ? 'visible' : 'hidden',
        ),
      );
    } else if (game.final.kind === 'counter') {
      document
        .querySelectorAll('[data-count-item]')
        .forEach((element) =>
          element.setAttribute(
            'visibility',
            Number(element.dataset.countItem) <= state.quantity ? 'visible' : 'hidden',
          ),
        );
    } else if (game.id === 'park')
      $('treasure').setAttribute('visibility', state.choice === 'tree' ? 'visible' : 'hidden');
    else if (game.id === 'toys')
      ['ball', 'car'].forEach((id) =>
        $(`sorted-${id}`).setAttribute(
          'visibility',
          state.sorted.includes(id) ? 'visible' : 'hidden',
        ),
      );
  }

  function refreshFinalControls() {
    $('continue-button').hidden = !state.completed.includes(2) && !finalReady();
    $('continue-button').innerHTML =
      `${state.completed.includes(2) ? '查看这一站的小收获' : !state.branchStarted && game.final.kind !== 'dialogue' && window.BearGrowth?.branches[game.id] ? '完成动手任务，接着聊三轮' : game.final.action} <svg><use href="#icon-arrow"/></svg>`;
    updateVisuals();
  }

  function renderSorter() {
    const area = $('sorter-area');
    area.replaceChildren();
    const objects = document.createElement('div');
    objects.className = 'sorter-objects';
    game.final.objects.forEach((id) => {
      const food = game.options.find((option) => option.id === id);
      const button = foodCard(food);
      button.draggable = !state.sorted.includes(id);
      button.disabled = state.sorted.includes(id) || state.completed.includes(2);
      button.classList.toggle('selected', state.selectedToy === id || state.sorted.includes(id));
      button.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.effectAllowed = 'move';
      });
      objects.append(button);
    });
    const bins = document.createElement('div');
    bins.className = 'sorter-bins';
    game.final.bins.forEach((bin) => {
      const button = document.createElement('button');
      button.className = `sorter-bin bin-${bin.id}`;
      button.dataset.bin = bin.id;
      button.disabled = state.completed.includes(2) || state.sorted.includes(bin.object);
      button.innerHTML = `<span aria-hidden="true">${state.sorted.includes(bin.object) ? '✓' : '🧺'}</span><strong>${bin.en}</strong><small>${bin.zh}</small>`;
      button.onclick = () => sortToy(bin, state.selectedToy);
      button.ondragover = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      };
      button.ondrop = (event) => {
        event.preventDefault();
        sortToy(bin, event.dataTransfer.getData('text/plain'));
      };
      bins.append(button);
    });
    area.append(objects, bins);
  }

  function sortToy(bin, id) {
    if (game.final.kind !== 'sorter' || state.step !== 2 || state.completed.includes(2)) return;
    if (!id || !game.final.objects.includes(id)) {
      feedback('先点一个玩具，再点同颜色的收纳箱，也可以拖放玩具。', true);
      return;
    }
    if (state.sorted.includes(id)) return;
    if (id !== bin.object) {
      feedback('颜色还没有对上，再看看红色和蓝色的收纳箱。', true);
      return;
    }
    state.sorted.push(id);
    state.selectedToy = null;
    renderSorter();
    feedback(
      state.sorted.length === 2
        ? '玩具都回到自己的小家啦！'
        : '一个玩具回家啦！再帮另一个玩具找找家。',
    );
    if (finalReady()) setBubble('Great job!', '玩具都回到自己的小家啦！');
    refreshFinalControls();
  }

  function renderCounter() {
    const area = $('counter-area');
    const done = state.completed.includes(2);
    area.innerHTML = `<div class="counter-target">小目标：${game.final.target} ${game.final.unit}</div><div class="counter-slots" aria-hidden="true">${Array.from({ length: game.final.max }, (_, index) => `<span class="counter-slot${index < state.quantity ? ' filled' : ''}"><svg viewBox="0 0 100 100"><use href="#scene-${game.final.object}"/></svg></span>`).join('')}</div><div class="counter-controls"><button id="counter-minus" aria-label="减少一${game.final.unit}" ${done || state.quantity === 0 ? 'disabled' : ''}>−</button><span id="counter-value" role="status" aria-live="polite">${state.quantity}<small>${game.final.unit}</small></span><button id="counter-plus" aria-label="增加一${game.final.unit}" ${done || state.quantity === game.final.max ? 'disabled' : ''}>＋</button></div><p>可以加，也可以减，慢慢数一数。</p>`;
    const change = (delta) => {
      if (state.completed.includes(2)) return;
      state.quantity = Math.max(0, Math.min(game.final.max, state.quantity + delta));
      renderCounter();
      refreshFinalControls();
      feedback(
        finalReady()
          ? '数量刚刚好！可以收好这一站的星星啦。'
          : state.quantity > game.final.target
            ? '多了一点，点减号拿走一些，再数数看。'
            : `已经有 ${state.quantity} ${game.final.unit}，再试着凑到 ${game.final.target} ${game.final.unit}。`,
        !finalReady(),
      );
      setBubble(
        finalReady() ? 'Great job!' : game.final.en,
        finalReady() ? '数量刚刚好，你的小手很能干！' : game.final.zh,
      );
      if (state.quantity) speak(['One.', 'Two.', 'Three.', 'Four.', 'Five.'][state.quantity - 1]);
      else stopAudio();
      // Keep keyboard focus on the control after re-rendering the quantity.
      const control = $(delta > 0 ? 'counter-plus' : 'counter-minus');
      if (!control.disabled) control.focus({ preventScroll: true });
    };
    $('counter-minus').onclick = () => change(-1);
    $('counter-plus').onclick = () => change(1);
  }

  function renderHotspots() {
    $('scene-hotspots').replaceChildren();
    $('scene-hotspots').hidden = state.step !== 2 || game.final.kind !== 'hotspot';
    if (game.final.kind !== 'hotspot') return;
    for (const spot of game.final.spots) {
      const button = document.createElement('button');
      button.className = `scene-hotspot${state.choice === spot.id ? ' found' : ''}`;
      button.dataset.spot = spot.id;
      button.style.left = `${spot.left}%`;
      button.style.top = `${spot.top}%`;
      button.textContent = `${state.choice === spot.id ? '✓' : '⌕'} ${spot.label}`;
      button.disabled = finalReady() || state.completed.includes(2);
      button.onclick = () => {
        if (spot.id !== game.final.answer) {
          feedback('这里没有宝箱哦。线索是 under the tree，找找树下面。', true);
          speak(game.final.en);
          return;
        }
        state.choice = spot.id;
        setBubble('Great job!', '找到了！树下面真的藏着宝箱。');
        feedback('宝藏找到了！点下方按钮打开宝箱，收好这一站的星星。');
        speak('Great job!');
        renderHotspots();
        refreshFinalControls();
      };
      $('scene-hotspots').append(button);
    }
  }

  function renderStep(moveFocus = false, autoplay = true) {
    stopRecognition();
    stopAudio();
    feedback('');
    answerHinted = challengeLevel === 1;
    $('lesson-workspace').dataset.revealed = 'false';
    $('lesson-workspace').dataset.challenge = String(challengeLevel);
    $('lesson-workspace').dataset.lessonStep = String(state.step);
    $('dialogue-area').hidden = !isDialogueActive();
    document.querySelector('.stepper').hidden = mode === 'simulation';
    if (isDialogueActive()) {
      renderDialogue(autoplay);
      return;
    }
    const prompt = currentPrompt();
    $('prompt-title').textContent = prompt.title;
    $('prompt-subtitle').textContent = prompt.subtitle;
    $('prompt-counter').textContent = `0${state.step + 1} / 03`;
    $('continue-button').hidden = !state.completed.includes(state.step);
    $('continue-button').innerHTML = '继续小冒险 <svg><use href="#icon-arrow"/></svg>';
    $('food-grid').hidden =
      state.step === 1 ||
      (state.step === 2 && ['hotspot', 'sorter', 'counter'].includes(game.final.kind));
    $('sorter-area').hidden = state.step !== 2 || game.final.kind !== 'sorter';
    $('counter-area').hidden = state.step !== 2 || game.final.kind !== 'counter';
    $('speaking-area').hidden = state.step !== 1;
    $('food-grid').classList.toggle('two-items', state.step === 2 && game.final.kind === 'choice');
    if (
      state.step === 0 &&
      (!Array.isArray(state.listenOrder) ||
        state.listenOrder.length !== foods.length ||
        new Set(state.listenOrder).size !== foods.length ||
        state.listenOrder.some((id) => !foods.some((food) => food.id === id)))
    ) {
      const ids = foods.map((food) => food.id);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      state.listenOrder = ids;
    }
    const options =
      state.step === 2
        ? (game.finalOptions || foods).filter((food) => game.final.options?.includes(food.id))
        : state.step === 0
          ? state.listenOrder.map((id) => foods.find((food) => food.id === id)).filter(Boolean)
          : foods;
    $('food-grid').replaceChildren(...options.map(foodCard));
    if (state.step === 0 && state.completed.includes(0)) {
      $('food-grid')
        .querySelectorAll('button')
        .forEach((button) => {
          button.disabled = true;
          button.classList.toggle('selected', button.dataset.food === game.listen.target);
        });
    }
    if (state.step === 2 && game.final.kind === 'choice' && state.choice) {
      $('food-grid')
        .querySelectorAll('button')
        .forEach((button) => {
          button.classList.toggle('selected', button.dataset.food === state.choice);
          button.disabled = state.completed.includes(2);
        });
    }
    if (state.step === 2 && game.final.kind === 'sequence') {
      const finished = game.final.sequence.slice(0, state.finalProgress).map((task) => task.id);
      $('food-grid')
        .querySelectorAll('button')
        .forEach((button) => {
          button.classList.toggle('selected', finished.includes(button.dataset.food));
          button.disabled = finished.includes(button.dataset.food) || state.completed.includes(2);
        });
    }
    $('record-button').disabled = !microphone.available;
    if (!microphone.available)
      $('record-button').querySelector('span').textContent = '当前窗口不支持麦克风';
    $('practice-button').disabled = false;
    $('practice-button').hidden = state.completed.includes(1);
    $('record-button').hidden = state.completed.includes(1);
    document.querySelector('.phrase-card > strong').textContent = game.speech.en;
    document.querySelector('.phrase-card > p').textContent = game.speech.zh;
    let variants = document.getElementById('scene-replies');
    if (variants) variants.remove();
    const accepted = window.BearGrowth?.replies(game.speech.en) || [];
    if (accepted.length > 1) {
      variants = document.createElement('details');
      variants.id = 'scene-replies';
      const summary = document.createElement('summary');
      summary.textContent = '还可以这样说，点一句听示范';
      variants.append(summary);
      accepted.slice(1).forEach((text) => {
        const p = document.createElement('button');
        p.className = 'text-button';
        p.textContent = '♫ ' + text;
        p.onclick = () => speak(text);
        variants.append(p);
      });
      variants.addEventListener('toggle', () => {
        if (variants.open) answerHinted = true;
      });
      document.querySelector('.phrase-card').append(variants);
    }
    setBubble(prompt.en, prompt.zh);
    if (state.step === 2) {
      if (game.final.kind === 'sorter') renderSorter();
      if (game.final.kind === 'counter') renderCounter();
      refreshFinalControls();
      if (finalReady()) {
        setBubble('Great job!', '动手任务完成啦，接下来试着聊三轮吧！');
        $('prompt-subtitle').textContent = '动手任务完成啦，接着完成三轮交流，再收好星星。';
      }
    }
    renderHotspots();
    updateVisuals();
    updateProgress();
    if (autoplay && !(state.step === 1 && challengeLevel > 1)) speak(prompt.en);
    if (moveFocus) {
      const target =
        state.step === 2 && game.final.kind === 'hotspot' ? $('scene') : $('interaction-area');
      target.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'nearest',
      });
      (state.step === 2 && game.final.kind === 'hotspot'
        ? document.querySelector('[data-spot]')
        : $('listen-button')
      )?.focus({ preventScroll: true });
    }
  }

  function completeStep() {
    if (!state.completed.includes(state.step)) state.completed.push(state.step);
    updateProgress();
    renderSceneButtons();
    $('continue-button').hidden = false;
  }

  function selectFood(food, button) {
    if (state.completed.includes(state.step)) return;
    if (state.step === 0) {
      if (food.id !== game.listen.target) {
        state.attempts++;
        if (state.heardPrompt) window.BearLearning?.record(`scene:${game.id}`, 'wrong');
        button.classList.remove('wiggle');
        void button.offsetWidth;
        button.classList.add('wiggle');
        feedback(`这是${food.zh}。${game.listen.hint}`, true);
        speak(game.listen.en);
        return;
      }
      window.BearLearning?.record(`scene:${game.id}`, 'selected', {
        hinted: state.attempts > 0 || !state.heardPrompt,
      });
      button.classList.add('selected');
      setBubble(game.listen.success, game.listen.successZh);
      feedback(
        state.heardPrompt
          ? '找对了！下一步，和米米一起试着开口说。'
          : '图画找对啦！示范没有听完，本次按看图练习记录，不判断听力。',
      );
      speak(game.listen.success);
      completeStep();
      updateVisuals();
    } else if (state.step === 2 && game.final.kind === 'choice') {
      state.choice = food.id;
      state.food = food.id;
      $('food-grid')
        .querySelectorAll('button')
        .forEach((option) => option.classList.toggle('selected', option === button));
      const phrase = game.final.phrases[food.id];
      setBubble(phrase, `请给我${food.zh}。`);
      speak(phrase);
      feedback(`选好${food.zh}啦！可以跟米米说一句 “${phrase}”`);
      refreshFinalControls();
    } else if (state.step === 2 && game.final.kind === 'sequence') {
      const task = game.final.sequence[state.finalProgress];
      if (!task) return;
      if (food.id !== task.id) {
        feedback(`再看看当前提示：${task.zh}`, true);
        speak(task.en);
        return;
      }
      state.finalProgress++;
      button.classList.add('selected');
      button.disabled = true;
      updateVisuals();
      if (finalReady()) {
        setBubble('Great job!', '两条指令都完成啦，谢谢你的小小帮助！');
        feedback('任务完成！点下方按钮，收好这一站的星星。');
        speak('Great job!');
      } else {
        const next = currentPrompt();
        $('prompt-subtitle').textContent = next.zh;
        setBubble(next.en, next.zh);
        feedback(`完成第 ${state.finalProgress} 步，再来试试下一条指令。`);
        speak(next.en);
      }
      refreshFinalControls();
    } else if (
      state.step === 2 &&
      game.final.kind === 'sorter' &&
      !state.sorted.includes(food.id)
    ) {
      state.selectedToy = food.id;
      renderSorter();
      feedback(`选中了${food.zh}，再点对应颜色的收纳箱。`);
    }
  }

  function isDialogueActive() {
    return (
      mode === 'simulation' ||
      (state.step === 2 && (game.final.kind === 'dialogue' || state.branchStarted))
    );
  }

  function speechTarget() {
    const turn = isDialogueActive()
      ? (window.BearGrowth?.dialogue(game, state) || game.dialogue)[state.dialogueIndex]
      : null;
    return turn
      ? {
          en: state.selectedReply || turn.answer,
          zh: window.BearGrowth?.replyMeaning(game, state) || turn.zh,
          words: (state.selectedReply || turn.answer).toLowerCase().match(/[a-z]+/g),
        }
      : game.speech;
  }

  function renderDialogue(autoplay = true) {
    if (mode === 'game' && state.branchStarted)
      document.querySelector('[data-step="2"]').innerHTML = '<span>3</span>来回聊三轮';
    document.getElementById('scene-replies')?.remove();
    answerHinted = challengeLevel === 1;
    $('lesson-workspace').dataset.revealed = 'false';
    $('lesson-workspace').dataset.lessonStep = 'dialogue';
    $('scene-hotspots').hidden = true;
    $('scene-hotspots').replaceChildren();
    const turn = (window.BearGrowth?.dialogue(game, state) || game.dialogue)[state.dialogueIndex];
    state.selectedReply = null;
    const done = !turn;
    $('food-grid').hidden = $('sorter-area').hidden = $('counter-area').hidden = true;
    $('dialogue-area').hidden = false;
    $('speaking-area').hidden = done;
    $('prompt-title').textContent = done
      ? mode === 'simulation'
        ? '本站三轮交流完成啦！'
        : '本关三轮交流完成啦！'
      : mode === 'simulation'
        ? '听对方说，再用英语回应'
        : '来回聊三轮，把英语用起来';
    $('prompt-subtitle').textContent = done ? '三轮交流都完成啦！' : `任务：${turn.zh}`;
    const position =
      mode === 'simulation' ? window.BearHub?.dialogueProgress(state.dialogueIndex) : '';
    $('prompt-counter').textContent =
      `${position ? position + ' · ' : ''}${done ? '已完成 3/3 轮' : `第 ${state.dialogueIndex + 1}/3 轮`}`;
    const area = $('dialogue-area');
    area.replaceChildren();
    const npc = document.createElement('div');
    npc.className = 'dialogue-partner';
    npc.innerHTML = `<span aria-hidden="true">${game.emoji}</span><div><small>对方说</small><strong></strong><p></p></div><button class="listen-button" aria-label="听对方说话"><svg><use href="#icon-sound"/></svg></button>`;
    npc.querySelector('strong').textContent = done ? 'Great job!' : turn.npc;
    npc.querySelector('p').textContent = done ? '谢谢你愿意和我聊一聊！' : turn.npcZh;
    npc.querySelector('button').onclick = () => speak(done ? 'Great job!' : turn.npc);
    area.append(npc);
    if (window.BearRoleplay) {
      const swap = document.createElement('button');
      swap.className = 'text-button';
      swap.id = 'scene-role-swap';
      swap.textContent = '⇄ 角色互换：换 UU 先说';
      swap.onclick = () => BearRoleplay.open(game.id);
      area.append(swap);
    }
    if (turn) {
      const choices = document.createElement('div');
      choices.className = 'dialogue-choices';
      const accepted = turn.accepted || window.BearGrowth?.replies(turn.answer) || [turn.answer];
      // Branches are choices of intent, not a quiz with potentially valid 'wrong' replies.
      const answers = [...new Set(accepted)];
      if ((route.indexOf(game) + state.dialogueIndex) % 2) answers.reverse();
      answers.forEach((answer) => {
        const button = document.createElement('button');
        button.className = 'dialogue-choice';
        button.textContent = answer;
        button.dataset.reply = answer;
        button.onclick = () => {
          if (!accepted.includes(answer)) {
            answerHinted = true;
            window.BearLearning?.record(window.BearGrowth.dialogueKey(game, state), 'wrong');
            feedback(`这句话可以在别的情境里用。当前任务是：${turn.zh}`, true);
            return;
          }
          choices
            .querySelectorAll('button')
            .forEach((b) => b.classList.toggle('selected', b === button));
          state.selectedReply = answer;
          answerHinted = true;
          feedback('选好回应啦！听听这句示范，再试着自己说。');
          speak(answer);
          document.querySelector('.phrase-card > strong').textContent = answer;
          document.querySelector('.phrase-card > p').textContent =
            window.BearGrowth?.replyMeaning(game, state) || turn.zh;
        };
        choices.append(button);
      });
      if (state.replyHistory?.length) {
        const previous = document.createElement('p');
        previous.className = 'previous-reply';
        previous.textContent = 'UU 上一轮回应：' + state.replyHistory.at(-1);
        area.append(previous);
      }
      const learner = document.createElement('p');
      learner.className = 'learner-label';
      learner.textContent = 'UU · 我来说';
      area.append(learner, choices);
      document.querySelector('.phrase-card > strong').textContent = turn.answer;
      document.querySelector('.phrase-card > p').textContent = turn.zh;
      $('practice-button').textContent = '我跟着说过了，继续对话 →';
      $('record-button').hidden = $('practice-button').hidden = false;
      $('record-button').disabled = !microphone.available;
      $('continue-button').hidden = true;
      setBubble(turn.npc, turn.npcZh);
    } else {
      const outcome = window.BearGrowth?.outcome(game, state);
      setBubble(
        'Great job!',
        outcome ? '任务完成：' + outcome + '！' : '三轮交流都完成啦，谢谢你的回应！',
      );
      $('continue-button').hidden = false;
      $('continue-button').textContent =
        mode === 'simulation' ? '本站完成，前往下一站 →' : '本关完成，查看小收获';
    }
    if (mode === 'simulation') {
      $('progress-count').textContent = `${state.dialogueIndex}/3`;
      $('progress-ring').style.setProperty('--progress', `${state.dialogueIndex * 120}deg`);
      $('progress-heading').textContent = '和不同地方的朋友聊一聊';
      $('progress-description').textContent = `本场景已交流 ${state.dialogueIndex} / 3 轮`;
      document.querySelectorAll('[data-mission]').forEach((element, index) => {
        element.querySelector('strong').textContent = `第 ${index + 1} 轮回应`;
        element.querySelector('p').textContent = (window.BearGrowth?.dialogue(game, state) ||
          game.dialogue)[index].zh;
        element.querySelector('.mission-state').textContent =
          index < state.dialogueIndex
            ? '已完成 ✓'
            : index === state.dialogueIndex
              ? '进行中'
              : '待交流';
        element.classList.toggle('done', index < state.dialogueIndex);
      });
    } else updateProgress();
    if (autoplay && turn) speak(turn.npc);
  }

  function finishDialogueTurn(result) {
    if (!(window.BearGrowth?.dialogue(game, state) || game.dialogue)[state.dialogueIndex]) return;
    stopRecognition();
    stopAudio();
    window.BearChallenge?.speechFeedback(game.id, result, answerHinted, { countActivity: false });
    window.BearLearning?.record(
      window.BearGrowth.dialogueKey(game, state),
      result === 'recognized'
        ? answerHinted
          ? 'recognized'
          : 'independent'
        : result === 'recorded'
          ? 'recorded'
          : 'practiced',
      { hinted: answerHinted },
    );
    state.replyHistory ||= [];
    state.replyHistory.push(
      state.selectedReply ||
        (window.BearGrowth?.dialogue(game, state) || game.dialogue)[state.dialogueIndex].answer,
    );
    state.dialogueModes.push(result);
    state.dialogueIndex++;
    state.selectedReply = null;
    renderDialogue();
    const progress =
      state.dialogueIndex === 3
        ? '三轮全部完成！'
        : `第 ${state.dialogueIndex} 轮完成，接下来第 ${state.dialogueIndex + 1} 轮。`;
    feedback(
      progress +
        (result === 'recognized'
          ? '识别到了本轮目标词；不代表发音评分。'
          : result === 'recorded'
            ? '已完成本轮录音练习。'
            : '本轮按自行跟读记录，未验证实际语音。'),
    );
    if (state.dialogueIndex === 3) {
      window.BearLearning?.exchange(taskSceneId);
      window.BearGrowth?.boundary?.();
    }
    if (mode === 'simulation' && state.dialogueIndex === 3)
      window.BearHub?.simulationCompleted(game.id, state.dialogueModes);
  }

  function renderSceneButtons() {
    const makeButton = (scene, sidebar = false) => {
      const button = document.createElement('button');
      button.className = sidebar
        ? 'park-preview scene-preview'
        : `scene-choice${scene.id === game.id ? ' active' : ''}`;
      button.dataset.sceneButton = scene.id;
      button.setAttribute('aria-pressed', String(scene.id === game.id));
      const count = sessions.get(scene.id)?.completed.length || 0;
      button.innerHTML = `<span class="scene-choice-icon" aria-hidden="true">${scene.emoji}</span><span><strong><span class="station-index">${stationNumber(scene)}</span>${scene.title}</strong><small>${sidebar ? scene.theme : `本次 ${count}/3 星 · 约 ${scene.minutes} 分钟`}</small></span><span class="scene-choice-arrow" aria-hidden="true">${count === 3 ? '✓' : '↗'}</span>`;
      button.onclick = () => switchScene(scene.id);
      return button;
    };
    const switcher = $('scene-switcher');
    const categoryRoute = route.filter((scene) => scene.categoryId === game.categoryId);
    switcher.replaceChildren(...categoryRoute.map((scene) => makeButton(scene)));
    $('next-scenes').replaceChildren(makeButton(nextScene(), true));
    const completed = categoryRoute.filter(
      (scene) => sessions.get(scene.id)?.completed.length === 3,
    ).length;
    $('lesson-category-heading').textContent = `${game.categoryTitle} · 五个交流小游戏`;
    $('route-position').textContent = `本类第 ${categoryRoute.indexOf(game) + 1} / 5 关`;
    $('route-completed').textContent = `本类已完成 ${completed} / 5 关`;
    $('route-track-fill').style.width = `${(completed / 5) * 100}%`;
    $('route-track').setAttribute('aria-valuenow', String(completed));
    $('route-track').setAttribute('aria-valuemax', '5');
    $('route-track').setAttribute('aria-valuetext', `本类已完成 ${completed} 关，共 5 关`);
    $('next-station-label').textContent =
      route.indexOf(game) === route.length - 1 ? '回到起点' : '按路线前进';
    const active = switcher.querySelector('[aria-pressed="true"]');
    if (switcher.scrollWidth > switcher.clientWidth)
      switcher.scrollTo({
        left: Math.max(0, active.offsetLeft - (switcher.clientWidth - active.offsetWidth) / 2),
        behavior: 'instant',
      });
  }

  function switchScene(id, moveFocus = true, autoplay = true, originId = id) {
    if (!Object.hasOwn(scenes, id)) return;
    taskSceneId = originId;
    stopAudio();
    stopRecognition();
    if ($('info-dialog').open) $('info-dialog').close();
    $('speech-effect')?.remove();
    game = scenes[id];
    window.BearLearningTools?.mark('scene:' + id);
    foods = game.options;
    prompts = promptsFor(game);
    if (mode === 'simulation') {
      state = freshState();
      state.step = 2;
    } else {
      if (!sessions.has(id)) sessions.set(id, freshState());
      state = sessions.get(id);
    }
    document.querySelector('#scene .scene-illustration > .kitchen').outerHTML = game.illustration || kitchenArt;
    $('scene').dataset.scene = id;
    $('lesson-title').textContent = `${game.title} ${game.emoji}`;
    document.querySelector('.lesson-heading > p').textContent = game.subtitle;
    document.querySelector('.greeting-copy').textContent = game.greeting;
    document.querySelector('.lesson-meta > span:last-child').textContent =
      `第 ${stationNumber(game)} 站 · ${game.station}`;
    document.querySelector('.time-label').textContent = `◷ 约 ${game.minutes} 分钟`;
    document.querySelector('.scene-label').textContent = game.sceneLabel;
    document.querySelector('.date-tag').textContent = `STOP ${stationNumber(game)}`;
    document.querySelectorAll('[data-step]').forEach((element, index) => {
      element.innerHTML = `<span>${index + 1}</span>${['听音找一找', '开口说一说', game.id === 'breakfast' ? '早餐我来选' : game.final.kind === 'dialogue' ? '来回聊一聊' : '动手玩一玩'][index]}`;
    });
    document.querySelectorAll('[data-mission]').forEach((element, index) => {
      element.querySelector('.mission-icon').textContent = game.missions[index][0];
      element.querySelector('strong').textContent = game.missions[index][1];
      element.querySelector('p').textContent = game.missions[index][2];
    });
    document.querySelector('.parent-tip h3').textContent = game.parent.title;
    document.querySelector('.parent-tip p').textContent = game.parent.tip;
    document.title = `UU说英语 · ${game.title}`;
    renderSceneButtons();
    let favorite = $('scene-favorite');
    if (!favorite) {
      favorite = document.createElement('span');
      favorite.id = 'scene-favorite';
      document.querySelector('.lesson-heading').append(favorite);
    }
    favorite.innerHTML = window.BearLearningTools?.favoriteButton('scene:' + id) || '';
    window.BearLearningTools?.bindFavorites(favorite);
    document.querySelector('.next-adventure').hidden = mode === 'simulation';
    $('practice-button').textContent = '我跟着读过了，继续练习 →';
    renderStep(moveFocus, autoplay);
    document.querySelector('#scene-content-feedback')?.remove();
    const feedbackAnchor = document.createElement('div');
    feedbackAnchor.id = 'scene-content-feedback';
    $('lesson-workspace').append(feedbackAnchor);
    window.BearGrowth?.feedbackButton(feedbackAnchor, 'scene:' + game.id);
    window.BearHub?.lessonChanged(id, mode);
    window.BearChallenge?.mount(id, mode, challengeLevel);
  }

  const diagnose = (event, detail = {}) => {
    // Browser diagnostics stay local; the internal collector is never a public API.
    window.dispatchEvent(new CustomEvent('bear:diagnostic', {
      detail: { build: '1.0.1', event, ...detail },
    }));
  };
  microphone = new MicrophonePractice({
    onState(status, message) {
      const labels = {
        idle: '点一下，开口说',
        requesting: '正在请求麦克风权限…',
        starting: '正在启动麦克风…',
        listening: '正在录音 · 点一下结束',
        processing: '正在整理录音…',
        ready: '录音完成 · 再录一次',
        error: '重新请求麦克风',
      };
      $('record-button').dataset.state = status;
      $('record-button').querySelector('span').textContent = labels[status];
      $('record-button').disabled =
        ['requesting', 'starting', 'processing'].includes(status) || !microphone?.available;
      $('record-button').classList.toggle('recording', status === 'listening');
      $('mic-status').textContent =
        status === 'listening' && challengeLevel > 1 && !answerHinted
          ? '正在录音，请根据情境尝试回应；说完再点一下结束。'
          : message;
      $('mic-status').hidden = !message;
      $('mic-status').classList.toggle('error', status === 'error');
      if (status === 'idle') {
        $('recording-preview').pause();
        $('recording-preview').removeAttribute('src');
        $('recording-preview').load();
        $('recording-preview').hidden = true;
        $('use-recording-button').hidden = true;
      }
      diagnose('microphone', { state: status });
    },
    onRecognized: (reply) => {
      if (isDialogueActive() && reply) state.selectedReply = reply;
      finishSpeaking('recognized');
    },
    onRecording(url) {
      $('recording-preview').src = url;
      $('recording-preview').hidden = false;
      $('use-recording-button').hidden = false;
    },
    onServiceUnavailable(message) {
      $('mic-status').textContent =
        microphone.state === 'listening' && challengeLevel > 1 && !answerHinted
          ? '正在录音，请根据情境尝试回应；说完再点一下结束。'
          : message;
      $('mic-status').hidden = false;
      diagnose('recognition_unavailable');
    },
  });
  $('recognition-help').textContent = microphone.available
    ? '先请求麦克风权限，再开始录音。录音仅在本页临时保留，可回听；浏览器识别服务可用时检查目标词，可能联网处理声音。'
    : '当前窗口不支持录音。可以听示范后跟读继续，不会记录为已识别表达。';

  function stopRecognition() {
    microphone.cancel();
  }

  function finishSpeaking(mode) {
    if (isDialogueActive()) {
      finishDialogueTurn(mode);
      return;
    }
    if (state.step !== 1 || state.completed.includes(1)) return;
    stopRecognition();
    state.speech = mode;
    window.BearChallenge?.speechFeedback(game.id, mode, answerHinted);
    $('record-button').hidden = true;
    $('practice-button').hidden = true;
    setBubble(game.speech.response, game.speech.responseZh);
    feedback(
      mode === 'recognized'
        ? `识别到了 “${game.speech.en}” 中的目标词！这是表达练习，不是发音评分。`
        : mode === 'recorded'
          ? '录音练习完成啦！这次保存的是练习摘要，未验证英语表达。'
          : '跟读练习完成啦！这次没有验证语音，愿意尝试就值得鼓励。',
    );
    speak(game.speech.response);
    completeStep();
  }

  function startRecognition() {
    stopAudio();
    feedback('');
    const target = speechTarget();
    microphone.start({
      phrase: state.selectedReply || target.en,
      words: target.words,
      phrases: isDialogueActive()
        ? (window.BearGrowth?.dialogue(game, state) || game.dialogue)[state.dialogueIndex]?.accepted
        : window.BearGrowth?.replies(target.en),
    });
  }

  function openDialog(content) {
    window.BearFoundation?.pause();
    stopAudio();
    stopRecognition();
    $('dialog-content').innerHTML =
      `${content}<p id="dialog-audio-status" class="audio-status" role="status" hidden></p>`;
    if (!$('info-dialog').open) $('info-dialog').showModal();
  }

  function reportContent(record) {
    const scene = scenes[record.sceneId || 'breakfast'];
    const target = scene.options.find((option) => option.id === scene.listen.target);
    const recognized = record.speech === 'recognized';
    return `<ul class="report-list"><li><strong>${scene.emoji} ${scene.title}</strong><span>本次记录对应这一站的任务。</span></li><li><strong>🎧 听音选物 · ${target.zh}</strong><span>${record.heardPrompt ? '播放了英文提示，并选中目标物品。' : '选中了目标物品；未记录到英文提示成功播放。'}${record.attempts ? ' 选择过程中使用过提示。' : ''}不据此判定听力掌握。</span></li><li><strong>💬 开口练习 · ${scene.speech.en}</strong><span>${recognized ? '浏览器识别到了本课目标词；未评估发音质量或独立表达能力。' : record.speech === 'recorded' ? '完成了麦克风录音练习；未验证英语表达或发音质量。' : '通过“我跟着读过了”完成练习；未验证实际语音。'}</span></li><li><strong>✦ 动手小任务</strong><span>${scene.final.report}</span></li></ul>`;
  }

  function makeRecord() {
    return {
      time: new Date().toISOString(),
      sceneId: game.id,
      speech: state.speech,
      dialogueModes: state.dialogueModes,
      choice: state.choice,
      food: state.food,
      attempts: state.attempts,
      heardPrompt: state.heardPrompt,
    };
  }

  function finishAdventure() {
    if (state.completed.includes(2) || !finalReady()) return;
    if (
      game.final.kind !== 'dialogue' &&
      !state.branchStarted &&
      window.BearGrowth?.branches[game.id]
    ) {
      state.branchStarted = true;
      state.dialogueIndex = 0;
      state.replyHistory = [];
      state.dialogueModes = [];
      renderDialogue();
      return;
    }
    completeStep();
    const record = makeRecord();
    records.push(record);
    records = records.slice(-30);
    try {
      if (window.BearProfiles.has(lessonChildId))
        localStorage.setItem(STORE_KEY, JSON.stringify(records));
    } catch {
      storageAvailable = false;
    }
    setBubble(game.thanks.en, game.thanks.zh);
    $('continue-button').innerHTML = '查看这一站的小收获 <svg><use href="#icon-arrow"/></svg>';
    window.BearLearning?.sceneComplete(taskSceneId);
    showCompletion(record);
  }

  function showCompletion(record) {
    const next = nextScene();
    const last = route.indexOf(game) === route.length - 1;
    const completed = route.filter(
      (scene) => sessions.get(scene.id)?.completed.length === 3,
    ).length;
    const transition = last
      ? completed === route.length
        ? `所有场景关卡全部完成，收集到 ${route.length * 3} 颗任务星星！回到起点，还能再玩一次。`
        : `已到路线终点，本次完成 ${completed} / ${route.length} 站。可以回到起点，继续探索其他场景。`
      : `下一站，${next.categoryTitle}第 ${stationNumber(next)} 关 · ${next.catalogTitle}。${next.greeting}`;
    openDialog(
      `<span class="dialog-emoji">${game.emoji}</span><h2 id="dialog-title">本关完成！</h2><p class="dialog-intro">谢谢你和米米一起完成小冒险。<br>今天的每一次尝试，都值得一颗小星星。</p><div class="dialog-stars" aria-label="获得三颗任务星星">${Array(3).fill('<svg aria-hidden="true"><use href="#icon-star"/></svg>').join('')}</div><button class="dialog-action" id="finish-close">结束本次练习</button><p class="route-transition">${transition}</p><button class="secondary-action next-scene-action" id="next-scene-action">${last ? '再玩起点关卡' : '再玩下一关'}：${next.title} →</button>${reportContent(record)}<div class="dialog-note">🌱 生活里的小任务：${game.parent.tip}</div>${!storageAvailable ? '<p class="offline-note">浏览器未允许保存记录，本次小结只在当前页面保留。</p>' : ''}<button class="secondary-action" id="restart-adventure">再和米米玩一次</button>`,
    );
    $('finish-close').onclick = () => {
      $('info-dialog').close();
      window.BearHub?.show('scenes');
      $('catalog-panel').scrollIntoView({ block: 'start', behavior: 'instant' });
      window.BearGrowth?.boundary?.();
    };
    $('restart-adventure').onclick = resetAdventure;
    $('next-scene-action').onclick = () => switchScene(next.id);
  }

  function resetAdventure() {
    $('info-dialog').close();
    state = freshState();
    sessions.set(game.id, state);
    renderSceneButtons();
    renderStep(true);
    toast('新的小冒险开始啦！');
  }

  function showParents() {
    openDialog(
      `<span class="dialog-emoji">🌱</span><h2 id="dialog-title">陪伴，比纠正更重要</h2><p class="dialog-intro">这一站：${game.title}。不需要很好的英语，也能一起玩。</p><ul class="report-list"><li><strong>1. 先听听，再等一等</strong><span>播放 “${game.speech.en}”，留一点安静时间。暂时不想说，可以先指一指。</span></li><li><strong>2. 在生活里再试一次</strong><span>${game.parent.tip}</span></li><li><strong>3. 先回应，再自然示范</strong><span>鼓励孩子表达意思，不必反复要求重读，也不把任务星星当作能力评分。</span></li></ul><button class="dialog-action" id="parent-demo">听一遍亲子示范 ♫</button><div class="dialog-note" style="margin-top:18px">示范使用固定 Samantha 美式英语合成音频，慢速句单独生成。录音只在当前页面内存中临时保留，不上传到本地服务；浏览器识别服务可能联网处理声音。本机只保存最近 30 次完成摘要。</div><div class="parent-settings"><span>当前孩子的场景记录 · ${records.length} 次</span><button id="clear-records">清除记录</button></div>`,
    );
    $('parent-demo').onclick = () => speak(game.parent.demo);
    $('clear-records').onclick = () => {
      openDialog(
        '<span class="dialog-emoji">🌿</span><h2 id="dialog-title">清除本机记录？</h2><p class="dialog-intro">将清除当前孩子的基础跟读记录与场景完成摘要。其他孩子的记录和当前任务会保留。</p><button class="dialog-action" id="confirm-clear">确认清除</button><button class="secondary-action" id="cancel-clear">返回家长空间</button>',
      );
      $('confirm-clear').onclick = () => {
        records = [];
        window.BearFoundation?.clear();
        try {
          localStorage.removeItem(STORE_KEY);
        } catch {
          /* Records are already cleared in memory. */
        }
        showParents();
        toast('本机学习记录已清除。');
      };
      $('cancel-clear').onclick = showParents;
    };
  }

  function showGrowth() {
    const latest = records[records.length - 1];
    const overview = `<div class="growth-scenes">${route.map((scene) => `<div><span>${scene.emoji} ${scene.station}</span><strong>${records.filter((record) => (record.sceneId || 'breakfast') === scene.id).length} 次</strong></div>`).join('')}</div>`;
    openDialog(
      `<span class="dialog-emoji">🌿</span><h2 id="dialog-title">一点一点，看见成长</h2><p class="dialog-intro">${latest ? `本机已完成 ${records.length} 次小冒险（最多保留 30 次）。<br>最近一次：${new Date(latest.time).toLocaleString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` : '还没有完成记录。<br>选择一个场景，和米米一起留下第一次小收获。'}</p>${overview}${latest ? reportContent(latest) : '<div class="dialog-note">星星记录任务完成；完成任务不等于已经掌握。</div>'}<button class="dialog-action" id="growth-close">继续我的小冒险</button>`,
    );
    $('growth-close').onclick = () => $('info-dialog').close();
  }

  $('listen-button').onclick = () => {
    if (isDialogueActive()) {
      speak(
        (window.BearGrowth?.dialogue(game, state) || game.dialogue)[state.dialogueIndex]?.npc ||
          'Great job!',
      );
      return;
    }
    speak(
      state.step === 2 && game.final.kind === 'choice' && state.choice
        ? game.final.phrases[state.choice]
        : currentPrompt().en,
    );
  };
  $('bubble-speak').onclick = () => {
    speak($('bubble-english').textContent);
  };
  $('slow-speak').onclick = () => speak(speechTarget().en, true);
  $('record-button').onclick = () => {
    if (!microphone.available) return;
    if (microphone.state === 'listening') {
      microphone.finish();
      return;
    }
    if (microphoneConsent) {
      startRecognition();
      return;
    }
    openDialog(
      '<span class="dialog-emoji">🎙️</span><h2 id="dialog-title">请家长帮忙确认</h2><p class="dialog-intro">点击同意后还需要允许系统或浏览器使用麦克风。录音仅在本页临时保留，可回听；浏览器识别服务可能联网处理声音。也可选择仅跟读，不开启麦克风。</p><button class="dialog-action" id="allow-speech">同意并请求麦克风</button><button class="secondary-action" id="skip-speech">先跟读，不开启麦克风</button>',
    );
    $('allow-speech').onclick = () => {
      microphoneConsent = true;
      $('info-dialog').close();
      startRecognition();
    };
    $('skip-speech').onclick = () => {
      $('info-dialog').close();
      speak(speechTarget().en, true);
    };
  };
  $('use-recording-button').onclick = () => finishSpeaking('recorded');
  $('practice-button').onclick = () => finishSpeaking('practiced');
  $('continue-button').onclick = () => {
    if (mode === 'simulation') {
      if (state.dialogueIndex === 3) window.BearHub?.nextSimulation();
      return;
    }
    if (state.step === 2) {
      if (state.completed.includes(2)) {
        const record = makeRecord();
        showCompletion(record);
      } else finishAdventure();
    } else if (state.completed.includes(state.step)) {
      state.step++;
      renderStep(true);
    }
  };
  $('sound-toggle').onclick = player.toggleSound;
  $('parent-button').onclick = showParents;
  $('parent-tip-button').onclick = showParents;
  $('help-button').onclick = () => {
    if (isDialogueActive() && !window.BearGrowth.dialogueKey(game, state)) return;
    answerHinted = true;
    $('lesson-workspace').dataset.revealed = 'true';
    window.BearLearning?.record(`scene:${game.id}`, 'hinted', { countActivity: !isDialogueActive() });
    if (isDialogueActive()) {
      window.BearLearning?.record(window.BearGrowth.dialogueKey(game, state), 'hinted');
      const target = speechTarget();
      feedback(`试着回应：${target.zh}`);
      speak(target.en);
      return;
    }
    if (state.step === 0) {
      feedback(`小提示：${game.listen.hint}`, true);
      state.attempts++;
      speak(game.listen.en);
    } else if (state.step === 1) {
      feedback(`可以慢慢试着说 “${game.speech.en}”。也可以跟读后继续。`, true);
      speak(game.speech.en, true);
    } else {
      feedback(currentPrompt().zh, true);
      speak(currentPrompt().en);
    }
  };
  document.querySelectorAll('[data-nav]').forEach((button) => {
    button.onclick = () => {
      if (button.dataset.nav === 'growth') {
        showGrowth();
        return;
      }
      if (button.dataset.nav === 'today') {
        if ($('lesson-workspace').hidden) {
          window.BearHub?.show('scenes');
          toast('选一个场景，开始今天的五个小任务吧。');
          return;
        }
        document
          .querySelector('.journey-card')
          .scrollIntoView({
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
            block: 'center',
          });
        toast(
          state.completed.length === 3
            ? '这一站的三项任务都完成啦！'
            : `今天还有 ${3 - state.completed.length} 项任务，和米米一起完成吧。`,
        );
      } else
        $('scene-switcher').scrollIntoView({
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
    };
  });
  document.querySelector('.brand').onclick = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  $('close-dialog').onclick = () => $('info-dialog').close();
  $('info-dialog').addEventListener('click', (event) => {
    if (event.target === $('info-dialog')) {
      const r = $('info-dialog').getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        $('info-dialog').close();
    }
  });
  // Closing a dialog queues a close event. It must not cancel audio started
  // immediately after closing (for example, the microphone-free practice path).
  $('info-dialog').addEventListener('close', () => {
    player.closeDialog();
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    stopAudio();
    // Permission sheets may hide the page. Do not cancel a pending permission request.
    if (microphone.state === 'listening') microphone.finish();
  });
  window.addEventListener('pagehide', () => {
    stopAudio();
    stopRecognition();
  });
  diagnose('loaded', {
    capture: microphone.available,
    recognition: Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
  });
  window.BearLesson = {
    checkpoint() {
      return structuredClone({
        id: game.id,
        mode,
        level: challengeLevel,
        originId: taskSceneId,
        state,
      });
    },
    restore(saved) {
      if (!saved || !Object.hasOwn(scenes, saved.id)) return;
      mode = saved.mode === 'simulation' ? 'simulation' : 'game';
      challengeLevel = [1, 2, 3].includes(saved.level) ? saved.level : 1;
      switchScene(
        saved.id,
        false,
        false,
        Object.hasOwn(scenes, saved.originId) ? saved.originId : saved.id,
      );
      const x = saved.state;
      if (
        x &&
        Number.isInteger(x.step) &&
        x.step >= 0 &&
        x.step <= 2 &&
        Number.isInteger(x.dialogueIndex) &&
        x.dialogueIndex >= 0 &&
        x.dialogueIndex <= 3 &&
        ['completed', 'sorted', 'dialogueModes'].every((k) => Array.isArray(x[k]))
      ) {
        state = { ...freshState(), ...structuredClone(x) };
        if (mode === 'game') sessions.set(saved.id, state);
        renderStep(false, false);
        if (mode === 'simulation' && state.dialogueIndex === 3)
          window.BearHub?.simulationCompleted(game.id, state.dialogueModes);
      }
    },
    open(id, simulation = false, level = 1, reset = false) {
      challengeLevel = level;
      mode = simulation ? 'simulation' : 'game';
      if (reset) sessions.delete(id);
      switchScene(id, false);
    },
    changeChallenge(id, level) {
      challengeLevel = level;
      sessions.delete(id);
      switchScene(id, false, true, taskSceneId);
    },
    reveal() {
      if (isDialogueActive() && !window.BearGrowth.dialogueKey(game, state)) return;
      answerHinted = true;
      $('lesson-workspace').dataset.revealed = 'true';
      window.BearLearning?.record(`scene:${game.id}`, 'hinted', { countActivity: !isDialogueActive() });
    },
    pause() {
      stopRecognition();
      stopAudio();
      if ($('info-dialog').open) $('info-dialog').close();
    },
    filesForScene: player.filesForScene,
    play: speak,
    // Review previews can select a voice without changing the child's saved preference or evidence.
    playFile(file, label, voiceId, { recordLearning = true } = {}) {
      speak(label, false, file, [], voiceId, recordLearning);
    },
    playFiles(files) {
      if (files.length) speak(files[0].label, false, files[0].file, files.slice(1));
    },
    requestConsent(callback) {
      openDialog(
        '<span class="dialog-emoji">🎙️</span><h2 id="dialog-title">请家长帮忙确认</h2><p class="dialog-intro">录音仅在本页临时回听，不保存原始声音。点击同意后还需要允许系统使用麦克风，也可以自行跟读。</p><button class="dialog-action" id="allow-speech">同意并请求麦克风</button><button class="secondary-action" id="skip-speech">先不开启麦克风</button>',
      );
      $('allow-speech').onclick = () => {
        $('info-dialog').close();
        callback();
      };
      $('skip-speech').onclick = () => $('info-dialog').close();
    },
  };
  switchScene(route[0].id, false, false);
})();
