import type { MetadataRoute } from "next"

import { getFullUrl, slugify } from "@/lib/utils/url"

import { DEFAULT_LOCALE, SITE_URL } from "@/lib/constants"

import { appsCategories } from "@/data/apps/categories"
import { DEV_TOOL_CATEGORIES } from "./[locale]/developers/tools/constants"

import { getAllPagesWithTranslations } from "@/lib/i18n/translationRegistry"

import { getAppsData } from "@/lib/data"

// Slugs that canonicalize elsewhere and should not appear in the sitemap
const EXCLUDED_SLUGS = ["/developers/tutorials/ipfs-decentralized-ui/"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPagesWithTranslations()

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: new Date(),
    },
  ]

  for (const { slug, translatedLocales } of pages) {
    const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`

    // Skip excluded slugs
    if (EXCLUDED_SLUGS.includes(normalizedSlug)) continue

    for (const locale of translatedLocales) {
      const url = getFullUrl(locale, normalizedSlug)

      // Drop the `/en` root entry to avoid duplicating `/`
      // This happens when slug is "/" and locale is default
      if (
        locale === DEFAULT_LOCALE &&
        (normalizedSlug === "/" || normalizedSlug === "")
      ) {
        continue
      }

      const isDefaultLocale = locale === DEFAULT_LOCALE

      entries.push({
        url,
        changeFrequency: isDefaultLocale ? "weekly" : "monthly",
        priority: isDefaultLocale ? 0.7 : 0.5,
        lastModified: new Date(),
      })
    }
  }

  // Add app category pages
  for (const category of Object.values(appsCategories)) {
    entries.push({
      url: `${SITE_URL}/apps/categories/${category.slug}/`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified: new Date(),
    })
  }

  // Add developer tools category pages (dynamic route: /developers/tools/[category])
  for (const { slug } of DEV_TOOL_CATEGORIES) {
    entries.push({
      url: `${SITE_URL}/developers/tools/${slug}/`,
      changeFrequency: "monthly",
      priority: 0.6,
      lastModified: new Date(),
    })
  }

  // Add individual app pages
  const appsData = await getAppsData()
  if (appsData) {
    const appSlugs = new Set<string>()
    for (const apps of Object.values(appsData)) {
      for (const app of apps) {
        appSlugs.add(slugify(app.name))
      }
    }
    for (const slug of appSlugs) {
      entries.push({
        url: `${SITE_URL}/apps/${slug}/`,
        changeFrequency: "monthly",
        priority: 0.5,
        lastModified: new Date(),
      })
    }
  }

  return entries
}
