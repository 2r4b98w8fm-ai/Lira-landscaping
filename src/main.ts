import "@fontsource-variable/inter";
import "./styles.css";
import { loadAllCases } from "./cases";
import { validateAll } from "./validator";
import { renderCaseSelect } from "./caseselect";
import { loadSave } from "./save";

// Content is validated by `npm run validate` at build time; this dev-mode
// pass catches issues instantly while authoring cases. It loads every case
// chunk, which is fine in dev and never runs in production.
if (import.meta.env.DEV) {
  void loadAllCases().then(validateAll);
}

loadSave();

const host = document.getElementById("app")!;
renderCaseSelect(host);

// PWA: register the service worker in production builds only.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js");
  });
}
