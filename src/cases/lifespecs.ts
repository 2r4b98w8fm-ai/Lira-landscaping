import type { Photo } from "../types";
import { buildLifePhotos, type LifeKind } from "../lifephotos";

/**
 * Per-victim everyday photos, woven into each case's camera roll so the
 * disturbing evidence shots sit among the ordinary texture of a real life.
 * Captions and timestamps are tuned to each person; the Photos app sorts
 * everything by time, so these interleave naturally with the case shots.
 */

type Spec = { kind: LifeKind; caption: string; when: string };

const SPECS: Record<string, Spec[]> = {
  "case-01": [
    { kind: "latte", caption: "the café two doors down is going to fund my caffeine problem", when: "2025-09-27T09:10:00" },
    { kind: "plant", caption: "first plant in the new place. his name is Gerald (no relation)", when: "2025-09-29T11:20:00" },
    { kind: "friends", caption: "reyna helped me move and demanded pizza as payment. fair", when: "2025-09-25T20:30:00" },
    { kind: "sunset", caption: "okay the 4th floor walk-up has ONE redeeming quality", when: "2025-10-03T18:40:00" },
    { kind: "brunch", caption: "sunday eggs, first meal that wasn't takeout in this kitchen", when: "2025-10-05T10:15:00" },
    { kind: "cat", caption: "there's a cat that sits in the flower shop window downstairs. we're friends now", when: "2025-10-08T16:00:00" },
    { kind: "selfie", caption: "new apartment, new me, same tired eyes", when: "2025-10-11T12:30:00" },
  ],
  "case-02": [
    { kind: "car", caption: "her and me, another night shift. golden hour before the chaos", when: "2025-10-22T18:20:00" },
    { kind: "latte", caption: "the depot coffee is bad but dex makes it with love (and too much sugar)", when: "2025-11-03T02:50:00" },
    { kind: "sunset", caption: "clocking out as the sun comes up never gets old", when: "2025-10-26T06:45:00" },
    { kind: "brunch", caption: "mom made too much food again. no complaints", when: "2025-11-02T13:10:00" },
    { kind: "citynight", caption: "old town on a friday. everyone's someone's fare tonight", when: "2025-10-25T23:40:00" },
    { kind: "dog", caption: "a passenger's dog rode shotgun for six blocks. best fare of the week", when: "2025-10-30T15:00:00" },
  ],
  "case-03": [
    { kind: "flowers", caption: "Walt's roses opened without him this year. I cried in the good way", when: "2025-06-14T09:40:00" },
    { kind: "brunch", caption: "made his pancakes. rhubarb jam and telling no one", when: "2025-09-13T09:20:00" },
    { kind: "plant", caption: "the windowsill herbs are thriving. someone has to", when: "2025-07-02T11:00:00" },
    { kind: "birthday", caption: "the grandkids sang. 58 candles is a fire hazard, apparently", when: "2025-08-20T18:30:00" },
    { kind: "latte", caption: "coffee for one still feels strange. I'm learning", when: "2025-05-10T08:15:00" },
    { kind: "snow", caption: "first snow. he loved the first snow", when: "2025-11-01T16:20:00" },
  ],
  "case-04": [
    { kind: "latte", caption: "pre-shift fuel. the diner coffee doesn't count, this is the real stuff", when: "2025-10-30T20:00:00" },
    { kind: "friends", caption: "theo and the shop crew closed the place down. my people", when: "2025-10-18T23:30:00" },
    { kind: "brunch", caption: "gran's pie, the recipe I'm sworn to protect with my life", when: "2025-11-05T14:00:00" },
    { kind: "selfie", caption: "name tag says PELL like the sign. i belong to the building a little", when: "2025-09-02T21:40:00" },
    { kind: "citynight", caption: "route 9 at 3am. just me and the neon and the truckers", when: "2025-10-22T03:10:00" },
    { kind: "dog", caption: "the regular with the good dog tips in dog photos. best currency", when: "2025-10-27T04:20:00" },
  ],
  "case-05": [
    { kind: "birthday", caption: "mateo lost the front tooth AND turned the cake into a crime scene. 6 is wild", when: "2025-11-01T17:30:00" },
    { kind: "car", caption: "the truck's making the noise again but she gets me to the plant", when: "2025-11-16T21:40:00" },
    { kind: "brunch", caption: "luz's café de olla before the graveyard shift. keeps me human", when: "2025-11-10T20:30:00" },
    { kind: "dog", caption: "the neighbor's dog waits for me at the gate every morning. loyalty", when: "2025-11-08T07:20:00" },
    { kind: "friends", caption: "poker at gus's. i lost $12 and gained a headache", when: "2025-11-14T20:00:00" },
    { kind: "sunset", caption: "off the night shift as everyone else wakes up. upside-down life", when: "2025-11-12T06:50:00" },
  ],
  "case-06": [
    { kind: "friends", caption: "the boys before I became a nocturnal sleep-study gremlin", when: "2025-11-01T21:00:00" },
    { kind: "desk", caption: "bio 340 is trying to end me. the study money is the only thing keeping the lights on", when: "2025-11-04T23:30:00" },
    { kind: "latte", caption: "third coffee. the study wrecks your days, this is damage control", when: "2025-11-14T11:00:00" },
    { kind: "workout", caption: "sold the bike so this is cardio now. hbu", when: "2025-11-17T08:00:00" },
    { kind: "concert", caption: "nia dragged me out. worth skipping one night of 'sleep'", when: "2025-11-07T22:30:00" },
    { kind: "brunch", caption: "dining hall waffle bar, a broke junior's fine dining", when: "2025-11-11T10:00:00" },
  ],
  "case-07": [
    { kind: "car", caption: "van 221 and me, 60k miles of night. she's my office", when: "2025-11-18T21:50:00" },
    { kind: "citynight", caption: "the whole city asleep and I've got 34 stops to go", when: "2025-11-24T01:30:00" },
    { kind: "friends", caption: "ring shopping recon with theo. don't tell simone", when: "2025-11-28T13:30:00" },
    { kind: "brunch", caption: "mama's roast, sunday, non-negotiable", when: "2025-11-30T13:20:00" },
    { kind: "sunset", caption: "sunrise after a full route. earned every color of this", when: "2025-11-25T06:40:00" },
    { kind: "dog", caption: "taco bruja's shop dog. al pastor's #1 fan", when: "2025-11-27T01:40:00" },
  ],
  "case-08": [
    { kind: "selfie", caption: "top sitter gold ring on the app!! mom framed the screenshot", when: "2025-10-25T12:40:00" },
    { kind: "dog", caption: "the calloways' dog thinks I'm staff. correct", when: "2025-11-02T18:00:00" },
    { kind: "friends", caption: "study gang, mitochondria of this team apparently", when: "2025-11-24T20:10:00" },
    { kind: "latte", caption: "babysitting money = boba money. the economy of being 17", when: "2025-11-10T15:30:00" },
    { kind: "beach", caption: "last warm weekend before it all goes grey", when: "2025-10-19T14:00:00" },
    { kind: "brunch", caption: "volcano night with the calloway boys. THIS is what a house with kids sounds like", when: "2025-11-02T19:50:00" },
  ],
  "case-09": [
    { kind: "dog", caption: "the goodest boy on maplecrest court. undisputed", when: "2025-09-20T15:00:00" },
    { kind: "car", caption: "sunday drive, no watch group, no tips, just road", when: "2025-11-16T14:30:00" },
    { kind: "birthday", caption: "abby home from college for the weekend. loud, wonderful", when: "2025-10-12T18:00:00" },
    { kind: "snow", caption: "first frost on the cul-de-sac. hoa will have opinions", when: "2025-11-28T08:20:00" },
    { kind: "brunch", caption: "dana's home so we eat like adults again", when: "2025-12-08T10:00:00" },
    { kind: "mountains", caption: "took the model-train landscape reference photos. don't judge", when: "2025-10-01T13:00:00" },
  ],
  "case-10": [
    { kind: "plant", caption: "eleven years of ICU and my one skill outside it is keeping ferns alive. barely", when: "2025-10-10T18:00:00" },
    { kind: "latte", caption: "the good coffee before a 12-hour. non-negotiable", when: "2025-10-22T06:00:00" },
    { kind: "sunset", caption: "leaving for the retreat. ten days of no charts, no codes, no hallway crying", when: "2025-10-26T09:30:00" },
    { kind: "mountains", caption: "stillpoint ridge, the drive up. it's beautiful, I'll give it that", when: "2025-10-26T10:50:00" },
    { kind: "friends", caption: "bex made the unit sign a card. i'm going to cry into my scrubs", when: "2025-10-24T20:20:00" },
    { kind: "brunch", caption: "last real meal before the detox retreat's 'nourishment protocol'", when: "2025-10-25T13:00:00" },
  ],
  "case-11": [
    { kind: "friends", caption: "the creek five minus one, twenty years on. we don't talk about the one", when: "2025-10-25T21:20:00" },
    { kind: "beach", caption: "elena planned a coast day 'so december has one good day in it'", when: "2025-12-12T14:00:00" },
    { kind: "car", caption: "drove past blackwater for the first time in 20 years. smaller than the version in my head", when: "2025-10-12T16:40:00" },
    { kind: "brunch", caption: "anniversary dinner. she said yes to cheesy, technically", when: "2025-12-12T20:40:00" },
    { kind: "sunset", caption: "december light does something to me every year", when: "2025-12-04T16:30:00" },
    { kind: "dog", caption: "the neighbor's dog is the only one who wants to hear about the reunion", when: "2025-11-20T17:00:00" },
  ],
  "case-12": [
    { kind: "dog", caption: "BISCUIT. eleven out of ten. would take a bullet, would take several", when: "2025-10-29T15:30:00" },
    { kind: "cat", caption: "mrs okabe's mochi supervising my lunch break", when: "2025-11-05T13:00:00" },
    { kind: "latte", caption: "dog-walking money is boba money and I will not be taking questions", when: "2025-11-08T14:00:00" },
    { kind: "friends", caption: "nora and jules, my whole heart, tiny-dessert enthusiasts", when: "2025-12-10T19:40:00" },
    { kind: "flowers", caption: "grandma's recipe box came to me. keeping the almond card, thief that I am", when: "2025-11-28T12:20:00" },
    { kind: "plant", caption: "the apartment is 40% dogs I don't own and 60% plants I can't kill", when: "2025-11-12T11:00:00" },
  ],
  "case-13": [
    { kind: "car", caption: "evening rounds, five buildings, one me, a thermos of the good stuff", when: "2025-12-19T19:40:00" },
    { kind: "brunch", caption: "mrs ferro fed me again. supers eat well on harker row", when: "2025-12-18T22:40:00" },
    { kind: "citynight", caption: "the row after dark. all mine to keep quiet", when: "2025-12-10T23:00:00" },
    { kind: "workout", caption: "carrying a key ring this heavy IS the workout", when: "2025-12-15T07:00:00" },
    { kind: "sunset", caption: "off the boiler check, sky doing something worth stopping for", when: "2025-12-22T16:40:00" },
    { kind: "snow", caption: "first snow means the pipes start their winter complaints", when: "2025-12-27T09:00:00" },
  ],
  "case-14": [
    { kind: "sunset", caption: "may 14, near ellis. beautiful structure. THIS is why I chase", when: "2025-05-14T18:40:00" },
    { kind: "mountains", caption: "blue-sky drive with leo, scouting where storms USED to be", when: "2025-06-10T14:00:00" },
    { kind: "car", caption: "eleven seasons in this rig. leo's marker tornado on the hood stays forever", when: "2025-05-12T10:10:00" },
    { kind: "birthday", caption: "leo got an A on the fujita scale report. family crest material", when: "2025-05-20T17:00:00" },
    { kind: "friends", caption: "bobbi and the chase crew, thermos of the sad kind", when: "2025-05-25T20:00:00" },
    { kind: "brunch", caption: "cordell's diner, post-chase pie. the tour's non-negotiable stop", when: "2025-06-01T09:30:00" },
  ],
  "case-15": [
    { kind: "desk", caption: "carrel 14, my true address. the librarians water me like a plant", when: "2026-01-25T23:10:00" },
    { kind: "latte", caption: "the 2am colloquium requires the 1am coffee. it's just math", when: "2026-02-11T01:00:00" },
    { kind: "plant", caption: "the one living thing in my apartment that isn't a proof. barely alive, like me", when: "2026-01-30T19:00:00" },
    { kind: "friends", caption: "dani made them write DR NAVARRO (PENDING) on the cup. cohort of one, but the best one", when: "2026-03-06T16:40:00" },
    { kind: "brunch", caption: "mami sent tamales in the mail. yes it's legal, don't ask", when: "2026-02-16T13:00:00" },
    { kind: "citynight", caption: "walking home from the library at 3am. the whole town's mine", when: "2026-02-04T03:10:00" },
  ],
};

export function lifePhotosFor(caseId: string): Photo[] {
  const specs = SPECS[caseId];
  if (!specs) return [];
  return buildLifePhotos(caseId, specs);
}
