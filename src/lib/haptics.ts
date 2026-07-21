/** Light haptic feedback on supported devices (mostly Android/Chrome mobile). */
export function vibrate(pattern: number | number[]): void {
  try {
    if ("vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    /* unsupported — no-op */
  }
}
