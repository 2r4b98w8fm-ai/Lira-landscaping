import type { AllPlayRecord } from "@/types/domain";

export interface PlayedMatchup {
  week: number;
  homeTeamId: number;
  awayTeamId: number;
  homeScore: number;
  awayScore: number;
}

/**
 * "All-play" record: for every already-played week, how many of the OTHER
 * teams in the league a team's score would have beaten, as if everyone
 * played everyone every week. This is the standard fantasy "luck" baseline
 * — a team can have a great record against a personally easy schedule
 * while their all-play record shows they weren't actually the highest
 * scorer most weeks (or vice versa).
 */
export function computeAllPlayRecords(
  playedMatchups: PlayedMatchup[],
  teamIds: number[]
): Map<number, AllPlayRecord> {
  const scoresByWeek = new Map<number, Map<number, number>>();
  for (const m of playedMatchups) {
    const week = scoresByWeek.get(m.week) ?? new Map<number, number>();
    week.set(m.homeTeamId, m.homeScore);
    week.set(m.awayTeamId, m.awayScore);
    scoresByWeek.set(m.week, week);
  }

  const records = new Map<number, AllPlayRecord>(
    teamIds.map((id) => [id, { wins: 0, losses: 0, ties: 0, gamesPlayed: 0 }])
  );

  for (const weekScores of scoresByWeek.values()) {
    for (const [teamId, score] of weekScores) {
      const record = records.get(teamId);
      if (!record) continue;
      record.gamesPlayed += 1;
      for (const [otherTeamId, otherScore] of weekScores) {
        if (otherTeamId === teamId) continue;
        if (score > otherScore) record.wins += 1;
        else if (score < otherScore) record.losses += 1;
        else record.ties += 1;
      }
    }
  }

  return records;
}
