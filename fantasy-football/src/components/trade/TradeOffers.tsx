"use client";

import { useEffect, useState } from "react";
import { TradeValueRow } from "@/components/TradeValueRow";
import type { SuggestedOffer } from "@/types/domain";

interface TeamOption {
  teamId: number;
  teamName: string;
  isMyTeam: boolean;
}

export function TradeOffers({
  initialTargetTeamId,
}: {
  initialTargetTeamId: number | null;
}) {
  const [teams, setTeams] = useState<TeamOption[] | null>(null);
  const [targetTeamId, setTargetTeamId] = useState<number | null>(initialTargetTeamId);
  const [offer, setOffer] = useState<SuggestedOffer | null>(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/league/trade/roster-values")
      .then((res) => res.json())
      .then((data) => {
        if (!data.teams) return;
        const opts: TeamOption[] = data.teams.map((t: TeamOption) => ({
          teamId: t.teamId,
          teamName: t.teamName,
          isMyTeam: t.isMyTeam,
        }));
        setTeams(opts);
        if (!targetTeamId) {
          setTargetTeamId(opts.find((t) => !t.isMyTeam)?.teamId ?? null);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialTargetTeamId) setTargetTeamId(initialTargetTeamId);
  }, [initialTargetTeamId]);

  useEffect(() => {
    if (!targetTeamId) return;
    setLoading(true);
    setChecked(false);
    fetch(`/api/league/trade/offers?targetTeamId=${targetTeamId}`)
      .then((res) => res.json())
      .then((data) => {
        setOffer(data.offer ?? null);
        setChecked(true);
      })
      .finally(() => setLoading(false));
  }, [targetTeamId]);

  if (!teams) return <p className="text-slate-500">Loading teams…</p>;

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <span className="font-medium text-slate-700">Target team</span>
        <select
          value={targetTeamId ?? ""}
          onChange={(e) => setTargetTeamId(Number(e.target.value))}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        >
          {teams
            .filter((t) => !t.isMyTeam)
            .map((t) => (
              <option key={t.teamId} value={t.teamId}>
                {t.teamName}
              </option>
            ))}
        </select>
      </label>

      {loading && <p className="text-slate-500">Building a package…</p>}

      {!loading && checked && !offer && (
        <p className="text-slate-500">
          No sensible offer found — either you don&apos;t have tradeable surplus at a position they
          need, or they don&apos;t have surplus at a position you need.
        </p>
      )}

      {offer && (
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-medium ${offer.favorsThem ? "text-brand-600" : "text-amber-600"}`}
            >
              {offer.favorsThem ? "Tilted their way — realistic to accept" : "Favors you — may need a sweetener"}
            </span>
          </div>
          <ul className="space-y-0.5 text-sm text-slate-500">
            {offer.rationale.map((line, i) => (
              <li key={i}>· {line}</li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-900">You give ({offer.giveValue.toFixed(1)})</h4>
              <div className="mt-1 space-y-1.5">
                {offer.give.map((p) => (
                  <TradeValueRow key={p.player.espnPlayerId} value={p} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">You receive ({offer.receiveValue.toFixed(1)})</h4>
              <div className="mt-1 space-y-1.5">
                {offer.receive.map((p) => (
                  <TradeValueRow key={p.player.espnPlayerId} value={p} />
                ))}
              </div>
            </div>
          </div>
          {offer.dropCandidates.length > 0 && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              You&apos;d net {offer.receive.length} player(s) for {offer.give.length} — drop{" "}
              <strong>
                {offer.dropCandidates.map((tv) => `${tv.player.name} (${tv.finalValue.toFixed(1)} val)`).join(", ")}
              </strong>{" "}
              to make roster room.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
