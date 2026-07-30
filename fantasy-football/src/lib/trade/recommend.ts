import type { SuggestedOffer, TeamNeedsProfile, TradeValue } from "@/types/domain";
import { buildOffer } from "./offers";

export interface RecommendedTrade extends SuggestedOffer {
  /** Combined ranking score across every candidate trade league-wide — not just "your best shot at team X" but "of everything possible, pursue these first." */
  score: number;
}

const MAX_RECOMMENDATIONS = 5;
const DEFAULT_FAIRNESS_THRESHOLD_PCT = 15;

export interface CandidateTeam {
  teamId: number;
  teamName: string;
  roster: TradeValue[];
  needs: TeamNeedsProfile;
  startingSlotCounts: Record<string, number>;
}

/**
 * Builds the single best offer against every other team in the league
 * (reusing buildOffer's give/receive search) and ranks all of them
 * together into one prioritized "trades you should make" list. Bigger,
 * more substantive trades rank first; a lopsided ask that exceeds the
 * fairness threshold is penalized rather than excluded outright, since a
 * team might still take a slightly uneven deal if it fills a real need.
 * Never fabricates a trade — a team with nothing complementary to offer
 * simply produces no candidate, same as buildOffer's own null case.
 */
export function recommendTrades(
  myRoster: TradeValue[],
  myNeeds: TeamNeedsProfile,
  myStartingSlotCounts: Record<string, number>,
  otherTeams: CandidateTeam[],
  fairnessThresholdPct = DEFAULT_FAIRNESS_THRESHOLD_PCT
): RecommendedTrade[] {
  const candidates: RecommendedTrade[] = [];

  for (const team of otherTeams) {
    const offer = buildOffer({
      myRoster,
      myNeeds,
      myStartingSlotCounts,
      targetTeamId: team.teamId,
      targetTeamName: team.teamName,
      targetRoster: team.roster,
      targetNeeds: team.needs,
      targetStartingSlotCounts: team.startingSlotCounts,
      fairnessThresholdPct,
    });
    if (!offer) continue;

    const substantive = (offer.giveValue + offer.receiveValue) / 2;
    const fairnessPenalty = Math.max(0, offer.fairnessGapPct - fairnessThresholdPct);
    const score = substantive - fairnessPenalty * 2;

    candidates.push({ ...offer, score });
  }

  return candidates.sort((a, b) => b.score - a.score).slice(0, MAX_RECOMMENDATIONS);
}
