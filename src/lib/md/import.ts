import {
  BASE_TIME_UNIT,
  DEFAULT_LOCALE,
  PRERENDER_LOCALES,
  SITE_URL,
  TIMEOUT_MS,
} from "../constants"
import { fetchWithTimeoutAndRevalidation } from "../utils/data/utils"

/**
 * Fetches markdown from the deployed site's static assets.
 * Files in public/content/ are served at /content/...
 */
const fetchMarkdownFromSite = async (
  locale: string,
  slug: string
): Promise<string> => {
  const contentPath =
    locale === DEFAULT_LOCALE
      ? `/content/${slug}/index.md`
      : `/content/translations/${locale}/${slug}/index.md`

  const url = `${SITE_URL}${contentPath}`

  const response = await fetchWithTimeoutAndRevalidation(
    url,
    TIMEOUT_MS,
    BASE_TIME_UNIT * 24
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch markdown: ${response.status} ${url}`)
  }

  return await response.text()
}

/**
 * Imports markdown content:
 * - Static locales: imported locally at build time (bundled)
 * - Dynamic locales: fetched from the deployed site's CDN at runtime
 */
export const importMd = async (locale: string, slug: string) => {
  const isPrerendered = PRERENDER_LOCALES.includes(locale)

  // Default locale is always bundled locally
  if (locale === DEFAULT_LOCALE) {
    const markdown = (await import(`../../../public/content/${slug}/index.md`))
      .default
    return { markdown, isTranslated: true }
  }

  // Pre-rendered locales: bundled at build time
  if (isPrerendered) {
    try {
      const markdown = (
        await import(
          `../../../public/content/translations/${locale}/${slug}/index.md`
        )
      ).default
      return { markdown, isTranslated: true }
    } catch {
      // Translation missing, fall back to English
      const markdown = (
        await import(`../../../public/content/${slug}/index.md`)
      ).default
      return { markdown, isTranslated: false }
    }
  }

  // Dynamic locales: fetch from deployed site at runtime
  try {
    const markdown = await fetchMarkdownFromSite(locale, slug)
    return { markdown, isTranslated: true }
  } catch {
    // Translation missing or fetch failed, fall back to English from CDN
    try {
      const markdown = await fetchMarkdownFromSite(DEFAULT_LOCALE, slug)
      return { markdown, isTranslated: false }
    } catch {
      // Last resort: try local English (should always work for valid slugs)
      const markdown = (
        await import(`../../../public/content/${slug}/index.md`)
      ).default
      return { markdown, isTranslated: false }
    }
  }
}
