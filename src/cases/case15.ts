import type { CaseFile } from "../types";
import { photoSvg, doorway, figure, timestampBurn } from "../photoart";

/**
 * CASE 15 — GROUP PROJECT
 * Pris Navarro, 27. Third-year mathematics PhD, brilliant and stuck.
 * She was added to a late-night study call — the "Colloquium" — whose
 * participants' numbers trace to lines that were disconnected decades
 * ago, or never issued at all. They were wonderful colleagues. They
 * solved her problem with her. Then they asked her to present it.
 * In person.
 */

const c15: CaseFile = {
  id: "case-15",
  title: "Group Project",
  victimName: "Pris Navarro, 27",
  summary:
    "Grad school is lonely at 11:30 on a Tuesday night. So when a video call appeared on her phone — bright, kind voices workshopping her stalled theorem — Pris joined. The participants' numbers were disconnected in 1978, 1985, 1993. Never issued, said the carrier, about two of them. The math was excellent. The company was excellent. The attendance policy, it turned out, was very old, and very strict.",
  intake:
    "SUBJECT: Navarro, Priscilla E. (27). PhD candidate, mathematics. Reported missing by her cohort colleague D. Okoye after missing a TA session — described as 'unprecedented, she has never once been late to anything.'\n\nDEVICE: Recovered from a study carrel in the mathematics library, atop a stack of neatly ordered notes and a completed manuscript titled 'On the Marchetti Conjecture' — a result, per two faculty reviewers, 'correct, significant, and beyond what any of us believed she — frankly, any of us — could produce.'\n\nCALL RECORDS: Device shows a recurring group video call, Tuesdays 23:30, eleven weeks. Participant numbers: six. Carrier tracing — two disconnected (1978, 1985), one disconnected (1993), one reassigned-then-abandoned, and two numbers the carrier states were NEVER ISSUED: valid format, no issuance record, 'which is not a thing that happens.'\n\nDEPARTMENT: The mathematics department confirms no seminar meets Tuesday nights. The department also, per its own facilities logs, has never scheduled ANYTHING on Tuesday nights in Hale Hall basement — a standing block, renewed annually since 1971, labeled only 'reserved.'\n\nSecond-pass review requested. The manuscript's acknowledgments section thanks five people. None of them, per the registrar, is alive.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "pris navarro — if found return to math library, I live there",
    recoveredAt: "2026-03-12T21:00:00",
    batteryStart: 34,
    wallpaperHue: 268,
    lockScreenNotifications: [
      { appId: "messages", title: "Dani (cohort)", preview: "you missed TA hour. YOU. the sun rose in the west. where are you", targetId: "c15-th-dani" },
      { appId: "messages", title: "COLLOQUIUM (000)", preview: "Agenda: P. Navarro — presentation of results. In person.", targetId: "c15-th-colloquium" },
      { appId: "phone", title: "Voicemail", preview: "Hale Hall B-ext · 2:04", targetId: "c15-vm-future" },
    ],
  },

  messages: [
    {
      id: "c15-th-colloquium",
      contactName: "COLLOQUIUM (000)",
      messages: [
        { id: "c15-m-co-1", from: "them", text: "H. Marchetti: Ms. Navarro — your carrel light burns admirably late. We are a small working seminar, Tuesdays, 11:30. Informal. We have followed your progress on the conjecture with great interest. Do join. Bring the problem. Problems are always welcome. — H.M.", timestamp: "2025-12-16T23:11:00", evidenceLabel: "The invitation: “We have followed your progress with great interest” — signed H. Marchetti" },
        { id: "c15-m-co-2", from: "owner", text: "Thank you?? How did you get this number — and sorry, Marchetti as in THE Marchetti conjecture? Is this a joke? Dani if this is you I'm revoking your whiteboard privileges", timestamp: "2025-12-16T23:30:00" },
        { id: "c15-m-co-3", from: "them", text: "H. Marchetti: A namesake burden, I assure you. The call will appear Tuesday. One rule, house style: we workshop until the problem yields. We do not discuss members' circumstances. Mathematics only. It keeps things collegial across… differing situations.", timestamp: "2025-12-16T23:34:00", evidenceLabel: "The one rule: “We do not discuss members' circumstances… it keeps things collegial across differing situations.”" },
        { id: "c15-m-co-4", from: "owner", text: "joined tonight. you're all insane and wonderful. R's reformulation of my lemma 3 is going to keep me up all week. same time next tuesday?", timestamp: "2026-01-07T02:15:00", evidenceLabel: "Her first session, Jan 7, ending at 2 AM: “you're all insane and wonderful”" },
        { id: "c15-m-co-5", from: "them", text: "R. Ashworth-Vane: Always the same time, Ms. Navarro. It is the one appointment none of us can move. 😊", timestamp: "2026-01-07T02:16:00", evidenceLabel: "“It is the one appointment none of us can move.”" },
        { id: "c15-m-co-6", from: "owner", text: "question I keep not asking: why do all your video feeds have that… flicker? and R, your bookshelf clock has said 11:47 for six straight weeks", timestamp: "2026-02-11T01:40:00", evidenceLabel: "Feb 11: every participant's clock reads 11:47 — for six weeks" },
        { id: "c15-m-co-7", from: "them", text: "R. Ashworth-Vane: Old equipment, dear. The department never replaces anything in the basement. Now — your bound on the residual term. You're one honest Tuesday from the whole result. Shall we?", timestamp: "2026-02-11T01:42:00" },
        { id: "c15-m-co-8", from: "them", text: "H. Marchetti: It is done, colleagues. Ms. Navarro, the proof is YOURS — we merely kept you company in the dark, which is the whole and only purpose of a colloquium. It is, however, tradition that results are presented to the seminar. In person. The room is B-1, Hale Hall. Tuesday. We will handle the door.", timestamp: "2026-03-04T02:30:00", evidenceLabel: "March 4: the proof complete — “results are presented in person. We will handle the door.”" },
        { id: "c15-m-co-9", from: "owner", text: "in person? the basement room? I walked past B-1 last week — it's a storage room. there were chairs stacked to the ceiling", timestamp: "2026-03-04T02:35:00" },
        { id: "c15-m-co-10", from: "them", text: "H. Marchetti: The chairs come down on Tuesdays.", timestamp: "2026-03-04T02:36:00", evidenceLabel: "“The chairs come down on Tuesdays.”" },
        { id: "c15-m-co-11", from: "them", text: "Agenda: P. Navarro — presentation of results. In person.", timestamp: "2026-03-10T09:00:00" },
      ],
    },
    {
      id: "c15-th-dani",
      contactName: "Dani (cohort)",
      contactNumber: "(607) 555-0149",
      ghostTypingAfterSeconds: 390,
      messages: [
        { id: "c15-m-da-1", from: "them", text: "third-year check-in: are we thriving or are we surviving. I'm at 'photosynthesizing under the library fluorescents' personally", timestamp: "2025-12-10T14:00:00" },
        { id: "c15-m-da-2", from: "owner", text: "surviving-adjacent. grasz cancelled our meeting again. sixth time. my conjecture and I are raising ourselves like latchkey kids", timestamp: "2025-12-10T14:20:00", evidenceLabel: "Her advisor cancelled six straight meetings — “my conjecture and I are raising ourselves”" },
        { id: "c15-m-da-3", from: "owner", text: "dani I have to tell someone. I joined a study call. late-night thing. and it's SPECTACULAR. six people who actually read my drafts. one of them reformulated lemma 3 in a way that's been dead in the literature since the 70s. like, techniques nobody USES anymore, but it WORKS", timestamp: "2026-01-14T11:00:00", evidenceLabel: "“techniques nobody uses anymore, but it WORKS”" },
        { id: "c15-m-da-4", from: "them", text: "ok jealous?? what group. whose lab. NAMES pris", timestamp: "2026-01-14T11:05:00" },
        { id: "c15-m-da-5", from: "owner", text: "that's the thing. I tried to look them up. R. Ashworth-Vane has one paper. ONE. 1977. it's brilliant and then nothing — no obituary, no retirement, no anything. marchetti I can't even find. the COLLOQUIUM I can't find. it's like being coached by a library's dreams", timestamp: "2026-01-14T11:15:00", evidenceLabel: "R. Ashworth-Vane: one brilliant paper, 1977, then nothing — no obituary, no anything" },
        { id: "c15-m-da-6", from: "them", text: "pris. I say this with love and terror. screenshot the call for me", timestamp: "2026-01-14T11:17:00" },
        { id: "c15-m-da-7", from: "owner", text: "tried. three times. every screenshot comes out as a picture of an empty seminar room. chairs down, projector on, nobody in frame. I stopped trying because honestly? I don't want to know. the math is real, dani. the math is the realest thing in my life right now", timestamp: "2026-01-14T11:30:00", evidenceLabel: "Every screenshot of the call: an empty seminar room, chairs down, projector on" },
        { id: "c15-m-da-8", from: "them", text: "you missed TA hour. YOU. the sun rose in the west. where are you", timestamp: "2026-03-11T15:10:00" },
      ],
    },
    {
      id: "c15-th-grasz",
      contactName: "Prof. Grasz (advisor)",
      contactNumber: "(607) 555-0102",
      messages: [
        { id: "c15-m-gr-1", from: "them", text: "Navarro — must move our meeting again, apologies. Committee obligations. Your last draft: fine. Keep going.", timestamp: "2025-12-09T16:00:00" },
        { id: "c15-m-gr-2", from: "owner", text: "Prof. Grasz, major progress on the conjecture — the residual bound works. Draft attached. I'd really value a meeting. Any time. Any day. I'll bring the coffee, the agenda, and the chairs if necessary.", timestamp: "2026-02-25T10:00:00" },
        { id: "c15-m-gr-3", from: "them", text: "Navarro. I read the draft at 2am and then I sat in my kitchen for a long time. This is beyond me — it is beyond this DEPARTMENT — and the methods… where did you learn methods like this? Who have you been working with?", timestamp: "2026-02-26T08:15:00", evidenceLabel: "Her advisor: “Who have you been working with?”" },
        { id: "c15-m-gr-4", from: "owner", text: "a study group. late night thing, off campus. mostly retired people, I think", timestamp: "2026-02-26T08:40:00" },
        { id: "c15-m-gr-5", from: "them", text: "Retired. Yes. Navarro, listen to an old man who has been in this building since before you were born: the department is proud of you, I am proud of you, and you should submit this IMMEDIATELY, under your name, alone. And whatever the group asks of you next — whatever tradition they cite — decline. Cite ME. Tell them your advisor forbids it. They respect advisors. It's the one thing they've kept respecting.", timestamp: "2026-02-26T08:50:00", evidenceLabel: "Grasz: “whatever tradition they cite — decline. Tell them your advisor forbids it.”" },
        { id: "c15-m-gr-6", from: "owner", text: "professor. you know them.", timestamp: "2026-02-26T08:52:00" },
        { id: "c15-m-gr-7", from: "them", text: "Tuesday nights, Navarro, I schedule NOTHING. In forty years I have scheduled nothing on a Tuesday night, and I have never told anyone why, and I am not starting over text message. My office. Thursday. Before then: decline.", timestamp: "2026-02-26T08:55:00", evidenceLabel: "“In forty years I have scheduled nothing on a Tuesday night.” The Thursday meeting never happened." },
      ],
    },
    {
      id: "c15-th-mom",
      contactName: "Mami",
      contactNumber: "(607) 555-0118",
      messages: [
        { id: "c15-m-mo-1", from: "them", text: "Mija how is the math. Are you eating. Answer the second question first.", timestamp: "2026-02-15T18:00:00" },
        { id: "c15-m-mo-2", from: "owner", text: "eating AND the math is going so well it scares me. mami I think I solved it. the big one. the one I came here for", timestamp: "2026-02-15T18:30:00", evidenceLabel: "“I think I solved it. the big one. the one I came here for.”" },
        { id: "c15-m-mo-3", from: "them", text: "Of course you did. You get it from your grandmother — she could find anything, that woman. Lost things CAME to her. Be careful with that gift, mija. Lost things get attached.", timestamp: "2026-02-15T18:40:00", evidenceLabel: "Her mother: “Lost things get attached.”" },
      ],
    },
    {
      id: "c15-th-admin",
      contactName: "Math Dept Admin (Roz)",
      contactNumber: "(607) 555-0177",
      messages: [
        { id: "c15-m-ad-1", from: "owner", text: "Hi Roz! Weird question — is there a seminar that uses Hale B-1? Tuesdays late? Trying to find its listing to cite a 'personal communication.'", timestamp: "2026-02-18T13:00:00" },
        { id: "c15-m-ad-2", from: "them", text: "B-1 is storage, hon. Has been since I started. Though FUNNY YOU ASK — the room's on a standing reservation, Tuesdays 11:30pm-2:30am, renewed every year since 1971. No name on it. Facilities just calls it 'the reserved.' I asked once who renews it and got told 'it renews.' Bureaucracy, right?", timestamp: "2026-02-18T13:30:00", evidenceLabel: "Roz: B-1 reserved Tuesdays 11:30 PM since 1971 — “it renews.”" },
        { id: "c15-m-ad-3", from: "owner", text: "since 1971 exactly? what happened in 1971?", timestamp: "2026-02-18T13:35:00" },
        { id: "c15-m-ad-4", from: "them", text: "Before my time! The old course catalogs are in the library annex if you're curious. Fair warning, the 1971 one has a page that everybody who looks for finds ALREADY bookmarked. Librarians hate it. The bookmark comes back.", timestamp: "2026-02-18T13:40:00", evidenceLabel: "The 1971 catalog: a page that is always found already bookmarked" },
      ],
    },
    {
      id: "c15-th-tomas",
      contactName: "Tomás (little bro)",
      contactNumber: "(607) 555-0161",
      messages: [
        { id: "c15-m-to-1", from: "them", text: "settle a bet: you're the smartest navarro right? abuela says it was HER and you're second", timestamp: "2026-01-20T19:00:00" },
        { id: "c15-m-to-2", from: "owner", text: "abuela's right and it's not close. she did sudoku in PEN, tomás. in pen", timestamp: "2026-01-20T19:10:00" },
        { id: "c15-m-to-3", from: "them", text: "spring break I'm visiting and you're showing me the campus and buying me the fancy sandwiches. it's the law", timestamp: "2026-03-01T12:00:00" },
        { id: "c15-m-to-4", from: "owner", text: "deal. I'll show you the library, the whiteboards, everything. NOT the basement though. the basement's for members only 😉", timestamp: "2026-03-01T12:15:00", evidenceLabel: "To her brother, March 1: “NOT the basement though. the basement's for members only 😉”" },
      ],
    },
    {
      id: "c15-th-it",
      contactName: "Campus IT Helpdesk",
      messages: [
        { id: "c15-m-it-1", from: "owner", text: "Ticket: a recurring group video call appears on my phone Tuesdays 11:30pm. I can't find the calendar entry that generates it, can't decline it, and can't identify the platform. The UI looks like… an older version of every app at once?", timestamp: "2026-02-04T10:00:00", evidenceLabel: "Her IT ticket: a call with no platform, no calendar entry, no decline button" },
        { id: "c15-m-it-2", from: "them", text: "IT: We checked your device remotely. There is no video app installed capable of the call you're describing, and your Tuesday call history shows outgoing calls to numbers our system flags as invalid/never issued. We'd normally say spoofing, but spoofed numbers RECEIVE. Yours show 3-hour connected durations. We've escalated to the carrier.", timestamp: "2026-02-05T14:00:00", evidenceLabel: "IT: three-hour connected calls to numbers that were never issued" },
        { id: "c15-m-it-3", from: "them", text: "IT: Update — carrier closed our escalation with the note 'legacy reserved range, do not reassign, do not investigate.' We don't know what that means either. Ticket closed? Ticket closed.", timestamp: "2026-02-09T11:00:00", evidenceLabel: "The carrier: “legacy reserved range, do not reassign, do not investigate.”" },
      ],
    },
    {
      id: "c15-th-student",
      contactName: "Kyle (my TA student)",
      contactNumber: "(607) 555-0195",
      messages: [
        { id: "c15-m-st-1", from: "them", text: "ms navarro sorry to bother — will problem 4 techniques be on the midterm", timestamp: "2026-03-02T20:00:00" },
        { id: "c15-m-st-2", from: "owner", text: "problem 4 techniques OR honest effort and partial credit. I reward the struggle, kyle. the struggle is the math", timestamp: "2026-03-02T20:15:00" },
        { id: "c15-m-st-3", from: "them", text: "also random but you know hale hall right? me and some guys heard chalk in the basement tuesday night. like a FULL lecture of chalk. through the door of the storage room. campus safety said the room was empty and locked and then walked us out really fast", timestamp: "2026-03-05T01:00:00", evidenceLabel: "Undergrads heard “a full lecture of chalk” through the locked storage room door" },
      ],
    },
    {
      id: "c15-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c15-m-un-1",
          from: "them",
          text: "the acknowledgments are generous, ms. navarro. we noticed. the seminar has not been thanked in print since 1993.",
          timestamp: "2026-03-08T23:47:00",
          evidenceLabel: "11:47 PM: “the seminar has not been thanked in print since 1993.”",
        },
        { id: "c15-m-un-2", from: "owner", text: "what happened to the one who thanked you in 1993", timestamp: "2026-03-08T23:52:00" },
        { id: "c15-m-un-3", from: "them", text: "she presents beautifully. you'll see.", timestamp: "2026-03-08T23:53:00", evidenceLabel: "“she presents beautifully. you'll see.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c15-ph-whiteboard",
      caption: "week 1 of the colloquium's help. my whiteboard has never looked like this. I have never looked like this (deranged, happy)",
      timestamp: "2026-01-08T03:20:00",
      aspect: "landscape",
      meta: { takenAt: "2026-01-08T03:20:00", device: "This phone", location: "math library, carrel 14" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#14161a"/>` +
          `<rect x="30" y="40" width="340" height="220" rx="4" fill="#e8e6e0" opacity="0.92"/>` +
          Array.from({ length: 6 }, (_, i) => `<path d="M50 ${70 + i * 32} q40 ${i % 2 ? 6 : -6} 90 0 t 90 0 t 90 0" stroke="#2a3f5c" stroke-width="2.5" fill="none" opacity="0.8"/>`).join("") +
          `<circle cx="320" cy="90" r="22" fill="none" stroke="#a04252" stroke-width="3"/>` +
          `<text x="320" y="96" text-anchor="middle" font-family="serif" font-size="12" fill="#a04252">!!</text>` +
          `<text x="200" y="250" text-anchor="middle" font-family="monospace" font-size="8" fill="#5c6670">R's reformulation, boxed. it was that easy. it was NEVER that easy.</text>`,
        { aspect: "landscape", base: "#101216", grain: 0.1 },
      ),
    },
    {
      id: "c15-ph-carrel",
      caption: "carrel 14, my true address. the librarians water me like a plant",
      timestamp: "2026-01-25T23:00:00",
      aspect: "portrait",
      meta: { takenAt: "2026-01-25T23:00:00", device: "This phone", location: "math library" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#191610"/>` +
          `<rect x="40" y="120" width="220" height="16" fill="#3a2f1e"/>` +
          `<rect x="40" y="136" width="220" height="120" fill="#241d12"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="${55 + i * 25}" y="${60 + (i % 3) * 8}" width="18" height="${52 - (i % 3) * 8}" fill="${["#4a3a2a", "#2c3a4a", "#3a2c34"][i % 3]}"/>`).join("") +
          `<rect x="90" y="180" width="120" height="76" fill="#0d0f13"/>` +
          `<circle cx="150" cy="150" r="20" fill="#c8a84a" opacity="0.14"/>`,
        { aspect: "portrait", base: "#12100a", grain: 0.11 },
      ),
    },
    {
      id: "c15-ph-halehall",
      caption: "hale hall, 11:26pm tuesday. every window dark except... count the floors. hale hall does not have a floor below that one",
      timestamp: "2026-02-17T23:26:00",
      aspect: "portrait",
      meta: { takenAt: "2026-02-17T23:26:00", device: "This phone", location: "Hale Hall, north walk" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0a0c10"/>` +
          `<rect x="50" y="60" width="200" height="340" fill="#14171d"/>` +
          Array.from({ length: 12 }, (_, i) => `<rect x="${75 + (i % 3) * 60}" y="${90 + Math.floor(i / 3) * 60}" width="30" height="38" fill="#0b0d11"/>`).join("") +
          `<rect x="135" y="368" width="30" height="24" fill="#3d3020" opacity="0.7"/>` +
          `<circle cx="150" cy="380" r="30" fill="#c8a84a" opacity="0.08"/>`,
        { aspect: "portrait", base: "#080a0d", grain: 0.14 },
      ),
      evidenceLabel: "Hale Hall at 11:26 PM: one lit window, below the lowest floor",
    },
    {
      id: "c15-ph-b1-door",
      caption: "B-1. 'storage.' the brass plate under the paint says something longer. you can read it with your thumb like braille. I read it with my thumb. I wish I hadn't",
      timestamp: "2026-02-24T15:00:00",
      aspect: "portrait",
      meta: { takenAt: "2026-02-24T15:00:00", device: "This phone", location: "Hale Hall basement" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#121014"/>` +
          doorway(75, 90, 150, 310, "#0a090c") +
          `<rect x="75" y="90" width="150" height="310" fill="#1d1a20"/>` +
          `<rect x="120" y="130" width="60" height="22" rx="3" fill="#2c2820"/>` +
          `<text x="150" y="145" text-anchor="middle" font-family="serif" font-size="11" fill="#6b6352">B-1</text>` +
          `<rect x="105" y="165" width="90" height="14" rx="2" fill="#26221c" opacity="0.8"/>` +
          `<circle cx="195" cy="250" r="5" fill="#3a3540"/>`,
        { aspect: "portrait", base: "#0d0b0f", grain: 0.13 },
      ),
      evidenceLabel: "Room B-1: under the paint, a longer brass plate — legible only by touch",
    },
    {
      id: "c15-ph-screenshot",
      caption: "",
      timestamp: "2026-01-14T00:30:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2026-01-14T00:30:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0c0e12"/>` +
          `<rect x="20" y="60" width="260" height="280" rx="10" fill="#10141a"/>` +
          `<rect x="35" y="80" width="230" height="150" rx="4" fill="#181d24"/>` +
          Array.from({ length: 5 }, (_, i) => `<rect x="${45 + (i % 3) * 72}" y="${248 + Math.floor(i / 3) * 44}" width="60" height="36" rx="3" fill="#141920"/>`).join("") +
          Array.from({ length: 4 }, (_, i) => `<rect x="${60 + i * 45}" y="180" width="30" height="40" fill="#0e1116"/>`).join("") +
          `<rect x="90" y="100" width="120" height="60" fill="#20262e" opacity="0.6"/>` +
          `<text x="150" y="360" text-anchor="middle" font-family="monospace" font-size="8" fill="#4a5560">the call, screenshotted: an empty seminar room. chairs down. projector on. six active mics.</text>`,
        { aspect: "portrait", base: "#0a0c0f", grain: 0.1 },
      ),
      evidenceLabel: "Her deleted screenshot of the call: an empty room, chairs down, six live microphones",
    },
    {
      id: "c15-ph-catalog",
      caption: "",
      timestamp: "2026-02-19T16:40:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2026-02-19T16:40:00", device: "This phone (library annex)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#151209"/>` +
          `<rect x="40" y="50" width="220" height="300" fill="#d8cfb4" opacity="0.85"/>` +
          `<text x="150" y="85" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3427">COURSE CATALOG 1970–71</text>` +
          `<text x="150" y="110" text-anchor="middle" font-family="serif" font-size="9" fill="#55503f">MATH 000 — THE COLLOQUIUM</text>` +
          `<text x="150" y="128" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">Hale B-1 · Tu 11:30pm · H. Marchetti, presiding</text>` +
          `<text x="150" y="146" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">enrollment: by invitation · credit: none · duration: —</text>` +
          `<rect x="60" y="170" width="180" height="50" fill="#c9bfa4"/>` +
          `<text x="150" y="190" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">[stamped]: COURSE DISCONTINUED SPRING 1971</text>` +
          `<text x="150" y="205" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">[beneath, in pencil]: the course disagreed.</text>` +
          `<rect x="235" y="45" width="14" height="70" fill="#7a3a42" opacity="0.7"/>`,
        { aspect: "portrait", base: "#100d08", grain: 0.1 },
      ),
      evidenceLabel: "The 1971 catalog page (found pre-bookmarked): MATH 000, discontinued — “the course disagreed,” in pencil",
    },
    {
      id: "c15-ph-manuscript",
      caption: "IT'S DONE. printed it just to hold it. 'on the marchetti conjecture, p. navarro.' three years. eleven tuesdays. one lifetime of wanting this exact stack of paper",
      timestamp: "2026-03-06T14:00:00",
      aspect: "portrait",
      meta: { takenAt: "2026-03-06T14:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#16131a"/>` +
          `<rect x="60" y="90" width="180" height="240" fill="#e8e6e0" opacity="0.94"/>` +
          `<rect x="66" y="96" width="180" height="240" fill="#d8d5cc" opacity="0.5"/>` +
          `<text x="150" y="140" text-anchor="middle" font-family="serif" font-size="11" fill="#2a2620">On the Marchetti Conjecture</text>` +
          `<text x="150" y="165" text-anchor="middle" font-family="serif" font-size="9" fill="#55503f">P. Navarro</text>` +
          Array.from({ length: 7 }, (_, i) => `<rect x="80" y="${200 + i * 14}" width="${140 - ((i * 31) % 50)}" height="3" fill="#8b8371"/>`).join("") +
          `<text x="150" y="320" text-anchor="middle" font-family="serif" font-size="6" fill="#7a3a42">with gratitude to the Tuesday seminar: H.M., R.A-V., and colleagues</text>`,
        { aspect: "portrait", base: "#100e13", grain: 0.09 },
      ),
      evidenceLabel: "The finished manuscript — acknowledging “the Tuesday seminar”",
    },
    {
      id: "c15-ph-coffee",
      caption: "celebration coffee with dani. she made them write 'DR NAVARRO (PENDING)' on the cup. I love one (1) cohort",
      timestamp: "2026-03-06T16:30:00",
      aspect: "portrait",
      meta: { takenAt: "2026-03-06T16:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1512"/>` +
          `<rect x="100" y="160" width="100" height="140" rx="10" fill="#d8d2c2" opacity="0.9"/>` +
          `<ellipse cx="150" cy="160" rx="50" ry="12" fill="#6b4433"/>` +
          `<path d="M200 200 q30 10 0 60" stroke="#d8d2c2" stroke-width="8" fill="none" opacity="0.9"/>` +
          `<text x="150" y="230" text-anchor="middle" font-family="serif" font-size="9" fill="#3a3427">DR NAVARRO</text>` +
          `<text x="150" y="245" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">(PENDING)</text>`,
        { aspect: "portrait", base: "#13100c", grain: 0.1 },
      ),
    },
    {
      id: "c15-ph-b1-night",
      caption: "",
      timestamp: "2026-03-10T23:29:00",
      aspect: "landscape",
      meta: { takenAt: "2026-03-10T23:29:00", device: "This phone", location: "Hale Hall basement" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060608"/>`,
        { aspect: "landscape", base: "#050507", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0b0a0e"/>` +
            `<rect x="60" y="40" width="280" height="180" fill="#12141a"/>` +
            `<rect x="80" y="60" width="150" height="90" fill="#1d222a" opacity="0.8"/>` +
            Array.from({ length: 8 }, (_, i) => `<rect x="${90 + (i % 4) * 55}" y="${170 + Math.floor(i / 4) * 40}" width="40" height="30" rx="3" fill="#171a20"/>`).join("") +
            figure(110, 195, 0.6, 0.55, "#08070c") +
            figure(165, 198, 0.6, 0.55, "#08070c") +
            figure(220, 194, 0.6, 0.55, "#08070c") +
            figure(275, 197, 0.6, 0.55, "#08070c") +
            figure(330, 195, 0.6, 0.55, "#08070c") +
            `<text x="200" y="262" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a4453">through B-1's door glass: chairs down. projector warm. five seated. one lectern, empty, lit.</text>` +
            timestampBurn("23:29:47", 400, 300),
          { aspect: "landscape", base: "#090810", grain: 0.13 },
        ),
      },
      evidenceLabel: "Her last photo, through B-1's door glass: five seated figures — and a lit, empty lectern",
    },
    {
      id: "c15-ph-chalk",
      caption: "found on my carrel this morning. I didn't write it. it's my handwriting anyway. it's BETTER than my handwriting. it's my handwriting after decades of practice",
      timestamp: "2026-03-09T09:15:00",
      aspect: "landscape",
      meta: { takenAt: "2026-03-09T09:15:00", device: "This phone", location: "math library, carrel 14" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#15130e"/>` +
          `<rect x="60" y="80" width="280" height="140" fill="#1a1d16"/>` +
          `<text x="200" y="130" text-anchor="middle" font-family="serif" font-size="16" fill="#d8d5cc" opacity="0.85">we look forward</text>` +
          `<text x="200" y="160" text-anchor="middle" font-family="serif" font-size="16" fill="#d8d5cc" opacity="0.85">to your talk</text>` +
          `<text x="200" y="195" text-anchor="middle" font-family="serif" font-size="11" fill="#a8a599" opacity="0.7">— the colloquium (and P.N.)</text>`,
        { aspect: "landscape", base: "#100e0a", grain: 0.12 },
      ),
      evidenceLabel: "Chalk on her carrel, in her own handwriting “after decades of practice” — signed “the colloquium (and P.N.)”",
    },
  ],

  notes: [
    {
      id: "c15-n-journal",
      title: "research journal — the tuesday seminar",
      timestamp: "2026-03-08T22:00:00",
      evidenceLabel: "Her research journal: eleven Tuesdays, documented like the scientist she is",
      body:
        "keeping a record because a mathematician who doesn't document deserves what she gets.\n\ndec 16 — invited by text. no idea how they got my number. rule: no discussing 'circumstances.' assumed: eccentric emeriti. evidence for: the manners, the techniques. evidence against: accumulating. see below.\n\njan 6, first session — six participants. video grainy, WARM somehow, like projected film. R. reformulated lemma 3 using kaplansky-era machinery. I cried after. from the MATH, which is embarrassing, and from being SEEN, which is worse.\n\njan-feb — every tuesday, 11:30 to exactly 2:30. facts logged:\n• every clock in every frame: 11:47.\n• screenshots: empty room.\n• numbers: disconnected 1978, 1985, 1993. two never issued. IT confirms. carrier says 'do not investigate.'\n• R.'s one paper: 1977. H.M.: unfindable, unless he is THE marchetti, deceased (allegedly? the obituary is two sentences and has no date of death. I've read a lot of obituaries lately. they all have dates. his says 'passed from active correspondence.')\n• the 1971 catalog: MATH 000, discontinued. 'the course disagreed.'\n\nhypothesis I'm not allowed to hold as a rationalist: the colloquium is exactly what it looks like. a seminar that outlived its members. grad students dissolve into departments all the time — ABD, adjunct, gone. nobody tracks where the DEVOTION goes. maybe it pools. maybe it meets on tuesdays.\n\nhypothesis I hold instead, officially: elaborate hoax by bored geniuses. (the official hypothesis is doing a lot of work and we both know it, journal.)\n\nwhat's TRUE regardless: the proof is real. grasz confirmed it. two outside readers confirmed it. whatever helped me, the theorem stands on its own legs. that's the thing about math — it doesn't matter WHO whispers it. it matters that it's true.\n\nmarch 4 — they want the presentation in person. B-1. grasz says decline and cite him. the colloquium says tradition. I have until tuesday to decide, and the locked note has my decision. code: the year the colloquium 'ended.'",
    },
    {
      id: "c15-n-locked",
      title: "my decision",
      timestamp: "2026-03-10T21:00:00",
      lock: {
        code: "1971",
        hintText: "“the year the colloquium 'ended.'” — the catalog stamped it. The course disagreed.",
        clueSourceIds: ["c15-ph-catalog", "c15-th-admin"],
      },
      evidenceLabel: "The locked note: her decision, and her reasons",
      body:
        "I'm going to present.\n\nnot because I'm naive. journal entries prove I saw everything. not because I'm reckless — I've never been reckless, ask anyone, ask my mother, who calls me 'my careful one' like it's a saint's name.\n\nhere is the actual reason, and I want it in writing in my own words in case the words are all that's left:\n\nfor three years this department fed me silence. six cancelled meetings. 'fine, keep going.' the colloquium fed me MATHEMATICS. they read every draft. they argued with me at 1am like my ideas were worth staying up for — and if my hypothesis is right, staying up is the only thing they do. dead or alive or filed under 'reserved,' they were better colleagues than the living ever managed. you present to your colleagues. that's what the word means. I looked it up in four languages to be sure. it means 'the people who choose to be in the room.'\n\nsafeguards, because careful:\n1. this note, coded, findable.\n2. the manuscript: submitted YESTERDAY, sole author, arXiv timestamp immortal. whatever happens in B-1, the theorem is already loose in the world. they can't have the theorem. they never wanted it. they wanted the TALK. the room. the chalk. one more tuesday that matters.\n3. grasz gets an email at 11:00 tomorrow with everything. (professor: I know you told me to decline. I know you know why. I think you sat in B-1 once, in whatever your year was, and declined, and have scheduled nothing on tuesdays ever since so you'd never have to hear the chalk and wonder. I don't want your tuesdays, professor. I want mine to have mattered.)\n4. if I'm not at TA hour wednesday: I left a chair down for me. that's all this ever was, I think. a room where the chairs come down for you.\n\ndani: the coffee cup was the best gift of my doctorate. tomás: the sandwiches are in my desk drawer, second from top, don't ask how old. mami: your careful one was careful to the end, and then she chose. abuela would understand. lost things came to her too.\n\n— pris. dr. navarro (pending).",
    },
    {
      id: "c15-n-ta",
      title: "TA notes — problem set 4",
      timestamp: "2026-03-02T19:00:00",
      evidenceLabel: "Her TA notes: “reward the struggle. the struggle is the math.”",
      body: "common errors:\n- everyone's forgetting the boundary case. EVERYONE. do a worked example.\n- kyle's actually close — nudge, don't tell.\n- reward the struggle. the struggle is the math.\n\n(remember to eat before TA hour. remember TA hour is wednesday. remember wednesdays exist. the week has other days, navarro.)",
    },
    {
      id: "c15-n-defense",
      title: "committee / defense logistics (someday)",
      timestamp: "2026-02-27T15:00:00",
      body: "committee: grasz (chair), liu, aldana + outside member (??)\ndefense: probably fall. book the GOOD room, the one with windows.\n\nfunny thing about defenses: they're just a presentation to people who've read your work and stayed up arguing about it.\n\nso technically I've been defending every tuesday since january.",
    },
  ],

  voicemails: [
    {
      id: "c15-vm-dani",
      callerLabel: "Dani (cohort)",
      callerNumber: "(607) 555-0149",
      timestamp: "2026-03-11T16:00:00",
      durationSec: 27,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Pris. You missed TA hour and Kyle organized a SEARCH PARTY of undergrads, which is the most 'beloved teacher' thing that has ever happened, and I need you to come laugh about it. I went to the carrel. Your notes are stacked like you stack them when you're DONE with something. Pris, you don't finish things quietly. You never once finished anything quietly. Call me.”",
    },
    {
      id: "c15-vm-grasz",
      callerLabel: "Prof. Grasz (advisor)",
      callerNumber: "(607) 555-0102",
      timestamp: "2026-03-11T11:05:00",
      durationSec: 38,
      tone: "plain",
      evidenceLabel: "Grasz's voicemail, five minutes after her scheduled email arrived",
      transcript:
        "[automated transcript — audio partially recovered]\n“Navarro. Your email came at eleven, on schedule, because of course it did. You were right about my year. It was 1986. I declined, and I have been a fine mathematician and a mediocre one ever since — those are the same sentence, you'd understand. Listen to me: if any part of you is still deciding, cite me, CITE ME — [long pause] — but you weren't still deciding, were you. You wrote the email like a colleague, not a student. Past tense in all the right places. [quietly] They must have been so glad to finally get one who came gladly. Godspeed, Dr. Navarro. The 'pending' is beneath you.”",
    },
    {
      id: "c15-vm-mom",
      callerLabel: "Mami",
      callerNumber: "(607) 555-0118",
      timestamp: "2026-03-12T10:00:00",
      durationSec: 25,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Mija, it's your mother. The school called and I told them what I will tell you: my Priscilla is not lost. My mother could find anything, and I have half of that, and half is enough to know when something is LOST versus when something is SOMEWHERE. You are somewhere, mija. When you're finished being somewhere, you come home, and you bring the theorem, and I will put it on the refrigerator like everything else you ever finished.”",
    },
    {
      id: "c15-vm-colloquium",
      callerLabel: "COLLOQUIUM (000)",
      timestamp: "2026-03-10T23:11:00",
      durationSec: 19,
      tone: "distorted",
      evidenceLabel: "The colloquium's final courtesy call, 11:11 PM Tuesday",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Ms. Navarro. A courtesy reminder: the seminar convenes at half past eleven. The chairs are down. The chalk is fresh. The room, as ever, will handle the door. We are — [several voices at once, warmly] — looking forward.”",
    },
    {
      id: "c15-vm-future",
      callerLabel: "Hale Hall B-ext",
      callerNumber: "(607) 555-0000",
      timestamp: "2026-03-17T23:47:00",
      durationSec: 124,
      tone: "breathing",
      evidenceLabel: "From a basement extension that doesn't exist — timestamped five days AFTER the phone entered evidence",
      transcript:
        "[automated transcript — multiple sources]\n[chalk. confident, unhurried — a full board being used by someone who trusts her hand]\n[a voice — NAVARRO, P., 99% confidence — mid-sentence, in the cadence of a seminar talk:]\n“…and here is the part R. will pretend he saw coming — [scattered warm laughter, five sources] — which gives us the bound, which gives us the theorem, which gives us the evening. Questions?”\n[a pause. then applause: five pairs of hands, and then — the transcription software notes this and the reviewing officer has initialed the note without comment — a sixth.]\n[the chalk resumes]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: this voicemail is timestamped March 17 — five days after device recovery, four days from the timestamp at which you are reading this. The originating extension does not exist. The talk, per two mathematicians who reviewed the audio, is a flawless presentation of her published result — including, in the final ninety seconds, 'a generalization that does not appear in her paper, or anywhere else. Yet.'",
    },
  ],

  calendarEvents: [
    { id: "c15-cal-ta", title: "TA hour (wednesdays exist!)", date: "2026-01-07", time: "15:00", recurring: "weekly", createdBy: "owner" },
    { id: "c15-cal-colloq", title: "colloquium ✨", date: "2026-01-06", time: "23:30", recurring: "weekly", createdBy: "external", detail: "Created by invitation. The invitation cannot be found in any inbox.", evidenceLabel: "The weekly colloquium — created by an invitation that exists nowhere" },
    { id: "c15-cal-grasz", title: "GRASZ MEETING (thursday. FINALLY.)", date: "2026-03-05", time: "14:00", createdBy: "owner", struck: true, evidenceLabel: "The Thursday meeting with Grasz — struck through Wednesday night, by no account" },
    { id: "c15-cal-present", title: "PRESENTATION — B-1, in person", date: "2026-03-10", time: "23:30", createdBy: "external", detail: "Agenda attached: 'P. Navarro — presentation of results. Refreshments: none. Duration: —'", evidenceLabel: "The presentation: March 10, 11:30 PM, room B-1 — “Duration: —”" },
    { id: "c15-cal-tomas", title: "tomás visits!! fancy sandwiches 🥪", date: "2026-03-21", time: "12:00", createdBy: "owner" },
    { id: "c15-cal-arxiv", title: "manuscript submitted 🎉 (IMMORTAL)", date: "2026-03-09", time: "11:00", createdBy: "owner", evidenceLabel: "March 9: manuscript submitted, sole author — “IMMORTAL”" },
  ],

  locationPins: [
    { id: "c15-pin-apt", label: "Apartment — College Ave", timestamp: "2026-03-10T20:00:00", x: 20, y: 30 },
    { id: "c15-pin-library", label: "Math library — carrel 14", timestamp: "2026-03-10T21:30:00", x: 45, y: 40 },
    { id: "c15-pin-coffee", label: "Beanery (celebration coffee)", timestamp: "2026-03-06T16:20:00", x: 35, y: 50 },
    {
      id: "c15-pin-hale-weekly",
      label: "Hale Hall — Tuesday walks",
      timestamp: "2026-02-17T23:20:00",
      x: 70,
      y: 55,
      detail: "Eleven Tuesdays: she walked to Hale Hall at 11:20 PM and stood on the north walk for the duration of every call. She attended in person from the start. She just didn't go in.",
      evidenceLabel: "Eleven Tuesdays: she took every 'video call' standing outside Hale Hall",
    },
    {
      id: "c15-pin-b1",
      label: "Hale Hall — basement, B-1",
      timestamp: "2026-03-10T23:30:00",
      x: 71,
      y: 57,
      detail: "Final fix: 11:30:00 PM exactly, at the door of B-1. The phone then traveled — smoothly, at walking pace — back to the library, up to carrel 14, and went still atop her ordered notes at 11:47 PM. Security footage of the library shows the phone's route. It shows no one carrying it.",
      evidenceLabel: "Final fixes: B-1 at 11:30 — then the phone walked itself back to carrel 14 by 11:47",
    },
  ],

  browserHistory: [
    { id: "c15-b-stuck", query: "marchetti conjecture residual bound approaches survey", timestamp: "2025-12-01T02:00:00" },
    { id: "c15-b-lonely", query: "phd isolation third year normal how to cope", timestamp: "2025-12-08T03:30:00", evidenceLabel: "December, 3:30 AM: “phd isolation third year normal how to cope”" },
    { id: "c15-b-ashworth", query: "R Ashworth-Vane mathematician 1977 paper author", timestamp: "2026-01-14T12:00:00", evidenceLabel: "Her search for R. Ashworth-Vane: one paper, then nothing, ever" },
    { id: "c15-b-numbers", query: "phone number never issued but receives calls how", timestamp: "2026-02-05T15:00:00" },
    { id: "c15-b-1971", query: "university mathematics department 1971 students withdrew colloquium", timestamp: "2026-02-19T17:00:00", evidenceLabel: "1971: the spring the colloquium was “discontinued” — and four students withdrew without forwarding addresses" },
    { id: "c15-b-marchetti", query: "H Marchetti mathematician obituary date of death", timestamp: "2026-02-20T01:00:00", evidenceLabel: "Marchetti's obituary: two sentences, no date — “passed from active correspondence”" },
    { id: "c15-b-decline", query: "can you decline an academic tradition politely", timestamp: "2026-03-05T22:00:00" },
    { id: "c15-b-last", query: "what do you wear to present your life's work", timestamp: "2026-03-10T19:45:00", evidenceLabel: "Her last search, 7:45 PM: “what do you wear to present your life's work”" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "RefCite",
    revealAfterClueIds: ["c15-th-colloquium", "c15-n-journal"],
    title: "MATH 000 — Minutes",
    heading: "The Colloquium · minutes archive · 1971–",
    body:
      "A citation manager she never installed. Its database is not citations.\n\nIt is the minutes of every Tuesday since 1971, kept in perfect seminar style. The archive extends in both directions.",
    entries: [
      { label: "Minutes 1971–1977", status: "312 MEETINGS", detail: "founding cohort · attendance: complete" },
      { label: "R. ASHWORTH-VANE", status: "JOINED 1978", detail: "presented 01/1978 · attendance since: complete" },
      { label: "L. OKONJO", status: "JOINED 1985", detail: "presented 06/1985 · attendance since: complete" },
      { label: "M. SERRANO-WHITT", status: "JOINED 1993", detail: "presented 11/1993 · 'presents beautifully' · attendance: complete" },
      { label: "I. GRASZ", status: "DECLINED 1986", detail: "standing invitation · renews annually · never withdrawn" },
      { label: "P. NAVARRO", status: "PRESENTED 03/10", detail: "minutes: 'exemplary. laughter. one generalization, held back for next week.'" },
      { label: "MINUTES — 03/17 (draft)", status: "AGENDA POSTED", detail: "'P. Navarro — the generalization. New business: the reader of this device (standing invitation, renews annually).'" },
    ],
    footer:
      "The minutes record everything a seminar should: attendance, results, laughter. Grasz's invitation has renewed annually for forty years — declining is permitted; the invitation simply never expires. The draft minutes for next Tuesday list two agenda items. The second one is you. It is phrased as a courtesy. Everything they do is phrased as a courtesy. The chairs, presumably, are already coming down.",
    evidenceLabel: "The MATH 000 minutes: every Tuesday since 1971 — next week's draft agenda already lists “the reader of this device”",
  },

  liveEvents: [
    {
      id: "c15-live-colloq",
      kind: "message",
      afterSeconds: 340,
      threadId: "c15-th-colloquium",
      message: {
        id: "c15-m-co-live",
        from: "them",
        text: "H. Marchetti: To the device's current reader — the seminar notes your diligence. Few review a colleague's work so thoroughly. Auditors are always welcome, Tuesdays, 11:30. No mathematics required. Bring the problem. Everyone has one.",
        timestamp: "2026-03-12T21:06:00",
        evidenceLabel: "The colloquium, to whoever is reading: “Auditors are always welcome… Bring the problem. Everyone has one.”",
      },
    },
    {
      id: "c15-live-refcite",
      kind: "notification",
      afterSeconds: 630,
      title: "RefCite",
      body: "1 new citation added: 'Navarro, P. — remarks to the seminar, forthcoming.'",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c15-v-breakdown",
      label: "The pressure finally broke her",
      description: "Three years of isolation, a checked-out advisor, an all-consuming problem. The 'colloquium' was a lonely mind keeping itself company.",
      requiredEvidenceIds: ["c15-b-lonely", "c15-m-da-2", "c15-n-ta"],
      isCanon: false,
      epilogue:
        "The compassionate-clinical read: a brilliant, isolated student who built companions out of static and walked into the dark talking to them. It's the verdict the university's counsel prefers, and it has one structural flaw that three reviewing psychologists flag independently: her documentation. Delusional systems protect themselves; hers came with a methods section. She logged the clocks, screenshotted the empty room, filed IT tickets, cross-examined the carrier — 'this is not the record of a break,' writes the third reviewer. 'This is the record of a scientist ruling things out. She ruled them out. That's what should frighten you.'\n\nAnd the theorem is still true. Whatever company she kept, it did mathematics that the living have now verified nineteen ways. The verdict cannot explain where the Kaplansky-era technique came from, and so it does what such verdicts do with inexplicable rigor: it calls it genius, which is the psychiatric file's word for 'case closed, question open.'\n\nHer mother never accepts the word 'breakdown.' 'My careful one,' she tells the dean, 'was never lost a day in her life. Check your basement.' The dean does not check the basement. The dean has been at the university a long time. The dean schedules nothing on Tuesday nights.",
    },
    {
      id: "c15-v-colloquium",
      label: "The colloquium convened its newest member",
      description: "A seminar discontinued in 1971 that never adjourned — collecting the devoted, one presentation at a time, and keeping perfect minutes.",
      requiredEvidenceIds: ["case-15.hidden", "c15-n-locked", "c15-ph-b1-night", "c15-vm-future", "c15-ph-catalog"],
      isCanon: true,
      epilogue:
        "You file the verdict the minutes have already filed: on Tuesday, March 10, at half past eleven, Priscilla Navarro presented her results to the Colloquium in room B-1, Hale Hall, per a tradition maintained continuously since 1971 by a seminar that a stamp tried to discontinue and could not, because — as the pencil note said — the course disagreed. She attended with her eyes open, her manuscript already immortal on the arXiv, her reasons written down in four languages' worth of certainty about what 'colleague' means. The record does not support 'taken.' The record supports 'joined,' and your report uses her word, because she earned the right to choose her verbs.\n\nWhat can be proven, is: the department's forty-year 'reserved' block, renewed by no one. The catalog. The minutes archive, which two university archivists authenticate as typed on a 1968 Selectric — including the entries dated next week. Grasz's standing invitation, 1986, never withdrawn. The university seals B-1 behind a steel door, and facilities reports, in a work order that is quietly voided, that the steel door 'unlocks itself Tuesdays, 11:30 to 2:30, and relocks. No mechanism found. Recommend: none.'\n\nHer paper publishes to genuine acclaim. At the department's celebration — held, after some scheduling difficulty nobody names aloud, on a Wednesday — Grasz gives the toast, and ends it looking at no one: 'To sole authorship,' he says, 'and to the colleagues who choose to be in the room.' Dani keeps the coffee cup on her desk, DR NAVARRO (PENDING), and has crossed out the PENDING.\n\nThe generalization — the one held back for next week — appears eight months later, posted anonymously to a preprint server from an IP the university traces to a basement extension that does not exist. It is correct. It is beautiful. It is signed only: 'the Tuesday seminar, with new colleagues.' Colleagues, plural. The department does not investigate. The department schedules nothing on Tuesday nights, and now you know why, and so do you — the other you, the one the draft minutes mentioned. The invitation renews annually. Declining is permitted. It has always been permitted.\n\nThe watch, the street, the meadow, the net, the room: every archive in this terminal ends the same way, with something patient keeping excellent records and one chair down. This file just ends politer than most. Bring the problem. Everyone has one.",
    },
    {
      id: "c15-v-grasz",
      label: "Her advisor took the result and silenced the author",
      description: "A stalled career, a student with a field-defining proof, and a man who knew exactly which basement legend would take the blame.",
      requiredEvidenceIds: ["c15-m-gr-3", "c15-m-gr-7", "c15-cal-grasz"],
      isCanon: false,
      epilogue:
        "The academic-crime version: Grasz, mediocre for decades, reads a career-making proof at 2 AM and does the arithmetic older than universities. He knew the Tuesday legend — knew it PERSONALLY — and knew a vanished student would be filed under folklore, not felony.\n\nIt has motive and it has the struck-through Thursday meeting, and it dies in thirty seconds of paperwork: she submitted the day BEFORE, sole author, timestamped. There was nothing left to steal — she'd made the theorem theft-proof and told him so in her scheduled email, which he turned over unprompted, along with forty years of Tuesday-free calendars and a confession to the only crime he actually committed: 'I declined,' he tells the detective, 'and I let every student since think the loneliness was normal. She solved the conjecture in spite of me and found colleagues in spite of everything. Investigate the room, not the old man who was too frightened of it to teach.'\n\nThe detective's closing note: 'Subject cleared. Subject also, for the record, asked us — twice — whether the minutes mentioned him kindly. We didn't have the heart to tell him. They do.'",
    },
    {
      id: "c15-v-theorem",
      label: "She solved something that wanted solving",
      description: "A conjecture open since before she was born, techniques dead for fifty years, and a proof that arrived like something let out rather than worked out.",
      requiredEvidenceIds: ["c15-ph-manuscript", "c15-ph-chalk", "c15-m-mo-3"],
      isCanon: false,
      epilogue:
        "The mathematical-cosmology verdict, which you write mostly at night: some problems are doors. The Marchetti conjecture sat closed for fifty years not because it was hard but because it was LOAD-BEARING, and every mathematician who got close — Marchetti, Ashworth-Vane, a name per decade — was quietly absorbed into whatever stands behind it, the way a lock absorbs its keys. The colloquium isn't a haunting. It's a containment seminar. It meets weekly to keep something reviewed.\n\nAs evidence: the proof's reviewers all describe the same sensation, in the same word, unprompted — the argument feels 'inevitable,' less constructed than TRANSCRIBED. The chalk message in her own future handwriting. Her grandmother's gift, named by her mother like a warning: lost things get attached.\n\nThe verdict is unfileable and you file it anyway, in the appendix, where this archive keeps its truths. One outside reviewer — the eldest, emeritus, who verified the proof by hand over three weeks — returns his copy with a sticky note that outlives every official conclusion in the case: 'The mathematics is correct. Correctness is a property of statements. It was never a property of doors. Someone should sit with this result on Tuesdays for a while, just to be sure. I'll volunteer. I have the time, and frankly, the invitation arrived this morning.'",
    },
  ],
};

export default c15;
