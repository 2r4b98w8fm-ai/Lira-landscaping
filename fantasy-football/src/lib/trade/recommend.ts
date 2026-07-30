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
 * Shared ranking score for any built offer — bigger, more substantive
 * trades score higher; a value gap beyond the fairness threshold and a
 * trade that only looks good because I'm winning (favorsThem: false) both
 * take a discount. Used both to rank across every team here and, in
 * trade/chain.ts, to pick the best next hop in a multi-step plan.
 */
export function scoreOffer(offer: SuggestedOffer, fairnessThresholdPct = DEFAULT_FAIRNESS_THRESHOLD_PCT): number {
  const substantive = (offer.giveValue + offer.receiveValue) / 2;
  const fairnessPenalty = Math.max(0, offer.fairnessGapPct - fairnessThresholdPct);
  const unrealisticPenalty = offer.favorsThem ? 0 : substantive * 0.15;
  return substantive - fairnessPenalty * 2 - unrealisticPenalty;
}

/**
 * Builds the single best offer against every other team in the league
 * (reusing buildOffer's give/receive search) and ranks all of them
 * together into one prioritized "trades you should make" list. Bigger,
 * more substantive trades rank first; a lopsided ask that exceeds the
 * fairness threshold is penalized rather than excluded outright, since a
 * team might still take a slightly uneven deal if it fills a real need.
 * Trades that only look good because I'm the one winning value
 * (`favorsThem: false`) take an extra discount on top of that — buildOffer
 * only produces those when no realistic (their-favor-or-fair) combination
 * existed at all, so they're the least likely to actually get accepted.
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

    candidates.push({ ...offer, score: scoreOffer(offer, fairnessThresholdPct) });
  }

  return candidates.sort((a, b) => b.score - a.score).slice(0, MAX_RECOMMENDATIONS);
}
