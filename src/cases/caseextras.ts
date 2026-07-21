/**
 * Per-case "life data" that fills the flavor apps with each victim's real
 * texture — a shopping history that quietly echoes their state of mind, a
 * personal to-do list, and (for a few cases) a dating app whose contents add
 * a unique twist or red herring. None of this is required to solve a case,
 * but it deepens the person and rewards players who dig through everything.
 */

export interface ShopOrder {
  item: string;
  detail: string;
  date: string;
  price: string;
  status?: string;
}

export interface DatingThreadMsg {
  from: "them" | "me";
  text: string;
}

export interface DatingMatch {
  name: string;
  age: number;
  tag?: string;
  thread?: DatingThreadMsg[];
}

export interface DatingData {
  app: string;
  handle: string;
  age: number;
  bio: string;
  lastActive: string;
  matches: DatingMatch[];
  footer?: string;
}

export interface CaseExtras {
  shopping: ShopOrder[];
  reminders?: Array<[string, boolean]>;
  dating?: DatingData;
}

const EXTRAS: Record<string, CaseExtras> = {
  "case-01": {
    shopping: [
      { item: "Blackout curtains, 2 panels", detail: "renter-friendly, no drill", date: "Sep 29", price: "$34.00", status: "Delivered" },
      { item: "Shelf brackets (set of 6)", detail: "matte black", date: "Oct 1", price: "$18.50", status: "Delivered" },
      { item: "Door draft stopper wedge ×2", detail: "under-door seal", date: "Oct 8", price: "$12.99", status: "Delivered" },
      { item: "Foam earplugs, 60 pair", detail: "32dB, for sleeping", date: "Oct 8", price: "$9.40", status: "Delivered" },
      { item: "AAA batteries, 24-pack", detail: "", date: "Oct 12", price: "$11.20", status: "Delivered" },
      { item: "Portable door lock, travel", detail: "'add-a-lock', no install", date: "Oct 14", price: "$21.00", status: "Delivered" },
      { item: "White noise machine", detail: "10 sounds, timer", date: "Oct 15", price: "$29.99", status: "Out for delivery" },
    ],
    reminders: [
      ["Buy more door wedges", false],
      ["Call the landlord about 3A (again)", false],
      ["Water the plant (Gerald)", true],
      ["Ask Reyna to sleep over this wk", false],
      ["Don't google it at 3am", false],
    ],
  },
  "case-02": {
    shopping: [
      { item: "Dash cam, front + rear", detail: "1440p, night vision", date: "Oct 20", price: "$89.99", status: "Delivered" },
      { item: "Pepper spray, keychain", detail: "legal in-state", date: "Oct 23", price: "$14.00", status: "Delivered" },
      { item: "Personal alarm, 130dB ×2", detail: "for me + Priti", date: "Nov 1", price: "$17.50", status: "Delivered" },
      { item: "microSD card, 256GB", detail: "dash cam keeps 'losing' footage", date: "Nov 2", price: "$24.00", status: "Delivered" },
      { item: "Travel thermos, 40oz", detail: "café de olla capacity", date: "Oct 25", price: "$28.00", status: "Delivered" },
      { item: "Phone mount, vent clip", detail: "", date: "Oct 19", price: "$12.99", status: "Delivered" },
    ],
    reminders: [
      ["Oil change (overdue)", false],
      ["Sam's kid bday — the DINOSAUR one", false],
      ["Report the gray sedan to police (not app)", false],
      ["Get front plate next time", false],
      ["Sunday soup @ mom's", true],
    ],
    dating: {
      app: "Spark",
      handle: "mara_q",
      age: 31,
      bio: "night owl. i drive, you talk. dog people to the front.",
      lastActive: "active 2 weeks ago",
      matches: [
        {
          name: "Marcus O.",
          age: 36,
          tag: "You unmatched — he has viewed your profile 14 times since",
          thread: [
            { from: "them", text: "you're a driver? that's perfect. what nights are you out? i'll find you 😊" },
            { from: "me", text: "ha, i don't really share my schedule" },
            { from: "them", text: "why not. i just want to know where you'll be. that's not a lot to ask." },
            { from: "me", text: "ok this is a no from me. take care" },
            { from: "them", text: "you'll change your mind. i'm very patient." },
          ],
        },
        { name: "Dev", age: 33, tag: "matched, never messaged" },
        { name: "Priya", age: 29, tag: "it's the depot Priti lol — 'we should NOT have swiped'" },
      ],
      footer: "One conversation stands out. She unmatched him on Nov 2 — the same day the off-app texts began.",
    },
  },
  "case-03": {
    shopping: [
      { item: "Rose fertilizer, granular", detail: "Walt's roses", date: "Jun 2", price: "$16.00", status: "Delivered" },
      { item: "Cooking for One (cookbook)", detail: "", date: "Feb 20", price: "$22.00", status: "Delivered" },
      { item: "Memorial candle, unscented", detail: "", date: "Feb 8", price: "$9.00", status: "Delivered" },
      { item: "Grief: A Year of Mornings", detail: "the podcast's book", date: "Mar 3", price: "$18.00", status: "Delivered" },
      { item: "Photo frames, 4×6, set of 8", detail: "", date: "May 25", price: "$24.00", status: "Delivered" },
      { item: "Lavender sleep tea", detail: "", date: "Oct 10", price: "$11.50", status: "Delivered" },
      { item: "Comfortable walking shoes", detail: "'good for a long walk'", date: "Oct 28", price: "$68.00", status: "Delivered" },
    ],
    reminders: [
      ["Set Walt's place at dinner? (stop)", false],
      ["Circle homework — 'empty hands'", false],
      ["Call Claire back — Sunday", false],
      ["Water the windowsill herbs", true],
      ["Ask Maren what the Walk really is", false],
    ],
  },
  "case-04": {
    shopping: [
      { item: "Non-slip work shoes", detail: "for the graveyard shift", date: "Sep 5", price: "$54.00", status: "Delivered" },
      { item: "GRE prep book (vet school)", detail: "", date: "Oct 1", price: "$42.00", status: "Delivered" },
      { item: "Blue-light glasses", detail: "4am screens", date: "Oct 12", price: "$19.00", status: "Delivered" },
      { item: "Pill organizer, weekly", detail: "for gran", date: "Oct 20", price: "$8.50", status: "Delivered" },
      { item: "Instant camera film ×3", detail: "'his photos never come out'", date: "Nov 3", price: "$45.00", status: "Delivered" },
      { item: "Rye bread flour, 4 bags", detail: "we keep running out", date: "Nov 6", price: "$22.00", status: "Delivered" },
    ],
    reminders: [
      ["Count his visits (till tape)", true],
      ["Ask Sal how long he's been coming", false],
      ["Sunday — gran tells the story. bring Theo", false],
      ["Don't count out loud", false],
      ["Car insurance $210 by the 20th", false],
    ],
  },
  "case-05": {
    shopping: [
      { item: "Dinosaur plush, T-Rex", detail: "for Mateo", date: "Oct 30", price: "$21.00", status: "Delivered" },
      { item: "Tooth fairy pillow", detail: "tooth #3 incoming", date: "Nov 8", price: "$12.00", status: "Delivered" },
      { item: "Steel-toe boots, size 11", detail: "", date: "Oct 15", price: "$74.00", status: "Delivered" },
      { item: "Voice recorder, pocket", detail: "'document EVERYTHING'", date: "Nov 12", price: "$34.00", status: "Delivered" },
      { item: "Work gloves, cut-resistant ×3", detail: "", date: "Nov 2", price: "$18.00", status: "Delivered" },
      { item: "Café de olla cones, bulk", detail: "Luz's recipe", date: "Nov 6", price: "$14.00", status: "Delivered" },
    ],
    reminders: [
      ["Print grievance file ×3 for Denise", false],
      ["Fix the gutter BEFORE snow", false],
      ["Home by 7 — tooth #3", true],
      ["Ask Marcus about the badge board", false],
      ["Hearing Nov 20, 10am, Denise's office", false],
    ],
  },
  "case-06": {
    shopping: [
      { item: "Duffel bag, gray, 45L", detail: "", date: "Nov 16", price: "$39.00", status: "Delivered" },
      { item: "Prepaid phone, basic", detail: "", date: "Nov 16", price: "$29.00", status: "Delivered" },
      { item: "Energy drinks, 24-pack", detail: "the study wrecks your days", date: "Nov 11", price: "$32.00", status: "Delivered" },
      { item: "SOLD: road bike", detail: "to Dmitri", date: "Nov 15", price: "+$240.00", status: "Sold" },
      { item: "SOLD: 27\" monitor", detail: "", date: "Nov 16", price: "+$110.00", status: "Sold" },
      { item: "SOLD: game console", detail: "'everything must go'", date: "Nov 16", price: "+$180.00", status: "Sold" },
    ],
    reminders: [
      ["After night 10 — square EVERYTHING", true],
      ["Use Mari's address? (ask her)", false],
      ["Bus: route 88 north, seat 14", false],
      ["Bio 340 final Dec 9 (won't matter)", false],
      ["Don't tell Josh yet", false],
    ],
    dating: {
      app: "Kindl",
      handle: "casey.b",
      age: 20,
      bio: "bio major, professionally tired. ask me about the fujita scale (don't).",
      lastActive: "active — today, 3:41 AM",
      matches: [
        {
          name: "Ari",
          age: 21,
          tag: "she messaged twice, you left her on read",
          thread: [
            { from: "them", text: "you free this weekend??" },
            { from: "them", text: "helloo did the sleep study eat you lol" },
          ],
        },
        { name: "Jordan", age: 22, tag: "matched Nov 2, no messages" },
        { name: "Sam", age: 20, tag: "'you ghosted me' — last seen: you, online at 4am" },
      ],
      footer: "He's online at 3–4 AM every night — but never actually dating. Whatever he was doing on his phone at those hours, it wasn't this.",
    },
  },
  "case-07": {
    shopping: [
      { item: "Engagement ring box, velvet", detail: "", date: "Dec 3", price: "$14.00", status: "Delivered" },
      { item: "GPS mount, magnetic", detail: "", date: "Nov 20", price: "$16.00", status: "Delivered" },
      { item: "Work boots, waterproof", detail: "", date: "Nov 18", price: "$68.00", status: "Delivered" },
      { item: "Thank-you cards, box of 20", detail: "for the depot crew", date: "Nov 25", price: "$9.00", status: "Delivered" },
      { item: "Energy gummies, night driver", detail: "", date: "Nov 24", price: "$22.00", status: "Delivered" },
      { item: "Baby name book (hidden gift?)", detail: "gift wrap added", date: "Nov 28", price: "$15.00", status: "Delivered" },
    ],
    reminders: [
      ["Ring shopping w/ Theo — Saturday", false],
      ["Two weeks notice AFTER the ring", false],
      ["Figure out what's in the boxes", true],
      ["Call Theo before the shift TODAY", false],
      ["Mama's roast — save the end piece", true],
    ],
    dating: {
      app: "Spark",
      handle: "dre_b",
      age: 29,
      bio: "night courier. i know every good taco truck after 2am. loyal to a fault.",
      lastActive: "profile hidden",
      matches: [
        {
          name: "Nadia",
          age: 28,
          tag: "you ended it yourself",
          thread: [
            { from: "them", text: "so are we ever gonna get that drink 😏" },
            { from: "me", text: "hey — i gotta be straight with you. i actually just got engaged." },
            { from: "me", text: "she's the one. i'm taking this down tonight. you seem great though, for real." },
            { from: "them", text: "…okay wow. respect. she's lucky. bye Dre 💍" },
          ],
        },
      ],
      footer: "It looks damning until you read it: he wasn't cheating — he closed the account the night he decided on the ring. A motive that evaporates the moment you actually look.",
    },
  },
  "case-08": {
    shopping: [
      { item: "Babysitting first-aid kit", detail: "", date: "Oct 20", price: "$24.00", status: "Delivered" },
      { item: "AP Bio prep book", detail: "", date: "Nov 1", price: "$28.00", status: "Delivered" },
      { item: "Personal alarm keychain", detail: "'sitter safety'", date: "Nov 24", price: "$12.00", status: "Delivered" },
      { item: "Portable charger, 20000mAh", detail: "long nights", date: "Nov 10", price: "$26.00", status: "Delivered" },
      { item: "Fairy lights, warm white", detail: "for my room", date: "Oct 15", price: "$14.00", status: "Delivered" },
      { item: "Boba shop gift card ×2", detail: "", date: "Nov 8", price: "$30.00", status: "Delivered" },
    ],
    reminders: [
      ["Check the county condemned list link", true],
      ["Do NOT go upstairs at the Wexlers'", false],
      ["Crossroads shelter — hours for minors", true],
      ["Route 9 last bus, Saturday", true],
      ["Text Zoe the code word: jacaranda", false],
    ],
  },
  "case-09": {
    shopping: [
      { item: "Motion floodlights ×4", detail: "", date: "Dec 5", price: "$96.00", status: "Delivered" },
      { item: "Deadbolt locks ×2", detail: "", date: "Dec 5", price: "$58.00", status: "Delivered" },
      { item: "Door security bar", detail: "left at register — held", date: "Dec 5", price: "$22.00", status: "Ready for pickup" },
      { item: "Binoculars, 10×42", detail: "'for birds'", date: "Oct 5", price: "$64.00", status: "Delivered" },
      { item: "Model train scenery, N-scale", detail: "14 little houses", date: "Oct 1", price: "$41.00", status: "Delivered" },
      { item: "Trail camera (cancelled)", detail: "order cancelled by seller", date: "Dec 6", price: "$0.00", status: "Cancelled" },
    ],
    reminders: [
      ["Fix gutter clip (north side)", false],
      ["Flowers Thursday — the yellow ones", false],
      ["Return Gary's ladder (actually, keep it)", false],
      ["Who filed on the Meltons? CHECK", true],
      ["Dana home Sunday — vacuum first", false],
    ],
  },
  "case-10": {
    shopping: [
      { item: "Hiking boots, broken-in", detail: "for the retreat", date: "Oct 20", price: "$110.00", status: "Delivered" },
      { item: "Oatmeal cardigan (soft colors)", detail: "'guests wear soft colors'", date: "Oct 22", price: "$48.00", status: "Delivered" },
      { item: "Travel first-aid kit, compact", detail: "the kit comes. non-negotiable.", date: "Oct 23", price: "$21.00", status: "Delivered" },
      { item: "Melatonin, 60ct", detail: "", date: "Oct 10", price: "$9.00", status: "Delivered" },
      { item: "The Digital Detox (book)", detail: "", date: "Oct 14", price: "$16.00", status: "Delivered" },
      { item: "Field notebook, waterproof", detail: "", date: "Oct 24", price: "$12.00", status: "Delivered" },
    ],
    reminders: [
      ["Memorize Layla's number (paper)", true],
      ["Checkout+1 = Nov 6 — she calls the COUNTY", true],
      ["Return-to-work paperwork Nov 10", false],
      ["Ask about Tomlin — cabin Willow", false],
      ["Go north of the rhythm paths", false],
    ],
  },
  "case-11": {
    shopping: [
      { item: "Ice cleats, slip-on", detail: "", date: "Dec 6", price: "$24.00", status: "Delivered" },
      { item: "Anniversary flowers", detail: "for Elena, the 12th", date: "Dec 10", price: "$45.00", status: "Delivered" },
      { item: "Camp chairs, folding ×5", detail: "for the reunion", date: "Nov 26", price: "$80.00", status: "Delivered" },
      { item: "Hand warmers, 40-pack", detail: "quarry in December", date: "Dec 1", price: "$28.00", status: "Delivered" },
      { item: "Whiskey, mid-shelf", detail: "'we owe the day'", date: "Dec 5", price: "$34.00", status: "Delivered" },
      { item: "Bluetooth speaker, waterproof", detail: "", date: "Nov 30", price: "$40.00", status: "Delivered" },
    ],
    reminders: [
      ["Reunion Dec 13, 7pm, Blackwater", true],
      ["Bring the 2005 photo", false],
      ["Anniversary dinner w/ Elena — the 12th", true],
      ["Call Lonnie back", false],
      ["Say the words. you know the ones.", false],
    ],
    dating: {
      app: "Ember",
      handle: "mbell",
      age: 33,
      bio: "married, it's complicated, don't @ me. old friends only.",
      lastActive: "active 3 days ago",
      matches: [
        {
          name: "Jess",
          age: 31,
          tag: "active thread — flirty",
          thread: [
            { from: "them", text: "you never texted back about thursday 😏" },
            { from: "me", text: "i know, i know. things at home are… a lot right now" },
            { from: "them", text: "you always say that. one drink. you pick where." },
            { from: "me", text: "let me get through the 13th. there's this reunion thing i can't explain." },
            { from: "them", text: "you and your secrets, marcus bell" },
          ],
        },
      ],
      footer: "An affair his wife would kill to not know about — the kind of clean, human motive that points investigators at Elena. Whether it means anything is left for you to weigh.",
    },
  },
  "case-12": {
    shopping: [
      { item: "Stud finder, deep-scan", detail: "", date: "Dec 3", price: "$34.00", status: "Delivered" },
      { item: "Pry bar, small (12\")", detail: "", date: "Dec 4", price: "$16.00", status: "Delivered" },
      { item: "LED puck lights, 3-pack", detail: "", date: "Dec 4", price: "$18.00", status: "Delivered" },
      { item: "No-squeak door hinges ×2", detail: "'for a very old door'", date: "Dec 6", price: "$22.00", status: "Delivered" },
      { item: "Oranges, 5lb bag ×2", detail: "don't ask", date: "Dec 5", price: "$14.00", status: "Delivered" },
      { item: "Dog treats, bulk (Biscuit)", detail: "", date: "Nov 20", price: "$26.00", status: "Delivered" },
    ],
    reminders: [
      ["Pull 44 Beechmont floor plan (county)", true],
      ["Oranges 🍊 — Wednesday", true],
      ["Rotary lunch = 12–2. walk = 3.", false],
      ["Fullerton women's center — intake for A.", false],
      ["Jules bday — the tiny desserts place", false],
    ],
  },
  "case-13": {
    shopping: [
      { item: "Heavy-duty thermos, 64oz", detail: "the good coffee", date: "Dec 10", price: "$32.00", status: "Delivered" },
      { item: "Work gloves, insulated ×2", detail: "", date: "Dec 8", price: "$24.00", status: "Delivered" },
      { item: "College hoodie (M's school)", detail: "gift wrap — for Marisa", date: "Dec 22", price: "$48.00", status: "Delivered" },
      { item: "Blank greeting card", detail: "'the only sentence i know'", date: "Dec 23", price: "$5.00", status: "Delivered" },
      { item: "Padlock, weatherproof ×3", detail: "", date: "Nov 20", price: "$27.00", status: "Delivered" },
      { item: "Restricted keyway blank (cancelled)", detail: "'don't cut for anyone'", date: "Dec 22", price: "$0.00", status: "Cancelled by you" },
    ],
    reminders: [
      ["Coffee w/ Marisa — Saturday. BE EARLY.", false],
      ["Thursday: junction. one turn. done.", true],
      ["Mom's ring → green toolbox, top tray", false],
      ["Two weeks notice (after the ring's on)", false],
      ["Don't sell the master. final answer.", false],
    ],
  },
  "case-14": {
    shopping: [
      { item: "Trail camera, no-glow IR", detail: "'deer will never know'", date: "Nov 5", price: "$120.00", status: "Delivered" },
      { item: "microSD cards ×2, 128GB", detail: "", date: "Nov 5", price: "$36.00", status: "Delivered" },
      { item: "Kestrel weather meter ×2", detail: "second one after 940mb", date: "Jun 1", price: "$210.00", status: "Delivered" },
      { item: "Hail guards, magnetic", detail: "for the rig", date: "May 12", price: "$60.00", status: "Delivered" },
      { item: "Kids' weather science kit", detail: "for Leo", date: "May 20", price: "$28.00", status: "Delivered" },
      { item: "Road snacks, variety box", detail: "", date: "Jun 6", price: "$22.00", status: "Delivered" },
    ],
    reminders: [
      ["Everything → NWS + state climatologist", false],
      ["Leo's science fair Jun 26 — BE LOUD DAD", true],
      ["SD card #2 on the fence line tonight", true],
      ["How far is safe from a stationary tornado?", false],
      ["Blue-sky drive w/ Leo (someday tour)", false],
    ],
  },
  "case-15": {
    shopping: [
      { item: "Noise-cancelling headphones", detail: "carrel 14 survival", date: "Jan 20", price: "$180.00", status: "Delivered" },
      { item: "Dry-erase markers, 12-pack", detail: "", date: "Feb 2", price: "$14.00", status: "Delivered" },
      { item: "Instant coffee, bulk jar", detail: "the 1am coffee", date: "Feb 11", price: "$18.00", status: "Delivered" },
      { item: "Desk lamp, warm LED", detail: "", date: "Jan 25", price: "$34.00", status: "Delivered" },
      { item: "Marchetti & Related Problems (text)", detail: "used, ex-library", date: "Dec 1", price: "$62.00", status: "Delivered" },
      { item: "Single ceramic mug", detail: "just the one", date: "Jan 30", price: "$12.00", status: "Delivered" },
    ],
    reminders: [
      ["Submit proof — SOLE author — arXiv", true],
      ["TA hour is WEDNESDAY (wednesdays exist)", false],
      ["Grasz meeting Thursday — before then, DECLINE", false],
      ["Eat before TA hour", false],
      ["Present the result. B-1. Tuesday.", false],
    ],
    dating: {
      app: "Kindl",
      handle: "p.navarro",
      age: 27,
      bio: "phd, mathematics. i will talk your ear off about topology. warned you.",
      lastActive: "active 3 weeks ago",
      matches: [
        {
          name: "Theo",
          age: 29,
          tag: "fizzled",
          thread: [
            { from: "them", text: "so what do you actually do for fun?" },
            { from: "me", text: "ok don't laugh — do you like topology? like even a little?" },
            { from: "them", text: "…i don't know what that is haha" },
            { from: "me", text: "that's fair. that's completely fair." },
          ],
        },
        { name: "Anya", age: 26, tag: "'you're clearly busy, no worries' — 6 weeks ago" },
        { name: "Sam", age: 30, tag: "matched, one message, nothing" },
      ],
      footer: "Every conversation dies the same way — she reaches for the one thing she loves and no one reaches back. It makes what finally DID want to talk math with her, at 11:30 on Tuesdays, land very differently.",
    },
  },
  "case-16": {
    shopping: [
      { item: "Reel-to-reel tape, 1/4in ×6", detail: "'to copy the WVRN archive'", date: "Nov 1", price: "$54.00", status: "Delivered" },
      { item: "Blue-light glasses (3 AM screens)", detail: "", date: "Oct 20", price: "$19.00", status: "Delivered" },
      { item: "Call recorder, inline phone tap", detail: "'legal, one-party consent state'", date: "Nov 3", price: "$38.00", status: "Delivered" },
      { item: "Thermos, 40oz (studio coffee)", detail: "", date: "Oct 18", price: "$26.00", status: "Delivered" },
      { item: "Book: 'Lost Voices of AM Radio'", detail: "chapter on WVRN 1979", date: "Nov 5", price: "$22.00", status: "Delivered" },
      { item: "Plane ticket — somewhere sunny", detail: "departs Nov 20", date: "Nov 8", price: "$214.00", status: "Confirmed" },
    ],
    reminders: [
      ["Pull the transmitter power logs (Gil)", false],
      ["Do NOT play Harbor Lights. ever.", true],
      ["Trap-and-trace ready before 3:11", false],
      ["Tell Renée the password is the hour", true],
      ["ACTUAL vacation. sun. Nov 20.", false],
    ],
  },
  "case-17": {
    shopping: [
      { item: "Forensic accounting field guide", detail: "'benefits fraud, payee schemes'", date: "Sep 12", price: "$44.00", status: "Delivered" },
      { item: "Certified mail supplies, bulk", detail: "return receipts", date: "Sep 17", price: "$18.00", status: "Delivered" },
      { item: "LED headlamp (service stairs)", detail: "", date: "Sep 15", price: "$21.00", status: "Delivered" },
      { item: "Portable document scanner", detail: "'scan the register before he notices'", date: "Sep 14", price: "$66.00", status: "Delivered" },
      { item: "Pepper spray, keychain", detail: "night shift", date: "Sep 10", price: "$14.00", status: "Delivered" },
      { item: "Instant coffee, jar (the 3am jar)", detail: "", date: "Sep 8", price: "$12.00", status: "Delivered" },
    ],
    reminders: [
      ["MAIL folios certified — before shift", true],
      ["Cross-check 11 permanent guests vs records", true],
      ["Ask Reggie what's really in 813", true],
      ["Do NOT print the pages Adler flagged", false],
      ["Brunch w/ Ravi Sunday — BE ALIVE for it", false],
    ],
  },
};

export function extrasFor(caseId: string): CaseExtras | undefined {
  return EXTRAS[caseId];
}
