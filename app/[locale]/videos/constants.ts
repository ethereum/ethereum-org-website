/**
 * Category configuration for the video gallery shelves.
 *
 * Each category uses a strict 1:1 mapping: the shelf key IS the only tag that
 * places a video in that shelf. To assign a video to a category, add the
 * category key to its `topic` list in frontmatter.
 */
export const VIDEO_CATEGORIES = [
  {
    key: "how-ethereum-works",
    labelKey: "page-videos-category-how-ethereum-works",
    tags: ["how-ethereum-works"],
  },
  {
    key: "network-upgrades",
    labelKey: "page-videos-category-network-upgrades",
    tags: ["network-upgrades"],
  },
  {
    key: "roadmap-and-priorities",
    labelKey: "page-videos-category-roadmap-and-priorities",
    tags: ["roadmap-and-priorities"],
  },
  {
    key: "scaling-and-layer-2",
    labelKey: "page-videos-category-scaling-and-layer-2",
    tags: ["scaling-and-layer-2"],
  },
  {
    key: "use-cases",
    labelKey: "page-videos-category-use-cases",
    tags: ["use-cases"],
  },
  {
    key: "privacy",
    labelKey: "page-videos-category-privacy",
    tags: ["privacy"],
  },
  {
    key: "security",
    labelKey: "page-videos-category-security",
    tags: ["security"],
  },
  {
    key: "community-stories",
    labelKey: "page-videos-category-community-stories",
    tags: ["community-stories"],
  },
  {
    key: "events",
    labelKey: "page-videos-category-events",
    tags: ["events"],
  },
] as const
