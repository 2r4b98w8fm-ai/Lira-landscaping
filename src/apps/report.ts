import type { DeviceRuntime } from "../device/runtime";
import type { Verdict } from "../types";
import { h } from "../lib/dom";
import { citableEvidence, type CitableItem } from "../validator";
import { loadSave, persist, settings } from "../save";
import { triggerGlitch } from "../glitch";
import { playStinger } from "../audio";
import { scoreCase, totalXp, rankFor, evaluateAchievements, type CaseScore } from "../progression";
import { vibrate } from "../lib/haptics";
import { aftermathFor } from "../cases/aftermath";
import { nextUnfinishedCase } from "../caseselect";

const APP_LABELS: Record<string, string> = {
  messages: "Messages",
  photos: "Photos",
  notes: "Notes",
  phone: "Voicemail",
  calendar: "Calendar",
  maps: "Locations",
  browser: "Browser",
  hidden: "Hidden app",
};

/**
 * Case report: pick a theory, cite discovered evidence, get the epilogue of
 * the closest-matching verdict. Submitting completes the case (revisitable).
 */
export function openReport(rt: DeviceRuntime): HTMLElement {
  const view = h("div", { class: "app app-report" });
  view.appendChild(rt.appHeader("Case Report"));
  const body = h("div", { class: "app-scroll" });
  view.appendChild(body);

  if (rt.progress.completed && rt.progress.verdictChosen) {
    renderEpilogue(rt, body, rt.progress.verdictChosen, rt.progress.citedEvidence ?? []);
    return view;
  }

  const all = citableEvidence(rt.caseFile);
  const discovered = all.filter((item) => rt.hasViewed(item.discoveredBy));

  body.appendChild(h("h2", { class: "section-label" }, "1 · What do you believe happened?"));
  let chosenVerdict: string | null = null;
  const verdictBtns = new Map<string, HTMLElement>();
  for (const v of rt.caseFile.verdicts) {
    const btn = h(
      "button",
      { class: "verdict-option", type: "button", "aria-pressed": "false" },
      h("span", { class: "row-title" }, v.label),
      h("span", { class: "row-sub" }, v.description),
    );
    btn.addEventListener("click", () => {
      chosenVerdict = v.id;
      for (const [id, b] of verdictBtns) {
        b.classList.toggle("verdict-chosen", id === v.id);
        b.setAttribute("aria-pressed", String(id === v.id));
      }
      syncSubmit();
    });
    verdictBtns.set(v.id, btn);
    body.appendChild(btn);
  }

  body.appendChild(h("h2", { class: "section-label" }, "2 · Cite your evidence"));
  body.appendChild(
    h(
      "p",
      { class: "folder-note" },
      discovered.length === all.length
        ? "Everything you found is listed below."
        : `You've found ${discovered.length} of ${all.length} citable items. Missing pieces are still on the phone.`,
    ),
  );

  const cited = new Set<string>();
  const grouped = new Map<string, CitableItem[]>();
  for (const item of discovered) {
    const arr = grouped.get(item.appId) ?? [];
    arr.push(item);
    grouped.set(item.appId, arr);
  }
  for (const [appId, items] of grouped) {
    body.appendChild(h("h3", { class: "evidence-group" }, APP_LABELS[appId] ?? appId));
    for (const item of items) {
      const check = h(
        "button",
        { class: "evidence-item", type: "button", "aria-pressed": "false" },
        h("span", { class: "evidence-box", "aria-hidden": "true" }),
        h("span", { class: "evidence-label" }, item.label),
      );
      check.addEventListener("click", () => {
        if (cited.has(item.id)) cited.delete(item.id);
        else cited.add(item.id);
        check.classList.toggle("evidence-cited", cited.has(item.id));
        check.setAttribute("aria-pressed", String(cited.has(item.id)));
        syncSubmit();
      });
      body.appendChild(check);
    }
  }

  const submit = h("button", { class: "report-submit", type: "button", disabled: true }, "File report");
  body.appendChild(submit);
  const submitNote = h("p", { class: "folder-note" }, "Choose a theory and cite at least two items.");
  body.appendChild(submitNote);

  function syncSubmit(): void {
    const ready = chosenVerdict !== null && cited.size >= 2;
    if (ready) submit.removeAttribute("disabled");
    else submit.setAttribute("disabled", "");
  }

  submit.addEventListener("click", () => {
    if (!chosenVerdict) return;
    // score every verdict against the citation set; closest match tells the epilogue
    const best = closestVerdict(rt.caseFile.verdicts, chosenVerdict, cited);
    const score = scoreCase(rt.caseFile, rt.progress, best.id, cited);
    rt.progress.verdictChosen = best.id;
    rt.progress.citedEvidence = [...cited];
    rt.progress.completed = true;
    rt.progress.canonReached = score.canonReached;
    rt.progress.stars = Math.max(rt.progress.stars ?? 0, score.stars);
    rt.progress.bestScore = Math.max(rt.progress.bestScore ?? 0, score.points);
    rt.progress.solvedHard = rt.progress.solvedHard || !!settings().hardMode;
    rt.progress.allNotesUnlocked =
      rt.caseFile.notes.filter((n) => n.lock).every((n) => rt.progress.unlockedNotes.includes(n.id));
    persist();
    const newAchievements = evaluateAchievements();
    triggerGlitch(500);
    playStinger();
    vibrate([16, 40, 24]);
    body.replaceChildren();
    renderResults(rt, body, best.id, [...cited], score, newAchievements);
    body.scrollTop = 0;
  });

  return view;
}

