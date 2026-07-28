import { NextResponse } from "next/server";
import { EspnApiError } from "@/lib/espn/client";
import { getSession } from "@/lib/session";
import { syncLeague } from "@/lib/sync/league";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Connect a league first." }, { status: 400 });
  }

  try {
    const result = await syncLeague(session.espnLeagueId, session.season, {
      espnS2: session.espnS2,
      swid: session.swid,
    });
    return NextResponse.json({ league: result.league, week: result.week, warnings: result.warnings });
  } catch (err) {
    if (err instanceof EspnApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status && err.status < 500 ? err.status : 502 });
    }
    return NextResponse.json({ error: "Refresh failed. Please try again shortly." }, { status: 500 });
  }
}
