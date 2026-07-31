import {
  getAllPushSubscriptions,
  getFreeAgentsForLeague,
  getLeagueById,
  getNotificationSubscriptionForTeam,
  getPushSubscriptionsForTeam,
  getRosterForTeam,
  getSubscriptionsWithWaiverAlerts,
  updateInjurySnapshot,
} from "@/lib/db/queries";
import { rankWaiverWire } from "@/lib/waiver/engine";
import { notificationsConfigured, sendEmail } from "./email";
import { pushConfigured, sendPushToSubscriptions, type PushSubscriptionRow } from "./push";
import { buildInjuryDigestHtml, buildInjuryPushBody, diffInjuryStatuses, snapshotInjuryStatuses } from "./injuryDigest";
import { buildWaiverDigestHtml, buildWaiverPushBody } from "./waiverDigest";

/**
 * Called after a real, user-triggered ESPN sync (never on its own —
 * see api/league/sync and api/league/connect). Deliberately doesn't
 * re-authenticate to ESPN itself; it only compares data that sync just
 * wrote to Postgres. A failed send is logged and swallowed — a broken
 * notification must never fail the sync it's piggybacking on. Sends on
 * whichever channels are configured and subscribed — email and push are
 * independent (a team can have one, both, or neither), but both read the
 * same injury-status "what changed" diff, since that's content, not a
 * delivery concern.
 */
export async function maybeSendInjuryDigest(teamRowId: number, leagueName: string): Promise<void> {
  const subscription = await getNotificationSubscriptionForTeam(teamRowId);
  if (!subscription || !subscription.injuryAlerts) return;

  const roster = await getRosterForTeam(teamRowId);
  const changes = subscription.lastInjurySnapshot
    ? diffInjuryStatuses(subscription.lastInjurySnapshot, roster)
    : [];

  if (notificationsConfigured()) {
    const html = buildInjuryDigestHtml(leagueName, changes);
    if (html) {
      try {
        await sendEmail(subscription.email, `Injury update — ${leagueName}`, html);
      } catch (err) {
        console.error("Failed to send injury digest email:", err);
      }
    }
  }

  if (pushConfigured()) {
    const body = buildInjuryPushBody(changes);
    if (body) {
      const pushSubs = await getPushSubscriptionsForTeam(teamRowId);
      await sendPushToSubscriptions(pushSubs, { title: `Injury update — ${leagueName}`, body, url: "/dashboard" });
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
 * stored ESPN credentials. Push has no separate "waiver alerts" toggle of
 * its own (unlike email) — being push-subscribed at all opts a team into
 * both this and injury pushes, documented in the UI; email keeps the
 * granular per-content checkbox it always had.
 */
export async function sendWaiverDigests(): Promise<WaiverDigestRunResult> {
  const result: WaiverDigestRunResult = { sent: 0, skipped: 0, failed: 0 };

  const emailSubs = notificationsConfigured() ? await getSubscriptionsWithWaiverAlerts() : [];
  const pushRows = pushConfigured() ? await getAllPushSubscriptions() : [];

  const emailByTeam = new Map(emailSubs.map((s) => [s.teamId, s]));
  const pushByTeam = new Map<number, { leagueId: number; leagueName: string; subs: PushSubscriptionRow[] }>();
  for (const row of pushRows) {
    const entry = pushByTeam.get(row.teamId) ?? { leagueId: row.leagueId, leagueName: row.leagueName, subs: [] };
    entry.subs.push({ endpoint: row.endpoint, p256dh: row.p256dh, auth: row.auth });
    pushByTeam.set(row.teamId, entry);
  }

  const allTeamIds = new Set<number>([...emailByTeam.keys(), ...pushByTeam.keys()]);

  for (const teamId of allTeamIds) {
    const emailSub = emailByTeam.get(teamId);
    const pushEntry = pushByTeam.get(teamId);
    const leagueId = emailSub?.leagueId ?? pushEntry?.leagueId;
    const leagueName = emailSub?.leagueName ?? pushEntry?.leagueName;
    if (leagueId === undefined || leagueName === undefined) {
      result.skipped++;
      continue;
    }

    const league = await getLeagueById(leagueId);
    if (!league) {
      result.skipped++;
      continue;
    }

    const [freeAgentPool, myRoster] = await Promise.all([
      getFreeAgentsForLeague(leagueId),
      getRosterForTeam(teamId),
    ]);
    if (freeAgentPool.length === 0) {
      result.skipped++;
      continue;
    }

    const recommendations = rankWaiverWire(myRoster, freeAgentPool, league.rosterSlotCounts ?? {});

    let sent = false;
    let failed = false;

    if (emailSub) {
      const html = buildWaiverDigestHtml(leagueName, recommendations);
      if (html) {
        try {
          await sendEmail(emailSub.email, `Waiver wire upgrades — ${leagueName}`, html);
          sent = true;
        } catch (err) {
          console.error("Failed to send waiver digest email:", err);
          failed = true;
        }
      }
    }

    if (pushEntry) {
      const body = buildWaiverPushBody(recommendations);
      if (body) {
        const pushResult = await sendPushToSubscriptions(pushEntry.subs, {
          title: `Waiver wire upgrades — ${leagueName}`,
          body,
          url: "/waivers",
        });
        if (pushResult.sent > 0) sent = true;
        if (pushResult.failed > 0) failed = true;
      }
    }

    if (sent) result.sent++;
    else if (failed) result.failed++;
    else result.skipped++;
  }

  return result;
}
