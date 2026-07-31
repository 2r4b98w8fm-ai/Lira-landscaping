import { NextResponse } from "next/server";
import { getVapidPublicKey, pushConfigured } from "@/lib/notifications/push";
import { resolveMyTeam } from "@/lib/sync/resolve";

export async function GET() {
  const result = await resolveMyTeam();
  if (result.status !== "ok") return NextResponse.json({ connected: false });

  return NextResponse.json({
    connected: true,
    configured: pushConfigured(),
    publicKey: getVapidPublicKey(),
  });
}
