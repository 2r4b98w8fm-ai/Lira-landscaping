import { NextResponse } from "next/server";
import { z } from "zod";
import { EspnApiError } from "@/lib/espn/client";
import { syncLeague } from "@/lib/sync/league";
import { getSession, setSession, withLeagueAdded } from "@/lib/session";

const bodySchema = z.object({
  leagueId: z.string().min(1),
  season: z.coerce.number().int().min(2015).max(2100),
  espnS2: z.string().optional(),
  swid: z.string().optional(),
});

/**
 * Connects one specific league — either the "I already know my league ID"
 * quick path, or called after the user picks a league from account
 * discovery (see /api/account/discover). Adds to any leagues already
 * connected in this session rather than replacing them.
 */
export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid ESPN league ID and season." },
      { status: 400 }
    );
  }

  const { leagueId, season, espnS2, swid } = parsed.data;

  try {
    const result = await syncLeague(leagueId, season, { espnS2, swid });

    const existing = await getSession();
    const nextSession = withLeagueAdded(
      {
        espnS2: espnS2 ?? existing?.espnS2,
        swid: swid ?? existing?.swid,
        leagues: existing?.leagues ?? [],
        activeIndex: existing?.activeIndex ?? 0,
      },
      { espnLeagueId: leagueId, season, myTeamId: null, name: result.league.name }
    );
    await setSession(nextSession);

    return NextResponse.json({
      league: result.league,
      week: result.week,
      warnings: result.warnings,
    });
  } catch (err) {
    if (err instanceof EspnApiError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.status && err.status < 500 ? err.status : 502 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong connecting to ESPN. Please try again." },
      { status: 500 }
    );
  }
}
