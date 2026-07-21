import "@fontsource-variable/inter";
import "./styles.css";
import { loadAllCases } from "./cases";
import { validateAll } from "./validator";
import { renderCaseSelect } from "./caseselect";
import { renderIntro } from "./intro";
import { loadSave, recordPlayDay } from "./save";

// Content is validated by `npm run validate` at build time; this dev-mode
// pass catches issues instantly while authoring cases. It loads every case
// chunk, which is fine in dev and never runs in production.
if (import.meta.env.DEV) {
  void loadAllCases().then(validateAll);
}

loadSave();
recordPlayDay();

const host = document.getElementById("app")!;
renderIntro(host, () => renderCaseSelect(host));

// PWA: register the service worker in hosted production builds only.
// (Skipped for the single-file build and file:// usage, where there is no
// /sw.js to fetch — the game is already fully self-contained there.)
if ("serviceWorker" in navigator && import.meta.env.PROD && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
