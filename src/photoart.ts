/**
 * Shared helpers for authoring case photos as procedural SVG scenes.
 * The photoSvg wrapper applies a photographic post-process to every scene —
 * lens softness, color grade, sensor grain, bloom, vignette — so vector
 * compositions read as murky low-light phone photos, not flat art.
 */

import { mulberry32, seedFrom } from "./lib/rng";

let filterCounter = 0;

/** Wraps authored scene markup in a lens-processed, grain-textured photo. */
export function photoSvg(
  inner: string,
  opts: { aspect: "landscape" | "portrait"; base?: string; grain?: number },
): string {
  const w = opts.aspect === "landscape" ? 400 : 300;
  const h = opts.aspect === "landscape" ? 300 : 400;
  const base = opts.base ?? "#101216";
  const grainOp = opts.grain ?? 0.16;
  const fid = `g${filterCounter++}`;
  return (
    `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img">` +
    `<defs>` +
    // lens: soften vector edges and pull color toward a cold low-light grade
    `<filter id="${fid}l" x="-5%" y="-5%" width="110%" height="110%">` +
    `<feGaussianBlur stdDeviation="0.7"/>` +
    `<feColorMatrix type="matrix" values="0.96 0.03 0.04 0 0  0.02 0.98 0.05 0 0  0.04 0.05 1.03 0 0  0 0 0 1 0"/>` +
    `</filter>` +
    // fine luminance grain (sensor noise)
    `<filter id="${fid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="${grainOp}"/></feComponentTransfer><feComposite operator="over" in2="SourceGraphic"/></filter>` +
    // coarse blotch (high-ISO color noise)
    `<filter id="${fid}b" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.05 0.07" numOctaves="2" stitchTiles="stitch" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.4  0 0 0 0 0.55  0.4 0 0 0 0"/></filter>` +
    `<radialGradient id="${fid}v" cx="50%" cy="45%" r="78%"><stop offset="48%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.62"/></radialGradient>` +
    `<radialGradient id="${fid}h" cx="38%" cy="26%" r="55%"><stop offset="0%" stop-color="#cfd8e6" stop-opacity="0.06"/><stop offset="60%" stop-color="#cfd8e6" stop-opacity="0.015"/><stop offset="100%" stop-color="#cfd8e6" stop-opacity="0"/></radialGradient>` +
    `</defs>` +
    `<rect width="${w}" height="${h}" fill="${base}"/>` +
    `<g filter="url(#${fid}l)">${inner}</g>` +
    `<rect width="${w}" height="${h}" fill="url(#${fid}h)"/>` +
    `<rect width="${w}" height="${h}" filter="url(#${fid}b)" opacity="0.05"/>` +
    `<rect width="${w}" height="${h}" fill="url(#${fid}v)"/>` +
    `<rect width="${w}" height="${h}" filter="url(#${fid})" opacity="${grainOp}" fill="#777"/>` +
    `</svg>`
  );
}

/** A dim rectangular wall with baseboard — the backbone of interior shots. */
export function wall(x: number, y: number, w: number, h: number, tone = "#1a1d22"): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${tone}"/><rect x="${x}" y="${y + h - 8}" width="${w}" height="8" fill="#0c0e11"/>`;
}

export function windowPane(x: number, y: number, w: number, h: number, glow = "#232c33"): string {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${glow}"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#0a0b0d" stroke-width="5"/>` +
    `<path d="M${x + w / 2} ${y}v${h}M${x} ${y + h / 2}h${w}" stroke="#0a0b0d" stroke-width="3"/>`
  );
}

/** A faint humanoid silhouette — the recurring shape. Keep subtle. */
export function figure(x: number, y: number, scale = 1, opacity = 0.35, tone = "#05060a"): string {
  return (
    `<g transform="translate(${x} ${y}) scale(${scale})" opacity="${opacity}">` +
    `<ellipse cx="0" cy="-34" rx="7" ry="9" fill="${tone}"/>` +
    `<path d="M-10 -26 C-13 -10 -12 12 -9 30 L9 30 C12 12 13 -10 10 -26 Z" fill="${tone}"/>` +
    `</g>`
  );
}

export function doorway(x: number, y: number, w: number, h: number, openTone = "#050608"): string {
  return (
    `<rect x="${x - 4}" y="${y - 4}" width="${w + 8}" height="${h + 4}" fill="#22262c"/>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${openTone}"/>`
  );
}

export function blurStreak(x: number, y: number, w: number, tone = "#3a4048", opacity = 0.5): string {
  return `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w / 6}" fill="${tone}" opacity="${opacity}"/>`;
}

export function timestampBurn(text: string, w: number, h: number): string {
  return `<text x="${w - 10}" y="${h - 10}" text-anchor="end" font-family="monospace" font-size="13" fill="#c8b57a" opacity="0.85">${text}</text>`;
}

// ---------------------------------------------------------------------------
// Gore layer — dried and fresh blood, built from seeded irregular blobs so
// every stain is unique but stable per photo.
// ---------------------------------------------------------------------------

const DRIED = "#3d0a0a";
const DARK = "#560f10";
const FRESH = "#7c1116";
const SHEEN = "#a01c22";

