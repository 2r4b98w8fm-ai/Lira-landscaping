import { ProjectionSources } from "@/components/ProjectionSources";
import type { WaiverRecommendation } from "@/types/domain";

export function WaiverBoard({ position, recs }: { position: string; recs: WaiverRecommendation[] }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold text-slate-900">{position}</h2>
      <ol className="space-y-2">
        {recs.map((rec, i) => (
          <li
            key={rec.player.espnPlayerId}
            className={`rounded-xl border p-3 shadow-card transition hover:shadow-card-hover ${
              (rec.valueAdded ?? -1) > 0 ? "border-brand-300 bg-brand-50/60" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-400">#{i + 1}</span>
                <span className="font-semibold text-slate-900">{rec.player.name}</span>
                <span className="text-xs text-slate-500">{rec.player.nflTeam}</span>
              </div>
              <div className="flex items-center gap-2">
                {rec.faabBid && (
                  <span
                    title={rec.faabBid.reasoning}
                    className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700"
                  >
                    Suggested bid: ${rec.faabBid.suggestedBid}
                  </span>
                )}
                <span
                  className={`text-sm font-semibold tabular-nums ${
                    (rec.valueAdded ?? -1) > 0 ? "text-brand-700" : "text-slate-500"
                  }`}
                >
                  {rec.valueAdded !== null ? `${rec.valueAdded > 0 ? "+" : ""}${rec.valueAdded.toFixed(1)} val` : "no projection"}
                </span>
              </div>
            </div>
            <div className="mt-1.5">
              <ProjectionSources breakdown={rec.player.projectionBreakdown} />
            </div>
            <ul className="mt-2 space-y-0.5 text-xs text-slate-500">
              {rec.reasoning.map((line, j) => (
                <li key={j}>· {line}</li>
              ))}
              {rec.faabBid && <li>· {rec.faabBid.reasoning}</li>}
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
