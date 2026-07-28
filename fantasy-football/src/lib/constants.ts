export const POSITIONS = ["QB", "RB", "WR", "TE", "K", "DST"] as const;
export type Position = (typeof POSITIONS)[number];

export const FLEX_ELIGIBLE: Position[] = ["RB", "WR", "TE"];

/**
 * ESPN's internal proTeamId -> NFL team abbreviation. Undocumented and stable
 * historically, but ESPN has renumbered/renamed teams before (OAK->LV, SD->LAC).
 * If mapping breaks, `espnMappers.ts` falls back to "FA"/unknown rather than throwing.
 */
export const ESPN_PRO_TEAM_MAP: Record<number, string> = {
  0: "FA",
  1: "ATL",
  2: "BUF",
  3: "CHI",
  4: "CIN",
  5: "CLE",
  6: "DAL",
  7: "DEN",
  8: "DET",
  9: "GB",
  10: "TEN",
  11: "IND",
  12: "KC",
  13: "LV",
  14: "LAR",
  15: "MIA",
  16: "MIN",
  17: "NE",
  18: "NO",
  19: "NYG",
  20: "NYJ",
  21: "PHI",
  22: "ARI",
  23: "PIT",
  24: "LAC",
  25: "SF",
  26: "SEA",
  27: "TB",
  28: "WSH",
  29: "CAR",
  30: "JAX",
  33: "BAL",
  34: "HOU",
};

/** ESPN defaultPositionId -> our Position. */
export const ESPN_POSITION_MAP: Record<number, Position> = {
  1: "QB",
  2: "RB",
  3: "WR",
  4: "TE",
  5: "K",
  16: "DST",
};

/** ESPN lineupSlotId -> readable slot label, for rendering roster slots. */
export const ESPN_LINEUP_SLOT_MAP: Record<number, string> = {
  0: "QB",
  2: "RB",
  4: "WR",
  6: "TE",
  16: "D/ST",
  17: "K",
  20: "BE",
  21: "IR",
  23: "FLEX",
};

export const ALL_NFL_TEAMS = [
  "ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN",
  "DET", "GB", "HOU", "IND", "JAX", "KC", "LAC", "LAR", "LV", "MIA",
  "MIN", "NE", "NO", "NYG", "NYJ", "PHI", "PIT", "SEA", "SF", "TB",
  "TEN", "WSH",
] as const;
