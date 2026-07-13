import type { CaseFile } from "../types";
import { photoSvg, wall, timestampBurn } from "../photoart";

/**
 * CASE 12 — DOG WALKER
 * Sadie Kwan, 26. Five-star walker on the WagRoute app. Her favorite
 * client was Biscuit, a golden retriever at 44 Beechmont Terrace. The
 * walks were twenty minutes. The app's GPS shows her phone inside the
 * house for hours afterward — and her photos show rooms that are not
 * on the house's floor plan.
 */

const c12: CaseFile = {
  id: "case-12",
  title: "Dog Walker",
  victimName: "Sadie Kwan, 26",
  summary:
    "The dog kept pawing at the hallway wall. The client kept saying 'use only the front hall — the house confuses guests.' The county floor plan shows nine rooms. Her photos show ten. Somewhere between a twenty-minute walk and a house that measures wrong, Sadie Kwan started spending hours inside — and then she stopped existing on the app at all.",
  intake:
    "SUBJECT: Kwan, Sadie R. (26). Reported missing by roommate Dec 18 after failing to return from her 3 PM walk route.\n\nDEVICE: Recovered Dec 17, 23:50, from the porch mail shelf of 44 Beechmont Terrace, screen cracked, placed under the client's doormat weights 'to keep it from blowing away' per the homeowner, G. Hollis, who called it in himself.\n\nPLATFORM: WagRoute records show subject 'resigned' via in-app message Dec 17, 16:20 — typed, per stylometry, unlike any of her 1,400 prior messages. Her walk logs for 44 Beechmont show a pattern: 20-minute walks, followed by stationary interior GPS fixes of 2–4 hours, three times weekly, for six weeks. Hollis states she 'used the bathroom sometimes.'\n\nPROPERTY: 44 Beechmont Terrace, single owner since 1996. County plans (sheet 09, filed 1988) show nine rooms. Exterior elevation shows a window on the northeast face with no corresponding interior room. Homeowner declined interior access; warrant pending.\n\nHOUSEHOLD: G. Hollis, 58, sole occupant since his mother's death in 2011. Her pension has remained active. Flag for financial crimes.\n\nSecond-pass review requested. The dog has been surrendered to county shelter. The dog will not stop facing the house.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "sadie 🐾 — walker, dog aunt, professional good girl sayer",
    recoveredAt: "2025-12-19T20:45:00",
    batteryStart: 31,
    wallpaperHue: 28,
    lockScreenNotifications: [
      { appId: "messages", title: "Nora 🏠", preview: "you're not home and biscuit's house is DARK. calling wagroute. calling everyone", targetId: "c12-th-nora" },
      { appId: "messages", title: "Unknown", preview: "she says thank you for the oranges.", targetId: "c12-th-unknown" },
      { appId: "messages", title: "Garrett Hollis (Biscuit)", preview: "Biscuit was upset after your visit. Dogs remember doors, Miss Kwan.", targetId: "c12-th-hollis" },
    ],
  },

  messages: [
    {
      id: "c12-th-hollis",
      contactName: "Garrett Hollis (Biscuit)",
      contactNumber: "(419) 555-0161",
      messages: [
        { id: "c12-m-ho-1", from: "them", text: "Miss Kwan. Biscuit took to you at the meet-and-greet, which is rare. Three walks weekly, 3 PM sharp. House rules: enter by the front, leash by the coat rack, and please use only the front hall. The house confuses guests.", timestamp: "2025-10-27T09:00:00", evidenceLabel: "House rule from day one: “use only the front hall. The house confuses guests.”" },
        { id: "c12-m-ho-2", from: "owner", text: "no problem at all! front hall only. biscuit and I will be best friends by friday", timestamp: "2025-10-27T09:15:00" },
        { id: "c12-m-ho-3", from: "them", text: "You'll need the door application for entry — HollisHome. I've sent the install. The lock prefers it to keys.", timestamp: "2025-10-27T09:20:00", evidenceLabel: "He required his own door app, “HollisHome,” for entry" },
        { id: "c12-m-ho-4", from: "them", text: "Biscuit scratched the hallway wainscoting again, I see. If he paws at the wall, distract him. It's an old house. It settles, and he's never approved of the settling.", timestamp: "2025-11-07T16:00:00", evidenceLabel: "“If he paws at the wall, distract him.”" },
        { id: "c12-m-ho-5", from: "owner", text: "will do! also — random — I heard a radio? upstairs maybe? wanted to make sure I wasn't leaving one on somehow", timestamp: "2025-11-12T15:40:00", evidenceLabel: "Nov 12: she reported hearing a radio in the empty house" },
        { id: "c12-m-ho-6", from: "them", text: "There is no radio, Miss Kwan. The house carries sound from the street. It's one of its confusions. You walk the dog. The house is my department.", timestamp: "2025-11-12T15:41:00", evidenceLabel: "Answered in sixty seconds: “There is no radio… The house is my department.”" },
        { id: "c12-m-ho-7", from: "them", text: "You stayed forty minutes past the walk on Tuesday. The lock keeps a diary, Miss Kwan. I don't mind — Biscuit enjoys the company. But stay where Biscuit stays.", timestamp: "2025-11-21T18:00:00", evidenceLabel: "“The lock keeps a diary… stay where Biscuit stays.”" },
        { id: "c12-m-ho-8", from: "owner", text: "sorry!! he wanted extra fetch and then flopped on my feet. hostage situation, very cozy. won't run long again", timestamp: "2025-11-21T18:10:00" },
        { id: "c12-m-ho-9", from: "them", text: "Biscuit was upset after your visit. Dogs remember doors, Miss Kwan.", timestamp: "2025-12-16T19:00:00", evidenceLabel: "Dec 16, the night before: “Dogs remember doors, Miss Kwan.”" },
      ],
    },
    {
      id: "c12-th-nora",
      contactName: "Nora 🏠",
      contactNumber: "(419) 555-0138",
      ghostTypingAfterSeconds: 390,
      messages: [
        { id: "c12-m-no-1", from: "them", text: "bring home milk if you pass the good bodega. also a photo of biscuit. priorities in that order reversed", timestamp: "2025-11-05T14:30:00" },
        { id: "c12-m-no-2", from: "owner", text: "nora. weird one. biscuit's house has a window on the OUTSIDE that I can't find on the INSIDE. I walked the upstairs hall counting doors while he peed forever against a hedge. the window should be at the end of the hall. the hall ends in wall", timestamp: "2025-11-14T16:10:00", evidenceLabel: "Nov 14: a window outside with no room inside" },
        { id: "c12-m-no-3", from: "them", text: "old houses are weird?? closets get sealed?? (why were you counting doors sadie)", timestamp: "2025-11-14T16:15:00" },
        { id: "c12-m-no-4", from: "owner", text: "because biscuit sits at that wall. every single walk, before and after. he sits, he paws once, and he looks at me. nora he's not being a weird dog. he's being a CORRECT dog. dogs sit like that at doors", timestamp: "2025-11-14T16:22:00", evidenceLabel: "“he's being a CORRECT dog. dogs sit like that at doors.”" },
        { id: "c12-m-no-5", from: "them", text: "sadie I love you. walk the dog. cash the checks. do not renovate the man's house with your eyes", timestamp: "2025-11-14T16:25:00" },
        { id: "c12-m-no-6", from: "owner", text: "…nora. update I can't say out loud. someone answered the wall today. biscuit pawed and something pawed BACK. gentle. three times. I have to figure out what to do and you have to not tell anyone yet. promise me. it's not what it sounds like. or it's exactly what it sounds like. I need a week", timestamp: "2025-12-01T17:45:00", evidenceLabel: "Dec 1: “something pawed BACK. gentle. three times.”" },
        { id: "c12-m-no-7", from: "them", text: "SADIE.", timestamp: "2025-12-01T17:46:00" },
        { id: "c12-m-no-8", from: "them", text: "you're not home and biscuit's house is DARK. calling wagroute. calling everyone", timestamp: "2025-12-17T21:30:00" },
      ],
    },
    {
      id: "c12-th-wagroute",
      contactName: "WagRoute",
      messages: [
        { id: "c12-m-wr-1", from: "them", text: "WagRoute: You're a TOP WALKER! 🐾 127 five-star walks. Clients say: 'treats every dog like family.'", timestamp: "2025-11-01T12:00:00" },
        { id: "c12-m-wr-2", from: "owner", text: "Question: can I see previous walkers' notes for a client? 44 Beechmont Terrace. Want to check the dog's history.", timestamp: "2025-11-16T10:00:00" },
        { id: "c12-m-wr-3", from: "them", text: "WagRoute: For privacy, walker notes aren't shared! FYI this client has had 6 walkers this year — you're doing great sticking with it! Some dogs are a journey! 🐾", timestamp: "2025-11-16T10:05:00", evidenceLabel: "Six walkers in one year at 44 Beechmont — WagRoute called it “a journey”" },
        { id: "c12-m-wr-4", from: "owner", text: "Six?? Can you tell me why the others stopped?", timestamp: "2025-11-16T10:08:00" },
        { id: "c12-m-wr-5", from: "them", text: "WagRoute: Walkers come and go! One noted the client was 'particular about the hallway' — that's all we can share. Keep being awesome! 🐾", timestamp: "2025-11-16T10:10:00", evidenceLabel: "The only note WagRoute would share: “particular about the hallway”" },
        { id: "c12-m-wr-6", from: "them", text: "WagRoute: We've received your resignation. We're sorry to see you go, Sadie! Final payout processing. 🐾", timestamp: "2025-12-17T16:21:00", evidenceLabel: "Her “resignation,” Dec 17, 4:21 PM — typed like a stranger, per stylometry" },
      ],
    },
    {
      id: "c12-th-okabe",
      contactName: "Mrs. Okabe (Mochi)",
      contactNumber: "(419) 555-0126",
      messages: [
        { id: "c12-m-ok-1", from: "them", text: "Mochi has once again eaten a sock. He is fine. He is always fine. The socks are never fine. See you Tuesday, dear.", timestamp: "2025-12-09T18:00:00" },
        { id: "c12-m-ok-2", from: "owner", text: "mochi is an agent of chaos and I would take a bullet for him. tuesday!", timestamp: "2025-12-09T18:10:00" },
        { id: "c12-m-ok-3", from: "them", text: "You seemed tired Tuesday, Sadie. And you asked me odd questions about my neighbor's mother. I knew Adelaide Hollis, dear. Lovely woman. Terrible son. Why do you ask after a woman fourteen years dead?", timestamp: "2025-12-11T17:00:00", evidenceLabel: "Mrs. Okabe: “Why do you ask after a woman fourteen years dead?”" },
        { id: "c12-m-ok-4", from: "owner", text: "mrs okabe — one more odd question and then I'll explain everything soon, promise. did adelaide like oranges?", timestamp: "2025-12-11T17:15:00", evidenceLabel: "Her question: “did adelaide like oranges?”" },
        { id: "c12-m-ok-5", from: "them", text: "She grew them in pots in that northeast room, the one with the good morning light. How on earth did you know that, dear?", timestamp: "2025-12-11T17:20:00", evidenceLabel: "Mrs. Okabe: Adelaide grew oranges “in that northeast room” — the room that isn't on the plan" },
      ],
    },
    {
      id: "c12-th-jules",
      contactName: "Jules 💛",
      contactNumber: "(419) 555-0187",
      messages: [
        { id: "c12-m-ju-1", from: "them", text: "birthday dinner friday!! I booked the place with the tiny desserts you make fun of and secretly love", timestamp: "2025-12-10T13:00:00" },
        { id: "c12-m-ju-2", from: "owner", text: "I love YOU and I tolerate the desserts. friday 💛 fair warning I might be weird and distracted, work thing. big work thing. good big. I think I'm about to do the best thing I've ever done", timestamp: "2025-12-10T13:20:00", evidenceLabel: "“I think I'm about to do the best thing I've ever done”" },
        { id: "c12-m-ju-3", from: "them", text: "cryptic!! proud of you for whatever it is. friday", timestamp: "2025-12-10T13:22:00" },
        { id: "c12-m-ju-4", from: "them", text: "sadie it's friday", timestamp: "2025-12-19T19:30:00" },
      ],
    },
    {
      id: "c12-th-mom",
      contactName: "Mom",
      contactNumber: "(419) 555-0109",
      messages: [
        { id: "c12-m-mo-1", from: "them", text: "Grandma's recipe box came to you? The movers mislabeled it. Keep the almond cookie card and mail the rest, thief.", timestamp: "2025-11-28T11:00:00" },
        { id: "c12-m-mo-2", from: "owner", text: "the almond card was always mine, this is a formality. love you. hey mom — weird question. if you knew something that would blow up a family, but saying nothing hurts someone every single day, what's the rule?", timestamp: "2025-11-28T11:30:00", evidenceLabel: "To her mom: “saying nothing hurts someone every single day — what's the rule?”" },
        { id: "c12-m-mo-3", from: "them", text: "The rule is the person being hurt gets to decide, if they can. And if they can't, you decide like you'll have to say it to their face one day. Why? Sadie? WHY?", timestamp: "2025-11-28T11:45:00", evidenceLabel: "Her mother's rule: “the person being hurt gets to decide, if they can”" },
      ],
    },
    {
      id: "c12-th-hardware",
      contactName: "Beechmont Hardware",
      messages: [
        { id: "c12-m-hw-1", from: "them", text: "BEECHMONT HARDWARE: Your order is ready — 1x stud finder, 1x pry bar (small), 1x LED puck lights 3pk.", timestamp: "2025-12-04T10:00:00", evidenceLabel: "Dec 4: a stud finder, a small pry bar, puck lights" },
        { id: "c12-m-hw-2", from: "owner", text: "thanks! quick q — do you carry door hinges that don't squeak? asking for a very old door", timestamp: "2025-12-04T10:15:00", evidenceLabel: "“hinges that don't squeak… for a very old door”" },
      ],
    },
    {
      id: "c12-th-library",
      contactName: "County Records Office",
      messages: [
        { id: "c12-m-li-1", from: "them", text: "RECORDS: Your requested copies are ready — 44 Beechmont Terrace, plan sheet 09 (1988), and elevation sheet 09-E. $4.50 at pickup.", timestamp: "2025-11-19T14:00:00", evidenceLabel: "She pulled the county plans: sheet 09 and the elevation" },
        { id: "c12-m-li-2", from: "them", text: "RECORDS: Also located per your request — obituary, Adelaide R. Hollis, 2011. Note: our clerk flagged that no burial plot is registered countywide under that name. Unusual, not unheard of.", timestamp: "2025-11-26T15:00:00", evidenceLabel: "The clerk's flag: Adelaide Hollis, obituary 2011 — no burial plot registered anywhere in the county" },
      ],
    },
    {
      id: "c12-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c12-m-un-1",
          from: "them",
          text: "she says thank you for the oranges.",
          timestamp: "2025-12-15T22:40:00",
          evidenceLabel: "Dec 15, from a number with no records: “she says thank you for the oranges.”",
        },
        { id: "c12-m-un-2", from: "owner", text: "who is this? is she okay? is this the neighbor? PLEASE", timestamp: "2025-12-15T22:45:00" },
        { id: "c12-m-un-3", from: "them", text: "she practices the numbers every night like you showed her. she wanted you to know she's fast now.", timestamp: "2025-12-15T22:47:00", evidenceLabel: "“she practices the numbers every night like you showed her. she's fast now.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c12-ph-biscuit",
      caption: "BISCUIT. eleven out of ten. would take a bullet, would take several",
      timestamp: "2025-10-29T15:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-29T15:20:00", device: "This phone", location: "44 Beechmont Terr" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1d1914"/>` +
          `<ellipse cx="150" cy="270" rx="95" ry="70" fill="#8a6b3a"/>` +
          `<circle cx="150" cy="160" r="60" fill="#9a7a44"/>` +
          `<ellipse cx="108" cy="120" rx="18" ry="30" fill="#7a5c30" transform="rotate(-20 108 120)"/>` +
          `<ellipse cx="192" cy="120" rx="18" ry="30" fill="#7a5c30" transform="rotate(20 192 120)"/>` +
          `<circle cx="130" cy="150" r="7" fill="#1a1410"/><circle cx="170" cy="150" r="7" fill="#1a1410"/>` +
          `<ellipse cx="150" cy="180" rx="12" ry="8" fill="#2a2018"/>` +
          `<path d="M135 195 Q150 208 165 195" stroke="#2a2018" stroke-width="3" fill="none"/>`,
        { aspect: "portrait", base: "#151210", grain: 0.1 },
      ),
    },
    {
      id: "c12-ph-wallsit",
      caption: "every walk. before AND after. he sits exactly here, paws once, and looks at me like I'm slow. buddy I'm starting to agree",
      timestamp: "2025-11-13T15:35:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-13T15:35:00", device: "This phone", location: "44 Beechmont — hallway" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#241f18") +
          `<rect x="0" y="280" width="300" height="20" fill="#3a2f20"/>` +
          `<rect x="0" y="300" width="300" height="100" fill="#1a1610"/>` +
          `<ellipse cx="150" cy="330" rx="55" ry="40" fill="#8a6b3a"/>` +
          `<circle cx="150" cy="270" r="34" fill="#9a7a44"/>` +
          `<path d="M120 240 q-14 -20 -4 -34 M180 240 q14 -20 4 -34" stroke="#7a5c30" stroke-width="10" fill="none"/>` +
          Array.from({ length: 5 }, (_, i) => `<path d="M${95 + i * 6} ${288 - (i % 2) * 3} v8" stroke="#141008" stroke-width="1.5"/>`).join(""),
        { aspect: "portrait", base: "#181510", grain: 0.12 },
      ),
      evidenceLabel: "Biscuit at the hallway wall — the sit of a dog at a door",
    },
    {
      id: "c12-ph-scratches",
      caption: "the baseboard where he paws. those aren't all biscuit. the low ones are old and they're on BOTH SIDES of the paint",
      timestamp: "2025-11-20T15:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-20T15:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#241f18"/>` +
          `<rect y="180" width="400" height="40" fill="#3a2f20"/>` +
          `<rect y="220" width="400" height="80" fill="#1a1610"/>` +
          Array.from({ length: 9 }, (_, i) => `<path d="M${60 + i * 32} ${186 + (i % 3) * 6} v${14 + (i % 2) * 8}" stroke="#120e08" stroke-width="2"/>`).join("") +
          `<path d="M330 175 v-40 M345 178 v-46" stroke="#141008" stroke-width="1.5" opacity="0.7"/>`,
        { aspect: "landscape", base: "#171410", grain: 0.13 },
      ),
      evidenceLabel: "Scratches at the baseboard — “on both sides of the paint”",
    },
    {
      id: "c12-ph-window-out",
      caption: "northeast corner from the yard. count with me: window. now go inside and find its room. you can't. I've tried eleven times",
      timestamp: "2025-11-14T15:50:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-14T15:50:00", device: "This phone", location: "44 Beechmont — yard" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#12151a"/>` +
          `<rect x="40" y="80" width="220" height="320" fill="#2a241c"/>` +
          `<path d="M30 80 L150 30 L270 80Z" fill="#1d1812"/>` +
          `<rect x="80" y="140" width="50" height="60" fill="#161a20"/>` +
          `<rect x="180" y="140" width="50" height="60" fill="#161a20"/>` +
          `<rect x="180" y="250" width="50" height="60" fill="#0e1116"/>` +
          `<rect x="180" y="250" width="50" height="60" fill="none" stroke="#3a3226" stroke-width="3"/>` +
          `<circle cx="205" cy="280" r="26" fill="#c8a84a" opacity="0.08"/>` +
          `<text x="150" y="380" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a4436">☝ this one. this window. the hall ends before it begins</text>`,
        { aspect: "portrait", base: "#0e1014", grain: 0.12 },
      ),
      evidenceLabel: "The northeast window — visible outside, unreachable inside",
    },
    {
      id: "c12-ph-floorplan",
      caption: "",
      timestamp: "2025-11-19T16:30:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-19T16:30:00", device: "This phone (photo of county copy)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#14120e"/>` +
          `<rect x="40" y="50" width="220" height="300" fill="#cfc7b2" opacity="0.9"/>` +
          `<text x="150" y="80" text-anchor="middle" font-family="monospace" font-size="9" fill="#3a3427">44 BEECHMONT — SHEET 09 (1988)</text>` +
          `<rect x="60" y="100" width="180" height="220" fill="none" stroke="#55503f" stroke-width="2"/>` +
          `<path d="M60 180 h110 M170 100 v120 M60 250 h180 M130 250 v70" stroke="#55503f" stroke-width="1.5"/>` +
          `<rect x="170" y="100" width="70" height="80" fill="#c4bca8"/>` +
          `<text x="205" y="145" text-anchor="middle" font-family="monospace" font-size="7" fill="#7a3a42">(no room drawn.</text>` +
          `<text x="205" y="156" text-anchor="middle" font-family="monospace" font-size="7" fill="#7a3a42">hatched: 'chase')</text>` +
          `<text x="150" y="340" text-anchor="middle" font-family="monospace" font-size="7" fill="#55503f">northeast corner: 11 ft of 'mechanical chase.' for a 1920s house. with no ducts.</text>`,
        { aspect: "portrait", base: "#0f0d0a", grain: 0.1 },
      ),
      evidenceLabel: "Deleted photo of sheet 09: the northeast corner drawn as an 11-foot “mechanical chase” — in a house with no ducts",
    },
    {
      id: "c12-ph-gap",
      caption: "",
      timestamp: "2025-11-30T16:05:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-30T16:05:00", device: "This phone", location: "44 Beechmont — hallway" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0d0b08"/>` +
          `<rect x="130" y="0" width="14" height="400" fill="#1a1610"/>` +
          `<rect x="134" y="0" width="6" height="400" fill="#3d3020" opacity="0.5"/>` +
          `<rect x="150" y="60" width="150" height="340" fill="#241f18" opacity="0.3"/>` +
          `<rect x="160" y="100" width="90" height="110" fill="#4a4030" opacity="0.25"/>` +
          `<ellipse cx="205" cy="260" rx="40" ry="12" fill="#3a3226" opacity="0.3"/>` +
          `<text x="150" y="380" text-anchor="middle" font-family="monospace" font-size="8" fill="#4a4436">through the seam: wallpaper. little oranges on it. a meal tray. a made bed.</text>`,
        { aspect: "portrait", base: "#0a0806", grain: 0.16 },
      ),
      evidenceLabel: "Through the wall seam: orange-print wallpaper, a meal tray, a made bed",
    },
    {
      id: "c12-ph-tally",
      caption: "",
      timestamp: "2025-12-08T16:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-08T16:20:00", device: "This phone", location: "44 Beechmont — annex" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#070605"/>`,
        { aspect: "landscape", base: "#060504", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#141008"/>` +
            Array.from({ length: 60 }, (_, i) => `<path d="M${30 + (i % 15) * 24} ${50 + Math.floor(i / 15) * 46} v22 ${i % 5 === 4 ? `M${26 + (i % 15) * 24} ${50 + Math.floor(i / 15) * 46} l16 22` : ""}" stroke="#3d3020" stroke-width="2"/>`).join("") +
            `<path d="M300 240 q10 -14 24 -10 q14 4 12 18 q-2 12 -16 12 q-16 0 -20 -20z" fill="#2a2014" opacity="0.9"/>` +
            `<path d="M340 244 q8 -11 19 -8 q11 3 10 14 q-2 10 -13 10 q-13 0 -16 -16z" fill="#57422a" opacity="0.9"/>` +
            `<text x="200" y="288" text-anchor="middle" font-family="monospace" font-size="8" fill="#5c5342">tally marks. YEARS of them. and two handprints — one dust-old. one from this week.</text>` +
            timestampBurn("16:20:11", 400, 300),
          { aspect: "landscape", base: "#0f0c07", grain: 0.13 },
        ),
      },
      evidenceLabel: "Inside the annex wall: years of tally marks — and two handprints, one old, one fresh",
    },
    {
      id: "c12-ph-oranges",
      caption: "bodega run. don't ask why a dog walker needs this many oranges. (the answer is good. the answer is the best answer I've ever had)",
      timestamp: "2025-12-05T14:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-12-05T14:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#171310"/>` +
          `<rect x="60" y="220" width="180" height="130" rx="10" fill="#2a2014"/>` +
          Array.from({ length: 9 }, (_, i) => `<circle cx="${95 + (i % 3) * 55}" cy="${250 + Math.floor(i / 3) * 34}" r="20" fill="#b8681f"/><circle cx="${88 + (i % 3) * 55}" cy="${243 + Math.floor(i / 3) * 34}" r="6" fill="#d8863a" opacity="0.6"/>`).join(""),
        { aspect: "portrait", base: "#110e0a", grain: 0.1 },
      ),
      evidenceLabel: "Nine oranges — “the answer is the best answer I've ever had”",
    },
    {
      id: "c12-ph-mochi",
      caption: "mochi post-sock, unrepentant. mrs okabe says he has 'the digestion of a cement mixer and the conscience of a senator'",
      timestamp: "2025-12-09T15:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-09T15:10:00", device: "This phone", location: "Okabe residence" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1c1814"/>` +
          `<ellipse cx="200" cy="220" rx="90" ry="50" fill="#c9a05a"/>` +
          `<circle cx="200" cy="150" r="45" fill="#d8b06a"/>` +
          `<path d="M165 115 l-8 -26 22 14z M235 115 l8 -26 -22 14z" fill="#b8905a"/>` +
          `<circle cx="185" cy="145" r="6" fill="#1a1410"/><circle cx="215" cy="145" r="6" fill="#1a1410"/>` +
          `<ellipse cx="200" cy="168" rx="9" ry="6" fill="#2a2018"/>`,
        { aspect: "landscape", base: "#141110", grain: 0.1 },
      ),
    },
    {
      id: "c12-ph-doorcode",
      caption: "",
      timestamp: "2025-12-14T16:45:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-14T16:45:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#100e0b"/>` +
          `<rect x="70" y="80" width="160" height="240" fill="#cfc7b2" opacity="0.88" transform="rotate(-2 150 200)"/>` +
          `<text x="150" y="130" text-anchor="middle" font-family="serif" font-size="12" fill="#2a2620">for A. —</text>` +
          `<text x="150" y="170" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3427">front door: hold ◉ then</text>` +
          `<text x="150" y="195" text-anchor="middle" font-family="serif" font-size="16" fill="#7a3a42">2 — 6 — 2 — 6</text>` +
          `<text x="150" y="240" text-anchor="middle" font-family="serif" font-size="10" fill="#3a3427">practice till it's fast.</text>` +
          `<text x="150" y="262" text-anchor="middle" font-family="serif" font-size="10" fill="#3a3427">porch. gate. LEFT at the sidewalk.</text>` +
          `<text x="150" y="284" text-anchor="middle" font-family="serif" font-size="10" fill="#3a3427">blue house = okabe = safe.</text>`,
        { aspect: "portrait", base: "#0c0a08", grain: 0.11 },
      ),
      evidenceLabel: "Deleted photo of a handwritten card “for A.”: the door code, and the route to the blue house",
    },
  ],

  notes: [
    {
      id: "c12-n-walklog",
      title: "beechmont log (the real one)",
      timestamp: "2025-12-14T22:00:00",
      evidenceLabel: "Her real log of 44 Beechmont — six weeks from dog walks to a rescue",
      body:
        "wagroute gets 'walked biscuit, good boy, 20 min.' this note gets the truth.\n\nnov 12 — the radio again. big band music, then it stopped MID-SONG when I called out. radios don't get embarrassed. people do.\n\nnov 14 — window outside, no room inside. hollis says the house 'confuses guests.' the house is the only honest one here.\n\nnov 19 — pulled the county plans. sheet 09. northeast corner is a 'mechanical chase,' 11 feet wide. chases are for ducts. this house has radiators.\n\nnov 26 — adelaide hollis. obit 2011, no plot anywhere in the county. pension still active per the mail I should not have read on the hall table (window envelope, I didn't open anything, I just READ, that's barely a crime).\n\nnov 30 — I found the seam behind the coat rack. saw through it. wallpaper with little oranges. a tray. a MADE BED. someone lives in the chase, and someone changes those sheets.\n\ndec 1 — biscuit pawed. and it pawed back. three times. gentle. I sat down on the floor and biscuit put his head in my lap like: finally. FINALLY she gets it. this is what I've been SAYING.\n\ndec 2 — talked through the wall in a whisper. she's real. she's ADELAIDE. she's been in there since 'the funeral.' he's not violent with her, she says — worse, he's SCHEDULED with her. fed at biscuit's times. walked in the yard at night twice a month, blindfolded, 'for her eyes.' fourteen years. she asked if the orange trees on the porch survived. there are no orange trees. there is no porch furniture. there is nothing left of her out here except a dog who remembers doors.\n\ndec 5+ — oranges through the seam, one at a time. taught her the door app pattern through the wall (she can hear the beeps from inside — the lock beeps the code EVERY TIME HE ENTERS. fourteen years of hearing freedom in four beeps and never knowing the tune had words).\n\nplan is in the locked note. code: the house, then the sheet that proves it.\n\nmom's rule: the person being hurt gets to decide. she decided. she said the word through the wall and the word was OUT.",
    },
    {
      id: "c12-n-locked",
      title: "the plan (locked, obviously)",
      timestamp: "2025-12-15T23:30:00",
      lock: {
        code: "4409",
        hintText: "“the house, then the sheet that proves it.” — the address on the gate, the plan in the county file.",
        clueSourceIds: ["c12-ph-floorplan", "c12-n-walklog"],
      },
      evidenceLabel: "The locked note: the extraction plan, hour by hour",
      body:
        "WEDNESDAY DEC 17. hollis has his rotary club lunch 12-2 (every third wednesday, confirmed twice). walk is 3pm. that's my legal reason to be inside.\n\n12:15 — enter with the app like normal. biscuit gets a chew (sorry buddy, you're the distraction today, you've earned a career change).\n12:20 — coat rack moved. seam + pry bar. hinges oiled LAST week (did it during thursday's walk — the panel is a DOOR, it was always a door, it has hinges on her side. think about that. don't think about that.)\n12:30 — she walks out. fourteen years, eleven feet. I gave her my gray coat and nora's old boots (nora I'll explain).\n12:40 — NOT my car (he knows my car). taxi from the corner, prepaid, to the women's center on fullerton. they know she's coming — 'an elderly fraud victim.' true enough to start.\n1:00 — I put the panel back. I finish the walk at 3 like nothing. thursday I 'quit' wagroute slowly and normally.\nthen: the center's advocate calls financial crimes about the pension. paper does the rest. paper is slower than a pry bar but paper can't be pushed back through a wall.\n\ncontingency, because nora's voice is in my head: if he comes home early, I am a dog walker who heard a noise and found a hidden door, full stop. adelaide hides on the porch. the CARD (photo in my deleted folder — deleted in case he ever grabs my phone, recoverable because I'm not an amateur) has the code and the route to okabe's. she practices the numbers every night. she's fast now.\n\nif this goes wrong in the specific way I won't type: everything above is true, sheet 09 is at county records under my name, and the pension trail is fourteen years long. you don't need me. you just need the paper. and somebody feed biscuit — he did all the actual detective work.",
    },
    {
      id: "c12-n-clients",
      title: "pack roster 🐾",
      timestamp: "2025-11-01T12:00:00",
      body: "biscuit (golden, 44 beechmont) — M/W/F 3pm. front hall only per client. best boy. SITTER at walls, see log\nmochi (corgi, okabe) — T/Th 3pm. sock goblin. beloved\npepper + salt (schnauzers, delgado) — sat 10am. synchronized barking, no notes\ngus (mutt, ferris) — sun 9am. afraid of one specific mailbox. respect it",
    },
    {
      id: "c12-n-almond",
      title: "grandma's almond cookies (MINE, mom)",
      timestamp: "2025-11-28T12:00:00",
      body: "1 cup butter, actually cold\nalmond flour + regular, half half\nthe secret: orange zest. she never wrote it on the card. she TOLD me, which means it's mine.\n\n(adelaide, when you're out: I'm making you these. the zest is the point. everything good has a secret ingredient and it's usually citrus.)",
    },
  ],

  voicemails: [
    {
      id: "c12-vm-nora",
      callerLabel: "Nora 🏠",
      callerNumber: "(419) 555-0138",
      timestamp: "2025-12-17T22:00:00",
      durationSec: 28,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Sadie Kwan. Your dinner is in the fridge, your boots are gone — MY boots are gone, which means the coat thing happened, which means TODAY was the day and you didn't TELL me it was today. I'm at the corner of Beechmont and the house is dark and there's a man watching me water his neighbor's dead plants, which is my cover, which is bad, I know. Call me. CALL ME.”",
    },
    {
      id: "c12-vm-mom",
      callerLabel: "Mom",
      callerNumber: "(419) 555-0109",
      timestamp: "2025-12-18T09:30:00",
      durationSec: 24,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Baby. Nora called me. I told you to decide like you'd have to say it to their face one day, and I know you, and I know you decided the brave way, and I am so proud and so furious and I am in the car. Whoever's face this is getting said to — I'm coming to stand next to you while you say it.”",
    },
    {
      id: "c12-vm-hollis",
      callerLabel: "Garrett Hollis (Biscuit)",
      callerNumber: "(419) 555-0161",
      timestamp: "2025-12-17T15:45:00",
      durationSec: 32,
      tone: "distorted",
      evidenceLabel: "Hollis at 3:45 PM — forty-five minutes after the walk should have started",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Miss Kwan. You didn't come for the walk. That's a first, and I find I mind it more than I expected. The house is very quiet today. Quieter than it's been in — well. In some time. You'd almost think it was empty. [pause] The coat rack is crooked, Miss Kwan. I notice things too. That was always the arrangement in this house — everyone in their room, everyone noticing. Do call back. Biscuit is sitting at the wall, and there's no one left to paw back, and I don't know what to tell him.”",
    },
    {
      id: "c12-vm-wagroute",
      callerLabel: "WagRoute (automated)",
      timestamp: "2025-12-18T12:00:00",
      durationSec: 17,
      tone: "static",
      transcript:
        "[automated transcript]\n“Hi Sadie! WagRoute here. Your resignation is processed and your final payout of $412.50 is on the way. Your clients will miss you! One client left a farewell note: 'She was very thorough.' Thanks for walking with… [remainder unrecoverable]”",
    },
    {
      id: "c12-vm-lullaby",
      callerLabel: "44 Beechmont (landline)",
      callerNumber: "(419) 555-0002",
      timestamp: "2025-12-19T03:00:00",
      durationSec: 58,
      tone: "breathing",
      evidenceLabel: "From the Hollis landline: a woman singing — carrier logs date the call 1962",
      transcript:
        "[automated transcript — one speaker, elderly female]\n[a rotary dial, winding and releasing, seven times]\n[a woman's voice, singing — unhurried, in the manner of someone singing to a child or a plant:]\n“…and the moon saw the orchard, and the orchard saw me…”\n[the song continues, 40 seconds. she is not sad. that is the part every reviewer remarks on. she is not sad at all.]\n[a dog, one soft woof, close by]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: the Hollis landline was disconnected for non-payment on Dec 18. Carrier metadata dates this call's origination timestamp as June 1962 — a 'clock epoch fault,' per the carrier, who could not explain why the fault ran backward or why the line's 1962 subscriber of record, R. Hollis, had noted in his service file: 'wife sings on the line, charge us for it if you must.'",
    },
  ],

  calendarEvents: [
    { id: "c12-cal-biscuit", title: "biscuit 🐕 3pm", date: "2025-10-29", time: "15:00", recurring: "weekly", createdBy: "owner" },
    { id: "c12-cal-mochi", title: "mochi 🌭 3pm", date: "2025-10-28", time: "15:00", recurring: "weekly", createdBy: "owner" },
    { id: "c12-cal-oranges", title: "oranges 🍊 (don't forget)", date: "2025-12-05", time: "14:00", recurring: "weekly", createdBy: "owner", evidenceLabel: "A weekly reminder: “oranges 🍊 (don't forget)”" },
    { id: "c12-cal-wednesday", title: "WEDNESDAY. rotary 12-2. walk 3.", date: "2025-12-17", time: "12:00", createdBy: "owner", evidenceLabel: "Dec 17, in her hand: “WEDNESDAY. rotary 12-2. walk 3.”" },
    { id: "c12-cal-jules", title: "jules bday — tiny desserts 💛", date: "2025-12-19", time: "19:00", createdBy: "owner", struck: true, evidenceLabel: "Jules's birthday dinner — struck through by no one who admits to it" },
    {
      id: "c12-cal-review",
      title: "guest access review",
      date: "2025-12-16",
      time: "23:00",
      createdBy: "external",
      detail: "Created by 'HollisHome' the night before. The app does not create calendar events. The app has never created a calendar event.",
      evidenceLabel: "“guest access review” — added by the door app the night before, a feature it doesn't have",
    },
  ],

  locationPins: [
    { id: "c12-pin-home", label: "Home — Cortland Ave apt 2", timestamp: "2025-12-16T22:00:00", x: 20, y: 30 },
    { id: "c12-pin-okabe", label: "Okabe residence (Mochi)", timestamp: "2025-12-16T15:00:00", x: 40, y: 40 },
    { id: "c12-pin-hardware", label: "Beechmont Hardware", timestamp: "2025-12-04T10:30:00", x: 55, y: 55 },
    { id: "c12-pin-records", label: "County Records Office", timestamp: "2025-11-19T16:00:00", x: 30, y: 65 },
    {
      id: "c12-pin-beechmont",
      label: "44 Beechmont Terr — Dec 17",
      timestamp: "2025-12-17T12:14:00",
      x: 70,
      y: 45,
      detail: "Entered 12:14 PM — on schedule with her plan. Interior fixes show the front hall, then the northeast corner at 12:26. At 12:41, a fix at the corner TAXI STAND, forty seconds long. Then back inside the house at 12:44. She went back in.",
      evidenceLabel: "12:41 PM: she reached the taxi stand — then went back inside at 12:44",
    },
    {
      id: "c12-pin-last",
      label: "44 Beechmont — final fix",
      timestamp: "2025-12-17T16:19:00",
      x: 70,
      y: 44,
      detail: "Final fix, 4:19 PM: interior, northeast corner — inside the eleven feet the floor plan calls a chase. One minute later, her WagRoute resignation was typed. The phone was found on the porch that night, under the doormat weights, 'to keep it from blowing away.'",
      evidenceLabel: "Final fix, 4:19 PM: inside the space the plans call a chase",
    },
  ],

  browserHistory: [
    { id: "c12-b-plan", query: "44 beechmont terrace floor plan county records how to request", timestamp: "2025-11-17T21:00:00", evidenceLabel: "She researched how to pull the county plans for his house" },
    { id: "c12-b-window", query: "house has window outside but no room inside old houses", timestamp: "2025-11-14T20:30:00", evidenceLabel: "“house has window outside but no room inside”" },
    { id: "c12-b-adelaide", query: "adelaide hollis obituary 2011", timestamp: "2025-11-24T22:00:00" },
    { id: "c12-b-pension", query: "pension keeps paying after death who checks", timestamp: "2025-11-26T21:15:00", evidenceLabel: "“pension keeps paying after death who checks”" },
    { id: "c12-b-report", query: "report elder abuse anonymously without proof what happens", timestamp: "2025-12-02T23:40:00", evidenceLabel: "Dec 2: “report elder abuse anonymously without proof what happens”" },
    { id: "c12-b-welfare", query: "police welfare check can it make things worse for captive person", timestamp: "2025-12-02T23:55:00", evidenceLabel: "Why she didn't call 911: “can a welfare check make things worse for a captive person”" },
    { id: "c12-b-studfinder", query: "stud finder find hollow space behind wall", timestamp: "2025-12-03T20:00:00" },
    { id: "c12-b-shelter", query: "fullerton women's center intake elderly fraud victim", timestamp: "2025-12-12T21:30:00", evidenceLabel: "She arranged intake at the women's center — “elderly fraud victim”" },
    { id: "c12-b-last", query: "how long does a rotary club lunch last", timestamp: "2025-12-16T23:20:00", evidenceLabel: "Her last search: “how long does a rotary club lunch last”" },
  ],

  hiddenApp: {
    disguiseIcon: "clock",
    disguiseLabel: "HollisHome",
    revealAfterClueIds: ["c12-th-hollis", "c12-n-walklog"],
    title: "HollisHome — Owner Console",
    heading: "44 Beechmont Terrace · household schedule",
    body:
      "The door app he required her to install. Guest mode shows a lock button. Owner mode — which pushed itself to her phone at 4:20 PM on Dec 17, the minute after her last fix — shows the household.\n\nThe house has run on this schedule for fourteen years.",
    entries: [
      { label: "FRONT DOOR", status: "GUEST REVOKED 12/17", detail: "S. KWAN · access 10/27–12/17 · 41 entries" },
      { label: "BISCUIT — meals", status: "07:00 / 15:30 / 21:00", detail: "walker: vacant (posting)" },
      { label: "ANNEX — meals", status: "07:10 / 15:40 / 21:10", detail: "occupant: MOTHER · tray service · 14 yrs" },
      { label: "ANNEX — yard time", status: "1st + 3rd SAT, 02:00", detail: "20 min · weather permitting · eyes covered" },
      { label: "ANNEX — door", status: "OPENED 12/17 12:29", detail: "first exterior-side opening since install" },
      { label: "ANNEX — occupancy", status: "0 (ZERO)", detail: "since 12/17 12:31 · schedule suspended" },
      { label: "GUEST — S. KWAN", status: "INTERIOR 12:44–16:19", detail: "re-entry logged · exit: NOT LOGGED" },
    ],
    footer:
      "The console confirms the plan worked: the annex opened at 12:29 and its occupancy has read zero ever since. Adelaide got out. Then Sadie went back in — for the dog, or the tray, or to put the panel back, the log can't say — and at 4:19 PM her fix ends inside the chase, and her exit was never logged. A door app logs every door. It logged hers opening. It has no record of it closing, and no record of it opening again.",
    evidenceLabel: "The HollisHome owner console: the annex at ZERO occupancy — and Sadie's exit “NOT LOGGED”",
  },

  liveEvents: [
    {
      id: "c12-live-unknown",
      kind: "message",
      afterSeconds: 330,
      threadId: "c12-th-unknown",
      message: {
        id: "c12-m-un-live",
        from: "them",
        text: "she's safe. she wants whoever is reading to know the girl's cookies had orange zest in them, and that she is telling everyone. everyone.",
        timestamp: "2025-12-19T20:52:00",
        evidenceLabel: "To whoever reads the phone: “she's safe… she is telling everyone.”",
      },
    },
    {
      id: "c12-live-hollishome",
      kind: "notification",
      afterSeconds: 620,
      title: "HollisHome",
      body: "A guest is at the door.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c12-v-thief",
      label: "She was a thief who ran",
      description: "Hollis's version: jewelry missing, a walker with hardware-store tools and county records on his house, a sudden resignation.",
      requiredEvidenceIds: ["c12-m-hw-1", "c12-b-plan", "c12-m-wr-6"],
      isCanon: false,
      epilogue:
        "Hollis files the complaint himself, which is the tell — he files it Dec 18 at 8 AM, itemized, notarized, before anyone has asked him anything. A pry bar, a stud finder, floor plans of his home, a resignation, a disappearance. It's tidy. He has always been tidy. The tidiness is fourteen years deep.\n\nThe theory dies at the women's center on Fullerton, where an intake advocate produces the guest who arrived by taxi on the 17th: a small woman with a gray coat, borrowed boots, and a legal name that makes the detective sit down. The 'stolen jewelry' is on her hands. It was always hers.\n\nAdelaide Hollis, fourteen years dead on paper, gives a nine-hour statement over two days, pausing only to eat orange slices, and begins it: 'The girl is owed first. Find the girl. I'll still be here — I've gotten very good at still being here.'",
    },
    {
      id: "c12-v-hollis",
      label: "Hollis caught her going back in",
      description: "The annex opened, his mother walked out, and Sadie returned inside to finish the job. He came home from lunch to an empty wall.",
      requiredEvidenceIds: ["case-12.hidden", "c12-n-locked", "c12-ph-doorcode", "c12-pin-beechmont", "c12-vm-hollis"],
      isCanon: true,
      epilogue:
        "Your report reconstructs the day in her own numbered style. 12:14, entry. 12:29, the annex door's first outside opening in fourteen years. 12:41, the taxi stand — Adelaide away clean. 12:44, Sadie back inside: the panel to reset, the dog to settle, the scene to make ordinary, because the plan's whole second half was Hollis noticing nothing until paper could do its slow work. And somewhere between 12:44 and the 3:45 voicemail with its careful, savoring calm — 'the coat rack is crooked, Miss Kwan' — Garrett Hollis came home early from a Rotary lunch that, three members confirm, he left at 12:50 after a phone alert. The door app told on her. The door app was always going to tell on her; it was the one occupant of that house she couldn't befriend.\n\nHollis is arrested on the fraud — fourteen years of pension, the falsified death, the annex with its exterior-grade lock — and held without bail when the cadaver dog alerts, not in the house, but on the bed of his immaculate truck. He says nothing. He has said nothing for years to a woman eleven feet away; silence is his native tongue.\n\nSadie Kwan is not found by the time your report closes. The county searches every parcel Hollis has touched since 1996. The file stays open, and Fullerton Street keeps it warm: Adelaide Hollis attends every hearing, front row, and has told the story — to the court, to three newspapers, to anyone at the bus stop — exactly as she promised the wall she would. 'Everyone in their room, everyone noticing,' her son once called that house. She has made the whole county a room. Everyone is noticing.\n\nBiscuit lives with Nora and Jules now. On walks he still stops at one particular corner and sits, facing 44 Beechmont, pawing the air once — a dog updating his casework. The report's last line, which the sergeant let you keep because some files have earned one soft sentence: 'The dog did all the actual detective work, per the victim's own note, and the department concurs.'",
    },
    {
      id: "c12-v-wagroute",
      label: "WagRoute walked six people into that house",
      description: "Six walkers in a year. A note about the hallway. A platform that shares nothing and forwards everyone.",
      requiredEvidenceIds: ["c12-m-wr-3", "c12-m-wr-5", "c12-m-ho-3"],
      isCanon: false,
      epilogue:
        "The platform verdict: WagRoute matched six strangers into a house whose only user review was 'particular about the hallway,' and told none of them about the others. Discovery turns up the previous walkers, and their exit notes read like chapters of the same book nobody assembled: 'client watches from lunch, weird'; 'dog obsessed with a wall'; 'heard humming, quit.' Walker #3, reached by phone, cries with relief before you finish the second sentence. 'I thought I made it up,' she says. 'The app makes you feel like you're the strange one.'\n\nWagRoute settles quietly and adds a feature: walkers can now see how many predecessors a client has had. It ships behind a toggle, off by default, called 'route history,' named by someone very careful that the words 'six walkers quit this house' never appear on any screen.\n\nEverything in the verdict is true. It's just upstream of the crime, not the crime. Platforms set tables; a man in that house had been dining alone, on someone else's whole life, for fourteen years. The verdict you filed instead names him. This one you keep as an appendix, and every gig app in the county pretends not to have read it.",
    },
    {
      id: "c12-v-house",
      label: "The house keeps its occupants",
      description: "Tally marks older than the fraud. A lullaby dated 1962. A room that was always drawn as a hollow. An exit the door app cannot log.",
      requiredEvidenceIds: ["c12-ph-tally", "c12-vm-lullaby", "c12-ph-window-out"],
      isCanon: false,
      epilogue:
        "You write the deep-title search no one requested: 44 Beechmont Terrace, built 1923, and the northeast chase appears on EVERY plan ever filed — 1923, 1954, 1988 — always hatched, always eleven feet, always unexplained. Houses get remodeled. That hollow was maintained, like a hearth. The tally marks Sadie photographed run in bands: fresh ones, Adelaide's fourteen years — and beneath them, older strokes in older tools, and beneath those, marks that the conservator dates 'pre-war, possibly pre-house,' which is a phrase she writes once and declines to discuss.\n\nThe 1962 lullaby call sits in the carrier's fault log next to its impossible note — 'wife sings on the line, charge us for it if you must. — R. Hollis.' Garrett's grandfather. The Hollis men have been keeping women in that corner for longer than the pension system has existed to pay for it, or the corner has been keeping Hollises supplied. Your report offers both readings. Your report is filed under 'anomalous — hold.'\n\nThe house sells at auction after the conviction. The new owners renovate everything, and the contractor's crew opens the northeast wall to 'finally get some light in there,' and finds eleven feet of nothing at all — no tally marks, no wallpaper with little oranges, no room. Bare studs, ninety years of dust, undisturbed. The crew boss, shown Sadie's photos, looks for a long time and says the only sentence in this file you believe completely: 'Then this isn't the wall she opened.'",
    },
  ],
};

export default c12;
