import { getScheduleForTeam } from "@/lib/db/queries";
import type { RosterPlayer } from "@/types/domain";

export interface ByeWeekEntry {
  week: number;
  players: Array<{ name: string; position: string; nflTeam: string }>;
}

const LOOKAHEAD_WEEKS = 4;

/**
 * Which of your rostered players have a bye in the next few weeks,
 * grouped by week — built from the same synced NFL schedule the trade and
 * playoff tools already use. A team with no bye in range simply doesn't
 * appear; nothing is guessed when the schedule hasn't been synced.
 */
export async function findUpcomingByes(
  roster: RosterPlayer[],
  season: number,
  currentWeek: number
): Promise<ByeWeekEntry[]> {
  const uniqueNflTeams = Array.from(new Set(roster.map((p) => p.nflTeam)));
  const byeWeekByTeam = new Map<string, number>();

  for (const nflTeam of uniqueNflTeams) {
    const schedule = await getScheduleForTeam(season, nflTeam, currentWeek, currentWeek + LOOKAHEAD_WEEKS - 1);
    const byeRow = schedule.find((s) => s.opponent === null);
    if (byeRow) byeWeekByTeam.set(nflTeam, byeRow.week);
  }

  const entriesByWeek = new Map<number, ByeWeekEntry["players"]>();
  for (const player of roster) {
    const byeWeek = byeWeekByTeam.get(player.nflTeam);
    if (byeWeek === undefined) continue;
    const list = entriesByWeek.get(byeWeek) ?? [];
    list.push({ name: player.name, position: player.position, nflTeam: player.nflTeam });
    entriesByWeek.set(byeWeek, list);
  }

  return Array.from(entriesByWeek.entries())
    .map(([week, players]) => ({ week, players }))
    .sort((a, b) => a.week - b.week);
}
