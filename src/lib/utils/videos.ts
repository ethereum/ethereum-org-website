import { readdir, readFile } from "fs/promises"
import { join } from "path"

import matter from "gray-matter"

import type { VideoCardData, VideoData } from "@/lib/types"
import type { VideoFrontmatter } from "@/lib/interfaces"

import { CONTENT_DIR, DEFAULT_LOCALE } from "@/lib/constants"

// Build-time caches to avoid redundant filesystem reads during static generation.
// These are module-scoped Maps that persist for the duration of the build process.
const videoDataCache = new Map<string, VideoData>()
const videosCache = new Map<string, VideoCardData[]>()

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
 * Default YouTube thumbnail URL derived from a video ID.
 */
export function getDefaultThumbnailUrl(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`
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

  // Always read English source for full metadata
  const enPath = videoPath(slug, DEFAULT_LOCALE)
  const enRaw = await readFile(enPath, "utf-8")
  const enParsed = matter(enRaw)
  const frontmatter = enParsed.data as VideoFrontmatter

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
 */
function toVideoCardData(data: VideoData): VideoCardData {
  const { slug, frontmatter: fm } = data
  return {
    slug,
    title: fm.title,
    description: fm.description,
    youtubeId: fm.youtubeId,
    uploadDate: fm.uploadDate,
    duration: fm.duration,
    educationLevel: fm.educationLevel,
    topic: fm.topic,
    format: fm.format,
    author: fm.author,
    thumbnailUrl: fm.customThumbnailUrl || getDefaultThumbnailUrl(fm.youtubeId),
  }
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

  const videosDir = join(process.cwd(), CONTENT_DIR, "videos")
  const entries = await readdir(videosDir, { withFileTypes: true })
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const data = await getVideoData(slug, locale)
        return toVideoCardData(data)
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

/**
 * Get all video slugs by scanning the content/videos directory.
 */
export async function getVideoSlugs(): Promise<string[]> {
  const videosDir = join(process.cwd(), CONTENT_DIR, "videos")
  const entries = await readdir(videosDir, { withFileTypes: true })
  return entries.filter((e) => e.isDirectory()).map((e) => e.name)
}

/**
 * Get the markdown body (transcript) for a video.
 * Returns empty string if no body content exists.
 */
export async function getTranscript(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<string> {
  const data = await getVideoData(slug, locale)
  return data.content
}

/**
 * Get the title and description for a video from its frontmatter.
 */
export async function getVideoMeta(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<{ title: string; description: string }> {
  const data = await getVideoData(slug, locale)
  return {
    title: data.frontmatter.title,
    description: data.frontmatter.description,
  }
}
