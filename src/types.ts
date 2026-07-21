/**
 * LAST SEEN — case content schema.
 * Every case is pure data conforming to CaseFile. UI code never contains
 * case-specific content; the validator (src/validator.ts) enforces internal
 * consistency at build time.
 */

export type IconName =
  | "messages"
  | "photos"
  | "notes"
  | "phone"
  | "calendar"
  | "maps"
  | "browser"
  | "files"
  | "settings"
  | "flashlight"
  | "calculator"
  | "weather"
  | "clock"
  | "report"
  | "music"
  | "wallet"
  | "health"
  | "podcasts"
  | "mail"
  | "social"
  | "reminders"
  | "appstore"
  | "camera"
  | "translate"
  | "fitness"
  | "news"
  | "shop"
  | "dating"
  | "glimpse"
  | "chatter"
  | "interviews";

export interface Message {
  id: string;
  from: "them" | "owner";
  text: string;
  /** ISO datetime */
  timestamp: string;
  /** When set, this message can be cited in the case report. */
  evidenceLabel?: string;
}

export interface Thread {
  id: string;
  contactName: string;
  contactNumber?: string;
  messages: Message[];
  /**
   * Wrongness cue: after this many seconds of play, a "typing…" indicator
   * appears on this (old, closed) thread and never resolves.
   */
  ghostTypingAfterSeconds?: number;
}

export interface PhotoMeta {
  takenAt: string;
  /** If present and different from takenAt, the photo was modified. */
  editedAt?: string;
  device?: string;
  location?: string;
}

export interface Photo {
  id: string;
  caption?: string;
  timestamp: string;
  /** Inner SVG markup rendered inside a fixed-viewBox frame (see photoart.ts). */
  svg: string;
  /**
   * Optional real photograph URL (fetched by the player's browser). When set,
   * it renders over the SVG, which stays as an offline/failure fallback. Used
   * by the generated everyday "life" photos; authored evidence shots omit it.
   */
  photoUrl?: string;
  /** viewBox aspect: "landscape" 400x300, "portrait" 300x400. */
  aspect: "landscape" | "portrait";
  meta: PhotoMeta;
  /** Lives in the Recently Deleted folder the player must discover. */
  deleted?: boolean;
  /** Drag-a-flashlight-to-reveal layer for near-black photos. */
  flashlight?: {
    /** Inner SVG for the hidden detail layer, same viewBox as `svg`. */
    hiddenSvg: string;
  };
  evidenceLabel?: string;
}

export interface Note {
  id: string;
  title: string;
  timestamp: string;
  /** Plain text; blank lines separate paragraphs. */
  body: string;
  lock?: {
    /** 4-digit code, derivable purely from in-case clues. */
    code: string;
    /** Shown on the keypad screen — nudges toward the clue path. */
    hintText: string;
    /** Item ids that together contain the solution. Must exist in this case. */
    clueSourceIds: string[];
  };
  evidenceLabel?: string;
}

export interface Voicemail {
  id: string;
  callerLabel: string;
  callerNumber?: string;
  timestamp: string;
  durationSec: number;
  /**
   * In-fiction, recovered audio is corrupted; only a synthesized texture
   * plays. The transcript carries the content (also the accessibility path).
   */
  transcript: string;
  tone: "plain" | "distorted" | "static" | "breathing";
  evidenceLabel?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** e.g. "23:11" */
  time?: string;
  recurring?: "daily" | "weekly";
  /** "unknown" renders a not-created-by-owner wrongness cue. */
  createdBy: "owner" | "unknown" | "external";
  struck?: boolean;
  detail?: string;
  evidenceLabel?: string;
}

export interface MapPin {
  id: string;
  label: string;
  timestamp: string;
  /** Abstract map coordinates, 0–100 on both axes. */
  x: number;
  y: number;
  detail?: string;
  evidenceLabel?: string;
}

export interface SearchEntry {
  id: string;
  query: string;
  timestamp: string;
  url?: string;
  evidenceLabel?: string;
}

export interface HiddenAppEntry {
  label: string;
  status: string;
  detail?: string;
}

export interface HiddenApp {
  disguiseIcon: IconName;
  disguiseLabel: string;
  /** Icon appears on the home screen once ALL of these item ids were viewed. */
  revealAfterClueIds: string[];
  /** Real title once opened. */
  title: string;
  heading: string;
  body: string;
  entries: HiddenAppEntry[];
  footer?: string;
  evidenceLabel: string;
}

