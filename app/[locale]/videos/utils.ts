import { VideoCardData } from "@/lib/types"

export function getVideosByCategory(
  videos: VideoCardData[],
  tags: readonly string[]
): VideoCardData[] {
  const lowerTags = new Set(tags.map((t) => t.trim().toLowerCase()))
  return videos.filter((video) =>
    video.topic.some((vt) => lowerTags.has(vt.trim().toLowerCase()))
  )
}
