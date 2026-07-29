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
      className={`rounded-lg border p-3 ${
        isMyTeam ? "border-emerald-500/70 bg-emerald-500/10" : "border-white/10 bg-field-900/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">
          {team.teamName}
          {isMyTeam ? " (me)" : ""}
        </span>
        <span className="font-mono text-sm tabular-nums">{team.playoffPct.toFixed(1)}%</span>
      </div>

      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${Math.max(team.playoffPct, 1)}%` }}
        />
      </div>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
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
        <div className="mt-1 text-xs text-slate-500">
          Seed odds: {topSeeds.map((s) => `#${s.seed} (${s.pct.toFixed(0)}%)`).join(", ")}
        </div>
      )}
    </div>
  );
}
