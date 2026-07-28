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

  if (!teams) return <p className="text-slate-400">Loading teams…</p>;

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <span className="text-slate-300">Target team</span>
        <select
          value={targetTeamId ?? ""}
          onChange={(e) => setTargetTeamId(Number(e.target.value))}
          className="rounded-md border border-white/10 bg-field-800 px-2 py-1 text-sm"
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

      {loading && <p className="text-slate-400">Building a package…</p>}

      {!loading && checked && !offer && (
        <p className="text-slate-400">
          No sensible offer found — either you don&apos;t have tradeable surplus at a position they
          need, or they don&apos;t have surplus at a position you need.
        </p>
      )}

      {offer && (
        <div className="space-y-3 rounded-lg border border-white/10 bg-field-900/40 p-4">
          <ul className="space-y-0.5 text-sm text-slate-400">
            {offer.rationale.map((line, i) => (
              <li key={i}>· {line}</li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold">You give ({offer.giveValue.toFixed(1)})</h4>
              <div className="mt-1 space-y-1.5">
                {offer.give.map((p) => (
                  <TradeValueRow key={p.player.espnPlayerId} value={p} />
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">You receive ({offer.receiveValue.toFixed(1)})</h4>
              <div className="mt-1 space-y-1.5">
                {offer.receive.map((p) => (
                  <TradeValueRow key={p.player.espnPlayerId} value={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
