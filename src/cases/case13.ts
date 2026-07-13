import type { CaseFile } from "../types";
import { photoSvg, doorway, figure, timestampBurn } from "../photoart";

/**
 * CASE 13 — THE LANDLORD'S OTHER BUILDING
 * Milo Grieves, 41. Maintenance superintendent for five buildings on
 * Harker Row — and, under the handle KEYHOLDER, a man quietly renting
 * out access to the utility tunnels beneath them. His buyer paid on
 * time, every time, and asked for deeper doors, every time. The final
 * payment cleared at 11:03 PM. He never answered anything again.
 */

const c13: CaseFile = {
  id: "case-13",
  title: "The Landlord's Other Building",
  victimName: "Milo Grieves, 41",
  summary:
    "A building super with keys to everything started selling tunnel access to an anonymous buyer who paid in exact, odd amounts and never asked twice. Six sales, six doors, always deeper. The seventh listing was the master key. The payment cleared. The seller went down to deliver it in person, and the tunnels kept them both.",
  intake:
    "SUBJECT: Grieves, Milo A. (41). Maintenance superintendent, Harker Row Management (buildings 12–20 Harker Row). Reported missing by his employer Jan 5 after tenants' work orders went unanswered for six days.\n\nDEVICE: Recovered Jan 4 from the sublevel workshop of 16 Harker Row, on the workbench, beside a labeled key board. Every hook on the board is full except one. The empty hook is labeled, in the subject's hand: 'M.'\n\nFINANCIAL: Subject's account received six deposits since October from a licensed escrow service, amounts between $700 and $2,900, all odd figures, referencing 'storage consultation.' A seventh deposit — $3,317 — cleared Dec 30, 23:03. Subject's phone shows no activity after 23:41 that night.\n\nPROPERTY: The Harker Row sublevels interconnect — steam-era utility tunnels, officially sealed in 1971. Management states the tunnels are 'inaccessible.' Management's own storage invoices reference them 38 times since 2019.\n\nSecond-pass review requested. The responding officer notes, without elaboration, that the sublevel of 16 Harker Row 'has more doors than it has rooms.'",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "GRIEVES — supers' cell, leaks & lockouts",
    recoveredAt: "2026-01-06T21:00:00",
    batteryStart: 27,
    wallpaperHue: 40,
    lockScreenNotifications: [
      { appId: "messages", title: "Marisa", preview: "ok. one coffee. saturday. don't make me regret this, dad", targetId: "c13-th-marisa" },
      { appId: "messages", title: "Cistern (escrow relay)", preview: "the last door opens from your side, keyholder. it always did.", targetId: "c13-th-cistern" },
      { appId: "phone", title: "Voicemail", preview: "16 Harker Row — service line · 1:02", targetId: "c13-vm-pipe" },
    ],
  },

  messages: [
    {
      id: "c13-th-cistern",
      contactName: "Cistern (escrow relay)",
      messages: [
        { id: "c13-m-ci-1", from: "them", text: "[relay] KEYHOLDER: your listing for utility access, 12 Harker sublevel. is the access exclusive? I don't share tunnels.", timestamp: "2025-10-08T23:00:00", evidenceLabel: "The buyer's first message: “I don't share tunnels.”" },
        { id: "c13-m-ci-2", from: "owner", text: "[relay] exclusive after hours, 11pm-5am. storage access only. no living down there, no cooking, nothing that smells or burns. $700/mo.", timestamp: "2025-10-08T23:20:00" },
        { id: "c13-m-ci-3", from: "them", text: "[relay] acceptable. I store quiet things. payment sent — $731. odd numbers settle faster, you'll find.", timestamp: "2025-10-08T23:24:00", evidenceLabel: "“I store quiet things. odd numbers settle faster, you'll find.”" },
        { id: "c13-m-ci-4", from: "them", text: "[relay] the 12 Harker level is shallower than your listing implied. I've paid for depth before and been disappointed. the door at the north end, behind the meters — what's your price for that one?", timestamp: "2025-10-29T23:30:00", evidenceLabel: "“I've paid for depth before and been disappointed.”" },
        { id: "c13-m-ci-5", from: "owner", text: "[relay] that's the crossover to 14. it's on the same keyway. $1,100 and you didn't get it from me.", timestamp: "2025-10-29T23:45:00" },
        { id: "c13-m-ci-6", from: "them", text: "[relay] I never get anything from anyone. that's the beauty of escrow. sent — $1,153.", timestamp: "2025-10-29T23:47:00" },
        { id: "c13-m-ci-7", from: "owner", text: "[relay] question. the mortar dust by the crossover — you doing masonry down there? the terms said storage.", timestamp: "2025-11-20T22:15:00", evidenceLabel: "Nov 20: Milo noticed fresh masonry in the tunnels" },
        { id: "c13-m-ci-8", from: "them", text: "[relay] I patch what I open and I open what I've paid for. your predecessors never asked about the mortar, keyholder. they lasted longer that way. joking. sold me access, I mean. before you. it's a long row and I've been renting under it a long time.", timestamp: "2025-11-20T22:20:00", evidenceLabel: "“your predecessors never asked about the mortar. they lasted longer that way. joking.”" },
        { id: "c13-m-ci-9", from: "owner", text: "[relay] last sale. after this we're done and the listing comes down. the deep gate under 18. then that's every door I'm willing to sell.", timestamp: "2025-12-14T23:00:00" },
        { id: "c13-m-ci-10", from: "them", text: "[relay] every door you're WILLING to sell. willing is a price problem, not a door problem. sent — $2,909. and keyholder: start thinking about the master. everything ends at the master. it's the only listing you were ever really posting.", timestamp: "2025-12-14T23:06:00", evidenceLabel: "“everything ends at the master. it's the only listing you were ever really posting.”" },
        { id: "c13-m-ci-11", from: "owner", text: "[relay] the master isn't for sale. it doesn't leave my ring. final answer.", timestamp: "2025-12-28T22:40:00", evidenceLabel: "Dec 28: “the master isn't for sale. final answer.”" },
        { id: "c13-m-ci-12", from: "them", text: "[relay] $3,317. not for the key, keyholder. for the DELIVERY. bring it down yourself, the junction under 16, and show me it turning in the last door. then keep it forever. I don't want your key. I want its last turn.", timestamp: "2025-12-30T22:55:00", evidenceLabel: "The final offer: $3,317 “not for the key — for its last turn”" },
        { id: "c13-m-ci-13", from: "them", text: "the last door opens from your side, keyholder. it always did.", timestamp: "2025-12-30T23:39:00", evidenceLabel: "11:39 PM, outside the relay format, no escrow tag: “the last door opens from your side.”" },
      ],
    },
    {
      id: "c13-th-marisa",
      contactName: "Marisa",
      contactNumber: "(216) 555-0171",
      messages: [
        { id: "c13-m-ma-1", from: "owner", text: "happy birthday marisa. 19. your mother would have baked the lopsided cake. I know you won't answer. that's all right. happy birthday", timestamp: "2025-09-30T09:00:00", evidenceLabel: "September: his unanswered birthday text to his daughter" },
        { id: "c13-m-ma-2", from: "owner", text: "I know christmas is a no. understood. I put something in your college account anyway. it's not a bribe. it's just the only sentence I know how to say in a language you'll read", timestamp: "2025-12-24T18:00:00", evidenceLabel: "Christmas Eve: “it's not a bribe. it's the only sentence I know how to say.”" },
        { id: "c13-m-ma-3", from: "them", text: "the deposit was $4,000, dad. you fix radiators. where is this coming from", timestamp: "2025-12-26T14:00:00", evidenceLabel: "Marisa's first reply in a year: “where is this coming from”" },
        { id: "c13-m-ma-4", from: "owner", text: "side work. consulting on storage. it's boring and it's almost over. marisa — I'm about to be done with something. after thursday I'm done with it for good. then I'd like to call. I'd LIKE to call. no pressure. one coffee's worth of a call", timestamp: "2025-12-26T14:30:00", evidenceLabel: "“after thursday I'm done with it for good. then I'd like to call.”" },
        { id: "c13-m-ma-5", from: "them", text: "ok. one coffee. saturday. don't make me regret this, dad", timestamp: "2025-12-28T20:00:00", evidenceLabel: "She said yes: one coffee, Saturday" },
        { id: "c13-m-ma-6", from: "them", text: "it's saturday. I'm at the place. I got here early. I never get anywhere early", timestamp: "2026-01-03T10:05:00" },
        { id: "c13-m-ma-7", from: "them", text: "you absolute— you know what. fine. FINE. this is why", timestamp: "2026-01-03T10:40:00" },
        { id: "c13-m-ma-8", from: "them", text: "your work called MY number looking for you. dad?", timestamp: "2026-01-05T11:20:00" },
      ],
    },
    {
      id: "c13-th-perlman",
      contactName: "Perlman (Harker Mgmt)",
      contactNumber: "(216) 555-0144",
      messages: [
        { id: "c13-m-pe-1", from: "them", text: "Grieves — 14's boiler again. Also stop logging 'tunnel moisture' on the reports. The tunnels are sealed. Sealed spaces don't have moisture, they have nothing, because they're sealed.", timestamp: "2025-11-03T08:30:00", evidenceLabel: "Management, in writing: stop logging the sealed tunnels' moisture" },
        { id: "c13-m-pe-2", from: "owner", text: "the sealed tunnels also have my missing wet-vac in them, boss. sealed is doing a lot of work in that sentence", timestamp: "2025-11-03T08:45:00" },
        { id: "c13-m-pe-3", from: "them", text: "The storage clients access their units through the alley door WHICH IS NOT A TUNNEL, per the insurance language. Learn the language, Grieves. The language is why we all get paid.", timestamp: "2025-11-03T08:50:00", evidenceLabel: "“The language is why we all get paid” — management's storage clients and the alley door that “is not a tunnel”" },
        { id: "c13-m-pe-4", from: "them", text: "Where are you? Six open work orders. Mrs. Ferro is describing her radiator to me PERSONALLY, Grieves. In detail. I know its whole biography now.", timestamp: "2026-01-02T09:00:00" },
      ],
    },
    {
      id: "c13-th-gus",
      contactName: "Gus (sparky)",
      contactNumber: "(216) 555-0192",
      ghostTypingAfterSeconds: 390,
      messages: [
        { id: "c13-m-gu-1", from: "them", text: "pulled cable under 18 today. milo. your crawlspaces are wrong lately. somebody's been through and they're NEAT. neat scares me. thieves aren't neat", timestamp: "2025-12-02T16:20:00", evidenceLabel: "The electrician: “somebody's been through and they're NEAT. thieves aren't neat.”" },
        { id: "c13-m-gu-2", from: "owner", text: "storage guys, probably. management rents down there. don't put it in writing anywhere, apparently the tunnels are 'sealed'", timestamp: "2025-12-02T16:40:00" },
        { id: "c13-m-gu-3", from: "them", text: "storage guys don't repoint brick, milo. there's NEW MORTAR under 18. good work too. old-style lime mix. nobody's mixed lime mortar since our grandfathers. who repoints a tunnel nobody's allowed in with mortar nobody uses anymore", timestamp: "2025-12-02T16:55:00", evidenceLabel: "New lime mortar under 18 Harker — “nobody's mixed lime mortar since our grandfathers”" },
        { id: "c13-m-gu-4", from: "owner", text: "gus. drop it. I mean it. I'll handle the sublevels. you stay in the ceilings where it's normal", timestamp: "2025-12-02T17:00:00" },
        { id: "c13-m-gu-5", from: "them", text: "milo grieves telling ME to stay out of trouble. writing the date down. ok brother. watch yourself under there", timestamp: "2025-12-02T17:05:00" },
      ],
    },
    {
      id: "c13-th-ferro",
      contactName: "Mrs. Ferro (14, apt 3)",
      contactNumber: "(216) 555-0129",
      messages: [
        { id: "c13-m-fe-1", from: "them", text: "Mr. Grieves the radiator is singing again. Not banging. SINGING. Come hear it before it stops, nobody believes me.", timestamp: "2025-12-18T21:00:00" },
        { id: "c13-m-fe-2", from: "owner", text: "on my way up mrs f. if it's singing it's air in the line. if it's on key, it's a miracle and we charge admission", timestamp: "2025-12-18T21:10:00" },
        { id: "c13-m-fe-3", from: "them", text: "You look tired, Mr. Grieves. My husband kept keys for a living too, God rest him. He used to say a key ring gets heavier every year and it's never the metal.", timestamp: "2025-12-18T22:30:00", evidenceLabel: "Mrs. Ferro: “a key ring gets heavier every year and it's never the metal.”" },
      ],
    },
    {
      id: "c13-th-bank",
      contactName: "Lakeside Bank",
      messages: [
        { id: "c13-m-bk-1", from: "them", text: "Lakeside: Deposit received — $2,909.00, ESCROW SERVICES LLC, memo: storage consultation.", timestamp: "2025-12-14T23:10:00" },
        { id: "c13-m-bk-2", from: "them", text: "Lakeside: Transfer sent — $4,000.00 to M. GRIEVES-OKAFOR 529 COLLEGE FUND.", timestamp: "2025-12-24T17:50:00", evidenceLabel: "Christmas Eve: $4,000 of tunnel money into his daughter's college fund" },
        { id: "c13-m-bk-3", from: "them", text: "Lakeside: Deposit received — $3,317.00, ESCROW SERVICES LLC, memo: delivery.", timestamp: "2025-12-30T23:03:00", evidenceLabel: "Dec 30, 11:03 PM: the final deposit — $3,317, memo “delivery”" },
      ],
    },
    {
      id: "c13-th-poker",
      contactName: "Basement Poker 🃏",
      messages: [
        { id: "c13-m-po-1", from: "them", text: "Denny: friday. gus's garage. bring your quarters and your lies", timestamp: "2025-12-19T12:00:00" },
        { id: "c13-m-po-2", from: "owner", text: "in. and my lies are anecdotes, denny", timestamp: "2025-12-19T12:15:00" },
        { id: "c13-m-po-3", from: "them", text: "Denny: grieves you left friday without your winnings. $31. gus is 'holding it' which knowing gus means it's already spent on wire nuts", timestamp: "2026-01-02T10:00:00" },
      ],
    },
    {
      id: "c13-th-locksmith",
      contactName: "Ohio Key Supply",
      messages: [
        { id: "c13-m-lk-1", from: "them", text: "OHIO KEY: Your order is ready — 1x restricted keyway blank, mgmt authorization on file.", timestamp: "2025-12-22T10:00:00" },
        { id: "c13-m-lk-2", from: "owner", text: "actually cancel that order. don't cut anything on that keyway for anyone. if someone comes in asking, ESPECIALLY someone polite, call me first", timestamp: "2025-12-22T10:30:00", evidenceLabel: "He cancelled the duplicate master — “if someone comes asking, ESPECIALLY someone polite, call me first”" },
        { id: "c13-m-lk-3", from: "them", text: "OHIO KEY: Noted. FYI someone did ask about that keyway last month. Polite fella. Paid cash for blanks we don't stock. We sent him off. Thought you should know.", timestamp: "2025-12-22T10:45:00", evidenceLabel: "The key shop: a polite man had already come asking about the master keyway, paying cash" },
      ],
    },
    {
      id: "c13-th-spam",
      contactName: "Harker Row Tenants Assn",
      messages: [
        { id: "c13-m-sp-1", from: "them", text: "TENANTS ASSN: Reminder — report any 'night noises' from sublevels on the shared doc. 14 reports this month. Management says the tunnels are sealed. The doc says otherwise. 🙃", timestamp: "2025-12-15T09:00:00", evidenceLabel: "The tenants' shared doc: fourteen “night noise” reports in one month" },
      ],
    },
    {
      id: "c13-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c13-m-un-1",
          from: "them",
          text: "your wet-vac is at the junction under 16. I don't keep what isn't mine. I only keep what I've paid for.",
          timestamp: "2025-12-08T03:00:00",
          evidenceLabel: "3 AM, unknown number: “I only keep what I've paid for.”",
        },
      ],
    },
  ],

  photos: [
    {
      id: "c13-ph-keyboard",
      caption: "reorganized the key board. 61 keys, 5 buildings, one me. the M hook gets the place of honor, top left, alone. some keys you don't crowd",
      timestamp: "2025-11-10T14:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-10T14:20:00", device: "This phone", location: "16 Harker — workshop" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#181510"/>` +
          `<rect x="50" y="50" width="300" height="200" rx="6" fill="#2a2318"/>` +
          Array.from({ length: 24 }, (_, i) => `<circle cx="${80 + (i % 8) * 35}" cy="${120 + Math.floor(i / 8) * 50}" r="3" fill="#57422a"/><path d="M${80 + (i % 8) * 35} ${123 + Math.floor(i / 8) * 50} v14 m-4 -4 h8" stroke="#8a7448" stroke-width="2.5"/>`).join("") +
          `<circle cx="80" cy="75" r="3" fill="#57422a"/>` +
          `<path d="M80 78 v18 m-5 -5 h10 m-10 -6 h10" stroke="#c8a84a" stroke-width="3"/>` +
          `<text x="100" y="84" font-family="monospace" font-size="10" fill="#8a7448">M.</text>`,
        { aspect: "landscape", base: "#120f0a", grain: 0.11 },
      ),
      evidenceLabel: "The key board: 61 keys — and the master on its own hook, top left",
    },
    {
      id: "c13-ph-tunnel",
      caption: "the 'sealed' tunnels, exhibit A. sealed like my thermos is sealed. which is to say I open it daily",
      timestamp: "2025-10-15T23:40:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-15T23:40:00", device: "This phone", location: "12 Harker — sublevel" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0d0b08"/>` +
          `<path d="M40 400 V120 Q40 60 150 60 Q260 60 260 120 V400" fill="#171310"/>` +
          `<path d="M70 400 V140 Q70 95 150 95 Q230 95 230 140 V400" fill="#0e0b08"/>` +
          Array.from({ length: 5 }, (_, i) => `<path d="M70 ${180 + i * 45} h160" stroke="#1d1812" stroke-width="2"/>`).join("") +
          `<path d="M85 120 h130 M85 130 h130" stroke="#241d12" stroke-width="4"/>` +
          `<circle cx="150" cy="230" r="30" fill="#3d3020" opacity="0.15"/>`,
        { aspect: "portrait", base: "#0a0806", grain: 0.16 },
      ),
    },
    {
      id: "c13-ph-mortar",
      caption: "new mortar in a tunnel sealed since 1971. the joint work is beautiful. that's the problem. maintenance men know maintenance and this is LOVE, this is somebody maintaining a HOME",
      timestamp: "2025-11-19T23:55:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-19T23:55:00", device: "This phone", location: "14 Harker — crossover" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#12100c"/>` +
          Array.from({ length: 5 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<rect x="${30 + c * 50 + (r % 2) * 25}" y="${60 + r * 42}" width="46" height="38" fill="#241c12" stroke="#0d0a06" stroke-width="2"/>`).join("")).join("") +
          `<rect x="155" y="102" width="96" height="80" fill="#2a2115"/>` +
          `<rect x="155" y="102" width="96" height="80" fill="none" stroke="#8a7c5c" stroke-width="3"/>` +
          `<text x="200" y="260" text-anchor="middle" font-family="monospace" font-size="9" fill="#5c5342">the pale joints. fresh. lime mix. tooled like a craftsman. or a mourner.</text>`,
        { aspect: "landscape", base: "#0d0b08", grain: 0.13 },
      ),
      evidenceLabel: "Fresh lime mortar in the sealed crossover — “this is somebody maintaining a HOME”",
    },
    {
      id: "c13-ph-newdoor",
      caption: "I have walked this junction for nine years. there are three doors at this junction. I want to be very clear. there have always been three doors at this junction",
      timestamp: "2025-12-07T00:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-07T00:30:00", device: "This phone", location: "16 Harker — junction" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0d0b08"/>` +
          `<path d="M0 300 V100 Q0 50 90 50 H310 Q400 50 400 100 V300" fill="#151109"/>` +
          doorway(50, 140, 70, 160, "#080604") +
          doorway(165, 140, 70, 160, "#080604") +
          doorway(280, 140, 70, 160, "#080604") +
          `<text x="200" y="280" text-anchor="middle" font-family="monospace" font-size="10" fill="#6b5f4a">…there are four doors at this junction.</text>` +
          doorway(115, 40, 56, 80, "#050403"),
        { aspect: "landscape", base: "#0a0806", grain: 0.15 },
      ),
      evidenceLabel: "The junction under 16: three doors for nine years — photographed with four",
    },
    {
      id: "c13-ph-envelope",
      caption: "",
      timestamp: "2025-12-15T00:10:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-15T00:10:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#12100d"/>` +
          `<rect x="60" y="140" width="180" height="120" fill="#cfc7b2" opacity="0.9"/>` +
          `<path d="M60 140 L150 210 L240 140" fill="none" stroke="#8b8371" stroke-width="2"/>` +
          `<text x="150" y="290" text-anchor="middle" font-family="serif" font-size="10" fill="#55503f">left ON the workbench. inside: $31 in quarters.</text>` +
          `<text x="150" y="308" text-anchor="middle" font-family="serif" font-size="10" fill="#7a3a42">and a note: “for the poker debt. neighbors square up. — C”</text>`,
        { aspect: "portrait", base: "#0d0b09", grain: 0.11 },
      ),
      evidenceLabel: "Deleted photo: an envelope on his workbench — his poker winnings, returned by “C”. He'd told no one about poker night.",
    },
    {
      id: "c13-ph-map",
      caption: "",
      timestamp: "2025-12-21T01:40:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-21T01:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#14110c"/>` +
          `<rect x="40" y="50" width="220" height="300" fill="#d3cab4" opacity="0.9"/>` +
          `<path d="M70 90 h160 M70 130 h160 M70 170 h160 M70 210 h160 M70 250 h160" stroke="#55503f" stroke-width="3"/>` +
          `<path d="M90 90 v160 M150 90 v160 M210 90 v160" stroke="#55503f" stroke-width="2"/>` +
          `<path d="M150 250 q-60 20 -40 60 q20 30 60 10 q30 -20 10 -50 q-15 -20 -30 -20z" fill="none" stroke="#7a3a42" stroke-width="2.5"/>` +
          `<text x="150" y="330" text-anchor="middle" font-family="monospace" font-size="8" fill="#7a3a42">below the grid: it stops being a grid.</text>` +
          `<text x="150" y="72" text-anchor="middle" font-family="monospace" font-size="9" fill="#3a3427">HARKER SUBLEVELS — what I've actually walked</text>`,
        { aspect: "portrait", base: "#0f0c09", grain: 0.11 },
      ),
      evidenceLabel: "His hand-drawn map: the tunnel grid — and below it, a spiral that “stops being a grid”",
    },
    {
      id: "c13-ph-wetvac",
      caption: "found the wet-vac. junction under 16, exactly where the 3am text said. cleaned. CLEANED. filter replaced. I buy the blue filters. this is a white filter. I don't know where you even get white filters",
      timestamp: "2025-12-08T22:15:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-08T22:15:00", device: "This phone", location: "16 Harker — junction" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0e0c09"/>` +
          `<ellipse cx="150" cy="330" rx="80" ry="20" fill="#080604"/>` +
          `<rect x="100" y="200" width="100" height="120" rx="14" fill="#26303a"/>` +
          `<circle cx="150" cy="200" r="50" fill="#2c3742"/>` +
          `<path d="M195 180 q40 -30 30 -70" stroke="#1d242c" stroke-width="10" fill="none"/>` +
          `<rect x="120" y="240" width="60" height="8" rx="3" fill="#d8d2c2" opacity="0.7"/>`,
        { aspect: "portrait", base: "#0a0806", grain: 0.13 },
      ),
      evidenceLabel: "The returned wet-vac: cleaned, refitted — with a filter no supplier stocks",
    },
    {
      id: "c13-ph-master",
      caption: "the M. 1961 keyway, cut before I was born, opens every door on the row including three I've never found the doors FOR. previous super handed it to me like a funeral. 'count the doors it opens,' he said, 'and if the number ever goes up, quit.'",
      timestamp: "2025-12-23T21:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-23T21:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#131009"/>` +
          `<circle cx="150" cy="140" r="45" fill="none" stroke="#8a7448" stroke-width="10"/>` +
          `<rect x="140" y="180" width="20" height="140" rx="4" fill="#8a7448"/>` +
          `<path d="M160 280 h24 M160 300 h16" stroke="#8a7448" stroke-width="10"/>` +
          `<text x="150" y="365" text-anchor="middle" font-family="monospace" font-size="10" fill="#5c5342">the number went up.</text>`,
        { aspect: "portrait", base: "#0d0b07", grain: 0.12 },
      ),
      evidenceLabel: "The master key — “count the doors it opens, and if the number ever goes up, quit.”",
    },
    {
      id: "c13-ph-junction-night",
      caption: "",
      timestamp: "2025-12-30T23:36:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-30T23:36:00", device: "This phone", location: "16 Harker — junction" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060504"/>`,
        { aspect: "landscape", base: "#050403", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0b0906"/>` +
            `<path d="M0 300 V100 Q0 50 90 50 H310 Q400 50 400 100 V300" fill="#120e08"/>` +
            doorway(115, 40, 56, 80, "#040302") +
            `<rect x="115" y="40" width="56" height="80" fill="#0a0704"/>` +
            figure(143, 108, 0.62, 0.85, "#030202") +
            `<text x="200" y="270" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a4232">the fourth door, open. and my buyer, holding it. politely.</text>` +
            timestampBurn("23:36:52", 400, 300),
          { aspect: "landscape", base: "#080604", grain: 0.14 },
        ),
      },
      evidenceLabel: "His last photo, 11:36 PM: the fourth door open — the buyer holding it, politely",
    },
    {
      id: "c13-ph-radiator",
      caption: "mrs ferro's radiator. it was, for the record, singing. on key. I bled the line and killed the choir and I feel bad about it",
      timestamp: "2025-12-18T22:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-18T22:00:00", device: "This phone", location: "14 Harker apt 3" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1611"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="${60 + i * 24}" y="180" width="16" height="140" rx="8" fill="#3d3226"/>`).join("") +
          `<rect x="50" y="170" width="200" height="12" rx="6" fill="#2c2418"/>` +
          `<rect x="50" y="316" width="200" height="12" rx="6" fill="#2c2418"/>` +
          `<circle cx="60" cy="150" r="10" fill="#57422a"/>`,
        { aspect: "portrait", base: "#13100b", grain: 0.11 },
      ),
    },
  ],

  notes: [
    {
      id: "c13-n-ledger",
      title: "side work ledger (burn after marisa's tuition)",
      timestamp: "2025-12-28T23:30:00",
      evidenceLabel: "His KEYHOLDER ledger: six sales, six doors, and the rules he broke one at a time",
      body:
        "rules I set on day one:\n1. storage access only, after hours\n2. nothing that smells, burns, or breathes\n3. never the master\n4. money goes to marisa, all of it, that's the POINT of it\n\nsales:\noct — 12 harker sublevel. $731. fine. crates? never saw him move any. never saw HIM. rule 2 assumed intact.\noct — crossover to 14. $1,153. fine-ish.\nnov — 14 deep stair. $1,847. noticed the mortar after this one.\nnov — under 15 (the cold stretch). $2,201. wet-vac went missing. came back CLEANED. rule 2 status: unknown and I stopped asking, which is its own answer.\ndec — under 17, the brick vault. $2,563.\ndec — deep gate under 18. $2,909. LAST ONE, I said. he heard 'next to last.' he was right and I hate that he was right.\n\nobservations I'd tell no one but this note:\n- he pays odd numbers because round ones 'settle slower.' checked with the bank. that's not a thing. it's not about settling. it's about something else and I don't have the word.\n- he returned gus's chalk line, denny's $31, my vac. keeps NOTHING that isn't paid for. a burglar with a conscience or something older than conscience. a covenant.\n- the junction has four doors now. the fourth is HIS work — his mortar, his frame, hung TRUE. you can't hang a door that true in the dark alone. unless you've had a very long time to practice.\n- I looked at the 1961 tunnel plat at the county. the spiral is ON IT. drawn in, then crossed out, then initialed by the surveyor: 'per owner request.' the owner in 1961 was HARKER ROW MGMT. the same LLC. unchanged, unrenamed, 64 years.\n\nthursday: deliver the turn, keep the key, take the money, DONE. then coffee with my girl saturday and I become a boring man forever, gladly, GLADLY.\n\nthe rest is in the locked note. code: the price of the last key.",
    },
    {
      id: "c13-n-locked",
      title: "if thursday goes wrong",
      timestamp: "2025-12-30T21:15:00",
      lock: {
        code: "3317",
        hintText: "“the price of the last key.” — the final deposit knows it to the dollar.",
        clueSourceIds: ["c13-th-bank", "c13-n-ledger"],
      },
      evidenceLabel: "The locked note: his confession, his apology, and where the copies are",
      body:
        "for whoever's holding my phone. probably police. maybe perlman. hopefully not marisa. marisa if it's you, stop reading at the line of dashes. I mean it. there's a version of me worth keeping and it's above the dashes.\n\nI sold access to the tunnels. six times, to one buyer, anonymous, through escrow. every dollar went to my daughter's college fund. that doesn't make it right. it makes it PURPOSEFUL, which I've learned is not the same word.\n\n----------\n\nwhat I know about the buyer:\n- he was down there before me. before my listing. the listing didn't give him access. the listing gave him PERMISSION. I think that distinction is the whole thing. gus's crawlspaces, the neat repairs, the lime mortar — that's decades of work. the 1961 plat has his spiral on it. whatever cistern is, harker mgmt crossed him out of the drawings sixty-four years ago and has been renting 'storage' on top of him ever since. perlman's language — 'the language is why we all get paid' — boss, who taught you the language?\n- he doesn't take. he TRADES. everything returned, everything squared, odd numbers, exact change. which means tonight, when he pays me $3,317 to turn the master in the last door, he believes he's bought something square. a turn of a key, witnessed. that's all. that's ALL.\n- but the old super said count the doors. and the count went up. and you don't build a new door to an old tunnel. you build a new door for a new room. and you don't need the master's last turn for a door YOU built —\n- unless the master doesn't open his door. unless it LOCKS something else. sixty-one keys, five buildings, three doors I never found. what if the master's real job all along was holding something shut, and every super since 1961 has been carrying the lock, not the key.\n\nI'm taking the turn anyway. because it's $3,317 I already spent on marisa's spring semester, and because he returned denny's quarters, and a man who returns quarters will let a locksmith walk back up the stairs. that's my read. nine years of reading this building.\n\nif I'm wrong: the ledger's above, copies of everything are taped inside the janitor sink cabinet at 14, and the county plat is public record, 1961, sheet 4. give the language to a lawyer and the spiral to someone braver.\n\nmarisa. coffee saturday. I'm going to be early. I'm never early. watch me be early. — dad",
    },
    {
      id: "c13-n-workorders",
      title: "open work orders",
      timestamp: "2025-12-29T08:00:00",
      evidenceLabel: "Six open work orders — a super who left mid-list",
      body: "14/3 ferro — radiator (singing, resolved, she misses the singing, unresolvable)\n12/5 — window sash\n16/2 — outlet sparks (GUS)\n18/1 — 'scratching in wall' (scheduled: never. sorry. some walls I'm done opening)\n15/4 — faucet drip\n20/basement — bulb out AGAIN (third this month. same fixture. dark likes that corner)",
    },
    {
      id: "c13-n-marisa",
      title: "things to say saturday (practice)",
      timestamp: "2025-12-29T23:00:00",
      body: "don't explain the money first. don't explain AT ALL unless she asks.\n\nask about her classes. the bio thing. the roommate with the loud bird.\n\nif she asks about mom's ring: it's in the green toolbox, top tray, wrapped in the good chamois. it was always going to her. say it plain.\n\ndon't cry until the car. you get the car for that.",
    },
  ],

  voicemails: [
    {
      id: "c13-vm-marisa",
      callerLabel: "Marisa",
      callerNumber: "(216) 555-0171",
      timestamp: "2026-01-03T11:00:00",
      durationSec: 29,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“So I sat there for an hour, dad. An HOUR. And I had the whole speech ready, the one where I let you back in, in installments, like a normal person — and you didn't come, which is SO — [pause] and then your work called mom's old number, and now I'm scared instead of angry and I don't have a speech for that. Nobody gave me a speech for that. Call me back. You're supposed to be EARLY. You said watch me be early.”",
    },
    {
      id: "c13-vm-perlman",
      callerLabel: "Perlman (Harker Mgmt)",
      callerNumber: "(216) 555-0144",
      timestamp: "2026-01-05T09:30:00",
      durationSec: 33,
      tone: "plain",
      evidenceLabel: "Perlman's voicemail: management's lawyer called about the tunnels before anyone reported Milo missing",
      transcript:
        "[automated transcript — audio partially recovered]\n“Grieves, it's Perlman. Look. Before the police call you — or, ah, before you call them, or whatever order this happens in — company counsel reached out to ME this morning, first thing, about 'tunnel access liability,' which is interesting, Grieves, because I hadn't told counsel anything. Nobody had told counsel anything. Counsel has a sixty-year-old file, Grieves. It has a name on the outside. It's not your name and it's not mine and I'm going to pretend I didn't read it. Call me. Or don't. Honestly? Don't.”",
    },
    {
      id: "c13-vm-gus",
      callerLabel: "Gus (sparky)",
      callerNumber: "(216) 555-0192",
      timestamp: "2026-01-04T19:00:00",
      durationSec: 27,
      tone: "distorted",
      evidenceLabel: "Gus went down to the junction — and counted the doors",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Milo. I went down. I know, I know — ceilings, normal, I remember the assignment. Brother, I counted the doors at your junction, because you'd have wanted the count. It's three. THREE doors, Milo. Clean walls where — there's no fourth frame, no new mortar, nothing, the brick is ORIGINAL. But the floor. Milo, there's a drag mark in the dust going INTO the wall where the — [breath] I put my hand on the brick. It was warm. It's January and forty feet down and the brick was warm like a — like a radiator. Like it was SINGING once and somebody bled the line. I'm out. I'm buying you a beer when you surface. Surface, brother.”",
    },
    {
      id: "c13-vm-escrow",
      callerLabel: "Escrow Services LLC",
      timestamp: "2026-01-02T10:00:00",
      durationSec: 20,
      tone: "static",
      transcript:
        "[automated transcript]\n“This is a courtesy notice from Escrow Services regarding transaction 7-7-3-1: both parties have marked the exchange complete. Feedback has been left for KEYHOLDER: five stars. Comment: 'prompt. square. the turn was everything promised.' This account has now been… [remainder unrecoverable]”",
    },
    {
      id: "c13-vm-pipe",
      callerLabel: "16 Harker Row — service line",
      callerNumber: "(216) 555-0016",
      timestamp: "2026-01-06T03:17:00",
      durationSec: 62,
      tone: "breathing",
      evidenceLabel: "From the building's 1930s service intercom — decommissioned, unwired — at 3:17 AM",
      transcript:
        "[automated transcript — no speech detected]\n[pipe resonance. steam, or something moving the way steam moves]\n[knocking: three, pause, three, pause — the maintenance code for 'all clear, coming up']\n[a key ring. unmistakable. sixty-one keys, give or take, jangling once, then muffled — the sound of a ring being pocketed by someone who has learned to keep keys quiet]\n[the knocking again, farther away: all clear, coming up]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: the service intercom at 16 Harker was decommissioned in 1988; its wiring was salvaged for copper in 1991. The 'all clear, coming up' code appears in the building's 1961 maintenance handbook — page 44, initialed by the same surveyor who struck the spiral from the plat.",
    },
  ],

  calendarEvents: [
    { id: "c13-cal-boiler", title: "boilers — weekly check", date: "2025-10-06", time: "07:00", recurring: "weekly", createdBy: "owner" },
    { id: "c13-cal-delivery", title: "THURSDAY. junction. one turn. done.", date: "2025-12-30", time: "23:30", createdBy: "owner", evidenceLabel: "Dec 30, 11:30 PM, in his hand: “junction. one turn. done.”" },
    { id: "c13-cal-coffee", title: "COFFEE W/ MARISA ☕ (BE EARLY)", date: "2026-01-03", time: "10:00", createdBy: "owner", struck: true, evidenceLabel: "Coffee with Marisa — struck through Jan 2 at 3:17 AM, by no account" },
    {
      id: "c13-cal-inspection",
      title: "sublevel inspection",
      date: "2026-01-13",
      time: "23:30",
      recurring: "weekly",
      createdBy: "unknown",
      detail: "Added Jan 2. No account. Weekly, 11:30 PM — his old delivery hour. As if the route still needs walking, and someone expects the phone's next owner to walk it.",
      evidenceLabel: "A new weekly event, added by no one: “sublevel inspection,” 11:30 PM",
    },
    { id: "c13-cal-poker", title: "poker @ gus's 🃏", date: "2026-01-09", time: "19:30", recurring: "weekly", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c13-pin-workshop", label: "16 Harker — workshop", timestamp: "2025-12-30T21:00:00", x: 50, y: 40 },
    { id: "c13-pin-rounds", label: "Evening rounds (12→20 Harker)", timestamp: "2025-12-30T19:30:00", x: 40, y: 35 },
    { id: "c13-pin-county", label: "County records — plat room", timestamp: "2025-12-27T14:00:00", x: 20, y: 60, evidenceLabel: "Dec 27: two hours in the county plat room — sheet 4, 1961" },
    {
      id: "c13-pin-junction",
      label: "16 Harker — sublevel junction",
      timestamp: "2025-12-30T23:34:00",
      x: 51,
      y: 44,
      detail: "11:34 PM: the phone descends to the junction. 11:36: the last photo. 11:41: final activity — the locked note saved. The fix never moves again until recovery, but its altitude reading drifts DOWN for six more hours, one slow meter at a time, through what the building plans insist is bedrock.",
      evidenceLabel: "The final fix: stationary at the junction — while its altitude sank through bedrock for six hours",
    },
  ],

  browserHistory: [
    { id: "c13-b-listing", query: "anonymous listing site access rental no questions", timestamp: "2025-10-05T22:00:00", evidenceLabel: "October: where KEYHOLDER was born" },
    { id: "c13-b-escrow", query: "escrow service anonymous both parties legit", timestamp: "2025-10-06T21:30:00" },
    { id: "c13-b-529", query: "can a parent contribute to 529 without contact with child", timestamp: "2025-10-07T00:15:00", evidenceLabel: "“can a parent contribute to a 529 without contact with child”" },
    { id: "c13-b-mortar", query: "lime mortar who still uses it repointing old", timestamp: "2025-11-21T00:30:00" },
    { id: "c13-b-odd", query: "paying in odd numbers superstition meaning", timestamp: "2025-12-01T23:50:00", evidenceLabel: "“paying in odd numbers superstition meaning” — the top result is about debts to things, not people" },
    { id: "c13-b-plat", query: "county plat archive 1961 harker row sheet 4", timestamp: "2025-12-26T20:00:00", evidenceLabel: "The 1961 plat — the spiral, struck out “per owner request”" },
    { id: "c13-b-llc", query: "harker row management llc incorporation date officers", timestamp: "2025-12-26T21:15:00", evidenceLabel: "Harker Row Mgmt LLC: incorporated 1961, officers never amended, not once, in 64 years" },
    { id: "c13-b-last", query: "can you refuse a completed escrow delivery", timestamp: "2025-12-30T20:10:00", evidenceLabel: "His last search, 8:10 PM: “can you refuse a completed escrow delivery”" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "TorqueSpec",
    revealAfterClueIds: ["c13-th-gus", "c13-n-ledger"],
    title: "GRAYMARKET — Seller Console",
    heading: "Handle: KEYHOLDER · standing: five stars",
    body:
      "The anonymous marketplace client, disguised as a torque-spec calculator. Six completed listings, one buyer, a spotless rating.\n\nThe console keeps what sellers rarely re-read: the buyer's profile, and the archive of every seller who came before.",
    entries: [
      { label: "Listing: 12 HARKER SUBLEVEL", status: "SOLD $731", detail: "buyer: CISTERN · oct" },
      { label: "Listings: crossover → deep gate", status: "SOLD ×5", detail: "buyer: CISTERN · $1,153–$2,909" },
      { label: "Listing: THE MASTER (delivery)", status: "COMPLETE $3,317", detail: "feedback: 'the turn was everything promised.'" },
      { label: "Buyer: CISTERN", status: "MEMBER SINCE —", detail: "join date precedes platform launch by 41 yrs · flagged, never resolved" },
      { label: "Prior seller: WARDKEY (1998–2003)", status: "ACCOUNT DORMANT", detail: "last listing: 'the master (delivery)' · complete" },
      { label: "Prior seller: SUPER61 (1971–1984)", status: "ACCOUNT DORMANT", detail: "last listing: 'the master (delivery)' · complete" },
      { label: "Buyer note on file", status: "PINNED", detail: "'I only ever buy one thing. sellers list it last.'" },
    ],
    footer:
      "Every superintendent of Harker Row eventually found this marketplace, or one wearing its face — the account names go back past the internet, past the platform, past sense. Each sold small doors for small money, and each, at the end, listed the same final item without knowing the others had. 'I only ever buy one thing,' says the buyer's pinned note. 'Sellers list it last.' The master was never the merchandise. The seller was. The key just proves who's holding it.",
    evidenceLabel: "The GRAYMARKET console: CISTERN's join date precedes the platform by 41 years — and every prior super's last listing reads “the master (delivery) · complete”",
  },

  liveEvents: [
    {
      id: "c13-live-cistern",
      kind: "message",
      afterSeconds: 340,
      threadId: "c13-th-cistern",
      message: {
        id: "c13-m-ci-live",
        from: "them",
        text: "[relay] to the new keyholder: the account transfers with the phone. no rush. the small doors first. you'll know which listing is last.",
        timestamp: "2026-01-06T21:06:00",
        evidenceLabel: "To whoever holds the phone: “the account transfers with the phone… you'll know which listing is last.”",
      },
    },
    {
      id: "c13-live-workorder",
      kind: "notification",
      afterSeconds: 630,
      title: "Harker Mgmt",
      body: "New work order — 16 Harker, sublevel: 'door count discrepancy.' Assigned to: (vacant).",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c13-v-ran",
      label: "He took the money and vanished",
      description: "Eleven thousand dollars of gray income, a daughter finally answering, a life worth restarting somewhere clean.",
      requiredEvidenceIds: ["c13-m-bk-3", "c13-b-listing", "c13-n-workorders"],
      isCanon: false,
      epilogue:
        "The flight theory needs him to abandon exactly three things, and it drowns in all three. The money: every gray dollar sits in a 529 he can't legally touch — men don't flee on funds they've already given away. The coffee: no one plans a disappearance for the Thursday before the Saturday he's spent a year begging for. The ring: still in the green toolbox, top tray, wrapped in the good chamois, exactly where his practice-note said it would be, waiting to be said plain.\n\nMarisa is shown the note about Saturday — 'watch me be early' — as part of the standard interview. She reads it twice, hands it back, and tells the detective the only thing this verdict will ever need to hear: 'My father is a man who fixes things badly and loves things badly and shows up late. He's not a man who doesn't show up.' The file converts to suspicious circumstances that afternoon.",
    },
    {
      id: "c13-v-cistern",
      label: "The buyer collected his seventh purchase",
      description: "Six sales bought permission. The seventh bought the seller. Every super since 1961 listed the same final item.",
      requiredEvidenceIds: ["case-13.hidden", "c13-n-locked", "c13-m-ci-12", "c13-ph-junction-night", "c13-ph-envelope"],
      isCanon: true,
      epilogue:
        "Your report says what the console archive proves and the county plat corroborates: something has been renting the underside of Harker Row since before the LLC that pretends to own it, and it acquires its landlords on a schedule. SUPER61. WARDKEY. KEYHOLDER. Small doors for small money, trust built in exact change and returned quarters, and then the one listing every seller posts believing it's his idea. Cistern told the truth in every message — that's the horror your report can't gentle: 'I only keep what I've paid for.' He paid.\n\nWhat can be charged, is: Harker Row Management's sixty-four-year-old file goes to a grand jury — the 1961 plat, the struck spiral, the 'storage' invoices billed against a void, four superintendents across six decades gone without a single report FILED BY THE COMPANY. Perlman testifies, gray-faced, honest, small: 'I learned the language. Nobody ever taught me what it was for.' The LLC is dissolved. Its officers, per the paperwork, have not aged, changed, or signed anything since 1961; the state accepts service at the registered address and the certified letter comes back marked, in handwriting the clerk photographs before she can talk herself out of it: RETURNED. SQUARE.\n\nMilo Grieves is not recovered. The tunnels are surveyed, sealed with modern concrete, sensor-monitored. The sensors log one event, in March: three knocks, pause, three knocks — all clear, coming up — and then nothing, ever again, which the acoustic contractor calls settling and the report calls settling and nobody who has read page 44 of the 1961 handbook calls settling.\n\nMarisa collects the ring from the green toolbox herself. She pays the $31 poker debt to Denny out of her own pocket — 'grieves square up,' she says — and she keeps her father's phone bill active, one line, month to month. On the first Saturday of every month she texts it: 'coffee. I'm early.' It's the only thread in this archive where the read receipts still, occasionally, turn on. Nobody at the carrier can explain that. Nobody in her family wants it explained.",
    },
    {
      id: "c13-v-mgmt",
      label: "Harker Management cleaned house",
      description: "A super logging tunnel moisture, pulling 1961 plats, photographing what insurance language buried. Companies have removed problems before.",
      requiredEvidenceIds: ["c13-m-pe-3", "c13-vm-perlman", "c13-b-llc"],
      isCanon: false,
      epilogue:
        "The corporate verdict: Grieves got curious about the one file that pays everyone's salary, and the company solved him. Counsel's suspicious head-start — calling about 'tunnel liability' before any report existed — reads like guilt with a retainer.\n\nIt half-holds. The company IS guilty — of the sixty-four-year paper labyrinth, the insurance language, the invoiced void. But the removal theory needs hands, and discovery finds no hands: no fixer invoices, no security contractor, no one on the row's cameras that final night except Grieves himself, descending alone, keys quiet, exactly as his own note planned. The company didn't remove him. The company's whole crime was older and lazier: it knew the tunnels collected superintendents the way gutters collect leaves, and it kept hiring superintendents, and it kept the language current.\n\nThe prosecutor gets them on fraud. At allocution, the company's counsel — the one with the sixty-year-old file — is asked why no one ever warned the supers. He consults his notes, though there is plainly nothing in them, and says: 'The vacancy always filled itself.' He is not asked a follow-up. Everyone in the room decided, in the same silent second, that they didn't want the answer on a transcript.",
    },
    {
      id: "c13-v-tunnels",
      label: "The tunnels are the other building",
      description: "A fourth door photographed and never found. Brick warm as a radiator. An intercom with no wires, knocking 'all clear, coming up.'",
      requiredEvidenceIds: ["c13-vm-pipe", "c13-vm-gus", "c13-ph-newdoor", "c13-pin-junction"],
      isCanon: false,
      epilogue:
        "You write the structural version: Harker Row is two buildings — the one above, which management rents to people, and the one below, which rents itself to management, on terms nobody living negotiated. The 1961 surveyor drew what he found and was made to cross it out; the initials on the strike-through match the initials on the maintenance handbook's knock codes, a man teaching future supers how to speak politely to the lower floors. Doors that appear in photographs and not in masonry. Altitude readings sinking through bedrock at a patient meter an hour — not falling. DESCENDING. Being taken down a stairwell that isn't on sheet 4 because it was struck out, per owner request, and the owner was not the LLC.\n\nThe report is filed under structural anomalies, which is where the county files its prayers. The city's response is perfect municipal poetry: the sublevels are condemned — declared unfit for occupancy. A notice is posted on the alley door. Within a week the notice is gone, and in its place, dead center, level, hung true, is a small brass frame containing the notice NEATLY FOLDED, the way you'd keep a letter from a tenant you'd decided to forgive.\n\nThe last line of your report is a maintenance recommendation, and you stand by it as the only actionable finding in the entire file: the next superintendent of Harker Row should be issued sixty keys. Whatever the sixty-first was holding shut has a new keyholder now, and he was always the conscientious kind. The buildings, you note, have never been in better repair. The radiators sing on key. Something square is maintaining a home down there, and for the first time in sixty-four years, it isn't behind on the work orders.",
    },
  ],
};

export default c13;
