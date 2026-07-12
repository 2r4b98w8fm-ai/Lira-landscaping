import type { CaseFile } from "../types";
import { photoSvg, wall, windowPane, figure, timestampBurn } from "../photoart";

/**
 * CASE 03 — GRIEF GROUP
 * Edith "Edie" Marsh, 58. Widowed in January; joined an online grief-support
 * community in February. Gone the week of her husband's anniversary. A packed
 * suitcase stood by the door. The porch lantern was still lit.
 */

const c3: CaseFile = {
  id: "case-03",
  title: "Grief Group",
  victimName: "Edith Marsh, 58",
  summary:
    "A widow joined an online grief-support circle that promised she'd never have to 'carry it alone.' Members carry it together for exactly one year. Then, one by one, they stop needing to carry anything at all.",
  intake:
    "SUBJECT: Marsh, Edith A. (58). Reported missing by daughter Claire Marsh, Nov 3, after a scheduled call went unanswered.\n\nDEVICE: Recovered Nov 3, 19:20, kitchen table. Battery 44%. Beside it: a packed suitcase, a lit battery lantern on the porch rail, and the house keys in an envelope labeled 'for the next family.'\n\nFINANCIAL: Oct 30 wire transfer of $118,000 (proceeds of husband's life insurance) to a fund named 'Lantern Bridge Trust.' Trust registration traces to a mail-forwarding storefront.\n\nNOTES: Subject was active in an online community, 'The Lantern Circle.' At least two other members reported missing by relatives in the past three years — both roughly one year after joining. Second-pass review requested.",
  contentWarningLevel: 2,
  phone: {
    ownerLabel: "Edie's phone",
    recoveredAt: "2025-11-04T20:05:00",
    batteryStart: 44,
    wallpaperHue: 42,
    lockScreenNotifications: [
      { appId: "messages", title: "Claire", preview: "Mom I'm at the house. Your suitcase is here. Where are YOU?", targetId: "c3-th-claire" },
      { appId: "messages", title: "Maren 🕯", preview: "You don't need the suitcase, love. You won't need anything.", targetId: "c3-th-maren" },
      { appId: "calendar", title: "YEAR WALK 🌅", preview: "Tomorrow at 4:44 AM", targetId: "c3-cal-yearwalk" },
    ],
  },

  messages: [
    {
      id: "c3-th-claire",
      contactName: "Claire",
      contactNumber: "(612) 555-0150",
      messages: [
        { id: "c3-m-cl-1", from: "them", text: "checking on you. did you eat something real today, not just toast", timestamp: "2025-02-10T18:30:00" },
        { id: "c3-m-cl-2", from: "owner", text: "Soup counts as real. Your father would say soup counts.", timestamp: "2025-02-10T18:52:00" },
        { id: "c3-m-cl-3", from: "them", text: "he would say soup counts TWICE. ok good. love you", timestamp: "2025-02-10T18:55:00" },
        { id: "c3-m-cl-4", from: "owner", text: "I joined a little online group. Widows and widowers. It's nice to talk to people who don't flinch.", timestamp: "2025-02-19T20:14:00" },
        { id: "c3-m-cl-5", from: "them", text: "mom that's really good actually. proud of you", timestamp: "2025-02-19T20:20:00" },
        { id: "c3-m-cl-6", from: "owner", text: "They have a saying: you never carry it alone. I cried in a good way for the first time since January.", timestamp: "2025-02-19T20:31:00" },
        { id: "c3-m-cl-7", from: "them", text: "you cancelled sunday again :( third time. the group thing is tuesdays right? what's on sundays?", timestamp: "2025-09-28T19:40:00", evidenceLabel: "By September the Circle had replaced her Sundays with Claire" },
        { id: "c3-m-cl-8", from: "owner", text: "Just Circle homework, sweetheart. Reflections. It's my anniversary year, they say the first year has to be finished properly.", timestamp: "2025-09-28T20:02:00", evidenceLabel: "“The first year has to be finished properly” — the Circle's phrase in Edie's mouth" },
        { id: "c3-m-cl-9", from: "them", text: "finished? finished how?", timestamp: "2025-09-28T20:05:00" },
        { id: "c3-m-cl-10", from: "owner", text: "You'll laugh at me. There's a sunrise walk. A Year Walk. Everyone does one. It's just a walk, Claire.", timestamp: "2025-09-28T20:18:00" },
        { id: "c3-m-cl-11", from: "them", text: "ok. weird vibes but a walk is a walk. I want to come with", timestamp: "2025-09-28T20:20:00" },
        { id: "c3-m-cl-12", from: "owner", text: "Family can't come. It's members only. It's about walking INTO the new year, not being pulled back into the old one.", timestamp: "2025-09-28T20:29:00", evidenceLabel: "Family explicitly excluded from the “Year Walk”" },
        { id: "c3-m-cl-13", from: "them", text: "Mom I'm at the house. Your suitcase is here. Where are YOU?", timestamp: "2025-11-03T18:44:00" },
      ],
    },
    {
      id: "c3-th-maren",
      contactName: "Maren 🕯",
      contactNumber: "(844) 555-0111",
      messages: [
        { id: "c3-m-ma-1", from: "them", text: "Edie, it's Maren from Circle. I facilitate Tuesdays. I just wanted you to know privately: what you shared tonight about Walter's chair was one of the bravest things I've heard in eleven years of this work.", timestamp: "2025-02-25T21:30:00" },
        { id: "c3-m-ma-2", from: "owner", text: "That's very kind. I almost didn't say it out loud.", timestamp: "2025-02-25T21:44:00" },
        { id: "c3-m-ma-3", from: "them", text: "Out loud is how it stops being a stone in your chest. We're so glad you found us. You were always going to find us.", timestamp: "2025-02-25T21:47:00", evidenceLabel: "Maren: “You were always going to find us”" },
        { id: "c3-m-ma-4", from: "them", text: "A year sounds long, but the anniversary is a door, Edie. Circle members don't stand in front of the door crying. We walk through it together.", timestamp: "2025-08-12T22:10:00" },
        { id: "c3-m-ma-5", from: "owner", text: "Gordon said something odd tonight. About the ones who finished their year. He said nobody hears from them after. Is that true?", timestamp: "2025-10-07T22:41:00", evidenceLabel: "Edie asked Maren why finished members are never heard from again" },
        { id: "c3-m-ma-6", from: "them", text: "Gordon is in a doubting season. It happens near the anniversary — the old life fights hardest right before it lets go. The finished ones are at peace, Edie. They simply don't need the group anymore. Isn't that the goal?", timestamp: "2025-10-07T22:50:00" },
        { id: "c3-m-ma-7", from: "them", text: "Logistics for your Walk, love: the van comes at 4. Wear comfortable shoes. Bring the paperwork we discussed, signed. Leave your phone — the first year lives in that phone, and you are finishing the first year.", timestamp: "2025-11-01T20:00:00", evidenceLabel: "Maren's instructions: the van at 4, signed paperwork, leave the phone" },
        { id: "c3-m-ma-8", from: "owner", text: "Claire will worry. Can I at least leave her a letter?", timestamp: "2025-11-01T20:15:00" },
        { id: "c3-m-ma-9", from: "them", text: "The Circle writes to the families afterward. It's gentler coming from us. You'd be surprised how often the families join, in time. Grief runs in families, Edie. 🕯", timestamp: "2025-11-01T20:22:00", evidenceLabel: "“You'd be surprised how often the families join, in time.”" },
        { id: "c3-m-ma-10", from: "them", text: "You don't need the suitcase, love. You won't need anything.", timestamp: "2025-11-03T03:41:00" },
      ],
    },
    {
      id: "c3-th-circle",
      contactName: "The Lantern Circle (group)",
      ghostTypingAfterSeconds: 420,
      messages: [
        { id: "c3-m-ci-1", from: "them", text: "Rosa: Tuesday check-in thread 🕯 One word for today, everyone. Mine: 'lighter'", timestamp: "2025-03-04T19:00:00" },
        { id: "c3-m-ci-2", from: "owner", text: "Edie: 'quieter'. The house I mean. But maybe me too.", timestamp: "2025-03-04T19:12:00" },
        { id: "c3-m-ci-3", from: "them", text: "Maren: Beautiful, Edie. The house gets quieter and then, one day, the quiet gets kind. ✨", timestamp: "2025-03-04T19:14:00" },
        { id: "c3-m-ci-4", from: "them", text: "Gordon: my one word is 'february'. it's june. I know. it's still february in here.", timestamp: "2025-06-10T19:05:00" },
        { id: "c3-m-ci-5", from: "them", text: "Rosa: Celebrating our own Tomas tonight, everyone — his Year Walk is at sunrise! 🌅 Walk well, Tomas. We'll carry the rest.", timestamp: "2025-07-19T21:00:00", evidenceLabel: "The group celebrating a member's “Year Walk” — Tomas, never heard from again" },
        { id: "c3-m-ci-6", from: "owner", text: "Edie: Has anyone heard how Tomas is doing? His anniversary walk was weeks ago.", timestamp: "2025-08-09T19:30:00" },
        { id: "c3-m-ci-7", from: "them", text: "Maren: Tomas is finished, Edie. Finished members rest. We don't disturb the rested. 🕯", timestamp: "2025-08-09T19:33:00", evidenceLabel: "“Finished members rest. We don't disturb the rested.”" },
        { id: "c3-m-ci-8", from: "them", text: "Gordon: does anyone else notice we only ever celebrate walks. never birthdays. never new apartments. never grandkids. just walks", timestamp: "2025-10-14T19:22:00", evidenceLabel: "Gordon: the group only ever celebrates departures" },
        { id: "c3-m-ci-9", from: "them", text: "Rosa: Gordon has left the group.", timestamp: "2025-10-14T19:25:00" },
        { id: "c3-m-ci-10", from: "them", text: "Maren: Gordon's doubting season needed privacy, everyone. Hold him gently. His walk is still scheduled. 🕯", timestamp: "2025-10-14T19:26:00", evidenceLabel: "Gordon “left” — but Maren says his walk is still scheduled" },
      ],
    },
    {
      id: "c3-th-gordon",
      contactName: "Gordon (Circle)",
      contactNumber: "(612) 555-0186",
      messages: [
        { id: "c3-m-go-1", from: "them", text: "edie. it's gordon. off the group. can we talk here instead", timestamp: "2025-10-14T21:00:00" },
        { id: "c3-m-go-2", from: "owner", text: "Gordon! They said you left. Are you all right?", timestamp: "2025-10-14T21:08:00" },
        { id: "c3-m-go-3", from: "them", text: "I didn't leave. I got removed the second I counted out loud. edie LISTEN. I found rosa's sister on the internet. rosa's been 'in the group' 6 years. her sister buried an empty casket in 2021. the family got a LETTER. typed. 'rosa is finished and at peace, she asks for privacy.'", timestamp: "2025-10-14T21:15:00", evidenceLabel: "Gordon found a member's family who buried an empty casket after a typed letter" },
        { id: "c3-m-go-4", from: "owner", text: "Rosa posts every Tuesday, Gordon.", timestamp: "2025-10-14T21:18:00" },
        { id: "c3-m-go-5", from: "them", text: "SOMETHING posts every tuesday. read rosa's messages from before 2021 and after. count the words. the after-rosa has never once used the word 'I' about the past. it's a puppet account edie. maybe half the group is puppets. warm little voices keeping the next ones calm", timestamp: "2025-10-14T21:24:00", evidenceLabel: "Gordon: departed members' accounts keep posting — “warm little voices keeping the next ones calm”" },
        { id: "c3-m-go-6", from: "owner", text: "Then what happens on the walk, Gordon?", timestamp: "2025-10-14T21:30:00" },
        { id: "c3-m-go-7", from: "them", text: "I don't know. that's the honest answer. what I know is: insurance money moves first. then the walk. then a letter. I'm going to the farm they use. hollis farm road. if I'm wrong I'll apologize to everyone. if I'm right you'll never hear from me and DO NOT GO ON YOUR WALK", timestamp: "2025-10-26T23:40:00", evidenceLabel: "Gordon's last text: he went to Hollis Farm Road to see for himself" },
      ],
    },
    {
      id: "c3-th-walt",
      contactName: "Walt ❤",
      contactNumber: "(612) 555-0122",
      messages: [
        { id: "c3-m-wa-1", from: "owner", text: "The plow guy did the driveway wrong again. You'd have gone out there in your robe.", timestamp: "2025-02-02T08:15:00" },
        { id: "c3-m-wa-2", from: "owner", text: "Claire taught me the group chat thing. You'd hate it. You'd love hating it.", timestamp: "2025-03-11T21:04:00" },
        { id: "c3-m-wa-3", from: "owner", text: "I joined a group. They say I carried you alone too long. I don't know how to explain that carrying you was the last job you left me and I liked having it.", timestamp: "2025-04-02T22:30:00", evidenceLabel: "Edie's texts to her dead husband's number — her real, private grief" },
        { id: "c3-m-wa-4", from: "owner", text: "Our anniversary is coming. The group has a whole thing about it. A walk. I keep thinking: 42 years and I finish it with a WALK? You'd say 'finish what, exactly, Edith?' You'd be right to ask.", timestamp: "2025-10-20T23:11:00" },
        { id: "c3-m-wa-5", from: "owner", text: "Apartment 22 on Dunmore. Then the house. Then the good years, then the hospital year. If I could pick one door to knock on it's 22.", timestamp: "2025-10-29T22:47:00", evidenceLabel: "Edie to Walt: “If I could pick one door to knock on it's 22”" },
        {
          id: "c3-m-wa-6",
          from: "them",
          text: "soon",
          timestamp: "2025-11-03T04:44:00",
          evidenceLabel: "A one-word reply from Walt's number — disconnected since January — at 4:44 AM",
        },
      ],
    },
    {
      id: "c3-th-pastor",
      contactName: "Pastor Lindqvist",
      contactNumber: "(612) 555-0171",
      messages: [
        { id: "c3-m-pa-1", from: "them", text: "Edie, we missed you at coffee hour. No pressure — the door's open whenever.", timestamp: "2025-05-04T13:00:00" },
        { id: "c3-m-pa-2", from: "owner", text: "Thank you, Pastor. I've found a group that suits where I am right now. Please don't worry.", timestamp: "2025-05-04T14:20:00" },
        { id: "c3-m-pa-3", from: "them", text: "Of course. Just — an old man's caution: groups that suit where you are should also let you leave where you are. Coffee's always on.", timestamp: "2025-05-04T14:35:00", evidenceLabel: "Her pastor's warning: a good group should also let you leave" },
      ],
    },
    {
      id: "c3-th-bank",
      contactName: "Harbor Bank",
      messages: [
        { id: "c3-m-bk-1", from: "them", text: "Harbor Bank: A wire transfer of $118,000.00 has been initiated from your account to LANTERN BRIDGE TRUST. If this wasn't you, call immediately.", timestamp: "2025-10-30T10:12:00", evidenceLabel: "The $118,000 wire — Walt's life insurance — to “Lantern Bridge Trust”" },
        { id: "c3-m-bk-2", from: "owner", text: "It was me.", timestamp: "2025-10-30T10:30:00" },
        { id: "c3-m-bk-3", from: "them", text: "Harbor Bank: Thank you for confirming. Tip: wires cannot be recalled once settled.", timestamp: "2025-10-30T10:31:00" },
      ],
    },
    {
      id: "c3-th-neighbor",
      contactName: "Bev (next door)",
      contactNumber: "(612) 555-0139",
      messages: [
        { id: "c3-m-be-1", from: "them", text: "Your porch lantern's been on three nights running, hon. Bulb'll go. Want Ray to get the ladder?", timestamp: "2025-11-01T17:45:00" },
        { id: "c3-m-be-2", from: "owner", text: "Leave it lit, Bev. It's a group thing. It tells them which house.", timestamp: "2025-11-01T18:02:00", evidenceLabel: "“Leave it lit. It tells them which house.”" },
        { id: "c3-m-be-3", from: "them", text: "Tells WHO which house??", timestamp: "2025-11-01T18:04:00" },
      ],
    },
    {
      id: "c3-th-pharmacy",
      contactName: "Corner Drug",
      messages: [
        { id: "c3-m-ph-1", from: "them", text: "Corner Drug: Your refill is ready. We're open until 7.", timestamp: "2025-10-28T10:00:00" },
        { id: "c3-m-ph-2", from: "them", text: "Corner Drug: Reminder — refill not yet collected. We'll hold it 10 more days.", timestamp: "2025-11-04T10:00:00" },
      ],
    },
    {
      id: "c3-th-podcast",
      contactName: "Stillwater Grief Letters",
      messages: [
        { id: "c3-m-po-1", from: "them", text: "This week's letter: 'The Chair.' On keeping things exactly where they left them — and the day you move the chair. 🎧", timestamp: "2025-03-02T08:00:00" },
        { id: "c3-m-po-2", from: "them", text: "This week's letter: 'Anniversaries Are Not Deadlines.' Grief doesn't file paperwork. Anyone who gives your grief a due date wants something from it. 🎧", timestamp: "2025-10-26T08:00:00", evidenceLabel: "A grief podcast's warning: anyone who gives grief a due date wants something from it" },
      ],
    },
  ],

  photos: [
    {
      id: "c3-ph-garden",
      caption: "Walt's tomatoes came back without him. Rude of them. Wonderful of them.",
      timestamp: "2025-06-14T09:30:00",
      aspect: "landscape",
      meta: { takenAt: "2025-06-14T09:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="120" fill="#20262e"/><rect y="120" width="400" height="180" fill="#161b14"/>` +
          Array.from({ length: 5 }, (_, i) => `<path d="M${60 + i * 70} 260 V150" stroke="#2c3a26" stroke-width="5"/><circle cx="${55 + i * 70}" cy="${170 + (i % 3) * 20}" r="9" fill="#5c3a2e"/><circle cx="${70 + i * 70}" cy="${195 + (i % 2) * 15}" r="7" fill="#6b4433"/>`).join("") +
          `<rect x="0" y="255" width="400" height="8" fill="#0e120c"/>`,
        { aspect: "landscape", base: "#12150f", grain: 0.11 },
      ),
    },
    {
      id: "c3-ph-chair",
      caption: "moved his chair today. six inches. put it back.",
      timestamp: "2025-03-08T15:12:00",
      aspect: "portrait",
      meta: { takenAt: "2025-03-08T15:12:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#221e19") +
          `<rect x="70" y="180" width="160" height="140" rx="16" fill="#3a2f24"/>` +
          `<rect x="70" y="140" width="160" height="70" rx="16" fill="#443728"/>` +
          `<rect x="60" y="300" width="30" height="60" fill="#2c2419"/><rect x="210" y="300" width="30" height="60" fill="#2c2419"/>` +
          `<rect x="90" y="160" width="120" height="30" rx="8" fill="#57452f" opacity="0.6"/>` +
          windowPane(210, 40, 70, 90, "#2a3138"),
        { aspect: "portrait", base: "#181510", grain: 0.12 },
      ),
    },
    {
      id: "c3-ph-casserole",
      caption: "circle potluck (virtual). we all made the same recipe in 9 kitchens. maren's idea. it was lovely?",
      timestamp: "2025-04-15T18:40:00",
      aspect: "landscape",
      meta: { takenAt: "2025-04-15T18:40:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#1c1712"/>` +
          `<ellipse cx="200" cy="190" rx="140" ry="70" fill="#2a211a"/>` +
          `<ellipse cx="200" cy="180" rx="120" ry="55" fill="#4a3421"/>` +
          `<ellipse cx="200" cy="172" rx="100" ry="42" fill="#5c4326"/>` +
          Array.from({ length: 6 }, (_, i) => `<ellipse cx="${140 + i * 25}" cy="${165 + (i % 2) * 12}" rx="10" ry="6" fill="#6e5433" opacity="0.7"/>`).join(""),
        { aspect: "landscape", base: "#151109", grain: 0.11 },
      ),
    },
    {
      id: "c3-ph-grave",
      caption: "told him about the group. the wind did a thing in the oaks. taking it as approval. or a warning. he was never clear either",
      timestamp: "2025-05-25T11:20:00",
      aspect: "portrait",
      meta: { takenAt: "2025-05-25T11:20:00", device: "This phone", location: "Fairhaven Cemetery" },
      svg: photoSvg(
        `<rect width="300" height="220" fill="#1d222a"/><rect y="220" width="300" height="180" fill="#141a12"/>` +
          `<rect x="105" y="150" width="90" height="110" rx="8" fill="#2a2e35"/>` +
          `<rect x="95" y="250" width="110" height="16" fill="#23272e"/>` +
          `<path d="M40 100 Q60 40 90 90M240 110 Q260 50 280 95" stroke="#20262e" stroke-width="8" fill="none"/>`,
        { aspect: "portrait", base: "#12161a", grain: 0.13 },
      ),
    },
    {
      id: "c3-ph-retreat",
      caption: "spring retreat. first time meeting everyone's faces. a good weekend. I think it was a good weekend",
      timestamp: "2025-05-18T16:00:00",
      aspect: "landscape",
      meta: { takenAt: "2025-05-18T16:00:00", editedAt: "2025-05-18T23:55:00", device: "Shared by Maren 🕯", location: "—" },
      svg: photoSvg(
        `<rect width="400" height="170" fill="#232a33"/><rect y="170" width="400" height="130" fill="#181f16"/>` +
          `<rect x="120" y="60" width="160" height="110" fill="#2a231a"/><path d="M110 60 L200 20 L290 60Z" fill="#1f1a12"/>` +
          figure(80, 265, 0.85, 0.9, "#2c2c34") +
          figure(130, 268, 0.85, 0.9, "#34302c") +
          figure(180, 264, 0.85, 0.9, "#2c3430") +
          figure(230, 267, 0.85, 0.9, "#302c34") +
          figure(280, 265, 0.85, 0.9, "#342c2c") +
          figure(330, 268, 0.85, 0.9, "#2c3234"),
        { aspect: "landscape", base: "#161a14", grain: 0.14 },
      ),
      evidenceLabel: "The retreat photo — shared by Maren, edited the same night; every face is turned slightly away",
    },
    {
      id: "c3-ph-lantern",
      caption: "they sent everyone a lantern. battery, not flame. 'leave it lit the week of your walk so we know which porch.'",
      timestamp: "2025-10-30T19:15:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-30T19:15:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#0e0f12"/>` +
          `<rect x="30" y="300" width="240" height="14" fill="#1a1712"/>` +
          `<rect x="120" y="170" width="60" height="100" rx="8" fill="#2a2318"/>` +
          `<rect x="130" y="185" width="40" height="60" fill="#7c5c28"/>` +
          `<circle cx="150" cy="215" r="16" fill="#c89a4a" opacity="0.9"/>` +
          `<circle cx="150" cy="215" r="42" fill="#c89a4a" opacity="0.16"/>` +
          `<path d="M135 170 Q150 150 165 170" stroke="#2a2318" stroke-width="6" fill="none"/>`,
        { aspect: "portrait", base: "#0b0c0f", grain: 0.13 },
      ),
      evidenceLabel: "The Circle's lantern on her porch — “so we know which porch”",
    },
    {
      id: "c3-ph-suitcase",
      caption: "packed. maren says I won't need it. packing it anyway. 42 years of marriage teaches you to pack anyway",
      timestamp: "2025-11-02T21:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-11-02T21:30:00", device: "This phone" },
      svg: photoSvg(
        wall(0, 0, 300, 400, "#1d1a15") +
          `<rect x="70" y="220" width="160" height="110" rx="10" fill="#3a2f22"/>` +
          `<rect x="70" y="220" width="160" height="20" fill="#2c2318"/>` +
          `<rect x="130" y="200" width="40" height="24" rx="6" fill="#2c2318"/>` +
          `<rect x="60" y="330" width="180" height="8" fill="#0f0d0a"/>`,
        { aspect: "portrait", base: "#141210", grain: 0.11 },
      ),
      evidenceLabel: "The suitcase she packed against instructions — still by the door",
    },
    {
      id: "c3-ph-paperwork",
      caption: "",
      timestamp: "2025-10-29T14:10:00",
      aspect: "portrait",
      meta: { takenAt: "2025-10-29T14:10:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#15130f"/>` +
          `<rect x="45" y="50" width="210" height="300" fill="#cfc7b2" opacity="0.92"/>` +
          `<text x="150" y="85" text-anchor="middle" font-family="serif" font-size="13" fill="#3a3427">LANTERN BRIDGE TRUST</text>` +
          `<text x="150" y="105" text-anchor="middle" font-family="serif" font-size="9" fill="#5c543f">DEED OF GIFT — IRREVOCABLE</text>` +
          Array.from({ length: 10 }, (_, i) => `<rect x="65" y="${130 + i * 17}" width="${170 - ((i * 23) % 60)}" height="4" fill="#8b8371"/>`).join("") +
          `<rect x="65" y="310" width="80" height="4" fill="#3a3427"/>` +
          `<text x="65" y="302" font-family="serif" font-size="9" fill="#3a3427" font-style="italic">Edith A. Marsh</text>`,
        { aspect: "portrait", base: "#100e0a", grain: 0.09 },
      ),
      evidenceLabel: "Photo of the signed, irrevocable deed of gift to Lantern Bridge Trust",
    },
    {
      id: "c3-ph-van",
      caption: "",
      timestamp: "2025-11-03T03:58:00",
      aspect: "landscape",
      deleted: true,
      meta: { takenAt: "2025-11-03T03:58:00", device: "This phone", location: "Home" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#0a0c0f"/>` +
          `<rect x="80" y="120" width="240" height="90" rx="12" fill="#1c2026"/>` +
          `<rect x="80" y="140" width="60" height="45" rx="6" fill="#12161b"/>` +
          `<circle cx="130" cy="220" r="18" fill="#07080b"/><circle cx="280" cy="220" r="18" fill="#07080b"/>` +
          `<circle cx="230" cy="165" r="20" fill="#c89a4a" opacity="0.14"/>` +
          `<text x="230" y="170" text-anchor="middle" font-family="serif" font-size="12" fill="#8a6d33" opacity="0.8">🕯</text>` +
          figure(350, 215, 0.7, 0.35),
        { aspect: "landscape", base: "#08090c", grain: 0.17 },
      ),
      evidenceLabel: "Deleted photo, 3:58 AM: the van outside — someone already standing at its door",
    },
    {
      id: "c3-ph-porch",
      caption: "",
      timestamp: "2025-11-03T04:02:00",
      aspect: "portrait",
      deleted: true,
      meta: { takenAt: "2025-11-03T04:02:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#060708"/>` +
          `<circle cx="150" cy="230" r="10" fill="#c89a4a" opacity="0.25"/>`,
        { aspect: "portrait", base: "#050607", grain: 0.2 },
      ),
      flashlight: {
        hiddenSvg: photoSvg(
          `<rect width="300" height="400" fill="#0b0d10"/>` +
            `<rect x="0" y="320" width="300" height="18" fill="#181410"/>` +
            `<rect x="130" y="200" width="40" height="70" rx="6" fill="#221c12"/>` +
            `<circle cx="150" cy="230" r="12" fill="#c89a4a" opacity="0.85"/>` +
            figure(60, 310, 0.85, 0.75, "#05060a") +
            figure(105, 315, 0.85, 0.75, "#05060a") +
            figure(200, 312, 0.85, 0.75, "#05060a") +
            figure(245, 316, 0.85, 0.75, "#05060a") +
            timestampBurn("04:02:33", 300, 400),
          { aspect: "portrait", base: "#090a0d", grain: 0.12 },
        ),
      },
      evidenceLabel: "Deleted 4:02 AM photo: figures waiting in a row at the fence, past the lantern light",
    },
    {
      id: "c3-ph-recipe",
      caption: "found his handwriting in the flour tin. hi walt",
      timestamp: "2025-09-12T10:30:00",
      aspect: "portrait",
      meta: { takenAt: "2025-09-12T10:30:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="300" height="400" fill="#17140f"/>` +
          `<rect x="55" y="90" width="190" height="230" fill="#d3cab4" opacity="0.88" transform="rotate(-3 150 205)"/>` +
          Array.from({ length: 7 }, (_, i) => `<path d="M80 ${130 + i * 26} q 30 ${i % 2 ? 4 : -4} 60 0 t 60 0" stroke="#4a4232" stroke-width="2.5" fill="none" opacity="0.8"/>`).join(""),
        { aspect: "portrait", base: "#110f0b", grain: 0.1 },
      ),
    },
    {
      id: "c3-ph-tuesday",
      caption: "my tuesday setup. tea, walt's afghan, nine little squares of people who understand",
      timestamp: "2025-07-08T18:55:00",
      aspect: "landscape",
      meta: { takenAt: "2025-07-08T18:55:00", device: "This phone" },
      svg: photoSvg(
        `<rect width="400" height="300" fill="#191510"/>` +
          `<rect x="90" y="70" width="220" height="140" rx="8" fill="#0d0f13"/>` +
          Array.from({ length: 9 }, (_, i) => `<rect x="${100 + (i % 3) * 70}" y="${80 + Math.floor(i / 3) * 42}" width="60" height="36" rx="3" fill="#1f242c"/><circle cx="${130 + (i % 3) * 70}" cy="${98 + Math.floor(i / 3) * 42}" r="9" fill="#2e333c"/>`).join("") +
          `<ellipse cx="60" cy="250" rx="26" ry="14" fill="#3a2f22"/><rect x="52" y="220" width="16" height="24" rx="6" fill="#4a3c2a"/>`,
        { aspect: "landscape", base: "#131009", grain: 0.12 },
      ),
    },
  ],

  notes: [
    {
      id: "c3-n-circle-notes",
      title: "Circle homework",
      timestamp: "2025-10-21T20:30:00",
      evidenceLabel: "Her Circle “homework” — the program's script, in her handwriting",
      body:
        "Week 34 reflection: 'What does your grief still own?'\n\nThe house (his chair, his side, his mug I still fill)\nThe money (I haven't touched it. It feels like spending him)\nSundays\nMy name — Mrs. Marsh is a door he holds open\n\nMaren says the Walk is where you set the heavy things down. That the finished ones set everything down. Everything is a lot, Maren.\n\nWeek 35: 'Who would you be with empty hands?'\nI wrote 'lighter' because that's the word they like. The true word is: nobody. With empty hands I'd be nobody.\n\nShe said that's the point. That nobody is the lightest thing you can be.",
    },
    {
      id: "c3-n-locked",
      title: "for claire",
      timestamp: "2025-11-02T23:50:00",
      lock: {
        code: "2214",
        hintText: "“The place we started, the day we started.” — the apartment she'd knock on again, and their June date. Both are in what she wrote to Walt.",
        clueSourceIds: ["c3-th-walt", "c3-cal-anniv"],
      },
      evidenceLabel: "The locked note addressed to her daughter",
      body:
        "Claire. If the Circle's letter reaches you before this does, know that their letter is a form. This is your mother.\n\nI'm not sure anymore. That's the truth I couldn't say on Tuesdays. Gordon counted things out loud and then Gordon was gone from the group and his 'walk is still scheduled' — Claire, they schedule your leaving FOR you and call it yours.\n\nI signed the trust papers. That was real money and I signed it away and I need you to hear why: they said grief is weight, and money is the heaviest weight, and I was so tired of being strong about weight. It sounds like a scam when I type it. It felt like church when they said it.\n\nTomorrow at 4 a van comes. I packed a suitcase they told me not to pack. If I get in that van and it's what they promise — rest, an ending to the year, a door — I'll write to you myself, in my own hand, with the pen from the kitchen drawer, and I'll use the word 'rhubarb' so you know it's me.\n\nIf a typed letter comes instead: it wasn't me. Take this phone to the police and tell them about Hollis Farm Road.\n\nYou were the best thing we made. The very best thing. — Mom",
    },
    {
      id: "c3-n-recipe",
      title: "walt's pancakes (from the flour tin)",
      timestamp: "2025-09-12T10:45:00",
      body: "2 cups flour (the good bowl)\nbuttermilk NOT milk, don't argue\n3 eggs, one for the pan gods\nrest the batter as long as one cup of coffee\n\n(in his hand at the bottom: 'the secret ingredient is rhubarb jam and telling no one')",
    },
    {
      id: "c3-n-donotcall",
      title: "numbers",
      timestamp: "2025-02-08T11:00:00",
      body: "plow guy: 555-0148\nfurnace: 555-0160\nclaire work: 555-0155\ninsurance man (kind voice): 555-0173\n\nwalt's cell: keeping the line on. it's $14 a month. some things are cheap to keep.",
    },
  ],

  voicemails: [
    {
      id: "c3-vm-claire",
      callerLabel: "Claire",
      callerNumber: "(612) 555-0150",
      timestamp: "2025-11-03T19:01:00",
      durationSec: 29,
      tone: "plain",
      transcript:
        "[automated transcript — audio partially recovered]\n“Mom. I'm in your kitchen. Your tea's on the counter, your suitcase is by the door, the — the porch light thing is still going. Your car's here. Mom, your CAR is here. I'm calling the police and then I'm calling everyone in that group one by one, I swear to god. Pick up.”",
    },
    {
      id: "c3-vm-maren",
      callerLabel: "Maren 🕯",
      callerNumber: "(844) 555-0111",
      timestamp: "2025-11-02T21:15:00",
      durationSec: 38,
      tone: "plain",
      evidenceLabel: "Maren's final voicemail: “bring nothing — you arrive already carried”",
      transcript:
        "[automated transcript — audio partially recovered]\n“Edie, love. Tomorrow before dawn, then. Don't eat heavy, wear the good walking shoes, and bring nothing — I mean it this time, nothing. You've carried enough for one year, haven't you? You arrive already carried. That's the whole gift. Sleep well. We're all so proud of how you've finished.”",
    },
    {
      id: "c3-vm-gordon",
      callerLabel: "Gordon (Circle)",
      callerNumber: "(612) 555-0186",
      timestamp: "2025-10-27T01:12:00",
      durationSec: 22,
      tone: "distorted",
      evidenceLabel: "Gordon's last voicemail, from Hollis Farm Road — cut off mid-word",
      transcript:
        "[automated transcript — audio heavily corrupted]\n“Edie — it's the farm, I'm at the fence line. There's lanterns, there's a whole ROW of lanterns going down into the — they're not for finding your way OUT, they're for counting who came IN, there's a ledger nailed to the — [wind] — oh. someone's already wal—”\n[end of message]",
    },
    {
      id: "c3-vm-robo",
      callerLabel: "(800) 555-0100",
      timestamp: "2025-10-31T14:20:00",
      durationSec: 18,
      tone: "static",
      transcript:
        "[automated transcript]\n“—important information about your vehicle's extended warranty. This is your final notice. Press one to… [remainder unrecoverable]”",
    },
    {
      id: "c3-vm-walt",
      callerLabel: "Walt ❤",
      callerNumber: "(612) 555-0122",
      timestamp: "2025-11-04T04:44:00",
      durationSec: 44,
      tone: "breathing",
      evidenceLabel: "A 44-second voicemail from Walt's disconnected number, the night after she vanished",
      transcript:
        "[automated transcript — no speech detected]\n[room tone. a clock. possibly the Marsh kitchen clock]\n[a chair, drawn out from a table, slowly]\n[forty seconds]\n[a chair, pushed back in — gently, the way you do when the meal was good]\n[end of message]\n\n⚠ EVIDENCE ANNOTATION: originating number was disconnected in January and has not been reissued. Carrier logs show no such call.",
    },
  ],

  calendarEvents: [
    { id: "c3-cal-circle", title: "Circle — Tuesdays 🕯", date: "2025-02-25", time: "19:00", recurring: "weekly", createdBy: "external", detail: "Invitation from lantern-circle scheduling bot." },
    { id: "c3-cal-claire", title: "Sunday call with Claire", date: "2025-02-09", time: "17:00", recurring: "weekly", createdBy: "owner", struck: true, evidenceLabel: "Her standing Sunday call with Claire — struck through in September" },
    {
      id: "c3-cal-anniv",
      title: "42 years ❤ (June 14, apt 22 first)",
      date: "2025-06-14",
      time: "09:00",
      createdBy: "owner",
      detail: "“Married June 14. First home: apartment 22, Dunmore St. He carried me up three flights and complained for forty years.”",
      evidenceLabel: "Her anniversary note: June 14 — and apartment 22, where it started",
    },
    {
      id: "c3-cal-yearwalk",
      title: "YEAR WALK 🌅",
      date: "2025-11-03",
      time: "04:44",
      createdBy: "external",
      detail: "Created by lantern-circle scheduling bot. Location field: 'you'll be brought.'",
      evidenceLabel: "The Year Walk: 4:44 AM, location “you'll be brought”",
    },
    { id: "c3-cal-refill", title: "pick up refill", date: "2025-11-04", time: "10:00", createdBy: "owner" },
    { id: "c3-cal-dentist", title: "Dr. Okafor (cleaning)", date: "2025-11-18", time: "14:30", createdBy: "owner" },
  ],

  locationPins: [
    { id: "c3-pin-home1", label: "Home — Birchmont Rd", timestamp: "2025-10-25T09:00:00", x: 42, y: 40 },
    { id: "c3-pin-church", label: "Fairhaven Lutheran", timestamp: "2025-10-26T10:30:00", x: 55, y: 28 },
    { id: "c3-pin-grave", label: "Fairhaven Cemetery", timestamp: "2025-10-26T11:45:00", x: 62, y: 22 },
    { id: "c3-pin-bank", label: "Harbor Bank — main branch", timestamp: "2025-10-30T10:05:00", x: 50, y: 55, evidenceLabel: "The bank, the morning of the $118,000 wire" },
    { id: "c3-pin-grocer", label: "Hollis Grocery", timestamp: "2025-11-01T15:20:00", x: 46, y: 50 },
    {
      id: "c3-pin-farm",
      label: "Hollis Farm Rd (signal edge)",
      timestamp: "2025-10-19T14:02:00",
      x: 88,
      y: 78,
      detail: "A single afternoon fix, weeks before the Walk. She drove out to look at the place — the retreat's 'campus.' County records show the parcel as unimproved grazing land. No structures. No lanterns.",
      evidenceLabel: "She visited Hollis Farm Road herself — a parcel that officially has nothing on it",
    },
    {
      id: "c3-pin-last",
      label: "Home — final fix",
      timestamp: "2025-11-03T04:07:00",
      x: 42,
      y: 40,
      detail: "The phone never left the kitchen. Whatever she walked into, she walked into it exactly as instructed: carrying nothing.",
      evidenceLabel: "Final fix: the phone stayed home, as instructed",
    },
  ],

  browserHistory: [
    { id: "c3-b-table", query: "is it normal to still set his place at the table", timestamp: "2025-02-06T21:40:00" },
    { id: "c3-b-group", query: "online grief support group not religious kind people", timestamp: "2025-02-17T22:15:00" },
    { id: "c3-b-reviews", query: "the lantern circle grief group reviews", timestamp: "2025-02-18T09:30:00", evidenceLabel: "She searched for reviews — and found only the Circle's own testimonials" },
    { id: "c3-b-year", query: "grief first year anniversary what to expect", timestamp: "2025-08-20T23:00:00" },
    { id: "c3-b-tomas", query: "tomas ferreira duluth obituary", timestamp: "2025-08-09T20:15:00", evidenceLabel: "She searched for Tomas's obituary — there wasn't one. There wasn't anything." },
    { id: "c3-b-gordon", query: "gordon halloway missing", timestamp: "2025-10-28T08:50:00", evidenceLabel: "Search: “gordon halloway missing”" },
    { id: "c3-b-trust", query: "can you undo an irrevocable deed of gift", timestamp: "2025-10-30T22:10:00", evidenceLabel: "The night after the wire: “can you undo an irrevocable deed of gift”" },
    { id: "c3-b-rosa", query: "rosa jelinek 2021 empty casket funeral", timestamp: "2025-10-14T22:30:00" },
    { id: "c3-b-final", query: "what happens if I don't go", timestamp: "2025-11-02T23:58:00", evidenceLabel: "Her last search, near midnight: “what happens if I don't go”" },
  ],

  hiddenApp: {
    disguiseIcon: "weather",
    disguiseLabel: "Sunrise",
    revealAfterClueIds: ["c3-th-gordon", "c3-n-circle-notes"],
    title: "Lantern — Facilitator",
    heading: "Facilitator portal · node MAREN-4",
    body:
      "Member ledger, cohort 2024–2025. This app was installed under a weather-app profile during the spring retreat, while member devices were collected 'so everyone could be present.'\n\nYou are viewing what Maren sees.",
    entries: [
      { label: "R. JELINEK", status: "MAINTAINED", detail: "voice: active · posts Tuesdays · yr 4 post-walk" },
      { label: "T. FERREIRA", status: "MAINTAINED", detail: "voice: active · walked 07/20 · estate settled" },
      { label: "G. HALLOWAY", status: "DOUBT — RETIRED EARLY", detail: "walked 10/27 (unscheduled) · no letter sent yet" },
      { label: "E. MARSH", status: "PREPARED", detail: "trust settled 10/30 · walk 11/03 · letter drafted" },
      { label: "B. OKONKWO", status: "MONTH 7", detail: "attachment: daughter (flagged)" },
      { label: "D. PRICE", status: "MONTH 3", detail: "estate: pending probate · patience" },
      { label: "C. MARSH", status: "REFERRED", detail: "grief event projected · source: E. MARSH walk" },
    ],
    footer:
      "The last row is her daughter. The ledger projects Claire's grief — the grief of losing Edie — as next year's intake. The Circle does not find the grieving. The Circle farms them.",
    evidenceLabel: "The Facilitator ledger: members “maintained” after walking — and Claire already “referred”",
  },

  liveEvents: [
    {
      id: "c3-live-circle",
      kind: "message",
      afterSeconds: 320,
      threadId: "c3-th-circle",
      message: {
        id: "c3-m-ci-live",
        from: "them",
        text: "Edie: Feeling so light tonight, everyone. The house is quiet and the quiet is kind. 🕯",
        timestamp: "2025-11-04T20:11:00",
        evidenceLabel: "“Edie” posting in the group — while her phone lies in an evidence review",
      },
    },
    {
      id: "c3-live-referral",
      kind: "notification",
      afterSeconds: 600,
      title: "Lantern Circle",
      body: "A place has been held for someone you love.",
      glitch: true,
    },
  ],

  verdicts: [
    {
      id: "c3-v-chose",
      label: "She walked out of her old life willingly",
      description: "Grief, a signed deed, a packed bag she left behind. Maybe the Circle only gave her the door she was already looking for.",
      requiredEvidenceIds: ["c3-m-bk-1", "c3-ph-paperwork", "c3-n-circle-notes"],
      isCanon: false,
      epilogue:
        "Voluntary association, voluntary gift, voluntary departure — legally, it holds. Adults are allowed to give everything away. Adults are allowed to walk at dawn.\n\nSix weeks later a letter arrives at Claire's apartment. Typed. 'Edith is finished and at peace. She asks for privacy.' There is no word 'rhubarb' anywhere in it.\n\nClaire brings it to you, holding it flat on both palms like something that might go off. You reread your own report. 'Voluntary' is still the right legal word. You no longer believe it is the true one.",
    },
    {
      id: "c3-v-circle",
      label: "The Circle harvests the grieving",
      description: "A year of love-bombing, the estate moved first, the walk scheduled for her, the members' voices puppeted afterward — and her daughter already in the ledger.",
      requiredEvidenceIds: ["case-03.hidden", "c3-m-ma-7", "c3-m-go-5", "c3-cal-yearwalk", "c3-vm-gordon"],
      isCanon: true,
      epilogue:
        "Your report maps the machine: intake through grief keywords, a year of scripted warmth, the estate moved in the final week, the Walk, the typed letter, and then the harvested member's account kept warm — posting every Tuesday, forever 'lighter' — to soothe the next intake. Rosa. Tomas. Gordon, retired early for counting out loud. Edith, prepared.\n\nThe Lantern Bridge Trust unwinds into eleven shell entities and a mail slot. The farm parcel is searched: no structures, no lanterns — but the ground at the fence line is packed hard in a long straight row, the way earth gets when many people walk the same line many times. No one is charged. 'Maren' is a voice, a scheduling bot, and a portal node; if there is a person at the top of the lantern line, the ledger never needed to record them.\n\nThe group chat is still active. Edie posts on Tuesdays now. Claire reported the account. It was reviewed and found to be 'a member in good standing.'\n\nThe last thing you do on the case is unofficial: you find Claire's number in the file, and you tell her — if a group ever writes to say a place has been held for her, the word is rhubarb. Ask for the word.",
    },
    {
      id: "c3-v-maren",
      label: "Maren is a predator inside a real support group",
      description: "One facilitator, one honeyed voice, one wire transfer. The rest of the Circle may be as deceived as Edie was.",
      requiredEvidenceIds: ["c3-vm-maren", "c3-m-ma-9", "c3-m-bk-1"],
      isCanon: false,
      epilogue:
        "One wolf, one flock: you build the case around Maren. The financial trail cooperates — the trust's first hop is an account her number once verified. A warrant is drafted.\n\nIt dies quietly. The number is a VOIP shell. The 'eleven years of this work' she claimed trace to four different states under three names, each vouched for by testimonial letters from members who cannot be produced. The voice on the voicemails is analyzed: consistent pacing, consistent warmth, and — the analyst flags this reluctantly — breaths in places where breath serves the sentence rather than the speaker.\n\nMaybe a person. Maybe a script that got very, very good at Tuesdays. The group reconvenes under a new name by spring. There is always a facilitator. She is always so glad you found them.",
    },
    {
      id: "c3-v-unknown",
      label: "Something here doesn't resolve",
      description: "A dead man's number that answers. A kitchen chair drawn out and pushed back in. A 44-second call from nowhere at 4:44.",
      requiredEvidenceIds: ["c3-m-wa-6", "c3-vm-walt"],
      isCanon: false,
      epilogue:
        "You write the section no one asked for: the disconnected number. 'soon,' at 4:44 AM, from a line dead since January. The voicemail of a chair being treated kindly in an empty kitchen. The carrier's flat, repeated 'no such call exists.'\n\nIt changes nothing about the Circle and it will not bring Edith back, and you include it anyway, because someone should write down that grief may have more than one kind of listener, and not all of them send invoices.\n\nClaire keeps paying the $14 a month on Walt's line. Some things are cheap to keep. On her mother's birthday, she texts it: 'is she with you?' It's the only message in the thread that ever shows 'Read.'",
    },
  ],
};

export default c3;
