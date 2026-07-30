import type { SuggestedOffer } from "@/types/domain";

/**
 * A clean plain-text summary of a trade offer, meant to be pasted directly
 * into league chat (GroupMe, Discord, Sleeper) to actually propose it —
 * written addressed to the other manager, not as an internal summary.
 */
export function formatOfferAsText(offer: SuggestedOffer): string {
  const lines = [
    `Trade offer for ${offer.targetTeamName}:`,
    `• I send: ${offer.give.map((tv) => tv.player.name).join(", ")}`,
    `• You send: ${offer.receive.map((tv) => tv.player.name).join(", ")}`,
  ];
  if (offer.favorsThem) {
    lines.push(`This favors you value-wise — let me know if you're in.`);
  }
  if (offer.dropCandidates.length > 0) {
    lines.push(`(I'd drop ${offer.dropCandidates.map((tv) => tv.player.name).join(", ")} to make roster room after.)`);
  }
  return lines.join("\n");
}
