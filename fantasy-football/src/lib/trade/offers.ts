import type { Position } from "@/lib/constants";
import type { SuggestedOffer, TeamNeedsProfile, TradeValue } from "@/types/domain";
import { surplusPlayersAtPosition } from "./needs";

const SIGNIFICANCE_THRESHOLD = 5;
const DEFAULT_FAIRNESS_THRESHOLD_PCT = 15;
const MAX_GIVE_CANDIDATES = 4;
const MAX_RECEIVE_CANDIDATES = 3;
const MAX_GIVE_COMBO_SIZE = 2;
const MAX_RECEIVE_COMBO_SIZE = 2;

function needsMap(profile: TeamNeedsProfile): Map<Position, number> {
  return new Map(profile.needs.map((n) => [n.position, n.surplus]));
}

/** Best position to offer FROM: among spots that are both my surplus and their need, pick whichever is their *most severe* need — a real team accepts a trade that fixes their biggest hole, not just any complementary spot. Falls back to my single biggest surplus if nothing is complementary. */
function pickGivePosition(mine: Map<Position, number>, theirs: Map<Position, number>): Position | null {
  let best: { position: Position; mySurplus: number; theirSurplus: number } | null = null;
  for (const [position, mySurplus] of mine) {
    if (mySurplus <= SIGNIFICANCE_THRESHOLD) continue;
    const theirSurplus = theirs.get(position) ?? 0;
    const isComplementary = theirSurplus < -SIGNIFICANCE_THRESHOLD;
    if (isComplementary && (!best || theirSurplus < best.theirSurplus)) {
      best = { position, mySurplus, theirSurplus };
    }
  }
  if (best) return best.position;

  let fallback: { position: Position; mySurplus: number } | null = null;
  for (const [position, mySurplus] of mine) {
    if (!fallback || mySurplus > fallback.mySurplus) fallback = { position, mySurplus };
  }
  return fallback && fallback.mySurplus > SIGNIFICANCE_THRESHOLD ? fallback.position : null;
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

interface Candidate {
  give: TradeValue[];
  receive: TradeValue[];
  giveValue: number;
  receiveValue: number;
  gap: number;
  /** giveValue - receiveValue. Positive = I'm giving up more than I get, which is what makes a real team likely to say yes. */
  overpay: number;
}

/** The weakest player left on my roster after giving up `given` — never one of the players just received, since recommending you drop what you just got would be nonsensical. Only meaningful when a trade nets you more players than you gave. */
function pickDropCandidate(myRoster: TradeValue[], given: TradeValue[]): TradeValue | null {
  const givenIds = new Set(given.map((tv) => tv.player.espnPlayerId));
  const remaining = myRoster.filter((tv) => !givenIds.has(tv.player.espnPlayerId));
  return remaining.reduce<TradeValue | null>(
    (worst, tv) => (!worst || tv.finalValue < worst.finalValue ? tv : worst),
    null
  );
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
 * target's biggest hole at a complementary position, matched against a
 * receive package from their surplus at one of my weak spots. Searches
 * both 1- and 2-player combinations on *each* side (so a 1-for-2 or 2-for-1
 * shape is on the table, not just 1-for-1 and 2-for-1), and among all of
 * them prefers one where I give up at least as much value as I receive
 * (`favorsThem`) — a real team has no rational reason to accept a trade
 * that's bad for them, so a lopsided offer tilted their way is what
 * actually gets accepted, even though it costs more than a "fair" trade
 * would. Only falls back to the closest available value gap (possibly
 * favoring me) when no such combination exists, and says so plainly. When
 * the chosen shape nets more players than it gives up, also names the
 * weakest remaining roster spot worth dropping to make room. Returns null
 * when there's no real surplus to offer or nothing sensible to ask for —
 * it never invents a trade out of players that aren't actually tradeable
 * depth.
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
  const receiveCombos = combinations(receiveCandidates, MAX_RECEIVE_COMBO_SIZE);

  let bestRealistic: Candidate | null = null;
  let bestFallback: Candidate | null = null;

  for (const receiveCombo of receiveCombos) {
    const receiveValue = receiveCombo.reduce((sum, tv) => sum + tv.finalValue, 0);
    for (const giveCombo of giveCombos) {
      const giveValue = giveCombo.reduce((sum, tv) => sum + tv.finalValue, 0);
      const larger = Math.max(giveValue, receiveValue);
      const gap = larger > 0 ? (Math.abs(giveValue - receiveValue) / larger) * 100 : 0;
      const overpay = giveValue - receiveValue;
      const candidate: Candidate = { give: giveCombo, receive: receiveCombo, giveValue, receiveValue, gap, overpay };

      if (overpay >= 0 && (!bestRealistic || overpay < bestRealistic.overpay)) {
        bestRealistic = candidate;
      }
      if (!bestFallback || gap < bestFallback.gap) {
        bestFallback = candidate;
      }
    }
  }

  const chosen = bestRealistic ?? bestFallback;
  if (!chosen) return null;
  const favorsThem = chosen === bestRealistic;
  const { give: bestGive, receive: bestReceive, giveValue, receiveValue, gap: bestGap } = chosen;

  const dropCandidate = bestReceive.length > bestGive.length ? pickDropCandidate(myRoster, bestGive) : null;

  const rationale = [
    `You offer from your ${givePosition} surplus (${giveCandidates.length} tradeable player(s) beyond your own starting need), targeting ${targetTeamName}'s biggest hole at that position.`,
    `Give: ${bestGive.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")} = ${giveValue.toFixed(1)}.`,
    `Receive: ${bestReceive.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")} = ${receiveValue.toFixed(1)}.`,
    favorsThem
      ? `You give up ${(giveValue - receiveValue).toFixed(1)} more points than you receive — a trade tilted ${targetTeamName}'s way like this is far more realistic to get accepted than one that only helps you.`
      : bestGap <= fairnessThresholdPct
        ? `Value gap ${bestGap.toFixed(1)}% favors you but is within the ${fairnessThresholdPct}% fairness threshold.`
        : `Value gap ${bestGap.toFixed(1)}% favors you and exceeds the ${fairnessThresholdPct}% fairness threshold — ${targetTeamName} likely won't accept this without more from your side.`,
  ];
  if (dropCandidate) {
    rationale.push(
      `This nets you ${bestReceive.length} player(s) for ${bestGive.length} — consider dropping ${dropCandidate.player.name} (${dropCandidate.finalValue.toFixed(1)} val), your weakest remaining bench piece, to make roster room.`
    );
  }

  return {
    targetTeamId,
    targetTeamName,
    give: bestGive,
    receive: bestReceive,
    giveValue,
    receiveValue,
    fairnessGapPct: bestGap,
    favorsThem,
    dropCandidate,
    rationale,
  };
}
