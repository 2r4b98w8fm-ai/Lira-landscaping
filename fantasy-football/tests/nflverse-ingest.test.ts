import { describe, expect, it } from "vitest";
import { computeDefenseVsPosition, type RawStatRow } from "@/lib/nflverse/ingest";

function row(partial: Partial<RawStatRow>): RawStatRow {
  return {
    season: 2026,
    week: 1,
    position: "WR",
    opponentTeam: "BUF",
    fantasyPointsPpr: 10,
    ...partial,
  };
}

describe("computeDefenseVsPosition", () => {
  it("averages points allowed per week and ranks toughest matchup as #1", () => {
    const rows: RawStatRow[] = [
      // BUF allows a lot to WRs across two weeks (two WRs each week)
      row({ opponentTeam: "BUF", position: "WR", week: 1, fantasyPointsPpr: 20 }),
      row({ opponentTeam: "BUF", position: "WR", week: 1, fantasyPointsPpr: 10 }),
      row({ opponentTeam: "BUF", position: "WR", week: 2, fantasyPointsPpr: 15 }),
      row({ opponentTeam: "BUF", position: "WR", week: 2, fantasyPointsPpr: 15 }),
      // NE is stingy against WRs
      row({ opponentTeam: "NE", position: "WR", week: 1, fantasyPointsPpr: 4 }),
      row({ opponentTeam: "NE", position: "WR", week: 2, fantasyPointsPpr: 6 }),
    ];

    const ranked = computeDefenseVsPosition(rows);
    const buf = ranked.find((r) => r.team === "BUF" && r.position === "WR");
    const ne = ranked.find((r) => r.team === "NE" && r.position === "WR");

    expect(buf?.avgPointsAllowedPpr).toBe(30); // (30 + 30) / 2 weeks
    expect(ne?.avgPointsAllowedPpr).toBe(5); // (4 + 6) / 2 weeks
    expect(ne?.rank).toBe(1); // fewest points allowed = toughest matchup
    expect(buf?.rank).toBe(2);
    expect(buf?.weeksSampled).toBe(2);
  });

  it("ranks positions independently of each other", () => {
    const rows: RawStatRow[] = [
      row({ opponentTeam: "BUF", position: "WR", fantasyPointsPpr: 5 }),
      row({ opponentTeam: "BUF", position: "RB", fantasyPointsPpr: 25 }),
    ];
    const ranked = computeDefenseVsPosition(rows);
    const bufWr = ranked.find((r) => r.team === "BUF" && r.position === "WR");
    const bufRb = ranked.find((r) => r.team === "BUF" && r.position === "RB");
    expect(bufWr?.rank).toBe(1);
    expect(bufRb?.rank).toBe(1); // rank is scoped per-position, both can be #1
  });
});
