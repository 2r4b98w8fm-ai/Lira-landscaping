import { settings } from "./save";

/**
 * Glitch layer: a brief CRT-static overlay used only at meaningful beats.
 * Fully disabled under prefers-reduced-motion or the reduced-intensity setting.
 */

let layer: HTMLDivElement | null = null;
let clearTimer = 0;

export function mountGlitchLayer(host: HTMLElement): void {
  layer = document.createElement("div");
  layer.className = "glitch-layer";
  layer.setAttribute("aria-hidden", "true");
  host.appendChild(layer);
}

export function triggerGlitch(durationMs = 420): void {
  if (!layer) return;
  if (settings().reducedIntensity) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.clearTimeout(clearTimer);
  layer.classList.remove("glitch-on");
  // force restart of the animation
  void layer.offsetWidth;
  layer.classList.add("glitch-on");
  clearTimer = window.setTimeout(() => layer?.classList.remove("glitch-on"), durationMs);
}
