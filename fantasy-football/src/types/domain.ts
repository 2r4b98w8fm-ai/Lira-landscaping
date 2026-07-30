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
  /** Null when no source had a projection for this player/week — never fabricated. May itself be a consensus blend; see projectionBreakdown for the full per-source split. */
  weekProjection: number | null;
  /** Rest-of-season projected points, used for trade value. Null if no source could produce one (e.g. no games played yet). */
  restOfSeasonProjection: number | null;
  /** Where restOfSeasonProjection came from — surfaced in the UI so an estimate is never mistaken for a single authoritative number. */
  restOfSeasonSource: RestOfSeasonSource;
  /** Full multi-source breakdown behind restOfSeasonProjection/weekProjection, when available. Null if this player couldn't be matched across sources (crosswalk miss, no game log yet, etc.) — engines still work off the plain numbers above either way. */
  projectionBreakdown: ProjectionBreakdown | null;
}

export type RestOfSeasonSource = "espn" | "pace_estimate" | "our_model" | "blended" | null;

export interface ProjectionBreakdown {
  /** ESPN's own rest-of-season projection, un-blended. Null if ESPN didn't supply one. */
  espnRestOfSeason: number | null;
  /** Our own model's rest-of-season projection, built from this player's real recent game log, remaining matchups, and injury status. Null if we have no game log to build it from (crosswalk miss, rookie, etc.). */
  ourModelRestOfSeason: number | null;
  ourModelWeek: number | null;
  ourModelReasoning: string[];
  /** Sleeper's overall search_rank across the whole NFL player pool — lower is better. Null if unranked/not found on Sleeper. */
  sleeperSearchRank: number | null;
  /** Sleeper community add/drop buzz in the last 24h, if this player is trending. */
  sleeperTrend: { direction: "add" | "drop"; count: number } | null;
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

export interface AllPlayRecord {
  wins: number;
  losses: number;
  ties: number;
  gamesPlayed: number;
}

export interface PowerRanking {
  teamId: number;
  teamName: string;
  rank: number;
  powerScore: number;
  /** Spots moved up (positive) or down (negative) since the last computed snapshot; null if there's no prior snapshot to compare against. */
  trend: number | null;
  actualRecord: { wins: number; losses: number; ties: number };
  pointsFor: number;
  pointsAgainst: number;
  /** Record if this team had played every other team every week — the "luck" baseline. */
  allPlayRecord: AllPlayRecord;
  /** Actual wins minus all-play-implied expected wins: positive = winning more than their scoring supports (lucky), negative = the opposite. */
  luckWins: number;
  reasoning: string[];
}

export interface WaiverRecommendation {
  player: RosterPlayer;
  /** Rest-of-season projection of the worst starter you currently roster at this position. */
  myWorstStarterValue: number;
  /** Free agent's rest-of-season projection minus myWorstStarterValue. Null if the free agent has no usable projection. */
  valueAdded: number | null;
  reasoning: string[];
}

export interface TeamScoreDistribution {
  teamId: number;
  teamName: string;
  /** Expected weekly starting-lineup score. */
  mean: number;
  /** Standard deviation of that weekly score, from real historical per-position variance. */
  stdev: number;
}

export interface SimulationTeamResult {
  teamId: number;
  teamName: string;
  playoffPct: number;
  /** seed -> % of simulations landing on that seed, for seeds that made the playoffs. */
  seedDistribution: Record<number, number>;
  mostLikelySeed: number | null;
  /** 10th/50th/90th percentile of final regular-season win total across all simulations. */
  projectedWinsRange: { p10: number; p50: number; p90: number };
  /** Average projected weekly score of remaining opponents — higher = tougher rest-of-season schedule. Null if no games remain. */
  remainingSOS: number | null;
}

export interface SimulationResult {
  numSimulations: number;
  weeksRemaining: number;
  teams: SimulationTeamResult[];
}

export interface SuggestedOffer {
  targetTeamId: number;
  targetTeamName: string;
  give: TradeValue[];
  receive: TradeValue[];
  giveValue: number;
  receiveValue: number;
  fairnessGapPct: number;
  /** True when I give at least as much value as I receive — a real team has a rational reason to accept, not just me extracting value. */
  favorsThem: boolean;
  /** When this trade nets you more players than you gave up, the weakest piece on your resulting roster worth cutting to make room. Null when give/receive counts are equal or give > receive. */
  dropCandidate: TradeValue | null;
  rationale: string[];
}
