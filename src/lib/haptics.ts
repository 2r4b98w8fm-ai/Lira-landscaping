import { settings } from "../save";

/** Light haptic feedback on supported devices (mostly Android/Chrome mobile). */
export function vibrate(pattern: number | number[]): void {
  try {
    if (settings().haptics === false) return;
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    /* unsupported — no-op */
  }
}
