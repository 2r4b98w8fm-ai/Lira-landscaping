import type { CaseFile } from "./types";
import { CASE_MANIFEST, loadCase, type CaseManifestEntry } from "./cases";

/** The real cases — the tutorial is excluded from all progress counts. */
const PLAYABLE = CASE_MANIFEST.filter((e) => !e.tutorial);
import { h, clear, svgEl } from "./lib/dom";
import { caseProgress, loadSave, currentStreak, persist, settings } from "./save";
import { renderIntro } from "./intro";
import { DeviceRuntime } from "./device/runtime";
import { buildAppRegistry } from "./device/apps";
import { buildLockScreen } from "./device/lockscreen";
import { buildHomeScreen } from "./device/homescreen";
import { syncAmbient, syncMenuMusic, stopMenuMusic } from "./audio";
import { totalXp, rankFor, ACHIEVEMENTS, unlockedAchievements, RANKS } from "./progression";

/**
 * The out-of-fiction shell: a case archive. Selecting a case lazily loads
 * its data chunk and boots the phone.
 */
/** Apply the chosen case-board colour theme to the document. */
function applyBoardTheme(): void {
  document.documentElement.dataset.board = settings().boardTheme ?? "noir";
}

export function renderCaseSelect(host: HTMLElement): void {
  clear(host);
  applyBoardTheme();
  syncMenuMusic(); // the archive/title carries the soundtrack; cases fall silent
  const root = h("div", { class: "archive" });

  root.appendChild(
    h(
      "header",
      { class: "archive-hdr" },
      h("p", { class: "archive-kicker" }, "Evidence Review Terminal"),
      h("h1", { class: "archive-title" }, "COLD CASE"),
      h(
        "p",
        { class: "archive-sub" },
        "Recovered devices. Open a phone. Find what it remembers.",
      ),
    ),
  );

  root.appendChild(buildProfileButton(host));
  buildStreakNudge(root);
  buildResumeBanner(host, root);
  buildDailyCase(host, root);
  root.appendChild(buildHowToPanel());

  // Tutorial sits up top, flagged, before the real files.
  const tutorial = CASE_MANIFEST.find((e) => e.tutorial);
  if (tutorial) {
    root.appendChild(h("h2", { class: "archive-section" }, "Start here — Training"));
    root.appendChild(buildCaseCard(host, tutorial));
  }

  const hasSeasonTwo = CASE_MANIFEST.some((e) => !e.tutorial && e.season === "two");
  for (const [season, label] of [["one", "The Cold Case Files"], ["two", "Season Two — New Files"]] as const) {
    const entries = CASE_MANIFEST.filter((e) => !e.tutorial && (e.season ?? "one") === season);
    if (!entries.length) continue;
    if (hasSeasonTwo) root.appendChild(h("h2", { class: "archive-section" }, label));
    const list = h("div", { class: "archive-list", role: "list" });
    for (const entry of entries) list.appendChild(buildCaseCard(host, entry));
    root.appendChild(list);
  }
  buildFinaleCard(host, root);
  root.appendChild(
    h(
      "footer",
      { class: "archive-foot" },
      "Progress is stored on this device only. Everything is playable, free, offline.",
    ),
  );
  host.appendChild(root);
}

/** One case card, with difficulty, stars, and an exploration progress ring. */
function buildCaseCard(host: HTMLElement, entry: CaseManifestEntry): HTMLElement {
  const p = caseProgress(entry.id);
  const status = p.completed ? "Report filed" : p.unlocked ? "In progress" : "Unopened";
  const stars = p.stars ?? 0;
  const pct = p.citableTotal ? Math.round(((p.citableFound ?? 0) / p.citableTotal) * 100) : 0;
  const card = h(
    "button",
    { class: `archive-card${p.completed ? " archive-done" : ""}${entry.tutorial ? " archive-tutorial" : ""}`, type: "button", role: "listitem" },
    h(
      "div",
      { class: "archive-card-head" },
      h("span", { class: "archive-case-id" }, entry.tutorial ? "🕵️ TUTORIAL" : entry.id.toUpperCase()),
      h(
        "span",
        { class: `archive-status archive-status-${p.completed ? "done" : p.unlocked ? "open" : "new"}` },
        status,
      ),
    ),
    h(
      "div",
      { class: "archive-card-top" },
      h(
        "div",
        { class: "archive-card-titles" },
        h("h2", { class: "archive-card-title" }, entry.title),
        h("p", { class: "archive-card-victim" }, entry.victimName),
      ),
      p.unlocked ? explorationRing(pct) : null,
    ),
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
  return card;
}

/** A small SVG donut showing how much of a case's evidence has been found. */
function explorationRing(pct: number): HTMLElement {
  const r = 15;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - pct / 100);
  const done = pct >= 100;
  const svg =
    `<svg viewBox="0 0 40 40" role="img" aria-label="${pct}% explored">` +
    `<circle cx="20" cy="20" r="${r}" fill="none" stroke="rgba(0,0,0,0.09)" stroke-width="4"/>` +
    `<circle cx="20" cy="20" r="${r}" fill="none" stroke="${done ? "#1d7a3e" : "#007aff"}" stroke-width="4" stroke-linecap="round" ` +
    `stroke-dasharray="${circ.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 20 20)"/>` +
    `<text x="20" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="${done ? "#1d7a3e" : "#3c3c43"}" font-family="inherit">${done ? "✓" : pct}</text>` +
    `</svg>`;
  return h("span", { class: "explore-ring", title: `${pct}% explored` }, svgEl(svg, "explore-ring-svg"));
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
    const status = card.querySelector(".archive-status");
    if (status) status.textContent = "Load failed — tap to retry";
    else renderCaseSelect(host); // detached card (next-case jump) — fall back to the archive
  }
}

