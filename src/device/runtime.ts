import type { CaseFile, CaseProgress, IconName } from "../types";
import { caseProgress, persist } from "../save";
import { h, clear, svgEl } from "../lib/dom";
import { clockTime } from "../lib/time";
import { mountGlitchLayer, triggerGlitch } from "../glitch";
import { playStinger } from "../audio";
import { appIconSvg, uiGlyph } from "../icons";

export interface AppDef {
  id: string;
  label: string;
  icon: IconName;
  open(rt: DeviceRuntime, targetId?: string): HTMLElement;
  badge?(rt: DeviceRuntime): number;
}

export interface DeviceEvents {
  tick: number;
  homeChanged: void;
  liveMessage: string; // thread id
}

type Listener<K extends keyof DeviceEvents> = (payload: DeviceEvents[K]) => void;

const BATTERY_DRAIN_SECONDS_PER_PERCENT = 75;

export class DeviceRuntime {
  readonly caseFile: CaseFile;
  readonly progress: CaseProgress;
  private registry: Map<string, AppDef>;
  private stack: HTMLElement[] = [];
  private screenEl: HTMLElement;
  private statusClock: HTMLElement;
  private statusBattery: HTMLElement;
  private bannerHost: HTMLElement;
  private tickTimer = 0;
  private listeners: { [K in keyof DeviceEvents]: Set<Listener<K>> } = {
    tick: new Set(),
    homeChanged: new Set(),
    liveMessage: new Set(),
  };
  private onExit: () => void;

  constructor(opts: {
    caseFile: CaseFile;
    apps: AppDef[];
    host: HTMLElement;
    onExit: () => void;
  }) {
    this.caseFile = opts.caseFile;
    this.progress = caseProgress(opts.caseFile.id);
    this.registry = new Map(opts.apps.map((a) => [a.id, a]));
    this.onExit = opts.onExit;

    clear(opts.host);
    const frame = h("div", { class: "device-frame" });
    this.screenEl = h("div", { class: "device-screen" });
    this.statusClock = h("span", { class: "status-clock" });
    this.statusBattery = h("span", { class: "status-battery" });
    const statusBar = h(
      "div",
      { class: "status-bar", "aria-hidden": "true" },
      this.statusClock,
      h("span", { class: "status-carrier" }, "NO SERVICE"),
      this.statusBattery,
    );
    this.bannerHost = h("div", { class: "banner-host" });
    frame.append(this.screenEl, statusBar, this.bannerHost);
    opts.host.appendChild(frame);
    mountGlitchLayer(frame);

    this.renderStatus();
    this.tickTimer = window.setInterval(() => this.tick(), 1000);
  }

  destroy(): void {
    window.clearInterval(this.tickTimer);
    persist();
  }

  app(id: string): AppDef | undefined {
    return this.registry.get(id);
  }

  allApps(): AppDef[] {
    return [...this.registry.values()];
  }

  // -- events ---------------------------------------------------------------

  on<K extends keyof DeviceEvents>(event: K, fn: Listener<K>): () => void {
    this.listeners[event].add(fn);
    return () => this.listeners[event].delete(fn);
  }

  private emit<K extends keyof DeviceEvents>(event: K, payload: DeviceEvents[K]): void {
    for (const fn of this.listeners[event]) fn(payload);
  }

  // -- fiction clock & battery ----------------------------------------------

  now(): Date {
    return new Date(Date.parse(this.caseFile.phone.recoveredAt) + this.progress.playSeconds * 1000);
  }

  battery(): number {
    const drained = Math.floor(this.progress.playSeconds / BATTERY_DRAIN_SECONDS_PER_PERCENT);
    return Math.max(4, this.caseFile.phone.batteryStart - drained);
  }

  private renderStatus(): void {
    this.statusClock.textContent = clockTime(this.now());
    const b = this.battery();
    this.statusBattery.textContent = `${b}%`;
    this.statusBattery.classList.toggle("status-battery-low", b <= 15);
  }

  private tick(): void {
    this.progress.playSeconds += 1;
    if (this.progress.playSeconds % 5 === 0) persist();
    this.renderStatus();

    if (!this.progress.lowBatteryWarned && this.battery() <= 10) {
      this.progress.lowBatteryWarned = true;
      persist();
      this.notify({ icon: "settings", title: "Battery Low", body: "10% of battery remaining." });
    }

    this.deliverLiveEvents();
    this.emit("tick", this.progress.playSeconds);
  }

  // -- live drip-feed ---------------------------------------------------------

