import type { DeviceRuntime } from "../device/runtime";
import { h } from "../lib/dom";
import { mulberry32, seedFrom } from "../lib/rng";
import { extrasFor } from "../cases/caseextras";

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