function buildProfileButton(host: HTMLElement): HTMLElement {
  const xp = totalXp(loadSave());
  const { rank, index } = rankFor(xp);
  const solved = PLAYABLE.filter((e) => caseProgress(e.id).completed).length;
  const streak = currentStreak();
  const btn = h(
    "button",
    { class: "archive-profile-btn", type: "button" },
    h("span", { class: "archive-profile-badge" }, rankBadge(index)),
    h(
      "span",
      { class: "archive-profile-main" },
      h("span", { class: "archive-profile-rank" }, rank.name),
      h("span", { class: "archive-profile-sub" }, `${xp} XP · ${solved}/${PLAYABLE.length} cases closed`),
    ),
    streak.count >= 2
      ? h("span", { class: "archive-streak", "aria-label": `${streak.count} day streak` }, `🔥 ${streak.count}`)
      : h("span", { class: "archive-profile-chev" }, "›"),
  );
  btn.addEventListener("click", () => renderProfile(host));
  return btn;
}

const RANK_BADGES = ["🔰", "🥉", "🥈", "🥇", "🎖️", "🏅", "⭐", "💎"];
function rankBadge(index: number): string {
  return RANK_BADGES[Math.min(index, RANK_BADGES.length - 1)];
}

/** Streak encouragement: celebrate today's play and nudge tomorrow. */
function buildStreakNudge(root: HTMLElement): void {
  const s = currentStreak();
  if (s.count < 1) return;
  const line =
    s.count === 1
      ? "🔥 Day 1. Come back tomorrow to build your streak."
      : `🔥 ${s.count}-day streak${s.best > s.count ? ` · best ${s.best}` : ""}. Play again tomorrow to keep it going.`;
  root.appendChild(h("div", { class: "streak-nudge" }, line));
}

/** "Continue" banner for the case most recently opened but not yet filed. */
function buildResumeBanner(host: HTMLElement, root: HTMLElement): void {
  const lastId = loadSave().lastCaseId;
  const entry = CASE_MANIFEST.find((e) => e.id === lastId);
  if (!entry) return;
  const p = caseProgress(entry.id);
  if (!p.unlocked || p.completed) return;
  const pct = p.citableTotal ? Math.round(((p.citableFound ?? 0) / p.citableTotal) * 100) : 0;
  const banner = h(
    "button",
    { class: "resume-banner", type: "button" },
    h("span", { class: "resume-eyebrow" }, "Continue investigating"),
    h("span", { class: "resume-title" }, entry.title),
    h("span", { class: "resume-sub" }, `${entry.victimName} · ${pct}% explored`),
    h("span", { class: "resume-go" }, "Resume →"),
  );
  banner.addEventListener("click", () => void openCase(host, entry, banner as unknown as HTMLButtonElement));
  root.appendChild(banner);
}

/** A deterministic daily featured case, biased toward what's unplayed. */
function buildDailyCase(host: HTMLElement, root: HTMLElement): void {
  const day = new Date();
  const seed = day.getFullYear() * 1000 + day.getMonth() * 40 + day.getDate();
  const unplayed = PLAYABLE.filter((e) => !caseProgress(e.id).completed);
  const pool = unplayed.length ? unplayed : PLAYABLE;
  const pick = pool[seed % pool.length];
  const card = h(
    "button",
    { class: "daily-card", type: "button" },
    h("span", { class: "daily-eyebrow" }, "🗓️  Case file of the day"),
    h("span", { class: "daily-title" }, pick.title),
    h("span", { class: "daily-victim" }, pick.victimName),
    h("span", { class: "daily-deck" }, pick.deck),
  );
  card.addEventListener("click", () => void openCase(host, pick, card));
  root.appendChild(card);
}

