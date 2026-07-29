import type { SimulationTeamResult } from "@/types/domain";

export function PlayoffOddsRow({
  team,
  isMyTeam,
}: {
  team: SimulationTeamResult;
  isMyTeam: boolean;
}) {
  const topSeeds = Object.entries(team.seedDistribution)
    .map(([seed, pct]) => ({ seed: Number(seed), pct }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);

  return (
    <div
      className={`rounded-xl border p-3 shadow-card ${
        isMyTeam ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-semibold text-slate-900">
          {team.teamName}
          {isMyTeam ? " (me)" : ""}
        </span>
        <span className="font-mono text-sm font-semibold tabular-nums text-brand-700">
          {team.playoffPct.toFixed(1)}%
        </span>
      </div>

      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
          style={{ width: `${Math.max(team.playoffPct, 1)}%` }}
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>
          Most likely seed: {team.mostLikelySeed !== null ? `#${team.mostLikelySeed}` : "misses playoffs"}
        </span>
        <span>
          Projected wins: {team.projectedWinsRange.p10}–{team.projectedWinsRange.p90} (median{" "}
          {team.projectedWinsRange.p50})
        </span>
        {team.remainingSOS !== null && (
          <span>Remaining schedule avg. opponent score: {team.remainingSOS.toFixed(1)}</span>
        )}
      </div>

      {topSeeds.length > 0 && (
        <div className="mt-1 text-xs text-slate-400">
          Seed odds: {topSeeds.map((s) => `#${s.seed} (${s.pct.toFixed(0)}%)`).join(", ")}
        </div>
      )}
    </div>
  );
}
