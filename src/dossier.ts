import type { CaseManifestEntry } from "./cases";
import type { Briefing } from "./cases/briefings";
import { h, clear } from "./lib/dom";

/**
 * The investigator briefing: a click-through dossier shown when a case is
 * opened. It frames the job — who the person was, how it was ruled, why
 * that's doubted, what the family believes — before the phone boots.
 */
export function renderDossier(
  host: HTMLElement,
  entry: CaseManifestEntry,
  briefing: Briefing,
  onBegin: () => void,
  onBack: () => void,
): void {
  clear(host);
  const root = h("div", { class: "dossier" });

  // Sequence: cover, then each briefing card, then the objective.
  const slides: Array<{ kind: "cover" | "card" | "objective"; label?: string; text?: string }> = [
    { kind: "cover" },
    ...briefing.cards.map((c) => ({ kind: "card" as const, label: c.label, text: c.text })),
    { kind: "objective", text: briefing.objective },
  ];
  let index = 0;

  const stage = h("div", { class: "dossier-stage" });
  const dots = h("div", { class: "dossier-dots" });
  const backBtn = h("button", { class: "dossier-nav dossier-back", type: "button" }, "‹ Back");
  const nextBtn = h("button", { class: "dossier-nav dossier-next", type: "button" }, "Next ›");
  const skip = h("button", { class: "dossier-skip", type: "button" }, "Skip to the phone →");

  function render(): void {
    clear(stage);
    const s = slides[index];
    if (s.kind === "cover") {
      stage.appendChild(
        h(
          "div",
          { class: "dossier-cover" },
          h("p", { class: "dossier-file" }, `CASE FILE · ${entry.id.toUpperCase()}`),
          h("h1", { class: "dossier-title" }, entry.title),
          h("p", { class: "dossier-victim" }, entry.victimName),
          h("div", { class: "dossier-ruling" }, briefing.ruling),
          h("p", { class: "dossier-tags" }, briefing.personaTags.join("  ·  ")),
        ),
      );
    } else if (s.kind === "card") {
      stage.appendChild(
        h(
          "div",
          { class: "dossier-card" },
          h("p", { class: "dossier-card-label" }, s.label ?? ""),
          h("p", { class: "dossier-card-text" }, s.text ?? ""),
        ),
      );
    } else {
      stage.appendChild(
        h(
          "div",
          { class: "dossier-card dossier-objective" },
          h("p", { class: "dossier-card-label" }, "Your job"),
          h("p", { class: "dossier-card-text" }, s.text ?? ""),
          h("p", { class: "dossier-objective-hint" }, "Explore every app. Nothing is off-limits. When you're sure, file your verdict in the red Case Report app."),
        ),
      );
    }
    clear(dots);
    slides.forEach((_, i) =>
      dots.appendChild(h("span", { class: `dossier-dot${i === index ? " dossier-dot-on" : ""}` })),
    );
    backBtn.style.visibility = index === 0 ? "hidden" : "visible";
    nextBtn.textContent = index === slides.length - 1 ? "Open the phone" : "Next ›";
  }

  backBtn.addEventListener("click", () => {
    if (index === 0) onBack();
    else {
      index--;
      render();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (index === slides.length - 1) onBegin();
    else {
      index++;
      render();
    }
  });
  skip.addEventListener("click", onBegin);

  // keyboard + swipe
  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "Enter") nextBtn.click();
    if (e.key === "ArrowLeft") backBtn.click();
  });
  let startX: number | null = null;
  stage.addEventListener("pointerdown", (e) => (startX = e.clientX));
  stage.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (dx < -45) nextBtn.click();
    else if (dx > 45 && index > 0) backBtn.click();
    startX = null;
  });

  root.append(
    h("header", { class: "dossier-hdr" }, h("span", { class: "dossier-kicker" }, "Evidence Review · Briefing")),
    stage,
    dots,
    h("div", { class: "dossier-controls" }, backBtn, nextBtn),
    skip,
  );
  host.appendChild(root);
  render();
  root.focus();
}
