import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, setSession } from "@/lib/session";

const bodySchema = z.object({ index: z.coerce.number().int().min(0) });

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not connected." }, { status: 400 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success || parsed.data.index >= session.leagues.length) {
    return NextResponse.json({ error: "Invalid league index." }, { status: 400 });
  }

  await setSession({ ...session, activeIndex: parsed.data.index });
  return NextResponse.json({ ok: true });
}
