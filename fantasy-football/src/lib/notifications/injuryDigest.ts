import type { RosterPlayer } from "@/types/domain";

export interface InjuryChange {
  espnPlayerId: number;
  name: string;
  position: string;
  oldStatus: string;
  newStatus: string;
}

/** Keyed by espnPlayerId as a string (JSON object keys are always strings, including through a jsonb column round-trip) so callers never have to think about the coercion. */
export type InjurySnapshot = Record<string, string>;

export function snapshotInjuryStatuses(roster: RosterPlayer[]): InjurySnapshot {
  return Object.fromEntries(roster.map((p) => [String(p.espnPlayerId), p.injuryStatus]));
}

/**
 * Compares a roster's current injury statuses against the last snapshot we
 * emailed about. A player with no prior snapshot entry (new to the roster,
 * or this is the very first digest) is never reported as "changed" — there
 * would be nothing true to compare against.
 */
export function diffInjuryStatuses(previous: InjurySnapshot, roster: RosterPlayer[]): InjuryChange[] {
  const changes: InjuryChange[] = [];
  for (const player of roster) {
    const old = previous[String(player.espnPlayerId)];
    if (old !== undefined && old !== player.injuryStatus) {
      changes.push({
        espnPlayerId: player.espnPlayerId,
        name: player.name,
        position: player.position,
        oldStatus: old,
        newStatus: player.injuryStatus,
      });
    }
  }
  return changes;
}

/** Null when there's nothing to report — callers should skip sending rather than mail an empty digest. */
export function buildInjuryDigestHtml(leagueName: string, changes: InjuryChange[]): string | null {
  if (changes.length === 0) return null;

  const rows = changes
    .map((c) => `<li><b>${c.name}</b> (${c.position}): ${c.oldStatus} → ${c.newStatus}</li>`)
    .join("");

  return `
    <div>
      <p>Injury status changes on your ${leagueName} roster:</p>
      <ul>${rows}</ul>
      <p style="color:#666;font-size:12px;">Sent by Gridiron Desk. Status comes straight from ESPN's own data.</p>
    </div>
  `.trim();
}
