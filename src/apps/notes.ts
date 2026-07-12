import type { DeviceRuntime } from "../device/runtime";
import type { Note } from "../types";
import { h, svgEl } from "../lib/dom";
import { dateStamp } from "../lib/time";
import { uiGlyph } from "../icons";
import { buildCodePad } from "./codepad";
import { persist } from "../save";
import { triggerGlitch } from "../glitch";

export function openNotes(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-notes" });
  view.appendChild(rt.appHeader("Notes"));
  const list = h("div", { class: "app-scroll", role: "list" });
  view.appendChild(list);

  const notes = [...rt.caseFile.notes].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

  for (const note of notes) {
    const locked = isLocked(rt, note);
    const row = h(
      "button",
      { class: "list-row", type: "button", role: "listitem" },
      locked ? svgEl(uiGlyph("lock"), "glyph row-glyph row-glyph-lock") : h("span", { class: "row-glyph-pad" }),
      h(
        "span",
        { class: "row-main" },
        h("span", { class: "row-title" }, note.title),
        h("span", { class: "row-sub" }, locked ? "Locked" : firstLine(note.body)),
      ),
      h("span", { class: "row-time" }, dateStamp(note.timestamp)),
    );
    row.addEventListener("click", () => openNote(rt, note));
    list.appendChild(row);
  }

  if (targetId) {
    const note = rt.caseFile.notes.find((n) => n.id === targetId);
    if (note) window.setTimeout(() => openNote(rt, note), 60);
  }
  return view;
}

function isLocked(rt: DeviceRuntime, note: Note): boolean {
  return !!note.lock && !rt.progress.unlockedNotes.includes(note.id);
}

function openNote(rt: DeviceRuntime, note: Note): void {
  if (isLocked(rt, note)) {
    rt.push(
      buildCodePad(rt, {
        title: note.title,
        hintText: note.lock!.hintText,
        solution: note.lock!.code,
        onSolved: () => {
          rt.progress.unlockedNotes.push(note.id);
          persist();
          triggerGlitch(350);
          rt.pop();
          window.setTimeout(() => rt.push(noteView(rt, note)), 120);
        },
      }),
    );
  } else {
    rt.push(noteView(rt, note));
  }
}

function noteView(rt: DeviceRuntime, note: Note): HTMLElement {
  rt.markViewed(note.id);
  const view = h("div", { class: "app app-note-read" });
  view.appendChild(rt.appHeader("Notes"));
  const body = h("div", { class: "app-scroll note-body" });
  body.appendChild(h("h2", { class: "note-title" }, note.title));
  body.appendChild(h("div", { class: "note-date" }, dateStamp(note.timestamp)));
  for (const para of note.body.split("\n\n")) {
    const p = h("p", { class: "note-para" });
    // single newlines inside a paragraph become line breaks (lists etc.)
    para.split("\n").forEach((line, i) => {
      if (i > 0) p.appendChild(h("br"));
      p.appendChild(document.createTextNode(line));
    });
    body.appendChild(p);
  }
  view.appendChild(body);
  return view;
}

function firstLine(body: string): string {
  const line = body.split("\n")[0];
  return line.length > 64 ? `${line.slice(0, 64)}…` : line;
}
