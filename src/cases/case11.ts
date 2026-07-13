import type { CaseFile } from "../types";
import { photoSvg, figure, blurStreak, timestampBurn } from "../photoart";

/**
 * CASE 11 — THE REUNION THREAD
 * Marcus Bell, 33. One of five childhood friends planning a 20-year
 * reunion at Blackwater Quarry — where a sixth friend went through the
 * ice in 2005 and was never found. The group chat is lively. The
 * timestamps are wrong. The friends stopped answering their own phones
 * months ago, one by one, in order.
 */

const c11: CaseFile = {
  id: "case-11",
  title: "The Reunion Thread",
  victimName: "Marcus Bell, 33",
  summary:
    "Five friends, one group chat, a 20-year reunion at the quarry where the sixth friend drowned. The chat hums along — jokes, logistics, old nicknames. But Kat replies to messages four minutes before they're sent. Duke is 'free Friday' from a phone that's been in an evidence locker since September. One by one, the friends stopped being the ones typing.",
  intake:
    "SUBJECT: Bell, Marcus J. (33). Reported missing by his wife Dec 14, after attending a 'reunion' at Blackwater Quarry the evening of Dec 13.\n\nDEVICE: Recovered Dec 13, 20:31, from the hood of his car in the quarry lot, placed neatly, screen up. Battery 49%.\n\nCROSS-REFERENCE: Of the four other participants in the reunion group chat — I. Munoz, D. Vance-Odom, K. Reyes, L. Pruett — NONE could be located at their residences. Munoz was reported missing in ANOTHER jurisdiction in August. Vance-Odom's phone has been in a property locker since a September traffic incident; his chat messages continued regardless. Reyes and Pruett are now missing-person cases as of this week, opened retroactively — both had 'gone quiet' per families, who assumed depression, travel, new jobs. The group chat assumed nothing. The group chat kept them all cheerful.\n\nHISTORY: Dec 13, 2005 — Robert 'Foss' Fossey (12) went through quarry ice while the five subjects, then children, were present. Body never recovered. Case closed as misadventure on the strength of the five children's identical statements.\n\nSecond-pass review requested. The chat is still active.",
  contentWarningLevel: 3,
  phone: {
    ownerLabel: "M. BELL — if found call Elena",
    recoveredAt: "2025-12-15T21:00:00",
    batteryStart: 49,
    wallpaperHue: 205,
    lockScreenNotifications: [
      { appId: "messages", title: "Elena ❤", preview: "it's 8. you said 7:30. the quarry?? in DECEMBER?? call me", targetId: "c11-th-elena" },
      { appId: "messages", title: "CREEK FIVE 🌲", preview: "Kat: so glad we're all finally back together tonight!!", targetId: "c11-th-group" },
      { appId: "phone", title: "Voicemail", preview: "Pruett home (landline) · 0:44", targetId: "c11-vm-foss" },
    ],
  },

  messages: [
    {
      id: "c11-th-group",
      contactName: "CREEK FIVE 🌲",
      messages: [
        { id: "c11-m-gr-1", from: "them", text: "Iris: TWENTY YEARS next december, creeps. we should do something. all five of us, one place, no excuses", timestamp: "2025-07-08T20:00:00" },
        { id: "c11-m-gr-2", from: "owner", text: "in. but not the quarry. anywhere but the quarry", timestamp: "2025-07-08T20:15:00", evidenceLabel: "Marcus, in July: “anywhere but the quarry”" },
        { id: "c11-m-gr-3", from: "them", text: "Iris: obviously not the quarry, ghoul. lonnie's lake house? kat's in?", timestamp: "2025-07-08T20:18:00" },
        { id: "c11-m-gr-4", from: "them", text: "Kat: in!! ✨", timestamp: "2025-07-08T20:20:00" },
        { id: "c11-m-gr-5", from: "them", text: "Duke: if there's beer I'm wherever you point me", timestamp: "2025-07-08T20:24:00" },
        { id: "c11-m-gr-6", from: "them", text: "Iris: actually. hear me out. maybe it SHOULD be the quarry. twenty years. we never once went back. maybe that's the whole problem with all five of us", timestamp: "2025-08-19T02:11:00", evidenceLabel: "Aug 19, 2:11 AM: “Iris” reverses herself — it should be the quarry. Iris was reported missing Aug 16." },
        { id: "c11-m-gr-7", from: "owner", text: "iris are you okay? that's a 2am take and not a you take", timestamp: "2025-08-19T08:30:00" },
        { id: "c11-m-gr-8", from: "them", text: "Iris: never better. cleanest my head's been in 20 years. trust me marcus. the quarry.", timestamp: "2025-08-19T08:31:00", evidenceLabel: "“cleanest my head's been in 20 years” — replied in 60 seconds, at work hours, unlike Iris" },
        { id: "c11-m-gr-9", from: "them", text: "Duke: fine by me. free friday to scout it btw", timestamp: "2025-09-30T14:00:00", evidenceLabel: "“Duke” is free Friday — from a phone in a property locker since Sept 22" },
        { id: "c11-m-gr-10", from: "them", text: "Kat: can't friday, at my sister's til the 9th! but YES to dec 13. symmetry ✨", timestamp: "2025-10-02T03:33:00", evidenceLabel: "“Kat” cites daytime plans in a 3:33 AM message. Her sister says Kat never visited." },
        { id: "c11-m-gr-11", from: "owner", text: "dec 13?? guys. that's the DAY. that's the actual day. why would we do it on the day", timestamp: "2025-10-02T08:45:00" },
        { id: "c11-m-gr-12", from: "them", text: "Lonnie: because we owe the day, marcus.", timestamp: "2025-10-02T08:44:00", evidenceLabel: "Lonnie's reply is timestamped one minute BEFORE the message it answers" },
        { id: "c11-m-gr-13", from: "them", text: "Kat: it's decided!! dec 13, 7pm, blackwater. dress warm. the ice should be thick enough by then 🧊", timestamp: "2025-11-20T19:00:00", evidenceLabel: "“the ice should be thick enough by then 🧊”" },
        { id: "c11-m-gr-14", from: "them", text: "Kat: so glad we're all finally back together tonight!!", timestamp: "2025-12-13T18:55:00" },
      ],
    },
    {
      id: "c11-th-iris",
      contactName: "Iris 🌵",
      contactNumber: "(802) 555-0173",
      messages: [
        { id: "c11-m-ir-1", from: "them", text: "marcus. real talk, off the group. I've been having the dream again. the counting one. do you get the counting one", timestamp: "2025-08-10T23:30:00", evidenceLabel: "Iris, five days before she vanished: “the counting dream”" },
        { id: "c11-m-ir-2", from: "owner", text: "…every december. we should talk. actually talk, phone talk", timestamp: "2025-08-10T23:45:00" },
        { id: "c11-m-ir-3", from: "them", text: "friday. I'll call friday. there's something I want to tell the group and I want to practice it on you first because you were the only one who wanted to go back for him", timestamp: "2025-08-10T23:52:00", evidenceLabel: "“you were the only one who wanted to go back for him” — Iris never called" },
        { id: "c11-m-ir-4", from: "owner", text: "iris it's saturday. you didn't call", timestamp: "2025-08-16T10:00:00" },
        { id: "c11-m-ir-5", from: "owner", text: "your work says you didn't show. the group says you're 'never better.' those are different people, iris", timestamp: "2025-08-21T22:15:00" },
      ],
    },
    {
      id: "c11-th-duke",
      contactName: "Duke",
      contactNumber: "(802) 555-0148",
      messages: [
        { id: "c11-m-du-1", from: "them", text: "bell!! fantasy draft sunday, don't be a coward", timestamp: "2025-09-14T12:00:00" },
        { id: "c11-m-du-2", from: "owner", text: "duke did you hear anything from iris. like actually HER, voice, not the chat", timestamp: "2025-09-20T17:30:00" },
        { id: "c11-m-du-3", from: "them", text: "chat iris says she's great. but no. no voice. now that you say it. huh. gonna drive by her place tuesday", timestamp: "2025-09-20T17:45:00", evidenceLabel: "Duke planned to check Iris's place “tuesday” — his accident was Monday night" },
        { id: "c11-m-du-4", from: "owner", text: "duke?", timestamp: "2025-09-24T20:00:00" },
        { id: "c11-m-du-5", from: "owner", text: "your sister says your truck got found on route 9 and you're 'taking time.' the chat says you're free friday. DUKE.", timestamp: "2025-10-01T21:00:00" },
      ],
    },
    {
      id: "c11-th-kat",
      contactName: "Kat ✨",
      contactNumber: "(802) 555-0155",
      ghostTypingAfterSeconds: 380,
      messages: [
        { id: "c11-m-ka-1", from: "them", text: "marcus bell. my mother saw YOUR mother at the pharmacy and now I'm contractually obligated to say hi. hi", timestamp: "2025-06-02T15:00:00" },
        { id: "c11-m-ka-2", from: "owner", text: "kat. real question, just us: in the chat lately do the others seem… off to you? iris flipped on the quarry. duke's gone quiet-but-chatty. it's like talking to greeting cards of them", timestamp: "2025-10-05T21:30:00", evidenceLabel: "Marcus to Kat: “it's like talking to greeting cards of them”" },
        { id: "c11-m-ka-3", from: "them", text: "u worry too much. everyone's fine. see u on the 13th ✨", timestamp: "2025-10-05T21:31:00", evidenceLabel: "Kat never once wrote “u” in nineteen years of texts. The reply took 60 seconds." },
        { id: "c11-m-ka-4", from: "owner", text: "kat you have never typed 'u' in your life. you correct MY grammar. call me. right now. say the thing you said at graduation, the dumb thing, prove it's you", timestamp: "2025-10-05T21:40:00" },
      ],
    },
    {
      id: "c11-th-lonnie",
      contactName: "Lonnie",
      contactNumber: "(802) 555-0129",
      messages: [
        { id: "c11-m-lo-1", from: "them", text: "bell. call me tonight. not chat. PHONE. it's about kat's messages. I did the thing you said — I asked her to prove it's her", timestamp: "2025-11-30T16:20:00", evidenceLabel: "Lonnie, Nov 30: “I asked her to prove it's her” — his last genuine message" },
        { id: "c11-m-lo-2", from: "owner", text: "and??", timestamp: "2025-11-30T16:25:00" },
        { id: "c11-m-lo-3", from: "them", text: "she proved it. that's the problem. she knew the graduation thing. she knew the CREEK thing, marcus. the thing only six people ever knew. count who's left who could know it", timestamp: "2025-11-30T16:31:00", evidenceLabel: "“she knew the thing only six people ever knew. count who's left.”" },
        { id: "c11-m-lo-4", from: "owner", text: "five. five people are left who could know it. lonnie. FIVE.", timestamp: "2025-11-30T16:33:00" },
        { id: "c11-m-lo-5", from: "them", text: "yeah. unless we counted wrong in 2005. calling you at 8", timestamp: "2025-11-30T16:34:00", evidenceLabel: "“unless we counted wrong in 2005.” The 8 o'clock call never came." },
        { id: "c11-m-lo-6", from: "them", text: "sorry about last night, got busy! nothing to worry about. see you on the 13th, brother. we owe the day", timestamp: "2025-12-01T09:00:00", evidenceLabel: "The next morning “Lonnie” is cheerful — and repeats the chat's phrase: “we owe the day”" },
      ],
    },
    {
      id: "c11-th-elena",
      contactName: "Elena ❤",
      contactNumber: "(802) 555-0186",
      messages: [
        { id: "c11-m-el-1", from: "them", text: "you talked in your sleep again. numbers. you were counting", timestamp: "2025-12-04T07:30:00" },
        { id: "c11-m-el-2", from: "owner", text: "december stuff. it passes after the 13th every year. I'm sorry love", timestamp: "2025-12-04T08:00:00" },
        { id: "c11-m-el-3", from: "them", text: "this year you counted to six, marcus. every other year it's five. I've never told you that I count too. I think you should skip the reunion", timestamp: "2025-12-04T08:05:00", evidenceLabel: "Elena: every year he counts to five in his sleep. This year, six." },
        { id: "c11-m-el-4", from: "owner", text: "I can't skip it. if I'm wrong, it's a sad party. if I'm right, someone has our friends and is gathering the rest, and the only place all of this ends is the quarry on the 13th. either way I have to stand on that shore. I left something for you in the notes app. code is the date we never say out loud", timestamp: "2025-12-12T23:40:00", evidenceLabel: "His last night: “someone has our friends and is gathering the rest… I have to stand on that shore”" },
        { id: "c11-m-el-5", from: "them", text: "it's 8. you said 7:30. the quarry?? in DECEMBER?? call me", timestamp: "2025-12-13T20:00:00" },
      ],
    },
    {
      id: "c11-th-parks",
      contactName: "Blackwater Parks Dept",
      messages: [
        { id: "c11-m-pk-1", from: "owner", text: "Hi — checking if a small evening gathering at Blackwater Quarry on Dec 13 needs a permit? ~5 people, parking lot area only.", timestamp: "2025-12-02T10:00:00" },
        { id: "c11-m-pk-2", from: "them", text: "No permit needed for under 10, but heads up: the quarry gate is chained at dusk in winter. Has been for years. Whoever told you 7pm — the lot's not accessible at 7pm.", timestamp: "2025-12-02T10:30:00", evidenceLabel: "Parks Dept: the quarry gate is chained at dusk. A 7 PM reunion was never possible — for anyone driving." },
        { id: "c11-m-pk-3", from: "owner", text: "Then who unchains it?", timestamp: "2025-12-02T10:32:00" },
        { id: "c11-m-pk-4", from: "them", text: "Nobody, sir. That's rather the point of a chain.", timestamp: "2025-12-02T10:33:00" },
      ],
    },
    {
      id: "c11-th-work",
      contactName: "Renee (work)",
      contactNumber: "(802) 555-0117",
      messages: [
        { id: "c11-m-wo-1", from: "them", text: "you left early again. everything good?", timestamp: "2025-12-10T16:00:00" },
        { id: "c11-m-wo-2", from: "owner", text: "family stuff. old family. I'll make up the hours after the 13th", timestamp: "2025-12-10T16:20:00" },
      ],
    },
    {
      id: "c11-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c11-m-un-1",
          from: "them",
          text: "you counted wrong in 2005. count again.",
          timestamp: "2025-12-06T03:13:00",
          evidenceLabel: "Dec 6, 3:13 AM, unknown number: “you counted wrong in 2005. count again.”",
        },
        { id: "c11-m-un-2", from: "owner", text: "foss?", timestamp: "2025-12-06T03:20:00", evidenceLabel: "Marcus's reply, one word: “foss?”" },
        { id: "c11-m-un-3", from: "them", text: "olly olly oxen free.", timestamp: "2025-12-06T03:21:00", evidenceLabel: "The answer: “olly olly oxen free.”" },
      ],
    },
    {
      id: "c11-th-spam",
      contactName: "Blackwater Bulletin",
      messages: [
        { id: "c11-m-sp-1", from: "them", text: "BLACKWATER BULLETIN: This week in history — 20 years since the Fossey tragedy. Candlelight walk Sat. All welcome.", timestamp: "2025-12-08T09:00:00" },
        { id: "c11-m-sp-2", from: "them", text: "BLACKWATER BULLETIN: Ice safety reminder! No body of water in the county is certified safe for foot traffic. None. We mean the quarry. Stay off the quarry.", timestamp: "2025-12-11T09:00:00" },
      ],
    },
  ],

  photos: [
    {
      id: "c11-ph-2005",
      caption: "found the photo cleaning out mom's attic. summer 2005. six of us. six.",
      timestamp: "2025-07-20T14:00:00",
      aspect: "landscape",
      meta: { takenAt: "2025-07-20T14:00:00", device: "This phone (photo of a print)" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#26221c"/>` +
          `<rect x="40" y="40" width="320" height="220" fill="#c9bfa4" opacity="0.9"/>` +
          `<rect x="55" y="55" width="290" height="170" fill="#7a8a6b" opacity="0.7"/>` +
          `<rect x="55" y="160" width="290" height="65" fill="#5c7a8a" opacity="0.6"/>` +
          Array.from({ length: 6 }, (_, i) => figure(85 + i * 48, 205, 0.55, 0.9, i === 5 ? "#2c3a44" : "#3d3a30")).join("") +
          `<text x="200" y="250" text-anchor="middle" font-family="serif" font-size="9" fill="#55503f">creek five (+foss) — aug 05</text>`,
        { aspect: "landscape", base: "#1a1712", grain: 0.12 },
      ),
      evidenceLabel: "The 2005 print: six kids at the creek — “creek five (+foss)”",
    },
    {
      id: "c11-ph-quarry-now",
      caption: "drove past blackwater for the first time in 20 years. it's smaller than the version in my head. the version in my head is the size of everything",
      timestamp: "2025-10-12T16:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-12T16:30:00", device: "This phone", location: "Blackwater Quarry overlook" },
      svg: photoSvg(
        `<rect width="400" height="130" fill="#1a2026"/>` +
          `<rect y="130" width="400" height="170" fill="#10161a"/>` +
          `<ellipse cx="200" cy="215" rx="170" ry="60" fill="#0c1216"/>` +
          `<path d="M0 130 L70 90 L150 125 L250 85 L340 120 L400 95 V0 H0Z" fill="#0d1013"/>` +
          `<ellipse cx="200" cy="215" rx="120" ry="40" fill="#0e151a"/>`,
        { aspect: "landscape", base: "#0c1014", grain: 0.13 },
      ),
    },
    {
      id: "c11-ph-bar",
      caption: "'everyone's coming' they said. reunion pregame at duffy's. attendance: me and lonnie. the chat says iris duke and kat 'had a blast.' they were not here. NOBODY was here",
      timestamp: "2025-10-25T21:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-25T21:40:00", device: "This phone", location: "Duffy's Tavern" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#181310"/>` +
          `<rect x="30" y="150" width="340" height="16" fill="#2c2014"/>` +
          `<rect x="40" y="166" width="320" height="90" fill="#12100c"/>` +
          figure(120, 145, 0.95, 0.9, "#3a3228") +
          figure(210, 148, 0.95, 0.9, "#33302a") +
          Array.from({ length: 3 }, (_, i) => `<rect x="${260 + i * 34}" y="120" width="22" height="30" rx="4" fill="#0e0c09"/>`).join("") +
          `<circle cx="90" cy="70" r="16" fill="#4a3a20" opacity="0.4"/><circle cx="200" cy="60" r="14" fill="#4a3a20" opacity="0.35"/>`,
        { aspect: "landscape", base: "#100d0a", grain: 0.13 },
      ),
      evidenceLabel: "The pregame photo: two people. The chat remembered five.",
    },
    {
      id: "c11-ph-metadata",
      caption: "",
      timestamp: "2025-12-05T22:15:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-05T22:15:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0d1014"/>` +
          `<rect x="25" y="50" width="250" height="300" rx="8" fill="#12161c"/>` +
          `<text x="150" y="82" text-anchor="middle" font-family="monospace" font-size="10" fill="#7a94b8">MESSAGE DETAILS — KAT ✨</text>` +
          `<text x="40" y="115" font-family="monospace" font-size="9" fill="#9aa3af">sent: 03:33:00</text>` +
          `<text x="40" y="135" font-family="monospace" font-size="9" fill="#9aa3af">device: (unavailable)</text>` +
          `<text x="40" y="155" font-family="monospace" font-size="9" fill="#a04252">via: scheduled delivery</text>` +
          `<text x="40" y="175" font-family="monospace" font-size="9" fill="#a04252">queued: 47 pending messages</text>` +
          `<text x="40" y="205" font-family="monospace" font-size="8" fill="#5c6670">next release: dec 13, 18:55</text>` +
          `<text x="40" y="225" font-family="monospace" font-size="8" fill="#5c6670">final release: (no end date)</text>`,
        { aspect: "portrait", base: "#0a0c0f", grain: 0.1 },
      ),
      evidenceLabel: "The deleted screenshot: Kat's messages are a queue — 47 pending, releases scheduled past December, no end date",
    },
    {
      id: "c11-ph-clipping",
      caption: "",
      timestamp: "2025-12-07T01:20:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-07T01:20:00", device: "This phone (photo of microfiche printout)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#141210"/>` +
          `<rect x="40" y="50" width="220" height="300" fill="#cfc7b2" opacity="0.88"/>` +
          `<text x="150" y="85" text-anchor="middle" font-family="serif" font-size="12" fill="#2a2620">BOY, 12, LOST AT QUARRY</text>` +
          `<text x="150" y="103" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">search suspended after nine days</text>` +
          Array.from({ length: 10 }, (_, i) => `<rect x="60" y="${125 + i * 16}" width="${180 - ((i * 23) % 55)}" height="4" fill="#8b8371"/>`).join("") +
          `<rect x="60" y="295" width="180" height="30" fill="#c4bca8"/>` +
          `<text x="150" y="313" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">“the five children's accounts agreed on every detail,</text>` +
          `<text x="150" y="323" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">including the time — 4:40 — though none wore a watch.”</text>`,
        { aspect: "portrait", base: "#0f0d0a", grain: 0.1 },
      ),
      evidenceLabel: "The 2005 clipping: five children, identical statements, identical time — “though none wore a watch”",
    },
    {
      id: "c11-ph-augerholes",
      caption: "scouted the quarry today (daylight, gate open, calm down elena). someone's been out on the ice. auger holes. a straight line of them. pointing at where the old dock was",
      timestamp: "2025-12-06T14:50:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-06T14:50:00", device: "This phone", location: "Blackwater Quarry" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1a2026"/>` +
          `<rect y="110" width="400" height="190" fill="#c9d2d8" opacity="0.25"/>` +
          `<ellipse cx="200" cy="205" rx="180" ry="70" fill="#d8e0e4" opacity="0.3"/>` +
          Array.from({ length: 6 }, (_, i) => `<circle cx="${80 + i * 45}" cy="${240 - i * 14}" r="7" fill="#0c1216"/>`).join("") +
          `<rect x="330" y="140" width="50" height="10" fill="#26221c" opacity="0.7"/>`,
        { aspect: "landscape", base: "#141a1e", grain: 0.12 },
      ),
      evidenceLabel: "Six auger holes in a straight line across the ice, aimed at the old dock",
    },
    {
      id: "c11-ph-flyer",
      caption: "'kat' sent a flyer for the reunion. it's nice. it's really nice. kat failed art. kat brags about failing art",
      timestamp: "2025-11-22T10:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-22T10:00:00", device: "This phone (saved image)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101216"/>` +
          `<rect x="40" y="50" width="220" height="300" rx="6" fill="#1a2530"/>` +
          `<text x="150" y="110" text-anchor="middle" font-family="serif" font-size="16" fill="#c9d2da">TWENTY YEARS</text>` +
          `<text x="150" y="135" text-anchor="middle" font-family="serif" font-size="10" fill="#7a94a8">the creek five, together again</text>` +
          `<ellipse cx="150" cy="220" rx="80" ry="34" fill="#0e151a"/>` +
          Array.from({ length: 6 }, (_, i) => `<circle cx="${95 + i * 22}" cy="290" r="4" fill="#3f5462"/>`).join("") +
          `<text x="150" y="330" text-anchor="middle" font-family="serif" font-size="9" fill="#7a94a8">dec 13 · 7pm · blackwater</text>`,
        { aspect: "portrait", base: "#0c0e12", grain: 0.1 },
      ),
      evidenceLabel: "The reunion flyer “Kat” made: six dots along the bottom, not five",
    },
    {
      id: "c11-ph-ice-night",
      caption: "",
      timestamp: "2025-12-13T19:31:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-13T19:31:00", device: "This phone", location: "Blackwater Quarry" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#05070a"/>` + blurStreak(200, 190, 110, "#0e141a", 0.4),
        { aspect: "landscape", base: "#04060a", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#080b0f"/>` +
            `<ellipse cx="200" cy="210" rx="180" ry="65" fill="#b8c4cc" opacity="0.14"/>` +
            figure(200, 175, 1.0, 0.9, "#030507") +
            `<ellipse cx="200" cy="188" rx="26" ry="5" fill="#000" opacity="0.6"/>` +
            `<text x="200" y="262" text-anchor="middle" font-family="monospace" font-size="9" fill="#44505c">standing on the ice. dead center. waiting. it waved us out like a crossing guard</text>` +
            timestampBurn("19:31:44", 400, 300),
          { aspect: "landscape", base: "#070a0d", grain: 0.13 },
        ),
      },
      evidenceLabel: "His last photo: a figure standing dead-center on the ice, waving them out",
    },
    {
      id: "c11-ph-elena",
      caption: "anniversary dinner. she planned it for the 12th 'so december has one good day in it before your sad week.' I don't deserve her and I'm keeping her anyway",
      timestamp: "2025-12-12T20:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-12T20:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1512"/>` +
          `<rect x="50" y="220" width="200" height="16" fill="#2c2014"/>` +
          `<circle cx="110" cy="200" r="8" fill="#c96f2b" opacity="0.5"/><circle cx="190" cy="200" r="8" fill="#c96f2b" opacity="0.5"/>` +
          `<ellipse cx="150" cy="240" rx="40" ry="10" fill="#d8d2c2" opacity="0.4"/>` +
          `<circle cx="150" cy="120" r="40" fill="#2c2420" opacity="0.9"/>`,
        { aspect: "portrait", base: "#130f0c", grain: 0.11 },
      ),
    },
  ],

  notes: [
    {
      id: "c11-n-tally",
      title: "who's actually left (keep updated)",
      timestamp: "2025-12-05T23:00:00",
      evidenceLabel: "His tally: last REAL contact with each friend, in order",
      body:
        "not who the chat says. who I have VERIFIED. voice, face, or something only they'd know, checked recently:\n\nIRIS — last real contact aug 10 (the counting dream text). chat-iris continues. real iris: missing since aug 16 per her mom. THE CHAT FLIPPED HER VOTE THREE DAYS LATER.\n\nDUKE — last real contact sept 20 (said he'd check iris's place tuesday). truck found on route 9 monday night. 'taking time.' chat-duke is 'free friday.' duke's phone has been AT THE POLICE STATION since september. I called and asked. they confirmed it's in a locker. the messages keep coming.\n\nKAT — last real contact… june?? the pharmacy hi. everything since is 'u' and sparkles and 60-second replies at 3am. her sister says she never visited. kat is gone and I don't even know WHEN. that's the worst one. she's been a greeting card for months and we all just kept texting the card.\n\nLONNIE — verified nov 30, 4:31pm (the call setup). then nothing. then next-morning cheerful. lonnie is gone as of nov 30, evening. I was an hour from a phone call that explained everything and now I'm the last one.\n\nME — still me. as far as I know. elena: if I start typing 'u,' run.\n\norder: iris, duke, kat(?), lonnie. staggered. patient. whoever this is, they take one, then run the account warm so nobody looks. the chat isn't a chat. it's a TROPHY CASE with typing indicators.\n\nfull statement locked. code is the date we never say out loud.",
    },
    {
      id: "c11-n-locked",
      title: "for elena — and for whoever counts us",
      timestamp: "2025-12-12T23:55:00",
      lock: {
        code: "1213",
        hintText: "“the date we never say out loud.” — the newspaper says it. The reunion says it. He never would.",
        clueSourceIds: ["c11-ph-clipping", "c11-th-group"],
      },
      evidenceLabel: "The locked note: what actually happened on December 13, 2005",
      body:
        "elena. if you're reading this with the code, either I told you the date at last, or the worst happened and you figured it out, because you figure everything out.\n\nhere is the true version. the only other people who knew are gone or waiting at a quarry.\n\ndec 13, 2005. six of us on the ice, not five. the papers say foss went out alone on a dare. there was no dare. there was a GAME — the counting game, our stupid hide-and-seek on the ice, eyes closed, count to a hundred while everyone scatters to the auger holes the ice fishermen left. foss was counting. WE hid. and when the ice went, it went where the COUNTER stands, dead center, and we heard it, and we were twelve, and we ran. all five of us. we ran and we agreed on the story in duke's garage with wet socks and we said 4:40 because lonnie's dad got home at 5 and we needed the math to work.\n\nhe was counting FOR US when the ice took him. and we made it a dare and made him reckless and made ourselves bystanders, and we were none of those things. we were hiding. he never got to olly-olly-oxen-free. that's the sentence I've been not-saying for twenty years: nobody ever called him home.\n\nthe checkin pact is in the calculator app — the whole 'story,' the annual roll call. we kept the lie in better repair than we kept each other.\n\nif the person doing this is who I think it is — if he came out of that water twenty years ago and someone or something kept him, or he kept himself, and he's spent two decades learning our voices — then he doesn't want money and he doesn't want apologies. he wants the count finished. five hiders, found.\n\nI'm going to the quarry. not because the chat told me to. because I'm going to stand where he stood and I'm going to say it — olly olly oxen free — loud, at the dead center, twenty years late. maybe that ends it. maybe nothing ends it. but he counted for us, elena. someone finally has to call him home.\n\nI love you. I counted right this time. — M",
    },
    {
      id: "c11-n-reunion",
      title: "reunion logistics",
      timestamp: "2025-11-25T12:00:00",
      body: "dec 13, 7pm, blackwater lot\nbring: thermoses (cocoa + the adult kind), camp chairs, bluetooth speaker, the 2005 photo\nlonnie: firewood. duke: beer. kat: the flyer thing. iris: herself (her words)\n\n(marcus: bring the words. you know the ones. twenty years of them.)",
    },
    {
      id: "c11-n-eulogy",
      title: "things I'd say (never sent, never said)",
      timestamp: "2025-12-08T02:00:00",
      evidenceLabel: "His unsent eulogy for Foss: “you were only ever where we told you to stand”",
      body: "foss —\n\nyou'd be 32. you'd be the best of us, which isn't a compliment because look at us, but you'd be the best of anybody.\n\nyou always counted slow to give us extra time. we knew. we never said thanks for that either.\n\nI'm sorry we made you the careless one in the story. you were the carefullest kid on that ice. you were only ever where we told you to stand.",
    },
  ],

  voicemails: [
    {
      id: "c11-vm-elena",
      callerLabel: "Elena ❤",
      callerNumber: "(802) 555-0186",
      timestamp: "2025-12-13T20:20:00",
      durationSec: 26,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Marcus. I found the note. I found the CODE, because you count in your sleep and I told you I count too. I'm in the car. I'm coming to the quarry, and if you've done something brave and stupid I swear — just be standing in that parking lot when I get there. Be standing anywhere. Just be standing.”",
    },
    {
      id: "c11-vm-lonnie",
      callerLabel: "Lonnie",
      callerNumber: "(802) 555-0129",
      timestamp: "2025-11-30T19:58:00",
      durationSec: 34,
      tone: "distorted",
      evidenceLabel: "Lonnie's 7:58 PM voicemail — two minutes before the call that never came",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Bell, it's me, calling early because — okay, don't laugh. there's someone in my yard. standing at the tree line, and marcus, the height is wrong. not wrong-tall. wrong like — like a kid who kept growing anyway, you know? like the growth chart kept going without the — [pause] he's counting. I can't hear it but I can see his mouth and he's COUNTING, and marcus, I know the rhythm. I know that rhythm. it's slow. he always counted slow, to give us— ”\n[end of message]",
    },
    {
      id: "c11-vm-parks",
      callerLabel: "Blackwater Parks Dept",
      timestamp: "2025-12-14T08:30:00",
      durationSec: 22,
      tone: "plain",
      evidenceLabel: "Parks, the morning after: the gate chain was intact — over tire tracks",
      transcript:
        "[automated transcript — audio partially recovered]\n“Mr. Bell, this is Hodge from Parks returning your question from last week, and, ah — following up because your car's in our lot. The gate chain is intact and locked, sir. It was intact last night too. Your tire tracks go UNDER it. I've been chaining that gate eleven years and I'm going to be honest with you, I chained it last night from the outside like always, and I'd like very much for you to call me back and explain the tracks.”",
    },
    {
      id: "c11-vm-count",
      callerLabel: "No Caller ID",
      timestamp: "2025-12-13T19:44:00",
      durationSec: 100,
      tone: "breathing",
      evidenceLabel: "7:44 PM: a 100-second voicemail of slow counting — five names, four answered",
      transcript:
        "[automated transcript — one speaker, juvenile cadence, adult pitch]\n[wind over ice. footsteps — five sets? six? analysts disagree]\n[a voice, counting, slowly: “…ninety-seven. ninety-eight. ninety-nine. one hundred.”]\n[pause]\n“ready or not.”\n[pause]\n“iris.” [distant voice: “here.”]\n“duke.” [distant voice: “here.”]\n“kat.” [distant voice: “here.”]\n“lonnie.” [distant voice: “here.”]\n“marcus.”\n[wind. a long silence. then, close to the microphone, gently:]\n“marcus, you're allowed to answer. you came. you're the only one who came on your own feet.”\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: the four “here” responses are voice-matched to Munoz, Vance-Odom, Reyes, and Pruett at confidence levels their families have asked us not to publish.",
    },
    {
      id: "c11-vm-foss",
      callerLabel: "Pruett home (landline)",
      callerNumber: "(802) 555-0004",
      timestamp: "2025-12-15T16:40:00",
      durationSec: 44,
      tone: "breathing",
      evidenceLabel: "From a landline disconnected in 2009: a boy's voice — “olly olly oxen free”",
      transcript:
        "[automated transcript — one speaker, juvenile]\n[water. not lapping — the under-side sound. hollow.]\n[a boy's voice, unhurried, kind:]\n“olly olly oxen free.”\n[pause]\n“everybody's home.”\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: originating number is the childhood landline of the Pruett household, disconnected 2009. This message arrived while the device was in evidence processing. It is the only message in this case file that analysts, unprompted and independently, have described as “happy.”",
    },
  ],

  calendarEvents: [
    { id: "c11-cal-reunion", title: "REUNION — blackwater, 7pm", date: "2025-12-13", time: "19:00", createdBy: "external", detail: "Created by 'Kat ✨' via the group chat. Accepted by all five. Declined by none.", evidenceLabel: "The reunion event, created by “Kat” — accepted by four accounts whose owners were already gone" },
    { id: "c11-cal-anniv", title: "anniversary dinner w/ elena ❤", date: "2025-12-12", time: "19:30", createdBy: "owner" },
    {
      id: "c11-cal-checkin",
      title: "check in (the story)",
      date: "2025-12-13",
      time: "16:40",
      recurring: "weekly",
      createdBy: "owner",
      detail: "His own annual event, every Dec 13 at 4:40 PM, renewed for twenty years. The time is the lie itself.",
      evidenceLabel: "His yearly 4:40 PM “check in (the story)” — twenty years of maintaining the lie, on schedule",
    },
    { id: "c11-cal-lonnie", title: "CALL LONNIE BACK", date: "2025-12-01", time: "09:00", createdBy: "owner", struck: true, evidenceLabel: "“CALL LONNIE BACK” — struck through by someone. Marcus never struck his reminders." },
    { id: "c11-cal-work", title: "make up hours (after the 13th)", date: "2025-12-15", time: "08:00", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c11-pin-home", label: "Home — Alder Ct", timestamp: "2025-12-12T22:00:00", x: 25, y: 30 },
    { id: "c11-pin-duffys", label: "Duffy's Tavern", timestamp: "2025-10-25T21:00:00", x: 40, y: 45 },
    { id: "c11-pin-scout", label: "Blackwater Quarry (daylight scout)", timestamp: "2025-12-06T14:30:00", x: 78, y: 62 },
    {
      id: "c11-pin-quarry",
      label: "Blackwater Quarry — reunion",
      timestamp: "2025-12-13T19:02:00",
      x: 78,
      y: 62,
      detail: "Arrived 7:02 PM — through a gate that was chained from the outside all night, per Parks.",
      evidenceLabel: "7:02 PM: his car inside a gate that was never unchained",
    },
    {
      id: "c11-pin-ice",
      label: "Quarry — center ice",
      timestamp: "2025-12-13T19:40:00",
      x: 80,
      y: 58,
      detail: "The phone's final moving fix: dead center of the quarry, 7:40 PM, stationary for four minutes — the length of a slow count to one hundred. Then one fix back at the lot, 8:31 PM, where the phone was found on the car hood. The ice, surveyed the next morning, was unbroken. No footprints led out. Six auger holes, and none of them large enough for a person.",
      evidenceLabel: "Final fixes: four minutes at dead center — then the phone back on the car hood, over unbroken ice",
    },
  ],

  browserHistory: [
    { id: "c11-b-foss", query: "robbie fossey blackwater quarry 2005 body never found", timestamp: "2025-08-22T00:30:00", evidenceLabel: "August: “robbie fossey… body never found”" },
    { id: "c11-b-survive", query: "can a child survive falling through ice undiscovered", timestamp: "2025-08-22T00:45:00" },
    { id: "c11-b-iris", query: "iris munoz missing burlington august", timestamp: "2025-09-25T21:00:00" },
    { id: "c11-b-duke", query: "route 9 single vehicle accident september 22 driver missing", timestamp: "2025-10-01T22:30:00", evidenceLabel: "He found Duke's accident report: single vehicle, driver never located" },
    { id: "c11-b-scheduler", query: "how to tell if texts are coming from a message scheduler", timestamp: "2025-12-05T21:40:00", evidenceLabel: "Dec 5: “how to tell if texts are coming from a message scheduler”" },
    { id: "c11-b-voice", query: "software that imitates someone's texting style from history", timestamp: "2025-12-05T22:00:00" },
    { id: "c11-b-gate", query: "what time does blackwater quarry gate close december", timestamp: "2025-12-13T17:50:00", evidenceLabel: "His last search, 5:50 PM on the 13th: when the gate closes" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "TackleBox",
    revealAfterClueIds: ["c11-th-group", "c11-n-tally"],
    title: "THE STORY — v. final",
    heading: "Keep it identical. Keep it forever.",
    body:
      "A vault disguised as a fishing calculator, installed the week after the funeral-with-no-casket, maintained for twenty years. Five children's insurance policy. It contains the agreed account of December 13, 2005 — and the roll call proving they kept it.\n\nThey rehearsed a lie annually with more discipline than most people rehearse anything true.",
    entries: [
      { label: "THE ACCOUNT (memorize)", status: "UNCHANGED SINCE '05", detail: "4:40 · dare · he went alone · we were on shore" },
      { label: "Check-in 2006–2015", status: "5 / 5", detail: "all present · story holds" },
      { label: "Check-in 2016–2023", status: "5 / 5", detail: "all present · kat by phone twice" },
      { label: "Check-in 2024", status: "5 / 5", detail: "duke late · story holds" },
      { label: "Check-in 2025", status: "1 / 5", detail: "iris —. duke —. kat —. lonnie —. marcus: present." },
      { label: "AMENDMENT (unauthorized)", status: "ADDED 12/13 19:44", detail: "author unknown · text: 'six were present.'" },
      { label: "AMENDMENT (unauthorized)", status: "ADDED 12/13 20:31", detail: "author unknown · text: 'story concluded. all found.'" },
    ],
    footer:
      "The vault required all five thumbprints to amend — a child's idea of security that held for two decades. The final two amendments were authored with no thumbprint at all, the second at the exact minute the phone was set down on the car hood. The account itself was never edited. Whoever concluded the story didn't need to correct it. Everyone who believed it was done believing it.",
    evidenceLabel: "The TackleBox vault: the pact of 2005, twenty years of roll calls — and two amendments no living hand signed",
  },

  liveEvents: [
    {
      id: "c11-live-group",
      kind: "message",
      afterSeconds: 340,
      threadId: "c11-th-group",
      message: {
        id: "c11-m-gr-live",
        from: "them",
        text: "Kat: what a perfect night ✨ same time next year, everyone. and to whoever's reading along — you're welcome to come. we're so easy to find. we're all in one place now",
        timestamp: "2025-12-15T21:07:00",
        evidenceLabel: "The chat, still warm, to whoever reads it: “we're all in one place now”",
      },
    },
    {
      id: "c11-live-cal",
      kind: "notification",
      afterSeconds: 620,
      title: "Calendar",
      body: "New event: REUNION — blackwater. Dec 13, next year. Repeats yearly.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c11-v-ice",
      label: "The ice took him, like it took Foss",
      description: "A grieving man, an anniversary, a frozen quarry at night. History doesn't need help repeating.",
      requiredEvidenceIds: ["c11-pin-ice", "c11-ph-augerholes", "c11-n-eulogy"],
      isCanon: false,
      epilogue:
        "The drowning verdict writes itself, which should have been your first warning. Divers go down in January when the ice clears. The quarry is deep and old and full of 2005's unanswered question, and now, presumably, 2025's.\n\nThey find nothing. Not Marcus. Not — and the dive supervisor's report states this with visible discomfort — not Foss, either, though sonar maps the entire floor at a resolution that has found car keys. Twenty years of everyone assuming the quarry kept him, and the quarry is empty. It was always empty. Whatever went through the ice in 2005 did not stay under it.\n\nThe unbroken ice stays in the file as 'refrozen.' The tire tracks under the chained gate stay in the file as 'unresolved.' Elena stays at the quarry fence some evenings, not crying, just counting — you watched her once, from the car, and her lips said five, then six, then stopped.",
    },
    {
      id: "c11-v-foss",
      label: "Foss came back for the count",
      description: "A boy who never got his olly-olly-oxen-free, four friends collected in order, and a chat kept warm to gather the last one.",
      requiredEvidenceIds: ["case-11.hidden", "c11-n-locked", "c11-ph-metadata", "c11-vm-count", "c11-m-un-3"],
      isCanon: true,
      epilogue:
        "You file the verdict the evidence keeps whispering and the law has no shelf for: someone survived December 13, 2005 — or something of him did — and spent twenty years learning five voices well enough to wear them. Iris in August. Duke in September. Kat, quietly, some unmarked day in summer. Lonnie in November. Each account kept warm afterward, a trophy case with typing indicators, herding the last hider toward the anniversary.\n\nYour report cannot say what he is now. It says what he did: the scheduler queues, the vault amendments signed by no thumb, the roll call on the 7:44 voicemail with four 'here's in four stolen voices. It notes that Marcus went anyway — knowingly, note in hand, to stand at dead center and say the words nobody ever called across that ice. The last human act in this file is a man walking onto frozen water to finish a game of hide-and-seek twenty years late, and your report refuses to call that anything but what Elena calls it: brave.\n\nNo one is found. Not one of the six. The queue of 'Kat' messages runs dry in March, mid-sentence, as if the author finally had everyone he was writing for.\n\nWhat you can't shake is the sequence: 'marcus, you're allowed to answer. you came. you're the only one who came on your own feet.' Every analyst hears menace in it, then listens twice more and hears something worse — gratitude. The five statements from 2005 said Foss went out alone. For the first time in twenty years, on the night the story concluded, that was finally false. Nobody was alone out there. The report ends with the landline voicemail, transcribed in full, because 'everybody's home' is either the most terrifying sentence in this archive or the only gentle one, and you have decided you are not qualified to say which.",
    },
    {
      id: "c11-v-lonnie",
      label: "Lonnie orchestrated everything",
      description: "The last friend 'taken' is the classic author. He proposed the phone call that never happened. He owed the day more than anyone.",
      requiredEvidenceIds: ["c11-m-lo-3", "c11-m-lo-6", "c11-m-gr-12"],
      isCanon: false,
      epilogue:
        "The living-suspect theory: Lonnie, who found the pact heavier than the others, staging four disappearances and a finale to bury the story with its witnesses. His reply arriving a minute before Marcus's message even looks like sloppy scheduling by a human hand.\n\nIt survives right up until forensics unlocks Lonnie's abandoned laptop. There's a draft email to a true-crime podcast, dated Nov 29, attaching the 2005 clipping and beginning: 'My name is Lon Pruett and twenty years ago five children lied about a sixth.' He was going to confess. To everyone. The night before he vanished, he'd asked 'Kat' to prove herself, and she had, and he understood what that proof meant, and he reached for the loudest microphone he could find.\n\nThe email was never sent. The draft's last edit is timestamped 8:00 PM, Nov 30 — the exact minute of the call he'd promised Marcus. It ends mid-word. The word was 'counting.'",
    },
    {
      id: "c11-v-pact",
      label: "The lie collapsed on its keepers",
      description: "Five people maintained one story for twenty years. Guilt is patient, coordinated, and better at scheduling than any app.",
      requiredEvidenceIds: ["c11-ph-clipping", "c11-cal-checkin", "c11-n-tally"],
      isCanon: false,
      epilogue:
        "The psychological verdict: no revenant, no orchestrator — five people rotting under the same secret, dropping away one by one as the twentieth anniversary approached, each disappearance mundane on its own. Iris walked away from her life; people do. Duke wandered from a crash; people do. The 'imposter' messages were the survivors themselves, performing wellness at each other because the alternative was the conversation none of them could have.\n\nIt explains almost everything, which is this case's cruelest trick — every file in this archive has a version that explains almost everything.\n\nIt does not explain the four voices on the 7:44 voicemail answering a roll call. It does not explain the vault amendments, or the landline dead since 2009, or tire tracks under a chained gate. You write those into an appendix titled 'residual anomalies,' and the phrase does its bureaucratic work, and the file closes.\n\nOn December 13th of next year, at 4:40 PM, a calendar reminder will fire on a phone in an evidence locker: 'check in (the story).' Nobody will answer it. That, at least, your report can guarantee. It's the only thing it can.",
    },
  ],
};

export default c11;
