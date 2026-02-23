import type { MetadataRoute } from "next"

import { isLocaleValidISO639_1 } from "@/lib/utils/translations"
import { getFullUrl } from "@/lib/utils/url"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { getAllPagesWithTranslations } from "@/lib/i18n/translationRegistry"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPagesWithTranslations()

  const entries: MetadataRoute.Sitemap = []
  const seenUrls = new Set<string>()

  for (const { slug, translatedLocales } of pages) {
    const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`
    const localesForHreflang = translatedLocales.filter(isLocaleValidISO639_1)
    const alternates =
      localesForHreflang.length > 0
        ? {
            languages: {
              "x-default": getFullUrl(DEFAULT_LOCALE, normalizedSlug),
              ...Object.fromEntries(
                localesForHreflang.map((locale) => [
                  locale,
                  getFullUrl(locale, normalizedSlug),
                ])
              ),
            },
          }
        : undefined

    for (const locale of translatedLocales) {
      const url = getFullUrl(locale, normalizedSlug)

      if (seenUrls.has(url)) {
        continue
      }

      seenUrls.add(url)

      entries.push({
        url,
        alternates,
      })
    }
  }

  return entries
}
