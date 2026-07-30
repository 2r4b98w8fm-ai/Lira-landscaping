import { parse } from "csv-parse/sync";
import { ALL_NFL_TEAMS, type Position } from "@/lib/constants";

/**
 * nflverse-data ships real, freely-licensed weekly player stats (not
 * projections — actual results). We use it to compute defense-vs-position
 * strength: how many PPR points each NFL defense has allowed to each
 * fantasy position so far this season. Source:
 * https://github.com/nflverse/nflverse-data/releases/tag/player_stats
 */
const PLAYER_STATS_CSV_URL =
  "https://github.com/nflverse/nflverse-data/releases/download/player_stats/player_stats.csv";

const FETCH_TIMEOUT_MS = 60_000;

// nflverse's per-player `position` column includes non-fantasy positions
// (DB, LB, OL, ...) since the file covers every player, not just skill
// players. We only care about these four for start/sit matchup analysis;
// fullbacks are folded into RB since they occupy the same defensive matchup.
const POSITION_ALIAS: Record<string, Position | undefined> = {
  QB: "QB",
  RB: "RB",
  FB: "RB",
  WR: "WR",
  TE: "TE",
};

export interface RawStatRow {
  season: number;
  week: number;
  position: Position;
  nflTeam: string;
  opponentTeam: string;
  fantasyPointsPpr: number;
  /** nflverse's gsis_id for this player — the join key to Sleeper's crosswalk (see sleeper/ingest.ts) and our own projection model. */
  gsisId: string;
  playerName: string;
}

export class NflverseIngestError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "NflverseIngestError";
  }
}

/**
 * Downloads and parses the full nflverse player_stats CSV, returning only
 * the rows relevant to defense-vs-position for the given season. This is a
 * ~30MB multi-decade file; we filter as we go rather than materializing
 * every season in memory.
 */
export async function fetchWeeklyStatsForSeason(
  season: number
): Promise<RawStatRow[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let csvText: string;
  try {
    const res = await fetch(PLAYER_STATS_CSV_URL, {
      signal: controller.signal,
      cache: "no-store",
    });
    if (!res.ok) {
      throw new NflverseIngestError(
        `nflverse-data returned ${res.status} fetching player_stats.csv`
      );
    }
    csvText = await res.text();
  } catch (err) {
    if (err instanceof NflverseIngestError) throw err;
    throw new NflverseIngestError(
      "Could not download nflverse player stats.",
      err
    );
  } finally {
    clearTimeout(timeout);
  }

  const records: Record<string, string>[] = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
  });

  const rows: RawStatRow[] = [];
  for (const r of records) {
    const rowSeason = Number(r.season);
    if (rowSeason !== season) continue;
    if (r.season_type !== "REG") continue; // matchup difficulty is regular-season only

    if (!r.position) continue;
    const position = POSITION_ALIAS[r.position];
    if (!position) continue;

    const nflTeam = r.recent_team;
    if (!nflTeam || !ALL_NFL_TEAMS.includes(nflTeam as (typeof ALL_NFL_TEAMS)[number])) continue;

    const opponentTeam = r.opponent_team;
    if (!opponentTeam || !ALL_NFL_TEAMS.includes(opponentTeam as (typeof ALL_NFL_TEAMS)[number])) continue;

    const fantasyPointsPpr = Number(r.fantasy_points_ppr);
    if (!Number.isFinite(fantasyPointsPpr)) continue;

    if (!r.player_id || !r.player_display_name) continue;

    rows.push({
      season: rowSeason,
      week: Number(r.week),
      position,
      nflTeam,
      opponentTeam,
      fantasyPointsPpr,
      gsisId: r.player_id,
      playerName: r.player_display_name,
    });
  }

  return rows;
}

export interface DefenseRankRow {
  team: string;
  position: Position;
  avgPointsAllowedPpr: number;
  rank: number;
  weeksSampled: number;
}

/**
 * Aggregates raw per-player rows into "points allowed per game" by
 * (team, position), then ranks 1 (toughest matchup, fewest points allowed)
 * to 32 (easiest) within each position.
 */
export function computeDefenseVsPosition(rows: RawStatRow[]): DefenseRankRow[] {
  type Bucket = { total: number; weeks: Set<number> };
  const buckets = new Map<string, Bucket>();

  for (const row of rows) {
    const key = `${row.opponentTeam}|${row.position}`;
    const bucket = buckets.get(key) ?? { total: 0, weeks: new Set() };
    bucket.total += row.fantasyPointsPpr;
    bucket.weeks.add(row.week);
    buckets.set(key, bucket);
  }

  const averaged = Array.from(buckets.entries()).map(([key, b]) => {
    const [team, position] = key.split("|") as [string, Position];
    return {
      team,
      position,
      avgPointsAllowedPpr: b.total / b.weeks.size,
      weeksSampled: b.weeks.size,
    };
  });

  const byPosition = new Map<Position, typeof averaged>();
  for (const entry of averaged) {
    const list = byPosition.get(entry.position) ?? [];
    list.push(entry);
    byPosition.set(entry.position, list);
  }

  const ranked: DefenseRankRow[] = [];
  for (const list of byPosition.values()) {
    list.sort((a, b) => a.avgPointsAllowedPpr - b.avgPointsAllowedPpr);
    list.forEach((entry, i) => {
      ranked.push({ ...entry, rank: i + 1 });
    });
  }
  return ranked;
}
