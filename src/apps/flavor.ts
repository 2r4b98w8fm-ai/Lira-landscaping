import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";
import { mulberry32, seedFrom } from "../lib/rng";
import { extrasFor } from "../cases/caseextras";
import { socialFor } from "../cases/social";
import { storiesFor, dmsFor, type StorySeg, type DMThread } from "../cases/social2";
import { svgEl } from "../lib/dom";
import { uiGlyph } from "../icons";
import { settings } from "../save";

/**
 * Flavor apps: believable, mostly non-clue screens that make the phone feel
 * real and give the player far more surface to search. A few carry light
 * persona texture; none are required to solve a case (the real clues live in
 * the core apps), but the volume is the point — finding the ~5% that matter
 * among everything else is the puzzle.
 */

function scroll(rt: DeviceRuntime, title: string): { view: HTMLElement; body: HTMLElement } {
  const view = h("div", { class: "app" });
  view.appendChild(rt.appHeader(title));
  const body = h("div", { class: "app-scroll" });
  view.appendChild(body);
  return { view, body };
}

function label(text: string): HTMLElement {
  return h("h2", { class: "section-label" }, text);
}

function row(main: string, sub: string, trailing?: string): HTMLElement {
  return h(
    "div",
    { class: "list-row list-row-static" },
    h("span", { class: "row-main" }, h("span", { class: "row-title" }, main), h("span", { class: "row-sub" }, sub)),
    trailing ? h("span", { class: "row-time" }, trailing) : h("span"),
  );
}

function rand(rt: DeviceRuntime, salt: string): () => number {
  return mulberry32(seedFrom(rt.caseFile.id + salt));
}

export function openMusic(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Music");
  const r = rand(rt, "music");
  const songs = [
    ["Hold the Line", "Static Youth"],
    ["Nightshift", "Marrow"],
    ["Blue Hour", "The Vantablacks"],
    ["Paper Walls", "Odessa Vane"],
    ["Slow Fever", "Cormorant"],
    ["Anemone", "Half Light"],
    ["Corner Store", "Dad Sneakers"],
    ["Bad at Distance", "Wet Cassette"],
    ["Little Fires", "Ohio Ghost"],
    ["Everything Was Fine", "The Understudies"],
  ];
  const now = songs[Math.floor(r() * songs.length)];
  body.appendChild(label("Now Playing"));
  body.appendChild(
    h(
      "div",
      { class: "np-card" },
      h("div", { class: "np-art" }),
      h("div", { class: "np-title" }, now[0]),
      h("div", { class: "np-artist" }, now[1]),
      h("div", { class: "np-bar" }, h("div", { class: "np-bar-fill" })),
    ),
  );
  body.appendChild(label("Recently Played"));
  for (const [t, a] of songs) body.appendChild(row(t, a, `${1 + Math.floor(r() * 4)}:${String(10 + Math.floor(r() * 49)).padStart(2, "0")}`));
  return view;
}

export function openWeather(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Weather");
  const r = rand(rt, "weather");
  const temp = 38 + Math.floor(r() * 40);
  body.appendChild(
    h(
      "div",
      { class: "wx-hero" },
      h("div", { class: "wx-city" }, "Current Location"),
      h("div", { class: "wx-temp" }, `${temp}°`),
      h("div", { class: "wx-cond" }, ["Cloudy", "Light Rain", "Overcast", "Clear", "Fog"][Math.floor(r() * 5)]),
      h("div", { class: "wx-range" }, `H:${temp + 6}°  L:${temp - 9}°`),
    ),
  );
  body.appendChild(label("Hourly"));
  const hours = h("div", { class: "wx-hours" });
  for (let i = 0; i < 8; i++) {
    hours.appendChild(
      h("div", { class: "wx-hour" }, h("span", {}, `${(9 + i) % 12 || 12}${9 + i < 12 ? "a" : "p"}`), h("span", { class: "wx-hour-t" }, `${temp - 2 + Math.floor(r() * 6)}°`)),
    );
  }
  body.appendChild(hours);
  body.appendChild(label("7-Day"));
  for (const d of ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]) {
    body.appendChild(row(d, ["Cloudy", "Rain", "Clear", "Overcast"][Math.floor(r() * 4)], `${temp - 6 + Math.floor(r() * 12)}°`));
  }
  return view;
}

