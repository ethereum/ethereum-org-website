import { SOLIDITY_FEED, VITALIK_FEED } from "../constants"
import type { Lang, RSSItem } from "../types"

import { isValidDate } from "./date"
import { getLocaleTimestamp } from "./time"

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

export const postProcess = (rssItems: RSSItem[], locale: Lang) =>
  rssItems.map((item) => {
    const pubDate = isValidDate(item.pubDate)
      ? getLocaleTimestamp(locale, item.pubDate)
      : ""
    const formattedItem = { ...item, pubDate }

    switch (item.sourceFeedUrl) {
      case VITALIK_FEED:
        return {
          ...formattedItem,
          imgSrc: "/images/vitalik-blog-banner.svg",
          link: item.link.replace(".ca", ".eth.limo"),
          sourceUrl: item.sourceUrl.replace(".ca", ".eth.limo"),
        }
      case SOLIDITY_FEED:
        return {
          ...formattedItem,
          imgSrc: "/images/solidity-banner.png",
        }
      default:
        return formattedItem
    }
  })

export const polishRSSList = (items: RSSItem[][], locale: Lang) => {
  const latestOfEach = items
    .filter(({ length }) => length)
    .map((item) => item[0]) // Take only latest post (first in array) from each

  const latestItems = latestOfEach.flat()
  const readyForSorting = postProcess(latestItems, locale)
  return sortByPubDate(readyForSorting)
}
