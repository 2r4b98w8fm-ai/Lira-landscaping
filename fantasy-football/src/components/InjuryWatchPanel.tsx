import type { RosterPlayer } from "@/types/domain";

const SEVERITY_ORDER: Record<string, number> = {
  OUT: 0,
  IR: 0,
  DOUBTFUL: 1,
  SUSPENSION: 1,
  QUESTIONABLE: 2,
};

const SEVERITY_COLOR: Record<string, string> = {
  OUT: "border-red-500/40 bg-red-500/10 text-red-300",
  IR: "border-red-500/40 bg-red-500/10 text-red-300",
  DOUBTFUL: "border-orange-500/40 bg-orange-500/10 text-orange-300",
  SUSPENSION: "border-orange-500/40 bg-orange-500/10 text-orange-300",
  QUESTIONABLE: "border-amber-500/40 bg-amber-500/10 text-amber-300",
};

/** Every rostered player ESPN doesn't list as fully active, worst-first. Real data already fetched with the roster — no separate alert/notification service involved. */
export function InjuryWatchPanel({ roster }: { roster: RosterPlayer[] }) {
  const flagged = roster
    .filter((p) => p.injuryStatus !== "ACTIVE" && p.injuryStatus !== "UNKNOWN")
    .sort((a, b) => (SEVERITY_ORDER[a.injuryStatus] ?? 9) - (SEVERITY_ORDER[b.injuryStatus] ?? 9));

  if (flagged.length === 0) return null;

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-slate-300">Injury Watch</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {flagged.map((p) => (
          <div
            key={p.espnPlayerId}
            className={`rounded-lg border px-3 py-2 text-sm ${SEVERITY_COLOR[p.injuryStatus] ?? "border-white/10 bg-field-900/60 text-slate-300"}`}
          >
            <span className="font-medium">{p.name}</span>{" "}
            <span className="text-xs">
              ({p.position} · {p.nflTeam}) — {p.injuryStatus}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
