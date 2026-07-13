import type { CaseFile } from "../types";
import { photoSvg, doorway, figure, timestampBurn } from "../photoart";

/**
 * CASE 10 — THE WELLNESS RETREAT
 * Farrah Haddad, 34. ICU nurse, eleven years, burnt through. Booked ten
 * days at Stillpoint Ridge, a digital-detox retreat with no signal and a
 * wicker basket for your phone. Declared missing Nov 8. On Nov 10, her
 * phone — never recovered — synced one final batch to her cloud account:
 * nine photos and three voice memos, uploaded from a meadow that the
 * retreat's own maps insist does not exist.
 */

const c10: CaseFile = {
  id: "case-10",
  title: "The Wellness Retreat",
  victimName: "Farrah Haddad, 34",
  summary:
    "A burnt-out nurse surrendered her phone at a no-signal wellness retreat and vanished three days before checkout. Two days after she was declared missing, her phone synced one last batch of photos and voice memos — from a location the retreat says isn't on their property. The phone itself has never been found.",
  intake:
    "SUBJECT: Haddad, Farrah N. (34). Booked at Stillpoint Ridge Retreat Oct 26 – Nov 5. Staff state she 'left the program early, on foot, against guidance' on Nov 2. No exit was logged. Reported missing by her sister Nov 8.\n\nDEVICE: NOT RECOVERED. What follows is a court-ordered reconstruction of her device from cloud sync. Final sync: Nov 10, 02:14 — five days after checkout, two days after the missing-person report — containing 9 photos and 3 voice memos. Sync originated from coordinates in an alpine meadow 0.4 miles north of the retreat's marked boundary. Stillpoint's counsel states, in writing, that 'no such meadow exists on or adjacent to the property.' The USGS quad for the area shows the meadow. It has shown the meadow since 1954.\n\nRETREAT: Twelve years operating. Zero negative reviews on any platform. County records show four prior 'early departures, on foot' since 2019. None was reported by the retreat. All four were reported by families, later. Two remain open.\n\nSecond-pass review requested. Stillpoint has offered investigators a complimentary weekend. Decline it.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "Farrah — if lost return to any ICU, they know me",
    recoveredAt: "2025-11-12T21:30:00",
    batteryStart: 23,
    wallpaperHue: 158,
    lockScreenNotifications: [
      { appId: "messages", title: "Layla (sis)", preview: "the retreat says you LEFT?? farrah answer me. I'm calling everyone.", targetId: "c10-th-layla" },
      { appId: "messages", title: "Stillpoint Ridge", preview: "Your journey with us is complete. We hope you found what you carried in. 🌿", targetId: "c10-th-stillpoint" },
      { appId: "phone", title: "Voice memo synced", preview: "north meadow · 1:57", targetId: "c10-vm-memo3" },
    ],
  },

  messages: [
    {
      id: "c10-th-layla",
      contactName: "Layla (sis)",
      contactNumber: "(720) 555-0139",
      messages: [
        { id: "c10-m-la-1", from: "them", text: "ten days no phone?? YOU? the woman who charts in her sleep?", timestamp: "2025-10-20T19:00:00" },
        { id: "c10-m-la-2", from: "owner", text: "that's the point, lay. eleven years of codes and vents and families crying in hallways. I need somewhere my hands aren't needed. somewhere quiet enough to hear whether I still want to be a nurse", timestamp: "2025-10-20T19:20:00", evidenceLabel: "Why she went: “somewhere quiet enough to hear whether I still want to be a nurse”" },
        { id: "c10-m-la-3", from: "them", text: "ok that broke my heart. go. detox. but memorize my number, actual paper, promise me", timestamp: "2025-10-20T19:22:00" },
        { id: "c10-m-la-4", from: "owner", text: "paper promise made. if you don't hear from me by checkout+1, that's nov 6, you call the county up there. sheriff, not the retreat. write THAT on paper too", timestamp: "2025-10-20T19:30:00", evidenceLabel: "Her instruction, before going in: “checkout+1… call the county. sheriff, not the retreat.”" },
        { id: "c10-m-la-5", from: "them", text: "why sheriff not the retreat??", timestamp: "2025-10-20T19:31:00" },
        { id: "c10-m-la-6", from: "owner", text: "because places with no bad reviews scare me more than places with some. nurse instinct. probably nothing. love you", timestamp: "2025-10-20T19:40:00", evidenceLabel: "“places with no bad reviews scare me more than places with some”" },
        { id: "c10-m-la-7", from: "owner", text: "IT'S ME. one bar on a ridge, no time. I'm fine but this place is wrong. tomlin from orientation is GONE gone — staff say he 'left early on foot.' his boots are still outside cabin willow. lay, his BOOTS. more soon, battery dying, doing one more hike up here tomorrow night with the phone. don't call the retreat. county. remember", timestamp: "2025-11-01T23:48:00", evidenceLabel: "Her ridge text, Nov 1: Tomlin “left on foot” — his boots still outside his cabin" },
        { id: "c10-m-la-8", from: "them", text: "FARRAH. leave NOW. drive out tonight. please please please", timestamp: "2025-11-02T07:15:00" },
        { id: "c10-m-la-9", from: "them", text: "the retreat says you LEFT?? farrah answer me. I'm calling everyone.", timestamp: "2025-11-06T10:00:00" },
      ],
    },
    {
      id: "c10-th-stillpoint",
      contactName: "Stillpoint Ridge",
      messages: [
        { id: "c10-m-sp-1", from: "them", text: "Welcome, Farrah 🌿 Your journey begins Oct 26. Arrival guidance: devices are lovingly kept in the Basket at reception. Guests wear soft colors. Guides go by tree names. Silence hours 9pm–9am are sacred. There is nothing to fear at Stillpoint but what you brought with you.", timestamp: "2025-10-22T10:00:00", evidenceLabel: "The welcome message: the Basket, tree names, sacred silence — “nothing to fear but what you brought”" },
        { id: "c10-m-sp-2", from: "owner", text: "Quick medical note: I'm an ICU nurse. If any guest ever needs help, I'm happy to assist — I keep a small kit.", timestamp: "2025-10-22T10:30:00" },
        { id: "c10-m-sp-3", from: "them", text: "How generous! Stillpoint has its own wellness protocols, so your hands can finally rest. Guests who feel unwell visit the Quiet Cabins to restore. You needn't ever think of them again. 🌿", timestamp: "2025-10-22T10:32:00", evidenceLabel: "First mention of the Quiet Cabins: “you needn't ever think of them again.”" },
        { id: "c10-m-sp-4", from: "them", text: "Farrah, our records show you enjoyed a beautiful integration and departed on foot Nov 2, declining our shuttle. We're holding your belongings with love. Your journey with us is complete. We hope you found what you carried in. 🌿", timestamp: "2025-11-06T09:00:00", evidenceLabel: "The retreat's story, unprompted, in writing: “departed on foot Nov 2, declining our shuttle”" },
        { id: "c10-m-sp-5", from: "them", text: "A note from our care team: grief is a journey too, Layla. We are holding space for your family. Should you wish to process on-site, sisters of guests receive our compassion rate. 🌿", timestamp: "2025-11-09T11:00:00", evidenceLabel: "Sent to Farrah's phone but addressed to LAYLA — offering her sister the “compassion rate”" },
      ],
    },
    {
      id: "c10-th-tomlin",
      contactName: "Tomlin (cabin Willow)",
      contactNumber: "(505) 555-0171",
      ghostTypingAfterSeconds: 400,
      messages: [
        { id: "c10-m-to-1", from: "them", text: "farrah! tomlin, from orientation — the guy who asked if decaf was mandatory. trading numbers before the Basket eats our phones. buddy system for the digitally detoxing", timestamp: "2025-10-26T11:30:00" },
        { id: "c10-m-to-2", from: "owner", text: "buddy system accepted. if I start weaving baskets unironically, stage an intervention", timestamp: "2025-10-26T11:35:00" },
        { id: "c10-m-to-3", from: "them", text: "deal. same if I start calling the guides by their tree names without laughing. ok phone's going in the Basket. see you on the other side of serenity", timestamp: "2025-10-26T11:58:00", evidenceLabel: "Tomlin's last message before the Basket, Oct 26, 11:58 AM" },
      ],
    },
    {
      id: "c10-th-bex",
      contactName: "Bex (charge nurse)",
      contactNumber: "(720) 555-0184",
      messages: [
        { id: "c10-m-be-1", from: "them", text: "unit survived day 1 without you. barely. go be a person. that's an order", timestamp: "2025-10-24T20:00:00" },
        { id: "c10-m-be-2", from: "owner", text: "trying!! packing list says 'soft colors only.' bex I own scrubs and one funeral dress", timestamp: "2025-10-24T20:15:00" },
        { id: "c10-m-be-3", from: "them", text: "farrah?? your sister called the UNIT looking for you. tell me you're okay", timestamp: "2025-11-07T14:00:00" },
        { id: "c10-m-be-4", from: "them", text: "I looked up that retreat on the nurse forums like you asked me to back in october. finally found the thread. a hospice nurse went there in 2022. her family's still posting. farrah CALL ME", timestamp: "2025-11-07T18:30:00", evidenceLabel: "Bex found the 2022 thread: a hospice nurse who went to Stillpoint and never came back" },
      ],
    },
    {
      id: "c10-th-mom",
      contactName: "Mama",
      contactNumber: "(720) 555-0102",
      messages: [
        { id: "c10-m-mo-1", from: "them", text: "Ten days without hearing your voice. I don't like it, hayati, but I understand it. Rest well.", timestamp: "2025-10-25T18:00:00" },
        { id: "c10-m-mo-2", from: "owner", text: "I'll rest, I promise. and I'll call the second I'm out. keep my plants alive and my father calm, in that order", timestamp: "2025-10-25T18:20:00" },
        { id: "c10-m-mo-3", from: "them", text: "Your plants are alive. Your father is not calm. It is November 7th, Farrah.", timestamp: "2025-11-07T09:00:00" },
      ],
    },
    {
      id: "c10-th-hr",
      contactName: "St. Aug Hospital HR",
      messages: [
        { id: "c10-m-hr-1", from: "them", text: "St. Augustine HR: Your wellness leave (Oct 24 – Nov 10) is approved. We're proud of you for prioritizing yourself, Farrah!", timestamp: "2025-10-15T12:00:00" },
        { id: "c10-m-hr-2", from: "them", text: "St. Augustine HR: Reminder — return-to-work paperwork due Nov 10. We can't wait to have you back. 💙", timestamp: "2025-11-08T09:00:00" },
      ],
    },
    {
      id: "c10-th-aspen",
      contactName: "Aspen (guide)",
      messages: [
        { id: "c10-m-as-1", from: "them", text: "Farrah, it's Aspen 🌿 You seemed unsettled after the gratitude circle. The mountain shows people things. If you saw something on your walk that troubled you, bring it to me first. Only to me.", timestamp: "2025-10-31T21:30:00", evidenceLabel: "Guide Aspen, during sacred silence hours: “bring it to me first. Only to me.”" },
        { id: "c10-m-as-2", from: "owner", text: "How are you texting me? My phone is in the Basket. This phone is in the Basket, Aspen.", timestamp: "2025-11-01T23:52:00", evidenceLabel: "Her reply from the ridge: “How are you texting me? This phone is in the Basket.”" },
        { id: "c10-m-as-3", from: "them", text: "The Basket keeps things safe, Farrah. It doesn't keep them asleep. Come down from the ridge. The meadow is cold at night.", timestamp: "2025-11-01T23:54:00", evidenceLabel: "Aspen knew she was on the ridge — “the meadow is cold at night.”" },
      ],
    },
    {
      id: "c10-th-pharm",
      contactName: "Alpine Pharmacy",
      messages: [
        { id: "c10-m-ph-1", from: "them", text: "ALPINE RX: Your prescription is ready for pickup.", timestamp: "2025-10-23T11:00:00" },
        { id: "c10-m-ph-2", from: "them", text: "ALPINE RX: Reminder — prescription will be returned to stock Nov 12.", timestamp: "2025-11-09T11:00:00" },
      ],
    },
    {
      id: "c10-th-bank",
      contactName: "Summit CU",
      messages: [
        { id: "c10-m-bk-1", from: "them", text: "Summit CU: $2,900.00 charged — STILLPOINT RIDGE RETREAT. Reply STOP to opt out of alerts.", timestamp: "2025-10-26T12:10:00" },
        {
          id: "c10-m-bk-2",
          from: "them",
          text: "Summit CU: $870.00 charged — STILLPOINT RIDGE RETREAT (EXTENDED INTEGRATION). If this wasn't you, call immediately.",
          timestamp: "2025-11-06T08:00:00",
          evidenceLabel: "Nov 6: the retreat billed her $870 for an “extended integration” — four days after they say she left",
        },
      ],
    },
    {
      id: "c10-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c10-m-un-1",
          from: "them",
          text: "the meadow isn't on our maps because our maps are honest about what belongs to us. she walked past the boundary. what's past the boundary was never ours to fence.",
          timestamp: "2025-11-10T02:20:00",
          evidenceLabel: "Six minutes after the final sync: “what's past the boundary was never ours to fence.”",
        },
      ],
    },
  ],

  photos: [
    {
      id: "c10-ph-basket",
      caption: "goodbye phone. into the Basket. my tag is 06 which feels insultingly low for how attached we are",
      timestamp: "2025-10-26T12:01:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-26T12:01:00", device: "This phone", location: "Stillpoint Ridge — reception" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1712"/>` +
          `<ellipse cx="150" cy="260" rx="120" ry="70" fill="#3a2f1e"/>` +
          `<ellipse cx="150" cy="240" rx="105" ry="55" fill="#2a2115"/>` +
          Array.from({ length: 6 }, (_, i) => `<rect x="${85 + (i % 3) * 50}" y="${210 + Math.floor(i / 3) * 34}" width="30" height="20" rx="4" fill="#10121a" transform="rotate(${-8 + i * 4} ${100 + (i % 3) * 50} ${220 + Math.floor(i / 3) * 34})"/>`).join("") +
          `<rect x="120" y="150" width="60" height="26" rx="4" fill="#cfc7b2" opacity="0.85"/>` +
          `<text x="150" y="168" text-anchor="middle" font-family="monospace" font-size="12" fill="#3a3427">TAG 06</text>`,
        { aspect: "portrait", base: "#13100b", grain: 0.11 },
      ),
      evidenceLabel: "The Basket at reception — her phone, tag 06",
    },
    {
      id: "c10-ph-cabin",
      caption: "cabin cedar. no clock, no mirror, no lock on the inside. 'locks are walls we build against ourselves' ok but also against OTHER PEOPLE, aspen",
      timestamp: "2025-10-26T14:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-26T14:20:00", device: "This phone", location: "Stillpoint Ridge" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#151a14"/>` +
          `<rect x="80" y="110" width="240" height="140" fill="#2a2318"/>` +
          `<path d="M70 110 L200 60 L330 110Z" fill="#1f1a10"/>` +
          doorway(170, 150, 60, 100, "#0e0c08") +
          `<rect x="110" y="140" width="40" height="40" fill="#26303a" opacity="0.6"/>` +
          `<path d="M30 250 Q90 230 150 250 M250 252 Q310 232 370 250" stroke="#101408" stroke-width="10" fill="none"/>`,
        { aspect: "landscape", base: "#101408", grain: 0.12 },
      ),
      evidenceLabel: "Cabin Cedar: no clock, no mirror — and no lock on the inside",
    },
    {
      id: "c10-ph-schedule",
      caption: "the daily rhythm board. note there is no hour labeled 'free.' every hour is a NAMED hour",
      timestamp: "2025-10-27T09:15:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-27T09:15:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#171410"/>` +
          `<rect x="45" y="50" width="210" height="300" rx="6" fill="#d3cab4" opacity="0.9"/>` +
          `<text x="150" y="85" text-anchor="middle" font-family="serif" font-size="13" fill="#3a3427">THE RHYTHM 🌿</text>` +
          ["6a WAKING", "7a MOVEMENT", "9a NOURISH", "11a GRATITUDE", "1p LISTENING", "3p WALKING", "5p NOURISH", "7p CIRCLE", "9p SILENCE"].map((t, i) => `<text x="65" y="${115 + i * 25}" font-family="monospace" font-size="10" fill="#55503f">${t}</text>`).join(""),
        { aspect: "portrait", base: "#110f0b", grain: 0.1 },
      ),
    },
    {
      id: "c10-ph-circle",
      caption: "gratitude circle. we say what we're grateful for. staff go last. staff are always grateful for 'the quiet ones.' I thought it was a joke the first time",
      timestamp: "2025-10-29T19:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-10-29T19:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#12150f"/>` +
          `<circle cx="200" cy="180" r="26" fill="#3d2f1a" opacity="0.7"/>` +
          `<circle cx="200" cy="178" r="10" fill="#c96f2b" opacity="0.5"/>` +
          Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2;
            return figure(200 + Math.cos(a) * 110, 190 + Math.sin(a) * 55, 0.7, 0.75, i % 3 === 0 ? "#2a3328" : "#33302a");
          }).join(""),
        { aspect: "landscape", base: "#0e110b", grain: 0.13 },
      ),
      evidenceLabel: "The gratitude circle — staff always grateful for “the quiet ones”",
    },
    {
      id: "c10-ph-boots",
      caption: "",
      timestamp: "2025-10-31T15:40:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-31T15:40:00", device: "This phone", location: "cabin Willow" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#161310"/>` +
          `<rect x="40" y="80" width="220" height="250" fill="#241d12"/>` +
          doorway(110, 130, 80, 200, "#0d0b07") +
          `<rect x="120" y="330" width="26" height="34" rx="6" fill="#3a2c1a"/>` +
          `<rect x="154" y="330" width="26" height="34" rx="6" fill="#3a2c1a"/>` +
          `<text x="150" y="115" text-anchor="middle" font-family="serif" font-size="11" fill="#6b5f4a">WILLOW</text>`,
        { aspect: "portrait", base: "#100d0a", grain: 0.13 },
      ),
      evidenceLabel: "Cabin Willow, Oct 31: Tomlin's boots outside the door of a man who “left on foot”",
    },
    {
      id: "c10-ph-quietcabins",
      caption: "",
      timestamp: "2025-11-01T16:10:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-01T16:10:00", device: "This phone", location: "north path (off rhythm)" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#070808"/>` + `<rect y="220" width="400" height="80" fill="#0b0e09"/>`,
        { aspect: "landscape", base: "#060707", grain: 0.19 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0b0d0a"/>` +
            `<rect y="220" width="400" height="80" fill="#0f130c"/>` +
            Array.from({ length: 3 }, (_, i) => `<rect x="${50 + i * 120}" y="130" width="90" height="90" fill="#151009"/><path d="M${44 + i * 120} 130 L${95 + i * 120} 104 L${146 + i * 120} 130Z" fill="#0f0c07"/><rect x="${80 + i * 120}" y="160" width="26" height="60" fill="#0a0806"/>`).join("") +
            `<path d="M92 190 h8 M212 190 h8 M332 190 h8" stroke="#5c5648" stroke-width="4"/>` +
            `<rect x="46" y="240" width="100" height="12" fill="#1a150c"/>` +
            `<text x="200" y="278" text-anchor="middle" font-family="monospace" font-size="9" fill="#44504a">three cabins. ramps. padlocks on the OUTSIDE. a meal cart with six trays</text>` +
            timestampBurn("16:10:22", 400, 300),
          { aspect: "landscape", base: "#090b08", grain: 0.13 },
        ),
      },
      evidenceLabel: "The Quiet Cabins: wheelchair ramps, padlocks on the OUTSIDE, a meal cart with six trays",
    },
    {
      id: "c10-ph-marker",
      caption: "trail marker 31. this is where the bars appear — one, sometimes two, if you hold the phone like an offering",
      timestamp: "2025-11-01T23:40:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-01T23:40:00", device: "This phone", location: "ridge trail" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0a0c0e"/>` +
          `<rect x="135" y="140" width="14" height="220" fill="#26221c"/>` +
          `<rect x="110" y="120" width="80" height="46" rx="4" fill="#2c3626"/>` +
          `<text x="150" y="150" text-anchor="middle" font-family="monospace" font-size="18" fill="#9fe8a0" opacity="0.8">31</text>` +
          Array.from({ length: 12 }, (_, i) => `<circle cx="${(i * 53) % 300}" cy="${(i * 31) % 110}" r="1.4" fill="#3f4a58"/>`).join(""),
        { aspect: "portrait", base: "#080a0c", grain: 0.15 },
      ),
      evidenceLabel: "Trail marker 31 — the one place on the mountain with signal",
    },
    // ---- the final synced batch (Recently Deleted holds the two she hid) ----
    {
      id: "c10-ph-meadow",
      caption: "the north meadow. not on the welcome map. not on ANY of their maps. it's right THERE. you can see it from the ridge",
      timestamp: "2025-11-09T23:50:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-09T23:50:00", device: "This phone", location: "north meadow (final sync batch)" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0c1010"/>` +
          `<rect y="180" width="400" height="120" fill="#101609"/>` +
          `<ellipse cx="200" cy="220" rx="170" ry="45" fill="#141c0c"/>` +
          `<path d="M0 180 L80 120 L160 170 L240 110 L320 160 L400 120 V0 H0 Z" fill="#0a0d10"/>` +
          `<circle cx="330" cy="60" r="24" fill="#3d4152" opacity="0.5"/>` +
          Array.from({ length: 10 }, (_, i) => `<path d="M${30 + i * 38} ${230 + (i % 3) * 6} v-14" stroke="#1d2612" stroke-width="2"/>`).join(""),
        { aspect: "landscape", base: "#0a0d08", grain: 0.14 },
      ),
      evidenceLabel: "The north meadow, from her final sync — the place Stillpoint says doesn't exist",
    },
    {
      id: "c10-ph-stones",
      caption: "there are stones in the meadow. rows of them. flat, palm-sized, one word carved on each. the nearest one says REST. the next one says REST. they all say REST",
      timestamp: "2025-11-10T00:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-10T00:20:00", device: "This phone", location: "north meadow (final sync batch)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0c0f0a"/>` +
          Array.from({ length: 9 }, (_, i) => `<ellipse cx="${70 + (i % 3) * 80}" cy="${160 + Math.floor(i / 3) * 80}" rx="26" ry="14" fill="#232a20"/><text x="${70 + (i % 3) * 80}" y="${164 + Math.floor(i / 3) * 80}" text-anchor="middle" font-family="serif" font-size="7" fill="#4a5442">REST</text>`).join(""),
        { aspect: "portrait", base: "#090c07", grain: 0.15 },
      ),
      evidenceLabel: "Rows of flat stones in the meadow, each carved with one word: REST",
    },
    {
      id: "c10-ph-intake",
      caption: "",
      timestamp: "2025-10-26T11:45:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-10-26T11:45:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#131110"/>` +
          `<rect x="45" y="50" width="210" height="300" fill="#cfc7b2" opacity="0.9"/>` +
          `<text x="150" y="82" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3427">STILLPOINT RIDGE — WAIVER</text>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="65" y="${105 + i * 18}" width="${170 - ((i * 27) % 60)}" height="4" fill="#8b8371"/>`).join("") +
          `<rect x="65" y="255" width="170" height="40" fill="#c4bca8"/>` +
          `<text x="150" y="272" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">§9: guests experiencing crisis may be relocated</text>` +
          `<text x="150" y="284" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">on-property for restoration, duration at our</text>` +
          `<text x="150" y="296" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">discretion, billed as extended integration.</text>` +
          `<rect x="65" y="320" width="80" height="3" fill="#3a3427"/>`,
        { aspect: "portrait", base: "#0e0c0b", grain: 0.1 },
      ),
      evidenceLabel: "Deleted photo of waiver §9: guests “may be relocated… duration at our discretion, billed as extended integration”",
    },
    {
      id: "c10-ph-clipboard",
      caption: "",
      timestamp: "2025-11-01T16:14:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-01T16:14:00", device: "This phone", location: "north path (off rhythm)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#100f0d"/>` +
          `<rect x="60" y="60" width="180" height="280" rx="6" fill="#2a2318"/>` +
          `<rect x="75" y="85" width="150" height="240" fill="#d3cab4" opacity="0.9"/>` +
          `<rect x="125" y="52" width="50" height="20" rx="6" fill="#3d3226"/>` +
          `<text x="150" y="110" text-anchor="middle" font-family="monospace" font-size="8" fill="#3a3427">QUIET CENSUS — NOV</text>` +
          ["W. TOMLIN — day 2", "R. OKAFOR — day 41", "D. PRICE — day 190", "H. YUEN — day 388", "M. SOL — day 1,101", "(bed 6 — prepared)"].map((t, i) => `<text x="85" y="${140 + i * 28}" font-family="monospace" font-size="8" fill="${i === 5 ? "#7a3a42" : "#55503f"}">${t}</text>`).join(""),
        { aspect: "portrait", base: "#0c0b09", grain: 0.11 },
      ),
      evidenceLabel: "The Quiet Cabins census: five guests, held 2 to 1,101 days — and “bed 6 — prepared”",
    },
    {
      id: "c10-ph-selfcare",
      caption: "day 3. I slept nine hours. I forgot what nine hours does to a face. maybe this place is fine and I'm just broken in the specific shape of someone who can't accept kindness",
      timestamp: "2025-10-28T09:40:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-28T09:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1d17"/>` +
          `<circle cx="150" cy="180" r="70" fill="#2c3328" opacity="0.8"/>` +
          `<rect y="290" width="300" height="110" fill="#141810"/>` +
          `<circle cx="240" cy="80" r="30" fill="#4a4632" opacity="0.4"/>`,
        { aspect: "portrait", base: "#12150e", grain: 0.12 },
      ),
    },
  ],

  notes: [
    {
      id: "c10-n-hike",
      title: "walking notes (kept on paper, typed up at marker 31)",
      timestamp: "2025-11-01T23:30:00",
      evidenceLabel: "Her walking notes: everything wrong at Stillpoint, typed in one battery-saving burst",
      body:
        "typing fast, one bar, 40% battery. paper notes transcribed:\n\noct 29 — tomlin missed movement AND nourish. asked aspen. 'restoring in the quiet cabins.' asked to visit. 'guests restore alone.' he's a 61-year-old man with a bad hip who told me his daughter's wedding is nov 8. he would CRAWL out for that wedding.\n\noct 30 — staff never eat. staff never yawn. staff are grateful for the quiet ones. juniper's lanyard flipped over at circle: the back is a MEDICATION SCHEDULE. six names. none of them are staff names.\n\noct 31 — tomlin 'left early on foot.' his boots are outside willow. city man, brand new boots, blisters by day 2. he did not walk out of these mountains barefoot.\n\nnov 1 — followed the meal cart north, off the rhythm paths. three cabins the welcome map doesn't show. ramps. outside padlocks. six trays on the cart. I counted five names on juniper's lanyard. six trays. one tray is for somebody new.\n\nplan: reclaimed my phone from the Basket tonight (tag 06, they don't count after silence hours). photos taken. tomorrow night I go back up past the marker to the meadow — you can see it from the ridge, north of their fence line, and there's something IN it, rows of something pale — document that, then drive out at dawn whether checkout likes it or not.\n\nlocked note has the rest. code: my tag, then the marker where the bars appear.",
    },
    {
      id: "c10-n-locked",
      title: "for the sheriff (not the retreat)",
      timestamp: "2025-11-02T00:15:00",
      lock: {
        code: "0631",
        hintText: "“my tag, then the marker where the bars appear.” — the Basket gave her a number; the trail gave her another.",
        clueSourceIds: ["c10-ph-basket", "c10-n-hike"],
      },
      evidenceLabel: "The locked note: her formal statement, written like a nurse's chart",
      body:
        "STATEMENT OF FARRAH HADDAD, RN — written 02:15, Nov 2, cabin Cedar, by lantern.\n\nI am documenting in the format I trust: findings, not feelings.\n\nFINDING 1: Stillpoint Ridge operates an unlicensed long-term custodial facility ('Quiet Cabins') holding at minimum five persons, one for over three years, medicated per a schedule worn on a staff lanyard, billed to their own accounts as 'extended integration.' I have photographed the census and the waiver clause that launders it.\n\nFINDING 2: W. Tomlin was moved to the Quiet Cabins on or about Oct 29 following a panic episode at evening circle — an episode I witnessed and could have treated with a chair, water, and ten minutes. They took him north instead. His 'departure on foot' is fabricated; exhibit: his boots.\n\nFINDING 3: guests sign §9 without reading it because they are exhausted people begging for rest. I signed it. I am in the inventory too, if they want me to be. The only thing between any guest and bed 6 is staff discretion and a padlock.\n\nFINDING 4 (unverified): there is a meadow north of the fence that the retreat's maps refuse. The staff will not walk north of the fence. Aspen, who is never unsettled, is unsettled by the meadow. Whatever the retreat is doing in the Quiet Cabins, it is a HUMAN wrongness — billing, sedation, cowardice. The meadow is not in that category. The staff behave like tenants about the meadow. Like the fence is the landlord's.\n\nTOMORROW: meadow at dusk, photos, then out at first light. If this note reaches anyone instead of me: the census names five people who cannot ask for help. Go north of the rhythm paths. Bring the county. Bring bolt cutters.\n\n— F. Haddad, RN. Eleven years ICU. I still want to be a nurse. Turns out that was the question and this place answered it.",
    },
    {
      id: "c10-n-packing",
      title: "packing (soft colors???)",
      timestamp: "2025-10-24T21:00:00",
      body: "oatmeal cardigan (softest color I own)\nhiking boots (broken in, unlike SOME people's)\npaper, pen, layla's number ON PAPER\nthe little med kit. yes it's a detox. the kit comes. non-negotiable",
    },
    {
      id: "c10-n-gratitude",
      title: "gratitude journal (assigned)",
      timestamp: "2025-10-30T20:00:00",
      evidenceLabel: "Her gratitude journal — and the day-6 prompt she refused to answer",
      body: "day 1: grateful for sleep\nday 2: grateful for sleep, again, genuinely\nday 3: grateful for nine hours and a face I recognized\nday 4: grateful for tomlin's decaf joke at breakfast\nday 5: tomlin wasn't at breakfast\nday 6: (assigned prompt: 'what would you give to feel this rested forever?')\nday 6: I left day 6 blank. the prompt is doing a lot of work and I don't like the job it applied for.",
    },
  ],

  voicemails: [
    {
      id: "c10-vm-layla",
      callerLabel: "Layla (sis)",
      callerNumber: "(720) 555-0139",
      timestamp: "2025-11-08T16:00:00",
      durationSec: 27,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“It's me. The sheriff took the report — county, like you said, not the retreat, I DID IT LIKE YOU SAID. They're sending someone up tomorrow. Farrah, your voicemail is the only place your voice still lives right now and I hate it. Paper promise, remember? You promised on paper. Come make it true.”",
    },
    {
      id: "c10-vm-memo1",
      callerLabel: "Voice memo — Farrah (synced)",
      timestamp: "2025-11-09T23:35:00",
      durationSec: 38,
      tone: "plain",
      evidenceLabel: "Synced memo 1: her voice on the ridge, one week after the retreat says she left",
      transcript:
        "[voice memo — final sync batch]\n“Memo one. It's Farrah Haddad, it's November ninth, I think — I've been keeping to the tree line for days because they walk the fence at night now. If this syncs: I did not leave on November second. Aspen and two guides I'd never seen 'walked me out' — north, not toward the road. NORTH. I got loose at the fence line and I've been between the boundary and the meadow since. There are worse places to be stuck. That's not a joke. I've seen where the trays go. The meadow is safer than the retreat. Hold that thought, whoever you are, because I need you to believe the next memo.”",
    },
    {
      id: "c10-vm-memo2",
      callerLabel: "Voice memo — Farrah (synced)",
      timestamp: "2025-11-10T00:40:00",
      durationSec: 31,
      tone: "distorted",
      evidenceLabel: "Synced memo 2: the stones, and what she found at the sixth row",
      transcript:
        "[voice memo — final sync batch, wind interference]\n“Memo two. The stones — the REST stones — they're in rows and the rows are old, the lichen says decades, some say a century. It's not the retreat's work. The retreat is twelve years old and it's SCARED of this place, and I understand why now, because — [wind] — the sixth row is new. The stone is clean. The carving is fresh. And the ground in front of it is — [wind] — it's not dug, that's the thing. It's not DUG. It's just… ready.”",
    },
    {
      id: "c10-vm-memo3",
      callerLabel: "Voice memo — Farrah (synced)",
      timestamp: "2025-11-10T02:10:00",
      durationSec: 117,
      tone: "breathing",
      evidenceLabel: "Synced memo 3: the last two minutes — and the second voice",
      transcript:
        "[voice memo — final sync batch. two speakers detected. forensic linguistics disputes this.]\nFARRAH (whisper): “Memo three. Someone's crossing the meadow. Not staff. Staff don't come past the fence. It's — hold on. It's carrying a lantern with no light in it. I'm going to stay very still and keep recording, because you deserve the whole chart, whoever you are. Vitals: I'm okay. I'm cold, and I'm okay.”\n[ninety seconds: wind, grass, breathing — steady, then steadier, then slow]\nSECOND VOICE (very close, conversational): “eleven years. you can rest now, if you want. only if you want.”\nFARRAH: [a long exhale] “…what happens to the five in the cabins?”\nSECOND VOICE: “first them, then you. that's a nurse's answer. we thought it would be.”\n[footsteps in grass, two sets, receding]\n[the phone remains. at 02:14 it syncs. then nothing.]\n\n⚠ EVIDENCE ANNOTATION: on Nov 11, county deputies executing a warrant found the Quiet Cabins EMPTY, doors open, padlocks neatly stacked, five guests sitting at the main lodge asking for their families by name. None can describe who let them out. All five, separately, used the same phrase: 'the nurse came first.'",
    },
    {
      id: "c10-vm-retreat",
      callerLabel: "Stillpoint Ridge",
      timestamp: "2025-11-11T10:00:00",
      durationSec: 24,
      tone: "static",
      evidenceLabel: "Stillpoint's voicemail after the raid: serene to the last",
      transcript:
        "[automated transcript]\n“Farrah, this is Willow at Stillpoint. There's been a great deal of disruption here — vehicles, questions, doors opened without ceremony. We know you're at peace with whatever role you played. We forgive you. The mountain forgives everyone eventually. Your belongings are at reception. Someone should collect them soon. The Basket doesn't like… [remainder unrecoverable]”",
    },
  ],

  calendarEvents: [
    { id: "c10-cal-leave", title: "WELLNESS LEAVE BEGINS 🎉", date: "2025-10-24", time: "08:00", createdBy: "owner" },
    { id: "c10-cal-checkin", title: "Stillpoint check-in", date: "2025-10-26", time: "11:00", createdBy: "owner" },
    { id: "c10-cal-checkout", title: "checkout — CALL LAYLA FIRST THING", date: "2025-11-05", time: "10:00", createdBy: "owner", struck: true, evidenceLabel: "Her checkout reminder — struck through on Nov 2 by an account named “stillpoint-sync”" },
    {
      id: "c10-cal-integration",
      title: "extended integration",
      date: "2025-11-05",
      time: "10:00",
      recurring: "daily",
      createdBy: "external",
      detail: "Added Nov 2 by 'stillpoint-sync', an integration her account never authorized. It repeats daily. It has no end date.",
      evidenceLabel: "“extended integration” — added to her calendar by the retreat, daily, no end date",
    },
    { id: "c10-cal-rtw", title: "return-to-work paperwork due", date: "2025-11-10", time: "09:00", createdBy: "owner" },
    { id: "c10-cal-shift", title: "first shift back 💙 (ease in. HA.)", date: "2025-11-12", time: "07:00", createdBy: "owner", evidenceLabel: "Her first shift back at the ICU, still on the calendar" },
  ],

  locationPins: [
    { id: "c10-pin-hospital", label: "St. Augustine Hospital", timestamp: "2025-10-23T19:30:00", x: 15, y: 20 },
    { id: "c10-pin-home", label: "Home — Quarry St", timestamp: "2025-10-25T22:00:00", x: 22, y: 32 },
    { id: "c10-pin-drive", label: "Mountain highway (drive up)", timestamp: "2025-10-26T09:40:00", x: 45, y: 50 },
    { id: "c10-pin-retreat", label: "Stillpoint Ridge Retreat", timestamp: "2025-10-26T11:02:00", x: 65, y: 62, detail: "Last fix before the Basket. The phone goes dark here for six days." },
    {
      id: "c10-pin-marker31",
      label: "Trail marker 31 (ridge)",
      timestamp: "2025-11-01T23:38:00",
      x: 72,
      y: 45,
      detail: "The phone wakes here, twice: Nov 1 (her texts to Layla and the hike notes) and briefly Nov 2 at 00:20.",
      evidenceLabel: "Marker 31: the phone's two waking moments during her stay",
    },
    {
      id: "c10-pin-meadow",
      label: "North meadow — final sync",
      timestamp: "2025-11-10T02:14:00",
      x: 78,
      y: 30,
      detail: "The final sync: 02:14, Nov 10 — 0.4 miles past the retreat's fence, inside a meadow Stillpoint's counsel denies and the USGS has mapped since 1954. Searchers found flattened grass in a neat rectangle, phone-sized, at the head of the sixth row of stones. No phone.",
      evidenceLabel: "The final sync point: the sixth row of stones — flattened grass in a phone-sized rectangle",
    },
  ],

  browserHistory: [
    { id: "c10-b-burnout", query: "nurse burnout when to take leave before you break", timestamp: "2025-10-10T23:40:00", evidenceLabel: "Her October search: “nurse burnout when to take leave before you break”" },
    { id: "c10-b-retreat", query: "stillpoint ridge retreat reviews", timestamp: "2025-10-14T20:00:00", evidenceLabel: "Her review search: hundreds of five-star reviews, not one complaint, twelve years" },
    { id: "c10-b-noreviews", query: "why would a business have zero negative reviews ever", timestamp: "2025-10-14T20:30:00" },
    { id: "c10-b-basket", query: "can a retreat legally hold your phone", timestamp: "2025-10-21T12:00:00" },
    { id: "c10-b-tomlin", query: "walter tomlin albuquerque daughter wedding november 8", timestamp: "2025-11-01T23:44:00", evidenceLabel: "From the ridge: she searched for Tomlin's daughter's wedding — it was real, and he never arrived" },
    { id: "c10-b-lawsuit", query: "stillpoint ridge lawsuit missing guest 2022", timestamp: "2025-11-01T23:46:00", evidenceLabel: "“stillpoint ridge lawsuit missing guest 2022” — settled, sealed" },
    { id: "c10-b-waiver", query: "waiver relocated on property restoration is this legal imprisonment", timestamp: "2025-11-01T23:50:00" },
    { id: "c10-b-ranger", query: "nearest ranger station to stillpoint ridge", timestamp: "2025-11-02T00:18:00", evidenceLabel: "Her last search, 12:18 AM Nov 2: the nearest ranger station" },
  ],

  hiddenApp: {
    disguiseIcon: "weather",
    disguiseLabel: "Stillpoint",
    revealAfterClueIds: ["c10-th-aspen", "c10-n-hike"],
    title: "Stillpoint — Steward View",
    heading: "Steward console · guest ledger",
    body:
      "The retreat's guest app: rhythm schedules, gratitude prompts, weather on the ridge. Staff devices unlock a second view. Her phone received the staff view on Nov 2 — pushed to it, deliberately or carelessly, the morning they 'walked her out.'\n\nIt was still syncing when the meadow took the last word.",
    entries: [
      { label: "HADDAD, F. — Cedar", status: "WALKED OUT 11/02", detail: "record trimmed · billing: extended integration" },
      { label: "TOMLIN, W. — Willow", status: "QUIET — BED 2", detail: "day 4 · family inquiries: deflect, warmly" },
      { label: "OKAFOR, R. — QUIET BED 1", status: "DAY 41", detail: "billing active · next of kin: none listed" },
      { label: "YUEN, H. — QUIET BED 4", status: "DAY 388", detail: "billing active · 'doing beautifully'" },
      { label: "SOL, M. — QUIET BED 5", status: "DAY 1,101", detail: "billing active · account nearly empty · review" },
      { label: "BED 6", status: "PREPARED", detail: "assignment pending" },
      { label: "NORTH FENCE", status: "DO NOT WALK", detail: "steward note: we keep our side. it keeps its side." },
    ],
    footer:
      "The ledger's last line is the retreat's only honest sentence: 'we keep our side. it keeps its side.' The Quiet Cabins were a business. The meadow was never in the business plan. On Nov 11, bed 6 was still empty, the five guests were on the lodge porch waiting for their families, and every stone in the sixth row had grass growing at its head — except one kept clear, like a made bed.",
    evidenceLabel: "The Steward console: the Quiet Cabins ledger, “record trimmed” — and the north fence rule",
  },

  liveEvents: [
    {
      id: "c10-live-stillpoint",
      kind: "notification",
      afterSeconds: 330,
      title: "Stillpoint",
      body: "Today's gratitude prompt: what would you give to feel this rested forever?",
      glitch: true,
    },
    {
      id: "c10-live-unknown",
      kind: "message",
      afterSeconds: 620,
      threadId: "c10-th-unknown",
      message: {
        id: "c10-m-un-live",
        from: "them",
        text: "you've been reading a long time without resting. the meadow notices readers. it likes the thorough ones.",
        timestamp: "2025-11-12T21:41:00",
        evidenceLabel: "To whoever is reading: “the meadow notices readers. it likes the thorough ones.”",
      },
    },
  ],

  verdicts: [
    {
      id: "c10-v-walked",
      label: "She walked into the backcountry on her own",
      description: "Eleven years of burnout, a leave she called a question, and mountains that answer questions like that. Exposure, not malice.",
      requiredEvidenceIds: ["c10-m-la-2", "c10-n-gratitude", "c10-b-burnout"],
      isCanon: false,
      epilogue:
        "The kindest-looking verdict and the laziest: a exhausted woman, a beautiful wilderness, a one-way walk. Search and rescue grids the drainage for nine days and finds no gear, no track, no Farrah.\n\nWhat they do find — because you sent them north when the retreat kept steering them south — is the Quiet Cabins, and five people who needed her theory to be wrong. It was wrong. Her memos alone dismantle it: nobody documenting a custodial-care scandal in chart format, with exhibits, plans a one-way walk. Nurses don't abandon a census with names on it. Your report says so, formally, and reclassifies the case within the month.\n\nThe gratitude journal's blank day 6 gets quoted at the licensing hearing anyway, by Stillpoint's counsel, as evidence of 'a guest in crisis.' Layla stands up in the gallery and reads day 5 aloud — 'tomlin wasn't at breakfast' — and asks the room which sister sounds like the one in crisis. The room recesses early.",
    },
    {
      id: "c10-v-retreat",
      label: "Stillpoint erased her like the others",
      description: "An unlicensed custodial ward billed as 'integration,' a fabricated departure, four prior 'early departures on foot' — and a nurse with a census in her pocket.",
      requiredEvidenceIds: ["case-10.hidden", "c10-n-locked", "c10-ph-clipboard", "c10-m-sp-4", "c10-m-bk-2"],
      isCanon: true,
      epilogue:
        "Your report follows her chart format, because her chart was better evidence than anything the county gathered: FINDING, exhibit, FINDING, exhibit. The Quiet Cabins. The medication lanyard. Waiver §9. The $870 'extended integration' billed to a woman they claimed had already left — the invoice is the confession; bureaucracies always bill their crimes.\n\nStillpoint loses its license, then its LLC, then its name — it reopens two states away as 'Fernhollow' within a year, same tree-named guides, and your report's appendix predicting exactly that is the only part the wire services quote. Aspen — legal name attached at last — takes a plea for unlawful imprisonment and billing fraud, and answers every question except the ones about the north fence, which she declines 'respectfully, and permanently.'\n\nTomlin walks his daughter through her wedding reception in a wheelchair, eight months late, at a do-over party the whole ICU where Farrah worked chips in for. The other four go home, or to real care, with real doors that lock from the inside.\n\nFarrah is not found. The county lists her as missing. The five from the cabins insist otherwise — 'the nurse came first' — and your report records their statements without adopting them, which is the closest a government document comes to hope.\n\nAt the ICU, Bex tapes a note inside the med room cabinet where the sticky notes go: 'F.H. — eleven years — she still wanted to be a nurse.' It's laminated now. Night shift touches it like a door frame.",
    },
    {
      id: "c10-v-aspen",
      label: "Aspen handled it personally",
      description: "The guide who texted during sacred silence, knew where she stood on a dark ridge, and led the 'walk out' — north.",
      requiredEvidenceIds: ["c10-m-as-1", "c10-m-as-3", "c10-vm-memo1"],
      isCanon: false,
      epilogue:
        "The lone-wolf version: Aspen as a predator using the retreat's machinery for something personal. The texts support it — 'bring it to me first, only to me' is grooming grammar — and memo one puts Aspen at the head of the walk north.\n\nIt half-survives contact with the evidence. Aspen led the walk; Aspen also, per two junior guides' statements, stopped at the fence. Would not cross. Ordered the juniors back when Farrah broke loose PAST the fence line, into the meadow — and the juniors describe Aspen's face at that moment with a word neither of them was prompted to use. Both said 'bereaved.'\n\n'She went north,' Aspen tells you in the only unguarded minute of six interviews. 'We don't lose the ones who go north. We lose claim to them.' Then the lawyer's hand on the shoulder, and the window closes. The plea covers the cabins. The meadow is never charged, because you cannot charge a meadow, and everyone in the room was careful never to say that sentence out loud.",
    },
    {
      id: "c10-v-meadow",
      label: "The meadow received her",
      description: "Stones older than the retreat, a second voice on the final memo, five locked doors opened by no one — “the nurse came first.”",
      requiredEvidenceIds: ["c10-vm-memo3", "c10-ph-stones", "c10-pin-meadow"],
      isCanon: false,
      epilogue:
        "You write the version the physical file whispers: something older than Stillpoint holds the land north of the fence, has held it since before the county had a name for the quad, and it does not take. It receives. The stones say REST because that is the whole offer. A century of rows, and the lichen agrees with none of your timelines.\n\nThe second voice on memo three is analyzed four times. Two labs say wind. One says a woman. One returns the file with the analysis fee and no comment, which is its own finding.\n\nWhat you cannot fold into any mundane account: the padlocks stacked neatly. Five guests who walked out of locked rooms and all reached for the same four words. The phone-shaped rectangle of flattened grass at the head of a fresh stone — a stone that, when the county finally photographs it properly, is carved not with REST like the others.\n\nIt says, in small, patient letters: OFF SHIFT.\n\nThe report is held pending reclassification. You sign it anyway, in the margin, where signatures don't count. Some charts deserve a witness even when the hospital won't file them.",
    },
  ],
};

export default c10;
