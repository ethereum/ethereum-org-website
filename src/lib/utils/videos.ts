import type { VideoCardData } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { getVideoThumbnails } from "@/lib/data"
import { getVideoCardMetas } from "@/lib/md/getCompiledPage"

const videosCache = new Map<string, VideoCardData[]>()

/**
 * Get all videos by reading the Velite-compiled videos manifest.
 * Returns a flat VideoCardData[] suitable for client components.
 * Results are cached per locale for the duration of the build.
 */
export async function getVideos(
  locale: string = DEFAULT_LOCALE
): Promise<VideoCardData[]> {
  const cached = videosCache.get(locale)
  if (cached) return cached

  const thumbnailMap = await getVideoThumbnails().catch(() => null)

  const metas = getVideoCardMetas(locale)
  const videos: VideoCardData[] = metas.map((m) => ({
    slug: m.slug,
    title: m.title ?? "",
    description: m.description ?? "",
    uploadDate: m.uploadDate ?? "",
    duration:
      typeof m.duration === "number" ? String(m.duration) : (m.duration ?? ""),
    topic: Array.isArray(m.topic) ? m.topic : m.topic ? [m.topic] : [],
    thumbnailUrl: thumbnailMap?.[m.slug] || "",
  }))

  videosCache.set(locale, videos)
  return videos
}
