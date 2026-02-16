import type { Video } from "@/lib/types"

import videosData from "@/data/videos.json"

/**
 * Get all videos from the static JSON data file.
 */
export async function getVideos(): Promise<Video[]> {
  return videosData as Video[]
}

/**
 * Get a single video by its URL slug.
 * Returns null if no video matches the given slug.
 */
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const videos = await getVideos()
  return videos.find((v) => v.slug === slug) ?? null
}
