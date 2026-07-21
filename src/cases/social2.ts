/**
 * Two more layers of the social sphere, kept out of social.ts to stay
 * readable: the victim's Stories (ephemeral, timestamped reels that play
 * full-screen) and their DMs (private threads — the place people say the
 * things they'd never post). Both are per-case, both are optional to the
 * solve, and both are where the quiet dread lives closest to the surface.
 */

export interface StorySeg {
  scene: string;
  text: string;
  when: string;
}

export interface DMLine {
  from: "me" | "them";
  text: string;
}

export interface DMThread {
  name: string;
  handle: string;
  when: string;
  unread?: boolean;
  lines: DMLine[];
}

const STORIES: Record<string, StorySeg[]> = {
  "case-01": [
    { scene: "🌙", text: "3:14am. the floor above me again. leasing office SWEARS 3A is empty.", when: "5d" },
    { scene: "🕯️", text: "flower shop light. off when I left. on now. I have the only key to my own place and I still checked the closet.", when: "4d" },
    { scene: "🚪", text: "new lock's on. sleeping with the lamp tonight. don't @ me.", when: "3d" },
  ],
  "case-02": [
    { scene: "🚗", text: "night four he's requested me. I'm noting it here so it's timestamped.", when: "6d" },
    { scene: "📍", text: "he knew I switched routes. I didn't tell a soul. screenshot saved.", when: "5d" },
    { scene: "🔒", text: "doors locked, spray in the cupholder, dash cam rolling. be safe out there, drivers.", when: "3d" },
  ],
  "case-03": [
    { scene: "🌹", text: "Walt's roses again. talked to the group about it. they understood.", when: "8d" },
    { scene: "📿", text: "'the walk' — that's what the circle calls being ready. bought the shoes.", when: "5d" },
    { scene: "✉️", text: "keys in the envelope by the door. for whoever needs the house next. feels right.", when: "2d" },
  ],
  "case-04": [
    { scene: "☕", text: "booth 4. exact change. $4.44. sixty years, gran says. I'm counting the till tape.", when: "6d" },
    { scene: "📷", text: "tried to photograph him for the regulars wall. THREE tries. blurry every time.", when: "4d" },
    { scene: "🌙", text: "gran said 'sunday, I'll tell you sunday.' it's wednesday. wish me luck at 4am.", when: "1d" },
  ],
  "case-05": [
    { scene: "🦷", text: "home for tooth #3. tooth fairy's broke but present. priorities.", when: "7d" },
    { scene: "📋", text: "the badge log doesn't lie. the shift they 'eliminated' is still running. filed copy 3.", when: "4d" },
    { scene: "🎙️", text: "recording everything from here. if the truck's in the lot and I'm not — pull the logs.", when: "1d" },
  ],
  "case-06": [
    { scene: "🛏️", text: "night 8 at the annex. $150 cash to sleep. the charger's still in the wall from night 1.", when: "5d" },
    { scene: "📱", text: "there were seven other phones on the shelf. none claimed. trying not to think about it.", when: "3d" },
    { scene: "🎒", text: "duffel's packed. hearing's thursday. I did the math. I always do the math.", when: "1d" },
  ],
  "case-07": [
    { scene: "💍", text: "ring fund at 94%. can't say more. she's the one.", when: "6d" },
    { scene: "📦", text: "van came back HEAVIER tonight. counted twice. thieves don't leave you extra.", when: "4d" },
    { scene: "🌮", text: "one more stretch on Verge Rd. every driver 'gets a turn.' 1148, if anyone asks.", when: "1d" },
  ],
  "case-08": [
    { scene: "🏚️", text: "1207 Fernway. county says condemned since '23. so who's the family that booked me?", when: "5d" },
    { scene: "🔦", text: "no kids' beds. one rule: 'never check on the children.' I checked from the doorway.", when: "3d" },
    { scene: "📲", text: "code word's jacaranda. if I send it, come. probably nothing. always just in case.", when: "1d" },
  ],
  "case-09": [
    { scene: "💡", text: "four floodlights up. Dana thinks I've lost it. maybe. the lawn thing though.", when: "6d" },
    { scene: "📋", text: "somebody filed a tip on ME. my own schedule. handed back like a report.", when: "4d" },
    { scene: "🌙", text: "four of them on the lawn at 2am. then gone. all at once. like a shift ending.", when: "1d" },
  ],
  "case-10": [
    { scene: "🌲", text: "day 3. no signal, all calm. everyone's calm in a way I can't name yet.", when: "5d" },
    { scene: "📓", text: "charting the place like a chart. 'left early, on foot,' they all say. word for word.", when: "3d" },
    { scene: "🌾", text: "the meadow past the fence they swear isn't there. I can see it from cabin Willow.", when: "1d" },
  ],
  "case-11": [
    { scene: "📷", text: "found the 2005 photo. all six of us. before.", when: "6d" },
    { scene: "💬", text: "the group chat's alive again. all four of them. cheerful. one of them's been missing a week.", when: "3d" },
    { scene: "🌊", text: "Blackwater on the 13th. we owe the day. counting right this time.", when: "1d" },
  ],
  "case-12": [
    { scene: "🐕", text: "Biscuit will NOT leave that wall alone. same wall, every walk.", when: "6d" },
    { scene: "📐", text: "county plan says 11-foot 'chase' behind it. a window outside, no room inside.", when: "4d" },
    { scene: "🔦", text: "going back in tonight. if the app says I 'resigned' tomorrow, I didn't write that.", when: "1d" },
  ],
  "case-13": [
    { scene: "🔑", text: "he wants the master key. the one that opens everything under all five. answer's no.", when: "6d" },
    { scene: "☕", text: "Marisa said yes to one coffee. cancelled everything else so I don't ruin it.", when: "3d" },
    { scene: "🧰", text: "mom's ring, green toolbox, top tray. saturday. I'll be early. I promise.", when: "1d" },
  ],
  "case-14": [
    { scene: "📡", text: "phantom storm's radar source is a station killed in 1988. parked over one field.", when: "6d" },
    { scene: "📰", text: "1987: F4 into Halloran's field, three spotters gone. coordinates match mine.", when: "3d" },
    { scene: "🌾", text: "driving out at first light. anemometer's coming. dead calm and the cups still spin.", when: "1d" },
  ],
  "case-15": [
    { scene: "💻", text: "study group by video, tuesdays. never met minds like theirs. don't know where they found me.", when: "6d" },
    { scene: "📞", text: "called one back on a normal line. carrier says the number was 'never issued.' huh.", when: "3d" },
    { scene: "📄", text: "proof's done. presenting tuesday night. to the only ones who'll truly understand.", when: "1d" },
  ],
};

