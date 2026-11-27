class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTone(freq, type = 'sine', duration = 0.12, gainVal = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playClick() { this.playTone(520, 'triangle', 0.07, 0.06); }
  playStep() { this.playTone(390, 'sine', 0.09, 0.05); }
  playSuccess() {
    this.playTone(523.25, 'triangle', 0.14, 0.08);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.14, 0.08), 100);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.25, 0.09), 200);
  }
  playError() {
    this.playTone(180, 'sawtooth', 0.22, 0.09);
    setTimeout(() => this.playTone(135, 'sawtooth', 0.28, 0.09), 150);
  }
}

export const soundEngine = new SoundEngine();
