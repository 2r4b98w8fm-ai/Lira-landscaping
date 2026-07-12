import type { IconName } from "./types";

/**
 * Original app-icon set: flat rounded tiles with hand-drawn line glyphs.
 * Deliberately not modeled on any existing OS iconography.
 */

const GLYPHS: Record<IconName, { bg: string; glyph: string }> = {
  messages: {
    bg: "#233a33",
    glyph:
      '<path d="M16 22h32a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H30l-8 7v-7h-6a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" fill="none" stroke="#9fe8d3" stroke-width="3" stroke-linejoin="round"/><circle cx="25" cy="33" r="1.8" fill="#9fe8d3"/><circle cx="32" cy="33" r="1.8" fill="#9fe8d3"/><circle cx="39" cy="33" r="1.8" fill="#9fe8d3"/>',
  },
  photos: {
    bg: "#2b2436",
    glyph:
      '<rect x="13" y="19" width="38" height="28" rx="4" fill="none" stroke="#cbb7f0" stroke-width="3"/><circle cx="24" cy="29" r="4" fill="none" stroke="#cbb7f0" stroke-width="2.5"/><path d="M15 43l11-10 8 7 7-6 10 9" fill="none" stroke="#cbb7f0" stroke-width="3" stroke-linejoin="round"/>',
  },
  notes: {
    bg: "#36301f",
    glyph:
      '<rect x="17" y="14" width="30" height="38" rx="4" fill="none" stroke="#ecd9a0" stroke-width="3"/><path d="M23 25h18M23 32h18M23 39h11" stroke="#ecd9a0" stroke-width="2.5" stroke-linecap="round"/>',
  },
  phone: {
    bg: "#1f3327",
    glyph:
      '<path d="M22 15c2.5 0 5 4.5 5 7 0 2.4-3 3.4-3 5.5 0 3 5.5 10.5 9.5 12.5 2 1 3.5-2 5.8-2 2.4 0 7.7 3 7.7 5.4 0 3-3.7 6.6-7.5 6.6C29 50 15 34 15 23.5c0-4.3 4.4-8.5 7-8.5z" fill="none" stroke="#a6e3b3" stroke-width="3" stroke-linejoin="round"/>',
  },
  calendar: {
    bg: "#33222a",
    glyph:
      '<rect x="14" y="18" width="36" height="32" rx="4" fill="none" stroke="#f0b7c8" stroke-width="3"/><path d="M14 27h36M23 14v8M41 14v8" stroke="#f0b7c8" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="36" r="2" fill="#f0b7c8"/><circle cx="32" cy="36" r="2" fill="#f0b7c8"/><circle cx="40" cy="36" r="2" fill="#f0b7c8"/>',
  },
  maps: {
    bg: "#1f2c38",
    glyph:
      '<path d="M32 14c7 0 12 5.4 12 12 0 8.5-12 24-12 24S20 34.5 20 26c0-6.6 5-12 12-12z" fill="none" stroke="#a8cdee" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="26" r="4.5" fill="none" stroke="#a8cdee" stroke-width="2.5"/>',
  },
  browser: {
    bg: "#242c3b",
    glyph:
      '<circle cx="32" cy="32" r="18" fill="none" stroke="#b3c3ea" stroke-width="3"/><ellipse cx="32" cy="32" rx="8" ry="18" fill="none" stroke="#b3c3ea" stroke-width="2.5"/><path d="M14 32h36M17 23h30M17 41h30" stroke="#b3c3ea" stroke-width="2.5"/>',
  },
  files: {
    bg: "#2e2a24",
    glyph:
      '<path d="M14 22a4 4 0 0 1 4-4h9l4 5h15a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V22z" fill="none" stroke="#dcc9a8" stroke-width="3" stroke-linejoin="round"/>',
  },
  settings: {
    bg: "#2a2d31",
    glyph:
      '<circle cx="32" cy="32" r="7" fill="none" stroke="#c3ccd4" stroke-width="3"/><path d="M32 15v6M32 43v6M15 32h6M43 32h6M20 20l4.3 4.3M39.7 39.7L44 44M44 20l-4.3 4.3M24.3 39.7L20 44" stroke="#c3ccd4" stroke-width="3" stroke-linecap="round"/>',
  },
  flashlight: {
    bg: "#332f22",
    glyph:
      '<path d="M24 14h16v8l-5 6v22a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V28l-5-6v-8z" fill="none" stroke="#efe3ae" stroke-width="3" stroke-linejoin="round"/><path d="M24 20h16" stroke="#efe3ae" stroke-width="2.5"/><circle cx="32" cy="34" r="2" fill="#efe3ae"/>',
  },
  calculator: {
    bg: "#26292e",
    glyph:
      '<rect x="17" y="13" width="30" height="38" rx="4" fill="none" stroke="#c9d2da" stroke-width="3"/><rect x="22" y="18" width="20" height="8" rx="1.5" fill="none" stroke="#c9d2da" stroke-width="2"/><circle cx="25" cy="34" r="2" fill="#c9d2da"/><circle cx="32" cy="34" r="2" fill="#c9d2da"/><circle cx="39" cy="34" r="2" fill="#c9d2da"/><circle cx="25" cy="43" r="2" fill="#c9d2da"/><circle cx="32" cy="43" r="2" fill="#c9d2da"/><circle cx="39" cy="43" r="2" fill="#c9d2da"/>',
  },
  weather: {
    bg: "#22303a",
    glyph:
      '<circle cx="26" cy="27" r="7" fill="none" stroke="#bcd8ea" stroke-width="3"/><path d="M33 40a8 8 0 1 1 7-12 6 6 0 1 1 1 12H24" fill="none" stroke="#bcd8ea" stroke-width="3" stroke-linecap="round"/>',
  },
  report: {
    bg: "#3a2626",
    glyph:
      '<rect x="17" y="13" width="30" height="38" rx="4" fill="none" stroke="#eab6a8" stroke-width="3"/><path d="M24 24h16M24 31h16M24 38h9" stroke="#eab6a8" stroke-width="2.5" stroke-linecap="round"/><path d="M37 40l3 3 6-7" fill="none" stroke="#eab6a8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  },
};

export function appIconSvg(name: IconName, unknown = false): string {
  const { bg, glyph } = GLYPHS[name];
  const body = unknown
    ? '<text x="32" y="41" text-anchor="middle" font-size="26" fill="#8b95a1" font-family="inherit">?</text>'
    : glyph;
  return `<svg viewBox="0 0 64 64" role="img" aria-hidden="true"><rect x="2" y="2" width="60" height="60" rx="15" fill="${unknown ? "#1c1f24" : bg}"/><rect x="2" y="2" width="60" height="60" rx="15" fill="url(#iconShine)" opacity="0"/>${body}</svg>`;
}

/** Small inline glyph (back arrows, flags, play buttons…). */
export function uiGlyph(name: string): string {
  const paths: Record<string, string> = {
    back: '<path d="M15 4L7 12l8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    chevron: '<path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    play: '<path d="M8 5v14l12-7z" fill="currentColor"/>',
    pause: '<path d="M8 5h3.4v14H8zM12.8 5h3.4v14h-3.4z" fill="currentColor" transform="translate(2 0)"/>',
    lock: '<rect x="6" y="11" width="12" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 11V8a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" stroke-width="2"/>',
    trash: '<path d="M6 8h12M10 8V6h4v2M8 8l1 12h6l1-12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    warn: '<path d="M12 4L3 20h18z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="17.6" r="1.1" fill="currentColor"/>',
    info: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 11v5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="8" r="1.2" fill="currentColor"/>',
    search: '<circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] ?? ""}</svg>`;
}