  private deliverLiveEvents(): void {
    for (const ev of this.caseFile.liveEvents) {
      if (this.progress.deliveredLiveEvents.includes(ev.id)) continue;
      if (ev.afterSeconds > this.progress.playSeconds) continue;
      this.progress.deliveredLiveEvents.push(ev.id);
      persist();
      if (ev.kind === "message") {
        const thread = this.caseFile.messages.find((t) => t.id === ev.threadId);
        if (thread) {
          this.emit("liveMessage", thread.id);
          triggerGlitch(300);
          playStinger();
          this.notify({
            icon: "messages",
            title: thread.contactName,
            body: ev.message.text,
            onTap: () => this.openApp("messages", thread.id),
          });
        }
      } else {
        if (ev.glitch) {
          triggerGlitch(500);
          playStinger();
        }
        this.notify({ icon: "settings", title: ev.title, body: ev.body });
      }
    }
  }

  /** Messages delivered by live events, merged into thread rendering. */
  deliveredMessages(threadId: string): import("../types").Message[] {
    const out: import("../types").Message[] = [];
    for (const ev of this.caseFile.liveEvents) {
      if (
        ev.kind === "message" &&
        ev.threadId === threadId &&
        this.progress.deliveredLiveEvents.includes(ev.id)
      ) {
        out.push(ev.message);
      }
    }
    return out;
  }

  // -- discovery & hidden app -------------------------------------------------

  markViewed(id: string): void {
    if (this.progress.viewed.includes(id)) return;
    this.progress.viewed.push(id);
    persist();
    this.checkHiddenReveal();
  }

  hasViewed(id: string): boolean {
    return this.progress.viewed.includes(id);
  }

  private checkHiddenReveal(): void {
    if (this.progress.hiddenAppRevealed) return;
    const ready = this.caseFile.hiddenApp.revealAfterClueIds.every((id) =>
      this.progress.viewed.includes(id),
    );
    if (!ready) return;
    this.progress.hiddenAppRevealed = true;
    persist();
    triggerGlitch(600);
    playStinger();
    this.emit("homeChanged", undefined);
    window.setTimeout(() => {
      this.notify({
        icon: this.caseFile.hiddenApp.disguiseIcon,
        title: "App restored",
        body: `“${this.caseFile.hiddenApp.disguiseLabel}” was restored from a backup you didn't make.`,
      });
    }, 900);
  }

  // -- navigation ---------------------------------------------------------------

  push(view: HTMLElement, opts: { transition?: "slide" | "rise" | "none" } = {}): void {
    const t = opts.transition ?? "slide";
    view.classList.add("device-view");
    if (t !== "none") view.classList.add(t === "slide" ? "view-enter-slide" : "view-enter-rise");
    this.screenEl.appendChild(view);
    this.stack.push(view);
    requestAnimationFrame(() => {
      view.classList.remove("view-enter-slide", "view-enter-rise");
    });
  }

  pop(): void {
    if (this.stack.length <= 1) return;
    const view = this.stack.pop()!;
    view.dispatchEvent(new CustomEvent("view-removed"));
    view.classList.add("view-exit");
    window.setTimeout(() => view.remove(), 260);
  }

  popToHome(): void {
    while (this.stack.length > 1) this.pop();
  }

  depth(): number {
    return this.stack.length;
  }

  openApp(appId: string, targetId?: string): void {
    const def = this.registry.get(appId);
    if (!def) return;
    this.push(def.open(this, targetId));
  }

  exitCase(): void {
    persist();
    this.destroy();
    this.onExit();
  }

  // -- notifications ---------------------------------------------------------------

  notify(opts: { icon: IconName; title: string; body: string; onTap?: () => void }): void {
    const banner = h(
      "button",
      { class: "banner", type: "button" },
      svgEl(appIconSvg(opts.icon), "banner-icon"),
      h(
        "span",
        { class: "banner-text" },
        h("span", { class: "banner-title" }, opts.title),
        h("span", { class: "banner-body" }, opts.body),
      ),
    );
    banner.addEventListener("click", () => {
      dismiss();
      opts.onTap?.();
    });
    this.bannerHost.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add("banner-in"));
    const timer = window.setTimeout(dismiss, 6500);
    function dismiss() {
      window.clearTimeout(timer);
      banner.classList.remove("banner-in");
      window.setTimeout(() => banner.remove(), 350);
    }
  }

  /** Standard app chrome: header with back button. */
  appHeader(title: string, opts: { onBack?: () => void; trailing?: HTMLElement } = {}): HTMLElement {
    const back = h(
      "button",
      { class: "hdr-back", type: "button", "aria-label": "Back" },
      svgEl(uiGlyph("back"), "glyph"),
    );
    back.addEventListener("click", () => (opts.onBack ? opts.onBack() : this.pop()));
    const header = h(
      "header",
      { class: "app-hdr" },
      back,
      h("h1", { class: "hdr-title" }, title),
      opts.trailing ?? h("span", { class: "hdr-spacer" }),
    );
    return header;
  }
}
