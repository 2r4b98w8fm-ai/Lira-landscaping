import type { DeviceRuntime } from "../device/runtime";
import { h, svgEl } from "../lib/dom";
import { persist, settings } from "../save";
import { uiGlyph } from "../icons";
import { playTap } from "../audio";
import { vibrate } from "../lib/haptics";
import { interrogationFor, type Suspect, type SuspectQuestion, type QEffect } from "../cases/interviews";

/**
 * The Interview Room — the investigator's own tool on the evidence terminal.
 * Question persons of interest by text; press them with evidence you've
 * found. Answers are tagged guilt / cleared / stonewall / redirect.
 */

const EFFECT: Record<QEffect, { tag: string; cls: string }> = {
  guilt: { tag: "● INCRIMINATING", cls: "iv-guilt" },
  cleared: { tag: "● CLEARED", cls: "iv-cleared" },
  stonewall: { tag: "● NO COMMENT", cls: "iv-stonewall" },
  redirect: { tag: "→ POINTS ELSEWHERE", cls: "iv-redirect" },
};

export function openInterviews(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const data = interrogationFor(rt.caseFile.id);
  const view = h("div", { class: "app app-interviews" });
  view.appendChild(rt.appHeader("Interview Room"));
  const body = h("div", { class: "app-scroll" });
  view.appendChild(body);

  if (!data) {
    body.appendChild(h("p", { class: "folder-note" }, "No interviews scheduled for this case."));
    return view;
  }

  body.appendChild(h("p", { class: "iv-brief" }, data.brief));
  body.appendChild(h("h2", { class: "section-label" }, "Persons of interest"));

  for (const s of data.suspects) {
    const status = suspectStatus(rt, s);
    const rowEl = h(
      "button",
      { class: "iv-row", type: "button" },
      h("span", { class: "iv-avatar", style: `--iv-hue:${s.hue}`, "aria-hidden": "true" }, initials(s.name)),
      h(
        "span",
        { class: "row-main" },
        h("span", { class: "iv-name" }, s.name),
        h("span", { class: "row-sub" }, s.role),
      ),
      status ? h("span", { class: `iv-chip ${status.cls}` }, status.label) : svgEl(uiGlyph("chevron"), "glyph row-chevron"),
    );
    rowEl.addEventListener("click", () => rt.push(suspectView(rt, s)));
    body.appendChild(rowEl);
  }

  if (targetId) {
    const s = data.suspects.find((x) => x.id === targetId);
    if (s) window.setTimeout(() => rt.push(suspectView(rt, s)), 60);
  }
  return view;
}

/** A short read on a suspect from the answers you've already gotten. */
function suspectStatus(rt: DeviceRuntime, s: Suspect): { label: string; cls: string } | null {
  const asked = rt.progress.interviewAsked ?? [];
  const got = s.questions.filter((q) => asked.includes(q.id));
  if (!got.length) return null;
  if (got.some((q) => q.effect === "guilt")) return { label: "SUSPECT", cls: "iv-guilt" };
  if (got.every((q) => q.effect === "cleared")) return { label: "CLEARED", cls: "iv-cleared" };
  if (got.some((q) => q.effect === "redirect")) return { label: "LEAD", cls: "iv-redirect" };
  return { label: "STONEWALLING", cls: "iv-stonewall" };
}

