import { parseString } from "xml2js"

import { RSS_DISPLAY_COUNT, XML_FEEDS } from "../constants"
import type { RSSChannel, RSSItem } from "../types"

export const fetchRSSDisplay = async () => {
  const parsedRssItems: RSSItem[] = []

  await Promise.all(
    XML_FEEDS.map(async (url) => {
      const response = await fetch(url)
      const xml = await response.text()

      parseString(xml, (err, result) => {
        if (err) {
          console.error(err)
          return
        }
        const mainChannel: RSSChannel = result.rss.channel[0]
        const source = mainChannel.title[0]
        mainChannel.item.forEach(({ pubDate, title, link, description }) => {
          const item = {
            pubDate: pubDate[0],
            title: title[0],
            link: link[0],
            content: description[0],
            source,
          } as RSSItem

          parsedRssItems.push(item)
        })
      })
    })
  )

  const sortedRssItems = parsedRssItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  )

  const rssItemsForDisplay = sortedRssItems.slice(0, RSS_DISPLAY_COUNT)

  return rssItemsForDisplay
}
