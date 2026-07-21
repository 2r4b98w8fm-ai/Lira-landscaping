import type { CaseFile, CaseProgress, SaveFile } from "./types";
import { citableEvidence } from "./validator";
import { loadSave, persist } from "./save";
import { CASE_MANIFEST } from "./cases";

/** The number of real (non-tutorial) cases — drives the "close them all" goals. */
const PLAYABLE_COUNT = CASE_MANIFEST.filter((e) => !e.tutorial).length;

/**
 * The progression layer: XP, ranks, per-case star scoring, and achievements.
 * All client-side, all derived from the save file — the hooks that reward
 * thoroughness and pull a player toward the next case.
 */

export interface Rank {
  name: string;
  /** XP needed to reach this rank. */
  at: number;
}

export const RANKS: Rank[] = [
  { name: "Cadet", at: 0 },
  { name: "Junior Investigator", at: 120 },
  { name: "Investigator", at: 300 },
  { name: "Detective", at: 560 },
  { name: "Senior Detective", at: 900 },
  { name: "Inspector", at: 1320 },
  { name: "Chief Inspector", at: 1850 },
  { name: "Cold Case Specialist", at: 2500 },
];

export interface Achievement {
  id: string;
  emoji: string;
  name: string;
  desc: string;
  /** True once earned; evaluated from the whole save. */
  test: (save: SaveFile) => boolean;
}

function anyCase(save: SaveFile, pred: (p: CaseProgress) => boolean): boolean {
  return Object.values(save.cases).some(pred);
}
function countCases(save: SaveFile, pred: (p: CaseProgress) => boolean): number {
  return Object.values(save.cases).filter(pred).length;
}
function caseCanon(save: SaveFile, id: string): boolean {
  return !!save.cases[id]?.canonReached;
}
function caseDone(save: SaveFile, id: string): boolean {
  return !!save.cases[id]?.completed;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_case", emoji: "🗂️", name: "Case Closed", desc: "File your first case report.", test: (s) => anyCase(s, (p) => p.completed) },
  { id: "canon", emoji: "🎯", name: "By the Book", desc: "Reach a case's true, canonical ending.", test: (s) => anyCase(s, (p) => !!p.canonReached) },
  { id: "hidden", emoji: "📱", name: "Behind the Curtain", desc: "Open a phone's hidden app.", test: (s) => anyCase(s, (p) => p.hiddenAppOpened) },
  { id: "locksmith", emoji: "🔓", name: "Locksmith", desc: "Unlock every locked note in a case.", test: (s) => anyCase(s, (p) => !!p.allNotesUnlocked) },
  { id: "nohint", emoji: "🧠", name: "No Help Needed", desc: "Crack a locked note without a hint.", test: (s) => anyCase(s, (p) => !!p.codeNoHint) },
  { id: "deleted", emoji: "🗑️", name: "Nothing Stays Deleted", desc: "Find a Recently Deleted folder.", test: (s) => anyCase(s, (p) => p.deletedFolderFound) },
  { id: "flashlight", emoji: "🔦", name: "In the Dark", desc: "Reveal a photo with the flashlight.", test: (s) => anyCase(s, (p) => !!p.flashlightUsed) },
  { id: "ace", emoji: "⭐", name: "Ace", desc: "Earn 3 stars on any case.", test: (s) => anyCase(s, (p) => (p.stars ?? 0) >= 3) },
  { id: "hardmode", emoji: "😤", name: "The Hard Way", desc: "Solve a case in Hard mode.", test: (s) => anyCase(s, (p) => !!p.solvedHard) },
  { id: "five", emoji: "🕵️", name: "Seasoned", desc: "Close 5 cases.", test: (s) => countCases(s, (p) => p.completed) >= 5 },
  { id: "ten", emoji: "🎖️", name: "Veteran", desc: "Close 10 cases.", test: (s) => countCases(s, (p) => p.completed) >= 10 },
  { id: "all_cases", emoji: "🏆", name: "The Closer", desc: `File a report on all ${PLAYABLE_COUNT} cases.`, test: (s) => countCases(s, (p) => p.completed) >= PLAYABLE_COUNT },
  { id: "all_canon", emoji: "👁️", name: "The Whole Truth", desc: `Reach the true ending of all ${PLAYABLE_COUNT} cases.`, test: (s) => countCases(s, (p) => !!p.canonReached) >= PLAYABLE_COUNT },
  { id: "perfect", emoji: "💎", name: "Meticulous", desc: "Earn 3 stars on 5 cases.", test: (s) => countCases(s, (p) => (p.stars ?? 0) >= 3) >= 5 },
  { id: "thorough", emoji: "🔍", name: "Left No Stone", desc: "Find 100% of the evidence in a case.", test: (s) => anyCase(s, (p) => !!p.citableTotal && (p.citableFound ?? 0) >= p.citableTotal) },
  { id: "streak3", emoji: "🔥", name: "On the Case", desc: "Play three days in a row.", test: (s) => (s.streak?.best ?? 0) >= 3 },
  { id: "graduate", emoji: "🎓", name: "Larry's Protégé", desc: "Finish the training case.", test: (s) => caseDone(s, "case-00") },
  { id: "tuned_in", emoji: "📻", name: "You're Not Alone", desc: "Reach the truth of “The 3:33 Caller.”", test: (s) => caseCanon(s, "case-16") },
  { id: "checked_out", emoji: "🛎️", name: "Do Not Disturb", desc: "Reach the truth of “The Night Auditor.”", test: (s) => caseCanon(s, "case-17") },
  { id: "season_two", emoji: "🎬", name: "Second Wave", desc: "Close both Season Two cases.", test: (s) => caseDone(s, "case-16") && caseDone(s, "case-17") },
  { id: "night_owl", emoji: "🦉", name: "Small Hours", desc: "Open a case between midnight and 5 AM.", test: (s) => !!s.playedLate },
  { id: "deep_diver", emoji: "🧷", name: "Case Cracker", desc: "Find 100% of the evidence in three cases.", test: (s) => countCases(s, (p) => !!p.citableTotal && (p.citableFound ?? 0) >= p.citableTotal) >= 3 },
  { id: "interrogator", emoji: "🎙️", name: "The Confession", desc: "Get a suspect to incriminate themselves.", test: (s) => anyCase(s, (p) => !!p.confessionHeard) },
];

