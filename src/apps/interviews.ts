import type { DeviceRuntime } from "../device/runtime";
import { h, svgEl } from "../lib/dom";
import { persist, settings } from "../save";
import { uiGlyph } from "../icons";
import { playTap, playStinger } from "../audio";
import { vibrate } from "../lib/haptics";
import { interrogationFor, type Suspect, type Line, type Tactic, type Outcome } from "../cases/interviews";

/**
 * The Interview Room — a branching interrogation. Pick a tactic; the suspect's
 * composure moves. Read them right and they break; push wrong and they wall up
 * and lawyer out. Different choices, different endings.
 */

const TACTIC: Record<Tactic, { label: string; glyph: string; cls: string }> = {
  press: { label: "PRESS", glyph: "🔨", cls: "iv-t-press" },
  empathize: { label: "EMPATHIZE", glyph: "🤝", cls: "iv-t-emp" },
  bluff: { label: "BLUFF", glyph: "🎭", cls: "iv-t-bluff" },
  evidence: { label: "EVIDENCE", glyph: "📎", cls: "iv-t-ev" },
  probe: { label: "PROBE", glyph: "🔍", cls: "iv-t-probe" },
};

const OUTCOME_UI: Record<Outcome, { title: string; sub: string; cls: string }> = {
  confession: { title: "SUBJECT BROKE", sub: "Confession on the record.", cls: "iv-out-guilt" },
  cleared: { title: "SUBJECT CLEARED", sub: "Their account holds. Rule them out.", cls: "iv-out-cleared" },
  clammed: { title: "SUBJECT LAWYERED UP", sub: "Interview suspended. You pushed too hard — try again.", cls: "iv-out-clam" },
  redirect: { title: "NEW LEAD", sub: "They've handed you the next name.", cls: "iv-out-lead" },
};

export function openInterviews(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const data = interrogationFor(rt.caseFile.id);
  const view = h("div", { class: "app app-interviews" });
  view.appendChild(rt.appHeader("Interview Room"));
  const body = h("div", { class: "app-scroll iv-list" });
  view.appendChild(body);

  if (!data) {
    body.appendChild(h("p", { class: "folder-note" }, "No interviews scheduled for this case."));
    return view;
  }

  body.appendChild(h("p", { class: "iv-brief" }, data.brief));
  body.appendChild(h("h2", { class: "iv-section" }, "Persons of Interest"));

  for (const s of data.suspects) {
    const outcome = rt.progress.interviewOutcomes?.[s.id];
    const card = h(
      "button",
      { class: "iv-file", type: "button", style: `--iv-hue:${s.hue}` },
      svgEl(mugshot(s), "iv-mug"),
      h(
        "span",
        { class: "iv-file-main" },
        h("span", { class: "iv-file-name" }, s.name),
        h("span", { class: "iv-file-role" }, s.role),
        outcome
          ? h("span", { class: `iv-file-verdict iv-v-${outcome}` }, outcomeLabel(outcome))
          : h("span", { class: "iv-file-status" }, "PERSON OF INTEREST"),
      ),
      svgEl(uiGlyph("chevron"), "glyph iv-file-chev"),
    );
    card.addEventListener("click", () => rt.push(suspectView(rt, s)));
    body.appendChild(card);
  }

  if (targetId) {
    const s = data.suspects.find((x) => x.id === targetId);
    if (s) window.setTimeout(() => rt.push(suspectView(rt, s)), 60);
  }
  return view;
}

function outcomeLabel(o: Outcome): string {
  return { confession: "● CONFESSION", cleared: "● CLEARED", clammed: "● STONEWALLED", redirect: "→ LEAD GIVEN" }[o];
}

// ---------------------------------------------------------------------------
// The interrogation itself
// ---------------------------------------------------------------------------

