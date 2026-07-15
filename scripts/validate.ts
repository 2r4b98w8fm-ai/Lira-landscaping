/**
 * Build-time content validation: `npm run validate`.
 * Loads every case through the manifest, validates schema invariants
 * (unsolvable locks, dangling ids, non-citable verdict evidence, bad
 * timestamps), and fails if manifest metadata drifts from a case file.
 */
import { CASE_MANIFEST, loadAllCases } from "../src/cases";
import { validateAll } from "../src/validator";

try {
  const cases = await loadAllCases();
  validateAll(cases);
  for (const [i, entry] of CASE_MANIFEST.entries()) {
    const c = cases[i];
    for (const field of ["id", "title", "victimName", "contentWarningLevel"] as const) {
      if (entry[field] !== c[field]) {
        throw new Error(
          `manifest drift for "${entry.id}": ${field} is ${JSON.stringify(entry[field])} in manifest but ${JSON.stringify(c[field])} in case file`,
        );
      }
    }
  }
  console.log(`✓ ${cases.length} case(s) validated: ${cases.map((c) => c.id).join(", ")}`);
} catch (err) {
  console.error(String(err));
  process.exit(1);
}
