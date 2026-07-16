import { IS_PRODUCTION_DEPLOY, LOCALES_CODES, SITE_URL } from "@/lib/constants"

// Next's generateSitemaps (app/sitemaps/sitemap.ts) serves one shard per locale
// at /sitemaps/sitemap/<locale>.xml but never emits an index for them. This
// handler is that index: a <sitemapindex> served at the stable /sitemap.xml so
// the URL already registered in Google Search Console keeps resolving instead of
// 404ing, and crawlers discover every shard from one canonical entry point.
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

export function GET() {
  // Match app/robots.ts: no sitemaps advertised off production.
  const shards = IS_PRODUCTION_DEPLOY
    ? LOCALES_CODES.map(
        (locale) => `${SITE_URL}/sitemaps/sitemap/${locale}.xml`
      )
    : []

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...shards.map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`),
    "</sitemapindex>",
  ].join("")

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
