import type { PowerRanking } from "@/types/domain";

function TrendBadge({ trend }: { trend: number | null }) {
  if (trend === null) return <span className="text-xs font-medium text-slate-400">NEW</span>;
  if (trend === 0) return <span className="text-xs font-medium text-slate-400">–</span>;
  if (trend > 0) return <span className="text-xs font-semibold text-brand-600">▲ {trend}</span>;
  return <span className="text-xs font-semibold text-red-600">▼ {Math.abs(trend)}</span>;
}

export function PowerRankingRow({ ranking, isMyTeam }: { ranking: PowerRanking; isMyTeam: boolean }) {
  const { wins, losses, ties } = ranking.actualRecord;
  const ap = ranking.allPlayRecord;

  return (
    <div
      className={`rounded-xl border p-3 shadow-card ${
        isMyTeam ? "border-brand-400 bg-brand-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm text-slate-400">#{ranking.rank}</span>
          <span className="font-semibold text-slate-900">
            {ranking.teamName}
            {isMyTeam ? " (me)" : ""}
          </span>
          <TrendBadge trend={ranking.trend} />
        </div>
        <span className="text-sm font-medium tabular-nums text-slate-700">
          {wins}-{losses}
          {ties ? `-${ties}` : ""}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        <span>Points for: {ranking.pointsFor.toFixed(1)}</span>
        <span>Points against: {ranking.pointsAgainst.toFixed(1)}</span>
        <span>
          All-play record: {ap.wins}-{ap.losses}
          {ap.ties ? `-${ap.ties}` : ""}
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-400">{ranking.reasoning[ranking.reasoning.length - 1]}</p>
    </div>
  );
}
