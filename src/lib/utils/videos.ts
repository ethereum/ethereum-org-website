import { readFile } from "fs/promises"
import { join } from "path"

import matter from "gray-matter"

import type { VideoCardData, VideoData } from "@/lib/types"
import type { VideoFrontmatter } from "@/lib/interfaces"

import { CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import { getVideoThumbnails } from "@/lib/data"
import {
  contentSource,
  getContentSource,
  listSlugsUnder,
} from "@/lib/poc-fumadocs/source"

// Build-time caches to avoid redundant filesystem reads during static generation.
// These are module-scoped Maps that persist for the duration of the build process.
const videoDataCache = new Map<string, VideoData>()
const videosCache = new Map<string, VideoCardData[]>()
let slugsCache: string[] | null = null

/**
 * Resolve the absolute path to a video's index.md for a given locale.
 * English: public/content/videos/{slug}/index.md
 * Translated: public/content/translations/{locale}/videos/{slug}/index.md
 */
function videoPath(slug: string, locale: string): string {
  return join(
    process.cwd(),
    CONTENT_DIR,
    locale === DEFAULT_LOCALE ? "" : `translations/${locale}`,
    `videos/${slug}/index.md`
  )
}

/**
 * Read and parse a video's index.md file for a given slug and locale.
 * Returns the full frontmatter and markdown body content.
 *
 * Results are cached per slug+locale to avoid redundant reads during
 * static generation (generateStaticParams, generateMetadata, and the
 * page component all call this for the same slug).
 *
 * For non-English locales, metadata (youtubeId, duration, etc.) is always
 * read from the English source. Title and description are overridden from
 * the translated file if available.
 */
export async function getVideoData(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<VideoData> {
  const cacheKey = `${locale}:${slug}`
  const cached = videoDataCache.get(cacheKey)
  if (cached) return cached

  // Always read English source for full metadata.
  // gray-matter has a global content-keyed cache that returns a shallow copy
  // (`data` shared by reference), so we spread to avoid mutating the cached
  // object — otherwise overriding title/description below leaks across locales.
  const enPath = videoPath(slug, DEFAULT_LOCALE)
  const enRaw = await readFile(enPath, "utf-8")
  const enParsed = matter(enRaw)
  const frontmatter = { ...enParsed.data } as VideoFrontmatter

  // gray-matter auto-converts YAML dates to Date objects; coerce back to string
  if ((frontmatter.uploadDate as unknown) instanceof Date) {
    frontmatter.uploadDate = (frontmatter.uploadDate as unknown as Date)
      .toISOString()
      .split("T")[0]
  }
  let content = enParsed.content

  // For non-English locales, try to read translated title/description
  if (locale !== DEFAULT_LOCALE) {
    try {
      const localePath = videoPath(slug, locale)
      const localeRaw = await readFile(localePath, "utf-8")
      const localeParsed = matter(localeRaw)

      if (typeof localeParsed.data.title === "string") {
        frontmatter.title = localeParsed.data.title
      }
      if (typeof localeParsed.data.description === "string") {
        frontmatter.description = localeParsed.data.description
      }
      // Use translated body if available
      if (localeParsed.content.trim()) {
        content = localeParsed.content
      }
    } catch {
      // Translated file not found -- use English (already loaded)
    }
  }

  const result = { slug, content, frontmatter }
  videoDataCache.set(cacheKey, result)
  return result
}

/**
 * Get all video slugs from the content manifest (.source/manifest.json).
 * No filesystem walk — the manifest is the source of truth.
 */
export async function getVideoSlugs(): Promise<string[]> {
  if (slugsCache) return slugsCache
  slugsCache = listSlugsUnder("videos")
  return slugsCache
}

/**
 * Get all videos for the gallery hub page. Resolves frontmatter from the
 * manifest only (no fs reads) — title/description come from the locale
 * manifest with EN as fallback; structural metadata (youtubeId, duration,
 * uploadDate, topic) always comes from EN.
 */
export async function getVideos(
  locale: string = DEFAULT_LOCALE
): Promise<VideoCardData[]> {
  const cached = videosCache.get(locale)
  if (cached) return cached

  const [slugs, thumbnailMap] = await Promise.all([
    getVideoSlugs(),
    getVideoThumbnails().catch(() => null),
  ])

  const localeSrc = getContentSource(locale)

  const videos = slugs.flatMap((slug): VideoCardData[] => {
    const enPage = contentSource?.getPage(["videos", slug])
    if (!enPage) return []
    const en = enPage.data as unknown as VideoFrontmatter

    const localePage = localeSrc?.getPage(["videos", slug])
    const localeFm = (localePage?.data ?? {}) as Partial<VideoFrontmatter>

    return [
      {
        slug,
        title: typeof localeFm.title === "string" ? localeFm.title : en.title,
        description:
          typeof localeFm.description === "string"
            ? localeFm.description
            : en.description,
        uploadDate:
          typeof en.uploadDate === "string"
            ? en.uploadDate
            : new Date(en.uploadDate as unknown as Date)
                .toISOString()
                .split("T")[0],
        duration: en.duration,
        topic: en.topic,
        thumbnailUrl: thumbnailMap?.[slug] || "",
      },
    ]
  })

  videosCache.set(locale, videos)
  return videos
}
