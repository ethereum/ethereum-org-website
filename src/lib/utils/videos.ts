import { readdir, readFile } from "fs/promises"
import { join } from "path"

import matter from "gray-matter"

import type { VideoCardData, VideoData } from "@/lib/types"
import type { VideoFrontmatter } from "@/lib/interfaces"

import { CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

import { getVideoThumbnails } from "@/lib/data"

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
 * Convert VideoData to a flat VideoCardData suitable for client components.
 * Thumbnails are served from S3 (populated by the fetchVideoThumbnails task,
 * which handles both YouTube and customThumbnailUrl sources). When the S3 map
 * is unavailable (e.g. local dev without Netlify Blobs) or missing an entry,
 * fall back to the YouTube hqdefault thumbnail, which always exists.
 */
function toVideoCardData(
  data: VideoData,
  thumbnailMap: Record<string, string> | null
): VideoCardData {
  const { slug, frontmatter: fm } = data
  const youtubeFallback = fm.youtubeId
    ? `https://img.youtube.com/vi/${fm.youtubeId}/hqdefault.jpg`
    : ""
  return {
    slug,
    title: fm.title,
    description: fm.description,
    uploadDate: fm.uploadDate,
    duration: fm.duration,
    topic: fm.topic,
    thumbnailUrl: thumbnailMap?.[slug] || youtubeFallback,
  }
}

/**
 * Get all video slugs by scanning the content/videos directory.
 * Results are cached for the duration of the build.
 */
export async function getVideoSlugs(): Promise<string[]> {
  if (slugsCache) return slugsCache

  const videosDir = join(process.cwd(), CONTENT_DIR, "videos")
  const entries = await readdir(videosDir, { withFileTypes: true })
  slugsCache = entries.filter((e) => e.isDirectory()).map((e) => e.name)
  return slugsCache
}

/**
 * Get all videos by scanning the content/videos directory.
 * Returns flat VideoCardData[] suitable for passing to client components.
 * Results are cached per locale for the duration of the build.
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

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const data = await getVideoData(slug, locale)
        return toVideoCardData(data, thumbnailMap)
      } catch {
        console.warn(`Skipping video ${slug}: missing index.md`)
        return null
      }
    })
  )

  const videos = results.filter((v): v is VideoCardData => v !== null)
  videosCache.set(locale, videos)
  return videos
}
