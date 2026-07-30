import { parse } from "csv-parse/sync";

/**
 * nflverse-data's snap-count release (sourced from Pro Football Reference)
 * — unlike player_stats.csv, this is one file per season, and it's keyed
 * by PFR's own player ID, not nflverse's gsis_id. There's no shared ID
 * between the two, so resolving a snap-count row to a real player has to
 * go through name matching (see normalizePlayerName) against the
 * gsis_id-keyed rows we already ingest from player_stats.csv.
 */
const FETCH_TIMEOUT_MS = 60_000;

function snapCountsUrl(season: number): string {
  return `https://github.com/nflverse/nflverse-data/releases/download/snap_counts/snap_counts_${season}.csv`;
}

export class SnapCountIngestError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "SnapCountIngestError";
  }
}

export interface RawSnapCountRow {
  season: number;
  week: number;
  playerName: string;
  team: string;
  position: string;
  offenseSnaps: number;
  offensePct: number;
}

export async function fetchSnapCountsForSeason(season: number): Promise<RawSnapCountRow[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let csvText: string;
  try {
    const res = await fetch(snapCountsUrl(season), { signal: controller.signal, cache: "no-store" });
    if (!res.ok) {
      throw new SnapCountIngestError(`nflverse-data returned ${res.status} fetching snap_counts_${season}.csv`);
    }
    csvText = await res.text();
  } catch (err) {
    if (err instanceof SnapCountIngestError) throw err;
    throw new SnapCountIngestError("Could not download nflverse snap counts.", err);
  } finally {
    clearTimeout(timeout);
  }

  const records: Record<string, string>[] = parse(csvText, { columns: true, skip_empty_lines: true });

  const rows: RawSnapCountRow[] = [];
  for (const r of records) {
    if (r.game_type !== "REG") continue;
    if (!r.player || !r.team) continue;

    const offenseSnaps = Number(r.offense_snaps);
    if (!Number.isFinite(offenseSnaps)) continue;
    const offensePct = Number(r.offense_pct);

    rows.push({
      season: Number(r.season),
      week: Number(r.week),
      playerName: r.player,
      team: r.team,
      position: r.position ?? "",
      offenseSnaps,
      offensePct: Number.isFinite(offensePct) ? offensePct : 0,
    });
  }
  return rows;
}

/**
 * Normalizes a player name for cross-source matching — strips
 * punctuation, case, and generational suffixes so "A.J. Brown" (one
 * source's spelling) and "AJ Brown Jr." (another's) compare equal. Never
 * perfect (this is why we require a team match too when resolving), but
 * good enough for the vast majority of active fantasy-relevant players.
 */
export function normalizePlayerName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/'/g, "")
    .replace(/\s+(jr|sr|ii|iii|iv|v)\.?$/i, "")
    .replace(/[^a-z]/g, "");
}

export interface TeamSnapCountRow {
  season: number;
  week: number;
  team: string;
  totalOffenseSnaps: number;
}

/**
 * Estimates each team's total offensive snaps for the week from whichever
 * player has the highest raw offense_snaps count that week (least
 * sensitive to rounding in offense_pct), backing out the team total as
 * offenseSnaps / offensePct. An estimate, not an official total — nflverse
 * doesn't publish team-level snap counts directly.
 */
export function computeTeamSnapCounts(rows: RawSnapCountRow[]): TeamSnapCountRow[] {
  const byKey = new Map<string, { offenseSnaps: number; offensePct: number; season: number; week: number; team: string }>();
  for (const row of rows) {
    if (row.offensePct <= 0) continue;
    const key = `${row.season}|${row.week}|${row.team}`;
    const existing = byKey.get(key);
    if (!existing || row.offenseSnaps > existing.offenseSnaps) {
      byKey.set(key, { offenseSnaps: row.offenseSnaps, offensePct: row.offensePct, season: row.season, week: row.week, team: row.team });
    }
  }
  return Array.from(byKey.values()).map(({ offenseSnaps, offensePct, season, week, team }) => ({
    season,
    week,
    team,
    totalOffenseSnaps: Math.round(offenseSnaps / offensePct),
  }));
}
