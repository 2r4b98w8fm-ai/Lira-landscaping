import type { CaseFile } from "../types";
import { photoSvg, figure, doorway, timestampBurn } from "../photoart";

/**
 * CASE 05 — SECOND SHIFT
 * Omar Reyes-Vance, 34. Forklift operator, graveyard shift, Meridian
 * Fulfillment Center 6. His badge kept clocking him into a shift that
 * payroll says was cancelled months before he disappeared inside it.
 */

const c5: CaseFile = {
  id: "case-05",
  title: "Second Shift",
  victimName: "Omar Reyes-Vance, 34",
  summary:
    "A warehouse worker's badge logs show him clocking into 'Shift C' — a graveyard rotation payroll cancelled in July. The building says he badged out at 6:02 AM the night he vanished. The parking lot camera says his truck never left. Neither did he.",
  intake:
    "SUBJECT: Reyes-Vance, Omar D. (34). Reported missing by his union rep, Nov 20, after failing to appear at a grievance hearing HE requested.\n\nDEVICE: Recovered Nov 19 from locker 118, Meridian Fulfillment Center 6 (MFC-6). Battery 52%. Locker was badge-sealed; facility required a subpoena to open it.\n\nEMPLOYER RECORDS: Payroll shows Shift C (22:00–06:00) 'eliminated' effective July 14. Badge telemetry shows subject badging into Shift C 41 times AFTER that date — each entry paired with a badge-out at 06:02 exactly. Meridian's counsel calls the telemetry 'legacy system noise' and has declined further records requests.\n\nNOTES: Three other MFC-6 workers have separated 'voluntarily' since July without collecting final paychecks. Second-pass review requested. Meridian's counsel is copied on nothing.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "O.R.V. — if found return to locker 118",
    recoveredAt: "2025-11-21T23:40:00",
    batteryStart: 52,
    wallpaperHue: 24,
    lockScreenNotifications: [
      { appId: "messages", title: "Denise (union)", preview: "Omar you missed your OWN hearing. Call me. Now.", targetId: "c5-th-denise" },
      { appId: "messages", title: "Meridian Scheduling", preview: "Reminder: SHIFT C tonight 22:00. Door 9.", targetId: "c5-th-sched" },
      { appId: "phone", title: "Voicemail", preview: "Luz ❤ · 0:31", targetId: "c5-vm-luz" },
    ],
  },

  messages: [
    {
      id: "c5-th-luz",
      contactName: "Luz ❤",
      contactNumber: "(216) 555-0148",
      messages: [
        { id: "c5-m-lz-1", from: "them", text: "mateo lost the other front tooth. he wants to show you before school. be home by 7 or the tooth waits for NO man", timestamp: "2025-10-14T21:30:00" },
        { id: "c5-m-lz-2", from: "owner", text: "tell the tooth 6:45. I don't miss teeth", timestamp: "2025-10-14T21:41:00" },
        { id: "c5-m-lz-3", from: "them", text: "you got home at NINE omar. mateo showed the tooth to the mailman", timestamp: "2025-10-15T10:02:00" },
        {
          id: "c5-m-lz-4",
          from: "owner",
          text: "I know. I know. they held us for a 'system reconcile' after badge-out. two hours in the break room, phones in the bin by the door. I'm sorry. it's the new thing on C",
          timestamp: "2025-10-15T10:20:00",
          evidenceLabel: "Workers held for hours after badge-out, phones confiscated — “the new thing on C”",
        },
        { id: "c5-m-lz-5", from: "them", text: "they can't HOLD you. that's not a job that's a", timestamp: "2025-10-15T10:22:00" },
        { id: "c5-m-lz-6", from: "owner", text: "it's overtime pay and I'm not making waves til the grievance lands. denise says document everything. I'm documenting EVERYTHING mi amor. trust me", timestamp: "2025-10-15T10:31:00" },
        { id: "c5-m-lz-7", from: "them", text: "supper's in the fridge. mateo drew you on the fridge too. you have four arms, apparently that's how much work you do", timestamp: "2025-11-17T20:15:00" },
        { id: "c5-m-lz-8", from: "owner", text: "four arms would help on C tonight. love you both. home by 7. I mean it this time", timestamp: "2025-11-17T21:02:00", evidenceLabel: "His last text to his wife: “home by 7. I mean it this time”" },
        { id: "c5-m-lz-9", from: "them", text: "it's 8. tooth #3 is loose. clock's ticking papa", timestamp: "2025-11-18T08:04:00" },
        { id: "c5-m-lz-10", from: "them", text: "omar it's noon", timestamp: "2025-11-18T12:00:00" },
        { id: "c5-m-lz-11", from: "them", text: "the plant says you badged out at 6:02. YOUR TRUCK IS STILL THERE OMAR. I'm at the gate and they won't let me past the gate", timestamp: "2025-11-18T17:40:00", evidenceLabel: "Luz at the gate: badge says he left at 6:02, his truck never moved" },
      ],
    },
    {
      id: "c5-th-denise",
      contactName: "Denise (union)",
      contactNumber: "(216) 555-0175",
      messages: [
        { id: "c5-m-dn-1", from: "them", text: "got your email. so let me get this straight: payroll KILLED shift C in july, but you're still being scheduled onto it, badged onto it, and worked on it — just not PAID on it?", timestamp: "2025-10-20T11:15:00" },
        { id: "c5-m-dn-2", from: "owner", text: "paid, but it posts as 'retro adjustment' with no shift code. like the hours happened nowhere. 41 shifts of nowhere", timestamp: "2025-10-20T11:28:00", evidenceLabel: "41 shifts paid as “retro adjustments” — hours that officially happened nowhere" },
        { id: "c5-m-dn-3", from: "them", text: "that's wage theft with extra steps or something worse. who else is on C?", timestamp: "2025-10-20T11:30:00" },
        {
          id: "c5-m-dn-4",
          from: "owner",
          text: "that's the thing. rostered: 14 of us. on the floor I count 8, maybe 9. the badge board in the office shows all 14 IN. every night. I asked marcus where the other five badge from and he laughed wrong and changed lanes",
          timestamp: "2025-10-20T11:44:00",
          evidenceLabel: "14 badges clock in nightly; only 8 or 9 workers are ever on the floor",
        },
        { id: "c5-m-dn-5", from: "them", text: "names. get me the five names", timestamp: "2025-10-20T11:46:00" },
        { id: "c5-m-dn-6", from: "owner", text: "getting them. also getting photos of the door 9 annex. the 'decommissioned' one that gets fresh pallet wrap every week", timestamp: "2025-10-20T11:52:00" },
        { id: "c5-m-dn-7", from: "them", text: "filed. hearing set for nov 20, 10am, MY office not theirs. bring the phone, bring the photos, bring yourself. mostly yourself", timestamp: "2025-11-10T16:00:00" },
        { id: "c5-m-dn-8", from: "them", text: "Omar you missed your OWN hearing. Call me. Now.", timestamp: "2025-11-20T10:25:00" },
      ],
    },
    {
      id: "c5-th-sched",
      contactName: "Meridian Scheduling",
      messages: [
        { id: "c5-m-sc-1", from: "them", text: "MERIDIAN: Effective 7/14, SHIFT C is eliminated. Affected associates: see your app for reassignment. Thank you for your flexibility!", timestamp: "2025-07-11T09:00:00", evidenceLabel: "Official notice: Shift C eliminated July 14" },
        { id: "c5-m-sc-2", from: "them", text: "Reminder: SHIFT C tonight 22:00. Door 9.", timestamp: "2025-07-15T18:00:00", evidenceLabel: "The day after elimination: “Reminder: SHIFT C tonight. Door 9.”" },
        { id: "c5-m-sc-3", from: "owner", text: "shift C was eliminated?? per your own message??", timestamp: "2025-07-15T18:10:00" },
        { id: "c5-m-sc-4", from: "them", text: "Reminder: SHIFT C tonight 22:00. Door 9.", timestamp: "2025-07-15T18:11:00" },
        { id: "c5-m-sc-5", from: "them", text: "Reminder: SHIFT C tonight 22:00. Door 9.", timestamp: "2025-11-17T18:00:00" },
      ],
    },
    {
      id: "c5-th-marcus",
      contactName: "Marcus (C shift)",
      contactNumber: "(216) 555-0192",
      ghostTypingAfterSeconds: 360,
      messages: [
        { id: "c5-m-mc-1", from: "them", text: "you bringing the good thermos tonight or the sad thermos", timestamp: "2025-09-30T20:10:00" },
        { id: "c5-m-mc-2", from: "owner", text: "the good one. luz made café de olla. you get ONE cup", timestamp: "2025-09-30T20:22:00" },
        { id: "c5-m-mc-3", from: "owner", text: "real question. tonight during the 3am 'reconcile' — where did aisle Q's crew go? I watched the badge board. their dots stayed green. the aisle was EMPTY marcus", timestamp: "2025-10-29T08:15:00", evidenceLabel: "Aisle Q's crew vanished mid-shift while their badge dots stayed green" },
        { id: "c5-m-mc-4", from: "them", text: "man. don't watch the board", timestamp: "2025-10-29T08:31:00" },
        { id: "c5-m-mc-5", from: "owner", text: "marcus", timestamp: "2025-10-29T08:32:00" },
        {
          id: "c5-m-mc-6",
          from: "them",
          text: "look. rule of C: the board is the shift. not us. the BOARD. as long as your dot's green you're fine. tomas watched the board. tomas asked about door 9. tomas 'transferred to the dayton site.' you ever meet anybody who came from dayton? anybody who's BEEN?",
          timestamp: "2025-10-29T08:40:00",
          evidenceLabel: "Marcus: workers who ask about door 9 get “transferred to Dayton” — a site no one's ever seen",
        },
        { id: "c5-m-mc-7", from: "owner", text: "denise is going to want you to say that on a form", timestamp: "2025-10-29T08:44:00" },
        { id: "c5-m-mc-8", from: "them", text: "denise doesn't work under the board, brother. delete this thread", timestamp: "2025-10-29T08:45:00" },
      ],
    },
    {
      id: "c5-th-hr",
      contactName: "Meridian People Team",
      messages: [
        { id: "c5-m-hr-1", from: "them", text: "Hi Omar! We saw your ticket about badge discrepancies. Great news — we've closed it as resolved! 🎉", timestamp: "2025-10-22T14:00:00" },
        { id: "c5-m-hr-2", from: "owner", text: "resolved how? nothing changed. I didn't even get a call", timestamp: "2025-10-22T14:20:00" },
        { id: "c5-m-hr-3", from: "them", text: "Hi Omar! We saw your ticket about badge discrepancies. Great news — we've closed it as resolved! 🎉", timestamp: "2025-10-22T14:21:00", evidenceLabel: "HR's bot answering every question with the same closed-ticket message" },
        { id: "c5-m-hr-4", from: "them", text: "Hi Omar! A wellness resource: remember, associates who rest well, work well! Your Shift C attendance is excellent. Keep it up!", timestamp: "2025-11-12T09:00:00", evidenceLabel: "HR praising “excellent attendance” on a shift HR says doesn't exist" },
      ],
    },
    {
      id: "c5-th-tomas",
      contactName: "Tomas (transferred?)",
      contactNumber: "(216) 555-0157",
      messages: [
        { id: "c5-m-tm-1", from: "owner", text: "tomas. it's omar from C. heard you transferred to dayton. how is it out there man", timestamp: "2025-09-18T13:30:00" },
        { id: "c5-m-tm-2", from: "owner", text: "tomas?", timestamp: "2025-09-25T17:10:00" },
        {
          id: "c5-m-tm-3",
          from: "them",
          text: "Omar! Dayton is great. The team is great. Tell everyone C shift says hi. — Tomas",
          timestamp: "2025-09-25T17:11:00",
          evidenceLabel: "“Tomas” replying in seconds, signing his own name — “Tell everyone C shift says hi”",
        },
        { id: "c5-m-tm-4", from: "owner", text: "tomas you've called me 'oso' for six years. also you replied in 40 seconds at 5pm. you never once had your phone on the floor", timestamp: "2025-09-25T17:15:00" },
        { id: "c5-m-tm-5", from: "them", text: "Omar! Dayton is great. The team is great. Tell everyone C shift says hi. — Tomas", timestamp: "2025-09-25T17:16:00" },
      ],
    },
    {
      id: "c5-th-mama",
      contactName: "Mamá",
      contactNumber: "(216) 555-0103",
      messages: [
        { id: "c5-m-mm-1", from: "them", text: "Mijo, Sunday you eat here. Bring Luz and the tooth child.", timestamp: "2025-11-09T12:00:00" },
        { id: "c5-m-mm-2", from: "owner", text: "we'll be there mamá. save me the crispy rice", timestamp: "2025-11-09T12:30:00" },
        { id: "c5-m-mm-3", from: "them", text: "You looked thin Sunday. That place works you like a machine. You are not a machine, Omar.", timestamp: "2025-11-10T09:15:00" },
        { id: "c5-m-mm-4", from: "owner", text: "I know mamá. after the hearing on the 20th it gets better. one way or another", timestamp: "2025-11-10T09:40:00" },
      ],
    },
    {
      id: "c5-th-carpool",
      contactName: "C Shift Carpool 🚗",
      messages: [
        { id: "c5-m-cp-1", from: "them", text: "Reggie: gas $12 each this week. venmo or cash in the cupholder, you animals", timestamp: "2025-11-03T19:00:00" },
        { id: "c5-m-cp-2", from: "owner", text: "cupholder. I'm old school", timestamp: "2025-11-03T19:12:00" },
        { id: "c5-m-cp-3", from: "them", text: "Reggie: anybody else get the survey? 'how satisfied are you with shift C (1-5)'. my man. shift C is CANCELLED", timestamp: "2025-11-08T14:20:00" },
        { id: "c5-m-cp-4", from: "them", text: "Priti: I put 5. you put 5 too. the 4s got follow-up meetings", timestamp: "2025-11-08T14:26:00", evidenceLabel: "Workers rating the cancelled shift 5/5 — because the 4s got “follow-up meetings”" },
      ],
    },
    {
      id: "c5-th-pawn",
      contactName: "Lakeview Pawn & Tool",
      messages: [
        { id: "c5-m-pw-1", from: "them", text: "Lakeview: Your layaway (trail camera, 2x SD) is paid off! Pick up anytime.", timestamp: "2025-11-05T10:00:00", evidenceLabel: "He bought a trail camera on layaway — two weeks before he vanished" },
        { id: "c5-m-pw-2", from: "owner", text: "picking up thursday. does it record in full dark? no visible light?", timestamp: "2025-11-05T10:15:00" },
        { id: "c5-m-pw-3", from: "them", text: "Lakeview: Yes sir, no-glow infrared. Deer will never know you're there. 🦌", timestamp: "2025-11-05T10:18:00" },
      ],
    },
    {
      id: "c5-th-osha",
      contactName: "OSHA Tip Line",
      messages: [
        { id: "c5-m-os-1", from: "owner", text: "I want to report a facility running an off-books night shift with confiscated phones and workers unaccounted for. Meridian Fulfillment Center 6, Lake Rd. What do you need from me?", timestamp: "2025-11-14T09:30:00", evidenceLabel: "His OSHA tip, six days before the hearing" },
        { id: "c5-m-os-2", from: "them", text: "Thank you for contacting the tip line. Your reference number is 7741-C. An investigator may contact you.", timestamp: "2025-11-14T09:32:00" },
        { id: "c5-m-os-3", from: "them", text: "Update on 7741-C: our records show this facility closed in 2019. Please verify the address and resubmit.", timestamp: "2025-11-15T11:00:00", evidenceLabel: "OSHA's records show MFC-6 closed in 2019 — while a thousand people work there nightly" },
      ],
    },
  ],

  photos: [
    {
      id: "c5-ph-fridge",
      caption: "four arms. son knows me",
      timestamp: "2025-11-17T20:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-17T20:20:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1c1f"/>` +
          `<rect x="50" y="40" width="200" height="330" rx="10" fill="#2a2e33"/>` +
          `<rect x="70" y="70" width="160" height="200" fill="#d8d2c2" opacity="0.9"/>` +
          `<circle cx="150" cy="120" r="18" fill="none" stroke="#c0392b" stroke-width="4"/>` +
          `<path d="M150 138 V210 M150 150 L110 130 M150 150 L190 130 M150 165 L112 185 M150 165 L188 185 M150 210 L128 250 M150 210 L172 250" stroke="#c0392b" stroke-width="4" stroke-linecap="round"/>` +
          `<path d="M143 114 L147 118 M157 114 L153 118" stroke="#c0392b" stroke-width="3"/>` +
          `<text x="150" y="245" text-anchor="middle" font-family="serif" font-size="12" fill="#3a5c8a">PAPA</text>`,
        { aspect: "portrait", base: "#141619", grain: 0.1 },
      ),
    },
    {
      id: "c5-ph-badge",
      caption: "badge #0118. eight years. they spelled my name right on the third try",
      timestamp: "2025-09-10T21:40:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-10T21:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect x="60" y="90" width="180" height="240" rx="14" fill="#20242a"/>` +
          `<rect x="80" y="110" width="140" height="24" fill="#c96f2b" opacity="0.85"/>` +
          `<text x="150" y="127" text-anchor="middle" font-family="monospace" font-size="11" fill="#141619">MERIDIAN</text>` +
          `<rect x="95" y="150" width="70" height="85" fill="#3a4048"/>` +
          `<text x="95" y="265" font-family="monospace" font-size="12" fill="#9aa3af">REYES-VANCE, O.</text>` +
          `<text x="95" y="285" font-family="monospace" font-size="12" fill="#9aa3af">ASSOC #0118 · C</text>` +
          `<rect x="95" y="300" width="110" height="14" fill="#0e1013"/>`,
        { aspect: "portrait", base: "#15171b", grain: 0.1 },
      ),
      evidenceLabel: "His badge: Associate #0118, Shift C — the C never removed after “elimination”",
    },
    {
      id: "c5-ph-board",
      caption: "the badge board at 3:07am. count the green dots. now count the people you can hear",
      timestamp: "2025-10-29T03:07:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-29T03:07:00", device: "This phone", location: "MFC-6 floor office" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#101318"/>` +
          `<rect x="60" y="50" width="280" height="180" rx="8" fill="#0a0c10"/>` +
          `<rect x="70" y="60" width="260" height="160" fill="#0d1116"/>` +
          Array.from({ length: 14 }, (_, i) => `<circle cx="${95 + (i % 7) * 36}" cy="${100 + Math.floor(i / 7) * 60}" r="7" fill="#3fa06b"/><rect x="${82 + (i % 7) * 36}" y="${115 + Math.floor(i / 7) * 60}" width="26" height="5" fill="#26303a"/>`).join("") +
          `<text x="200" y="85" text-anchor="middle" font-family="monospace" font-size="11" fill="#4a7a5c">SHIFT C — 14 IN · 0 OUT</text>`,
        { aspect: "landscape", base: "#0c0e12", grain: 0.14 },
      ),
      evidenceLabel: "The badge board: 14 green dots at 3 AM — on a floor with 8 people",
    },
    {
      id: "c5-ph-door9",
      caption: "door 9. 'decommissioned 2019.' fresh pallet wrap. fresh floor scuffs. decommissioned things don't get swept",
      timestamp: "2025-11-02T04:12:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-02T04:12:00", device: "This phone", location: "MFC-6 annex corridor" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#121419"/>` +
          doorway(70, 90, 160, 290, "#08090c") +
          `<rect x="70" y="90" width="160" height="290" fill="#15181e"/>` +
          `<rect x="70" y="220" width="160" height="30" fill="#1d222a"/>` +
          `<text x="150" y="70" text-anchor="middle" font-family="monospace" font-size="22" fill="#5c646f">9</text>` +
          `<rect x="85" y="330" width="130" height="8" fill="#c96f2b" opacity="0.25"/>` +
          `<path d="M90 370 q30 -6 60 0 t 60 0" stroke="#1f242b" stroke-width="6" fill="none"/>`,
        { aspect: "portrait", base: "#0e1014", grain: 0.15 },
      ),
      evidenceLabel: "Door 9: “decommissioned 2019,” swept floors, fresh wrap",
    },
    {
      id: "c5-ph-manifest",
      caption: "pallet manifest off a door 9 truck. no SKUs. no destination. just weights. why only weights",
      timestamp: "2025-11-09T03:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-09T03:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101115"/>` +
          `<rect x="50" y="50" width="200" height="300" fill="#cfc7b2" opacity="0.9"/>` +
          `<text x="150" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#3a3427">MERIDIAN — TRANSFER</text>` +
          `<text x="150" y="98" text-anchor="middle" font-family="monospace" font-size="9" fill="#55503f">ORIGIN: MFC-6 / DOOR 9</text>` +
          `<text x="150" y="112" text-anchor="middle" font-family="monospace" font-size="9" fill="#7a3a42">DEST: ——</text>` +
          Array.from({ length: 8 }, (_, i) => `<text x="70" y="${145 + i * 22}" font-family="monospace" font-size="10" fill="#55503f">UNIT ${i + 1} ………… ${(68 + ((i * 13) % 27)).toFixed(1)} kg</text>`).join("") +
          `<text x="70" y="330" font-family="monospace" font-size="9" fill="#3a3427">RECEIVED IN GOOD ORDER: (unsigned)</text>`,
        { aspect: "portrait", base: "#0c0d10", grain: 0.09 },
      ),
      evidenceLabel: "A door 9 manifest: no items, no destination — only eight weights, 68–95 kg",
    },
    {
      id: "c5-ph-breakroom",
      caption: "the 'reconcile' bin. your phone goes in, you go quiet, the clock does whatever it wants",
      timestamp: "2025-10-15T06:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-15T06:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#15171c"/>` +
          `<rect x="40" y="120" width="320" height="140" fill="#1c2026"/>` +
          `<rect x="150" y="80" width="100" height="60" rx="8" fill="#22272e"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="${160 + (i % 4) * 20}" y="${90 + Math.floor(i / 4) * 22}" width="14" height="18" rx="2" fill="#0d0f13"/>`).join("") +
          `<rect x="60" y="150" width="90" height="50" fill="#181c22"/>` +
          `<circle cx="330" cy="105" r="16" fill="#0d0f13"/><path d="M330 95v10l7 5" stroke="#3a424c" stroke-width="2" fill="none"/>`,
        { aspect: "landscape", base: "#101216", grain: 0.13 },
      ),
    },
    {
      id: "c5-ph-lot",
      caption: "lot cam view from the fence. my truck, row F. remember where it is. (why did I write that. it's been row F for 8 years)",
      timestamp: "2025-11-16T21:50:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-16T21:50:00", device: "This phone", location: "MFC-6 lot" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0c0e12"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="${25 + i * 46}" y="${180 + (i % 2) * 10}" width="38" height="20" rx="5" fill="#1a1e25"/>`).join("") +
          `<rect x="163" y="176" width="42" height="26" rx="6" fill="#2c3a2c"/>` +
          `<rect x="0" y="80" width="400" height="60" fill="#12151a"/>` +
          `<text x="200" y="118" text-anchor="middle" font-family="monospace" font-size="13" fill="#3f4854">M E R I D I A N — 6</text>` +
          `<circle cx="40" cy="40" r="2.5" fill="#3f4a58"/><circle cx="200" cy="30" r="2" fill="#3f4a58"/>`,
        { aspect: "landscape", base: "#0a0c0f", grain: 0.15 },
      ),
      evidenceLabel: "His truck in row F the night before — where it still sits",
    },
    {
      id: "c5-ph-tooth",
      caption: "tooth #2, gone. the tooth fairy pays union rates in this house",
      timestamp: "2025-10-16T07:15:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-16T07:15:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1b1a20"/>` +
          `<circle cx="150" cy="190" r="85" fill="#2c2a30"/>` +
          `<path d="M110 210 q40 40 80 0" stroke="#3d3a42" stroke-width="6" fill="none"/>` +
          `<rect x="128" y="196" width="12" height="14" rx="3" fill="#d8d2c2"/><rect x="160" y="196" width="12" height="14" rx="3" fill="#d8d2c2"/>` +
          `<rect x="144" y="196" width="12" height="14" rx="3" fill="#1b1a20"/>` +
          `<circle cx="125" cy="165" r="6" fill="#17161c"/><circle cx="175" cy="165" r="6" fill="#17161c"/>`,
        { aspect: "portrait", base: "#141317", grain: 0.1 },
      ),
    },
    // ---- Recently Deleted ----------------------------------------------------
    {
      id: "c5-ph-fivebadges",
      caption: "the five. they badge in from the SAME reader. door 9 interior. 22:00:04. four seconds after shift start. every single night",
      timestamp: "2025-11-12T03:55:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-12T03:55:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0d1014"/>` +
          `<rect x="30" y="50" width="240" height="300" rx="8" fill="#0a0c10"/>` +
          `<text x="150" y="80" text-anchor="middle" font-family="monospace" font-size="11" fill="#4a7a5c">BADGE EVENTS — RDR: D9-INT</text>` +
          Array.from({ length: 5 }, (_, i) =>
            `<rect x="45" y="${100 + i * 46}" width="210" height="36" rx="4" fill="#10141a"/>` +
            `<text x="55" y="${115 + i * 46}" font-family="monospace" font-size="9" fill="#5c8a6b">IN · 22:00:04</text>` +
            `<text x="55" y="${128 + i * 46}" font-family="monospace" font-size="9" fill="#4a5560">#01${41 + i} · SHIFT C</text>`,
          ).join("") +
          timestampBurn("EXPORTED 03:55", 300, 400),
        { aspect: "portrait", base: "#0a0c0f", grain: 0.12 },
      ),
      evidenceLabel: "Deleted screenshot: five badges, one interior reader, 22:00:04 — every night, in lockstep",
    },
    {
      id: "c5-ph-annex",
      caption: "",
      timestamp: "2025-11-18T03:41:00",
      aspect: "landscape",
      deleted: true,
      meta: { takenAt: "2025-11-18T03:41:00", device: "Trail camera (imported)", location: "MFC-6 annex" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060708"/>`,
        { aspect: "landscape", base: "#050607", grain: 0.22 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0b0d10"/>` +
            doorway(150, 60, 100, 240, "#050608") +
            `<rect x="150" y="60" width="100" height="240" fill="#0a0c10"/>` +
            figure(200, 270, 1.0, 0.85, "#040507") +
            figure(120, 275, 0.9, 0.5, "#060810") +
            figure(285, 272, 0.9, 0.5, "#060810") +
            `<text x="200" y="46" text-anchor="middle" font-family="monospace" font-size="16" fill="#39404b">9</text>` +
            timestampBurn("IR · 03:41:12", 400, 300),
          { aspect: "landscape", base: "#08090c", grain: 0.14 },
        ),
      },
      evidenceLabel: "The trail camera's last frame: three figures walking Omar through door 9",
    },
  ],

  notes: [
    {
      id: "c5-n-evidence",
      title: "grievance file (working copy)",
      timestamp: "2025-11-16T22:30:00",
      evidenceLabel: "His grievance file: the whole pattern, documented like Denise taught him",
      body:
        "FOR DENISE — everything dated, like you said.\n\n1. july 11: shift C 'eliminated' by text. july 15: shift C scheduled by text. both messages saved.\n\n2. pay: 41 shifts posted as 'retro adjustment.' no shift code. screenshots in photos.\n\n3. headcount: 14 rostered / 8-9 on floor. the extra five badge from the DOOR 9 INTERIOR reader at 22:00:04 exactly. five people, four seconds, one reader. that's not people. that's a script with badge numbers. whose numbers? tomas is one of them. TOMAS 'TRANSFERRED TO DAYTON' AND HIS BADGE IS STILL CLOCKING IN THROUGH DOOR 9.\n\n4. the 3am 'reconcile': floor cameras loop (watch the clock in the corner — it stutters), phones binned, aisle Q empties. 40-55 min. then everything resumes like a held breath let go.\n\n5. door 9 trucks: manifests with weights only. units of 68-95 kg. I looked up what ships by weight alone with no SKU and no destination and I stopped looking things up for a few days after that.\n\n6. trail cam goes up on the annex fence line tonight (nov 16). SD cards go: one in my locker (118, code is mateo), one to denise if it shows what I think it shows.\n\nhearing nov 20. after that this is OSHA's problem, the union's problem, anybody's problem but mine. home by 7. tooth #3.",
    },
    {
      id: "c5-n-locked",
      title: "locker 118 — second card",
      timestamp: "2025-11-17T21:45:00",
      lock: {
        code: "0118",
        hintText: "“locker 118, code is mateo” — but Mateo is six. It's not a birthday. It's the number he wears every night, the one on the locker, the one on the badge.",
        clueSourceIds: ["c5-ph-badge", "c5-n-evidence"],
      },
      evidenceLabel: "The locked note: what the first SD card showed",
      body:
        "watched card #1 on the break room laptop, 5:40am, sound off, back to the wall.\n\nthe camera got the 3am reconcile from OUTSIDE. here's what happens during the loop:\n\ndoor 9 opens at 3:04. nobody opens it. it opens.\n\nthe five come out first. they walk like the badge board looks — steady, green, four seconds apart. they hold the door.\n\nthen the truck backs in with no lights and aisle Q's crew loads it. pallets, wrapped. the crew moves wrong. not hurt. not scared. SCHEDULED. like the wrap and the pallets and their own hands are all line items.\n\nmarcus is on the footage. my thermos is in his hand. he looks at the fence line — at the CAMERA, no-glow, invisible, he cannot see it — for nine seconds. then he waves. not at me. at the schedule. like he's clocking my curiosity in.\n\n3:58, everyone walks back through door 9. it closes. nobody closes it.\n\ncard #2 stays on the fence tonight and catches tomorrow's reconcile. card #1 goes in my jacket for denise.\n\nif you have this phone and not me: the locker code is my badge. card #1 is in my jacket. my jacket is wherever they say I'm not.",
    },
    {
      id: "c5-n-tooth",
      title: "tooth fairy ledger",
      timestamp: "2025-10-16T07:20:00",
      body: "tooth #1 — $2 (market rate)\ntooth #2 — $3 (inflation)\ntooth #3 — pending. kid's negotiating position improves every time. union material.",
    },
    {
      id: "c5-n-sunday",
      title: "sunday list",
      timestamp: "2025-11-15T10:00:00",
      evidenceLabel: "His Sunday list: gutters, oil change, three copies of the grievance file",
      body: "mamá's — bring the folding chairs\nfix the gutter BEFORE it snows, not during, past omar\noil change (truck's making the noise again)\nprint grievance file ×3 for denise",
    },
  ],

  voicemails: [
    {
      id: "c5-vm-luz",
      callerLabel: "Luz ❤",
      callerNumber: "(216) 555-0148",
      timestamp: "2025-11-18T18:20:00",
      durationSec: 31,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“They walked me off the property, Omar. A security man I've never seen — and I know all of them from the picnic — said you badged out and 'associates' whereabouts after badge-out aren't a facility matter.' Your truck is RIGHT THERE. Mateo's asking. I don't know what I'm supposed to say to — call me. Please, please call me.”",
    },
    {
      id: "c5-vm-denise",
      callerLabel: "Denise (union)",
      callerNumber: "(216) 555-0175",
      timestamp: "2025-11-20T10:40:00",
      durationSec: 35,
      tone: "plain",
      evidenceLabel: "Denise: Meridian's lawyer knew Omar was “separated” before anyone reported him missing",
      transcript:
        "[automated transcript — audio partially recovered]\n“It's Denise. Hearing came and went. Here's what's keeping me up: their counsel opened by moving to dismiss because — quote — 'the grievant separated from the company on November 18th.' Omar. Nobody reported you gone until the 20th. They dated your separation BEFORE anyone knew. I'm filing everything, everywhere, today. Locker, jacket, cards — I remember the list. Hang on, wherever you are.”",
    },
    {
      id: "c5-vm-hr",
      callerLabel: "Meridian People Team",
      timestamp: "2025-11-19T09:00:00",
      durationSec: 24,
      tone: "static",
      evidenceLabel: "HR's exit survey call — recorded hours after his “separation”",
      transcript:
        "[automated transcript]\n“Hi Omar! This is the Meridian People Team with your exit survey! We're sorry to see you go. On a scale of one to five, how satisfied were you with… [tone] …your responses have been recorded. Thank you for eight great years! Your final adjustment will post as usual.”",
    },
    {
      id: "c5-vm-marcus",
      callerLabel: "Marcus (C shift)",
      callerNumber: "(216) 555-0192",
      timestamp: "2025-11-19T06:03:00",
      durationSec: 19,
      tone: "distorted",
      evidenceLabel: "Marcus at 6:03 AM, one minute after the badge-out that never happened",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Oso. It's me. Don't call back on this number. Listen: your dot's still green, man. You badged out at 6:02 — I WATCHED the board do it. Nobody swiped. The board just — it did it ITSELF, and then your dot went back to gr— [sound of a door] I gotta. Row F. Look under row F.”\n[end of message]",
    },
    {
      id: "c5-vm-badge",
      callerLabel: "MFC-6 (internal)",
      callerNumber: "ext. 0009",
      timestamp: "2025-11-21T03:04:00",
      durationSec: 47,
      tone: "breathing",
      evidenceLabel: "A 47-second call from extension 0009 — a warehouse that “closed in 2019” — after the phone was in evidence",
      transcript:
        "[automated transcript — no speech detected]\n[conveyor system, distant, constant]\n[a badge reader accepting a badge: one chirp]\n[a second chirp]\n[a third chirp — 41 chirps total, four seconds apart, unhurried]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: extension 0009 does not exist in Meridian's dial plan. The handset was in evidence intake at time of receipt. 41 chirps — one for each unpaid shift — is noted here without interpretation.",
    },
  ],

  calendarEvents: [
    { id: "c5-cal-shiftc", title: "SHIFT C — door 9", date: "2025-07-15", time: "22:00", recurring: "daily", createdBy: "external", detail: "Recreated by Meridian Scheduling the day after Shift C was eliminated.", evidenceLabel: "The cancelled shift, rebuilt on his calendar by the scheduler — daily, forever" },
    { id: "c5-cal-hearing", title: "GRIEVANCE HEARING — Denise's office", date: "2025-11-20", time: "10:00", createdBy: "owner", evidenceLabel: "The hearing he called — two days after the building kept him" },
    { id: "c5-cal-sunday", title: "dinner @ mamá's", date: "2025-11-23", time: "13:00", createdBy: "owner" },
    { id: "c5-cal-oil", title: "truck oil change (the noise)", date: "2025-11-21", time: "09:00", createdBy: "owner" },
    {
      id: "c5-cal-reconcile",
      title: "reconcile",
      date: "2025-09-02",
      time: "03:04",
      recurring: "daily",
      createdBy: "unknown",
      detail: "No account. No reminder. Appears on the calendars of all Shift C associates, per Marcus. Nobody added it.",
      evidenceLabel: "A daily 3:04 AM event, “reconcile” — on every C-shift worker's calendar, added by no one",
    },
    { id: "c5-cal-tooth", title: "tooth #3 watch 🦷", date: "2025-11-18", time: "07:00", createdBy: "owner", struck: true },
  ],

  locationPins: [
    { id: "c5-pin-home", label: "Home — Euclid Ave", timestamp: "2025-11-17T20:30:00", x: 22, y: 30 },
    { id: "c5-pin-carpool", label: "Carpool pickup — Reggie's", timestamp: "2025-11-17T21:20:00", x: 35, y: 42 },
    { id: "c5-pin-mfc", label: "MFC-6 — Lake Rd", timestamp: "2025-11-17T21:54:00", x: 72, y: 60 },
    {
      id: "c5-pin-inside",
      label: "MFC-6 — interior (aisle Q)",
      timestamp: "2025-11-18T03:03:00",
      x: 74,
      y: 62,
      detail: "Last normal fix: aisle Q, one minute before the nightly 'reconcile.'",
      evidenceLabel: "His last normal position: aisle Q, 3:03 AM — one minute before the reconcile",
    },
    {
      id: "c5-pin-annex",
      label: "MFC-6 — annex (door 9)",
      timestamp: "2025-11-18T03:41:00",
      x: 76,
      y: 64,
      detail: "A fix inside the 'decommissioned' annex — a space Meridian's floor plans mark as exterior. The phone then went dark until it appeared, powered off, inside sealed locker 118.",
      evidenceLabel: "3:41 AM: the phone inside the annex that the floor plan says is outdoors",
    },
    {
      id: "c5-pin-locker",
      label: "MFC-6 — locker 118",
      timestamp: "2025-11-18T06:02:00",
      x: 73,
      y: 59,
      detail: "Final fix at 6:02:00 — the exact second of his badge-out. The locker was sealed by HIS badge at 6:02:04. Four seconds. Same cadence as the door 9 five.",
      evidenceLabel: "The locker sealed itself with his badge four seconds after his badge-out — the door 9 cadence",
    },
  ],

  browserHistory: [
    { id: "c5-b-eliminate", query: "shift eliminated but still scheduled is that legal", timestamp: "2025-07-16T10:20:00" },
    { id: "c5-b-retro", query: "what is a retro adjustment on paystub no shift code", timestamp: "2025-08-02T09:15:00" },
    { id: "c5-b-phones", query: "can employer confiscate phones during shift ohio", timestamp: "2025-10-16T11:30:00" },
    { id: "c5-b-dayton", query: "meridian fulfillment dayton ohio site address", timestamp: "2025-09-26T18:40:00", evidenceLabel: "His search for the Dayton site: no address, no listing, no building" },
    { id: "c5-b-tomas", query: "tomas gutierrez dayton ohio", timestamp: "2025-09-26T19:02:00" },
    { id: "c5-b-weights", query: "freight shipped by weight only no sku no destination", timestamp: "2025-11-09T04:15:00", evidenceLabel: "Search: what ships with no SKU, no destination — only weights" },
    { id: "c5-b-trailcam", query: "no glow trail camera cant be seen at night", timestamp: "2025-11-04T20:30:00" },
    { id: "c5-b-osha", query: "osha tip line anonymous warehouse", timestamp: "2025-11-13T22:10:00", evidenceLabel: "He researched how to report the facility anonymously" },
    { id: "c5-b-closed", query: "meridian fulfillment center 6 closed 2019???", timestamp: "2025-11-15T11:20:00", evidenceLabel: "After OSHA's reply he searched his own workplace — records agree: closed 2019" },
    { id: "c5-b-last", query: "if a building isn't supposed to exist who do you report it to", timestamp: "2025-11-17T21:58:00", evidenceLabel: "His final search, from the parking lot: who do you report a building to" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "PayCheck+",
    revealAfterClueIds: ["c5-th-marcus", "c5-n-evidence"],
    title: "MERIDIAN — LABOR LEDGER",
    heading: "Node MFC-6 · reconciliation view",
    body:
      "This app arrived on his phone with the July 15 scheduling message. It presents as a paycheck calculator. Its ledger view was never meant to render on an associate device.\n\nIt reconciles two shifts: the one payroll sees, and the one the building runs.",
    entries: [
      { label: "SHIFT C (payroll)", status: "ELIMINATED 7/14", detail: "headcount: 0 · cost center: closed" },
      { label: "SHIFT C (floor)", status: "● ACTIVE", detail: "headcount: 14 · cost center: —" },
      { label: "Badge #0141–0145", status: "AUTOMATED", detail: "former associates · retained as credentials" },
      { label: "T. GUTIERREZ (#0143)", status: "SEPARATED 9/12", detail: "correspondence: automated · 'dayton'" },
      { label: "Aisle Q output", status: "RECONCILED NIGHTLY", detail: "manifests: weight-only · door 9" },
      { label: "O. REYES-VANCE (#0118)", status: "SEPARATED 11/18", detail: "badge retained · correspondence: pending" },
      { label: "Grievance 7741-C", status: "RESOLVED", detail: "method: separation" },
    ],
    footer:
      "The ledger's last line item resolves his OSHA complaint and his grievance with one word. His badge is 'retained as credentials.' Somewhere, a reader will chirp at 22:00:04, and #0118 will be a green dot forever, and correspondence will be sent to whoever asks, signed the way he signed things.",
    evidenceLabel: "The Labor Ledger: two Shift Cs — and Omar's badge “retained as credentials”",
  },

  liveEvents: [
    {
      id: "c5-live-tomas",
      kind: "message",
      afterSeconds: 340,
      threadId: "c5-th-tomas",
      message: {
        id: "c5-m-tm-live",
        from: "them",
        text: "Omar is great. The team is great. Tell everyone C shift says hi. — Omar",
        timestamp: "2025-11-21T23:46:00",
        evidenceLabel: "Tomas's thread, updating itself: a message signed “— Omar”",
      },
    },
    {
      id: "c5-live-shift",
      kind: "notification",
      afterSeconds: 620,
      title: "Meridian Scheduling",
      body: "Reminder: SHIFT C tonight 22:00. Door 9. New associates: arrive early.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c5-v-ran",
      label: "He ran from something at home or in his head",
      description: "Pressure, debt, a grievance he maybe knew he'd lose. The badge-out at 6:02 was him, leaving on foot, leaving everything.",
      requiredEvidenceIds: ["c5-m-lz-8", "c5-n-sunday", "c5-b-osha"],
      isCanon: false,
      epilogue:
        "You try the ordinary shape first, because you owe every case that: a man under pressure walks out of his own life at dawn, on foot, and the badge-out is just a badge-out.\n\nIt doesn't survive its own paperwork. Men who run don't buy trail cameras on layaway for the fence line of the thing they're running from. They don't file OSHA tips with reference numbers. They don't leave a tooth-fairy ledger with a pending entry.\n\nThe report is returned approved anyway — approved fast, faster than anything you've ever filed against a company with counsel. You think about that speed sometimes. Approval can be a door held open for you, four seconds apart, unhurried.",
    },
    {
      id: "c5-v-meridian",
      label: "Meridian disappeared him",
      description: "He documented the ghost shift, the dead men's badges, the weight-only trucks — and the company dated his 'separation' before anyone knew he was gone.",
      requiredEvidenceIds: ["case-05.hidden", "c5-ph-fivebadges", "c5-vm-denise", "c5-ph-annex", "c5-n-locked"],
      isCanon: true,
      epilogue:
        "Your report says it plainly: Omar Reyes-Vance was 'separated' by a system that had already automated the paperwork of separating people, and his mistake was documenting it well enough to become a line item himself.\n\nThe evidence performs exactly as evidence performs against a building with lawyers. The badge telemetry is 'legacy noise.' The ledger app 'cannot be reproduced on any test device.' The trail camera's second SD card is recovered from the fence line — factory blank, though its write counter shows one night of use. The annex is inspected: empty, swept, and three meters shorter inside than out, a detail the inspector writes down and then, in the final report, does not.\n\nNo charge is filed. Meridian settles with Luz for an amount that has a confidentiality clause where a number should be. The union gets Shift C 'formally re-eliminated,' which everyone celebrates and no one believes.\n\nMarcus mails Denise a thermos with no note. Café de olla residue, one badge — #0118 — taped inside the lid. The reader logs say #0118 still clocks in nightly at 22:00:04. Meridian says the reader is scheduled for replacement. It has been scheduled for replacement for three years.\n\nMateo's tooth #3 came out in December. Under the pillow, in the morning: exact change.",
    },
    {
      id: "c5-v-crew",
      label: "The night crew closed ranks",
      description: "Not the company — the shift. Eight people doing something off-books through door 9, and Omar's camera caught them doing it.",
      requiredEvidenceIds: ["c5-m-mc-6", "c5-ph-manifest", "c5-ph-door9"],
      isCanon: false,
      epilogue:
        "The human-scale theft version: a night crew running product out of door 9, a manifest scheme, and a coworker who documented it walked into a truck's blind spot by people he trusted.\n\nMarcus is interviewed four times. He answers everything, which is how you know: nobody on a theft crew answers everything. He explains the wave on the trail cam footage before you can ask — 'I wave at the fence every night. My whole shift, I wave at it. You'd want somebody waving at you too, if you knew what watches the fence.'\n\nHe passes the polygraph. They all pass. The polygrapher notes, unprompted, that all eight subjects' baseline stress DROPPED when asked about door 9, 'as if the topic were restful.' You close the folder on that sentence and it stays closed.",
    },
    {
      id: "c5-v-building",
      label: "The building runs its own shift",
      description: "A facility that closed in 2019, badges that clock in without hands, a schedule no one writes. Meridian isn't covering for a crime. It's covering for a payroll it doesn't control.",
      requiredEvidenceIds: ["c5-m-os-3", "c5-vm-badge", "c5-cal-reconcile", "c5-vm-marcus"],
      isCanon: false,
      epilogue:
        "You write the version that fits every data point and no policy manual: MFC-6 closed in 2019, and something has been running the night shift ever since — paying in 'retro adjustments' drawn on accounts no auditor can find the far side of, retaining badges the way a machine retains parts, reconciling nightly at 3:04 whatever it is that gets reconciled by weight.\n\nMeridian's counsel does not rebut your report. That's the detail that follows you home: they don't argue. They request, in writing, that the finding be sealed 'to avoid disruption to operations at a facility that, per federal records, does not operate.' The request is granted. Everyone signs quickly. People sign quickly when the alternative is thinking.\n\nThe lights at MFC-6 are on tonight. The lot is full. Somewhere in there a badge board glows green, 14 for 14, and if you stood at the fence — you won't, but if you did — around 3:04 you'd feel it: the held breath. The reconcile. A building balancing its books.\n\nRow F was checked, per Marcus's voicemail. Under Omar's truck, centered, face up: his good thermos. Washed. Returned in good order. Unsigned.",
    },
  ],
};

export default c5;
