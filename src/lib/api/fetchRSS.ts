import { parseString } from "xml2js"

import type { RSSChannel, RSSItem, RSSResult } from "../types"
import { isValidDate } from "../utils/date"

/**
 * Fetches RSS feed from the specified XML URL(s).
 * @param xmlUrl - The URL(s) of the XML feed to fetch.
 * @returns An array of RSS items containing the publication date, title, link, and source.
 */
export const fetchRSS = async (xmlUrl: string | string[]) => {
  const urls = Array.isArray(xmlUrl) ? xmlUrl : [xmlUrl]
  const allItems: RSSItem[][] = []
  for (const url of urls) {
    const rssItems = (await fetchXml(url)) as RSSResult
    if (!rssItems.rss) continue
    const [mainChannel] = rssItems.rss.channel as RSSChannel[]
    const [source] = mainChannel.title
    const [sourceUrl] = mainChannel.link
    const channelImage = mainChannel.image ? mainChannel.image[0].url[0] : ""

    const parsedRssItems = mainChannel.item
      // Filter out items with invalid dates
      .filter((item) => {
        if (!item.pubDate) return false
        const [pubDate] = item.pubDate
        return isValidDate(pubDate)
      })
      // Sort by pubDate (most recent is first in array
      .sort((a, b) => {
        const dateA = new Date(a.pubDate[0])
        const dateB = new Date(b.pubDate[0])
        return dateB.getTime() - dateA.getTime()
      })
      // Map to RSSItem object
      .map((item) => {
        const getImgSrc = () => {
          if (item.enclosure) return item.enclosure[0].$.url
          if (item["media:content"]) return item["media:content"][0].$.url
          return channelImage
        }
        return {
          pubDate: item.pubDate[0],
          title: item.title[0],
          link: item.link[0],
          imgSrc: getImgSrc(),
          source,
          sourceUrl,
          sourceFeedUrl: url,
        } as RSSItem
      })

    allItems.push(parsedRssItems)
  }
  return allItems as RSSItem[][]
}

/**
 * Fetches XML data from the specified URL.
 * Parses XML to JSON with parseString (xml2js package)
 * @param url - The URL to fetch the XML data from.
 * @returns A promise that resolves to the parsed XML data as a JSON object.
 */
export const fetchXml = async (url: string) => {
  const response = await fetch(url)
  const xml = await response.text()
  let returnObject: Record<string, unknown> = {}
  parseString(xml, (err, result) => {
    if (err) {
      console.error(err)
      return
    }
    returnObject = result
  })
  return returnObject
}
