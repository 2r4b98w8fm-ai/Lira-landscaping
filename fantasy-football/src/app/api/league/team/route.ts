import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, setSession, withActiveLeagueUpdated } from "@/lib/session";

const bodySchema = z.object({ teamId: z.coerce.number().int() });

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.leagues.length === 0) {
    return NextResponse.json({ error: "Connect a league first." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid team id." }, { status: 400 });
  }

  await setSession(withActiveLeagueUpdated(session, { myTeamId: parsed.data.teamId }));
  return NextResponse.json({ ok: true });
}