export function openHealth(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Health");
  const r = rand(rt, "health");
  body.appendChild(label("Today"));
  body.appendChild(row("Steps", "Walking + Running", `${(2 + Math.floor(r() * 9)).toLocaleString()},${String(Math.floor(r() * 999)).padStart(3, "0")}`));
  body.appendChild(row("Sleep", "Last night", `${4 + Math.floor(r() * 4)}h ${Math.floor(r() * 59)}m`));
  body.appendChild(row("Heart Rate", "Resting", `${58 + Math.floor(r() * 24)} BPM`));
  body.appendChild(row("Flights Climbed", "Today", `${Math.floor(r() * 20)}`));
  body.appendChild(label("Trends"));
  body.appendChild(
    h("p", { class: "folder-note" }, "Sleep has been down and heart rate up over the last three weeks. Consider talking to someone."),
  );
  return view;
}

export function openPodcasts(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Podcasts");
  body.appendChild(label("Up Next"));
  const eps = [
    ["Unsolved & Unbothered", "Ep. 214 — The Locked Room", "48 min"],
    ["Two Detectives, One Cup", "The one about the neighbor", "1h 02m"],
    ["Sleep With Me (ironically)", "A boring story about a fence", "56 min"],
    ["The Quiet Hour", "Field recordings, vol. 9", "31 min"],
    ["Small Town, Big Nothing", "Where did everybody go?", "44 min"],
    ["Casefile Coffee Break", "Cold cases, hot takes", "39 min"],
  ];
  for (const [show, ep, len] of eps) body.appendChild(row(show, ep, len));
  return view;
}

export function openMail(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Mail");
  body.appendChild(label("Inbox"));
  const mails = [
    ["Package Delivered", "shipping@parcelpoint", "Your order has arrived"],
    ["Your receipt", "no-reply@marketco", "Thanks for shopping"],
    ["Rent reminder", "portal@property", "Due on the 1st"],
    ["Weekly digest", "team@newsletter", "5 stories you missed"],
    ["Appointment confirmed", "booking@clinic", "See you Thursday"],
    ["Your statement is ready", "alerts@bank", "View online"],
    ["We miss you!", "hello@app", "Come back for 20% off"],
    ["Security alert", "no-reply@account", "New sign-in to your account"],
  ];
  for (const [subj, from, prev] of mails) {
    body.appendChild(
      h(
        "div",
        { class: "list-row list-row-static" },
        h(
          "span",
          { class: "row-main" },
          h("span", { class: "row-title" }, subj),
          h("span", { class: "row-sub" }, from),
          h("span", { class: "row-sub" }, prev),
        ),
      ),
    );
  }
  return view;
}

export function openSocial(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Feed");
  const r = rand(rt, "social");
  body.appendChild(label("For You"));
  const posts = [
    "sunrise from the good side of town 🌅",
    "who else can't sleep",
    "day 4 of the plant surviving. we take those.",
    "if you see me at the 24hr diner no you didn't",
    "the audacity of monday",
    "found a cat. the cat found me. it's complicated.",
    "unfollowing everyone who's a morning person",
    "local man (me) touches grass, shocks community",
    "brb moving to the woods",
    "reminder that you're doing better than you think",
  ];
  for (const p of posts) {
    body.appendChild(
      h(
        "div",
        { class: "feed-post" },
        h("div", { class: "feed-head" }, h("span", { class: "feed-avatar" }), h("span", { class: "feed-user" }, `@${["nite_owl", "beans", "corvid", "moss", "ok_sure", "little.fires"][Math.floor(r() * 6)]}`)),
        h("div", { class: "feed-body" }, p),
        h("div", { class: "feed-meta" }, `${Math.floor(r() * 900)} likes · ${Math.floor(r() * 48)}h`),
      ),
    );
  }
  return view;
}

