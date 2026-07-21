import type { Photo } from "../types";
import { mulberry32, seedFrom } from "../lib/rng";

/**
 * Generates a large, realistic camera roll of everyday photos for a case —
 * real photographs fetched at runtime from LoremFlickr (keyword-matched,
 * free, no key), each with a unique lock so no two repeat and a drawn
 * gradient fallback behind it for offline/failure. Evidence shots (authored
 * in the case files) stay as art and stand out as the few "case" photos.
 */

interface Kind {
  /** LoremFlickr keyword(s). */
  kw: string;
  caps: string[];
  /** Preferred framing; most phone photos are portrait. */
  aspect?: "landscape" | "portrait";
}

const KINDS: Record<string, Kind> = {
  coffee: { kw: "coffee,latte", caps: ["morning fuel ☕", "the good stuff", "first of three, don't judge", "cortado weather", "café by the place", "this is my personality now"] },
  brunch: { kw: "brunch,breakfast", aspect: "landscape", caps: ["worth the wait", "sunday reset", "treated myself", "this actually slaps", "eggs done right for once", "breakfast for dinner rights"] },
  food: { kw: "food,dinner", aspect: "landscape", caps: ["homemade!!", "recipe worked for ONCE", "leftovers are a love language", "10/10 would inhale again", "cooking era"] },
  dessert: { kw: "dessert,cake", caps: ["balanced diet", "yes all of it", "sugar rush incoming", "birthday cake energy", "the little things"] },
  dog: { kw: "dog,puppy", caps: ["he owns me", "best boy no notes", "my whole heart 🐶", "stop being perfect", "co-worker of the day", "guarding nothing, valiantly"] },
  cat: { kw: "cat,kitten", aspect: "landscape", caps: ["she tolerates me", "loaf achieved", "judgmental king", "2am gremlin hours", "sunbeam supervisor"] },
  sunset: { kw: "sunset,sky", aspect: "landscape", caps: ["every single night man", "no filter needed", "pulled over for this", "she never misses", "golden hour tax paid", "sky did a thing"] },
  beach: { kw: "beach,ocean", aspect: "landscape", caps: ["salt therapy", "needed this", "cold but worth it", "found the good spot", "vitamin sea"] },
  city: { kw: "city,street", aspect: "landscape", caps: ["this city man", "late night walk", "home", "3am and alive", "the block hits different tonight"] },
  nature: { kw: "forest,trail", aspect: "landscape", caps: ["touched grass, literally", "reset button pressed", "legs dead, worth it", "quiet for once", "trail therapy"] },
  flowers: { kw: "flowers,bouquet", caps: ["for no reason", "corner stand find", "these opened today", "cheered me right up", "peak bloom"] },
  plant: { kw: "houseplant,plant", caps: ["new baby", "somehow still alive", "the jungle grows", "repotting sunday", "she's thriving unlike me"] },
  friends: { kw: "friends,party", aspect: "landscape", caps: ["my people", "chaos crew reunited", "missed these idiots", "no context needed", "the group chat irl"] },
  selfie: { kw: "portrait,face", caps: ["new haircut who dis", "tired but cute", "felt cute", "0 sleep, 100% that", "unserious", "for the archives"] },
  car: { kw: "car,road", aspect: "landscape", caps: ["her and me", "road trip szn", "finally, new wheels", "dashboard sunsets", "clean for exactly one day"] },
  gym: { kw: "gym,fitness", caps: ["leg day regrets", "small progress counts", "5am club unfortunately", "one more set", "post-workout glow (sweat)"] },
  concert: { kw: "concert,music", aspect: "landscape", caps: ["ears still ringing", "best night", "front row baby", "screamed every word", "live music heals"] },
  drink: { kw: "cocktail,bar", caps: ["earned it", "friday finally", "one drink turned into five", "cheers to nothing", "the good bar"] },
  park: { kw: "park,picnic", aspect: "landscape", caps: ["perfect day for it", "blanket + snacks + nap", "sunday in the park", "everyone came out today"] },
  rain: { kw: "rain,window", caps: ["cozy day confirmed", "window seat weather", "sound is unmatched", "stayed in, no regrets"] },
  books: { kw: "books,library", caps: ["new stack", "finally finished this one", "library haul", "reading era", "the good chair + this"] },
  mountains: { kw: "mountains,landscape", aspect: "landscape", caps: ["made it to the top", "worth every step", "big sky country", "this view unlocked something"] },
  street: { kw: "streetlight,night", caps: ["walking home", "quiet streets", "the light was doing something", "no one out but me"] },
  neon: { kw: "neon,sign", caps: ["signs", "loved this little spot", "the aesthetic", "midnight snack run"] },
};

interface Persona {
  /** Ordered/weighted kind list (repeats = more frequent). */
  kinds: string[];
}

