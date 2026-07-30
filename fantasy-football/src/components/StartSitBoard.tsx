import { ProjectionSources } from "@/components/ProjectionSources";
import type { StartSitBoard as StartSitBoardType } from "@/types/domain";

export function StartSitBoard({ board }: { board: StartSitBoardType }) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">{board.position}</h2>
        {board.dataIncomplete && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
            No projections available yet
          </span>
        )}
      </div>
      <ol className="space-y-2">
        {board.recommendations.map((rec, i) => (
          <li
            key={rec.player.espnPlayerId}
            className="rounded-xl border border-slate-200 bg-white p-3 shadow-card transition hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-400">#{i + 1}</span>
                <span className="font-semibold text-slate-900">{rec.player.name}</span>
                <span className="text-xs text-slate-500">{rec.player.nflTeam}</span>
                {rec.consistency && rec.consistency.label !== "Moderate" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      rec.consistency.label === "Boom/bust"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {rec.consistency.label}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium tabular-nums text-slate-700">
                {rec.player.weekProjection !== null
                  ? `${rec.player.weekProjection.toFixed(1)} pts proj.`
                  : "no projection"}
              </span>
            </div>
            <div className="mt-1.5">
              <ProjectionSources breakdown={rec.player.projectionBreakdown} />
            </div>
            <ul className="mt-2 space-y-0.5 text-xs text-slate-500">
              {rec.reasoning.map((line, j) => (
                <li key={j}>· {line}</li>
              ))}
              {rec.player.projectionBreakdown?.ourModelReasoning.map((line, j) => (
                <li key={`model-${j}`}>· {line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
