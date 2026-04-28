import { readdir, readFile } from "fs/promises"
import { join } from "path"

import matter from "gray-matter"

import type { VideoFrontmatter } from "@/lib/interfaces"

import { CONTENT_DIR } from "@/lib/constants"

import { uploadToS3 } from "../s3"

const THUMBNAIL_PREFIX = "videos/thumbnails"

/**
 * Derive an S3 key extension from a URL path. Falls back to "jpg".
 */
function extFromUrl(url: string): string {
  const last = url.split("?")[0].split(".").pop()?.toLowerCase()
  const valid = ["jpg", "jpeg", "png", "webp", "gif", "avif", "svg"]
  return last && valid.includes(last) ? last : "jpg"
}

/**
 * YouTube thumbnail URL for a given video ID and quality level.
 * - sddefault (640x480): best quality, but returns 404 for some videos
 * - hqdefault (480x360): always exists
 */
function youtubeThumbnailUrl(youtubeId: string, quality: "sd" | "hq"): string {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}default.jpg`
}

/**
 * Fetch video thumbnails from YouTube (or custom URLs) and upload to S3.
 * Keyed by video slug so each video maps to exactly one S3 object.
 *
 * For each video:
 * 1. If customThumbnailUrl exists, upload that
 * 2. Otherwise try sddefault.jpg first (best quality)
 * 3. Fall back to hqdefault.jpg if sd fails
 *
 * Returns a map of video slug -> S3 thumbnail URL.
 */
export async function fetchVideoThumbnails(): Promise<Record<string, string>> {
  console.log("Starting video thumbnail sync to S3")

  const videosDir = join(process.cwd(), CONTENT_DIR, "videos")
  const entries = await readdir(videosDir, { withFileTypes: true })
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name)

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const mdPath = join(videosDir, slug, "index.md")
        const raw = await readFile(mdPath, "utf-8")
        const { data } = matter(raw)
        const fm = data as VideoFrontmatter

        // YouTube thumbs are always jpg; custom URLs derive ext from the path.
        const ext = fm.customThumbnailUrl
          ? extFromUrl(fm.customThumbnailUrl)
          : "jpg"
        const filename = `${slug}.${ext}`

        let s3Url: string | null = null

        if (fm.customThumbnailUrl) {
          s3Url = await uploadToS3(
            fm.customThumbnailUrl,
            THUMBNAIL_PREFIX,
            filename
          )
        } else if (fm.youtubeId) {
          // Try best quality first, fall back to guaranteed quality
          s3Url = await uploadToS3(
            youtubeThumbnailUrl(fm.youtubeId, "sd"),
            THUMBNAIL_PREFIX,
            filename
          )
          if (!s3Url) {
            s3Url = await uploadToS3(
              youtubeThumbnailUrl(fm.youtubeId, "hq"),
              THUMBNAIL_PREFIX,
              filename
            )
          }
        }

        if (s3Url) return [slug, s3Url] as const
        console.warn(`[VideoThumbnails] No thumbnail uploaded for ${slug}`)
        return null
      } catch (error) {
        console.warn(`[VideoThumbnails] Skipping ${slug}:`, error)
        return null
      }
    })
  )

  const thumbnailMap: Record<string, string> = {}
  for (const result of results) {
    if (result) {
      thumbnailMap[result[0]] = result[1]
    }
  }

  console.log(
    `Video thumbnail sync complete: ${Object.keys(thumbnailMap).length}/${slugs.length} uploaded`
  )

  return thumbnailMap
}
