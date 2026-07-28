import Link from "next/link";

export function NotConnectedBanner({ reason }: { reason: "not_connected" | "no_team_selected" }) {
  return (
    <div className="rounded-lg border border-white/10 bg-field-900/60 p-8 text-center">
      <p className="text-lg font-medium">
        {reason === "not_connected" ? "No league connected yet" : "No team selected yet"}
      </p>
      <p className="mt-1 text-sm text-slate-400">
        {reason === "not_connected"
          ? "Connect your ESPN league to see real roster and matchup data here."
          : "You connected a league but haven't picked which team is yours."}
      </p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
      >
        Go to connect page
      </Link>
    </div>
  );
}