export type LiveEvent =
  | {
      id: string;
      kind: "message";
      afterSeconds: number;
      threadId: string;
      message: Message;
    }
  | {
      id: string;
      kind: "notification";
      afterSeconds: number;
      title: string;
      body: string;
      glitch?: boolean;
    };

export interface Verdict {
  id: string;
  label: string;
  description: string;
  /** Citable evidence ids that best support this theory. */
  requiredEvidenceIds: string[];
  epilogue: string;
  isCanon: boolean;
}

export interface LockNotification {
  appId: string;
  title: string;
  preview: string;
  /** Item id to jump to when tapped (thread, photo, note…). */
  targetId: string;
}

export interface CaseFile {
  id: string;
  title: string;
  victimName: string;
  /** Case-select blurb. */
  summary: string;
  /** Evidence-intake document shown in the Files app. */
  intake: string;
  contentWarningLevel: 1 | 2 | 3;
  phone: {
    ownerLabel: string;
    /** In-fiction "now" when the player powers the phone on. ISO datetime. */
    recoveredAt: string;
    batteryStart: number;
    wallpaperHue: number;
    lockScreenNotifications: LockNotification[];
  };
  messages: Thread[];
  photos: Photo[];
  notes: Note[];
  voicemails: Voicemail[];
  calendarEvents: CalendarEvent[];
  locationPins: MapPin[];
  browserHistory: SearchEntry[];
  hiddenApp: HiddenApp;
  liveEvents: LiveEvent[];
  verdicts: Verdict[];
}

/** Per-case player progress persisted to localStorage. */
export interface CaseProgress {
  startedAt: number;
  playSeconds: number;
  unlocked: boolean;
  viewed: string[];
  unlockedNotes: string[];
  deletedFolderFound: boolean;
  hiddenAppRevealed: boolean;
  hiddenAppOpened: boolean;
  deliveredLiveEvents: string[];
  verdictChosen?: string;
  citedEvidence?: string[];
  completed: boolean;
  lowBatteryWarned: boolean;
  /** Progression, set when a report is filed. */
  stars?: number;
  bestScore?: number;
  canonReached?: boolean;
  solvedHard?: boolean;
  allNotesUnlocked?: boolean;
  codeNoHint?: boolean;
  flashlightUsed?: boolean;
  /** Exploration tracking for the archive progress ring. */
  citableTotal?: number;
  citableFound?: number;
  /** Epoch ms of the most recent time this case was opened. */
  lastPlayedAt?: number;
  /** Interrogation: question ids the player has already asked. */
  interviewAsked?: string[];
  /** Set once a suspect has incriminated themselves in this case. */
  confessionHeard?: boolean;
}

export interface PlayerSettings {
  /** Content-warning toggle: disables glitch/flicker/jump-style effects. */
  reducedIntensity: boolean;
  ambientAudio: boolean;
  transcriptsOpen: boolean;
  /** Hard mode: no code hints, no evidence prompts — pure deduction. */
  hardMode?: boolean;
  /** Cleared once the player has seen the in-phone how-to coach overlay. */
  coachSeen?: boolean;
  /** Subtle tap/navigation sounds. Default on. */
  uiSounds?: boolean;
  /** A quiet procedural menu soundtrack on the archive/title. Default on. */
  music?: boolean;
  /** Light haptic feedback on supported devices. Default on. */
  haptics?: boolean;
  /** The player's chosen investigator name, shown across the desk. */
  investigatorName?: string;
  /** Case-board colour theme for the menu. */
  boardTheme?: "noir" | "sepia" | "slate";
}

export interface SaveFile {
  version: 1;
  playerId: string;
  settings: PlayerSettings;
  cases: Record<string, CaseProgress>;
  /** Unlocked achievement ids. */
  achievements?: string[];
  /** Daily play streak, updated once per calendar day the game is opened. */
  streak?: {
    count: number;
    best: number;
    /** ISO date (YYYY-MM-DD) of the most recent day played. */
    lastDay: string;
  };
  /** Most recently opened case, for the archive "Continue" banner. */
  lastCaseId?: string;
  /** Set the first time the game is opened between midnight and 5 AM. */
  playedLate?: boolean;
}
