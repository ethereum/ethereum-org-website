import { parseString } from "xml2js"

import type {
  AtomElement,
  AtomResult,
  RSSChannel,
  RSSItem,
  RSSResult,
} from "../types"
import { isValidDate } from "../utils/date"

/**
 * Fetches RSS feed from the specified XML URL(s).
 * @param xmlUrl - The URL(s) of the XML feed to fetch.
 * @returns An array sources, each containing an array of RSS items
 */
export const fetchRSS = async (xmlUrl: string | string[]) => {
  const urls = Array.isArray(xmlUrl) ? xmlUrl : [xmlUrl]
  const allItems: RSSItem[][] = []
  for (const url of urls) {
    const response = (await fetchXml(url)) as RSSResult | AtomResult

    if ("rss" in response) {
      const [mainChannel] = response.rss.channel as RSSChannel[]
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
            if (url.includes("medium.com/feed/"))
              return item["content:encoded"]?.[0].match(
                /https?:\/\/[^"]*?\.(jpe?g|png|webp)/g
              )
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
    } else if ("feed" in response) {
      const [source] = response.feed.title
      const [sourceUrl] = response.feed.id
      const feedImage = response.feed.icon?.[0]

      const parsedAtomItems = response.feed.entry
        // Filter out items with invalid dates
        .filter((entry) => {
          if (!entry.updated) return false
          const [published] = entry.updated
          return isValidDate(published)
        })
        // Sort by published (most recent is first in array
        .sort((a, b) => {
          const dateA = new Date(a.updated[0])
          const dateB = new Date(b.updated[0])
          return dateB.getTime() - dateA.getTime()
        })
        // Map to RSSItem object
        .map((entry) => {
          const getString = (el?: AtomElement[]): string => {
            if (!el) return ""
            const [firstEl] = el
            if (typeof firstEl === "string") return firstEl
            return firstEl._ || ""
          }
          const getHref = (): string => {
            if (!entry.link) {
              console.warn(`No link found for RSS url: ${url}`)
              return ""
            }
            const link = entry.link[0]
            if (typeof link === "string") return link
            return link.$.href || ""
          }
          const getImgSrc = (): string => {
            const imgRegEx = /https?:\/\/[^"]*?\.(jpe?g|png|webp)/g
            const contentMatch = getString(entry.content).match(imgRegEx)
            if (contentMatch) return contentMatch[0]
            const summaryMatch = getString(entry.summary).match(imgRegEx)
            if (summaryMatch) return summaryMatch[0]
            return feedImage || ""
          }
          return {
            pubDate: entry.updated[0],
            title: getString(entry.title),
            link: getHref(),
            imgSrc: getImgSrc(),
            source,
            sourceUrl,
            sourceFeedUrl: url,
          } as RSSItem
        })

      allItems.push(parsedAtomItems)
    }
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
  try {
    const response = await fetch(url)
    const xml = await response.text()
    let returnObject: Record<string, unknown> = {}
    parseString(xml, (err, result) => {
      if (err) {
        throw err // Throw the error to be caught by the outer try-catch
      }
      returnObject = result
    })
    return returnObject
  } catch (error) {
    console.error("Error fetching or parsing XML:", url, error)
    throw error
  }
}
