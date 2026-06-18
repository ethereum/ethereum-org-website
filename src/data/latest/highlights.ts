import type { LatestHighlight } from "@/lib/types"

/**
 * Hardcoded editorial highlights shown above the article grid.
 *
 * Standalone entries (not references) so a highlight can point at an internal
 * builder article OR an external resource, with copy/imagery tuned for the
 * feature slot. `href` is polymorphic — `BaseLink` handles internal routing vs
 * external (new tab + icon). Entries whose `href` matches a grid item are
 * de-duplicated out of the grid.
 *
 * Changes ship via deploy (rebuild picks them up). Keep to 2 entries.
 */
export const LATEST_HIGHLIGHTS: LatestHighlight[] = [
  {
    title: "How to build privacy apps on Ethereum with zero-knowledge proofs",
    description:
      "A practical guide to designing privacy-preserving applications on Ethereum using zero-knowledge proofs.",
    image: "/images/developers/blog/latest-post-header-2.png",
    href: "/latest/privacy-apps-on-ethereum",
    source: "Ethereum.org",
  },
  {
    title: "Building on Ethereum in 2026: what has changed",
    description:
      "The tooling, infrastructure, and developer experience improvements reshaping how teams build on Ethereum.",
    image: "/images/developers/blog/latest-post-header-3.png",
    href: "/latest/building-on-ethereum-in-2026",
    source: "Ethereum.org",
  },
]
