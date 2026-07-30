"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-card">
      <h1 className="text-lg font-bold text-red-800">Something went wrong</h1>
      <p className="text-sm text-red-700">
        This page hit an unexpected error. Your league data and session are unaffected — try again, or head
        back to the dashboard.
      </p>
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
