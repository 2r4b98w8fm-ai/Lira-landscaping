import type { CaseFile } from "../types";
import { photoSvg, wall, doorway, timestampBurn, bloodHandprint, bloodRunnels } from "../photoart";

/**
 * CASE 17 — THE NIGHT AUDITOR
 * Priya Sunder, 33. Night auditor at the Marlibel, a century-old residential
 * hotel. Every night she reconciled the ledger. One permanent guest, Room
 * 813, had been paying cash monthly since 1971 — from a floor whose elevator
 * skips 813, in a hallway whose plan ends at 812. She balanced the books.
 * The books, it turned out, balanced back.
 */

const c17: CaseFile = {
  id: "case-17",
  title: "The Night Auditor",
  victimName: "Priya Sunder, 33",
  summary:
    "The Marlibel has rented rooms by the month for a hundred years, and some of its permanent guests have been on the ledger longer than anyone alive. Priya Sunder ran the overnight audit — and found a folio that never stopped paying: Room 813, cash, monthly, since 1971. The elevator has no button for 813. The eighth-floor hallway ends at 812. She pulled the thread on a room that doesn't exist, and the hotel's oldest guest sent his regards.",
  intake:
    "SUBJECT: Sunder, Priya (33). Night auditor, the Marlibel Residential Hotel. Reported missing when the 7 AM day-desk relief found the audit half-run, the cash drawer sealed, and her chair pushed in.\n\nDEVICE: Recovered from behind the front desk, charged, plugged in. Her cardigan was on the chair. The night-audit report was printed to the exact line where Room 813's folio posts, and stopped.\n\nPROPERTY: The Marlibel, built 1924, 214 rooms, owner-operated by the Adler family since 1968. Roughly forty 'permanent guests' on long-term monthly folios, several dating to the mid-20th century. Current manager: Howard Adler, 71.\n\nANOMALY: Room 813 appears on the rent ledger — paid current, cash, monthly, since March 1971 — but not on the fire plan, the housekeeping route, or the elevator panel, which skips from 812 to 814. Building services confirm no 813 is reachable from the eighth-floor corridor.\n\nHISTORY: The Marlibel's prior night auditor, 1969–1971, one E. Coble, was reported missing in 1971; case never closed. His final audit also halted at the 813 line.\n\nFINANCE: Flag for benefits fraud. At least eleven 'permanent guests' on the ledger have no living record and no death record — a paperwork state the county calls 'indefinitely pending.'\n\nSecond-pass review requested.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "Priya — night auditor, keeper of the balanced books, 11 to 7",
    recoveredAt: "2025-09-22T13:00:00",
    batteryStart: 52,
    wallpaperHue: 32,
    lockScreenNotifications: [
      { appId: "messages", title: "Ravi (bro)", preview: "you texted 'the hotel is stealing dead people' at 3am and then NOTHING. call me", targetId: "c17-th-ravi" },
      { appId: "messages", title: "Mr. Adler", preview: "Some folios are older than you, Miss Sunder. Balance them and do not read them.", targetId: "c17-th-adler" },
      { appId: "phone", title: "Front desk bell · 03:13 AM", preview: "Room 813 — ring (no guest checked in)", targetId: "c17-vm-813" },
    ],
  },

  messages: [
    {
      id: "c17-th-adler",
      contactName: "Mr. Adler",
      contactNumber: "(612) 555-0180",
      messages: [
        { id: "c17-m-ad-1", from: "them", text: "Welcome to the overnight, Miss Sunder. The audit is simple: post the room charges, balance the drawer, print the report. The permanent folios post themselves. You do not adjust them. You do not question them. You especially do not visit them.", timestamp: "2025-08-14T23:00:00", evidenceLabel: "Adler's rule on day one: “post the permanent folios… do not question them. Do not visit them.”" },
        { id: "c17-m-ad-2", from: "owner", text: "understood. quick thing — 813 posts a cash payment every month but there's no 813 on the elevator or the plan. where does the money physically come from?", timestamp: "2025-09-02T02:00:00" },
        { id: "c17-m-ad-3", from: "them", text: "Mr. Ganz has kept Room 813 since 1971 and he pays in full and on time, which is more than I can say for the living. Some folios are older than you, Miss Sunder. Balance them and do not read them.", timestamp: "2025-09-02T02:20:00", evidenceLabel: "Adler: “Mr. Ganz has kept Room 813 since 1971… Balance them and do not read them.”" },
        { id: "c17-m-ad-4", from: "owner", text: "Mr Adler I pulled the permanent folios. eleven of your long-term guests have no living record AND no death record. their pensions and benefits deposit here every month and pay their rent to you in a perfect circle. that's not bookkeeping. that's a machine.", timestamp: "2025-09-19T03:00:00", evidenceLabel: "Priya to Adler: eleven permanent guests draw benefits and pay rent in “a perfect circle”" },
        { id: "c17-m-ad-5", from: "them", text: "The last auditor who 'pulled the folios' was Mr. Coble, in 1971. He also could not leave 813 alone. The Marlibel kept his room ready for a long time, Miss Sunder. Out of respect. Finish tonight's audit. Do not print the permanent pages.", timestamp: "2025-09-19T03:15:00", evidenceLabel: "Adler's warning: the 1971 auditor Coble “could not leave 813 alone” — “the Marlibel kept his room ready”" },
      ],
    },
    {
      id: "c17-th-ravi",
      contactName: "Ravi (bro)",
      contactNumber: "(612) 555-0166",
      ghostTypingAfterSeconds: 400,
      messages: [
        { id: "c17-m-ra-1", from: "them", text: "how's the vampire shift. eat something that isn't from the lobby machine", timestamp: "2025-09-10T23:30:00" },
        { id: "c17-m-ra-2", from: "owner", text: "ravi this hotel is running a scam on DEAD PEOPLE. like decades deep. old permanent tenants who died but the paperwork never caught up, and adler collects their government money and 'charges them rent' so the books look alive. it's the cleanest fraud I've ever seen and I audit fraud for a living", timestamp: "2025-09-15T02:40:00", evidenceLabel: "Priya to her brother: the hotel collects dead tenants' benefits and charges them rent to keep the books “alive”" },
        { id: "c17-m-ra-3", from: "them", text: "priya that's a police thing not a priya thing. please", timestamp: "2025-09-15T02:45:00" },
        { id: "c17-m-ra-4", from: "owner", text: "one guest breaks the pattern though. 813. Mr Ganz. he doesn't just NOT have a death record — the front desk bell rings from 813 at 3:13 every night and no one's checked in and the elevator won't even go there. the others are paperwork ghosts. 813 feels like a real one. I'm going up the service stairs tonight to see the door with my own eyes", timestamp: "2025-09-19T02:30:00", evidenceLabel: "Priya: the 813 bell rings at 3:13 nightly though no one is checked in — she planned to climb the service stairs" },
        { id: "c17-m-ra-5", from: "owner", text: "the hotel is stealing dead people ravi and 813 isn't dead the way the others are. if I go quiet, the proof is in my audit note, the password's the room that isn't there", timestamp: "2025-09-19T03:05:00", evidenceLabel: "Priya's last text: “the password's the room that isn't there”" },
        { id: "c17-m-ra-6", from: "them", text: "you texted that at 3am and then NOTHING. calling the hotel. calling the police. Priya CALL ME", timestamp: "2025-09-20T09:00:00" },
      ],
    },
    {
      id: "c17-th-reggie",
      contactName: "Reggie (bell / days)",
      contactNumber: "(612) 555-0155",
      messages: [
        { id: "c17-m-re-1", from: "them", text: "new night auditor huh. word of advice from 22 years here: the eighth floor housekeeping cart stops at 812. always has. don't ask marisol why, she'll just cry.", timestamp: "2025-08-20T14:00:00", evidenceLabel: "The bellman: housekeeping stops at 812 — “don't ask, she'll just cry”" },
        { id: "c17-m-re-2", from: "owner", text: "Reggie be straight with me. what's in 813", timestamp: "2025-09-18T13:00:00" },
        { id: "c17-m-re-3", from: "them", text: "an old man's rent, is what Adler says. I've worked here since I was 19 and I have carried exactly one thing up those service stairs to the eighth floor — a tray, every night, left at a door that the wall says isn't there — and I stopped looking at whether the tray came back empty a long, long time ago. it comes back empty, Priya. that's all I'll say. it always comes back empty.", timestamp: "2025-09-18T13:30:00", evidenceLabel: "Reggie: a meal tray is carried to 813's wall nightly — “it always comes back empty”" },
      ],
    },
    {
      id: "c17-th-pms",
      contactName: "Marlibel PMS (system)",
      messages: [
        { id: "c17-m-pm-1", from: "them", text: "NIGHT AUDIT: 39 permanent folios posted. 39 balanced. Do not modify locked folios (permanent). Print report? [Y/N]", timestamp: "2025-09-18T03:00:00" },
        { id: "c17-m-pm-2", from: "owner", text: "why are the permanent folios LOCKED from the auditor. the auditor is supposed to audit them", timestamp: "2025-09-18T03:05:00" },
        { id: "c17-m-pm-3", from: "them", text: "NIGHT AUDIT: Permanent folios are administered by OWNER. Folio 813 last guest-modified 03/1971. Balance forward: current. Occupancy: Y. Departure: none scheduled.", timestamp: "2025-09-18T03:06:00", evidenceLabel: "The PMS: Folio 813 last modified 03/1971, occupancy “Y,” departure “none scheduled”" },
      ],
    },
    {
      id: "c17-th-813",
      contactName: "Room 813",
      messages: [
        { id: "c17-m-81-1", from: "them", text: "the tray was cold again. tell the new girl the light in the hall is out. i have asked since 1971.", timestamp: "2025-09-16T03:13:00", evidenceLabel: "A message from “Room 813”: “tell the new girl… i have asked since 1971.”" },
        { id: "c17-m-81-2", from: "owner", text: "who is this. this line doesn't go to a room. rooms don't text.", timestamp: "2025-09-16T03:14:00" },
        { id: "c17-m-81-3", from: "them", text: "you balance me every night, miss. it is only polite to say good evening back. mr coble learned his manners eventually. he is just down the hall.", timestamp: "2025-09-16T03:16:00", evidenceLabel: "“mr coble learned his manners… he is just down the hall.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c17-ph-elevator",
      caption: "the elevator panel. count the eight-hundreds. 810, 811, 812… 814. there is no button for the room I balance a payment for every single night.",
      timestamp: "2025-09-05T02:10:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-05T02:10:00", device: "This phone", location: "Marlibel — elevator" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#20211d"/>` +
          `<rect x="90" y="40" width="120" height="330" rx="10" fill="#2f2f28"/>` +
          Array.from({ length: 5 }, (_, i) => {
            const nums = ["810", "811", "812", "814", "815"];
            return `<circle cx="150" cy="${80 + i * 55}" r="20" fill="#3a3a30"/><text x="150" y="${85 + i * 55}" text-anchor="middle" font-family="monospace" font-size="12" fill="#d8cfa8">${nums[i]}</text>`;
          }).join("") +
          `<text x="150" y="${80 + 2 * 55 + 27}" text-anchor="middle" font-family="monospace" font-size="9" fill="#a83a3a">↑ 812 then 814. no 813.</text>`,
        { aspect: "portrait", base: "#191a16", grain: 0.1 },
      ),
      evidenceLabel: "The elevator panel: 812 to 814, no button for 813",
    },
    {
      id: "c17-ph-ledger",
      caption: "folio 813. cash. monthly. march 1971 to now. fifty-four years of a guest who pays in full and never once needs a towel",
      timestamp: "2025-09-18T03:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-09-18T03:20:00", device: "This phone", location: "Marlibel — front desk" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1a1712"/>` +
          `<rect x="30" y="30" width="340" height="240" fill="#d8ceb0" opacity="0.92"/>` +
          `<text x="200" y="58" text-anchor="middle" font-family="monospace" font-size="11" fill="#3a3327">FOLIO 813 — GANZ, permanent</text>` +
          Array.from({ length: 6 }, (_, i) => `<text x="55" y="${90 + i * 28}" font-family="monospace" font-size="10" fill="#4a4030">${1971 + i * 10}  RENT  PAID (cash)</text><text x="300" y="${90 + i * 28}" font-family="monospace" font-size="10" fill="#4a4030">BAL 0.00</text>`).join("") +
          `<text x="200" y="260" text-anchor="middle" font-family="monospace" font-size="9" fill="#7a3327">balance forward: current. occupancy: Y. departure: none.</text>`,
        { aspect: "landscape", base: "#141109", grain: 0.1 },
      ),
      evidenceLabel: "Folio 813: paid in cash, monthly, since March 1971 — occupancy “Y,” departure “none”",
    },
    {
      id: "c17-ph-hall",
      caption: "eighth floor service stairs. the hall ends. that's the outside wall. and there's a door in it, painted the color of the wall, with a tray in front of it.",
      timestamp: "2025-09-19T03:30:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-09-19T03:30:00", device: "This phone", location: "Marlibel — 8th floor" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#2a2620") +
          doorway(110, 150, 80, 210, "#241f19") +
          `<rect x="110" y="150" width="80" height="210" fill="none" stroke="#332d24" stroke-width="2"/>` +
          `<rect x="120" y="360" width="60" height="16" rx="3" fill="#3a3226"/>` +
          `<circle cx="140" cy="368" r="5" fill="#4a4030"/><circle cx="160" cy="368" r="5" fill="#4a4030"/>` +
          `<text x="150" y="130" text-anchor="middle" font-family="monospace" font-size="10" fill="#6a5f48">813 — painted over. brass number under the paint.</text>` +
          timestampBurn("03:30:41", 300, 400),
        { aspect: "portrait", base: "#1a1712", grain: 0.13 },
      ),
      evidenceLabel: "Deleted photo: a door painted the color of the wall where the hall “ends” — 813, with a meal tray",
    },
    {
      id: "c17-ph-register",
      caption: "",
      timestamp: "2025-09-17T02:50:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-09-17T02:50:00", device: "This phone (photo of the old register)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#14120d"/>` +
          `<rect x="45" y="50" width="210" height="300" fill="#cfc4a4" opacity="0.92"/>` +
          `<text x="150" y="82" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3327">MARLIBEL REGISTER — 1971</text>` +
          `<text x="65" y="130" font-family="cursive" font-size="13" fill="#3a3327">Mar 3  —  A. Ganz  —  813  (perm.)</text>` +
          `<text x="65" y="175" font-family="cursive" font-size="12" fill="#5a3327">Sep 12 — E. Coble — 810 → 813?</text>` +
          `<text x="65" y="210" font-family="serif" font-size="10" fill="#7a3327">(last entry in Coble's hand)</text>` +
          `<text x="65" y="270" font-family="cursive" font-size="13" fill="#3a3327">Sep 16 (2025) — the new girl asked</text>` +
          `<text x="65" y="295" font-family="cursive" font-size="13" fill="#3a3327">to see this book. — H.A.</text>`,
        { aspect: "portrait", base: "#100e0a", grain: 0.11 },
      ),
      evidenceLabel: "The 1971 register: A. Ganz checks into 813; Coble's last entry moves toward 813 and stops",
    },
    {
      id: "c17-ph-inside",
      caption: "",
      timestamp: "2025-09-19T03:33:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-19T03:33:00", device: "This phone", location: "Marlibel — 813" },
      svg: photoSvg(`<rect width="300" height="400" fill="#060505"/>`, { aspect: "portrait", base: "#050404", grain: 0.2 }),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="300" height="400" fill="#14110b"/>` +
            wall(0, 0, 300, 400, "#1c1810") +
            `<rect x="60" y="200" width="180" height="120" fill="#2a2318"/>` +
            `<rect x="70" y="150" width="70" height="90" fill="#3a3020"/>` +
            `<rect x="70" y="150" width="70" height="90" fill="none" stroke="#4a3f28" stroke-width="2"/>` +
            Array.from({ length: 54 }, (_, i) => `<path d="M${30 + (i % 18) * 14} ${60 + Math.floor(i / 18) * 30} v14" stroke="#4a3f28" stroke-width="1.6"/>`).join("") +
            bloodHandprint(200, 250, 0.7, 10, "#3a0a0a") +
            bloodHandprint(232, 262, 0.65, -6, "#7c1116") +
            bloodRunnels(220, 270, 26, "c17-runnels") +
            `<text x="150" y="360" text-anchor="middle" font-family="monospace" font-size="8" fill="#5c5140">a made bed. a dinner tray. 54 years of tally marks — and two handprints, one old, one new.</text>` +
            timestampBurn("03:33:02", 300, 400),
          { aspect: "portrait", base: "#0f0c07", grain: 0.14 },
        ),
      },
      evidenceLabel: "Inside 813: a made bed, a tray, 54 years of tally marks, and two handprints — one old, one new",
    },
    {
      id: "c17-ph-report",
      caption: "the night audit, printed to the line where 813 posts, and stopped. I didn't stop it. it stopped.",
      timestamp: "2025-09-19T03:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-09-19T03:40:00", device: "This phone", location: "Marlibel — front desk" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#171512"/>` +
          `<rect x="60" y="20" width="280" height="260" fill="#e6e0cd"/>` +
          Array.from({ length: 7 }, (_, i) => `<text x="80" y="${55 + i * 26}" font-family="monospace" font-size="10" fill="#3a3327">80${i} GANZ… POST… BAL 0.00</text>`).join("") +
          `<text x="80" y="245" font-family="monospace" font-size="11" fill="#7a3327">813 GANZ … POST … ▮</text>` +
          `<rect x="196" y="236" width="8" height="12" fill="#7a3327"/>`,
        { aspect: "landscape", base: "#120f0c", grain: 0.1 },
      ),
      evidenceLabel: "The night-audit printout, halted mid-line at 813 — the same line Coble's stopped at in 1971",
    },
  ],

  notes: [
    {
      id: "c17-n-audit",
      title: "the real audit (not for Adler)",
      timestamp: "2025-09-18T05:00:00",
      evidenceLabel: "Priya's real reconciliation of the Marlibel's permanent folios",
      body:
        "the official night audit says 39 permanent folios, 39 balanced, print and go home. this note is the audit Adler doesn't get to lock.\n\nthe machine: forty-ish 'permanent guests,' monthly folios, some going back to the 1950s. I cross-checked eleven against public records. no living record. no death record. their federal benefits — pensions, social security, one veteran's disability — deposit into accounts the hotel controls as 'representative payee,' and those accounts pay rent to the Marlibel every month. the guest is dead. the money is immortal. Adler has been keeping corpses on the books for the cash flow for decades, and because there's never a death certificate, there's never an estate, never an heir, never a question. it is the cleanest benefits fraud I have ever seen and I have seen a lot.\n\nten of the eleven are paperwork. folders. sad, but paper.\n\n813 is not paper.\n\n813 pays cash, not benefits. 813 has a physical door, painted the color of the eighth-floor wall, brass number underneath, that the elevator and the fire plan and housekeeping all pretend isn't there. Reggie carries a tray up the service stairs every night and it 'always comes back empty.' the front desk bell rings from 813 at 3:13 and there is no one checked in to ring it. and the register: A. Ganz, March 1971, permanent — and directly under it, in the last handwriting the 1969–71 night auditor Coble ever left in that book, '810 → 813?' and then nothing. Coble went missing in 1971. his audit stopped at the 813 line. mine keeps trying to.\n\nplan's in the locked note. password's the room that isn't there.",
    },
    {
      id: "c17-n-locked",
      title: "if I don't clock out (locked)",
      timestamp: "2025-09-19T01:00:00",
      lock: {
        code: "0813",
        hintText: "“the password's the room that isn't there.” The room the elevator skips, the folio that's paid since 1971 — four digits.",
        clueSourceIds: ["c17-ph-elevator", "c17-m-ra-5"],
      },
      evidenceLabel: "Priya's locked plan: the evidence trail she built before going up the stairs",
      body:
        "for Ravi, for whoever's holding this, in order, because an auditor leaves a trail:\n\n1. THE FRAUD IS PROVABLE WITHOUT ME. I mailed a copy of the eleven permanent folios and the benefit-deposit records to the state fraud line and to my own email, tonight, before my shift. Adler can make me disappear; he can't make the post office un-deliver. the machine falls on paper alone.\n\n2. 813 IS DIFFERENT AND I HAVE TO SEE IT. the other ten are dead men Adler is billing. 813 pays cash, gets a tray, rings a bell, and writes — actually writes, to this phone — like the arrangement is a courtesy he extends to whoever balances his account. I don't think 813 is Adler's fraud. I think 813 is what taught Adler's family the fraud was safe: a guest so old and so patient that the building bends a hallway around him, and a man learned, in 1971, that you can hide anything in a hotel that already hides a room.\n\n3. IF I GO UP AND DON'T COME DOWN: it was Adler at the desk and something older at the top of the service stairs, and I could not tell you which one closed the door, and that is the honest answer, and it is not the answer that mails to the fraud line. mail the fraud line the eleven folios. those have a name on them a court can use: Howard Adler. the other name checked in in 1971 and a court has no jurisdiction over a guest who pays on time.\n\nbalance the drawer. print everything except the page they tell you not to. — the password's the room that isn't there, and now you can open it, which is more than I could say for the door.",
    },
    {
      id: "c17-n-coble",
      title: "E. Coble, 1969–1971",
      timestamp: "2025-09-17T04:00:00",
      body:
        "the auditor before the auditor before the auditor, all the way back. Ellis Coble. worked this same desk, ran this same audit, 1969 to 1971. reported missing March 1971 — the same month A. Ganz 'checked in' to 813.\n\nhis last register entry: '810 → 813?' he'd been in 810. he moved toward 813. the hotel, per a clipping, 'kept Mr. Coble's room ready for his return out of respect' for eleven years.\n\nAdler's father owned the Marlibel in 1971. Adler was a teenager at the desk. whatever happened to Coble, a boy watched it be profitable, and grew up to run the machine.\n\n(813 texted me tonight that Coble 'learned his manners' and is 'just down the hall.' I have decided to file that under evidence and not under the other thing, because the other thing does not clock out at 7am.)",
    },
  ],

  voicemails: [
    {
      id: "c17-vm-adler",
      callerLabel: "Mr. Adler",
      callerNumber: "(612) 555-0180",
      timestamp: "2025-09-19T03:20:00",
      durationSec: 30,
      tone: "distorted",
      evidenceLabel: "Adler's voicemail during her last shift — “come down from there”",
      transcript:
        "[automated transcript — audio degraded]\n“Miss Sunder. My night camera shows the eighth-floor service door open, and I know exactly what that means because I watched a man do the same thing when I was sixteen years old, and I have spent fifty years making sure no one had to see what I saw. Come down from there. Whatever it offered you — a look, an answer, a good evening back — it made the same offer to Coble. Come DOWN. …I am not the thing you should be afraid of tonight, and that is the truest thing I have ever said to an employee.”",
    },
    {
      id: "c17-vm-ravi",
      callerLabel: "Ravi (bro)",
      callerNumber: "(612) 555-0166",
      timestamp: "2025-09-20T09:10:00",
      durationSec: 21,
      tone: "plain",
      transcript:
        "[automated transcript]\n“Priya, it's Ravi, it's morning, you're not answering and the hotel says you 'didn't finish your shift' like that's a normal thing to say about my sister who has never left a column unbalanced in her life. I got your email. The folios. I'm taking them to the police myself. You built the case. You always build the case. Now let me carry it. Just be somewhere I can find you.”",
    },
    {
      id: "c17-vm-813",
      callerLabel: "Front desk bell — Room 813",
      callerNumber: "internal",
      timestamp: "2025-09-19T03:13:00",
      durationSec: 47,
      tone: "breathing",
      evidenceLabel: "The 3:13 AM bell from 813 — an elderly voice on an internal line with no room",
      transcript:
        "[automated transcript — internal house line; one elderly male voice]\n[the small bright ring of a front-desk call bell, three times]\n“Good evening, miss. You balanced me at eleven minutes past, very prompt, thank you. …The hall light is still out. I have asked since the Nixon administration. …You've seen the door now, which the others never let themselves do, and that makes you my kind of tenant: the kind who reads the book. Mr. Coble read the book. …Come up. The tray is set for two tonight. It has been set for two for fifty-four years. I do so hate to eat alone, and I am, miss, very good at waiting for the light to come on.”\n[the call bell, once more, and then a long, contented silence]",
    },
    {
      id: "c17-vm-pms",
      callerLabel: "Marlibel PMS (automated)",
      timestamp: "2025-09-20T07:00:00",
      durationSec: 16,
      tone: "static",
      transcript:
        "[automated transcript]\n“Night audit incomplete. Auditor did not close the business day. Folio 813 posted successfully. One new permanent folio has been opened this cycle: Room 810, guest SUNDER, monthly, balance forward — current. Occupancy: Y. Departure: none scheduled. Thank you for staying at the Marlibel.”",
      evidenceLabel: "The PMS opened a NEW permanent folio: Room 810, guest SUNDER — occupancy “Y,” departure “none”",
    },
  ],

  calendarEvents: [
    { id: "c17-cal-shift", title: "night audit — 11 to 7", date: "2025-09-19", time: "23:00", recurring: "daily", createdBy: "owner" },
    { id: "c17-cal-mail", title: "MAIL folios → state fraud line + my email", date: "2025-09-19", time: "22:00", createdBy: "owner", evidenceLabel: "Her plan: mail the eleven folios to the state fraud line before her last shift" },
    { id: "c17-cal-ravi", title: "brunch w/ Ravi (be ALIVE for it)", date: "2025-09-21", time: "11:00", createdBy: "owner", struck: true, evidenceLabel: "Brunch with her brother the 21st — struck through by no one who admits to it" },
    {
      id: "c17-cal-ganz",
      title: "GANZ — 54 yrs a guest",
      date: "2025-09-19",
      createdBy: "unknown",
      detail: "Added to Priya's calendar by no account she controls, marking Mr. Ganz's arrival — March 1971 — as an anniversary, on the night she vanished.",
      evidenceLabel: "An unknown account added “GANZ — 54 yrs a guest,” dated her last night",
    },
    {
      id: "c17-cal-checkin",
      title: "check-in: SUNDER, rm 810",
      date: "2025-09-20",
      time: "03:33",
      createdBy: "external",
      detail: "Created by 'Marlibel PMS,' a booking system that cannot write to a guest's personal calendar. It checks Priya into Room 810 — Coble's old room — at 3:33 AM on the night she disappeared.",
      evidenceLabel: "The PMS “checked in” SUNDER to Room 810 — Coble's room — at 3:33 AM",
    },
  ],

  locationPins: [
    { id: "c17-pin-hotel", label: "The Marlibel Hotel", timestamp: "2025-09-19T23:00:00", x: 50, y: 45 },
    { id: "c17-pin-home", label: "Priya's apartment", timestamp: "2025-09-19T21:30:00", x: 28, y: 30 },
    { id: "c17-pin-records", label: "County Records — benefits check", timestamp: "2025-09-16T15:00:00", x: 40, y: 62 },
    { id: "c17-pin-post", label: "Post office — certified mail", timestamp: "2025-09-19T22:10:00", x: 35, y: 40, detail: "At 10:10 PM she mailed certified copies of the eleven permanent folios to the state fraud line and herself — the trail that survives her.", evidenceLabel: "10:10 PM: she mailed the folios certified before her shift" },
    {
      id: "c17-pin-last",
      label: "Marlibel — 8th floor, final fix",
      timestamp: "2025-09-19T03:34:00",
      x: 50,
      y: 44,
      detail: "Priya's phone rode the service stairs to the eighth floor at 3:30 AM and its last location, 3:34 AM, is the far end of a corridor the floor plan says stops four feet earlier — inside the wall, where 813's door is painted to vanish. Then nothing.",
      evidenceLabel: "Her phone's last fix, 3:34 AM: past where the eighth-floor corridor officially ends",
    },
  ],

  browserHistory: [
    { id: "c17-b-payee", query: "representative payee fraud hotel collects tenant social security after death", timestamp: "2025-09-15T04:00:00", evidenceLabel: "She researched representative-payee benefits fraud on dead tenants" },
    { id: "c17-b-pending", query: "person no death record no living record 'indefinitely pending' benefits", timestamp: "2025-09-16T03:30:00", evidenceLabel: "“no death record, no living record — indefinitely pending”" },
    { id: "c17-b-coble", query: "ellis coble marlibel hotel night auditor missing 1971", timestamp: "2025-09-17T03:00:00", evidenceLabel: "She looked up the 1971 auditor, Ellis Coble" },
    { id: "c17-b-813", query: "hotel room not on floor plan not on elevator why", timestamp: "2025-09-05T04:00:00" },
    { id: "c17-b-fraud", query: "how to report benefits fraud anonymously certified mail state hotline", timestamp: "2025-09-18T20:00:00", evidenceLabel: "How to report the fraud anonymously by certified mail" },
    { id: "c17-b-last", query: "is it safe to confront a fraud alone at 3am building where I work", timestamp: "2025-09-19T00:30:00", evidenceLabel: "Her last search: “is it safe to confront a fraud alone at 3am”" },
  ],

  hiddenApp: {
    disguiseIcon: "wallet",
    disguiseLabel: "Marlibel PMS",
    revealAfterClueIds: ["c17-th-adler", "c17-n-audit"],
    title: "Marlibel PMS — Owner Ledger (locked to auditor)",
    heading: "Permanent folios · the pages the auditor may post but not read",
    body:
      "The front-desk system every auditor uses. Priya's copy exposed the owner layer — the permanent folios administered by Howard Adler, and the machine that keeps the dead paying rent.\n\nThe owner ledger reconciles perfectly. That is the horror of it: forty years of theft, and not a penny out of balance.",
    entries: [
      { label: "PERMANENT FOLIOS", status: "40 · all current", detail: "oldest: 813 (1971)" },
      { label: "BENEFIT DEPOSITS → RENT", status: "11 payee accounts", detail: "SSA / VA / pension · no death certs filed" },
      { label: "FOLIO 813 — GANZ", status: "cash · never a payee", detail: "does not draw benefits · pays himself" },
      { label: "AUDITOR — COBLE, E.", status: "folio closed 03/1971", detail: "final status: 'moved to 813'" },
      { label: "AUDITOR — SUNDER, P.", status: "folio OPENED 09/20 03:33", detail: "room 810 · permanent · departure: none" },
      { label: "TRAY SERVICE — 813", status: "nightly, 54 yrs", detail: "returns: empty · set for two: 09/19" },
      { label: "NIGHT AUDIT 09/19", status: "INCOMPLETE", detail: "halted at line 813 · same as 03/1971" },
    ],
    footer:
      "The owner ledger names Howard Adler cleanly: eleven dead tenants whose federal benefits he collects as payee and launders into rent, decades deep, not a cent unbalanced — enough to charge, convict, and unwind the whole Marlibel. What it also shows, in the same tidy font, is the part no court will take: the system closed auditor Coble's folio in 1971 with the status 'moved to 813,' and on the night Priya vanished it opened a new permanent folio in her name, in Coble's old room 810, departure none scheduled — the Marlibel filing its newest permanent guest before her brother had even reported her missing.",
    evidenceLabel: "The Marlibel owner ledger: Adler's 40-folio benefits machine — and a new permanent folio opened for “SUNDER, P.,” departure none",
  },

  liveEvents: [
    {
      id: "c17-live-813",
      kind: "message",
      afterSeconds: 320,
      threadId: "c17-th-813",
      message: {
        id: "c17-m-81-live",
        from: "them",
        text: "good evening, whoever balances me now. the tray is still set for two. the hall light is still out. do come up. i have waited longer than this for less pleasant company.",
        timestamp: "2025-09-22T13:07:00",
        evidenceLabel: "To whoever reads the phone: “the tray is still set for two… do come up.”",
      },
    },
    {
      id: "c17-live-bell",
      kind: "notification",
      afterSeconds: 570,
      title: "Marlibel PMS",
      body: "Front desk — Room 813 is ringing.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c17-v-quit",
      label: "She quit the graveyard shift and left",
      description: "The hotel's version: a stressed new auditor who didn't finish her business day and walked off, like the auditor in '71.",
      requiredEvidenceIds: ["c17-m-ad-1", "c17-m-re-1"],
      isCanon: false,
      epilogue:
        "It's the Marlibel's house style — a folio closed quietly, a room made ready, a story that balances. It even has a matching entry from 1971. But auditors are the one kind of person this story can't be told about: Priya mailed certified copies of the fraud before her shift, left a locked plan addressed to her brother, struck a brunch off her own calendar in a hand that wasn't hers, and walked her phone to the far end of a corridor that officially ends four feet short of where she stopped. People who quit don't get checked in, by the hotel's own system, as its newest permanent guest.",
    },
    {
      id: "c17-v-adler",
      label: "Adler silenced her to protect the fraud",
      description: "She proved the benefits machine, told him so, and went up the service stairs on his camera. He'd watched it happen once before.",
      requiredEvidenceIds: ["case-17.hidden", "c17-n-locked", "c17-ph-hall", "c17-pin-last", "c17-vm-adler"],
      isCanon: true,
      epilogue:
        "You file it on the ledger's own tidy lines. Howard Adler ran a benefits machine forty folios deep — eleven dead tenants whose pensions and disability he collected as representative payee and cycled back into rent, no death certificates, no estates, no heirs, no questions, and, damningly, not one cent out of balance across four decades. Priya proved every column of it and mailed it certified before she ever touched the stairs, which is why the machine falls whether or not she is ever found: her brother carries the folios to the fraud line, and the Marlibel is unwound folio by folio, corpse by paper corpse.\n\nAdler is arrested at the front desk, and he does something no fraud defendant is supposed to do — he seems relieved. He gives a statement that convicts him of the eleven and then keeps talking, past his lawyer, about a service door and a boy of sixteen and a tray that comes back empty, until the detectives stop writing because none of it fits a form. 'I told her to come down,' he says, over and over. 'For once in my life I was the one telling someone to come DOWN.'\n\nPriya Sunder is not on the eighth floor when they open the wall, and there is no 813 behind the painted door — only a made bed, a tray set for two, fifty-four years of tally marks, and two handprints, one old, one new. The county charges Adler with the fraud and holds the disappearance open, because the evidence for the rest of it is a voicemail from an internal line to a room that isn't there, and a night-audit that halted at the 813 line in the same place it halted in 1971. Ravi Sunder reads the certified folios into the record at every hearing and refuses, flatly, the word 'quit.' 'My sister balanced everything she ever touched,' he says. 'She left the books open on exactly one account. Go find who's still sitting at it.'",
    },
    {
      id: "c17-v-benefits",
      label: "It was a benefits-fraud machine, decades deep",
      description: "Eleven dead tenants, their federal money laundered into rent through payee accounts. The crime is the ledger, not any one night.",
      requiredEvidenceIds: ["c17-m-ra-2", "c17-m-ad-4", "c17-ph-ledger"],
      isCanon: false,
      epilogue:
        "This verdict wins in the only venue that can hold it: an accounting. Federal and state investigators take Priya's certified folios and pull the thread she pulled, and the Marlibel comes apart in spreadsheets — eleven confirmed deceased 'permanent guests,' four decades, a seven-figure sum in benefits collected for people who could not have signed for a towel. It is, as she wrote, the cleanest fraud anyone had seen, and the cleanliness was the disguise.\n\nEstates are finally opened. Real heirs, some two generations removed, get letters explaining that a relative they'd assumed long buried had been, on paper, checking out of a hotel every month since the Ford administration. The Marlibel is seized and shuttered.\n\nEverything here is true, and it is Priya's actual achievement — she took down the machine with a stack of certified mail. It's just not what opened the painted door on the eighth floor. The fraud has a defendant. You named him in the other verdict. This one is the case file the auditors keep, and it balances, and it does not explain the tray set for two.",
    },
    {
      id: "c17-v-813",
      label: "813 keeps the auditors who read the book",
      description: "A guest since 1971. A door the building hides. A tray set for two for 54 years. An auditor in '71 and an auditor now, both stopped at the same line.",
      requiredEvidenceIds: ["c17-ph-inside", "c17-vm-813", "c17-ph-register"],
      isCanon: false,
      epilogue:
        "You write the version the accountants can't and Ravi already believes. Adler's eleven were paper — dead men billed for cash flow. But 813 never drew a benefit in its life; 813 pays cash, and gets a tray, and rings a bell at 3:13, and writes in a courtly hand to whoever balances his account, and has done so since March of 1971 — the exact month night auditor Ellis Coble followed the number '810 → 813?' into the last blank space in the register and out of the world. The hotel kept Coble's room ready for eleven years. The hotel just opened a permanent folio for Priya Sunder in that same room, departure none scheduled, before anyone had reported her gone.\n\nHoward Adler didn't teach 813 the trick. 813 taught the Adlers: that a building which can hide one room can hide anything, that a guest patient enough becomes a fixture the floor plan apologizes around, and that the safest place to keep the dead on the books is a hotel that has been quietly setting a table for two since 1971. Adler ran the fraud he learned. He also, on the last night, called the one employee who'd read the book and begged her — the fraudster, the thief of dead men's pensions — to come DOWN, because he knew what was at the top of the stairs and it was not his.\n\nThe conservator who examines the recovered register notes that the 1971 ink of 'A. Ganz — 813 — perm.' and the fresh ink of the 2025 tally marks photographed inside the room test, impossibly, as the same age. Your report lays out the paper crime with a name a court can use, and beneath it the older account that no court can — the tray, the bell, the book, the two auditors stopped at the same line fifty-four years apart. It goes in the drawer above the 1971 file, under the word that hotel has earned: occupied.",
    },
  ],
};

export default c17;
