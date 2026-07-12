import type { DeviceRuntime } from "../device/runtime";
import type { Message, Thread } from "../types";
import { h, clear } from "../lib/dom";
import { fullStamp, dayLabel } from "../lib/time";

export function openMessages(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-messages" });
  view.appendChild(rt.appHeader("Messages"));
  const list = h("div", { class: "thread-list", role: "list" });
  view.appendChild(list);

  function latest(thread: Thread): Message {
    const all = [...thread.messages, ...rt.deliveredMessages(thread.id)];
    return all[all.length - 1];
  }

  function render(): void {
    clear(list);
    const threads = [...rt.caseFile.messages].sort(
      (a, b) => Date.parse(latest(b).timestamp) - Date.parse(latest(a).timestamp),
    );
    for (const thread of threads) {
      const last = latest(thread);
      const unread = !rt.hasViewed(thread.id);
      const typing =
        thread.ghostTypingAfterSeconds !== undefined &&
        rt.progress.playSeconds >= thread.ghostTypingAfterSeconds;
      const row = h(
        "button",
        { class: `thread-row${unread ? " thread-unread" : ""}`, type: "button", role: "listitem" },
        h("span", { class: "thread-avatar", "aria-hidden": "true" }, initials(thread.contactName)),
        h(
          "span",
          { class: "thread-main" },
          h("span", { class: "thread-name" }, thread.contactName),
          typing
            ? h("span", { class: "thread-preview thread-typing" }, typingDots(), "typing…")
            : h("span", { class: "thread-preview" }, last.from === "owner" ? `You: ${last.text}` : last.text),
        ),
        h("span", { class: "thread-time" }, fullStamp(last.timestamp)),
      );
      row.addEventListener("click", () => rt.push(threadView(rt, thread)));
      list.appendChild(row);
    }
  }

  render();
  const offTick = rt.on("tick", () => {
    // ghost typing indicators appear on a timer; re-render only when needed
    const anyPending = rt.caseFile.messages.some(
      (t) =>
        t.ghostTypingAfterSeconds !== undefined &&
        Math.abs(rt.progress.playSeconds - t.ghostTypingAfterSeconds) < 2,
    );
    if (anyPending) render();
  });
  const offLive = rt.on("liveMessage", render);
  view.addEventListener("view-removed", () => {
    offTick();
    offLive();
  });

  if (targetId) {
    const thread =
      rt.caseFile.messages.find((t) => t.id === targetId) ??
      rt.caseFile.messages.find((t) => t.messages.some((m) => m.id === targetId));
    if (thread) window.setTimeout(() => rt.push(threadView(rt, thread)), 60);
  }

  return view;
}

function threadView(rt: DeviceRuntime, thread: Thread): HTMLElement {
  rt.markViewed(thread.id);
  const view = h("div", { class: "app app-thread" });
  view.appendChild(
    rt.appHeader(thread.contactName, {
      trailing: thread.contactNumber
        ? h("span", { class: "hdr-sub" }, thread.contactNumber)
        : undefined,
    }),
  );
  const scroll = h("div", { class: "msg-scroll" });
  view.appendChild(scroll);

  function render(): void {
    clear(scroll);
    const all = [...thread.messages, ...rt.deliveredMessages(thread.id)].sort(
      (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp),
    );
    let lastDay = "";
    all.forEach((m, i) => {
      const day = m.timestamp.slice(0, 10);
      if (day !== lastDay) {
        lastDay = day;
        scroll.appendChild(h("div", { class: "msg-day" }, dayLabel(m.timestamp)));
      }
      const bubble = h(
        "div",
        { class: `msg-row msg-${m.from}` },
        h("div", { class: "msg-bubble" }, m.text, h("span", { class: "msg-time" }, timeOnly(m.timestamp))),
      );
      scroll.appendChild(bubble);
      const isLastOwner = m.from === "owner" && !all.slice(i + 1).some((x) => x.from === "owner");
      if (isLastOwner) {
        scroll.appendChild(h("div", { class: "msg-receipt" }, "Read"));
      }
    });
    const typing =
      thread.ghostTypingAfterSeconds !== undefined &&
      rt.progress.playSeconds >= thread.ghostTypingAfterSeconds;
    if (typing) {
      scroll.appendChild(
        h("div", { class: "msg-row msg-them" }, h("div", { class: "msg-bubble msg-bubble-typing" }, typingDots())),
      );
    }
    scroll.scrollTop = scroll.scrollHeight;
  }

  render();
  const offLive = rt.on("liveMessage", (tid) => {
    if (tid === thread.id) render();
  });
  const offTick = rt.on("tick", (sec) => {
    if (thread.ghostTypingAfterSeconds !== undefined && sec === thread.ghostTypingAfterSeconds) render();
  });
  view.addEventListener("view-removed", () => {
    offLive();
    offTick();
  });

  const composer = h(
    "div",
    { class: "msg-composer" },
    h("span", { class: "msg-composer-field" }, "Message"),
    h("span", { class: "msg-composer-note" }, "This conversation is read-only."),
  );
  view.appendChild(composer);
  return view;
}

function timeOnly(iso: string): string {
  const d = new Date(iso);
  let hr = d.getHours();
  const ampm = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return `${hr}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
}

function typingDots(): HTMLElement {
  return h(
    "span",
    { class: "typing-dots", "aria-hidden": "true" },
    h("span"),
    h("span"),
    h("span"),
  );
}

function initials(name: string): string {
  if (/unknown|blocked|no caller/i.test(name)) return "?";
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
