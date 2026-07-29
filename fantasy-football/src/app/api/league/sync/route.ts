import { NextResponse } from "next/server";
import { EspnApiError } from "@/lib/espn/client";
import { getLeagueByEspnId, getTeamByEspnTeamId } from "@/lib/db/queries";
import { getActiveLeague, getSession } from "@/lib/session";
import { syncLeague } from "@/lib/sync/league";
import { maybeSendInjuryDigest } from "@/lib/notifications/send";

export async function POST() {
  const session = await getSession();
  const activeLeague = session ? getActiveLeague(session) : null;
  if (!session || !activeLeague) {
    return NextResponse.json({ error: "Connect a league first." }, { status: 400 });
  }

  try {
    const result = await syncLeague(activeLeague.espnLeagueId, activeLeague.season, {
      espnS2: session.espnS2,
      swid: session.swid,
    });

    if (activeLeague.myTeamId !== null) {
      const league = await getLeagueByEspnId(activeLeague.espnLeagueId, activeLeague.season);
      const team = league ? await getTeamByEspnTeamId(league.id, activeLeague.myTeamId) : null;
      if (team) {
        // Never let a notification failure surface as a sync failure.
        await maybeSendInjuryDigest(team.id, result.league.name).catch((err) =>
          console.error("Injury digest failed:", err)
        );
      }
    }

    return NextResponse.json({ league: result.league, week: result.week, warnings: result.warnings });
  } catch (err) {
    if (err instanceof EspnApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status && err.status < 500 ? err.status : 502 });
    }
    return NextResponse.json({ error: "Refresh failed. Please try again shortly." }, { status: 500 });
  }
}