// ---------------------------------------------------------------------------
// Case scoring
// ---------------------------------------------------------------------------

export interface ScoreLine {
  label: string;
  points: number;
  got: boolean;
}
export interface CaseScore {
  stars: number;
  points: number;
  canonReached: boolean;
  lines: ScoreLine[];
}

/** Score a filed report. Called at submit time in the report app. */
export function scoreCase(
  caseFile: CaseFile,
  progress: CaseProgress,
  resolvedVerdictId: string,
  cited: Set<string>,
): CaseScore {
  const canon = caseFile.verdicts.find((v) => v.isCanon)!;
  const canonReached = resolvedVerdictId === canon.id;
  const citable = citableEvidence(caseFile);
  const viewedCitable = citable.filter((i) => progress.viewed.includes(i.discoveredBy)).length;
  const coverage = citable.length ? viewedCitable / citable.length : 0;
  const canonHits = canon.requiredEvidenceIds.filter((id) => cited.has(id)).length;
  const allCanonCited = canonHits === canon.requiredEvidenceIds.length;

  const lines: ScoreLine[] = [
    { label: "Report filed", points: 20, got: true },
    { label: "Reached the true ending", points: 50, got: canonReached },
    { label: "Cited all the key evidence", points: 30, got: canonReached && allCanonCited },
    { label: "Opened the hidden app", points: 20, got: progress.hiddenAppOpened },
    { label: "Unlocked every locked note", points: 15, got: !!progress.allNotesUnlocked },
    { label: `Evidence found (${Math.round(coverage * 100)}%)`, points: Math.round(coverage * 30), got: coverage > 0 },
  ];
  const points = lines.reduce((sum, l) => sum + (l.got ? l.points : 0), 0);

  let stars = 1;
  if (canonReached) stars = 2;
  if (canonReached && allCanonCited && progress.hiddenAppOpened) stars = 3;

  return { stars, points, canonReached, lines };
}

// ---------------------------------------------------------------------------
// XP + rank
// ---------------------------------------------------------------------------

export function totalXp(save: SaveFile): number {
  const caseXp = Object.values(save.cases).reduce((sum, p) => sum + (p.bestScore ?? 0), 0);
  const achXp = (save.achievements?.length ?? 0) * 25;
  return caseXp + achXp;
}

export function rankFor(xp: number): { rank: Rank; index: number; next?: Rank; progress: number } {
  let index = 0;
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].at) index = i;
  const rank = RANKS[index];
  const next = RANKS[index + 1];
  const progress = next ? (xp - rank.at) / (next.at - rank.at) : 1;
  return { rank, index, next, progress: Math.max(0, Math.min(1, progress)) };
}

// ---------------------------------------------------------------------------
// Achievement evaluation
// ---------------------------------------------------------------------------

/** Re-check all achievements; returns any newly unlocked (for toasts). */
export function evaluateAchievements(): Achievement[] {
  const save = loadSave();
  const have = new Set(save.achievements ?? []);
  const freshly: Achievement[] = [];
  for (const a of ACHIEVEMENTS) {
    if (!have.has(a.id) && a.test(save)) {
      have.add(a.id);
      freshly.push(a);
    }
  }
  if (freshly.length) {
    save.achievements = [...have];
    persist();
  }
  return freshly;
}

export function unlockedAchievements(): Set<string> {
  return new Set(loadSave().achievements ?? []);
}
