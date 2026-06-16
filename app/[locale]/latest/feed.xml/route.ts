import type { NextRequest } from "next/server"
import { getTranslations } from "next-intl/server"

import { SITE_URL } from "@/lib/constants"
import { getBlogFallbackHero } from "@/lib/utils/blog"
import { getBlogPostsData } from "@/lib/utils/md"
import { getFullUrl } from "@/lib/utils/url"

export const dynamic = "force-static"

const XML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
}

const escapeXml = (value: string): string =>
  value.replace(/[&<>"']/g, (c) => XML_ESCAPE[c])

const IMAGE_MIME_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

const getImageUrl = (path: string): string => new URL(path, SITE_URL).href

const getImageMimeType = (path: string): string => {
  const pathname = new URL(path, SITE_URL).pathname.toLowerCase()
  const extension = pathname.match(/\.[^.]+$/)?.[0] ?? ""

  return IMAGE_MIME_TYPES[extension] ?? "image/jpeg"
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-latest",
  })

  const posts = await getBlogPostsData(locale)

  // Strip trailing slash for the .xml file URL (getFullUrl appends one for
  // directory-style URLs, but feed.xml is a file).
  const feedUrl = getFullUrl(locale, "/latest/feed.xml").replace(/\/$/, "")
  const channelLink = getFullUrl(locale, "/latest/")
  const channelTitle = t("page-latest-title")
  const channelDescription = t("page-latest-subtitle")

  const items = posts
    .map((post) => {
      const link = getFullUrl(locale, post.href)
      const pubDate = new Date(post.published).toUTCString()
      const creator = post.author
        ? `<dc:creator>${escapeXml(post.author)}</dc:creator>`
        : ""
      const categories = (post.tags ?? [])
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("")
      const imageSrc = post.image ?? getBlogFallbackHero(post.href).src
      const imageUrl = getImageUrl(imageSrc)
      const imageType = getImageMimeType(imageSrc)

      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${link}</link>`,
        `<guid isPermaLink="true">${link}</guid>`,
        `<description>${escapeXml(post.description)}</description>`,
        creator,
        `<pubDate>${pubDate}</pubDate>`,
        categories,
        `<media:content url="${escapeXml(imageUrl)}" medium="image" type="${imageType}" />`,
        `<media:thumbnail url="${escapeXml(imageUrl)}" />`,
        "</item>",
      ].join("")
    })
    .join("")

  const lastBuildDate = new Date().toUTCString()
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">',
    "<channel>",
    `<title>${escapeXml(channelTitle)}</title>`,
    `<link>${channelLink}</link>`,
    `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    `<description>${escapeXml(channelDescription)}</description>`,
    `<language>${locale}</language>`,
    `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    items,
    "</channel>",
    "</rss>",
  ].join("")

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
