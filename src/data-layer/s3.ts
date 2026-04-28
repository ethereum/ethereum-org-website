/**
 * S3 image upload utility for the data-layer.
 *
 * Fetches external images and uploads them to S3 during data sync.
 * Returns S3 URLs for Next.js Image component (single whitelisted domain).
 *
 * Usage:
 *   const s3Url = await uploadToS3(externalUrl, 'apps/logos')
 *   if (!s3Url) {
 *     // Handle failure (use placeholder, skip image, etc.)
 *   }
 *
 * On failure, returns null so callers can handle explicitly.
 */

import { createHash } from "crypto"

import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"

// Lazy init S3 client
let s3Client: S3Client | null = null

function getS3Client(): S3Client {
  if (!s3Client) {
    const endpoint = process.env.S3_ENDPOINT
    const accessKeyId = process.env.S3_ACCESS_KEY_ID
    const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY

    if (!endpoint || !accessKeyId || !secretAccessKey) {
      throw new Error(
        "Missing required S3 env vars: S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY"
      )
    }

    s3Client = new S3Client({
      region: process.env.S3_REGION || "us-east-1",
      endpoint,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: true, // Required for S3-compatible services
    })
  }
  return s3Client
}

function getBucket(): string {
  const bucket = process.env.S3_IMAGE_BUCKET
  if (!bucket) {
    throw new Error("S3_IMAGE_BUCKET environment variable is not set")
  }
  return bucket
}

// SSRF protection: block internal/private network addresses
const BLOCKED_HOSTS = [
  /^127\./, // IPv4 loopback
  /^10\./, // Private Class A
  /^192\.168\./, // Private Class C
  /^172\.(1[6-9]|2[0-9]|3[01])\./, // Private Class B
  /^169\.254\./, // Link-local / AWS metadata
  /^0\./, // Current network
  /localhost/i,
  /\.local$/i,
  /\.internal$/i,
  /^\[::1\]$/, // IPv6 loopback
  /^\[fc00:/i, // IPv6 unique local
  /^\[fe80:/i, // IPv6 link-local
]

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== "https:") return false
    if (BLOCKED_HOSTS.some((p) => p.test(parsed.hostname))) return false
    return true
  } catch {
    return false
  }
}

// Single source of truth: extension → MIME type
const IMAGE_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  avif: "image/avif",
  svg: "image/svg+xml",
}

// Derived: MIME → extension (prefers shorter: jpg over jpeg)
const MIME_TO_EXT = Object.entries(IMAGE_TYPES).reduce(
  (acc, [ext, mime]) => {
    if (!acc[mime] || ext.length < acc[mime].length) acc[mime] = ext
    return acc
  },
  {} as Record<string, string>
)

function getExtensionFromContentType(contentType: string): string | null {
  // Handle "image/jpeg; charset=utf-8" → "image/jpeg"
  const mime = contentType.split(";")[0].trim().toLowerCase()
  return MIME_TO_EXT[mime] ?? null
}

function getExtensionFromUrl(url: string): string | null {
  try {
    const pathname = new URL(url).pathname
    const ext = pathname.split(".").pop()?.toLowerCase()
    return ext && ext in IMAGE_TYPES ? ext : null
  } catch {
    return null
  }
}

function generateKey(prefix: string, url: string, ext: string): string {
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 16)
  return `${prefix}/${hash}.${ext}`
}

function buildS3Url(bucket: string, key: string): string {
  return `${process.env.S3_ENDPOINT}/${bucket}/${key}`
}

/**
 * Upload an image from an external URL to S3.
 *
 * @param sourceUrl - The external image URL to fetch and upload
 * @param prefix - S3 key prefix (e.g., 'apps/logos', 'events')
 * @returns S3 URL if successful, null on failure
 */
export async function uploadToS3(
  sourceUrl: string,
  prefix: string
): Promise<string | null> {
  // Skip empty or invalid URLs
  if (!sourceUrl || !isValidImageUrl(sourceUrl)) {
    console.warn(`[S3] Invalid or empty URL: ${sourceUrl || "(empty)"}`)
    return null
  }

  const bucket = getBucket()
  const s3 = getS3Client()

  // Fetch the image first to get accurate Content-Type
  try {
    const response = await fetch(sourceUrl, {
      signal: AbortSignal.timeout(10_000),
      headers: {
        "User-Agent": "ethereum.org-image-sync/1.0",
      },
    })

    if (!response.ok) {
      console.warn(
        `[S3] Image fetch failed: ${response.status} for ${sourceUrl}`
      )
      return null
    }

    const contentType = response.headers.get("content-type") || ""
    const isImageContentType = contentType.startsWith("image/")

    // Reject if Content-Type exists but isn't an image (e.g., text/html error page)
    if (contentType && !isImageContentType) {
      console.warn(
        `[S3] Non-image Content-Type: ${contentType} for ${sourceUrl}`
      )
      return null
    }

    // Try Content-Type first, fall back to URL extension when missing
    let ext = getExtensionFromContentType(contentType)
    if (!ext && !contentType) {
      ext = getExtensionFromUrl(sourceUrl)
      if (ext) {
        console.warn(
          `[S3] No Content-Type header, using URL extension: ${ext} for ${sourceUrl}`
        )
      }
    }

    if (!ext) {
      console.warn(
        `[S3] Cannot determine image type for ${sourceUrl} (Content-Type: ${contentType || "none"})`
      )
      return null
    }

    const key = generateKey(prefix, sourceUrl, ext)

    // Check if already exists in S3
    try {
      await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
      return buildS3Url(bucket, key)
    } catch {
      // Object doesn't exist, continue to upload
    }

    const buffer = Buffer.from(await response.arrayBuffer())

    // Reject large images (>5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      console.warn(
        `[S3] Image too large: ${buffer.length} bytes for ${sourceUrl}`
      )
      return null
    }

    // Upload to S3
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType || IMAGE_TYPES[ext],
        CacheControl: "public, max-age=31536000, immutable",
      })
    )

    console.log(`[S3] Uploaded: ${sourceUrl} → ${key}`)
    return buildS3Url(bucket, key)
  } catch (error) {
    console.error(`[S3] Upload failed for ${sourceUrl}:`, error)
    return null
  }
}

/**
 * Batch upload multiple images in parallel.
 *
 * @param urls - Array of external image URLs
 * @param prefix - S3 key prefix
 * @returns Array of S3 URLs (null for failed uploads)
 */
export async function uploadManyToS3(
  urls: string[],
  prefix: string
): Promise<(string | null)[]> {
  return Promise.all(urls.map((url) => uploadToS3(url, prefix)))
}
