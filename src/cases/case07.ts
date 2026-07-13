import type { CaseFile } from "../types";
import { photoSvg, figure, doorway, blurStreak, timestampBurn } from "../photoart";

/**
 * CASE 07 — LAST DELIVERY
 * Andre Boudreaux, 29. Night courier for the Fleetly app. His route log
 * shows thirty-four deliveries to 1148 Verge Road. There is no 1148 Verge
 * Road. His van came back to the depot without him, parked perfectly,
 * carrying forty-seven packages addressed to the place that isn't there.
 */

const c7: CaseFile = {
  id: "case-07",
  title: "Last Delivery",
  victimName: "Andre Boudreaux, 29",
  summary:
    "A night-shift courier kept getting routed to an address that exists only in his app — a gravel turnout between 1146 and 1150 Verge Road. He delivered there thirty-four times. On the thirty-fifth, his van returned to the depot without him, loaded with packages for the address that isn't there.",
  intake:
    "SUBJECT: Boudreaux, Andre M. (29). Reported missing by fiancée Dec 4 after failing to return from a night route.\n\nVEHICLE: Fleetly van #221 found Dec 4, 05:50, parked in its assigned depot bay, locked, keys in ignition, engine cold. Cargo: 47 packages, uniform weight class, all addressed to 1148 VERGE RD. County GIS confirms no such parcel exists; the location resolves to an unimproved turnout and drainage culvert.\n\nDEVICE: Recovered from the van's dash mount. Battery 58%. Final route session still open: 34 of 35 stops complete. Stop 35: 1148 Verge Rd, status 'ARRIVED', never marked delivered.\n\nPLATFORM: Fleetly states 1148 Verge Rd 'does not appear in our address database' and that van #221's return to depot 'is not reflected in our telematics.' The van drove back. Nothing recorded it driving back.\n\nSecond-pass review requested. The 47 packages are in evidence, unopened, pending a warrant nobody seems eager to sign.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "DRE — on route, voice text me",
    recoveredAt: "2025-12-05T22:00:00",
    batteryStart: 58,
    wallpaperHue: 132,
    lockScreenNotifications: [
      { appId: "messages", title: "Simone 💍", preview: "the depot called ME asking where the van was. andre. the van they have.", targetId: "c7-th-simone" },
      { appId: "messages", title: "1148 Verge (recipient)", preview: "you opened one.", targetId: "c7-th-recipient" },
      { appId: "phone", title: "Voicemail", preview: "KL5-0448 · 0:52", targetId: "c7-vm-exchange" },
    ],
  },

  messages: [
    {
      id: "c7-th-simone",
      contactName: "Simone 💍",
      contactNumber: "(504) 555-0181",
      messages: [
        { id: "c7-m-si-1", from: "them", text: "home by 6? I'm making the grits. the GOOD grits", timestamp: "2025-11-20T21:00:00" },
        { id: "c7-m-si-2", from: "owner", text: "for the good grits I will break several traffic laws", timestamp: "2025-11-20T21:12:00" },
        { id: "c7-m-si-3", from: "owner", text: "weird night. app sent me to the same address six times. six separate stops, same address, spread across the route like it didn't want me to notice", timestamp: "2025-11-24T04:30:00", evidenceLabel: "Six stops in one night, same address, spread out “like it didn't want me to notice”" },
        { id: "c7-m-si-4", from: "them", text: "same address six times?? is that allowed?", timestamp: "2025-11-24T09:15:00" },
        { id: "c7-m-si-5", from: "owner", text: "support says the address 'does not appear in their database.' babe I have DELIVERED to it. I get a bonus every time. $40 a drop, marked 'route adjustment gratuity'", timestamp: "2025-11-24T09:40:00", evidenceLabel: "$40 “gratuity” per ghost drop — pay for not asking" },
        { id: "c7-m-si-6", from: "them", text: "forty dollars to deliver boxes to nowhere. andre that's not a gratuity that's hush money with better branding", timestamp: "2025-11-24T09:44:00" },
        { id: "c7-m-si-7", from: "owner", text: "it's wedding-fund money is what it is. I don't ask the boxes questions, the boxes don't ask me questions", timestamp: "2025-11-24T09:50:00", evidenceLabel: "“I don't ask the boxes questions, the boxes don't ask me questions”" },
        { id: "c7-m-si-8", from: "owner", text: "simone. I did something dumb. I'll tell you at breakfast. don't let me not tell you", timestamp: "2025-12-02T05:40:00", evidenceLabel: "“I did something dumb. don't let me not tell you” — he never made breakfast" },
        { id: "c7-m-si-9", from: "them", text: "the depot called ME asking where the van was. andre. the van they have.", timestamp: "2025-12-04T08:20:00" },
      ],
    },
    {
      id: "c7-th-recipient",
      contactName: "1148 Verge (recipient)",
      messages: [
        { id: "c7-m-re-1", from: "them", text: "Delivery instructions: do not approach the culvert. leave at the rear step. knock twice on the rail. do not wait.", timestamp: "2025-11-21T23:50:00", evidenceLabel: "The recipient's standing instructions: the rear step, two knocks on the rail, don't wait" },
        { id: "c7-m-re-2", from: "owner", text: "there's no rear step at this location. there's no FRONT step. it's a turnout and a drain", timestamp: "2025-11-21T23:58:00" },
        { id: "c7-m-re-3", from: "them", text: "there is a rear step when there is a delivery.", timestamp: "2025-11-21T23:59:00", evidenceLabel: "“there is a rear step when there is a delivery.”" },
        { id: "c7-m-re-4", from: "owner", text: "whatever you say. left it, knocked twice. your neighborhood is a ditch btw", timestamp: "2025-11-22T00:08:00" },
        { id: "c7-m-re-5", from: "them", text: "received. the gratuity has been applied. you are our favorite so far.", timestamp: "2025-11-22T00:09:00", evidenceLabel: "“you are our favorite so far.” — so far" },
        { id: "c7-m-re-6", from: "them", text: "you opened one.", timestamp: "2025-12-03T23:41:00", evidenceLabel: "Sent at 11:41 PM on his last route: “you opened one.”" },
      ],
    },
    {
      id: "c7-th-rex",
      contactName: "Rex (Fleetly nights)",
      contactNumber: "(504) 555-0167",
      ghostTypingAfterSeconds: 400,
      messages: [
        { id: "c7-m-rx-1", from: "them", text: "you got verge road tonight? lucky. free forties", timestamp: "2025-11-25T22:15:00" },
        { id: "c7-m-rx-2", from: "owner", text: "wait YOU'VE had it too??", timestamp: "2025-11-25T22:20:00" },
        {
          id: "c7-m-rx-3",
          from: "them",
          text: "everybody on nights gets a stretch of it. few weeks of verge, forties pile up, then it moves to the next guy. delray had it before you. you seen delray lately? me neither. transferred, they said",
          timestamp: "2025-11-25T22:26:00",
          evidenceLabel: "Rex: every night driver “gets a stretch” of Verge Road — Delray had it last, then vanished",
        },
        { id: "c7-m-rx-4", from: "owner", text: "rex what's IN the boxes", timestamp: "2025-11-25T22:30:00" },
        { id: "c7-m-rx-5", from: "them", text: "the forty dollars is FOR not knowing, dre. cheapest job requirement in america. don't be expensive", timestamp: "2025-11-25T22:32:00", evidenceLabel: "“the forty dollars is FOR not knowing. don't be expensive.”" },
        { id: "c7-m-rx-6", from: "them", text: "you weren't at the depot. your van was tho. dre they're giving ME verge road starting tomorrow. answer your phone man", timestamp: "2025-12-04T21:10:00", evidenceLabel: "The day after: Verge Road reassigned to Rex" },
      ],
    },
    {
      id: "c7-th-fleetly",
      contactName: "Fleetly Support",
      messages: [
        { id: "c7-m-fl-1", from: "owner", text: "Reporting a routing error: stop '1148 Verge Rd' is not a real address. I've been routed there 20+ times.", timestamp: "2025-11-26T10:00:00" },
        { id: "c7-m-fl-2", from: "them", text: "Fleetly: Thanks for reaching out! We checked and 1148 Verge Rd does not appear in our address database. No action needed! 📦", timestamp: "2025-11-26T10:02:00", evidenceLabel: "Fleetly: the address he'd delivered to 20 times “does not appear in our database”" },
        { id: "c7-m-fl-3", from: "owner", text: "it's on MY route SCREEN right now. I can screenshot it", timestamp: "2025-11-26T10:05:00" },
        { id: "c7-m-fl-4", from: "them", text: "Fleetly: We're unable to view driver route screens. For quality assurance, please do not screenshot the route screen, per your carrier agreement §14.2. Anything else? 📦", timestamp: "2025-11-26T10:06:00", evidenceLabel: "Fleetly citing the clause that forbids screenshotting the route screen" },
        { id: "c7-m-fl-5", from: "them", text: "Fleetly: Your route adjustment gratuities this period: $1,360. Great hustle! 📦", timestamp: "2025-12-01T09:00:00" },
      ],
    },
    {
      id: "c7-th-theo",
      contactName: "Theo (brother)",
      contactNumber: "(504) 555-0143",
      messages: [
        { id: "c7-m-te-1", from: "them", text: "ring shopping saturday. I found three places. wear the shirt that makes you look employed", timestamp: "2025-11-28T13:00:00" },
        { id: "c7-m-te-2", from: "owner", text: "wedding fund is at 4800. verge road is paying for simone's ring, which is either romantic or cursed", timestamp: "2025-11-28T13:20:00", evidenceLabel: "The ghost stops were funding the engagement ring" },
        { id: "c7-m-te-3", from: "them", text: "take the money and stop narrating it, that's my advice", timestamp: "2025-11-28T13:22:00" },
        { id: "c7-m-te-4", from: "owner", text: "theo. hypothetical. if a man found out what he was delivering, and it was bad, what's the move. hypothetically", timestamp: "2025-12-02T06:10:00", evidenceLabel: "To his brother: “if a man found out what he was delivering, and it was bad, what's the move”" },
        { id: "c7-m-te-5", from: "them", text: "the move is you call me before your shift. TODAY andre", timestamp: "2025-12-02T08:30:00" },
        { id: "c7-m-te-6", from: "them", text: "you didn't call", timestamp: "2025-12-03T21:00:00" },
      ],
    },
    {
      id: "c7-th-mom",
      contactName: "Mama",
      contactNumber: "(504) 555-0107",
      messages: [
        { id: "c7-m-mo-1", from: "them", text: "Sunday dinner. Bring Simone. I'm making a roast and I expect witnesses.", timestamp: "2025-11-30T11:00:00" },
        { id: "c7-m-mo-2", from: "owner", text: "we'll be there mama. save me the end piece", timestamp: "2025-11-30T11:25:00" },
        { id: "c7-m-mo-3", from: "them", text: "You looked skinny at dinner. Night work eats the body, baby. When's this route of yours done?", timestamp: "2025-12-01T10:00:00" },
        { id: "c7-m-mo-4", from: "owner", text: "two more weeks and I'm done with nights forever. got a good reason to be a day person now 💍🤫", timestamp: "2025-12-01T10:30:00" },
      ],
    },
    {
      id: "c7-th-dispatch",
      contactName: "Fleetly Dispatch",
      messages: [
        { id: "c7-m-di-1", from: "them", text: "ROUTE 6N assigned. 35 stops. Note: route adjustments accepted on your behalf per your gratuity enrollment.", timestamp: "2025-12-03T21:30:00", evidenceLabel: "His last route: adjustments “accepted on your behalf”" },
        { id: "c7-m-di-2", from: "owner", text: "I didn't enroll in accepting adjustments automatically??", timestamp: "2025-12-03T21:35:00" },
        { id: "c7-m-di-3", from: "them", text: "ROUTE 6N updated: stop 35 of 35 — 1148 VERGE RD. Special handling: driver unload, full cargo. Do not wait.", timestamp: "2025-12-03T21:36:00", evidenceLabel: "Stop 35, added by no one: FULL CARGO unload at 1148 Verge Rd" },
      ],
    },
    {
      id: "c7-th-super",
      contactName: "Mr. Aldous (super)",
      contactNumber: "(504) 555-0139",
      messages: [
        { id: "c7-m-su-1", from: "them", text: "your package from Tuesday is in my office, too big for the boxes", timestamp: "2025-11-19T14:00:00" },
        { id: "c7-m-su-2", from: "owner", text: "the irony of a delivery driver missing his own delivery. coming down", timestamp: "2025-11-19T14:15:00" },
        { id: "c7-m-su-3", from: "them", text: "also a man came by asking which unit was yours. didn't like his questions so I gave him wrong answers. thought you should know", timestamp: "2025-12-02T16:40:00", evidenceLabel: "A man asked the super which unit was Andre's — the day he texted “I did something dumb”" },
      ],
    },
    {
      id: "c7-th-tacos",
      contactName: "Taco Bruja 🌮",
      messages: [
        { id: "c7-m-ta-1", from: "them", text: "TACO BRUJA: 2am special for the night people. you know who you are 🌮", timestamp: "2025-11-27T01:30:00" },
        { id: "c7-m-ta-2", from: "them", text: "TACO BRUJA: haven't seen the green van in a minute! al pastor misses you", timestamp: "2025-12-06T01:30:00" },
      ],
    },
    {
      id: "c7-th-unknown",
      contactName: "Unknown",
      messages: [
        { id: "c7-m-un-1", from: "them", text: "drivers deliver. favorites get to keep not knowing. you were the favorite.", timestamp: "2025-12-03T02:15:00", evidenceLabel: "“favorites get to keep not knowing. you WERE the favorite.”" },
        { id: "c7-m-un-2", from: "owner", text: "I resealed it. I don't know anything. I don't WANT to know anything. I'll finish the two weeks and I'm gone", timestamp: "2025-12-03T02:22:00", evidenceLabel: "Andre begging: “I resealed it… I'll finish the two weeks and I'm gone”" },
        { id: "c7-m-un-3", from: "them", text: "yes. tonight is your last stretch. full cargo. we'll take it from here.", timestamp: "2025-12-03T02:24:00", evidenceLabel: "“tonight is your last stretch. we'll take it from here.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c7-ph-van",
      caption: "van 221. my office. 60k miles of night on her",
      timestamp: "2025-11-18T21:45:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-18T21:45:00", device: "This phone", location: "Fleetly depot" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0e1013"/>` +
          `<rect x="70" y="110" width="260" height="110" rx="14" fill="#1d2b22"/>` +
          `<rect x="70" y="130" width="70" height="55" rx="8" fill="#131a16"/>` +
          `<circle cx="130" cy="230" r="22" fill="#07080b"/><circle cx="290" cy="230" r="22" fill="#07080b"/>` +
          `<text x="240" y="170" text-anchor="middle" font-family="monospace" font-size="18" fill="#4a6b55">221</text>` +
          `<rect x="0" y="252" width="400" height="6" fill="#0a0c0e"/>`,
        { aspect: "landscape", base: "#0b0d10", grain: 0.13 },
      ),
    },
    {
      id: "c7-ph-route",
      caption: "tonight's route. count how many times you see verge. I'll wait",
      timestamp: "2025-11-24T04:25:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-24T04:25:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0d1014"/>` +
          `<rect x="20" y="40" width="260" height="330" rx="10" fill="#12161c"/>` +
          `<text x="150" y="70" text-anchor="middle" font-family="monospace" font-size="11" fill="#5c8a6b">ROUTE 4N — 31 STOPS</text>` +
          Array.from({ length: 9 }, (_, i) => {
            const verge = [2, 4, 7].includes(i);
            return `<rect x="35" y="${85 + i * 30}" width="230" height="24" rx="4" fill="${verge ? "#1d2530" : "#161b21"}"/><text x="45" y="${101 + i * 30}" font-family="monospace" font-size="9" fill="${verge ? "#7a94b8" : "#4a5560"}">${verge ? "1148 VERGE RD" : ["214 LOWELL AVE", "88 CANAL ST", "…", "402 PALM CT", "17 RUE DUMAINE", "…"][i % 6]}</text>`;
          }).join(""),
        { aspect: "portrait", base: "#0a0c0f", grain: 0.1 },
      ),
      evidenceLabel: "His route screen: 1148 Verge Rd woven through the manifest, three times in nine stops",
    },
    {
      id: "c7-ph-turnout",
      caption: "'1148 verge road.' behold. the estate. the grounds",
      timestamp: "2025-11-22T00:05:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-22T00:05:00", device: "This phone", location: "Verge Rd" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#090b0d"/>` +
          `<rect y="200" width="400" height="100" fill="#101410"/>` +
          `<ellipse cx="200" cy="220" rx="150" ry="24" fill="#14171a"/>` +
          `<path d="M40 200 Q120 140 200 160 T 380 150" stroke="#0d1113" stroke-width="30" fill="none"/>` +
          `<rect x="150" y="180" width="100" height="40" rx="20" fill="#060809"/>` +
          `<path d="M60 120 L80 200 M340 110 L320 200" stroke="#0c0f0c" stroke-width="14"/>`,
        { aspect: "landscape", base: "#070909", grain: 0.17 },
      ),
      evidenceLabel: "1148 Verge Road: a gravel turnout, a culvert, and trees",
    },
    {
      id: "c7-ph-rail",
      caption: "the rail I knock on. someone's been knocking a LOT longer than me",
      timestamp: "2025-11-26T00:15:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-26T00:15:00", device: "This phone", location: "Verge Rd" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0b0d0e"/>` +
          `<rect x="40" y="140" width="220" height="18" rx="6" fill="#2a2e33"/>` +
          `<rect x="60" y="158" width="14" height="180" fill="#1d2126"/><rect x="226" y="158" width="14" height="180" fill="#1d2126"/>` +
          Array.from({ length: 14 }, (_, i) => `<ellipse cx="${70 + (i * 37) % 160}" cy="${146 + (i % 3) * 3}" rx="4" ry="2.5" fill="#3d4248" opacity="0.8"/>`).join("") +
          `<text x="150" y="320" text-anchor="middle" font-family="monospace" font-size="9" fill="#3d4653">dents. dozens. all in pairs.</text>`,
        { aspect: "portrait", base: "#090b0c", grain: 0.15 },
      ),
      evidenceLabel: "The guardrail: dozens of knock-dents, all in pairs, worn smooth with years",
    },
    {
      id: "c7-ph-package",
      caption: "standard verge box. no return address. label printed on a machine older than me. always exactly 9.9 lbs",
      timestamp: "2025-11-28T23:40:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-28T23:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101114"/>` +
          `<rect x="60" y="120" width="180" height="160" fill="#3a3226"/>` +
          `<rect x="60" y="120" width="180" height="160" fill="none" stroke="#2a2419" stroke-width="3"/>` +
          `<path d="M60 200 h180" stroke="#2a2419" stroke-width="5"/>` +
          `<rect x="90" y="150" width="120" height="40" fill="#cfc7b2" opacity="0.85"/>` +
          `<text x="150" y="168" text-anchor="middle" font-family="monospace" font-size="9" fill="#2a2620">1148 VERGE RD</text>` +
          `<text x="150" y="182" text-anchor="middle" font-family="monospace" font-size="8" fill="#55503f">9.9 LB · NO SIGNATURE</text>`,
        { aspect: "portrait", base: "#0c0d10", grain: 0.12 },
      ),
      evidenceLabel: "A Verge box: no return address, no signature required, always 9.9 lbs exactly",
    },
    {
      id: "c7-ph-rain",
      caption: "3am rain shift. the wipers keep time and the city keeps secrets. I'm a poet now, it's the sleep deprivation",
      timestamp: "2025-11-30T03:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-30T03:10:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0a0d12"/>` +
          Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 71) % 400}" cy="${(i * 47) % 300}" r="${2 + (i % 3)}" fill="#1f2a38" opacity="0.6"/>`).join("") +
          `<circle cx="120" cy="120" r="26" fill="#3d3222" opacity="0.35"/>` +
          `<circle cx="290" cy="100" r="18" fill="#22303d" opacity="0.4"/>` +
          `<path d="M0 260 h400" stroke="#0d1015" stroke-width="40"/>` +
          blurStreak(200, 250, 120, "#16202b", 0.5),
        { aspect: "landscape", base: "#080a0e", grain: 0.14 },
      ),
    },
    {
      id: "c7-ph-depot",
      caption: "depot at dawn. 200 vans and every one of them looks tired",
      timestamp: "2025-11-25T06:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-25T06:20:00", device: "This phone", location: "Fleetly depot" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#12141a"/>` +
          `<rect y="70" width="400" height="60" fill="#1a1d24"/>` +
          Array.from({ length: 6 }, (_, i) => `<rect x="${15 + i * 65}" y="170" width="52" height="42" rx="8" fill="#1c2a21"/><circle cx="${28 + i * 65}" cy="215" r="9" fill="#0a0c0e"/><circle cx="${54 + i * 65}" cy="215" r="9" fill="#0a0c0e"/>`).join("") +
          `<circle cx="350" cy="50" r="30" fill="#4a3a2c" opacity="0.4"/>`,
        { aspect: "landscape", base: "#0e1015", grain: 0.13 },
      ),
    },
    {
      id: "c7-ph-ringbudget",
      caption: "the folder theo is NOT allowed to see. (theo if you're seeing this, act surprised in june)",
      timestamp: "2025-11-28T14:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-28T14:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#131117"/>` +
          `<rect x="55" y="80" width="190" height="240" rx="8" fill="#d8d2c2" opacity="0.9"/>` +
          `<text x="150" y="115" text-anchor="middle" font-family="serif" font-size="13" fill="#2a2620">RING FUND 💍</text>` +
          `<text x="80" y="150" font-family="monospace" font-size="11" fill="#4a4436">saved: $4,800</text>` +
          `<text x="80" y="175" font-family="monospace" font-size="11" fill="#4a4436">goal: $6,000</text>` +
          `<text x="80" y="210" font-family="monospace" font-size="10" fill="#55503f">verge forties: $1,360</text>` +
          `<text x="80" y="245" font-family="monospace" font-size="10" fill="#7a3a42">3 more weeks of nowhere</text>` +
          `<circle cx="150" cy="290" r="18" fill="none" stroke="#8a7c48" stroke-width="3"/>` +
          `<circle cx="150" cy="276" r="5" fill="none" stroke="#8a7c48" stroke-width="2"/>`,
        { aspect: "portrait", base: "#0e0c11", grain: 0.1 },
      ),
      evidenceLabel: "The ring fund: “3 more weeks of nowhere” — he was almost done",
    },
    {
      id: "c7-ph-culvert",
      caption: "",
      timestamp: "2025-12-01T00:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-12-01T00:20:00", device: "This phone", location: "Verge Rd" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060708"/>` + blurStreak(200, 180, 90, "#101413", 0.4),
        { aspect: "landscape", base: "#050607", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0a0c0c"/>` +
            `<ellipse cx="200" cy="230" rx="160" ry="30" fill="#0f1310"/>` +
            doorway(160, 120, 80, 110, "#040606") +
            `<rect x="160" y="226" width="80" height="10" fill="#1a1e1b"/>` +
            `<text x="200" y="258" text-anchor="middle" font-family="monospace" font-size="9" fill="#44504a">a step. concrete. swept clean. it was not here on night one</text>` +
            figure(320, 220, 0.85, 0.55, "#040607") +
            figure(90, 225, 0.85, 0.45, "#040607") +
            timestampBurn("00:20:34", 400, 300),
          { aspect: "landscape", base: "#080a0a", grain: 0.13 },
        ),
      },
      evidenceLabel: "His flashlight shot of the culvert: a swept concrete step that “was not here on night one” — and watchers",
    },
    // ---- Recently Deleted ---------------------------------------------------
    {
      id: "c7-ph-opened",
      caption: "",
      timestamp: "2025-12-02T05:15:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-12-02T05:15:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#101114"/>` +
          `<rect x="50" y="100" width="200" height="180" fill="#3a3226"/>` +
          `<path d="M50 100 L110 60 L250 60 L250 100" fill="#2c2419"/>` +
          `<rect x="70" y="130" width="160" height="120" fill="#0d0e11"/>` +
          Array.from({ length: 6 }, (_, i) => `<rect x="${85 + (i % 3) * 50}" y="${145 + Math.floor(i / 3) * 55}" width="36" height="44" rx="6" fill="#c9c2b0" opacity="0.85"/><rect x="${93 + (i % 3) * 50}" y="${152 + Math.floor(i / 3) * 55}" width="20" height="8" fill="#7a7462"/>`).join("") +
          `<text x="150" y="320" text-anchor="middle" font-family="monospace" font-size="9" fill="#5c5648">no labels. not one label. who ships medicine with no labels</text>`,
        { aspect: "portrait", base: "#0c0d10", grain: 0.14 },
      ),
      evidenceLabel: "The deleted photo: inside a Verge box — unlabeled pill bottles, dozens, packed like eggs",
    },
    {
      id: "c7-ph-dashcam",
      caption: "",
      timestamp: "2025-12-04T01:38:00",
      aspect: "landscape",
      deleted: true,
      meta: {
        takenAt: "2025-12-04T01:38:00",
        editedAt: "2025-12-04T05:52:00",
        device: "Van 221 dash cam (auto-sync)",
        location: "—",
      },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0b0d0f"/>` +
          `<path d="M0 240 L400 240" stroke="#11151a" stroke-width="60"/>` +
          `<path d="M180 240 L200 120 L220 240" fill="#0e1114" opacity="0.9"/>` +
          `<circle cx="200" cy="100" r="30" fill="#1d2b22" opacity="0.3"/>` +
          `<rect x="0" y="0" width="400" height="24" fill="#000"/>` +
          `<text x="10" y="16" font-family="monospace" font-size="10" fill="#3fa06b">VAN 221 · 01:38:11 · GPS: NO FIX</text>` +
          figure(200, 220, 1.0, 0.5, "#05070a"),
        { aspect: "landscape", base: "#090b0d", grain: 0.18 },
      ),
      evidenceLabel: "Dash cam frame, auto-synced: the van driving at 1:38 AM, GPS NO FIX, driver's seat visible — and empty",
    },
  ],

  notes: [
    {
      id: "c7-n-log",
      title: "verge road log",
      timestamp: "2025-12-02T06:00:00",
      evidenceLabel: "His delivery log: 34 drops to a place that isn't a place",
      body:
        "keeping count because nobody else is.\n\ndrops to 1148 verge: 34 (as of dec 2)\ngratuities: $1,360\nboxes: always 9.9 lbs. always the same tape. always 'received' within 90 seconds of me pulling away. there is nobody there. there is never anybody there.\n\nthings I've noticed:\n- the step. there's a concrete step by the culvert now. clean. no step on night one, I have photos.\n- the rail dents come in pairs. mine are the newest of DOZENS.\n- the app shows 1148 on my screen but support can't see it. so somebody's writing stops into my route between dispatch and my screen. that's not a glitch. that's a door someone props open every night.\n- delray drove this before me. delray's number is disconnected. rex says 'transferred.' fleetly HR says delray 'is not and has never been an associate.'\n\ndec 2, 5am. I did the dumb thing. box #34 had a torn corner, barely, and I. okay. I opened it. photographed it. resealed it with THEIR tape (kept a roll from a drop where the tape came loose). pills. hundreds of bottles, zero labels. I don't know what they are and I don't want to. two more weeks, then the ring, then days forever.\n\nif I need to write anything else down it goes in the locked one. code is the address. the whole problem is the address.",
    },
    {
      id: "c7-n-locked",
      title: "if I don't clock out",
      timestamp: "2025-12-03T21:50:00",
      lock: {
        code: "1148",
        hintText: "“code is the address. the whole problem is the address.” — the stop that doesn't exist.",
        clueSourceIds: ["c7-n-log", "c7-th-recipient"],
      },
      evidenceLabel: "The locked note, written 40 minutes before his last route",
      body:
        "9:50pm. route starts at 10. writing this fast.\n\nthey know. the text last night said 'you opened one.' tonight's route has ONE verge stop and it's stop 35 — the LAST one — and it says FULL CARGO, driver unload. 47 boxes. they've never taken more than 3 a night. they're not restocking. they're closing.\n\nand the 'adjustment' was accepted 'on my behalf.' I never enrolled in that. somebody inside fleetly's pipe accepts these for us. finds the drivers who need money, feeds them forties, rotates them out when they get curious. delray got curious. 'transferred.'\n\nplan, because simone says I always need a plan:\n1. run the route normal, stops 1-34.\n2. at verge: unload HALF, stay in the headlights, knock twice, leave. engine running the whole time.\n3. tomorrow: theo's cop friend gets the photo, the log, the tape roll, everything. all of it's backed up in the cloud folder marked TAXES 2023 because nobody, criminal or cop, has ever willingly opened a folder marked taxes.\n4. two weeks notice, effective the second the ring is on her finger.\n\nif I don't clock out: the folder. taxes 2023. password is simone's birthday and she'll know which one.\n\nit's a good plan. it's a good plan. the last guy probably had a good plan too. — dre",
    },
    {
      id: "c7-n-vows",
      title: "vows (draft 1, terrible)",
      timestamp: "2025-11-29T02:30:00",
      body: "simone. you are the only address I've never needed directions to.\n\n(no. worse than terrible. she'd laugh though. keep the laugh, fix the line.)\n\nyou are the end of every route.\n\n(better. still cheesy. she said yes to cheesy technically. she said yes to ME.)",
    },
    {
      id: "c7-n-vanstuff",
      title: "van 221 quirks",
      timestamp: "2025-10-15T20:00:00",
      body: "- heater: works if you believe in it\n- left mirror: loose, tighten tuesdays\n- radio: gets one station clearly after midnight. it's zydeco. this is non-negotiable per the van\n- glovebox: registration, granola bars, simone's spare scrunchie (do not remove, it's load-bearing)",
    },
  ],

  voicemails: [
    {
      id: "c7-vm-simone",
      callerLabel: "Simone 💍",
      callerNumber: "(504) 555-0181",
      timestamp: "2025-12-04T09:00:00",
      durationSec: 28,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Andre Michel Boudreaux. Your van is at the depot and you are not in it and your mama is calling me and I am calm. I am SO calm. Baby, whatever the dumb thing was, breakfast is still on the table. It's cold. I don't care. Come eat cold grits and tell me the dumb thing. Please.”",
    },
    {
      id: "c7-vm-theo",
      callerLabel: "Theo (brother)",
      callerNumber: "(504) 555-0143",
      timestamp: "2025-12-04T22:30:00",
      durationSec: 26,
      tone: "plain",
      evidenceLabel: "Theo found the TAXES 2023 folder — exactly where Andre's note said",
      transcript:
        "[automated transcript — audio partially recovered]\n“It's me. Simone gave me your laptop. Dre — 'taxes 2023.' I found it. All of it. The photo, the log, the— I'm taking it to Marcel at the district TONIGHT, and then I'm coming to find you, and when I find you I'm going to hug you and then I am going to END you for not calling me before your shift. Hold on, little brother.”",
    },
    {
      id: "c7-vm-fleetly",
      callerLabel: "Fleetly (automated)",
      timestamp: "2025-12-04T10:00:00",
      durationSec: 19,
      tone: "static",
      evidenceLabel: "Fleetly's system: route 6N “completed” — all 35 stops",
      transcript:
        "[automated transcript]\n“Hello! This is Fleetly with your route summary. Route 6-N: completed! 35 of 35 stops delivered. Customer satisfaction: excellent. A gratuity of $40.00 has been applied 47 times. Great hustle! Your next shift begins… [remainder unrecoverable]”",
    },
    {
      id: "c7-vm-recipient",
      callerLabel: "No Caller ID",
      timestamp: "2025-12-03T23:55:00",
      durationSec: 22,
      tone: "distorted",
      evidenceLabel: "A voicemail three minutes before his arrival at Verge Rd: instructions for the last delivery",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“final instructions. reverse to the rail. lights off for this one. all forty-seven. the step will hold the weight. it holds any weight. do not wait — [pause] — actually. tonight, you may wait.”",
    },
    {
      id: "c7-vm-exchange",
      callerLabel: "KL5-0448",
      timestamp: "2025-12-05T01:38:00",
      durationSec: 52,
      tone: "breathing",
      evidenceLabel: "A 52-second call from a phone exchange retired in 1987 — someone counting to forty-seven",
      transcript:
        "[automated transcript — one speaker detected]\n[gravel underfoot. night insects. a vehicle idling, far off]\n[a voice, unhurried, counting: “…forty-four. forty-five. forty-six.”]\n[a long pause]\n[“forty-seven.”]\n[two knocks on metal]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: originating exchange (KL5) was retired from the numbering plan in 1987. The van's 47 packages were not counted by investigators until 09:40 on Dec 5 — eight hours after this message counted them.",
    },
  ],

  calendarEvents: [
    { id: "c7-cal-shift", title: "route (nights) 🚚", date: "2025-11-17", time: "22:00", recurring: "daily", createdBy: "owner" },
    { id: "c7-cal-rings", title: "ring shopping w/ theo 💍🤫", date: "2025-12-06", time: "11:00", createdBy: "owner", evidenceLabel: "Ring shopping, booked for the Saturday he never reached" },
    { id: "c7-cal-dinner", title: "dinner @ mama's (roast!!)", date: "2025-12-07", time: "13:00", recurring: "weekly", createdBy: "owner" },
    {
      id: "c7-cal-adjust",
      title: "route adjustment — accept all",
      date: "2025-11-21",
      time: "21:55",
      recurring: "daily",
      createdBy: "unknown",
      detail: "Created the night of his first Verge drop. No account. Fleetly says calendar integration 'is not a feature we offer.'",
      evidenceLabel: "A nightly “accept all adjustments” event — created by no one, the night the forties started",
    },
    { id: "c7-cal-notice", title: "two weeks notice (after 💍)", date: "2025-12-20", time: "09:00", createdBy: "owner", evidenceLabel: "His planned resignation: Dec 20, the day after the ring" },
  ],

  locationPins: [
    { id: "c7-pin-depot1", label: "Fleetly depot — shift start", timestamp: "2025-12-03T22:00:00", x: 20, y: 25 },
    { id: "c7-pin-stops", label: "Stops 1–20 (normal route)", timestamp: "2025-12-03T23:30:00", x: 45, y: 40 },
    { id: "c7-pin-tacos", label: "Taco Bruja (break)", timestamp: "2025-12-04T00:45:00", x: 55, y: 55 },
    { id: "c7-pin-stops2", label: "Stops 21–34", timestamp: "2025-12-04T01:10:00", x: 68, y: 48 },
    {
      id: "c7-pin-verge",
      label: "1148 Verge Rd — stop 35",
      timestamp: "2025-12-04T01:22:00",
      x: 88,
      y: 80,
      detail: "ARRIVED at 01:22. The session never advanced. The phone remained here, stationary, until 01:38 — then nothing for four hours.",
      evidenceLabel: "Stop 35: ARRIVED 01:22 — never delivered, never departed",
    },
    {
      id: "c7-pin-depotreturn",
      label: "Fleetly depot — van's return",
      timestamp: "2025-12-04T05:50:00",
      x: 20,
      y: 25,
      detail: "The next fix: the depot, 05:50, van parked in its bay. No route data exists between Verge Rd and here. The drive takes 22 minutes. The gap is four hours. The van returned with MORE packages than it left with.",
      evidenceLabel: "A four-hour gap, then the depot — the van returned carrying 47 boxes it never picked up",
    },
  ],

  browserHistory: [
    { id: "c7-b-address", query: "1148 verge road", timestamp: "2025-11-22T00:30:00", evidenceLabel: "His first search for the address: zero results, on every map service" },
    { id: "c7-b-gps", query: "gps takes me to address that isn't on any map", timestamp: "2025-11-23T02:15:00" },
    { id: "c7-b-forum", query: "fleetly driver forum ghost stops gratuity", timestamp: "2025-11-25T10:30:00", evidenceLabel: "The driver forum: every “ghost stops” thread locked by moderators within hours" },
    { id: "c7-b-delray", query: "delray thibodeaux fleetly driver", timestamp: "2025-11-26T11:00:00", evidenceLabel: "He searched for Delray — the driver who had Verge Road before him" },
    { id: "c7-b-pills", query: "unmarked white pill bottles no label bulk what are they", timestamp: "2025-12-02T05:40:00" },
    { id: "c7-b-accomplice", query: "am I an accomplice if I didn't know what I was delivering", timestamp: "2025-12-02T06:20:00", evidenceLabel: "Search after opening the box: “am I an accomplice if I didn't know”" },
    { id: "c7-b-tipline", query: "state police narcotics tip line anonymous", timestamp: "2025-12-02T06:25:00" },
    { id: "c7-b-quit", query: "how to quit fleetly without penalty mid contract", timestamp: "2025-12-03T20:45:00", evidenceLabel: "His last search, an hour before the route: how to quit" },
  ],

  hiddenApp: {
    disguiseIcon: "calculator",
    disguiseLabel: "LoadCalc",
    revealAfterClueIds: ["c7-th-rex", "c7-n-log"],
    title: "VERGE — Routing Console",
    heading: "Injection node · district 6",
    body:
      "It presents as a cargo-weight calculator. It came pre-installed on the phone Fleetly issued him — and, per the driver forum's locked threads, on every night phone in district 6.\n\nIt is the door someone props open between dispatch and the driver's screen.",
    entries: [
      { label: "Ghost stops — active", status: "4 ADDRESSES", detail: "1148 VERGE · 300B CANAL SPUR · 77 LEVEE GAP · 0 ISLE ST" },
      { label: "Drops routed — YTD", status: "1,204", detail: "all marked received · avg 88 sec" },
      { label: "Driver: D. THIBODEAUX", status: "ROTATED OUT 10/29", detail: "curiosity flag · 61 drops" },
      { label: "Driver: A. BOUDREAUX", status: "ROTATED OUT 12/04", detail: "curiosity flag · opened cargo · 35 drops" },
      { label: "Driver: R. KOWALCZYK", status: "ASSIGNED 12/05", detail: "financial profile: suitable · begins tonight" },
      { label: "Gratuity ledger", status: "BALANCED", detail: "source account: FLEETLY DISTRICT 6 PETTY — sub 0448" },
      { label: "Cargo class 9.9", status: "MANIFEST SEALED", detail: "contents: per agreement · do not test" },
    ],
    footer:
      "The gratuities come out of a Fleetly petty account. The rotation list reads like payroll. Rex starts tonight. Whatever 'rotated out' means, the console spells it the way payroll spells everything: quietly, in the passive voice, with the driver as the object of the sentence.",
    evidenceLabel: "The routing console: ghost addresses, a driver rotation ledger — Andre “ROTATED OUT 12/04,” Rex assigned next",
  },

  liveEvents: [
    {
      id: "c7-live-recipient",
      kind: "message",
      afterSeconds: 340,
      threadId: "c7-th-recipient",
      message: {
        id: "c7-m-re-live",
        from: "them",
        text: "the route is open again. whoever is reading: no experience necessary. the pay is forty.",
        timestamp: "2025-12-05T22:06:00",
        evidenceLabel: "The recipient, to whoever reads the thread now: “the route is open again. the pay is forty.”",
      },
    },
    {
      id: "c7-live-dispatch",
      kind: "notification",
      afterSeconds: 640,
      title: "Fleetly Dispatch",
      body: "ROUTE 6N assigned. 35 stops. Adjustments accepted on your behalf.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c7-v-ran",
      label: "He took the cargo and ran",
      description: "A man three weeks from a ring, sitting on a van full of unmarked product worth more than any wedding. Temptation has a weight class too.",
      requiredEvidenceIds: ["c7-ph-ringbudget", "c7-ph-opened", "c7-m-si-7"],
      isCanon: false,
      epilogue:
        "You test the cynical read: he knew what the boxes were worth, and stop 35 — full cargo, no witnesses — was the score of a lifetime. Men have vanished for less than a van of product.\n\nIt collapses on arithmetic. The van came BACK — with the cargo, plus boxes it never picked up. Thieves don't return the merchandise with interest. And the cloud folder — TAXES 2023, surrendered by his brother the same week — is not the work of a man planning a heist. It's the work of a man building a witness statement he expected to survive long enough to give.\n\nThe ring fund sits untouched at $4,800. In June, on what would have been the date, Simone withdraws it and gives it to Mama Boudreaux. Neither of them will say for what. Some funds change purpose the way verdicts should have.",
    },
    {
      id: "c7-v-network",
      label: "The Verge network rotated him out",
      description: "Someone inside Fleetly's pipe feeds ghost stops to broke night drivers, pays them in forties, and 'rotates out' the ones who get curious. Andre opened a box.",
      requiredEvidenceIds: ["case-07.hidden", "c7-m-re-6", "c7-ph-opened", "c7-m-un-3", "c7-n-locked"],
      isCanon: true,
      epilogue:
        "Your report draws the machine whole: a routing console wedged between dispatch and the drivers' screens, four ghost addresses, twelve hundred drops, gratuities drawn from Fleetly's own petty account — sub 0448 — and a rotation ledger that hires the desperate and retires the curious. Andre opened one box, and the ledger did what ledgers do.\n\nThe TAXES 2023 folder breaks it open. Warrants land on the 47 boxes, the console, the petty account. Three arrests: a district routing supervisor, a depot loader, a man with no job title whose phone contains the 'recipient' threads of nine drivers across four years. All three take pleas. None of the three will say where Andre is, and the sentencing judge notes for the record that all three seemed more afraid of the question than the sentence.\n\nWhat the pleas don't resolve, your report lists at the end, unflagged, because you've learned: the lab results on the pill bottles come back 'inconclusive — recommend no further testing,' twice, from two labs. Delray Thibodeaux stays missing. The concrete step at the culvert is jackhammered out by the county and is there again in the spring, swept clean. And 'route adjustment gratuities' start appearing that summer in a delivery app two states east — forty dollars a drop, an address that isn't on any map.\n\nRex quit the night before his first Verge run. He drives a school bus now. Days.",
    },
    {
      id: "c7-v-fleetly",
      label: "Fleetly is the network",
      description: "The console shipped on company phones. The forties came from a company account. Corporations don't get infiltrated by their own payroll.",
      requiredEvidenceIds: ["c7-m-fl-4", "c7-vm-fleetly", "c7-m-di-1"],
      isCanon: false,
      epilogue:
        "You write it up the chain instead of into it: the console is preinstalled, the gratuities are line items, the carrier agreement forbids drivers from photographing their own screens — §14.2, drafted by someone who knew exactly what would appear on those screens. This isn't a rat in the pipe. This is the pipe.\n\nFleetly's response is a masterclass: full cooperation, three terminations, a settlement with the family, and a 'comprehensive third-party audit' conducted by a firm that shares a mailing address with Fleetly's outside counsel. The audit finds 'isolated misconduct.' The stock recovers in a week.\n\nYou keep one artifact for yourself, in a drawer: the route summary voicemail. '35 of 35 stops delivered. Customer satisfaction: excellent.' The system counted Andre's last stop as complete. Somewhere in a database that no audit will ever be allowed to reach, something was delivered to 1148 Verge Road that night, and the customer was satisfied.",
    },
    {
      id: "c7-v-address",
      label: "The address took its delivery",
      description: "A step that exists only when there's a delivery. A dead exchange counting boxes eight hours early. A van that drove home with no one in it.",
      requiredEvidenceIds: ["c7-vm-exchange", "c7-ph-dashcam", "c7-ph-culvert", "c7-pin-depotreturn"],
      isCanon: false,
      epilogue:
        "You write the version that fits the physical evidence and nothing else: there is a place on Verge Road that exists at delivery time only, and it had been receiving for years before anyone thought to route a human into its arithmetic. The step that comes and goes. The rail dents in pairs, decades deep. The dash cam frame of van 221 driving itself home, GPS refusing to say from where. The counting voice on an exchange that died in 1987, inventorying the cargo before any living person did.\n\nThe report is not rejected. It is 'held pending reclassification,' which is the filing system's way of closing its eyes. The 47 boxes sit in evidence. The warrant to open them is signed, twice, and both times the signing judge's office calls to say the paperwork has been 'misrouted.' The word does a lot of work in this case. Everyone lets it.\n\nCounty road crews report that the turnout at 1146-to-1150 Verge measures nine feet longer some nights than others. The report recommends new survey markers. The markers go in. In the spring they're gone — not vandalized, not removed. Received.",
    },
  ],
};

export default c7;
