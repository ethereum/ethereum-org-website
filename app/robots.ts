import type { MetadataRoute } from "next"

import { IS_PRODUCTION_DEPLOY, SITE_URL } from "@/lib/constants"

// The sitemap is sharded per locale via generateSitemaps()
// (app/sitemaps/sitemap.ts) and indexed by a <sitemapindex> at /sitemap.xml
// (app/sitemap.xml/route.ts). Point crawlers at that single index; it enumerates
// every per-locale shard.
const sitemapIndex = `${SITE_URL}/sitemap.xml`

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
    sitemap: sitemapIndex,
    host: SITE_URL,
  }
}
