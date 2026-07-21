import { h } from "./lib/dom";
import { loadSave, settings } from "./save";
import { totalXp, rankFor } from "./progression";
import { playConfirm } from "./audio";
import { vibrate } from "./lib/haptics";

/**
 * The share loop. Every share message is deliberately spoiler-free — it names
 * the case and the player's result, never the killer, the twist, or any code.
 * A friend who reads the card learns only that the case can be closed and how
 * well this player did, which is exactly the invitation we want.
 *
 * Delivery: native share sheet where the browser supports it (mobile), with a
 * clipboard copy as the universal fallback, and a manual "select this text"
 * escape hatch if even that is blocked (some embedded/file:// contexts).
 */

/** The canonical link to include, when we're served over http(s). */
function shareUrl(): string {
  try {
    const proto = location.protocol;
    if (proto === "http:" || proto === "https:") {
      return location.origin + location.pathname.replace(/index\.html?$/i, "");
    }
  } catch {
    /* file:// or sandboxed — no meaningful URL to share */
  }
  return "";
}

/** Spoiler-free result card for a freshly filed case. */
export function caseShareText(opts: {
  title: string;
  stars: number;
  canonReached: boolean;
  usedHint: boolean;
  confession: boolean;
}): string {
  const xp = totalXp(loadSave());
  const { rank } = rankFor(xp);
  const stars = "★".repeat(opts.stars) + "☆".repeat(3 - opts.stars);
  const badges: string[] = [];
  if (opts.canonReached) badges.push("reached the true ending");
  if (!opts.usedHint) badges.push("no hints");
  if (opts.confession) badges.push("got a confession");
  const line = badges.length ? `\n${badges.join(" · ")}.` : "";
  const url = shareUrl();
  return (
    `COLD CASE 🕵️  I closed “${opts.title}”\n` +
    `${stars}  ·  ${rank.name}${line}\n\n` +
    `A dead person's phone. Read it, question the suspects, name what happened.` +
    (url ? `\nCan you crack it? ${url}` : `\nCan you crack it?`)
  );
}

/** Spoiler-free detective-card summary for the profile screen. */
export function profileShareText(opts: {
  solved: number;
  total: number;
  canon: number;
  stars: number;
}): string {
  const save = loadSave();
  const xp = totalXp(save);
  const { rank } = rankFor(xp);
  const name = (settings().investigatorName ?? "").trim();
  const who = name ? `Det. ${name}` : "My case file";
  const url = shareUrl();
  return (
    `COLD CASE 🕵️  ${who} — ${rank.name}\n` +
    `${opts.solved}/${opts.total} cases closed · ${opts.canon} true endings · ${opts.stars}★\n\n` +
    `It's a free noir detective game — you read a missing person's phone and file the verdict.` +
    (url ? `\n${url}` : "")
  );
}

/**
 * Try the native share sheet, fall back to clipboard, then to a manual toast.
 * Returns nothing — feedback is delivered as a toast.
 */
export async function doShare(text: string, opts: { title?: string } = {}): Promise<void> {
  const url = shareUrl();
  // 1) Native share sheet (mobile Safari/Chrome/Android). Strip the trailing
  //    URL from the body when we can pass it as a proper `url` field, so the
  //    sheet renders a real link preview instead of a duplicated string.
  const nav = navigator as Navigator & {
    share?: (d: ShareData) => Promise<void>;
    canShare?: (d: ShareData) => boolean;
  };
  if (typeof nav.share === "function") {
    const data: ShareData = url
      ? { title: opts.title ?? "COLD CASE", text: text.replace(new RegExp("\\n?" + escapeRe(url) + "$"), ""), url }
      : { title: opts.title ?? "COLD CASE", text };
    try {
      if (!nav.canShare || nav.canShare(data)) {
        await nav.share(data);
        return; // shared (or the user opened the sheet and dismissed it)
      }
    } catch (err) {
      // AbortError = user cancelled the sheet; that's not a failure, stay quiet.
      if ((err as DOMException)?.name === "AbortError") return;
      // otherwise fall through to clipboard
    }
  }

  // 2) Clipboard copy.
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      toast("Copied — paste it anywhere to share");
      playConfirm();
      vibrate(10);
      return;
    }
  } catch {
    /* clipboard blocked — fall through */
  }

  // 3) Last resort: show the text in a selectable toast so it can be copied by hand.
  manualCopyToast(text);
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

let toastTimer: number | undefined;

/** A brief, self-dismissing toast pinned to the bottom of the viewport. */
export function toast(message: string): void {
  document.querySelectorAll(".cc-toast").forEach((n) => n.remove());
  if (toastTimer) window.clearTimeout(toastTimer);
  const el = h("div", { class: "cc-toast", role: "status", "aria-live": "polite" }, message);
  document.body.appendChild(el);
  // force reflow so the entrance transition runs
  void el.offsetWidth;
  el.classList.add("cc-toast-in");
  toastTimer = window.setTimeout(() => {
    el.classList.remove("cc-toast-in");
    window.setTimeout(() => el.remove(), 320);
  }, 2600);
}

/** When clipboard is unavailable, present the text pre-selected to copy manually. */
function manualCopyToast(text: string): void {
  document.querySelectorAll(".cc-copysheet").forEach((n) => n.remove());
  const sheet = h("div", { class: "cc-copysheet", role: "dialog", "aria-label": "Copy your result" });
  const area = h("textarea", { class: "cc-copysheet-text", readonly: true, rows: "6" }) as HTMLTextAreaElement;
  area.value = text;
  const done = h("button", { class: "cc-copysheet-done", type: "button" }, "Done");
  done.addEventListener("click", () => sheet.remove());
  sheet.append(
    h("p", { class: "cc-copysheet-title" }, "Select and copy your result"),
    area,
    done,
  );
  document.body.appendChild(sheet);
  window.setTimeout(() => {
    area.focus();
    area.select();
  }, 60);
}
