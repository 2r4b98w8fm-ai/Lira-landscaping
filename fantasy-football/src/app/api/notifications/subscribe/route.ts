import { NextResponse } from "next/server";
import { z } from "zod";
import { getNotificationSubscriptionForTeam, upsertNotificationSubscription } from "@/lib/db/queries";
import { notificationsConfigured } from "@/lib/notifications/email";
import { resolveMyTeam } from "@/lib/sync/resolve";

const bodySchema = z.object({
  email: z.string().email(),
  injuryAlerts: z.boolean(),
  waiverAlerts: z.boolean(),
});

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status !== "ok") return NextResponse.json({ connected: false });

  const subscription = await getNotificationSubscriptionForTeam(result.data.teamRowId);
  return NextResponse.json({
    connected: true,
    configured: notificationsConfigured(),
    subscription: subscription
      ? { email: subscription.email, injuryAlerts: subscription.injuryAlerts, waiverAlerts: subscription.waiverAlerts }
      : null,
  });
}

export async function POST(req: Request) {
  const result = await resolveMyTeam();
  if (result.status !== "ok") {
    return NextResponse.json({ error: "Connect a league and pick your team first." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!notificationsConfigured()) {
    return NextResponse.json(
      { error: "Email notifications aren't configured on this deployment yet (missing RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  const { email, injuryAlerts, waiverAlerts } = parsed.data;
  await upsertNotificationSubscription(result.data.teamRowId, email, injuryAlerts, waiverAlerts);
  return NextResponse.json({ ok: true });
}