function suspectView(rt: DeviceRuntime, s: Suspect): HTMLElement {
  const view = h("div", { class: "app app-interviews" });
  view.appendChild(rt.appHeader(s.name));
  const body = h("div", { class: "app-scroll iv-thread" });
  view.appendChild(body);

  body.appendChild(
    h(
      "div",
      { class: "iv-suspect-head" },
      h("span", { class: "iv-avatar iv-avatar-lg", style: `--iv-hue:${s.hue}`, "aria-hidden": "true" }, initials(s.name)),
      h("span", { class: "iv-name" }, s.name),
      h("span", { class: "iv-role" }, s.role),
    ),
  );

  const transcript = h("div", { class: "iv-transcript" });
  transcript.appendChild(h("div", { class: "iv-bubble iv-them iv-intro" }, s.intro));
  body.appendChild(transcript);

  const chips = h("div", { class: "iv-questions" });
  body.appendChild(chips);

  const asked = new Set(rt.progress.interviewAsked ?? []);

  // Replay any already-asked questions immediately (no animation).
  for (const q of s.questions) {
    if (asked.has(q.id)) appendExchange(transcript, q, false);
  }

  function refreshChips(): void {
    chips.replaceChildren();
    const remaining = s.questions.filter((q) => !asked.has(q.id));
    if (!remaining.length) {
      chips.appendChild(h("p", { class: "iv-done-note" }, "You've asked everything you can for now."));
      maybeRedirect();
      return;
    }
    chips.appendChild(h("p", { class: "iv-prompt" }, "Ask:"));
    for (const q of remaining) {
      const locked = !!q.requiresEvidenceId && !rt.hasViewed(q.requiresEvidenceId);
      const chip = h(
        "button",
        { class: `iv-q${locked ? " iv-q-locked" : ""}`, type: "button", disabled: locked },
        locked ? svgEl(uiGlyph("lock"), "glyph iv-q-lock") : null,
        h("span", {}, q.q),
        locked ? h("span", { class: "iv-q-hint" }, "Find the evidence first") : null,
      );
      if (!locked) chip.addEventListener("click", () => ask(q));
      chips.appendChild(chip);
    }
    maybeRedirect();
  }

  function maybeRedirect(): void {
    // If any answered question points elsewhere, offer a jump.
    const answered = s.questions.filter((q) => asked.has(q.id));
    const lead = answered.find((q) => q.effect === "redirect" && q.redirectTo);
    if (!lead?.redirectTo) return;
    const target = interrogationFor(rt.caseFile.id)?.suspects.find((x) => x.id === lead.redirectTo);
    if (!target || target.id === s.id) return;
    const jump = h("button", { class: "iv-jump", type: "button" }, `Go question ${target.name} →`);
    jump.addEventListener("click", () => rt.push(suspectView(rt, target)));
    chips.appendChild(jump);
  }

  function ask(q: SuspectQuestion): void {
    asked.add(q.id);
    rt.progress.interviewAsked = [...asked];
    if (q.effect === "guilt") rt.progress.confessionHeard = true;
    persist();
    if (settings().uiSounds) playTap();
    // your question bubble
    const mine = h("div", { class: "iv-bubble iv-me" }, q.q);
    transcript.appendChild(mine);
    chips.replaceChildren();
    // typing indicator, then the reply
    if (settings().reducedIntensity) {
      appendExchange(transcript, q, false, true);
      finish(q);
    } else {
      const typing = h("div", { class: "iv-bubble iv-them iv-typing" }, h("span"), h("span"), h("span"));
      transcript.appendChild(typing);
      body.scrollTop = body.scrollHeight;
      window.setTimeout(() => {
        typing.remove();
        appendExchange(transcript, q, true, true);
        finish(q);
      }, 900);
    }
  }

  function finish(q: SuspectQuestion): void {
    if (q.effect === "guilt") {
      vibrate([12, 40, 20]);
      window.setTimeout(() => rt.awardCheck(), 400);
    }
    refreshChips();
    window.setTimeout(() => (body.scrollTop = body.scrollHeight), 30);
  }

  refreshChips();
  return view;
}

/** Append a reply bubble (+ effect tag) for an already-asked question. */
function appendExchange(transcript: HTMLElement, q: SuspectQuestion, animate: boolean, replyOnly = false): void {
  if (!replyOnly) transcript.appendChild(h("div", { class: "iv-bubble iv-me iv-past" }, q.q));
  const e = EFFECT[q.effect];
  const reply = h("div", { class: `iv-bubble iv-them${animate ? " iv-reply-in" : ""}` }, q.reply);
  transcript.appendChild(reply);
  transcript.appendChild(h("div", { class: `iv-tag ${e.cls}${animate ? " iv-reply-in" : ""}` }, e.tag));
}

function initials(name: string): string {
  const parts = name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/);
  if (!parts[0]) return "?";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
}
