import type { Position } from "@/lib/constants";

export interface LeagueSummary {
  espnLeagueId: string;
  season: number;
  name: string;
  teams: TeamSummary[];
}

export interface TeamSummary {
  espnTeamId: number;
  name: string;
  abbrev: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
}

export interface RosterPlayer {
  espnPlayerId: number;
  name: string;
  position: Position;
  nflTeam: string;
  lineupSlot: string;
  injuryStatus: InjuryStatus;
  opponent: string | null;
  seasonPoints: number | null;
  /** Null when ESPN didn't return a projection for this player/week — never fabricated. */
  weekProjection: number | null;
  /** Rest-of-season projected points, used for trade value. Null if neither ESPN's own ROS projection nor a season-pace estimate could be computed (e.g. no games played yet). */
  restOfSeasonProjection: number | null;
  /** Where restOfSeasonProjection came from — surfaced in the UI so an estimate is never mistaken for ESPN's own number. */
  restOfSeasonSource: "espn" | "pace_estimate" | null;
}

export type InjuryStatus =
  | "ACTIVE"
  | "QUESTIONABLE"
  | "DOUBTFUL"
  | "OUT"
  | "IR"
  | "SUSPENSION"
  | "UNKNOWN";

export interface DefenseRanking {
  team: string;
  position: Position;
  avgPointsAllowedPpr: number;
  /** 1 = toughest matchup (fewest points allowed), 32 = easiest. */
  rank: number;
  weeksSampled: number;
}

export interface StartSitRecommendation {
  player: RosterPlayer;
  score: number;
  reasoning: string[];
  matchup: {
    opponent: string | null;
    defenseRank: number | null;
    defenseRankLabel: string | null;
  };
}

export interface StartSitBoard {
  position: Position;
  recommendations: StartSitRecommendation[];
  /** True if none of the players at this position had usable projections. */
  dataIncomplete: boolean;
}

export interface TradeValue {
  player: RosterPlayer;
  /** Rest-of-season projection this value is built from (may be an estimate — see player.restOfSeasonSource). */
  baseProjection: number;
  /** Points of a "replacement level" player at this position in this league — the baseline everything is measured against. */
  replacementLevel: number;
  /** baseProjection - replacementLevel, floored so a bench player never nets to zero/negative in a trade math display. */
  vorp: number;
  injuryMultiplier: number;
  scheduleMultiplier: number;
  finalValue: number;
  reasoning: string[];
}

export interface TradeSide {
  teamId: number;
  teamName: string;
  players: TradeValue[];
  totalValue: number;
}

export interface TradeAnalysis {
  sideA: TradeSide;
  sideB: TradeSide;
  /** (larger total - smaller total) / larger total, as a percent. 0 = perfectly even. */
  fairnessGapPct: number;
  favors: "A" | "B" | "even";
  verdict: string;
  reasoning: string[];
}

export interface PositionalNeed {
  position: Position;
  /** Sum of (player VORP - startable threshold) for rostered players at this position; positive = surplus, negative = need. */
  surplus: number;
  startingRequirement: number;
  rosteredCount: number;
}

export interface TeamNeedsProfile {
  teamId: number;
  teamName: string;
  needs: PositionalNeed[];
}

export interface TradeTargetSuggestion {
  team: TeamNeedsProfile;
  /** Positions where the target is weak and my team has surplus. */
  complementaryPositions: Position[];
  rationale: string[];
}

export interface SuggestedOffer {
  targetTeamId: number;
  targetTeamName: string;
  give: TradeValue[];
  receive: TradeValue[];
  giveValue: number;
  receiveValue: number;
  fairnessGapPct: number;
  rationale: string[];
}
