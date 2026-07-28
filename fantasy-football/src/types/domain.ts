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
