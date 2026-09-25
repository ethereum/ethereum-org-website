/**
 * Pages worth offering as a next step, beside the answer.
 *
 * Some questions are better served by a tool than by prose. "Best wallet" has no correct
 * answer -- the page that compares them does -- and an answer that says so in a sentence
 * still leaves the reader to notice the citation and guess where it goes. The link is
 * labelled with what the page does rather than what it is called.
 *
 * Keyed by path, and offered only when that page is already among the excerpts, so this
 * never invents a destination the answer was not grounded in.
 */
export const ASK_FOLLOWUPS: Record<string, string> = {
  "/wallets/find-wallet/": "Compare Ethereum wallets by feature",
  "/get-eth/": "Find where to buy ETH in your country",
  "/layer-2/networks/": "Compare layer 2 networks",
  "/staking/": "Compare ways to stake ETH",
}