/** Locked commendation that opens once every case has been filed. */
function buildFinaleCard(host: HTMLElement, root: HTMLElement): void {
  const solved = PLAYABLE.filter((e) => caseProgress(e.id).completed).length;
  const total = PLAYABLE.length;
  const unlocked = solved >= total;
  const card = h(
    "button",
    { class: `finale-card${unlocked ? " finale-unlocked" : ""}`, type: "button" },
    h("span", { class: "finale-badge" }, unlocked ? "🏅" : "🔒"),
    h(
      "span",
      { class: "finale-main" },
      h("span", { class: "finale-title" }, unlocked ? "Cold Case Unit — Commendation" : "Commendation (locked)"),
      h("span", { class: "finale-sub" }, unlocked ? "You closed every file. Open your commendation." : `File all ${total} cases to unlock. ${solved}/${total} filed.`),
    ),
  );
  if (unlocked) card.addEventListener("click", () => renderFinale(host));
  else card.setAttribute("disabled", "");
  root.appendChild(card);
}

export function renderProfile(host: HTMLElement): void {
  clear(host);
  applyBoardTheme();
  const save = loadSave();
  const xp = totalXp(save);
  const { rank, index, next, progress } = rankFor(xp);
  const solved = PLAYABLE.filter((e) => caseProgress(e.id).completed).length;
  const totalStars = PLAYABLE.reduce((sum, e) => sum + (caseProgress(e.id).stars ?? 0), 0);
  const canon = PLAYABLE.filter((e) => caseProgress(e.id).canonReached).length;
  const have = unlockedAchievements();
  const streak = currentStreak();

  const root = h("div", { class: "archive" });

  const back = h("button", { class: "dossier-skip", type: "button" }, "‹ Back to case files");
  back.addEventListener("click", () => renderCaseSelect(host));
  root.appendChild(back);

  const name = (settings().investigatorName ?? "").trim();
  const hero = h(
    "div",
    { class: "profile-hero" },
    h("div", { class: "profile-badge" }, rankBadge(index)),
    name ? h("div", { class: "profile-name" }, `Det. ${name}`) : null,
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
    statCell(streak.count > 0 ? `🔥 ${streak.count}` : "—", streak.best > streak.count ? `Day streak · best ${streak.best}` : "Day streak"),
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
      h("h2", { class: "section-label" }, "Detective ID"),
      buildIdentityPanel(host),
      h("h2", { class: "section-label" }, "Achievements"),
      grid,
      h("h2", { class: "section-label" }, "Game"),
      buildManageButtons(host),
    ),
  );
  host.appendChild(root);
}

/** Name yourself and set the board theme — the personalization panel. */
function buildIdentityPanel(host: HTMLElement): HTMLElement {
  const wrap = h("div", { class: "id-panel" });

  const nameRow = h("label", { class: "id-field" }, h("span", { class: "id-label" }, "Your name, detective"));
  const input = h("input", {
    class: "id-input",
    type: "text",
    maxlength: "22",
    placeholder: "e.g. Vega, Okafor, Larry Jr.",
    value: (settings().investigatorName ?? ""),
  }) as HTMLInputElement;
  input.addEventListener("input", () => {
    loadSave().settings.investigatorName = input.value.slice(0, 22);
    persist();
  });
  nameRow.appendChild(input);
  wrap.appendChild(nameRow);

  const themeRow = h("div", { class: "id-field" }, h("span", { class: "id-label" }, "Case-board theme"));
  const seg = h("div", { class: "id-seg" });
  const themes: Array<["noir" | "sepia" | "slate", string]> = [
    ["noir", "Noir"],
    ["sepia", "Sepia"],
    ["slate", "Nightshift"],
  ];
  const current = settings().boardTheme ?? "noir";
  for (const [id, label] of themes) {
    const b = h("button", { class: `id-seg-btn${current === id ? " id-seg-on" : ""}`, type: "button" }, label);
    b.addEventListener("click", () => {
      loadSave().settings.boardTheme = id;
      persist();
      renderProfile(host); // re-render so the swatch updates live
    });
    seg.appendChild(b);
  }
  themeRow.appendChild(seg);
  wrap.appendChild(themeRow);
  return wrap;
}

