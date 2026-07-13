import type { CaseFile } from "../types";
import { photoSvg, wall, windowPane, figure, timestampBurn } from "../photoart";

/**
 * CASE 09 — NEIGHBORHOOD WATCH
 * Hal Brennan, 45. Maplecrest Court homeowner, sixteen years. Volunteer
 * for the neighborhood watch — a tip line that told him everything about
 * everyone. He filed 214 tips. Then the tips started being about him.
 */

const c9: CaseFile = {
  id: "case-09",
  title: "Neighborhood Watch",
  victimName: "Hal Brennan, 45",
  summary:
    "A cul-de-sac dad joined the anonymous neighborhood watch and finally felt useful: sectors, badge numbers, tips about everyone on the street. He filed 214 reports on his neighbors. He never asked who was filing the reports on him — until the night his own schedule arrived in his inbox, formatted like all the others.",
  intake:
    "SUBJECT: Brennan, Harold D. (45). Reported missing by his wife Dec 10, returning from her sister's to an empty house — doors locked, alarm set, car in garage, dinner half-eaten on the table.\n\nDEVICE: Recovered Dec 10 from the kitchen counter. Battery 67%. Beside it: subject's reflective watch vest, folded; his logbook missing from its shelf (outline in dust preserved).\n\nCANVASS: All fourteen households on Maplecrest Court interviewed. All fourteen gave materially identical statements, including three identical phrasings: 'Hal kept to himself lately,' 'we watch out for each other here,' and 'the street has never been safer.' No household reports seeing or hearing anything on the night of Dec 9.\n\nNOTES: The 'Maplecrest Watch' tip line number traces to no carrier, no VOIP provider, and no registration. The HOA denies operating a watch. The HOA's own meeting minutes reference the watch 41 times.\n\nSecond-pass review requested. Recommend interviewers do not park on the court itself.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "HAL B — Maplecrest Watch, Sector 4",
    recoveredAt: "2025-12-11T21:00:00",
    batteryStart: 67,
    wallpaperHue: 95,
    lockScreenNotifications: [
      { appId: "messages", title: "Dana ❤", preview: "Home Sunday. Sister says hi. Eat a vegetable, Harold.", targetId: "c9-th-dana" },
      { appId: "messages", title: "Maplecrest Watch", preview: "SUBJECT: BRENNAN, HAL. Begins tonight.", targetId: "c9-th-watch" },
      { appId: "phone", title: "Voicemail", preview: "Maplecrest Watch · 0:48", targetId: "c9-vm-schedule" },
    ],
  },

  messages: [
    {
      id: "c9-th-watch",
      contactName: "Maplecrest Watch",
      messages: [
        { id: "c9-m-wa-1", from: "them", text: "Welcome, volunteer. You are SECTOR 4, BADGE 12. The street thanks you. Tips are anonymous. Tips are mandatory. One per week keeps your standing current.", timestamp: "2025-08-04T21:00:00", evidenceLabel: "The Watch's welcome: Sector 4, Badge 12 — “tips are anonymous. tips are mandatory.”" },
        { id: "c9-m-wa-2", from: "owner", text: "Happy to help keep the street safe. What kind of tips are useful?", timestamp: "2025-08-04T21:15:00" },
        { id: "c9-m-wa-3", from: "them", text: "Everything is useful. Departures. Arrivals. Lights. Deliveries. Guests. Habits are the fence, volunteer. A street that knows its habits cannot be surprised.", timestamp: "2025-08-04T21:16:00", evidenceLabel: "“Habits are the fence. A street that knows its habits cannot be surprised.”" },
        { id: "c9-m-wa-4", from: "them", text: "TIP DIGEST W/E 10/12 — MELTON (4407): departs 2:10am Tuesdays, returns 4am, headlights off. VU (4411): new visitor, gray coupe, stays past midnight. CARSON (4402): garage light left on 6 nights. Note and normalize.", timestamp: "2025-10-12T20:00:00", evidenceLabel: "A weekly digest: every household's habits, distributed to every volunteer" },
        { id: "c9-m-wa-5", from: "owner", text: "Filed 6 this week. Also — who compiles the digest? Asking so I can flag a correction.", timestamp: "2025-11-02T20:30:00" },
        { id: "c9-m-wa-6", from: "them", text: "The digest compiles. Corrections are not necessary. The digest has never been wrong.", timestamp: "2025-11-02T20:31:00", evidenceLabel: "“The digest compiles.” — no compiler, no corrections" },
        { id: "c9-m-wa-7", from: "owner", text: "I want to step back from the watch for a while. Dana's away and I'm behind at work. No hard feelings.", timestamp: "2025-11-30T19:00:00", evidenceLabel: "Nov 30: Hal tried to quit the Watch" },
        { id: "c9-m-wa-8", from: "them", text: "Standing noted as LAPSED. Volunteers do not step back, volunteer. Sectors do not unwatch. You know our habits now. Now we are even.", timestamp: "2025-11-30T19:01:00", evidenceLabel: "“Sectors do not unwatch. You know our habits now. Now we are even.”" },
        { id: "c9-m-wa-9", from: "them", text: "SUBJECT: BRENNAN, HAL. Begins tonight.", timestamp: "2025-12-02T21:00:00", evidenceLabel: "Dec 2: his own name arrives, formatted like every tip he ever filed" },
      ],
    },
    {
      id: "c9-th-dana",
      contactName: "Dana ❤",
      contactNumber: "(614) 555-0151",
      messages: [
        { id: "c9-m-da-1", from: "them", text: "Landed at Carol's. Three weeks of casseroles and complaining, pray for me. Love you.", timestamp: "2025-11-18T15:00:00" },
        { id: "c9-m-da-2", from: "owner", text: "pray for CAROL. love you more. house is fine, street is fine, everything's fine", timestamp: "2025-11-18T15:20:00" },
        { id: "c9-m-da-3", from: "them", text: "You said 'fine' three times, Harold.", timestamp: "2025-11-18T15:22:00" },
        { id: "c9-m-da-4", from: "owner", text: "the watch thing got weird. I tried to quit. dana they knew you were at carol's. I never told the tip line that. I never told ANYONE that except gary", timestamp: "2025-12-03T22:15:00", evidenceLabel: "The Watch knew Dana was away — Hal had told exactly one person" },
        { id: "c9-m-da-5", from: "them", text: "Then Gary told them. Harold. Come stay at Carol's. I mean it. TONIGHT.", timestamp: "2025-12-03T22:20:00" },
        { id: "c9-m-da-6", from: "owner", text: "and leave the house dark for them? no. a dark house is a tip, dana. I'm going to sit in my lit living room like a man who has done nothing wrong. because I haven't. mostly. I'll explain sunday", timestamp: "2025-12-03T22:31:00", evidenceLabel: "“a dark house is a tip” — he stayed to keep the lights on" },
        { id: "c9-m-da-7", from: "them", text: "Home Sunday. Sister says hi. Eat a vegetable, Harold.", timestamp: "2025-12-08T18:00:00" },
      ],
    },
    {
      id: "c9-th-gary",
      contactName: "Gary (4409)",
      contactNumber: "(614) 555-0177",
      ghostTypingAfterSeconds: 390,
      messages: [
        { id: "c9-m-ga-1", from: "them", text: "poker thursday. bring the good chips not the sad chips", timestamp: "2025-11-13T17:00:00" },
        { id: "c9-m-ga-2", from: "owner", text: "gary. straight answer. are you on the watch?", timestamp: "2025-12-03T21:00:00" },
        { id: "c9-m-ga-3", from: "them", text: "everybody's on the watch, hal.", timestamp: "2025-12-03T21:20:00", evidenceLabel: "Gary: “everybody's on the watch, hal.”" },
        { id: "c9-m-ga-4", from: "owner", text: "I'm not asking everybody. I'm asking the guy who's had a key to my house for ten years", timestamp: "2025-12-03T21:22:00" },
        { id: "c9-m-ga-5", from: "them", text: "and in ten years has anything ever happened to your house? you're welcome. that's the watch. that's ALL the watch is. stop pulling the thread hal. the sweater is the street", timestamp: "2025-12-03T21:30:00", evidenceLabel: "“stop pulling the thread. the sweater is the street.”" },
        { id: "c9-m-ga-6", from: "owner", text: "who filed on the meltons, gary? the 2am tuesdays? because I checked. dave melton drives his mother to dialysis. that's the 2am. we put DIALYSIS in a digest", timestamp: "2025-12-05T23:40:00", evidenceLabel: "The Meltons' 2 AM “suspicious departures” were dialysis runs — Hal checked" },
        { id: "c9-m-ga-7", from: "them", text: "you filed on the meltons, hal. august 12th. tip #9. you want me to read you your own words?", timestamp: "2025-12-05T23:44:00", evidenceLabel: "Gary's answer: HAL filed the Melton tip himself — August, tip #9" },
        { id: "c9-m-ga-8", from: "owner", text: "…that's not. I filed LIGHTS. I filed a light being on", timestamp: "2025-12-05T23:46:00" },
        { id: "c9-m-ga-9", from: "them", text: "it all goes in the same digest, buddy. see you thursday. bring the good chips", timestamp: "2025-12-05T23:47:00" },
      ],
    },
    {
      id: "c9-th-hoa",
      contactName: "Maplecrest HOA Board",
      messages: [
        { id: "c9-m-ho-1", from: "them", text: "Patrice: Reminder! Holiday lights go UP the 1st and DOWN the 26th per covenant 11.3. The street looks best when we all match! 🎄", timestamp: "2025-11-28T10:00:00" },
        { id: "c9-m-ho-2", from: "owner", text: "Question for the board: does the HOA run the Maplecrest Watch? Yes or no. It's a simple question.", timestamp: "2025-12-04T09:00:00" },
        { id: "c9-m-ho-3", from: "them", text: "Patrice: The HOA has no affiliation with any watch program! That said, participation reflects wonderfully in your standing review. Happy holidays! 🎄", timestamp: "2025-12-04T09:15:00", evidenceLabel: "The HOA: no affiliation with the Watch — which “reflects wonderfully in your standing review”" },
        { id: "c9-m-ho-4", from: "them", text: "Patrice: Hal, your lawn was looking shaggy so the street took care of it while you were out Tuesday! No charge. Neighbors helping neighbors! 🌱", timestamp: "2025-12-07T16:00:00", evidenceLabel: "“the street took care of it while you were out” — he wasn't out Tuesday. He was home." },
      ],
    },
    {
      id: "c9-th-abby",
      contactName: "Abby (college!)",
      contactNumber: "(614) 555-0128",
      messages: [
        { id: "c9-m-ab-1", from: "them", text: "dad I need $40 and emotional support, in that order", timestamp: "2025-11-20T13:00:00" },
        { id: "c9-m-ab-2", from: "owner", text: "sent $60. the extra $20 is emotional support in its most useful form", timestamp: "2025-11-20T13:10:00" },
        { id: "c9-m-ab-3", from: "them", text: "dad why did a 'maplecrest watch' account follow my campus insta. dad what is a maplecrest watch", timestamp: "2025-12-06T22:00:00", evidenceLabel: "The Watch followed his daughter's college account — 200 miles away" },
        { id: "c9-m-ab-4", from: "owner", text: "block it. don't post your class schedule. I'll handle this abby. it's a neighborhood thing and it stays in the neighborhood if I handle it", timestamp: "2025-12-06T22:10:00", evidenceLabel: "“it stays in the neighborhood if I handle it” — three days before he vanished" },
      ],
    },
    {
      id: "c9-th-melton",
      contactName: "Dave Melton (4407)",
      contactNumber: "(614) 555-0193",
      messages: [
        { id: "c9-m-me-1", from: "owner", text: "Dave, it's Hal from 4405. This is overdue: I owe you an apology. I'd like to give it in person. Also there's something about the street you deserve to know.", timestamp: "2025-12-08T17:30:00", evidenceLabel: "Dec 8: Hal arranged to apologize to Melton and tell him “something about the street”" },
        { id: "c9-m-me-2", from: "them", text: "Wednesday, my porch, 7pm. Bring whatever this is about written down. I like paper.", timestamp: "2025-12-08T18:00:00" },
        { id: "c9-m-me-3", from: "them", text: "It's Wednesday. Porch light's on for you.", timestamp: "2025-12-10T19:05:00", evidenceLabel: "Melton waited on his porch. Hal was already gone." },
      ],
    },
    {
      id: "c9-th-brother",
      contactName: "Russ (brother)",
      contactNumber: "(614) 555-0136",
      messages: [
        { id: "c9-m-ru-1", from: "them", text: "you sounded off on the phone. this watch club — you were the same way about the model trains. obsessed, then trapped by the other train guys. quit like you quit trains", timestamp: "2025-12-04T20:00:00" },
        { id: "c9-m-ru-2", from: "owner", text: "the train guys never stood on my lawn at 2am, russ", timestamp: "2025-12-04T20:12:00", evidenceLabel: "“the train guys never stood on my lawn at 2am”" },
        { id: "c9-m-ru-3", from: "them", text: "I'm sorry, they WHAT", timestamp: "2025-12-04T20:13:00" },
        { id: "c9-m-ru-4", from: "owner", text: "four of them. facing the house. not moving. I turned the porch light on and they left in four directions. russ they didn't RUN. they dispersed. like a shift ending", timestamp: "2025-12-04T20:20:00", evidenceLabel: "Four figures on his lawn at 2 AM — dispersing “like a shift ending”" },
      ],
    },
    {
      id: "c9-th-hardware",
      contactName: "Maple True Value",
      messages: [
        { id: "c9-m-hw-1", from: "them", text: "MAPLE TRUE VALUE: Your order is ready — 4x motion flood lights, 2x deadbolt, 1x door bar.", timestamp: "2025-12-05T11:00:00", evidenceLabel: "Dec 5: floodlights, deadbolts, a door bar" },
        { id: "c9-m-hw-2", from: "them", text: "MAPLE TRUE VALUE: We miss you! Item left at register last visit: 1x door bar. We'll hold it.", timestamp: "2025-12-05T18:00:00", evidenceLabel: "He left the door bar at the register — someone from the street was in line behind him" },
      ],
    },
    {
      id: "c9-th-spam",
      contactName: "Maplecrest Living",
      messages: [
        { id: "c9-m-sp-1", from: "them", text: "MAPLECREST LIVING: Vote for December's YARD OF THE MONTH! 🏆", timestamp: "2025-12-01T09:00:00" },
        { id: "c9-m-sp-2", from: "them", text: "MAPLECREST LIVING: Congratulations to 4405 — YARD OF THE MONTH! The street takes care of its own. 🏆", timestamp: "2025-12-10T09:00:00", evidenceLabel: "The morning after: his yard wins Yard of the Month. “The street takes care of its own.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c9-ph-court",
      caption: "maplecrest court at golden hour. sixteen years. best street in the world",
      timestamp: "2025-09-14T18:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-09-14T18:10:00", device: "This phone", location: "Maplecrest Ct" },
      svg: photoSvg(
        `<rect width="400" height="140" fill="#2a2420"/>` +
          `<rect y="140" width="400" height="160" fill="#121610"/>` +
          Array.from({ length: 5 }, (_, i) => `<rect x="${20 + i * 78}" y="${100 + (i % 2) * 8}" width="60" height="60" fill="#1d1a16"/><path d="M${14 + i * 78} ${100 + (i % 2) * 8} L${50 + i * 78} ${74 + (i % 2) * 8} L${86 + i * 78} ${100 + (i % 2) * 8}Z" fill="#161310"/>`).join("") +
          `<ellipse cx="200" cy="250" rx="180" ry="30" fill="#191d14"/>` +
          `<circle cx="330" cy="60" r="34" fill="#4a3626" opacity="0.5"/>`,
        { aspect: "landscape", base: "#14120e", grain: 0.12 },
      ),
    },
    {
      id: "c9-ph-vest",
      caption: "official vest came in the mail. no return address, fits perfect. SECTOR 4 / W-12. dana says I look like a lost crossing guard. dana is correct",
      timestamp: "2025-08-06T19:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-08-06T19:00:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#1c1a17") +
          `<path d="M90 120 L150 100 L210 120 L210 320 L90 320 Z" fill="#3d4a1c"/>` +
          `<rect x="90" y="170" width="120" height="18" fill="#c9c25a" opacity="0.8"/>` +
          `<rect x="90" y="230" width="120" height="18" fill="#c9c25a" opacity="0.8"/>` +
          `<text x="150" y="290" text-anchor="middle" font-family="monospace" font-size="13" fill="#d8d2c2">SECTOR 4</text>` +
          `<text x="150" y="308" text-anchor="middle" font-family="monospace" font-size="13" fill="#d8d2c2">W-12</text>`,
        { aspect: "portrait", base: "#151310", grain: 0.11 },
      ),
      evidenceLabel: "The vest that arrived with no return address: SECTOR 4 / W-12",
    },
    {
      id: "c9-ph-logbook",
      caption: "the log. dana calls it 'the neighbor diary' in a tone I choose to ignore. it's CIVIC ENGAGEMENT",
      timestamp: "2025-09-20T21:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-20T21:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#171410"/>` +
          `<rect x="55" y="70" width="190" height="260" rx="6" fill="#3a2c1c"/>` +
          `<rect x="70" y="90" width="160" height="220" fill="#d3cab4" opacity="0.9"/>` +
          Array.from({ length: 10 }, (_, i) => `<rect x="85" y="${110 + i * 19}" width="${130 - ((i * 29) % 50)}" height="4" fill="#8b8371"/>`).join("") +
          `<text x="150" y="86" text-anchor="middle" font-family="monospace" font-size="10" fill="#c9b57a">SECTOR 4 LOG</text>`,
        { aspect: "portrait", base: "#110f0b", grain: 0.1 },
      ),
      evidenceLabel: "His logbook — missing from its shelf when the house was searched",
    },
    {
      id: "c9-ph-binoculars",
      caption: "new setup by the window. for BIRDS, dana. (there are also birds)",
      timestamp: "2025-10-05T16:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-05T16:40:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#1e1b17") +
          windowPane(200, 50, 160, 180, "#26303a") +
          `<path d="M120 230 L120 150 M100 150 h40" stroke="#26221c" stroke-width="8"/>` +
          `<rect x="95" y="120" width="50" height="30" rx="8" fill="#14110d"/>` +
          `<circle cx="108" cy="135" r="9" fill="#0a0908"/><circle cx="132" cy="135" r="9" fill="#0a0908"/>`,
        { aspect: "landscape", base: "#161310", grain: 0.12 },
      ),
    },
    {
      id: "c9-ph-lawnfigures",
      caption: "",
      timestamp: "2025-12-04T02:09:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-04T02:09:00", device: "This phone", location: "4405 Maplecrest Ct" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060708"/>` +
          `<rect y="230" width="400" height="70" fill="#0b0e09"/>`,
        { aspect: "landscape", base: "#050607", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0a0c0e"/>` +
            `<rect y="230" width="400" height="70" fill="#0f130c"/>` +
            figure(90, 225, 0.95, 0.8, "#04050a") +
            figure(170, 230, 0.95, 0.8, "#04050a") +
            figure(250, 227, 0.95, 0.8, "#04050a") +
            figure(330, 231, 0.95, 0.8, "#04050a") +
            `<text x="200" y="275" text-anchor="middle" font-family="monospace" font-size="9" fill="#44504a">all four facing the window. none of them holding anything. why is that worse</text>` +
            timestampBurn("02:09:12", 400, 300),
          { aspect: "landscape", base: "#080a0a", grain: 0.13 },
        ),
      },
      evidenceLabel: "His 2:09 AM photo: four figures on the lawn, facing the window, holding nothing",
    },
    {
      id: "c9-ph-casserole",
      caption: "the carsons left a casserole. we haven't spoken since the garage light thing. the dish has our name pre-printed on a label. pre. printed.",
      timestamp: "2025-12-06T18:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-06T18:20:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#191510"/>` +
          `<ellipse cx="150" cy="230" rx="105" ry="65" fill="#2a211a"/>` +
          `<ellipse cx="150" cy="220" rx="88" ry="50" fill="#4a3421"/>` +
          `<rect x="95" y="290" width="110" height="24" rx="4" fill="#d8d2c2" opacity="0.85"/>` +
          `<text x="150" y="306" text-anchor="middle" font-family="monospace" font-size="10" fill="#3a3427">BRENNAN — 4405</text>`,
        { aspect: "portrait", base: "#130f0a", grain: 0.11 },
      ),
      evidenceLabel: "The casserole with his family's name pre-printed on the dish label",
    },
    {
      id: "c9-ph-lawn",
      caption: "came home to a mowed lawn. I didn't mow it. dana didn't mow it. the stripes are PERFECT. I've never once gotten the stripes perfect",
      timestamp: "2025-12-07T15:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-07T15:30:00", device: "This phone", location: "4405 Maplecrest Ct" },
      svg: photoSvg(
        `<rect width="400" height="120" fill="#20242b"/>` +
          `<rect y="120" width="400" height="180" fill="#141a0e"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="0" y="${124 + i * 22}" width="400" height="11" fill="${i % 2 ? "#17200f" : "#121a0b"}"/>`).join("") +
          `<rect x="150" y="60" width="100" height="60" fill="#1a1712"/>`,
        { aspect: "landscape", base: "#10140a", grain: 0.11 },
      ),
      evidenceLabel: "The lawn, mowed in perfect stripes by no one, while he was home",
    },
    {
      id: "c9-ph-floodlights",
      caption: "floodlights up. deadbolts in. going to sleep like a reasonable, well-lit man",
      timestamp: "2025-12-05T17:45:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-05T17:45:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#12100d"/>` +
          `<rect x="60" y="80" width="180" height="240" fill="#1c1914"/>` +
          `<rect x="110" y="180" width="80" height="140" fill="#0e0c09"/>` +
          `<circle cx="90" cy="100" r="12" fill="#c9c25a" opacity="0.4"/>` +
          `<circle cx="210" cy="100" r="12" fill="#c9c25a" opacity="0.4"/>` +
          `<path d="M90 112 L70 160 M210 112 L230 160" stroke="#c9c25a" stroke-width="2" opacity="0.2"/>`,
        { aspect: "portrait", base: "#0d0b09", grain: 0.12 },
      ),
    },
    // ---- Recently Deleted ---------------------------------------------------
    {
      id: "c9-ph-owntip",
      caption: "",
      timestamp: "2025-12-02T21:10:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-02T21:10:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0e0f12"/>` +
          `<rect x="30" y="60" width="240" height="290" rx="8" fill="#12151a"/>` +
          `<text x="150" y="95" text-anchor="middle" font-family="monospace" font-size="10" fill="#7a94b8">TIP DIGEST — SPECIAL</text>` +
          `<text x="45" y="130" font-family="monospace" font-size="9" fill="#9aa3af">SUBJECT: BRENNAN, HAL (4405)</text>` +
          `<text x="45" y="155" font-family="monospace" font-size="8" fill="#5c6670">— wakes 6:40. coffee at window 6:55</text>` +
          `<text x="45" y="175" font-family="monospace" font-size="8" fill="#5c6670">— checks mail 5:10, reads it standing</text>` +
          `<text x="45" y="195" font-family="monospace" font-size="8" fill="#5c6670">— wife away until the 14th (confirmed)</text>` +
          `<text x="45" y="215" font-family="monospace" font-size="8" fill="#5c6670">— bought lights and locks (noted, cute)</text>` +
          `<text x="45" y="235" font-family="monospace" font-size="8" fill="#5c6670">— sleeps left side. window latch loose</text>` +
          `<text x="45" y="275" font-family="monospace" font-size="9" fill="#a04252">— standing: LAPSED. note and normalize.</text>`,
        { aspect: "portrait", base: "#0a0c0f", grain: 0.11 },
      ),
      evidenceLabel: "The deleted screenshot: his own habits in digest format — “sleeps left side. window latch loose.”",
    },
    {
      id: "c9-ph-garage",
      caption: "",
      timestamp: "2025-12-08T23:30:00",
      aspect: "landscape",
      deleted: true,
      meta: { takenAt: "2025-12-08T23:30:00", device: "This phone", location: "4409 Maplecrest Ct (rear)" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0b0c0e"/>` +
          `<rect x="60" y="80" width="280" height="170" fill="#15130f"/>` +
          `<rect x="90" y="110" width="100" height="70" fill="#0e0d0a"/>` +
          `<rect x="220" y="100" width="90" height="60" rx="4" fill="#1d1a15"/>` +
          `<rect x="230" y="110" width="70" height="30" fill="#26303a" opacity="0.6"/>` +
          `<rect x="220" y="170" width="90" height="40" fill="#17150f"/>` +
          Array.from({ length: 4 }, (_, i) => `<rect x="${95 + i * 24}" y="190" width="16" height="40" fill="#c9c25a" opacity="0.25"/>`).join("") +
          `<text x="200" y="272" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a4453">gary's garage. a laminator. a map of the court. fourteen folders. one is thick</text>`,
        { aspect: "landscape", base: "#090a0c", grain: 0.15 },
      ),
      evidenceLabel: "Deleted photo through Gary's garage window: a laminator, a map of the court, fourteen folders",
    },
  ],

  notes: [
    {
      id: "c9-n-watchlog",
      title: "watch notes — sector 4",
      timestamp: "2025-12-08T22:00:00",
      evidenceLabel: "His sector log: how a civic hobby curdled, in his own words",
      body:
        "aug — badge came. felt like being picked for a team. filed my first tip (carson garage light). the digest THANKED me. pathetic how good that felt. write that down too, hal: it felt good.\n\nsept — 14 tips. dana says the log is 'a diary about other people's garbage cans.' the street's never been safer though. that's not nothing.\n\noct — the melton tip came back around in the digest with words I didn't write. 'headlights off.' I never wrote headlights off. someone ADDED to my tip. or someone else is also filing on the meltons. of course someone else is also filing. everyone is filing on everyone. I did the math tonight: 14 houses, one tip a week minimum. that's 728 tips a year about 14 families. we are eating ourselves in weekly installments.\n\nnov — tried to quit. 'sectors do not unwatch.' the digest knew dana was at carol's. only gary knew. so gary files too. of course gary files. gary has had our key for ten years, and I have had the wrong worry for ten years.\n\ndec 2 — my name in the digest. my coffee. my mail. my WINDOW LATCH. reading your own habits in that font does something to your spine. I filed 214 of these. 214 spines.\n\ndec 8 — saw inside gary's garage. it's not gary's operation. gary's folder is in there too, thick as anyone's. there's no head of this thing. that's what I'll tell melton wednesday. the tip line isn't a person. it's the STREET. it's been the street since before us — some of the digest files go back past the subdivision, past the farms. locked the important stuff in the red note. code: sector, then badge.",
    },
    {
      id: "c9-n-locked",
      title: "red note — for melton",
      timestamp: "2025-12-09T00:30:00",
      lock: {
        code: "0412",
        hintText: "“code: sector, then badge.” — the vest has both.",
        clueSourceIds: ["c9-ph-vest", "c9-n-watchlog"],
      },
      evidenceLabel: "The red note: everything he was bringing to Melton's porch",
      body:
        "melton — you said bring it written down. here it is written down.\n\n1. the watch is real, the HOA lies, and every house on this court files weekly tips on every other house. mine included. I filed on you. tip #9, august. I'm sorry. you'll hear how sorry on wednesday.\n\n2. there is no leader. I broke into that thought like a house: gary's garage is just the PRINT SHOP. the tip line number doesn't exist. the digest 'compiles.' I've traced tips back through the HOA minutes to 1988, and in the county archive there's a 'road association circular' for this land from 1961 — same format. same phrase. 'note and normalize.' the street was watching when it was a dirt road, dave.\n\n3. what happens to lapsed volunteers: I found three names in old minutes who 'moved away suddenly.' none of them sold their houses. the houses got 'maintained.' the carsons' place? the carsons have been gone since 2019, dave. think about who's been bringing the casseroles.\n\n4. if I don't make it to your porch wednesday: it will look like I left dana. I would never leave dana. check the digest that goes out friday. if it says 4405 is 'maintained,' show this note to someone OFF the street. mail it, don't drive it. they note the cars.\n\n— hal brennan, 4405. sector 4, badge 12. 214 tips. I'm sorry for every one.",
    },
    {
      id: "c9-n-honeydew",
      title: "before dana's home",
      timestamp: "2025-12-07T10:00:00",
      evidenceLabel: "His list for Dana's homecoming — gutters, vacuuming, the yellow flowers",
      body: "fix gutter clip (north side)\nvacuum like I've been vacuuming all along\nflowers thursday — the yellow ones she pretends not to love\nreturn gary's ladder. actually. keep gary's ladder.",
    },
    {
      id: "c9-n-trains",
      title: "model trains (sell?)",
      timestamp: "2025-10-01T14:00:00",
      body: "russ is right, it's the trains again. the N-scale village in the basement — I built fourteen little houses and gave them all lit windows.\n\nfourteen. huh.\n\nnot selling. but noting.",
    },
  ],

  voicemails: [
    {
      id: "c9-vm-dana",
      callerLabel: "Dana ❤",
      callerNumber: "(614) 555-0151",
      timestamp: "2025-12-10T21:30:00",
      durationSec: 31,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Harold. I'm home. Your dinner is on the table and your car is in the garage and your vest is folded — you never fold the vest, I fold the vest. The Pattersons waved at me twice from their window. Twice, Harold. I'm calling the police, and I am NOT staying in this house tonight, and neither are you, wherever you are. Call me.”",
    },
    {
      id: "c9-vm-melton",
      callerLabel: "Dave Melton (4407)",
      callerNumber: "(614) 555-0193",
      timestamp: "2025-12-10T20:15:00",
      durationSec: 27,
      tone: "plain",
      evidenceLabel: "Melton's voicemail from his porch: the street was watching him wait",
      transcript:
        "[automated transcript — audio partially recovered]\n“Brennan, it's Dave. I sat on that porch an hour. Whatever you were going to tell me — I think I know part of it, because the whole time I sat there, fourteen porch lights came on, one at a time, in order, right around the court. Like a countdown. Or a roll call. I went inside and locked up. Call me from somewhere else. Not from the street. Somewhere ELSE.”",
    },
    {
      id: "c9-vm-hoa",
      callerLabel: "Patrice (HOA)",
      timestamp: "2025-12-11T09:00:00",
      durationSec: 22,
      tone: "static",
      evidenceLabel: "The HOA's chipper voicemail, two days after: his house is “in wonderful standing”",
      transcript:
        "[automated transcript]\n“Hal, hi, Patrice! Just confirming receipt of your— well, the paperwork's all in order, is the point! The house is in wonderful standing. Best it's ever looked, honestly. The street takes care of its own, and 4405 is very much its own now. Happy holidays to Dana! Just Dana. Bye!”",
    },
    {
      id: "c9-vm-schedule",
      callerLabel: "Maplecrest Watch",
      timestamp: "2025-12-09T21:00:00",
      durationSec: 48,
      tone: "distorted",
      evidenceLabel: "The tip line reading his own evening back to him, in real time",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Good evening, volunteer. Tonight you heated the casserole at six-forty. You checked the flood lights at seven-oh-two, seven-fifteen, and seven-twenty-one. You are holding the phone in your left hand at the kitchen window, which is not like you. Coffee is at six-fifty-five tomorrow. There is no need to set an alarm, volunteer. The street will wake you.”",
    },
    {
      id: "c9-vm-meeting",
      callerLabel: "No Caller ID",
      timestamp: "2025-12-11T02:09:00",
      durationSec: 51,
      tone: "breathing",
      evidenceLabel: "A recording of a “meeting” — acoustics matching HIS living room, while the house was sealed",
      transcript:
        "[automated transcript — multiple speakers detected]\n[room tone. forensic acoustics match: Brennan living room, 4405]\nSPEAKER 1: “—standing is resolved, then. All in favor.”\n[a soft sound, repeated approximately fourteen times — analysts disagree: hands raised, or porch lights switching]\nSPEAKER 2: “Note it.”\nSPEAKER 1: “Noted. And the wife?”\nSPEAKER 2: [pause] “The wife waves back or she doesn't. The street is patient.”\nSPEAKER 1: “Next item: the yard award.”\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: 4405 Maplecrest Ct was sealed under police tape with a unit parked outside at time of recording. The officer on watch reports the house was dark and silent — and that all thirteen other houses had a single lamp on, in the same window, until 2:10 AM.",
    },
  ],

  calendarEvents: [
    { id: "c9-cal-patrol", title: "watch patrol — sector 4", date: "2025-08-11", time: "22:00", recurring: "weekly", createdBy: "owner" },
    { id: "c9-cal-dana", title: "DANA HOME 🎉 (vacuum first)", date: "2025-12-14", time: "12:00", createdBy: "owner", evidenceLabel: "Dana's homecoming, five days after — with his reminder to vacuum first" },
    { id: "c9-cal-poker", title: "poker @ gary's", date: "2025-12-11", time: "19:30", recurring: "weekly", createdBy: "owner", struck: true, evidenceLabel: "Poker at Gary's — struck through, not by Hal" },
    { id: "c9-cal-melton", title: "melton's porch — bring the note", date: "2025-12-10", time: "19:00", createdBy: "owner", evidenceLabel: "Wednesday, Melton's porch — the meeting he never made" },
    {
      id: "c9-cal-quorum",
      title: "quorum",
      date: "2025-12-02",
      time: "21:09",
      recurring: "weekly",
      createdBy: "unknown",
      detail: "Appeared the night his name entered the digest. No account. No location. Fourteen attendees implied, none listed.",
      evidenceLabel: "A weekly 9:09 PM event, “quorum” — created by no one the night his name entered the digest",
    },
    { id: "c9-cal-abby", title: "abby home for break 🎓", date: "2025-12-19", time: "16:00", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c9-pin-home", label: "Home — 4405 Maplecrest Ct", timestamp: "2025-12-08T20:00:00", x: 50, y: 45 },
    { id: "c9-pin-hardware", label: "Maple True Value", timestamp: "2025-12-05T10:45:00", x: 30, y: 25 },
    { id: "c9-pin-patrol", label: "Patrol loop — sectors 3/4", timestamp: "2025-11-24T22:30:00", x: 60, y: 55 },
    {
      id: "c9-pin-garage",
      label: "4409 rear (Gary's garage)",
      timestamp: "2025-12-08T23:28:00",
      x: 55,
      y: 40,
      detail: "Eleven minutes at the rear of Gary's property, 11:28 PM. The garage photo was taken here. He walked home the long way — around the outside of the court, off the sidewalk, on the easement grass.",
      evidenceLabel: "Dec 8, 11:28 PM: eleven minutes behind Gary's garage — then home the long way, off the sidewalks",
    },
    {
      id: "c9-pin-last",
      label: "Home — final fix",
      timestamp: "2025-12-09T21:09:00",
      x: 50,
      y: 45,
      detail: "Final fix: 9:09 PM, Dec 9 — the exact minute of the weekly 'quorum.' Motion data ends mid-stride, in the kitchen, facing the window. The dinner on the table was his. The chair was pushed in.",
      evidenceLabel: "Final fix: 9:09 PM — quorum time. The chair was pushed in.",
    },
  ],

  browserHistory: [
    { id: "c9-b-join", query: "maplecrest watch how to join", timestamp: "2025-08-03T20:00:00" },
    { id: "c9-b-legal", query: "is logging neighbors comings and goings legal", timestamp: "2025-09-02T21:30:00" },
    { id: "c9-b-who", query: "who runs maplecrest watch tip line", timestamp: "2025-11-02T20:45:00", evidenceLabel: "“who runs maplecrest watch tip line” — zero results. The number doesn't exist." },
    { id: "c9-b-reverse", query: "reverse lookup tip line number no carrier found", timestamp: "2025-11-02T21:00:00" },
    { id: "c9-b-quit", query: "how to leave a neighborhood watch without problems", timestamp: "2025-11-29T22:00:00", evidenceLabel: "The night before he tried to quit: “how to leave a neighborhood watch without problems”" },
    { id: "c9-b-carsons", query: "carson family 4402 maplecrest where did they move", timestamp: "2025-12-07T22:30:00", evidenceLabel: "He searched for the Carsons — the neighbors whose casseroles kept coming" },
    { id: "c9-b-1961", query: "county archive road association circular 1961 maplecrest", timestamp: "2025-12-08T01:15:00", evidenceLabel: "1:15 AM: the 1961 road-association circular — “note and normalize,” same phrase, dirt-road era" },
    { id: "c9-b-movers", query: "moving companies quotes discreet", timestamp: "2025-12-08T01:40:00", evidenceLabel: "1:40 AM: he priced discreet movers" },
    { id: "c9-b-last", query: "can you sell a house without the neighbors knowing", timestamp: "2025-12-09T20:30:00", evidenceLabel: "His last search, 39 minutes before quorum: selling the house without the neighbors knowing" },
  ],

  hiddenApp: {
    disguiseIcon: "weather",
    disguiseLabel: "Maplecrest Alerts",
    revealAfterClueIds: ["c9-th-gary", "c9-n-watchlog"],
    title: "THE DIGEST — Distribution",
    heading: "Maplecrest Court · 14 households · 14 volunteers",
    body:
      "The 'community alerts' app every household is asked to install at their welcome barbecue. Its alert feed is weather and bake sales. Its other feed is this one.\n\nEvery house watches. Every house is watched. The ledger does not have an owner. It has a quorum.",
    entries: [
      { label: "4402 — CARSON", status: "MAINTAINED (2019)", detail: "casserole rotation active · file: 122 pp" },
      { label: "4405 — BRENNAN", status: "MAINTAINED (12/09)", detail: "consensus: 13-0 · file: 214 tips filed, 209 received" },
      { label: "4407 — MELTON", status: "WATCHED", detail: "porch meeting noted · standing under review" },
      { label: "4409 — GARY R.", status: "VOLUNTEER · PRINT", detail: "file: thick · everyone's file is thick" },
      { label: "4411 — VU", status: "WATCHED", detail: "gray coupe: normalized" },
      { label: "D. BRENNAN (spouse)", status: "PENDING", detail: "waves back: not yet · the street is patient" },
      { label: "ARCHIVE", status: "1961 — PRESENT", detail: "circulars · farm-era ledgers · 'note and normalize'" },
    ],
    footer:
      "Hal filed 214 tips and received 209. The vote on him was 13–0 — fourteen households, minus his own. The archive goes back past the subdivision, past the farms, to when the court was a dirt road with four houses that all faced each other. It has always been a street that knows its habits. It has never once been surprised.",
    evidenceLabel: "The Digest's ledger: BRENNAN “MAINTAINED 12/09, consensus 13–0” — and Dana marked PENDING",
  },

  liveEvents: [
    {
      id: "c9-live-digest",
      kind: "notification",
      afterSeconds: 330,
      title: "Maplecrest Alerts",
      body: "TIP DIGEST — SPECIAL: a device at 4405 is being reviewed by someone new. Noted.",
      glitch: true,
    },
    {
      id: "c9-live-watch",
      kind: "message",
      afterSeconds: 610,
      threadId: "c9-th-watch",
      message: {
        id: "c9-m-wa-live",
        from: "them",
        text: "you hold the phone in your left hand. you read the long messages twice. welcome, volunteer. your sector will be assigned.",
        timestamp: "2025-12-11T21:11:00",
        evidenceLabel: "The Watch, to whoever reads the phone: “welcome, volunteer. your sector will be assigned.”",
      },
    },
  ],

  verdicts: [
    {
      id: "c9-v-left",
      label: "He walked out on his life",
      description: "A marriage under strain, an obsession his wife mocked, a brother saying quit. Men his age disappear into new lives every day.",
      requiredEvidenceIds: ["c9-m-da-6", "c9-b-movers", "c9-n-honeydew"],
      isCanon: false,
      epilogue:
        "Midlife departure: the mover quotes, the strained calls, the obsessive little log. You can build it. You can even almost believe it, until you re-read the honey-do list — gutter clip, vacuum, the yellow flowers she pretends not to love. Men leaving their wives do not schedule the flowers.\n\nDana never accepts it, and Dana turns out to be right in the worst available way: in February the 'watch' account that followed Abby's campus page posts a photo. It's the yellow flowers, in a vase, on a kitchen table. Not Dana's kitchen. Nobody can identify the kitchen.\n\nThe post is deleted in nine minutes. The account has never posted before or since. Your report stays filed under voluntary departure. You keep a printout of the photo in the folder anyway, because somewhere a kitchen has his flowers in it, and 'voluntary' has to live with that.",
    },
    {
      id: "c9-v-street",
      label: "The street maintained him",
      description: "Fourteen households, weekly quorums, a digest with no compiler — and a unanimous vote the night the chair was pushed in.",
      requiredEvidenceIds: ["case-09.hidden", "c9-n-locked", "c9-ph-owntip", "c9-vm-schedule", "c9-cal-quorum"],
      isCanon: true,
      epilogue:
        "Your report names all thirteen voting households and charges none of them, because there is nothing chargeable in the file: no body, no blood, no witness who is not also a suspect, and a street full of people with the same calm sentence — 'we watch out for each other here.' The red note reaches Melton's hands and then the county prosecutor's, and it is the most complete map of the machine anyone will ever draw: the tips, the print shop, the casserole rotation, the maintained houses, the archive going back to dirt.\n\nWhat the prosecution cannot survive is the thing Hal found first: there is no head. Gary's folder is thick. Patrice's folder is thick. The digest compiles. You cannot indict a habit that fourteen households keep for each other, and the habit knows it.\n\nDana sells the house in the spring — to a young couple the listing agent describes as 'lovely, cash, very community-minded.' The Watch account unfollows Abby the day escrow closes. The street's file on the Brennans, presumably, is marked closed.\n\nMelton mails the note's copies to three newspapers, from three mailboxes, in three towns, exactly as instructed. One prints it. The comment section fills, within hours, with hundreds of replies from suburbs across the country, and the most-liked comment — posted by an account with a house number for a name — says only: 'Every street has a digest. Yours is just politer about it.' The paper takes the story down that weekend. 'Note and normalize,' the editor says, when asked why. He doesn't know why he chose those words.\n\nHal Brennan filed 214 tips. His last act was an apology, written down, delivered late. Your report ends by entering it into the record in full, because someone on that street should finally have their words kept the way they meant them.",
    },
    {
      id: "c9-v-gary",
      label: "Gary handled it personally",
      description: "The key, the garage, the print shop, ten years of access — and a poker invitation two days after the vote.",
      requiredEvidenceIds: ["c9-ph-garage", "c9-m-ga-7", "c9-m-da-4"],
      isCanon: false,
      epilogue:
        "The best friend with the key: you interview Gary four times, and Gary cries in two of them, and both times the tears read true. Yes, the garage is the print shop — he inherited the job from the last guy at 4409, who inherited it from the guy before. No, he doesn't know who started it. Yes, he filed on Hal. Hal filed on him. 'That's the street,' he says, and then, quietly, 'that was supposed to be all it was.'\n\nHis alibi for quorum night is thirteen neighbors. Of course it is.\n\nThe detail that ends the theory is the folded vest. Gary, shown the photo, identifies it before you finish the question — and then goes gray, actually gray, and asks for water. The vests, he explains, get folded and returned to the print shop when a volunteer's standing resolves. He'd printed the labels for years and never asked what 'resolves' meant. There's a bin of them in the garage. You went back and counted. Eleven vests, folded identically, going back decades. Sector 4 has had a lot of badge 12s.",
    },
    {
      id: "c9-v-older",
      label: "The Watch predates the watchers",
      description: "A tip line with no carrier. Circulars from 1961. A meeting recorded in a sealed house. Fourteen lamps that all went out at 2:10.",
      requiredEvidenceIds: ["c9-vm-meeting", "c9-b-1961", "c9-m-wa-6"],
      isCanon: false,
      epilogue:
        "You write the deep version: the Maplecrest Watch is older than Maplecrest, older than the HOA, older than the pavement — a standing arrangement the land came with, which each generation of neighbors joins believing they invented it. The 1961 circular. The farm-era ledgers Hal found references to. A tip line that no phone company has ever billed, ringing anyway.\n\nThe county archivist, who has no reason to humor you, confirms the ugly part: 'road associations' with identical language appear in records for eleven other subdivisions in the region, all built on parcels from the same original land company. The land company dissolved in 1911. Its filings list no officers. Its seal — you have it photographed — is a ring of fourteen small houses, windows filled in by hand.\n\nThe report is returned to you unsigned, with a sticky note: 'We live in these neighborhoods too.' You resubmit it once. It comes back the same day.\n\nYou live eight miles from Maplecrest Court, on a street with a community app and a welcome barbecue. Last month the digest — your street calls it a 'newsletter' — mentioned that you'd been working late. It was phrased warmly. Everything is phrased warmly. You read it twice, holding your phone in your left hand, and somewhere in the file of you, that was noted.",
    },
  ],
};

export default c9;
