import type { Position } from "@/lib/constants";
import type { SuggestedOffer, TeamNeedsProfile, TradeValue } from "@/types/domain";
import { surplusPlayersAtPosition } from "./needs";

const SIGNIFICANCE_THRESHOLD = 5;
const DEFAULT_FAIRNESS_THRESHOLD_PCT = 15;
const MAX_GIVE_CANDIDATES = 4;
const MAX_RECEIVE_CANDIDATES = 3;
const MAX_GIVE_COMBO_SIZE = 2;

function needsMap(profile: TeamNeedsProfile): Map<Position, number> {
  return new Map(profile.needs.map((n) => [n.position, n.surplus]));
}

/** Best position to offer FROM: prefer a spot that's both my surplus and their need; fall back to my single biggest surplus. */
function pickGivePosition(mine: Map<Position, number>, theirs: Map<Position, number>): Position | null {
  let best: { position: Position; surplus: number } | null = null;
  for (const [position, mySurplus] of mine) {
    if (mySurplus <= SIGNIFICANCE_THRESHOLD) continue;
    const theirSurplus = theirs.get(position) ?? 0;
    const isComplementary = theirSurplus < -SIGNIFICANCE_THRESHOLD;
    if (isComplementary && (!best || mySurplus > best.surplus)) {
      best = { position, surplus: mySurplus };
    }
  }
  if (best) return best.position;

  for (const [position, mySurplus] of mine) {
    if (!best || mySurplus > best.surplus) best = { position, surplus: mySurplus };
  }
  return best && best.surplus > SIGNIFICANCE_THRESHOLD ? best.position : null;
}

/** Best position to ask FOR: prefer their surplus at a spot that's my need; fall back to their single biggest surplus. */
function pickReceivePosition(mine: Map<Position, number>, theirs: Map<Position, number>): Position | null {
  let best: { position: Position; surplus: number } | null = null;
  for (const [position, theirSurplus] of theirs) {
    if (theirSurplus <= SIGNIFICANCE_THRESHOLD) continue;
    const mySurplus = mine.get(position) ?? 0;
    const isComplementary = mySurplus < -SIGNIFICANCE_THRESHOLD;
    if (isComplementary && (!best || theirSurplus > best.surplus)) {
      best = { position, surplus: theirSurplus };
    }
  }
  if (best) return best.position;

  for (const [position, theirSurplus] of theirs) {
    if (!best || theirSurplus > best.surplus) best = { position, surplus: theirSurplus };
  }
  return best && best.surplus > SIGNIFICANCE_THRESHOLD ? best.position : null;
}

function combinations<T>(items: T[], maxSize: number): T[][] {
  const results: T[][] = [];
  for (const item of items) results.push([item]);
  if (maxSize >= 2) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        if (a !== undefined && b !== undefined) results.push([a, b]);
      }
    }
  }
  return results;
}

export interface BuildOfferParams {
  myRoster: TradeValue[];
  myNeeds: TeamNeedsProfile;
  myStartingSlotCounts: Record<string, number>;
  targetTeamId: number;
  targetTeamName: string;
  targetRoster: TradeValue[];
  targetNeeds: TeamNeedsProfile;
  targetStartingSlotCounts: Record<string, number>;
  fairnessThresholdPct?: number;
}

/**
 * Builds a plausible trade package from my roster's surplus toward a
 * target's weak spot, matched against a receive package from their
 * surplus at one of my weak spots, picking whichever give/receive
 * combination lands closest to fair value. Returns null when there's no
 * real surplus to offer or nothing sensible to ask for — it never invents
 * a trade out of players that aren't actually tradeable depth.
 */
export function buildOffer(params: BuildOfferParams): SuggestedOffer | null {
  const {
    myRoster,
    myNeeds,
    myStartingSlotCounts,
    targetTeamId,
    targetTeamName,
    targetRoster,
    targetNeeds,
    targetStartingSlotCounts,
    fairnessThresholdPct = DEFAULT_FAIRNESS_THRESHOLD_PCT,
  } = params;

  const mine = needsMap(myNeeds);
  const theirs = needsMap(targetNeeds);

  const givePosition = pickGivePosition(mine, theirs);
  const receivePosition = pickReceivePosition(mine, theirs);
  if (!givePosition || !receivePosition) return null;

  const giveCandidates = surplusPlayersAtPosition(
    myRoster,
    givePosition,
    myStartingSlotCounts[givePosition] ?? 0
  ).slice(0, MAX_GIVE_CANDIDATES);
  const receiveCandidates = surplusPlayersAtPosition(
    targetRoster,
    receivePosition,
    targetStartingSlotCounts[receivePosition] ?? 0
  ).slice(0, MAX_RECEIVE_CANDIDATES);

  if (giveCandidates.length === 0 || receiveCandidates.length === 0) return null;

  const giveCombos = combinations(giveCandidates, MAX_GIVE_COMBO_SIZE);

  let bestGive: TradeValue[] | null = null;
  let bestReceive: TradeValue[] | null = null;
  let bestGap = Infinity;

  for (const receivePlayer of receiveCandidates) {
    const receiveValue = receivePlayer.finalValue;
    for (const giveCombo of giveCombos) {
      const giveValue = giveCombo.reduce((sum, tv) => sum + tv.finalValue, 0);
      const larger = Math.max(giveValue, receiveValue);
      const gap = larger > 0 ? (Math.abs(giveValue - receiveValue) / larger) * 100 : 0;
      if (gap < bestGap) {
        bestGap = gap;
        bestGive = giveCombo;
        bestReceive = [receivePlayer];
      }
    }
  }

  if (!bestGive || !bestReceive) return null;

  const giveValue = bestGive.reduce((sum, tv) => sum + tv.finalValue, 0);
  const receiveValue = bestReceive.reduce((sum, tv) => sum + tv.finalValue, 0);

  const rationale = [
    `You offer from your ${givePosition} surplus (${giveCandidates.length} tradeable player(s) beyond your own starting need) for their ${receivePosition} surplus.`,
    `Give: ${bestGive.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")} = ${giveValue.toFixed(1)}.`,
    `Receive: ${bestReceive.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")} = ${receiveValue.toFixed(1)}.`,
    bestGap <= fairnessThresholdPct
      ? `Value gap ${bestGap.toFixed(1)}% is within the ${fairnessThresholdPct}% fairness threshold.`
      : `Value gap ${bestGap.toFixed(1)}% exceeds the ${fairnessThresholdPct}% fairness threshold — ${targetTeamName} may want more, or this is a reach.`,
  ];

  return {
    targetTeamId,
    targetTeamName,
    give: bestGive,
    receive: bestReceive,
    giveValue,
    receiveValue,
    fairnessGapPct: bestGap,
    rationale,
  };
}
