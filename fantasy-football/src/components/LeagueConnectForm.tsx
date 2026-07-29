"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseEspnCookiePaste } from "@/lib/espnCookieParse";
import type { LeagueSummary } from "@/types/domain";

interface ConnectResponse {
  league?: LeagueSummary;
  week?: number;
  warnings?: string[];
  error?: string;
}

interface ConnectedLeagueSummary {
  espnLeagueId: string;
  season: number;
  myTeamId: number | null;
  name?: string;
}

interface DiscoveredLeague {
  espnLeagueId: string;
  season: number;
}

export function LeagueConnectForm() {
  const router = useRouter();

  const [existingLeagues, setExistingLeagues] = useState<ConnectedLeagueSummary[] | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [connectMode, setConnectMode] = useState<"account" | "manual">("account");

  const [leagueId, setLeagueId] = useState("");
  const [season, setSeason] = useState(new Date().getFullYear());
  const [espnS2, setEspnS2] = useState("");
  const [swid, setSwid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<LeagueSummary | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [pickingTeam, setPickingTeam] = useState(false);

  const [discovered, setDiscovered] = useState<DiscoveredLeague[] | null>(null);
  const [discoveryNote, setDiscoveryNote] = useState<string | null>(null);
  const [pasteDetected, setPasteDetected] = useState(false);

  /**
   * People following the dev-tools instructions rarely copy just the bare
   * value — the whole cookie row, a `Cookie:` header, a GUID missing its
   * braces. Works no matter which of the two fields you paste into.
   */
  function handleCookiePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text");
    const parsed = parseEspnCookiePaste(text);
    if (parsed.espnS2 || parsed.swid) {
      e.preventDefault();
      if (parsed.espnS2) setEspnS2(parsed.espnS2);
      if (parsed.swid) setSwid(parsed.swid);
      if (parsed.espnS2 && parsed.swid) {
        setPasteDetected(true);
        setTimeout(() => setPasteDetected(false), 4000);
      }
    }
  }

  useEffect(() => {
    fetch("/api/account/leagues")
      .then((res) => res.json())
      .then((data) => {
        setExistingLeagues(data.leagues ?? []);
        setShowAddForm(!data.leagues || data.leagues.length === 0);
      });
  }, []);

  async function connectLeague(id: string, seasonToUse: number) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/league/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leagueId: id,
          season: seasonToUse,
          ...(espnS2 || swid ? { espnS2, swid } : {}),
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

  async function handleDiscover(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDiscovered(null);
    setDiscoveryNote(null);
    try {
      const res = await fetch("/api/account/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ espnS2, swid }),
      });
      const data = await res.json();
      if (data.leagues && data.leagues.length > 0) {
        setDiscovered(data.leagues);
      } else {
        setDiscovered([]);
        setDiscoveryNote(
          data.warnings?.[0] ??
            "Couldn't find any leagues for this account. Enter your league ID directly instead."
        );
        setConnectMode("manual");
      }
    } catch {
      setError("Network error reaching the app's own server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleManualConnect(e: React.FormEvent) {
    e.preventDefault();
    await connectLeague(leagueId, season);
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

  async function goToLeague(index: number) {
    await fetch("/api/account/switch-league", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });
    router.push("/dashboard");
  }

  if (existingLeagues === null) {
    return <p className="text-slate-400">Loading your account…</p>;
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
    <div className="space-y-6">
      {existingLeagues.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-300">Your leagues</h2>
          {existingLeagues.map((l, i) => (
            <button
              key={`${l.espnLeagueId}-${l.season}`}
              onClick={() => goToLeague(i)}
              className="block w-full rounded-lg border border-white/10 bg-field-800 px-4 py-3 text-left hover:border-emerald-500/60 hover:bg-field-800/70"
            >
              <div className="font-medium">{l.name ?? `League ${l.espnLeagueId}`}</div>
              <div className="text-xs text-slate-400">{l.season} season</div>
            </button>
          ))}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              + Add another league
            </button>
          )}
        </div>
      )}

      {showAddForm && (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {existingLeagues.length > 0 ? "Add another league" : "Connect your ESPN league"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              We pull your league, teams, and rosters straight from ESPN. No password ever leaves
              your browser — this uses the same session cookies (espn_s2/SWID) your browser already
              has after you log into fantasy.espn.com yourself.
            </p>
          </div>

          <div className="flex gap-1 border-b border-white/10">
            <button
              onClick={() => setConnectMode("account")}
              className={`px-3 py-2 text-sm ${connectMode === "account" ? "border-b-2 border-emerald-500 text-white" : "text-slate-400"}`}
            >
              Connect my ESPN account
            </button>
            <button
              onClick={() => setConnectMode("manual")}
              className={`px-3 py-2 text-sm ${connectMode === "manual" ? "border-b-2 border-emerald-500 text-white" : "text-slate-400"}`}
            >
              I have a league ID
            </button>
          </div>

          <details className="text-xs text-slate-400">
            <summary className="cursor-pointer text-slate-300">How do I find espn_s2 and SWID?</summary>
            <ol className="mt-2 list-inside list-decimal space-y-1">
              <li>Log into fantasy.espn.com in your browser and open your league.</li>
              <li>Open developer tools (F12 or Cmd+Opt+I) → Application (Chrome) or Storage (Firefox) tab.</li>
              <li>Under Cookies, click fantasy.espn.com.</li>
              <li>
                Select and copy the <code>espn_s2</code> row's value, then the <code>SWID</code>
                row's value. Don&apos;t worry about copying extra whitespace or forgetting the
                curly braces on SWID — pasting either one into the boxes below sorts that out.
              </li>
            </ol>
            <p className="mt-2">
              These are stored encrypted in an httpOnly cookie and are never written to our
              database — only your league/team IDs and cached stats are.
            </p>
          </details>

          <p className="text-xs text-slate-500">
            Paste whatever you copied — the whole cookie row, a full <code>Cookie:</code> header,
            or just the bare value — into either box below and we&apos;ll pull out the right
            values automatically.
          </p>
          <label className="block text-sm">
            <span className="text-slate-300">espn_s2</span>
            <input
              value={espnS2}
              onChange={(e) => setEspnS2(e.target.value)}
              onPaste={handleCookiePaste}
              className="mt-1 w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          <label className="block text-sm">
            <span className="text-slate-300">SWID</span>
            <input
              value={swid}
              onChange={(e) => setSwid(e.target.value)}
              onPaste={handleCookiePaste}
              placeholder="{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"
              className="mt-1 w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </label>
          {pasteDetected && (
            <p className="text-xs text-emerald-400">✓ Detected both espn_s2 and SWID from that paste.</p>
          )}
          <p className="text-xs text-slate-500">
            Public league and just want the quick path? Leave both blank and use the "I have a
            league ID" tab.
          </p>

          {connectMode === "account" && (
            <form onSubmit={handleDiscover} className="space-y-3">
              <button
                type="submit"
                disabled={loading || !espnS2 || !swid}
                className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 sm:w-auto"
              >
                {loading ? "Looking…" : "Find my leagues"}
              </button>

              {discoveryNote && (
                <p className="rounded-md border border-amber-500/40 bg-amber-500/10 p-2 text-xs text-amber-200">
                  {discoveryNote}
                </p>
              )}

              {discovered && discovered.length > 0 && (
                <div className="grid gap-2 sm:grid-cols-2">
                  {discovered.map((d) => (
                    <button
                      key={`${d.espnLeagueId}-${d.season}`}
                      type="button"
                      onClick={() => connectLeague(d.espnLeagueId, d.season)}
                      disabled={loading}
                      className="rounded-lg border border-white/10 bg-field-800 px-4 py-3 text-left hover:border-emerald-500/60 hover:bg-field-800/70 disabled:opacity-50"
                    >
                      <div className="font-medium">League {d.espnLeagueId}</div>
                      <div className="text-xs text-slate-400">{d.season} season — click to connect</div>
                    </button>
                  ))}
                </div>
              )}
            </form>
          )}

          {connectMode === "manual" && (
            <form onSubmit={handleManualConnect} className="space-y-4">
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
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 sm:w-auto"
              >
                {loading ? "Connecting…" : "Connect league"}
              </button>
            </form>
          )}

          {error && (
            <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
