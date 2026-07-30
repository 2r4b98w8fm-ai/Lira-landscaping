import type { InjuryStatus } from "@/types/domain";

/**
 * Shared across trade value and our own projection model so an injury
 * discount always means the same thing everywhere in the app.
 */
export const INJURY_MULTIPLIER: Record<InjuryStatus, number> = {
  ACTIVE: 1.0,
  UNKNOWN: 1.0,
  QUESTIONABLE: 0.9,
  DOUBTFUL: 0.75,
  OUT: 0.4,
  IR: 0.15,
  SUSPENSION: 0.5,
};
