import { config } from "dotenv";
config({ path: ".env.local" });
config();
import { computeDefenseVsPosition, fetchWeeklyStatsForSeason } from "../src/lib/nflverse/ingest";
import { saveDefenseVsPosition, logSync } from "../src/lib/db/queries";

const season = Number(process.argv[2] ?? new Date().getFullYear());

async function main() {
  console.log(`Fetching nflverse weekly stats for ${season}...`);
  try {
    const rows = await fetchWeeklyStatsForSeason(season);
    if (rows.length === 0) {
      console.warn(`No rows found for season ${season} yet (season may not have started).`);
      await logSync("nflverse", "error", `No rows for season ${season}`);
      return;
    }
    const ranked = computeDefenseVsPosition(rows);
    const throughWeek = Math.max(...rows.map((r) => r.week));
    await saveDefenseVsPosition(season, throughWeek, ranked);
    await logSync("nflverse", "ok", `Synced ${ranked.length} defense-vs-position rows through week ${throughWeek}`);
    console.log(`Saved ${ranked.length} defense-vs-position rows (through week ${throughWeek}).`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Sync failed:", message);
    await logSync("nflverse", "error", message);
    process.exitCode = 1;
  }
}

main();
