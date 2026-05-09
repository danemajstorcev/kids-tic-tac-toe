let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function playTone(
  frequency: number,
  startTime: number,
  duration: number,
  gainPeak: number,
  type: OscillatorType = 'sine',
  ac: AudioContext
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainPeak, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

export function playPlaceMark() {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    playTone(880, now, 0.08, 0.12, 'sine', ac);
    playTone(1100, now + 0.04, 0.07, 0.08, 'sine', ac);
  } catch (_) {}
}

export function playWin() {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    // Triumphant ascending fanfare: C5 E5 G5 C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      playTone(freq, now + i * 0.13, 0.25, 0.22, 'triangle', ac);
    });
    // Add a sparkle layer on top
    playTone(1568, now + 0.42, 0.35, 0.1, 'sine', ac);
  } catch (_) {}
}

export function playDraw() {
  try {
    const ac = getCtx();
    const now = ac.currentTime;
    // Descending "wah wah" — classic sad trombone feel
    const notes = [523.25, 466.16, 440, 391.99];
    notes.forEach((freq, i) => {
      playTone(freq, now + i * 0.17, 0.28, 0.18, 'sawtooth', ac);
    });
  } catch (_) {}
}
