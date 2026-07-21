import type { IconName } from "./types";

/**
 * Original app-icon set: bright, glossy rounded tiles with white line
 * glyphs — smartphone-familiar without copying any existing icon art.
 */

const GLYPHS: Record<IconName, { bg: string; bg2: string; glyph: string }> = {
  messages: {
    bg: "#5cf777",
    bg2: "#0bc42c",
    glyph:
      '<path d="M32 16c-10.5 0-19 7-19 15.6 0 4.9 2.7 9.2 7 12.1-.3 2.4-1.4 4.6-3.2 6.3 3.4-.2 6.5-1.5 8.9-3.4 2 .5 4.1.7 6.3.7 10.5 0 19-7 19-15.7S42.5 16 32 16z" fill="#fff"/>',
  },
  photos: {
    bg: "#ffffff",
    bg2: "#f2f2f7",
    glyph:
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const colors = ["#ffb300", "#ff8a00", "#ff375f", "#c644fc", "#5e5ce6", "#0a84ff", "#30c48d", "#a4d40b"];
        return `<ellipse cx="${32 + Math.cos(a) * 10}" cy="${32 + Math.sin(a) * 10}" rx="7.5" ry="12.5" fill="${colors[i]}" opacity="0.82" transform="rotate(${(a * 180) / Math.PI + 90} ${32 + Math.cos(a) * 10} ${32 + Math.sin(a) * 10})"/>`;
      }).join(""),
  },
  notes: {
    bg: "#ffffff",
    bg2: "#f7f7f2",
    glyph:
      '<rect x="2" y="2" width="60" height="16" rx="0" fill="#f7d64a"/><rect x="2" y="14" width="60" height="4" fill="#e8c53a" opacity="0.5"/><path d="M14 30h36M14 39h36M14 48h22" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round"/>',
  },
  phone: {
    bg: "#5cf777",
    bg2: "#0bc42c",
    glyph:
      '<path d="M22 15c2.5 0 5 4.5 5 7 0 2.4-3 3.4-3 5.5 0 3 5.5 10.5 9.5 12.5 2 1 3.5-2 5.8-2 2.4 0 7.7 3 7.7 5.4 0 3-3.7 6.6-7.5 6.6C29 50 15 34 15 23.5c0-4.3 4.4-8.5 7-8.5z" fill="#fff"/>',
  },
  calendar: {
    bg: "#ffffff",
    bg2: "#f2f2f7",
    glyph:
      '<rect x="2" y="2" width="60" height="15" fill="#ff3b30"/><text x="32" y="14" text-anchor="middle" font-size="9" font-weight="700" fill="#fff" font-family="inherit">TUESDAY</text><text x="32" y="47" text-anchor="middle" font-size="30" font-weight="300" fill="#1c1c1e" font-family="inherit">13</text>',
  },
  maps: {
    bg: "#d9f0e2",
    bg2: "#b8e3c9",
    glyph:
      '<path d="M2 20 L26 12 L44 22 L62 14 V50 L38 58 L20 48 L2 56 Z" fill="#f3efe4"/><path d="M2 34 C18 30 34 40 62 32" stroke="#8fce6e" stroke-width="7" fill="none"/><path d="M14 6 V58 M46 8 V56" stroke="#fff" stroke-width="4" opacity="0.8"/><circle cx="42" cy="26" r="8" fill="#0a84ff" stroke="#fff" stroke-width="3"/>',
  },
  browser: {
    bg: "#4dc4ff",
    bg2: "#0a6cff",
    glyph:
      '<circle cx="32" cy="32" r="19" fill="#fff"/><path d="M42 22 L36 36 L22 42 L28 28 Z" fill="#ff3b30"/><path d="M36 36 L22 42 L28 28 Z" fill="#e8ecf2"/>',
  },
  files: {
    bg: "#ffffff",
    bg2: "#eef2f8",
    glyph:
      '<path d="M12 20a4 4 0 0 1 4-4h10l4 5h18a4 4 0 0 1 4 4v19a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V20z" fill="#3aa5ff"/><path d="M12 27h40v17a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4V27z" fill="#67bcff"/>',
  },
  settings: {
    bg: "#e5e5ea",
    bg2: "#aeaeb5",
    glyph:
      '<circle cx="32" cy="32" r="13" fill="none" stroke="#3d3f45" stroke-width="5"/><circle cx="32" cy="32" r="5" fill="#3d3f45"/><path d="M32 12v8M32 44v8M12 32h8M44 32h8M18 18l5.5 5.5M40.5 40.5L46 46M46 18l-5.5 5.5M23.5 40.5L18 46" stroke="#3d3f45" stroke-width="5" stroke-linecap="round"/>',
  },
  flashlight: {
    bg: "#f4f4f6",
    bg2: "#c9c9d1",
    glyph:
      '<path d="M24 12h16v8l-5 6v24a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V26l-5-6v-8z" fill="none" stroke="#3d3f45" stroke-width="3.5" stroke-linejoin="round"/><path d="M24 18h16" stroke="#3d3f45" stroke-width="3"/><circle cx="32" cy="33" r="2.2" fill="#3d3f45"/>',
  },
  calculator: {
    bg: "#2c2c2e",
    bg2: "#141416",
    glyph:
      '<circle cx="20" cy="20" r="6" fill="#a5a5a8"/><circle cx="32" cy="20" r="6" fill="#a5a5a8"/><circle cx="44" cy="20" r="6" fill="#ff9f0a"/><circle cx="20" cy="33" r="6" fill="#5c5c60"/><circle cx="32" cy="33" r="6" fill="#5c5c60"/><circle cx="44" cy="33" r="6" fill="#ff9f0a"/><circle cx="20" cy="46" r="6" fill="#5c5c60"/><circle cx="32" cy="46" r="6" fill="#5c5c60"/><circle cx="44" cy="46" r="6" fill="#ff9f0a"/>',
  },
  weather: {
    bg: "#6ec6ff",
    bg2: "#2a7fe0",
    glyph:
      '<circle cx="24" cy="24" r="10" fill="#ffd60a"/><path d="M34 44a9 9 0 1 1 8-13 7 7 0 1 1 1 13H24a7 7 0 0 1-1-13" fill="#fff"/>',
  },
  clock: {
    bg: "#ffffff",
    bg2: "#ececf1",
    glyph:
      '<circle cx="32" cy="32" r="21" fill="#fff" stroke="#1c1c1e" stroke-width="3"/><path d="M32 17v15l10 7" fill="none" stroke="#1c1c1e" stroke-width="3.5" stroke-linecap="round"/><circle cx="32" cy="32" r="2" fill="#ff9f0a"/>',
  },
  report: {
    bg: "#ffd6ce",
    bg2: "#ff7a63",
    glyph:
      '<rect x="17" y="12" width="30" height="40" rx="4" fill="#fff"/><path d="M23 23h18M23 30h18M23 37h9" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round"/><path d="M35 40l4 4 8-9" fill="none" stroke="#d92a1c" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  music: {
    bg: "#fc5b6e",
    bg2: "#f11e46",
    glyph:
      '<path d="M26 44V24l16-4v18" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><circle cx="22" cy="44" r="5" fill="#fff"/><circle cx="38" cy="40" r="5" fill="#fff"/>',
  },
  wallet: {
    bg: "#3a3f4a",
    bg2: "#1c1f26",
    glyph:
      '<rect x="14" y="20" width="36" height="26" rx="5" fill="#fff"/><rect x="14" y="26" width="36" height="6" fill="#c7c7cc"/><rect x="38" y="35" width="9" height="6" rx="2" fill="#7a7f8a"/>',
  },
  health: {
    bg: "#ffffff",
    bg2: "#f2f2f7",
    glyph:
      '<path d="M32 46s-14-8-14-18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 10-14 18-14 18z" fill="#fc3d5a"/>',
  },
  podcasts: {
    bg: "#c86bf0",
    bg2: "#8e3fd0",
    glyph:
      '<circle cx="32" cy="26" r="7" fill="#fff"/><path d="M22 44c2-8 4-11 10-11s8 3 10 11" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
  },
  mail: {
    bg: "#4dc4ff",
    bg2: "#0a8cff",
    glyph:
      '<rect x="13" y="20" width="38" height="26" rx="5" fill="#fff"/><path d="M15 23l17 13 17-13" fill="none" stroke="#4dc4ff" stroke-width="4" stroke-linejoin="round"/>',
  },
  social: {
    bg: "#f7c34a",
    bg2: "#e8734a",
    glyph:
      '<rect x="15" y="15" width="34" height="34" rx="10" fill="none" stroke="#fff" stroke-width="4"/><circle cx="32" cy="32" r="8" fill="none" stroke="#fff" stroke-width="4"/><circle cx="42" cy="22" r="2.5" fill="#fff"/>',
  },
  reminders: {
    bg: "#ffffff",
    bg2: "#f2f2f7",
    glyph:
      '<circle cx="22" cy="24" r="4" fill="none" stroke="#fc5b6e" stroke-width="3"/><circle cx="22" cy="40" r="4" fill="none" stroke="#f7a23a" stroke-width="3"/><path d="M31 24h13M31 40h13" stroke="#c7c7cc" stroke-width="3" stroke-linecap="round"/>',
  },
  appstore: {
    bg: "#3aa0ff",
    bg2: "#0a6cff",
    glyph:
      '<path d="M24 44l16-24 8 24M20 38h20" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  camera: {
    bg: "#3a3f4a",
    bg2: "#1c1f26",
    glyph:
      '<rect x="14" y="22" width="36" height="24" rx="5" fill="#e5e5ea"/><path d="M24 22l3-5h10l3 5" fill="#e5e5ea"/><circle cx="32" cy="34" r="8" fill="none" stroke="#7a7f8a" stroke-width="3"/>',
  },
  translate: {
    bg: "#4a80f0",
    bg2: "#2a54d0",
    glyph:
      '<text x="22" y="34" text-anchor="middle" font-size="20" fill="#fff" font-family="inherit">A</text><text x="42" y="42" text-anchor="middle" font-size="18" fill="#fff" font-family="inherit">文</text>',
  },
  fitness: {
    bg: "#0a0a0e",
    bg2: "#1c1c22",
    glyph:
      '<circle cx="32" cy="32" r="16" fill="none" stroke="#7cf7c4" stroke-width="4"/><circle cx="32" cy="32" r="9" fill="none" stroke="#fc5b8e" stroke-width="4"/>',
  },
  news: {
    bg: "#fc5b6e",
    bg2: "#f11e46",
    glyph:
      '<rect x="15" y="16" width="34" height="32" rx="4" fill="#fff"/><path d="M20 24h10v8H20zM33 24h11M33 30h11M20 37h24M20 42h24" stroke="#c7c7cc" stroke-width="2.5" stroke-linecap="round"/>',
  },
  shop: {
    bg: "#ffb648",
    bg2: "#f7861e",
    glyph:
      '<path d="M20 24h24l-3 24H23z" fill="#fff"/><path d="M25 24v-3a7 7 0 0 1 14 0v3" fill="none" stroke="#fff" stroke-width="3.5"/>',
  },
  dating: {
    bg: "#ff6a8e",
    bg2: "#fc2b55",
    glyph:
      '<path d="M32 46s-14-8-14-18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 10-14 18-14 18z" fill="#fff"/>',
  },
};

let iconUid = 0;

export function appIconSvg(name: IconName, unknown = false): string {
  const { bg, bg2, glyph } = GLYPHS[name];
  const gid = `ig${iconUid++}`;
  const body = unknown
    ? '<text x="32" y="42" text-anchor="middle" font-size="28" fill="#9a9aa2" font-family="inherit">?</text>'
    : glyph;
  return (
    `<svg viewBox="0 0 64 64" role="img" aria-hidden="true">` +
    `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0" stop-color="${unknown ? "#f2f2f7" : bg}"/><stop offset="1" stop-color="${unknown ? "#d8d8de" : bg2}"/>` +
    `</linearGradient><clipPath id="${gid}c"><rect x="2" y="2" width="60" height="60" rx="15"/></clipPath></defs>` +
    `<rect x="2" y="2" width="60" height="60" rx="15" fill="url(#${gid})"/>` +
    `<g clip-path="url(#${gid}c)">${body}</g>` +
    `<rect x="2" y="2" width="60" height="60" rx="15" fill="none" stroke="rgba(0,0,0,0.08)"/>` +
    `</svg>`
  );
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
