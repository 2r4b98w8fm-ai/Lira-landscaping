import type { CaseProgress, PlayerSettings, SaveFile } from "./types";

const KEY = "lastseen.save.v1";

function defaultSettings(): PlayerSettings {
  return {
    reducedIntensity: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ambientAudio: false,
    transcriptsOpen: true,
    uiSounds: true,
    music: true,
    haptics: true,
  };
}

function freshSave(): SaveFile {
  return {
    version: 1,
    playerId: `ls-${Math.random().toString(36).slice(2, 10)}`,
    settings: defaultSettings(),
    cases: {},
  };
}

let cached: SaveFile | null = null;

export function loadSave(): SaveFile {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as SaveFile;
      if (parsed.version === 1) {
        cached = parsed;
        return parsed;
      }
    }
  } catch {
    // corrupt or unavailable storage — start clean
  }
  cached = freshSave();
  persist();
  return cached;
}

export function persist(): void {
  if (!cached) return;
  try {
    localStorage.setItem(KEY, JSON.stringify(cached));
  } catch {
    // storage full/unavailable — play continues, progress just won't survive reload
  }
}

export function caseProgress(caseId: string): CaseProgress {
  const save = loadSave();
  let p = save.cases[caseId];
  if (!p) {
    p = {
      startedAt: Date.now(),
      playSeconds: 0,
      unlocked: false,
      viewed: [],
      unlockedNotes: [],
      deletedFolderFound: false,
      hiddenAppRevealed: false,
      hiddenAppOpened: false,
      deliveredLiveEvents: [],
      completed: false,
      lowBatteryWarned: false,
    };
    save.cases[caseId] = p;
    persist();
  }
  return p;
}

export function settings(): PlayerSettings {
  return loadSave().settings;
}

function dayStamp(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * Record that the game was opened today and return the live streak.
 * Consecutive calendar days build the streak; a gap of more than one day
 * resets it to 1. Called once when the app boots.
 */
export function recordPlayDay(): { count: number; best: number; extended: boolean } {
  const save = loadSave();
  const hour = new Date().getHours();
  if (hour < 5 && !save.playedLate) {
    save.playedLate = true;
    persist();
  }
  const today = dayStamp();
  const s = save.streak ?? { count: 0, best: 0, lastDay: "" };
  let extended = false;
  if (s.lastDay !== today) {
    const yesterday = dayStamp(new Date(Date.now() - 864e5));
    s.count = s.lastDay === yesterday ? s.count + 1 : 1;
    s.lastDay = today;
    s.best = Math.max(s.best, s.count);
    extended = true;
    save.streak = s;
    persist();
  }
  return { count: s.count, best: s.best, extended };
}

export function currentStreak(): { count: number; best: number } {
  const s = loadSave().streak;
  if (!s) return { count: 0, best: 0 };
  // A streak only "counts" as live if the last play day was today or yesterday.
  const today = dayStamp();
  const yesterday = dayStamp(new Date(Date.now() - 864e5));
  const count = s.lastDay === today || s.lastDay === yesterday ? s.count : 0;
  return { count, best: s.best };
}

export function resetAllProgress(): void {
  const save = loadSave();
  save.cases = {};
  persist();
}