export function openReminders(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Reminders");
  body.appendChild(label("Reminders"));
  const items = extrasFor(rt.caseFile.id)?.reminders ?? ([
    ["Call mom back", true],
    ["Buy trash bags + AAA batteries", false],
    ["Return library book (overdue)", false],
    ["Water the plants", true],
    ["Look up that thing", false],
    ["Text back — everyone", false],
    ["Deposit check", true],
    ["Stop checking the locks", false],
  ] as Array<[string, boolean]>);
  for (const [text, done] of items) {
    body.appendChild(
      h(
        "div",
        { class: "list-row list-row-static" },
        h("span", { class: `rem-check${done ? " rem-check-done" : ""}` }),
        h("span", { class: "row-main" }, h("span", { class: `row-title${done ? " rem-done" : ""}` }, text)),
      ),
    );
  }
  return view;
}

export function openWallet(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Wallet");
  body.appendChild(label("Cards"));
  body.appendChild(h("div", { class: "wallet-card" }, h("span", { class: "wallet-bank" }, "HARBOR DEBIT"), h("span", { class: "wallet-num" }, "•••• •••• •••• 4471")));
  body.appendChild(label("Recent Transactions"));
  const tx = [
    ["Corner Coffee", "-$4.75"],
    ["Marrow St Deli", "-$12.40"],
    ["Gas — Shell", "-$38.60"],
    ["ParcelPoint", "-$6.20"],
    ["Direct Deposit", "+$820.00"],
    ["Pharmacy", "-$18.00"],
    ["Streaming", "-$15.99"],
    ["ATM Withdrawal", "-$60.00"],
  ];
  for (const [name, amt] of tx) {
    const row2 = row(name, "Yesterday", "");
    const t = h("span", { class: `wallet-amt${amt.startsWith("+") ? " wallet-in" : ""}` }, amt);
    row2.replaceChild(t, row2.lastElementChild!);
    body.appendChild(row2);
  }
  return view;
}

export function openAppStore(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "App Store");
  body.appendChild(label("Updates"));
  for (const [name, note] of [
    ["Messages", "Bug fixes and improvements."],
    ["Weather", "New radar layers."],
    ["Notes", "Faster search."],
    ["Music", "Performance improvements."],
    ["Maps", "Updated map data."],
  ] as Array<[string, string]>) {
    body.appendChild(row(name, note, "UPDATE"));
  }
  return view;
}

export function openNews(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "News");
  body.appendChild(label("Top Stories"));
  const heads = [
    ["Local council approves overnight parking changes", "City Desk"],
    ["Cold snap expected through the weekend", "Weather"],
    ["The loneliness epidemic nobody's talking about", "Features"],
    ["Rideshare drivers say the apps aren't protecting them", "Labor"],
    ["Historic building on the register faces demolition", "City Desk"],
    ["Why we can't stop watching true crime", "Culture"],
    ["Missing persons cases quietly rise in the county", "Investigations"],
  ];
  for (const [t, sec] of heads) body.appendChild(row(t, sec, ""));
  return view;
}

export function openShopping(rt: DeviceRuntime): HTMLElement {
  const { view, body } = scroll(rt, "Orders");
  const orders = extrasFor(rt.caseFile.id)?.shopping ?? [];
  body.appendChild(label("Your Orders"));
  if (!orders.length) {
    body.appendChild(h("p", { class: "folder-note" }, "No recent orders."));
    return view;
  }
  for (const o of orders) {
    const refunded = o.price.startsWith("+");
    body.appendChild(
      h(
        "div",
        { class: "shop-order" },
        h(
          "div",
          { class: "shop-thumb", "aria-hidden": "true" },
          h("span", { class: "shop-thumb-glyph" }, "▢"),
        ),
        h(
          "div",
          { class: "row-main" },
          h("span", { class: "row-title" }, o.item),
          o.detail ? h("span", { class: "row-sub" }, o.detail) : null,
          h("span", { class: `shop-status${o.status && /cancel/i.test(o.status) ? " shop-status-warn" : ""}` }, `${o.date}${o.status ? " · " + o.status : ""}`),
        ),
        h("span", { class: `shop-price${refunded ? " shop-price-in" : ""}` }, o.price),
      ),
    );
  }
  return view;
}

