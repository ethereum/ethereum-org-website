import type { VideoCardData } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import { getVideoThumbnails } from "@/lib/data"
import {
  getCompiledVideo,
  getEnglishVideoSlugs,
} from "@/lib/md/getCompiledPage"

const videosCache = new Map<string, VideoCardData[]>()

/**
 * Get all videos by reading the Velite-compiled videos collection.
 * Returns a flat VideoCardData[] suitable for client components.
 * Results are cached per locale for the duration of the build.
 */
export async function getVideos(
  locale: string = DEFAULT_LOCALE
): Promise<VideoCardData[]> {
  const cached = videosCache.get(locale)
  if (cached) return cached

  const thumbnailMap = await getVideoThumbnails().catch(() => null)

  const slugs = getEnglishVideoSlugs()
  const results = slugs.map((slug) => {
    const video = getCompiledVideo(locale, slug)
    if (!video) return null
    return {
      slug,
      title: video.title ?? "",
      description: video.description ?? "",
      uploadDate: video.uploadDate ?? "",
      duration: video.duration ?? "",
      topic: video.topic,
      thumbnailUrl: thumbnailMap?.[slug] || "",
    } as VideoCardData
  })

  const videos = results.filter((v): v is VideoCardData => v !== null)
  videosCache.set(locale, videos)
  return videos
}
