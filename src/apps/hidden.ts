import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";
import { persist } from "../save";
import { triggerGlitch } from "../glitch";
import { playStinger } from "../audio";

/**
 * The disguised app. Opens looking mundane for a beat, then drops the mask.
 * This is the case's biggest reveal — treat it with restraint, not fireworks.
 */
export function openHidden(rt: DeviceRuntime): HTMLElement {
  const ha = rt.caseFile.hiddenApp;
  const view = h("div", { class: "app app-hidden" });
  view.appendChild(rt.appHeader(ha.disguiseLabel));

  const stage = h("div", { class: "hidden-stage" });
  view.appendChild(stage);

  const alreadyOpened = rt.progress.hiddenAppOpened;

  function showDisguise(): void {
    stage.replaceChildren(
      h("div", { class: "hidden-disguise" }, h("div", { class: "hidden-spinner", "aria-hidden": "true" }), h("p", { class: "hidden-loading" }, "Loading…")),
    );
  }

  function showReveal(): void {
    if (!rt.progress.hiddenAppOpened) {
      rt.progress.hiddenAppOpened = true;
      persist();
      triggerGlitch(650);
      playStinger();
    }
    rt.markViewed(`${rt.caseFile.id}.hidden`);

    const hdr = view.querySelector(".hdr-title");
    if (hdr) hdr.textContent = ha.title;

    const panel = h("div", { class: "hidden-panel" });
    panel.appendChild(h("h2", { class: "hidden-heading" }, ha.heading));
    for (const para of ha.body.split("\n\n")) {
      panel.appendChild(h("p", { class: "hidden-body" }, para));
    }
    const entryList = h("div", { class: "hidden-entries", role: "list" });
    for (const entry of ha.entries) {
      entryList.appendChild(
        h(
          "div",
          { class: "hidden-entry", role: "listitem" },
          h(
            "span",
            { class: "row-main" },
            h("span", { class: "hidden-entry-label" }, entry.label),
            entry.detail ? h("span", { class: "row-sub" }, entry.detail) : null,
          ),
          h("span", { class: "hidden-entry-status" }, entry.status),
        ),
      );
    }
    panel.appendChild(entryList);
    if (ha.footer) panel.appendChild(h("p", { class: "hidden-footer" }, ha.footer));
    stage.replaceChildren(panel);
  }

  if (alreadyOpened) {
    showReveal();
  } else {
    showDisguise();
    window.setTimeout(showReveal, 2100);
  }
  return view;
}
