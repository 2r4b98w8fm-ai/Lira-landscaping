import Link from "next/link";

export function NotConnectedBanner({ reason }: { reason: "not_connected" | "no_team_selected" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-card">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-2xl">
        🏈
      </div>
      <p className="mt-4 text-lg font-semibold text-slate-900">
        {reason === "not_connected" ? "No league connected yet" : "No team selected yet"}
      </p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
        {reason === "not_connected"
          ? "Connect your ESPN league to see real roster and matchup data here."
          : "You connected a league but haven't picked which team is yours."}
      </p>
      <Link
        href="/"
        className="mt-5 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 hover:shadow"
      >
        Go to connect page
      </Link>
    </div>
  );
}
