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
    onSolved: (usedHint: boolean) => void;
  },
): HTMLElement {
  const view = h("div", { class: "app app-codepad" });
  view.appendChild(rt.appHeader(opts.title));

  let entry = "";
  let wrongCount = 0;
  let specificHintShown = false;

  const dots = h("div", { class: "code-dots", role: "status", "aria-label": "Code entry" });
  const dotEls = Array.from({ length: 4 }, () => h("span", { class: "code-dot" }));
  dots.append(...dotEls);

  // Hint starts hidden — the player must find the code, not read it.
  const hint = h("p", { class: "code-hint" }, "The code is somewhere on this phone.");
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
      window.setTimeout(() => opts.onSolved(specificHintShown), 250);
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
    feedback.textContent = "Incorrect code.";
    // Difficulty: the real hint stays hidden. Only after real effort — and
    // never in Hard mode — does a nudge, then the full hint, surface, so the
    // puzzle is hard but never a dead end.
    if (settings().hardMode) {
      hint.textContent = wrongCount >= 6 ? "The code is somewhere on this phone. Keep looking." : "";
    } else if (wrongCount >= 8) {
      hint.textContent = opts.hintText;
    } else if (wrongCount >= 4) {
      hint.textContent = "The four digits are hidden on this phone — a photo, a note, a message. Two pieces, put together.";
    }
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
