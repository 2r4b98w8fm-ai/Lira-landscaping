import type { Position } from "@/lib/constants";
import type { FaabBidSuggestion, RosterPlayer, WaiverRecommendation } from "@/types/domain";

/** Real per-team FAAB state, when the league uses one — pass null when it doesn't (rankWaiverWire simply skips bid suggestions). */
export interface FaabState {
  /** League's total budget, from ESPN's own settings. */
  totalBudget: number;
  /** How much of it this team has spent so far, from ESPN's real transaction accounting. Null if ESPN didn't report it (bids then assume the full budget remains, noted in the reasoning). */
  spent: number | null;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

const MIN_BID_PERCENT = 0.01;
const MAX_BID_PERCENT = 0.4;
/** How much of your remaining budget one rest-of-season point of value added is "worth" — a documented heuristic, not a market-clearing price nobody can actually know in advance. */
const VALUE_TO_PERCENT_SCALE = 0.02;

/**
 * A transparent starting-bid suggestion, not a promise of what it'll take
 * to win the wire — scales with how big a real upgrade this player is
 * (valueAdded) as a percent of what you actually have left to spend,
 * floored at 1% and capped at 40% of remaining budget so one add never
 * eats your whole season.
 */
export function suggestFaabBid(valueAdded: number, faab: FaabState): FaabBidSuggestion | null {
  if (valueAdded <= 0) return null;
  const remaining = faab.spent === null ? faab.totalBudget : Math.max(0, faab.totalBudget - faab.spent);
  if (remaining <= 0) return null;

  const percent = clamp(valueAdded * VALUE_TO_PERCENT_SCALE, MIN_BID_PERCENT, MAX_BID_PERCENT);
  const suggestedBid = Math.min(remaining, Math.max(1, Math.round(remaining * percent)));
  const remainingNote =
    faab.spent === null
      ? `assuming your full $${faab.totalBudget} budget remains (ESPN didn't report what you've spent)`
      : `your real $${remaining} remaining of a $${faab.totalBudget} budget`;

  return {
    suggestedBid,
    percentOfRemaining: percent,
    reasoning: `~${(percent * 100).toFixed(0)}% of ${remainingNote}, scaled to ${valueAdded.toFixed(1)} rest-of-season points of value added (floor 1%, cap 40% of what's left on any single add).`,
  };
}

/**
 * The rest-of-season projection of the worst player you currently start at
 * a position — the bar a waiver add has to clear to be a real upgrade, not
 * just "a name you recognize." If you don't even roster enough players to
 * fill the position's starting slots, the bar is 0: literally anything
 * playable is an upgrade.
 */
function myWorstStarterValue(
  myRoster: RosterPlayer[],
  position: Position,
  startingRequirement: number
): number {
  if (startingRequirement <= 0) return 0;
  const atPosition = myRoster
    .filter((p) => p.position === position)
    .sort((a, b) => (b.restOfSeasonProjection ?? 0) - (a.restOfSeasonProjection ?? 0));

  if (atPosition.length < startingRequirement) return 0;
  return atPosition[startingRequirement - 1]?.restOfSeasonProjection ?? 0;
}

/**
 * Ranks the free-agent pool by rest-of-season value added over your worst
 * current starter at that position — never a made-up "top available
 * players" list, and a free agent with no usable projection sorts last
 * with an explicit note rather than being silently dropped.
 */
export function rankWaiverWire(
  myRoster: RosterPlayer[],
  freeAgentPool: RosterPlayer[],
  startingSlotCounts: Record<string, number>,
  faab: FaabState | null = null
): WaiverRecommendation[] {
  const worstStarterByPosition = new Map<Position, number>();

  const recommendations: WaiverRecommendation[] = freeAgentPool.map((player) => {
    let threshold = worstStarterByPosition.get(player.position);
    if (threshold === undefined) {
      threshold = myWorstStarterValue(myRoster, player.position, startingSlotCounts[player.position] ?? 0);
      worstStarterByPosition.set(player.position, threshold);
    }

    const reasoning: string[] = [];
    let valueAdded: number | null = null;

    if (player.restOfSeasonProjection === null) {
      reasoning.push("No rest-of-season projection available for this player.");
    } else {
      valueAdded = player.restOfSeasonProjection - threshold;
      reasoning.push(
        `Projected ${player.restOfSeasonProjection.toFixed(1)} rest-of-season pts vs. your worst rostered ${player.position} at ${threshold.toFixed(1)}.`
      );
      reasoning.push(
        valueAdded > 0
          ? `A real upgrade: +${valueAdded.toFixed(1)} pts over what you're currently starting there.`
          : `Not an upgrade — your current worst starter still projects higher.`
      );
    }

    if (player.injuryStatus !== "ACTIVE" && player.injuryStatus !== "UNKNOWN") {
      reasoning.push(`Injury status: ${player.injuryStatus}.`);
    }

    const faabBid = valueAdded !== null && faab ? suggestFaabBid(valueAdded, faab) : null;

    return { player, myWorstStarterValue: threshold, valueAdded, reasoning, faabBid };
  });

  recommendations.sort((a, b) => (b.valueAdded ?? -Infinity) - (a.valueAdded ?? -Infinity));
  return recommendations;
}
