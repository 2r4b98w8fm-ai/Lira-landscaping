"use client";

import { useEffect, useRef } from "react";

/** Standard polling interval for read-only board pages (rankings, breakouts, waivers, etc.) — cheap DB reads, no reason to wait longer than this for data another source (ESPN sync, nflverse cron) already refreshed. */
export const DATA_POLL_INTERVAL_MS = 45_000;

/**
 * Runs `callback` immediately, then again every `intervalMs` for as long as
 * the tab stays visible. Polling pauses while the tab is hidden (no wasted
 * requests in a backgrounded tab) and fires right away the moment it
 * becomes visible again, so coming back to a stale tab never waits out a
 * full interval. `callback` is read from a ref so callers can pass an
 * inline function without re-triggering the effect on every render.
 */
export function useAutoRefresh(callback: () => void | Promise<void>, intervalMs: number): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    function tick() {
      void callbackRef.current();
    }
    function start() {
      if (timer === null) timer = setInterval(tick, intervalMs);
    }
    function stop() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        tick();
        start();
      } else {
        stop();
      }
    }

    tick();
    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [intervalMs]);
}
