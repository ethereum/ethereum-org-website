/**
 * Category configuration for the video gallery shelves.
 *
 * Each category maps a URL-safe key to the tags that place a video in that shelf.
 * The category key itself is always included as a tag so that any video can be
 * explicitly assigned to a category by adding the key to its topic list.
 *
 * IMPORTANT: Avoid adding "cross-cutting" tags (e.g. "security", "governance",
 * "history") to multiple categories — this causes videos to appear in the wrong
 * shelves. Instead, use the category key tag on the video for explicit assignment.
 */
export const VIDEO_CATEGORIES = [
  {
    key: "how-ethereum-works",
    labelKey: "page-videos-category-how-ethereum-works",
    tags: [
      "how-ethereum-works",
      "consensus",
      "blockchain",
      "cryptography",
      "accounts",
      "ethereum",
      "intro",
      "transactions",
      "pow",
      "proof-of-authority",
      "pos",
      "smart-contracts",
    ],
  },
  {
    key: "network-upgrades",
    labelKey: "page-videos-category-network-upgrades",
    tags: [
      "network-upgrades",
      "upgrades",
      "pectra",
      "dencun",
      "eip-4844",
      "blobs",
      "fusaka",
    ],
  },
  {
    key: "roadmap-and-priorities",
    labelKey: "page-videos-category-roadmap-and-priorities",
    tags: ["roadmap-and-priorities", "pbs", "mev"],
  },
  {
    key: "scaling-and-layer-2",
    labelKey: "page-videos-category-scaling-and-layer-2",
    tags: [
      "scaling-and-layer-2",
      "scaling",
      "layer-2",
      "rollups",
      "optimistic-rollups",
      "zk-rollups",
    ],
  },
  {
    key: "use-cases",
    labelKey: "page-videos-category-use-cases",
    tags: [
      "use-cases",
      "defi",
      "finance",
      "nfts",
      "erc-721",
      "erc-1155",
      "lending",
      "dapps",
      "restaking",
      "eigenlayer",
      "refi",
      "sustainability",
      "desci",
      "funding",
      "social",
      "decentralization",
      "dao",
      "identity",
    ],
  },
  {
    key: "privacy-and-security",
    labelKey: "page-videos-category-privacy-and-security",
    tags: ["privacy-and-security", "privacy", "authentication"],
  },
  {
    key: "community-stories",
    labelKey: "page-videos-category-community-stories",
    tags: ["community-stories", "contributing", "translations", "community"],
  },
] as const
