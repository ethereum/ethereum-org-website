import type { Video } from "@/lib/types"

import videosData from "@/data/videos.json"

/**
 * Get all videos from the static JSON data file.
 */
export async function getVideos(): Promise<Video[]> {
  return videosData as Video[]
}

/**
 * Get a single video by its URL slug.
 * Returns null if no video matches the given slug.
 */
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const videos = await getVideos()
  return videos.find((v) => v.slug === slug) ?? null
}

/**
 * Category configuration for the video gallery shelves.
 * Each category maps a URL-safe key to the tags that place a video in that shelf.
 */
export const VIDEO_CATEGORIES = [
  {
    key: "how-ethereum-works",
    labelKey: "page-videos-category-how-ethereum-works",
    tags: [
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
      "staking",
      "withdrawals",
    ],
    minVideos: 4,
  },
  {
    key: "network-upgrades",
    labelKey: "page-videos-category-network-upgrades",
    tags: ["upgrades", "pectra", "dencun", "eip-4844", "blobs", "history"],
    minVideos: 4,
  },
  {
    key: "roadmap-and-priorities",
    labelKey: "page-videos-category-roadmap-and-priorities",
    tags: ["roadmap", "pbs", "mev"],
    minVideos: 4,
  },
  {
    key: "scaling-and-layer-2",
    labelKey: "page-videos-category-scaling-and-layer-2",
    tags: [
      "scaling",
      "layer-2",
      "rollups",
      "optimistic-rollups",
      "zk-rollups",
      "zero-knowledge-proofs",
    ],
    minVideos: 4,
  },
  {
    key: "use-cases",
    labelKey: "page-videos-category-use-cases",
    tags: [
      "defi",
      "finance",
      "nfts",
      "erc-721",
      "erc-1155",
      "lending",
      "smart-contracts",
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
    minVideos: 4,
  },
  {
    key: "privacy-and-security",
    labelKey: "page-videos-category-privacy-and-security",
    tags: ["security", "authentication", "privacy", "governance"],
    minVideos: 4,
  },
  {
    key: "community-stories",
    labelKey: "page-videos-category-community-stories",
    tags: ["contributing", "translations", "ai", "agents"],
    minVideos: 4,
  },
] as const

/**
 * Filter videos by category tags.
 * Returns all videos where `video.topic` contains at least one of the
 * provided tags (comma-split, trimmed, case-insensitive OR match).
 * Results are deduplicated — a video appears at most once.
 */
export function getVideosByCategory<T extends Video>(
  videos: T[],
  tags: string[]
): T[] {
  const lowerTags = new Set(tags.map((t) => t.trim().toLowerCase()))

  return videos.filter((video) => {
    const videoTags = video.topic.split(",").map((t) => t.trim().toLowerCase())
    return videoTags.some((vt) => lowerTags.has(vt))
  })
}
