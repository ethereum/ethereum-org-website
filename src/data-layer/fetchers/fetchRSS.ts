import { parseString } from "xml2js"

import type { AtomElement, AtomResult, RSSItem, RSSResult } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"

import { LATEST_RSS_WINDOW_DAYS, LATEST_SOURCES } from "@/data/latest/sources"

import { fetchRetry } from "./fetchRetry"

export const FETCH_RSS_TASK_ID = "fetch-rss"

const IMG_REGEX = /https?:\/\/[^"]*?\.(jpe?g|png|webp)/g
const DESCRIPTION_MAX_LENGTH = 200

/**
 * Fetches XML data from the specified URL.
 * Parses XML to JSON with parseString (xml2js package)
 * Exported for use by other data-layer modules (e.g., fetchPosts)
 */
export async function fetchXml(url: string): Promise<Record<string, unknown>> {
  const response = await fetchRetry(url, {
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

/** Strip HTML/markup to a plain-text excerpt suitable for a card. */
function toExcerpt(raw?: string): string | undefined {
  if (!raw) return undefined
  const text = raw
    .replace(/<[^>]*>/g, " ") // drop tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim()
  if (!text) return undefined
  if (text.length <= DESCRIPTION_MAX_LENGTH) return text
  // Truncate at the last word boundary within the limit.
  const clipped = text.slice(0, DESCRIPTION_MAX_LENGTH)
  const lastSpace = clipped.lastIndexOf(" ")
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`
}

/**
 * Fetch RSS/Atom feeds for every source in LATEST_SOURCES.
 *
 * Returns one array of items per source (grouped so consumers can apply a
 * per-source display cap). Items are filtered to a trailing window of
 * LATEST_RSS_WINDOW_DAYS at fetch time so the window self-rolls daily and the
 * stored payload stays bounded. Each item carries its source's publication
 * category and a plain-text description excerpt.
 */
export async function fetchRSS(): Promise<RSSItem[][]> {
  console.log(
    `Starting RSS feeds data fetch for ${LATEST_SOURCES.length} feeds`
  )

  const cutoff = Date.now() - LATEST_RSS_WINDOW_DAYS * 24 * 60 * 60 * 1000
  const withinWindow = (date: string) =>
    isValidDate(date) && new Date(date).getTime() >= cutoff

  const allItems: RSSItem[][] = []
  const errors: string[] = []

  for (let i = 0; i < LATEST_SOURCES.length; i++) {
    const {
      feed: url,
      name,
      category,
      categoryFilter,
      linkReplace,
    } = LATEST_SOURCES[i]

    // Sources whose feed mixes unrelated posts (e.g. Besu inside the wider
    // LF Decentralized Trust feed) restrict items to an RSS `<category>`
    // allow-list. Sources without a filter keep every item.
    const matchesCategoryFilter = (itemCategories?: string[]) =>
      !categoryFilter ||
      (itemCategories ?? []).some((c) => categoryFilter.includes(c))

    // Swap a dead/old link host for the live one (e.g. vitalik.ca → eth.limo).
    const rewriteLink = (link: string) =>
      linkReplace && link.startsWith(linkReplace.from)
        ? linkReplace.to + link.slice(linkReplace.from.length)
        : link

    // Add a small delay between requests to avoid rate limiting
    // Skip delay for the first request
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, 500)) // 500ms delay
    }

    try {
      const response = (await fetchXml(url)) as RSSResult | AtomResult

      if ("rss" in response) {
        const [mainChannel] = response.rss.channel
        const [sourceUrl] = mainChannel.link
        const channelImage = mainChannel.image
          ? mainChannel.image[0].url[0]
          : ""

        const parsedRssItems: RSSItem[] = mainChannel.item
          .filter(
            (item) =>
              item.pubDate &&
              withinWindow(item.pubDate[0]) &&
              matchesCategoryFilter(item.category)
          )
          .sort(
            (a, b) =>
              new Date(b.pubDate[0]).getTime() -
              new Date(a.pubDate[0]).getTime()
          )
          .map((item) => {
            const getImgSrc = () => {
              // Prefer an explicit image attachment (the post's cover) over
              // scraping the body — body scraping tends to grab the first
              // inline image, which is often an ad banner or logo. Guard the
              // enclosure by type so podcast/audio enclosures aren't treated
              // as images (e.g. Paragraph feeds carry an image/png cover).
              const enclosure = item.enclosure?.[0]?.$
              if (enclosure?.url && enclosure.type?.startsWith("image/"))
                return enclosure.url
              if (item["media:content"]) return item["media:content"][0].$.url
              if (item["content:encoded"]) {
                const match = item["content:encoded"][0].match(IMG_REGEX)?.[0]
                if (match) return match
              }
              return channelImage
            }
            return {
              pubDate: item.pubDate[0],
              title: item.title[0],
              link: rewriteLink(item.link[0]),
              imgSrc: getImgSrc(),
              description: toExcerpt(item.description?.[0]),
              source: name,
              category,
              sourceUrl,
              sourceFeedUrl: url,
            }
          })

        allItems.push(parsedRssItems)
      } else if ("feed" in response) {
        const [sourceUrl] = response.feed.id
        const feedImage = response.feed.icon?.[0]

        const getString = (el?: AtomElement[]): string => {
          if (!el) return ""
          const [firstEl] = el
          if (typeof firstEl === "string") return firstEl
          return firstEl._ || ""
        }

        const parsedAtomItems: RSSItem[] = response.feed.entry
          .filter((entry) => entry.updated && withinWindow(entry.updated[0]))
          .sort(
            (a, b) =>
              new Date(b.updated[0]).getTime() -
              new Date(a.updated[0]).getTime()
          )
          .map((entry) => {
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
              const contentMatch = getString(entry.content).match(IMG_REGEX)
              if (contentMatch) return contentMatch[0]
              const summaryMatch = getString(entry.summary).match(IMG_REGEX)
              if (summaryMatch) return summaryMatch[0]
              return feedImage || ""
            }
            return {
              pubDate: entry.updated[0],
              title: getString(entry.title),
              link: rewriteLink(getHref()),
              imgSrc: getImgSrc(),
              description: toExcerpt(
                getString(entry.summary) || getString(entry.content)
              ),
              source: name,
              category,
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
      const errorMessage =
        error instanceof Error ? error.message : String(error)

      // Log rate limiting as a warning (expected behavior)
      if (
        errorMessage.includes("429") ||
        errorMessage.includes("Rate limited")
      ) {
        console.warn(`Rate limited for RSS feed ${url}. Skipping.`)
      } else {
        console.error(`Error fetching RSS feed ${url}:`, error)
      }

      errors.push(`${url}: ${errorMessage}`)
      // Continue processing other feeds even if one fails
    }
  }

  const successCount = allItems.length
  const totalCount = LATEST_SOURCES.length

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
