import { settings } from "./save";
import { mulberry32, seedFrom } from "./lib/rng";

/**
 * All sound is synthesized with the Web Audio API — no licensed assets.
 * In-fiction, recovered voicemail audio is corrupted, which is why playback
 * is texture (static, drones, breathing) while the transcript carries content.
 */

let ctx: AudioContext | null = null;

function audioCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noiseBuffer(ac: AudioContext, seconds: number, seedKey: string): AudioBuffer {
  const rand = mulberry32(seedFrom(seedKey));
  const buf = ac.createBuffer(1, Math.ceil(ac.sampleRate * seconds), ac.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    // brown-ish noise: integrate white noise for a low, roomy hiss
    const white = rand() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buf;
}

// ---------------------------------------------------------------------------
// Ambient drone (toggled in Settings, default off)
// ---------------------------------------------------------------------------

let ambient: { gain: GainNode; stop: () => void } | null = null;

export function ambientRunning(): boolean {
  return ambient !== null;
}

export function startAmbient(): void {
  if (ambient) return;
  const ac = audioCtx();
  const master = ac.createGain();
  master.gain.value = 0;
  master.connect(ac.destination);

  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac, 8, "ambient-bed");
  src.loop = true;
  const noiseFilter = ac.createBiquadFilter();
  noiseFilter.type = "lowpass";
  noiseFilter.frequency.value = 240;
  const noiseGain = ac.createGain();
  noiseGain.gain.value = 0.5;
  src.connect(noiseFilter).connect(noiseGain).connect(master);
  src.start();

  // Two slowly-detuned sines beat against each other — the "dead air" hum.
  const oscA = ac.createOscillator();
  const oscB = ac.createOscillator();
  oscA.frequency.value = 54;
  oscB.frequency.value = 54.7;
  const oscGain = ac.createGain();
  oscGain.gain.value = 0.05;
  oscA.connect(oscGain);
  oscB.connect(oscGain);
  oscGain.connect(master);
  oscA.start();
  oscB.start();

  master.gain.linearRampToValueAtTime(0.11, ac.currentTime + 4);
  ambient = {
    gain: master,
    stop: () => {
      master.gain.linearRampToValueAtTime(0, ac.currentTime + 1);
      window.setTimeout(() => {
        src.stop();
        oscA.stop();
        oscB.stop();
        master.disconnect();
      }, 1200);
    },
  };
}

export function stopAmbient(): void {
  ambient?.stop();
  ambient = null;
}

export function syncAmbient(): void {
  if (settings().ambientAudio) startAmbient();
  else stopAmbient();
}

// ---------------------------------------------------------------------------
// Voicemail playback (corrupted-audio textures)
// ---------------------------------------------------------------------------

export interface VoicePlayback {
  stop: () => void;
}

/**
 * Strip stage directions, speaker labels, and evidence annotations from a
 * transcript, leaving only the words a caller actually says.
 */
