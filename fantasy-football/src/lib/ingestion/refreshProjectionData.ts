import { computeDefenseVsPosition, fetchWeeklyStatsForSeason, type RawStatRow } from "@/lib/nflverse/ingest";
import { computePositionVariance } from "@/lib/nflverse/variance";
import { computeTeamSnapCounts, fetchSnapCountsForSeason, normalizePlayerName } from "@/lib/nflverse/snapCounts";
import { fetchSleeperCrosswalk, fetchSleeperTrending } from "@/lib/sleeper/ingest";
import {
  logSync,
  saveDefenseVsPosition,
  savePlayerSnapCounts,
  savePlayerWeekStats,
  savePositionVariance,
  saveSleeperCrosswalk,
  saveSleeperTrending,
  saveTeamSnapCounts,
} from "@/lib/db/queries";

export interface RefreshResult {
  season: number;
  nflverse: { ok: boolean; message: string; defenseRows?: number; varianceRows?: number; gameLogRows?: number };
  sleeper: { ok: boolean; message: string; crosswalkRows?: number; trendingAdd?: number; trendingDrop?: number };
  snapCounts: { ok: boolean; message: string; resolvedRows?: number; unresolvedRows?: number; teamRows?: number };
}

/** Builds a normalizedName|team -> gsisId lookup from the season's player_stats rows, for resolving snap-count rows (which have no shared ID with nflverse's own gsis-keyed data — see nflverse/snapCounts.ts). Later (higher-week) rows win, so a mid-season trade resolves to the player's most recent team. */
function buildNameTeamToGsisMap(rows: RawStatRow[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const row of rows) {
    map.set(`${normalizePlayerName(row.playerName)}|${row.nflTeam}`, row.gsisId);
  }
  return map;
}

/**
 * The one place that refreshes every external data source our own
 * projection model, breakout engine, and Sleeper signal depend on:
 * nflverse's real per-player weekly stats (defense-vs-position, scoring
 * variance, each player's own game log including usage/opportunity),
 * nflverse's PFR-sourced snap counts, and Sleeper's ID crosswalk +
 * trending buzz. Shared by the local npm script
 * (scripts/sync-defense-rankings.ts) and the production cron route
 * (api/cron/sync-projections-data) so there's one implementation to keep
 * correct. Each of the three sources fails independently, since they feed
 * different, independent parts of the app.
 */
export async function refreshProjectionData(season: number): Promise<RefreshResult> {
  const result: RefreshResult = {
    season,
    nflverse: { ok: false, message: "" },
    sleeper: { ok: false, message: "" },
    snapCounts: { ok: false, message: "" },
  };

  let statRows: RawStatRow[] = [];
  try {
    statRows = await fetchWeeklyStatsForSeason(season);
    if (statRows.length === 0) {
      result.nflverse.message = `No nflverse rows found for season ${season} yet (season may not have started).`;
    } else {
      const ranked = computeDefenseVsPosition(statRows);
      const throughWeek = Math.max(...statRows.map((r) => r.week));
      await saveDefenseVsPosition(season, throughWeek, ranked);

      const variance = computePositionVariance(statRows);
      await savePositionVariance(season, variance);

      await savePlayerWeekStats(season, statRows);

      result.nflverse = {
        ok: true,
        message: `Saved ${ranked.length} defense-vs-position rows, ${variance.length} position-variance rows, and ${statRows.length} player-week rows through week ${throughWeek}.`,
        defenseRows: ranked.length,
        varianceRows: variance.length,
        gameLogRows: statRows.length,
      };
    }
    await logSync("nflverse", result.nflverse.ok ? "ok" : "error", result.nflverse.message);
  } catch (err) {
    result.nflverse.message = err instanceof Error ? err.message : String(err);
    await logSync("nflverse", "error", result.nflverse.message);
  }

  try {
    const crosswalk = await fetchSleeperCrosswalk();
    await saveSleeperCrosswalk(crosswalk);

    const [adds, drops] = await Promise.all([fetchSleeperTrending("add"), fetchSleeperTrending("drop")]);
    await saveSleeperTrending("add", adds);
    await saveSleeperTrending("drop", drops);

    result.sleeper = {
      ok: true,
      message: `Saved ${crosswalk.length} crosswalk rows, ${adds.length} trending-add rows, ${drops.length} trending-drop rows.`,
      crosswalkRows: crosswalk.length,
      trendingAdd: adds.length,
      trendingDrop: drops.length,
    };
    await logSync("sleeper", "ok", result.sleeper.message);
  } catch (err) {
    result.sleeper.message = err instanceof Error ? err.message : String(err);
    await logSync("sleeper", "error", result.sleeper.message);
  }

  try {
    if (statRows.length === 0) {
      result.snapCounts.message = "Skipped — no player_stats rows this cycle to resolve snap counts against.";
    } else {
      const nameTeamToGsis = buildNameTeamToGsisMap(statRows);
      const snapRows = await fetchSnapCountsForSeason(season);

      const resolved: Array<{ gsisId: string; week: number; offenseSnaps: number; offensePct: number }> = [];
      let unresolved = 0;
      for (const row of snapRows) {
        const gsisId = nameTeamToGsis.get(`${normalizePlayerName(row.playerName)}|${row.team}`);
        if (!gsisId) {
          unresolved++;
          continue;
        }
        resolved.push({ gsisId, week: row.week, offenseSnaps: row.offenseSnaps, offensePct: row.offensePct });
      }
      await savePlayerSnapCounts(season, resolved);

      const teamRows = computeTeamSnapCounts(snapRows);
      await saveTeamSnapCounts(season, teamRows);

      result.snapCounts = {
        ok: true,
        message: `Resolved ${resolved.length} of ${snapRows.length} snap-count rows to a real player (${unresolved} unmatched by name+team), plus ${teamRows.length} team-week snap totals.`,
        resolvedRows: resolved.length,
        unresolvedRows: unresolved,
        teamRows: teamRows.length,
      };
    }
    await logSync("snap_counts", result.snapCounts.ok ? "ok" : "error", result.snapCounts.message);
  } catch (err) {
    result.snapCounts.message = err instanceof Error ? err.message : String(err);
    await logSync("snap_counts", "error", result.snapCounts.message);
  }

  return result;
}
