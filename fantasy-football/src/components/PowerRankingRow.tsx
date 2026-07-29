import type { PowerRanking } from "@/types/domain";

function TrendBadge({ trend }: { trend: number | null }) {
  if (trend === null) return <span className="text-xs text-slate-500">NEW</span>;
  if (trend === 0) return <span className="text-xs text-slate-500">–</span>;
  if (trend > 0) return <span className="text-xs text-emerald-400">▲ {trend}</span>;
  return <span className="text-xs text-red-400">▼ {Math.abs(trend)}</span>;
}

export function PowerRankingRow({ ranking, isMyTeam }: { ranking: PowerRanking; isMyTeam: boolean }) {
  const { wins, losses, ties } = ranking.actualRecord;
  const ap = ranking.allPlayRecord;

  return (
    <div
      className={`rounded-lg border p-3 ${
        isMyTeam ? "border-emerald-500/70 bg-emerald-500/10" : "border-white/10 bg-field-900/60"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-slate-500">#{ranking.rank}</span>
          <span className="font-medium">
            {ranking.teamName}
            {isMyTeam ? " (me)" : ""}
          </span>
          <TrendBadge trend={ranking.trend} />
        </div>
        <span className="text-sm tabular-nums text-slate-300">
          {wins}-{losses}
          {ties ? `-${ties}` : ""}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
        <span>Points for: {ranking.pointsFor.toFixed(1)}</span>
        <span>Points against: {ranking.pointsAgainst.toFixed(1)}</span>
        <span>
          All-play record: {ap.wins}-{ap.losses}
          {ap.ties ? `-${ap.ties}` : ""}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-500">{ranking.reasoning[ranking.reasoning.length - 1]}</p>
    </div>
  );
}
