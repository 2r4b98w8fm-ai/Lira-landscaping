import type { ProjectionBreakdown } from "@/types/domain";

/**
 * The "we looked at every source" strip: exactly what ESPN, our own model,
 * and Sleeper each said about a player, side by side — never just one
 * blended number presented as if it came from nowhere.
 */
export function ProjectionSources({ breakdown }: { breakdown: ProjectionBreakdown | null }) {
  if (!breakdown) return null;
  const { espnRestOfSeason, ourModelRestOfSeason, sleeperSearchRank, sleeperTrend } = breakdown;
  if (espnRestOfSeason === null && ourModelRestOfSeason === null && sleeperSearchRank === null && !sleeperTrend) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
      {espnRestOfSeason !== null && <span>ESPN: {espnRestOfSeason.toFixed(1)}</span>}
      {ourModelRestOfSeason !== null && <span>Our model: {ourModelRestOfSeason.toFixed(1)}</span>}
      {sleeperSearchRank !== null && <span>Sleeper rank: #{sleeperSearchRank}</span>}
      {sleeperTrend && (
        <span className={sleeperTrend.direction === "add" ? "font-medium text-brand-600" : "font-medium text-red-600"}>
          {sleeperTrend.direction === "add" ? "▲" : "▼"} trending {sleeperTrend.direction} on Sleeper ({sleeperTrend.count})
        </span>
      )}
    </div>
  );
}
