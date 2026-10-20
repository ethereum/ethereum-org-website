import type { PrivacyLessonFixId } from "@/lib/types"

/**
 * Per-fix rich-text targets: glossary anchors used by `<glossary>` tags in the
 * fix copy, and the href for each card's "learn more" `<link>`.
 */
export const fixGlossary: Partial<
  Record<
    PrivacyLessonFixId,
    Partial<Record<"what" | "protects" | "costs", string>>
  >
> = {
  wallet: { costs: "rpc" },
  privtx: { what: "block-builder", protects: "mempool" },
  ens: { what: "ens" },
  stealth: { what: "stealth-address" },
  pool: { what: "shielded-pool", protects: "zk-proof" },
  node: { what: "node" },
}

export const fixLearnMoreHref: Record<PrivacyLessonFixId, string> = {
  wallet: "/wallets/find-wallet/",
  privtx: "/developers/docs/mev/",
  browser: "/privacy/online/",
  ens: "/privacy/ethereum/",
  tor: "/privacy/online/",
  separate: "/roadmap/privacy/",
  timing: "#analysts",
  stealth: "/privacy/ethereum/",
  cex: "/privacy/ethereum/",
  pool: "/privacy/ethereum/",
  node: "/run-a-node/",
}
