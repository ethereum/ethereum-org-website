import type { MetadataRoute } from "next"

import { getFullUrl } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { getAllPagesWithTranslations } from "@/lib/i18n/translationRegistry"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPagesWithTranslations()

  const entries: MetadataRoute.Sitemap = []

  for (const { slug, translatedLocales } of pages) {
    const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`

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

  return entries
}
