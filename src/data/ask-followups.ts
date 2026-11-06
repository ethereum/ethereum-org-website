/**
 * Pages offered as a next step when the answer's first citation is one of them: a tool
 * serves "best wallet" better than prose can. Values are `common` message keys.
 */
export const ASK_FOLLOWUPS = {
  "/wallets/find-wallet/": "docsearch-ask-followup-wallets",
  "/get-eth/": "docsearch-ask-followup-get-eth",
  "/layer-2/networks/": "docsearch-ask-followup-layer-2",
  "/staking/": "docsearch-ask-followup-staking",
} as const

export type AskFollowupPath = keyof typeof ASK_FOLLOWUPS
