import type { CaseFile } from "../types";
import { photoSvg, figure, blurStreak, timestampBurn } from "../photoart";

/**
 * CASE 04 — THE LAST CUSTOMER
 * June Pell, 24. Overnight waitress at Pell's, the diner her great-grandfather
 * opened in 1961. Vanished mid-shift between 4:07 and 4:11 AM. The coffee in
 * booth 4 was still warm. The customer who always sat there was never on the
 * cameras at all.
 */

const c4: CaseFile = {
  id: "case-04",
  title: "The Last Customer",
  victimName: "June Pell, 24",
  summary:
    "A regular came to the diner every night: same booth, same order, exact change, always $4.44. June's photos of him never came out. Her notes app has one page that's just his order, written over and over. On his 216th visit, she vanished between refills.",
  intake:
    "SUBJECT: Pell, June R. (24). Vanished during her shift at Pell's Diner between 04:07 and 04:11, Nov 12, per co-worker A. Okoye (cook), who states the floor was visible to him 'the whole time, except when it wasn't.'\n\nDEVICE: Recovered from the counter beside the register, 04:30. Battery 71%. Order pad found in booth 4 with an order written on the top sheet in the subject's hand. No customer was present. Coffee in booth 4: 61°C at first responder measurement.\n\nCCTV: Interior camera covers booths 1–6. Footage from 04:00–04:15 shows booth 4 occupied — seat compression, table shadow, steam movement — with no visible occupant. Vendor states this is 'a compression artifact.' The same artifact appears in footage on 214 previous nights.\n\nSecond-pass review requested. Do not contact the vendor again; they've stopped answering.",
  contentWarningLevel: 3,
  phone: {
    ownerLabel: "june!! 🍒",
    recoveredAt: "2025-11-14T22:30:00",
    batteryStart: 71,
    wallpaperHue: 350,
    lockScreenNotifications: [
      { appId: "messages", title: "Theo 💛", preview: "you're 20 min late calling me and I fell asleep mad. call me anyway", targetId: "c4-th-theo" },
      { appId: "messages", title: "Ambrose (cook)", preview: "june the cops took the pad. tell me where you are and it's fine", targetId: "c4-th-ambrose" },
      { appId: "phone", title: "Voicemail", preview: "Pell's Diner (landline) · 0:58", targetId: "c4-vm-diner" },
    ],
  },

  messages: [
    {
      id: "c4-th-theo",
      contactName: "Theo 💛",
      contactNumber: "(775) 555-0126",
      messages: [
        { id: "c4-m-th-1", from: "them", text: "graveyard shift AGAIN? your sleep schedule is a war crime", timestamp: "2025-10-02T22:10:00" },
        { id: "c4-m-th-2", from: "owner", text: "the diner needs me and honestly the 4am crowd is my people. truckers, nurses, one owl-shaped man", timestamp: "2025-10-02T22:31:00" },
        { id: "c4-m-th-3", from: "them", text: "owl shaped man??", timestamp: "2025-10-02T22:33:00" },
        {
          id: "c4-m-th-4",
          from: "owner",
          text: "booth 4 guy. comes in every night at 4. same order every time. pays exact change, $4.44, before I even ring it. he's polite!! he's just. arranged wrong. like someone described a customer over the phone and this is what showed up",
          timestamp: "2025-10-02T22:40:00",
          evidenceLabel: "June's first description of the booth-4 regular: “arranged wrong”",
        },
        { id: "c4-m-th-5", from: "them", text: "babe that's a creepypasta. switch shifts", timestamp: "2025-10-02T22:42:00" },
        { id: "c4-m-th-6", from: "owner", text: "he tips $4.44 every night theo. that's rent math. I can outlast one weird owl", timestamp: "2025-10-02T22:45:00" },
        { id: "c4-m-th-7", from: "them", text: "did you try the photo thing again", timestamp: "2025-11-05T23:58:00" },
        {
          id: "c4-m-th-8",
          from: "owner",
          text: "3 more tries tonight. every one comes out smeared. JUST him. ambrose is in the background of two of them sharp as a knife. I'm not scared I'm ANGRY. cameras are supposed to be on my side",
          timestamp: "2025-11-06T00:14:00",
          evidenceLabel: "Every photo of the regular smears — while everything around him stays sharp",
        },
        { id: "c4-m-th-9", from: "them", text: "quit. please. for me. we'll do rent math together", timestamp: "2025-11-06T00:20:00", evidenceLabel: "Theo begging her to quit the night shift, a week before" },
        { id: "c4-m-th-10", from: "owner", text: "two more weeks. gran's hip surgery clears the card and then I'm a daylight person, promise. also. don't laugh. I think he knows I've been counting his visits", timestamp: "2025-11-06T00:26:00" },
        { id: "c4-m-th-11", from: "them", text: "counting?? june what number is he on", timestamp: "2025-11-06T00:27:00" },
        { id: "c4-m-th-12", from: "owner", text: "213", timestamp: "2025-11-06T00:29:00" },
        { id: "c4-m-th-13", from: "them", text: "you're 20 min late calling me and I fell asleep mad. call me anyway", timestamp: "2025-11-12T04:50:00" },
      ],
    },
    {
      id: "c4-th-ambrose",
      contactName: "Ambrose (cook)",
      contactNumber: "(775) 555-0184",
      ghostTypingAfterSeconds: 380,
      messages: [
        { id: "c4-m-am-1", from: "them", text: "taking the bins out. watch my grill", timestamp: "2025-11-01T03:20:00" },
        { id: "c4-m-am-2", from: "owner", text: "your grill and I are at peace. hey. when booth 4 orders, do you ever SEE the ticket get to you? like the moment of it", timestamp: "2025-11-01T03:24:00" },
        { id: "c4-m-am-3", from: "them", text: "tickets show up on my rail. that's the whole system june", timestamp: "2025-11-01T03:26:00" },
        {
          id: "c4-m-am-4",
          from: "owner",
          text: "I haven't walked a ticket to your rail for booth 4 in three weeks. I stopped. on purpose. the tickets keep showing up ambrose",
          timestamp: "2025-11-01T03:29:00",
          evidenceLabel: "She stopped submitting booth 4's orders — the tickets kept arriving anyway",
        },
        { id: "c4-m-am-5", from: "them", text: "ok. new rule. neither of us goes to the walk-in alone after 4. deal?", timestamp: "2025-11-01T03:33:00" },
        { id: "c4-m-am-6", from: "owner", text: "deal", timestamp: "2025-11-01T03:33:30" },
        { id: "c4-m-am-7", from: "them", text: "june the cops took the pad. tell me where you are and it's fine", timestamp: "2025-11-12T05:15:00" },
        { id: "c4-m-am-8", from: "them", text: "I was AT THE GRILL. the pass-through shows the whole floor. there were four seconds. FOUR. the coffee pot was still rocking on the burner", timestamp: "2025-11-12T05:22:00", evidenceLabel: "Ambrose: she vanished within four seconds, mid-floor, coffee pot still rocking" },
      ],
    },
    {
      id: "c4-th-sal",
      contactName: "Sal (manager)",
      contactNumber: "(775) 555-0117",
      messages: [
        { id: "c4-m-sa-1", from: "them", text: "schedule's up. you got graveyards all month like you asked. your funeral kid", timestamp: "2025-10-01T16:00:00" },
        { id: "c4-m-sa-2", from: "owner", text: "sal what do you know about the booth 4 guy. long-term. like since before me", timestamp: "2025-11-03T15:40:00" },
        {
          id: "c4-m-sa-3",
          from: "them",
          text: "we don't talk about regulars, we keep them. your great-gramps had a rule: booth 4 gets served first and gets left alone. I inherited the rule with the fryers. some rules you don't audit june",
          timestamp: "2025-11-03T16:05:00",
          evidenceLabel: "Sal inherited a rule from 1961: booth 4 gets served first and left alone",
        },
        { id: "c4-m-sa-4", from: "owner", text: "SAL. how long has he been coming", timestamp: "2025-11-03T16:07:00" },
        { id: "c4-m-sa-5", from: "them", text: "how long has the diner been open?", timestamp: "2025-11-03T16:12:00" },
        { id: "c4-m-sa-6", from: "them", text: "also some guy phoned asking your shift pattern tuesday. didn't give a name. I said we don't do that. probably nothing but heads up", timestamp: "2025-11-04T18:30:00", evidenceLabel: "Someone phoned the diner asking for June's shift pattern" },
      ],
    },
    {
      id: "c4-th-mom",
      contactName: "Mom",
      contactNumber: "(775) 555-0109",
      messages: [
        { id: "c4-m-mo-1", from: "them", text: "Gran's surgery went beautifully. She's already bossing the nurses. Thank you for the money, baby — we'll pay you back every cent", timestamp: "2025-11-08T14:20:00" },
        { id: "c4-m-mo-2", from: "owner", text: "you will not. pell women fix pell women. it's the family business", timestamp: "2025-11-08T14:45:00" },
        { id: "c4-m-mo-3", from: "them", text: "The family business is pancakes, June. But yes. That too. ❤", timestamp: "2025-11-08T14:50:00" },
        { id: "c4-m-mo-4", from: "owner", text: "mom random question. did great-gramps ever talk about a regular? at the diner? somebody who came every single night?", timestamp: "2025-11-09T19:30:00" },
        {
          id: "c4-m-mo-5",
          from: "them",
          text: "Funny you ask. Gran says her dad called him 'the appetite.' Said the diner stayed open through '73 AND the highway rerouting because they never lost their best customer. She says it like a joke. Her face doesn't do the joke, though.",
          timestamp: "2025-11-09T20:02:00",
          evidenceLabel: "Family lore: great-grandfather's “best customer” — “the appetite” — since 1961",
        },
      ],
    },
    {
      id: "c4-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c4-m-un-1",
          from: "them",
          text: "he asked for you tonight.",
          timestamp: "2025-11-10T04:44:00",
          evidenceLabel: "“he asked for you tonight.” — sent from the diner's own landline number",
        },
        { id: "c4-m-un-2", from: "owner", text: "who is this? this is the DINER'S number. I'm standing next to the diner phone. it's on the hook", timestamp: "2025-11-10T04:46:00" },
        { id: "c4-m-un-3", from: "them", text: "two more.", timestamp: "2025-11-10T04:47:00" },
      ],
    },
    {
      id: "c4-th-rosa",
      contactName: "Rosa (days)",
      contactNumber: "(775) 555-0163",
      messages: [
        { id: "c4-m-ro-1", from: "them", text: "cover my sunday brunch? I'll owe you forever + one (1) firstborn", timestamp: "2025-11-02T09:15:00" },
        { id: "c4-m-ro-2", from: "owner", text: "keep the firstborn, I'll take your saturday graveyard", timestamp: "2025-11-02T09:40:00" },
        { id: "c4-m-ro-3", from: "them", text: "you WANT more graveyards? june the night shift is doing something to you. you know that right", timestamp: "2025-11-02T09:42:00" },
        { id: "c4-m-ro-4", from: "owner", text: "I'm doing something to IT. I'm going to figure him out rosa. nobody eats the same thing 200 nights", timestamp: "2025-11-02T09:50:00" },
      ],
    },
    {
      id: "c4-th-dineshift",
      contactName: "DineShift",
      messages: [
        { id: "c4-m-ds-1", from: "them", text: "DineShift: Your shift Nov 11 22:00–06:00 is confirmed. Have a great one!", timestamp: "2025-11-10T12:00:00" },
        {
          id: "c4-m-ds-2",
          from: "them",
          text: "DineShift: Your shift Nov 12 22:00–06:00 was clocked out at 04:11 by manager override. Note attached: 'order complete.'",
          timestamp: "2025-11-12T04:11:00",
          evidenceLabel: "She was clocked out at 04:11 by an override note reading “order complete” — Sal was asleep at home",
        },
      ],
    },
    {
      id: "c4-th-vendor",
      contactName: "Sysco-Vale Supply",
      messages: [
        { id: "c4-m-ve-1", from: "them", text: "Sysco-Vale: Delivery confirmed Thu 05:30 — 4 cs eggs, 2 cs bacon, 1 cs cherry pie filling.", timestamp: "2025-11-06T15:00:00" },
        { id: "c4-m-ve-2", from: "owner", text: "can you add rye? we keep running out of rye. just rye. it's always the rye", timestamp: "2025-11-06T15:20:00" },
        { id: "c4-m-ve-3", from: "them", text: "Sysco-Vale: Added — 2 cs rye. FYI your location's rye usage is 4x regional average for your covers. Flagging for your records!", timestamp: "2025-11-06T15:24:00", evidenceLabel: "The diner burns rye bread at 4× the regional average — his order, every night" },
      ],
    },
    {
      id: "c4-th-taxi",
      contactName: "Star Cab Co.",
      messages: [
        { id: "c4-m-tx-1", from: "them", text: "Star Cab: Your driver Manny arrives ~06:10. Track: starcab.co/t/8811", timestamp: "2025-11-09T05:55:00" },
        { id: "c4-m-tx-2", from: "them", text: "Star Cab: How was your ride? Manny says you left a book in the back seat — we'll hold it at dispatch!", timestamp: "2025-11-09T06:40:00", evidenceLabel: "A book left in a cab three days before — never collected" },
      ],
    },
    {
      id: "c4-th-gran",
      contactName: "Gran 🥧",
      contactNumber: "(775) 555-0101",
      messages: [
        { id: "c4-m-gr-1", from: "them", text: "JUNIE. new hip works. I did a lap of the ward and beat a man with a walker. racing him I mean. mostly", timestamp: "2025-11-09T11:00:00" },
        { id: "c4-m-gr-2", from: "owner", text: "gran you menace. love you. hey — mom said great-gramps had a name for the night regular. 'the appetite'?? tell me the real story sometime?", timestamp: "2025-11-09T21:15:00" },
        {
          id: "c4-m-gr-3",
          from: "them",
          text: "Not over text, junie. Some stories you tell with the lights on and the door shut. Sunday. And june — until sunday, you serve him, you smile, and you never, EVER count.",
          timestamp: "2025-11-09T21:40:00",
          evidenceLabel: "Gran's warning, three days before: “you never, EVER count”",
        },
        { id: "c4-m-gr-4", from: "owner", text: "...gran I've been counting since september", timestamp: "2025-11-09T21:44:00" },
        { id: "c4-m-gr-5", from: "them", text: "Sunday. First thing. Bring theo.", timestamp: "2025-11-09T21:52:00" },
      ],
    },
  ],

  photos: [
    {
      id: "c4-ph-neon",
      caption: "she glows for the night shift 🍒",
      timestamp: "2025-10-05T22:02:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-05T22:02:00", device: "This phone", location: "Pell's Diner, Route 9" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0a0b10"/>` +
          `<rect x="60" y="120" width="280" height="120" fill="#141218"/>` +
          `<rect x="70" y="150" width="260" height="70" fill="#0e0c11"/>` +
          `<text x="200" y="105" text-anchor="middle" font-family="serif" font-size="34" fill="#d1697a" opacity="0.95">PELL'S</text>` +
          `<text x="200" y="105" text-anchor="middle" font-family="serif" font-size="34" fill="#ff9aab" opacity="0.35">PELL'S</text>` +
          `<text x="200" y="135" text-anchor="middle" font-family="monospace" font-size="11" fill="#8a4a56">OPEN ALL NITE · EST 1961</text>` +
          `<circle cx="200" cy="100" r="90" fill="#d1697a" opacity="0.06"/>`,
        { aspect: "landscape", base: "#08090d", grain: 0.14 },
      ),
    },
    {
      id: "c4-ph-staff",
      caption: "the 4am family. ambrose refused to smile, which for him IS smiling",
      timestamp: "2025-10-12T04:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-12T04:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#171318"/>` +
          `<rect x="0" y="200" width="400" height="100" fill="#221c20"/>` +
          `<rect x="0" y="196" width="400" height="8" fill="#3a2f35"/>` +
          figure(140, 190, 1.1, 0.95, "#3d3440") +
          figure(230, 192, 1.15, 0.95, "#443a3d") +
          `<circle cx="140" cy="128" r="4" fill="#c9a" opacity="0.5"/><circle cx="230" cy="126" r="4" fill="#ca9" opacity="0.5"/>` +
          `<rect x="320" y="120" width="60" height="80" fill="#12101a"/>`,
        { aspect: "landscape", base: "#100d12", grain: 0.13 },
      ),
    },
    {
      id: "c4-ph-booth-empty",
      caption: "booth 4, 4:52am. he left AS I raised the phone. I didn't hear the door. the door has a bell",
      timestamp: "2025-10-28T04:52:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-28T04:52:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#151117"/>` +
          `<rect x="30" y="180" width="240" height="130" rx="10" fill="#3a2228"/>` +
          `<rect x="30" y="150" width="240" height="40" rx="10" fill="#472a31"/>` +
          `<rect x="55" y="280" width="190" height="70" rx="6" fill="#241d20"/>` +
          `<ellipse cx="110" cy="300" rx="22" ry="9" fill="#d8d2c2" opacity="0.85"/>` +
          `<ellipse cx="110" cy="297" rx="14" ry="5" fill="#3a2c1a"/>` +
          `<path d="M128 292 q8 -8 4 -16" stroke="#8a8378" stroke-width="2" fill="none" opacity="0.6"/>` +
          `<rect x="170" y="290" width="50" height="8" rx="3" fill="#4a4438" opacity="0.7"/>` +
          `<rect x="35" y="188" width="230" height="30" rx="8" fill="#2c1a20" opacity="0.9"/>`,
        { aspect: "portrait", base: "#0f0c11", grain: 0.15 },
      ),
      evidenceLabel: "Booth 4 seconds after he “left” — coffee steaming, seat cushion still compressed",
    },
    {
      id: "c4-ph-blur1",
      caption: "TRY #4. ambrose is SHARP in the background. explain the middle of this photo. anyone.",
      timestamp: "2025-11-05T04:12:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-05T04:12:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#141016"/>` +
          `<rect x="0" y="250" width="300" height="150" fill="#1d171b"/>` +
          figure(250, 240, 0.8, 0.9, "#3d3440") +
          blurStreak(130, 200, 60, "#241e26", 0.9) +
          blurStreak(128, 160, 42, "#2a2129", 0.85) +
          blurStreak(132, 245, 66, "#201a22", 0.9) +
          `<ellipse cx="130" cy="190" rx="42" ry="85" fill="#1a141c" opacity="0.8"/>`,
        { aspect: "portrait", base: "#0e0b10", grain: 0.18 },
      ),
      evidenceLabel: "Photo attempt #4: the room in focus, the cook in focus — the customer a smear",
    },
    {
      id: "c4-ph-blur2",
      caption: "",
      timestamp: "2025-11-08T04:09:00",
      aspect: "portrait",
      deleted: true,
      meta: {
        takenAt: "2025-11-08T04:09:00",
        editedAt: "2025-11-08T04:07:00",
        device: "This phone",
      },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#120f14"/>` +
          blurStreak(150, 190, 70, "#292130", 0.95) +
          blurStreak(150, 140, 46, "#2f2536", 0.9) +
          blurStreak(150, 250, 78, "#241c2b", 0.95) +
          `<ellipse cx="150" cy="195" rx="50" ry="98" fill="#191320" opacity="0.85"/>` +
          `<circle cx="138" cy="140" r="3" fill="#e8e2d4" opacity="0.5"/><circle cx="163" cy="140" r="3" fill="#e8e2d4" opacity="0.5"/>`,
        { aspect: "portrait", base: "#0d0a10", grain: 0.2 },
      ),
      evidenceLabel: "Deleted photo whose EDIT timestamp is two minutes BEFORE it was taken",
    },
    {
      id: "c4-ph-receipt",
      caption: "216 nights. the till has never once been off. exact change is its own kind of threat",
      timestamp: "2025-11-07T04:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-07T04:20:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#131014"/>` +
          `<rect x="75" y="50" width="150" height="300" fill="#d8d2c2" opacity="0.9"/>` +
          `<text x="150" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#3a382f">PELL'S — ALL NITE</text>` +
          `<text x="90" y="115" font-family="monospace" font-size="10" fill="#55503f">1 RYE TOAST, DRY</text>` +
          `<text x="90" y="135" font-family="monospace" font-size="10" fill="#55503f">1 EGG, RAW, SHELL ON</text>` +
          `<text x="90" y="155" font-family="monospace" font-size="10" fill="#55503f">1 COFFEE, BLACK, COLD</text>` +
          `<text x="90" y="185" font-family="monospace" font-size="10" fill="#3a382f">TOTAL……… $4.44</text>` +
          `<text x="90" y="205" font-family="monospace" font-size="10" fill="#3a382f">TENDERED…… $4.44</text>` +
          `<text x="90" y="235" font-family="monospace" font-size="10" fill="#7a3a42">TIP………… $4.44</text>` +
          `<text x="150" y="290" text-anchor="middle" font-family="monospace" font-size="9" fill="#8b8371">THANK YOU · COME AGAIN</text>` +
          `<text x="150" y="308" text-anchor="middle" font-family="monospace" font-size="9" fill="#8b8371">VISIT 215</text>`,
        { aspect: "portrait", base: "#0e0b0f", grain: 0.1 },
      ),
      evidenceLabel: "His receipt: rye toast dry, one raw egg shell-on, cold black coffee — $4.44, visit 215",
    },
    {
      id: "c4-ph-pie",
      caption: "cherry pie case restocked. the 4am nurses deserve beauty",
      timestamp: "2025-10-20T03:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-20T03:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#16121a"/>` +
          `<rect x="60" y="80" width="280" height="160" rx="10" fill="#0f0d14"/>` +
          `<rect x="70" y="90" width="260" height="140" rx="6" fill="#1a151f" opacity="0.7"/>` +
          Array.from({ length: 3 }, (_, i) => `<ellipse cx="${130 + i * 70}" cy="150" rx="30" ry="14" fill="#4a2530"/><ellipse cx="${130 + i * 70}" cy="144" rx="26" ry="10" fill="#6b3040"/>`).join("") +
          `<rect x="60" y="170" width="280" height="4" fill="#241e2b"/>` +
          Array.from({ length: 3 }, (_, i) => `<ellipse cx="${130 + i * 70}" cy="205" rx="30" ry="14" fill="#3d2b1c"/><ellipse cx="${130 + i * 70}" cy="199" rx="26" ry="10" fill="#57422a"/>`).join(""),
        { aspect: "landscape", base: "#100d13", grain: 0.12 },
      ),
    },
    {
      id: "c4-ph-schedule",
      caption: "sal's handwriting vs the laws of legibility",
      timestamp: "2025-11-01T16:10:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-01T16:10:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#15120f"/>` +
          `<rect x="40" y="60" width="220" height="290" fill="#cfc7b2" opacity="0.85"/>` +
          `<text x="150" y="90" text-anchor="middle" font-family="monospace" font-size="12" fill="#3a3427">NOVEMBER — NIGHTS</text>` +
          Array.from({ length: 9 }, (_, i) => `<path d="M60 ${115 + i * 24} q 40 ${i % 2 ? 5 : -5} 90 0 t 90 0" stroke="#55503f" stroke-width="3" fill="none" opacity="0.75"/>`).join("") +
          `<text x="60" y="345" font-family="monospace" font-size="10" fill="#7a3a42">J.PELL — ALL OF THEM (her request)</text>`,
        { aspect: "portrait", base: "#0f0d0a", grain: 0.09 },
      ),
    },
    {
      id: "c4-ph-jukebox",
      caption: "it plays one song at 4am that isn't on the tracklist card. ambrose won't talk about it",
      timestamp: "2025-10-30T04:04:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-30T04:04:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#120f16"/>` +
          `<path d="M70 360 V160 Q70 90 150 90 Q230 90 230 160 V360 Z" fill="#241c2b"/>` +
          `<path d="M90 340 V170 Q90 115 150 115 Q210 115 210 170 V340 Z" fill="#171220"/>` +
          `<rect x="105" y="200" width="90" height="60" rx="6" fill="#2c2138"/>` +
          `<circle cx="150" cy="150" r="22" fill="#3d2b45" opacity="0.8"/>` +
          `<circle cx="150" cy="150" r="10" fill="#57406b" opacity="0.7"/>`,
        { aspect: "portrait", base: "#0d0a11", grain: 0.15 },
      ),
    },
    {
      id: "c4-ph-parkinglot",
      caption: "",
      timestamp: "2025-11-11T04:07:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-11T04:07:00", device: "This phone", location: "Pell's Diner lot" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060708"/>` +
          `<circle cx="200" cy="80" r="26" fill="#3a3628" opacity="0.25"/>` +
          blurStreak(200, 230, 100, "#101318", 0.4),
        { aspect: "landscape", base: "#050608", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0b0c10"/>` +
            `<rect x="180" y="40" width="8" height="120" fill="#15141a"/>` +
            `<circle cx="184" cy="52" r="20" fill="#8a7c48" opacity="0.5"/>` +
            `<rect y="240" width="400" height="60" fill="#0e0f13"/>` +
            figure(184, 225, 1.0, 0.9, "#060509") +
            `<ellipse cx="184" cy="238" rx="30" ry="6" fill="#000" opacity="0.7"/>` +
            `<text x="184" y="270" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a4453">no shadow faces the light</text>` +
            timestampBurn("04:07:44", 400, 300),
          { aspect: "landscape", base: "#090a0d", grain: 0.12 },
        ),
      },
      evidenceLabel: "Her last photo, the night before: him under the lot light — lit, and still not visible",
    },
    {
      id: "c4-ph-firstday",
      caption: "first shift, sept 2. gran's old apron. name tag says PELL like the sign. like I belong to the building a little",
      timestamp: "2025-09-02T21:55:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-02T21:55:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#191419"/>` +
          `<rect x="90" y="130" width="120" height="200" rx="14" fill="#4a2530"/>` +
          `<rect x="110" y="150" width="80" height="90" rx="8" fill="#5c2f3c"/>` +
          `<rect x="120" y="165" width="60" height="14" rx="3" fill="#d8d2c2" opacity="0.85"/>` +
          `<text x="150" y="176" text-anchor="middle" font-family="monospace" font-size="10" fill="#3a2228">PELL</text>` +
          `<circle cx="150" cy="105" r="26" fill="#3d3138"/>`,
        { aspect: "portrait", base: "#120e12", grain: 0.12 },
      ),
    },
    {
      id: "c4-ph-tickets",
      caption: "",
      timestamp: "2025-11-12T04:06:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-12T04:06:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#100d12"/>` +
          `<rect x="40" y="80" width="220" height="10" fill="#241e2b"/>` +
          Array.from({ length: 5 }, (_, i) => `<rect x="${50 + i * 42}" y="90" width="34" height="60" fill="#d8d2c2" opacity="${0.9 - i * 0.05}" transform="rotate(${(i % 2 ? 2 : -2)} ${67 + i * 42} 120)"/>`).join("") +
          Array.from({ length: 5 }, (_, i) => `<text x="${58 + i * 42}" y="115" font-family="monospace" font-size="7" fill="#55503f">RYE</text><text x="${58 + i * 42}" y="128" font-family="monospace" font-size="7" fill="#55503f">EGG</text><text x="${58 + i * 42}" y="141" font-family="monospace" font-size="7" fill="#7a3a42">4:44</text>`).join(""),
        { aspect: "portrait", base: "#0b090e", grain: 0.16 },
      ),
      evidenceLabel: "Deleted photo, 4:06 AM: five identical tickets on the rail — all timestamped 4:44, which hadn't happened yet",
    },
  ],

  notes: [
    {
      id: "c4-n-order",
      title: "his order",
      timestamp: "2025-11-09T04:50:00",
      evidenceLabel: "A note that is his order, written over and over — 42 times",
      body:
        "rye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\nrye toast dry. one egg raw shell on. coffee black cold.\n\n(I don't remember writing this page. it's my handwriting. the pen was in my apron. I don't remember any of the 42 times.)",
    },
    {
      id: "c4-n-counting",
      title: "counting",
      timestamp: "2025-11-10T05:20:00",
      lock: {
        code: "4444",
        hintText: "“it's always the same number.” — his booth, his change, his tip, his hour.",
        clueSourceIds: ["c4-ph-receipt", "c4-th-theo"],
      },
      evidenceLabel: "Her locked note: the count, and what the count is FOR",
      body:
        "visit log (started sept, backfilled from till tape):\nsept: 174 → 203. oct: 204 → 212. nov so far: 213, 214, 215.\n\ntill tape goes back 7 years in the office. he's on ALL of it. before that it's paper, and he's on the paper. gran's dad's ledger from 1961, first week open: 'booth 4 gentleman, 4:00, exact change. again.' AGAIN. on week ONE.\n\nthings that are always 4: his booth. his hour. his total. his tip. the number of seconds ambrose says the floor 'goes quiet' when I'm not looking at it.\n\nfound the loyalty card program great-gramps started in '61. paper cards, punch holes. in the office safe there's ONE card, older than the safe, more holes than card. someone kept punching it. someone kept HONORING it.\n\nthe card says: FREE ITEM AT 216.\n\nhis 216th visit is tomorrow night. I'm going to be the one holding the coffee pot. I want to know what he redeems. gran said never count. gran also stayed a waitress here 40 years and never took a night off and I never asked why.\n\nif I don't write tomorrow's entry: the card is in the safe. the safe code is the year. don't honor the card. bury the card.",
    },
    {
      id: "c4-n-tips",
      title: "tip jar math",
      timestamp: "2025-11-06T06:15:00",
      evidenceLabel: "Her tip-jar math: plans stretching weeks past the night she vanished",
      body: "gran's hip: paid ✓\ncar insurance: $210 by the 20th\ntheo's bday: the record player fund, $40/week\n\nhis $4.44 × 216 nights = $959.04 exactly. almost a grand. from one booth. rent math wins again. (it's fine. it's fine.)",
    },
    {
      id: "c4-n-recipes",
      title: "gran's pie crust (do not lose)",
      timestamp: "2025-09-03T12:00:00",
      evidenceLabel: "Gran's “diner tithe” — the last slice never gets sold",
      body: "3 cups flour, frozen butter GRATED not cubed\nice water, less than you think\nrest it an hour. no shortcuts. pie knows.\n\ngran's rule: last slice of the night never gets sold. leave it in the case til morning. 'diner tithe.' every diner has one, she says. ours is just older than most.",
    },
  ],

  voicemails: [
    {
      id: "c4-vm-theo",
      callerLabel: "Theo 💛",
      callerNumber: "(775) 555-0126",
      timestamp: "2025-11-12T06:02:00",
      durationSec: 25,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Hey. You didn't call and now Ambrose is calling ME and not making sense. I'm getting in the car. June, whatever's going on, we'll — I'm bringing your jacket, it's cold. Stay put. Stay somewhere. Just stay.”",
    },
    {
      id: "c4-vm-sal",
      callerLabel: "Sal (manager)",
      callerNumber: "(775) 555-0117",
      timestamp: "2025-11-12T07:30:00",
      durationSec: 30,
      tone: "plain",
      evidenceLabel: "Sal: the clock-out override used his code — from inside the diner, while he slept at home",
      transcript:
        "[automated transcript — audio partially recovered]\n“Kid, it's Sal. Cops are asking who overrode your clock-out. It's my manager code, June. Mine. Used at 4:11 from the office terminal. I was asleep at home, my keys were on my nightstand, and the office was locked from the — [pause] I never told you the rule's whole wording. It's 'booth 4 gets served first, gets left alone, and gets what's owed.' I should've said the whole thing. Call me.”",
    },
    {
      id: "c4-vm-gran",
      callerLabel: "Gran 🥧",
      callerNumber: "(775) 555-0101",
      timestamp: "2025-11-12T09:15:00",
      durationSec: 36,
      tone: "distorted",
      evidenceLabel: "Gran's voicemail: what her father traded in 1961",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Junie. It's gran. If you're hearing this, hear all of it. In '61 the diner was three weeks from the bank taking it. My dad was a proud man and a scared one and something offered him regular business. Steady custom, it called itself. One booth, one order, one bill, always even. The only terms were the rule and the card. He thought he was clever — he thought 216 was so many visits it would outlive him. It outlived him. It outlives everybody, June. It's not owed a free item. It's owed a — [static] — DON'T HONOR THE—”\n[end of message]",
    },
    {
      id: "c4-vm-diner",
      callerLabel: "Pell's Diner (landline)",
      callerNumber: "(775) 555-0161",
      timestamp: "2025-11-12T04:44:00",
      durationSec: 58,
      tone: "breathing",
      evidenceLabel: "A voicemail from the diner's own landline at 4:44 — her voice, taking his order, after she was gone",
      transcript:
        "[automated transcript — speaker identification: PELL, JUNE R. (98% confidence)]\n[diner ambiance. the jukebox, playing the song that isn't on the card]\n“…okay. rye toast, dry. one egg, raw, shell on. coffee — black. cold.” [sound of a pen] “…and that's everything? that's really everything?”\n[a pause of eleven seconds. no second voice is ever recorded.]\n“oh.” [the pen stops] “it's me?”\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: at 04:44 the subject had been missing for 33 minutes. The diner phone's hook switch was recorded by CCTV as DOWN for the entire minute of the call.",
    },
    {
      id: "c4-vm-robocall",
      callerLabel: "(800) 555-0122",
      timestamp: "2025-11-10T13:00:00",
      durationSec: 15,
      tone: "static",
      transcript:
        "[automated transcript]\n“Congratulations! You've been selected for a complimentary… [remainder unrecoverable]”",
    },
  ],

  calendarEvents: [
    { id: "c4-cal-shift", title: "graveyard 10pm–6am 🍒", date: "2025-11-01", time: "22:00", recurring: "daily", createdBy: "owner" },
    { id: "c4-cal-theo", title: "call theo on break", date: "2025-11-01", time: "04:30", recurring: "daily", createdBy: "owner" },
    { id: "c4-cal-gran", title: "SUNDAY — gran tells the story. bring theo.", date: "2025-11-16", time: "10:00", createdBy: "owner", evidenceLabel: "Sunday: Gran was going to tell her the whole story. She vanished on Wednesday." },
    {
      id: "c4-cal-yourtable",
      title: "your table",
      date: "2025-09-02",
      time: "04:00",
      recurring: "daily",
      createdBy: "unknown",
      detail: "Appeared the day of her first shift. No reminder, no account, no creator.",
      evidenceLabel: "A daily 4:00 AM event, “your table” — created the day she started",
    },
    { id: "c4-cal-insurance", title: "car insurance $210", date: "2025-11-20", time: "09:00", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c4-pin-home", label: "Home — Delucca St apt 3", timestamp: "2025-11-11T14:00:00", x: 25, y: 30 },
    { id: "c4-pin-laundry", label: "Spin City Laundry", timestamp: "2025-11-11T15:30:00", x: 33, y: 44 },
    { id: "c4-pin-diner1", label: "Pell's Diner", timestamp: "2025-11-11T21:52:00", x: 70, y: 65 },
    {
      id: "c4-pin-diner2",
      label: "Pell's Diner — booth 4",
      timestamp: "2025-11-12T04:07:00",
      x: 70,
      y: 65,
      detail: "Final indoor fix. Precision: 0.4m — the phone was AT the booth, though it was recovered at the register, and Ambrose swears she never carried it to the floor.",
      evidenceLabel: "Her phone's final fix: inside booth 4, at 4:07",
    },
    {
      id: "c4-pin-far",
      label: "Unlabeled fix",
      timestamp: "2025-11-12T04:11:00",
      x: 96,
      y: 4,
      detail: "Four minutes later: a single fix 312 miles northeast, in open desert. No road. The next fix is the register counter, as if neither trip happened.",
      evidenceLabel: "A single GPS fix 312 miles away — four minutes after booth 4",
    },
  ],

  browserHistory: [
    { id: "c4-b-change", query: "customer always pays exact change every time is that weird", timestamp: "2025-10-06T05:20:00" },
    { id: "c4-b-blur", query: "one person always blurry in photos camera fine", timestamp: "2025-11-05T05:02:00", evidenceLabel: "Search: why one person is always blurry when the camera is fine" },
    { id: "c4-b-face", query: "condition where you can't remember one specific face", timestamp: "2025-11-06T05:40:00" },
    { id: "c4-b-diner", query: "pell's diner route 9 history 1961 owner", timestamp: "2025-11-09T22:30:00" },
    { id: "c4-b-bank", query: "route 9 diners that closed 1961 bank foreclosures", timestamp: "2025-11-09T23:15:00", evidenceLabel: "She researched which Route 9 diners the bank took in 1961 — all of them, except Pell's" },
    { id: "c4-b-loyalty", query: "old diner loyalty punch card programs 1960s", timestamp: "2025-11-10T05:45:00" },
    { id: "c4-b-216", query: "significance of the number 216", timestamp: "2025-11-10T06:02:00" },
    { id: "c4-b-last", query: "what do I say when he asks", timestamp: "2025-11-12T04:06:00", evidenceLabel: "Her last search, 4:06 AM: “what do I say when he asks”" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "TipCount",
    revealAfterClueIds: ["c4-th-gran", "c4-n-order"],
    title: "Regulars",
    heading: "Loyalty ledger · Pell's · est. 1961",
    body:
      "This app has no developer, no install date, and no storage footprint. Its icon has been on every phone that ever clocked a graveyard shift at Pell's, according to the two former waitresses who would still answer calls.\n\nIt tracks one customer.",
    entries: [
      { label: "Visits 1–52 (1961)", status: "HONORED", detail: "E. Pell, proprietor · founding terms" },
      { label: "Visits 53–4,388", status: "HONORED", detail: "staff rotation · terms maintained" },
      { label: "Visit 23,214 (Sept 2)", status: "NOTED", detail: "new server: PELL, J. — family rate applies" },
      { label: "Visits 23,215–23,428", status: "HONORED", detail: "counted by server (deviation)" },
      { label: "Visit 23,429 — “216”", status: "REDEEMED", detail: "loyalty reward: take one (1)" },
      { label: "Next cycle", status: "OPEN", detail: "card reissued · new count begins at 1" },
    ],
    footer:
      "“216” was only ever HER count — the visits since June started counting. The card counts servers, not sandwiches. It has been redeemed four times since 1961. Pell's has had four waitresses leave 'suddenly.' The new count begins at 1.",
    evidenceLabel: "The “Regulars” ledger: reward at 216 — “take one (1)” — REDEEMED",
  },

  liveEvents: [
    {
      id: "c4-live-unknown",
      kind: "message",
      afterSeconds: 300,
      threadId: "c4-th-unknown",
      message: {
        id: "c4-m-un-live",
        from: "them",
        text: "table for one?",
        timestamp: "2025-11-14T22:35:00",
        evidenceLabel: "From the diner's landline, to whoever holds the phone now: “table for one?”",
      },
    },
    {
      id: "c4-live-order",
      kind: "notification",
      afterSeconds: 660,
      title: "DineShift",
      body: "A shift has been posted matching your availability: PELL'S — NIGHTS.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c4-v-left",
      label: "She walked out mid-shift",
      description: "Night shifts, money stress, a boyfriend begging her to quit. People leave through the back door of their own lives all the time.",
      requiredEvidenceIds: ["c4-m-th-9", "c4-n-tips", "c4-m-tx-2"],
      isCanon: false,
      epilogue:
        "Burnout, 4 AM, a door with a bell that maybe didn't ring because maybe nobody was listening hard enough. You write it and it reads fine until the exhibits page, where it sits next to a coffee pot that was still rocking and a taxi company holding a book she never came back for.\n\nTheo doesn't accept it, then does, then doesn't again, on a loop that is its own kind of graveyard shift. He keeps her jacket in his car. In March he drives past the diner at 4 AM, once, just to be past it — and the neon is on, and the lot is empty, and booth 4's window seat is, he swears, not.",
    },
    {
      id: "c4-v-stalker",
      label: "A human predator studied her",
      description: "Someone phoned about her shifts. Someone had Sal's override code. Someone spent months becoming a fixture until the fixture could reach the register.",
      requiredEvidenceIds: ["c4-m-sa-6", "c4-m-ds-2", "c4-vm-sal"],
      isCanon: false,
      epilogue:
        "The human version: a methodical man with access — the shift-pattern call, the stolen override code, months of desensitizing the staff to his presence until 'the booth 4 guy' was furniture. Furniture can wait by a register. Furniture can follow a waitress into a four-second blind spot.\n\nIt survives review because nothing in it is impossible, only everything in it is unsupported. No print on the office terminal. No vehicle on the lot camera, not one, for six hours. The shift-pattern caller phoned from the diner's own line while the diner's own line was recorded as idle.\n\nThe file stays open. So does the diner. The new night waitress lasts nine days and quits without picking up her check. She won't say why. She'll only say she stopped bringing her phone inside.",
    },
    {
      id: "c4-v-family",
      label: "The Pells have been paying for the diner since 1961",
      description: "Great-grandfather's terms, Gran's rules, Sal's inherited silence. The family knew what kept the lights on, and June was the bill coming due.",
      requiredEvidenceIds: ["c4-m-mo-5", "c4-m-gr-3", "c4-vm-gran", "c4-n-recipes"],
      isCanon: false,
      epilogue:
        "You write it as a debt the family serviced with silence: a founder's bargain, a rule passed down with the fryers, a 'diner tithe' dressed up as a pie tradition, and four waitresses across six decades who left 'suddenly' — always family, or close enough to family to wear the name tag.\n\nGran reads your report with her jaw set and corrects exactly one thing: 'We didn't know. We ALMOST knew. There's a difference, and the difference is the whole trick of it. It only ever takes from people who almost know.'\n\nThe family puts the diner up for sale. The listing sits for a year. Every offer, all cash, exact asking price, comes from a buyer whose paperwork is flawless and whose name no one can afterward remember. They take it off the market. Somebody has to keep the rule.",
    },
    {
      id: "c4-v-customer",
      label: "The customer redeemed his card",
      description: "216 was never his count of sandwiches. It was a count of something else, and the count completed.",
      requiredEvidenceIds: ["case-04.hidden", "c4-ph-tickets", "c4-vm-diner", "c4-pin-far", "c4-n-counting"],
      isCanon: true,
      epilogue:
        "You file the only report the evidence will actually carry: at 4:07 AM, June Pell served visit 216, and at 4:11 the loyalty program of Pell's Diner — older than the safe it lived in, patient beyond the meaning of the word — was honored, per the founding terms, in full.\n\nNo section of your report survives editing. What survives is the inventory list, and on it, one line nobody strikes: 'paper punch card, heavily used, recovered from open safe. Final hole punched. Card reads: NEW CARD ISSUED ON REDEMPTION.'\n\nThe new card is never found. The diner still opens at night. Ambrose works days now and won't say the number four out loud, which makes calling orders hard, and nobody makes him. The last slice of pie still stays in the case till morning. In the morning it is always gone, and the plate is always clean, and there is always exact change beside it.\n\nWhat the report can't hold, you keep: the voicemail. Eleven seconds of silence where a second voice should be, and June's, small but not afraid, at the end: 'oh. it's me?' You've listened past the end-of-message tone more than once. You'll do it again tonight.",
    },
  ],
};

export default c4;
