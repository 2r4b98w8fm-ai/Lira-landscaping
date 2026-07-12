import type { DeviceRuntime } from "./runtime";
import { h, clear, svgEl } from "../lib/dom";
import { appIconSvg } from "../icons";

const GRID_ORDER = ["messages", "photos", "notes", "calendar", "maps", "browser", "files", "settings", "report"];
const DOCK_ORDER = ["phone", "messages", "browser", "photos"];

export function buildHomeScreen(rt: DeviceRuntime): HTMLElement {
  const view = h("div", { class: "home-screen", style: `--wall-hue:${rt.caseFile.phone.wallpaperHue}` });
  const grid = h("div", { class: "home-grid" });
  const dock = h("div", { class: "home-dock" });
  view.append(grid, dock);

  function iconButton(appId: string, labelOverride?: string, iconOverride?: string): HTMLElement {
    const def = rt.app(appId);
    if (!def) return h("span");
    const badgeCount = def.badge?.(rt) ?? 0;
    const btn = h(
      "button",
      { class: "home-icon", type: "button" },
      svgEl(iconOverride ?? appIconSvg(def.icon), "home-icon-art"),
      h("span", { class: "home-icon-label" }, labelOverride ?? def.label),
    );
    if (badgeCount > 0) {
      btn.querySelector(".home-icon-art")!.appendChild(
        h("span", { class: "home-badge", "aria-label": `${badgeCount} unread` }, String(badgeCount)),
      );
    }
    btn.addEventListener("click", () => rt.openApp(appId));
    return btn;
  }

  function render(): void {
    clear(grid);
    clear(dock);
    for (const id of GRID_ORDER) grid.appendChild(iconButton(id));
    if (rt.progress.hiddenAppRevealed) {
      const hidden = iconButton(
        "hidden",
        rt.caseFile.hiddenApp.disguiseLabel,
        appIconSvg(rt.caseFile.hiddenApp.disguiseIcon),
      );
      hidden.classList.add("home-icon-new");
      grid.appendChild(hidden);
    }
    for (const id of DOCK_ORDER) dock.appendChild(iconButton(id));
  }

  render();
  rt.on("homeChanged", render);
  rt.on("liveMessage", render);

  return view;
}
