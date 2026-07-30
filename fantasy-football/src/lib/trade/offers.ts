import type { Position } from "@/lib/constants";
import type { SuggestedOffer, TeamNeedsProfile, TradeValue } from "@/types/domain";
import { surplusPlayersAtPosition } from "./needs";

const SIGNIFICANCE_THRESHOLD = 5;
const DEFAULT_FAIRNESS_THRESHOLD_PCT = 15;
/**
 * How many of each side's tradeable-depth players get considered at all —
 * not a cap on package size (a package can use every one of them if that's
 * what's beneficial), just a bound on how deep into someone's bench this
 * looks before giving up. Kept small enough that trying every subset of
 * each side (2^n) stays instant even multiplied together.
 */
const MAX_GIVE_CANDIDATES = 5;
const MAX_RECEIVE_CANDIDATES = 5;

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

/** Every non-empty subset of `items` (1 player up to all of them) — a package trades "as many as is beneficial," not a fixed 1- or 2-player shape. Fine to enumerate by bitmask since `items` is already capped small by MAX_*_CANDIDATES. */
function combinations<T>(items: T[]): T[][] {
  const results: T[][] = [];
  const n = items.length;
  for (let mask = 1; mask < 1 << n; mask++) {
    const combo: T[] = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        const item = items[i];
        if (item !== undefined) combo.push(item);
      }
    }
    results.push(combo);
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

/** The `count` weakest players left on my roster after giving up `given` — never one of the players just received, since recommending you drop what you just got would be nonsensical. `count` is however many net players the trade adds (receive.length - give.length), so the roster comes back into balance. */
function pickDropCandidates(myRoster: TradeValue[], given: TradeValue[], count: number): TradeValue[] {
  const givenIds = new Set(given.map((tv) => tv.player.espnPlayerId));
  return myRoster
    .filter((tv) => !givenIds.has(tv.player.espnPlayerId))
    .sort((a, b) => a.finalValue - b.finalValue)
    .slice(0, count);
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
 * every subset of each side's tradeable depth (1 player up to all of it —
 * as many as is actually beneficial, not a fixed 1- or 2-player shape),
 * and among all of them prefers one where I give up at least as much
 * value as I receive (`favorsThem`) — a real team has no rational reason
 * to accept a trade that's bad for them, so a lopsided offer tilted their
 * way is what actually gets accepted, even though it costs more than a
 * "fair" trade would. Only falls back to the closest available value gap
 * (possibly favoring me) when no such combination exists, and says so
 * plainly. When the chosen shape nets more players than it gives up, also
 * names however many of the weakest remaining roster spots are needed to
 * bring the roster back into balance. Returns null when there's no real
 * surplus to offer or nothing sensible to ask for — it never invents a
 * trade out of players that aren't actually tradeable depth.
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

  const giveCombos = combinations(giveCandidates);
  const receiveCombos = combinations(receiveCandidates);

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

  const dropCount = bestReceive.length - bestGive.length;
  const dropCandidates = dropCount > 0 ? pickDropCandidates(myRoster, bestGive, dropCount) : [];

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
  if (dropCandidates.length > 0) {
    rationale.push(
      `This nets you ${bestReceive.length} player(s) for ${bestGive.length} — consider dropping ${dropCandidates.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")}, your weakest remaining bench piece(s), to make roster room.`
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
    dropCandidates,
    rationale,
  };
}
