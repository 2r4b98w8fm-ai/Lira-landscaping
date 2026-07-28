import { NextResponse } from "next/server";
import { z } from "zod";
import { resolveMyTeam } from "@/lib/sync/resolve";
import { buildTradeContext } from "@/lib/trade/context";
import { analyzeTrade } from "@/lib/trade/analyze";

const bodySchema = z.object({
  teamAId: z.coerce.number().int(),
  playerIdsA: z.array(z.coerce.number().int()).min(1),
  teamBId: z.coerce.number().int(),
  playerIdsB: z.array(z.coerce.number().int()).min(1),
});

export async function POST(req: Request) {
  const result = await resolveMyTeam();
  if (result.status !== "ok") {
    return NextResponse.json({ error: "Connect a league and pick your team first." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Pick at least one player on each side of the trade." }, { status: 400 });
  }
  const { teamAId, playerIdsA, teamBId, playerIdsB } = parsed.data;

  const { leagueRowId, season, currentWeek, rosterSlotCounts } = result.data;
  const ctx = await buildTradeContext(leagueRowId, season, currentWeek, rosterSlotCounts);

  const teamA = ctx.teams.find((t) => t.teamId === teamAId);
  const teamB = ctx.teams.find((t) => t.teamId === teamBId);
  if (!teamA || !teamB) {
    return NextResponse.json({ error: "Unknown team in this league." }, { status: 400 });
  }

  const valuesA = (ctx.tradeValuesByTeam.get(teamAId) ?? []).filter((tv) =>
    playerIdsA.includes(tv.player.espnPlayerId)
  );
  const valuesB = (ctx.tradeValuesByTeam.get(teamBId) ?? []).filter((tv) =>
    playerIdsB.includes(tv.player.espnPlayerId)
  );
  if (valuesA.length === 0 || valuesB.length === 0) {
    return NextResponse.json({ error: "Couldn't find those players on the selected rosters." }, { status: 400 });
  }

  const analysis = analyzeTrade(
    { id: teamA.teamId, name: teamA.teamName },
    valuesA,
    { id: teamB.teamId, name: teamB.teamName },
    valuesB
  );

  return NextResponse.json({ analysis });
}
