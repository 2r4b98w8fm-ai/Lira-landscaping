import { ProjectionSources } from "@/components/ProjectionSources";
import type { OptimalLineup } from "@/lib/startsit/optimalLineup";

export function OptimalLineupCard({ lineup }: { lineup: OptimalLineup }) {
  return (
    <div className="space-y-3 rounded-2xl border border-brand-200 bg-brand-50/40 p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">This week&apos;s optimal lineup</h2>
        <span className="font-mono text-lg font-bold text-brand-700">
          {lineup.totalProjectedPoints.toFixed(1)} pts
        </span>
      </div>
      <p className="text-xs text-slate-500">
        The exact best starter for every slot, including FLEX — solved directly, not just ranked
        per-position.
      </p>

      {lineup.changesFromCurrent.length > 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <p className="font-semibold">Your current lineup isn&apos;t optimal — make these changes:</p>
          <ul className="mt-1 space-y-0.5">
            {lineup.changesFromCurrent
              .filter((c) => c.action === "start")
              .map((c) => (
                <li key={c.player.espnPlayerId}>
                  · Start <strong>{c.player.name}</strong> ({c.player.position})
                </li>
              ))}
            {lineup.changesFromCurrent
              .filter((c) => c.action === "sit")
              .map((c) => (
                <li key={c.player.espnPlayerId}>
                  · Sit <strong>{c.player.name}</strong> ({c.player.position})
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-xl border border-brand-200 bg-white px-3 py-2 text-sm text-brand-700">
          Your current lineup already matches the optimal one.
        </p>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        {lineup.starters.map((s, i) => (
          <div
            key={`${s.slot}-${i}`}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <div>
              <span className="mr-2 font-mono text-xs text-slate-400">{s.slot}</span>
              {s.player ? (
                <>
                  <span className="font-semibold text-slate-900">{s.player.name}</span>
                  <span className="ml-1 text-xs text-slate-500">{s.player.nflTeam}</span>
                </>
              ) : (
                <span className="text-slate-400">no healthy projected player available</span>
              )}
            </div>
            <span className="font-mono font-semibold text-slate-700">
              {s.projectedPoints !== null ? s.projectedPoints.toFixed(1) : "—"}
            </span>
          </div>
        ))}
      </div>
      {lineup.starters.some((s) => s.player?.projectionBreakdown) && (
        <div className="space-y-1 border-t border-brand-100 pt-2">
          {lineup.starters
            .filter((s) => s.player?.projectionBreakdown)
            .map((s) => (
              <div key={s.slot} className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-medium text-slate-600">{s.player!.name}:</span>
                <ProjectionSources breakdown={s.player!.projectionBreakdown} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
