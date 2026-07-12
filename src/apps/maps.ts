import type { DeviceRuntime } from "../device/runtime";
import { h, svgEl } from "../lib/dom";
import { fullStamp } from "../lib/time";

/**
 * Stylized abstract location-history map: a dark street grid with a
 * chronological pin trail. No real map data.
 */
export function openMaps(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-maps" });
  view.appendChild(rt.appHeader("Location History"));

  const pins = [...rt.caseFile.locationPins].sort(
    (a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp),
  );

  const trail = pins.map((p) => `${p.x * 4},${p.y * 3}`).join(" ");
  const pinMarks = pins
    .map(
      (p, i) =>
        `<g class="map-pin" data-pin="${p.id}" transform="translate(${p.x * 4} ${p.y * 3})">` +
        `<circle r="10" fill="rgba(141,199,232,0.12)"/>` +
        `<circle r="4.5" fill="#8dc7e8"/>` +
        `<text y="-9" text-anchor="middle" font-size="11" fill="#8dc7e8">${i + 1}</text>` +
        `</g>`,
    )
    .join("");

  const mapSvg =
    `<svg viewBox="0 0 400 300" class="map-canvas" role="img" aria-label="Abstract map of recorded locations">` +
    `<rect width="400" height="300" fill="#0d1013"/>` +
    streetGrid() +
    `<polyline points="${trail}" fill="none" stroke="#4a6b7d" stroke-width="1.6" stroke-dasharray="5 4"/>` +
    pinMarks +
    `</svg>`;

  const mapEl = svgEl(mapSvg, "map-wrap");
  const list = h("div", { class: "map-pin-list", role: "list" });

  pins.forEach((p, i) => {
    rt.markViewed(p.id);
    const row = h(
      "div",
      { class: "map-row", role: "listitem", "data-row": p.id },
      h("span", { class: "map-row-idx" }, String(i + 1)),
      h(
        "span",
        { class: "row-main" },
        h("span", { class: "row-title" }, p.label),
        h("span", { class: "row-sub" }, fullStamp(p.timestamp)),
        p.detail ? h("span", { class: "map-row-detail" }, p.detail) : null,
      ),
    );
    list.appendChild(row);
  });

  view.appendChild(h("div", { class: "app-scroll" }, mapEl, h("h2", { class: "section-label" }, "Recorded stops"), list));

  if (targetId) {
    window.setTimeout(() => {
      const row = list.querySelector(`[data-row="${targetId}"]`);
      row?.scrollIntoView({ block: "center" });
      row?.classList.add("map-row-hi");
    }, 80);
  }
  return view;
}

function streetGrid(): string {
  // static abstract street lattice — same for every case, it's "the town"
  let out = "";
  const hLines = [40, 95, 150, 210, 262];
  const vLines = [55, 120, 200, 275, 340];
  for (const y of hLines) out += `<path d="M0 ${y}H400" stroke="#1a2027" stroke-width="8"/>`;
  for (const x of vLines) out += `<path d="M${x} 0V300" stroke="#1a2027" stroke-width="8"/>`;
  out += `<path d="M0 40 Q180 70 400 210" stroke="#161c22" stroke-width="10" fill="none"/>`;
  for (const y of hLines) out += `<path d="M0 ${y}H400" stroke="#232b34" stroke-width="1"/>`;
  for (const x of vLines) out += `<path d="M${x} 0V300" stroke="#232b34" stroke-width="1"/>`;
  return out;
}