/** Replay the title, restart the tutorial, or wipe progress on this device. */
function buildManageButtons(host: HTMLElement): HTMLElement {
  const wrap = h("div", { class: "profile-manage" });

  const replay = h("button", { class: "manage-btn", type: "button" }, "▶  Replay the title screen");
  replay.addEventListener("click", () => renderIntro(host, () => renderCaseSelect(host)));

  const retut = h("button", { class: "manage-btn", type: "button" }, "🕵️  Restart the tutorial");
  retut.addEventListener("click", () => {
    delete loadSave().cases["case-00"];
    persist();
    const t = CASE_MANIFEST.find((e) => e.tutorial);
    if (t) void openCase(host, t, h("button") as HTMLButtonElement);
  });

  const reset = h("button", { class: "manage-btn manage-danger", type: "button" }, "🗑  Reset all progress");
  let armed = false;
  reset.addEventListener("click", () => {
    if (!armed) {
      armed = true;
      reset.textContent = "Tap again to confirm — this erases everything";
      window.setTimeout(() => {
        armed = false;
        reset.textContent = "🗑  Reset all progress";
      }, 4000);
      return;
    }
    const save = loadSave();
    save.cases = {};
    save.achievements = [];
    delete save.streak;
    delete save.lastCaseId;
    persist();
    renderCaseSelect(host);
  });

  wrap.append(replay, retut, reset);
  return wrap;
}

function statCell(num: string, label: string): HTMLElement {
  return h(
    "div",
    { class: "profile-stat" },
    h("div", { class: "profile-stat-num" }, num),
    h("div", { class: "profile-stat-label" }, label),
  );
}

/** The endgame: a commendation letter once all fifteen files are closed. */
export function renderFinale(host: HTMLElement): void {
  clear(host);
  applyBoardTheme();
  const save = loadSave();
  const canon = PLAYABLE.filter((e) => caseProgress(e.id).canonReached).length;
  const stars = PLAYABLE.reduce((s, e) => s + (caseProgress(e.id).stars ?? 0), 0);
  const xp = totalXp(save);
  const { rank } = rankFor(xp);
  const allCanon = canon >= PLAYABLE.length;

  const root = h("div", { class: "archive" });
  const back = h("button", { class: "dossier-skip", type: "button" }, "‹ Back to case files");
  back.addEventListener("click", () => renderCaseSelect(host));
  root.appendChild(back);

  const finaleName = (settings().investigatorName ?? "").trim();
  const salutation = finaleName ? `Detective ${finaleName},` : "Detective,";
  const letter = h(
    "div",
    { class: "finale-letter" },
    h("p", { class: "finale-seal" }, "🏅"),
    h("p", { class: "finale-kicker" }, "COLD CASE UNIT · OFFICE OF THE DIRECTOR"),
    h("h1", { class: "finale-head" }, "Commendation"),
    h("p", { class: "finale-salut" }, salutation),
    h("p", { class: "finale-para" }, `${PLAYABLE.length} files. Every one of them had been closed before you arrived — voluntary departure, walked off the job, wandered off, ran. ${PLAYABLE.length} people the paperwork had already given up on.`),
    h("p", { class: "finale-para" }, `You opened the phones anyway. You read the messages nobody re-read, found the photos that shouldn't develop, and listened to the voicemails that were still, quietly, waiting for a call back. You reached ${canon} of ${PLAYABLE.length} true endings and earned ${stars} of ${PLAYABLE.length * 3} stars.`),
    h("p", { class: "finale-para" }, allCanon
      ? `You reached the truth of every single one. Some of those truths could be arrested. Some could only be witnessed. You did not look away from either kind. That is the whole job, and almost no one does all of it.`
      : `Some truths you named exactly; others you'll want to come back for. The files stay open on this device — the dead are patient, and so, it turns out, are you.`),
    h("p", { class: "finale-sign" }, `— filed under your rank: ${rank.name}`),
    h("p", { class: "finale-coda" }, `The people in these files were invented. The way they were failed first, and looked for last, was not. Thank you for looking.`),
  );
  root.appendChild(h("div", { class: "profile" }, letter));
  host.appendChild(root);
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
  loadSave().lastCaseId = caseFile.id;
  stopMenuMusic(); // inside a case, the phone is silent tech — only its own soundscape
  const rt = new DeviceRuntime({
    caseFile,
    apps: buildAppRegistry(),
    host,
    onExit: () => renderCaseSelect(host),
    onNextCase: () => {
      const next = nextUnfinishedCase(caseFile.id);
      if (next) void openCase(host, next, h("button") as HTMLButtonElement);
      else renderCaseSelect(host);
    },
  });
  rt.push(buildLockScreen(rt), { transition: "none" });
  if (caseProgress(caseFile.id).unlocked) {
    // returning player: resume straight past the lock screen
    rt.push(buildHomeScreen(rt), { transition: "none" });
  }
  syncAmbient();
}

/** The next real case after `currentId` that hasn't been completed (wraps around). */
export function nextUnfinishedCase(currentId: string): CaseManifestEntry | undefined {
  const n = PLAYABLE.length;
  const start = PLAYABLE.findIndex((e) => e.id === currentId);
  // From the tutorial (start === -1), begin at the first real case.
  for (let i = 1; i <= n; i++) {
    const entry = PLAYABLE[(start + i + n) % n];
    if (!caseProgress(entry.id).completed) return entry;
  }
  return undefined;
}