export function openGlimpse(rt: DeviceRuntime): HTMLElement {
  const g = socialFor(rt.caseFile.id)?.glimpse;
  const dms = dmsFor(rt.caseFile.id);
  const view = h("div", { class: "app" });
  // header with a DM (paper-plane) action
  const dmBtn = h("button", { class: "hdr-action", type: "button", "aria-label": "Direct messages" }, svgEl(uiGlyph("send"), "glyph"));
  const unread = (dms ?? []).filter((t) => t.unread).length;
  if (unread > 0) dmBtn.appendChild(h("span", { class: "hdr-badge" }, String(unread)));
  dmBtn.addEventListener("click", () => rt.push(openDMs(rt)));
  view.appendChild(rt.appHeader("Glimpse", { trailing: dms ? dmBtn : undefined }));
  const body = h("div", { class: "app-scroll" });
  view.appendChild(body);
  if (!g) {
    body.appendChild(h("p", { class: "folder-note" }, "No account."));
    return view;
  }

  // stories row
  const stories = storiesFor(rt.caseFile.id);
  if (stories?.length) {
    const row = h("div", { class: "gl-stories" });
    const own = h(
      "button",
      { class: "gl-story", type: "button" },
      h("span", { class: "gl-story-ring gl-story-live" }, h("span", { class: "gl-story-face" }, "📷")),
      h("span", { class: "gl-story-name" }, g.handle.split(/[._]/)[0]),
    );
    own.addEventListener("click", () => rt.push(storyViewer(rt, g.handle, stories)));
    row.appendChild(own);
    // a few friends' rings for texture (open a short generic reel)
    for (const [face, name] of FRIEND_RINGS) {
      const s = h(
        "button",
        { class: "gl-story", type: "button" },
        h("span", { class: "gl-story-ring" }, h("span", { class: "gl-story-face" }, face)),
        h("span", { class: "gl-story-name" }, name),
      );
      s.addEventListener("click", () =>
        rt.push(storyViewer(rt, name, [{ scene: face, text: "hope you're doing ok. call me back? 🩶", when: "1d" }])),
      );
      row.appendChild(s);
    }
    body.appendChild(row);
  }

  // profile header
  body.appendChild(
    h(
      "div",
      { class: "gl-profile" },
      h("div", { class: "gl-avatar", "aria-hidden": "true" }),
      h(
        "div",
        { class: "gl-profile-main" },
        h("div", { class: "gl-handle" }, `@${g.handle}`),
        h(
          "div",
          { class: "gl-stats" },
          h("span", {}, h("b", {}, String(g.posts)), " posts"),
          h("span", {}, h("b", {}, g.followers), " followers"),
          h("span", {}, h("b", {}, g.following), " following"),
        ),
      ),
    ),
  );
  body.appendChild(h("div", { class: "gl-name" }, g.name));
  body.appendChild(h("div", { class: "gl-bio" }, g.bio));

  // grid of tinted tiles
  const grid = h("div", { class: "gl-grid" });
  g.grid.forEach((post, i) => {
    const tile = h(
      "button",
      { class: "gl-tile", type: "button", style: `--gl-hue:${(seedFrom(rt.caseFile.id + i) % 360)}` },
      h("span", { class: "gl-scene", "aria-hidden": "true" }, post.scene),
    );
    tile.addEventListener("click", () => rt.push(glimpsePost(rt, g, post)));
    grid.appendChild(tile);
  });
  body.appendChild(grid);
  return view;
}

function glimpsePost(rt: DeviceRuntime, g: GlimpseProfileLike, post: import("../cases/social").GlimpsePost): HTMLElement {
  const view = h("div", { class: "app" });
  view.appendChild(rt.appHeader("Glimpse"));
  const body = h("div", { class: "app-scroll" });
  view.appendChild(body);
  body.appendChild(
    h("div", { class: "gl-post-head" }, h("span", { class: "gl-avatar gl-avatar-sm", "aria-hidden": "true" }), h("span", { class: "gl-handle" }, `@${g.handle}`)),
  );
  body.appendChild(h("div", { class: "gl-post-photo", style: `--gl-hue:${seedFrom(post.caption) % 360}` }, h("span", { class: "gl-scene-lg", "aria-hidden": "true" }, post.scene)));
  body.appendChild(h("div", { class: "gl-post-likes" }, `${post.likes.toLocaleString()} likes · ${post.when} ago`));
  if (post.location) body.appendChild(h("div", { class: "gl-post-loc" }, `📍 ${post.location}`));
  body.appendChild(h("p", { class: "gl-post-caption" }, h("b", {}, `${g.handle} `), post.caption));
  if (post.comments?.length) {
    const c = h("div", { class: "gl-comments" });
    for (const [who, text] of post.comments) {
      c.appendChild(h("p", { class: "gl-comment" }, h("b", {}, `${who} `), text));
    }
    body.appendChild(c);
  }
  return view;
}

