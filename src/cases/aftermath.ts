/**
 * The aftermath — the case file's final page, shown once the player has filed
 * a report. It closes the loop the way a real cold case rarely does: the
 * arrest (when there was a human hand to catch), the courtroom, the plea, the
 * sentence — and, above all, the people left behind, in their own words.
 *
 * Some of these cases had no one mortal to try. For those, "the record" is
 * what the world settled on, what quietly stayed unexplained, and how the
 * family carried it. Every entry ends with a coda: the line that lingers.
 */

export interface FamilyReaction {
  name: string;
  relation: string;
  /** Their words, verbatim from the record. Long enough to land. */
  quote: string;
}

export interface Aftermath {
  /** Time-stamp kicker, e.g. "THE RECORD · 14 months later". */
  kicker: string;
  /** Whether a human was ultimately charged (drives the courtroom section). */
  resolution: "convicted" | "charged" | "unresolved" | "sealed";
  /** The arrest / the break in the case. One or two sentences. */
  arrest: string;
  /** Charges filed. Omit for unresolved. */
  charges?: string;
  /** How they pleaded. */
  plea?: string;
  /** What happened in the courtroom — testimony, the turn, the verdict. */
  trial?: string;
  /** The sentence handed down. */
  sentence?: string;
  /** For unresolved/sealed cases: what officially closed (or didn't) the file. */
  disposition?: string;
  /** The people left behind. 2–3, most-affected first. */
  family: FamilyReaction[];
  /** The last line. Make it hurt or haunt. */
  coda: string;
}

