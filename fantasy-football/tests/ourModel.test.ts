import { describe, expect, it } from "vitest";
import { computeOurModelProjection, type OurModelInput } from "@/lib/projections/ourModel";
import type { DefenseRanking } from "@/types/domain";

function baseInput(partial: Partial<OurModelInput>): OurModelInput {
  return {
    position: "WR",
    injuryStatus: "ACTIVE",
    gameLog: [],
    thisWeekOpponent: null,
    remainingOpponents: [],
    defenseRankings: [],
    ...partial,
  };
}

describe("computeOurModelProjection", () => {
  it("produces no projection when there's no real game log", () => {
    const result = computeOurModelProjection(baseInput({ gameLog: [] }));
    expect(result.perGameRate).toBeNull();
    expect(result.weekProjection).toBeNull();
    expect(result.restOfSeasonProjection).toBeNull();
    expect(result.reasoning[0]).toMatch(/no real game log/i);
  });

  it("weights the most recent of the last 3 games heaviest", () => {
    const result = computeOurModelProjection(
      baseInput({
        gameLog: [
          { week: 1, fantasyPointsPpr: 10 },
          { week: 2, fantasyPointsPpr: 20 },
          { week: 3, fantasyPointsPpr: 30 },
        ],
      })
    );
    // (10*1 + 20*2 + 30*3) / (1+2+3) = 140/6
    expect(result.perGameRate).toBeCloseTo(140 / 6, 5);
  });

  it("only uses the last 3 games even with a longer history", () => {
    const result = computeOurModelProjection(
      baseInput({
        gameLog: [
          { week: 1, fantasyPointsPpr: 100 }, // should be ignored
          { week: 2, fantasyPointsPpr: 10 },
          { week: 3, fantasyPointsPpr: 20 },
          { week: 4, fantasyPointsPpr: 30 },
        ],
      })
    );
    expect(result.perGameRate).toBeCloseTo(140 / 6, 5);
  });

  it("discounts both week and rest-of-season projections for an injured player", () => {
    const healthy = computeOurModelProjection(
      baseInput({
        gameLog: [{ week: 1, fantasyPointsPpr: 20 }],
        thisWeekOpponent: "NE",
        remainingOpponents: ["NE", "BUF"],
        injuryStatus: "ACTIVE",
      })
    );
    const questionable = computeOurModelProjection(
      baseInput({
        gameLog: [{ week: 1, fantasyPointsPpr: 20 }],
        thisWeekOpponent: "NE",
        remainingOpponents: ["NE", "BUF"],
        injuryStatus: "QUESTIONABLE",
      })
    );
    expect(questionable.weekProjection!).toBeLessThan(healthy.weekProjection!);
    expect(questionable.restOfSeasonProjection!).toBeLessThan(healthy.restOfSeasonProjection!);
  });

  it("adjusts the week projection favorably against a weak defense", () => {
    const defenseRankings: DefenseRanking[] = [
      { team: "MIA", position: "WR", avgPointsAllowedPpr: 30, rank: 32, weeksSampled: 5 },
      { team: "NE", position: "WR", avgPointsAllowedPpr: 5, rank: 1, weeksSampled: 5 },
    ];
    const vsWeak = computeOurModelProjection(
      baseInput({ gameLog: [{ week: 1, fantasyPointsPpr: 20 }], thisWeekOpponent: "MIA", defenseRankings })
    );
    const vsStrong = computeOurModelProjection(
      baseInput({ gameLog: [{ week: 1, fantasyPointsPpr: 20 }], thisWeekOpponent: "NE", defenseRankings })
    );
    expect(vsWeak.weekProjection!).toBeGreaterThan(vsStrong.weekProjection!);
  });

  it("returns no week projection on a bye (no opponent)", () => {
    const result = computeOurModelProjection(
      baseInput({ gameLog: [{ week: 1, fantasyPointsPpr: 20 }], thisWeekOpponent: null })
    );
    expect(result.weekProjection).toBeNull();
  });

  it("returns a zero rest-of-season projection with no games remaining", () => {
    const result = computeOurModelProjection(
      baseInput({ gameLog: [{ week: 1, fantasyPointsPpr: 20 }], remainingOpponents: [] })
    );
    expect(result.restOfSeasonProjection).toBe(0);
  });
});