function blob(cx: number, cy: number, r: number, rand: () => number, fill: string, opacity: number): string {
  const pts: string[] = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * (0.55 + rand() * 0.7);
    pts.push(`${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr * 0.72).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${fill}" opacity="${opacity}"/>`;
}

/** A pooled stain with a wet sheen; reads as hours old. */
export function bloodPool(cx: number, cy: number, r: number, seedKey: string): string {
  const rand = mulberry32(seedFrom(seedKey));
  return (
    blob(cx, cy, r * 1.15, rand, DRIED, 0.85) +
    blob(cx, cy, r * 0.9, rand, DARK, 0.9) +
    blob(cx, cy, r * 0.55, rand, FRESH, 0.9) +
    `<ellipse cx="${cx - r * 0.25}" cy="${cy - r * 0.18}" rx="${r * 0.28}" ry="${r * 0.12}" fill="${SHEEN}" opacity="0.5"/>` +
    Array.from({ length: 5 }, () =>
      `<circle cx="${(cx + (rand() - 0.5) * r * 3.2).toFixed(1)}" cy="${(cy + (rand() - 0.5) * r * 1.8).toFixed(1)}" r="${(1 + rand() * 2.4).toFixed(1)}" fill="${DARK}" opacity="0.8"/>`,
    ).join("")
  );
}

/** A directional drag smear — something pulled across a surface. */
export function bloodSmear(x: number, y: number, len: number, angle: number, seedKey: string): string {
  const rand = mulberry32(seedFrom(seedKey));
  let out = `<g transform="translate(${x} ${y}) rotate(${angle})">`;
  out += `<path d="M0 0 Q ${len * 0.3} ${-4 - rand() * 5} ${len * 0.62} ${-2} T ${len} 0 L ${len * 0.94} 7 Q ${len * 0.5} ${10 + rand() * 6} 0 8 Z" fill="${DARK}" opacity="0.82"/>`;
  out += `<path d="M0 2 Q ${len * 0.4} ${-1} ${len * 0.8} 2 L ${len * 0.76} 6 Q ${len * 0.35} 8 0 6 Z" fill="${FRESH}" opacity="0.75"/>`;
  for (let i = 0; i < 6; i++) {
    const fx = len * (0.75 + rand() * 0.3);
    out += `<path d="M${fx} ${1 + rand() * 5} h${5 + rand() * 14}" stroke="${DARK}" stroke-width="${1 + rand() * 1.6}" opacity="0.7"/>`;
  }
  out += `</g>`;
  return out;
}

/** Fine spray — droplets fanning from a point. */
export function bloodSpatter(cx: number, cy: number, spread: number, seedKey: string): string {
  const rand = mulberry32(seedFrom(seedKey));
  let out = "";
  for (let i = 0; i < 26; i++) {
    const a = (rand() - 0.5) * Math.PI;
    const d = rand() * spread;
    const px = cx + Math.cos(a) * d;
    const py = cy + Math.sin(a) * d * 0.6;
    const r = 0.6 + rand() * 2.2 * (1 - d / spread);
    out += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(1)}" fill="${rand() > 0.4 ? DARK : FRESH}" opacity="${0.55 + rand() * 0.35}"/>`;
    if (rand() > 0.75) {
      out += `<path d="M${px.toFixed(1)} ${py.toFixed(1)} l${(Math.cos(a) * (3 + rand() * 6)).toFixed(1)} ${(Math.sin(a) * (2 + rand() * 4)).toFixed(1)}" stroke="${DARK}" stroke-width="0.8" opacity="0.6"/>`;
    }
  }
  return out;
}

/** A pressed handprint, palm and five fingers, in drying blood. */
export function bloodHandprint(x: number, y: number, scale = 1, angle = 0, tone: string = DARK): string {
  const fingers = [-26, -13, 0, 13, 26]
    .map(
      (fx, i) =>
        `<ellipse cx="${fx}" cy="${i === 0 ? -18 : -26 - (i === 2 ? 5 : 0)}" rx="5.5" ry="${i === 0 ? 12 : 15}" fill="${tone}" transform="rotate(${fx * 0.7} ${fx} -20)"/>`,
    )
    .join("");
  return (
    `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" opacity="0.85">` +
    `<ellipse cx="0" cy="0" rx="17" ry="21" fill="${tone}"/>` +
    fingers +
    `<path d="M-6 18 q4 14 2 26" stroke="${tone}" stroke-width="5" opacity="0.6" fill="none"/>` +
    `</g>`
  );
}

/** Vertical runnels down a wall from a stained region. */
export function bloodRunnels(x: number, y: number, w: number, seedKey: string): string {
  const rand = mulberry32(seedFrom(seedKey));
  let out = "";
  for (let i = 0; i < 7; i++) {
    const rx = x + rand() * w;
    const len = 14 + rand() * 55;
    out += `<path d="M${rx.toFixed(1)} ${y} q${(rand() - 0.5) * 6} ${len * 0.5} 0 ${len}" stroke="${rand() > 0.5 ? DARK : DRIED}" stroke-width="${1.4 + rand() * 2.4}" stroke-linecap="round" fill="none" opacity="0.8"/>`;
    out += `<circle cx="${rx.toFixed(1)}" cy="${(y + len).toFixed(1)}" r="${1.6 + rand() * 1.8}" fill="${DARK}" opacity="0.8"/>`;
  }
  return out;
}