function renderResults(
  rt: DeviceRuntime,
  body: HTMLElement,
  verdictId: string,
  cited: string[],
  score: CaseScore,
  newAchievements: import("../progression").Achievement[],
): void {
  const xp = totalXp(loadSave());
  const { rank, next, progress } = rankFor(xp);

  const results = h("div", { class: "results" });
  results.appendChild(h("p", { class: "results-kicker" }, "Case Closed"));

  // stars, animated in
  const starRow = h("div", { class: "results-stars", "aria-label": `${score.stars} of 3 stars` });
  for (let i = 0; i < 3; i++) {
    const star = h("span", { class: "results-star" }, "★");
    starRow.appendChild(star);
    if (i < score.stars) {
      window.setTimeout(() => {
        star.classList.add("results-star-on");
        playStinger();
        vibrate(12);
      }, 350 + i * 380);
    }
  }
  results.appendChild(starRow);
  results.appendChild(
    h("p", { class: "results-verdict" }, score.canonReached ? "You reached the truth of it." : "Report filed. The truth may run deeper."),
  );

  // score breakdown
  const breakdown = h("div", { class: "results-breakdown" });
  for (const line of score.lines) {
    breakdown.appendChild(
      h(
        "div",
        { class: `results-line${line.got ? " results-line-got" : ""}` },
        h("span", { class: "results-line-check" }, line.got ? "✓" : "—"),
        h("span", { class: "results-line-label" }, line.label),
        h("span", { class: "results-line-pts" }, line.got ? `+${line.points}` : "0"),
      ),
    );
  }
  results.appendChild(breakdown);
  results.appendChild(
    h(
      "div",
      { class: "results-xp" },
      h("div", { class: "results-xp-head" }, h("span", {}, rank.name), h("span", {}, next ? `${xp} / ${next.at} XP` : `${xp} XP · max rank`)),
      h("div", { class: "results-xp-bar" }, (() => {
        const fill = h("div", { class: "results-xp-fill" });
        window.setTimeout(() => (fill.style.width = `${Math.round(progress * 100)}%`), 200);
        return fill;
      })()),
    ),
  );

  body.appendChild(results);

  // achievement pop-ins
  if (newAchievements.length) {
    const shelf = h("div", { class: "results-achv" });
    shelf.appendChild(h("p", { class: "section-label" }, "Achievements unlocked"));
    newAchievements.forEach((a, i) => {
      const card = h(
        "div",
        { class: "achv-pop" },
        h("span", { class: "achv-emoji" }, a.emoji),
        h("span", { class: "row-main" }, h("span", { class: "row-title" }, a.name), h("span", { class: "row-sub" }, a.desc)),
      );
      shelf.appendChild(card);
      window.setTimeout(() => card.classList.add("achv-pop-in"), 1500 + i * 300);
    });
    body.appendChild(shelf);
  }

  // the epilogue, revealed after the celebration
  renderEpilogue(rt, body, verdictId, cited);
}