function suspectView(rt: DeviceRuntime, s: Suspect): HTMLElement {
  const view = h("div", { class: "app app-interviews iv-room", style: `--iv-hue:${s.hue}` });
  view.appendChild(rt.appHeader(s.name));

  // --- state ---
  let composure = s.composure;
  let guard = 0;
  const guardMax = s.guardMax ?? 3;
  const flags = new Set<string>();
  const used = new Set<string>();
  let over = false;

  // --- suspect file / meter header ---
  const meterFill = h("div", { class: "iv-meter-fill" });
  const meterWord = h("span", { class: "iv-meter-word" }, "Composed");
  const recTime = h("span", { class: "iv-rec-time" }, "00:00");
  const fileCard = h(
    "div",
    { class: "iv-room-file" },
    h(
      "div",
      { class: "iv-room-rec" },
      h("span", { class: "iv-rec-dot" }),
      h("span", {}, "REC"),
      recTime,
    ),
    svgEl(mugshot(s), "iv-room-mug"),
    h(
      "div",
      { class: "iv-room-id" },
      h("span", { class: "iv-room-name" }, s.name),
      h("span", { class: "iv-room-role" }, s.role),
    ),
    h(
      "div",
      { class: "iv-meter" },
      h("div", { class: "iv-meter-head" }, h("span", {}, "COMPOSURE"), meterWord),
      h("div", { class: "iv-meter-track" }, meterFill),
    ),
  );
  view.appendChild(fileCard);

  const transcript = h("div", { class: "iv-transcript" });
  const scroll = h("div", { class: "app-scroll iv-room-scroll" }, transcript);
  view.appendChild(scroll);

  const options = h("div", { class: "iv-options" });
  view.appendChild(options);

  // REC timer
  let secs = 0;
  const timer = window.setInterval(() => {
    secs++;
    recTime.textContent = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  }, 1000);
  view.addEventListener("view-removed", () => window.clearInterval(timer));

  function refreshMeter(hit = false): void {
    meterFill.style.width = `${composure}%`;
    const state = composure > 66 ? "Composed" : composure > 33 ? "Rattled" : composure > 12 ? "Cracking" : "Breaking";
    meterWord.textContent = state;
    meterFill.classList.toggle("iv-meter-low", composure <= 33);
    meterFill.classList.toggle("iv-meter-crit", composure <= 12);
    if (hit && !settings().reducedIntensity) {
      meterFill.classList.remove("iv-meter-hit");
      void meterFill.offsetWidth;
      meterFill.classList.add("iv-meter-hit");
    }
  }

  function line(cls: string, ...kids: (Node | string | null)[]): HTMLElement {
    const el = h("div", { class: cls }, ...kids);
    transcript.appendChild(el);
    return el;
  }
  function beat(text: string): void {
    line("iv-beat", text);
  }

  function saveOutcome(o: Outcome): void {
    rt.progress.interviewOutcomes = { ...(rt.progress.interviewOutcomes ?? {}), [s.id]: o };
    if (o === "confession") rt.progress.confessionHeard = true;
    persist();
  }

  function endInterview(o: Outcome, redirectTo?: string): void {
    over = true;
    saveOutcome(o);
    const ui = OUTCOME_UI[o];
    if (o === "confession") {
      vibrate([14, 50, 24]);
      if (!settings().reducedIntensity) playStinger();
    }
    const banner = h(
      "div",
      { class: `iv-outcome ${ui.cls}` },
      h("span", { class: "iv-outcome-title" }, ui.title),
      h("span", { class: "iv-outcome-sub" }, ui.sub),
    );
    options.replaceChildren(banner);

    if (o === "confession") window.setTimeout(() => rt.awardCheck(), 500);

    if (o === "redirect" && redirectTo) {
      const target = interrogationFor(rt.caseFile.id)?.suspects.find((x) => x.id === redirectTo);
      if (target && target.id !== s.id) {
        const jump = h("button", { class: "iv-jump", type: "button" }, `Bring in ${target.name} →`);
        jump.addEventListener("click", () => rt.push(suspectView(rt, target)));
        options.appendChild(jump);
      }
    }
    if (o === "clammed") {
      const retry = h("button", { class: "iv-retry", type: "button" }, "↺ Resume the interview");
      retry.addEventListener("click", () => rt.push(suspectView(rt, s)));
      options.appendChild(retry);
    }
    const leave = h("button", { class: "iv-leave", type: "button" }, "Leave the room");
    leave.addEventListener("click", () => rt.pop());
    options.appendChild(leave);
    window.setTimeout(() => (scroll.scrollTop = scroll.scrollHeight), 40);
  }

  function isAvailable(l: Line): boolean {
    if ((l.once ?? true) && used.has(l.id)) return false;
    if (l.needFlag && !flags.has(l.needFlag)) return false;
    if (l.blockFlag && flags.has(l.blockFlag)) return false;
    if (l.minComposure != null && composure < l.minComposure) return false;
    if (l.maxComposure != null && composure > l.maxComposure) return false;
    return true;
  }
  /** Passes everything except the evidence gate (so we can show it as locked). */
  function lockedByEvidence(l: Line): boolean {
    return !!l.requiresEvidenceId && !rt.hasViewed(l.requiresEvidenceId) && isAvailable(l);
  }

  function renderOptions(): void {
    if (over) return;
    options.replaceChildren();
    const open = s.lines.filter((l) => isAvailable(l) && (!l.requiresEvidenceId || rt.hasViewed(l.requiresEvidenceId)));
    const locked = s.lines.filter((l) => lockedByEvidence(l));
    if (!open.length && !locked.length) {
      options.appendChild(h("p", { class: "iv-nothing" }, "Nothing more to pull from this one right now."));
      const leave = h("button", { class: "iv-leave", type: "button" }, "Leave the room");
      leave.addEventListener("click", () => rt.pop());
      options.appendChild(leave);
      return;
    }
    options.appendChild(h("p", { class: "iv-choose" }, "Choose your approach"));
    for (const l of open) options.appendChild(optionCard(l, false));
    for (const l of locked) options.appendChild(optionCard(l, true));
  }

  function optionCard(l: Line, locked: boolean): HTMLElement {
    const t = TACTIC[l.tactic];
    const card = h(
      "button",
      { class: `iv-opt ${t.cls}${locked ? " iv-opt-locked" : ""}`, type: "button", disabled: locked },
      h("span", { class: "iv-opt-tactic" }, h("span", { class: "iv-opt-glyph" }, t.glyph), t.label),
      h("span", { class: "iv-opt-text" }, l.text),
      locked ? h("span", { class: "iv-opt-lock" }, svgEl(uiGlyph("lock"), "glyph"), "Find the evidence first") : null,
    );
    if (!locked) card.addEventListener("click", () => choose(l));
    return card;
  }

  function choose(l: Line): void {
    if (over) return;
    used.add(l.id);
    if (settings().uiSounds) playTap();
    // your line
    line("iv-said iv-said-you", h("span", { class: "iv-speaker" }, "YOU"), h("span", {}, l.text));
    options.replaceChildren();
    scroll.scrollTop = scroll.scrollHeight;

    const reveal = (): void => {
      if (l.setFlag) flags.add(l.setFlag);
      const before = composure;
      composure = Math.max(0, Math.min(100, composure + (l.composure ?? 0)));
      guard += l.guard ?? 0;
      // their reply
      line("iv-said iv-said-them", h("span", { class: "iv-speaker" }, surname(s.name)), h("span", { class: "iv-reply-in" }, l.reply));
      refreshMeter(composure < before);
      // narrate the shift
      if (composure < before - 1) beat(composure <= 12 ? "— they're breaking —" : "— composure slips —");
      if ((l.guard ?? 0) > 0) {
        beat("— they wall up —");
        if (!settings().reducedIntensity) {
          fileCard.classList.remove("iv-shake");
          void fileCard.offsetWidth;
          fileCard.classList.add("iv-shake");
        }
      }
      window.setTimeout(() => (scroll.scrollTop = scroll.scrollHeight), 20);

      if (l.outcome) {
        window.setTimeout(() => endInterview(l.outcome!, l.redirectTo), 650);
      } else if (guard >= guardMax) {
        if (s.clamReply) line("iv-said iv-said-them", h("span", { class: "iv-speaker" }, surname(s.name)), h("span", { class: "iv-reply-in" }, s.clamReply));
        window.setTimeout(() => endInterview("clammed"), 650);
      } else {
        renderOptions();
        window.setTimeout(() => (scroll.scrollTop = scroll.scrollHeight), 20);
      }
    };

    if (settings().reducedIntensity) {
      reveal();
    } else {
      const typing = line("iv-said iv-said-them", h("span", { class: "iv-speaker" }, surname(s.name)), h("div", { class: "iv-typing" }, h("span"), h("span"), h("span")));
      scroll.scrollTop = scroll.scrollHeight;
      window.setTimeout(() => {
        typing.remove();
        reveal();
      }, 850);
    }
  }

  // intro + first options
  line("iv-said iv-said-intro", s.intro);
  refreshMeter();
  renderOptions();
  return view;
}

