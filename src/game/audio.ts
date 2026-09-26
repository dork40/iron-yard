export type SoundName = "click" | "signal" | "shot" | "negative" | "bottle" | "win" | "loss" | "frontier-shot" | "modern-shot" | "pistol-shot" | "reload" | "impact";

let muted = false;
let context: AudioContext | undefined;
export function loadMuted() { try { muted = localStorage.getItem("high-noon-muted") === "true"; } catch { /* Storage is optional. */ } return muted; }
export function isMuted() { return muted; }
export function toggleMuted() { muted = !muted; try { localStorage.setItem("high-noon-muted", String(muted)); } catch { /* Storage is optional. */ } return muted; }

export function playSound(name: SoundName) {
  if (muted || typeof AudioContext === "undefined") return;
  try {
    context ??= new AudioContext(); if (context.state === "suspended") void context.resume().catch(() => undefined);
    const now = context.currentTime;
    const tones: Record<SoundName, [number, number, number, OscillatorType]> = { click: [340,.035,.03,"triangle"], signal: [760,.11,.08,"triangle"], shot: [105,.09,.14,"sawtooth"], negative: [150,.15,.11,"triangle"], bottle: [980,.12,.08,"triangle"], win: [520,.22,.1,"triangle"], loss: [190,.22,.1,"triangle"], "frontier-shot": [82,.12,.17,"sawtooth"], "modern-shot": [138,.075,.12,"square"], "pistol-shot": [190,.07,.1,"square"], reload: [520,.055,.045,"triangle"], impact: [760,.045,.06,"square"] };
    const [frequency, duration, gain, type] = tones[name]; const oscillator = context.createOscillator(); const volume = context.createGain();
    oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, now); oscillator.frequency.exponentialRampToValueAtTime(Math.max(35, frequency * (name.includes("shot") ? .35 : .62)), now + duration);
    volume.gain.setValueAtTime(gain, now); volume.gain.exponentialRampToValueAtTime(.001, now + duration); oscillator.connect(volume).connect(context.destination); oscillator.start(now); oscillator.stop(now + duration);
  } catch { /* Audio is an enhancement and must never interrupt play. */ }
}
