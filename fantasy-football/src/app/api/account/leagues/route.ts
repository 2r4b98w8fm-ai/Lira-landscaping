import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

/** Every league connected in this session, for the league switcher. */
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ connected: false, leagues: [], activeIndex: -1 });

  return NextResponse.json({
    connected: true,
    leagues: session.leagues,
    activeIndex: session.activeIndex,
  });
}
