/* Shared recorded-audio queue. Scene evidence is owned by the caller callbacks. */
(() => {
  'use strict';
  window.BearAudioPlayer = {
    create({ toast, diagnose, onPlaying = () => {}, onEnded = () => {}, onFailure = () => {} }) {
      const $ = (id) => document.getElementById(id),
        scenes = LITTLE_BEAR_SCENES,
        route = LITTLE_BEAR_ROUTE.map((id) => scenes[id]);
      let soundEnabled = true,
        speechTimer,
        speechVersion = 0,
        lessonAudio = null,
        audioFromDialog = false;
      const AUDIO_CLIPS = new Map([
        ['Find the milk.', 'find-milk'],
        ['Milk, please.', 'milk-please'],
        ['An apple or bread?', 'apple-or-bread'],
        ['An apple, please.', 'apple-please'],
        ['Bread, please.', 'bread-please'],
        ['Milk. Find the milk.', 'milk-hint'],
        ['Yes! Milk! Thank you.', 'milk-thanks'],
        ['Yes! Milk!', 'yes-milk'],
        ['Here you are!', 'here-you-are'],
        ['Thank you, my friend!', 'thank-you-friend'],
        ['Milk or water? Milk, please. Here you are!', 'parent-demo'],
        ['Milk.', 'milk'],
        ['Good morning!', 'good-morning'],
      ]);
      route.forEach((scene) =>
        scene.audio.forEach(([text, file]) => {
          if (!AUDIO_CLIPS.has(text)) AUDIO_CLIPS.set(text, file);
        }),
      );
      [...window.BEAR_FOUNDATION_AUDIO, ...window.BEAR_PHONEME_EXAMPLES].forEach(([text, file]) => {
        if (!AUDIO_CLIPS.has(text)) AUDIO_CLIPS.set(text, file);
      });
      AUDIO_CLIPS.set('Great job!', 'great-job');
      ['One.', 'Two.', 'Three.', 'Four.', 'Five.'].forEach((text, index) =>
        AUDIO_CLIPS.set(text, `number-${index + 1}`),
      );
      const slowPhrases = new Set(
        route.flatMap((scene) => [scene.speech.en, ...scene.dialogue.map((t) => t.answer)]),
      );

      function stopAudio() {
        speechVersion++;
        clearTimeout(speechTimer);
        if (lessonAudio) {
          lessonAudio.onplaying = null;
          lessonAudio.onended = null;
          lessonAudio.onerror = null;
          lessonAudio.onratechange = null;
          lessonAudio.ondurationchange = null;
          lessonAudio.pause();
          lessonAudio.removeAttribute('src');
          lessonAudio.load();
          lessonAudio.remove();
          lessonAudio = null;
        }
        audioFromDialog = false;
        window.dispatchEvent(new CustomEvent('bear:audio-stopped'));
        $('listen-button').classList.remove('playing');
        $('listen-button').setAttribute('aria-busy', 'false');
        setAudioStatus('');
      }

      function setAudioStatus(message, error = false) {
        const globalStatus = $('playback-status');
        if (globalStatus) {
          globalStatus.textContent = message;
          globalStatus.hidden = !message;
          globalStatus.classList.toggle('error', error);
        }
        $('audio-status').textContent = message;
        $('audio-status').hidden = !message;
        $('audio-status').classList.toggle('error', error);
        const dialogStatus = $('dialog-audio-status');
        if (dialogStatus) {
          dialogStatus.textContent = message;
          dialogStatus.hidden = !message;
        }
      }

      function speak(
        text,
        slow = false,
        fileOverride = null,
        following = [],
        voiceOverride = undefined,
        recordLearning = true,
      ) {
        if (!soundEnabled) {
          const message = '声音已关闭，请先打开声音或跳过本题。';
          toast(message);
          window.dispatchEvent(new CustomEvent('bear:audio-failed', { detail: { message } }));
          return;
        }
        stopAudio();
        const clip = fileOverride || AUDIO_CLIPS.get(text) || window.BEAR_EXTRA_AUDIO?.[text];
        if (!clip) {
          const message = '这句示范音频尚未准备好，请继续其他任务。';
          setAudioStatus(message, true);
          window.dispatchEvent(new CustomEvent('bear:audio-failed', { detail: { message } }));
          return;
        }
        const version = speechVersion;
        // Reuse the element unlocked by the user's click for every item in a sequence.
        // Creating a new Audio after English ends may lose autoplay permission in WebKit.
        const queue = [{ file: clip, label: text }, ...following];
        let index = 0;
        let clipStarted = false;
        const audio = new Audio();
        lessonAudio = audio;
        audioFromDialog = $('info-dialog').open;
        audio.id = 'lesson-audio';
        audio.hidden = true;
        audio.preload = 'auto';
        audio.preservesPitch = true;
        document.body.append(audio);
        const fail = (message) => {
          if (speechVersion !== version) return;
          onFailure();
          stopAudio();
          setAudioStatus(message, true);
          toast(message);
          window.dispatchEvent(new CustomEvent('bear:audio-failed', { detail: { message } }));
          diagnose('audio_error', { code: message });
        };
        const status = () =>
          fileOverride
            ? `正在播放发音：${queue[index].label}`
            : slow
              ? '正在播放慢速美音示范'
              : '正在播放标准美音示范';
        function armPlaybackTimeout() {
          // Settings can change from another tab while this sentence is playing.
          // Keep the separate loading timeout until the current clip actually starts.
          if (speechVersion !== version || !clipStarted || audio.ended) return;
          clearTimeout(speechTimer);
          const remaining = Number.isFinite(audio.duration)
            ? Math.max(0, audio.duration - audio.currentTime)
            : 0;
          speechTimer = setTimeout(
            () => fail('音频播放中断了，请点小喇叭重试。'),
            Math.max(20000, (remaining / audio.playbackRate) * 1000 + 5000),
          );
        }
        audio.onratechange = armPlaybackTimeout;
        audio.ondurationchange = armPlaybackTimeout;
        audio.onplaying = () => {
          if (speechVersion !== version) return;
          clipStarted = true;
          clearTimeout(speechTimer);
          diagnose('audio_playing', { source: queue[index].file });
          if (recordLearning) window.BearLearning?.heard(queue[index].file);
          window.dispatchEvent(
            new CustomEvent('bear:audio', {
              detail: { file: queue[index].file, label: queue[index].label },
            }),
          );
          onPlaying(queue[index].label);
          $('listen-button').classList.add('playing');
          setAudioStatus(status());
          armPlaybackTimeout();
        };
        function playCurrent() {
          if (speechVersion !== version) return;
          window.dispatchEvent(
            new CustomEvent('bear:audio-loading', { detail: { file: queue[index].file } }),
          );
          clipStarted = false;
          clearTimeout(speechTimer);
          const item = queue[index];
          const file = /\.(mp3|wav)$/.test(item.file)
            ? item.file
            : `${item.file}${slow && slowPhrases.has(item.label) ? '-slow' : ''}.wav`;
          let resolved;
          try {
            resolved = window.BearVoices.resolve(file, voiceOverride);
          } catch (error) {
            fail(error.message);
            return;
          }
          audio.dataset.baseRate = String(resolved.baseRate);
          audio.dataset.voice = resolved.voice;
          audio.src = `audio/${resolved.file}`;
          window.BearPlayback?.apply(audio);
          setAudioStatus(`正在准备发音：${item.label}…`);
          $('listen-button').setAttribute('aria-busy', 'true');
          speechTimer = setTimeout(() => fail('音频未能开始播放，请点小喇叭重试。'), 6000);
          try {
            const playing = audio.play();
            if (playing)
              playing.catch((error) => {
                if (speechVersion !== version) return;
                fail(
                  error.name === 'NotAllowedError'
                    ? '浏览器暂未允许播放声音，请再点一下小喇叭。'
                    : '示范音频播放失败，请点小喇叭重试。',
                );
              });
          } catch {
            fail('示范音频播放失败，请点小喇叭重试。');
          }
        }
        audio.onended = () => {
          if (speechVersion !== version) return;
          diagnose('audio_ended', { source: queue[index].file, seconds: audio.currentTime });
          onEnded(queue[index].label);
          if (++index < queue.length) playCurrent();
          else {
            const file = queue[index - 1].file;
            stopAudio();
            window.dispatchEvent(new CustomEvent('bear:audio-ended', { detail: { file } }));
          }
        };
        audio.onerror = () => fail('示范音频播放失败，请点小喇叭重试。');
        playCurrent();
      }

      return {
        play: speak,
        stop: stopAudio,
        closeDialog() {
          if (audioFromDialog) stopAudio();
        },
        toggleSound() {
          soundEnabled = !soundEnabled;
          $('sound-toggle').setAttribute('aria-pressed', String(soundEnabled));
          $('sound-toggle').setAttribute('aria-label', soundEnabled ? '关闭声音' : '打开声音');
          if (!soundEnabled) stopAudio();
          toast(soundEnabled ? '声音已打开。' : '声音已关闭，仍可看提示继续体验。');
        },
        filesForScene(id) {
          const files = new Set([
            'great-job.wav',
            ...['one', 'two', 'three', 'four', 'five'].map((_, i) => `number-${i + 1}.wav`),
          ]);
          function visit(value) {
            if (typeof value === 'string' && AUDIO_CLIPS.has(value)) {
              const stem = AUDIO_CLIPS.get(value);
              files.add(stem + '.wav');
              if (slowPhrases.has(value)) files.add(stem + '-slow.wav');
            } else if (Array.isArray(value)) value.forEach(visit);
            else if (value && typeof value === 'object') Object.values(value).forEach(visit);
          }
          visit(scenes[id]);
          window.BearGrowth?.sceneFiles(id).forEach((f) => files.add(f));
          return [...files];
        },
      };
    },
  };
})();
