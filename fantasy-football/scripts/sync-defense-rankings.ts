import { config } from "dotenv";
config({ path: ".env.local" });
config();
import { refreshProjectionData } from "../src/lib/ingestion/refreshProjectionData";

const season = Number(process.argv[2] ?? new Date().getFullYear());

async function main() {
  console.log(`Refreshing nflverse + Sleeper projection data for ${season}...`);
  const result = await refreshProjectionData(season);

  console.log(`nflverse: ${result.nflverse.ok ? "ok" : "FAILED"} — ${result.nflverse.message}`);
  console.log(`sleeper: ${result.sleeper.ok ? "ok" : "FAILED"} — ${result.sleeper.message}`);
  console.log(`snap counts: ${result.snapCounts.ok ? "ok" : "FAILED"} — ${result.snapCounts.message}`);

  if (!result.nflverse.ok && !result.sleeper.ok && !result.snapCounts.ok) process.exitCode = 1;
}

main();
