import type { BlogPost, LatestArticle, RSSItem } from "@/lib/types"

import { getBlogPostsData } from "@/lib/utils/md"

import { LATEST_HIGHLIGHTS } from "@/data/latest/highlights"
import { BUILDER_CATEGORY, LATEST_MAX_PER_SOURCE } from "@/data/latest/sources"

import { getRSSData } from "@/lib/data"

const toTime = (date: string) => {
  const time = new Date(date).getTime()
  return Number.isNaN(time) ? 0 : time
}

const builderToArticle = (post: BlogPost): LatestArticle => ({
  title: post.title,
  href: post.href,
  date: post.published,
  source: BUILDER_CATEGORY,
  category: BUILDER_CATEGORY,
  // Category first, then frontmatter topic tags (deduped).
  tags: [...new Set([BUILDER_CATEGORY, ...(post.tags ?? [])])],
  isExternal: false,
  image: post.image,
  author: post.author || undefined,
  description: post.description,
  timeToRead: post.timeToRead,
})

const rssToArticle = (item: RSSItem): LatestArticle => {
  const category = item.category ?? "Community"
  return {
    title: item.title,
    href: item.link,
    date: item.pubDate,
    source: item.source,
    category,
    tags: [category],
    isExternal: true,
    image: item.imgSrc || undefined,
    description: item.description,
  }
}

/**
 * Merge first-party builder posts with grouped RSS items into one
 * chronological stream for the /latest grid.
 *
 * - Builder posts: all shown, un-windowed, un-capped.
 * - RSS items: capped to LATEST_MAX_PER_SOURCE per source (the 30-day window
 *   was already applied at fetch time).
 * - `excludeHrefs` removes items surfaced as highlights (dedup by href).
 * - Result is sorted by date descending.
 */
export function mergeLatestArticles(
  builderPosts: BlogPost[],
  rssGroups: RSSItem[][] = [],
  excludeHrefs: string[] = []
): LatestArticle[] {
  const excluded = new Set(excludeHrefs)

  const builderArticles = builderPosts.map(builderToArticle)
  const rssArticles = rssGroups.flatMap((group) =>
    group.slice(0, LATEST_MAX_PER_SOURCE).map(rssToArticle)
  )

  return [...builderArticles, ...rssArticles]
    .filter((article) => !excluded.has(article.href))
    .sort((a, b) => toTime(b.date) - toTime(a.date))
}

export type LatestData = {
  /** Merged, newest-first stream for the /latest grid and homepage widget. */
  articles: LatestArticle[]
  /** Raw builder posts, returned so /latest can build its JSON-LD without re-reading markdown. */
  blogPosts: BlogPost[]
}

/**
 * Single source of truth behind /latest and the homepage "Latest updates"
 * widget: read first-party builder posts + the cached RSS feeds, merge into one
 * newest-first stream with the editorial highlights de-duped out. RSS is
 * supplementary — a missing/unavailable feed cache degrades to builder articles
 * only rather than throwing.
 */
export async function getLatestArticles(locale: string): Promise<LatestData> {
  const blogPosts = await getBlogPostsData(locale)

  let rssGroups: RSSItem[][] = []
  try {
    rssGroups = (await getRSSData()) ?? []
  } catch (error) {
    console.warn("Failed to load RSS data for /latest:", error)
  }

  const highlightHrefs = LATEST_HIGHLIGHTS.map((h) => h.href)
  const articles = mergeLatestArticles(blogPosts, rssGroups, highlightHrefs)

  return { articles, blogPosts }
}
