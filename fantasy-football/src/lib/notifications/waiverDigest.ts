import type { WaiverRecommendation } from "@/types/domain";

const MIN_VALUE_ADDED_TO_MENTION = 5;
const MAX_PLAYERS_PER_DIGEST = 8;

/**
 * Null when nothing on the waiver wire clears the bar — callers should
 * skip sending rather than mail "nothing worth adding this week."
 */
export function buildWaiverDigestHtml(leagueName: string, recommendations: WaiverRecommendation[]): string | null {
  const worthMentioning = recommendations
    .filter((r) => (r.valueAdded ?? 0) > MIN_VALUE_ADDED_TO_MENTION)
    .sort((a, b) => (b.valueAdded ?? 0) - (a.valueAdded ?? 0))
    .slice(0, MAX_PLAYERS_PER_DIGEST);

  if (worthMentioning.length === 0) return null;

  const rows = worthMentioning
    .map(
      (r) =>
        `<li><b>${r.player.name}</b> (${r.player.position}, ${r.player.nflTeam}): +${r.valueAdded!.toFixed(1)} pts over your current worst starter there</li>`
    )
    .join("");

  return `
    <div>
      <p>Real upgrades available on the ${leagueName} waiver wire, as of the last sync:</p>
      <ul>${rows}</ul>
      <p style="color:#666;font-size:12px;">Sent by Gridiron Desk. Values are rest-of-season projections, not a guarantee.</p>
    </div>
  `.trim();
}
