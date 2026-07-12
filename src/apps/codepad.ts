import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";
import { settings } from "../save";

/**
 * Generic 4-digit code lock. Wrong entries shake (unless reduced intensity)
 * but never lock the player out — codes are always deducible from in-case
 * clues, so patience is the only requirement.
 */
export function buildCodePad(
  rt: DeviceRuntime,
  opts: {
    title: string;
    hintText: string;
    solution: string;
    onSolved: () => void;
  },
): HTMLElement {
  const view = h("div", { class: "app app-codepad" });
  view.appendChild(rt.appHeader(opts.title));

  let entry = "";
  let wrongCount = 0;

  const dots = h("div", { class: "code-dots", role: "status", "aria-label": "Code entry" });
  const dotEls = Array.from({ length: 4 }, () => h("span", { class: "code-dot" }));
  dots.append(...dotEls);

  const hint = h("p", { class: "code-hint" }, opts.hintText);
  const feedback = h("p", { class: "code-feedback", role: "alert" }, "");

  const pad = h("div", { class: "code-pad" });
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"];
  for (const key of keys) {
    if (key === "") {
      pad.appendChild(h("span"));
      continue;
    }
    const btn = h("button", { class: "code-key", type: "button", "aria-label": key === "⌫" ? "Delete" : key }, key);
    btn.addEventListener("click", () => press(key));
    pad.appendChild(btn);
  }

  function refreshDots(): void {
    dotEls.forEach((d, i) => d.classList.toggle("code-dot-filled", i < entry.length));
  }

  function press(key: string): void {
    feedback.textContent = "";
    if (key === "⌫") {
      entry = entry.slice(0, -1);
      refreshDots();
      return;
    }
    if (entry.length >= 4) return;
    entry += key;
    refreshDots();
    if (entry.length === 4) window.setTimeout(check, 150);
  }

  function check(): void {
    if (entry === opts.solution) {
      dots.classList.add("code-ok");
      window.setTimeout(opts.onSolved, 250);
      return;
    }
    wrongCount++;
    entry = "";
    refreshDots();
    if (!settings().reducedIntensity) {
      dots.classList.remove("code-shake");
      void dots.offsetWidth;
      dots.classList.add("code-shake");
    }
    feedback.textContent = wrongCount >= 3 ? "Incorrect. The digits are on this phone somewhere." : "Incorrect code.";
  }

  view.tabIndex = 0;
  view.addEventListener("keydown", (e) => {
    if (/^[0-9]$/.test(e.key)) press(e.key);
    if (e.key === "Backspace") press("⌫");
  });

  view.appendChild(
    h("div", { class: "code-wrap" }, h("p", { class: "code-prompt" }, "Enter Code"), dots, feedback, pad, hint),
  );
  return view;
}
