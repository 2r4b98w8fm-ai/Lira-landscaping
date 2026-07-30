import type { Position } from "@/lib/constants";
import type { SuggestedOffer, TeamNeedsProfile, TradeValue } from "@/types/domain";
import { buildOffer } from "./offers";
import { computeTeamNeeds } from "./needs";
import { scoreOffer, type CandidateTeam } from "./recommend";

export interface TradeChainStep {
  offer: SuggestedOffer;
}

export interface TradeChain {
  steps: TradeChainStep[];
}

const DEFAULT_MAX_HOPS = 2;
const DEFAULT_FAIRNESS_THRESHOLD_PCT = 15;

/**
 * Plans a sequence of up to `maxHops` trades across different teams — not
 * just "your best trade right now" but "do this, then this becomes
 * possible." Each step is built against my roster as it would actually
 * look after every prior step (surplus/need recomputed against the same
 * league-wide replacement-level baseline every step used), so step 2
 * reflects what step 1 really changed rather than pretending step 1 never
 * happened. A team already traded with earlier in the plan isn't offered
 * to again. Stops as soon as no remaining team has a viable trade against
 * my (possibly changed) roster — never pads the plan with a fabricated
 * step.
 */
export function planTradeChain(
  myRoster: TradeValue[],
  myNeeds: TeamNeedsProfile,
  myStartingSlotCounts: Record<string, number>,
  otherTeams: CandidateTeam[],
  avgValuePerStarter: Record<Position, number>,
  maxHops = DEFAULT_MAX_HOPS,
  fairnessThresholdPct = DEFAULT_FAIRNESS_THRESHOLD_PCT
): TradeChain {
  const steps: TradeChainStep[] = [];
  let currentRoster = myRoster;
  let currentNeeds = myNeeds;
  const usedTeamIds = new Set<number>();

  for (let hop = 0; hop < maxHops; hop++) {
    const candidates = otherTeams.filter((t) => !usedTeamIds.has(t.teamId));
    if (candidates.length === 0) break;

    let best: SuggestedOffer | null = null;
    let bestScore = -Infinity;
    for (const team of candidates) {
      const offer = buildOffer({
        myRoster: currentRoster,
        myNeeds: currentNeeds,
        myStartingSlotCounts,
        targetTeamId: team.teamId,
        targetTeamName: team.teamName,
        targetRoster: team.roster,
        targetNeeds: team.needs,
        targetStartingSlotCounts: team.startingSlotCounts,
        fairnessThresholdPct,
      });
      if (!offer) continue;
      const score = scoreOffer(offer, fairnessThresholdPct);
      if (score > bestScore) {
        bestScore = score;
        best = offer;
      }
    }
    if (!best) break;

    steps.push({ offer: best });
    usedTeamIds.add(best.targetTeamId);

    const givenIds = new Set(best.give.map((tv) => tv.player.espnPlayerId));
    currentRoster = [...currentRoster.filter((tv) => !givenIds.has(tv.player.espnPlayerId)), ...best.receive];
    currentNeeds = computeTeamNeeds(myNeeds.teamId, myNeeds.teamName, currentRoster, myStartingSlotCounts, avgValuePerStarter);
  }

  return { steps };
}
