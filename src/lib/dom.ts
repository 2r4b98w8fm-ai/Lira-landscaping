/** Tiny DOM construction helper — the whole UI is built with this. */

type Child = Node | string | null | undefined | false;

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | boolean | ((ev: Event) => void)> = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === false || value == null) continue;
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2), value as EventListener);
    } else if (key === "class") {
      el.className = value as string;
    } else if (value === true) {
      el.setAttribute(key, "");
    } else {
      el.setAttribute(key, value as string);
    }
  }
  append(el, ...children);
  return el;
}

export function append(el: Element, ...children: Child[]): void {
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.append(child);
  }
}

/** Render trusted inline SVG markup (all SVG in this app is authored, not user input). */
export function svgEl(markup: string, className?: string): HTMLElement {
  const wrap = document.createElement("div");
  if (className) wrap.className = className;
  wrap.innerHTML = markup;
  return wrap;
}

export function clear(el: Element): void {
  while (el.firstChild) el.removeChild(el.firstChild);
}
