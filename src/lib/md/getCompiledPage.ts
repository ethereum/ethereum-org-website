import { readFileSync } from "node:fs"
import path from "node:path"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { type Page, type Video } from "#velite"

// Per-entry layout written by velite.config.ts `complete` hook:
//
//   .velite/pages/{locale}/{slug}.json
//   .velite/videos/{locale}/{slug}.json
//   .velite/manifest.json   { pages: { [locale]: slugs[] }, videos: { [locale]: VideoMeta[] } }
//
// Importing the bulk `pages` / `videos` arrays from `#velite` would load
// ~240 MB of compiled-MDX JSON into RSS for every worker (×N workers under
// next build's static-gen), which OOM'd the Netlify build container. With
// per-entry reads only the page currently being rendered is in memory.

const VELITE_DIR = path.join(process.cwd(), ".velite")

type VideoCardMeta = Pick<
  Video,
  | "slug"
  | "title"
  | "description"
  | "uploadDate"
  | "duration"
  | "topic"
  | "isTranslated"
>

type Manifest = {
  pages: Record<string, string[]>
  videos: Record<string, VideoCardMeta[]>
}

// Tiny (~2 MB), safe to keep resident for the whole build.
let manifestCache: Manifest | null = null
const getManifest = (): Manifest => {
  if (manifestCache) return manifestCache
  const raw = readFileSync(path.join(VELITE_DIR, "manifest.json"), "utf8")
  manifestCache = JSON.parse(raw) as Manifest
  return manifestCache
}

const entryFile = (kind: "pages" | "videos", locale: string, slug: string) =>
  path.join(VELITE_DIR, kind, locale, `${slug === "" ? "_root" : slug}.json`)

const readEntry = <T>(file: string): T | null => {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as T
  } catch {
    return null
  }
}

const readPageEntry = (locale: string, slug: string): Page | null =>
  readEntry<Page>(entryFile("pages", locale, slug))

const readVideoEntry = (locale: string, slug: string): Video | null =>
  readEntry<Video>(entryFile("videos", locale, slug))

/**
 * Resolve a compiled page for (locale, slug) with English fallback.
 *
 * - Translated entry exists → return it (`isTranslated: true` baked in).
 * - Otherwise English entry → return it with `isTranslated: false` so the UI
 *   can render the "not translated" badge.
 * - Neither → null (caller should 404).
 */
export const getCompiledPage = (locale: string, slug: string): Page | null => {
  const translated = readPageEntry(locale, slug)
  if (translated) return translated
  if (locale === DEFAULT_LOCALE) return null
  const english = readPageEntry(DEFAULT_LOCALE, slug)
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
  const english = readVideoEntry(DEFAULT_LOCALE, slug)
  if (!english) return null
  if (locale === DEFAULT_LOCALE) return english

  const translated = readVideoEntry(locale, slug)
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
      : ((english as unknown).rawBody ?? ""),
    locale,
    isTranslated: true,
  }
}

/**
 * All English page slugs. Used by generateStaticParams for the [...slug] route
 * and by translation registry / sitemap building.
 */
export const getEnglishPageSlugs = (): string[] => {
  return getManifest().pages[DEFAULT_LOCALE] ?? []
}

/**
 * All English video slugs.
 */
export const getEnglishVideoSlugs = (): string[] => {
  return (getManifest().videos[DEFAULT_LOCALE] ?? []).map((v) => v.slug)
}

/**
 * All (locale, slug) pairs for which a translated page file actually exists.
 * Used by the translation registry to determine hreflang availability without
 * touching the filesystem.
 */
export const getTranslatedPageLocalesBySlug = (): Map<string, Set<string>> => {
  const result = new Map<string, Set<string>>()
  for (const [locale, slugs] of Object.entries(getManifest().pages)) {
    for (const slug of slugs) {
      const set = result.get(slug) ?? new Set<string>()
      set.add(locale)
      result.set(slug, set)
    }
  }
  return result
}

/**
 * All (locale, slug) pairs for which a translated video file actually exists.
 */
export const getTranslatedVideoLocalesBySlug = (): Map<string, Set<string>> => {
  const result = new Map<string, Set<string>>()
  for (const [locale, metas] of Object.entries(getManifest().videos)) {
    for (const { slug } of metas) {
      const set = result.get(slug) ?? new Set<string>()
      set.add(locale)
      result.set(slug, set)
    }
  }
  return result
}

/**
 * Card-level video metadata (no compiled body) for a locale. Falls back to
 * English entries for videos that aren't translated. Used by the videos
 * listing page where reading all bodies would be wasteful.
 */
export const getVideoCardMetas = (
  locale: string
): Array<VideoCardMeta & { slug: string }> => {
  const m = getManifest().videos
  const english = m[DEFAULT_LOCALE] ?? []
  if (locale === DEFAULT_LOCALE) return english

  const translatedBySlug = new Map<string, VideoCardMeta>()
  for (const v of m[locale] ?? []) translatedBySlug.set(v.slug, v)

  return english.map((en) => {
    const tr = translatedBySlug.get(en.slug)
    if (!tr) return { ...en, isTranslated: false }
    return {
      slug: en.slug,
      title: tr.title || en.title,
      description: tr.description || en.description,
      uploadDate: en.uploadDate,
      duration: en.duration,
      topic: en.topic,
      isTranslated: true,
    }
  })
}
