import type { DeviceRuntime } from "../device/runtime";
import type { Photo } from "../types";
import { h, svgEl } from "../lib/dom";
import { fullStamp, dateStamp } from "../lib/time";
import { uiGlyph } from "../icons";
import { persist } from "../save";

export function openPhotos(rt: DeviceRuntime, targetId?: string): HTMLElement {
  const view = h("div", { class: "app app-photos" });
  view.appendChild(rt.appHeader("Photos"));

  const byTime = (a: Photo, b: Photo) => Date.parse(a.timestamp) - Date.parse(b.timestamp);
  const main = rt.caseFile.photos.filter((p) => !p.deleted).sort(byTime);
  const deleted = rt.caseFile.photos.filter((p) => p.deleted).sort(byTime);

  const grid = h("div", { class: "photo-grid", role: "list" });
  for (const p of main) grid.appendChild(thumb(rt, p, main));

  const body = h("div", { class: "app-scroll" }, h("h2", { class: "section-label" }, "Library"), grid);

  if (deleted.length > 0) {
    const folderRow = h(
      "button",
      { class: "list-row", type: "button" },
      svgEl(uiGlyph("trash"), "glyph row-glyph"),
      h(
        "span",
        { class: "row-main" },
        h("span", { class: "row-title" }, "Recently Deleted"),
        h(
          "span",
          { class: "row-sub" },
          rt.progress.deletedFolderFound ? `${deleted.length} items` : "…",
        ),
      ),
      svgEl(uiGlyph("chevron"), "glyph row-chevron"),
    );
    folderRow.addEventListener("click", () => {
      if (!rt.progress.deletedFolderFound) {
        rt.progress.deletedFolderFound = true;
        persist();
      }
      rt.push(deletedFolder(rt, deleted));
    });
    body.append(h("h2", { class: "section-label" }, "Albums"), folderRow);
  }

  view.appendChild(body);

  if (targetId) {
    const inMain = main.find((p) => p.id === targetId);
    const inDeleted = deleted.find((p) => p.id === targetId);
    if (inMain) window.setTimeout(() => rt.push(photoViewer(rt, inMain, main)), 60);
    else if (inDeleted) window.setTimeout(() => rt.push(photoViewer(rt, inDeleted, deleted)), 60);
  }
  return view;
}

function deletedFolder(rt: DeviceRuntime, photos: Photo[]): HTMLElement {
  const view = h("div", { class: "app app-photos" });
  view.appendChild(rt.appHeader("Recently Deleted"));
  const grid = h("div", { class: "photo-grid", role: "list" });
  for (const p of photos) grid.appendChild(thumb(rt, p, photos));
  view.appendChild(
    h(
      "div",
      { class: "app-scroll" },
      h("p", { class: "folder-note" }, "Items shown here were deleted from the library. Recovery source: local cache."),
      grid,
    ),
  );
  return view;
}

function thumb(rt: DeviceRuntime, p: Photo, album: Photo[]): HTMLElement {
  const cell = h("button", { class: "photo-thumb", type: "button", role: "listitem", "aria-label": p.caption ?? "Photo" });
  cell.appendChild(svgEl(p.svg, "photo-thumb-art"));
  if (p.flashlight) cell.appendChild(h("span", { class: "photo-thumb-dark", "aria-hidden": "true" }));
  cell.addEventListener("click", () => rt.push(photoViewer(rt, p, album)));
  return cell;
}

function photoViewer(rt: DeviceRuntime, start: Photo, album: Photo[]): HTMLElement {
  let index = album.indexOf(start);
  const view = h("div", { class: "app app-photo-viewer" });

  const infoBtn = h("button", { class: "hdr-action", type: "button", "aria-label": "Photo details" }, svgEl(uiGlyph("info"), "glyph"));
  const header = rt.appHeader("", { trailing: infoBtn });
  view.appendChild(header);
  const title = header.querySelector(".hdr-title") as HTMLElement;

  const stage = h("div", { class: "photo-stage" });
  const captionEl = h("div", { class: "photo-caption" });
  const metaPanel = h("div", { class: "photo-meta", hidden: true });
  view.append(stage, captionEl, metaPanel);

  let zoomed = false;
  let metaOpen = false;

  function render(): void {
    const p = album[index];
    rt.markViewed(p.id);
    title.textContent = fullStamp(p.timestamp);
    stage.replaceChildren();
    zoomed = false;

    const art = svgEl(p.svg, "photo-full");
    stage.appendChild(art);

    if (p.flashlight) {
      const hidden = svgEl(p.flashlight.hiddenSvg, "photo-hidden-layer");
      hidden.setAttribute("aria-hidden", "true");
      stage.appendChild(hidden);
      stage.classList.add("photo-flashlight");
      stage.appendChild(h("div", { class: "photo-flash-hint" }, "Too dark. Press and drag to light."));
      let hintShown = true;
      const move = (e: PointerEvent) => {
        const rect = stage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        hidden.style.setProperty("--fx", `${x}%`);
        hidden.style.setProperty("--fy", `${y}%`);
        hidden.classList.add("lit");
        if (hintShown) {
          hintShown = false;
          stage.querySelector(".photo-flash-hint")?.remove();
        }
      };
      stage.addEventListener("pointerdown", (e) => {
        move(e);
        stage.setPointerCapture(e.pointerId);
      });
      stage.addEventListener("pointermove", (e) => {
        if (e.buttons > 0) move(e);
      });
      stage.addEventListener("pointerup", () => hidden.classList.remove("lit"));
    } else {
      stage.classList.remove("photo-flashlight");
      art.addEventListener("click", () => {
        zoomed = !zoomed;
        art.classList.toggle("photo-zoomed", zoomed);
      });
    }

    captionEl.textContent = p.caption ?? "";
    captionEl.hidden = !p.caption;
    renderMeta(p);
  }

  function renderMeta(p: Photo): void {
    const rows = [
      metaRow("Taken", `${fullStamp(p.meta.takenAt)} · ${dateStamp(p.meta.takenAt)}`),
      p.meta.editedAt
        ? metaRow("Edited", `${fullStamp(p.meta.editedAt)} · ${dateStamp(p.meta.editedAt)}`, true)
        : null,
      p.meta.device ? metaRow("Device", p.meta.device) : null,
      p.meta.location ? metaRow("Location", p.meta.location) : null,
      p.deleted ? metaRow("Status", "Deleted by user", true) : null,
    ].filter((r): r is HTMLElement => r !== null);
    metaPanel.replaceChildren(...rows);
  }

  function metaRow(label: string, value: string, warn = false): HTMLElement {
    return h(
      "div",
      { class: `meta-row${warn ? " meta-warn" : ""}` },
      h("span", { class: "meta-label" }, label),
      h("span", { class: "meta-value" }, value),
    );
  }

  infoBtn.addEventListener("click", () => {
    metaOpen = !metaOpen;
    metaPanel.hidden = !metaOpen;
  });

  // horizontal swipe between photos
  let startX: number | null = null;
  stage.addEventListener("pointerdown", (e) => (startX = e.clientX));
  stage.addEventListener("pointerup", (e) => {
    if (startX !== null && !album[index].flashlight) {
      const dx = e.clientX - startX;
      if (dx < -50 && index < album.length - 1) {
        index++;
        render();
      } else if (dx > 50 && index > 0) {
        index--;
        render();
      }
    }
    startX = null;
  });

  render();
  return view;
}
