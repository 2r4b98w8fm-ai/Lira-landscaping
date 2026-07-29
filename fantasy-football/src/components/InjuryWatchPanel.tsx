import type { RosterPlayer } from "@/types/domain";

const SEVERITY_ORDER: Record<string, number> = {
  OUT: 0,
  IR: 0,
  DOUBTFUL: 1,
  SUSPENSION: 1,
  QUESTIONABLE: 2,
};

const SEVERITY_COLOR: Record<string, string> = {
  OUT: "border-red-200 bg-red-50 text-red-700",
  IR: "border-red-200 bg-red-50 text-red-700",
  DOUBTFUL: "border-orange-200 bg-orange-50 text-orange-700",
  SUSPENSION: "border-orange-200 bg-orange-50 text-orange-700",
  QUESTIONABLE: "border-amber-200 bg-amber-50 text-amber-700",
};

/** Every rostered player ESPN doesn't list as fully active, worst-first. Real data already fetched with the roster — no separate alert/notification service involved. */
export function InjuryWatchPanel({ roster }: { roster: RosterPlayer[] }) {
  const flagged = roster
    .filter((p) => p.injuryStatus !== "ACTIVE" && p.injuryStatus !== "UNKNOWN")
    .sort((a, b) => (SEVERITY_ORDER[a.injuryStatus] ?? 9) - (SEVERITY_ORDER[b.injuryStatus] ?? 9));

  if (flagged.length === 0) return null;

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Injury Watch</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {flagged.map((p) => (
          <div
            key={p.espnPlayerId}
            className={`rounded-xl border px-3 py-2 text-sm shadow-sm ${SEVERITY_COLOR[p.injuryStatus] ?? "border-slate-200 bg-white text-slate-700"}`}
          >
            <span className="font-semibold">{p.name}</span>{" "}
            <span className="text-xs opacity-90">
              ({p.position} · {p.nflTeam}) — {p.injuryStatus}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
