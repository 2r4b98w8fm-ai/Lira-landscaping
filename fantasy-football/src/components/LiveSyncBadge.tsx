"use client";

import { useState } from "react";
import { useAutoRefresh } from "@/lib/hooks/useAutoRefresh";

type SyncStatus = "idle" | "syncing" | "synced" | "error" | "not_connected";

const SYNC_INTERVAL_MS = 60_000;

/**
 * Silently re-syncs the connected ESPN league (rosters, scores, injury
 * statuses, matchups) in the background every minute while the app is
 * open, so every page reflects real ESPN data without anyone needing to
 * click "Refresh." Renders nothing until a league is actually connected —
 * this is the same POST /api/league/sync a user could trigger manually
 * from the dashboard, just fired automatically off the live session
 * cookie already in the browser (no credentials are ever stored server
 * side for this).
 */
export function LiveSyncBadge() {
  const [status, setStatus] = useState<SyncStatus>("idle");
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  useAutoRefresh(async () => {
    try {
      const res = await fetch("/api/league/sync", { method: "POST" });
      if (res.status === 400) {
        setStatus("not_connected");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("synced");
      setLastSyncedAt(new Date());
    } catch {
      setStatus("error");
    }
  }, SYNC_INTERVAL_MS);

  if (status === "idle" || status === "not_connected") return null;

  const label =
    status === "error"
      ? "Sync issue"
      : lastSyncedAt
        ? `Live · ${lastSyncedAt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`
        : "Live";

  const dotClasses = status === "error" ? "bg-red-500" : "bg-emerald-500";

  return (
    <span
      title="Auto-syncs your ESPN league every minute while this tab is open"
      className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClasses}`} />
      {label}
    </span>
  );
}
