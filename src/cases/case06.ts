import type { CaseFile } from "../types";
import { photoSvg, wall, doorway, timestampBurn } from "../photoart";

/**
 * CASE 06 — THE SLEEP STUDY
 * Casey Brandt, 20. Junior, biology. Enrolled in a paid overnight
 * sleep-research trial in the old Kestrel annex — $150 a night, cash.
 * His phone spent ten nights inside the building. The building says
 * he never checked in. The building may be right.
 */

const c6: CaseFile = {
  id: "case-06",
  title: "The Sleep Study",
  victimName: "Casey Brandt, 20",
  summary:
    "A broke college junior signed up for a cash-paid overnight sleep study. His phone logged ten nights inside the research annex; the university says the annex has been empty since 2021 and no study exists. On night ten, the phone stayed. Casey didn't.",
  intake:
    "SUBJECT: Brandt, Casey J. (20). Reported missing by roommate Nov 21 after missing two days of classes and an academic hearing prep meeting.\n\nDEVICE: Recovered Nov 22 from a storage room in the Kestrel Hall annex, powered on, 38% battery, lying on a shelf beside seven other phones of assorted ages. None of the other seven has been claimed. All eight were running the same application.\n\nUNIVERSITY STATEMENT: Kestrel Hall annex decommissioned 2021; no IRB-approved sleep study exists on campus; door logs show no entries for the past 26 months. Facilities cannot explain why the annex's power draw has spiked between 23:00 and 06:00 nightly since September.\n\nFINANCIAL: Subject owed $6,300 to CampusCash, a lending app under state investigation. Subject was also scheduled for an academic-integrity hearing Dec 1.\n\nSecond-pass review requested. The seven other phones are being traced.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "casey — do not read my texts josh",
    recoveredAt: "2025-11-23T21:15:00",
    batteryStart: 38,
    wallpaperHue: 215,
    lockScreenNotifications: [
      { appId: "messages", title: "Josh (roommate)", preview: "bro the RA is asking me questions. where ARE you", targetId: "c6-th-josh" },
      { appId: "messages", title: "Kestrel Study", preview: "Night 11 is available to you, Subject 09.", targetId: "c6-th-kestrel" },
      { appId: "messages", title: "CampusCash", preview: "FINAL NOTICE before your balance is referred to recovery partners.", targetId: "c6-th-campuscash" },
    ],
  },

  messages: [
    {
      id: "c6-th-josh",
      contactName: "Josh (roommate)",
      contactNumber: "(414) 555-0173",
      messages: [
        { id: "c6-m-jo-1", from: "them", text: "you're never here anymore man. you got a girl or a night job or what", timestamp: "2025-11-12T13:20:00" },
        { id: "c6-m-jo-2", from: "owner", text: "sleep study. kestrel annex. $150 a NIGHT josh. cash. I literally get paid to sleep", timestamp: "2025-11-12T13:41:00" },
        { id: "c6-m-jo-3", from: "them", text: "150 cash?? sign me up", timestamp: "2025-11-12T13:42:00" },
        {
          id: "c6-m-jo-4",
          from: "owner",
          text: "they're not taking anyone else. proctor said the cohort is 'complete at eight.' also don't come by there. I mean it. it's a sterile protocol thing",
          timestamp: "2025-11-12T13:50:00",
          evidenceLabel: "Casey kept his roommate away from the annex — “the cohort is complete at eight”",
        },
        { id: "c6-m-jo-5", from: "them", text: "weird flex but ok. you still owe me for october wifi btw", timestamp: "2025-11-12T13:52:00" },
        { id: "c6-m-jo-6", from: "owner", text: "after night 10 I'll square EVERYTHING. everything gets squared after night 10", timestamp: "2025-11-12T14:01:00", evidenceLabel: "“everything gets squared after night 10”" },
        { id: "c6-m-jo-7", from: "them", text: "you sold your BIKE? saw dmitri riding it. you love that bike??", timestamp: "2025-11-16T17:30:00", evidenceLabel: "He sold the bike he loved, four days before night 10" },
        { id: "c6-m-jo-8", from: "owner", text: "needed the cash more than the cardio", timestamp: "2025-11-16T17:44:00" },
        { id: "c6-m-jo-9", from: "them", text: "bro the RA is asking me questions. where ARE you", timestamp: "2025-11-21T16:10:00" },
      ],
    },
    {
      id: "c6-th-kestrel",
      contactName: "Kestrel Study",
      messages: [
        { id: "c6-m-ke-1", from: "them", text: "Thank you for your interest in the Kestrel overnight sleep protocol. You have been assigned: SUBJECT 09. Compensation: $150/night, cash, mornings. Report to the annex east door, 23:00. Bring nothing. Tell no one the schedule.", timestamp: "2025-11-09T16:00:00", evidenceLabel: "The study's terms: cash, the east door, “bring nothing, tell no one”" },
        { id: "c6-m-ke-2", from: "owner", text: "do I need to sign consent forms or bring my student ID?", timestamp: "2025-11-09T16:12:00" },
        { id: "c6-m-ke-3", from: "them", text: "Consent is collected during sleep. Identification is not necessary. We know who sleeps.", timestamp: "2025-11-09T16:13:00", evidenceLabel: "“Consent is collected during sleep. We know who sleeps.”" },
        { id: "c6-m-ke-4", from: "owner", text: "…for the study records, what department is this under? my friend said there's no kestrel study listed", timestamp: "2025-11-13T10:30:00" },
        { id: "c6-m-ke-5", from: "them", text: "Your friend is correct. Listing a study invites interference. Interference wakes the cohort. Please install the companion application before night 5. It is already on your phone.", timestamp: "2025-11-13T10:31:00", evidenceLabel: "“Please install the companion app. It is already on your phone.”" },
        { id: "c6-m-ke-6", from: "owner", text: "what do you mean it's already on my phone", timestamp: "2025-11-13T10:33:00" },
        { id: "c6-m-ke-7", from: "them", text: "Night 5 begins at 23:00. You are doing very well, Subject 09. Your readings are the quietest in the cohort. The quiet ones finish early.", timestamp: "2025-11-13T18:00:00" },
        { id: "c6-m-ke-8", from: "them", text: "Night 10 concludes the protocol. Per protocol, you were never here. Compensation for night 10 is different. Compensation for night 10 is what you asked for when asked in your sleep.", timestamp: "2025-11-19T18:00:00", evidenceLabel: "Night 10's pay: “what you asked for when asked in your sleep”" },
        { id: "c6-m-ke-9", from: "them", text: "Night 11 is available to you, Subject 09.", timestamp: "2025-11-21T23:00:00" },
      ],
    },
    {
      id: "c6-th-campuscash",
      contactName: "CampusCash",
      messages: [
        { id: "c6-m-cc-1", from: "them", text: "CampusCash: Your balance of $4,850 has accrued a convenience adjustment. New balance: $5,420. Tap to review your options! 😊", timestamp: "2025-10-02T09:00:00" },
        { id: "c6-m-cc-2", from: "them", text: "CampusCash: Missed minimum. New balance: $6,300. Did you know friends and family can help? We can contact them for you!", timestamp: "2025-11-01T09:00:00", evidenceLabel: "CampusCash offering to contact his family about the $6,300" },
        { id: "c6-m-cc-3", from: "owner", text: "do NOT contact my parents. I'm getting the money. give me until the 20th", timestamp: "2025-11-01T09:20:00", evidenceLabel: "Casey to the lender: “give me until the 20th” — night 10 was the 19th" },
        { id: "c6-m-cc-4", from: "them", text: "CampusCash: We've noted your promise date of Nov 20! Reminder: our recovery partners are local. 😊", timestamp: "2025-11-01T09:21:00", evidenceLabel: "The lender's reply: “our recovery partners are local 😊”" },
        { id: "c6-m-cc-5", from: "them", text: "FINAL NOTICE before your balance is referred to recovery partners.", timestamp: "2025-11-20T09:00:00" },
      ],
    },
    {
      id: "c6-th-marisol",
      contactName: "Marisol (cousin)",
      contactNumber: "(715) 555-0159",
      ghostTypingAfterSeconds: 380,
      messages: [
        { id: "c6-m-ma-1", from: "them", text: "cuz!! thanksgiving?? tia's doing the tamales", timestamp: "2025-11-08T19:00:00" },
        { id: "c6-m-ma-2", from: "owner", text: "can't this year. also random — can I use your address for a package? and maybe your name. it's not illegal it's just complicated", timestamp: "2025-11-08T19:30:00", evidenceLabel: "He asked to use his cousin's name and address — “it's not illegal it's just complicated”" },
        { id: "c6-m-ma-3", from: "them", text: "casey brandt. what did you do", timestamp: "2025-11-08T19:32:00" },
        { id: "c6-m-ma-4", from: "owner", text: "nothing yet. I'll explain over christmas. you're the only one I trust with this", timestamp: "2025-11-08T19:40:00" },
        {
          id: "c6-m-ma-5",
          from: "them",
          text: "ok so why did a BUS CONFIRMATION just come to my email. 'M. BRANDT, route 88.' casey that's MY name on YOUR ticket",
          timestamp: "2025-11-15T21:15:00",
          evidenceLabel: "A Route 88 bus ticket booked under his cousin's name, to her email",
        },
        { id: "c6-m-ma-6", from: "owner", text: "delete that email. please. I'm serious mari. after the 20th I'll call you and explain everything. everything's fine. everything's PLANNED", timestamp: "2025-11-15T21:22:00", evidenceLabel: "“everything's PLANNED” — he told his cousin to delete the ticket email" },
        { id: "c6-m-ma-7", from: "them", text: "you better call me on the 20th or I'm telling tia", timestamp: "2025-11-15T21:24:00" },
        { id: "c6-m-ma-8", from: "them", text: "it's the 21st casey", timestamp: "2025-11-21T20:00:00" },
      ],
    },
    {
      id: "c6-th-nia",
      contactName: "Nia",
      contactNumber: "(414) 555-0135",
      messages: [
        { id: "c6-m-ni-1", from: "them", text: "you fell asleep in bio again. professor kept lecturing AT you. it was art", timestamp: "2025-11-14T11:30:00" },
        { id: "c6-m-ni-2", from: "owner", text: "the study wrecks your days. worth it tho", timestamp: "2025-11-14T11:41:00" },
        { id: "c6-m-ni-3", from: "them", text: "casey. you said the proctor never blinks and the mattress is warm when you arrive. NOTHING about that is worth it", timestamp: "2025-11-14T11:44:00", evidenceLabel: "What he told Nia: the proctor never blinks; the mattress is warm when he arrives" },
        { id: "c6-m-ni-4", from: "owner", text: "$150 a night is worth a weird guy and a pre-warmed mattress", timestamp: "2025-11-14T11:47:00" },
        { id: "c6-m-ni-5", from: "owner", text: "hey. if I did something kind of drastic to fix my life, and it looked bad for a while, would you think less of me", timestamp: "2025-11-18T23:40:00", evidenceLabel: "The night before night 10: “if I did something drastic to fix my life… would you think less of me”" },
        { id: "c6-m-ni-6", from: "them", text: "depends. drastic like dropping bio or drastic like a heist", timestamp: "2025-11-18T23:44:00" },
        { id: "c6-m-ni-7", from: "owner", text: "drastic like sleep", timestamp: "2025-11-18T23:51:00" },
      ],
    },
    {
      id: "c6-th-dad",
      contactName: "Dad",
      contactNumber: "(715) 555-0121",
      messages: [
        { id: "c6-m-da-1", from: "them", text: "Semester bill came. We covered what we could. You good on the rest? Be straight with me.", timestamp: "2025-10-15T18:00:00" },
        { id: "c6-m-da-2", from: "owner", text: "all handled dad. picked up campus work. don't worry", timestamp: "2025-10-15T18:30:00" },
        { id: "c6-m-da-3", from: "them", text: "Proud of you. Your mother wants to know if you're eating vegetables. I told her no. Prove me wrong.", timestamp: "2025-10-15T18:35:00" },
        { id: "c6-m-da-4", from: "them", text: "Casey, a debt company called the HOUSE asking for you. What is going on?", timestamp: "2025-11-21T10:15:00", evidenceLabel: "CampusCash called his parents' house on the 21st — after his deadline passed" },
      ],
    },
    {
      id: "c6-th-ta",
      contactName: "Prof. Okada (Bio 340)",
      contactNumber: "(414) 555-0118",
      messages: [
        { id: "c6-m-ok-1", from: "them", text: "Mr. Brandt — the integrity committee has scheduled your hearing for Dec 1. I want you to know I argued for a hearing rather than a summary finding. Use it.", timestamp: "2025-11-05T15:00:00", evidenceLabel: "The academic-integrity hearing set for Dec 1" },
        { id: "c6-m-ok-2", from: "owner", text: "thank you professor. I know how it looks. the lab report similarities — I can explain the study group thing in person", timestamp: "2025-11-05T15:40:00" },
        { id: "c6-m-ok-3", from: "them", text: "Then explain it in person on Dec 1. Don't do anything that makes explanation impossible.", timestamp: "2025-11-05T15:44:00" },
      ],
    },
    {
      id: "c6-th-dmitri",
      contactName: "Dmitri (buyer)",
      contactNumber: "(414) 555-0188",
      messages: [
        { id: "c6-m-dm-1", from: "them", text: "still selling the bike? 220?", timestamp: "2025-11-15T12:00:00" },
        { id: "c6-m-dm-2", from: "owner", text: "260 and it's yours today. cash only", timestamp: "2025-11-15T12:10:00" },
        { id: "c6-m-dm-3", from: "them", text: "240 and I bring it now", timestamp: "2025-11-15T12:11:00" },
        { id: "c6-m-dm-4", from: "owner", text: "deal. also selling: monitor, switch, winter boots size 11. everything must go", timestamp: "2025-11-15T12:15:00", evidenceLabel: "“everything must go” — he liquidated his room in one week" },
      ],
    },
    {
      id: "c6-th-pizza",
      contactName: "Slice House",
      messages: [
        { id: "c6-m-pz-1", from: "them", text: "SLICE HOUSE: Your usual Tuesday order? Reply Y and it's in the oven 🍕", timestamp: "2025-11-11T18:00:00" },
        { id: "c6-m-pz-2", from: "owner", text: "Y", timestamp: "2025-11-11T18:02:00" },
        { id: "c6-m-pz-3", from: "them", text: "SLICE HOUSE: Your usual Tuesday order? Reply Y and it's in the oven 🍕", timestamp: "2025-11-18T18:00:00" },
        { id: "c6-m-pz-4", from: "them", text: "SLICE HOUSE: We miss you! Here's 10% off your next usual 🍕", timestamp: "2025-11-25T18:00:00" },
      ],
    },
    {
      id: "c6-th-unknown",
      contactName: "Unknown",
      messages: [
        { id: "c6-m-un-1", from: "them", text: "we know you're awake.", timestamp: "2025-11-17T03:33:00", evidenceLabel: "3:33 AM, mid-study: “we know you're awake.”" },
        { id: "c6-m-un-2", from: "owner", text: "who is this. the lab? a collector? pick one, I have a folder for each of you", timestamp: "2025-11-17T03:40:00" },
        { id: "c6-m-un-3", from: "them", text: "the folder is a good idea. keep planning. we like watching you plan.", timestamp: "2025-11-17T03:41:00", evidenceLabel: "“keep planning. we like watching you plan.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c6-ph-flyer",
      caption: "found on the bio building corkboard. no department. no email. just a phone number and a promise",
      timestamp: "2025-11-08T14:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-08T14:20:00", device: "This phone", location: "Wexler Bio Bldg" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1712"/>` +
          `<rect x="55" y="60" width="190" height="280" fill="#d8d2c2" opacity="0.92" transform="rotate(2 150 200)"/>` +
          `<text x="150" y="110" text-anchor="middle" font-family="serif" font-size="17" fill="#2a2620">CAN YOU SLEEP?</text>` +
          `<text x="150" y="140" text-anchor="middle" font-family="serif" font-size="12" fill="#4a4436">PAID OVERNIGHT STUDY</text>` +
          `<text x="150" y="165" text-anchor="middle" font-family="serif" font-size="13" fill="#7a3a42">$150 / NIGHT · CASH</text>` +
          `<text x="150" y="200" text-anchor="middle" font-family="serif" font-size="10" fill="#4a4436">healthy sleepers 18–25</text>` +
          `<text x="150" y="218" text-anchor="middle" font-family="serif" font-size="10" fill="#4a4436">ten nights · east door · 11pm</text>` +
          `<text x="150" y="250" text-anchor="middle" font-family="monospace" font-size="10" fill="#2a2620">TEXT: KESTREL</text>` +
          Array.from({ length: 6 }, (_, i) => `<rect x="${70 + i * 28}" y="290" width="18" height="34" fill="#c4bca8" stroke="#8b8371" stroke-width="0.5"/>`).join("") +
          `<rect x="182" y="290" width="18" height="34" fill="#1a1712" opacity="0.15"/>`,
        { aspect: "portrait", base: "#141209", grain: 0.11 },
      ),
      evidenceLabel: "The flyer: no department, no name — every tear-tab already gone but one",
    },
    {
      id: "c6-ph-annex",
      caption: "kestrel annex, 10:58pm. 'decommissioned.' the east door was unlocked. the east door is always unlocked",
      timestamp: "2025-11-10T22:58:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-10T22:58:00", device: "This phone", location: "Kestrel Hall annex" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0b0d11"/>` +
          `<rect x="60" y="90" width="280" height="160" fill="#161a20"/>` +
          `<path d="M50 90 L200 50 L350 90Z" fill="#11141a"/>` +
          Array.from({ length: 4 }, (_, i) => `<rect x="${90 + i * 60}" y="120" width="34" height="44" fill="#0a0c10"/>`).join("") +
          `<rect x="290" y="170" width="40" height="80" fill="#08090c"/>` +
          `<circle cx="310" cy="160" r="14" fill="#3f4a2c" opacity="0.25"/>` +
          `<rect x="90" y="128" width="34" height="10" fill="#232d1c" opacity="0.5"/>`,
        { aspect: "landscape", base: "#090b0e", grain: 0.16 },
      ),
      evidenceLabel: "The annex at night: dark except one window — on a floor with no power account",
    },
    {
      id: "c6-ph-lab",
      caption: "my room. bed, wires, intercom. the wires don't plug into anything. I checked while he wasn't looking. there's no 'while he isn't looking' actually",
      timestamp: "2025-11-11T23:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-11T23:20:00", device: "This phone", location: "Kestrel annex, rm 2" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#181c22") +
          `<rect x="60" y="160" width="200" height="80" rx="8" fill="#242a32"/>` +
          `<rect x="60" y="140" width="60" height="30" rx="6" fill="#2c333c"/>` +
          Array.from({ length: 5 }, (_, i) => `<path d="M${120 + i * 30} 160 q ${10 - (i % 3) * 8} -40 ${20 - (i % 2) * 30} -60" stroke="#3a424c" stroke-width="2" fill="none"/>`).join("") +
          `<rect x="300" y="90" width="60" height="40" rx="4" fill="#10141a"/>` +
          `<circle cx="330" cy="110" r="6" fill="#1c2530"/>` +
          `<text x="330" y="145" text-anchor="middle" font-family="monospace" font-size="8" fill="#39404b">INTERCOM</text>`,
        { aspect: "landscape", base: "#12151a", grain: 0.13 },
      ),
      evidenceLabel: "His room in the study: electrodes wired to nothing, an intercom wired to something",
    },
    {
      id: "c6-ph-ceiling",
      caption: "directly above the pillow. 'airflow sensor.' airflow sensors don't have apertures. bio majors notice apertures",
      timestamp: "2025-11-13T23:45:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-13T23:45:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1b1f26"/>` +
          `<rect x="0" y="0" width="300" height="400" fill="#202631"/>` +
          `<circle cx="150" cy="190" r="46" fill="#171c24"/>` +
          `<circle cx="150" cy="190" r="30" fill="#10141b"/>` +
          `<circle cx="150" cy="190" r="12" fill="#05070a"/>` +
          `<circle cx="146" cy="186" r="3" fill="#2c3642" opacity="0.8"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="${64 + i * 24}" y="60" width="12" height="3" fill="#181e26"/>`).join(""),
        { aspect: "portrait", base: "#141820", grain: 0.12 },
      ),
      evidenceLabel: "The “airflow sensor” above the pillow — with a lens aperture",
    },
    {
      id: "c6-ph-cash",
      caption: "nights 1-5. crisp fifties. sequential serials. banks give sequential. people don't",
      timestamp: "2025-11-14T07:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-14T07:10:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#15171b"/>` +
          Array.from({ length: 5 }, (_, i) => `<rect x="${60 + i * 20}" y="${100 + i * 12}" width="180" height="70" rx="4" fill="#2c3a2e" transform="rotate(${-4 + i * 2} ${150 + i * 20} ${135 + i * 12})"/>`).join("") +
          `<rect x="140" y="148" width="180" height="70" rx="4" fill="#354538"/>` +
          `<text x="230" y="188" text-anchor="middle" font-family="serif" font-size="20" fill="#1d2a20">50</text>` +
          `<rect x="60" y="240" width="120" height="26" rx="4" fill="#cfc7b2" opacity="0.8"/>` +
          `<text x="120" y="257" text-anchor="middle" font-family="monospace" font-size="9" fill="#3a3427">$750 — J.T.M.K.</text>`,
        { aspect: "landscape", base: "#101216", grain: 0.11 },
      ),
      evidenceLabel: "The cash: crisp sequential fifties in an envelope initialed J.T.M.K.",
    },
    {
      id: "c6-ph-whiteboard",
      caption: "",
      timestamp: "2025-11-09T01:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-09T01:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#14161a"/>` +
          `<rect x="40" y="40" width="320" height="220" rx="6" fill="#d8d5cc" opacity="0.92"/>` +
          `<text x="60" y="80" font-family="monospace" font-size="13" fill="#7a3a42">OWE: 6300 (cc) + 400 (josh/misc)</text>` +
          `<text x="60" y="110" font-family="monospace" font-size="13" fill="#2a4a6b">HAVE: 480</text>` +
          `<text x="60" y="150" font-family="monospace" font-size="13" fill="#2a2620">study ×10 = 1500</text>` +
          `<text x="60" y="180" font-family="monospace" font-size="13" fill="#2a2620">sell: bike, monitor, switch, boots ≈ 600</text>` +
          `<text x="60" y="220" font-family="monospace" font-size="14" fill="#7a3a42">= still short. short doesn't matter if gone.</text>`,
        { aspect: "landscape", base: "#0f1114", grain: 0.09 },
      ),
      evidenceLabel: "His whiteboard math, ending: “short doesn't matter if gone.”",
    },
    {
      id: "c6-ph-dorm",
      caption: "room's looking empty. minimalism. that's what it is. minimalism",
      timestamp: "2025-11-17T20:15:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-17T20:15:00", device: "This phone", location: "Hargrove Hall 412" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#1c1f25") +
          `<rect x="40" y="180" width="140" height="70" rx="6" fill="#242a32"/>` +
          `<rect x="40" y="160" width="140" height="26" rx="6" fill="#2a313a"/>` +
          `<rect x="240" y="120" width="110" height="130" fill="#171b21"/>` +
          `<rect x="250" y="130" width="90" height="20" fill="#12161b"/>` +
          `<circle cx="110" cy="120" r="3" fill="#39404b"/><path d="M110 120 l30 -14" stroke="#39404b" stroke-width="1.5"/>`,
        { aspect: "landscape", base: "#14171c", grain: 0.12 },
      ),
    },
    {
      id: "c6-ph-proctor-door",
      caption: "the proctor's office. he's in there between rounds. I have never heard the chair move. I have never heard anything move",
      timestamp: "2025-11-15T02:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-15T02:20:00", device: "This phone", location: "Kestrel annex, corridor B" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101318"/>` +
          doorway(80, 100, 140, 280, "#0a0c10") +
          `<rect x="80" y="100" width="140" height="280" fill="#151920"/>` +
          `<rect x="98" y="180" width="104" height="60" fill="#0d1015"/>` +
          `<text x="150" y="90" text-anchor="middle" font-family="monospace" font-size="11" fill="#4a5560">B-06 · PROCTOR</text>` +
          `<rect x="98" y="200" width="104" height="4" fill="#1f2833" opacity="0.7"/>`,
        { aspect: "portrait", base: "#0d0f13", grain: 0.15 },
      ),
    },
    {
      id: "c6-ph-storage",
      caption: "",
      timestamp: "2025-11-19T03:12:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-19T03:12:00", device: "This phone", location: "Kestrel annex" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060708"/>`,
        { aspect: "landscape", base: "#050607", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0b0d10"/>` +
            `<rect x="40" y="60" width="320" height="14" fill="#1a1712"/>` +
            `<rect x="40" y="150" width="320" height="14" fill="#1a1712"/>` +
            Array.from({ length: 7 }, (_, i) => `<rect x="${60 + i * 44}" y="${34 + (i % 2) * 2}" width="26" height="26" rx="4" fill="#10141a"/><rect x="${64 + i * 44}" y="${38 + (i % 2) * 2}" width="18" height="16" rx="2" fill="#1c2530" opacity="0.8"/>`).join("") +
            Array.from({ length: 7 }, (_, i) => `<text x="${73 + i * 44}" y="${52 + (i % 2) * 2}" text-anchor="middle" font-family="monospace" font-size="6" fill="#39404b">z</text>`).join("") +
            `<rect x="60" y="124" width="26" height="26" rx="4" fill="#10141a"/>` +
            `<text x="200" y="230" text-anchor="middle" font-family="monospace" font-size="10" fill="#4a4453">seven phones. one empty slot. slot 8 has my name on tape</text>` +
            timestampBurn("03:12:40", 400, 300),
          { aspect: "landscape", base: "#08090c", grain: 0.13 },
        ),
      },
      evidenceLabel: "His photo of the storage shelf: seven old phones, and an empty slot labeled with his name",
    },
    // ---- Recently Deleted ---------------------------------------------------
    {
      id: "c6-ph-packlist",
      caption: "",
      timestamp: "2025-11-16T01:40:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-16T01:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#131118"/>` +
          `<rect x="50" y="50" width="200" height="300" fill="#d8d2c2" opacity="0.9"/>` +
          `<text x="70" y="85" font-family="monospace" font-size="11" fill="#2a2620">AFTER NIGHT 10:</text>` +
          `<text x="70" y="115" font-family="monospace" font-size="10" fill="#4a4436">- duffel only. gray one</text>` +
          `<text x="70" y="140" font-family="monospace" font-size="10" fill="#4a4436">- cash split 3 places</text>` +
          `<text x="70" y="165" font-family="monospace" font-size="10" fill="#4a4436">- phone STAYS. they track the</text>` +
          `<text x="70" y="182" font-family="monospace" font-size="10" fill="#4a4436">  phone not the person</text>` +
          `<text x="70" y="210" font-family="monospace" font-size="10" fill="#7a3a42">- 06:40 walk, not run</text>` +
          `<text x="70" y="240" font-family="monospace" font-size="10" fill="#2a2620">- seat 14. window. head down</text>` +
          `<text x="70" y="280" font-family="monospace" font-size="10" fill="#4a4436">- call mari from a payphone</text>` +
          `<text x="70" y="305" font-family="monospace" font-size="10" fill="#4a4436">  (harlow still has one. checked)</text>`,
        { aspect: "portrait", base: "#0e0c12", grain: 0.1 },
      ),
      evidenceLabel: "Deleted photo of his handwritten exit plan — “phone STAYS… seat 14… walk, not run”",
    },
    {
      id: "c6-ph-duffel",
      caption: "",
      timestamp: "2025-11-18T22:30:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-18T22:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#15171c"/>` +
          `<ellipse cx="150" cy="260" rx="110" ry="55" fill="#2c3038"/>` +
          `<rect x="60" y="200" width="180" height="70" rx="30" fill="#343a44"/>` +
          `<path d="M100 200 q50 -50 100 0" stroke="#232830" stroke-width="8" fill="none"/>` +
          `<rect x="140" y="230" width="24" height="10" rx="3" fill="#1d2128"/>`,
        { aspect: "portrait", base: "#101216", grain: 0.12 },
      ),
      evidenceLabel: "Deleted photo: the gray duffel, packed, by the dorm door — the duffel was never found",
    },
  ],

  notes: [
    {
      id: "c6-n-nightlog",
      title: "study log (for the folder)",
      timestamp: "2025-11-18T07:30:00",
      evidenceLabel: "His study log: what ten nights in the annex were actually like",
      body:
        "keeping records of everything now. folders for everyone.\n\nnight 1 — checked in. no forms. proctor: tall, gray cardigan, name tag says only PROCTOR. speaks like text-to-speech that practiced. paid me BEFORE I slept. who pays first?\n\nnight 3 — woke at 3:33 to the intercom. breathing sound, but like a recording of breathing played AT me. mattress warm on arrival again. asked proctor who has my room during the day. he said 'the room rests.'\n\nnight 5 — the app appeared. I did not install it. it has no icon settings. it says DreamLog. it knows my nickname. not my name. my NICKNAME. only my dad calls me that.\n\nnight 7 — talked in my sleep apparently. proctor thanked me at 6am for my 'clear answers.' asked what I answered. he said 'everything we asked.'\n\nnight 8 — found the storage room. seven phones. old ones, flip ones, one smashed. all charging. all running dreamlog. slot 8 is empty and labeled C. BRANDT. I never told them my name.\n\nnight 9 — okay. important realization, writing it in daylight: whatever this is, it's PERFECT. nobody will look at a debt kid and a fake lab and blame the kid. I'm sorry to whoever reads this folder. I need it to look exactly the way it's going to look.\n\nnight 10 tomorrow. the code to my real note is the way out: the route, then the seat.",
    },
    {
      id: "c6-n-locked",
      title: "the folder",
      timestamp: "2025-11-19T06:20:00",
      lock: {
        code: "8814",
        hintText: "“the way out: the route, then the seat.” — the bus he researched, the seat on his packing list.",
        clueSourceIds: ["c6-b-route88", "c6-ph-packlist"],
      },
      evidenceLabel: "The locked note: his confession, and his terms",
      body:
        "if you're police, or mari, or (god) dad: yes. I planned it. I'm not in the annex. I was never IN danger in the annex — I was in danger everywhere else.\n\nthe math didn't work. 6300 to an app that adds 'convenience adjustments,' a hearing dec 1 that ends my scholarship either way, and dad's face if the collectors call the house again. the study fell into my lap like a screenplay: a lab that doesn't exist, a proctor from a nightmare, seven phones on a shelf. nobody was ever going to look for a RUNAWAY. they were going to look for a VICTIM. victims get sympathy. runaways get invoices.\n\nso: night 10, I walked out the east door at 6:40 with the duffel. phone stays on the shelf in slot 8 — let them wonder about slot 8. bus at 7:05, seat 14, under a name I borrowed from the only person I'd trust with my heartbeat. I'll pay CampusCash from far away, in cash, in pieces. I'll call mari when it's safe. tell nia it wasn't about her. tell josh the wifi money is inside his left boot. tell prof okada I would have passed the hearing and that's the worst part.\n\nlast thing, and I'm writing it because the folder deserves everything: I said I was never in danger in the annex. night 10, while I packed the duffel at 3am, the intercom clicked on and the proctor's voice said 'we approve, subject 09. quiet ones finish early.' I never told anyone the plan. not one soul, not out loud, not once.\n\nI told it in my sleep. they asked, and I answered, and they APPROVED.\n\ndon't come to harlow. — C",
    },
    {
      id: "c6-n-debts",
      title: "who I owe (all of it)",
      timestamp: "2025-11-07T22:00:00",
      body: "campuscash: 6300 (real number, wrote it down so it stops changing)\njosh: 40 wifi + 85 misc\nnia: one apology, unrelated to money\ndad: everything, category: unpayable",
    },
    {
      id: "c6-n-classes",
      title: "finals schedule",
      timestamp: "2025-11-03T12:00:00",
      body: "bio 340 — dec 9\nochem — dec 11\nstats — dec 12\n\n(reminder: hearing dec 1. one thing at a time. sleep, then everything else.)",
    },
  ],

  voicemails: [
    {
      id: "c6-vm-dad",
      callerLabel: "Dad",
      callerNumber: "(715) 555-0121",
      timestamp: "2025-11-21T19:30:00",
      durationSec: 27,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Case. It's dad. A company called the house and your roommate says you haven't been in your bed and I'm — look. Whatever it is. Whatever the number is, whatever the trouble is. There is nothing you could tell me that's worse than this phone not ringing. Call me. I'll drive down tonight.”",
    },
    {
      id: "c6-vm-collector",
      callerLabel: "Recovery Partners LLC",
      callerNumber: "(414) 555-0102",
      timestamp: "2025-11-20T16:45:00",
      durationSec: 23,
      tone: "plain",
      evidenceLabel: "The collector's voicemail, hours after his deadline: “we do house calls”",
      transcript:
        "[automated transcript — audio partially recovered]\n“Casey. This is a courtesy call regarding your CampusCash balance, which was referred to us this morning. We find campus visits are usually unnecessary — most students prefer to settle before we, ah, meet their community. We do house calls. Dorm calls, too. Talk soon.”",
    },
    {
      id: "c6-vm-proctor",
      callerLabel: "Kestrel Study",
      timestamp: "2025-11-20T06:40:00",
      durationSec: 30,
      tone: "distorted",
      evidenceLabel: "The proctor's voicemail at 6:40 AM — the minute his plan said “walk, not run”",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Subject 09. Per protocol, you were never here, and we were never here, and the annex has been empty for years. This is true now. Compensation for night ten has been delivered to the place you will keep it. You answered so clearly, Casey. The clear ones we keep track of. Not followed — tracked. There is a difference, and you will learn to sleep inside it.”",
    },
    {
      id: "c6-vm-mari",
      callerLabel: "Marisol (cousin)",
      callerNumber: "(715) 555-0159",
      timestamp: "2025-11-22T14:00:00",
      durationSec: 21,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Casey Brandt I am deleting nothing. I still have the email, and if you don't call me by tonight I'm giving it to whoever's looking for you, I swear on tia's tamales. …call me. Please. You said everything was planned. Planned is only good if you're IN the plan, primo.”",
    },
    {
      id: "c6-vm-annex",
      callerLabel: "Kestrel Annex (disconnected line)",
      callerNumber: "(414) 555-0000",
      timestamp: "2025-11-23T03:33:00",
      durationSec: 49,
      tone: "breathing",
      evidenceLabel: "A recording from the annex's dead line: Casey answering, in his sleep, where he'd go",
      transcript:
        "[automated transcript — two speakers detected]\n[room tone. a mattress. slow breathing — SPEAKER 1, asleep]\nSPEAKER 2 (flat, near intercom): “casey. casey. where do you go when you go?”\nSPEAKER 1 (asleep, clearly): “harlow.”\nSPEAKER 2: “thank you. and where after harlow?”\nSPEAKER 1 (asleep): [answer recorded but unrecoverable — 4 seconds]\nSPEAKER 2: “thank you. sleep now. you were never here.”\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: originating line disconnected 2021. Recording is timestamped four days AFTER the subject's last confirmed night in the annex.",
    },
  ],

  calendarEvents: [
    { id: "c6-cal-study", title: "study — east door 11pm", date: "2025-11-10", time: "23:00", recurring: "daily", createdBy: "owner" },
    { id: "c6-cal-night10", title: "NIGHT 10 — last one", date: "2025-11-19", time: "23:00", createdBy: "owner", evidenceLabel: "Night 10, marked in his own hand: “last one”" },
    { id: "c6-cal-hearing", title: "integrity hearing", date: "2025-12-01", time: "10:00", createdBy: "owner", struck: true, evidenceLabel: "The Dec 1 hearing — struck through on Nov 18, before he vanished" },
    { id: "c6-cal-minimum", title: "campuscash minimum 😐", date: "2025-11-01", time: "09:00", recurring: "weekly", createdBy: "owner" },
    {
      id: "c6-cal-wake",
      title: "wake window",
      date: "2025-11-14",
      time: "03:33",
      recurring: "daily",
      createdBy: "unknown",
      detail: "No account. No reminder. Appeared during night 5, the same night as the companion app.",
      evidenceLabel: "A daily 3:33 AM “wake window” event, created by no one",
    },
    { id: "c6-cal-bio", title: "bio 340 final", date: "2025-12-09", time: "08:00", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c6-pin-dorm", label: "Hargrove Hall (dorm)", timestamp: "2025-11-18T21:30:00", x: 30, y: 35 },
    { id: "c6-pin-pawn", label: "Campus Exchange (sold monitor)", timestamp: "2025-11-16T15:00:00", x: 45, y: 50 },
    {
      id: "c6-pin-busstation",
      label: "Transit center",
      timestamp: "2025-11-17T14:20:00",
      x: 68,
      y: 72,
      detail: "A 25-minute visit, two days before night 10. He bought nothing. Route 88 boards at bay 6; he stood at bay 6.",
      evidenceLabel: "He scouted the bus station two days before — 25 minutes at Route 88's bay",
    },
    { id: "c6-pin-annex1", label: "Kestrel annex (nights 1–9)", timestamp: "2025-11-18T23:00:00", x: 55, y: 20 },
    {
      id: "c6-pin-annex2",
      label: "Kestrel annex — night 10",
      timestamp: "2025-11-19T23:04:00",
      x: 55,
      y: 20,
      detail: "The phone entered at 23:04 and never left. It sat in the storage room at 4% motion variance — shelf-still — for three days until recovery.",
      evidenceLabel: "Night 10: the phone entered the annex and went shelf-still",
    },
    {
      id: "c6-pin-gap",
      label: "No data — 06:38–07:12, Nov 20",
      timestamp: "2025-11-20T06:38:00",
      x: 62,
      y: 55,
      detail: "The phone recorded nothing here — this pin is reconstructed from a single wifi handshake with a food cart near the transit center at 6:51 AM. The phone was on the annex shelf. The handshake says it was here. Both records are certain.",
      evidenceLabel: "6:51 AM: a wifi handshake near the bus station — from a phone that never left the shelf",
    },
  ],

  browserHistory: [
    { id: "c6-b-legit", query: "how to tell if a paid research study is legit", timestamp: "2025-11-08T15:00:00" },
    { id: "c6-b-irb", query: "kestrel sleep study IRB registry search", timestamp: "2025-11-09T10:20:00", evidenceLabel: "He checked the IRB registry — the study isn't in it. He enrolled anyway." },
    { id: "c6-b-interest", query: "campuscash interest how is this legal", timestamp: "2025-10-02T09:30:00" },
    { id: "c6-b-hearing", query: "academic integrity hearing scholarship revoked odds", timestamp: "2025-11-05T16:00:00" },
    {
      id: "c6-b-route88",
      query: "route 88 north schedule harlow first departure",
      timestamp: "2025-11-15T20:50:00",
      evidenceLabel: "Search: Route 88 north to Harlow, first departure",
    },
    { id: "c6-b-payphone", query: "does harlow wisconsin still have a payphone", timestamp: "2025-11-15T21:05:00" },
    { id: "c6-b-report", query: "how long until a college student is reported missing", timestamp: "2025-11-16T02:10:00", evidenceLabel: "Search: how long before a student is reported missing" },
    { id: "c6-b-consent", query: "can a study record you sleep talking without consent", timestamp: "2025-11-17T03:50:00" },
    { id: "c6-b-goodbye", query: "how to say goodbye without saying it", timestamp: "2025-11-18T23:55:00", evidenceLabel: "His last search: “how to say goodbye without saying it”" },
  ],

  hiddenApp: {
    disguiseIcon: "clock",
    disguiseLabel: "DreamLog",
    revealAfterClueIds: ["c6-th-kestrel", "c6-n-nightlog"],
    title: "DreamLog — Cohort View",
    heading: "Kestrel protocol · subject 09",
    body:
      "The companion app. It installed itself during night 5 and cannot be removed; deleting it restores it with its data intact. It has recorded audio every night from 23:00 to 06:00 — including the four nights after Casey stopped coming.\n\nThe annex has no study. The app has a cohort.",
    entries: [
      { label: "Subject 01 (device: shelf slot 1)", status: "FINISHED 2019", detail: "retention: stable · node: unlisted" },
      { label: "Subject 04 (device: shelf slot 4)", status: "FINISHED 2022", detail: "retention: stable · node: unlisted" },
      { label: "Subject 07 (device: shelf slot 7)", status: "RETIRED", detail: "woke during questioning · file closed" },
      { label: "Subject 09 — C. BRANDT", status: "FINISHED (early)", detail: "10 nights · answers: complete · commendation" },
      { label: "Night 11–14 audio", status: "RECORDED", detail: "empty room · storage shelf · 31 hrs" },
      { label: "Subject 09 relocation", status: "TRACKED", detail: "node: HARLOW · retention re-established 11/21" },
      { label: "Cohort intake", status: "OPEN (1 slot)", detail: "flyer restocked · one tab remaining" },
    ],
    footer:
      "He planned his escape in the one room where plans are collected. The app logged his relocation to Harlow two days after he arrived — “retention re-established.” Whatever the study is studying, it doesn't need the annex, and it doesn't lose subjects. It graduates them.",
    evidenceLabel: "DreamLog's cohort ledger: Casey “FINISHED (early)” — relocation to Harlow already TRACKED",
  },

  liveEvents: [
    {
      id: "c6-live-kestrel",
      kind: "message",
      afterSeconds: 320,
      threadId: "c6-th-kestrel",
      message: {
        id: "c6-m-ke-live",
        from: "them",
        text: "the phone is enrolled, not the subject. whoever holds it now may continue. night 11 is available to you.",
        timestamp: "2025-11-23T21:21:00",
        evidenceLabel: "The study, to whoever holds the phone: “night 11 is available to you”",
      },
    },
    {
      id: "c6-live-dreamlog",
      kind: "notification",
      afterSeconds: 620,
      title: "DreamLog",
      body: "You seem tired. A bed has been prepared.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c6-v-lab",
      label: "The study took him",
      description: "A lab with no department, a proctor who pays first and never blinks, seven unclaimed phones on a shelf — and an empty slot with his name on it.",
      requiredEvidenceIds: ["c6-m-ke-3", "c6-ph-storage", "c6-ph-ceiling", "c6-vm-proctor"],
      isCanon: false,
      epilogue:
        "You write the version the annex was dressed for: an unlicensed operation harvesting… something… from sleeping students, and Casey as its ninth taking. The seven shelf phones support you — three trace to students who withdrew abruptly between 2017 and 2023, none of whom can be located. The university seals the annex behind real locks this time.\n\nIt's a strong report. It has one soft spot you chose not to press: the duffel. Victims don't pack a go-bag, sell their bike, and scout a bus bay. You left the duffel out of the narrative because it complicated it.\n\nIn March, CampusCash quietly logs the first of eleven cash payments against Casey Brandt's balance. Money orders. Postmarked from three different towns, none of them Harlow. You never amend the report. Some soft spots you press. Some you let sleep.",
    },
    {
      id: "c6-v-staged",
      label: "Casey staged the whole thing",
      description: "The debt, the hearing, the sold bike, the ticket in his cousin's name, the phone left behind on purpose. The creepy lab wasn't his abductor — it was his alibi.",
      requiredEvidenceIds: ["c6-n-locked", "c6-ph-packlist", "c6-m-ma-5", "c6-pin-busstation", "c6-pin-gap"],
      isCanon: true,
      epilogue:
        "Your report says what the locked note says: Casey Brandt walked out the east door at 6:40 AM with a gray duffel and boarded Route 88 under a borrowed name, having built — with a bio major's care — a disappearance designed to read as a taking. The debt gets a face, the hearing gets an empty chair, and a missing-victim file gets sympathy where a runaway's would get invoices. It worked on everyone. It nearly worked on you.\n\nHe is not brought back. He's twenty, he committed no crime worth the word, and the wifi handshake at the food cart is evidence of a breakfast, not a felony. The file converts to 'voluntary — welfare confirmed' after a payphone call reaches Marisol in December. She won't say what he said. She'll only confirm the word he used to prove it was him, and she won't say that either.\n\nWhat your report does not resolve — what you append, flag, and are told to unflag — is the annex. The study that predates his debt. The seven phones that predate his birth, one of them. The cohort ledger that logged his arrival in Harlow before his bus did. Casey planned his escape in the one room on Earth where plans are collected nightly, out loud, from the clearest talker in the cohort.\n\nHe thinks he got away because he did get away. Those are two different sentences. The proctor said he'd learn to sleep inside the difference. Somewhere north, in a town with one payphone, he's learning.",
    },
    {
      id: "c6-v-collectors",
      label: "The recovery partners collected",
      description: "$6,300, a blown deadline, a lender that 'does house calls' — and a kid who vanished the morning after his final notice.",
      requiredEvidenceIds: ["c6-vm-collector", "c6-m-cc-4", "c6-m-da-4"],
      isCanon: false,
      epilogue:
        "You chase the ugliest human read: Recovery Partners LLC, whose corporate filing lists a nail salon and whose 'partners' have priors that make the campus PD sit up straight. The timing damns them — final notice on the 20th, gone by the 21st.\n\nExcept he was gone by the 20th at 6:40 AM, before the notice sent. And the partners, when found, are genuinely furious: you can't collect from a ghost, and they'd been watching the dorm for a week. Their surveillance notes — which they surrender with unsettling eagerness once 'accessory' is mentioned — describe Casey leaving the annex that morning, duffel on shoulder, 'walking weird. slow. like someone told him not to run.'\n\nThe notes describe one more thing, and the man who wrote them quit collections over it: a tall figure in a gray cardigan watching Casey go from the annex roof. 'Not following him,' the note says. 'Just. Keeping track.' The file stays open on a technicality. Everything true in it belongs to somebody else's verdict.",
    },
    {
      id: "c6-v-unknown",
      label: "The records disagree with each other",
      description: "A phone in two places at once. A dead line that keeps recording. A study that answers questions by asking them of the sleeping.",
      requiredEvidenceIds: ["c6-vm-annex", "c6-cal-wake", "case-06.hidden"],
      isCanon: false,
      epilogue:
        "You write the contradictions without resolving them, because resolving them would require choosing which physics to believe. A phone that produced a wifi handshake from a shelf. A disconnected line that recorded a conversation four days after its last subscriber. An app with no install source, no storage footprint, and thirty-one hours of audio of an empty room in which, twice, something adjusts a chair.\n\nThe report is accepted with a note: 'Recommend classifying device anomalies as hardware faults.' You recommend nothing. The seven other phones go to a state lab. The state lab loses them — all seven, one incident report, the word 'misrouted.'\n\nMonths later a flyer appears on the bio building corkboard. Same font. Same promise. All the tear-tabs gone but one. You know because you checked. You want to be clear with yourself about why you checked: it wasn't investigation. It was the tab. Leaving exactly one is not an oversight. It's an invitation, and it's addressed.",
    },
  ],
};

export default c6;
