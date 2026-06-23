import type { LatestHighlight } from "@/lib/types"

/**
 * Editorial highlights shown above the article grid.
 *
 * Each entry is just an `href` — the card's metadata (title, description,
 * image, date, source) is resolved at build time from the matching article in
 * the merged /latest stream, so there's nothing to keep in sync by hand. The
 * matched article is de-duplicated out of the grid below.
 *
 * Add optional fields only to override the resolved copy/imagery for the
 * feature slot, or as a standalone fallback for an external href that may age
 * out of the RSS window (a `title` is the minimum needed to render then).
 *
 * Changes ship via deploy (rebuild picks them up). Keep to 2 entries.
 */
export const LATEST_HIGHLIGHTS: LatestHighlight[] = [
  { href: "/latest/privacy-apps-on-ethereum" },
  {
    // External highlight: a real EF blog post. It resolves from the RSS feed
    // while it's in-window; the fallback copy/imagery below keeps the slot
    // filled once it ages out.
    href: "https://blog.ethereum.org/en/2026/05/11/protocol-update-may-26",
    title: "Protocol Cluster Updates: May 2026",
    description:
      "A semi-regular gathering of Ethereum core devs from various client teams recap recent interop progress.",
    image:
      "https://storage.googleapis.com/ethereum-hackmd/upload_270c7c873d5994bd4e47958030e3599c.png",
    source: "Ethereum Foundation",
    date: "2026-05-11",
  },
]
