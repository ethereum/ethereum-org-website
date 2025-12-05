import type { HTMLResult, RSSItem } from "@/lib/types"

import { fetchXml } from "@/lib/api/fetchRSS"

export const FETCH_POSTS_TASK_ID = "fetch-posts"

/**
 * Fetch Attestant blog posts.
 * Returns an array of RSS items from the Attestant blog.
 */
export async function fetchAttestantPosts(): Promise<RSSItem[]> {
  const BASE_URL = "https://www.attestant.io/posts/"

  console.log("Starting Attestant posts data fetch")

  const htmlData = (await fetchXml(BASE_URL)) as HTMLResult

  // Extract div containing list of posts from deeply nested HTML structure
  const postsContainer =
    htmlData.html.body[0].div[0].div[1].div[0].div[0].div[0].div

  const sortedPosts = postsContainer
    .map(({ a }) => {
      const [
        {
          $: { href },
          h4: [{ _: title }],
          div: [{ _: content }, { _: pubDate }],
        },
      ] = a
      const { href: link } = new URL(href, BASE_URL)
      return {
        title,
        link,
        content,
        source: "Attestant",
        sourceUrl: BASE_URL,
        sourceFeedUrl: BASE_URL,
        imgSrc: "/images/attestant-logo.svg",
        pubDate,
      }
    })
    .sort(
      (a: RSSItem, b: RSSItem) =>
        new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    )

  console.log(`Successfully fetched ${sortedPosts.length} Attestant posts`)

  return sortedPosts
}
