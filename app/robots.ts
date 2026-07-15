import type { MetadataRoute } from "next"

import { IS_PRODUCTION_DEPLOY, LOCALES_CODES, SITE_URL } from "@/lib/constants"

// The sitemap is sharded per locale via generateSitemaps() (app/sitemap.ts).
// Next serves each shard at /sitemap/<locale>.xml and emits no index file, so
// every shard is listed here for crawler discovery.
const sitemapShards = LOCALES_CODES.map(
  (locale) => `${SITE_URL}/sitemap/${locale}.xml`
)

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION_DEPLOY) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: [],
      host: SITE_URL,
    }
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: sitemapShards,
    host: SITE_URL,
  }
}
