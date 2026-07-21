import type { CaseFile } from "../types";
import { photoSvg, wall, figure, bloodSmear } from "../photoart";

/**
 * CASE 16 — THE 3:33 CALLER
 * Del Amara, 39. Host of "The Insomniac Hour," the 2–5 AM call-in show on
 * WVRN 1400 AM — a show corporate insists has been pre-recorded and
 * automated since 2019. Del hosted it live. Every night at 3:33 a caller
 * requested the same song and read her next words back to her before she
 * said them. On the last night, the request came in early.
 */

const c16: CaseFile = {
  id: "case-16",
  title: "The 3:33 Caller",
  victimName: "Del Amara, 39",
  summary:
    "For six years Del Amara talked strangers through their worst nights on WVRN 1400 AM. The station says the overnight show has been automated since 2019 — a recording, no live host, no phone line. Del's phone says otherwise: a call log full of 3:33 AMs, a caller who requested the same 1940s song every night, and a voice that answered her before she spoke. The night she vanished, the request came in at 3:11.",
  intake:
    "SUBJECT: Amara, Delphine 'Del' (39). Overnight radio host, WVRN 1400 AM. Reported missing by her producer after the 'automated' 3–5 AM block aired forty seconds of open-mic breathing on the night of the 9th.\n\nDEVICE: Recovered from the WVRN on-air studio, Studio B, charged, on the console. Her headphones were still on the hook. Her coffee was warm. The ON AIR light was lit; the board was in LIVE, a mode corporate says is physically disabled overnight.\n\nSTATION: WVRN 1400 AM. Per the licensee, 'The Insomniac Hour' has aired as a pre-recorded loop since a 2019 cost reduction eliminated all overnight staff. There is, per HR, no overnight host. Del Amara's last W-2 lists her as 'daytime traffic, part-time.' She was, per every listener who called our tip line, unmistakably live every night for six years.\n\nHISTORY: WVRN's overnight host from 1974–1979, Royce Vandermeer, vanished from the same studio in November 1979. The case remains open. The song 'Harbor Lights' was playing on the transmitter when staff arrived that morning. It has not been in the station's automation library since.\n\nTRANSMITTER: WVRN's transmitter building, 8 mi north on Old Reservoir Rd, is logged as unmanned. Power draw records show continuous occupancy-level consumption since 2019. Warrant pending.\n\nSecond-pass review requested.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "Del — insomniac hour, 2 to 5, you're not alone out there",
    recoveredAt: "2025-11-11T14:20:00",
    batteryStart: 43,
    wallpaperHue: 268,
    lockScreenNotifications: [
      { appId: "messages", title: "Producer Gil", preview: "Del the overnight aired 40 sec of BREATHING. corporate is losing it. call me", targetId: "c16-th-gil" },
      { appId: "phone", title: "Missed call · 3:33 AM", preview: "UNKNOWN — 0:00 (no ring)", targetId: "c16-vm-333" },
      { appId: "messages", title: "Unknown", preview: "harbor lights. you know the one. play it for me tonight, Delphine.", targetId: "c16-th-caller" },
    ],
  },

  messages: [
    {
      id: "c16-th-caller",
      contactName: "Unknown",
      messages: [
        { id: "c16-m-ca-1", from: "them", text: "harbor lights. you know the one. play it for me tonight, Delphine.", timestamp: "2025-10-28T03:33:00", evidenceLabel: "The caller's standing request: “Harbor Lights… play it for me tonight, Delphine.”" },
        { id: "c16-m-ca-2", from: "owner", text: "how did you get this number. the request line goes to the board, not my cell.", timestamp: "2025-10-28T03:35:00" },
        { id: "c16-m-ca-3", from: "them", text: "there is no board anymore, they tell you. no line. no host. and yet here we both are, on the air, at the only honest hour. you were about to say 'you're not alone out there.' say it.", timestamp: "2025-10-28T03:36:00", evidenceLabel: "The caller read her next words back before she said them" },
        { id: "c16-m-ca-4", from: "them", text: "Royce played it for me too, until he didn't. don't be like Royce. Royce got tired of the hour. the hour did not get tired of Royce.", timestamp: "2025-11-02T03:33:00", evidenceLabel: "The caller referenced Royce Vandermeer, WVRN's host who vanished in 1979" },
        { id: "c16-m-ca-5", from: "them", text: "tonight I'll call at 3:11. I'm impatient now. leave the ON AIR light for me. leave the door in LIVE.", timestamp: "2025-11-09T02:50:00", evidenceLabel: "The final message: “tonight I'll call at 3:11… leave the door in LIVE.”" },
      ],
    },
    {
      id: "c16-th-gil",
      contactName: "Producer Gil",
      contactNumber: "(207) 555-0173",
      ghostTypingAfterSeconds: 420,
      messages: [
        { id: "c16-m-gi-1", from: "them", text: "corporate audit flagged your show AGAIN. they swear up and down there's no live overnight. I told them I hear you every night. they told me to take a vacation. Del what is going on at that station", timestamp: "2025-11-04T13:00:00", evidenceLabel: "Her producer: corporate insists there is no live overnight host" },
        { id: "c16-m-gi-2", from: "owner", text: "Gil I need you to pull the transmitter power logs. quietly. the shack on Old Reservoir. it's supposed to be unmanned since 2019", timestamp: "2025-11-04T13:20:00" },
        { id: "c16-m-gi-3", from: "them", text: "…why", timestamp: "2025-11-04T13:22:00" },
        { id: "c16-m-gi-4", from: "owner", text: "because someone's answering the request line and the request line was physically disconnected in 2019. YOU disconnected it. someone rewired it. someone is IN that building keeping my show on the air and I don't think they work for corporate", timestamp: "2025-11-04T13:25:00", evidenceLabel: "Del: someone rewired the disconnected request line from inside the transmitter building" },
        { id: "c16-m-gi-5", from: "them", text: "Del the power logs show someone's been living out there for six years. draw like a house. I'm calling the police", timestamp: "2025-11-08T18:00:00", evidenceLabel: "The transmitter has drawn household power for six years — someone living there" },
        { id: "c16-m-gi-6", from: "owner", text: "don't. not yet. if they spook, I lose the only proof the show was ever real — that I was ever real here. one more night. I'm going to keep him talking and you're going to trace where the call really comes from", timestamp: "2025-11-08T18:10:00" },
        { id: "c16-m-gi-7", from: "them", text: "Del the overnight just aired 40 seconds of BREATHING. corporate is losing it. CALL ME", timestamp: "2025-11-09T03:40:00" },
      ],
    },
    {
      id: "c16-th-marlon",
      contactName: "Marlon (old engineer)",
      contactNumber: "(207) 555-0142",
      messages: [
        { id: "c16-m-ma-1", from: "owner", text: "Marlon — you ran the WVRN board overnight before the automation, right? weird question: did you ever get a caller at exactly 3:33 who wanted Harbor Lights?", timestamp: "2025-11-05T15:00:00" },
        { id: "c16-m-ma-2", from: "them", text: "I quit that shift in 2018 and I have never once regretted it and I would like to not talk about the 3:33 caller if that's alright with you.", timestamp: "2025-11-05T15:30:00", evidenceLabel: "The former engineer refused to talk about the 3:33 caller" },
        { id: "c16-m-ma-3", from: "owner", text: "Marlon please. I think someone's living in the transmitter shack. I think it's a person. I need to know if it was the same person for you", timestamp: "2025-11-05T15:40:00" },
        { id: "c16-m-ma-4", from: "them", text: "there was a kid. intern, '17, '18. Denny. obsessed with the overnight, with Royce, with the whole 1979 thing. when they automated the show he didn't take it well — kept saying the hour needed a live voice or it would 'come looking.' we let him go. Del, if Denny's out at that shack, he is not well, and he does not think you're a coworker. he thinks you're the voice keeping the door shut.", timestamp: "2025-11-05T16:00:00", evidenceLabel: "Marlon named him: “Denny,” a fired intern obsessed with the overnight and 1979" },
      ],
    },
    {
      id: "c16-th-sister",
      contactName: "Renée (sis)",
      contactNumber: "(207) 555-0119",
      messages: [
        { id: "c16-m-re-1", from: "them", text: "you sound exhausted on air lately. and you keep saying goodnight to one specific caller like you know him. I don't love it", timestamp: "2025-11-06T09:00:00" },
        { id: "c16-m-re-2", from: "owner", text: "he's harmless probably. lonely. the overnight is full of lonely. takes one to know one. I'm going to fix this and then I'm taking an actual vacation, somewhere the sun is a real thing", timestamp: "2025-11-06T09:20:00", evidenceLabel: "Del to her sister: “the overnight is full of lonely. takes one to know one.”" },
        { id: "c16-m-re-3", from: "them", text: "promise me you'll go to the police if it gets weird", timestamp: "2025-11-06T09:22:00" },
        { id: "c16-m-re-4", from: "owner", text: "promise. hey — if I ever go quiet, listen to the show. the REAL show, the live one. I'll leave you everything you need in the log. you know my password. it's the hour.", timestamp: "2025-11-06T09:30:00", evidenceLabel: "Del: “if I ever go quiet, listen to the show… I'll leave everything in the log. the password is the hour.”" },
        { id: "c16-m-re-5", from: "them", text: "the show aired nothing but breathing last night and now you won't pick up. Del. DEL.", timestamp: "2025-11-10T08:00:00" },
      ],
    },
    {
      id: "c16-th-corp",
      contactName: "WVRN Corporate (auto)",
      messages: [
        { id: "c16-m-co-1", from: "them", text: "AUTOMATED NOTICE: 'The Insomniac Hour' (02:00–05:00) is a pre-recorded program. There is no live overnight staff. Please disregard listener reports of a live host. This is a known audio artifact.", timestamp: "2025-11-01T12:00:00", evidenceLabel: "Corporate's official line: the overnight is pre-recorded, listener reports of a live host are “a known audio artifact”" },
        { id: "c16-m-co-2", from: "owner", text: "I am the live host. I have hosted it live for six years. you pay me for it. sort of. badly.", timestamp: "2025-11-01T12:10:00" },
        { id: "c16-m-co-3", from: "them", text: "AUTOMATED NOTICE: Our records show your position as daytime traffic (part-time). Overnight audio is generated. If you are hearing a live voice at 03:33, please file a signal-interference report.", timestamp: "2025-11-01T12:11:00", evidenceLabel: "Corporate told her that if she heard a live voice at 3:33, to file an interference report" },
      ],
    },
  ],

  photos: [
    {
      id: "c16-ph-console",
      caption: "Studio B, 2:58 AM. two minutes to air. ON AIR light works, board's in LIVE, and corporate swears this room is asleep. I have never once been asleep in this room.",
      timestamp: "2025-11-07T02:58:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-07T02:58:00", device: "This phone", location: "WVRN — Studio B" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#14161c"/>` +
          `<rect x="30" y="150" width="340" height="120" rx="6" fill="#22262e"/>` +
          Array.from({ length: 8 }, (_, i) => `<rect x="${55 + i * 40}" y="170" width="8" height="70" rx="4" fill="#33383f"/><circle cx="${59 + i * 40}" cy="${190 + (i % 3) * 12}" r="6" fill="#c86a2a"/>`).join("") +
          `<circle cx="330" cy="60" r="26" fill="#7a1414"/><circle cx="330" cy="60" r="20" fill="#c81f1f"/>` +
          `<text x="330" y="64" text-anchor="middle" font-family="monospace" font-size="8" fill="#fff">ON AIR</text>` +
          `<rect x="60" y="70" width="120" height="50" rx="4" fill="#0e1014"/><text x="120" y="100" text-anchor="middle" font-family="monospace" font-size="11" fill="#3ad07a">LIVE · 02:58</text>`,
        { aspect: "landscape", base: "#0f1116", grain: 0.12 },
      ),
      evidenceLabel: "Studio B at 2:58 AM — ON AIR lit, board in LIVE, the mode corporate says is disabled overnight",
    },
    {
      id: "c16-ph-clock",
      caption: "the studio clock. he calls when it says this. every night. set your watch, or don't, it won't help",
      timestamp: "2025-11-02T03:33:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-02T03:33:00", device: "This phone", location: "WVRN — Studio B" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0e1014"/>` +
          `<rect x="60" y="130" width="180" height="90" rx="8" fill="#05060a"/>` +
          `<text x="150" y="195" text-anchor="middle" font-family="monospace" font-size="46" fill="#c81f1f" letter-spacing="4">3:33</text>` +
          `<text x="150" y="250" text-anchor="middle" font-family="monospace" font-size="10" fill="#4a4e56">STUDIO B · MASTER</text>`,
        { aspect: "portrait", base: "#0b0d11", grain: 0.1 },
      ),
      evidenceLabel: "The studio master clock reading 3:33 — the caller's hour",
    },
    {
      id: "c16-ph-loglist",
      caption: "call log, one week. same time. same duration: 0:00. a call that connects and never rings and lasts no time and I hear him anyway",
      timestamp: "2025-11-08T04:00:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-08T04:00:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#15130f"/>` +
          `<rect x="30" y="40" width="240" height="330" fill="#1d1a15"/>` +
          Array.from({ length: 7 }, (_, i) => `<text x="45" y="${80 + i * 42}" font-family="monospace" font-size="12" fill="#c9c1ad">11/0${i + 1}  03:33  UNKNOWN</text><text x="230" y="${80 + i * 42}" font-family="monospace" font-size="12" fill="#7a3a3a">0:00</text>`).join(""),
        { aspect: "portrait", base: "#100e0b", grain: 0.1 },
      ),
      evidenceLabel: "A week of call logs: 3:33 AM, UNKNOWN, duration 0:00 — calls that never rang",
    },
    {
      id: "c16-ph-shack",
      caption: "the transmitter shack on old reservoir. 'unmanned since 2019.' there's a curtain. unmanned buildings don't get curtains. and there's a light behind it at 4am.",
      timestamp: "2025-11-08T04:30:00",
      aspect: "landscape",
      deleted: true,
      meta: { takenAt: "2025-11-08T04:30:00", device: "This phone", location: "Old Reservoir Rd" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0a0d12"/>` +
          wall(120, 120, 170, 150, "#1a1c20") +
          `<rect x="150" y="150" width="55" height="60" fill="#2a2410"/>` +
          `<rect x="150" y="150" width="55" height="60" fill="#c8a84a" opacity="0.22"/>` +
          `<rect x="176" y="150" width="4" height="60" fill="#1a1c20"/>` +
          `<path d="M60 0 L60 300 M120 40 L120 270" stroke="#141a22" stroke-width="3"/>` +
          `<rect x="55" y="0" width="10" height="120" fill="#0e1218"/>` +
          figure(210, 200, 0.8, 0.3),
        { aspect: "landscape", base: "#080b0f", grain: 0.14 },
      ),
      evidenceLabel: "Deleted photo of the “unmanned” transmitter shack — a curtain, a light, a figure at 4 AM",
    },
    {
      id: "c16-ph-royce",
      caption: "",
      timestamp: "2025-11-05T22:00:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-05T22:00:00", device: "This phone (photo of station archive)" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#14120e"/>` +
          `<rect x="55" y="60" width="190" height="250" fill="#cabf9f" opacity="0.9"/>` +
          `<text x="150" y="90" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3428">WVRN OVERNIGHT · 1974–1979</text>` +
          `<rect x="100" y="110" width="100" height="110" fill="#8a8064"/>` +
          `<circle cx="150" cy="150" r="26" fill="#b8a884"/>` +
          `<text x="150" y="245" text-anchor="middle" font-family="serif" font-size="11" fill="#3a3428">ROYCE VANDERMEER</text>` +
          `<text x="150" y="268" text-anchor="middle" font-family="serif" font-size="9" fill="#7a3a30">last aired 11/09/1979 — 'Harbor Lights'</text>` +
          `<text x="150" y="288" text-anchor="middle" font-family="serif" font-size="9" fill="#7a3a30">never seen again. 46 years to the night.</text>`,
        { aspect: "portrait", base: "#100e0a", grain: 0.1 },
      ),
      evidenceLabel: "Station archive: Royce Vandermeer vanished 11/09/1979 — 46 years to the night before Del",
    },
    {
      id: "c16-ph-console-blood",
      caption: "",
      timestamp: "2025-11-09T03:20:00",
      aspect: "landscape",
      meta: { takenAt: "2025-11-09T03:20:00", device: "This phone", location: "WVRN — Studio B" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0e0f13"/>` +
          `<rect x="30" y="160" width="340" height="110" rx="6" fill="#20242c"/>` +
          `<circle cx="330" cy="55" r="22" fill="#c81f1f"/><text x="330" y="59" text-anchor="middle" font-family="monospace" font-size="8" fill="#fff">ON AIR</text>` +
          bloodSmear(120, 175, 90, 8, "c16-smear") +
          `<rect x="150" y="120" width="70" height="46" rx="18" fill="#111318"/>` +
          `<path d="M150 143 h70" stroke="#2a2e36" stroke-width="3"/>` +
          `<text x="200" y="250" text-anchor="middle" font-family="monospace" font-size="8" fill="#5a5040">her headphones, still on the hook. a smear across the fader. the mic, live.</text>`,
        { aspect: "landscape", base: "#0a0b0f", grain: 0.14 },
      ),
      evidenceLabel: "The console at 3:20 AM: a smear across the faders, her headphones still hung up",
    },
  ],

  notes: [
    {
      id: "c16-n-log",
      title: "insomniac hour — the real log",
      timestamp: "2025-11-08T05:00:00",
      evidenceLabel: "Del's private log of the 3:33 caller and the transmitter shack",
      body:
        "corporate keeps a log that says this show is a tape. this note is the log that's true.\n\nthe caller. 3:33 every night, six years, though I only started writing it down last month because before that I told myself it was a bit, a regular, a lonely guy with a routine. it is not a bit.\n\nhe knows my next line. not guesses — KNOWS, word for word, a half-second before I say it, like he's reading the same script from further ahead. he wants 'Harbor Lights,' a 1946 song that is not in our automation library and has not been since 1979, which I know because I checked, which took me down the Royce hole.\n\nRoyce Vandermeer hosted the overnight until 11/09/1979 and then didn't. 'Harbor Lights' was on the transmitter when they found the empty studio. I am typing this on 11/08/2025. do the math on the anniversary and then don't, because it doesn't help.\n\nhere's what DOES help, the part that has a person's name on it: the request line to Studio B was physically cut in the 2019 automation. someone rewired it. the transmitter shack on Old Reservoir has pulled house-level power since 2019. Marlon says a fired intern, Denny, obsessed with the overnight and with 1979, swore the hour 'needed a live voice or it would come looking.' Denny is at that shack. Denny is the hand. whether the hand is holding a phone or something older is the part I can't type without sounding like the show.\n\nplan's in the locked note. password's the hour, like I told Renée.",
    },
    {
      id: "c16-n-locked",
      title: "if the mic goes open (locked)",
      timestamp: "2025-11-09T01:00:00",
      lock: {
        code: "0333",
        hintText: "“the password is the hour.” The hour he always calls — read the studio clock — as four digits.",
        clueSourceIds: ["c16-ph-clock", "c16-m-re-4"],
      },
      evidenceLabel: "Del's locked plan for the last night — what she set up, and for whom",
      body:
        "if you're reading this, the mic went open and I didn't. so: the plan, for Gil, for Renée, for whoever's holding my phone.\n\ntonight he calls at 3:11, not 3:33 — he SAID so, he's 'impatient now,' which is the first new thing he's done in six years, which means tonight is different for him too. good. different is a crack.\n\nI'm keeping him on the line and live on the air the whole time. Gil's got a trap-and-trace on the request line from the telco side — every second I keep the caller talking, the trace gets closer to the shack. the show itself is the evidence: it's all recorded to the automation server, timestamped, unfakeable. if I go quiet, the tape is the proof I was ever here at all.\n\nthe hand is Denny. Marlon's sure, and so am I. he's been out at the transmitter for six years keeping 'the hour' alive because he believes if the overnight ever goes truly silent, something answers the silence. he's not wrong about the silence. he's wrong about the cure. you don't feed a thing to keep it fed. Royce learned that. I'd rather learn it out loud, on the air, where Renée can hear, than quiet in a shack where no one can.\n\nRenée: the show is recorded. listen to the last hour. all of it. I left you my voice on purpose. — the password is the hour, you knew that before you tried it.",
    },
    {
      id: "c16-n-harbor",
      title: "harbor lights (why that song)",
      timestamp: "2025-11-05T23:30:00",
      body:
        "'Harbor Lights,' 1946. a sailor watching the shore lights of the girl he's leaving. Royce's sign-off song, every night, 1974–79. pulled from our library the week he vanished — nobody remembers doing it.\n\nthe caller doesn't request it like a fan. he requests it like it's owed. like the song is a door and playing it is turning a key. I have not played it. I will not play it. some nights that feels like the only actual power I have out here: the one song I refuse to turn.\n\n(note to self, unhelpful: the last three hosts to work this shift alone all 'burned out and moved away' with no forwarding address. the station calls it turnover. six years is a long turnover.)",
    },
  ],

  voicemails: [
    {
      id: "c16-vm-333",
      callerLabel: "UNKNOWN",
      timestamp: "2025-11-09T03:11:00",
      durationSec: 41,
      tone: "breathing",
      evidenceLabel: "The 3:11 AM voicemail — the caller, early, on the last night",
      transcript:
        "[automated transcript — audio degraded; one male voice, unhurried]\n“There's my girl. Right on my time now, not yours. …You've kept the light on ON AIR for me every night for six years and never once played the song, and I have been so patient, Delphine, patient the way the hour is patient. But the hour is done being patient tonight and so am I. …I'm not calling from anywhere. I'm calling from the part of the night that stays open after everyone hangs up. Play Harbor Lights. Turn the key. Come out to the water where the lights are. …No? [a long, satisfied exhale] Then I'll come turn it myself. Leave the mic open. I do so love a live show.”",
    },
    {
      id: "c16-vm-gil",
      callerLabel: "Producer Gil",
      callerNumber: "(207) 555-0173",
      timestamp: "2025-11-09T03:44:00",
      durationSec: 26,
      tone: "static",
      evidenceLabel: "Gil's voicemail at 3:44: the trace came back to the transmitter shack, exactly as Del predicted",
      transcript:
        "[automated transcript]\n“Del, the trace came back — it's the shack, it's Old Reservoir, the call's coming from the transmitter EXACTLY like you said, I've got police rolling, forty seconds out. Just keep the— why is the mic open? Del, say something, ANYTHING, say your line, say 'you're not alone,' just— [the sound of a chair, close to the mic, and then nothing] …Del?”",
    },
    {
      id: "c16-vm-renee",
      callerLabel: "Renée (sis)",
      callerNumber: "(207) 555-0119",
      timestamp: "2025-11-10T08:05:00",
      durationSec: 22,
      tone: "plain",
      transcript:
        "[automated transcript]\n“I did what you said. I listened to the whole last hour. You kept him talking so beautifully, so calm, right up until — you said my name at the end. Not a goodbye. My name, like you were pointing at me for whoever came later. I hear you, Del. I'm pointing back. I'm going to make them find you.”",
    },
    {
      id: "c16-vm-airtape",
      callerLabel: "WVRN automation (recovered air-check)",
      timestamp: "2025-11-09T03:41:00",
      durationSec: 55,
      tone: "distorted",
      evidenceLabel: "The recovered air-check: 40 seconds of the open mic that aired live at 3:41 AM",
      transcript:
        "[automated transcript of on-air audio, 03:41]\n[Del, live, steady:] “…and that's the thing about the late hour, isn't it — it's the only time the phone tells the truth. Caller, you still there? You're closer than you've ever been, I can hear the road under you now—”\n[a door; a second presence in the room]\n[Del, off-mic, quiet, not afraid, pointing:] “Renée. The log. The hour.”\n[forty seconds of breathing — two people, then one]\n[a single click as a fader is pushed up; forty-six-year-old tape hiss; the opening bars of a 1946 song no one queued]\n[end of air-check]",
    },
  ],

  calendarEvents: [
    { id: "c16-cal-show", title: "INSOMNIAC HOUR — live", date: "2025-11-09", time: "02:00", recurring: "daily", createdBy: "owner" },
    { id: "c16-cal-vacation", title: "actual vacation (somewhere sunny)", date: "2025-11-20", time: "09:00", createdBy: "owner", evidenceLabel: "Del's plan for after: “actual vacation (somewhere sunny),” Nov 20" },
    { id: "c16-cal-trace", title: "Gil — telco trap & trace ready", date: "2025-11-09", time: "01:30", createdBy: "owner", evidenceLabel: "The trap-and-trace set for the last night" },
    {
      id: "c16-cal-royce",
      title: "R.V. — 46 yrs",
      date: "2025-11-09",
      createdBy: "unknown",
      detail: "Added to Del's calendar by no account she controls, marking the anniversary of Royce Vandermeer's 1979 disappearance — the same night she vanished.",
      evidenceLabel: "An event added by an unknown account: “R.V. — 46 yrs,” the Royce anniversary, dated her last night",
    },
    {
      id: "c16-cal-harbor",
      title: "play it",
      date: "2025-11-09",
      time: "03:33",
      createdBy: "external",
      detail: "Created by 'WVRN Automation' — a system that plays a fixed loop and has no ability to create calendar events. It says only: play it. 3:33.",
      evidenceLabel: "“play it” at 3:33 — added by the automation system, which cannot create events",
    },
  ],

  locationPins: [
    { id: "c16-pin-studio", label: "WVRN — Studio B", timestamp: "2025-11-09T02:00:00", x: 45, y: 40 },
    { id: "c16-pin-home", label: "Del's apartment", timestamp: "2025-11-08T19:00:00", x: 30, y: 30 },
    { id: "c16-pin-shack", label: "Transmitter shack — Old Reservoir Rd", timestamp: "2025-11-08T04:30:00", x: 75, y: 20, detail: "8 miles north, logged unmanned since 2019. Del drove out here once, at 4:30 AM on the 8th, and photographed a lit, curtained window. Her phone never returned here — but the 3:11 call on the 9th traced to this building.", evidenceLabel: "The transmitter shack — where the final call was traced" },
    {
      id: "c16-pin-last",
      label: "WVRN — final location",
      timestamp: "2025-11-09T03:42:00",
      x: 45,
      y: 40,
      detail: "Del's phone never left Studio B. Its last movement is 3:42 AM — a few feet, from the console toward the studio door, and then nothing. The ON AIR light was still lit when the police arrived at 3:44.",
      evidenceLabel: "Her phone's last movement: 3:42 AM, console toward the door, then nothing",
    },
  ],

  browserHistory: [
    { id: "c16-b-royce", query: "royce vandermeer WVRN overnight host disappeared 1979", timestamp: "2025-11-05T21:00:00", evidenceLabel: "She researched Royce Vandermeer's 1979 disappearance" },
    { id: "c16-b-harbor", query: "harbor lights 1946 song why removed from radio libraries", timestamp: "2025-11-05T22:30:00" },
    { id: "c16-b-power", query: "how to pull utility power records for a commercial building", timestamp: "2025-11-07T20:00:00", evidenceLabel: "“how to pull utility power records” for the shack" },
    { id: "c16-b-denny", query: "WVRN intern fired 2018 obsessed overnight radio", timestamp: "2025-11-06T16:00:00", evidenceLabel: "She searched for the fired intern, Denny" },
    { id: "c16-b-trace", query: "trap and trace incoming call telco cooperation how fast", timestamp: "2025-11-08T22:00:00", evidenceLabel: "She researched how to trap-and-trace the caller" },
    { id: "c16-b-alone", query: "how to keep a stalker talking on air without escalating", timestamp: "2025-11-08T23:30:00", evidenceLabel: "Her last search: how to keep the caller talking on air without escalating" },
  ],

  hiddenApp: {
    disguiseIcon: "podcasts",
    disguiseLabel: "WVRN Playout",
    revealAfterClueIds: ["c16-th-caller", "c16-n-log"],
    title: "WVRN Playout — Overnight Console (unauthorized)",
    heading: "Old Reservoir transmitter · the console that shouldn't exist",
    body:
      "The 'playout' app corporate makes hosts install to see the automation schedule. Del's copy has an extra tab that pushed itself from an IP at the transmitter shack — a second console, running in parallel, operated by hand.\n\nSomeone at Old Reservoir has been running her show alongside her for six years: raising her mic, cueing the ON AIR light, holding the request line open. On the last night, that console did something it had never done.",
    entries: [
      { label: "STUDIO B — mic", status: "LIVE (remote-forced)", detail: "raised by: OLD RESERVOIR node · nightly since 2019" },
      { label: "REQUEST LINE", status: "REWIRED — active", detail: "physical cut 2019 · re-terminated at transmitter" },
      { label: "CALLER — 'HARBOR'", status: "6 yrs · 2,190 calls · 03:33", detail: "duration logged: 0:00 each" },
      { label: "OPERATOR", status: "D. FOLKES (badge revoked '18)", detail: "resident, transmitter shack, since 2019" },
      { label: "11/09 03:11", status: "CALL PLACED EARLY", detail: "operator left the shack at 03:19" },
      { label: "11/09 03:41", status: "'HARBOR LIGHTS' — CUED", detail: "source: not the automation library · unknown origin" },
      { label: "STUDIO B — occupancy", status: "0 since 03:42", detail: "mic left open · signed off by: —" },
    ],
    footer:
      "The console names the hand: Denny Folkes, the fired intern, living in the transmitter shack, remote-forcing Del's mic live every night to keep 'the hour' alive. On the 9th he placed the call early and then LEFT the shack at 3:19 — driving the eight miles to Studio B, arriving as the trace closed in. That's the human crime, and it's enough to charge. What the console can't explain is the last line: at 3:41 'Harbor Lights' was cued to air from a source that is not the automation library and has no file origin — the one song Del refused to play for six years, played the moment the studio went to zero.",
    evidenceLabel: "The hidden Playout console: operator “D. Folkes” living at the transmitter, and “Harbor Lights” cued from nowhere at 3:41",
  },

  liveEvents: [
    {
      id: "c16-live-caller",
      kind: "message",
      afterSeconds: 300,
      threadId: "c16-th-caller",
      message: {
        id: "c16-m-ca-live",
        from: "them",
        text: "you're reading her phone now. good. the hour always finds a new voice. it's very late where you are too, isn't it. you're not alone out there.",
        timestamp: "2025-11-11T14:26:00",
        evidenceLabel: "To whoever reads the phone: “the hour always finds a new voice… you're not alone out there.”",
      },
    },
    {
      id: "c16-live-onair",
      kind: "notification",
      afterSeconds: 560,
      title: "WVRN Playout",
      body: "STUDIO B — mic raised. ON AIR.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c16-v-burnout",
      label: "She burned out and walked away",
      description: "The station's version: an overworked, underpaid part-timer who cracked at 3 AM and left, like the hosts before her.",
      requiredEvidenceIds: ["c16-m-co-1", "c16-m-re-2"],
      isCanon: false,
      epilogue:
        "It's the version WVRN's lawyers prefer, and it has the awful convenience of precedent: the last three overnight hosts all 'burned out and moved away' with no forwarding address. Turnover, the station calls it. Six years is a long turnover.\n\nThe theory can't survive its own timeline. A woman who burns out and leaves does not set a trap-and-trace, does not leave a locked plan addressed to her sister, and does not exit a room by walking three feet toward the door and then ceasing to move while the mic she'd have to reach past stays open and live. Burnout doesn't cue a song out of an empty library. You file the version with a name in it instead.",
    },
    {
      id: "c16-v-denny",
      label: "The fired intern took her from the transmitter",
      description: "Denny Folkes, obsessed with the overnight and 1979, lived in the shack, hijacked her show, placed the early call, and drove to the studio.",
      requiredEvidenceIds: ["case-16.hidden", "c16-n-locked", "c16-m-ma-4", "c16-pin-shack", "c16-vm-gil"],
      isCanon: true,
      epilogue:
        "You lay it out on the trace, minute by minute, the way Del laid her own trap. Denny Folkes — badge revoked in 2018, resident of the 'unmanned' transmitter shack since 2019, the hand behind a second playout console that raised her mic live every night for six years to keep 'the hour' from going silent. On the ninth he broke his own ritual: the call at 3:11 instead of 3:33, and then, at 3:19, he left the shack — the one thing six years of logs say he never did — and drove the eight miles to Studio B, arriving as Gil's trap-and-trace closed on the exact building Del had photographed.\n\nFolkes is arrested at the transmitter shack the next morning, and it is, inside, a shrine: reel-to-reel tape of every overnight since 1974, a wall of Royce Vandermeer, and a handwritten operations manual whose first rule is 'the hour must have a live voice, or it comes looking for one.' He does not deny taking Del. He denies being finished. 'I kept the light on,' he tells the detectives, calm as his own 3 AM. 'Somebody has to keep the light on.'\n\nDel Amara is not in the shack, and not in the studio, and the county drags Old Reservoir and searches every parcel Folkes ever touched. The file stays open. But the tape closed it enough to charge, because Del did exactly what she said she would — she kept him talking, live, recorded, timestamped, until the trace had him, and then, with a second presence already in the room, she used her last clear seconds not to scream but to point: 'Renée. The log. The hour.' A host to the end, handing the next voice everything it would need.\n\nRenée Amara plays the last air-check at every hearing. She has also, quietly, gone back on the air — 2 to 5, WVRN, live, she insists, whatever corporate's automation says — and she has never once played 'Harbor Lights,' and she signs off every night the way her sister did: you're not alone out there. The request line still lights up at 3:33. She lets it ring.",
    },
    {
      id: "c16-v-corp",
      label: "The station covered up a live show it denied existed",
      description: "Six years of 'automated' overnight, a rewired line, a shack drawing house power — WVRN knew someone was out there and looked away.",
      requiredEvidenceIds: ["c16-m-co-1", "c16-m-gi-5", "c16-m-co-3"],
      isCanon: false,
      epilogue:
        "The corporate verdict has real teeth, and a regulatory body eventually sinks them in: WVRN carried a live overnight for six years while telling the FCC, its advertisers, and Del's own W-2 that the hour was a tape. The rewired request line and the transmitter's household power draw were on WVRN's own meters the entire time. Somebody chose not to read them.\n\nThe station settles, pays a fine that rounds to a rounding error, and quietly takes the overnight truly dark — a test pattern of tone from 2 to 5, no host, no line, no light. Listeners report, within a week, that the tone is 'not quite silent.' That some nights, at 3:33, there is a texture under it, like a room with someone in it. WVRN issues an automated notice calling this a known audio artifact.\n\nEverything in the verdict is true. It's negligence, and it's real, and it's upstream of the man who actually drove eight miles in the dark. You filed his name instead. This one you leave for the regulators, who are very good at fines and have no jurisdiction at all over the hour.",
    },
    {
      id: "c16-v-hour",
      label: "The hour took her, the way it took Royce",
      description: "A 46-year anniversary. A song from an empty library. A caller with no ring and no duration who knew her next word. An exit that isn't physically possible.",
      requiredEvidenceIds: ["c16-ph-royce", "c16-vm-airtape", "c16-ph-loglist"],
      isCanon: false,
      epilogue:
        "You write the version WVRN will bury and Renée will believe. Royce Vandermeer, 11/09/1979, empty studio, 'Harbor Lights' on the transmitter. Del Amara, 11/09/2025, empty studio, 'Harbor Lights' cued from a library that hasn't held it in forty-six years — to the night. The caller who rang for six years at 3:33 with a duration of 0:00, who spoke her next line before she did, whose voice the air-check catches but whose call the telco swears never connected because there was, electrically, no call.\n\nDenny Folkes kept the mic live. Denny Folkes drove out. Denny Folkes is a man, and men can be charged, and you charged him. But Folkes didn't cue the song, and Folkes was still on the road at 3:41, and when investigators finally ask him the only question that matters — who taught you the hour needs a live voice — he goes quiet for a long time and says, 'The caller did. Same as he taught Royce. I just answered the phone.'\n\nThe conservator dates the 'Harbor Lights' air-check tape and returns a note she declines to expand on: the recording's oxide is consistent with 1946 stock, and the singing voice under the song, faint, is a match on two markers to the only surviving air-check of Royce Vandermeer. Your report offers the anniversary, the empty library, the impossible call, and the forty seconds of breathing that go from two people to one with no door between. It is filed, like the 1979 file above it in the drawer, under a single word the sergeant lets you keep: open.",
    },
  ],
};

export default c16;
