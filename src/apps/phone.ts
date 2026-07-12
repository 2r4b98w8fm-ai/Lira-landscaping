import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";
import { openVoicemail } from "./voicemail";

/** Phone app: a sparse recents list that funnels into Voicemail. */
export function openPhone(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-phone" });
  view.appendChild(rt.appHeader("Phone"));
  const body = h("div", { class: "app-scroll" });

  body.appendChild(h("h2", { class: "section-label" }, "Voicemail"));
  const vmBtn = h(
    "button",
    { class: "list-row", type: "button" },
    h(
      "span",
      { class: "row-main" },
      h("span", { class: "row-title" }, "Saved voicemail"),
      h("span", { class: "row-sub" }, `${rt.caseFile.voicemails.length} messages recovered`),
    ),
  );
  vmBtn.addEventListener("click", () => rt.push(openVoicemail(rt)));
  body.appendChild(vmBtn);

  body.appendChild(h("h2", { class: "section-label" }, "Recents"));
  const recents = [...rt.caseFile.voicemails]
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    .slice(0, 6);
  for (const vm of recents) {
    body.appendChild(
      h(
        "div",
        { class: "list-row list-row-static" },
        h(
          "span",
          { class: "row-main" },
          h("span", { class: "row-title" }, vm.callerLabel),
          h("span", { class: "row-sub" }, "Missed call · went to voicemail"),
        ),
      ),
    );
  }

  view.appendChild(body);
  if (targetId) window.setTimeout(() => rt.push(openVoicemail(rt, targetId)), 60);
  return view;
}
