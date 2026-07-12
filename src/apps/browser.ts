import type { DeviceRuntime } from "../device/runtime";
import { h, svgEl } from "../lib/dom";
import { fullStamp, dayLabel } from "../lib/time";
import { uiGlyph } from "../icons";

export function openBrowser(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-browser" });
  view.appendChild(rt.appHeader("Browser"));
  const list = h("div", { class: "app-scroll", role: "list" });
  view.appendChild(list);

  list.appendChild(h("h2", { class: "section-label" }, "History"));

  const entries = [...rt.caseFile.browserHistory].sort(
    (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp),
  );

  let lastDay = "";
  for (const e of entries) {
    rt.markViewed(e.id);
    const day = e.timestamp.slice(0, 10);
    if (day !== lastDay) {
      lastDay = day;
      list.appendChild(h("div", { class: "history-day" }, dayLabel(e.timestamp)));
    }
    list.appendChild(
      h(
        "div",
        { class: "history-row", role: "listitem", "data-row": e.id },
        svgEl(uiGlyph("search"), "glyph row-glyph"),
        h(
          "span",
          { class: "row-main" },
          h("span", { class: "row-title history-query" }, e.query),
          e.url ? h("span", { class: "row-sub history-url" }, e.url) : null,
        ),
        h("span", { class: "row-time" }, fullStamp(e.timestamp)),
      ),
    );
  }

  if (targetId) {
    window.setTimeout(() => {
      const row = list.querySelector(`[data-row="${targetId}"]`);
      row?.scrollIntoView({ block: "center" });
      row?.classList.add("map-row-hi");
    }, 80);
  }
  return view;
}
