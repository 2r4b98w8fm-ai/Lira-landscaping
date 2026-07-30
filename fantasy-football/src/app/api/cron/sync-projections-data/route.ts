import { NextResponse } from "next/server";
import { refreshProjectionData } from "@/lib/ingestion/refreshProjectionData";

/**
 * Refreshes the nflverse (real per-player game log, defense-vs-position,
 * scoring variance) and Sleeper (ID crosswalk, trending adds/drops) data
 * our own model and consensus blending depend on. Same shared-secret
 * pattern as the waiver-digest cron — meant for Vercel Cron, not a browser.
 */
export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured on this deployment." }, { status: 503 });
  }
  const provided = req.headers.get("authorization");
  if (provided !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const season = Number(new URL(req.url).searchParams.get("season") ?? new Date().getFullYear());
  const result = await refreshProjectionData(season);
  return NextResponse.json(result);
}
