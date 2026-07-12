import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";
import { loadSave, persist, settings } from "../save";
import { syncAmbient } from "../audio";

export function openSettings(rt: DeviceRuntime): HTMLElement {
  const view = h("div", { class: "app app-settings" });
  view.appendChild(rt.appHeader("Settings"));
  const body = h("div", { class: "app-scroll" });

  body.appendChild(h("h2", { class: "section-label" }, "Experience"));
  body.appendChild(
    toggleRow(
      "Reduced intensity",
      "Turns off glitch, flicker, and sudden-effect moments. Story content is unchanged.",
      () => settings().reducedIntensity,
      (v) => {
        loadSave().settings.reducedIntensity = v;
        persist();
      },
    ),
  );
  body.appendChild(
    toggleRow(
      "Ambient audio",
      "A quiet procedural room-tone under everything. Off by default.",
      () => settings().ambientAudio,
      (v) => {
        loadSave().settings.ambientAudio = v;
        persist();
        syncAmbient();
      },
    ),
  );
  body.appendChild(
    toggleRow(
      "Show transcripts by default",
      "Voicemail transcripts start expanded.",
      () => settings().transcriptsOpen,
      (v) => {
        loadSave().settings.transcriptsOpen = v;
        persist();
      },
    ),
  );

  body.appendChild(h("h2", { class: "section-label" }, "About this device"));
  const info = h(
    "div",
    { class: "settings-info" },
    infoRow("Owner", rt.caseFile.phone.ownerLabel),
    infoRow("Custody", "Evidence — read-only image"),
    infoRow("Network", "No service"),
    infoRow("Player ID", loadSave().playerId),
  );
  body.appendChild(info);

  body.appendChild(h("h2", { class: "section-label" }, "Session"));
  const exitBtn = h("button", { class: "settings-btn", type: "button" }, "Close case and return to case files");
  exitBtn.addEventListener("click", () => rt.exitCase());
  body.appendChild(exitBtn);

  view.appendChild(body);
  return view;
}

function toggleRow(
  label: string,
  sub: string,
  get: () => boolean,
  set: (v: boolean) => void,
): HTMLElement {
  const toggle = h("button", {
    class: "toggle",
    type: "button",
    role: "switch",
    "aria-checked": String(get()),
    "aria-label": label,
  });
  toggle.appendChild(h("span", { class: "toggle-knob" }));
  function sync(): void {
    toggle.setAttribute("aria-checked", String(get()));
    toggle.classList.toggle("toggle-on", get());
  }
  toggle.addEventListener("click", () => {
    set(!get());
    sync();
  });
  sync();
  return h(
    "div",
    { class: "settings-row" },
    h("span", { class: "row-main" }, h("span", { class: "row-title" }, label), h("span", { class: "row-sub" }, sub)),
    toggle,
  );
}

function infoRow(label: string, value: string): HTMLElement {
  return h(
    "div",
    { class: "meta-row" },
    h("span", { class: "meta-label" }, label),
    h("span", { class: "meta-value" }, value),
  );
}
