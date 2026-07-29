import type { WaiverRecommendation } from "@/types/domain";

export function WaiverBoard({ position, recs }: { position: string; recs: WaiverRecommendation[] }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold">{position}</h2>
      <ol className="space-y-2">
        {recs.map((rec, i) => (
          <li
            key={rec.player.espnPlayerId}
            className={`rounded-lg border p-3 ${
              (rec.valueAdded ?? -1) > 0
                ? "border-emerald-500/40 bg-field-900/60"
                : "border-white/10 bg-field-900/60"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-500">#{i + 1}</span>
                <span className="font-medium">{rec.player.name}</span>
                <span className="text-xs text-slate-400">{rec.player.nflTeam}</span>
              </div>
              <span className="text-sm tabular-nums text-slate-300">
                {rec.valueAdded !== null ? `${rec.valueAdded > 0 ? "+" : ""}${rec.valueAdded.toFixed(1)} val` : "no projection"}
              </span>
            </div>
            <ul className="mt-2 space-y-0.5 text-xs text-slate-400">
              {rec.reasoning.map((line, j) => (
                <li key={j}>· {line}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
