import type { CaseFile } from "./types";
import { CASE_MANIFEST, loadCase, type CaseManifestEntry } from "./cases";
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

  root.appendChild(buildHowToPanel());

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
    const caseFile = await loadCase(entry);
    const { briefingFor } = await import("./cases/briefings");
    const briefing = briefingFor(caseFile.id);
    const alreadyPlayed = caseProgress(caseFile.id).unlocked;
    if (briefing && !alreadyPlayed) {
      const { renderDossier } = await import("./dossier");
      renderDossier(host, entry, briefing, () => bootCase(host, caseFile), () => renderCaseSelect(host));
    } else {
      bootCase(host, caseFile);
    }
  } catch {
    // chunk failed to load (offline before first cache, flaky network) — recover
    card.removeAttribute("disabled");
    card.classList.remove("archive-loading");
    card.querySelector(".archive-status")!.textContent = "Load failed — tap to retry";
  }
}

function buildHowToPanel(): HTMLElement {
  const steps: Array<[string, string]> = [
    ["Open a case", "Tap a phone below. Swipe up (or tap “open”) to unlock it."],
    ["Explore the apps", "Read the Messages, Photos, Notes, Voicemail, Calendar, Maps and Browser. The story is scattered across all of them."],
    ["Crack the locked notes", "Some notes need a 4-digit code. Every code is hidden somewhere else on the same phone — a photo, a text, a search. No outside knowledge needed."],
    ["Watch for the wrong details", "A timestamp that can’t be real, a photo that edited itself, an app that isn’t what it says. Those are the clues."],
    ["File your verdict", "When you think you know, open the red Case Report app: pick a theory, tap the evidence that backs it, and submit."],
  ];
  const details = h(
    "details",
    { class: "howto" },
    h("summary", { class: "howto-summary" }, "How to play  ›"),
  );
  const body = h("div", { class: "howto-body" });
  steps.forEach(([title, text], i) => {
    body.appendChild(
      h(
        "div",
        { class: "howto-step" },
        h("span", { class: "howto-num" }, String(i + 1)),
        h(
          "span",
          { class: "howto-step-text" },
          h("span", { class: "howto-step-title" }, title),
          h("span", { class: "howto-step-body" }, text),
        ),
      ),
    );
  });
  body.appendChild(
    h(
      "p",
      { class: "howto-foot" },
      "There’s no way to lose and no timer. Poke at everything. Your progress saves automatically on this device.",
    ),
  );
  details.appendChild(body);
  return details;
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