// Interests per victim, biasing the roll toward who they were.
const PERSONAS: Record<string, Persona> = {
  "case-01": { kinds: ["coffee", "coffee", "plant", "cat", "friends", "sunset", "city", "brunch", "selfie", "flowers", "books", "street", "rain", "food"] },
  "case-02": { kinds: ["car", "car", "city", "coffee", "sunset", "friends", "dog", "brunch", "neon", "street", "food", "drink", "selfie"] },
  "case-03": { kinds: ["flowers", "flowers", "plant", "brunch", "dessert", "park", "friends", "sunset", "coffee", "books", "food", "nature"] },
  "case-04": { kinds: ["coffee", "friends", "city", "neon", "selfie", "dog", "brunch", "dessert", "street", "concert", "food", "drink"] },
  "case-05": { kinds: ["dog", "car", "brunch", "food", "friends", "sunset", "gym", "dessert", "city", "coffee", "park"] },
  "case-06": { kinds: ["friends", "gym", "coffee", "concert", "brunch", "city", "books", "selfie", "drink", "food", "dog"] },
  "case-07": { kinds: ["car", "city", "friends", "brunch", "sunset", "dog", "coffee", "neon", "food", "drink", "street"] },
  "case-08": { kinds: ["selfie", "friends", "coffee", "dog", "beach", "concert", "brunch", "dessert", "flowers", "cat", "city"] },
  "case-09": { kinds: ["dog", "car", "nature", "mountains", "brunch", "park", "coffee", "flowers", "food", "books", "friends"] },
  "case-10": { kinds: ["plant", "coffee", "sunset", "mountains", "nature", "friends", "brunch", "cat", "beach", "flowers", "books"] },
  "case-11": { kinds: ["friends", "beach", "car", "brunch", "sunset", "dog", "city", "concert", "food", "drink", "park"] },
  "case-12": { kinds: ["dog", "dog", "cat", "coffee", "friends", "brunch", "plant", "flowers", "park", "dessert", "selfie"] },
  "case-13": { kinds: ["car", "city", "brunch", "coffee", "gym", "sunset", "food", "neon", "street", "friends", "drink"] },
  "case-14": { kinds: ["sunset", "sunset", "mountains", "car", "nature", "friends", "brunch", "dog", "coffee", "city", "park"] },
  "case-15": { kinds: ["coffee", "books", "plant", "friends", "brunch", "city", "flowers", "dessert", "selfie", "street", "food"] },
};

function fallbackSvg(seed: number, aspect: "landscape" | "portrait"): string {
  const w = aspect === "landscape" ? 400 : 300;
  const h = aspect === "landscape" ? 300 : 400;
  const hue = seed % 360;
  const id = `f${seed % 100000}`;
  return (
    `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${hue} 24% 30%)"/>` +
    `<stop offset="1" stop-color="hsl(${(hue + 40) % 360} 28% 16%)"/></linearGradient></defs>` +
    `<rect width="${w}" height="${h}" fill="url(#${id})"/>` +
    `<circle cx="${w * 0.7}" cy="${h * 0.3}" r="${w * 0.18}" fill="#fff" opacity="0.05"/>` +
    `</svg>`
  );
}

function flickrUrl(kw: string, lock: number, aspect: "landscape" | "portrait"): string {
  const w = aspect === "landscape" ? 640 : 480;
  const h = aspect === "landscape" ? 480 : 640;
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}?lock=${lock}`;
}

/**
 * Build `count` everyday photos for a case, timestamped across the months
 * leading up to `recoveredAt`, biased to the victim's interests.
 */
export function generateLifePhotos(caseId: string, recoveredAt: string, count = 58): Photo[] {
  const persona = PERSONAS[caseId] ?? { kinds: ["coffee", "friends", "sunset", "city", "food", "dog", "brunch", "selfie"] };
  const rand = mulberry32(seedFrom(`${caseId}.roll`));
  const end = Date.parse(recoveredAt);
  const spanMs = 150 * 24 * 3600 * 1000; // ~5 months of history
  const usedCaps = new Set<string>();
  const photos: Photo[] = [];

  for (let i = 0; i < count; i++) {
    const kindKey = persona.kinds[Math.floor(rand() * persona.kinds.length)];
    const kind = KINDS[kindKey];
    const aspect = kind.aspect ?? (rand() > 0.72 ? "landscape" : "portrait");
    // pick a caption, avoiding immediate repeats where possible
    let caption = kind.caps[Math.floor(rand() * kind.caps.length)];
    for (let t = 0; t < 3 && usedCaps.has(caption); t++) {
      caption = kind.caps[Math.floor(rand() * kind.caps.length)];
    }
    usedCaps.add(caption);
    const lock = seedFrom(`${caseId}.${i}.${kindKey}`) % 90000;
    const when = new Date(end - Math.floor(rand() * spanMs) - 2 * 24 * 3600 * 1000).toISOString();
    photos.push({
      id: `${caseId}-roll-${i}`,
      caption,
      timestamp: when,
      aspect,
      meta: { takenAt: when, device: "This phone" },
      svg: fallbackSvg(lock + i, aspect),
      photoUrl: flickrUrl(kind.kw, lock, aspect),
    });
  }
  return photos;
}
