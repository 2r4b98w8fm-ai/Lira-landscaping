import type { StartSitBoard as StartSitBoardType } from "@/types/domain";

export function StartSitBoard({ board }: { board: StartSitBoardType }) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{board.position}</h2>
        {board.dataIncomplete && (
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
            No projections available yet
          </span>
        )}
      </div>
      <ol className="space-y-2">
        {board.recommendations.map((rec, i) => (
          <li
            key={rec.player.espnPlayerId}
            className="rounded-lg border border-white/10 bg-field-900/60 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-mono text-slate-500">#{i + 1}</span>
                <span className="font-medium">{rec.player.name}</span>
                <span className="text-xs text-slate-400">{rec.player.nflTeam}</span>
              </div>
              <span className="text-sm tabular-nums text-slate-300">
                {rec.player.weekProjection !== null
                  ? `${rec.player.weekProjection.toFixed(1)} pts proj.`
                  : "no projection"}
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
