import { describe, expect, it } from "vitest";
import { computePositionVariance } from "@/lib/nflverse/variance";
import type { RawStatRow } from "@/lib/nflverse/ingest";

function row(partial: Partial<RawStatRow>): RawStatRow {
  return {
    season: 2026,
    week: 1,
    position: "WR",
    nflTeam: "MIA",
    opponentTeam: "BUF",
    fantasyPointsPpr: 10,
    gsisId: "00-0000001",
    playerName: "Test Player",
    ...partial,
  };
}

describe("computePositionVariance", () => {
  it("computes real mean and stdev from player-week fantasy points", () => {
    const rows: RawStatRow[] = [
      row({ position: "WR", fantasyPointsPpr: 10 }),
      row({ position: "WR", fantasyPointsPpr: 20 }),
      row({ position: "WR", fantasyPointsPpr: 30 }),
    ];
    const [wr] = computePositionVariance(rows);
    expect(wr?.meanPpr).toBe(20);
    expect(wr?.stdevPpr).toBeCloseTo(10, 5); // sample stdev of [10,20,30]
    expect(wr?.sampleSize).toBe(3);
  });

  it("skips a position with fewer than 2 samples rather than reporting a fake variance", () => {
    const rows: RawStatRow[] = [row({ position: "TE", fantasyPointsPpr: 5 })];
    const result = computePositionVariance(rows);
    expect(result.find((r) => r.position === "TE")).toBeUndefined();
  });

  it("keeps positions independent of each other", () => {
    const rows: RawStatRow[] = [
      row({ position: "WR", fantasyPointsPpr: 10 }),
      row({ position: "WR", fantasyPointsPpr: 10 }),
      row({ position: "RB", fantasyPointsPpr: 100 }),
      row({ position: "RB", fantasyPointsPpr: 100 }),
    ];
    const result = computePositionVariance(rows);
    const wr = result.find((r) => r.position === "WR");
    const rb = result.find((r) => r.position === "RB");
    expect(wr?.meanPpr).toBe(10);
    expect(rb?.meanPpr).toBe(100);
  });
});
