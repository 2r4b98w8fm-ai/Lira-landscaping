"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "unsupported" | "not_configured" | "denied" | "subscribed" | "unsubscribed";

/** VAPID public keys are shared as a URL-safe base64 string; the Push API wants raw bytes. */
function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64Safe);
  const bytes = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

export function PushNotificationSettings() {
  const [status, setStatus] = useState<Status>("checking");
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
        if (!cancelled) setStatus("unsupported");
        return;
      }

      const configRes = await fetch("/api/notifications/push").then((r) => r.json());
      if (cancelled) return;
      if (!configRes.configured) {
        setStatus("not_configured");
        return;
      }
      setPublicKey(configRes.publicKey);

      if (Notification.permission === "denied") {
        setStatus("denied");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      const existing = await registration.pushManager.getSubscription();
      if (cancelled) return;
      setStatus(existing ? "subscribed" : "unsubscribed");
    }

    init().catch((err) => {
      console.error("Push init failed:", err);
      if (!cancelled) setStatus("unsupported");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function enable() {
    if (!publicKey) return;
    setBusy(true);
    setError(null);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("denied");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      const res = await fetch("/api/notifications/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Could not save your push subscription.");
        await subscription.unsubscribe().catch(() => {});
        return;
      }
      setStatus("subscribed");
    } catch (err) {
      console.error("Failed to enable push:", err);
      setError("Could not enable push notifications in this browser.");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setError(null);
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/notifications/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }
      setStatus("unsubscribed");
    } catch (err) {
      console.error("Failed to disable push:", err);
      setError("Could not disable push notifications.");
    } finally {
      setBusy(false);
    }
  }

  if (status === "checking") return null;

  if (status === "unsupported") {
    return <p className="text-xs text-slate-400">This browser doesn&apos;t support push notifications.</p>;
  }
  if (status === "not_configured") {
    return (
      <p className="text-xs text-slate-400">
        Push notifications aren&apos;t configured on this deployment (needs <code>VAPID_PUBLIC_KEY</code>,{" "}
        <code>VAPID_PRIVATE_KEY</code>, and <code>VAPID_SUBJECT</code>).
      </p>
    );
  }

  return (
    <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Push notifications</h2>
      <p className="text-xs text-slate-500">
        Sends both injury updates and the periodic waiver digest straight to this browser/device — there&apos;s
        no separate content toggle for push yet, just on or off.
      </p>
      {status === "denied" && (
        <p className="text-xs text-amber-700">
          Notifications are blocked for this site in your browser. Allow them in your browser&apos;s site
          settings, then reload this page.
        </p>
      )}
      {(status === "subscribed" || status === "unsubscribed") && (
        <button
          type="button"
          onClick={status === "subscribed" ? disable : enable}
          disabled={busy}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-500 hover:shadow disabled:opacity-50"
        >
          {busy ? "Working…" : status === "subscribed" ? "Disable push on this device" : "Enable push on this device"}
        </button>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
