import { describe, expect, it } from "vitest";
import { blendRestOfSeason, blendWeek } from "@/lib/projections/consensus";

describe("blendRestOfSeason", () => {
  it("averages ESPN and our model when both exist, tagged as blended", () => {
    const result = blendRestOfSeason(100, 120, null);
    expect(result.value).toBe(110);
    expect(result.source).toBe("blended");
  });

  it("falls back to ESPN alone when our model has nothing", () => {
    const result = blendRestOfSeason(100, null, null);
    expect(result.value).toBe(100);
    expect(result.source).toBe("espn");
  });

  it("falls back to our model alone when ESPN has nothing", () => {
    const result = blendRestOfSeason(null, 120, null);
    expect(result.value).toBe(120);
    expect(result.source).toBe("our_model");
  });

  it("falls back to the pace estimate when neither ESPN nor our model exist", () => {
    const result = blendRestOfSeason(null, null, 80);
    expect(result.value).toBe(80);
    expect(result.source).toBe("pace_estimate");
  });

  it("returns null with no source when nothing exists at all", () => {
    const result = blendRestOfSeason(null, null, null);
    expect(result.value).toBeNull();
    expect(result.source).toBeNull();
  });
});

describe("blendWeek", () => {
  it("averages both sources when present", () => {
    expect(blendWeek(10, 20)).toBe(15);
  });
  it("falls back to whichever single source exists", () => {
    expect(blendWeek(10, null)).toBe(10);
    expect(blendWeek(null, 20)).toBe(20);
  });
  it("returns null when neither exists", () => {
    expect(blendWeek(null, null)).toBeNull();
  });
});