const AFTERMATH: Record<string, Aftermath> = {
  "case-01": {
    kicker: "THE RECORD · 11 months later",
    resolution: "convicted",
    arrest:
      "The tenant listed for the 'vacant' Unit 3A did not exist on any lease — but the man who had been living in the walls between the flower shop and 4B did. Building maintenance found a crawlspace nest above Wren's ceiling: her earplug wrappers, her missing spare key, and a notebook copying her own handwriting. He was arrested trying to re-rent 4B under a new name.",
    charges: "Second-degree kidnapping, stalking, unlawful surveillance, and criminal trespass. Remains charged in Wren's death pending recovery.",
    plea: "Pleaded not guilty; changed to guilty on the stalking and surveillance counts mid-trial when his own logs were entered into evidence.",
    trial:
      "The prosecution never needed to prove much. He had kept his own record — a mirror of hers, noting when she showered, when she slept, which nights Reyna stayed over. The jury heard forty minutes of it read aloud. Wren's mother left the room during the entry dated the night before the disappearance. It ended with two words in his hand: 'door lock.'",
    sentence: "Twenty-two years, no parole eligibility for eighteen. The flower shop was demolished; the crawlspace was sealed with the building.",
    family: [
      { name: "Diane Castellan", relation: "her mother", quote: "She called me every Sunday since college. Every single Sunday. When the Sundays stopped I knew — a mother knows — and everyone told me she'd just moved on. She wrote down that she was scared and we called it anxiety. I will never forgive the word 'anxiety.'" },
      { name: "Reyna B.", relation: "her best friend", quote: "She kept saying 'if I disappear it was the building,' like a joke, and I laughed because you're supposed to laugh. I laughed. God. She was telling me the whole time and I laughed." },
    ],
    coda: "Gerald the pothos was the only living thing recovered from 4B. Reyna keeps him on her windowsill. He's still alive.",
  },
  "case-02": {
    kicker: "THE RECORD · 8 months later",
    resolution: "convicted",
    arrest:
      "The rider who only ever booked Mara had spoofed his location through a burner account — but his dash-cam ambush went wrong at a second driver's car, and she got his plate. Detectives matched it to Marcus O., who had 'viewed her profile' fourteen times after she unmatched him. His storage unit held her keys, her thermos, and a laminated copy of her weekly route.",
    charges: "First-degree murder, kidnapping, and aggravated stalking.",
    plea: "Not guilty on all counts.",
    trial:
      "His own words convicted him. Mara had screenshotted every message — 'I just want to know where you'll be, that's not a lot to ask' — and posted the last one publicly the day before. The route map in his unit matched a change she had told no one, not even the app. The jury deliberated for under three hours. Her brother read her savings-account balance to the court: she had been eleven days from owning her car outright.",
    sentence: "Life without the possibility of parole.",
    family: [
      { name: "Sam Quist", relation: "her brother", quote: "She was almost free. That's the part. Two months from the car being hers, present already bought for my kid — the dinosaur one — soup at mom's every Sunday. She built a whole careful life so nothing bad could reach her. She locked every door. He didn't come through a door. He came through the app that was supposed to protect her." },
      { name: "Rosa Quist", relation: "her mother", quote: "I still make the soup on Sundays. I make her bowl. My son tells me to stop and I tell him when he's a mother he can tell me to stop." },
      { name: "Priti", relation: "fellow driver", quote: "We all park nose-out now. All of us at the depot. We call it parking like Mara." },
    ],
    coda: "The rideshare company added an emergency-share feature the following spring. In the announcement they did not use her name.",
  },
  "case-03": {
    kicker: "THE RECORD · 16 months later",
    resolution: "convicted",
    arrest:
      "The 'grief circle' was a machine. 'Maren' was one of four aliases run by a couple who scouted online obituaries for the recently widowed, spent a year earning trust, then walked their targets through signing everything to a shell 'trust' before the final 'walk.' The mail slot the money traced to led, eventually, to a rented farmhouse — and to Edith's cardigan, folded in a drawer with six others.",
    charges: "Racketeering, multiple counts of financial exploitation of a vulnerable adult, conspiracy, and two counts of murder.",
    plea: "Both pleaded not guilty; the wife took a cooperation deal and testified against the husband.",
    trial:
      "The trust documents, the scripts they read from ('grief is just love with nowhere to go'), and the recovered belongings built a timeline across three states and at least seven victims. Claire testified last. She read her mother's final message aloud — 'the porch light stays on for whoever needs it next' — and told the jury that her mother thought she was being generous. That she died believing she was being kind.",
    sentence: "The husband: two consecutive life terms. The wife: 30 years. Restitution ordered that will never be collected.",
    family: [
      { name: "Claire Marsh", relation: "her daughter", quote: "They didn't take her with force. That's what I can't hold. They took her with kindness — they gave a lonely woman the one thing nobody else was giving her, which was somewhere to put all that love, and then they billed her for it, and then they walked her into the dark and called it healing. She left the keys in an envelope 'for the next family.' She was thinking of strangers on the last morning of her life." },
      { name: "Walt Marsh Jr.", relation: "her nephew", quote: "Aunt Edie's roses bloomed the next spring anyway. Nobody had told them to stop." },
    ],
    coda: "Investigators believe at least two more members of the circle are still active under new names. The board was never fully recovered.",
  },
  "case-04": {
    kicker: "THE RECORD · the file remains open",
    resolution: "unresolved",
    arrest:
      "No one was ever arrested. There was no one to arrest. The 'regular' in booth 4 corresponds to no person who has ever held an ID, a bank account, or a pulse — only to sixty years of till tape reading, every night, EXACT CHANGE $4.44, in a hand that never varied.",
    disposition:
      "The diner's own camera was entered into the county record and then quietly withdrawn; the vendor's 'compression artifact' explanation could not account for 214 nights of a compressed seat and moving steam above an empty booth. June's case was administratively closed as 'walked off the job' over her family's objection. Booth 4 was removed from the floor. The diner closed for good four months later.",
    family: [
      { name: "Ruth Pell", relation: "her grandmother", quote: "I ran that diner forty years and I knew exactly who sat in booth four and I never told her because I thought if I never said it out loud it couldn't take another one of mine. I told her 'Sunday, I'll tell you Sunday.' She went on a Wednesday. I will carry that Wednesday to my grave, and I'll tell her the whole story when I get there, and I'll be sorry, and it won't be enough." },
      { name: "Theo Pell", relation: "her brother", quote: "She wanted to solve the scary thing instead of running from it. That was the best thing about her and it's the thing that— I keep her GRE books. She was going to be a vet. She was going to fix things that couldn't tell you where it hurt." },
    ],
    coda: "The new owners repainted, re-tiled, changed the name. Regulars say the fourth booth from the door still runs cold, and that no one, without being told, ever chooses to sit there.",
  },
  "case-05": {
    kicker: "THE RECORD · 13 months later",
    resolution: "convicted",
    arrest:
      "Omar's badge logs — the ones he'd begged someone to pull — were the case. The 'eliminated' second shift was a ghost payroll: a site manager and a staffing contractor were laundering hours through workers who were told to clock in and then never officially existed, so injuries, wages, and disappearances left no paper. Omar had three copies of the grievance. The recovered pocket recorder had the rest.",
    charges: "The site manager: involuntary manslaughter, records tampering, and labor fraud. The contractor: conspiracy and wage theft across 60+ workers.",
    plea: "The manager pleaded not guilty; the contractor pleaded guilty to fraud in exchange for testimony.",
    trial:
      "The recorder played for the courtroom: Omar's voice, calm and tired, dating each entry, and then — on the last file — the machinery of the night shift starting up around him at an hour the facility swore it was closed. Luz identified her husband's voice for the record. The defense called it inconclusive. The jury did not.",
    sentence: "The manager: 12 years. The contractor: 6 years and cooperation. OSHA levied the largest fine in the county's history; the facility was shuttered.",
    family: [
      { name: "Luz Reyes-Vance", relation: "his wife", quote: "He doesn't miss teeth. That's what I told the detective and he looked at me like I was simple. But you don't understand — Omar knew when every loose tooth was, he was HOME for tooth number three, he never missed the small things because the small things were the whole point of him. A man like that does not walk out of the gate and leave his truck and his son. He documented everything because he knew nobody would believe Luz. So I made them read it." },
      { name: "Mateo Reyes-Vance", relation: "his son (age 7)", quote: "I drew him with four arms because he did all the work. Mom says he was proving something for all the dads. I don't get it yet but I'm keeping the drawing." },
    ],
    coda: "The union named its workplace-safety fund after him. Luz frames the four-armed drawing in the lobby every year on the anniversary and takes it home again the next morning.",
  },
  "case-06": {
    kicker: "THE RECORD · 10 months later",
    resolution: "charged",
    arrest:
      "The 'sleep study' was real; the science was not. A former research tech was running paid overnight trials in the decommissioned annex, harvesting biometric data and something less explicable, on cash-desperate students who wouldn't be missed for a while. Seven unclaimed phones sat on his shelf. Casey's was the eighth. The tech was arrested boarding a bus two states over — using a ticket bought in his cousin's name.",
    charges: "Seven counts of unlawful imprisonment, fraud, and reckless endangerment. Charges pending in the disappearances; no bodies have been recovered.",
    plea: "Pleaded not guilty. Trial ongoing at the time of filing.",
    trial:
      "The wrinkle the prosecution can't fully close is Casey himself. He owed $6,300 to a lender who doesn't forgive, faced a hearing that would have ended everything, and had sold every possession and packed a duffel. The defense argues he engineered his own vanishing and the annex is a coincidence. The seven other phones argue back.",
    sentence: "Not yet sentenced. The lender's records were subpoenaed; the academic hearing was posthumously vacated.",
    family: [
      { name: "Raymond Brandt", relation: "his father", quote: "I left him a voicemail. I said there's nothing you could confess that's worse than this phone not ringing. I meant the debt. I meant the hearing, the selling everything, whatever plan he thought he had to hide. I would have taken any of it. I keep the voicemail on my phone so it's the last thing that still has his number in it and I have never once been able to delete it." },
      { name: "Mari", relation: "his cousin", quote: "He bought a bus ticket in my name and told me to delete the email. I didn't delete it. I gave it to the police. If he did have a plan — if he was going to disappear on his own terms — then somewhere out there he's furious that I kept the receipt. I hope he's furious. I hope he's somewhere being furious at me." },
    ],
    coda: "The annex was finally demolished. Six of the seven other phones were never claimed by anyone. They are still in evidence, still, according to the log, occasionally lighting up.",
  },
  "case-07": {
    kicker: "THE RECORD · 9 months later",
    resolution: "convicted",
    arrest:
      "1148 Verge Road was a dead drop for a cargo-theft ring that used night couriers as unwitting mules — routing 'ghost' packages through drivers who'd take the fall if it unraveled. Andre figured it out (the van coming back heavier, not lighter) and refused the next run. The ring's fixer and two collectors were arrested after Andre's own notes-app entry — '1148 Verge Road, if anything happens that's where I was sent' — pointed detectives straight at the culvert.",
    charges: "The fixer: murder, kidnapping, and running a criminal enterprise. Two collectors: conspiracy and accessory.",
    plea: "The fixer pleaded not guilty; both collectors pleaded guilty and testified.",
    trial:
      "The collectors described the system in flat, procedural detail — how a driver was chosen, watched, and 'collected' if he got curious. One of them identified Andre from a photo and then couldn't continue. Andre's brother testified that Andre had closed his dating account and bought a ring box the same week: 'A man three weeks from proposing does not run off with a van of stolen merchandise. He came back every night. He came back with MORE than he left with. He was trying to give it back.'",
    sentence: "The fixer: life plus 25. The collectors: 18 and 15 years.",
    family: [
      { name: "Denise Boudreaux", relation: "his mother", quote: "Every Sunday I made the roast and saved him the end piece, and he'd call me 'save me the end piece, Mama,' like I'd ever forget. I still cut it. I still set it aside. My other son says Mama you have to stop and I say I stopped believing in a lot of things this year, I'm not going to stop believing in the end piece too." },
      { name: "Theo Boudreaux", relation: "his brother", quote: "He wrote his wedding vows in his notes app before he even had the ring. I read them at the sentencing. The judge let me. I don't think that's allowed but the judge let me." },
      { name: "Nadia", relation: "who he'd unmatched", quote: "He messaged me to say he'd gotten engaged and was deleting the app and I should know he thought I was great. Who does that? Who's that decent on their way out the door? I didn't even really know him and I cried for a week." },
    ],
    coda: "The ring was recovered from the van's cupholder, still in its velvet box, still paid off in full. His fiancée wears it on a chain. She says it was already hers.",
  },
  "case-08": {
    kicker: "THE RECORD · 14 months later",
    resolution: "convicted",
    arrest:
      "The 'Wexler family' did not exist. The account that booked Maddie five times was a front for a trafficking operation that used the trusted sitter app to lure teenagers to a condemned house where no one would look. Maddie's cloud backup — she'd documented to the cloud, not just the phone — survived. So did the code word. When she texted 'jacaranda,' Zoe called police within the minute, and the responding officers reached 1207 Fernway in time to arrest two men, though not in time for Maddie.",
    charges: "Human trafficking, kidnapping, conspiracy, and felony murder against three defendants; the app's regional verifier charged with falsifying vendor records.",
    plea: "Two pleaded not guilty; the verifier pleaded guilty and turned state's evidence.",
    trial:
      "Maddie's own methodical evidence ran the trial. She had photographed the condemned notice, mapped the exits, logged that there were no children's beds — 'so who booked me' — and backed all of it up beyond their reach. The lead detective told the jury he had never seen a victim build a more complete case against the people who took her. The verifier's testimony connected the fake account to eleven other bookings. Her mother was in the front row for all nineteen days.",
    sentence: "Two defendants: life without parole. A third: 40 years. The verifier: 12 years. The app was sued into bankruptcy and its founders barred from the industry.",
    family: [
      { name: "Ada Okafor", relation: "her mother", quote: "My careful girl does not just leave. I said it to every officer who wrote 'runaway' on a form. She left her college fund untouched. She left her phone. She had a plan for everything because I taught her to read the exits in every room — I taught her that, it was supposed to keep her SAFE — and she used every bit of it to make sure they'd be caught even if she wasn't found. She caught them from inside that house. My seventeen-year-old built the case that put them away. Do not tell me my daughter ran." },
      { name: "Zoe K.", relation: "her best friend", quote: "The word was jacaranda. She made me memorize it and I thought she was being dramatic. When it came through I already had 911 dialed because some part of me had been holding the phone for days. A minute faster and — no. I can't. A minute. She gave me the minute and it still wasn't— she did everything right. She did everything right." },
    ],
    coda: "The state passed 'Maddie's Law' requiring identity verification and address checks on caregiving platforms. Her mother testified at the signing, wearing her daughter's honor-roll pin, and did not cry until she was back in the car.",
  },
  "case-09": {
    kicker: "THE RECORD · 15 months later",
    resolution: "charged",
    arrest:
      "The 'Neighborhood Watch' Hal joined had, over years, curdled into something else: a members-only surveillance network that catalogued residents' habits and 'dispersed' those who noticed — the four figures on his lawn were the inner circle 'ending a shift.' Raids on three homes recovered the members' board: dossiers on 40 households, including Hal's own routine, filed back to him as a warning. Six members were arrested; the organizer fled.",
    charges: "Stalking, conspiracy, unlawful surveillance, and — for the inner circle — kidnapping. Murder charges pending recovery.",
    plea: "Four pleaded not guilty; two entered cooperation agreements.",
    trial:
      "The cooperating members described a group that had convinced itself it was keeping the street 'safe' by knowing everything about everyone — and treated curiosity as a threat to be managed. Hal's 214 filed tips, it turned out, had been the raw material: he'd spent years building the very map that was used to erase him. His daughter's testimony about the 'watch' account that followed her from 200 miles away drew a gasp from the gallery.",
    sentence: "Two convicted so far: 19 and 16 years. The organizer remains at large; a warrant is active. Two cases pending.",
    family: [
      { name: "Dana Brennan", relation: "his wife", quote: "I mocked the vest. God help me, I called it his little hobby, his lonely-man cosplay. He wanted to be useful — that was all it ever was, he wanted to matter to the street — and they took a good lonely man's need to belong and they fed it to him until he'd drawn them a map of every one of us. He scheduled my homecoming that week. He was going to vacuum first. Who is that? Who disappears in the middle of planning to vacuum for his wife?" },
      { name: "Kayla Brennan", relation: "his daughter", quote: "A 'watch' account started following me two hundred miles from home. I blocked it. I wish I'd screenshotted it first but you don't think — you think it's a bot, you think it's nothing. My dad filed 214 tips trying to protect people and the thing he built came for me across a whole state. I file nothing now. I notice nothing. I'm trying to unlearn the exact thing that got him killed." },
    ],
    coda: "Maple Court disbanded its watch. The floodlights Hal installed the week before he vanished are still on the house; Dana leaves them burning every night, though she couldn't tell you for whom.",
  },
  "case-10": {
    kicker: "THE RECORD · 12 months later",
    resolution: "charged",
    arrest:
      "The retreat's 'left early, on foot' script covered a pattern: guests who noticed too much were walked past the fence line to the meadow the staff denied existed, where the property's unpermitted 'integration' practices turned lethal. Farrah's phone was never physically found — but its final sync, two days after she was declared missing, geolocated the meadow precisely and cracked the case. The founder and two counselors were arrested; the property was seized.",
    charges: "Involuntary manslaughter, unlawful imprisonment, practicing medicine without a license, and fraud across at least five guests.",
    plea: "The founder pleaded not guilty; one counselor pleaded guilty and cooperated.",
    trial:
      "Farrah had charted the place like a nurse — findings, not feelings — and the recovered records read as a clinical account of her own disappearance: the scripted calm, the identical phrasing, the guest named Tomlin who came before her. Layla testified that she'd done exactly what her sister instructed: called the county, not the retreat. 'She notices things. That's her whole job. She noticed this one from the inside and made sure I'd have the number when the retreat lied to me. And they did lie. Word for word, the script she'd written down.'",
    sentence: "The founder: 18 years. The counselor: 9 years and cooperation. Civil suits from four families pending.",
    family: [
      { name: "Layla Haddad", relation: "her sister", quote: "Eleven years in the ICU. Eleven years of holding other people's worst nights and charting them steady so the next nurse would know what happened. She finally, FINALLY booked one week to put the phone down and rest, and she couldn't stop being a nurse even there — she charted the place that killed her, so that I could catch them. She helped right up to the end. She would be furious that I'm proud of that instead of just angry. I'm both. I'm allowed to be both." },
      { name: "Nurses of Bay 4 ICU", relation: "her colleagues", quote: "We kept her locker for a year. Someone always kept a granola bar in it for her, the way she always had one for whoever forgot to eat. We finally cleared it. We each took a granola bar. We know how that sounds. We don't care how it sounds." },
    ],
    coda: "The meadow the retreat swore didn't exist is now marked on the county survey. Search-and-rescue teams train there. They say it's the only field they've ever worked where the dogs won't cross the tree line.",
  },
  "case-11": {
    kicker: "THE RECORD · the file was closed, then quietly reopened",
    resolution: "sealed",
    arrest:
      "There was no one to arrest. The four friends whose cheerful messages filled the reunion chat had each, in turn, already gone missing — one by one, in the order they'd fled the ice twenty years earlier — while something typed on in their names, timestamps arriving before the messages they answered. Marcus went to Blackwater Quarry to finish a twenty-year-old debt. The gate was chained from the outside; his tire tracks ran under it.",
    disposition:
      "Officially, Marcus Bell drowned at a dark anniversary, as his childhood friend had before him; divers found nothing when the ice cleared, as they'd found nothing in 1985. The file was closed as accidental. It was reopened, without explanation, after Elena submitted his hidden note and the chat logs — and then sealed. No cause of the impossible timestamps was ever entered into the record.",
    family: [
      { name: "Elena Bell", relation: "his wife", quote: "He went to that shore on purpose. I need people to understand that — he wasn't a man who slipped on ice, he was a man who finally, after twenty years, decided to go back for the boy the five of them left in the water and never told a soul about. He counted right this time. That's what his note said: 'I counted right this time.' Six of them went out. Five came back and made a pact of silence and it ate every one of them alive over two decades. Marcus was the only one who ever wanted to go back. I don't think he drowned. I think he kept a promise." },
      { name: "Lonnie's widow", relation: "friend of the family", quote: "My husband was already gone a week when his account was still making plans in that group chat, cheerful as anything, using words he used. I read them at two in the morning knowing he was missing. I stopped reading. I threw the phone in a drawer. Some things you're not meant to solve. Some things you're meant to close the drawer on." },
    ],
    coda: "The old group chat has been silent since the 13th. Elena keeps it on her phone. Once, months later, it showed 'typing…' for most of an afternoon, and then stopped, and has never done it since.",
  },
  "case-12": {
    kicker: "THE RECORD · 7 months later",
    resolution: "convicted",
    arrest:
      "The homeowner filed first — itemized, notarized, a walker with tools and floor plans who 'stole and ran' — because he needed a story before the wall came down. Behind the eleven-foot 'chase' the floor plan called empty, police found a hidden room, and in it a woman named only 'A.' in Sadie's reminders, alive, and the evidence of how long she'd been kept. Sadie had gone back in for her. The homeowner was arrested at the scene.",
    charges: "Kidnapping, false imprisonment, and murder in the second degree.",
    plea: "Pleaded not guilty; the 'resignation' message he'd sent from Sadie's account became Exhibit A against him.",
    trial:
      "The dog did the detective work and Sadie followed it — the trial nearly turned on Biscuit's insistence on that one wall, entered into the record via the walk-app's GPS showing hours logged at a twenty-minute job. 'A.' testified from behind a screen. Sadie's roommate read her last post to the jury: 'If the app says I resigned tomorrow morning, I did not write that. Remember I said that.' She had written it the night before she went back in.",
    sentence: "Life, with a consecutive term for the false imprisonment of 'A.' The house was condemned and demolished; the hidden room was documented brick by brick.",
    family: [
      { name: "Jules Kwan", relation: "her sister", quote: "She risked everything for a stranger she'd never even met — a woman she only knew was there because a dog kept pawing a wall and Sadie was the one person on earth who'd take a dog seriously. That's the whole story of my sister. She couldn't look away once she'd seen it. I used to think that would get her hurt someday and I was right and I would give anything to be wrong and have a sister who could walk past things." },
      { name: "'A.'", relation: "the woman she saved", quote: "I heard a dog barking at the wall for weeks and I made myself stop hoping, because hope was the thing that hurt. Then one night the wall came open and there was a woman I'd never seen, and she said 'I've got you, I've got you,' and she got me out first. First. I am alive because a dog-walker I never met decided I was worth the wall. I don't have the words. I've tried for seven months to find the words." },
    ],
    coda: "Biscuit was adopted by 'A.' The two of them visit Sadie's family every Sunday. The dog still, sometimes, stops and stares at blank walls, and no one ever tells him to stop.",
  },
  "case-13": {
    kicker: "THE RECORD · 10 months later",
    resolution: "convicted",
    arrest:
      "The patient buyer who paid odd amounts for 'storage consultation' wanted one thing Milo never sold him: the master key to the tunnels under all five buildings, where the buyer had been quietly building something the city knew nothing about. On the seventh payment, Milo refused for the last time — so the buyer took the key and the man who wouldn't hand it over. Milo's note ('check the junction') led police to the sublevel, and to the buyer, arrested trying to re-key the master himself.",
    charges: "Murder, unlawful excavation, bribery, and reckless endangerment (the tunnels had been compromising the buildings' foundations).",
    plea: "Pleaded not guilty.",
    trial:
      "The financial trail did the impossible thing of exonerating the victim and convicting the killer at once: every 'dirty' dollar Milo took had gone, untouched, into his estranged daughter's college fund — 'men don't flee on money they've given away,' the prosecutor said — while the buyer's own excavation permits, all forged, mapped his motive precisely. Marisa testified about the coffee. 'He's a man who shows up late. He is not a man who doesn't show up. He'd cancelled everyone but me.'",
    sentence: "40 years to life. The tunnels were filled; two of the five buildings were condemned as unsafe.",
    family: [
      { name: "Marisa Grieves", relation: "his daughter", quote: "I hadn't really spoken to him in a year. A YEAR. And he bought a hoodie from my school he wasn't sure I'd take, and he begged me for one coffee, and I finally said yes — one, Saturday, don't make it weird — and he cancelled every other thing in his life so he wouldn't ruin it. He never made the coffee. He put every dirty dollar into my future and died with my mother's ring in a green toolbox waiting for the right moment to give it to me. I spent a year deciding whether to forgive him. He spent that same year earning it. I found out he'd earned it eight months too late." },
      { name: "Sal", relation: "fellow super", quote: "Milo kept every key to five buildings for sixteen years and never once opened a door that wasn't his business — until the one time it cost him. He said no to that man five, six times. People think supers are nobody. Milo died saying no to protect a bunch of tenants who never learned his name." },
    ],
    coda: "The ring was in the green toolbox, top tray, exactly where he said. Marisa wears it. She still orders two coffees on Saturdays sometimes, she says, by accident, and then she sits with the second one until it's cold.",
  },
  "case-14": {
    kicker: "THE RECORD · the file remains open",
    resolution: "unresolved",
    arrest:
      "There was no one to arrest. The violent supercell that only Wade's app could see — sourced from a radar station decommissioned in 1988, parked unmoving over Halloran's field for weeks — corresponds to no weather system recorded by any service on Earth. In 1987, an F4 tracked into that exact field and three storm spotters were never found. Wade drove out to measure what was there. His anemometer was still spinning in dead-calm air when his truck was found.",
    disposition:
      "Officially: a chaser caught by sudden weather, presumed storm-related, no witnesses. The county could not reconcile 'storm-related' with the fact that the air was measured at dead calm and no storm existed to be caught by. Wade's readings — 940 millibars of pressure with no wind, a number the meteorologists called 'impossible, and consistent' — were entered, then flagged as instrument error, then quietly left in the file with no conclusion. The case is open. It is not being worked.",
    family: [
      { name: "Bobbi", relation: "his chase partner", quote: "Do not use the word 'unwarned.' He was warned by everything except the sky. He reported that anomaly correctly weeks before he ever drove out to it — logged it, sourced it, sent it up the chain like the careful instrument man he was, and every human being who could have listened decided the readings were a glitch because the alternative was unthinkable. He warned US. He did the one thing you're supposed to do and the system that's supposed to catch that threw it in a drawer. I'm a storm chaser. I've made my peace with dying in weather. I will never make my peace with him dying in a drawer." },
      { name: "Leo Kessler", relation: "his son (age 9)", quote: "He promised he'd be the loud dad at my science fair on the 26th. My mom says he was on his way to being that, he was mid-plan, he had earplugs bought for everyone else. I did my science project on barometric pressure. I got an A. I keep his Kestrel meter on my desk. Sometimes I turn it on just to watch a normal number." },
    ],
    coda: "Wade's app was pulled from the store; the phantom storm cell can no longer be loaded. Bobbi drives past Halloran's field on the anniversary every year. She says the anemometer she left on the fence still turns, some days, when there is no wind at all.",
  },
  "case-15": {
    kicker: "THE RECORD · closed as 'welfare, not crime'",
    resolution: "sealed",
    arrest:
      "There was no one to arrest, and the university preferred it that way. Pris's 'imaginary' Tuesday study group met by video for eleven weeks — participants on phone numbers disconnected decades ago or, per the carrier, never issued at all — and she documented every call like the scientist she was. She finished a field-defining proof, stacked her notes the way she stacked things when she was done, and presented her work Tuesday night to the only ones who'd truly understand. Then she was gone.",
    disposition:
      "Officially: an isolated, brilliant student who cracked under pressure and wandered off talking to companions she'd invented. Case closed as a welfare matter. The proof — complete, correct, and quietly one of the most important results in her field in a generation — was published under her name, over the objection of no one, because there was no one left to object. Her advisor, who had scheduled nothing on Tuesday nights for forty years, took early retirement and declined to say why. The call logs were sealed.",
    family: [
      { name: "Rosa Navarro", relation: "her mother", quote: "My careful one was never lost a day in her life. She cited her sources in four languages. She ruled things out methodically. She did not 'wander off' — my daughter has never wandered anywhere, she has only ever gone exactly where she meant to go. She told me her colleagues had started 'showing up' and she didn't know where they'd found her, and I told her to come home and check the basement, the thing you say to a child, and she laughed. She understood what 'colleague' means better than anyone alive. I think she went somewhere the math is finished. I think, wherever it is, someone finally reached back." },
      { name: "Dr. Aaron Grasz", relation: "her advisor", quote: "I asked her to see me before Tuesday. She didn't. I have kept my Tuesday nights empty for forty years and I will not explain that to you or to anyone, and if you had heard what I heard on the other end of one of those calls, you would keep yours empty too. She was the finest mind I ever taught. I hope she is presenting still. I hope the room is full. That is all I will say." },
    ],
    coda: "The proof is taught now under her name. On the last page of her research journal, beneath the completed result, she had written a single line in a hand that was steady and unhurried: 'They said it was elegant. They said I should come and see.'",
  },
};

export function aftermathFor(caseId: string): Aftermath | undefined {
  return AFTERMATH[caseId];
}
