import { h, clear, svgEl } from "./lib/dom";
import { settings } from "./save";

/**
 * The title screen. A dark case-file surface; blood strikes across it in
 * staggered splashes that resolve into the title — COLD CASE — then a
 * pulsing prompt to enter the archive. Reduced-intensity players get the
 * title immediately with no spatter animation.
 */
export function renderIntro(host: HTMLElement, onEnter: () => void): void {
  clear(host);
  const reduce = settings().reducedIntensity;

  const screen = h("div", { class: `intro${reduce ? " intro-still" : ""}`, role: "button", tabindex: "0", "aria-label": "Cold Case — tap to begin" });

  // blood spatter layer (behind the title)
  screen.appendChild(svgEl(bloodSvg(), "intro-blood"));

  const stack = h(
    "div",
    { class: "intro-stack" },
    h("p", { class: "intro-kicker" }, "Evidence Review Terminal"),
    h("h1", { class: "intro-title" }, h("span", { class: "intro-word intro-word-1" }, "COLD"), h("span", { class: "intro-word intro-word-2" }, "CASE")),
    h("p", { class: "intro-tag" }, "Fifteen phones. Fifteen people who were last seen — and never again."),
    h("p", { class: "intro-enter" }, "Tap to begin"),
  );
  screen.appendChild(stack);

  let entered = false;
  const enter = (): void => {
    if (entered) return;
    entered = true;
    screen.classList.add("intro-leaving");
    window.setTimeout(onEnter, reduce ? 0 : 420);
  };
  screen.addEventListener("click", enter);
  screen.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      enter();
    }
  });

  host.appendChild(screen);
  // Focus so keyboard users can press Enter immediately.
  window.setTimeout(() => screen.focus({ preventScroll: true }), 50);
}

/** Deterministic set of blood strikes — drips, arcs, and a big central splat. */
function bloodSvg(): string {
  const parts: string[] = [];
  parts.push(
    `<svg viewBox="0 0 400 720" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">`,
    `<defs><radialGradient id="bl" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#c1121f"/><stop offset="1" stop-color="#7a0a12"/></radialGradient></defs>`,
  );
  // central splat behind the title
  parts.push(
    `<g class="spl spl-a"><path d="M120 300 q40 -70 100 -40 q70 -30 80 40 q60 20 30 90 q30 70 -50 70 q-40 60 -100 20 q-70 20 -70 -60 q-50 -40 -20 -100 q-10 -30 20 -20 z" fill="url(#bl)"/></g>`,
  );
  // droplets — deterministic scatter
  const drops: Array<[number, number, number, number]> = [
    [70, 210, 10, 0], [330, 250, 14, 1], [150, 170, 7, 2], [280, 360, 9, 3],
    [90, 430, 12, 4], [320, 470, 8, 5], [200, 500, 16, 2], [60, 320, 6, 1],
    [350, 340, 7, 4], [180, 250, 5, 3], [250, 210, 8, 0], [130, 520, 9, 5],
    [300, 180, 6, 2], [110, 380, 5, 1], [240, 440, 7, 4], [40, 260, 8, 3],
  ];
  for (const [cx, cy, r, band] of drops) {
    parts.push(`<circle class="spl spl-${"bcde"[band % 4]}" cx="${cx}" cy="${cy}" r="${r}" fill="url(#bl)"/>`);
    // a thin drip tail under some drops
    if (r > 8) parts.push(`<rect class="spl spl-${"bcde"[band % 4]}" x="${cx - 1.4}" y="${cy}" width="2.8" height="${r * 2.4}" rx="1.4" fill="url(#bl)"/>`);
  }
  // a couple of flung arcs
  parts.push(
    `<path class="spl spl-c" d="M30 150 q120 40 180 -10" stroke="#8f0f18" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.75"/>`,
    `<path class="spl spl-e" d="M380 560 q-120 -30 -190 20" stroke="#8f0f18" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>`,
  );
  parts.push(`</svg>`);
  return parts.join("");
}
