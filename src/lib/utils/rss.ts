import { RSS_DISPLAY_COUNT, VITALIK_BLOG } from "../constants"
import type { RSSItem } from "../types"

export const sortByPubDate = (items: RSSItem[]) =>
  items.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  )

export const addVitalikBanner = (rssItems: RSSItem[]) =>
  rssItems.map((item) => {
    if (item.sourceFeedUrl !== VITALIK_BLOG) return item
    return { ...item, imgSrc: "/images/vitalik-blog-banner.png" }
  })

export const polishRSSList = (...items: RSSItem[][]) => {
  const allItems = items.flat()
  const readyForSorting = addVitalikBanner(allItems)
  return sortByPubDate(readyForSorting).slice(0, RSS_DISPLAY_COUNT)
}
