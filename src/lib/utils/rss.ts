import { SOLIDITY_FEED, VITALIK_FEED } from "../constants"
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

export const postProcess = (rssItems: RSSItem[]) =>
  rssItems.map((item) => {
    switch (item.sourceFeedUrl) {
      case VITALIK_FEED:
        return {
          ...item,
          imgSrc: "/images/vitalik-blog-banner.svg",
          link: item.link.replace(".ca", ".eth.limo"),
          sourceUrl: item.sourceUrl.replace(".ca", ".eth.limo"),
        }
      case SOLIDITY_FEED:
        return {
          ...item,
          imgSrc: "/images/solidity-banner.png",
        }
      default:
        return item
    }
  })

export const polishRSSList = (...items: RSSItem[][]) => {
  const latestOfEach = items
    .filter(({ length }) => length)
    .map((item) => item[0]) // Take only latest post (first in array) from each

  const latestItems = latestOfEach.flat()
  const readyForSorting = postProcess(latestItems)
  return sortByPubDate(readyForSorting)
}
