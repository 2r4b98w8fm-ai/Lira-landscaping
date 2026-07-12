import type { DeviceRuntime } from "./runtime";
import { h, svgEl } from "../lib/dom";
import { clockTime, longDate } from "../lib/time";
import { appIconSvg } from "../icons";
import { persist } from "../save";
import { buildHomeScreen } from "./homescreen";

/**
 * Lock screen: in-fiction time/date, stacked notification previews that
 * deep-link into content, swipe-up to unlock (click/keyboard fallback).
 */
export function buildLockScreen(rt: DeviceRuntime): HTMLElement {
  const now = rt.now();
  const view = h("div", { class: "lock-screen", style: `--wall-hue:${rt.caseFile.phone.wallpaperHue}` });

  const clock = h("div", { class: "lock-clock" }, clockTime(now));
  const date = h("div", { class: "lock-date" }, longDate(now));
  const owner = h("div", { class: "lock-owner" }, rt.caseFile.phone.ownerLabel);

  const pendingJumps: string[] = [];
  const notifs = h("div", { class: "lock-notifs", role: "list" });
  for (const n of rt.caseFile.phone.lockScreenNotifications) {
    const app = rt.app(n.appId);
    const card = h(
      "button",
      { class: "lock-notif", type: "button", role: "listitem" },
      svgEl(appIconSvg(app?.icon ?? "settings"), "lock-notif-icon"),
      h(
        "span",
        { class: "lock-notif-text" },
        h("span", { class: "lock-notif-title" }, n.title),
        h("span", { class: "lock-notif-preview" }, n.preview),
      ),
    );
    card.addEventListener("click", () => {
      unlock();
      pendingJumps.push(n.appId, n.targetId);
      flushJump();
    });
    notifs.appendChild(card);
  }

  const hint = h("div", { class: "lock-hint" }, h("span", { class: "lock-hint-bar" }), "Swipe up to open");

  view.append(clock, date, owner, notifs, hint);

  let unlocked = false;
  function unlock(): void {
    if (unlocked) return;
    unlocked = true;
    rt.progress.unlocked = true;
    persist();
    rt.push(buildHomeScreen(rt), { transition: "rise" });
  }
  function flushJump(): void {
    if (pendingJumps.length === 0) return;
    const [appId, targetId] = pendingJumps.splice(0, 2);
    window.setTimeout(() => rt.openApp(appId, targetId), 320);
  }

  // swipe-up gesture
  let startY: number | null = null;
  view.addEventListener("pointerdown", (e) => {
    startY = e.clientY;
  });
  view.addEventListener("pointerup", (e) => {
    if (startY !== null && startY - e.clientY > 60) unlock();
    startY = null;
  });
  // click / keyboard fallback
  hint.addEventListener("click", unlock);
  view.tabIndex = 0;
  view.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
      e.preventDefault();
      unlock();
    }
  });

  return view;
}
