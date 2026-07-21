import "@fontsource-variable/inter";
import "./styles.css";
import { loadAllCases } from "./cases";
import { validateAll } from "./validator";
import { renderCaseSelect } from "./caseselect";
import { renderIntro } from "./intro";
import { loadSave, recordPlayDay, settings } from "./save";
import { playTap, playBack } from "./audio";
import { vibrate } from "./lib/haptics";

// Content is validated by `npm run validate` at build time; this dev-mode
// pass catches issues instantly while authoring cases. It loads every case
// chunk, which is fine in dev and never runs in production.
if (import.meta.env.DEV) {
  void loadAllCases().then(validateAll);
}

loadSave();
recordPlayDay();

// When the game is embedded in another site's frame (e.g. the claude.ai
// artifact viewer), that host paints its own bar across the top. Flag it so
// the CSS can nudge our content down and clear it. Standalone / single-file
// play is never framed, so it keeps the full screen.
try {
  if (window.self !== window.top) document.documentElement.classList.add("embedded");
} catch {
  // cross-origin access threw — that itself means we're framed
  document.documentElement.classList.add("embedded");
}

const host = document.getElementById("app")!;
renderIntro(host, () => renderCaseSelect(host));

// Global, subtle UI feedback: a soft tap + tiny haptic on any button press.
// Gated by the Settings toggles (uiSounds/haptics), which default on.
document.addEventListener(
  "click",
  (e) => {
    const btn = (e.target as HTMLElement | null)?.closest("button");
    if (!btn || btn.hasAttribute("disabled")) return;
    if (btn.classList.contains("hdr-back") || btn.classList.contains("dossier-back")) playBack();
    else playTap();
    if (settings().haptics !== false) vibrate(8);
  },
  true,
);

// PWA: register the service worker in hosted production builds only.
// (Skipped for the single-file build and file:// usage, where there is no
// /sw.js to fetch — the game is already fully self-contained there.)
if ("serviceWorker" in navigator && import.meta.env.PROD && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
