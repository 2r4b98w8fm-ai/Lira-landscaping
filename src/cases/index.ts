import type { CaseFile } from "../types";

/**
 * Case manifest: lightweight metadata for the archive screen plus a lazy
 * loader per case. Case data files are code-split — a case's ~40KB of
 * content is only fetched when the player opens it.
 *
 * The metadata here is duplicated from each case file on purpose (the
 * archive must render without loading any case); `npm run validate`
 * fails the build if a manifest entry drifts from its case file.
 */
export interface CaseManifestEntry {
  id: string;
  title: string;
  victimName: string;
  contentWarningLevel: 1 | 2 | 3;
  /** One-line archive teaser (the full summary lives in the case file). */
  deck: string;
  load: () => Promise<CaseFile>;
}

export const CASE_MANIFEST: CaseManifestEntry[] = [
  {
    id: "case-01",
    title: "The Static Line",
    victimName: "Wren Castellan, 26",
    contentWarningLevel: 2,
    deck: "Three weeks in Unit 4B, above a flower shop that never reopens. The door was locked from inside.",
    load: () => import("./case01").then((m) => m.default),
  },
  {
    id: "case-02",
    title: "Rideshare, One Star",
    victimName: "Mara Quist, 31",
    contentWarningLevel: 2,
    deck: "Her last passenger isn't in any system. He knew her schedule better than she did.",
    load: () => import("./case02").then((m) => m.default),
  },
  {
    id: "case-03",
    title: "Grief Group",
    victimName: "Edith Marsh, 58",
    contentWarningLevel: 2,
    deck: "A support circle that promises you'll never carry it alone — for exactly one year.",
    load: () => import("./case03").then((m) => m.default),
  },
  {
    id: "case-04",
    title: "The Last Customer",
    victimName: "June Pell, 24",
    contentWarningLevel: 3,
    deck: "Same booth, same order, exact change, every night since 1961. Her photos of him never come out.",
    load: () => import("./case04").then((m) => m.default),
  },
  {
    id: "case-05",
    title: "Second Shift",
    victimName: "Omar Reyes-Vance, 34",
    contentWarningLevel: 2,
    deck: "His badge keeps clocking into a shift payroll cancelled months ago. His truck never left the lot.",
    load: () => import("./case05").then((m) => m.default),
  },
  {
    id: "case-06",
    title: "The Sleep Study",
    victimName: "Casey Brandt, 20",
    contentWarningLevel: 2,
    deck: "$150 a night, cash, to sleep in a building the university says has been empty since 2021.",
    load: () => import("./case06").then((m) => m.default),
  },
  {
    id: "case-07",
    title: "Last Delivery",
    victimName: "Andre Boudreaux, 29",
    contentWarningLevel: 2,
    deck: "Thirty-four deliveries to an address that doesn't exist. The van came back without him.",
    load: () => import("./case07").then((m) => m.default),
  },
  {
    id: "case-08",
    title: "The Babysitting App",
    victimName: "Maddie Okafor, 17",
    contentWarningLevel: 3,
    deck: "Five sits for a verified family at a condemned address. The one rule: never check on the children.",
    load: () => import("./case08").then((m) => m.default),
  },
  {
    id: "case-09",
    title: "Neighborhood Watch",
    victimName: "Hal Brennan, 45",
    contentWarningLevel: 2,
    deck: "He filed 214 tips on his neighbors. Then the tips started being about him.",
    load: () => import("./case09").then((m) => m.default),
  },
  {
    id: "case-10",
    title: "The Wellness Retreat",
    victimName: "Farrah Haddad, 34",
    contentWarningLevel: 2,
    deck: "Her phone synced one final batch — from a meadow the retreat insists doesn't exist.",
    load: () => import("./case10").then((m) => m.default),
  },
  {
    id: "case-11",
    title: "The Reunion Thread",
    victimName: "Marcus Bell, 33",
    contentWarningLevel: 3,
    deck: "The group chat is lively. The friends stopped being the ones typing, one by one, in order.",
    load: () => import("./case11").then((m) => m.default),
  },
  {
    id: "case-12",
    title: "Dog Walker",
    victimName: "Sadie Kwan, 26",
    contentWarningLevel: 2,
    deck: "Twenty-minute walks. Hours inside. The dog kept pawing a wall the floor plan calls empty.",
    load: () => import("./case12").then((m) => m.default),
  },
  {
    id: "case-13",
    title: "The Landlord's Other Building",
    victimName: "Milo Grieves, 41",
    contentWarningLevel: 2,
    deck: "He rented out the tunnels under five buildings to a buyer who pays odd numbers. The last payment cleared at 11:03 PM.",
    load: () => import("./case13").then((m) => m.default),
  },
  {
    id: "case-14",
    title: "Storm Chaser",
    victimName: "Wade Kessler, 37",
    contentWarningLevel: 2,
    deck: "A violent supercell only his app can see, parked over the same field — for thirty-eight years.",
    load: () => import("./case14").then((m) => m.default),
  },
  {
    id: "case-15",
    title: "Group Project",
    victimName: "Pris Navarro, 27",
    contentWarningLevel: 2,
    deck: "A late-night study call whose participants' numbers were never issued. The math was excellent.",
    load: () => import("./case15").then((m) => m.default),
  },
];

/**
 * Weave each victim's everyday photos into their camera roll. Done here (not
 * in the case files) so every case gains a realistic roll from one place; the
 * Photos app sorts by timestamp, so life and evidence shots interleave.
 */
async function injectLifePhotos(caseFile: CaseFile): Promise<CaseFile> {
  const { lifePhotosFor } = await import("./lifespecs");
  const life = lifePhotosFor(caseFile.id);
  if (life.length) caseFile.photos = [...caseFile.photos, ...life];
  return caseFile;
}

/** Load a single case with its life photos woven in. */
export async function loadCase(entry: CaseManifestEntry): Promise<CaseFile> {
  return injectLifePhotos(await entry.load());
}

/** Load every case (validator + dev checks). Production UI never calls this. */
export async function loadAllCases(): Promise<CaseFile[]> {
  return Promise.all(CASE_MANIFEST.map((entry) => loadCase(entry)));
}
