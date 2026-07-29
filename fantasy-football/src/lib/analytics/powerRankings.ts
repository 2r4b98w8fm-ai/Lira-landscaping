import type { AllPlayRecord, PowerRanking } from "@/types/domain";

export interface TeamRecordInput {
  teamId: number;
  teamName: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
}

// Weighted so a team's power score reflects more than just their record
// against their own (possibly easy or hard) schedule: actual record still
// matters most, but all-play win% pulls in "how you'd do against the whole
// field" and pointsFor rewards a team that scores well even if a matchup
// or two didn't bounce their way.
const WEIGHTS = { record: 0.4, pointsFor: 0.3, allPlayWinPct: 0.3 };

function minMaxNormalize(values: number[]): (v: number) => number {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return () => 0.5;
  return (v: number) => (v - min) / (max - min);
}

/**
 * Ranks teams by a transparent composite of actual record, points scored,
 * and all-play win% (see allPlay.ts) — not just standings, which can be
 * skewed by an easy or hard personal schedule. Trend arrows compare
 * against `previousRanks`, a prior week's snapshot; a team with no prior
 * snapshot gets `trend: null` ("new") rather than a fabricated 0.
 */
export function computePowerRankings(
  teams: TeamRecordInput[],
  allPlayRecords: Map<number, AllPlayRecord>,
  previousRanks?: Map<number, number>
): PowerRanking[] {
  const winPct = (t: TeamRecordInput) => {
    const games = t.wins + t.losses + t.ties;
    return games > 0 ? (t.wins + t.ties * 0.5) / games : 0;
  };
  const allPlayWinPct = (teamId: number) => {
    const r = allPlayRecords.get(teamId);
    if (!r || r.gamesPlayed === 0) return 0;
    return (r.wins + r.ties * 0.5) / (r.wins + r.losses + r.ties);
  };

  const normWinPct = minMaxNormalize(teams.map(winPct));
  const normPointsFor = minMaxNormalize(teams.map((t) => t.pointsFor));
  const normAllPlay = minMaxNormalize(teams.map((t) => allPlayWinPct(t.teamId)));

  const scored = teams.map((t) => {
    const powerScore =
      normWinPct(winPct(t)) * WEIGHTS.record +
      normPointsFor(t.pointsFor) * WEIGHTS.pointsFor +
      normAllPlay(allPlayWinPct(t.teamId)) * WEIGHTS.allPlayWinPct;
    return { team: t, powerScore };
  });

  scored.sort((a, b) => b.powerScore - a.powerScore);

  return scored.map(({ team, powerScore }, i) => {
    const rank = i + 1;
    const allPlay = allPlayRecords.get(team.teamId) ?? { wins: 0, losses: 0, ties: 0, gamesPlayed: 0 };
    const expectedWins = allPlay.gamesPlayed > 0 ? allPlayWinPct(team.teamId) * allPlay.gamesPlayed : team.wins;
    const luckWins = team.wins - expectedWins;

    const previousRank = previousRanks?.get(team.teamId);
    const trend = previousRank !== undefined ? previousRank - rank : null;

    const reasoning = [
      `Record ${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ""}, ${team.pointsFor.toFixed(1)} points for.`,
      `All-play record (vs. every team, every week played): ${allPlay.wins}-${allPlay.losses}${allPlay.ties ? `-${allPlay.ties}` : ""}.`,
      Math.abs(luckWins) < 0.3
        ? "Record roughly matches what their scoring supports."
        : luckWins > 0
          ? `Running about ${luckWins.toFixed(1)} win(s) ahead of what their scoring supports — some good fortune in matchups.`
          : `Running about ${Math.abs(luckWins).toFixed(1)} win(s) behind what their scoring supports — tougher matchup luck than the record shows.`,
    ];

    return {
      teamId: team.teamId,
      teamName: team.teamName,
      rank,
      powerScore,
      trend,
      actualRecord: { wins: team.wins, losses: team.losses, ties: team.ties },
      pointsFor: team.pointsFor,
      pointsAgainst: team.pointsAgainst,
      allPlayRecord: allPlay,
      luckWins,
      reasoning,
    };
  });
}
