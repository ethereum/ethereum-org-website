import {
  BASE_TIME_UNIT,
  DEFAULT_LOCALE,
  DEPLOY_URL,
  PRERENDER_LOCALES,
  TIMEOUT_MS,
} from "../constants"
import { fetchWithTimeoutAndRevalidation } from "../utils/data/utils"

/**
 * Markdown Import Strategy
 *
 * - Pre-rendered locales (PRERENDER_LOCALES): bundled at build time
 * - Dynamic locales: fetched from CDN at runtime
 * - English: always bundled — guaranteed fallback
 *
 * Why? Can't pre-render all locales (Netlify build limits).
 * Top locales = 80% traffic, so we pre-render those for edge caching.
 */

const fetchMarkdownFromCDN = async (
  locale: string,
  slug: string
): Promise<string> => {
  const contentPath = `/content/translations/${locale}/${slug}/index.md`
  const url = `${DEPLOY_URL}${contentPath}`

  const response = await fetchWithTimeoutAndRevalidation(
    url,
    TIMEOUT_MS,
    BASE_TIME_UNIT * 24
  )

  if (!response.ok) {
    throw new Error(`${response.status} ${url}`)
  }

  return await response.text()
}

const importEnglishMarkdown = async (slug: string): Promise<string> => {
  const mdModule = await import(`../../../public/content/${slug}/index.md`)
  return mdModule.default
}

export const importMd = async (
  locale: string,
  slug: string
): Promise<{ markdown: string; isTranslated: boolean }> => {
  if (locale === DEFAULT_LOCALE) {
    const markdown = await importEnglishMarkdown(slug)
    return { markdown, isTranslated: true }
  }

  const isPrerendered = PRERENDER_LOCALES.includes(locale)

  if (isPrerendered) {
    try {
      const markdown = (
        await import(
          `../../../public/content/translations/${locale}/${slug}/index.md`
        )
      ).default
      return { markdown, isTranslated: true }
    } catch {
      console.warn(
        `[i18n] Missing translation: ${locale}/${slug} — using English`
      )
      const markdown = await importEnglishMarkdown(slug)
      return { markdown, isTranslated: false }
    }
  }

  // Dynamic locale: fetch from CDN, fallback to English if unavailable
  try {
    const markdown = await fetchMarkdownFromCDN(locale, slug)
    return { markdown, isTranslated: true }
  } catch (error) {
    console.warn(
      `[i18n] CDN fetch failed for ${locale}/${slug}:`,
      error instanceof Error ? error.message : error,
      "— using English"
    )
    const markdown = await importEnglishMarkdown(slug)
    return { markdown, isTranslated: false }
  }
}
