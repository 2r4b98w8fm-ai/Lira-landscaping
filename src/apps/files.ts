import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";

/** Files app: the investigator-side case intake document. */
export function openFiles(rt: DeviceRuntime): HTMLElement {
  const view = h("div", { class: "app app-files" });
  view.appendChild(rt.appHeader("Files"));
  const body = h("div", { class: "app-scroll" });

  body.appendChild(h("h2", { class: "section-label" }, "On this device"));
  const doc = h(
    "div",
    { class: "file-doc" },
    h("h3", { class: "file-doc-title" }, `EVIDENCE INTAKE — ${rt.caseFile.title.toUpperCase()}`),
  );
  for (const para of rt.caseFile.intake.split("\n\n")) {
    doc.appendChild(h("p", { class: "file-doc-para" }, para));
  }
  body.appendChild(doc);
  body.appendChild(
    h(
      "p",
      { class: "folder-note" },
      "This document was added by the evidence team. It is not part of the recovered device image.",
    ),
  );
  view.appendChild(body);
  return view;
}
