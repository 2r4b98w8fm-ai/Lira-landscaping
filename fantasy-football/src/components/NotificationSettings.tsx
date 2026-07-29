"use client";

import { useEffect, useState } from "react";

export function NotificationSettings() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [injuryAlerts, setInjuryAlerts] = useState(true);
  const [waiverAlerts, setWaiverAlerts] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/notifications/subscribe")
      .then((res) => res.json())
      .then((data) => {
        setConfigured(data.configured ?? false);
        if (data.subscription) {
          setEmail(data.subscription.email);
          setInjuryAlerts(data.subscription.injuryAlerts);
          setWaiverAlerts(data.subscription.waiverAlerts);
        }
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, injuryAlerts, waiverAlerts }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save your notification settings.");
        return;
      }
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  if (configured === null) return null;

  if (!configured) {
    return (
      <p className="text-xs text-slate-500">
        Email notifications aren&apos;t configured on this deployment (needs a{" "}
        <code>RESEND_API_KEY</code>).
      </p>
    );
  }

  return (
    <form onSubmit={save} className="space-y-2 rounded-lg border border-white/10 bg-field-900/60 p-4">
      <h2 className="text-sm font-semibold text-slate-300">Email notifications</h2>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-md border border-white/10 bg-field-800 px-3 py-2 text-sm outline-none focus:border-emerald-500"
      />
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={injuryAlerts} onChange={(e) => setInjuryAlerts(e.target.checked)} />
        Email me when a rostered player's injury status changes (checked on each refresh)
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-300">
        <input type="checkbox" checked={waiverAlerts} onChange={(e) => setWaiverAlerts(e.target.checked)} />
        Email me a periodic digest of real waiver-wire upgrades
      </label>
      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
      {saved && <p className="text-xs text-emerald-400">Saved.</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </form>
  );
}
