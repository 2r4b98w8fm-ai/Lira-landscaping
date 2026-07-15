import type { CaseFile } from "../types";
import {
  photoSvg,
  wall,
  windowPane,
  figure,
  doorway,
  blurStreak,
  timestampBurn,
  bloodSmear,
  bloodHandprint,
  bloodRunnels,
} from "../photoart";

/**
 * CASE 01 — THE STATIC LINE
 * Wren Castellan, 26. Unit 4B above a shuttered flower shop. Three weeks in
 * the building, then gone. The phone was recovered fully charged, face-up on
 * the kitchen counter. She was not recovered.
 */

const c1: CaseFile = {
  id: "case-01",
  title: "The Static Line",
  victimName: "Wren Castellan, 26",
  summary:
    "Three weeks after moving into Unit 4B, above a flower shop that never reopens, Wren Castellan stopped answering everyone at once. Her phone was on the counter, fully charged. The door was locked from inside.",
  intake:
    "SUBJECT: Castellan, Wren M. (26). Reported missing by mother on Oct 18 after 48 hours of no contact.\n\nDEVICE: Recovered Oct 18, 22:40, from kitchen counter of Unit 4B, 7 Corving Street. Battery at 96%. No damage. Door locked from inside; chain engaged. No signs of struggle. Subject's coat, keys, and shoes present.\n\nNOTES: Building is a four-unit walk-up above a commercial space (florist, closed since 2019). Landlord (G. Vann) cooperative, provided master key. Other tenants not yet interviewed — units 2A and 3A appear vacant despite active utility accounts.\n\nThis device image is provided to you for timeline reconstruction. Flag anything the first pass missed.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "wren's phone",
    recoveredAt: "2025-10-20T21:47:00",
    batteryStart: 96,
    wallpaperHue: 188,
    lockScreenNotifications: [
      {
        appId: "messages",
        title: "Mom",
        preview: "Wren please just tell me you're okay. I'm calling the police in the morning.",
        targetId: "c1-th-mom",
      },
      {
        appId: "phone",
        title: "Voicemail",
        preview: "No Caller ID · 0:41",
        targetId: "c1-vm-breathing",
      },
      {
        appId: "calendar",
        title: "check the wall",
        preview: "Today at 11:11 PM",
        targetId: "c1-cal-wall",
      },
    ],
  },

  // ---------------------------------------------------------------- MESSAGES
  messages: [
    {
      id: "c1-th-mom",
      contactName: "Mom",
      contactNumber: "(541) 555-0114",
      messages: [
        { id: "c1-m-mom-1", from: "them", text: "Send pictures when the boxes are in! Proud of you honey", timestamp: "2025-09-25T18:12:00" },
        { id: "c1-m-mom-2", from: "owner", text: "moved in!! 4th floor, my legs are dead. it's cute. old but cute", timestamp: "2025-09-25T19:03:00" },
        { id: "c1-m-mom-3", from: "them", text: "Is the neighborhood safe? Your aunt says that block used to be nice", timestamp: "2025-09-25T19:10:00" },
        { id: "c1-m-mom-4", from: "owner", text: "it's fine mom. quiet. almost too quiet lol, I haven't seen a single neighbor yet", timestamp: "2025-09-25T19:15:00" },
        { id: "c1-m-mom-5", from: "them", text: "How was your weekend? Did you get out and explore?", timestamp: "2025-10-13T10:22:00" },
        {
          id: "c1-m-mom-6",
          from: "owner",
          text: "honestly no, stayed in all weekend and unpacked. didn't leave the apartment once",
          timestamp: "2025-10-13T10:40:00",
          evidenceLabel: "Wren told her mom she never left the apartment that weekend",
        },
        { id: "c1-m-mom-7", from: "them", text: "Good girl. Sunday dinner call still on?", timestamp: "2025-10-13T10:44:00" },
        { id: "c1-m-mom-8", from: "owner", text: "always", timestamp: "2025-10-13T10:45:00" },
        { id: "c1-m-mom-9", from: "them", text: "You didn't call Sunday. Everything ok?", timestamp: "2025-10-16T20:15:00" },
        { id: "c1-m-mom-10", from: "them", text: "Wren?", timestamp: "2025-10-17T08:02:00" },
        { id: "c1-m-mom-11", from: "them", text: "Honey answer your phone. I called twice.", timestamp: "2025-10-17T13:31:00" },
        { id: "c1-m-mom-12", from: "them", text: "I called your work. They said you didn't come in. Please please call me", timestamp: "2025-10-17T17:56:00" },
        {
          id: "c1-m-mom-13",
          from: "them",
          text: "Wren please just tell me you're okay. I'm calling the police in the morning.",
          timestamp: "2025-10-17T23:48:00",
          evidenceLabel: "Mom's unanswered messages begin the evening of Oct 16",
        },
      ],
    },
    {
      id: "c1-th-landlord",
      contactName: "Gerald Vann (Landlord)",
      contactNumber: "(541) 555-0187",
      messages: [
        { id: "c1-m-ll-1", from: "them", text: "Welcome to the building. Rent portal link is on the lease. Buzzer's broken again, sorry — knock loud or text me.", timestamp: "2025-09-25T09:30:00" },
        { id: "c1-m-ll-2", from: "owner", text: "no problem! quick q — does anyone live in 3A? I hear moving around at night but I've never seen anyone on the stairs", timestamp: "2025-10-01T21:14:00" },
        { id: "c1-m-ll-3", from: "them", text: "3A's been empty two years. Old buildings settle. You'll get used to the sounds.", timestamp: "2025-10-01T21:40:00" },
        { id: "c1-m-ll-4", from: "owner", text: "ok one more sorry — my bathroom light keeps flickering", timestamp: "2025-10-07T08:55:00" },
        { id: "c1-m-ll-5", from: "them", text: "I'll send someone while you're at work. Don't worry about being home for it.", timestamp: "2025-10-07T09:12:00" },
        { id: "c1-m-ll-6", from: "owner", text: "actually I'd rather be home for it, what time?", timestamp: "2025-10-07T09:15:00" },
        { id: "c1-m-ll-7", from: "them", text: "Already done. He was in the area.", timestamp: "2025-10-07T11:02:00", evidenceLabel: "Landlord had someone inside her unit within 2 hours, no notice" },
        {
          id: "c1-m-ll-8",
          from: "them",
          text: "Did you find who came by last night? Saw the hall light was on at 3.",
          timestamp: "2025-10-12T07:44:00",
          evidenceLabel: "Landlord knew someone came by at night — she never told him",
        },
        { id: "c1-m-ll-9", from: "owner", text: "what do you mean? nobody came by??", timestamp: "2025-10-12T08:30:00" },
        { id: "c1-m-ll-10", from: "owner", text: "gerald how did you know my hall light was on", timestamp: "2025-10-12T08:31:00" },
        { id: "c1-m-ll-11", from: "them", text: "Must be thinking of another tenant. Ignore me.", timestamp: "2025-10-12T12:19:00" },
      ],
    },
    {
      id: "c1-th-reyna",
      contactName: "Reyna 🌱",
      contactNumber: "(541) 555-0166",
      ghostTypingAfterSeconds: 340,
      messages: [
        { id: "c1-m-rey-1", from: "them", text: "HOUSEWARMING. when. I'll bring the good candles", timestamp: "2025-09-26T12:02:00" },
        { id: "c1-m-rey-2", from: "owner", text: "give me two weeks to make it not look like a cardboard museum", timestamp: "2025-09-26T12:20:00" },
        { id: "c1-m-rey-3", from: "them", text: "deal. dinner on the 16th then, no backing out", timestamp: "2025-09-26T12:22:00" },
        {
          id: "c1-m-rey-4",
          from: "them",
          text: "btw is that doorbell app working? the one you put on your phone to see who's at the door. use it, your buzzer's broken",
          timestamp: "2025-10-03T17:45:00",
          evidenceLabel: "Reyna mentions a door-camera app on Wren's phone",
        },
        { id: "c1-m-rey-5", from: "owner", text: "wait what app? I never installed a door app??", timestamp: "2025-10-03T18:01:00" },
        { id: "c1-m-rey-6", from: "them", text: "the flashlight looking one? you showed me a camera feed of your hallway on it when I helped you move. you literally held the phone up", timestamp: "2025-10-03T18:04:00" },
        { id: "c1-m-rey-7", from: "owner", text: "reyna I have no memory of that. I'm looking and it's just my flashlight", timestamp: "2025-10-03T18:09:00" },
        { id: "c1-m-rey-8", from: "them", text: "ok that's genuinely creepy. delete it. or don't open it idk. sleep at mine this weekend?", timestamp: "2025-10-03T18:11:00" },
        { id: "c1-m-rey-9", from: "owner", text: "I'm fine!! it's probably some preinstalled junk. love you", timestamp: "2025-10-03T18:20:00" },
        { id: "c1-m-rey-10", from: "them", text: "checking in. you sounded off on the phone yesterday. still on for the 16th?", timestamp: "2025-10-14T09:30:00" },
        { id: "c1-m-rey-11", from: "owner", text: "yeah about that. can we do your place instead? I don't want people in the apartment right now. I'll explain at dinner. it's the walls", timestamp: "2025-10-14T09:52:00", evidenceLabel: "Wren cancelled hosting — “it's the walls”" },
        { id: "c1-m-rey-12", from: "them", text: "the WALLS? wren", timestamp: "2025-10-14T09:53:00" },
        { id: "c1-m-rey-13", from: "them", text: "ok you're scaring me a little. I'm coming over thursday before dinner and you're showing me", timestamp: "2025-10-14T09:57:00" },
        {
          id: "c1-m-rey-14",
          from: "them",
          text: "on my way. parking on corving. if I'm not up in ten minutes it's because your buzzer",
          timestamp: "2025-10-16T18:41:00",
          evidenceLabel: "Reyna arrived at the building the night Wren vanished — her last message",
        },
      ],
    },
    {
      id: "c1-th-unknown",
      contactName: "Unknown",
      messages: [
        { id: "c1-m-unk-1", from: "them", text: "welcome to the building.", timestamp: "2025-09-26T23:58:00" },
        { id: "c1-m-unk-2", from: "owner", text: "who is this?", timestamp: "2025-09-27T00:14:00" },
        { id: "c1-m-unk-3", from: "them", text: "you left the hallway light on again.", timestamp: "2025-10-05T03:12:00", evidenceLabel: "Unknown number knew details only someone inside would know" },
        { id: "c1-m-unk-4", from: "owner", text: "I'm reporting this number", timestamp: "2025-10-05T08:47:00" },
        { id: "c1-m-unk-5", from: "them", text: "you sleep facing the wall now. that's better.", timestamp: "2025-10-11T02:44:00", evidenceLabel: "Unknown number described how she sleeps" },
        {
          id: "c1-m-unk-6",
          from: "them",
          text: "she's with us now.",
          timestamp: "2025-10-18T23:59:00",
          evidenceLabel: "“she's with us now” — sent two days AFTER Wren vanished",
        },
      ],
    },
    {
      id: "c1-th-tilly",
      contactName: "Tilly (Print Shop)",
      contactNumber: "(541) 555-0139",
      messages: [
        { id: "c1-m-til-1", from: "them", text: "you crushed it today. the big laminator fears you now", timestamp: "2025-10-10T18:20:00" },
        { id: "c1-m-til-2", from: "owner", text: "the laminator and I have an understanding", timestamp: "2025-10-10T18:31:00" },
        { id: "c1-m-til-3", from: "owner", text: "hey random but do you know anything about the flower shop under my building? why'd it close?", timestamp: "2025-10-12T13:05:00" },
        { id: "c1-m-til-4", from: "them", text: "corving street? my mom used to go there. owner just stopped showing up one day, left everything inside. flowers rotted in the window. people complained about the smell for months", timestamp: "2025-10-12T13:18:00", evidenceLabel: "The florist below 4B also disappeared abruptly" },
        { id: "c1-m-til-5", from: "owner", text: "cool cool cool. totally normal building I live in", timestamp: "2025-10-12T13:20:00" },
        { id: "c1-m-til-6", from: "them", text: "you didn't come in today?? boss is being weird about it, text me", timestamp: "2025-10-17T10:15:00" },
      ],
    },
    {
      id: "c1-th-aunt",
      contactName: "Aunt Dee",
      contactNumber: "(541) 555-0102",
      messages: [
        { id: "c1-m-aunt-1", from: "them", text: "Your mother says you're on Corving Street now? I used to take the 12 bus down there.", timestamp: "2025-09-28T15:40:00" },
        { id: "c1-m-aunt-2", from: "owner", text: "yes! number 7, the walkup over the old florist", timestamp: "2025-09-28T16:02:00" },
        { id: "c1-m-aunt-3", from: "them", text: "Number 7? Funny. In my day the buildings on that side were numbered differently. The whole street got redone.", timestamp: "2025-09-28T16:29:00" },
        { id: "c1-m-aunt-4", from: "owner", text: "wait really? what was mine before?", timestamp: "2025-09-28T16:33:00" },
        { id: "c1-m-aunt-5", from: "them", text: "Oh I'd have to think. It's carved on some of the old basement boxes if they never replaced them. Check your mail slots.", timestamp: "2025-09-28T17:01:00" },
      ],
    },
    {
      id: "c1-th-parcel",
      contactName: "ParcelPoint",
      messages: [
        { id: "c1-m-pp-1", from: "them", text: "Your package was delivered. Signed by: resident.", timestamp: "2025-10-08T14:22:00" },
        { id: "c1-m-pp-2", from: "owner", text: "I wasn't home and I live alone. who signed for it?", timestamp: "2025-10-08T18:47:00" },
        { id: "c1-m-pp-3", from: "them", text: "Our records show the package was accepted inside the building. Have a great day!", timestamp: "2025-10-08T18:48:00", evidenceLabel: "A package was signed for inside the building while she was out" },
      ],
    },
    {
      id: "c1-th-rx",
      contactName: "RxCare Pharmacy",
      messages: [
        { id: "c1-m-rx-1", from: "them", text: "RxCare: Your prescription is ready for pickup at 214 Halden Ave.", timestamp: "2025-10-06T11:00:00" },
        { id: "c1-m-rx-2", from: "them", text: "RxCare: Reminder — your prescription will be returned to stock in 3 days.", timestamp: "2025-10-15T11:00:00" },
      ],
    },
    {
      id: "c1-th-deli",
      contactName: "Marrow St Deli",
      messages: [
        { id: "c1-m-deli-1", from: "them", text: "MARROW ST DELI: Weekend special! Two soups. That's it. That's the special.", timestamp: "2025-10-04T10:00:00" },
        { id: "c1-m-deli-2", from: "them", text: "MARROW ST DELI: We miss you! (This is an automated message.)", timestamp: "2025-10-18T10:00:00" },
      ],
    },
    {
      id: "c1-th-wrongnum",
      contactName: "(541) 555-0171",
      messages: [
        { id: "c1-m-wn-1", from: "them", text: "hey is this still Marco's number?", timestamp: "2025-09-30T20:11:00" },
        { id: "c1-m-wn-2", from: "owner", text: "sorry, wrong number!", timestamp: "2025-09-30T20:25:00" },
        { id: "c1-m-wn-3", from: "them", text: "you sure?", timestamp: "2025-09-30T20:26:00" },
        { id: "c1-m-wn-4", from: "them", text: "ok. sorry. it's just. he lived at your address.", timestamp: "2025-09-30T20:40:00", evidenceLabel: "A stranger said someone named Marco “lived at your address”" },
      ],
    },
  ],

  // ------------------------------------------------------------------ PHOTOS
  photos: [
    {
      id: "c1-ph-boxes",
      caption: "day one. send help and shelf brackets",
      timestamp: "2025-09-25T19:45:00",
      aspect: "landscape",
      meta: { takenAt: "2025-09-25T19:45:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#20242b") +
          `<rect x="40" y="170" width="90" height="80" fill="#2e2a22"/><rect x="50" y="150" width="70" height="24" fill="#37322a"/>` +
          `<rect x="150" y="190" width="110" height="60" fill="#2a2620"/><rect x="160" y="120" width="80" height="70" fill="#332e26"/>` +
          `<text x="185" y="160" font-family="monospace" font-size="14" fill="#141310">KITCHEN</text>` +
          windowPane(290, 60, 80, 110, "#2d3a45"),
        { aspect: "landscape", base: "#181b20", grain: 0.12 },
      ),
    },
    {
      id: "c1-ph-window1",
      caption: "view's not bad for $900",
      timestamp: "2025-09-27T18:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-27T18:20:00", device: "This phone", location: "7 Corving St" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#1c2026") +
          windowPane(60, 60, 180, 240, "#31404d") +
          `<rect x="60" y="230" width="180" height="70" fill="#212b33"/>` +
          `<rect x="90" y="130" width="30" height="100" fill="#151a1f"/><rect x="150" y="110" width="40" height="120" fill="#11151a"/>`,
        { aspect: "portrait", base: "#14171c", grain: 0.13 },
      ),
    },
    {
      id: "c1-ph-florist",
      caption: "my downstairs neighbor never has customers 🌸",
      timestamp: "2025-09-28T12:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-09-28T12:10:00", device: "This phone", location: "Corving St" },
      svg: photoSvg(
        `<rect width="400" height="160" fill="#232830"/>` +
          `<rect x="20" y="150" width="360" height="120" fill="#1a1510"/>` +
          `<rect x="40" y="170" width="140" height="80" fill="#0e0c09"/><rect x="220" y="170" width="140" height="80" fill="#0d0b08"/>` +
          `<text x="200" y="145" text-anchor="middle" font-family="serif" font-size="20" fill="#5c5340" letter-spacing="4">F L O R I S T</text>` +
          `<path d="M60 250h100M240 250h100" stroke="#3a332a" stroke-width="2"/>` +
          figure(290, 235, 0.7, 0.14),
        { aspect: "landscape", base: "#15130f", grain: 0.15 },
      ),
      evidenceLabel: "Photo of the shuttered flower shop — something stands in the right window",
    },
    {
      id: "c1-ph-shelf",
      caption: "shelves UP. I am unstoppable",
      timestamp: "2025-10-02T20:05:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-02T20:05:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#1f232a") +
          `<rect x="60" y="80" width="280" height="8" fill="#3a3226"/><rect x="60" y="150" width="280" height="8" fill="#3a3226"/>` +
          `<rect x="80" y="52" width="18" height="28" fill="#2c4a3e"/><rect x="110" y="46" width="14" height="34" fill="#4a3a2c"/><rect x="140" y="58" width="22" height="22" fill="#3a2c4a"/>` +
          `<rect x="90" y="122" width="16" height="28" fill="#4a2c34"/><rect x="120" y="118" width="20" height="32" fill="#2c3a4a"/>`,
        { aspect: "landscape", base: "#171a1f", grain: 0.12 },
      ),
    },
    {
      id: "c1-ph-mirror",
      caption: "thrifted this mirror for $12?!",
      timestamp: "2025-10-04T16:33:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-04T16:33:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#20242b") +
          `<ellipse cx="150" cy="190" rx="95" ry="130" fill="#242c34"/>` +
          `<ellipse cx="150" cy="190" rx="95" ry="130" fill="none" stroke="#4a3f2e" stroke-width="8"/>` +
          `<ellipse cx="120" cy="160" rx="30" ry="60" fill="#2c353f" opacity="0.7"/>` +
          figure(196, 232, 0.55, 0.22) +
          `<rect x="60" y="330" width="180" height="10" fill="#15181d"/>`,
        { aspect: "portrait", base: "#171a1f", grain: 0.14 },
      ),
      evidenceLabel: "Mirror photo — a shape stands in the reflection, behind the camera",
    },
    {
      id: "c1-ph-window2",
      caption: "same view, worse weather",
      timestamp: "2025-10-08T17:58:00",
      aspect: "portrait",
      meta: {
        takenAt: "2025-10-08T17:58:00",
        editedAt: "2025-10-17T02:00:00",
        device: "This phone",
        location: "7 Corving St",
      },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#191d23") +
          windowPane(60, 60, 180, 240, "#262f38") +
          `<rect x="60" y="230" width="180" height="70" fill="#1a2129"/>` +
          `<rect x="90" y="130" width="30" height="100" fill="#10141a"/><rect x="150" y="110" width="40" height="120" fill="#0d1116"/>` +
          figure(105, 220, 0.5, 0.45, "#080a0e"),
        { aspect: "portrait", base: "#12151a", grain: 0.16 },
      ),
      evidenceLabel: "Window photo with a figure below — EDITED the night after she vanished",
    },
    {
      id: "c1-ph-hall",
      caption: "hallway light doing its haunted thing again",
      timestamp: "2025-10-10T22:41:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-10T22:41:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#111318"/>` +
          `<path d="M60 400V120L150 90l90 30v280" fill="#171a20"/>` +
          `<rect x="120" y="150" width="60" height="180" fill="#0b0d11"/>` +
          `<ellipse cx="150" cy="100" rx="40" ry="14" fill="#3a3a2c" opacity="0.5"/>` +
          `<ellipse cx="150" cy="330" rx="60" ry="10" fill="#26261c" opacity="0.3"/>`,
        { aspect: "portrait", base: "#0e1013", grain: 0.18 },
      ),
    },
    {
      id: "c1-ph-basement",
      caption: "why is the basement door just… open",
      timestamp: "2025-10-12T21:17:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-12T21:17:00", device: "This phone", location: "7 Corving St" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#14161b"/>` +
          `<rect x="30" y="60" width="240" height="340" fill="#191d23"/>` +
          doorway(90, 120, 120, 260, "#030405") +
          `<rect x="196" y="120" width="14" height="260" fill="#22262d"/>` +
          `<path d="M90 380h120" stroke="#000" stroke-width="4"/>` +
          `<ellipse cx="150" cy="378" rx="70" ry="8" fill="#000" opacity="0.6"/>` +
          bloodSmear(92, 368, 104, -2, "c1-base-drag"),
        { aspect: "portrait", base: "#101318", grain: 0.17 },
      ),
      evidenceLabel: "The basement door standing open, four days before she vanished",
    },
    {
      id: "c1-ph-wallcrack",
      caption: "is this crack getting longer",
      timestamp: "2025-10-13T23:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-13T23:30:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 400, 300, "#21252c") +
          `<path d="M80 40 C120 90 110 140 170 180 S 260 230 300 280" fill="none" stroke="#101216" stroke-width="3"/>` +
          `<path d="M170 180 C190 170 210 175 230 160" fill="none" stroke="#101216" stroke-width="2"/>` +
          `<circle cx="172" cy="181" r="5" fill="#0a0c0f"/>` +
          bloodRunnels(160, 184, 26, "c1-crack-seep"),
        { aspect: "landscape", base: "#181b21", grain: 0.13 },
      ),
      evidenceLabel: "Close-up of the wall crack — with a small round hole at the joint",
    },
    {
      id: "c1-ph-314",
      caption: "thought I heard something. 3:14am. going back to bed",
      timestamp: "2025-10-14T03:14:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-14T03:14:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#060708"/>` + blurStreak(150, 210, 90, "#15181d", 0.5) + blurStreak(140, 260, 60, "#101318", 0.4),
        { aspect: "portrait", base: "#050607", grain: 0.22 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="300" height="400" fill="#0d1014"/>` +
            `<path d="M40 400V140L150 110l110 30v260" fill="#14171d"/>` +
            doorway(110, 170, 80, 230, "#07080b") +
            bloodSmear(52, 384, 96, -3, "c1-314-drag") +
            bloodHandprint(107, 262, 0.5, -10) +
            figure(150, 355, 1.05, 0.85, "#030406") +
            `<circle cx="144" cy="322" r="2.5" fill="#c8d6e0" opacity="0.9"/><circle cx="157" cy="322" r="2.5" fill="#c8d6e0" opacity="0.9"/>` +
            timestampBurn("03:14:09", 300, 400),
          { aspect: "portrait", base: "#0a0c0f", grain: 0.1 },
        ),
      },
      evidenceLabel: "The 3:14 AM photo — someone is standing in her doorway",
    },
    {
      id: "c1-ph-groceries",
      caption: "adulthood is photographing receipts for budgeting apps you never open",
      timestamp: "2025-10-15T18:50:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-15T18:50:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#16181d"/>` +
          `<rect x="70" y="40" width="160" height="320" fill="#c9c4b4" opacity="0.85"/>` +
          `<text x="150" y="70" text-anchor="middle" font-family="monospace" font-size="11" fill="#3a382f">HALDEN MARKET</text>` +
          Array.from({ length: 12 }, (_, i) => `<rect x="85" y="${95 + i * 18}" width="${60 + ((i * 37) % 70)}" height="5" fill="#8b877a"/>`).join("") +
          `<rect x="85" y="320" width="90" height="7" fill="#5c584c"/>`,
        { aspect: "portrait", base: "#121419", grain: 0.1 },
      ),
    },
    {
      id: "c1-ph-roof",
      caption: "found the roof access. don't tell gerald",
      timestamp: "2025-10-11T17:25:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-11T17:25:00", device: "This phone", location: "7 Corving St (roof)" },
      svg: photoSvg(
        `<rect width="400" height="180" fill="#2a2f38"/>` +
          `<rect y="180" width="400" height="120" fill="#14161b"/>` +
          `<rect x="40" y="130" width="60" height="70" fill="#181b21"/><rect x="140" y="110" width="50" height="90" fill="#15181d"/><rect x="230" y="140" width="70" height="60" fill="#171a20"/>` +
          `<circle cx="330" cy="70" r="26" fill="#3c414c" opacity="0.6"/>` +
          `<rect x="310" y="185" width="30" height="40" fill="#0e1014"/>` +
          `<path d="M0 180h400" stroke="#0b0d10" stroke-width="3"/>`,
        { aspect: "landscape", base: "#1b1f26", grain: 0.13 },
      ),
    },
    // ---- Recently Deleted -------------------------------------------------
    {
      id: "c1-ph-mailbox",
      caption: "old mailboxes in the basement. one says 48. there are four units.",
      timestamp: "2025-10-12T21:24:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-10-12T21:24:00", device: "This phone", location: "7 Corving St (basement)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101216"/>` +
          `<rect x="40" y="80" width="220" height="260" fill="#1d1a15" rx="4"/>` +
          Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 2 }, (_, c) =>
              `<rect x="${60 + c * 100}" y="${100 + r * 80}" width="80" height="60" fill="#26221b" stroke="#0d0b08" stroke-width="2" rx="3"/>`,
            ).join(""),
          ).join("") +
          `<text x="100" y="135" text-anchor="middle" font-family="monospace" font-size="16" fill="#4a4436">2A</text>` +
          `<text x="200" y="135" text-anchor="middle" font-family="monospace" font-size="16" fill="#4a4436">3A</text>` +
          `<text x="100" y="215" text-anchor="middle" font-family="monospace" font-size="16" fill="#4a4436">4A</text>` +
          `<text x="200" y="215" text-anchor="middle" font-family="monospace" font-size="16" fill="#4a4436">4B</text>` +
          `<text x="100" y="295" text-anchor="middle" font-family="monospace" font-size="16" fill="#6b5f3f">48</text>` +
          `<text x="200" y="295" text-anchor="middle" font-family="monospace" font-size="16" fill="#2c2820">—</text>`,
        { aspect: "portrait", base: "#0d0f13", grain: 0.16 },
      ),
      evidenceLabel: "Deleted photo of the basement mail slots — one is numbered 48",
    },
    {
      id: "c1-ph-herdoor",
      caption: "",
      timestamp: "2025-10-15T03:41:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-10-15T03:41:00", device: "Unknown device", location: "—" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0c0e12"/>` +
          `<rect x="70" y="60" width="160" height="340" fill="#191d23"/>` +
          `<rect x="82" y="72" width="136" height="328" fill="#14171d"/>` +
          `<circle cx="200" cy="240" r="5" fill="#2e333c"/>` +
          `<text x="150" y="45" text-anchor="middle" font-family="monospace" font-size="14" fill="#3f4650">4B</text>`,
        { aspect: "portrait", base: "#0a0c0f", grain: 0.2 },
      ),
      evidenceLabel: "Deleted photo of Wren's own front door, taken from the hallway by an unknown device",
    },
  ],

  // ------------------------------------------------------------------- NOTES
  notes: [
    {
      id: "c1-n-grocery",
      title: "groceries",
      timestamp: "2025-10-15T17:20:00",
      body: "oat milk\neggs\nthe good bread (seedy)\nbatteries AAA\ndoor wedge ×2\nearplugs",
    },
    {
      id: "c1-n-housewarming",
      title: "housewarming?? (cancelled)",
      timestamp: "2025-10-13T21:02:00",
      body: "people: reyna, tilly + shop crew, mom (video call her in)\n\nfood: big pot of something. reyna brings candles obviously\n\nupdate: not doing it here. NOT doing it here.",
    },
    {
      id: "c1-n-journal",
      title: "weird stuff (keeping track)",
      timestamp: "2025-10-14T00:12:00",
      evidenceLabel: "Wren's log of incidents in the apartment",
      body:
        "writing it down so I can look at it in daylight and laugh at myself.\n\noct 1 — footsteps in 3A again, 2-3am. gerald says 3A is empty.\n\noct 5 — unknown text about my hallway light. did not tell ANYONE about the light.\n\noct 7 — came home, bathroom light fixed, but my bedroom stuff was MOVED. not much. an inch. everything an inch.\n\noct 8 — package signed for by 'resident'. I live alone.\n\noct 12 — basement door open. went down (stupid). old mail slots down there don't match our units. aunt dee was right, the street got renumbered — found letters in a crate addressed to number NINETEEN corving. our building used to be 19.\n\noct 13 — the crack in the living room wall has a hole in it. a round little hole. I put a sticker over it. woke up. sticker was on the floor.\n\noct 14 — 3:14am. I heard my own voice. coming from the wall. saying words I don't remember saying. recorded nothing on this phone that matches it.\n\nif this keeps up I'm putting everything important in a locked note. code is the building. old and older.",
    },
    {
      id: "c1-n-donotopen",
      title: "DO NOT OPEN",
      timestamp: "2025-10-16T02:58:00",
      lock: {
        code: "1948",
        hintText: "“code is the building. old and older.” — the old street number, then the slot that shouldn't exist.",
        clueSourceIds: ["c1-n-journal", "c1-ph-mailbox"],
      },
      evidenceLabel: "The locked note — what Wren was too afraid to leave in the open",
      body:
        "if someone finds this and I'm gone: I didn't leave. whatever it looks like, I didn't leave.\n\nthe voice in the wall isn't a recording of me. it's ahead of me. two nights ago it said 'the buzzer's broken again, sorry' a full day before gerald texted me those exact words. tonight it was saying tomorrow.\n\nthere was a note under my door when I got home. no envelope. it said I'm one of us now, and that I just don't remember joining. it said everyone on the list remembers eventually, that the florist remembered, that marco remembered. I burned it in the sink like that helps.\n\nI'm not crazy. I checked the flashlight app reyna talked about. she was right, it isn't a flashlight, it's a login screen, and it already knows my",
    },
    {
      id: "c1-n-passwords",
      title: "don't forget",
      timestamp: "2025-09-26T10:15:00",
      body: "rent portal: wren.c / the usual one\nwifi: CorvingGuest — password taped INSIDE the cabinet not under it\nprint shop door code: ask tilly every single time apparently",
    },
  ],

  // -------------------------------------------------------------- VOICEMAILS
  voicemails: [
    {
      id: "c1-vm-mom1",
      callerLabel: "Mom",
      callerNumber: "(541) 555-0114",
      timestamp: "2025-10-17T13:32:00",
      durationSec: 24,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Honey, it's mom. You didn't call Sunday and now your phone's going straight to… you never let it die. Call me the second you hear this. I mean it, Wren. The second.”",
    },
    {
      id: "c1-vm-landlord",
      callerLabel: "Gerald Vann (Landlord)",
      callerNumber: "(541) 555-0187",
      timestamp: "2025-10-15T09:12:00",
      durationSec: 31,
      tone: "plain",
      evidenceLabel: "Landlord's voicemail: “they like the building quiet”",
      transcript:
        "[automated transcript — audio partially recovered]\n“Wren, it's Gerald. Listen — about your questions. Some advice from somebody who's managed this place a long time: stop asking the other tenants things. I know you haven't met them. Keep it that way. They like the building quiet. I'll fix the buzzer this week.”",
    },
    {
      id: "c1-vm-countdown",
      callerLabel: "No Caller ID",
      timestamp: "2025-10-13T23:11:00",
      durationSec: 19,
      tone: "distorted",
      evidenceLabel: "Distorted voicemail counting down: “three days”",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“…three days. [static] …you'll want to say goodbye to the mirror one. [static] …three days. two days. one day. it goes so fast when you're loved.”",
    },
    {
      id: "c1-vm-rx",
      callerLabel: "RxCare Pharmacy",
      timestamp: "2025-10-15T11:01:00",
      durationSec: 22,
      tone: "static",
      transcript:
        "[automated transcript]\n“This is a courtesy call from RxCare Pharmacy for… WREN CASTELLAN. Your prescription is ready. Our hours are… [remainder of message unrecoverable]”",
    },
    {
      id: "c1-vm-breathing",
      callerLabel: "No Caller ID",
      timestamp: "2025-10-19T03:14:00",
      durationSec: 41,
      tone: "breathing",
      evidenceLabel: "Voicemail of static and breathing — left AFTER the phone was in an evidence locker",
      transcript:
        "[automated transcript — no speech detected]\n[static]\n[breathing, 38 seconds]\n[sound resembling a chair moved across a floor, far from the receiver]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: device was in RF-shielded storage at time of receipt. Carrier has no record of this call. Do not redistribute this file.",
    },
  ],

  // ---------------------------------------------------------------- CALENDAR
  calendarEvents: [
    { id: "c1-cal-movein", title: "MOVE IN 🎉", date: "2025-09-25", time: "09:00", createdBy: "owner" },
    { id: "c1-cal-shift1", title: "print shop (open)", date: "2025-09-29", time: "08:30", recurring: "weekly", createdBy: "owner" },
    { id: "c1-cal-shift2", title: "print shop (close)", date: "2025-10-03", time: "13:00", recurring: "weekly", createdBy: "owner" },
    { id: "c1-cal-momcall", title: "call mom ☎", date: "2025-09-28", time: "18:00", recurring: "weekly", createdBy: "owner" },
    { id: "c1-cal-rent", title: "RENT DUE", date: "2025-10-01", time: "09:00", createdBy: "owner" },
    {
      id: "c1-cal-wall",
      title: "check the wall",
      date: "2025-10-02",
      time: "23:11",
      recurring: "daily",
      createdBy: "unknown",
      detail: "No reminder set. No account listed as creator.",
      evidenceLabel: "A recurring 11:11 PM event Wren didn't create: “check the wall”",
    },
    {
      id: "c1-cal-reyna",
      title: "dinner — reyna 🌱",
      date: "2025-10-16",
      time: "19:30",
      struck: true,
      createdBy: "owner",
      detail: "Location changed twice, then struck through the same night.",
      evidenceLabel: "Dinner with Reyna, crossed out the night Wren vanished",
    },
    { id: "c1-cal-rentnov", title: "RENT DUE", date: "2025-11-01", time: "09:00", createdBy: "owner" },
  ],

  // -------------------------------------------------------------- LOCATIONS
  locationPins: [
    { id: "c1-pin-home1", label: "Home — 7 Corving St", timestamp: "2025-10-10T22:30:00", x: 38, y: 42 },
    { id: "c1-pin-work", label: "Halden Print Shop", timestamp: "2025-10-11T08:24:00", x: 62, y: 30 },
    { id: "c1-pin-market", label: "Halden Market", timestamp: "2025-10-11T17:02:00", x: 70, y: 48 },
    {
      id: "c1-pin-storage",
      label: "Riverbed Self-Storage",
      timestamp: "2025-10-12T02:07:00",
      x: 18,
      y: 78,
      detail: "2:07 AM — the same weekend she told her mom she “didn't leave the apartment once.”",
      evidenceLabel: "Phone at a self-storage lot at 2 AM — contradicting what she told her mom",
    },
    { id: "c1-pin-home2", label: "Home — 7 Corving St", timestamp: "2025-10-12T03:40:00", x: 38, y: 42 },
    { id: "c1-pin-pharm", label: "RxCare Pharmacy", timestamp: "2025-10-14T17:45:00", x: 55, y: 60 },
    {
      id: "c1-pin-basement",
      label: "Home — sublevel signal",
      timestamp: "2025-10-16T19:58:00",
      x: 38,
      y: 44,
      detail: "Final recorded position. Altitude reads 9 meters BELOW street level. The building has one basement.",
      evidenceLabel: "Final GPS fix: nine meters below street level",
    },
  ],

  // ---------------------------------------------------------------- BROWSER
  browserHistory: [
    { id: "c1-b-curtains", query: "blackout curtains cheap renter friendly", timestamp: "2025-09-29T21:14:00" },
    { id: "c1-b-florist", query: "corving street florist closed why", timestamp: "2025-10-01T22:03:00" },
    { id: "c1-b-3a", query: "can a landlord lie about empty units", timestamp: "2025-10-02T00:41:00" },
    { id: "c1-b-noise", query: "basement apartment noises normal old building", timestamp: "2025-10-05T02:58:00" },
    { id: "c1-b-sound", query: "how to soundproof a room cheap", timestamp: "2025-10-07T23:22:00", evidenceLabel: "Search: “how to soundproof a room cheap”" },
    { id: "c1-b-4b", query: "who lived in 4B 7 corving street before me", timestamp: "2025-10-09T01:15:00", evidenceLabel: "Search: who lived in 4B before her" },
    { id: "c1-b-renumber", query: "corving street renumbered year old addresses", timestamp: "2025-10-12T22:30:00" },
    { id: "c1-b-marco", query: "marco missing corving street", timestamp: "2025-10-12T23:05:00", evidenceLabel: "She searched for Marco — the wrong-number stranger's missing friend" },
    { id: "c1-b-voice", query: "hearing your own voice through wall not an echo", timestamp: "2025-10-14T03:31:00" },
    { id: "c1-b-enter", query: "can landlord enter without notice illegal", timestamp: "2025-10-15T00:12:00" },
    {
      id: "c1-b-leave",
      query: "why can't I leave",
      timestamp: "2025-10-17T04:12:00",
      evidenceLabel: "Search made the morning AFTER she vanished: “why can't I leave”",
    },
  ],

  // -------------------------------------------------------------- HIDDEN APP
  hiddenApp: {
    disguiseIcon: "flashlight",
    disguiseLabel: "Flashlight",
    revealAfterClueIds: ["c1-th-reyna", "c1-n-journal"],
    title: "WRDN · Console",
    heading: "Signed in as: WARDEN",
    body:
      "Node 19 — Corving. Residential monitoring console.\n\nLast sync: 41 seconds ago.",
    entries: [
      { label: "4B — Front Door", status: "● LIVE", detail: "motion events: 214" },
      { label: "4B — Bedroom", status: "● LIVE", detail: "audio only · wall cavity" },
      { label: "4B — Hallway Mirror", status: "● LIVE", detail: "installed prior to tenancy" },
      { label: "3A — Common", status: "● LIVE", detail: "occupancy: 3" },
      { label: "Basement — Intake", status: "● LIVE", detail: "door: OPEN" },
      { label: "Florist — Cold Room", status: "ARCHIVED", detail: "feed ended 2019 · retained" },
      { label: "4B — Handset (this device)", status: "● LIVE", detail: "you are viewing feed 7 of 7" },
    ],
    footer:
      "Membership roster is stored off-node. New residents are enrolled automatically upon signature of lease. Removal requests: see your orientation packet. You received an orientation packet.",
    evidenceLabel: "The Flashlight app is a login-locked surveillance console — account “WARDEN”",
  },

  // ------------------------------------------------------------- LIVE EVENTS
  liveEvents: [
    {
      id: "c1-live-unknown1",
      kind: "message",
      afterSeconds: 260,
      threadId: "c1-th-unknown",
      message: {
        id: "c1-m-unk-live1",
        from: "them",
        text: "she kept it in her left pocket. you're holding it wrong.",
        timestamp: "2025-10-20T21:52:00",
        evidenceLabel: "A message addressed to whoever is holding the phone now",
      },
    },
    {
      id: "c1-live-sys",
      kind: "notification",
      afterSeconds: 640,
      title: "Screen Recording",
      body: "Screen recording started by a connected device.",
      glitch: true,
    },
  ],

  // ---------------------------------------------------------------- VERDICTS
  verdicts: [
    {
      id: "c1-v-staged",
      label: "She staged her own disappearance",
      description: "The storage run at 2 AM, the lies to her mom, the soundproofing searches. Wren was building an exit.",
      requiredEvidenceIds: ["c1-pin-storage", "c1-m-mom-6", "c1-b-sound"],
      isCanon: false,
      epilogue:
        "You file it as voluntary departure. The storage unit at Riverbed is opened under warrant: inside are Wren's winter clothes, a lamp, and half her books — the ordinary overflow of a small apartment, moved at 2 AM because that's when anxious people do things quietly.\n\nNo bus ticket. No withdrawn cash. Her cards never wake up again.\n\nThe report is accepted. Nobody reopens the flower shop. On your last read-through you notice the landlord's message again — “did you find who came by last night?” — and you close the file before you can think about it too long.",
    },
    {
      id: "c1-v-landlord",
      label: "Gerald Vann did this alone",
      description: "He entered without notice. He knew things he couldn't know. He told her to stop asking about the tenants.",
      requiredEvidenceIds: ["c1-m-ll-8", "c1-vm-landlord", "c1-m-ll-7", "c1-ph-basement"],
      isCanon: false,
      epilogue:
        "Vann is brought in twice. He's cooperative both times, in the way of a man reading from something rehearsed. Yes, he sent maintenance without notice — sloppy, he says. Yes, he told her to leave the tenants alone. Tenants like privacy.\n\nAsked to produce a tenant list for units 2A and 3A, he provides names. The names have utility accounts, signatures, renewed leases. None of them have faces — no license photos, no employer records, nothing older than the building's renumbering.\n\nThe charge doesn't hold. Vann still manages the building. He fixed the buzzer, finally. It rings sometimes with nobody at the door, and he apologizes for it to whoever asks, and his eyes go to the basement door while he does.",
    },
    {
      id: "c1-v-group",
      label: "The building took her",
      description: "Not one person. A membership. Cameras behind the walls, a console signed in as “Warden,” and a note that said she'd already joined.",
      requiredEvidenceIds: ["case-01.hidden", "c1-m-unk-6", "c1-n-donotopen", "c1-cal-wall", "c1-ph-314"],
      isCanon: true,
      epilogue:
        "Your report names no suspect. It names the building.\n\nThe console is real — forensics confirms feeds wired into the wall cavities of every unit, older than any current lease, older than the shuttered florist below. The account “WARDEN” logs in from inside the building's own subnet. It logs in DURING the forensic image. Nobody finds the room the signal comes from; the basement measures three meters shallower inside than the foundation plans say it should.\n\nUnits 2A and 3A are served notice. The letters are accepted and signed — “resident.” No one is ever home.\n\nWren Castellan is not found. Reyna Osei's car is still on Corving Street; her thread still says she's typing. The lease for 4B relists in the spring. Someone new will sign it, and be enrolled automatically, and be loved.\n\nYour own phone's flashlight works normally. You've checked it more than once now. That's how it starts — checking.",
    },
    {
      id: "c1-v-unknown",
      label: "The evidence doesn't add up to anything human",
      description: "A voicemail from inside an evidence locker. A search made after she was gone. A voice in the wall speaking tomorrow's words.",
      requiredEvidenceIds: ["c1-vm-breathing", "c1-b-leave", "c1-ph-window2"],
      isCanon: false,
      epilogue:
        "You write the honest version: the timeline is not reconstructible because the timeline does not obey order. A voicemail arrives at a phone in shielded storage. A search is typed by nobody. A photo edits itself the night after its photographer stops existing.\n\nThe report is returned to you with a sticky note: “resubmit without section 4.” You resubmit without section 4. It is accepted immediately.\n\nAt 11:11 that night your calendar — yours, on your phone — chimes once. There's no event when you look. You keep the phone face-down after that, and you do not photograph your hallway, and mostly that works.",
    },
  ],
};

export default c1;
