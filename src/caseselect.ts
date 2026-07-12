import type { CaseFile } from "./types";
import { h, clear } from "./lib/dom";
import { caseProgress } from "./save";
import { DeviceRuntime } from "./device/runtime";
import { buildAppRegistry } from "./device/apps";
import { buildLockScreen } from "./device/lockscreen";
import { buildHomeScreen } from "./device/homescreen";
import { syncAmbient } from "./audio";

/**
 * The out-of-fiction shell: a case archive. Selecting a case boots its phone.
 */
export function renderCaseSelect(host: HTMLElement, cases: CaseFile[]): void {
  clear(host);
  const root = h("div", { class: "archive" });

  root.appendChild(
    h(
      "header",
      { class: "archive-hdr" },
      h("p", { class: "archive-kicker" }, "Evidence Review Terminal"),
      h("h1", { class: "archive-title" }, "LAST SEEN"),
      h(
        "p",
        { class: "archive-sub" },
        "Recovered devices. Open a phone. Find what it remembers.",
      ),
    ),
  );

  const list = h("div", { class: "archive-list", role: "list" });
  for (const c of cases) {
    const p = caseProgress(c.id);
    const status = p.completed ? "Report filed" : p.unlocked ? "In progress" : "Unopened";
    const card = h(
      "button",
      { class: `archive-card${p.completed ? " archive-done" : ""}`, type: "button", role: "listitem" },
      h(
        "div",
        { class: "archive-card-head" },
        h("span", { class: "archive-case-id" }, c.id.toUpperCase()),
        h("span", { class: `archive-status archive-status-${p.completed ? "done" : p.unlocked ? "open" : "new"}` }, status),
      ),
      h("h2", { class: "archive-card-title" }, c.title),
      h("p", { class: "archive-card-victim" }, c.victimName),
      h("p", { class: "archive-card-summary" }, c.summary),
      h(
        "p",
        { class: "archive-cw" },
        `Intensity ${"●".repeat(c.contentWarningLevel)}${"○".repeat(3 - c.contentWarningLevel)} — psychological dread, stalking themes. No gore.`,
      ),
    );
    card.addEventListener("click", () => bootCase(host, cases, c));
    list.appendChild(card);
  }
  root.appendChild(list);
  root.appendChild(
    h(
      "footer",
      { class: "archive-foot" },
      "Progress is stored on this device only. Everything is playable, free, offline.",
    ),
  );
  host.appendChild(root);
}

function bootCase(host: HTMLElement, cases: CaseFile[], c: CaseFile): void {
  const rt = new DeviceRuntime({
    caseFile: c,
    apps: buildAppRegistry(),
    host,
    onExit: () => renderCaseSelect(host, cases),
  });
  rt.push(buildLockScreen(rt), { transition: "none" });
  if (caseProgress(c.id).unlocked) {
    // returning player: resume straight past the lock screen
    rt.push(buildHomeScreen(rt), { transition: "none" });
  }
  syncAmbient();
}
