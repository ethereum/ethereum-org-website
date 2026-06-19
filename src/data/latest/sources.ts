import type { LatestSource } from "@/lib/types"

/**
 * Curated content sources for the /latest page.
 *
 * Single source of truth for BOTH:
 *  - RSS ingestion (every entry has a `feed`), and
 *  - the "Read more on these websites" directory (renders every entry).
 *
 * The list is the working subset of the curated feed spreadsheet: every entry
 * here has a feed that fetches and parses cleanly. Sources from the spreadsheet
 * with no live feed yet (IPTF, Protocol Consensus) are omitted until their feed
 * exists; feedless entries (Devcon, Offchain, Erigon, Nethermind, RIG) are not
 * listed.
 *
 * `category` is the publication-wide facet shown on every item from that feed
 * and drives the filter chips. Assigned by hand (the spreadsheet has no category
 * column) — tune freely.
 */
export const LATEST_SOURCES: LatestSource[] = [
  {
    name: "Ethereum Foundation",
    link: "https://blog.ethereum.org/",
    feed: "https://blog.ethereum.org/feed.xml",
    category: "Foundation",
  },
  {
    name: "Ethereum Cat Herders",
    link: "https://blog.echinstitute.org/",
    feed: "https://blog.echinstitute.org/feed.xml",
    category: "Protocol",
  },
  {
    name: "Protocol Support",
    link: "https://ps.ethereum.foundation/blog",
    feed: "https://ps.ethereum.foundation/feed.xml",
    category: "Protocol",
  },
  {
    name: "ethPandaOps",
    link: "https://ethpandaops.io/posts/",
    feed: "https://ethpandaops.io/posts/rss.xml",
    category: "Protocol",
  },
  {
    name: "Argot Collective",
    link: "https://www.argot.org/blog",
    feed: "https://www.argot.org/feed.xml",
    category: "Protocol",
  },
  {
    name: "Lighthouse",
    link: "https://lighthouse-blog.sigmaprime.io/",
    feed: "https://lighthouse-blog.sigmaprime.io/feeds/all.atom.xml",
    category: "Clients",
  },
  {
    name: "Nimbus",
    link: "https://blog.nimbus.team/",
    feed: "https://blog.nimbus.team/rss/",
    category: "Clients",
  },
  {
    name: "Besu",
    link: "https://www.lfdecentralizedtrust.org/blog/tag/besu",
    feed: "https://www.lfdecentralizedtrust.org/blog/rss.xml",
    category: "Clients",
    // Shared LF Decentralized Trust feed; keep only Besu-tagged posts.
    categoryFilter: ["Besu"],
  },
  {
    name: "Privacy & Scaling Explorations",
    link: "https://pse.dev/blog",
    feed: "https://pse.dev/api/rss",
    category: "Research",
  },
  {
    name: "zkEVM",
    link: "https://zkevm.ethereum.foundation/blog",
    feed: "https://zkevm.ethereum.foundation/feed.xml",
    category: "Research",
  },
  {
    name: "Vitalik Buterin",
    link: "https://vitalik.eth.limo/",
    feed: "https://vitalik.eth.limo/feed.xml",
    category: "Research",
  },
  {
    name: "Solidity",
    link: "https://soliditylang.org/blog/",
    feed: "https://soliditylang.org/feed.xml",
    category: "Dev tooling",
  },
  {
    name: "Sourcify",
    link: "https://docs.sourcify.dev/blog/",
    feed: "https://docs.sourcify.dev/blog/rss.xml",
    category: "Dev tooling",
  },
  {
    name: "Ethereum Remix",
    link: "https://ethereumremix.substack.com/",
    feed: "https://ethereumremix.substack.com/feed",
    category: "Dev tooling",
  },
  {
    name: "EthStaker",
    link: "https://paragraph.com/@ethstaker",
    feed: "https://api.paragraph.com/blogs/rss/@ethstaker",
    category: "Staking",
  },
  {
    name: "Local Ethereum",
    link: "https://www.localethereum.org/",
    feed: "https://localethereum.substack.com/feed",
    category: "Community",
  },
  {
    name: "Ethereal",
    link: "https://ethereal.news/",
    feed: "https://ethereal.news/rss.xml",
    category: "Newsletters",
  },
  {
    name: "ETH Daily",
    link: "https://ethdaily.io/",
    feed: "https://api.paragraph.com/blogs/rss/@ethdaily",
    category: "Newsletters",
  },
]

/** Category bucket for first-party builder articles. */
export const BUILDER_CATEGORY = "Ethereum.org"

/** Trailing window (days) of RSS history retained at fetch time. */
export const LATEST_RSS_WINDOW_DAYS = 30

/** Per-source display cap applied at the consumer (not the fetcher). */
export const LATEST_MAX_PER_SOURCE = 3
