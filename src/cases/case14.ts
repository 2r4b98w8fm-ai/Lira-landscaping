import type { CaseFile } from "../types";
import { photoSvg, figure, blurStreak, timestampBurn } from "../photoart";

/**
 * CASE 14 — STORM CHASER
 * Wade Kessler, 37. HVAC tech, weekend storm chaser, eleven seasons.
 * His radar app kept painting a violent supercell over the same quarter
 * section of farmland — a storm no weather service on Earth could see.
 * It never moved. It never weakened. It had been on his app for weeks,
 * and on one dead radar station's feed for thirty-eight years.
 */

const c14: CaseFile = {
  id: "case-14",
  title: "Storm Chaser",
  victimName: "Wade Kessler, 37",
  summary:
    "Every chaser knows phantom echoes: bugs, birds, bad calibration. Wade's phantom had a hook echo, a debris ball, and perfect rotation — parked over the Hollett quarter for weeks, visible only on his app, under skies so blue they hurt. His truck was found at the field gate, hazards on, anemometer still spinning. There was no wind that day. There hasn't been wind there since 1987.",
  intake:
    "SUBJECT: Kessler, Wade A. (37). Reported missing by chase partner R. 'Bobbi' Brandt, Jun 22, after he drove alone to a location they had jointly agreed 'was a data error.'\n\nDEVICE: Recovered Jun 21, 21:40, from the cab of his truck at the gate of the Hollett quarter (unfarmed since 1987). Truck: hazards on, doors closed, keys present. Mounted anemometer rotating at approx. 40 mph equivalent. Conditions at recovery: dead calm, ceiling unlimited.\n\nMETEOROLOGY: Subject's app displayed a stationary supercell at this location, sourced — per the app's own diagnostics — from 'STATION 7,' a radar site decommissioned in 1988 following a data-integrity scandal: its final weeks of output showed a tornado that 'failed to dissipate.' The station has no power service. Its feed updates every four seconds.\n\nHISTORY: Jun 1987 — an F4 was tracked into the Hollett quarter. Damage survey found the track ENDED at the property line. Three storm spotters working the event were never located. The county's file on them was, per the archivist, 'thinned' in 1991.\n\nSecond-pass review requested. Do not stand in the northeast corner of the field for longer than feels reasonable. This sentence appears in the 1987 file too.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "WADE K — storm spotter, call NWS first, me second",
    recoveredAt: "2026-06-23T21:15:00",
    batteryStart: 44,
    wallpaperHue: 250,
    lockScreenNotifications: [
      { appId: "messages", title: "Leo 🌪", preview: "dad did you see a tornado today. mom says ask you SAFELY", targetId: "c14-th-leo" },
      { appId: "messages", title: "Bobbi (chase)", preview: "WADE. the sky was EMPTY. answer your radio, answer ANYTHING", targetId: "c14-th-bobbi" },
      { appId: "phone", title: "Voicemail", preview: "STATION 7 — admin line · 1:22", targetId: "c14-vm-station" },
    ],
  },

  messages: [
    {
      id: "c14-th-bobbi",
      contactName: "Bobbi (chase)",
      contactNumber: "(316) 555-0177",
      ghostTypingAfterSeconds: 390,
      messages: [
        { id: "c14-m-bo-1", from: "them", text: "SPC has us moderate risk thursday. gas up, check the hail guards, IT'S SEASON BABY", timestamp: "2026-05-12T09:00:00" },
        { id: "c14-m-bo-2", from: "owner", text: "rig's ready. leo drew a tornado on the hood with washable marker. leaving it. it's the best liveried chase truck in kansas now", timestamp: "2026-05-12T09:20:00" },
        { id: "c14-m-bo-3", from: "owner", text: "bobbi. app question. you seeing this cell NE of hollett crossing? TVS marker, debris ball, the works. because radar mosaic shows clean air and I've refreshed everything twice", timestamp: "2026-05-28T16:22:00", evidenceLabel: "May 28: the cell appears — on his app only" },
        { id: "c14-m-bo-4", from: "them", text: "nothing here. nimbustrak's clean, GR2 is clean, NWS is clean. your app's hallucinating. what's your data source even set to", timestamp: "2026-05-28T16:30:00" },
        { id: "c14-m-bo-5", from: "owner", text: "that's the thing. diagnostics says the layer's coming from 'STATION 7.' I didn't add station 7. I can't REMOVE station 7. the toggle greys out", timestamp: "2026-05-28T16:41:00", evidenceLabel: "The layer source: STATION 7 — a feed he didn't add and can't remove" },
        { id: "c14-m-bo-6", from: "them", text: "ok that's a support ticket, not a chase target. promise me you're not driving out to look at a software bug", timestamp: "2026-05-28T16:44:00" },
        { id: "c14-m-bo-7", from: "owner", text: "I drove out to look at the software bug", timestamp: "2026-06-01T18:50:00" },
        { id: "c14-m-bo-8", from: "owner", text: "bobbi the field is calm and blue and the app says I am standing 400 yards from a violent tornado. and here's the part I need you to not laugh at: I BELIEVE THE APP. the air out here is wrong. pressure's wrong. my ears keep popping. there are no birds. there are no BUGS, bobbi, it's june in kansas and the windshield is clean", timestamp: "2026-06-01T19:15:00", evidenceLabel: "“I am standing 400 yards from a violent tornado… there are no birds. there are no bugs.”" },
        { id: "c14-m-bo-9", from: "them", text: "get in the truck and come back and we'll get you a beer and a psych eval, in whichever order", timestamp: "2026-06-01T19:18:00", evidenceLabel: "Bobbi, June 1: come back — “a beer and a psych eval, in whichever order”" },
        { id: "c14-m-bo-10", from: "them", text: "WADE. the sky was EMPTY. answer your radio, answer ANYTHING", timestamp: "2026-06-21T20:30:00" },
      ],
    },
    {
      id: "c14-th-leo",
      contactName: "Leo 🌪",
      contactNumber: "(316) 555-0142",
      messages: [
        { id: "c14-m-le-1", from: "them", text: "dad I did my report on the fujita scale and got an A. ms lopez says I know 'an unusual amount' about wind", timestamp: "2026-05-20T16:00:00" },
        { id: "c14-m-le-2", from: "owner", text: "an A!! that's my boy. 'an unusual amount about wind' is going on the family crest", timestamp: "2026-05-20T16:20:00" },
        { id: "c14-m-le-3", from: "them", text: "when I'm 12 can I come on a chase. mom said ask you so you have to be the one to say no. she told me to tell you that part too", timestamp: "2026-06-10T18:30:00" },
        { id: "c14-m-le-4", from: "owner", text: "when you're 12 you can come on a BLUE SKY drive where we look at where storms USED to be. deal? we'll start with the safest storm in kansas. I know one that never moves an inch", timestamp: "2026-06-10T18:45:00", evidenceLabel: "To his son: “we'll start with the safest storm in kansas. I know one that never moves an inch.”" },
        { id: "c14-m-le-5", from: "them", text: "storms move dad. that's literally what they are. wind that MOVES", timestamp: "2026-06-10T18:47:00", evidenceLabel: "Leo, age 10: “storms move dad. that's literally what they are.”" },
        { id: "c14-m-le-6", from: "them", text: "dad did you see a tornado today. mom says ask you SAFELY", timestamp: "2026-06-21T19:00:00" },
      ],
    },
    {
      id: "c14-th-forum",
      contactName: "Plains Chasers (group)",
      messages: [
        { id: "c14-m-fo-1", from: "them", text: "Dutch: anyone else's nimbustrak pulling a ghost layer near hollett crossing? asking for a friend. the friend is my sanity", timestamp: "2026-06-03T21:00:00", evidenceLabel: "Another chaser saw the ghost layer — briefly" },
        { id: "c14-m-fo-2", from: "owner", text: "YES. station 7 feed. TVS parked on the hollett quarter. you see it too??", timestamp: "2026-06-03T21:05:00" },
        { id: "c14-m-fo-3", from: "them", text: "Dutch: saw it for like an hour, then my app updated and it was gone. yours still showing it?", timestamp: "2026-06-03T21:10:00" },
        { id: "c14-m-fo-4", from: "owner", text: "mine won't update. app store says 'no updates available.' for eleven days it's said that. bobbi's updated twice in that window", timestamp: "2026-06-03T21:14:00", evidenceLabel: "His app alone refuses to update — eleven days and counting" },
        { id: "c14-m-fo-5", from: "them", text: "Grizz: old timers used to talk about station 7. channel 88 on the old spotter net. they'd say 'if 88 paints it and the sky doesn't, drive the OTHER way.' I always figured it was a drinking story", timestamp: "2026-06-03T21:30:00", evidenceLabel: "The old spotters' rule: “if 88 paints it and the sky doesn't, drive the OTHER way.”" },
        { id: "c14-m-fo-6", from: "them", text: "Grizz: also kessler. my dad spotted in '87. he knew the three that went missing. he kept his spotter card in his wallet till he died with one corner burned off. said the card came back like that from the hollett quarter and HE never went. it came back to him. think about that sentence as long as I have", timestamp: "2026-06-03T21:44:00", evidenceLabel: "1987: a missing spotter's card returned itself, one corner burned" },
      ],
    },
    {
      id: "c14-th-nws",
      contactName: "NWS Spotter Desk",
      messages: [
        { id: "c14-m-nw-1", from: "owner", text: "Spotter WX-341 (Kessler) reporting: my app shows persistent rotation NE of Hollett Crossing, source 'Station 7.' Visual: clear air. Reporting the discrepancy, not the storm.", timestamp: "2026-06-02T10:00:00", evidenceLabel: "He reported it correctly: the discrepancy, not the storm" },
        { id: "c14-m-nw-2", from: "them", text: "Thanks WX-341. No returns at that location on any operational site. Station 7 was decommissioned in 1988 — if an app is labeling a layer with that ID, it's corrupt archive data. Good instinct reporting it. Stay with visuals.", timestamp: "2026-06-02T10:30:00" },
        { id: "c14-m-nw-3", from: "owner", text: "Understood. One more: does the archive explain why Station 7 was decommissioned?", timestamp: "2026-06-02T10:35:00" },
        { id: "c14-m-nw-4", from: "them", text: "Before my time. File says 'data integrity.' Off the record, WX-341: my predecessor kept a note taped in the desk drawer that says 'do not answer questions about 7 after dark.' Retiring in August, so — it's 10:36 AM, and that's everything I know.", timestamp: "2026-06-02T10:36:00", evidenceLabel: "The NWS desk note: “do not answer questions about 7 after dark.”" },
      ],
    },
    {
      id: "c14-th-dana",
      contactName: "Dana (ex, Leo's mom)",
      contactNumber: "(316) 555-0119",
      messages: [
        { id: "c14-m-da-1", from: "them", text: "leo's science fair is the 26th. he built a wind tunnel out of a box fan and my good hair dryer. be there or explain yourself to him, I'm out of the middle", timestamp: "2026-06-15T12:00:00" },
        { id: "c14-m-da-2", from: "owner", text: "wouldn't miss it. also tell him the hair dryer counts as 'borrowed for science' which is legally different from taken", timestamp: "2026-06-15T12:20:00" },
        { id: "c14-m-da-3", from: "them", text: "wade. bobbi called me. why is bobbi calling ME about where you chase. we've been divorced four years and I STILL know that means you're doing the thing where you go alone", timestamp: "2026-06-18T21:00:00", evidenceLabel: "Dana: “you're doing the thing where you go alone”" },
        { id: "c14-m-da-4", from: "owner", text: "one more trip out there and I'm done with it. I'm documenting something and then I'm handing it to people smarter than me. I promise. science fair on the 26th. I'll be the loud dad", timestamp: "2026-06-18T21:15:00", evidenceLabel: "“one more trip out there and I'm done… I'll be the loud dad”" },
      ],
    },
    {
      id: "c14-th-hollett",
      contactName: "Marv Hollett",
      contactNumber: "(316) 555-0163",
      messages: [
        { id: "c14-m-ho-1", from: "owner", text: "Mr. Hollett — Wade Kessler, the spotter who's been parking at your gate. Thanks for not shooting at me. Question: why's the quarter section fallow? Rest of your ground is immaculate.", timestamp: "2026-06-08T17:00:00" },
        { id: "c14-m-ho-2", from: "them", text: "Dad's rule, then mine: we don't work the northeast quarter. Equipment quits in it. Not breaks — QUITS. Diesel dies at the property line and starts on the other side. GPS on the combine says it's raining. It has said that for as long as combines have had GPS.", timestamp: "2026-06-08T17:30:00", evidenceLabel: "The farmer: equipment QUITS in the quarter — combine GPS says it's raining, always" },
        { id: "c14-m-ho-3", from: "owner", text: "Since '87?", timestamp: "2026-06-08T17:32:00" },
        { id: "c14-m-ho-4", from: "them", text: "Since '87. Dad watched the funnel come across Route 12 and set down in that corner like a dog told to sit. His word. SIT. Then the sirens quit and the sky went blue and the field's been wrong ever since. We let it have the quarter. Cheap rent, considering.", timestamp: "2026-06-08T17:40:00", evidenceLabel: "“Set down in that corner like a dog told to sit… We let it have the quarter. Cheap rent, considering.”" },
      ],
    },
    {
      id: "c14-th-work",
      contactName: "Kessler HVAC (Ray)",
      contactNumber: "(316) 555-0188",
      messages: [
        { id: "c14-m-wo-1", from: "them", text: "mrs deitz's AC again. she says it's 'breathing weird.' it's a compressor, wade, but she asks for you because you 'listen to it right'", timestamp: "2026-06-16T08:00:00" },
        { id: "c14-m-wo-2", from: "owner", text: "on it after lunch. and she's not wrong, machines tell you everything if you listen right. people too. weather too", timestamp: "2026-06-16T08:15:00" },
      ],
    },
    {
      id: "c14-th-nimbus",
      contactName: "NimbusTrak Support",
      messages: [
        { id: "c14-m-ni-1", from: "owner", text: "Bug report: my install shows a persistent layer sourced 'STATION 7' that I cannot disable. Attached diagnostics.", timestamp: "2026-06-04T11:00:00" },
        { id: "c14-m-ni-2", from: "them", text: "NimbusTrak: Thanks Wade! We checked your diagnostics. There is no layer named STATION 7 in your install, and the attached file you sent us is empty (0 KB). Try reinstalling!", timestamp: "2026-06-04T13:00:00", evidenceLabel: "Support received his diagnostics as an empty file. Twice." },
        { id: "c14-m-ni-3", from: "owner", text: "Reinstalled. It survived the reinstall. It's the only thing that survived the reinstall — I lost all my saved chase logs, but station 7 is still there.", timestamp: "2026-06-04T15:20:00", evidenceLabel: "The layer survived a full reinstall. Nothing else did." },
        { id: "c14-m-ni-4", from: "them", text: "NimbusTrak: That's not possible, but we believe you believe it! Escalating to engineering. (Engineering note, sent in error: 'another 88 ticket. archive & close per policy.')", timestamp: "2026-06-04T16:00:00", evidenceLabel: "Engineering's note, sent in error: “another 88 ticket. archive & close per policy.”" },
      ],
    },
    {
      id: "c14-th-unknown",
      contactName: "Unknown",
      messages: [
        {
          id: "c14-m-un-1",
          from: "them",
          text: "spotter wx-341. report conditions at your location.",
          timestamp: "2026-06-14T04:40:00",
          evidenceLabel: "4:40 AM, unknown number, spotter-net phrasing: “report conditions at your location.”",
        },
        { id: "c14-m-un-2", from: "owner", text: "who is this? I report to the NWS desk, not this number", timestamp: "2026-06-14T08:30:00" },
        { id: "c14-m-un-3", from: "them", text: "the desk closes. the net doesn't. three positions open. report conditions.", timestamp: "2026-06-14T08:31:00", evidenceLabel: "“the desk closes. the net doesn't. three positions open.”" },
      ],
    },
  ],

  photos: [
    {
      id: "c14-ph-rig",
      caption: "eleven seasons on this rig. hail dents are trophies. the marker tornado on the hood is leo's and it stays FOREVER",
      timestamp: "2026-05-12T10:00:00",
      aspect: "landscape",
      meta: { takenAt: "2026-05-12T10:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1a1e26"/>` +
          `<rect x="60" y="130" width="280" height="100" rx="14" fill="#7a2f2a"/>` +
          `<rect x="60" y="150" width="80" height="50" rx="8" fill="#12161c"/>` +
          `<circle cx="130" cy="235" r="24" fill="#0a0c0e"/><circle cx="300" cy="235" r="24" fill="#0a0c0e"/>` +
          `<path d="M240 150 q-8 22 4 40 q10 14 2 26" stroke="#2a3340" stroke-width="5" fill="none"/>` +
          `<path d="M180 60 v70 M180 60 h-30 M180 75 h-22" stroke="#3d4653" stroke-width="4"/>` +
          `<circle cx="150" cy="60" r="6" fill="#26303a"/>`,
        { aspect: "landscape", base: "#141821", grain: 0.12 },
      ),
    },
    {
      id: "c14-ph-wallcloud",
      caption: "may 14. beautiful structure near ellis. THIS is why. no app needed — you can feel a real one in your fillings",
      timestamp: "2026-05-14T18:30:00",
      aspect: "landscape",
      meta: { takenAt: "2026-05-14T18:30:00", device: "This phone", location: "near Ellis" },
      evidenceLabel: "A real chase, May 14 — he knew exactly what genuine storms look like",
      svg: photoSvg(
        `<rect width="400" height="300" fill="#232833"/>` +
          `<ellipse cx="200" cy="60" rx="240" ry="80" fill="#14181f"/>` +
          `<ellipse cx="200" cy="110" rx="150" ry="50" fill="#0e1116"/>` +
          `<path d="M140 140 Q200 190 250 145" fill="#0a0c10"/>` +
          `<rect y="240" width="400" height="60" fill="#1d2214"/>` +
          `<rect x="330" y="200" width="6" height="45" fill="#11140b"/>`,
        { aspect: "landscape", base: "#181d26", grain: 0.12 },
      ),
    },
    {
      id: "c14-ph-radar",
      caption: "the cell. TVS marker, debris ball, textbook hook. source: station 7. every OTHER source: nothing. one of my instruments is lying and I no longer know which side the liar is on",
      timestamp: "2026-05-30T16:45:00",
      aspect: "portrait",
      meta: { takenAt: "2026-05-30T16:45:00", device: "This phone (screenshot)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0a0d10"/>` +
          `<rect x="20" y="50" width="260" height="300" rx="8" fill="#0d1218"/>` +
          `<circle cx="150" cy="200" r="120" fill="none" stroke="#1a2a1e" stroke-width="1.5"/>` +
          `<circle cx="150" cy="200" r="80" fill="none" stroke="#1a2a1e" stroke-width="1.5"/>` +
          `<path d="M150 200 m-30 -10 q20 -35 55 -18 q30 15 18 48 q-10 28 -42 22 q-25 -5 -31 -30" fill="#2c5c2e"/>` +
          `<path d="M150 200 m-15 -5 q15 -20 35 -8 q18 10 10 30 q-8 16 -26 12" fill="#8a7c2e"/>` +
          `<path d="M155 205 q10 -10 20 -2 q8 7 2 16 q-7 8 -16 4z" fill="#8a3a2e"/>` +
          `<circle cx="163" cy="212" r="5" fill="#c05252"/>` +
          `<path d="M158 226 l-8 12 l14 -4z" fill="#c05252"/>` +
          `<text x="150" y="330" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a7a5c">SRC: STATION 7 · updated 4s ago</text>` +
          `<text x="150" y="345" text-anchor="middle" font-family="monospace" font-size="8" fill="#3a5c46">cell age: [OVERFLOW]</text>`,
        { aspect: "portrait", base: "#080b0e", grain: 0.09 },
      ),
      evidenceLabel: "The screenshot: a textbook violent supercell — cell age field reading [OVERFLOW]",
    },
    {
      id: "c14-ph-bluesky",
      caption: "and THIS is that exact location, same minute, my own eyes. bluest sky of the year. app in my left hand screaming tornado emergency. sky saying nothing at all. one of us is wrong and I've stopped assuming it's the app",
      timestamp: "2026-05-30T16:46:00",
      aspect: "landscape",
      meta: { takenAt: "2026-05-30T16:46:00", device: "This phone", location: "Hollett quarter, NE corner" },
      svg: photoSvg(
        `<rect width="400" height="220" fill="#2a3d52"/>` +
          `<rect y="220" width="400" height="80" fill="#3a3d22"/>` +
          `<path d="M0 220 h400" stroke="#2c2f1a" stroke-width="3"/>` +
          `<rect x="40" y="180" width="8" height="45" fill="#26291a"/><rect x="46" y="180" width="60" height="4" fill="#26291a"/>`,
        { aspect: "landscape", base: "#243448", grain: 0.1 },
      ),
      evidenceLabel: "The same coordinates, the same minute: cloudless blue",
    },
    {
      id: "c14-ph-dome",
      caption: "station 7. decommissioned '88. no power lines in. the dish is rusted SOLID. and if you stand under it you can hear it turning. not see. HEAR",
      timestamp: "2026-06-05T15:20:00",
      aspect: "portrait",
      meta: { takenAt: "2026-06-05T15:20:00", device: "This phone", location: "Station 7 site, Rt 12" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#1a1f26"/>` +
          `<rect x="120" y="180" width="60" height="180" fill="#232830"/>` +
          `<circle cx="150" cy="140" r="70" fill="#2c323c"/>` +
          `<circle cx="150" cy="140" r="70" fill="none" stroke="#181c22" stroke-width="4"/>` +
          Array.from({ length: 5 }, (_, i) => `<path d="M${95 + i * 27} 105 q13 ${18 + (i % 2) * 6} 0 70" stroke="#1d222a" stroke-width="2" fill="none"/>`).join("") +
          `<rect x="130" y="330" width="40" height="30" fill="#171b21"/>` +
          `<text x="150" y="385" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a5560">CH 88 · U.S. WEATHER SVC · KEEP OUT</text>`,
        { aspect: "portrait", base: "#141820", grain: 0.14 },
      ),
      evidenceLabel: "Station 7: no power since 1988 — “you can hear the dish turning”",
    },
    {
      id: "c14-ph-anemometer",
      caption: "video still. my anemometer at the gate. spinning at 38-42mph. the grass around it: STILL. leo's kite string test: STILL. I have been an instrument guy my whole life and today I don't like instruments anymore",
      timestamp: "2026-06-12T17:10:00",
      aspect: "portrait",
      meta: { takenAt: "2026-06-12T17:10:00", device: "This phone (video still)", location: "Hollett quarter gate" },
      svg: photoSvg(
        `<rect width="300" height="260" fill="#2a3d52"/>` +
          `<rect y="260" width="300" height="140" fill="#3a3d22"/>` +
          `<rect x="145" y="120" width="10" height="180" fill="#26291a"/>` +
          `<ellipse cx="150" cy="115" rx="52" ry="14" fill="#1d2026" opacity="0.85"/>` +
          `<ellipse cx="150" cy="115" rx="30" ry="8" fill="#2c3038" opacity="0.6"/>` +
          Array.from({ length: 7 }, (_, i) => `<path d="M${60 + i * 30} ${300 + (i % 3) * 14} v-22" stroke="#2c2f1a" stroke-width="2"/>`).join("") +
          `<text x="150" y="380" text-anchor="middle" font-family="monospace" font-size="9" fill="#5c5f42">cups: blur. grass: portrait mode.</text>`,
        { aspect: "portrait", base: "#243040", grain: 0.11 },
      ),
      evidenceLabel: "The anemometer spinning at 40 mph in air that couldn't move a kite string",
    },
    {
      id: "c14-ph-hail",
      caption: "",
      timestamp: "2026-06-15T18:40:00",
      aspect: "landscape",
      meta: { takenAt: "2026-06-15T18:40:00", device: "This phone", location: "Hollett quarter, NE corner" },
      svg: photoSvg(
        `<rect width="400" height="120" fill="#2a3d52"/>` +
          `<rect y="120" width="400" height="180" fill="#3a3d22"/>` +
          Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return `<circle cx="${200 + Math.cos(a) * 90}" cy="${210 + Math.sin(a) * 40}" r="${5 + (i % 3)}" fill="#d8e0e4" opacity="0.85"/>`;
          }).join("") +
          `<text x="200" y="285" text-anchor="middle" font-family="monospace" font-size="9" fill="#5c5f42">hail. in june. in 90 degrees. in a circle. not melting. I timed it. NOT MELTING.</text>`,
        { aspect: "landscape", base: "#2c3620", grain: 0.11 },
      ),
      evidenceLabel: "Hail on 90-degree ground, in a perfect circle, not melting",
    },
    {
      id: "c14-ph-clipping",
      caption: "",
      timestamp: "2026-06-09T20:30:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2026-06-09T20:30:00", device: "This phone (library microfilm)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#141210"/>` +
          `<rect x="40" y="50" width="220" height="300" fill="#cfc7b2" opacity="0.88"/>` +
          `<text x="150" y="85" text-anchor="middle" font-family="serif" font-size="12" fill="#2a2620">TWISTER 'NEVER LIFTED,'</text>` +
          `<text x="150" y="102" text-anchor="middle" font-family="serif" font-size="12" fill="#2a2620">RADAR CLAIMS; THREE MISSING</text>` +
          Array.from({ length: 9 }, (_, i) => `<rect x="60" y="${125 + i * 17}" width="${180 - ((i * 29) % 60)}" height="4" fill="#8b8371"/>`).join("") +
          `<rect x="60" y="290" width="180" height="42" fill="#c4bca8"/>` +
          `<text x="150" y="306" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">“the site's final transmission repeated one phrase</text>` +
          `<text x="150" y="318" text-anchor="middle" font-family="serif" font-size="7" fill="#7a3a42">on the spotter net for six hours before shutdown:</text>` +
          `<text x="150" y="330" text-anchor="middle" font-family="serif" font-size="8" fill="#7a3a42">'three positions open. report conditions.'”</text>`,
        { aspect: "portrait", base: "#0f0d0a", grain: 0.1 },
      ),
      evidenceLabel: "The 1987 clipping: Station 7's final transmission — “three positions open. report conditions.”",
    },
    {
      id: "c14-ph-dashcam",
      caption: "",
      timestamp: "2026-06-21T19:58:00",
      aspect: "landscape",
      deleted: true,
      meta: { takenAt: "2026-06-21T19:58:00", editedAt: "2026-06-21T19:54:00", device: "Dash cam (auto-import)", location: "Hollett quarter gate" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#101318"/>` +
          `<rect x="20" y="20" width="360" height="200" rx="6" fill="#182028"/>` +
          `<rect x="30" y="30" width="340" height="120" fill="#22364a"/>` +
          `<rect x="30" y="150" width="340" height="50" fill="#2e3120"/>` +
          `<path d="M180 30 Q200 30 210 60 Q225 100 205 150 L165 150 Q150 100 165 60 Q172 30 180 30z" fill="#0a0d12"/>` +
          `<ellipse cx="188" cy="34" rx="90" ry="14" fill="#0c1016"/>` +
          `<rect x="0" y="230" width="400" height="70" fill="#0b0d10"/>` +
          `<text x="200" y="262" text-anchor="middle" font-family="monospace" font-size="9" fill="#4a5560">through the WINDSHIELD: the wedge. out the SIDE WINDOW, same frame: blue sky.</text>` +
          `<text x="200" y="280" text-anchor="middle" font-family="monospace" font-size="8" fill="#39404b">the storm exists straight ahead. only straight ahead. it exists in the direction of looking.</text>`,
        { aspect: "landscape", base: "#0c0f13", grain: 0.14 },
      ),
      evidenceLabel: "The dash cam frame: the tornado visible through the windshield — blue sky out the side window, same frame",
    },
    {
      id: "c14-ph-nightfield",
      caption: "",
      timestamp: "2026-06-21T20:04:00",
      aspect: "landscape",
      meta: { takenAt: "2026-06-21T20:04:00", device: "This phone", location: "Hollett quarter" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#060708"/>` + blurStreak(200, 200, 100, "#12160e", 0.4),
        { aspect: "landscape", base: "#050607", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="400" height="300" fill="#0a0d08"/>` +
            Array.from({ length: 4 }, (_, i) => `<ellipse cx="200" cy="200" rx="${160 - i * 35}" ry="${55 - i * 12}" fill="none" stroke="#1a2212" stroke-width="6" transform="rotate(${i * 8} 200 200)"/>`).join("") +
            figure(120, 190, 0.85, 0.5, "#05070a") +
            figure(285, 195, 0.85, 0.5, "#05070a") +
            figure(200, 145, 0.85, 0.5, "#05070a") +
            `<text x="200" y="278" text-anchor="middle" font-family="monospace" font-size="9" fill="#3f4a38">the grass lies down in a spiral. and standing in the lanes: three people. spotting. facing the center. positions one, two, three.</text>` +
            timestampBurn("20:04:41", 400, 300),
          { aspect: "landscape", base: "#080a06", grain: 0.13 },
        ),
      },
      evidenceLabel: "His flashlight photo: grass flattened in a spiral — three figures standing in it, facing the center",
    },
    {
      id: "c14-ph-leo-drawing",
      caption: "leo's science fair preview: 'THE FUJITA SCALE by leo k.' there's a sixth drawing after F5. he labeled it 'dad's one.' kid draws a storm standing still. I never told him it stands still",
      timestamp: "2026-06-17T19:00:00",
      aspect: "portrait",
      meta: { takenAt: "2026-06-17T19:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#161310"/>` +
          `<rect x="45" y="50" width="210" height="300" fill="#d8d2c2" opacity="0.9"/>` +
          `<text x="150" y="85" text-anchor="middle" font-family="serif" font-size="11" fill="#3a5c8a">THE FUJITA SCALE by leo k.</text>` +
          Array.from({ length: 5 }, (_, i) => `<path d="M${70 + i * 36} 130 q8 -25 ${6 + i * 2} -45" stroke="#55503f" stroke-width="${2 + i}" fill="none"/><text x="${70 + i * 36}" y="145" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">F${i}</text>`).join("") +
          `<path d="M150 230 q0 -30 0 -55 q0 -20 0 -20" stroke="#7a3a42" stroke-width="8" fill="none"/>` +
          `<ellipse cx="150" cy="150" rx="40" ry="10" fill="#7a3a42" opacity="0.6"/>` +
          `<text x="150" y="250" text-anchor="middle" font-family="serif" font-size="9" fill="#7a3a42">dad's one</text>` +
          `<text x="150" y="268" text-anchor="middle" font-family="serif" font-size="8" fill="#55503f">(it doesn't go anywhere. it waits.)</text>`,
        { aspect: "portrait", base: "#100e0a", grain: 0.1 },
      ),
      evidenceLabel: "Leo's drawing: a sixth tornado after F5, labeled “dad's one — it doesn't go anywhere. it waits.”",
    },
  ],

  notes: [
    {
      id: "c14-n-chaselog",
      title: "chase log — the stationary cell",
      timestamp: "2026-06-19T22:00:00",
      evidenceLabel: "His chase log: three weeks of measurements at the Hollett quarter",
      body:
        "logging like a spotter, not a believer. dates, numbers, facts.\n\nmay 28 — first paint. station 7 layer, can't disable. cell age field: overflow. filed with nimbustrak AND nws. did everything right. want that on record: I did everything RIGHT first.\n\njun 1 — site visit 1. clear air. pressure 940mb ON MY KESTREL — that's hurricane-core pressure, under blue sky. recalibrated. 940 again. bought a second kestrel. 940.\n\njun 5 — station 7 site. dish rusted solid, and turning-sound anyway, once per 4 seconds. same as the feed's update rate. stood there 20 min matching it against the app. sync never drifted. a dead antenna is SCANNING.\n\njun 8 — marv hollett's testimony. 'sit.' like a dog told to sit. 38 years.\n\njun 12 — anemometer test. 40mph in dead calm. leo's kite string: limp. instruments believe the storm. bodies don't. or bodies believe it slower.\n\njun 15 — the hail circle. not melting. took a piece in the cooler: melted NORMALLY once it crossed the property line. took video. video file corrupts at exactly the property line every time. four takes.\n\njun 21 plan — last trip, full documentation: dashcam, both kestrels, the good camera, tripods at positions marked on grizz's dad's old spotter map (found it at the historical society — three positions marked around the NE corner, initialed by the three who never came back. they were STATIONED there. it wasn't random. the net posted them).\n\nafter this: everything goes to the NWS, the state climatologist, and honestly whoever answers. then science fair on the 26th. then blue-sky drives with my boy until he's sick of me.\n\nthe rest is locked. code: the station, then the channel.",
    },
    {
      id: "c14-n-locked",
      title: "read this one, bobbi",
      timestamp: "2026-06-21T18:30:00",
      lock: {
        code: "0788",
        hintText: "“the station, then the channel.” — the dead radar has a number; the old spotter net had another.",
        clueSourceIds: ["c14-th-forum", "c14-ph-dome"],
      },
      evidenceLabel: "The locked note, written at the gate, 90 minutes before the end",
      body:
        "bobbi. writing this in the truck at the gate because you're the only one who won't sand the edges off it when you pass it on.\n\nwhat I think it is, in spotter language:\n\nin '87 an F4 crossed route 12 and something about this quarter section CAUGHT it. don't ask me the mechanism — ask me the evidence: a storm that radar tracked to a point and never off it. a station that recorded the truth and got decommissioned for it. three spotters posted to positions around it who never came home, and a spotter NET that kept transmitting 'three positions open' for six hours after everyone had run. it wasn't malfunctioning, bobbi. it was RECRUITING. it's been recruiting on channel 88 for thirty-eight years, and station 7's feed found its way into my app because I'm the kind of man who checks the discrepancy instead of updating the software. it posts positions. it staffs itself. every net needs spotters and this storm intends to be watched.\n\nthe three figures in my night photo are standing at grizz's dad's map positions. positions one, two, three. still on duty. facing the center. and the center — the app has always shown four TVS markers, bobbi. I thought it was noise. it's not noise. it's position four, and it's open, and the unknown number keeps asking me to report conditions.\n\nso here's what I want you to know before I walk the fence line WITH THE CAMERA, WHICH IS ALL I'M DOING:\n\n1. everything's documented. cooler in the truck bed: hail sample, both kestrels, the spotter map, microfilm copies. chain of custody starts with you.\n2. if the anemometer's still spinning when someone finds the truck: DO NOT stand in the northeast corner longer than feels reasonable. you'll know what 'reasonable' means when you feel it end.\n3. tell dana I said the loud-dad thing and meant it. tell leo his sixth drawing was right and his mother is never to know I confirmed it. tell him the safest storm in kansas turned out to need watching after all, and his dad was a trained spotter, and trained spotters don't abandon a watch.\n\nit's been the honor of my life to look at the sky on purpose. — WX-341, reporting conditions.",
    },
    {
      id: "c14-n-hvac",
      title: "work — parts to order",
      timestamp: "2026-06-16T12:00:00",
      evidenceLabel: "His parts list for Tuesday — a man mid-week, mid-life, mid-plan",
      body: "deitz compressor: soft-start kit (listen to it Tuesday first)\nmiller house: filter driers x2\nshop: refrigerant scale battery\n\n(mrs deitz is right by the way. it IS breathing weird. everything on this ticket list is breathing weird lately. or I'm listening too right.)",
    },
    {
      id: "c14-n-leolist",
      title: "leo's 12th bday plan (2 yrs out, start now)",
      timestamp: "2026-06-11T21:00:00",
      body: "the BLUE SKY TOUR:\n- greensburg (rebuilt town, hope part of the lesson)\n- the ellis overlook where I shot the may 14 structure\n- cordell's diner (pie, non-negotiable)\n- NWS office tour (ask jerry)\n\nNOT on the tour: you know where. some storms you show your kid. some you just keep between you and the sky.",
    },
  ],

  voicemails: [
    {
      id: "c14-vm-bobbi",
      callerLabel: "Bobbi (chase)",
      callerNumber: "(316) 555-0177",
      timestamp: "2026-06-21T21:00:00",
      durationSec: 30,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Wade Kessler. I am forty minutes out with a thermos and a bad attitude. Your dot's been parked at that gate for three hours. Here's what's going to happen: you're going to be leaning on the truck when I get there, looking embarrassed, and we are going to laugh about the haunted radar for the rest of our lives. That's the forecast. Verify it for me, partner. Verify.”",
    },
    {
      id: "c14-vm-leo",
      callerLabel: "Leo 🌪",
      callerNumber: "(316) 555-0142",
      timestamp: "2026-06-22T09:30:00",
      durationSec: 21,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Dad it's me. Mom's on her phone in the kitchen doing her quiet voice. Um. My wind tunnel works. The hair dryer part broke but I fixed it with the thing you taught me, the tape-then-think method. Science fair's thursday. You said loud dad. You promised loud dad. …okay bye.”",
    },
    {
      id: "c14-vm-nws",
      callerLabel: "NWS Spotter Desk",
      timestamp: "2026-06-22T14:00:00",
      durationSec: 27,
      tone: "plain",
      evidenceLabel: "The NWS desk, off the record at last: Station 7 pinged the network the night Wade vanished",
      transcript:
        "[automated transcript — audio partially recovered]\n“WX-341, it's the desk. Officially: we show no weather at your last reported location and this voicemail doesn't exist. Unofficially — at 20:16 last night, for the first time since 1988, Station 7 handshook the national network. Four seconds of carrier. One data packet. It was a spotter position report, WX-341. Format's obsolete but the field mapping is clear: 'POSITION 4: STAFFED.' I'm retiring in August. I'm retiring TODAY, actually. Godspeed.”",
    },
    {
      id: "c14-vm-chase",
      callerLabel: "No Caller ID",
      timestamp: "2026-06-23T16:20:00",
      durationSec: 48,
      tone: "distorted",
      evidenceLabel: "Wade's voice, calm and professional, narrating a storm — two days after",
      transcript:
        "[automated transcript — speaker identification: KESSLER, WADE (97% confidence)]\n[wind. constant, enormous, without gusts — wind like a held note]\n“…confirmed large wedge on the ground, rain-wrapped on the north side, debris cloud well-defined. Motion is… stationary. Repeating: motion stationary. It's beautiful, control. Visibility from position four is — you can see everything from in here. You can see the whole sky doing what it's always wanted to—”\n[the wind does not change. the message simply ends.]\n\n⚠ EVIDENCE ANNOTATION: background wind analysis matches no recorded storm audio: zero gust variance, constant 40 mph equivalent — 'the sound of wind that has stopped needing weather,' per the (former) NWS desk officer's file note.",
    },
    {
      id: "c14-vm-station",
      callerLabel: "STATION 7 — admin line",
      callerNumber: "(316) 555-0007",
      timestamp: "2026-06-23T20:16:00",
      durationSec: 82,
      tone: "breathing",
      evidenceLabel: "From Station 7's admin line, disconnected since 1988: the spotter net, still transmitting",
      transcript:
        "[automated transcript — mechanical and atmospheric sources]\n[a weather teletype, hammering steadily]\n[beneath it: rotation. patient, vast, four seconds per cycle — matched to the dish, matched to the feed, matched to everything in this file that turns]\n[the teletype stops]\n[a tone — the old spotter net activation tone, channel 88]\n[a voice, neither male nor female, with the cadence of a recorded announcement worn soft by decades:]\n“spotter net is active. all positions staffed. the watch continues until conditions change.”\n[pause]\n“conditions have not changed since June 12, 1987.”\n[the teletype resumes]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: line disconnected 1988. No billing entity. The message arrived while the device was in evidence processing, during dead calm, under the bluest sky of the year.",
    },
  ],

  calendarEvents: [
    { id: "c14-cal-chase", title: "chase day (SPC permitting) 🌪", date: "2026-05-14", time: "12:00", recurring: "weekly", createdBy: "owner" },
    { id: "c14-cal-leo", title: "LEO WEEKEND 🧢", date: "2026-06-13", time: "17:00", recurring: "weekly", createdBy: "owner" },
    { id: "c14-cal-fair", title: "LEO'S SCIENCE FAIR — BE LOUD DAD", date: "2026-06-26", time: "18:00", createdBy: "owner", struck: true, evidenceLabel: "The science fair — struck through June 22 by no account" },
    {
      id: "c14-cal-activation",
      title: "spotter activation",
      date: "2026-06-14",
      time: "16:20",
      recurring: "daily",
      createdBy: "unknown",
      detail: "Appeared Jun 14, the morning after the 4:40 AM text. Daily, 4:20 PM — the minute of the 1987 touchdown, per the microfilm. No account. No reminder. It has never once needed one.",
      evidenceLabel: "A daily “spotter activation” at 4:20 PM — the 1987 touchdown minute — created by no one",
    },
    { id: "c14-cal-deitz", title: "mrs deitz AC (listen right)", date: "2026-06-24", time: "10:00", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c14-pin-home", label: "Home — Garfield St", timestamp: "2026-06-20T22:00:00", x: 20, y: 35 },
    { id: "c14-pin-shop", label: "Kessler HVAC", timestamp: "2026-06-19T08:00:00", x: 30, y: 45 },
    { id: "c14-pin-station7", label: "Station 7 site — Rt 12", timestamp: "2026-06-05T15:00:00", x: 65, y: 25, evidenceLabel: "His June 5 visit to the dead radar — twenty minutes matching a rusted dish to a live feed" },
    { id: "c14-pin-historical", label: "County historical society", timestamp: "2026-06-18T14:00:00", x: 42, y: 55, detail: "Where he found the 1987 spotter map — three positions, three sets of initials." },
    {
      id: "c14-pin-gate",
      label: "Hollett quarter — gate",
      timestamp: "2026-06-21T17:55:00",
      x: 82,
      y: 62,
      detail: "Arrived 5:55 PM. The phone logged steady fixes at the gate until 8:04 (the night photo), then began recording positions INSIDE the field.",
      evidenceLabel: "The gate: his documented, careful arrival — cooler packed, chain of custody prepared",
    },
    {
      id: "c14-pin-field",
      label: "Hollett quarter — NE corner",
      timestamp: "2026-06-21T20:16:00",
      x: 86,
      y: 58,
      detail: "Final fix: 8:16 PM, the northeast corner — position four on the 1987 spotter map. The fix reports wind: 40 mph, pressure: 940 mb, precipitation: heavy. The nearest weather to those readings was 900 miles away. The phone was in the truck at the gate the entire time. Both things are true. The file holds them side by side because nothing else will hold them at all.",
      evidenceLabel: "Final fix: position four — reporting hurricane-core conditions from inside a clear June evening",
    },
  ],

  browserHistory: [
    { id: "c14-b-skewt", query: "skew-t interpretation cheat sheet", timestamp: "2026-05-10T20:00:00" },
    { id: "c14-b-ghost", query: "radar cell on my app not on mosaic anyone else nimbustrak", timestamp: "2026-05-28T17:00:00", evidenceLabel: "May 28: searching for anyone else who could see it" },
    { id: "c14-b-station7", query: "station 7 radar decommissioned 1988 why data integrity", timestamp: "2026-06-02T11:00:00" },
    { id: "c14-b-1987", query: "hollett quarter 1987 tornado missing spotters", timestamp: "2026-06-06T21:30:00", evidenceLabel: "The 1987 event: three spotters, never located, file “thinned”" },
    { id: "c14-b-pressure", query: "940mb surface pressure clear sky possible instrument error", timestamp: "2026-06-01T20:00:00", evidenceLabel: "“940mb surface pressure clear sky possible” — it is not possible" },
    { id: "c14-b-loop", query: "can decommissioned radar transmit no power how", timestamp: "2026-06-05T22:00:00" },
    { id: "c14-b-net", query: "old spotter net channel 88 history kansas", timestamp: "2026-06-14T09:00:00" },
    { id: "c14-b-last", query: "how far is safe from a stationary tornado", timestamp: "2026-06-21T17:40:00", evidenceLabel: "His last search, from the gate: “how far is safe from a stationary tornado”" },
  ],

  hiddenApp: {
    disguiseIcon: "weather",
    disguiseLabel: "BaroLog",
    revealAfterClueIds: ["c14-th-forum", "c14-n-chaselog"],
    title: "STATION 7 — Spotter Net",
    heading: "Channel 88 · the watch continues",
    body:
      "A barometer app he didn't install, showing 940 mb in every weather. Its settings screen is not a settings screen.\n\nIt is the spotter net's roster, and it has been keeping the watch staffed since the desk stopped answering questions about it.",
    entries: [
      { label: "THE CELL", status: "● ON THE GROUND", detail: "since 06/12/1987 16:20 · motion: nil · age: [OVERFLOW]" },
      { label: "POSITION 1 — D. ARNETT", status: "STAFFED 1987", detail: "spotter card returned · corner burned" },
      { label: "POSITION 2 — F. OKAFOR", status: "STAFFED 1987", detail: "reports continuous · format obsolete" },
      { label: "POSITION 3 — J. TICE", status: "STAFFED 1987", detail: "reports continuous · format obsolete" },
      { label: "POSITION 4 — W. KESSLER (WX-341)", status: "STAFFED 06/21", detail: "reports: exemplary · 'it's beautiful, control'" },
      { label: "NET COVERAGE", status: "COMPLETE", detail: "first full staffing since touchdown · watch quality: high" },
      { label: "RECRUITMENT", status: "SUSPENDED", detail: "note: 'the watch is whole. unless someone comes looking.'" },
    ],
    footer:
      "Four positions around a storm that never moves, staffed across four decades by people who checked the discrepancy instead of updating the software. The net's recruitment line is suspended — the watch is whole. The final note is the only warning in this archive addressed, unambiguously, to the person reading it: unless someone comes looking.",
    evidenceLabel: "The Spotter Net roster: positions 1–4 STAFFED — Kessler's reports “exemplary” — recruitment “suspended… unless someone comes looking”",
  },

  liveEvents: [
    {
      id: "c14-live-unknown",
      kind: "message",
      afterSeconds: 340,
      threadId: "c14-th-unknown",
      message: {
        id: "c14-m-un-live",
        from: "them",
        text: "reader of this device: report conditions at your location. take your time. the net is patient. the net has been patient since 1987.",
        timestamp: "2026-06-23T21:21:00",
        evidenceLabel: "To whoever reads the phone: “report conditions at your location. the net is patient.”",
      },
    },
    {
      id: "c14-live-baro",
      kind: "notification",
      afterSeconds: 630,
      title: "BaroLog",
      body: "Pressure at your location: 940 mb and steady.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c14-v-weather",
      label: "A real storm killed him — briefly, locally, unwarned",
      description: "Landspouts spin up in minutes and vanish in fewer. A chaser standing in the wrong field met ordinary weather with no witnesses.",
      requiredEvidenceIds: ["c14-b-last", "c14-ph-wallcloud", "c14-m-bo-9"],
      isCanon: false,
      epilogue:
        "The meteorological verdict requires one small thing: weather. There was none. Not a cloud within four hundred miles, not a gust on any station, not a grain of dust displaced on the neighboring quarters. The damage survey team walks the field and finds the spiral in the grass — and their report, written by people who measure wind for a living, calls it 'lodging consistent with sustained rotational flow' and then, in a hand-written margin note the typed version omits: 'consistent with a tornado that stood here a very long time. Years. Do not quote me.'\n\nThe verdict is filed because something must be. Bobbi refuses to sign her witness statement until the word 'unwarned' is struck. 'He was warned,' she tells the detective, 'by everything except the sky. He warned US. There's a difference between unwarned and unbelieved, and he's owed the right word.' They strike it. It's the only correction anyone wins in this entire file.",
    },
    {
      id: "c14-v-spoof",
      label: "Someone spoofed the feed to lure him",
      description: "Radar layers can be faked. A rival, an obsessive, someone who knew chasers can't leave a discrepancy alone.",
      requiredEvidenceIds: ["c14-m-ni-4", "c14-m-un-1", "c14-m-fo-1"],
      isCanon: false,
      epilogue:
        "The human theory: a technically gifted somebody injecting a ghost layer, herding a known chaser to a lonely field. NimbusTrak's 'archive & close per policy' email thread gets subpoenaed and turns out to be worse than conspiracy — it's habit. Eleven '88 tickets' since 2009, all closed unread, a folder named LEGACY_NOISE that engineering treats the way farmers treat the northeast quarter.\n\nThe spoofing theory needs an origin point for the signal. The company's own network forensics find it, reluctantly, definitively: the Station 7 layer enters their pipeline from the direction of Station 7. From a facility with no power, no uplink, and a rusted dish that a contractor — sent to physically disconnect 'whatever is transmitting' — declines to approach after his ladder's aluminum feet, he swears in writing, grew warm. The work order is still open. It will remain open. Some tickets archive themselves.",
    },
    {
      id: "c14-v-net",
      label: "The watch took its fourth spotter",
      description: "A storm that sat down in 1987 and never got up. A dead station that kept its feed alive. Three positions staffed for four decades — and one opening.",
      requiredEvidenceIds: ["case-14.hidden", "c14-n-locked", "c14-vm-chase", "c14-ph-nightfield", "c14-vm-nws"],
      isCanon: true,
      epilogue:
        "You file what the instruments have been filing for thirty-eight years and what everyone with a pension declined to read: there is a storm on the Hollett quarter. It has been on the ground since June 12, 1987, at 4:20 PM. It does not move because it is not going anywhere; it is not weather anymore, if it ever was — it is a WATCH, and a watch requires watchers, and the old spotter net, faithful past death and decommissioning, has kept the positions staffed the only way it could: by posting them.\n\nWade Kessler did everything right. Your report says so in its first line, because Bobbi will read it and Leo will read it someday and it is true: he reported the discrepancy, escalated it, documented it, packed a cooler with evidence and chain-of-custody notes like the professional he was. Then he walked the fence line with a camera, because he was the kind of man who checks. The net had been recruiting that kind of man since 1987. It knows exactly one kind.\n\nThe voicemail in his own calm chase-voice — 'you can see everything from in here' — is ruled inadmissible, unexplainable, and unerasable; the evidence tech assigned to archive it requests a transfer instead. The county deeds the quarter to a land trust with a covenant nobody will admit to drafting: no entry, no instruments, no aerial survey. Cheap rent, considering.\n\nBobbi chases alone now, and every June 21st she parks at the gate at 5:55 PM with two thermoses and drinks them both, and reads the sky out loud like a report, because trained spotters don't abandon a watch and neither do their partners. The anemometer on the fence post — nobody remounted it; nobody will admit to not removing it — spins at forty, steady, all night.\n\nLeo's science fair went fine. His mother was loud enough for two. His wind tunnel won second place, and when the judge asked what he'd learned, the file's last witness statement records that a ten-year-old looked at her with his father's exact patience and said: 'That the instruments are honest. People just don't like their answers.'",
    },
    {
      id: "c14-v-left",
      label: "He burned out and drove away",
      description: "Chasers crack. Divorce, debt, eleven seasons of adrenaline — and a convenient legend to disappear into.",
      requiredEvidenceIds: ["c14-m-da-3", "c14-n-hvac", "c14-b-ghost"],
      isCanon: false,
      epilogue:
        "The burnout verdict lasts exactly as long as it takes to open his notes app. Men who flee their lives do not leave a two-year plan for their son's twelfth birthday with the pie stop already chosen. They do not schedule a compressor soft-start kit for Tuesday. They do not write 'BE LOUD DAD' in capital letters on a calendar they intend to abandon.\n\nIt closes for good at the science fair, where Dana — who has every earthly reason to believe the worst of Wade Kessler and has never once managed it — stands in for him at full volume, and afterward tells the detective the thing that unwrites the verdict: 'He was two years into planning a trip whose whole point was that the dangerous part was over. You don't run from a life like that. You run OUT of it, feet first, doing the thing you loved. Write that down instead.'\n\nThe detective writes it down. It's in the file, verbatim, initialed. Some corrections you win. Some you're handed by the people who knew better all along.",
    },
  ],
};

export default c14;
