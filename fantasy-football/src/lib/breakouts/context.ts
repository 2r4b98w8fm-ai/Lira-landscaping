import type { Position } from "@/lib/constants";
import {
  getAllTeamRosters,
  getCrosswalkForPlayers,
  getFreeAgentsForLeague,
  getOpportunityGameLog,
  getSnapCountLog,
  getTeamSnapCounts,
} from "@/lib/db/queries";
import { computeBreakoutScore, recommendationFor, type BreakoutRecommendation, type BreakoutResult } from "@/lib/breakouts/engine";
import type { RosterPlayer } from "@/types/domain";

const BREAKOUT_POSITIONS: Position[] = ["RB", "WR", "TE"];

export interface PlayerAverages {
  gamesPlayed: number;
  pointsPerGame: number;
  touchesPerGame: number;
  /** Average offensive snap share across every game we have snap-count data for. Null if this player never resolved to a snap-count row (crosswalk/name-match miss). */
  avgSnapPct: number | null;
}

export interface BreakoutEntry {
  player: RosterPlayer;
  rosteredBy: string | null;
  rosteredByTeamId: number | null;
  averages: PlayerAverages;
  /** Null when there isn't enough game history (5+ games) to trust a trend yet — never a guessed score. */
  breakout: BreakoutResult | null;
  recommendation: BreakoutRecommendation | null;
}

export interface TeamSnapSummary {
  team: string;
  avgSnapsPerGame: number;
  gamesTracked: number;
}

/**
 * Every RB/WR/TE in the league universe (rostered + free agents), scored
 * for breakout likelihood from real usage data — snap-share trend, touch
 * trend, efficiency vs the position average, and production lagging role —
 * see lib/breakouts/engine.ts for exactly how each point is earned. A
 * player without a Sleeper crosswalk match or without 5+ games of history
 * still shows their real season averages, just with `breakout: null` —
 * we never fabricate a confidence score we can't back up with data.
 */
export async function buildBreakoutBoard(
  leagueRowId: number,
  season: number,
  currentWeek: number,
  myTeamId: number
): Promise<{ entries: BreakoutEntry[]; teamSnapCounts: TeamSnapSummary[] }> {
  const teamRosters = await getAllTeamRosters(leagueRowId, season, currentWeek);
  const freeAgentPool = await getFreeAgentsForLeague(leagueRowId, season, currentWeek);

  const candidateEntries: Array<{ player: RosterPlayer; rosteredBy: string | null; rosteredByTeamId: number | null }> = [
    ...teamRosters.flatMap((t) =>
      t.roster
        .filter((p) => BREAKOUT_POSITIONS.includes(p.position))
        .map((player) => ({ player, rosteredBy: t.teamName, rosteredByTeamId: t.teamId }))
    ),
    ...freeAgentPool
      .filter((p) => BREAKOUT_POSITIONS.includes(p.position))
      .map((player) => ({ player, rosteredBy: null, rosteredByTeamId: null })),
  ];

  const espnIds = candidateEntries.map((e) => e.player.espnPlayerId);
  const crosswalk = await getCrosswalkForPlayers(espnIds);
  const gsisIds = Array.from(
    new Set(Array.from(crosswalk.values()).map((c) => c.gsisId).filter((g): g is string => g !== null))
  );

  const [gameLogs, snapLogs, teamSnaps] = await Promise.all([
    getOpportunityGameLog(gsisIds, season, currentWeek),
    getSnapCountLog(gsisIds, season, currentWeek),
    getTeamSnapCounts(season, currentWeek),
  ]);

  // League-wide points-per-touch by position, from every real game log we have — the
  // yardstick the breakout engine measures each player's own efficiency against.
  const touchTotals = new Map<Position, { points: number; touches: number }>();
  for (const entry of candidateEntries) {
    const gsisId = crosswalk.get(entry.player.espnPlayerId)?.gsisId;
    const log = gsisId ? gameLogs.get(gsisId) ?? [] : [];
    const bucket = touchTotals.get(entry.player.position) ?? { points: 0, touches: 0 };
    for (const g of log) {
      bucket.points += g.fantasyPointsPpr;
      bucket.touches += g.carries + g.targets;
    }
    touchTotals.set(entry.player.position, bucket);
  }
  const positionAvgPointsPerTouch = new Map<Position, number>();
  for (const [position, { points, touches }] of touchTotals) {
    positionAvgPointsPerTouch.set(position, touches > 0 ? points / touches : 0);
  }

  const entries: BreakoutEntry[] = candidateEntries.map(({ player, rosteredBy, rosteredByTeamId }) => {
    const gsisId = crosswalk.get(player.espnPlayerId)?.gsisId ?? null;
    const gameLog = gsisId ? gameLogs.get(gsisId) ?? [] : [];
    const snapLog = gsisId ? snapLogs.get(gsisId) ?? [] : [];

    const gamesPlayed = gameLog.length;
    const totalPoints = gameLog.reduce((sum, g) => sum + g.fantasyPointsPpr, 0);
    const totalTouches = gameLog.reduce((sum, g) => sum + g.carries + g.targets, 0);
    const avgSnapPct =
      snapLog.length > 0 ? snapLog.reduce((sum, s) => sum + s.offensePct, 0) / snapLog.length : null;

    const averages: PlayerAverages = {
      gamesPlayed,
      pointsPerGame: gamesPlayed > 0 ? totalPoints / gamesPlayed : 0,
      touchesPerGame: gamesPlayed > 0 ? totalTouches / gamesPlayed : 0,
      avgSnapPct,
    };

    const breakout = computeBreakoutScore({
      gameLog,
      snapLog,
      positionAvgPointsPerTouch: positionAvgPointsPerTouch.get(player.position) ?? 0,
    });

    return {
      player,
      rosteredBy,
      rosteredByTeamId,
      averages,
      breakout,
      recommendation: breakout ? recommendationFor(rosteredByTeamId, rosteredByTeamId === myTeamId) : null,
    };
  });

  entries.sort((a, b) => (b.breakout?.breakoutScore ?? -1) - (a.breakout?.breakoutScore ?? -1));

  const teamSnapCounts: TeamSnapSummary[] = Array.from(teamSnaps.entries())
    .map(([team, weeks]) => ({
      team,
      avgSnapsPerGame: weeks.length > 0 ? weeks.reduce((sum, w) => sum + w.totalOffenseSnaps, 0) / weeks.length : 0,
      gamesTracked: weeks.length,
    }))
    .sort((a, b) => b.avgSnapsPerGame - a.avgSnapsPerGame);

  return { entries, teamSnapCounts };
}
