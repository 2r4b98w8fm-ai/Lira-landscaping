import { NextResponse } from "next/server";
import { z } from "zod";
import { deletePushSubscription } from "@/lib/db/queries";

const bodySchema = z.object({ endpoint: z.string().url() });

export async function POST(req: Request) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }
  await deletePushSubscription(parsed.data.endpoint);
  return NextResponse.json({ ok: true });
}
