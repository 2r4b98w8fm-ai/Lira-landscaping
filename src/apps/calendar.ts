import type { DeviceRuntime } from "../device/runtime";
import type { CalendarEvent } from "../types";
import { h } from "../lib/dom";
import { monthName } from "../lib/time";

/** Monthly grid + tappable day detail. Events flagged with their creator. */
export function openCalendar(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-calendar" });
  view.appendChild(rt.appHeader("Calendar"));

  const events = rt.caseFile.calendarEvents;
  // center on the month containing the most events
  const byMonth = new Map<string, number>();
  for (const e of events) {
    const key = e.date.slice(0, 7);
    byMonth.set(key, (byMonth.get(key) ?? 0) + 1);
  }
  let currentKey =
    [...byMonth.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ??
    rt.caseFile.phone.recoveredAt.slice(0, 7);
  if (targetId) {
    const target = events.find((e) => e.id === targetId);
    if (target) currentKey = target.date.slice(0, 7);
  }

  const monthHdr = h("h2", { class: "cal-month" });
  const prev = h("button", { class: "cal-nav", type: "button", "aria-label": "Previous month" }, "‹");
  const next = h("button", { class: "cal-nav", type: "button", "aria-label": "Next month" }, "›");
  const grid = h("div", { class: "cal-grid", role: "grid" });
  const dayPanel = h("div", { class: "cal-day-panel" });

  prev.addEventListener("click", () => {
    currentKey = shiftMonth(currentKey, -1);
    render();
  });
  next.addEventListener("click", () => {
    currentKey = shiftMonth(currentKey, 1);
    render();
  });

  function eventsOn(dateIso: string): CalendarEvent[] {
    const d = new Date(`${dateIso}T00:00:00`);
    return events.filter((e) => {
      if (e.date === dateIso) return true;
      if (!e.recurring) return false;
      const start = new Date(`${e.date}T00:00:00`);
      if (d < start) return false;
      if (e.recurring === "daily") return true;
      return d.getDay() === start.getDay();
    });
  }

  function render(): void {
    const [yr, mo] = currentKey.split("-").map(Number);
    monthHdr.textContent = `${monthName(mo - 1)} ${yr}`;
    grid.replaceChildren();
    for (const wd of ["S", "M", "T", "W", "T", "F", "S"]) {
      grid.appendChild(h("span", { class: "cal-wd", "aria-hidden": "true" }, wd));
    }
    const first = new Date(yr, mo - 1, 1);
    const daysInMonth = new Date(yr, mo, 0).getDate();
    for (let i = 0; i < first.getDay(); i++) grid.appendChild(h("span"));
    for (let day = 1; day <= daysInMonth; day++) {
      const dateIso = `${currentKey}-${String(day).padStart(2, "0")}`;
      const todays = eventsOn(dateIso);
      const cell = h(
        "button",
        { class: "cal-cell", type: "button", role: "gridcell" },
        h("span", { class: "cal-daynum" }, String(day)),
        todays.length > 0
          ? h("span", {
              class: `cal-dot${todays.some((e) => e.createdBy !== "owner") ? " cal-dot-foreign" : ""}`,
            })
          : h("span", { class: "cal-dot-empty" }),
      );
      cell.addEventListener("click", () => renderDay(dateIso, todays));
      grid.appendChild(cell);
    }
    dayPanel.replaceChildren(h("p", { class: "cal-empty" }, "Select a day."));
  }

  function renderDay(dateIso: string, todays: CalendarEvent[]): void {
    dayPanel.replaceChildren(h("h3", { class: "cal-day-title" }, dateIso));
    if (todays.length === 0) {
      dayPanel.appendChild(h("p", { class: "cal-empty" }, "No events."));
      return;
    }
    for (const e of todays) {
      rt.markViewed(e.id);
      dayPanel.appendChild(
        h(
          "div",
          { class: `cal-event${e.struck ? " cal-struck" : ""}` },
          h(
            "div",
            { class: "cal-event-head" },
            h("span", { class: "cal-event-title" }, e.title),
            e.time ? h("span", { class: "cal-event-time" }, e.time) : h("span"),
          ),
          e.recurring ? h("div", { class: "cal-event-sub" }, `Repeats ${e.recurring}`) : null,
          e.detail ? h("div", { class: "cal-event-sub" }, e.detail) : null,
          e.createdBy === "unknown"
            ? h("div", { class: "cal-event-creator cal-event-creator-warn" }, "Created by: — (no account)")
            : e.createdBy === "external"
              ? h("div", { class: "cal-event-creator" }, "Created by: invitation")
              : null,
        ),
      );
    }
  }

  view.append(
    h("div", { class: "cal-head" }, prev, monthHdr, next),
    h("div", { class: "app-scroll" }, grid, dayPanel),
  );
  render();
  if (targetId) {
    const target = events.find((e) => e.id === targetId);
    if (target) renderDay(target.date, eventsOn(target.date));
  }
  return view;
}

function shiftMonth(key: string, delta: number): string {
  const [yr, mo] = key.split("-").map(Number);
  const d = new Date(yr, mo - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
