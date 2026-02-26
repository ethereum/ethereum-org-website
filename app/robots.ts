import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/constants"

export default function robots(): MetadataRoute.Robots {
  let hostname = ""
  try {
    hostname = new URL(SITE_URL).hostname
  } catch (error) {
    console.error("Error getting hostname", error)
  }

  const isProduction = hostname === "ethereum.org"

  if (!isProduction) {
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
