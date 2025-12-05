import { parseString } from "xml2js"

import type { AtomElement, AtomResult, RSSItem, RSSResult } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"

import { ATTESTANT_BLOG, BLOG_FEEDS } from "@/lib/constants"

export const FETCH_RSS_TASK_ID = "fetch-rss"

/**
 * Fetches XML data from the specified URL.
 * Parses XML to JSON with parseString (xml2js package)
 */
async function fetchXml(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: { Cookie: "", DNT: "1" }, // Empty cookie header and do-not-track
    credentials: "omit", // Don't send or receive cookies
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch XML from ${url}: ${response.status}`)
  }

  const xml = await response.text()
  return await new Promise<Record<string, unknown>>((resolve, reject) => {
    parseString(xml, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

/**
 * Fetch RSS feeds from community blogs.
 * Returns an array of sources, each containing an array of RSS items.
 * Excludes Attestant blog (handled separately via fetchAttestantPosts).
 */
export async function fetchRSS(): Promise<RSSItem[][]> {
  // Filter out Attestant blog since it's handled separately
  const xmlUrls = BLOG_FEEDS.filter((feed) => feed !== ATTESTANT_BLOG)

  console.log(`Starting RSS feeds data fetch for ${xmlUrls.length} feeds`)

  const allItems: RSSItem[][] = []
  const errors: string[] = []

  for (const url of xmlUrls) {
    try {
      const response = (await fetchXml(url)) as RSSResult | AtomResult

      if ("rss" in response) {
        const [mainChannel] = response.rss.channel
        const [source] = mainChannel.title
        const [sourceUrl] = mainChannel.link
        const channelImage = mainChannel.image
          ? mainChannel.image[0].url[0]
          : ""

        const parsedRssItems = mainChannel.item
          // Filter out items with invalid dates
          .filter((item) => {
            if (!item.pubDate) return false
            const [pubDate] = item.pubDate
            return isValidDate(pubDate)
          })
          // Sort by pubDate (most recent is first in array)
          .sort((a, b) => {
            const dateA = new Date(a.pubDate[0])
            const dateB = new Date(b.pubDate[0])
            return dateB.getTime() - dateA.getTime()
          })
          // Map to RSSItem object
          .map((item) => {
            const getImgSrc = () => {
              if (item["content:encoded"])
                return item["content:encoded"][0].match(
                  /https?:\/\/[^"]*?\.(jpe?g|png|webp)/g
                )?.[0]
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
            }
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
          // Sort by published (most recent is first in array)
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
            }
          })

        allItems.push(parsedAtomItems)
      } else {
        throw new Error(
          `Error parsing XML, invalid RSSResult or AtomResult type: ${url}`
        )
      }
    } catch (error) {
      console.error(`Error fetching RSS feed ${url}:`, error)
      errors.push(
        `${url}: ${error instanceof Error ? error.message : String(error)}`
      )
      // Continue processing other feeds even if one fails
    }
  }

  const successCount = allItems.length
  const totalCount = xmlUrls.length

  console.log("Successfully fetched RSS feeds data", {
    successCount,
    totalCount,
    totalItems: allItems.reduce((sum, items) => sum + items.length, 0),
    errors: errors.length > 0 ? errors : undefined,
  })

  if (errors.length > 0 && successCount === 0) {
    throw new Error(`Failed to fetch all RSS feeds: ${errors.join(", ")}`)
  }

  return allItems
}
