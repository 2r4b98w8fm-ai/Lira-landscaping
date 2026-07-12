import "@fontsource-variable/inter";
import "./styles.css";
import { ALL_CASES } from "./cases";
import { validateAll } from "./validator";
import { renderCaseSelect } from "./caseselect";
import { loadSave } from "./save";

// Content is also validated by `npm run validate` at build time; this dev-mode
// pass catches issues instantly while authoring cases.
if (import.meta.env.DEV) {
  validateAll(ALL_CASES);
}

loadSave();

const host = document.getElementById("app")!;
renderCaseSelect(host, ALL_CASES);

// PWA: register the service worker in production builds only.
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js");
  });
}