const DMS: Record<string, DMThread[]> = {
  "case-01": [
    { name: "Reyna B.", handle: "reyna_b", when: "2d", unread: true, lines: [
      { from: "them", text: "ok your last post was NOT a joke to me. what's going on in that building" },
      { from: "me", text: "honestly? I don't know. the noises are real. the light is real. I wrote it all down" },
      { from: "them", text: "come stay here tonight. I mean it wren" },
      { from: "me", text: "I put the new lock on. I'll be ok. if I'm weird tomorrow come get me 💛" },
    ] },
    { name: "Leasing Office", handle: "brookline_mgmt", when: "6d", lines: [
      { from: "me", text: "Hi — following up again on the noise from 3A. I know you said it's vacant but I hear the floor at night." },
      { from: "them", text: "Unit 3A is not occupied. There is no maintenance scheduled. Please direct further concerns to the portal." },
      { from: "me", text: "There's no one I can talk to who actually… okay. thanks." },
    ] },
  ],
  "case-02": [
    { name: "Sam (bro)", handle: "sam_quist", when: "3d", unread: true, lines: [
      { from: "them", text: "did you report the gray sedan guy yet. to the actual POLICE not the app" },
      { from: "me", text: "screenshotting everything first. I want it airtight" },
      { from: "them", text: "mara. airtight later. safe now" },
      { from: "me", text: "one more week and the car's paid off. then I sleep for a year. love you. soup sunday" },
    ] },
    { name: "unknown rider", handle: "—", when: "3d", unread: true, lines: [
      { from: "them", text: "you changed your route tonight" },
      { from: "me", text: "who is this. how did you get this number" },
      { from: "them", text: "I just like to know where you'll be. that's not a lot to ask." },
    ] },
  ],
  "case-03": [
    { name: "Claire (daughter)", handle: "claire.m", when: "2d", unread: true, lines: [
      { from: "them", text: "MOM. what paperwork. what money. please call me back" },
      { from: "them", text: "you're scaring me. who is Maren" },
      { from: "me", text: "sweetheart don't worry. the circle is helping me let go. the porch light stays on for the next family 💛" },
    ] },
    { name: "Maren (circle)", handle: "maren.circle", when: "4d", lines: [
      { from: "them", text: "You've done the hard part, Edith. The trust receives what you leave. Then the walk." },
      { from: "me", text: "It feels like a lot to give all at once." },
      { from: "them", text: "The ones who truly heal don't look back. One year exactly. You'll see. We're so proud of you." },
    ] },
  ],
  "case-04": [
    { name: "Theo (bro)", handle: "theo_pell", when: "1d", unread: true, lines: [
      { from: "them", text: "which regular. the booth 4 guy. june which one" },
      { from: "me", text: "you know the one. exact change. $4.44. gran goes dead quiet about him" },
      { from: "them", text: "the camera thing is freaking me out. come home after your shift" },
      { from: "me", text: "gran's telling me the story sunday. I just have to get through tonight first" },
    ] },
    { name: "Gran", handle: "gran_pell", when: "2d", lines: [
      { from: "me", text: "gran how long has the booth 4 man been coming in. really." },
      { from: "them", text: "Sunday, baby. I'll tell you everything Sunday. Just don't take his order alone." },
      { from: "me", text: "…gran that's not funny" },
      { from: "them", text: "I'm not laughing." },
    ] },
  ],
  "case-05": [
    { name: "Luz ❤️", handle: "luz.rv", when: "1d", unread: true, lines: [
      { from: "them", text: "home by 7? tooth #3 is hanging on by a thread, he's SO excited" },
      { from: "me", text: "I'll be there. saving the last café de olla for after" },
      { from: "them", text: "you're documenting that work thing again aren't you" },
      { from: "me", text: "somebody has to. if the truck's in the lot and I'm not answering, tell them to pull the badge logs. that's all. love you both" },
    ] },
    { name: "Marcus (dock)", handle: "marcus_dock", when: "3d", lines: [
      { from: "me", text: "the badge board — you ever notice names clocking the eliminated shift? I've got 41 hits" },
      { from: "them", text: "man I don't look at that board. and honestly? you shouldn't either" },
    ] },
  ],
  "case-06": [
    { name: "Dad", handle: "dad", when: "1d", unread: true, lines: [
      { from: "them", text: "Casey. call me back. There's nothing you could tell me that's worse than this phone not ringing." },
      { from: "them", text: "The debt, the hearing, whatever it is. I'll take any of it. Just call." },
      { from: "me", text: "I've got a plan dad. I always do the math. tell mari thanks for the ticket" },
    ] },
    { name: "Mari (cousin)", handle: "mari.b", when: "2d", lines: [
      { from: "me", text: "bought the bus ticket in your name. delete the email ok? just in case" },
      { from: "them", text: "casey what are you planning. I'm not deleting anything until you tell me you're safe" },
      { from: "me", text: "safer than you'd think. or exactly as unsafe. hard to say yet" },
    ] },
  ],
  "case-07": [
    { name: "Theo (bro)", handle: "theo_b", when: "1d", unread: true, lines: [
      { from: "them", text: "who signs for 34 packages to a culvert man. that's not a delivery route that's a setup" },
      { from: "me", text: "nobody signs. that's the thing. and the van came back with MORE tonight" },
      { from: "them", text: "quit. tonight. the ring can wait a week" },
      { from: "me", text: "two weeks notice goes in AFTER it's on her finger. one more Verge Rd run. 1148. love you bro" },
    ] },
    { name: "Mama", handle: "denise.b", when: "2d", lines: [
      { from: "them", text: "roast sunday. saved you the end piece already 😘" },
      { from: "me", text: "save me the end piece, mama. always. big news coming soon 💍" },
    ] },
  ],
  "case-08": [
    { name: "Zoe 🩵", handle: "zoe.k", when: "1d", unread: true, lines: [
      { from: "them", text: "the condemned thing. maddie. do NOT go back in that house" },
      { from: "me", text: "I backed everything up to the cloud, not just my phone. if anything happens it's all there" },
      { from: "them", text: "that is not comforting????" },
      { from: "me", text: "code word's jacaranda. keep your phone on. if it comes through, call 911 first, then run" },
    ] },
    { name: "SitterConnect", handle: "no-reply", when: "4d", lines: [
      { from: "them", text: "The Wexler family (Verified ✓) has requested you for an overnight at 1207 Fernway Ave. Accept?" },
      { from: "me", text: "can you confirm the family's ID? the address flags condemned on the county site" },
      { from: "them", text: "This family is Verified ✓. No further details are available. Booking held for 2 hours." },
    ] },
  ],
  "case-09": [
    { name: "Dana ❤️", handle: "dana_b", when: "1d", unread: true, lines: [
      { from: "them", text: "deadbolts AND floodlights now? babe. talk to me when I'm home sunday" },
      { from: "me", text: "I'll vacuum first, act normal, I promise. it's just the lawn thing" },
      { from: "them", text: "what lawn thing" },
      { from: "me", text: "four people. 2am. gone all at once. filed a tip on it. we'll laugh about it sunday" },
    ] },
    { name: "Watch (members)", handle: "maplewatch_ic", when: "3d", lines: [
      { from: "them", text: "Brennan — your Tuesday grocery run is now 6:40, not 6:15. Please keep your entries consistent for the board." },
      { from: "me", text: "why do you have my grocery schedule. I file tips. I'm not a tip." },
      { from: "them", text: "Everyone's on the board, Hal. That's what makes the street safe. Welcome to the inner ring." },
    ] },
  ],
  "case-10": [
    { name: "Layla (sis)", handle: "layla.h", when: "1d", unread: true, lines: [
      { from: "them", text: "you memorized my number on paper right? phones off there freaks me out" },
      { from: "me", text: "on paper, in my boot. checkout's the 5th. if I'm not out by the 6th you call the COUNTY. not the retreat." },
      { from: "them", text: "county. not the retreat. got it. why not the retreat" },
      { from: "me", text: "because they'll say I 'left early, on foot.' they say it about everyone. I'm charting it all. love you" },
    ] },
    { name: "Retreat Front Desk", handle: "stillwater_hostess", when: "3d", lines: [
      { from: "me", text: "was there a guest named Tomlin in cabin Willow before me?" },
      { from: "them", text: "We don't discuss other guests. Willow is yours now. Try to release the need to know things. 🙏" },
    ] },
  ],
  "case-11": [
    { name: "Elena ❤️", handle: "elena.bell", when: "1d", unread: true, lines: [
      { from: "them", text: "you said the guys weren't answering. now suddenly they're all in for the 13th? which is it marcus" },
      { from: "me", text: "they're answering now. all of them. that's the part I can't explain to you" },
      { from: "them", text: "come home. whatever this reunion is, it can wait" },
      { from: "me", text: "it's waited twenty years. I have to make it right. I love you. I counted right this time." },
    ] },
    { name: "the Creek reunion", handle: "group · 5", when: "3d", lines: [
      { from: "them", text: "[Lonnie] can't wait for the 13th brother!! bringing the good whiskey 🥃" },
      { from: "me", text: "Lonnie your wife said you've been gone a week. who is this" },
      { from: "them", text: "[Lonnie] haha what? I'm right here. same as always. see you at the shore." },
    ] },
  ],
  "case-12": [
    { name: "Dev (roommate)", handle: "roommate_dev", when: "1d", unread: true, lines: [
      { from: "them", text: "'best thing you'll ever do' — sadie WHAT is the project" },
      { from: "me", text: "there's someone behind that wall, Dev. I think there's actually someone in there" },
      { from: "them", text: "then call the police. do not go in yourself" },
      { from: "me", text: "the homeowner reports everything first, he'll spin it. I need proof. text me when you don't hear from me. 'A.' — remember that" },
    ] },
    { name: "Fullerton Women's Ctr", handle: "fullerton_wc", when: "2d", lines: [
      { from: "me", text: "if I got someone out of a bad situation tonight, could you take an intake first thing tomorrow? her name starts with A." },
      { from: "them", text: "Yes. We'll hold a bed. Please don't put yourself in danger — call police for the extraction." },
    ] },
  ],
  "case-13": [
    { name: "Marisa 🩶", handle: "marisa.g", when: "1d", unread: true, lines: [
      { from: "them", text: "saturday. one coffee. don't make it weird dad" },
      { from: "me", text: "I won't. I cancelled everything else. it's the only thing on my calendar that matters" },
      { from: "them", text: "…what buyer were you posting about" },
      { from: "me", text: "nothing for you to worry about. the answer to him is no. see you saturday. I'll be early." },
    ] },
    { name: "the buyer", handle: "—", when: "2d", lines: [
      { from: "them", text: "seventh payment sent. now the master key. the one that opens everything under all five." },
      { from: "me", text: "I told you. padlocks, storage, fine. the master stays with me. final answer." },
      { from: "them", text: "You're a reasonable man, Milo. Reasonable men come around. I'm very patient." },
    ] },
  ],
  "case-14": [
    { name: "Bobbi (chase ptnr)", handle: "bobbi_chase", when: "1d", unread: true, lines: [
      { from: "them", text: "if you drive out to Halloran's field ALONE I will kill you myself. take me." },
      { from: "me", text: "first light. anemometer's coming. I need it on video — dead calm and the cups still turning" },
      { from: "them", text: "the 1987 spotters went in and never came out wade" },
      { from: "me", text: "I know. I reported the anomaly right. I did everything right. the sky's the only thing not listening" },
    ] },
    { name: "NWS tip line", handle: "nws_relay", when: "5d", lines: [
      { from: "me", text: "reporting a stationary supercell signature over Halloran's field. radar source appears to be a decommissioned 1988 station. 940mb in dead calm air." },
      { from: "them", text: "Thank you. No active systems are indicated in your area. Reading likely instrument error. Stay weather-aware." },
    ] },
  ],
  "case-15": [
    { name: "Mamá", handle: "mama_navarro", when: "1d", unread: true, lines: [
      { from: "them", text: "come home this weekend mija. eat something. which group is this from the department?" },
      { from: "me", text: "not the department. I don't know where they found me. they just started showing up on tuesdays" },
      { from: "them", text: "check your basement, they always say 😉 come home" },
      { from: "me", text: "the proof is done, mamá. it's beautiful. I present it tuesday night. to the ones who'll understand" },
    ] },
    { name: "Dr. Grasz (advisor)", handle: "advisor_grasz", when: "2d", unread: true, lines: [
      { from: "them", text: "Pris — see me before Tuesday. Before. It's important." },
      { from: "me", text: "is this about the study group? they're real, Dr. Grasz. I have eleven weeks of recordings." },
      { from: "them", text: "I know they are. That's precisely why I need to see you. Please. Not on a Tuesday." },
    ] },
  ],
};

export function storiesFor(caseId: string): StorySeg[] | undefined {
  return STORIES[caseId];
}

export function dmsFor(caseId: string): DMThread[] | undefined {
  return DMS[caseId];
}
