import { describe, expect, it } from "vitest";
import { computeConsistency } from "@/lib/analytics/consistency";

describe("computeConsistency", () => {
  it("labels a tight week-to-week spread as a consistent floor", () => {
    const rating = computeConsistency([18, 19, 20, 21, 22]); // mean 20, sample stdev ~1.58, CV ~0.079
    expect(rating).not.toBeNull();
    expect(rating!.label).toBe("Consistent floor");
    expect(rating!.mean).toBeCloseTo(20, 5);
  });

  it("labels a wide week-to-week spread as boom/bust", () => {
    const rating = computeConsistency([2, 30, 3, 28, 4]); // mean 13.4, high spread relative to mean
    expect(rating).not.toBeNull();
    expect(rating!.label).toBe("Boom/bust");
  });

  it("labels a middling spread as moderate", () => {
    const rating = computeConsistency([8, 12, 16, 10, 14]); // mean 12, sample stdev ~3.16, CV ~0.26
    expect(rating).not.toBeNull();
    expect(rating!.label).toBe("Moderate");
  });

  it("returns null without at least 3 games of history", () => {
    expect(computeConsistency([10, 12])).toBeNull();
    expect(computeConsistency([])).toBeNull();
  });

  it("returns null when the mean is zero rather than dividing by zero", () => {
    expect(computeConsistency([0, 0, 0])).toBeNull();
  });
});