interface GlimpseProfileLike {
  handle: string;
}

const FRIEND_RINGS: Array<[string, string]> = [
  ["🌻", "mom"],
  ["🎧", "dev"],
  ["🍜", "friends"],
  ["🐈", "the cat"],
];

/** Full-screen story reel: auto-advancing segments with a progress bar per segment. */
function storyViewer(rt: DeviceRuntime, who: string, segs: StorySeg[]): HTMLElement {
  const view = h("div", { class: "app story-viewer" });
  const bars = h("div", { class: "story-bars" });
  const segBars = segs.map(() => {
    const track = h("div", { class: "story-bar" });
    const fill = h("div", { class: "story-bar-fill" });
    track.appendChild(fill);
    bars.appendChild(track);
    return fill;
  });
  const closeBtn = h("button", { class: "story-close", type: "button", "aria-label": "Close" }, "✕");
  const head = h(
    "div",
    { class: "story-head" },
    bars,
    h("div", { class: "story-head-row" }, h("span", { class: "story-who" }, `@${who}`), closeBtn),
  );
  const stage = h("div", { class: "story-stage" });
  const tapL = h("button", { class: "story-tap story-tap-l", type: "button", "aria-label": "Previous" });
  const tapR = h("button", { class: "story-tap story-tap-r", type: "button", "aria-label": "Next" });
  view.append(head, stage, tapL, tapR);

  let index = 0;
  let timer = 0;
  const DURATION = 4200;

  function stopTimer(): void {
    if (timer) window.clearTimeout(timer);
    timer = 0;
  }
  function close(): void {
    stopTimer();
    rt.pop();
  }
  function render(): void {
    stopTimer();
    const s = segs[index];
    segBars.forEach((f, i) => {
      f.style.transition = "none";
      f.style.width = i < index ? "100%" : "0%";
    });
    stage.replaceChildren(
      h("div", { class: "story-scene", style: `--gl-hue:${seedFrom(s.text) % 360}` }, h("span", { class: "story-emoji" }, s.scene)),
      h("p", { class: "story-text" }, s.text),
      h("span", { class: "story-when" }, `${s.when} ago`),
    );
    // animate the current bar unless reduced motion
    const cur = segBars[index];
    if (settings().reducedIntensity) {
      cur.style.width = "100%";
    } else {
      requestAnimationFrame(() => {
        cur.style.transition = `width ${DURATION}ms linear`;
        cur.style.width = "100%";
      });
    }
    timer = window.setTimeout(next, DURATION);
  }
  function next(): void {
    if (index < segs.length - 1) {
      index++;
      render();
    } else {
      close();
    }
  }
  function prev(): void {
    if (index > 0) {
      index--;
      render();
    } else {
      render();
    }
  }
  closeBtn.addEventListener("click", close);
  tapR.addEventListener("click", next);
  tapL.addEventListener("click", prev);
  view.addEventListener("view-removed", stopTimer);
  render();
  return view;
}

/** DM inbox: private threads. Where people say what they'd never post. */
function openDMs(rt: DeviceRuntime): HTMLElement {
  const threads = dmsFor(rt.caseFile.id) ?? [];
  const view = h("div", { class: "app" });
  view.appendChild(rt.appHeader("Messages"));
  const body = h("div", { class: "app-scroll" });
  view.appendChild(body);
  if (!threads.length) {
    body.appendChild(h("p", { class: "folder-note" }, "No messages."));
    return view;
  }
  for (const t of threads) {
    const rowEl = h(
      "button",
      { class: "dm-row", type: "button" },
      h("span", { class: "dm-avatar", "aria-hidden": "true" }),
      h(
        "span",
        { class: "row-main" },
        h("span", { class: "dm-name" }, t.name, t.unread ? h("span", { class: "dm-dot", "aria-label": "unread" }) : null),
        h("span", { class: "row-sub" }, t.lines[t.lines.length - 1]?.text ?? ""),
      ),
      h("span", { class: "row-time" }, t.when),
    );
    rowEl.addEventListener("click", () => rt.push(dmThread(rt, t)));
    body.appendChild(rowEl);
  }
  return view;
}

