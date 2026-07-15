import type { MetadataRoute } from "next"

import { getFullUrl, toLanguageTag } from "@/lib/utils/url"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { getAllPagesWithTranslations } from "@/lib/i18n/translationRegistry"

// Generate at build time only. Without this the route's transitive data-layer
// dependency (finite-revalidate getters) opts it into ISR, so Netlify re-renders
// it in the serverless function where public/content is excluded from the bundle
// -- yielding empty markdown slugs and a truncated sitemap. No `revalidate`: ISR
// re-enters that broken path; freshness rides the deploy cadence instead.
export const dynamic = "force-static"

// One shard per locale. A single combined document is ~51MB / 17.5k URLs -- over
// Google's 50MB per-file limit -- so it must be split. Next serves each shard at
// /sitemap/<id>.xml and emits no index file, so app/robots.ts lists them all.
export async function generateSitemaps() {
  return LOCALES_CODES.map((locale) => ({ id: locale }))
}

// getAllPagesWithTranslations walks the whole content tree; memoize so the
// per-locale shards share a single traversal instead of repeating it each time.
let pagesPromise: ReturnType<typeof getAllPagesWithTranslations> | null = null
const getPages = () => (pagesPromise ??= getAllPagesWithTranslations())

export default async function sitemap({
  id,
}: {
  id: Promise<string>
}): Promise<MetadataRoute.Sitemap> {
  const locale = await id
  const pages = await getPages()

  const entries: MetadataRoute.Sitemap = []
  const seenUrls = new Set<string>()

  for (const { slug, translatedLocales } of pages) {
    // This shard only carries URLs for its own locale; the full hreflang
    // alternates block is still emitted so each URL cross-references every
    // translated version.
    if (!translatedLocales.includes(locale)) continue

    const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`
    const alternates =
      translatedLocales.length > 0
        ? {
            languages: {
              "x-default": getFullUrl(DEFAULT_LOCALE, normalizedSlug),
              ...Object.fromEntries(
                translatedLocales.map((altLocale) => [
                  toLanguageTag(altLocale),
                  getFullUrl(altLocale, normalizedSlug),
                ])
              ),
            },
          }
        : undefined

    const url = getFullUrl(locale, normalizedSlug)
    if (seenUrls.has(url)) continue
    seenUrls.add(url)

    entries.push({ url, alternates })
  }

  return entries
}
