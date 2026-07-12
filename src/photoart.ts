/**
 * Shared helpers for authoring case photos as procedural SVG scenes.
 * Photos are deliberately murky, grainy, low-fi — "recovered from a phone."
 */

let filterCounter = 0;

/** Wraps authored scene markup in a framed, vignetted, grain-textured photo. */
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
    `<filter id="${fid}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="${grainOp}"/></feComponentTransfer><feComposite operator="over" in2="SourceGraphic"/></filter>` +
    `<radialGradient id="${fid}v" cx="50%" cy="45%" r="75%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.55"/></radialGradient>` +
    `</defs>` +
    `<rect width="${w}" height="${h}" fill="${base}"/>` +
    inner +
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
