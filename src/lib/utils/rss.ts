import {
  _0X_PARC_BLOG,
  PANDA_OPS_BLOG,
  RSS_DISPLAY_COUNT,
  SOLIDITY_BLOG,
  VITALIK_BLOG,
} from "../constants"
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
      case VITALIK_BLOG:
        return {
          ...item,
          imgSrc: "/images/vitalik-blog-banner.svg",
          link: item.link.replace(".ca", ".eth.limo"),
        }
      case PANDA_OPS_BLOG:
        return {
          ...item,
          imgSrc: "/images/panda-ops-banner.png",
        }
      case SOLIDITY_BLOG:
        return {
          ...item,
          imgSrc: "/images/solidity-banner.png",
        }
      case _0X_PARC_BLOG:
        return {
          ...item,
          imgSrc: "/images/0xparc-logo.svg",
        }
      default:
        return item
    }
  })

export const polishRSSList = (...items: RSSItem[][]) => {
  const allItems = items.flat()
  const readyForSorting = postProcess(allItems)
  return sortByPubDate(readyForSorting).slice(0, RSS_DISPLAY_COUNT)
}
