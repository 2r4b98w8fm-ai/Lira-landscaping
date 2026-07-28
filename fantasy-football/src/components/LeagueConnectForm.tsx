"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LeagueSummary } from "@/types/domain";

interface ConnectResponse {
  league?: LeagueSummary;
  week?: number;
  warnings?: string[];
  error?: string;
}

export function LeagueConnectForm() {
  const router = useRouter();
  const [leagueId, setLeagueId] = useState("");
  const [season, setSeason] = useState(new Date().getFullYear());
  const [isPrivate, setIsPrivate] = useState(false);
  const [espnS2, setEspnS2] = useState("");
  const [swid, setSwid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<LeagueSummary | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [pickingTeam, setPickingTeam] = useState(false);

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/league/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leagueId,
          season,
          ...(isPrivate ? { espnS2, swid } : {}),
        }),
      });
      const data = (await res.json()) as ConnectResponse;
      if (!res.ok || data.error) {
        setError(data.error ?? "Could not connect to that league.");
        return;
      }
      setConnected(data.league ?? null);
      setWarnings(data.warnings ?? []);
      setPickingTeam(true);
    } catch {
      setError("Network error reaching the app's own server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePickTeam(teamId: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/league/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId }),
      });
      if (!res.ok) {
        setError("Could not save your team selection.");
        return;
      }
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  if (pickingTeam && connected) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Which team is yours?</h2>
        <p className="text-sm text-slate-400">Connected to “{connected.name}”. Pick your team to load your roster.</p>
        {warnings.length > 0 && (
          <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
            <p className="font-medium">Synced with a few hiccups (non-fatal):</p>
            <ul className="mt-1 list-inside list-disc space-y-0.5">
              {warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          {connected.teams.map((team) => (
            <button
              key={team.espnTeamId}
              onClick={() => handlePickTeam(team.espnTeamId)}
              disabled={loading}
              className="rounded-lg border border-white/10 bg-field-800 px-4 py-3 text-left transition-colors hover:border-emerald-500/60 hover:bg-field-800/70 disabled:opacity-50"
            >
              <div className="font-medium">{team.name}</div>
              <div className="text-xs text-slate-400">
                {team.wins}-{team.losses}
                {team.ties > 0 ? `-${team.ties}` : ""} · {team.pointsFor.toFixed(1)} PF
              </div>
            </button>
          ))}
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleConnect} className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Connect your ESPN league</h1>
        <p className="mt-1 text-sm text-slate-400">
          We pull your league, teams, and rosters straight from ESPN. No account needed — your league
          stays tied to this browser session.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-slate-300">ESPN League ID</span>
          <input
            required
            value={leagueId}
            onChange={(e) => setLeagueId(e.target.value)}
            placeholder="e.g. 123456"
            className="mt-1 w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
          <span className="mt-1 block text-xs text-slate-500">
            Found in your league&apos;s URL: fantasy.espn.com/football/team?leagueId=<b>123456</b>
          </span>
        </label>
        <label className="block text-sm">
          <span className="text-slate-300">Season</span>
          <input
            required
            type="number"
            value={season}
            onChange={(e) => setSeason(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
          className="rounded border-white/20 bg-field-800"
        />
        My league is private
      </label>

      {isPrivate && (
        <div className="space-y-3 rounded-lg border border-white/10 bg-field-900/60 p-4">
          <details className="text-xs text-slate-400">
            <summary className="cursor-pointer text-slate-300">
              How do I find espn_s2 and SWID?
            </summary>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>Log into fantasy.espn.com in your browser and open your league.</li>
              <li>Open developer tools (F12 or Cmd+Opt+I) → Application (Chrome) or Storage (Firefox) tab.</li>
              <li>Under Cookies, click fantasy.espn.com.</li>
              <li>
                Copy the values of <code>espn_s2</code> and <code>SWID</code> (SWID includes the curly
                braces, e.g. <code>{"{ABC-123}"}</code>).
              </li>
            </ol>
            <p className="mt-2">
              These are stored encrypted in an httpOnly cookie for this session only — never written to
              our database.
            </p>
          </details>
          <label className="block text-sm">
            <span className="text-slate-300">espn_s2</span>
            <input
              value={espnS2}
              onChange={(e) => setEspnS2(e.target.value)}
              className="mt-1 w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-300">SWID</span>
            <input
              value={swid}
              onChange={(e) => setSwid(e.target.value)}
              placeholder="{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"
              className="mt-1 w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </label>
        </div>
      )}

      {error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Connecting…" : "Connect league"}
      </button>
    </form>
  );
}
