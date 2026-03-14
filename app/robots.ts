import type { MetadataRoute } from "next"

import { IS_PRODUCTION_DEPLOY, SITE_URL } from "@/lib/constants"

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
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL,
  }
}
