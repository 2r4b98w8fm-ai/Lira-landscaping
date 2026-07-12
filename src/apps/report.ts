import type { DeviceRuntime } from "../device/runtime";
import type { Verdict } from "../types";
import { h } from "../lib/dom";
import { citableEvidence, type CitableItem } from "../validator";
import { persist } from "../save";
import { triggerGlitch } from "../glitch";

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
    rt.progress.verdictChosen = best.id;
    rt.progress.citedEvidence = [...cited];
    rt.progress.completed = true;
    persist();
    triggerGlitch(500);
    body.replaceChildren();
    renderEpilogue(rt, body, best.id, [...cited]);
    body.scrollTop = 0;
  });

  return view;
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
  body.appendChild(
    h("p", { class: "folder-note" }, `Filed with ${cited.length} cited items. The case stays open on this device — you can keep looking.`),
  );
  const back = h("button", { class: "settings-btn", type: "button" }, "Return to case files");
  back.addEventListener("click", () => rt.exitCase());
  body.appendChild(back);
}
