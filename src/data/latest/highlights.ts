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
    date: "2026-05-12",
  },
  {
    // External highlight (test): real EF blog post — exercises external `href`
    // routing (new tab + icon via BaseLink), an external `source` label, and a
    // remote image on an allowlisted domain (storage.googleapis.com).
    title: "Protocol Cluster Updates: May 2026",
    description:
      "A semi-regular gathering of Ethereum core devs from various client teams recap recent interop progress.",
    image:
      "https://storage.googleapis.com/ethereum-hackmd/upload_270c7c873d5994bd4e47958030e3599c.png",
    href: "https://blog.ethereum.org/en/2026/05/11/protocol-update-may-26",
    source: "Ethereum Foundation",
    date: "2026-05-11",
  },
]
