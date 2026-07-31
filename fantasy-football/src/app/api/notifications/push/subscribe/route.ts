import { NextResponse } from "next/server";
import { z } from "zod";
import { savePushSubscription } from "@/lib/db/queries";
import { pushConfigured } from "@/lib/notifications/push";
import { resolveMyTeam } from "@/lib/sync/resolve";

const bodySchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

export async function POST(req: Request) {
  const result = await resolveMyTeam();
  if (result.status !== "ok") {
    return NextResponse.json({ error: "Connect a league and pick your team first." }, { status: 400 });
  }

  if (!pushConfigured()) {
    return NextResponse.json(
      { error: "Push notifications aren't configured on this deployment yet (missing VAPID keys)." },
      { status: 503 }
    );
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Malformed push subscription." }, { status: 400 });
  }

  const { endpoint, keys } = parsed.data;
  await savePushSubscription(result.data.teamRowId, endpoint, keys.p256dh, keys.auth);
  return NextResponse.json({ ok: true });
}
