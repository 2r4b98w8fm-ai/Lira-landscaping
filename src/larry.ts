import { h, svgEl } from "./lib/dom";

/**
 * Detective Larry — the friendly veteran who shows a new investigator the
 * ropes and slips them a nudge when a lock won't budge. Warm, a little corny,
 * never condescending. He's the human face of the hint system and the guide
 * through the tutorial case.
 */

/** A round portrait: fedora, big mustache, kind eyes, loosened tie. */
export function larryAvatar(): string {
  return (
    `<svg viewBox="0 0 64 64" role="img" aria-label="Detective Larry">` +
    `<defs><clipPath id="larryc"><circle cx="32" cy="32" r="30"/></clipPath></defs>` +
    `<circle cx="32" cy="32" r="30" fill="#d7e3ec"/>` +
    `<g clip-path="url(#larryc)">` +
    `<rect x="0" y="46" width="64" height="18" fill="#6b5a44"/>` + // trench coat
    `<path d="M22 48 L32 58 L42 48 Z" fill="#e8ebef"/>` + // collar / shirt
    `<path d="M30 50 l2 8 l2 -8 l-2 -2 z" fill="#8a2f34"/>` + // tie
    `<ellipse cx="32" cy="34" rx="13" ry="14" fill="#e8b98e"/>` + // face
    `<path d="M20 30 q12 8 24 0 q-2 10 -12 10 q-10 0 -12 -10z" fill="#e8b98e"/>` +
    `<ellipse cx="26" cy="32" rx="1.8" ry="2.4" fill="#2a2320"/>` + // eyes
    `<ellipse cx="38" cy="32" rx="1.8" ry="2.4" fill="#2a2320"/>` +
    `<path d="M22 29 q4 -2 7 0 M35 29 q4 -2 7 0" stroke="#6b5a44" stroke-width="1.6" fill="none" stroke-linecap="round"/>` + // brows
    `<path d="M24 40 q8 5 16 0 q-8 3 -16 0z" fill="#6b5a44"/>` + // mustache
    `<path d="M16 24 q16 -10 32 0 l2 4 q-18 -8 -36 0z" fill="#3a4756"/>` + // hat brim
    `<path d="M20 24 q12 -14 24 0 z" fill="#46566a"/>` + // hat crown
    `<rect x="20" y="22" width="24" height="3" fill="#2f3a48"/>` + // hat band
    `</g>` +
    `<circle cx="32" cy="32" r="30" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="1.5"/>` +
    `</svg>`
  );
}

/**
 * A speech card from Larry — his portrait beside a line of dialogue.
 * `variant` tints it: "hint" (amber, for code nudges), "tip" (blue, guidance).
 */
export function larryCard(text: string, variant: "hint" | "tip" = "tip", name = "Detective Larry"): HTMLElement {
  return h(
    "div",
    { class: `larry-card larry-${variant}` },
    h("span", { class: "larry-avatar" }, svgEl(larryAvatar(), "larry-avatar-svg")),
    h(
      "div",
      { class: "larry-bubble" },
      h("div", { class: "larry-name" }, name),
      h("div", { class: "larry-text" }, text),
    ),
  );
}

/** A short, rotating "Larry-ism" for flavor on the tip card. */
export const LARRY_SIGNOFFS = [
  "Take your time. The dead are patient.",
  "Trust the little details. They're never little.",
  "You're doing good work, kid.",
  "Read it twice. Once for what it says, once for what it's hiding.",
  "A phone remembers everything. So do we.",
];
