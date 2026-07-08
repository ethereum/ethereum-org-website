import matter from "gray-matter"

import type { VideoFrontmatter } from "@/lib/interfaces"

import { uploadToS3 } from "../s3"

import { fetchRetry } from "./fetchRetry"

const GITHUB_API_BASE =
  "https://api.github.com/repos/ethereum/ethereum-org-website"
const RAW_BASE =
  "https://raw.githubusercontent.com/ethereum/ethereum-org-website/master"
const VIDEOS_PATH_PREFIX = "public/content/videos/"
const VIDEO_INDEX_SUFFIX = "/index.md"

const THUMBNAIL_PREFIX = "videos/thumbnails"

interface GitTreeItem {
  path: string
  type: "blob" | "tree"
}

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
 * Fetch the repo tree and return the list of video slugs (top-level entries
 * under public/content/videos/ that have an index.md).
 */
async function discoverVideoSlugs(token: string): Promise<string[]> {
  // Fetch only the videos subtree, not the whole repo recursively. A recursive
  // tree of the full repo exceeds GitHub's truncation limit (~100k entries / 7MB),
  // and when truncated the public/content/videos/ paths are silently dropped,
  // yielding zero slugs (and an empty thumbnail map that wipes the cached blob).
  const treePath = encodeURIComponent("public/content/videos")
  const url = `${GITHUB_API_BASE}/git/trees/master:${treePath}`
  const response = await fetchRetry(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch videos tree: ${response.status}`)
  }

  const data = await response.json()
  // The videos directory holds ~dozens of entries, well under the truncation
  // limit, but guard defensively: a truncated response would under-report slugs.
  if (data.truncated) {
    throw new Error(
      "Videos tree response was truncated; aborting to avoid wiping the thumbnail map"
    )
  }

  // Subtree entries are relative to the videos directory: each immediate
  // subdirectory (type "tree") is a video slug.
  const tree: GitTreeItem[] = data.tree
  return tree.filter((item) => item.type === "tree").map((item) => item.path)
}

/**
 * Fetch a single video's frontmatter from raw GitHub content.
 * Returns null on fetch failure so the caller can skip and continue.
 */
async function fetchFrontmatter(
  slug: string,
  token: string
): Promise<VideoFrontmatter | null> {
  const url = `${RAW_BASE}/${VIDEOS_PATH_PREFIX}${slug}${VIDEO_INDEX_SUFFIX}`
  const response = await fetchRetry(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    console.warn(
      `[VideoThumbnails] Failed to fetch markdown for ${slug}: ${response.status}`
    )
    return null
  }

  const text = await response.text()
  const { data } = matter(text)
  return data as VideoFrontmatter
}

/**
 * Fetch video thumbnails from YouTube (or custom URLs) and upload to S3.
 * Keyed by video slug so each video maps to exactly one S3 object.
 *
 * Reads video frontmatter (youtubeId, customThumbnailUrl) from GitHub via
 * the API rather than the local filesystem, so the task runs cleanly on
 * Trigger.dev where the app's content tree isn't bundled.
 *
 * For each video:
 * 1. If customThumbnailUrl exists, upload that
 * 2. Otherwise try sddefault.jpg first (best quality)
 * 3. Fall back to hqdefault.jpg if sd fails
 *
 * Returns a map of video slug -> S3 thumbnail URL.
 */
export async function fetchVideoThumbnails(): Promise<Record<string, string>> {
  const token = process.env.GITHUB_TOKEN_READ_ONLY
  if (!token) {
    throw new Error("GitHub token not set (GITHUB_TOKEN_READ_ONLY)")
  }

  console.log("Starting video thumbnail sync to S3")

  const slugs = await discoverVideoSlugs(token)
  console.log(`Found ${slugs.length} videos in repo tree`)

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const fm = await fetchFrontmatter(slug, token)
        if (!fm) return null

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

  // Never persist an empty map: a fully-empty result always signals a fetch
  // failure (there are always videos in the repo). Throwing here leaves the
  // previously cached blob intact instead of wiping every thumbnail sitewide.
  if (Object.keys(thumbnailMap).length === 0) {
    throw new Error(
      "Video thumbnail sync produced an empty map; refusing to overwrite cached blob"
    )
  }

  return thumbnailMap
}
