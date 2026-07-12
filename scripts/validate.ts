/**
 * Build-time content validation: `npm run validate`.
 * Fails the build if any case references missing ids, has an unsolvable
 * lock, cites non-citable evidence, or breaks any other schema invariant.
 */
import { ALL_CASES } from "../src/cases";
import { validateAll } from "../src/validator";

try {
  validateAll(ALL_CASES);
  console.log(`✓ ${ALL_CASES.length} case(s) validated: ${ALL_CASES.map((c) => c.id).join(", ")}`);
} catch (err) {
  console.error(String(err));
  process.exit(1);
}
