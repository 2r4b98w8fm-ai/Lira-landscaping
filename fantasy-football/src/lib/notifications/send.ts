import {
  getFreeAgentsForLeague,
  getLeagueById,
  getNotificationSubscriptionForTeam,
  getRosterForTeam,
  getSubscriptionsWithWaiverAlerts,
  updateInjurySnapshot,
} from "@/lib/db/queries";
import { rankWaiverWire } from "@/lib/waiver/engine";
import { notificationsConfigured, sendEmail } from "./email";
import { buildInjuryDigestHtml, diffInjuryStatuses, snapshotInjuryStatuses } from "./injuryDigest";
import { buildWaiverDigestHtml } from "./waiverDigest";

/**
 * Called after a real, user-triggered ESPN sync (never on its own —
 * see api/league/sync and api/league/connect). Deliberately doesn't
 * re-authenticate to ESPN itself; it only compares data that sync just
 * wrote to Postgres. A failed send is logged and swallowed — a broken
 * notification must never fail the sync it's piggybacking on.
 */
export async function maybeSendInjuryDigest(teamRowId: number, leagueName: string): Promise<void> {
  if (!notificationsConfigured()) return;

  const subscription = await getNotificationSubscriptionForTeam(teamRowId);
  if (!subscription || !subscription.injuryAlerts) return;

  const roster = await getRosterForTeam(teamRowId);
  const changes = subscription.lastInjurySnapshot
    ? diffInjuryStatuses(subscription.lastInjurySnapshot, roster)
    : [];
  const html = buildInjuryDigestHtml(leagueName, changes);

  if (html) {
    try {
      await sendEmail(subscription.email, `Injury update — ${leagueName}`, html);
    } catch (err) {
      console.error("Failed to send injury digest:", err);
    }
  }

  // Always refresh the baseline, even with nothing to report — otherwise
  // the very first sync would have no snapshot to diff the next one against.
  await updateInjurySnapshot(teamRowId, snapshotInjuryStatuses(roster));
}

export interface WaiverDigestRunResult {
  sent: number;
  skipped: number;
  failed: number;
}

/**
 * Meant to be called from a scheduled job (see api/cron/waiver-digest),
 * not a user request — reads only what's already cached in Postgres from
 * the last sync of each subscribed league, no ESPN call, so it needs no
 * stored ESPN credentials.
 */
export async function sendWaiverDigests(): Promise<WaiverDigestRunResult> {
  const result: WaiverDigestRunResult = { sent: 0, skipped: 0, failed: 0 };
  if (!notificationsConfigured()) return result;

  const subscriptions = await getSubscriptionsWithWaiverAlerts();
  for (const sub of subscriptions) {
    const league = await getLeagueById(sub.leagueId);
    if (!league) {
      result.skipped++;
      continue;
    }

    const [freeAgentPool, myRoster] = await Promise.all([
      getFreeAgentsForLeague(sub.leagueId),
      getRosterForTeam(sub.teamId),
    ]);
    if (freeAgentPool.length === 0) {
      result.skipped++;
      continue;
    }

    const recommendations = rankWaiverWire(myRoster, freeAgentPool, league.rosterSlotCounts ?? {});
    const html = buildWaiverDigestHtml(sub.leagueName, recommendations);
    if (!html) {
      result.skipped++;
      continue;
    }

    try {
      await sendEmail(sub.email, `Waiver wire upgrades — ${sub.leagueName}`, html);
      result.sent++;
    } catch (err) {
      console.error("Failed to send waiver digest:", err);
      result.failed++;
    }
  }
  return result;
}
