import { computeDefenseVsPosition, fetchWeeklyStatsForSeason } from "@/lib/nflverse/ingest";
import { computePositionVariance } from "@/lib/nflverse/variance";
import { fetchSleeperCrosswalk, fetchSleeperTrending } from "@/lib/sleeper/ingest";
import {
  logSync,
  saveDefenseVsPosition,
  savePlayerWeekStats,
  savePositionVariance,
  saveSleeperCrosswalk,
  saveSleeperTrending,
} from "@/lib/db/queries";

export interface RefreshResult {
  season: number;
  nflverse: { ok: boolean; message: string; defenseRows?: number; varianceRows?: number; gameLogRows?: number };
  sleeper: { ok: boolean; message: string; crosswalkRows?: number; trendingAdd?: number; trendingDrop?: number };
}

/**
 * The one place that refreshes every external data source our own
 * projection model and Sleeper signal depend on: nflverse's real per-player
 * weekly stats (defense-vs-position, scoring variance, and now each
 * player's own game log) and Sleeper's ID crosswalk + trending buzz. Shared
 * by the local npm script (scripts/sync-projections-data.ts) and the
 * production cron route (api/cron/sync-projections-data) so there's one
 * implementation to keep correct. Each of the two sources fails
 * independently — a broken Sleeper fetch doesn't block nflverse from
 * saving, and vice versa — since they feed different, independent parts of
 * the projection blend.
 */
export async function refreshProjectionData(season: number): Promise<RefreshResult> {
  const result: RefreshResult = {
    season,
    nflverse: { ok: false, message: "" },
    sleeper: { ok: false, message: "" },
  };

  try {
    const rows = await fetchWeeklyStatsForSeason(season);
    if (rows.length === 0) {
      result.nflverse.message = `No nflverse rows found for season ${season} yet (season may not have started).`;
    } else {
      const ranked = computeDefenseVsPosition(rows);
      const throughWeek = Math.max(...rows.map((r) => r.week));
      await saveDefenseVsPosition(season, throughWeek, ranked);

      const variance = computePositionVariance(rows);
      await savePositionVariance(season, variance);

      await savePlayerWeekStats(season, rows);

      result.nflverse = {
        ok: true,
        message: `Saved ${ranked.length} defense-vs-position rows, ${variance.length} position-variance rows, and ${rows.length} player-week rows through week ${throughWeek}.`,
        defenseRows: ranked.length,
        varianceRows: variance.length,
        gameLogRows: rows.length,
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

  return result;
}