// ---------------------------------------------------------------------------
// Procedural mugshot (silhouette bust over a height chart)
// ---------------------------------------------------------------------------

function mugshot(s: Suspect): string {
  const h1 = s.hue;
  return (
    `<svg viewBox="0 0 64 72" role="img" aria-hidden="true">` +
    `<defs><linearGradient id="mg${s.id}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="hsl(${h1} 22% 32%)"/><stop offset="1" stop-color="hsl(${h1} 24% 16%)"/>` +
    `</linearGradient></defs>` +
    `<rect x="0" y="0" width="64" height="72" fill="url(#mg${s.id})"/>` +
    // height-chart lines
    Array.from({ length: 6 }, (_, i) => `<line x1="0" y1="${10 + i * 11}" x2="64" y2="${10 + i * 11}" stroke="rgba(255,255,255,0.09)" stroke-width="1"/>`).join("") +
    // silhouette
    `<ellipse cx="32" cy="30" rx="12" ry="14" fill="rgba(0,0,0,0.55)"/>` +
    `<path d="M14 72 C14 54 22 47 32 47 C42 47 50 54 50 72 Z" fill="rgba(0,0,0,0.55)"/>` +
    `</svg>`
  );
}

function surname(name: string): string {
  const parts = name.replace(/["'()]/g, "").trim().split(/\s+/);
  return (parts[parts.length - 1] || name).toUpperCase();
}
