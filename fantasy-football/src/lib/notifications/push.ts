import webpush from "web-push";
import { deletePushSubscription } from "@/lib/db/queries";

/** True only when all three real VAPID values are present — every caller should check this before sending, so we never pretend to have pushed a notification that didn't go out. */
export function pushConfigured(): boolean {
  return Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.VAPID_SUBJECT);
}

/** Safe to expose to the browser — the public key is what the client needs to create a subscription. Null if push isn't configured on this deployment. */
export function getVapidPublicKey(): string | null {
  return process.env.VAPID_PUBLIC_KEY ?? null;
}

function configureWebPush(): void {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT!,
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );
}

export interface PushSubscriptionRow {
  endpoint: string;
  p256dh: string;
  auth: string;
}

export interface PushPayload {
  title: string;
  body: string;
  /** Path to open (e.g. "/dashboard") when the notification is tapped. */
  url?: string;
}

export interface PushSendResult {
  sent: number;
  /** Subscriptions the push service reported as gone (410) or unknown (404) — the browser/OS unsubscribed on its own (uninstall, permission revoked, etc.), so the row was deleted rather than retried forever. */
  pruned: number;
  failed: number;
}

/**
 * Sends one push notification to every subscription passed in. Mirrors the
 * same real-sync/cron triggers the email digests already use — never a
 * standalone poller, and never throws (a broken push send must not fail
 * whatever it's piggybacking on). Dead subscriptions are pruned from the
 * table automatically so it never grows unbounded with browsers/devices
 * that unsubscribed outside the app.
 */
export async function sendPushToSubscriptions(
  subscriptions: PushSubscriptionRow[],
  payload: PushPayload
): Promise<PushSendResult> {
  const result: PushSendResult = { sent: 0, pruned: 0, failed: 0 };
  if (!pushConfigured() || subscriptions.length === 0) return result;

  configureWebPush();
  const body = JSON.stringify(payload);

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification({ endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } }, body);
      result.sent++;
    } catch (err) {
      const statusCode = (err as { statusCode?: number }).statusCode;
      if (statusCode === 404 || statusCode === 410) {
        await deletePushSubscription(sub.endpoint).catch(() => {});
        result.pruned++;
      } else {
        console.error("Failed to send push notification:", err);
        result.failed++;
      }
    }
  }
  return result;
}
