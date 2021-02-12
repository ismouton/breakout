const timedDo = (fn, millis) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let returnValue;
      try {
        returnValue = fn();
      } catch (e) {
        reject(e);
      }

      resolve(returnValue);
    }, millis);
  });
};

export default class Audio {
  constructor() {
    let audioCtx = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new audioCtx();
  }

  async playSilence(millis) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), millis);
    });
  }

  async playRing({ frequencies = [440, 480], millis = 2000, gain: gainValue = 0.03} = {}) {
    return new Promise((resolve) => {
      const gain = this.audioCtx.createGain();
      gain.gain.value = gainValue;
      const oscillators = [];

      for (let i = 0; i < frequencies.length; i++) {
        const frequency = frequencies[i];
        const oscillator = this.audioCtx.createOscillator();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        oscillator.connect(gain);

        oscillators.push(oscillator);
      }

      gain.connect(this.audioCtx.destination);
      
      oscillators.forEach(o => o.start());

      setTimeout(() => {
        resolve();
        oscillators.forEach(o => o.stop());
      }, millis);
    });
  }

  async playScript(script) {
    const oscillator = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 100;
    gain.gain.value = 0.03;
    oscillator.connect(gain);

    gain.connect(this.audioCtx.destination);
    oscillator.start();

    let totalTime = 0;

    for (let i = 0; i < script.length; i++) {
      const [frequency, millis] = script[i];

      oscillator.frequency.setValueAtTime(
        frequency,
        this.audioCtx.currentTime + totalTime * 0.001,
      );

      totalTime += millis;
    }

    setTimeout(() => oscillator.stop(), totalTime);
  }

  async playPause() {
    const oscillator = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    oscillator.type = "square";
    oscillator.frequency.value = 100;
    gain.gain.value = 0.03;
    oscillator.connect(gain);

    gain.connect(this.audioCtx.destination);
    oscillator.start();

    for (let i = 0; i < 4; i++) {
      oscillator.detune.setValueAtTime(
        i %2 === 0 ? 300 : -200,
        this.audioCtx.currentTime + i * 125 * 0.001
      );
    }

    setTimeout(() => oscillator.stop(), 500);
  }

  playBuzz(hz, millis, { oscillationMillis = 10, buzzOffsetCents = 500 }) {
    return new Promise((resolve) => {
      const oscillator = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      oscillator.type = "square";
      oscillator.frequency.value = hz;
      gain.gain.value = 0.03;
      oscillator.connect(gain);

      gain.connect(this.audioCtx.destination);
      oscillator.start();

      const cycles = Math.ceil(millis / oscillationMillis);
      for (let i = 0; i < cycles; i++) {
        oscillator.detune.setValueAtTime(
          i %2 === 0 ? buzzOffsetCents : -buzzOffsetCents,
          this.audioCtx.currentTime + i * oscillationMillis * 0.001
        );
      }

      setTimeout(() => {
        resolve();
        oscillator.stop();
      }, millis);
    });
  }

  async playTrill(millis = 50) {
    this.playScript([
      [250, millis],
      [500, millis],
      [1000, millis],
      [2000, millis],
      [4000, millis],
      [8000, millis],
    ]);
  }
}
