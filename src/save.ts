import type { CaseProgress, PlayerSettings, SaveFile } from "./types";

const KEY = "lastseen.save.v1";

function defaultSettings(): PlayerSettings {
  return {
    reducedIntensity: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ambientAudio: false,
    transcriptsOpen: true,
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

export function resetAllProgress(): void {
  const save = loadSave();
  save.cases = {};
  persist();
}
