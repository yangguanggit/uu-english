// Records locally even when a browser exposes SpeechRecognition without a working service.
// Raw audio and recognition transcripts never leave this module via diagnostics.
window.MicrophonePractice = class MicrophonePractice {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.generation = 0;
    this.state = 'idle';
    this.available = Boolean(isSecureContext && navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
  }

  transition(state, message = '') {
    this.state = state;
    this.callbacks.onState(state, message);
  }

  stopService() {
    if (!this.service) return;
    this.service.onresult = this.service.onerror = this.service.onend = null;
    try { this.service.abort(); } catch { /* Already stopped. */ }
    this.service = null;
  }

  releaseTracks() {
    this.stream?.getTracks().forEach((track) => { track.onended = null; track.stop(); });
    this.stream = null;
  }

  cancel() {
    this.generation++;
    clearTimeout(this.timer);
    this.stopService();
    if (this.recorder) {
      this.recorder.onstart = this.recorder.onstop = this.recorder.ondataavailable = this.recorder.onerror = null;
      if (this.recorder.state !== 'inactive') this.recorder.stop();
      this.recorder = null;
    }
    this.releaseTracks();
    if (this.recordingURL) URL.revokeObjectURL(this.recordingURL);
    this.recordingURL = null;
    this.transition('idle');
  }

  fail(message) {
    this.cancel();
    this.transition('error', message);
  }

  async start({ phrase = 'Milk, please.', words = ['milk', 'please'], phrases = null, recognize = true } = {}) {
    this.targetPhrase = phrase;
    this.targetWords = words;
    this.acceptedPhrases = phrases;
    this.enableRecognition = recognize;
    this.cancel();
    if (!this.available) {
      this.transition('error', '当前窗口不支持麦克风录音，请在支持录音的浏览器中打开，或选择跟读练习。');
      return;
    }
    const generation = this.generation;
    this.transition('requesting', '正在请求麦克风权限，请留意浏览器或系统的授权提示。');
    this.timer = setTimeout(() => this.fail('麦克风授权尚未完成。请处理系统授权提示，然后点“重新请求麦克风”。'), 15000);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true }, video: false });
      if (generation !== this.generation) { stream.getTracks().forEach((track) => track.stop()); return; }
      clearTimeout(this.timer);
      this.stream = stream;
      const chunks = [];
      const mimeType = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find((type) => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      this.recorder = recorder;
      this.transition('starting', '已获得麦克风权限，正在启动录音…');
      this.timer = setTimeout(() => this.fail('录音未能启动，请重新请求麦克风。'), 5000);
      recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
      recorder.onstart = () => {
        if (generation !== this.generation) return;
        clearTimeout(this.timer);
        this.transition('listening', `正在录音，请说 “${this.targetPhrase}”。说完点按钮结束，最长录制 12 秒。`);
        this.timer = setTimeout(() => this.finish(), 12000);
        if (this.enableRecognition) this.startService(generation);
        else this.callbacks.onServiceUnavailable('本次仅录音回听，不进行字母或单音评分。');
      };
      recorder.onerror = () => { if (generation === this.generation) this.fail('录音设备发生错误，请检查麦克风后重试。'); };
      recorder.onstop = () => {
        if (generation !== this.generation) return;
        clearTimeout(this.timer);
        this.stopService();
        this.releaseTracks();
        const blob = new Blob(chunks, { type: recorder.mimeType });
        this.recorder = null;
        if (!blob.size) { this.fail('没有录到音频，请检查输入设备后重新录制。'); return; }
        this.recordingURL = URL.createObjectURL(blob);
        this.transition('ready', '录音已完成，可以回听。这次尚未验证英语表达，不会记为识别成功。');
        this.callbacks.onRecording(this.recordingURL, blob.size);
      };
      stream.getAudioTracks().forEach((track) => { track.onended = () => { if (generation === this.generation && this.state === 'listening') this.finish(); }; });
      recorder.start(250);
    } catch (error) {
      if (generation !== this.generation) return;
      const messages = {
        NotAllowedError: '当前窗口未获得麦克风权限。请允许当前应用使用麦克风，再点“重新请求麦克风”。',
        NotFoundError: '没有找到麦克风，请连接输入设备后重试。',
        NotReadableError: '无法读取麦克风，设备可能被其他应用占用，请检查后重试。',
        SecurityError: '当前窗口阻止了麦克风访问。请在允许录音的浏览器中打开。'
      };
      this.fail(messages[error.name] || '麦克风启动失败，请检查权限与输入设备后重试。');
    }
  }

  startService(generation) {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) { this.callbacks.onServiceUnavailable('当前浏览器未提供语音识别；录音仍在继续，说完可结束并回听。'); return; }
    try {
      const service = new Recognition();
      this.service = service;
      service.lang = 'en-US';
      service.interimResults = false;
      service.maxAlternatives = 3;
      service.onresult = (event) => {
        if (generation !== this.generation) return;
        const alternatives = Array.from(event.results[0]).map((result) => result.transcript.toLowerCase());
        // Return only an authored canonical reply, never persist a speech transcript.
        const matched=this.acceptedPhrases?.length
          ? alternatives.map(text=>this.acceptedPhrases.find(phrase=>BearGrowth.normalize(phrase)===BearGrowth.normalize(text))).find(Boolean)
          : alternatives.some(text=>this.targetWords.length>0&&this.targetWords.every(word=>text.split(/[^a-z]+/).includes(word)));
        if (matched) this.callbacks.onRecognized(typeof matched==='string'?matched:null);
        else this.callbacks.onServiceUnavailable('本次没有识别到完整目标词；录音仍在继续，可以结束并回听。');
      };
      service.onerror = (event) => {
        if (generation !== this.generation) return;
        this.stopService();
        this.callbacks.onServiceUnavailable(`识别服务暂不可用（${event.error}），录音仍在继续，说完可结束并回听。`);
      };
      service.onend = () => { if (generation === this.generation && this.state === 'listening') this.callbacks.onServiceUnavailable('识别服务已结束，录音仍在继续，说完可结束并回听。'); };
      service.start();
    } catch {
      this.stopService();
      this.callbacks.onServiceUnavailable('识别服务无法启动，录音仍在继续，说完可结束并回听。');
    }
  }

  finish() {
    if (!this.recorder || this.recorder.state === 'inactive' || this.state === 'processing') return;
    clearTimeout(this.timer);
    this.stopService();
    this.transition('processing', '正在整理录音…');
    this.recorder.stop();
    this.timer = setTimeout(() => this.fail('录音未能完成，请重新录制。'), 5000);
  }
};
