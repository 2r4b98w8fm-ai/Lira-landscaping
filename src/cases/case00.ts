import type { CaseFile } from "../types";
import { photoSvg } from "../photoart";

/**
 * CASE 00 — THE PRACTICE FILE (tutorial)
 * A gentle, fully-solvable training case. Detective Larry walks a brand-new
 * investigator through every mechanic: reading the apps, cracking a locked
 * note, finding the hidden app, spotting the one wrong detail, and filing a
 * report. Low intensity, humane ending — nobody dies in the practice file.
 */

const c00: CaseFile = {
  id: "case-00",
  title: "The Practice File",
  victimName: "Ray Okonkwo, 52",
  summary:
    "Your first day at the Cold Case Unit. Detective Larry has pulled an easy one to teach you the ropes: a night custodian who 'walked off the job' — except the paperwork doesn't add up, and Larry thinks a sharp new pair of eyes might spot what he can't. Follow his lead. Everything you need is on the phone.",
  intake:
    "TRAINING FILE — CLEARED FOR NEW INVESTIGATOR.\n\nSUBJECT: Okonkwo, Raymond (52). Night custodian, Halvorsen Business Park. Logged as 'walked off the job' after failing to badge out on the night of the 14th.\n\nDEVICE: Recovered from his locker, charged, unlocked. No signs of struggle. His coat and his daughter's photo were gone from the locker; everything else was left.\n\nNOTE FROM D. LARRY: Kid — welcome aboard. This one's your training wheels, so I stacked the deck a little. Read every app. When you hit a locked note, don't panic; the code's always hidden on the phone, and I'll help if you get stuck. There's one detail on here that's just plain WRONG once you notice it. Find it, tell me what you think happened, and file the report. That's the whole job. — Larry",
  contentWarningLevel: 1,
  phone: {
    ownerLabel: "Ray — night shift, proud dad, worst jokes in the building",
    recoveredAt: "2025-05-16T10:00:00",
    batteryStart: 74,
    wallpaperHue: 205,
    lockScreenNotifications: [
      { appId: "messages", title: "Detective Larry", preview: "Welcome to the unit, kid. Open me first — I'll walk you through it.", targetId: "c00-th-larry" },
      { appId: "messages", title: "Ada (sis)", preview: "Ray you can stay here as long as you need. Nobody knows my address.", targetId: "c00-th-ada" },
    ],
  },

  messages: [
    {
      id: "c00-th-larry",
      contactName: "Detective Larry",
      contactNumber: "Cold Case Unit",
      messages: [
        { id: "c00-m-la-1", from: "them", text: "There you are. Detective Larry — I train the new folks. First thing: a phone is a person's whole life, and people leave the truth lying around without meaning to. Our job is just to read carefully.", timestamp: "2025-05-16T10:01:00" },
        { id: "c00-m-la-2", from: "them", text: "Start in Messages here, then check the Photos and Notes apps. Tap around. You can't break anything. When something feels OFF — a time that can't be right, a note you can't open — that's the trail.", timestamp: "2025-05-16T10:01:30" },
        { id: "c00-m-la-3", from: "them", text: "Ray's got a locked note in there. The code's four digits and it's hidden somewhere else on this same phone. If it won't budge, tap 'Ask Detective Larry' on the keypad — that's me, I'll nudge you. No shame in it, that's what I'm here for.", timestamp: "2025-05-16T10:02:00", evidenceLabel: "Larry's rule: every locked code is hidden elsewhere on the same phone" },
        { id: "c00-m-la-4", from: "them", text: "When you think you've got it, open the red Case Report app, pick what you believe happened, tap the evidence that backs it up, and file. Off you go, kid. I'll be right here.", timestamp: "2025-05-16T10:02:30" },
      ],
    },
    {
      id: "c00-th-ada",
      contactName: "Ada (sis)",
      contactNumber: "(319) 555-0148",
      messages: [
        { id: "c00-m-ad-1", from: "them", text: "How's the new supervisor? You've been weird about work all month.", timestamp: "2025-05-06T19:00:00" },
        { id: "c00-m-ad-2", from: "owner", text: "Marnie's been telling us to clock out at 11 and keep cleaning till 1. Off the books. I said no and now I'm 'not a team player.' I started writing it all down.", timestamp: "2025-05-06T19:20:00", evidenceLabel: "Ray to his sister: the supervisor made staff clock out early and keep working unpaid" },
        { id: "c00-m-ad-3", from: "owner", text: "If this gets ugly I might need to lay low a few days. Somewhere she can't send anyone to 'talk.' You still got the spare room?", timestamp: "2025-05-12T21:10:00", evidenceLabel: "Ray asked his sister for a place to “lay low a few days”" },
        { id: "c00-m-ad-4", from: "them", text: "Ray you can stay here as long as you need. Nobody knows my address. Bring Mabel's photo, you always forget it.", timestamp: "2025-05-12T21:14:00", evidenceLabel: "Ada: “Nobody knows my address. Bring Mabel's photo.”" },
        { id: "c00-m-ad-5", from: "them", text: "Did you get here okay?? The news is saying you 'walked off.' Call me the second you read this.", timestamp: "2025-05-15T08:00:00" },
      ],
    },
    {
      id: "c00-th-marnie",
      contactName: "Marnie (Supervisor)",
      contactNumber: "(319) 555-0100",
      messages: [
        { id: "c00-m-ma-1", from: "them", text: "Ray, I need you to stop 'documenting.' It makes people nervous. Clock out at 11 like everyone else and we won't have a problem.", timestamp: "2025-05-10T23:30:00", evidenceLabel: "The supervisor told Ray to stop “documenting”" },
        { id: "c00-m-ma-2", from: "owner", text: "I'm not signing a timesheet that says I went home when I didn't. That's all.", timestamp: "2025-05-10T23:40:00" },
        { id: "c00-m-ma-3", from: "them", text: "You're making this hard. I can make the schedule hard right back. Think about your daughter's tuition before you send that folder to anyone.", timestamp: "2025-05-11T00:02:00", evidenceLabel: "Marnie: “Think about your daughter's tuition before you send that folder.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c00-ph-locker",
      caption: "my locker. Mabel's school photo goes right here. taking it with me wherever I land.",
      timestamp: "2025-05-12T22:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-05-12T22:00:00", device: "This phone", location: "Halvorsen — custodial" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#2b3138"/>` +
          `<rect x="70" y="40" width="160" height="320" fill="#3d6b8a"/>` +
          `<rect x="70" y="40" width="160" height="320" fill="none" stroke="#26424f" stroke-width="4"/>` +
          `<rect x="95" y="70" width="110" height="16" fill="#26424f"/>` +
          `<text x="150" y="83" text-anchor="middle" font-family="monospace" font-size="11" fill="#cfe0ea">LOCKER 09</text>` +
          `<rect x="120" y="120" width="60" height="80" fill="#e8e2d4"/>` +
          `<circle cx="150" cy="150" r="16" fill="#b89a7a"/>` +
          `<text x="150" y="215" text-anchor="middle" font-family="monospace" font-size="8" fill="#3d6b8a">MABEL, gr.6</text>`,
        { aspect: "portrait", base: "#20262c", grain: 0.08 },
      ),
      evidenceLabel: "Ray's locker photo — Locker 09, his daughter Mabel's school picture",
    },
    {
      id: "c00-ph-folder",
      caption: "the folder Marnie's scared of. dates, times, names. all of it true.",
      timestamp: "2025-05-11T23:50:00",
      aspect: "landscape",
      meta: { takenAt: "2025-05-11T23:50:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#24201a"/>` +
          `<rect x="60" y="50" width="280" height="200" fill="#c9b98a" transform="rotate(-2 200 150)"/>` +
          `<rect x="60" y="50" width="280" height="30" fill="#b09a5a" transform="rotate(-2 200 150)"/>` +
          `<text x="196" y="120" text-anchor="middle" font-family="monospace" font-size="11" fill="#3a3222">UNPAID HOURS — LOG</text>` +
          Array.from({ length: 5 }, (_, i) => `<rect x="90" y="${140 + i * 18}" width="220" height="8" fill="#a8975f" opacity="0.6"/>`).join(""),
        { aspect: "landscape", base: "#1a1712", grain: 0.1 },
      ),
      evidenceLabel: "A photo of Ray's evidence folder: “UNPAID HOURS — LOG”",
    },
    {
      id: "c00-ph-mabel",
      caption: "my whole heart, born on the 9th of March, best day of my life. happy birthday next week baby girl",
      timestamp: "2025-05-03T18:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-05-03T18:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#2a2530"/>` +
          `<circle cx="150" cy="170" r="70" fill="#b89a7a"/>` +
          `<path d="M90 175 q60 60 120 0 q0 55 -60 55 q-60 0 -60 -55z" fill="#b89a7a"/>` +
          `<circle cx="128" cy="160" r="7" fill="#2a2018"/><circle cx="172" cy="160" r="7" fill="#2a2018"/>` +
          `<path d="M128 190 q22 16 44 0" stroke="#7a5c40" stroke-width="4" fill="none"/>` +
          `<text x="150" y="300" text-anchor="middle" font-family="monospace" font-size="10" fill="#c9b8d4">Mabel · March 9</text>`,
        { aspect: "portrait", base: "#201c26", grain: 0.07 },
      ),
      evidenceLabel: "A photo of his daughter Mabel — “born on the 9th of March”",
    },
    {
      id: "c00-ph-note",
      caption: "",
      timestamp: "2025-05-13T22:30:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-05-13T22:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#171512"/>` +
          `<rect x="60" y="90" width="180" height="220" fill="#e8e2d0" transform="rotate(1.5 150 200)"/>` +
          `<text x="150" y="150" text-anchor="middle" font-family="serif" font-size="13" fill="#3a3428">if I'm not here:</text>` +
          `<text x="150" y="185" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3428">I'm safe. I'm with Ada.</text>` +
          `<text x="150" y="210" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3428">the folder is real.</text>` +
          `<text x="150" y="235" text-anchor="middle" font-family="serif" font-size="11" fill="#7a3a30">send it to the labor board.</text>`,
        { aspect: "portrait", base: "#120f0c", grain: 0.1 },
      ),
      evidenceLabel: "A deleted photo of a handwritten note: “I'm safe. I'm with Ada. The folder is real.”",
    },
  ],

  notes: [
    {
      id: "c00-n-plan",
      title: "if it comes to it (locked)",
      timestamp: "2025-05-13T22:45:00",
      lock: {
        code: "0309",
        hintText: "Ray locked this with a date that mattered to him. His daughter Mabel was “born on the 9th of March” — write that as four digits, month then day.",
        clueSourceIds: ["c00-ph-mabel", "c00-th-ada"],
      },
      evidenceLabel: "Ray's locked plan: exactly where he went and why",
      body:
        "If you're reading this and I'm not around, don't worry — this was the plan, not a tragedy.\n\nMarnie made it clear she'd make my life hard and drag Mabel's tuition into it. So I'm doing this the smart way: I'm going to Ada's for a couple weeks where nobody from work can find me, and I'm sending the folder — the real timesheets, the recordings, all of it — to the state labor board myself.\n\nI left my badge so they'd think I quit and stop looking too hard. I took Mabel's photo and my coat. That's how you'll know I left on my own two feet: a man who's in trouble doesn't stop to pack the picture of his kid.\n\nThe code to this note is the day my whole life started — Mabel's birthday. If you figured that out, you're going to be good at this.",
    },
    {
      id: "c00-n-shift",
      title: "shift notes",
      timestamp: "2025-05-14T23:00:00",
      body:
        "floor 2 waxed, dries by 6am.\nbroken soap dispenser in the east restroom, third time this month, put in a ticket.\nMarnie 'adjusted' my hours again in the system. that's fine. I have my own copy. I always have my own copy.\n\nreminder: worst dad joke of the week is due. leaning towards 'I only clean at night because I'm a nocturn-JANITOR.' Mabel will groan. worth it.",
    },
  ],

  voicemails: [
    {
      id: "c00-vm-ada",
      callerLabel: "Ada (sis)",
      callerNumber: "(319) 555-0148",
      timestamp: "2025-05-15T08:05:00",
      durationSec: 19,
      tone: "plain",
      transcript:
        "[automated transcript]\n“Ray, it's me. You're asleep in my spare room right now and I'm looking at the news calling you a runaway and I'm FURIOUS on your behalf. Sleep. Then we mail that folder together. You did the right thing, little brother. Mabel would be proud, and she's going to be, because you're going to tell her yourself.”",
      evidenceLabel: "Ada's voicemail: Ray is asleep in her spare room — “you did the right thing”",
    },
    {
      id: "c00-vm-marnie",
      callerLabel: "Marnie (Supervisor)",
      callerNumber: "(319) 555-0100",
      timestamp: "2025-05-14T23:50:00",
      durationSec: 22,
      tone: "distorted",
      transcript:
        "[automated transcript]\n“Ray. You didn't clock out again and now your badge is showing 'off-site.' If you've taken that folder anywhere, I need you to call me before you do something we both regret. …This is me being reasonable. You won't like the next call.”",
      evidenceLabel: "Marnie's voicemail the night he left: “call me before you do something we both regret”",
    },
  ],

  calendarEvents: [
    { id: "c00-cal-birthday", title: "MABEL'S BIRTHDAY 🎂", date: "2025-03-09", time: "00:00", recurring: "daily", createdBy: "owner", detail: "(recurs every year — the best day)", evidenceLabel: "Mabel's birthday on his calendar: March 9" },
    { id: "c00-cal-shift", title: "night shift", date: "2025-05-14", time: "23:00", createdBy: "owner" },
    { id: "c00-cal-labor", title: "mail folder to labor board", date: "2025-05-16", time: "09:00", createdBy: "owner", evidenceLabel: "Ray's own calendar: “mail folder to labor board,” dated after he vanished" },
    {
      id: "c00-cal-badge",
      title: "badge deactivated — HR",
      date: "2025-05-15",
      time: "06:00",
      createdBy: "external",
      detail: "Added by the building's HR system. Note the wrong detail here: this event says Ray's badge was deactivated at 6:00 AM on the 15th — but the 'walked off the job' report claims he left on the 14th. Someone turned off his access AFTER he was already gone, and backdated the story.",
      evidenceLabel: "The wrong detail: HR deactivated his badge on the 15th, though the report says he left on the 14th",
    },
  ],

  locationPins: [
    { id: "c00-pin-work", label: "Halvorsen Business Park", timestamp: "2025-05-14T22:55:00", x: 60, y: 40 },
    { id: "c00-pin-ada", label: "Ada's house — last location", timestamp: "2025-05-15T01:30:00", x: 25, y: 70, detail: "His phone's last location is his sister Ada's street, at 1:30 AM — arriving, not fleeing. Right where his locked note said he'd go.", evidenceLabel: "His phone's last location: Ada's street, arriving at 1:30 AM" },
    { id: "c00-pin-school", label: "Mabel's school", timestamp: "2025-05-13T15:00:00", x: 40, y: 55 },
  ],

  browserHistory: [
    { id: "c00-b-labor", query: "how to report unpaid wages to state labor board anonymously", timestamp: "2025-05-11T23:00:00", evidenceLabel: "Ray researched how to report unpaid wages to the labor board" },
    { id: "c00-b-record", query: "is it legal to record my own hours if the company changes them", timestamp: "2025-05-10T22:00:00" },
    { id: "c00-b-stay", query: "can an employer report you missing to scare you", timestamp: "2025-05-13T20:00:00", evidenceLabel: "“can an employer report you missing to scare you”" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "Time Calc",
    revealAfterClueIds: ["c00-ph-folder", "c00-n-plan"],
    title: "Hours Ledger (hidden)",
    heading: "Ray's real timesheet — the one he kept himself",
    body:
      "Disguised as a calculator so a nosy supervisor wouldn't find it. This is the evidence Marnie was afraid of: every night he clocked out at 11 and kept working, logged to the minute.",
    entries: [
      { label: "Clocked-out hours worked", status: "63.5 hrs unpaid", detail: "Apr 14 – May 14" },
      { label: "Nights told to 'clock out early'", status: "22 of 24 shifts", detail: "supervisor: M. Voss" },
      { label: "Backup copies", status: "3 · phone, email, Ada", detail: "“I always have my own copy.”" },
      { label: "Ready to send", status: "labor board — May 16", detail: "recipient saved" },
    ],
    footer:
      "The ledger proves the motive: Ray wasn't hiding anything shameful, he was protecting the one thing that could hold his supervisor accountable. It also proves he was alive and organized the night he 'vanished' — nobody schedules a labor-board mailing for two days after they disappear unless they're planning to be there to send it.",
    evidenceLabel: "The hidden Hours Ledger: 63.5 unpaid hours logged, ready to send to the labor board",
  },

  liveEvents: [
    {
      id: "c00-live-larry",
      kind: "notification",
      afterSeconds: 90,
      title: "Detective Larry",
      body: "Nice work poking around. Found anything that doesn't add up yet? Check that badge-deactivation date against the day they SAY he left.",
    },
  ],

  verdicts: [
    {
      id: "c00-v-walked",
      label: "He walked off the job",
      description: "The official story: a disgruntled custodian who quit without notice and disappeared.",
      requiredEvidenceIds: ["c00-m-ma-1", "c00-ph-folder"],
      isCanon: false,
      epilogue:
        "It's the tidy version, and Larry lets you sit with why it doesn't hold. A man who 'walks off' doesn't schedule a labor-board mailing for two days later, doesn't leave a locked note explaining exactly where he went, and doesn't get his badge deactivated the MORNING AFTER he supposedly left.\n\n“Good,” Larry says. “You can feel it's wrong even if you can't say why yet. That feeling? That's the job. Go back and find the detail that proves it.”",
    },
    {
      id: "c00-v-marnie",
      label: "The supervisor did something to him",
      description: "Marnie threatened him, then he vanished. Maybe the threats stopped being threats.",
      requiredEvidenceIds: ["c00-m-ma-3", "c00-vm-marnie"],
      isCanon: false,
      epilogue:
        "It's a fair instinct — she threatened his daughter's tuition, she left an ominous voicemail, she had every reason to want that folder gone. Larry nods. “That's good police work, suspecting her. She's not innocent. But look again at where his phone actually went, and who he's asleep next to right now.”\n\nMarnie Voss is very much in trouble — just not for this. The wage theft is real and the folder reaches the labor board. But Ray isn't her victim. He out-thought her.",
    },
    {
      id: "c00-v-safe",
      label: "He left on his own to protect the evidence",
      description: "Ray planned his exit, went to his sister's, and is alive — mailing the folder himself.",
      requiredEvidenceIds: ["c00-n-plan", "c00-pin-ada", "c00-vm-ada", "case-00.hidden", "c00-cal-badge"],
      isCanon: true,
      epilogue:
        "You lay it out the way Larry taught you, one plain detail at a time. The locked note that told you exactly where he went — cracked with his daughter's birthday, because people hide things behind what they love. The hidden ledger proving the folder was real and ready. His phone arriving at Ada's at 1:30 AM, not fleeing but coming home. Ada's voicemail with the tell that closes it: “you're asleep in my spare room right now.” And the wrong detail, the one that unravels the whole official story — HR deactivated his badge on the 15th, the morning AFTER they claim he walked off on the 14th. They wrote the ending before they knew it.\n\nRay Okonkwo is found safe at his sister's the same afternoon, mid-sentence in a labor-board complaint, mortified to be called a missing person. The folder lands. Marnie Voss is suspended pending a wage-theft investigation that will cost the company far more than 63.5 hours. Ray tells the tuition story to Mabel himself, badly, with a custodian pun she groans at.\n\nLarry claps you on the shoulder. “That's it, kid. That's the whole job — read carefully, trust the wrong detail, and never let a tidy report be the last word. You're ready for the real ones now.” He slides the next fifteen files across the desk. “These won't all end with somebody safe. But you'll look for them just as hard. That's why you're here.”",
    },
    {
      id: "c00-v-daughter",
      label: "Something happened to his daughter",
      description: "His last messages are all about Mabel. Maybe the emergency was hers, not his.",
      requiredEvidenceIds: ["c00-ph-mabel", "c00-cal-birthday"],
      isCanon: false,
      epilogue:
        "An understandable read — every thread comes back to Mabel, her photo, her birthday, her tuition. But look closer, Larry says: she's the reason he acts, not the emergency itself. He took her photo because he was leaving on purpose; he protected her tuition by protecting the folder. Mabel is safe at school the whole time.\n\n“You followed the love,” Larry says. “That's not wrong — the love is always where the answer's hiding. You just followed it one door too far. Try the note he locked with her birthday.”",
    },
  ],
};

export default c00;
