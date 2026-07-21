/**
 * Per-case social media: a photo-grid app (Glimpse) and a microblog (Chatter).
 * These are the victim's public voice in the weeks before they vanished —
 * jokes, small joys, and, threaded through the ordinary, the first quiet
 * signs that something was wrong. None of it is required to solve a case,
 * but a careful reader will feel the timeline tighten. A few posts echo a
 * real clue; most are just a life, which is the point.
 */

export interface GlimpsePost {
  /** Emoji/scene hint used to tint the placeholder tile. */
  scene: string;
  caption: string;
  when: string;
  likes: number;
  location?: string;
  comments?: Array<[string, string]>;
}

export interface GlimpseData {
  handle: string;
  name: string;
  bio: string;
  posts: number;
  followers: string;
  following: string;
  grid: GlimpsePost[];
}

export interface ChatterPost {
  text: string;
  when: string;
  likes: number;
  reposts?: number;
  replies?: Array<[string, string]>;
}

export interface ChatterData {
  handle: string;
  name: string;
  bio: string;
  following: string;
  followers: string;
  posts: ChatterPost[];
}

export interface SocialData {
  glimpse?: GlimpseData;
  chatter?: ChatterData;
}

const SOCIAL: Record<string, SocialData> = {
  "case-01": {
    glimpse: {
      handle: "wren.makes",
      name: "Wren Castellan",
      bio: "26 · new city, new plants, same anxiety · Gerald the pothos lives",
      posts: 61,
      followers: "834",
      following: "391",
      grid: [
        { scene: "🌿", caption: "unpacked exactly one box and adopted a plant. priorities. meet Gerald.", when: "3w", likes: 142, comments: [["reyna_b", "GERALD 🥹"], ["mom_castellan", "Call me when you're settled sweetheart"]] },
        { scene: "🪟", caption: "the light in this apartment at 7am is unreal. above a flower shop, how am i this lucky", when: "2w", likes: 208, location: "Unit 4B" },
        { scene: "☕", caption: "coffee tastes better when you own the mug. domestic bliss etc", when: "2w", likes: 96 },
        { scene: "🌙", caption: "does anyone else's building make noise at like 3am or is that a me problem", when: "9d", likes: 61, comments: [["reyna_b", "that's an OLD BUILDING problem, call your landlord"], ["wren.makes", "he doesn't answer 🙃"]] },
        { scene: "🕯️", caption: "the flower shop downstairs never reopened but someone left the light on again. cute or creepy, jury's out", when: "6d", likes: 74 },
        { scene: "🚪", caption: "installed my own door lock like a functional adult. the one on the door wasn't cutting it", when: "4d", likes: 133, comments: [["reyna_b", "wren are you ok"], ["wren.makes", "totally!! just careful 🙂"]] },
      ],
    },
    chatter: {
      handle: "wrenc",
      name: "wren",
      bio: "documenting my descent into a woman who talks to her plants",
      following: "512",
      followers: "1,204",
      posts: [
        { text: "moved to a new city for a fresh start and my new hobby is lying awake cataloguing sounds. growth.", when: "8d", likes: 340, reposts: 41 },
        { text: "the neighbor in 3A that nobody has ever seen. i hear the floor but the leasing office says it's vacant. so that's fun and normal", when: "6d", likes: 88, replies: [["reyna_b", "girl. GIRL."]] },
        { text: "note to self: the light in the flower shop was off when i left and on when i got back. i did not touch it. writing it down so future me believes present me", when: "5d", likes: 52 },
        { text: "buying earplugs in bulk is a personality now", when: "4d", likes: 210 },
        { text: "if i disappear it was the building. (joking) (mostly)", when: "2d", likes: 19, replies: [["mom_castellan", "That is NOT funny Wren"]] },
      ],
    },
  },
  "case-02": {
    glimpse: {
      handle: "mara.drives",
      name: "Mara Quist",
      bio: "night shift · almost paid off the car · dog people to the front",
      posts: 47,
      followers: "612",
      following: "288",
      grid: [
        { scene: "🚗", caption: "two months from owning this thing outright. we've been through it, baby", when: "3w", likes: 118 },
        { scene: "🌃", caption: "the city at 2am belongs to us night drivers and nobody else. i love it out here", when: "2w", likes: 174, location: "Downtown" },
        { scene: "🦖", caption: "found the DINOSAUR birthday present for my nephew. i am the favorite aunt, this is law", when: "12d", likes: 203, comments: [["sam_quist", "you're gonna spoil him rotten"], ["mara.drives", "that's the JOB"]] },
        { scene: "📷", caption: "new dash cam, front and rear. a girl likes to know what's behind her", when: "8d", likes: 91, comments: [["priti.depot", "smart. it's getting weird out there"]] },
        { scene: "🍲", caption: "sunday soup at mom's. non negotiable. the one night i don't drive", when: "6d", likes: 145 },
        { scene: "🔒", caption: "reminder to self and everyone: doors locked between fares. always. even when it feels silly", when: "3d", likes: 67 },
      ],
    },
    chatter: {
      handle: "mara_q",
      name: "mara",
      bio: "i drive, you talk. 5 stars or don't @ me",
      following: "301",
      followers: "980",
      posts: [
        { text: "same rider requested me four nights running. flattering the first time. now i'm just noting it here.", when: "9d", likes: 64 },
        { text: "he knew i changed my route tonight. i didn't tell the app, i didn't tell anyone. explain that", when: "6d", likes: 122, reposts: 30, replies: [["sam_quist", "report him. tonight. please"], ["mara_q", "already screenshotting everything"]] },
        { text: "unmatched the creepy one on the dating app too. clean break. blocking is free and it's my love language", when: "4d", likes: 88 },
        { text: "to whoever keeps requesting me and cancelling: i see you. the app sees you. knock it off", when: "3d", likes: 41 },
        { text: "one more good week and this car is MINE. then i'm sleeping for a decade", when: "2d", likes: 156 },
      ],
    },
  },
  "case-03": {
    glimpse: {
      handle: "edith_bakes",
      name: "Edith Marsh",
      bio: "58 · roses, sourdough, and one empty chair · Walt's girl always",
      posts: 34,
      followers: "289",
      following: "142",
      grid: [
        { scene: "🌹", caption: "Walt's roses came back this spring even though i was sure i'd killed them. he'd have laughed at me", when: "4w", likes: 96, comments: [["claire.m", "Dad's roses 🥹 love you mom"]] },
        { scene: "🍞", caption: "cooking for one is a cruel art but the bread doesn't know the difference", when: "3w", likes: 78 },
        { scene: "🕯️", caption: "eight months. some mornings i still set two places before i remember", when: "3w", likes: 134 },
        { scene: "👥", caption: "joined a group for people who've lost someone. everyone there just… gets it. first time in months i didn't feel like a burden", when: "2w", likes: 61, comments: [["claire.m", "i'm so glad mom. is it in person?"], ["edith_bakes", "online, sweetheart. they're lovely"]] },
        { scene: "👟", caption: "the group talks about 'the walk' you take when you're ready to let go. bought good shoes for it", when: "9d", likes: 40 },
        { scene: "🌅", caption: "Maren from the group says grief is just love with nowhere to go. i think about that every morning", when: "5d", likes: 55 },
      ],
    },
    chatter: {
      handle: "edithmarsh",
      name: "Edith",
      bio: "widow, baker, learning to be alone",
      following: "88",
      followers: "203",
      posts: [
        { text: "grateful for the circle tonight. they understand that missing someone isn't a problem to be solved.", when: "12d", likes: 33 },
        { text: "the group has an assignment this week: write a letter to the person you lost, then give your money to 'what comes next.' strange. comforting?", when: "8d", likes: 12, replies: [["claire.m", "mom what money. call me"]] },
        { text: "Maren says the ones who truly heal are the ones who leave everything behind and don't look back. one year exactly, she says.", when: "6d", likes: 8 },
        { text: "signed the paperwork today. the house goes to 'the next family.' feels right. Walt would understand.", when: "3d", likes: 5, replies: [["claire.m", "WHAT paperwork. mom please pick up"]] },
        { text: "the porch light stays on for whoever needs it next. i'll leave the keys in the envelope. taking my walk soon.", when: "2d", likes: 4 },
      ],
    },
  },
  "case-04": {
    glimpse: {
      handle: "junepell",
      name: "June Pell",
      bio: "24 · future vet · graveyard shift at the family diner · pro-nap",
      posts: 52,
      followers: "701",
      following: "410",
      grid: [
        { scene: "🥧", caption: "60 years and gran still won't tell me the pie recipe. i'll get it out of her eventually", when: "3w", likes: 188, comments: [["gran_pell", "Over my dead body 😘"]] },
        { scene: "📚", caption: "GRE prep at 4am between tables. vet school or bust. mostly bust rn but we move", when: "2w", likes: 145 },
        { scene: "🐕", caption: "a customer brought their dog in and i have never been more professional in my life (i cried)", when: "12d", likes: 267 },
        { scene: "☕", caption: "booth 4 has a regular who's been coming longer than i've been alive apparently. exact change every time. $4.44. weird little ritual, kinda love him", when: "8d", likes: 92, comments: [["theo_pell", "which regular?"], ["junepell", "you know the one. gran goes quiet about him"]] },
        { scene: "📸", caption: "tried to get a pic of the booth 4 guy for the diner's 'regulars' wall and my camera just… won't. three tries. blurry every time", when: "5d", likes: 71, comments: [["theo_pell", "ok that's creepy june"]] },
        { scene: "🌙", caption: "gran said she'll 'tell me about him on sunday.' it's wednesday. the suspense is killing me", when: "2d", likes: 58 },
      ],
    },
    chatter: {
      handle: "june_p",
      name: "june",
      bio: "tired. dogged. counting things i probably shouldn't count.",
      following: "388",
      followers: "540",
      posts: [
        { text: "counting how many nights the booth 4 regular has come in. the till tape goes back further than it should. much further.", when: "10d", likes: 47 },
        { text: "asked gran how long he's been a regular and she set down the coffee pot and didn't answer. FORTY YEARS she ran this place. she knows.", when: "6d", likes: 88, reposts: 14 },
        { text: "the camera over booth 4 shows the seat pressed down and steam moving and nobody sitting there. the vendor called it a 'compression artifact.' 214 nights of artifact.", when: "4d", likes: 203, replies: [["theo_pell", "june come home. i mean it"]] },
        { text: "exact change. $4.44. every single night. who has exact change every night for sixty years", when: "3d", likes: 66 },
        { text: "gran finally looked scared today. said 'sunday, i'll tell you sunday.' i don't think i want to know but i have to", when: "1d", likes: 51 },
      ],
    },
  },
  "case-05": {
    glimpse: {
      handle: "omar.rv",
      name: "Omar Reyes-Vance",
      bio: "dad · forklift certified · union strong · Mateo's #1 fan",
      posts: 40,
      followers: "356",
      following: "198",
      grid: [
        { scene: "🦖", caption: "Mateo drew me with four arms 'because you do all the work daddy.' framing this forever", when: "3w", likes: 174, comments: [["luz.rv", "my two boys 🥹"]] },
        { scene: "🦷", caption: "tooth #3 is loose. the tooth fairy (me) is once again unprepared and once again broke", when: "2w", likes: 121 },
        { scene: "🥾", caption: "new steel toes. the old ones lasted four years of graveyard shift. respect", when: "10d", likes: 63 },
        { scene: "📋", caption: "keeping records is a love language actually. if nobody else will write it down, i will", when: "7d", likes: 48, comments: [["marcus_dock", "say it louder for the ones in back 💪"]] },
        { scene: "🌙", caption: "night shift again. truck's in the same spot it's always in. see you at 6, Mateo", when: "4d", likes: 89 },
        { scene: "☕", caption: "Luz's café de olla in the big thermos. gets me through anything", when: "2d", likes: 77 },
      ],
    },
    chatter: {
      handle: "oreyesvance",
      name: "Omar",
      bio: "documenting everything. someone has to.",
      following: "140",
      followers: "410",
      posts: [
        { text: "my badge is clocking into a shift payroll says was eliminated months ago. i have the logs. this is the kind of thing you write down.", when: "9d", likes: 92, reposts: 22 },
        { text: "management says the 'second shift' isn't a facility matter. it's happening in the facility. i work in the facility. make it make sense", when: "6d", likes: 71 },
        { text: "bought a pocket recorder. from now on i document EVERYTHING. if it's nothing, great, i wasted $34.", when: "5d", likes: 58, replies: [["luz.rv", "or you come home and we drop it. either way home by 7, tooth #3"]] },
        { text: "grievance file is three copies deep. hearing's the 20th. i am not letting this go quiet", when: "3d", likes: 44 },
        { text: "if the truck's still in the lot tomorrow and i'm not answering, somebody pull the badge logs. that's all i'll say", when: "1d", likes: 39 },
      ],
    },
  },
  "case-06": {
    glimpse: {
      handle: "casey.b",
      name: "Casey Brandt",
      bio: "bio major · professionally tired · ask me about the fujita scale (don't)",
      posts: 44,
      followers: "523",
      following: "487",
      grid: [
        { scene: "📊", caption: "doing frantic whiteboard math about my own life at 2am. this is fine. everything is fine", when: "3w", likes: 88 },
        { scene: "💸", caption: "being broke in college is a full time job that pays nothing. anyway. don't ask about the loan", when: "2w", likes: 134, comments: [["josh_bee", "dude you good?"], ["casey.b", "always 👍 (i am not)"]] },
        { scene: "🛏️", caption: "signed up for a sleep study. $150 a night CASH to literally sleep. easiest money ever, what could go wrong", when: "11d", likes: 156, comments: [["ari_x", "wait which one? send me the link"], ["casey.b", "trust me you don't want in on this one"]] },
        { scene: "📦", caption: "selling basically everything i own. minimalism! (it's not minimalism)", when: "8d", likes: 72 },
        { scene: "🌃", caption: "night 7 at the annex. it's fine. it's a building. buildings are fine", when: "5d", likes: 61 },
        { scene: "🎒", caption: "packed a duffel. just in case. of what, i won't say", when: "3d", likes: 44, comments: [["josh_bee", "casey seriously what's going on"]] },
      ],
    },
    chatter: {
      handle: "caseybee",
      name: "casey",
      bio: "cornered but calculating",
      following: "600",
      followers: "412",
      posts: [
        { text: "the university says the annex has been empty since 2021. i've slept there ten nights. the phone charger's still plugged into the wall", when: "8d", likes: 77, reposts: 19 },
        { text: "online at 3am again. no i'm not on the dating app. yes i left her on read. i've got bigger math to do", when: "6d", likes: 33 },
        { text: "there were seven other phones on the shelf when i got there. none of them claimed. i didn't think about it too hard. maybe i should have", when: "4d", likes: 102, replies: [["josh_bee", "leave. tonight. i'll come get you"]] },
        { text: "academic hearing thursday. it would end the scholarship. so either way i needed a plan. i have a plan.", when: "3d", likes: 41 },
        { text: "if this looks bad later, know that i did the math. i always do the math", when: "1d", likes: 28 },
      ],
    },
  },
  "case-07": {
    glimpse: {
      handle: "dre.delivers",
      name: "Andre Boudreaux",
      bio: "29 · night courier · knows every 2am taco truck · loyal to a fault",
      posts: 38,
      followers: "445",
      following: "302",
      grid: [
        { scene: "💍", caption: "can't say much. but a certain someone's gonna get a certain question soon. ring fund almost there 🤫", when: "3w", likes: 231, comments: [["theo_b", "ANDRE"], ["dre.delivers", "shhh 🤫 not till it's on her finger"]] },
        { scene: "🌮", caption: "the taco truck on Verge Road doesn't exist but the tacos do. night courier secrets", when: "2w", likes: 98 },
        { scene: "🍲", caption: "mama's roast. saved me the end piece like always. that's love", when: "10d", likes: 145 },
        { scene: "📦", caption: "34 deliveries to an address that GPS swears isn't real. gravel and a drainage culvert. i just drive where the manifest says", when: "7d", likes: 67, comments: [["theo_b", "that's sketchy man. who signs for it?"], ["dre.delivers", "nobody. that's the thing. nobody ever signs"]] },
        { scene: "💵", caption: "keeping the winnings in the cupholder like a responsible adult", when: "5d", likes: 54 },
        { scene: "🚚", caption: "one more stretch on Verge Road tonight. every night driver in the district 'gets a turn' on it. weird tradition", when: "2d", likes: 71 },
      ],
    },
    chatter: {
      handle: "dre_b",
      name: "Dre",
      bio: "saving up for the only thing that matters",
      following: "289",
      followers: "533",
      posts: [
        { text: "closed the dating app tonight. deleted it. clean. she's the one, i decided, so what's the point of the rest of it", when: "9d", likes: 88, replies: [["theo_b", "proud of you brother"]] },
        { text: "the van came back last night with MORE packages than it left with. i counted twice. thieves don't leave you extra", when: "6d", likes: 124, reposts: 28 },
        { text: "asked around about the last driver who did the Verge Road stretch regular. everyone got quiet. that's two people quiet at me this week", when: "4d", likes: 66 },
        { text: "two weeks notice going in AFTER the ring's on her finger. new job, new life. this route can find someone else", when: "3d", likes: 51 },
        { text: "1148 Verge Road. if anything happens, that's where i was sent. writing it down.", when: "1d", likes: 37 },
      ],
    },
  },
  "case-08": {
    glimpse: {
      handle: "maddie.sits",
      name: "Maddie Okafor",
      bio: "17 · future vet · AP everything · reads the exits in every room",
      posts: 58,
      followers: "889",
      following: "512",
      grid: [
        { scene: "🧸", caption: "five stars, three repeat families, zero chaos. sitter of the year (self-awarded)", when: "3w", likes: 176, comments: [["zoe.k", "hire her, she's the best"]] },
        { scene: "📓", caption: "AP Bio prep + babysitting money = college fund i don't touch. the plan is the plan", when: "2w", likes: 143 },
        { scene: "🔦", caption: "always know where the exits are. my mom taught me that and i've never once regretted it", when: "12d", likes: 88 },
        { scene: "🏚️", caption: "new family booked me 5 times through the app. verified and everything. the house is on Fernway. something's off about it but the money's good", when: "8d", likes: 61, comments: [["zoe.k", "off how?"], ["maddie.sits", "there's no kid stuff anywhere. i'll tell you after"]] },
        { scene: "📱", caption: "code word with Zoe is 'jacaranda.' if i text it, come get me. probably nothing! being safe", when: "5d", likes: 94, comments: [["zoe.k", "jacaranda. got it. i mean it maddie"]] },
        { scene: "🚌", caption: "checked the last bus on route 9 and the shelter hours for minors. just in case. always just in case", when: "3d", likes: 47 },
      ],
    },
    chatter: {
      handle: "maddie_o",
      name: "maddie",
      bio: "sharp, brave, methodical. underestimate me, it's fun for me",
      following: "470",
      followers: "620",
      posts: [
        { text: "the family at 1207 Fernway 'verified' through the app. i looked up the address. the county has it condemned since a 2023 fire. so who booked me", when: "7d", likes: 132, reposts: 44, replies: [["zoe.k", "MADDIE do not go back there"]] },
        { text: "the one rule they gave me: never check on the children. there are no children's beds in this house. i checked (from the doorway)", when: "5d", likes: 98 },
        { text: "documenting everything to my cloud, not just the phone. my careful girl does not just leave, my mom always says. she's right", when: "4d", likes: 71 },
        { text: "back door stays unlocked when i'm there 'for the parents.' i'm keeping my shoes on all night", when: "2d", likes: 55 },
        { text: "if i go quiet, i went back inside for a reason. remember that. jacaranda.", when: "1d", likes: 40 },
      ],
    },
  },
  "case-09": {
    glimpse: {
      handle: "hal.watches",
      name: "Hal Brennan",
      bio: "45 · Maple Court 16 yrs · Neighborhood Watch · birds, trains, being useful",
      posts: 29,
      followers: "198",
      following: "301",
      grid: [
        { scene: "🚂", caption: "N-scale layout coming along. fourteen little houses, one little cul-de-sac. looks just like home", when: "4w", likes: 63, comments: [["dana_b", "you and those trains 😂"]] },
        { scene: "🔦", caption: "Neighborhood Watch tip #214 filed and logged. a safe street is a watched street", when: "3w", likes: 41 },
        { scene: "🐦", caption: "got new binoculars. 'for birds' (for birds)", when: "2w", likes: 52, comments: [["gary_next", "sure, birds 👀"]] },
        { scene: "💡", caption: "installed four motion floodlights this weekend. can't be too careful. Dana thinks i've lost it", when: "9d", likes: 38, comments: [["dana_b", "you HAVE lost it. i love you though"]] },
        { scene: "📋", caption: "somebody filed a tip about ME this week. formatted exactly like mine. that's not how this works", when: "5d", likes: 44, comments: [["gary_next", "what? who?"], ["hal.watches", "no name. just my own schedule. handed back to me"]] },
        { scene: "🌙", caption: "four people stood on my lawn at 2am and then just… left. all at once. like a shift ending", when: "2d", likes: 71 },
      ],
    },
    chatter: {
      handle: "halb_watch",
      name: "Hal",
      bio: "if you see something, file something. 214 and counting.",
      following: "260",
      followers: "180",
      posts: [
        { text: "the Watch has a members-only board i just got access to. it's not tips about crime. it's tips about US. our habits. our hours. mine's on there", when: "8d", likes: 66, reposts: 21 },
        { text: "who watches the watchers, apparently, is the other watchers. my own daily routine got filed back to me like a report", when: "6d", likes: 52 },
        { text: "deadbolts today. floodlights last week. Dana's coming home sunday, gonna vacuum first, act normal. i just don't like the lawn thing", when: "3d", likes: 38, replies: [["dana_b", "we'll talk when i'm home. lock the doors, weirdo ❤️"]] },
        { text: "my daughter says a 'watch' account started following her. she's 200 miles away. it's a local watch. explain that", when: "2d", likes: 44 },
        { text: "214 tips i filed on this street. starting to think i was building someone else's map", when: "1d", likes: 59 },
      ],
    },
  },
  "case-10": {
    glimpse: {
      handle: "farrah.rn",
      name: "Farrah Haddad",
      bio: "34 · ICU nurse · 11 years of codes · notices things, it's the job",
      posts: 36,
      followers: "512",
      following: "244",
      grid: [
        { scene: "🏔️", caption: "booked a no-signal wellness retreat. eleven years of ICU. i have earned one week of my phone off", when: "3w", likes: 188, comments: [["layla.h", "FINALLY. proud of you sis"]] },
        { scene: "🥾", caption: "broke in the hiking boots. the packing list says 'guests wear soft colors.' okay, sure, calming", when: "2w", likes: 96 },
        { scene: "🧰", caption: "the retreat said leave everything, take nothing. i'm a nurse. the first aid kit COMES. non negotiable", when: "12d", likes: 121, comments: [["layla.h", "of course it does 😌"]] },
        { scene: "🌲", caption: "day one. beautiful. quiet. everyone's very calm in a way i can't put my finger on yet", when: "6d", likes: 74 },
        { scene: "📓", caption: "old habits: even off the clock i'm charting. findings not feelings. wrote down three things about this place today", when: "4d", likes: 58, comments: [["layla.h", "what things?"], ["farrah.rn", "tell you when i'm back. call the county if i'm weird 🙂"]] },
        { scene: "🌾", caption: "there's a meadow past the fence line the staff say doesn't exist. i can see it from my cabin. cabin Willow", when: "2d", likes: 63 },
      ],
    },
    chatter: {
      handle: "farrah_h",
      name: "Farrah",
      bio: "steady. exhausted. incapable of not helping.",
      following: "210",
      followers: "480",
      posts: [
        { text: "reminder to self: memorized Layla's number on paper. phones off here 'for healing.' a nurse improvises.", when: "6d", likes: 44 },
        { text: "four previous guests 'left early, on foot.' the staff say it like a script. word for word. i've heard scripts before", when: "5d", likes: 88, reposts: 26 },
        { text: "checkout is Nov 5. if i'm not out by the 6th, Layla calls the COUNTY, not the retreat. we agreed. write it where they can't erase it", when: "4d", likes: 71, replies: [["layla.h", "county. not the retreat. i've got it, F."]] },
        { text: "asked about a guest named Tomlin, cabin Willow before me. the calm broke for exactly one second on the counselor's face. one second", when: "2d", likes: 59 },
        { text: "going north of the rhythm paths tomorrow. to the meadow that doesn't exist. charting as i go.", when: "1d", likes: 52 },
      ],
    },
  },
  "case-11": {
    glimpse: {
      handle: "marcus.b",
      name: "Marcus Bell",
      bio: "33 · husband · carrying something heavy for 20 years",
      posts: 31,
      followers: "377",
      following: "289",
      grid: [
        { scene: "💐", caption: "anniversary flowers for Elena on the 12th. eleven years. she saved my life and doesn't even know from what", when: "3w", likes: 164, comments: [["elena.bell", "sap 🥹 love you"]] },
        { scene: "🪑", caption: "camp chairs for the reunion. five of us. we don't do this. we haven't in years. but it's time", when: "2w", likes: 78 },
        { scene: "❄️", caption: "Blackwater Quarry in December. hand warmers, whiskey, and a debt twenty years old", when: "10d", likes: 55, comments: [["lonnie_k", "you sure about this marcus"], ["marcus.b", "never been more sure of anything"]] },
        { scene: "📷", caption: "found the 2005 photo. all six of us. before. i've looked at it every day this month", when: "7d", likes: 92 },
        { scene: "💬", caption: "the old group chat is somehow lively again. weird. good weird? the guys are all in for the 13th", when: "4d", likes: 41, comments: [["elena.bell", "which guys? you said they weren't answering"], ["marcus.b", "they are now. all of them"]] },
        { scene: "🌊", caption: "we owe the day. that's all i'll say. we owe it and i'm finally paying", when: "2d", likes: 67 },
      ],
    },
    chatter: {
      handle: "mbell",
      name: "marcus",
      bio: "the only one who ever wanted to go back for him",
      following: "240",
      followers: "410",
      posts: [
        { text: "the reunion chat is typing. all four of them. cheerful. making plans. except i talked to Lonnie's wife and he's been missing a week. so who's typing as Lonnie", when: "6d", likes: 108, reposts: 38 },
        { text: "one by one the guys stopped being the ones answering. same words they'd use. wrong somehow. i can't explain it to Elena", when: "5d", likes: 71 },
        { text: "the timestamps on the group chat are impossible. replies before the message. i screenshotted. it looks fine now. it wasn't", when: "3d", likes: 96, replies: [["elena.bell", "marcus you're scaring me. come home"]] },
        { text: "twenty years ago six of us went to that ice. five came back. we made a pact to never say. i'm done keeping it.", when: "2d", likes: 63 },
        { text: "going to the shore on the 13th. to finish it. i counted right this time — for him.", when: "1d", likes: 44 },
      ],
    },
  },
  "case-12": {
    glimpse: {
      handle: "sadie.walks",
      name: "Sadie Kwan",
      bio: "26 · dog walker · will absolutely risk it all for a stranger · Biscuit's assistant",
      posts: 63,
      followers: "1,102",
      following: "398",
      grid: [
        { scene: "🐕", caption: "Biscuit is technically my client but emotionally my boss. 20 min walks, 2 hour cuddle debt", when: "3w", likes: 288, comments: [["jules_k", "give biscuit a kiss from me"]] },
        { scene: "🏡", caption: "the house on Beechmont is gorgeous but Biscuit will NOT stop pawing at one wall. every single visit. same wall", when: "12d", likes: 143, comments: [["roommate_dev", "dogs know things"], ["sadie.walks", "he really does not like that wall"]] },
        { scene: "📐", caption: "pulled the county floor plan for 44 Beechmont just to satisfy my curiosity. there's an 11-foot gap the plan calls a 'chase.' behind Biscuit's wall.", when: "8d", likes: 97 },
        { scene: "🍊", caption: "don't ask about the oranges. (ten pounds of oranges. don't ask.)", when: "6d", likes: 176 },
        { scene: "🔦", caption: "borrowed my roommate's puck lights and a little pry bar. for a project. a good project. the best thing i'll ever do maybe", when: "4d", likes: 84, comments: [["jules_k", "sadie what project"], ["sadie.walks", "tell you thursday. it's big."]] },
        { scene: "🚪", caption: "there's a window on the outside of that house with no room behind it inside. i can't stop thinking about it", when: "2d", likes: 112 },
      ],
    },
    chatter: {
      handle: "sadie_k",
      name: "sadie",
      bio: "can't look away once i've seen it. let the dog take the credit",
      following: "350",
      followers: "890",
      posts: [
        { text: "20 minute walks. i'm inside that house for hours. not for the reason you think. Biscuit found something and now i can't unfind it", when: "7d", likes: 121, reposts: 33 },
        { text: "the homeowner is never home during walks. good. because i'm going back in tonight with the pry bar and Biscuit's nose", when: "4d", likes: 88, replies: [["roommate_dev", "text me when you're out. sadie. SADIE"]] },
        { text: "found the intake number for the Fullerton women's center and wrote 'for A.' in my reminders. that's all i can say right now", when: "3d", likes: 54 },
        { text: "if the app says i 'resigned' by message tomorrow morning, i did not write that. remember i said that.", when: "2d", likes: 76 },
        { text: "the best thing i've ever done. behind a wall the floor plan says is empty. going in.", when: "1d", likes: 61 },
      ],
    },
  },
  "case-13": {
    glimpse: {
      handle: "milo.super",
      name: "Milo Grieves",
      bio: "41 · building super · keeper of keys · trying to be better late",
      posts: 22,
      followers: "143",
      following: "167",
      grid: [
        { scene: "🔑", caption: "every key to five buildings on one board. sixteen years i've kept this place breathing", when: "4w", likes: 47 },
        { scene: "🎓", caption: "bought a hoodie from Marisa's school. don't know if she'll take it. don't know if she'll take the coffee either. trying anyway", when: "2w", likes: 88, comments: [["marisa.g", "…i saw this. ok. saturday."], ["milo.super", "saturday. i'll be early. i promise"]] },
        { scene: "💳", caption: "a little side income lately. 'storage consultation.' nothing i'm proud of. all of it goes one place", when: "10d", likes: 31 },
        { scene: "☕", caption: "she said yes to ONE coffee. one. i've cancelled everything so i don't ruin it. saturday can't come fast enough", when: "6d", likes: 72, comments: [["marisa.g", "don't make it weird dad 🙂"]] },
        { scene: "🧰", caption: "mom's ring is in the green toolbox, top tray, if anyone ever needs to know. it's Marisa's when the time's right", when: "4d", likes: 54 },
        { scene: "🚪", caption: "the buyer wants the master key. the one that opens everything under all five buildings. i keep telling him no. final answer.", when: "2d", likes: 38, comments: [["marisa.g", "what buyer?"]] },
      ],
    },
    chatter: {
      handle: "milog",
      name: "Milo",
      bio: "a man who shows up late. not a man who doesn't show up.",
      following: "150",
      followers: "130",
      posts: [
        { text: "sold access to the tunnels under the buildings. i know. i KNOW. every dollar went to her college fund. doesn't make it clean. does make it mine to fix", when: "8d", likes: 44, reposts: 12 },
        { text: "the buyer pays odd amounts, memo says 'storage consultation.' patient guy. too patient. asks for the master key every time. the answer stays no", when: "6d", likes: 51 },
        { text: "cancelled the buyer's Thursday. cancelled everything. coffee with my daughter saturday is the only appointment that matters now", when: "3d", likes: 66, replies: [["marisa.g", "be early. that's all i ask."]] },
        { text: "seventh payment cleared tonight, 11:03pm. i didn't cash it. i didn't give him the key either. writing that down", when: "2d", likes: 39 },
        { text: "if i miss saturday, i did not run. men don't run on money they already gave away. check the junction.", when: "1d", likes: 47 },
      ],
    },
  },
  "case-14": {
    glimpse: {
      handle: "wade.chases",
      name: "Wade Kessler",
      bio: "37 · HVAC by day · storm chaser by weekend · instruments over instincts",
      posts: 49,
      followers: "678",
      following: "301",
      grid: [
        { scene: "⛈️", caption: "there's a supercell on my app parked over Halloran's field. hasn't moved in three weeks. storms don't do that. reported it to the NWS today", when: "3w", likes: 143, comments: [["bobbi_chase", "sent them my readings too. nobody's biting"]] },
        { scene: "📡", caption: "the radar source for this phantom storm traces to a station decommissioned in 1988. let me say that again. 1988.", when: "2w", likes: 96 },
        { scene: "🧒", caption: "Leo's science fair is the 26th. i WILL be the loud dad. earplugs for everyone else", when: "12d", likes: 187, comments: [["ex_kessler", "he's counting on it. don't be late wade"]] },
        { scene: "🌡️", caption: "second Kestrel meter. the first one read 940mb of pressure in dead calm air. that's a number that shouldn't exist next to 'dead calm'", when: "8d", likes: 71 },
        { scene: "📷", caption: "trail cam on Halloran's fence line, no-glow IR. if something's out there i'll have it on card. deer will never know. neither will whatever else", when: "5d", likes: 63 },
        { scene: "🌾", caption: "the field's been quiet for 38 years. i looked up why. i wish i hadn't. driving out to measure it properly this weekend", when: "2d", likes: 58, comments: [["bobbi_chase", "wade. take me with you. do NOT go alone"]] },
      ],
    },
    chatter: {
      handle: "wadek_wx",
      name: "Wade",
      bio: "trust the data. the data is scared.",
      following: "280",
      followers: "590",
      posts: [
        { text: "no weather service on earth recorded a storm within 400 miles today. my app shows an F-scale monster over one field. same field. always the same field", when: "9d", likes: 112, reposts: 41 },
        { text: "1987: an F4 tracked into Halloran's field and three storm spotters were never found. i have the newspaper. i have the coordinates. they match mine", when: "6d", likes: 134 },
        { text: "i reported the anomaly correctly. logged it, sourced it, sent it up the chain. i did everything right. the sky is the only thing not listening", when: "4d", likes: 78, replies: [["bobbi_chase", "you warned US. that has to count for something"]] },
        { text: "how far is a safe distance from a tornado that doesn't move? asking because i genuinely need the number by saturday", when: "3d", likes: 66 },
        { text: "driving out at first light. anemometer's coming. if the air's dead calm and the cups still spin, i'll have it on video. that's the whole point.", when: "1d", likes: 52 },
      ],
    },
  },
  "case-15": {
    glimpse: {
      handle: "pris.proves",
      name: "Pris Navarro",
      bio: "27 · math PhD · topology enthusiast (you were warned) · carrel 14 resident",
      posts: 27,
      followers: "302",
      following: "141",
      grid: [
        { scene: "♾️", caption: "carrel 14, noise-cancelling headphones, one ceramic mug. this is the whole personality now. the proof is SO close", when: "3w", likes: 88, comments: [["mama_navarro", "eat something mija"]] },
        { scene: "📐", caption: "Marchetti & Related Problems, used, ex-library. someone underlined the exact lemma i needed. thanks, stranger from 1994", when: "2w", likes: 64 },
        { scene: "☕", caption: "the 1am coffee is a food group. the TA hour is wednesday. wednesdays exist. i must remember wednesdays exist", when: "10d", likes: 72 },
        { scene: "💻", caption: "my study group meets by video every tuesday night. brilliant people. i've never met anyone who gets it like they do", when: "7d", likes: 41, comments: [["mama_navarro", "which group? from the department?"], ["pris.proves", "no… i actually don't know where they found me. they just started showing up"]] },
        { scene: "📞", caption: "tried to call one of them back on a normal line. carrier says the number was 'never issued.' huh. anyway the math is beautiful", when: "4d", likes: 55 },
        { scene: "📄", caption: "the proof is DONE. field-defining, i think. presenting it tuesday night. to the only people who'll truly understand", when: "2d", likes: 78, comments: [["advisor_grasz", "Pris — see me before Tuesday. Please."]] },
      ],
    },
    chatter: {
      handle: "p_navarro",
      name: "pris",
      bio: "rigorous. lonely. cite your sources (i cite mine in four languages)",
      following: "120",
      followers: "260",
      posts: [
        { text: "my Tuesday study group's phone numbers were all disconnected decades ago. or, per the carrier, never issued at all. i documented every call like a scientist", when: "8d", likes: 92, reposts: 27 },
        { text: "eleven weeks of the best mathematical conversations of my life, with people whose numbers don't exist. i keep the recordings. i am not imagining them", when: "5d", likes: 71 },
        { text: "the department thinks i invented my colleagues. my advisor scheduled nothing on tuesday nights for FORTY YEARS and won't tell me why. that's data too", when: "4d", likes: 108, replies: [["mama_navarro", "come home this weekend. check your basement, they always say. please mija"]] },
        { text: "'colleague' means something specific. i know exactly who i've been talking to at 11:30 on Tuesdays. the ones who wanted to hear the math", when: "2d", likes: 63 },
        { text: "presenting the proof Tuesday night. to them. wish me luck. or don't — luck isn't rigorous.", when: "1d", likes: 47 },
      ],
    },
  },
};

export function socialFor(caseId: string): SocialData | undefined {
  return SOCIAL[caseId];
}
