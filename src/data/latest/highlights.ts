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
  { href: "/latest/next-great-wallet-private" },
  {
    // External highlight: Local Ethereum newsletter. Resolves from the RSS
    // feed while in-window; fallback copy/imagery keeps the slot filled once
    // it ages out.
    href: "https://localethereum.substack.com/p/local-ethereum-17",
    title: "Local Ethereum #17",
    description: "CROPS, CLARITY, and the Road Ahead.",
    image:
      "https://substack-post-media.s3.amazonaws.com/public/images/97a8c107-1161-4e86-a875-d49a92e0de70_3148x2096.png",
    source: "Local Ethereum",
    date: "2026-06-04",
  },
]