function dmThread(rt: DeviceRuntime, t: DMThread): HTMLElement {
  const view = h("div", { class: "app" });
  view.appendChild(rt.appHeader(t.name));
  const body = h("div", { class: "app-scroll dm-thread" });
  view.appendChild(body);
  body.appendChild(h("div", { class: "dm-handle-head" }, `@${t.handle}`));
  for (const line of t.lines) {
    body.appendChild(h("div", { class: `dm-bubble dm-${line.from}` }, line.text));
  }
  body.appendChild(h("div", { class: "dm-end" }, "•"));
  return view;
}

export function openChatter(rt: DeviceRuntime): HTMLElement {
  const c = socialFor(rt.caseFile.id)?.chatter;
  const { view, body } = scroll(rt, "Chatter");
  if (!c) {
    body.appendChild(h("p", { class: "folder-note" }, "No account."));
    return view;
  }
  body.appendChild(
    h(
      "div",
      { class: "ch-profile" },
      h("div", { class: "ch-avatar", "aria-hidden": "true" }),
      h("div", { class: "ch-name" }, c.name),
      h("div", { class: "ch-handle" }, `@${c.handle}`),
      h("div", { class: "ch-bio" }, c.bio),
      h("div", { class: "ch-follow" }, h("span", {}, h("b", {}, c.following), " Following"), h("span", {}, h("b", {}, c.followers), " Followers")),
    ),
  );
  body.appendChild(label("Posts"));
  for (const p of c.posts) {
    const post = h(
      "div",
      { class: "ch-post" },
      h(
        "div",
        { class: "ch-post-head" },
        h("span", { class: "ch-avatar ch-avatar-sm", "aria-hidden": "true" }),
        h("span", { class: "ch-post-name" }, c.name),
        h("span", { class: "ch-post-handle" }, `@${c.handle} · ${p.when}`),
      ),
      h("p", { class: "ch-post-text" }, p.text),
      h(
        "div",
        { class: "ch-post-meta" },
        h("span", {}, `💬 ${p.replies?.length ?? 0}`),
        h("span", {}, `🔁 ${p.reposts ?? 0}`),
        h("span", {}, `♡ ${p.likes.toLocaleString()}`),
      ),
    );
    if (p.replies?.length) {
      const rep = h("div", { class: "ch-replies" });
      for (const [who, text] of p.replies) {
        rep.appendChild(
          h("div", { class: "ch-reply" }, h("span", { class: "ch-reply-who" }, `@${who}`), h("span", { class: "ch-reply-text" }, text)),
        );
      }
      post.appendChild(rep);
    }
    body.appendChild(post);
  }
  return view;
}

export function openDating(rt: DeviceRuntime): HTMLElement {
  const d = extrasFor(rt.caseFile.id)?.dating;
  const { view, body } = scroll(rt, d?.app ?? "Matches");
  if (!d) {
    body.appendChild(h("p", { class: "folder-note" }, "No account."));
    return view;
  }
  // own profile
  body.appendChild(
    h(
      "div",
      { class: "dt-profile" },
      h("div", { class: "dt-avatar" }),
      h("div", { class: "dt-me-name" }, `${d.handle}, ${d.age}`),
      h("div", { class: "dt-bio" }, d.bio),
      h("div", { class: "dt-active" }, d.lastActive),
    ),
  );
  body.appendChild(label("Matches"));
  for (const m of d.matches) {
    const card = h("div", { class: "dt-match" });
    card.appendChild(
      h(
        "div",
        { class: "dt-match-head" },
        h("span", { class: "dt-match-avatar" }),
        h(
          "span",
          { class: "row-main" },
          h("span", { class: "row-title" }, `${m.name}, ${m.age}`),
          m.tag ? h("span", { class: "row-sub" }, m.tag) : null,
        ),
      ),
    );
    if (m.thread) {
      const thread = h("div", { class: "dt-thread" });
      for (const msg of m.thread) {
        thread.appendChild(h("div", { class: `dt-bubble dt-${msg.from}` }, msg.text));
      }
      card.appendChild(thread);
    }
    body.appendChild(card);
  }
  return view;
}
