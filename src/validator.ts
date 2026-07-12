import type { CaseFile } from "./types";

/**
 * Build-time (and dev-startup) content validator. Bad case data must fail
 * loudly here, never at runtime in front of a player.
 */

export interface CitableItem {
  id: string;
  label: string;
  appId: string;
  /** Id whose "viewed" state discovers this evidence (e.g. thread id for a message). */
  discoveredBy: string;
}

/** Every id in a case that other ids may reference. */
export function collectIds(c: CaseFile): Set<string> {
  const ids = new Set<string>();
  const add = (id: string, what: string) => {
    if (ids.has(id)) throw new CaseValidationError(c.id, `duplicate id "${id}" (${what})`);
    ids.add(id);
  };
  for (const t of c.messages) {
    add(t.id, "thread");
    for (const m of t.messages) add(m.id, "message");
  }
  for (const p of c.photos) add(p.id, "photo");
  for (const n of c.notes) add(n.id, "note");
  for (const v of c.voicemails) add(v.id, "voicemail");
  for (const e of c.calendarEvents) add(e.id, "calendar event");
  for (const pin of c.locationPins) add(pin.id, "map pin");
  for (const s of c.browserHistory) add(s.id, "search entry");
  for (const le of c.liveEvents) {
    add(le.id, "live event");
    if (le.kind === "message") add(le.message.id, "live message");
  }
  add(`${c.id}.hidden`, "hidden app");
  return ids;
}

export function citableEvidence(c: CaseFile): CitableItem[] {
  const items: CitableItem[] = [];
  for (const t of c.messages) {
    for (const m of t.messages) {
      if (m.evidenceLabel) {
        items.push({ id: m.id, label: m.evidenceLabel, appId: "messages", discoveredBy: t.id });
      }
    }
  }
  for (const le of c.liveEvents) {
    if (le.kind === "message" && le.message.evidenceLabel) {
      items.push({
        id: le.message.id,
        label: le.message.evidenceLabel,
        appId: "messages",
        discoveredBy: le.threadId,
      });
    }
  }
  for (const p of c.photos) {
    if (p.evidenceLabel) items.push({ id: p.id, label: p.evidenceLabel, appId: "photos", discoveredBy: p.id });
  }
  for (const n of c.notes) {
    if (n.evidenceLabel) items.push({ id: n.id, label: n.evidenceLabel, appId: "notes", discoveredBy: n.id });
  }
  for (const v of c.voicemails) {
    if (v.evidenceLabel) items.push({ id: v.id, label: v.evidenceLabel, appId: "phone", discoveredBy: v.id });
  }
  for (const e of c.calendarEvents) {
    if (e.evidenceLabel) items.push({ id: e.id, label: e.evidenceLabel, appId: "calendar", discoveredBy: e.id });
  }
  for (const pin of c.locationPins) {
    if (pin.evidenceLabel) items.push({ id: pin.id, label: pin.evidenceLabel, appId: "maps", discoveredBy: pin.id });
  }
  for (const s of c.browserHistory) {
    if (s.evidenceLabel) items.push({ id: s.id, label: s.evidenceLabel, appId: "browser", discoveredBy: s.id });
  }
  items.push({
    id: `${c.id}.hidden`,
    label: c.hiddenApp.evidenceLabel,
    appId: "hidden",
    discoveredBy: `${c.id}.hidden`,
  });
  return items;
}

export class CaseValidationError extends Error {
  constructor(caseId: string, problem: string) {
    super(`[case "${caseId}"] ${problem}`);
    this.name = "CaseValidationError";
  }
}

export function validateCase(c: CaseFile): void {
  const fail = (problem: string): never => {
    throw new CaseValidationError(c.id, problem);
  };

  const ids = collectIds(c);
  const citable = new Set(citableEvidence(c).map((i) => i.id));

  const checkTs = (iso: string, where: string) => {
    if (Number.isNaN(Date.parse(iso))) fail(`unparseable timestamp "${iso}" in ${where}`);
  };

  checkTs(c.phone.recoveredAt, "phone.recoveredAt");
  if (c.phone.batteryStart < 5 || c.phone.batteryStart > 100) {
    fail(`batteryStart ${c.phone.batteryStart} out of range`);
  }

  for (const t of c.messages) {
    if (t.messages.length === 0) fail(`thread "${t.id}" has no messages`);
    for (const m of t.messages) checkTs(m.timestamp, `message "${m.id}"`);
  }
  for (const p of c.photos) checkTs(p.timestamp, `photo "${p.id}"`);
  for (const v of c.voicemails) checkTs(v.timestamp, `voicemail "${v.id}"`);
  for (const s of c.browserHistory) checkTs(s.timestamp, `search "${s.id}"`);
  for (const pin of c.locationPins) {
    checkTs(pin.timestamp, `pin "${pin.id}"`);
    if (pin.x < 0 || pin.x > 100 || pin.y < 0 || pin.y > 100) {
      fail(`pin "${pin.id}" coordinates out of 0–100 range`);
    }
  }
  for (const e of c.calendarEvents) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) fail(`calendar event "${e.id}" date must be YYYY-MM-DD`);
  }

  // Locked notes: 4-digit codes with a discoverable clue path inside this case.
  for (const n of c.notes) {
    if (!n.lock) continue;
    if (!/^\d{4}$/.test(n.lock.code)) fail(`locked note "${n.id}" code must be exactly 4 digits`);
    if (n.lock.clueSourceIds.length === 0) {
      fail(`locked note "${n.id}" has no clue sources — code would be unguessable`);
    }
    for (const src of n.lock.clueSourceIds) {
      if (!ids.has(src)) fail(`locked note "${n.id}" references missing clue source "${src}"`);
      if (src === n.id) fail(`locked note "${n.id}" cannot be its own clue source`);
    }
  }

  // Hidden app reveal path must exist.
  if (c.hiddenApp.revealAfterClueIds.length === 0) {
    fail("hiddenApp.revealAfterClueIds is empty — the hidden app could never be found");
  }
  for (const src of c.hiddenApp.revealAfterClueIds) {
    if (!ids.has(src)) fail(`hiddenApp references missing clue id "${src}"`);
  }

  // Live events must target real threads.
  for (const le of c.liveEvents) {
    if (le.kind === "message" && !c.messages.some((t) => t.id === le.threadId)) {
      fail(`live event "${le.id}" targets missing thread "${le.threadId}"`);
    }
  }

  // Lock-screen notifications must deep-link to real content.
  for (const n of c.phone.lockScreenNotifications) {
    if (!ids.has(n.targetId)) fail(`lock notification targets missing id "${n.targetId}"`);
  }

  // Verdicts: evidence must be citable, exactly one canon ending.
  if (c.verdicts.length < 3) fail("a case needs at least 3 verdicts");
  const canon = c.verdicts.filter((v) => v.isCanon);
  if (canon.length !== 1) fail(`expected exactly 1 canon verdict, found ${canon.length}`);
  for (const v of c.verdicts) {
    if (v.requiredEvidenceIds.length === 0) fail(`verdict "${v.id}" cites no evidence`);
    for (const ev of v.requiredEvidenceIds) {
      if (!citable.has(ev)) {
        fail(`verdict "${v.id}" requires "${ev}" which is not a citable evidence item`);
      }
    }
  }
}

export function validateAll(cases: CaseFile[]): void {
  const seen = new Set<string>();
  for (const c of cases) {
    if (seen.has(c.id)) throw new CaseValidationError(c.id, "duplicate case id");
    seen.add(c.id);
    validateCase(c);
  }
}
