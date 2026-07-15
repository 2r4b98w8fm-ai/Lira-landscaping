import type { CaseFile } from "./types";
import { CASE_MANIFEST, type CaseManifestEntry } from "./cases";
import { h, clear } from "./lib/dom";
import { caseProgress } from "./save";
import { DeviceRuntime } from "./device/runtime";
import { buildAppRegistry } from "./device/apps";
import { buildLockScreen } from "./device/lockscreen";
import { buildHomeScreen } from "./device/homescreen";
import { syncAmbient } from "./audio";

/**
 * The out-of-fiction shell: a case archive. Selecting a case lazily loads
 * its data chunk and boots the phone.
 */
export function renderCaseSelect(host: HTMLElement): void {
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
  for (const entry of CASE_MANIFEST) {
    const p = caseProgress(entry.id);
    const status = p.completed ? "Report filed" : p.unlocked ? "In progress" : "Unopened";
    const card = h(
      "button",
      { class: `archive-card${p.completed ? " archive-done" : ""}`, type: "button", role: "listitem" },
      h(
        "div",
        { class: "archive-card-head" },
        h("span", { class: "archive-case-id" }, entry.id.toUpperCase()),
        h(
          "span",
          { class: `archive-status archive-status-${p.completed ? "done" : p.unlocked ? "open" : "new"}` },
          status,
        ),
      ),
      h("h2", { class: "archive-card-title" }, entry.title),
      h("p", { class: "archive-card-victim" }, entry.victimName),
      h("p", { class: "archive-card-summary" }, entry.deck),
      h(
        "p",
        { class: "archive-cw" },
        `Intensity ${"●".repeat(entry.contentWarningLevel)}${"○".repeat(3 - entry.contentWarningLevel)} — psychological horror, stalking themes, graphic imagery.`,
      ),
    );
    card.addEventListener("click", () => void openCase(host, entry, card));
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

async function openCase(host: HTMLElement, entry: CaseManifestEntry, card: HTMLButtonElement): Promise<void> {
  card.setAttribute("disabled", "");
  card.classList.add("archive-loading");
  try {
    const caseFile = await entry.load();
    bootCase(host, caseFile);
  } catch {
    // chunk failed to load (offline before first cache, flaky network) — recover
    card.removeAttribute("disabled");
    card.classList.remove("archive-loading");
    card.querySelector(".archive-status")!.textContent = "Load failed — tap to retry";
  }
}

function bootCase(host: HTMLElement, caseFile: CaseFile): void {
  const rt = new DeviceRuntime({
    caseFile,
    apps: buildAppRegistry(),
    host,
    onExit: () => renderCaseSelect(host),
  });
  rt.push(buildLockScreen(rt), { transition: "none" });
  if (caseProgress(caseFile.id).unlocked) {
    // returning player: resume straight past the lock screen
    rt.push(buildHomeScreen(rt), { transition: "none" });
  }
  syncAmbient();
}
