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
      <p className="text-xs text-slate-400">
        Email notifications aren&apos;t configured on this deployment (needs a{" "}
        <code>RESEND_API_KEY</code>).
      </p>
    );
  }

  return (
    <form onSubmit={save} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Email notifications</h2>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
      />
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={injuryAlerts}
          onChange={(e) => setInjuryAlerts(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
        />
        Email me when a rostered player's injury status changes (checked on each refresh)
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={waiverAlerts}
          onChange={(e) => setWaiverAlerts(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
        />
        Email me a periodic digest of real waiver-wire upgrades
      </label>
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 hover:shadow disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save"}
      </button>
      {saved && <p className="text-xs font-medium text-brand-600">Saved.</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
}
