import { NextResponse } from "next/server";
import { sendWaiverDigests } from "@/lib/notifications/send";

/**
 * Intended to be hit by a scheduled job (Vercel Cron or similar), not a
 * user's browser — protected by a shared secret rather than a session,
 * since there is no session in a cron context. Reads only cached data;
 * see send.ts for why this needs no stored ESPN credentials.
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

  const result = await sendWaiverDigests();
  return NextResponse.json(result);
}
