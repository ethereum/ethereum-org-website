import { RSS_DISPLAY_COUNT, VITALIK_BLOG } from "../constants"
import type { RSSItem } from "../types"

export const sortByPubDate = (items: RSSItem[]) =>
  items.sort((a, b) => {
    const dateA = new Date(a.pubDate)
    const dateB = new Date(b.pubDate)
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      console.error("Invalid date found:", a.pubDate, b.pubDate)
      return 0
    }
    return dateB.getTime() - dateA.getTime()
  })

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
