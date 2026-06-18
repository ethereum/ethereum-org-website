import type { LatestSource } from "@/lib/types"

/**
 * Curated content sources for the /latest page.
 *
 * Single source of truth for BOTH:
 *  - RSS ingestion (every entry has a `feed`), and
 *  - the "Read more on these websites" directory (renders every entry).
 *
 * v1 ships a small set of clean, working feeds that need no per-item
 * filtering. Remaining sources from the feed spreadsheet (and feeds that
 * require a `categoryFilter`, e.g. Besu) are added post-v1.
 *
 * `category` is the publication-wide tag shown on every item from that feed
 * and is one of the curated filter facets. Assigned by hand (the source list
 * has no category column) — tune freely.
 */
export const LATEST_SOURCES: LatestSource[] = [
  {
    name: "Ethereum Foundation",
    link: "https://blog.ethereum.org/",
    feed: "https://blog.ethereum.org/feed.xml",
    category: "Foundation",
  },
  {
    name: "ethPandaOps",
    link: "https://ethpandaops.io/posts/",
    feed: "https://ethpandaops.io/posts/rss.xml",
    category: "Protocol",
  },
  {
    name: "Solidity",
    link: "https://soliditylang.org/blog/",
    feed: "https://soliditylang.org/feed.xml",
    category: "Dev tooling",
  },
  {
    name: "Vitalik Buterin",
    link: "https://vitalik.eth.limo/",
    feed: "https://vitalik.eth.limo/feed.xml",
    category: "Research",
  },
  {
    name: "Ethereal",
    link: "https://ethereal.news/",
    feed: "https://ethereal.news/rss.xml",
    category: "Newsletters",
  },
]

/** Category bucket for first-party builder articles. */
export const BUILDER_CATEGORY = "Ethereum.org"

/** Trailing window (days) of RSS history retained at fetch time. */
export const LATEST_RSS_WINDOW_DAYS = 30

/** Per-source display cap applied at the consumer (not the fetcher). */
export const LATEST_MAX_PER_SOURCE = 3
