import { NextResponse } from "next/server";
import { z } from "zod";
import { EspnApiError } from "@/lib/espn/client";
import { syncLeague } from "@/lib/sync/league";
import { setSession } from "@/lib/session";

const bodySchema = z.object({
  leagueId: z.string().min(1),
  season: z.coerce.number().int().min(2015).max(2100),
  espnS2: z.string().optional(),
  swid: z.string().optional(),
});

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
    await setSession({
      espnLeagueId: leagueId,
      season,
      myTeamId: null,
      espnS2,
      swid,
    });
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
