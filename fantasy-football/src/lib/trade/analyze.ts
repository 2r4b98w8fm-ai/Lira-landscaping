import type { TradeAnalysis, TradeSide, TradeValue } from "@/types/domain";

const FAIR_THRESHOLD_PCT = 10;
const LOPSIDED_THRESHOLD_PCT = 25;

function buildSide(teamId: number, teamName: string, players: TradeValue[]): TradeSide {
  return {
    teamId,
    teamName,
    players,
    totalValue: players.reduce((sum, p) => sum + p.finalValue, 0),
  };
}

export function analyzeTrade(
  teamA: { id: number; name: string },
  playersA: TradeValue[],
  teamB: { id: number; name: string },
  playersB: TradeValue[]
): TradeAnalysis {
  const sideA = buildSide(teamA.id, teamA.name, playersA);
  const sideB = buildSide(teamB.id, teamB.name, playersB);

  const larger = Math.max(sideA.totalValue, sideB.totalValue);
  const smaller = Math.min(sideA.totalValue, sideB.totalValue);
  const fairnessGapPct = larger > 0 ? ((larger - smaller) / larger) * 100 : 0;

  const favors: TradeAnalysis["favors"] =
    sideA.totalValue === sideB.totalValue ? "even" : sideA.totalValue > sideB.totalValue ? "A" : "B";

  const reasoning = [
    `${sideA.teamName} gives up ${sideA.totalValue.toFixed(1)} pts of value, receives ${sideB.totalValue.toFixed(1)}.`,
    `${sideB.teamName} gives up ${sideB.totalValue.toFixed(1)} pts of value, receives ${sideA.totalValue.toFixed(1)}.`,
    `Gap: ${fairnessGapPct.toFixed(1)}% of the larger side's value.`,
  ];

  let verdict: string;
  if (favors === "even" || fairnessGapPct < FAIR_THRESHOLD_PCT) {
    verdict = "Fair trade — the value gap is small enough to come down to team need rather than value.";
  } else if (fairnessGapPct < LOPSIDED_THRESHOLD_PCT) {
    verdict = `Leans toward ${favors === "A" ? sideA.teamName : sideB.teamName} — worth negotiating, not necessarily rejecting.`;
  } else {
    verdict = `Lopsided toward ${favors === "A" ? sideA.teamName : sideB.teamName} — would need real positional need to justify.`;
  }

  return { sideA, sideB, fairnessGapPct, favors, verdict, reasoning };
}
