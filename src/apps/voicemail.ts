import type { DeviceRuntime } from "../device/runtime";
import type { Voicemail } from "../types";
import { h, svgEl } from "../lib/dom";
import { fullStamp, mmss } from "../lib/time";
import { uiGlyph } from "../icons";
import { mulberry32, seedFrom } from "../lib/rng";
import { playVoicemailTone, speakTranscript, speechTextFor, type VoicePlayback } from "../audio";
import { settings } from "../save";

export function openVoicemail(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-voicemail" });
  view.appendChild(rt.appHeader("Voicemail"));
  const list = h("div", { class: "app-scroll", role: "list" });
  view.appendChild(list);

  list.appendChild(
    h(
      "p",
      { class: "folder-note" },
      "Recovered from carrier backup. Audio is partially corrupted — playback reconstructs the recovered speech over the damaged recording. (On iPhone: turn the silent switch off and the volume up.)",
    ),
  );

  const items = [...rt.caseFile.voicemails].sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
  const cards = new Map<string, HTMLElement>();
  const stops: Array<() => void> = [];
  for (const vm of items) {
    const card = voicemailCard(rt, vm, stops);
    cards.set(vm.id, card);
    list.appendChild(card);
  }
  view.addEventListener("view-removed", () => stops.forEach((s) => s()));

  if (targetId && cards.has(targetId)) {
    window.setTimeout(() => cards.get(targetId)!.scrollIntoView({ block: "center" }), 80);
  }
  return view;
}

function voicemailCard(rt: DeviceRuntime, vm: Voicemail, stops: Array<() => void>): HTMLElement {
  let playback: VoicePlayback | null = null;
  let speech: VoicePlayback | null = null;
  let playing = false;
  let position = 0; // seconds
  let raf = 0;
  let playStartedAt = 0;
  let startOffset = 0;

  const playBtn = h(
    "button",
    { class: "vm-play", type: "button", "aria-label": `Play voicemail from ${vm.callerLabel}` },
    svgEl(uiGlyph("play"), "glyph"),
  );
  const timeLabel = h("span", { class: "vm-time" }, `0:00 / ${mmss(vm.durationSec)}`);

  // deterministic waveform bars from the voicemail id
  const rand = mulberry32(seedFrom(vm.id));
  const BAR_COUNT = 36;
  const bars: HTMLElement[] = [];
  const wave = h("div", { class: "vm-wave", role: "slider", "aria-label": "Playback position", tabindex: "0" });
  for (let i = 0; i < BAR_COUNT; i++) {
    const bar = h("span", { class: "vm-bar" });
    bar.style.height = `${18 + Math.round(rand() * 82)}%`;
    bars.push(bar);
    wave.appendChild(bar);
  }

  function paint(): void {
    const frac = Math.min(1, position / vm.durationSec);
    bars.forEach((b, i) => b.classList.toggle("vm-bar-played", i / BAR_COUNT <= frac));
    timeLabel.textContent = `${mmss(position)} / ${mmss(vm.durationSec)}`;
  }

  function stop(ended: boolean): void {
    playback?.stop();
    playback = null;
    speech?.stop();
    speech = null;
    playing = false;
    cancelAnimationFrame(raf);
    playBtn.replaceChildren(svgEl(uiGlyph("play"), "glyph"));
    if (ended) position = 0;
    paint();
  }

  function start(): void {
    rt.markViewed(vm.id);
    const remaining = vm.durationSec - position;
    if (remaining <= 0.2) position = 0;
    startOffset = position;
    playStartedAt = performance.now();
    // speech restarts from the top when playing from (near) the beginning;
    // mid-message resumes get the damaged-tape bed alone
    speech = position < 0.5 ? speakTranscript(vm.tone, speechTextFor(vm.transcript)) : null;
    playback = playVoicemailTone(vm.tone, vm.id, vm.durationSec - position, () => stop(true), !!speech);
    playing = true;
    playBtn.replaceChildren(svgEl(uiGlyph("pause"), "glyph"));
    const step = () => {
      if (!playing) return;
      position = startOffset + (performance.now() - playStartedAt) / 1000;
      paint();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  }

  playBtn.addEventListener("click", () => (playing ? stop(false) : start()));

  function scrubTo(clientX: number): void {
    const rect = wave.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    position = frac * vm.durationSec;
    if (playing) {
      stop(false);
      start();
    } else {
      paint();
    }
  }
  wave.addEventListener("pointerdown", (e) => scrubTo(e.clientX));
  wave.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      position = Math.min(vm.durationSec, position + 3);
      paint();
    }
    if (e.key === "ArrowLeft") {
      position = Math.max(0, position - 3);
      paint();
    }
  });

  const transcript = h("div", { class: "vm-transcript" }, h("p", {}, vm.transcript));
  const transcriptToggle = h(
    "button",
    { class: "vm-transcript-toggle", type: "button", "aria-expanded": "false" },
    "Transcript",
  );
  let open = settings().transcriptsOpen;
  function syncTranscript(): void {
    transcript.hidden = !open;
    transcriptToggle.setAttribute("aria-expanded", String(open));
    transcriptToggle.textContent = open ? "Hide transcript" : "Transcript";
    if (open) rt.markViewed(vm.id);
  }
  transcriptToggle.addEventListener("click", () => {
    open = !open;
    syncTranscript();
  });
  syncTranscript();

  const card = h(
    "div",
    { class: "vm-card" },
    h(
      "div",
      { class: "vm-head" },
      h("span", { class: "vm-caller" }, vm.callerLabel),
      h("span", { class: "vm-stamp" }, fullStamp(vm.timestamp)),
    ),
    vm.callerNumber ? h("div", { class: "vm-number" }, vm.callerNumber) : h("span"),
    h("div", { class: "vm-player" }, playBtn, wave, timeLabel),
    transcriptToggle,
    transcript,
  );
  stops.push(() => stop(false));
  return card;
}
