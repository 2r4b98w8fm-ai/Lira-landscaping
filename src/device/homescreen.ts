import type { DeviceRuntime } from "./runtime";
import { h, clear, svgEl } from "../lib/dom";
import { appIconSvg } from "../icons";
import { loadSave, persist } from "../save";

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

  if (!loadSave().settings.coachSeen) {
    view.appendChild(buildCoach());
  }

  return view;
}

/** One-time overlay that orients a first-time player on the home screen. */
function buildCoach(): HTMLElement {
  const overlay = h("div", { class: "coach", role: "dialog", "aria-label": "How to play" });
  const dismiss = (): void => {
    loadSave().settings.coachSeen = true;
    persist();
    overlay.classList.add("coach-out");
    window.setTimeout(() => overlay.remove(), 260);
  };
  const card = h(
    "div",
    { class: "coach-card" },
    h("p", { class: "coach-eyebrow" }, "This is the phone"),
    h("h2", { class: "coach-title" }, "Everything is a clue"),
    h(
      "ul",
      { class: "coach-list" },
      h("li", {}, h("b", {}, "Open every app."), " Messages, Photos, Notes, Voicemail, Calendar, Maps, Browser — the story is spread across all of them."),
      h("li", {}, h("b", {}, "Some notes are locked."), " Find the 4-digit code hidden elsewhere on this phone. No outside knowledge needed."),
      h("li", {}, h("b", {}, "Watch for wrong details."), " An impossible time, a photo that edited itself, an app lying about what it is."),
      h("li", {}, h("b", {}, "When you're sure,"), " open the red Case Report to name who's responsible."),
    ),
    (() => {
      const b = h("button", { class: "coach-btn", type: "button" }, "Start investigating");
      b.addEventListener("click", dismiss);
      return b;
    })(),
  );
  overlay.appendChild(card);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) dismiss();
  });
  return overlay;
}
