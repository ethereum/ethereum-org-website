import type { HTMLResult, RSSItem } from "../types"

import { fetchXml } from "./fetchRSS"

export const fetchAttestantPosts = async () => {
  const BASE_URL = "https://www.attestant.io/posts/"
  const allItems: RSSItem[] = []

  try {
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
    allItems.push(...sortedPosts)
  } catch (error) {
    console.error(
      "Error fetching Attestant posts:",
      error instanceof Error ? error.message : error
    )
  }

  return allItems
}
