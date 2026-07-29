import { describe, expect, it } from "vitest";
import { parseEspnCookiePaste } from "@/lib/espnCookieParse";

describe("parseEspnCookiePaste", () => {
  it("extracts both values from a full cookie header paste", () => {
    const raw = "espn_s2=AEA1abc%2F...longvalue...xyz; SWID={ABCD1234-5678-90AB-CDEF-1234567890AB};";
    const result = parseEspnCookiePaste(raw);
    expect(result.espnS2).toBe("AEA1abc%2F...longvalue...xyz");
    expect(result.swid).toBe("{ABCD1234-5678-90AB-CDEF-1234567890AB}");
  });

  it("adds missing curly braces around a bare SWID GUID", () => {
    const result = parseEspnCookiePaste("SWID=ABCD1234-5678-90AB-CDEF-1234567890AB");
    expect(result.swid).toBe("{ABCD1234-5678-90AB-CDEF-1234567890AB}");
  });

  it("detects a bare SWID GUID pasted with no key= prefix at all", () => {
    const result = parseEspnCookiePaste("ABCD1234-5678-90AB-CDEF-1234567890AB");
    expect(result.swid).toBe("{ABCD1234-5678-90AB-CDEF-1234567890AB}");
    expect(result.espnS2).toBeNull();
  });

  it("detects a bare espn_s2 value pasted with no key= prefix", () => {
    const longValue = "A".repeat(80);
    const result = parseEspnCookiePaste(longValue);
    expect(result.espnS2).toBe(longValue);
    expect(result.swid).toBeNull();
  });

  it("trims stray whitespace and newlines from a multi-line paste", () => {
    const raw = "  espn_s2=abcXYZ123\nSWID={11111111-1111-1111-1111-111111111111}\n  ";
    const result = parseEspnCookiePaste(raw);
    expect(result.espnS2).toBe("abcXYZ123");
    expect(result.swid).toBe("{11111111-1111-1111-1111-111111111111}");
  });

  it("returns nulls for text that matches neither pattern, rather than a wrong guess", () => {
    const result = parseEspnCookiePaste("hello world");
    expect(result.espnS2).toBeNull();
    expect(result.swid).toBeNull();
  });
});
