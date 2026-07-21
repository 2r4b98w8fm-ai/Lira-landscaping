import type { CaseFile } from "./types";
import { CASE_MANIFEST, loadCase, type CaseManifestEntry } from "./cases";
import { h, clear } from "./lib/dom";
import { caseProgress, loadSave } from "./save";
import { DeviceRuntime } from "./device/runtime";
import { buildAppRegistry } from "./device/apps";
import { buildLockScreen } from "./device/lockscreen";
import { buildHomeScreen } from "./device/homescreen";
import { syncAmbient } from "./audio";
import { totalXp, rankFor, ACHIEVEMENTS, unlockedAchievements, RANKS } from "./progression";

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

  root.appendChild(buildProfileButton(host));
  root.appendChild(buildHowToPanel());

  const list = h("div", { class: "archive-list", role: "list" });
  for (const entry of CASE_MANIFEST) {
    const p = caseProgress(entry.id);
    const status = p.completed ? "Report filed" : p.unlocked ? "In progress" : "Unopened";
    const stars = p.stars ?? 0;
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
        "div",
        { class: "archive-card-meta" },
        h(
          "span",
          { class: "diff-pips", "aria-label": `Difficulty ${entry.difficulty} of 3` },
          ...[1, 2, 3].map((n) => h("span", { class: `diff-pip${n <= entry.difficulty ? " diff-pip-on" : ""}` })),
        ),
        h("span", { class: "diff-label" }, ["", "Gentle", "Tricky", "Brutal"][entry.difficulty]),
        p.completed
          ? h(
              "span",
              { class: "card-stars", "aria-label": `${stars} of 3 stars` },
              ...[1, 2, 3].map((n) => h("span", { class: n <= stars ? "card-stars-on" : "" }, "★")),
            )
          : null,
      ),
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

function buildProfileButton(host: HTMLElement): HTMLElement {
  const xp = totalXp(loadSave());
  const { rank, index } = rankFor(xp);
  const solved = CASE_MANIFEST.filter((e) => caseProgress(e.id).completed).length;
  const btn = h(
    "button",
    { class: "archive-profile-btn", type: "button" },
    h("span", { class: "archive-profile-badge" }, rankBadge(index)),
    h(
      "span",
      { class: "archive-profile-main" },
      h("span", { class: "archive-profile-rank" }, rank.name),
      h("span", { class: "archive-profile-sub" }, `${xp} XP · ${solved}/${CASE_MANIFEST.length} cases closed`),
    ),
    h("span", { class: "archive-profile-chev" }, "›"),
  );
  btn.addEventListener("click", () => renderProfile(host));
  return btn;
}

const RANK_BADGES = ["🔰", "🥉", "🥈", "🥇", "🎖️", "🏅", "⭐", "💎"];
function rankBadge(index: number): string {
  return RANK_BADGES[Math.min(index, RANK_BADGES.length - 1)];
}

export function renderProfile(host: HTMLElement): void {
  clear(host);
  const save = loadSave();
  const xp = totalXp(save);
  const { rank, index, next, progress } = rankFor(xp);
  const solved = CASE_MANIFEST.filter((e) => caseProgress(e.id).completed).length;
  const totalStars = CASE_MANIFEST.reduce((sum, e) => sum + (caseProgress(e.id).stars ?? 0), 0);
  const canon = CASE_MANIFEST.filter((e) => caseProgress(e.id).canonReached).length;
  const have = unlockedAchievements();

  const root = h("div", { class: "archive" });

  const back = h("button", { class: "dossier-skip", type: "button" }, "‹ Back to case files");
  back.addEventListener("click", () => renderCaseSelect(host));
  root.appendChild(back);

  const hero = h(
    "div",
    { class: "profile-hero" },
    h("div", { class: "profile-badge" }, rankBadge(index)),
    h("div", { class: "profile-rank" }, rank.name),
    h(
      "div",
      { class: "profile-xp-line" },
      next ? `${xp} / ${next.at} XP · ${RANKS[index + 1].name} next` : `${xp} XP · maximum rank`,
    ),
    (() => {
      const bar = h("div", { class: "profile-xp-bar" });
      const fill = h("div", { class: "profile-xp-fill" });
      bar.appendChild(fill);
      window.setTimeout(() => (fill.style.width = `${Math.round(progress * 100)}%`), 120);
      return bar;
    })(),
  );

  const stats = h(
    "div",
    { class: "profile-stats" },
    statCell(String(solved), "Cases closed"),
    statCell(String(canon), "True endings"),
    statCell(`${totalStars}`, "Stars earned"),
    statCell(`${have.size}/${ACHIEVEMENTS.length}`, "Achievements"),
    statCell(String(xp), "Total XP"),
    statCell(`${CASE_MANIFEST.length - solved}`, "Cases left"),
  );

  const grid = h("div", { class: "profile-achv-grid" });
  for (const a of ACHIEVEMENTS) {
    const unlocked = have.has(a.id);
    grid.appendChild(
      h(
        "div",
        { class: `profile-achv${unlocked ? "" : " profile-achv-locked"}` },
        h("span", { class: "profile-achv-emoji" }, unlocked ? a.emoji : "🔒"),
        h("span", { class: "profile-achv-name" }, a.name),
        h("span", { class: "profile-achv-desc" }, a.desc),
      ),
    );
  }

  root.appendChild(
    h(
      "div",
      { class: "profile" },
      hero,
      h("h2", { class: "section-label" }, "Statistics"),
      stats,
      h("h2", { class: "section-label" }, "Achievements"),
      grid,
    ),
  );
  host.appendChild(root);
}

function statCell(num: string, label: string): HTMLElement {
  return h(
    "div",
    { class: "profile-stat" },
    h("div", { class: "profile-stat-num" }, num),
    h("div", { class: "profile-stat-label" }, label),
  );
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
