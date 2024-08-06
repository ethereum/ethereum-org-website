import { parseString } from "xml2js"

import type { RSSChannel, RSSItem, RSSResult } from "../types"

/**
 * Fetches RSS feed from the specified XML URL(s).
 * @param xmlUrl - The URL(s) of the XML feed to fetch.
 * @returns An array of RSS items containing the publication date, title, link, and source.
 */
export const fetchRSS = async (xmlUrl: string | string[]) => {
  const urls = Array.isArray(xmlUrl) ? xmlUrl : [xmlUrl]
  const allItems: RSSItem[] = []
  for (const url of urls) {
    const rssItems = (await fetchXml(url)) as RSSResult
    const mainChannel: RSSChannel = rssItems.rss.channel[0]
    const source = mainChannel.title[0]
    const parsedRssItems = mainChannel.item.map(
      ({ pubDate, title, link, enclosure }) =>
        ({
          pubDate: pubDate[0],
          title: title[0],
          link: link[0],
          imgSrc: enclosure ? enclosure[0].$.url : "",
          source,
          sourceFeedUrl: url,
        }) as RSSItem
    )
    allItems.push(...parsedRssItems)
  }
  return allItems as RSSItem[]
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
