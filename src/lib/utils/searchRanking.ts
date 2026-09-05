/**
 * Ranking hints consumed by the search crawler. The self-hosted scraper copies any
 * `docsearch:*` meta tag onto every record it extracts, which is how these reach the
 * index; the app then sorts on `pagerank` after text match.
 *
 * Higher is more important. The scale is ordered by who the page is for: a beginner
 * landing on "what is ethereum" is the common case, and a tutorial or a video transcript
 * matching the same words rarely is.
 *
 * Depth stands in for generality. A page one level below a topic is still about that
 * topic; three levels down it is about a detail of it. Flattening everything below the
 * root into one bucket made `/eth/supply` and `/roadmap/merge/issuance` indistinguishable
 * on a query about ETH issuance, where the shallower page is plainly the better answer.
 *
 * Split from `metadata.ts` so the policy can be tested directly -- it is expected to be
 * retuned against the labelled query set rather than settled once.
 */

export const PAGE_RANK = {
  /** Root-level pages, written for someone arriving without context. */
  beginner: 10,
  /** Guides and the learn hub: still introductory, but a step past the landing pages. */
  guide: 8,
  /** Developer documentation -- important, but secondary to a better match elsewhere. */
  docs: 5,
  /** Floor for the depth decay, so a deeply nested page never sinks below the docs. */
  default: 5,
  /** Lookups rather than places to start reading. */
  supplemental: 4,
  /** Narrow, task-specific, and usually a poor answer to a general question. */
  tutorial: 2,
  /** Transcripts and contributor process docs, which crowd out real answers. */
  lowest: 1,
} as const

/** Rank lost per level below the root, before the floor applies. */
const DEPTH_PENALTY = 2

/** Root slugs that are references to consult, not pages to learn from. */
const SUPPLEMENTAL_ROOTS = new Set(["glossary", "resources", "ethereum-forks"])

/**
 * Root slugs demoted below everything else. `/videos/` carries auto-generated
 * transcripts, which match almost any phrasing; `/contributing/` documents the site's
 * own process and answers questions nobody searching the site is asking.
 */
const LOWEST_ROOTS = new Set(["videos", "contributing"])

/** Root slugs whose pages are introductory even when nested. */
const GUIDE_ROOTS = new Set(["guides", "learn"])

const isDeveloperSection = (slug: string[], section: string) =>
  slug[0] === "developers" && slug[1] === section

export const isTutorialSlug = (slug: string[]) =>
  isDeveloperSection(slug, "tutorials") && slug.length > 2

/**
 * Levels below the root. The homepage arrives as `[""]` rather than an empty array, so
 * empty segments are dropped before counting -- otherwise it reads as depth 1 and scores
 * above every other page.
 */
const depthOf = (slug: string[]) => Math.max(slug.filter(Boolean).length - 1, 0)

export const pageRankForSlug = (slug: string[]): number => {
  const [root] = slug
  if (LOWEST_ROOTS.has(root)) return PAGE_RANK.lowest
  if (isTutorialSlug(slug)) return PAGE_RANK.tutorial
  if (SUPPLEMENTAL_ROOTS.has(root)) return PAGE_RANK.supplemental
  if (isDeveloperSection(slug, "docs")) return PAGE_RANK.docs
  if (GUIDE_ROOTS.has(root)) return PAGE_RANK.guide
  return Math.max(
    PAGE_RANK.beginner - DEPTH_PENALTY * depthOf(slug),
    PAGE_RANK.default
  )
}

export const categoryForSlug = (slug: string[]): string => {
  if (slug[0] === "videos") return "videos"
  if (isDeveloperSection(slug, "docs")) return "docs"
  if (isTutorialSlug(slug)) return "tutorials"
  if (slug[0] === "developers") return "devs"
  return "other"
}
