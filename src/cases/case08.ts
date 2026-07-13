import type { CaseFile } from "../types";
import { photoSvg, wall, doorway, figure, timestampBurn } from "../photoart";

/**
 * CASE 08 — THE BABYSITTING APP
 * Maddie Okafor, 17. Five-star sitter on the SitterTrust app. Her best
 * client, "the Wexlers," booked her five times at 1207 Fernway Lane —
 * a house that has been condemned and empty for two years. On the night
 * of her first overnight booking, she vanished. Her phone stayed in the
 * house. The house stayed empty. It was always empty.
 */

const c8: CaseFile = {
  id: "case-08",
  title: "The Babysitting App",
  victimName: "Maddie Okafor, 17",
  summary:
    "A teenage babysitter's favorite clients paid double, tipped in cash, and asked only one thing: never check on the children — they're sleeping. Five sits. She never once saw the kids, or the parents, or the truth about the address. The night of the overnight booking, she saw all three.",
  intake:
    "SUBJECT: Okafor, Madison A. (17). Reported missing by her mother Nov 30, after failing to return from an overnight babysitting booking.\n\nDEVICE: Recovered Dec 1 from the front hall of 1207 Fernway Lane. Battery 46%, face down on the floor beside the door. Rear door of the residence found open.\n\nPROPERTY: 1207 Fernway Lane has been condemned and unoccupied since a 2023 electrical fire. Power and water disconnected. Investigators found the front rooms furnished and clean — space heaters, battery lamps, staged family photographs — and the rest of the house fire-damaged and empty. There are no children's beds. There have never been children's beds.\n\nPLATFORM: SitterTrust confirms five completed bookings at this address by family account 'The Wexlers' (ID-verified badge: yes; verification vendor: 'legacy, records unavailable'). Payment: prepaid cards. The account is still active.\n\nSecond-pass review requested. A minor is missing. Treat every hour as the first hour.",
  contentWarningLevel: 3,
  phone: {
    ownerLabel: "maddie 🍥 — sitter, senior, future vet",
    recoveredAt: "2025-12-02T20:30:00",
    batteryStart: 46,
    wallpaperHue: 305,
    lockScreenNotifications: [
      { appId: "messages", title: "Mom", preview: "Madison Amara. It is 2am. You call me RIGHT NOW.", targetId: "c8-th-mom" },
      { appId: "messages", title: "The Wexlers (SitterTrust)", preview: "The kids miss you already. Same time next week?", targetId: "c8-th-wexler" },
      { appId: "messages", title: "Zoe 🧃", preview: "did you check the thing I sent. maddie. CHECK THE THING", targetId: "c8-th-zoe" },
    ],
  },

  messages: [
    {
      id: "c8-th-mom",
      contactName: "Mom",
      contactNumber: "(313) 555-0119",
      messages: [
        { id: "c8-m-mo-1", from: "them", text: "New family tonight? Text me the address like always.", timestamp: "2025-10-18T16:00:00" },
        { id: "c8-m-mo-2", from: "owner", text: "the wexlers, 1207 fernway lane. app-verified, mom. green badge and everything. $30/hr!!", timestamp: "2025-10-18T16:10:00", evidenceLabel: "She sent her mom the address, like always — trusting the green badge" },
        { id: "c8-m-mo-3", from: "them", text: "$30?? What do these people do?", timestamp: "2025-10-18T16:12:00" },
        { id: "c8-m-mo-4", from: "owner", text: "'consulting.' rich people are vague, mom. their loss my college fund", timestamp: "2025-10-18T16:15:00" },
        { id: "c8-m-mo-5", from: "them", text: "You're quiet about the Wexler sits lately. Everything okay with them?", timestamp: "2025-11-20T18:30:00" },
        { id: "c8-m-mo-6", from: "owner", text: "yeah. they're just… a quiet family. I'll tell you about it sunday. it's probably nothing. I want it to be nothing", timestamp: "2025-11-20T18:47:00", evidenceLabel: "“I'll tell you about it sunday… I want it to be nothing” — Sunday never came" },
        { id: "c8-m-mo-7", from: "them", text: "Madison Amara. It is 2am. You call me RIGHT NOW.", timestamp: "2025-11-30T02:01:00" },
      ],
    },
    {
      id: "c8-th-wexler",
      contactName: "The Wexlers (SitterTrust)",
      messages: [
        { id: "c8-m-wx-1", from: "them", text: "Hi Maddie! We saw your lovely profile. Our twins, Emmy and Jonah (6), need a regular sitter. Saturdays, 7pm on. We pay $30/hr — good sitters are worth it. The lockbox code is on the app. — Kara W.", timestamp: "2025-10-16T13:00:00" },
        {
          id: "c8-m-wx-2",
          from: "them",
          text: "One house rule, and it's important: the twins will already be asleep when you arrive. Please don't check on them — Emmy wakes if the door so much as breathes, and then nobody sleeps. Just be present downstairs. That's what we're paying for. 🙂",
          timestamp: "2025-10-16T13:05:00",
          evidenceLabel: "The one house rule: never check on the children",
        },
        { id: "c8-m-wx-3", from: "owner", text: "of course! I'll be quiet as a mouse. see you saturday!", timestamp: "2025-10-16T13:20:00" },
        { id: "c8-m-wx-4", from: "them", text: "We're running late, don't wait up for us — cash is under the blue vase, plus extra. You're wonderful. The kids already feel safer with you in the house. — K", timestamp: "2025-10-18T22:40:00", evidenceLabel: "The parents were always “running late” — she never once met them" },
        { id: "c8-m-wx-5", from: "owner", text: "no problem! it was a quiet night. I didn't hear a peep from the twins 🙂", timestamp: "2025-10-18T23:55:00" },
        { id: "c8-m-wx-6", from: "them", text: "They're heavy sleepers. It runs in the family.", timestamp: "2025-10-18T23:57:00" },
        { id: "c8-m-wx-7", from: "owner", text: "quick q — Emmy left a drawing on the stairs I think? should I put it in her room?", timestamp: "2025-11-15T21:30:00" },
        {
          id: "c8-m-wx-8",
          from: "them",
          text: "Leave it exactly where it is, please. Emmy has a system. Do not go upstairs, Maddie. We discussed the rule. We'd hate to lose you over the rule.",
          timestamp: "2025-11-15T21:31:00",
          evidenceLabel: "One question about the stairs — answered in sixty seconds: “We'd hate to lose you over the rule.”",
        },
        {
          id: "c8-m-wx-9",
          from: "them",
          text: "Big ask: we need an overnight, Sat the 29th. Double rate, triple tip. The twins asked for you specifically. Jonah drew you. You're family now, Maddie.",
          timestamp: "2025-11-24T10:00:00",
          evidenceLabel: "The overnight booking: “The twins asked for you specifically… You're family now.”",
        },
        { id: "c8-m-wx-10", from: "them", text: "The kids miss you already. Same time next week?", timestamp: "2025-11-30T09:00:00", evidenceLabel: "Sent the morning after she vanished: “The kids miss you already.”" },
      ],
    },
    {
      id: "c8-th-zoe",
      contactName: "Zoe 🧃",
      contactNumber: "(313) 555-0164",
      ghostTypingAfterSeconds: 380,
      messages: [
        { id: "c8-m-zo-1", from: "them", text: "how are the ghost kids lmao. still asleep?", timestamp: "2025-11-01T22:15:00" },
        { id: "c8-m-zo-2", from: "owner", text: "FIVE SITS zoe. five. I have never heard a toilet flush in that house. the parents text the SECOND I wonder anything. it's like the house can hear me think", timestamp: "2025-11-01T22:20:00", evidenceLabel: "Five sits: she never heard a single sound of another person in the house" },
        { id: "c8-m-zo-3", from: "them", text: "ok that's not a family that's a terrarium and you're the exhibit. QUIT", timestamp: "2025-11-01T22:22:00" },
        { id: "c8-m-zo-4", from: "owner", text: "it's $30 an hour and they asked me to install a bedtime app for the kids. 'StoryTime.' it plays ocean sounds through the house speakers. the house has SPEAKERS zoe. condemned houses with surround sound", timestamp: "2025-11-08T23:10:00", evidenceLabel: "The “mom” had her install a bedtime app that plays through the empty house's speakers" },
        { id: "c8-m-zo-5", from: "them", text: "WAIT. condemned??? what do you mean condemned", timestamp: "2025-11-08T23:12:00" },
        { id: "c8-m-zo-6", from: "owner", text: "found a notice under the doormat. 2023. I'm telling myself it's old paperwork. rich people buy condemned houses and fix them right?? right", timestamp: "2025-11-08T23:20:00" },
        {
          id: "c8-m-zo-7",
          from: "them",
          text: "I searched the address. maddie there was a FIRE. nobody bought it. it's on the county condemned list TODAY. I'm sending you the link. do not go back. did you check the thing I sent. maddie. CHECK THE THING",
          timestamp: "2025-11-28T21:40:00",
          evidenceLabel: "Zoe found it: the house is on the county condemned list — currently",
        },
        { id: "c8-m-zo-8", from: "owner", text: "I checked it. I'm going tomorrow anyway BUT LISTEN — one last sit, I leave the app running, I get proof, and then we call the police with a FOLDER not a feeling. I have a plan and a bus schedule and I'm not stupid", timestamp: "2025-11-28T22:30:00", evidenceLabel: "Her plan for the overnight: get proof, then go to the police — “a folder, not a feeling”" },
        { id: "c8-m-zo-9", from: "them", text: "maddie??? you said you'd text at midnight. it's 12:40", timestamp: "2025-11-30T00:40:00" },
      ],
    },
    {
      id: "c8-th-sittertrust",
      contactName: "SitterTrust",
      messages: [
        { id: "c8-m-st-1", from: "them", text: "SitterTrust: Congrats Maddie! You're a TOP SITTER 🌟 Your sitter ID #4471 now shows a gold ring. Families love you!", timestamp: "2025-10-25T12:00:00", evidenceLabel: "Her sitter ID: #4471" },
        { id: "c8-m-st-2", from: "owner", text: "How do you verify families? The Wexler family — can you confirm their ID check? Something feels off.", timestamp: "2025-11-21T16:00:00" },
        { id: "c8-m-st-3", from: "them", text: "SitterTrust: Great question! Families with the green badge completed identity verification at signup. For privacy, we can't share details. Rest assured: your safety is our #1 priority! 💛", timestamp: "2025-11-21T16:02:00", evidenceLabel: "The app's answer to “something feels off”: rest assured" },
        { id: "c8-m-st-4", from: "owner", text: "Can you at least tell me WHEN they verified?", timestamp: "2025-11-21T16:05:00" },
        { id: "c8-m-st-5", from: "them", text: "SitterTrust: The Wexler family account was verified in 2021 via a legacy vendor. Those records are unavailable. Anything else we can help with? 💛", timestamp: "2025-11-21T16:06:00", evidenceLabel: "“Verified in 2021 via a legacy vendor. Those records are unavailable.”" },
        { id: "c8-m-st-6", from: "them", text: "SitterTrust: New booking request! THE WEXLERS — Sat Nov 29, overnight. Rate: $60/hr. Accept?", timestamp: "2025-11-24T10:01:00" },
      ],
    },
    {
      id: "c8-th-calloway",
      contactName: "Mrs. Calloway",
      contactNumber: "(313) 555-0146",
      messages: [
        { id: "c8-m-ca-1", from: "them", text: "Maddie you're a lifesaver. The boys are STILL talking about volcano night. Saturday again?", timestamp: "2025-11-02T10:00:00" },
        { id: "c8-m-ca-2", from: "owner", text: "can't saturdays anymore, I have a regular family. but sundays always! save me some volcano", timestamp: "2025-11-02T10:15:00" },
        { id: "c8-m-ca-3", from: "them", text: "A regular family that books every Saturday and you've never mentioned their kids once? Maddie, honey, you talk about MY kids constantly. Who are these people?", timestamp: "2025-11-23T14:30:00", evidenceLabel: "Mrs. Calloway noticed: Maddie never once talked about the Wexler kids" },
        { id: "c8-m-ca-4", from: "owner", text: "…that's a really good question actually", timestamp: "2025-11-23T14:50:00" },
      ],
    },
    {
      id: "c8-th-dev",
      contactName: "Devon 🌮",
      contactNumber: "(313) 555-0182",
      messages: [
        { id: "c8-m-de-1", from: "them", text: "movie friday? you've bailed twice, I'm keeping score", timestamp: "2025-11-26T19:00:00" },
        { id: "c8-m-de-2", from: "owner", text: "after saturday I'm free forever. one more sit and I'm done with the weird family. then movies, tacos, normal life", timestamp: "2025-11-26T19:20:00", evidenceLabel: "“one more sit and I'm done with the weird family”" },
        { id: "c8-m-de-3", from: "them", text: "'done with the weird family' is the most horror movie sentence you've ever said. text me when you're home sat", timestamp: "2025-11-26T19:22:00" },
      ],
    },
    {
      id: "c8-th-sis",
      contactName: "Ada (sis)",
      contactNumber: "(313) 555-0110",
      messages: [
        { id: "c8-m-ad-1", from: "them", text: "borrow your denim jacket for friday? asking formally so you can't say I stole it", timestamp: "2025-11-25T17:00:00" },
        { id: "c8-m-ad-2", from: "owner", text: "formal request approved. if anything happens to that jacket you owe me a new one AND emotional damages", timestamp: "2025-11-25T17:05:00" },
        { id: "c8-m-ad-3", from: "them", text: "mads where are you. mom's calling everyone. I still have your jacket. come get your jacket", timestamp: "2025-11-30T11:00:00" },
      ],
    },
    {
      id: "c8-th-school",
      contactName: "AP Bio Study Gang",
      messages: [
        { id: "c8-m-sg-1", from: "them", text: "Kofi: test friday. someone bring the flashcards and someone bring snacks and NOBODY bring vibes only", timestamp: "2025-11-24T20:00:00" },
        { id: "c8-m-sg-2", from: "owner", text: "I have flashcards AND snacks because I'm built different", timestamp: "2025-11-24T20:05:00" },
        { id: "c8-m-sg-3", from: "them", text: "Lena: maddie's carrying this team like a mitochondria", timestamp: "2025-11-24T20:06:00" },
      ],
    },
    {
      id: "c8-th-pizza",
      contactName: "Fernway Pies 🍕",
      messages: [
        { id: "c8-m-pz-1", from: "them", text: "FERNWAY PIES: Your order is on the way! Driver note: 'address shows condemned on my map?? going anyway'", timestamp: "2025-11-15T20:30:00", evidenceLabel: "Even the pizza driver's map said the house was condemned" },
        { id: "c8-m-pz-2", from: "owner", text: "yes it's the house with the porch light on! it looks worse than it is lol", timestamp: "2025-11-15T20:32:00" },
      ],
    },
    {
      id: "c8-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c8-m-un-1",
          from: "them",
          text: "you left before the best part. the twins were finally going to meet you.",
          timestamp: "2025-11-30T03:33:00",
          evidenceLabel: "3:33 AM, after she fled: “the twins were finally going to meet you.”",
        },
      ],
    },
  ],

  photos: [
    {
      id: "c8-ph-livingroom",
      caption: "the wexler living room. so clean it echoes. no shoes by the door. no shoes ANYWHERE",
      timestamp: "2025-10-18T19:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-18T19:20:00", device: "This phone", location: "1207 Fernway Ln" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#1f1c22") +
          `<rect x="50" y="170" width="160" height="70" rx="10" fill="#332b38"/>` +
          `<rect x="50" y="150" width="160" height="26" rx="10" fill="#3d3442"/>` +
          `<rect x="260" y="120" width="100" height="120" fill="#17141c"/>` +
          `<ellipse cx="140" cy="100" rx="40" ry="8" fill="#2a2530" opacity="0.7"/>` +
          `<rect x="230" y="200" width="30" height="45" fill="#26202c"/>` +
          `<circle cx="245" cy="185" r="12" fill="#3a4a6b" opacity="0.5"/>`,
        { aspect: "landscape", base: "#16141a", grain: 0.12 },
      ),
      evidenceLabel: "The staged living room: furnished, spotless, and echoing empty",
    },
    {
      id: "c8-ph-mantle",
      caption: "family photos on the mantle. cute kids. weird thing: emmy and jonah are wearing the same clothes in every single photo",
      timestamp: "2025-10-25T20:10:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-25T20:10:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#221e24") +
          `<rect x="40" y="230" width="220" height="16" fill="#3a3040"/>` +
          Array.from({ length: 3 }, (_, i) => `<rect x="${55 + i * 70}" y="${160 - (i % 2) * 10}" width="60" height="70" fill="#171420"/><rect x="${60 + i * 70}" y="${165 - (i % 2) * 10}" width="50" height="55" fill="#2c2836"/>`).join("") +
          Array.from({ length: 3 }, (_, i) => `${figure(75 + i * 70, 210 - (i % 2) * 10, 0.28, 0.9, "#4a4252")}${figure(95 + i * 70, 212 - (i % 2) * 10, 0.22, 0.9, "#443c4e")}`).join(""),
        { aspect: "portrait", base: "#181519", grain: 0.13 },
      ),
      evidenceLabel: "The mantle photos: the twins wear identical clothes in every photo, at every age",
    },
    {
      id: "c8-ph-kidsdoor",
      caption: "the twins' door. I have sat fifteen feet from this door for five saturdays. it has never once opened",
      timestamp: "2025-11-08T22:45:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-08T22:45:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#151218"/>` +
          `<rect x="30" y="60" width="240" height="340" fill="#1c1822"/>` +
          doorway(85, 100, 130, 300, "#242030") +
          `<rect x="85" y="100" width="130" height="300" fill="#282235"/>` +
          `<circle cx="195" cy="250" r="6" fill="#3d3548"/>` +
          `<rect x="120" y="130" width="60" height="22" rx="4" fill="#3a3244"/>` +
          `<text x="150" y="145" text-anchor="middle" font-family="serif" font-size="11" fill="#8a7f96">E + J</text>` +
          `<path d="M85 395 h130" stroke="#0d0b10" stroke-width="6"/>`,
        { aspect: "portrait", base: "#100e13", grain: 0.14 },
      ),
      evidenceLabel: "The twins' bedroom door — behind it, investigators found fire damage and bare boards",
    },
    {
      id: "c8-ph-lockbox",
      caption: "lockbox on the porch rail. the buttons 2-9-2-6 are worn shiny. everything else is rusted",
      timestamp: "2025-10-18T18:58:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-18T18:58:00", device: "This phone", location: "1207 Fernway Ln" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#141216"/>` +
          `<rect x="100" y="130" width="100" height="140" rx="10" fill="#2c2a2e"/>` +
          `<rect x="115" y="150" width="70" height="40" rx="4" fill="#1a181c"/>` +
          Array.from({ length: 9 }, (_, i) => {
            const shiny = [1, 8, 5].includes(i);
            return `<circle cx="${125 + (i % 3) * 25}" cy="${210 + Math.floor(i / 3) * 22}" r="8" fill="${shiny ? "#5c5a52" : "#232126"}"/>`;
          }).join("") +
          `<rect x="130" y="118" width="40" height="16" rx="6" fill="#232126"/>`,
        { aspect: "portrait", base: "#0f0e11", grain: 0.13 },
      ),
    },
    {
      id: "c8-ph-profile",
      caption: "gold ring on my profile!! top sitter #4471. mom framed a screenshot. an actual frame",
      timestamp: "2025-10-25T12:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-25T12:30:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101216"/>` +
          `<rect x="30" y="50" width="240" height="320" rx="14" fill="#161a22"/>` +
          `<circle cx="150" cy="130" r="42" fill="#2c3642"/>` +
          `<circle cx="150" cy="130" r="48" fill="none" stroke="#c8a84a" stroke-width="4"/>` +
          `<text x="150" y="205" text-anchor="middle" font-family="monospace" font-size="14" fill="#c9d2da">MADDIE O.</text>` +
          `<text x="150" y="228" text-anchor="middle" font-family="monospace" font-size="11" fill="#c8a84a">TOP SITTER · #4471</text>` +
          `<text x="150" y="255" text-anchor="middle" font-family="monospace" font-size="10" fill="#5c6670">★★★★★ (23 reviews)</text>` +
          `<rect x="60" y="285" width="180" height="30" rx="8" fill="#1d2530"/>` +
          `<text x="150" y="305" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a90a4">“So attentive!” — The Wexlers</text>`,
        { aspect: "portrait", base: "#0c0e12", grain: 0.09 },
      ),
      evidenceLabel: "Her Top Sitter profile: #4471 — and a five-star review from the Wexlers",
    },
    {
      id: "c8-ph-volcano",
      caption: "calloway boys' volcano night. THIS is what a house with kids sounds like btw. it sounds like a war crime and I love it",
      timestamp: "2025-11-02T19:45:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-02T19:45:00", device: "This phone", location: "Calloway residence" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1d1a16"/>` +
          `<rect x="60" y="180" width="280" height="80" fill="#2c2620"/>` +
          `<path d="M170 180 L200 110 L230 180 Z" fill="#4a3a2a"/>` +
          `<path d="M195 110 Q200 90 205 110" stroke="#a4502e" stroke-width="8" fill="none"/>` +
          `<circle cx="200" cy="95" r="10" fill="#c96f2b" opacity="0.6"/>` +
          Array.from({ length: 8 }, (_, i) => `<circle cx="${90 + i * 30}" cy="${230 + (i % 3) * 8}" r="4" fill="#57422a"/>`).join(""),
        { aspect: "landscape", base: "#151310", grain: 0.11 },
      ),
    },
    {
      id: "c8-ph-porchlight",
      caption: "they always leave the porch light on for me. only light on the whole street. huh",
      timestamp: "2025-11-15T18:55:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-15T18:55:00", device: "This phone", location: "Fernway Ln" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#08090c"/>` +
          Array.from({ length: 4 }, (_, i) => `<rect x="${20 + i * 100}" y="${120 + (i % 2) * 10}" width="80" height="100" fill="#0d0f13"/>`).join("") +
          `<rect x="220" y="115" width="80" height="105" fill="#12141a"/>` +
          `<circle cx="260" cy="150" r="16" fill="#c8a84a" opacity="0.5"/>` +
          `<circle cx="260" cy="150" r="34" fill="#c8a84a" opacity="0.12"/>` +
          `<rect y="220" width="400" height="80" fill="#0a0b0e"/>`,
        { aspect: "landscape", base: "#060709", grain: 0.16 },
      ),
      evidenceLabel: "The only lit porch on a dead street — lit for her",
    },
    {
      id: "c8-ph-basement",
      caption: "",
      timestamp: "2025-11-29T23:48:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-29T23:48:00", device: "This phone", location: "1207 Fernway Ln" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#060708"/>`,
        { aspect: "portrait", base: "#050607", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="300" height="400" fill="#0b0c10"/>` +
            `<rect x="40" y="80" width="220" height="320" fill="#0e1014"/>` +
            Array.from({ length: 4 }, (_, i) => `<rect x="${60 + i * 50}" y="120" width="34" height="180" fill="#131720"/>`).join("") +
            `<rect x="60" y="310" width="180" height="40" fill="#10141a"/>` +
            `<text x="150" y="336" text-anchor="middle" font-family="monospace" font-size="8" fill="#4a4453">monitors. four of them. all showing the couch I was just sitting on</text>` +
            figure(150, 300, 0.4, 0.55, "#1a2028") +
            timestampBurn("23:48:07", 300, 400),
          { aspect: "portrait", base: "#090a0d", grain: 0.13 },
        ),
      },
      evidenceLabel: "Her last photo: the basement — four monitors, all showing the couch she'd just left",
    },
    // ---- Recently Deleted ---------------------------------------------------
    {
      id: "c8-ph-drawing",
      caption: "",
      timestamp: "2025-11-15T21:26:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-15T21:26:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#151316"/>` +
          `<rect x="45" y="60" width="210" height="280" fill="#d8d2c2" opacity="0.9" transform="rotate(-2 150 200)"/>` +
          `<rect x="75" y="100" width="150" height="120" fill="none" stroke="#8a5a3a" stroke-width="4"/>` +
          `<path d="M70 100 L150 60 L230 100" fill="none" stroke="#8a5a3a" stroke-width="4"/>` +
          `<rect x="95" y="240" width="30" height="40" fill="none" stroke="#3a5c8a" stroke-width="3"/>` +
          figure(110, 290, 0.3, 0.9, "#3a3427") +
          `<circle cx="185" cy="265" r="14" fill="none" stroke="#55503f" stroke-width="3"/>` +
          `<path d="M185 279 V305 M185 285 L172 295 M185 285 L198 295" stroke="#55503f" stroke-width="3"/>` +
          `<text x="150" y="330" text-anchor="middle" font-family="serif" font-size="11" fill="#7a3a42">the qiet man wachs the siter</text>`,
        { aspect: "portrait", base: "#0f0e10", grain: 0.11 },
      ),
      evidenceLabel: "The drawing from the stairs, in crayon: “the qiet man wachs the siter”",
    },
    {
      id: "c8-ph-notice",
      caption: "",
      timestamp: "2025-11-08T23:05:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-08T23:05:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#121013"/>` +
          `<rect x="50" y="70" width="200" height="260" fill="#c9bfa4" opacity="0.85"/>` +
          `<text x="150" y="110" text-anchor="middle" font-family="serif" font-size="14" fill="#7a3a42">CONDEMNED</text>` +
          `<text x="150" y="135" text-anchor="middle" font-family="serif" font-size="9" fill="#3a3427">BY ORDER OF THE COUNTY — 2023</text>` +
          Array.from({ length: 7 }, (_, i) => `<rect x="70" y="${160 + i * 20}" width="${160 - ((i * 31) % 60)}" height="4" fill="#8b8371"/>`).join("") +
          `<text x="150" y="310" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">UNSAFE FOR HUMAN OCCUPANCY</text>`,
        { aspect: "portrait", base: "#0d0c0e", grain: 0.1 },
      ),
      evidenceLabel: "The deleted photo of the condemnation notice she found under the doormat",
    },
  ],

  notes: [
    {
      id: "c8-n-sitlog",
      title: "sitter notes (wexlers)",
      timestamp: "2025-11-23T15:30:00",
      evidenceLabel: "Her sit-by-sit log of everything wrong at Fernway Lane",
      body:
        "keeping notes like for the calloways, except these are getting weird so now they're EVIDENCE-flavored notes.\n\nsit 1 (oct 18) — normal? big clean house. kids asleep. parents 'late,' cash under vase, $40 extra.\n\nsit 2 (oct 25) — the mantle photos. twins wear the same clothes in EVERY photo. also every photo is the same three poses. also I found no toys. a six-year-old lives here and there are no toys.\n\nsit 3 (nov 1) — no toilet flush, no snore, no white noise machine, NOTHING. texted zoe. she said terrarium. can't stop thinking the word terrarium.\n\nsit 4 (nov 8) — 'storytime' app request. ocean sounds through ceiling speakers. found the county notice under the mat. googled nothing because I didn't want to know yet. that's on me.\n\nsit 5 (nov 15) — the drawing on the stairs. it was NOT there when I arrived. I walked past those stairs nine times. then it was there. kara texted about it 60 seconds after I picked it up. there is no camera I can see. there is definitely a camera I can't.\n\nnov 23 — mrs. calloway asked who these people ARE and I realized: I know their venmo, their vase, their wifi password. I have never heard their voices. I've never seen the twins blink. because I've never seen the twins.\n\nsat is the overnight. I'm going. proof, then police, then never again. locking the plan in the pink note. code is my number — the one the app gave me. I'm a number to them anyway.",
    },
    {
      id: "c8-n-locked",
      title: "pink note 🔒",
      timestamp: "2025-11-28T23:50:00",
      lock: {
        code: "4471",
        hintText: "“code is my number — the one the app gave me. I'm a number to them anyway.”",
        clueSourceIds: ["c8-th-sittertrust", "c8-ph-profile"],
      },
      evidenceLabel: "The pink note: her plan for the overnight, and her exits",
      body:
        "PLAN. because zoe's right and I'm going in smart or not at all.\n\n1. arrive 7pm like normal. text mom the address AGAIN (paper trail).\n2. storytime app stays running — if it's what I think it is, it's recording, and recordings go both ways. leave it logged in. let them keep their own receipts.\n3. midnight: text zoe the code word (jacaranda). 12:05: 'bathroom' → check ONE thing: the basement door. it's the only door with a new lock in a condemned house. new locks protect something. condemned houses have nothing. so.\n4. if ANYTHING is wrong: back door (I unlocked the storm latch on sit 4, they never fixed it — noted), through the yard gap behind the azaleas, down to the 9 bus. NOT home. home address is on the app and I don't know who reads the app. crossroads shelter takes minors no questions. call mom from their desk phone.\n5. phone gets LEFT. it's the app's eyes. you don't bring the eyes.\n\nif someone else is reading this: I left on my own feet. look for me at shelters, not in lakes. and check the storytime app. it goes both ways.\n\n— m. (future vet, current genius, hopefully)",
    },
    {
      id: "c8-n-college",
      title: "college fund math 🎓",
      timestamp: "2025-11-10T17:00:00",
      evidenceLabel: "Her college fund: $2,340 saved — untouched after she vanished",
      body: "saved: $2,340\nwexler saturdays: +$150/wk (!!!)\ngoal by june: $4,000\n\nvet school is 8 years. worth it. dogs are worth 80 years.",
    },
    {
      id: "c8-n-flashcards",
      title: "AP bio — krebs cycle",
      timestamp: "2025-11-24T21:00:00",
      body: "glycolysis → pyruvate → acetyl-CoA → citrate...\n\n(kofi if you're reading my notes app again: bring your OWN snacks friday)",
    },
  ],

  voicemails: [
    {
      id: "c8-vm-mom",
      callerLabel: "Mom",
      callerNumber: "(313) 555-0119",
      timestamp: "2025-11-30T02:15:00",
      durationSec: 29,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Madison. Baby. Your location says that house and the police say that house is EMPTY, and I am in the car, and I am coming to that house, and God help whoever — baby, if you can hear this, if you're hiding somewhere, you stay hidden and you stay smart like I raised you, and you find a phone and you call me. Any hour. Any year. You call me.”",
    },
    {
      id: "c8-vm-calloway",
      callerLabel: "Mrs. Calloway",
      callerNumber: "(313) 555-0146",
      timestamp: "2025-11-30T14:20:00",
      durationSec: 24,
      tone: "plain",
      evidenceLabel: "Mrs. Calloway to police, via Maddie's voicemail: the questions the app never asked",
      transcript:
        "[automated transcript — audio partially recovered]\n“Maddie, sweetheart, it's Diane Calloway. The police were here asking about your Saturday family and I told them what I'll say to anyone: no parent books ten weeks of sits and never once brags about their children. I should have said it to you louder. The boys made you a card. It's terrible. You'll love it. Come home and get it.”",
    },
    {
      id: "c8-vm-wexler",
      callerLabel: "The Wexlers (SitterTrust)",
      timestamp: "2025-11-30T09:05:00",
      durationSec: 26,
      tone: "distorted",
      evidenceLabel: "“Kara Wexler's” only voicemail — the first time anyone heard the voice",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Maddie! It's Kara. You left so suddenly — the back door was wide open, you must have been freezing. The twins slept through everything, thank goodness. We'd love to have you back. We're keeping your Saturday open. We'll always keep your Saturday open. You're family now, remember.”\n\n⚠ EVIDENCE ANNOTATION: voice analysis identifies the speaker as male, mid-50s, pitch-shifted in software. There is no Kara Wexler.",
    },
    {
      id: "c8-vm-sittertrust",
      callerLabel: "SitterTrust (automated)",
      timestamp: "2025-12-01T10:00:00",
      durationSec: 18,
      tone: "static",
      transcript:
        "[automated transcript]\n“Hi Maddie! SitterTrust here. The Wexlers rated your recent sit: five stars! Their review says: 'So attentive. She finally checked.' Keep up the great… [remainder unrecoverable]”",
    },
    {
      id: "c8-vm-monitor",
      callerLabel: "1207 Fernway (disconnected line)",
      callerNumber: "(313) 555-0000",
      timestamp: "2025-12-02T03:33:00",
      durationSec: 44,
      tone: "breathing",
      evidenceLabel: "A call from the condemned house's dead landline: children whispering, two days after",
      transcript:
        "[automated transcript — two speakers detected, both juvenile]\n[ocean sounds — matching the StoryTime app's 'Sleepy Shore' track]\nCHILD 1 (whisper): “she checked.”\nCHILD 2 (whisper): “she finally checked.”\nCHILD 1: “will she come back?”\nCHILD 2: [pause] “they always keep the saturday open.”\n[ocean sounds continue]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: landline to 1207 Fernway disconnected 2023. Fire records list no children among the 2023 occupants. No children have ever been registered at this address.",
    },
  ],

  calendarEvents: [
    { id: "c8-cal-wexler", title: "wexlers 7pm 💰", date: "2025-10-18", time: "19:00", recurring: "weekly", createdBy: "owner" },
    { id: "c8-cal-overnight", title: "OVERNIGHT — wexlers (last one!!)", date: "2025-11-29", time: "19:00", createdBy: "owner", evidenceLabel: "The overnight, in her hand: “last one!!”" },
    { id: "c8-cal-calloway", title: "calloway boys (sundays 🌋)", date: "2025-11-02", time: "14:00", recurring: "weekly", createdBy: "owner" },
    { id: "c8-cal-apbio", title: "AP bio test", date: "2025-12-05", time: "09:00", createdBy: "owner" },
    {
      id: "c8-cal-saturday",
      title: "your saturday",
      date: "2025-12-06",
      time: "19:00",
      recurring: "weekly",
      createdBy: "unknown",
      detail: "Created Nov 30, the morning after. No account. It repeats forever.",
      evidenceLabel: "“your saturday” — added to her calendar the morning after she fled, repeating weekly, by no one",
    },
    { id: "c8-cal-movie", title: "movies w/ devon 🌮 (FREE FOREVER)", date: "2025-12-06", time: "18:00", createdBy: "owner", struck: true },
  ],

  locationPins: [
    { id: "c8-pin-home", label: "Home — Larchmont St", timestamp: "2025-11-29T17:30:00", x: 25, y: 30 },
    { id: "c8-pin-school", label: "Eastfield High", timestamp: "2025-11-28T15:00:00", x: 40, y: 22 },
    { id: "c8-pin-calloway", label: "Calloway residence", timestamp: "2025-11-23T14:00:00", x: 48, y: 45 },
    {
      id: "c8-pin-fernway",
      label: "1207 Fernway Ln",
      timestamp: "2025-11-29T18:55:00",
      x: 75,
      y: 70,
      detail: "Arrived 6:55 PM for the overnight. The phone never left. Motion data: normal until 11:48 PM, then ninety seconds of running, then still, face down, by the front door.",
      evidenceLabel: "The overnight: normal until 11:48 PM — then ninety seconds of running",
    },
    {
      id: "c8-pin-buses",
      label: "Route 9 stop — Fernway & Alder",
      timestamp: "2025-11-29T18:40:00",
      x: 68,
      y: 78,
      detail: "She got off the 9 here before every sit. Her locked note routes her escape back to this stop. The 11:58 PM run's farebox logged one youth fare, cash. The driver remembers a girl without a coat who asked him not to announce her stop.",
      evidenceLabel: "The 11:58 PM bus: one youth fare, cash — a girl without a coat",
    },
  ],

  browserHistory: [
    { id: "c8-b-family", query: "wexler family fernway lane", timestamp: "2025-11-08T23:30:00", evidenceLabel: "Her search for the family: no Wexlers, anywhere, ever" },
    { id: "c8-b-fire", query: "1207 fernway lane fire 2023", timestamp: "2025-11-28T21:50:00", evidenceLabel: "The night before: she read about the fire" },
    { id: "c8-b-verify", query: "sittertrust how do families get verified badge", timestamp: "2025-11-21T15:50:00" },
    { id: "c8-b-quiet", query: "is it normal to never hear kids at all during babysitting", timestamp: "2025-11-01T23:00:00" },
    { id: "c8-b-address", query: "can a babysitting app share my home address with families", timestamp: "2025-11-28T22:00:00", evidenceLabel: "“can a babysitting app share my home address with families” — it can. It did." },
    { id: "c8-b-speakers", query: "storytime app what permissions does it need microphone why", timestamp: "2025-11-09T00:15:00" },
    { id: "c8-b-shelter", query: "crossroads youth shelter hours minors no id", timestamp: "2025-11-28T22:20:00", evidenceLabel: "She researched the shelter — the night BEFORE the overnight. She had her exit planned." },
    { id: "c8-b-bus", query: "route 9 last bus saturday night", timestamp: "2025-11-28T22:25:00" },
    { id: "c8-b-disappear", query: "how to stay hidden from someone who knows your address", timestamp: "2025-11-28T22:40:00", evidenceLabel: "Her last search: how to stay hidden from someone who knows your address" },
  ],

  hiddenApp: {
    disguiseIcon: "clock",
    disguiseLabel: "StoryTime",
    revealAfterClueIds: ["c8-th-zoe", "c8-n-sitlog"],
    title: "StoryTime — Console",
    heading: "Signed in as: QUIETMAN",
    body:
      "The bedtime app 'Kara' asked her to install. It plays ocean sounds through the house's speakers. That is the only true thing about it.\n\nIt goes both ways. She knew. She left it logged in on purpose.",
    entries: [
      { label: "1207 Fernway — Living Rm", status: "● LIVE", detail: "archive: 5 sits · 31 hrs" },
      { label: "1207 Fernway — Stairs", status: "● LIVE", detail: "event flagged: 'the drawing' 11/15" },
      { label: "1207 Fernway — Basement", status: "● LIVE", detail: "operator station · do not schedule" },
      { label: "Sitter #4471 — audio", status: "ARCHIVED", detail: "phone mic · 31 hrs · consent: app EULA §22" },
      { label: "Sitter #3306", status: "CONCLUDED 2024", detail: "'the Harmons' · 7 sits" },
      { label: "Sitter #2189", status: "CONCLUDED 2022", detail: "'the Boyds' · 9 sits" },
      { label: "Sitter #4471", status: "INTERRUPTED", detail: "checked the basement · exit: rear · status: OPEN" },
    ],
    footer:
      "Three families. Three names. One operator, one condemned house, one console. Sitters #3306 and #2189 are 'concluded.' Maddie is 'interrupted — status OPEN.' She left the console logged in and running: the folder she promised. It recorded him too.",
    evidenceLabel: "The StoryTime console: operator QUIETMAN, three invented families, two “concluded” sitters — Maddie “INTERRUPTED”",
  },

  liveEvents: [
    {
      id: "c8-live-booking",
      kind: "notification",
      afterSeconds: 320,
      title: "SitterTrust",
      body: "New booking request! THE WEXLERS — Saturday, overnight. Accept?",
      glitch: true,
    },
    {
      id: "c8-live-unknown",
      kind: "message",
      afterSeconds: 600,
      threadId: "c8-th-unknown",
      message: {
        id: "c8-m-un-live",
        from: "them",
        text: "are you the police? her mother? it doesn't matter. the saturday is open. the saturday is always open.",
        timestamp: "2025-12-02T20:40:00",
        evidenceLabel: "To whoever holds the phone: “the saturday is always open.”",
      },
    },
  ],

  verdicts: [
    {
      id: "c8-v-runaway",
      label: "A seventeen-year-old ran away",
      description: "School pressure, a secretive 'family,' cash income her mom never saw. Teenagers leave. Most come back.",
      requiredEvidenceIds: ["c8-m-mo-6", "c8-n-college", "c8-pin-buses"],
      isCanon: false,
      epilogue:
        "You write it as a runaway and the file quietly hates you for it. Runaways take their phones. Runaways take their college fund — hers sits untouched. Runaways don't leave a locked note that begins 'PLAN' and ends with where to look for them.\n\nThe one true thing in this verdict: she did get on a bus, and she did it on her own two feet. But 'ran away' and 'escaped' are different words, and the difference is the man the report declines to go looking for.\n\nThe Wexler account books three more sitters in the spring. SitterTrust approves them all. The green badge glows like a porch light on a dead street.",
    },
    {
      id: "c8-v-escaped",
      label: "There was never a family — and she beat him",
      description: "A predator built the Wexlers out of a condemned house and an app's green badge. Maddie figured it out, planned her exit, and walked out his back door before the trap closed.",
      requiredEvidenceIds: ["case-08.hidden", "c8-n-locked", "c8-ph-basement", "c8-b-shelter", "c8-pin-buses"],
      isCanon: true,
      epilogue:
        "Your report tells it in her own structure, because her structure was better than yours: a plan, numbered. She suspected by sit three, confirmed by sit five, and walked into the overnight with a paper trail, an unlatched storm door, a memorized bus schedule, and a shelter that takes minors, no questions. At 11:48 PM she opened the basement door and saw the monitors. Ninety seconds later she was through the azaleas. The phone — the app's eyes — she left face down on his floor, still recording him.\n\nEight days later, a desk phone at a youth shelter two counties away calls her mother. The first word is 'jacaranda.' The call lasts an hour. Maddie comes home in January, after the arrest — because there is an arrest: the StoryTime console she deliberately left running captured the operator returning, packing the staged furniture, and speaking to the empty twins' room in two practiced voices. A 54-year-old former property inspector who knew which houses stayed empty. Sitters #2189 and #3306 are reopened as cases. One is found. One is not.\n\nWhat the report can't file: the voicemail from the dead landline, two children whispering on a track the app never shipped. The operator's lawyer plays it in court to argue the recordings are unreliable. The judge allows the argument. The jury convicts him anyway — jurors, afterward, all mention the same thing: he never once asked what happened to the girl. He only asked, twice, whether the Saturday booking was still marked open.\n\nMaddie testified from behind a screen. She's going to be a vet. Dogs are worth 80 years.",
    },
    {
      id: "c8-v-app",
      label: "SitterTrust built the trap",
      description: "A 'verified' badge from a vendor whose records vanished, an app that hands out sitters' addresses, a safety team that answers fear with emoji.",
      requiredEvidenceIds: ["c8-m-st-5", "c8-b-address", "c8-m-st-3"],
      isCanon: false,
      epilogue:
        "You write the institutional verdict: the platform sold trust it never manufactured. The 'legacy vendor' that verified the Wexlers in 2021 turns out to be a dissolved LLC that verified 40,000 accounts in eighteen months, sight unseen, for $1.99 each. The green badge is a graphic. It was always a graphic.\n\nSitterTrust settles the class action with badge-design changes and a safety center full of stock photography. Their CEO tells a podcast the Fernway case was 'a powerful learning.' The word 'Maddie' does not appear in the episode.\n\nEverything in this verdict is true. It's just not the whole animal — the badge didn't stage the living room, or print the photos, or practice the voices. The badge only opened the door. Somebody still has to be standing behind it. Your report names the door and lets the man behind it keep his shadow, and that's why, alone at night, you don't reread this one.",
    },
    {
      id: "c8-v-twins",
      label: "Emmy and Jonah are real — somehow",
      description: "A drawing that appeared on stairs no one climbed. Children's voices on a dead line. A review: “she finally checked.”",
      requiredEvidenceIds: ["c8-ph-drawing", "c8-vm-monitor", "c8-ph-mantle"],
      isCanon: false,
      epilogue:
        "You write the verdict no one assigns you: something in that house played the children. Not the operator — his console logs every sound he ever piped through the speakers, and the whispers on the dead landline aren't in them. The drawing isn't in them. He was interrogated about the drawing and asked for a lawyer, and the detective who was in the room says he didn't ask like a guilty man. He asked like a scared one.\n\nFire records list two adult occupants in 2023, no children. County records before the renumbering are water-damaged, which is a sentence you've read in too many files lately.\n\nThe house is demolished in the spring. The lot stays empty. The neighbor across the street — the only occupied house left — puts her porch light on a timer, off at ten, every night, religiously. Asked why, she says the same thing three times, to three different canvassers: 'So nobody thinks it's for them.'\n\nMaddie is home and safe and did everything right. That's the file's official comfort. Unofficially: on her first night back, her mother heard her cross the hall and lock her bedroom door — and from inside, very quietly, say 'goodnight' twice.",
    },
  ],
};

export default c8;
