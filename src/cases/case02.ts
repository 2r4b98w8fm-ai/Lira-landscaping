import type { CaseFile } from "../types";
import { photoSvg, figure, blurStreak, timestampBurn, bloodSmear, bloodSpatter } from "../photoart";

/**
 * CASE 02 — RIDESHARE, ONE STAR
 * Mara Quist, 31. Night-shift rideshare driver. Her car was found idling at
 * the dead end of Van Winkle Court, hazards on, driver door open, phone in
 * the cradle. Her last passenger doesn't exist in any system.
 */

const c2: CaseFile = {
  id: "case-02",
  title: "Rideshare, One Star",
  victimName: "Mara Quist, 31",
  summary:
    "A night-shift rideshare driver vanished between a pickup and a drop-off that the platform says never happened. The passenger who requested her isn't in her contacts. He knew her schedule better than she did.",
  intake:
    "SUBJECT: Quist, Mara E. (31). Reported missing by brother Nov 8 after her car was found on Van Winkle Court — engine running, hazards on, driver door open, wallet and keys present.\n\nDEVICE: Recovered Nov 7, 04:55, from dash cradle. Battery 61%. Screen was on, navigation open, route: none.\n\nNOTES: RideLoop trip logs show her final fare was cancelled by the rider at 02:58, before pickup. GPS places the car at the cancelled pickup point anyway. Rider account associated with the request was created in June, has completed 34 trips — all 34 with this driver. Platform is 'reviewing our data-sharing obligations.'\n\nSecond-pass review requested. Flag anything the first pass missed.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "MQ — driving, text later",
    recoveredAt: "2025-11-09T23:10:00",
    batteryStart: 61,
    wallpaperHue: 262,
    lockScreenNotifications: [
      { appId: "messages", title: "Sam", preview: "cops found the car. mara if you see this CALL ME", targetId: "c2-th-sam" },
      { appId: "messages", title: "Unknown", preview: "five stars.", targetId: "c2-th-unknown" },
      { appId: "phone", title: "Voicemail", preview: "Mara Quist (this phone) · 0:40", targetId: "c2-vm-self" },
    ],
  },

  messages: [
    {
      id: "c2-th-sam",
      contactName: "Sam",
      contactNumber: "(503) 555-0177",
      messages: [
        { id: "c2-m-sam-1", from: "them", text: "you still doing nights? mom worries. I worry but cooler", timestamp: "2025-10-20T21:14:00" },
        { id: "c2-m-sam-2", from: "owner", text: "nights pay double, sammy. airport queue + bar rush. I'm careful", timestamp: "2025-10-20T21:30:00" },
        {
          id: "c2-m-sam-3",
          from: "owner",
          text: "weird one tonight. same guy twice in one week. books from different corners but it's the same guy, I know the cologne. asked why I stopped doing the eastside loop. I never told any rider I changed my loop",
          timestamp: "2025-10-28T03:40:00",
          evidenceLabel: "Mara told her brother the same rider kept finding her — and knew her route change",
        },
        { id: "c2-m-sam-4", from: "them", text: "report him?? block him???", timestamp: "2025-10-28T08:15:00" },
        { id: "c2-m-sam-5", from: "owner", text: "reported a guy in june for grabbing my headrest and screaming at me. platform gave me a 'we hear you' email and HE one-starred ME. reporting does nothing", timestamp: "2025-10-28T08:44:00", evidenceLabel: "She reported a rider in June; he retaliated with a 1-star" },
        { id: "c2-m-sam-6", from: "them", text: "get a dash cam at least. I'll pay half", timestamp: "2025-10-28T08:50:00" },
        { id: "c2-m-sam-7", from: "owner", text: "already got one. the sd card keeps being full of nothing. like recorded-over nothing", timestamp: "2025-10-28T09:02:00" },
        { id: "c2-m-sam-8", from: "them", text: "you didn't answer yesterday. calling mom if you don't reply by noon", timestamp: "2025-11-08T09:20:00" },
        { id: "c2-m-sam-9", from: "them", text: "cops found the car. mara if you see this CALL ME", timestamp: "2025-11-08T16:45:00" },
      ],
    },
    {
      id: "c2-th-priya",
      contactName: "Priya (RideLoop)",
      contactNumber: "(503) 555-0142",
      ghostTypingAfterSeconds: 400,
      messages: [
        { id: "c2-m-pri-1", from: "them", text: "girl the airport queue tonight is 90 min deep. go do bar rush", timestamp: "2025-10-25T23:05:00" },
        { id: "c2-m-pri-2", from: "owner", text: "already on it. see you at the depot 2:40?", timestamp: "2025-10-25T23:12:00" },
        { id: "c2-m-pri-3", from: "them", text: "heads up. there's a rider getting flagged in the group chat. requests women drivers, late pickups, residential corners. cancels if a man accepts. platform says request preferences like that aren't even possible", timestamp: "2025-11-01T01:22:00", evidenceLabel: "Other drivers flagged a rider who could target women drivers — a thing the platform says is impossible" },
        {
          id: "c2-m-pri-4",
          from: "them",
          text: "it's like he has the driver app but backwards. he sees US. how does he always know where you are before you accept?",
          timestamp: "2025-11-01T01:31:00",
          evidenceLabel: "Priya: “like he has the driver app but backwards — he sees us”",
        },
        { id: "c2-m-pri-5", from: "owner", text: "I think it's my june guy. the cologne guy. I'm going to get his plate next time. logging everything in my notes", timestamp: "2025-11-01T01:40:00" },
        { id: "c2-m-pri-6", from: "them", text: "get the FRONT plate, the back one's always in shadow on those streets", timestamp: "2025-11-01T01:41:00" },
        { id: "c2-m-pri-7", from: "them", text: "you get him last night?", timestamp: "2025-11-06T14:10:00" },
        { id: "c2-m-pri-8", from: "owner", text: "half. front half. rest is on my camera roll somewhere, sedan was across from the depot again", timestamp: "2025-11-06T14:22:00" },
        { id: "c2-m-pri-9", from: "them", text: "mara answer your phone. everyone's asking about you at the depot", timestamp: "2025-11-08T03:10:00" },
      ],
    },
    {
      id: "c2-th-unknown",
      contactName: "Unknown",
      messages: [
        { id: "c2-m-unk-1", from: "them", text: "you missed my pickup.", timestamp: "2025-10-30T02:44:00" },
        { id: "c2-m-unk-2", from: "owner", text: "who is this? riders can't text drivers off-app", timestamp: "2025-10-30T02:51:00" },
        {
          id: "c2-m-unk-3",
          from: "them",
          text: "you always take the 2:40 break at the depot lot. you park nose out. good habit.",
          timestamp: "2025-11-02T02:41:00",
          evidenceLabel: "Off-app texts from a rider who knew her break schedule and how she parks",
        },
        { id: "c2-m-unk-4", from: "owner", text: "I'm reporting this to the police, not the app. done with the app", timestamp: "2025-11-02T02:58:00" },
        {
          id: "c2-m-unk-5",
          from: "them",
          text: "five stars.",
          timestamp: "2025-11-08T02:58:00",
          evidenceLabel: "“five stars.” — sent 24 hours after she disappeared, to the minute",
        },
      ],
    },
    {
      id: "c2-th-mom",
      contactName: "Mom",
      contactNumber: "(503) 555-0104",
      messages: [
        { id: "c2-m-mom-1", from: "them", text: "Soup on Sunday? Your brother's bringing the loud children", timestamp: "2025-11-02T11:00:00" },
        { id: "c2-m-mom-2", from: "owner", text: "wouldn't miss it. I'll bring bread from the good place", timestamp: "2025-11-02T11:34:00" },
        { id: "c2-m-mom-3", from: "them", text: "You looked tired Sunday. When do you sleep, baby?", timestamp: "2025-11-03T09:12:00" },
        { id: "c2-m-mom-4", from: "owner", text: "days. mostly. two more months of nights and the car's paid off, then I'm a daytime person forever, promise", timestamp: "2025-11-03T13:20:00" },
        { id: "c2-m-mom-5", from: "them", text: "Mara Elena call your mother", timestamp: "2025-11-08T18:02:00" },
      ],
    },
    {
      id: "c2-th-jess",
      contactName: "Jess (roommate)",
      contactNumber: "(503) 555-0129",
      messages: [
        { id: "c2-m-jess-1", from: "them", text: "rent's in. also we're out of everything, as usual, love this journey for us", timestamp: "2025-11-01T10:15:00" },
        {
          id: "c2-m-jess-2",
          from: "them",
          text: "some guy buzzed at like 8pm asking for you? said he left his phone in your car and wanted to wait inside?? I said no obviously. he knew your actual name mara. not the app name",
          timestamp: "2025-11-04T20:31:00",
          evidenceLabel: "A man came to her HOME claiming he'd left a phone in her car — riders only see her app name",
        },
        { id: "c2-m-jess-3", from: "owner", text: "NO ONE left a phone in my car. do not let anyone in. I mean it jess", timestamp: "2025-11-04T21:47:00" },
        { id: "c2-m-jess-4", from: "them", text: "locked and bolted. he was still across the street when I closed the blinds", timestamp: "2025-11-04T21:50:00" },
      ],
    },
    {
      id: "c2-th-dex",
      contactName: "Dex (Night Depot)",
      contactNumber: "(503) 555-0198",
      messages: [
        { id: "c2-m-dex-1", from: "them", text: "saved you the last apple fritter. depot perks", timestamp: "2025-11-03T02:20:00" },
        { id: "c2-m-dex-2", from: "owner", text: "you're the only good thing about 2:40am", timestamp: "2025-11-03T02:46:00" },
        {
          id: "c2-m-dex-3",
          from: "them",
          text: "that gray sedan was across the street again tonight. left maybe 90 seconds after you did. want me to start writing down times?",
          timestamp: "2025-11-06T03:12:00",
          evidenceLabel: "Depot attendant saw a gray sedan leave 90 seconds after Mara, repeatedly",
        },
        { id: "c2-m-dex-4", from: "owner", text: "yes. times, and the plate if you ever get an angle on it", timestamp: "2025-11-06T03:15:00" },
        { id: "c2-m-dex-5", from: "them", text: "on it. be safe out there quist", timestamp: "2025-11-06T03:16:00" },
      ],
    },
    {
      id: "c2-th-rideloop",
      contactName: "RideLoop Support",
      messages: [
        { id: "c2-m-rl-1", from: "them", text: "RideLoop: Thanks for reaching out! Your safety report (Case #88213) has been received. A specialist will review it within 5–7 business days.", timestamp: "2025-06-14T10:00:00" },
        { id: "c2-m-rl-2", from: "them", text: "RideLoop: Case #88213 update — we were unable to verify a policy violation. The rider account remains active. We hear you, and we're always improving.", timestamp: "2025-06-21T10:00:00", evidenceLabel: "The platform kept her reported rider's account active — “we hear you”" },
        { id: "c2-m-rl-3", from: "owner", text: "he screamed at me and grabbed my seat while I was driving. 'unable to verify'???", timestamp: "2025-06-21T10:40:00" },
        { id: "c2-m-rl-4", from: "them", text: "RideLoop: We're sorry you had this experience! Your feedback helps make RideLoop better for everyone. 💜", timestamp: "2025-06-21T10:41:00" },
        { id: "c2-m-rl-5", from: "them", text: "RideLoop: Reminder — your rating has changed. New rating: 4.71 ★", timestamp: "2025-06-22T09:00:00" },
      ],
    },
    {
      id: "c2-th-glass",
      contactName: "TrueView Auto Glass",
      messages: [
        { id: "c2-m-gl-1", from: "them", text: "TrueView Auto Glass: Confirming your appt Tue 10/21, rear passenger window. Reply C to confirm.", timestamp: "2025-10-19T15:00:00" },
        { id: "c2-m-gl-2", from: "owner", text: "C", timestamp: "2025-10-19T15:22:00" },
        {
          id: "c2-m-gl-3",
          from: "them",
          text: "TrueView: Tech note from your service — 'no glass fragments inside the vehicle. window was lowered, not broken, then the regulator was snapped from inside the door panel. weird one. told customer.'",
          timestamp: "2025-10-21T13:10:00",
          evidenceLabel: "Her “broken” car window had been opened from inside the door mechanism, not smashed",
        },
      ],
    },
    {
      id: "c2-th-bank",
      contactName: "Cascade CU Alerts",
      messages: [
        { id: "c2-m-bk-1", from: "them", text: "Cascade CU: Card ending 4471 used — $38.60, FUEL, Hwy 26 Travel Plaza. Reply STOP to opt out.", timestamp: "2025-11-01T03:20:00" },
        {
          id: "c2-m-bk-2",
          from: "them",
          text: "Cascade CU: Card ending 4471 used — $61.14, FUEL, Junction City Travel Plaza.",
          timestamp: "2025-11-10T04:02:00",
          evidenceLabel: "Her debit card bought gas 200 miles south — three days AFTER she vanished",
        },
      ],
    },
    {
      id: "c2-th-promo",
      contactName: "RideLoop Rewards",
      messages: [
        { id: "c2-m-pr-1", from: "them", text: "RideLoop Rewards: You're in the top 8% of night drivers this month! 🌙 Keep it up!", timestamp: "2025-11-01T12:00:00" },
        { id: "c2-m-pr-2", from: "them", text: "RideLoop Rewards: We miss you on the road, Mara! Your streak ends in 2 days.", timestamp: "2025-11-09T12:00:00" },
      ],
    },
  ],

  photos: [
    {
      id: "c2-ph-rig",
      caption: "office views (the office is a 2014 sedan)",
      timestamp: "2025-10-18T22:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-18T22:10:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="140" fill="#1a2029"/>` +
          `<rect y="140" width="400" height="160" fill="#12141a"/>` +
          `<rect x="30" y="150" width="340" height="90" rx="20" fill="#191d24"/>` +
          `<rect x="150" y="160" width="100" height="60" rx="8" fill="#233246"/>` +
          `<circle cx="90" cy="200" r="34" fill="#20242c"/>` +
          `<text x="200" y="196" text-anchor="middle" font-family="monospace" font-size="12" fill="#5f7ea0">2:12 AM · $148 tonight</text>`,
        { aspect: "landscape", base: "#0f1116", grain: 0.13 },
      ),
    },
    {
      id: "c2-ph-sunrise",
      caption: "clocking out as the day people clock in. suckers",
      timestamp: "2025-10-22T06:41:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-22T06:41:00", device: "This phone", location: "Hwy 30" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1d1a22"/>` +
          `<rect y="170" width="400" height="130" fill="#100f14"/>` +
          `<circle cx="320" cy="150" r="60" fill="#4a3040" opacity="0.8"/>` +
          `<circle cx="320" cy="150" r="30" fill="#6b4050" opacity="0.9"/>` +
          `<path d="M0 175 L400 168" stroke="#090a0d" stroke-width="4"/>` +
          `<path d="M180 300 L200 180 L220 300" fill="#0c0d11"/>`,
        { aspect: "landscape", base: "#141218", grain: 0.12 },
      ),
    },
    {
      id: "c2-ph-badge",
      caption: "new airport queue permit. the DMV photo curse continues",
      timestamp: "2025-10-24T14:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-24T14:20:00", device: "This phone" },
      svg: photoSvg(
        `<rect x="50" y="80" width="200" height="260" rx="12" fill="#d8d2c2" opacity="0.9"/>` +
          `<rect x="70" y="100" width="70" height="90" fill="#8a8578"/>` +
          `<rect x="155" y="105" width="80" height="8" fill="#55503f"/><rect x="155" y="125" width="60" height="8" fill="#7a7462"/>` +
          `<text x="70" y="230" font-family="monospace" font-size="13" fill="#3a382f">QUIST, M.</text>` +
          `<text x="70" y="255" font-family="monospace" font-size="13" fill="#3a382f">NIGHT TIER · Q3</text>` +
          `<rect x="70" y="280" width="160" height="30" fill="#2c2a22"/>`,
        { aspect: "portrait", base: "#15171c", grain: 0.1 },
      ),
    },
    {
      id: "c2-ph-window",
      caption: "cool cool cool. someone 'broke' my window without breaking it",
      timestamp: "2025-10-20T09:05:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-20T09:05:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#171a20"/>` +
          `<rect x="40" y="60" width="320" height="180" rx="24" fill="#1e232b"/>` +
          `<rect x="70" y="80" width="120" height="70" rx="8" fill="#0c0e12"/>` +
          `<rect x="210" y="80" width="120" height="70" rx="8" fill="#232d3a"/>` +
          `<path d="M70 150 h120" stroke="#3a4250" stroke-width="3"/>` +
          `<text x="130" y="200" text-anchor="middle" font-family="monospace" font-size="11" fill="#6b7480">window: down. forever.</text>`,
        { aspect: "landscape", base: "#111318", grain: 0.13 },
      ),
      evidenceLabel: "The rear window “break-in” — opened cleanly from inside the door panel",
    },
    {
      id: "c2-ph-depot",
      caption: "2:40 club. dex makes the coffee, god makes the fritters",
      timestamp: "2025-11-03T02:38:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-03T02:38:00", device: "This phone", location: "Night Depot, Alder St" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0d0f14"/>` +
          `<rect x="30" y="80" width="220" height="140" fill="#1a1f27"/>` +
          `<rect x="50" y="100" width="180" height="60" fill="#2c3626"/>` +
          `<text x="140" y="138" text-anchor="middle" font-family="monospace" font-size="16" fill="#9fe8a0" opacity="0.85">NIGHT DEPOT</text>` +
          `<rect x="60" y="170" width="40" height="50" fill="#11141a"/>` +
          `<rect x="290" y="140" width="90" height="50" rx="10" fill="#14171d"/>` +
          `<circle cx="305" cy="192" r="9" fill="#0a0c0f"/><circle cx="365" cy="192" r="9" fill="#0a0c0f"/>`,
        { aspect: "landscape", base: "#0b0d11", grain: 0.15 },
      ),
    },
    {
      id: "c2-ph-heatmap",
      caption: "the app's 'demand map' put a surge zone on my own street tonight??",
      timestamp: "2025-11-05T01:12:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-05T01:12:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101318"/>` +
          `<rect x="20" y="60" width="260" height="280" rx="10" fill="#151a21"/>` +
          `<path d="M40 120h220M40 180h220M40 240h220M100 80v240M180 80v240" stroke="#232b34" stroke-width="4"/>` +
          `<circle cx="120" cy="200" r="46" fill="#6b2f3a" opacity="0.55"/>` +
          `<circle cx="120" cy="200" r="20" fill="#a04252" opacity="0.7"/>` +
          `<text x="120" y="270" text-anchor="middle" font-family="monospace" font-size="11" fill="#c4808a">SURGE ×3.1 — Fenwick Ave</text>` +
          `<text x="150" y="350" text-anchor="middle" font-family="monospace" font-size="10" fill="#5b6470">you live on fenwick.</text>`,
        { aspect: "portrait", base: "#0d1014", grain: 0.1 },
      ),
      evidenceLabel: "A surge zone appeared centered on her home street with no event to explain it",
    },
    {
      id: "c2-ph-fritter",
      caption: "exhibit A: the fritter",
      timestamp: "2025-11-03T02:44:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-03T02:44:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#181410"/>` +
          `<ellipse cx="150" cy="230" rx="110" ry="80" fill="#241c12"/>` +
          `<ellipse cx="150" cy="220" rx="85" ry="60" fill="#3f2f1a"/>` +
          `<ellipse cx="150" cy="212" rx="70" ry="46" fill="#57422a"/>` +
          `<ellipse cx="130" cy="200" rx="18" ry="10" fill="#6b5335" opacity="0.8"/>`,
        { aspect: "portrait", base: "#120f0b", grain: 0.12 },
      ),
    },
    {
      id: "c2-ph-queue",
      caption: "airport cell lot, 1am. we are legion",
      timestamp: "2025-10-26T01:02:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-26T01:02:00", device: "This phone", location: "PDX cell lot" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0c0e12"/>` +
          Array.from({ length: 6 }, (_, i) => `<rect x="${20 + i * 62}" y="${170 + (i % 2) * 8}" width="52" height="26" rx="7" fill="#181c23"/><circle cx="${30 + i * 62}" cy="${200 + (i % 2) * 8}" r="6" fill="#07080b"/><circle cx="${62 + i * 62}" cy="${200 + (i % 2) * 8}" r="6" fill="#07080b"/>`).join("") +
          `<rect x="0" y="100" width="400" height="4" fill="#1d232c"/>` +
          `<circle cx="60" cy="60" r="3" fill="#3f4a58"/><circle cx="200" cy="40" r="2.5" fill="#3f4a58"/><circle cx="330" cy="70" r="2" fill="#3f4a58"/>`,
        { aspect: "landscape", base: "#0a0c10", grain: 0.16 },
      ),
    },
    {
      id: "c2-ph-culdesac",
      caption: "",
      timestamp: "2025-11-07T03:04:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-07T03:04:00", device: "This phone", location: "Van Winkle Ct" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#07090c"/>` +
          `<path d="M100 400 L140 220 L160 220 L200 400 Z" fill="#11141a"/>` +
          `<ellipse cx="150" cy="215" rx="70" ry="16" fill="#0e1116"/>` +
          blurStreak(150, 300, 80, "#171b22", 0.4),
        { aspect: "portrait", base: "#06080a", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="300" height="400" fill="#0b0e12"/>` +
            `<path d="M100 400 L140 220 L160 220 L200 400 Z" fill="#161a21"/>` +
            `<ellipse cx="150" cy="215" rx="70" ry="16" fill="#12161c"/>` +
            `<path d="M30 230 L80 180 L90 400 L20 400 Z" fill="#0d1015"/>` +
            `<path d="M270 230 L220 180 L210 400 L280 400 Z" fill="#0d1015"/>` +
            bloodSmear(128, 372, 92, 14, "c2-drag") +
            bloodSpatter(150, 352, 42, "c2-spat") +
            figure(238, 320, 0.9, 0.8, "#040508") +
            timestampBurn("03:04:51", 300, 400),
          { aspect: "portrait", base: "#090b0e", grain: 0.12 },
        ),
      },
      evidenceLabel: "Her last photo: the Van Winkle dead end — a man waits at the treeline",
    },
    {
      id: "c2-ph-cash",
      caption: "car fund: $9,140 of $11,000. TWO MONTHS LEFT",
      timestamp: "2025-11-04T15:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-04T15:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#14161b"/>` +
          `<rect x="60" y="120" width="180" height="120" rx="10" fill="#1d2129"/>` +
          `<text x="150" y="170" text-anchor="middle" font-family="monospace" font-size="20" fill="#9fe8c0">$9,140.22</text>` +
          `<text x="150" y="200" text-anchor="middle" font-family="monospace" font-size="11" fill="#5f6875">GOAL: $11,000 — 83%</text>` +
          `<rect x="80" y="215" width="140" height="8" rx="4" fill="#0e1013"/><rect x="80" y="215" width="116" height="8" rx="4" fill="#3f6f65"/>`,
        { aspect: "portrait", base: "#101216", grain: 0.09 },
      ),
      evidenceLabel: "Her savings: two months from paying off the car — a life she was mid-way through building",
    },
    // ---- Recently Deleted ---------------------------------------------------
    {
      id: "c2-ph-sedan",
      caption: "gray sedan. across from the depot. back plate in shadow AGAIN. got the last two digits: 83",
      timestamp: "2025-11-06T02:51:00",
      aspect: "landscape",
      deleted: true,
      meta: { takenAt: "2025-11-06T02:51:00", editedAt: "2025-11-08T02:58:00", device: "This phone", location: "Alder St" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0b0d11"/>` +
          `<rect x="90" y="130" width="220" height="70" rx="16" fill="#20242b"/>` +
          `<rect x="130" y="105" width="140" height="40" rx="10" fill="#181c22"/>` +
          `<circle cx="140" cy="205" r="17" fill="#07080b"/><circle cx="260" cy="205" r="17" fill="#07080b"/>` +
          `<rect x="180" y="178" width="52" height="16" rx="2" fill="#101318"/>` +
          `<text x="206" y="190" text-anchor="middle" font-family="monospace" font-size="11" fill="#4f5a68">··· 83</text>` +
          figure(310, 190, 0.55, 0.2),
        { aspect: "landscape", base: "#090b0e", grain: 0.18 },
      ),
      evidenceLabel: "Deleted photo of the gray sedan — plate ending 83 — edited the night after she vanished",
    },
    {
      id: "c2-ph-mirror-shot",
      caption: "",
      timestamp: "2025-11-07T02:59:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-07T02:59:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0a0c10"/>` +
          `<rect x="40" y="60" width="220" height="60" rx="8" fill="#141821"/>` +
          `<rect x="50" y="68" width="200" height="44" rx="6" fill="#1c2530"/>` +
          `<rect x="180" y="76" width="60" height="28" rx="4" fill="#2a3644"/>` +
          `<circle cx="196" cy="90" r="4" fill="#5c6b7c"/><circle cx="222" cy="90" r="4" fill="#5c6b7c"/>` +
          `<text x="150" y="200" text-anchor="middle" font-family="monospace" font-size="10" fill="#3d4653">rearview · headlights · no car when I turned around</text>`,
        { aspect: "portrait", base: "#080a0d", grain: 0.19 },
      ),
      evidenceLabel: "Deleted rearview photo — headlights with no car behind them",
    },
  ],

  notes: [
    {
      id: "c2-n-log",
      title: "HIM (log)",
      timestamp: "2025-11-06T04:10:00",
      evidenceLabel: "Mara's log of the rider who kept finding her",
      body:
        "keeping this like sam said. dates, times, facts.\n\njune 12 — the original ride. screamed at me over a detour HE requested. grabbed my headrest. reported it.\n\njune 22 — my rating drops. one star, no comment. his account should be banned. it isn't.\n\noct 23 — pickup at hollis & 9th. same cologne. different name on the account. didn't talk the whole ride, just hummed something. tipped exact.\n\noct 27 — AGAIN. corner of drury. knew I'd switched loops. asked 'how's the window?' I never posted about the window.\n\nnov 1 — priya says the girls are all seeing him. or someones like him. platform says targeting isn't possible. the platform also said my report was 'unverifiable'\n\nnov 6 — got the FRONT half of his plate: 40. the back half's in my camera roll, sedan pic, last two digits. if anything happens to me: front then back. it's the code to my red notebook note on here too.",
    },
    {
      id: "c2-n-locked",
      title: "red notebook (backup)",
      timestamp: "2025-11-06T04:31:00",
      lock: {
        code: "4083",
        hintText: "“front then back.” — the plate. She wrote the front half in her log; the back half is in a photo she deleted.",
        clueSourceIds: ["c2-n-log", "c2-ph-sedan"],
      },
      evidenceLabel: "Her locked backup: everything she knew about him",
      body:
        "if you're reading this it went wrong.\n\nhis accounts (there are at least 3): J*** R. / 'Marcus O.' / one with no photo, just gray. all created within a week of my june report. all only ever ride with me.\n\nhe doesn't book through the normal app. priya's right. the requests come in already knowing. I tested it — I turned my driver app OFF and parked on randall. four minutes later: ping. pickup request. my exact corner. app was off. that's not a stalker with an app. that's someone inside the pipe.\n\nI asked dex to log the sedan. I told sam a half version so he doesn't panic. I keep the doors locked between fares now.\n\ntomorrow I'm taking the cancelled-pickup bait. one lap around van winkle with the cam running. get the plate, get the face, go to the police with a FILE, not a feeling.\n\nif the file isn't here: check the dash cam card. if the card is blank again, then he was already in the pipe there too, and I'm sorry. tell mom it was the money, tell her I was two months out.",
    },
    {
      id: "c2-n-groceries",
      title: "before sunday",
      timestamp: "2025-11-05T12:00:00",
      body: "bread from the good place\noil change (overdue, don't tell the car)\nsam's kid's bday — the dinosaur one, NOT the loud one\nsleep????",
    },
    {
      id: "c2-n-carmath",
      title: "car math",
      timestamp: "2025-10-15T14:22:00",
      body: "$11,000 payoff\n$9,140 saved\nnights avg $210, minus gas ~$40\n= 9 more good weeks\n\nthen: days. sunlight. a plant that lives.",
    },
  ],

  voicemails: [
    {
      id: "c2-vm-mom",
      callerLabel: "Mom",
      callerNumber: "(503) 555-0104",
      timestamp: "2025-11-08T18:05:00",
      durationSec: 26,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Mara Elena. Sam is here and he's pale and nobody will say anything out loud. So I'm saying it into your voicemail: you call me, and I will make soup, and whatever it is we will fix it. Call me.”",
    },
    {
      id: "c2-vm-priya",
      callerLabel: "Priya (RideLoop)",
      callerNumber: "(503) 555-0142",
      timestamp: "2025-11-08T03:15:00",
      durationSec: 33,
      tone: "plain",
      evidenceLabel: "Priya's voicemail: the ghost rider requested HER at Mara's corner",
      transcript:
        "[automated transcript — audio partially recovered]\n“Okay so you're not answering, cool, love that. Listen — I got a request tonight. Pickup at Van Winkle Court. Van Winkle is a DEAD END, Mara, nobody lives— [pause] It cancelled the second I accepted. The rider photo was gray. Call me back. Don't take Van Winkle.”",
    },
    {
      id: "c2-vm-support",
      callerLabel: "RideLoop (automated)",
      timestamp: "2025-11-08T12:00:00",
      durationSec: 21,
      tone: "static",
      transcript:
        "[automated transcript]\n“Hello! This is RideLoop with an important update about your account. Your recent trip was cancelled by the rider. You have been paid a cancellation fee of $3.75. Thanks for driving with… [remainder unrecoverable]”",
    },
    {
      id: "c2-vm-hum",
      callerLabel: "No Caller ID",
      timestamp: "2025-11-05T02:41:00",
      durationSec: 17,
      tone: "distorted",
      evidenceLabel: "A voicemail of someone humming — the tune her June rider hummed",
      transcript:
        "[automated transcript — audio heavily corrupted]\n[no speech]\n[humming, melodic, 14 seconds — matches no known catalog entry]\n[one exhale, close to the microphone]\n[end of message]",
    },
    {
      id: "c2-vm-self",
      callerLabel: "Mara Quist (this phone)",
      callerNumber: "(503) 555-0163",
      timestamp: "2025-11-09T02:58:00",
      durationSec: 40,
      tone: "breathing",
      evidenceLabel: "A voicemail left BY this phone TO this phone while it sat in an evidence bag",
      transcript:
        "[automated transcript — no speech detected]\n[road noise, constant, 40 seconds — engine estimated at highway speed]\n[turn signal: on, 6 clicks, off]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: caller ID and recipient are the same handset. Device was bagged and inventoried at time of call. Carrier shows no originating tower.",
    },
  ],

  calendarEvents: [
    { id: "c2-cal-shift", title: "night block (airport→bars)", date: "2025-10-20", time: "22:00", recurring: "daily", createdBy: "owner" },
    { id: "c2-cal-oil", title: "oil change (FINALLY)", date: "2025-11-10", time: "10:00", createdBy: "owner" },
    { id: "c2-cal-soup", title: "soup @ mom's", date: "2025-11-09", time: "13:00", recurring: "weekly", createdBy: "owner", struck: true, evidenceLabel: "Sunday soup at her mom's — struck through by someone after she vanished" },
    { id: "c2-cal-permit", title: "airport queue permit renewal", date: "2025-11-14", time: "09:00", createdBy: "owner" },
    {
      id: "c2-cal-pickup",
      title: "pickup — priority rider",
      date: "2025-11-07",
      time: "02:40",
      createdBy: "unknown",
      detail: "Added via calendar invite from an address that bounces. RideLoop does not send calendar invites.",
      evidenceLabel: "A “priority rider” pickup on her calendar — from an invite address that doesn't exist",
    },
    { id: "c2-cal-bday", title: "sam's kid bday 🦕", date: "2025-11-16", time: "14:00", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c2-pin-home", label: "Home — Fenwick Ave", timestamp: "2025-11-06T21:30:00", x: 30, y: 35 },
    { id: "c2-pin-airport", label: "Airport cell lot", timestamp: "2025-11-06T23:15:00", x: 82, y: 18 },
    { id: "c2-pin-bars", label: "Old Town bar corridor", timestamp: "2025-11-07T01:30:00", x: 55, y: 50 },
    { id: "c2-pin-depot", label: "Night Depot, Alder St", timestamp: "2025-11-07T02:38:00", x: 48, y: 62 },
    {
      id: "c2-pin-vanwinkle",
      label: "Van Winkle Ct (dead end)",
      timestamp: "2025-11-07T02:58:00",
      x: 12,
      y: 84,
      detail: "Arrived for a pickup the platform says was cancelled at this exact minute. No rider account was within 3 miles.",
      evidenceLabel: "Her final stop: a dead-end pickup that was cancelled the minute she arrived",
    },
    {
      id: "c2-pin-after",
      label: "Unlabeled fix — Hwy 26 corridor",
      timestamp: "2025-11-07T03:26:00",
      x: 6,
      y: 96,
      detail: "One final background fix, 28 minutes later, heading west at highway speed. The phone was still on Van Winkle Court when recovered.",
      evidenceLabel: "A GPS fix 28 minutes after her last photo — from a phone that never left the car",
    },
  ],

  browserHistory: [
    { id: "c2-b-report", query: "rideloop reported rider still active what next", timestamp: "2025-06-22T10:15:00" },
    { id: "c2-b-spray", query: "pepper spray legal for rideshare drivers", timestamp: "2025-10-23T11:40:00" },
    { id: "c2-b-plate", query: "look up who owns a plate legally", timestamp: "2025-10-28T04:02:00" },
    { id: "c2-b-preferences", query: "can a rider choose driver gender rideloop", timestamp: "2025-11-01T02:00:00", evidenceLabel: "She researched whether riders could target specific drivers" },
    { id: "c2-b-dashcam", query: "dash cam sd card keeps corrupting same hours", timestamp: "2025-11-02T13:30:00" },
    { id: "c2-b-insider", query: "rideshare employee data abuse cases", timestamp: "2025-11-03T03:44:00", evidenceLabel: "Search: cases of platform insiders abusing driver location data" },
    { id: "c2-b-offapp", query: "rider texted my real number how did he get it", timestamp: "2025-11-02T03:10:00" },
    { id: "c2-b-police", query: "what evidence do police need for stalking charge", timestamp: "2025-11-05T15:20:00" },
    { id: "c2-b-vanwinkle", query: "van winkle court dead end how long to turn around", timestamp: "2025-11-07T02:51:00", evidenceLabel: "Her last search, 7 minutes before the end: how to turn around at Van Winkle Court" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "TripCalc",
    revealAfterClueIds: ["c2-th-priya", "c2-n-log"],
    title: "RL·Ops — Shadow Client",
    heading: "Session: PASSENGER_0",
    body:
      "Internal fleet-ops build. Not for distribution.\n\nDriver telemetry: LIVE. This client does not appear in RideLoop's audit logs.\n\nWatched driver: QUIST, M. (Night Tier Q3)",
    entries: [
      { label: "Location stream", status: "● LIVE", detail: "updates every 4s, driver app on or off" },
      { label: "Break pattern model", status: "TRAINED", detail: "02:40 depot stop — confidence 96%" },
      { label: "Home geofence", status: "SET", detail: "Fenwick Ave · alert on arrival" },
      { label: "Trip injection", status: "ENABLED", detail: "34 requests routed · 34 accepted" },
      { label: "Rating adjustment", status: "USED (1)", detail: "june incident · applied -1★" },
      { label: "Dash cam sync", status: "PURGED ×9", detail: "card wiped on depot wifi" },
      { label: "Next watched driver", status: "QUEUED", detail: "P. NAND— (Night Tier Q2)" },
    ],
    footer:
      "This client was installed on the handset via the depot's public charging cable, 11 days before the driver's final shift. It was watching her through her own phone. The queued name is her friend's.",
    evidenceLabel: "A shadow ops client on HER phone — session “PASSENGER_0”, trip injection enabled",
  },

  liveEvents: [
    {
      id: "c2-live-rating",
      kind: "notification",
      afterSeconds: 300,
      title: "RideLoop",
      body: "Your rating has changed. New rating: 5.00 ★",
      glitch: true,
    },
    {
      id: "c2-live-unknown",
      kind: "message",
      afterSeconds: 560,
      threadId: "c2-th-unknown",
      message: {
        id: "c2-m-unk-live",
        from: "them",
        text: "are you her brother? her mother? or just someone with the phone. it doesn't matter. you park nose out too.",
        timestamp: "2025-11-09T23:19:00",
        evidenceLabel: "A message to whoever is reviewing the phone: “you park nose out too”",
      },
    },
  ],

  verdicts: [
    {
      id: "c2-v-left",
      label: "She drove away from her own life",
      description: "The card used down south, a GPS fix heading west at highway speed, nine grand saved. People break.",
      requiredEvidenceIds: ["c2-m-bk-2", "c2-pin-after", "c2-ph-cash"],
      isCanon: false,
      epilogue:
        "You write it as voluntary: burnout, night shifts, a woman two months from freedom who decided not to wait. The card activity supports it. The highway-speed fix supports it.\n\nThe soup Sunday doesn't. The dinosaur birthday present, already wrapped in her closet, doesn't. The card stops being used the week your report is accepted, as if it had only ever needed you to believe it.\n\nSam keeps paying to keep her number active. Once a month he calls it just to hear the greeting. In February the greeting changes. Nobody at the carrier can explain that, and Sam stops calling.",
    },
    {
      id: "c2-v-passenger",
      label: "PASSENGER_0 took her",
      description: "Someone with inside access hunted her through her own phone — injected trips, wiped cameras, adjusted ratings — and finally requested her to a dead end.",
      requiredEvidenceIds: ["case-02.hidden", "c2-m-unk-3", "c2-ph-sedan", "c2-vm-priya", "c2-pin-vanwinkle"],
      isCanon: true,
      epilogue:
        "Your report names the mechanism, because the mechanism is all anyone ever finds. A shadow ops client, sideloaded through a public charging cable at the depot she felt safest in. Thirty-four injected trips. Nine wiped dash-cam cards. A rating docked to keep her scared of the platform instead of protected by it.\n\nRideLoop confirms the build is real and internal, then confirms nothing else, then settles with the family under seal. The employee list for the tool comes back with one entry redacted for 'ongoing separation proceedings.' The name never unredacts. The gray sedan's plate — 40-something-83 — matches nothing, which is its own kind of answer: plates that match nothing are issued to somebody.\n\nMara is not found. Priya quits nights, then quits driving, then moves. On her last shift, one final request pinged her from Van Winkle Court and cancelled itself before she could decline it. Five stars, it said. Trip complete.",
    },
    {
      id: "c2-v-carjack",
      label: "A carjacking that went wrong",
      description: "Wrong street, wrong hour, a stranger with no pattern at all. The window job was a first attempt.",
      requiredEvidenceIds: ["c2-ph-window", "c2-ph-culdesac", "c2-m-gl-3"],
      isCanon: false,
      epilogue:
        "Random predation: the tampered window as a failed first try, the dead end as an ambush of opportunity. It's clean, it fits on one page, and the detective who signs off on it has thirty years and a bad shoulder and has seen it a hundred times.\n\nExcept nothing was taken. Not the car, not the wallet, not the $61 in the console. And random strangers don't text their victims 'five stars' on a 24-hour delay, to the minute, like an anniversary.\n\nThe file stays open in the way files stay open — technically. You think about the humming voicemail more than you'd like. There was a witness who said she heard humming on Van Winkle that night. You never interviewed her. The report was already signed.",
    },
    {
      id: "c2-v-unknown",
      label: "The evidence contradicts itself",
      description: "A phone that called itself from an evidence bag. Headlights with no car. A surge zone on her own street.",
      requiredEvidenceIds: ["c2-vm-self", "c2-ph-mirror-shot", "c2-ph-heatmap"],
      isCanon: false,
      epilogue:
        "You write the version nobody upstairs wants: the data is not a record of events, because some of these events cannot have occurred. A handset called itself from inventory. A rearview photo shows light with no source. A demand algorithm drew a bullseye on a driver's home and no one can produce the inputs.\n\nThe response is a meeting where the word 'telemetry' is used the way people use garlic against vampires. Your section 3 is moved to an appendix. The appendix is moved to storage.\n\nYears on, a class action against RideLoop surfaces internal tickets about 'phantom sessions' in the ops tooling — sessions with no badge, no IP, no employee. The tickets are real. The sessions were never attributed. The tool was retired, not because they found who was inside it, but because they couldn't.",
    },
  ],
};

export default c2;
