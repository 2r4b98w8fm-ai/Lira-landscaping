import type { DeviceRuntime } from "./runtime";
import { h, clear, svgEl } from "../lib/dom";
import { appIconSvg } from "../icons";
import { loadSave, persist } from "../save";

// The core apps sit on page 1 up top; flavor apps fill out the pages so the
// player has to swipe and dig. The hidden app, once found, joins page 1.
const PAGES: string[][] = [
  ["messages", "photos", "notes", "phone", "calendar", "maps", "browser", "report", "mail", "social", "music", "wallet"],
  ["weather", "health", "podcasts", "reminders", "appstore", "news", "files", "settings"],
];
const DOCK_ORDER = ["phone", "messages", "photos", "report"];

export function buildHomeScreen(rt: DeviceRuntime): HTMLElement {
  const view = h("div", { class: "home-screen", style: `--wall-hue:${rt.caseFile.phone.wallpaperHue}` });
  const pager = h("div", { class: "home-pager" });
  const dots = h("div", { class: "home-page-dots" });
  const dock = h("div", { class: "home-dock" });
  view.append(pager, dots, dock);

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
    clear(pager);
    clear(dots);
    clear(dock);
    // page 1 gets the revealed hidden app appended
    const pages = PAGES.map((p) => [...p]);
    if (rt.progress.hiddenAppRevealed) pages[0].push("__hidden__");
    pages.forEach((ids) => {
      const page = h("div", { class: "home-page" });
      for (const id of ids) {
        if (id === "__hidden__") {
          const hidden = iconButton(
            "hidden",
            rt.caseFile.hiddenApp.disguiseLabel,
            appIconSvg(rt.caseFile.hiddenApp.disguiseIcon),
          );
          hidden.classList.add("home-icon-new");
          page.appendChild(hidden);
        } else {
          page.appendChild(iconButton(id));
        }
      }
      pager.appendChild(page);
    });
    pages.forEach((_, i) => {
      const dot = h("span", { class: `home-page-dot${i === 0 ? " home-page-dot-on" : ""}` });
      dots.appendChild(dot);
    });
    for (const id of DOCK_ORDER) dock.appendChild(iconButton(id));
  }

  // track which page is centered for the dots
  pager.addEventListener("scroll", () => {
    const i = Math.round(pager.scrollLeft / pager.clientWidth);
    dots.querySelectorAll(".home-page-dot").forEach((d, k) => d.classList.toggle("home-page-dot-on", k === i));
  });

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
