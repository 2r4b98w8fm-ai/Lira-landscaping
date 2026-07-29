import { Resend } from "resend";

export class NotificationsNotConfiguredError extends Error {
  constructor() {
    super("RESEND_API_KEY is not set — email notifications are disabled until it is.");
    this.name = "NotificationsNotConfiguredError";
  }
}

/** True only when a real provider key is present — every caller should check this before building a digest, so we never pretend to have sent an email that didn't go out. */
export function notificationsConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Sends an email via Resend. Requires RESEND_API_KEY (and optionally
 * RESEND_FROM_EMAIL, which must be a domain verified in your Resend
 * account) — this repo has neither configured, so sending has not been
 * exercised against a real Resend account; only unit-tested up to the
 * point of calling their SDK.
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!notificationsConfigured()) {
    throw new NotificationsNotConfiguredError();
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.RESEND_FROM_EMAIL ?? "Gridiron Desk <notifications@resend.dev>";

  const { error } = await resend.emails.send({ from, to, subject, html });
  if (error) {
    throw new Error(`Resend rejected the email: ${error.message}`);
  }
}
