import type { VideoCardData, VideoData } from "@/lib/types"
import type { VideoFrontmatter } from "@/lib/interfaces"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { contentSource, getContentSource } from "./source"

import { getVideoThumbnails } from "@/lib/data"

// Fumadocs-backed replacements for the helpers in src/lib/utils/videos.ts.
// Video frontmatter is sourced from the compiled `content_<locale>` collections
// in `.source/`, so the hub and detail routes don't have to touch
// `public/content/` at request time.

const VIDEOS_PREFIX = "videos"

/**
 * Get all video slugs from the EN collection. Videos are content-typed pages
 * at `videos/<slug>/index.md`; in fumadocs terms that maps to a 2-segment
 * `page.slugs` of `["videos", "<slug>"]`.
 */
export function getVideoSlugsFromFumadocs(): string[] {
  if (!contentSource) return []
  return contentSource
    .getPages()
    .filter((p) => p.slugs[0] === VIDEOS_PREFIX && p.slugs.length === 2)
    .map((p) => p.slugs[1]!)
}

function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split("T")[0]!
  return String(value ?? "")
}

/**
 * Look up a single video's frontmatter for the given locale.
 * Mirrors `getVideoData`: EN is canonical; for non-EN, title/description
 * override from the locale collection when present.
 *
 * Returns `null` when the EN source for the slug is missing — callers should
 * `notFound()` in that case.
 */
export async function getVideoFrontmatterFromFumadocs(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<VideoFrontmatter | null> {
  const enPage = contentSource?.getPage([VIDEOS_PREFIX, slug])
  if (!enPage) return null

  const enFm = enPage.data as unknown as Record<string, unknown>
  const frontmatter = { ...enFm } as unknown as VideoFrontmatter

  // YAML dates land as `Date` objects via gray-matter; coerce to YYYY-MM-DD
  // so downstream `<time>` / JSON-LD formatting stays consistent.
  frontmatter.uploadDate = isoDate(enFm.uploadDate)

  if (locale !== DEFAULT_LOCALE) {
    const localePage = getContentSource(locale)?.getPage([VIDEOS_PREFIX, slug])
    if (localePage) {
      const localeFm = localePage.data as unknown as Record<string, unknown>
      if (typeof localeFm.title === "string") frontmatter.title = localeFm.title
      if (typeof localeFm.description === "string") {
        frontmatter.description = localeFm.description
      }
    }
  }

  return frontmatter
}

/**
 * Resolve the fumadocs page object that carries the body/toc loader for a
 * given video. Returns the locale page when a translation exists, otherwise
 * the EN fallback (matching today's behaviour).
 */
export function getVideoPageFromFumadocs(slug: string, locale: string) {
  const localePage = getContentSource(locale)?.getPage([VIDEOS_PREFIX, slug])
  if (localePage) return localePage
  return contentSource?.getPage([VIDEOS_PREFIX, slug])
}

/**
 * `getVideoData`-shaped result, minus the raw markdown body (which used to
 * come from `matter()` and now lives behind `page.data.load()`). Callers that
 * need the rendered body should call `getVideoPageFromFumadocs(...)` and
 * await `data.load()` themselves.
 */
export async function getVideoDataFromFumadocs(
  slug: string,
  locale: string = DEFAULT_LOCALE
): Promise<VideoData | null> {
  const frontmatter = await getVideoFrontmatterFromFumadocs(slug, locale)
  if (!frontmatter) return null
  return { slug, content: "", frontmatter }
}

/**
 * Flatten all videos for the hub listing. Mirrors `getVideos(locale)`.
 */
export async function getVideosFromFumadocs(
  locale: string = DEFAULT_LOCALE
): Promise<VideoCardData[]> {
  const slugs = getVideoSlugsFromFumadocs()
  const thumbnailMap = await getVideoThumbnails().catch(() => null)

  const results = await Promise.all(
    slugs.map(async (slug) => {
      const fm = await getVideoFrontmatterFromFumadocs(slug, locale)
      if (!fm) return null
      const card: VideoCardData = {
        slug,
        title: fm.title,
        description: fm.description,
        uploadDate: fm.uploadDate,
        duration: fm.duration,
        topic: fm.topic,
        thumbnailUrl: thumbnailMap?.[slug] || "",
      }
      return card
    })
  )

  return results.filter((v): v is VideoCardData => v !== null)
}
