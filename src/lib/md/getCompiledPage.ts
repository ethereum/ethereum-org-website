import { DEFAULT_LOCALE } from "@/lib/constants"

import { type Page, pages, type Video, videos } from "#velite"

// Singleton lookup maps built lazily on first access. Velite output is large
// (~6.5k pages, ~1.5k videos), so we index once per process.
let pagesByKey: Map<string, Page> | null = null
let videosByKey: Map<string, Video> | null = null

const pageKey = (locale: string, slug: string) => `${locale}:${slug}`

const getPagesMap = (): Map<string, Page> => {
  if (pagesByKey) return pagesByKey
  pagesByKey = new Map()
  for (const page of pages as Page[]) {
    pagesByKey.set(pageKey(page.locale, page.slug), page)
  }
  return pagesByKey
}

const getVideosMap = (): Map<string, Video> => {
  if (videosByKey) return videosByKey
  videosByKey = new Map()
  for (const video of videos as Video[]) {
    videosByKey.set(pageKey(video.locale, video.slug), video)
  }
  return videosByKey
}

/**
 * Resolve a compiled page for (locale, slug) with English fallback.
 *
 * - Translated entry exists → return it (`isTranslated: true` baked in).
 * - Otherwise English entry → return it with `isTranslated: false` so the UI
 *   can render the "not translated" badge.
 * - Neither → null (caller should 404).
 */
export const getCompiledPage = (locale: string, slug: string): Page | null => {
  const map = getPagesMap()
  const translated = map.get(pageKey(locale, slug))
  if (translated) return translated
  const english = map.get(pageKey(DEFAULT_LOCALE, slug))
  if (english) return { ...english, isTranslated: false }
  return null
}

/**
 * Resolve a compiled video for (locale, slug) with English fallback.
 * Returns the English entry with translated title/description merged in when a
 * partial translation exists -- mirrors the legacy getVideoData behaviour where
 * video metadata always comes from the English source.
 */
export const getCompiledVideo = (
  locale: string,
  slug: string
): Video | null => {
  const map = getVideosMap()
  const english = map.get(pageKey(DEFAULT_LOCALE, slug))
  if (!english) return null
  if (locale === DEFAULT_LOCALE) return english

  const translated = map.get(pageKey(locale, slug))
  if (!translated) return { ...english, isTranslated: false }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const translatedRaw: string = (translated as any).rawBody ?? ""
  const useTranslatedBody = translatedRaw.trim().length > 0

  return {
    ...english,
    title: translated.title || english.title,
    description: translated.description || english.description,
    body: useTranslatedBody ? translated.body : english.body,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rawBody: useTranslatedBody
      ? translatedRaw
      : ((english as any).rawBody ?? ""),
    locale,
    isTranslated: true,
  }
}

/**
 * All English page slugs. Used by generateStaticParams for the [...slug] route
 * and by translation registry / sitemap building.
 */
export const getEnglishPageSlugs = (): string[] => {
  return (pages as Page[])
    .filter((p) => p.locale === DEFAULT_LOCALE)
    .map((p) => p.slug)
}

/**
 * All English video slugs.
 */
export const getEnglishVideoSlugs = (): string[] => {
  return (videos as Video[])
    .filter((v) => v.locale === DEFAULT_LOCALE)
    .map((v) => v.slug)
}

/**
 * All (locale, slug) pairs for which a translated page file actually exists.
 * Used by the translation registry to determine hreflang availability without
 * touching the filesystem.
 */
export const getTranslatedPageLocalesBySlug = (): Map<string, Set<string>> => {
  const result = new Map<string, Set<string>>()
  for (const page of pages as Page[]) {
    const set = result.get(page.slug) ?? new Set<string>()
    set.add(page.locale)
    result.set(page.slug, set)
  }
  return result
}

/**
 * All (locale, slug) pairs for which a translated video file actually exists.
 */
export const getTranslatedVideoLocalesBySlug = (): Map<string, Set<string>> => {
  const result = new Map<string, Set<string>>()
  for (const video of videos as Video[]) {
    const set = result.get(video.slug) ?? new Set<string>()
    set.add(video.locale)
    result.set(video.slug, set)
  }
  return result
}