function closestVerdict(verdicts: Verdict[], chosenId: string, cited: Set<string>): Verdict {
  // The chosen theory anchors the result; but if the cited evidence
  // overwhelmingly matches a different verdict's required set, that one wins —
  // the evidence outranks the hunch.
  let best: Verdict = verdicts.find((v) => v.id === chosenId)!;
  let bestScore = score(best, cited) + 0.35; // hunch bonus
  for (const v of verdicts) {
    const s = score(v, cited);
    if (s > bestScore) {
      best = v;
      bestScore = s;
    }
  }
  return best;
}

function score(v: Verdict, cited: Set<string>): number {
  if (v.requiredEvidenceIds.length === 0) return 0;
  let hits = 0;
  for (const id of v.requiredEvidenceIds) if (cited.has(id)) hits++;
  return hits / v.requiredEvidenceIds.length;
}

function renderEpilogue(rt: DeviceRuntime, body: HTMLElement, verdictId: string, cited: string[]): void {
  const verdict = rt.caseFile.verdicts.find((v) => v.id === verdictId);
  if (!verdict) return;
  body.appendChild(h("h2", { class: "section-label" }, "Report filed"));
  body.appendChild(
    h(
      "div",
      { class: "epilogue" },
      h("h3", { class: "epilogue-title" }, verdict.label),
      ...verdict.epilogue.split("\n\n").map((p) => h("p", { class: "epilogue-para" }, p)),
    ),
  );

  renderAftermath(rt, body);

  body.appendChild(
    h("p", { class: "folder-note" }, `Filed with ${cited.length} cited items. The case stays open on this device — you can keep looking.`),
  );
  const next = nextUnfinishedCase(rt.caseFile.id);
  if (next) {
    const nextBtn = h(
      "button",
      { class: "report-submit report-next", type: "button" },
      `Next case →  ${next.title}`,
    );
    nextBtn.addEventListener("click", () => rt.nextCase());
    body.appendChild(nextBtn);
  }
  const back = h("button", { class: "settings-btn", type: "button" }, "Return to case files");
  back.addEventListener("click", () => rt.exitCase());
  body.appendChild(back);
}

/** The case's final page: arrest, trial, sentence, and the family's words. */
function renderAftermath(rt: DeviceRuntime, body: HTMLElement): void {
  const a = aftermathFor(rt.caseFile.id);
  if (!a) return;
  const RES_LABEL: Record<string, string> = {
    convicted: "Conviction secured",
    charged: "Charges filed",
    unresolved: "Case remains open",
    sealed: "File sealed",
  };
  const wrap = h("div", { class: "aftermath" });
  wrap.appendChild(h("p", { class: "aftermath-kicker" }, a.kicker));
  wrap.appendChild(h("div", { class: `aftermath-badge aftermath-${a.resolution}` }, RES_LABEL[a.resolution]));

  const seg = (label: string, text?: string): void => {
    if (!text) return;
    wrap.appendChild(
      h("div", { class: "aftermath-seg" }, h("span", { class: "aftermath-seg-label" }, label), h("p", { class: "aftermath-seg-text" }, text)),
    );
  };
  seg("The break in the case", a.arrest);
  seg("Charges", a.charges);
  seg("Plea", a.plea);
  seg("At trial", a.trial);
  seg("Sentence", a.sentence);
  seg("Disposition", a.disposition);

  wrap.appendChild(h("p", { class: "aftermath-family-label" }, "Those left behind"));
  for (const f of a.family) {
    wrap.appendChild(
      h(
        "figure",
        { class: "aftermath-quote" },
        h("blockquote", {}, f.quote),
        h("figcaption", {}, h("b", {}, f.name), ` — ${f.relation}`),
      ),
    );
  }
  wrap.appendChild(h("p", { class: "aftermath-coda" }, a.coda));
  body.appendChild(h("h2", { class: "section-label" }, "The aftermath"));
  body.appendChild(wrap);
}