export function speechTextFor(transcript: string): string {
  return transcript
    .split("⚠")[0]
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/^[A-Z][A-Z0-9 .,()'’-]{2,}:/gm, " ")
    .replace(/[“”"]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const SPEECH_STYLE: Record<string, { rate: number; pitch: number }> = {
  plain: { rate: 0.95, pitch: 1.0 },
  distorted: { rate: 0.78, pitch: 0.4 },
  static: { rate: 0.9, pitch: 0.85 },
  breathing: { rate: 0.68, pitch: 0.3 },
};

/**
 * Speak a voicemail's recovered words through the browser's built-in speech
 * engine — free, offline, and unnerving in exactly the right way when pitched
 * down and played under the damaged-tape bed.
 */
export function speakTranscript(
  tone: "plain" | "distorted" | "static" | "breathing",
  text: string,
): VoicePlayback | null {
  if (!("speechSynthesis" in window) || !text) return null;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const style = SPEECH_STYLE[tone];
  utterance.rate = style.rate;
  utterance.pitch = style.pitch;
  utterance.volume = 1;
  synth.speak(utterance);
  return { stop: () => synth.cancel() };
}

export function playVoicemailTone(
  tone: "plain" | "distorted" | "static" | "breathing",
  seedKey: string,
  durationSec: number,
  onEnded: () => void,
  underSpeech = false,
): VoicePlayback {
  const ac = audioCtx();
  const master = ac.createGain();
  master.gain.value = 0.0001;
  master.connect(ac.destination);
  const t0 = ac.currentTime;
  const stops: Array<() => void> = [];

  // shared static bed
  const bed = ac.createBufferSource();
  bed.buffer = noiseBuffer(ac, 6, seedKey);
  bed.loop = true;
  const bedFilter = ac.createBiquadFilter();
  bedFilter.type = "bandpass";
  bedFilter.frequency.value = tone === "static" ? 1400 : 500;
  bedFilter.Q.value = 0.7;
  const bedGain = ac.createGain();
  // when real speech plays on top, the bed ducks so the words stay legible
  bedGain.gain.value = underSpeech ? (tone === "static" ? 0.3 : 0.14) : tone === "static" ? 0.9 : 0.4;
  bed.connect(bedFilter).connect(bedGain).connect(master);
  bed.start();
  stops.push(() => bed.stop());

  if (tone === "breathing") {
    // amplitude-modulated filtered noise ≈ slow breathing on a dead line
    const lfo = ac.createOscillator();
    lfo.frequency.value = 0.22;
    const lfoGain = ac.createGain();
    lfoGain.gain.value = 0.3;
    lfo.connect(lfoGain).connect(bedGain.gain);
    lfo.start();
    stops.push(() => lfo.stop());
  }

  if (!underSpeech && (tone === "distorted" || tone === "plain")) {
    // murmur: a wandering low tone behind the static, like speech underwater
    const osc = ac.createOscillator();
    osc.type = tone === "distorted" ? "sawtooth" : "sine";
    osc.frequency.value = 120;
    const rand = mulberry32(seedFrom(seedKey + ".murmur"));
    for (let t = 0; t < durationSec; t += 0.35) {
      osc.frequency.setValueAtTime(85 + rand() * 110, t0 + t);
    }
    const oscFilter = ac.createBiquadFilter();
    oscFilter.type = "lowpass";
    oscFilter.frequency.value = tone === "distorted" ? 900 : 400;
    const oscGain = ac.createGain();
    oscGain.gain.value = tone === "distorted" ? 0.16 : 0.1;
    // gate the murmur into phrase-like bursts
    for (let t = 0; t < durationSec; t += 1.6) {
      const on = rand() > 0.3;
      oscGain.gain.setValueAtTime(on ? (tone === "distorted" ? 0.16 : 0.1) : 0.015, t0 + t);
    }
    osc.connect(oscFilter).connect(oscGain).connect(master);
    osc.start();
    stops.push(() => osc.stop());
  }

  master.gain.linearRampToValueAtTime(0.9, t0 + 0.15);
  master.gain.setValueAtTime(0.9, t0 + durationSec - 0.3);
  master.gain.linearRampToValueAtTime(0.0001, t0 + durationSec);

  let ended = false;
  const timer = window.setTimeout(() => {
    ended = true;
    cleanup();
    onEnded();
  }, durationSec * 1000);

  function cleanup() {
    for (const stop of stops) {
      try {
        stop();
      } catch {
        /* already stopped */
      }
    }
    master.disconnect();
  }

  return {
    stop: () => {
      if (ended) return;
      window.clearTimeout(timer);
      ended = true;
      cleanup();
    },
  };
}

/** Short UI cue for wrongness beats (hidden-app reveal, live message). */
export function playStinger(): void {
  if (settings().reducedIntensity) return;
  const ac = audioCtx();
  const osc = ac.createOscillator();
  osc.type = "sine";
  const gain = ac.createGain();
  const t0 = ac.currentTime;
  osc.frequency.setValueAtTime(320, t0);
  osc.frequency.exponentialRampToValueAtTime(48, t0 + 0.9);
  gain.gain.setValueAtTime(0.08, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + 1);
}

// ---------------------------------------------------------------------------
// UI sounds — tiny synthesized cues (toggled in Settings, default on)
// ---------------------------------------------------------------------------

function blip(freq: number, dur: number, peak: number, type: OscillatorType = "sine"): void {
  const ac = audioCtx();
  const osc = ac.createOscillator();
  osc.type = type;
  const gain = ac.createGain();
  const t0 = ac.currentTime;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

/** A soft tap for a forward navigation / button press. */
export function playTap(): void {
  if (!settings().uiSounds) return;
  blip(660, 0.05, 0.035, "triangle");
}

/** A lower cue for going back. */
export function playBack(): void {
  if (!settings().uiSounds) return;
  blip(360, 0.06, 0.03, "triangle");
}

/** A gentle confirmation chord (two quick notes) — used on positive actions. */
export function playConfirm(): void {
  if (!settings().uiSounds) return;
  blip(587, 0.08, 0.03, "sine");
  window.setTimeout(() => blip(880, 0.12, 0.03, "sine"), 70);
}

// ---------------------------------------------------------------------------
// Menu soundtrack — a slow, procedural minor pad for the archive / title.
// Deliberately sparse and quiet; the phone itself stays "silent tech".
// ---------------------------------------------------------------------------

let menu: { stop: () => void } | null = null;

export function startMenuMusic(): void {
  if (menu || !settings().music) return;
  const ac = audioCtx();
  const master = ac.createGain();
  master.gain.value = 0;
  master.connect(ac.destination);

  const reverbish = ac.createBiquadFilter();
  reverbish.type = "lowpass";
  reverbish.frequency.value = 900;
  reverbish.connect(master);

  // A slow arpeggio over an A-minor-ish drone: sparse, cold, patient.
  const root = 110; // A2
  const scale = [0, 3, 7, 10, 12, 15]; // minor pentatonic-ish
  const voices: OscillatorNode[] = [];
  const drone = ac.createOscillator();
  drone.type = "sine";
  drone.frequency.value = root;
  const droneGain = ac.createGain();
  droneGain.gain.value = 0.05;
  drone.connect(droneGain).connect(reverbish);
  drone.start();
  voices.push(drone);

  let step = 0;
  let seedR = mulberry32(seedFrom("menu-music"));
  const interval = window.setInterval(() => {
    if (!menu) return;
    // occasionally play a note
    if (seedR() < 0.7) {
      const semis = scale[Math.floor(seedR() * scale.length)] + (seedR() < 0.3 ? 12 : 0);
      const f = root * 2 * Math.pow(2, semis / 12);
      const osc = ac.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = f;
      const g = ac.createGain();
      const t0 = ac.currentTime;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.06, t0 + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.4);
      osc.connect(g).connect(reverbish);
      osc.start(t0);
      osc.stop(t0 + 2.6);
    }
    step++;
  }, 1400);

  master.gain.linearRampToValueAtTime(0.5, ac.currentTime + 3);
  menu = {
    stop: () => {
      window.clearInterval(interval);
      master.gain.linearRampToValueAtTime(0, ac.currentTime + 1.2);
      window.setTimeout(() => {
        for (const v of voices) {
          try {
            v.stop();
          } catch {
            /* already stopped */
          }
        }
        master.disconnect();
      }, 1400);
    },
  };
}

export function stopMenuMusic(): void {
  menu?.stop();
  menu = null;
}

export function syncMenuMusic(): void {
  if (settings().music) startMenuMusic();
  else stopMenuMusic();
}
