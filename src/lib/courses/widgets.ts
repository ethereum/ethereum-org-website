import type { CourseWidgetId } from "@/data/courses"

export const WIDGET_KEY_PREFIX = "page-courses-widget-"

/** Controls shared by every sort skin (`widgets/sort-widget.tsx`) */
const SORT = "sort"
/** Controls shared by every spot-the-risk skin (`widgets/risk-spot-widget.tsx`) */
const RISK = "risk"

/**
 * The `page-courses-widget-` strings each widget reads, by name: `"gas"`
 * stands for `page-courses-widget-gas` and every `page-courses-widget-gas-*`
 * key. A lesson page sends only its widgets' strings, so a missing name shows
 * the raw key; `tests/unit/courses/messages.spec.ts` reads each widget's
 * source and fails on any string outside its list.
 */
export const WIDGET_KEYS: Record<CourseWidgetId, readonly string[]> = {
  "eip-sort": ["eip-sort", SORT],
  "client-bug": ["client-bug"],
  "account-sort": ["account-sort", SORT],
  "account-rules": ["account-rules"],
  "delegation-check": ["delegation"],
  "key-pair": ["key"],
  "gas-fee": ["gas"],
  "sign-verify": ["sign"],
  "block-builder": ["block"],
  "hash-playground": ["hash"],
  "chain-tamper": ["chain"],
  "address-check": ["address", "site"],
  "custody-sort": ["custody", SORT],
  "node-network": ["node"],
  "node-world": ["node"],
  "next-page": ["next-page"],
  "chain-sort": ["chain-sort", SORT],
  "track-sort": ["track-sort", SORT],
  "finality-clock": ["finality"],
  "slot-calc": ["slot-calc"],
  "base-fee": ["base-fee"],
  "nonce-queue": ["nonce"],
  "ether-sort": ["ether-sort", SORT],
  "validator-sort": ["validator-sort", SORT],
  "gas-limit": ["limit"],
  "explorer-labels": ["explorer"],
  "unit-converter": ["units"],
  "supply-balance": ["supply"],
  "wrap-eth": ["wrap", "bridge"],
  "fee-lanes": ["lanes"],
  "parcel-pack": ["parcels"],
  "network-match": ["networks"],
  "bridge-move": ["bridge", "wrap"],
  "wallet-network": ["wallet-network"],
  "rollup-replay": ["replay"],
  "fraud-challenge": ["challenge", "replay-eth", "replay-name", "replay-tx"],
  "proof-check": ["proof", "replay-eth", "replay-name"],
  "exit-race": ["exit", "replay-eth"],
  "bridge-backing": ["backing", "replay-eth"],
  "call-sorter": ["calls"],
  "token-ledger": ["ledger"],
  "approval-scope": ["approval"],
  "token-check": ["token-check"],
  "backing-sort": ["backing-sort", SORT],
  "backing-vaults": ["backing-vaults"],
  "token-lure": ["token-lure"],
  "nft-ledger": ["nft-ledger", "ledger-name"],
  "nft-host": ["nft-host"],
  "nft-proof": ["nft-proof"],
  "name-check": ["name-check"],
  "nft-approval": ["nft-approval"],
  "pool-swap": ["pool"],
  "swap-limit": ["slippage"],
  collateral: ["collateral"],
  "reward-sort": ["reward-sort", SORT],
  "red-flag-sort": ["red-flag-sort", SORT],
  "site-check": ["site", "address"],
  "sign-request": ["sign-request", RISK],
  "claim-site": ["claim-site", RISK],
  "fee-meter": ["fee-meter"],
  "next-block": ["next-block"],
  "failed-sorter": ["failed", "calls"],
  "jar-contract": ["jar"],
  "shared-notebook": ["notebook"],
  mailbox: ["mailbox"],
  "snack-machine": ["vending"],
  "cash-sort": ["cash-sort", SORT],
  postage: ["postage"],
  "spare-key-sort": ["spare-key-sort", SORT],
  "restore-wallet": ["restore"],
  "phrase-sort": ["phrase-sort", SORT],
  "popup-sort": ["popup-sort", SORT],
}

/** Whether `key` is one of the strings these widgets read */
export const isWidgetKeyFor = (key: string, ids: readonly CourseWidgetId[]) =>
  ids.some((id) =>
    WIDGET_KEYS[id].some((name) => {
      const base = WIDGET_KEY_PREFIX + name
      return key === base || key.startsWith(`${base}-`)
    })
  )
