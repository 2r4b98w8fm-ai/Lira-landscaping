/**
 * Case briefings — the investigator dossier shown as a click-through when a
 * phone is opened. Sets up the person, the official ruling, why the case was
 * reopened, what the family believes, who they were, and the player's job.
 *
 * These establish the mystery WITHOUT revealing the canonical answer.
 */

export interface Briefing {
  /** e.g. "Officially ruled: voluntary departure". */
  ruling: string;
  /** Short, tappable cards. Keep each to a sentence or two. */
  cards: Array<{ label: string; text: string }>;
  /** The player's objective, stated plainly. */
  objective: string;
  /** 2–4 words that should echo through their messages/photos. */
  personaTags: string[];
}

export const BRIEFINGS: Record<string, Briefing> = {
  "case-01": {
    ruling: "Officially ruled: left of her own accord",
    cards: [
      { label: "The disappearance", text: "Wren Castellan, 26, vanished three weeks after moving into Unit 4B — a walk-up above a flower shop that never reopened. Her phone was found on the kitchen counter, fully charged. The door was locked and chained from the inside." },
      { label: "The official ruling", text: "Because nothing was taken and there was no sign of a struggle, the case was closed as a voluntary departure. A young woman who moved to a new city and moved on again. File shelved." },
      { label: "Why we reopened it", text: "People who leave take their phone, their keys, their coat. Wren left all three. And in the weeks before, she was documenting something — noises, a neighbor nobody's met, a light left on that she never touched." },
      { label: "What her family says", text: "Her mother's texts go from cheerful to frantic in a single week and are never answered. She insists Wren would never vanish without a word — 'she calls me every Sunday, she has since college.'" },
      { label: "Who she was", text: "Careful. Observant. A little anxious, a lot funny — she names her houseplants and jokes to keep the fear down. She wrote everything down, which is the only reason you have anything to read at all." },
    ],
    objective: "Work through her phone. Figure out what was really happening in that building — and decide who, or what, is responsible.",
    personaTags: ["observant", "wry", "anxious", "documents everything"],
  },
  "case-02": {
    ruling: "Officially ruled: voluntary departure",
    cards: [
      { label: "The disappearance", text: "Mara Quist, 31, a night-shift rideshare driver, vanished between a pickup and a drop-off. Her car was found idling at a dead end, hazards on, door open, wallet and keys inside." },
      { label: "The official ruling", text: "A debit card used two hundred miles south and a GPS ping heading west got the case filed as a woman who drove out of her own life. Burnout, the report says. People break." },
      { label: "Why we reopened it", text: "Her last fare was cancelled before pickup — yet her car drove to the pickup point anyway. The rider's account only ever booked her, and knew a route change she told no one about." },
      { label: "What her family says", text: "Her brother and mother don't buy 'she ran.' She was two months from paying off her car, she'd bought her nephew's birthday present, and she never missed Sunday soup. 'She was almost free,' her brother says." },
      { label: "Who she was", text: "Sharp, stubborn, careful to a fault — she logged everything, parked nose-out, kept the doors locked between fares. A planner building a life one night shift at a time." },
    ],
    objective: "Reconstruct her last shifts. Find out who was really requesting her — and where she actually went.",
    personaTags: ["stubborn", "careful", "saving up", "night owl"],
  },
  "case-03": {
    ruling: "Officially ruled: no crime — voluntary",
    cards: [
      { label: "The disappearance", text: "Edith Marsh, 58, widowed in January, vanished the week of her wedding anniversary. A packed suitcase stood by the door; the porch lantern was still lit; the house keys sat in an envelope marked 'for the next family.'" },
      { label: "The official ruling", text: "She'd signed away $118,000 and left a note. On paper: a grieving woman who gave everything away and walked. No crime. Adults are allowed to disappear." },
      { label: "Why we reopened it", text: "The money went to a 'trust' that traces to a mail slot. She joined an online grief group in February — and at least two other members were reported missing by relatives, each about a year after joining." },
      { label: "What her family says", text: "Her daughter Claire refuses the ruling flatly. 'She would never leave without saying goodbye to me — not really goodbye.' She believes the group did something to her mother." },
      { label: "Who she was", text: "Warm, faithful, lonely in the specific way of the recently widowed. A baker, a gardener, a woman who set her husband's place at the table for months. Kind enough to be a target." },
    ],
    objective: "Trace her year inside the grief group. Decide what really happened on the morning of her 'walk.'",
    personaTags: ["grieving", "warm", "faithful", "lonely"],
  },
  "case-04": {
    ruling: "Officially ruled: walked off the job",
    cards: [
      { label: "The disappearance", text: "June Pell, 24, overnight waitress at her family's diner, vanished mid-shift between 4:07 and 4:11 AM. The coffee in booth 4 was still warm. Her order pad sat on the table with an order in a customer's hand — but no customer." },
      { label: "The official ruling", text: "A tired young woman who walked out of a graveyard shift. The camera over booth 4 shows the seat compressed, steam moving — and no one sitting there. The vendor calls it 'a compression artifact.'" },
      { label: "Why we reopened it", text: "That same 'artifact' appears on 214 previous nights. And June had been counting: a regular who came every night, same booth, same order, exact change — $4.44 — for longer than should be possible." },
      { label: "What her family says", text: "Her gran, who ran the diner for forty years, went pale when asked about the regular and said only, 'Sunday. I'll tell you Sunday.' June vanished on a Wednesday." },
      { label: "Who she was", text: "Bright, dogged, a little haunted. A future vet working nights to clear her gran's medical bills. The kind of person who'd rather solve the scary thing than run from it." },
    ],
    objective: "Piece together the regular and the family's silence. Work out what June served at booth 4 that night.",
    personaTags: ["dogged", "warm", "curious", "family-bound"],
  },
  "case-05": {
    ruling: "Officially ruled: quit without notice",
    cards: [
      { label: "The disappearance", text: "Omar Reyes-Vance, 34, a forklift operator on the graveyard shift, vanished inside his own workplace. His badge shows him clocking out at 6:02 AM. His truck never left the lot. Neither did he." },
      { label: "The official ruling", text: "The company logged him as a voluntary separation and moved on. Payroll says the shift he vanished from was eliminated months earlier. As far as the paperwork is concerned, he was never even there." },
      { label: "Why we reopened it", text: "His badge kept clocking into that 'eliminated' shift 41 times. His wife stood at the gate looking at his parked truck while security told her his whereabouts weren't a facility matter." },
      { label: "What his family says", text: "His wife Luz is certain: he was documenting something and he was scared, but he'd never walk out on her and their son. 'He doesn't miss teeth,' she says — he never missed the small things." },
      { label: "Who he was", text: "A family man, a union documenter, dry-humored and dogged. Four arms in his son's drawing because that's how much work he did. The kind who keeps records precisely because no one else will." },
    ],
    objective: "Follow the grievance he was building. Find out what the night shift really was — and what it did with him.",
    personaTags: ["family man", "dogged", "documents everything", "tired"],
  },
  "case-06": {
    ruling: "Officially ruled: missing — foul play suspected",
    cards: [
      { label: "The disappearance", text: "Casey Brandt, 20, a broke college junior, enrolled in a cash-paid overnight sleep study. His phone logged ten nights inside the research annex. On the eleventh, the phone stayed. Casey didn't." },
      { label: "The official ruling", text: "The university says the annex has been empty since 2021 and no such study exists. The phone was found on a shelf beside seven others, none claimed. Investigators leaned toward foul play at an unlicensed operation." },
      { label: "Why we reopened it", text: "Because the evidence cuts both ways. Casey owed $6,300 to a predatory lender, faced an academic hearing that would end his scholarship, and had quietly been selling everything he owned." },
      { label: "What his family says", text: "His dad left a voicemail begging him to call, saying there's nothing he could confess that would be worse than the phone not ringing. His cousin got a bus ticket in her name and was told to delete the email." },
      { label: "Who he was", text: "Clever, cornered, careful in the way of someone with a plan he can't tell anyone. A kid doing frantic math on a whiteboard, deciding how a life gets fixed." },
    ],
    objective: "Read the study, the debt, and the plan. Decide whether Casey was taken — or whether he made sure it would look that way.",
    personaTags: ["clever", "broke", "cornered", "planning something"],
  },
  "case-07": {
    ruling: "Officially ruled: absconded with cargo",
    cards: [
      { label: "The disappearance", text: "Andre Boudreaux, 29, a night courier, vanished on his route. His van returned to the depot parked perfectly, engine cold — loaded with 47 packages addressed to a place that doesn't exist." },
      { label: "The official ruling", text: "A driver sitting on a van of unmarked product who saw a payday and ran. The address — 1148 Verge Road — resolves to a gravel turnout and a drainage culvert. Case leans toward theft and flight." },
      { label: "Why we reopened it", text: "The van came back with more packages than it left with. Thieves don't return the merchandise with interest. And every night driver in his district 'gets a stretch' of Verge Road — the last one who did also vanished." },
      { label: "What his family says", text: "Three weeks from proposing, ring fund almost full, Sunday roast at his mother's non-negotiable. His fiancée and brother say a man building that life doesn't run from it — 'not feet-first, not any way.'" },
      { label: "Who he was", text: "Warm, loyal, a saver and a planner. Wrote wedding vows in his notes app, kept his winnings in the cupholder, called his mama 'save me the end piece.' A good man who took one bad job." },
    ],
    objective: "Follow the ghost address and the money. Figure out what he was really delivering — and who came to collect.",
    personaTags: ["loyal", "saving up", "in love", "in over his head"],
  },
  "case-08": {
    ruling: "Officially ruled: runaway",
    cards: [
      { label: "The disappearance", text: "Maddie Okafor, 17, a five-star babysitter, vanished during an overnight booking. Her phone was found face-down on the floor of the house's front hall. The back door stood open." },
      { label: "The official ruling", text: "A teenager with cash income her mother didn't fully know about, filed as a probable runaway. The family she was sitting for — the Wexlers — booked her five times through a trusted app." },
      { label: "Why we reopened it", text: "The house at 1207 Fernway has been condemned and empty since a 2023 fire. There are no children's beds. The 'family' verified through a vendor whose records conveniently no longer exist." },
      { label: "What her family says", text: "Her mother is adamant Maddie is not a runaway: she left her college fund untouched, her phone behind, and had a plan for everything. 'My careful girl does not just leave.'" },
      { label: "Who she was", text: "Sharp, brave, methodical — a future vet who rewards 'the struggle' in her tutoring, logs what scares her, and reads the exits in every room. Do not underestimate her." },
    ],
    objective: "Follow what Maddie noticed and what she planned. Decide what really happened when she went back inside.",
    personaTags: ["sharp", "brave", "methodical", "underestimated"],
  },
  "case-09": {
    ruling: "Officially ruled: walked out on his life",
    cards: [
      { label: "The disappearance", text: "Hal Brennan, 45, a cul-de-sac homeowner of sixteen years, vanished from a locked house. Alarm set, car in the garage, dinner half-eaten, his neighborhood-watch vest folded on the counter." },
      { label: "The official ruling", text: "A middle-aged man under strain who walked away — a legend, an obsession his wife mocked, a marriage everyone assumed was fraying. Filed as voluntary." },
      { label: "Why we reopened it", text: "He'd bought floodlights and deadbolts the week before. Four figures stood on his lawn at 2 AM and 'dispersed like a shift ending.' And his own daily habits arrived in his inbox, formatted like the tips he used to file on others." },
      { label: "What his family says", text: "His wife Dana refuses 'he left me' — he scheduled her homecoming, bought her flowers, planned to vacuum first. His daughter got followed online by a 'watch' account 200 miles from home." },
      { label: "Who he was", text: "Earnest, a joiner, a little lonely — the kind of man who wants to be useful and finds a community that lets him. He filed 214 tips before he understood what he'd joined." },
    ],
    objective: "Read the watch, the tips, and the street. Work out what the neighborhood really does — and what it did with Hal.",
    personaTags: ["earnest", "a joiner", "lonely", "wants to be useful"],
  },
  "case-10": {
    ruling: "Officially ruled: lost in the backcountry",
    cards: [
      { label: "The disappearance", text: "Farrah Haddad, 34, a burnt-out ICU nurse, checked into a no-signal wellness retreat and never checked out. Staff say she 'left the program early, on foot.' No exit was ever logged." },
      { label: "The official ruling", text: "An exhausted woman who wandered into the wilderness. A tragedy of exposure. Search and rescue found nothing — no gear, no track, no Farrah." },
      { label: "Why we reopened it", text: "Her phone — never physically recovered — synced one last batch two days after she was declared missing, from a meadow the retreat swears doesn't exist. And four prior guests 'left early, on foot' too." },
      { label: "What her family says", text: "Her sister Layla did exactly what Farrah told her to: called the county, not the retreat. She's certain her sister found something inside that place. 'She notices things. That's her whole job.'" },
      { label: "Who she was", text: "Steady, exhausted, incapable of not helping. Eleven years of codes and hallway grief. She documents in findings, not feelings — which is why her last records read like a nurse's chart." },
    ],
    objective: "Read what she recorded inside the retreat. Decide what really happened past the fence line.",
    personaTags: ["steady", "burnt out", "observant", "can't stop helping"],
  },
  "case-11": {
    ruling: "Officially ruled: accidental drowning (presumed)",
    cards: [
      { label: "The disappearance", text: "Marcus Bell, 33, vanished at Blackwater Quarry — the frozen quarry where a sixth childhood friend went through the ice twenty years ago and was never found. His car was left at the gate, hazards on." },
      { label: "The official ruling", text: "A grieving man at a dark anniversary, presumed through the ice like his friend before him. History repeating. Divers plan to search when the ice clears." },
      { label: "Why we reopened it", text: "The gate was chained from the outside all night — his tire tracks go under it. His four reunion friends had all quietly gone missing first, one by one, while their group chat kept typing cheerfully in their names." },
      { label: "What his family says", text: "His wife Elena found his hidden note and refuses 'he drowned.' She says he went to that shore on purpose, to finish something twenty years old — and that he counted right this time." },
      { label: "Who he was", text: "Loyal, guilt-ridden, the only one of the five who ever wanted to go back for the boy who fell. A man carrying one childhood lie for two decades, finally deciding to set it down." },
    ],
    objective: "Untangle the group chat and the impossible timestamps. Decide who — or what — gathered the Creek Five.",
    personaTags: ["loyal", "guilt-ridden", "haunted", "finally honest"],
  },
  "case-12": {
    ruling: "Officially ruled: theft, then flight",
    cards: [
      { label: "The disappearance", text: "Sadie Kwan, 26, a dog walker, vanished from a client's house. Her phone was found on the porch, screen cracked, tucked under the doormat weights by the homeowner — who reported it himself." },
      { label: "The official ruling", text: "The homeowner filed first, itemized and notarized: a walker with hardware-store tools and floor plans of his house who stole and ran. The app shows she 'resigned' by message that morning." },
      { label: "Why we reopened it", text: "The client's house has a window on the outside with no room behind it inside — an eleven-foot gap the floor plan calls a 'chase.' Sadie had pulled the county plans. And the dog kept pawing at a wall." },
      { label: "What her family says", text: "Her roommate and mother say Sadie doesn't steal and doesn't run — she was excited, about to 'do the best thing she'd ever done,' and her borrowed boots and a stranger's coat went missing with her." },
      { label: "Who she was", text: "Kind, brave, incapable of ignoring a wrong once she'd seen it. The kind of person who'd risk everything for someone she'd never even met — and let the dog take the credit for the detective work." },
    ],
    objective: "Read the walks, the house, and the plan. Figure out what Sadie found behind that wall — and what happened when she went back in.",
    personaTags: ["kind", "brave", "can't look away", "loves dogs"],
  },
  "case-13": {
    ruling: "Officially ruled: absconded with funds",
    cards: [
      { label: "The disappearance", text: "Milo Grieves, 41, a building superintendent, vanished from the sublevel workshop of the building he maintained. His key board was found full but for one hook — labeled, in his hand, 'M.'" },
      { label: "The official ruling", text: "A man with a secret side income who took a payout and ran. Six anonymous deposits, odd amounts, memo 'storage consultation.' A seventh cleared at 11:03 PM. Then nothing. Filed as flight." },
      { label: "Why we reopened it", text: "Every gray dollar went into his estranged daughter's college fund — men don't flee on money they've given away. And he'd cancelled the coffee he'd begged her for, the Saturday after he vanished." },
      { label: "What his family says", text: "His daughter Marisa, who'd barely spoken to him in a year, had finally said yes to one coffee. 'He's a man who shows up late,' she says. 'He's not a man who doesn't show up.'" },
      { label: "Who he was", text: "Quiet, guilt-heavy, trying to buy his way back into his daughter's life the only way he knew how. A keeper of keys who sold access he shouldn't have — to someone patient." },
    ],
    objective: "Follow the sales and the buyer. Work out what the seventh payment actually bought.",
    personaTags: ["quiet", "guilt-heavy", "estranged dad", "trying to make amends"],
  },
  "case-14": {
    ruling: "Officially ruled: storm-related, presumed",
    cards: [
      { label: "The disappearance", text: "Wade Kessler, 37, an HVAC tech and weekend storm chaser, drove alone to a field to photograph a storm only his app could see. His truck was found at the gate, hazards on, anemometer still spinning. The air was dead calm." },
      { label: "The official ruling", text: "A chaser caught by sudden weather with no witnesses. Presumed storm-related. Never mind that no weather service on Earth recorded a storm within four hundred miles that day." },
      { label: "Why we reopened it", text: "His app painted a violent, unmoving supercell over the same field for weeks — sourced from a radar station decommissioned in 1988. In 1987, an F4 tracked into that exact field and three spotters were never found." },
      { label: "What his family says", text: "His chase partner Bobbi refuses the word 'unwarned' — 'he was warned by everything except the sky. He warned US.' His ex and his son Leo describe a man mid-plan, not a man mid-flight." },
      { label: "Who he was", text: "Methodical, honest, an instrument guy who trusts data over feelings. A dad planning blue-sky drives with his kid. He reported the anomaly correctly before he ever drove out to it." },
    ],
    objective: "Read his measurements and the 1987 file. Decide what was really parked over that field.",
    personaTags: ["methodical", "honest", "a good dad", "trusts the data"],
  },
  "case-15": {
    ruling: "Officially ruled: psychological episode",
    cards: [
      { label: "The disappearance", text: "Pris Navarro, 27, a mathematics PhD candidate, vanished from a library study carrel — leaving behind a completed, field-defining proof and notes stacked the way she stacked things when she was done." },
      { label: "The official ruling", text: "An isolated, brilliant student who cracked under pressure and wandered off talking to companions she'd invented. The university's preferred story. Case: welfare, not crime." },
      { label: "Why we reopened it", text: "Her 'imaginary' study group met by video every Tuesday for eleven weeks — participants on phone numbers that were disconnected decades ago, or, per the carrier, never issued at all. And she documented all of it like a scientist." },
      { label: "What her family says", text: "Her mother rejects 'breakdown' outright: 'My careful one was never lost a day in her life. Check your basement.' Her advisor, who scheduled nothing on Tuesday nights for forty years, wouldn't say why." },
      { label: "Who she was", text: "Rigorous, lonely, luminous when she talked about math. A woman who ruled things out methodically, cited her sources in four languages, and knew exactly what 'colleague' means." },
    ],
    objective: "Read her research journal and the calls. Decide who she really presented her proof to.",
    personaTags: ["rigorous", "lonely", "brilliant", "documents everything"],
  },
};

export function briefingFor(caseId: string): Briefing | undefined {
  return BRIEFINGS[caseId];
}
