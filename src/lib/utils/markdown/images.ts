/**
 * Image Resolution Utilities
 *
 * Handles resolving image paths with locale-specific fallback support.
 * Translated content may have localized images; if not, falls back to English.
 */

import fs from "fs"
import path from "path"

import {
  CONTENT_DIR,
  CONTENT_PATH,
  DEFAULT_LOCALE,
  TRANSLATED_IMAGES_DIR,
} from "@/lib/constants"

/**
 * Check if a file exists at the given path
 */
function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath)
  } catch {
    return false
  }
}

/**
 * Check if a path is an external URL
 */
function isExternalUrl(imagePath: string): boolean {
  return (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("//")
  )
}

/**
 * Check if a path is an absolute path (starts with /)
 */
function isAbsolutePath(imagePath: string): boolean {
  return imagePath.startsWith("/")
}

/**
 * Resolve an image path with locale-specific fallback.
 *
 * For relative paths (e.g., "./my-image.png"):
 * 1. Check if translated image exists at /content/translations/{locale}/{slug}/{image}
 * 2. Fall back to English at /content/{slug}/{image}
 *
 * External URLs and absolute paths are returned unchanged.
 *
 * @param imagePath - The image path from markdown (relative, absolute, or URL)
 * @param slug - Content slug (e.g., "about" or "developers/docs/accounts")
 * @param locale - Current locale
 * @returns Resolved image path for use in components
 */
export function resolveImagePath(
  imagePath: string,
  slug: string,
  locale: string
): string {
  // Pass through external URLs unchanged
  if (isExternalUrl(imagePath)) {
    return imagePath
  }

  // Pass through absolute paths unchanged (already resolved)
  if (isAbsolutePath(imagePath)) {
    return imagePath
  }

  // Handle relative paths (./image.png or image.png)
  const cleanImagePath = imagePath.replace(/^\.\//, "")

  // For English locale, use the default content path
  if (locale === DEFAULT_LOCALE) {
    return `${CONTENT_PATH}/${slug}/${cleanImagePath}`
  }

  // For other locales, check if translated image exists
  const translatedImagePath = path.join(
    process.cwd(),
    "public",
    TRANSLATED_IMAGES_DIR,
    locale,
    slug,
    cleanImagePath
  )

  if (fileExists(translatedImagePath)) {
    return `${TRANSLATED_IMAGES_DIR}/${locale}/${slug}/${cleanImagePath}`
  }

  // Fall back to English image
  return `${CONTENT_PATH}/${slug}/${cleanImagePath}`
}

/**
 * Resolve hero image path for layouts that use frontmatter.image
 *
 * @param frontmatterImage - Image path from frontmatter
 * @param slug - Content slug
 * @param locale - Current locale
 * @returns Resolved image path
 */
export function resolveHeroImage(
  frontmatterImage: string | undefined,
  slug: string,
  locale: string
): string | undefined {
  if (!frontmatterImage) {
    return undefined
  }

  return resolveImagePath(frontmatterImage, slug, locale)
}

/**
 * Get the full filesystem path for an image
 * Useful for image processing/optimization
 */
export function getImageFilePath(
  imagePath: string,
  slug: string,
  locale: string
): string {
  // Handle external URLs
  if (isExternalUrl(imagePath)) {
    return imagePath
  }

  // Handle absolute paths
  if (isAbsolutePath(imagePath)) {
    return path.join(process.cwd(), "public", imagePath)
  }

  // Handle relative paths
  const cleanImagePath = imagePath.replace(/^\.\//, "")

  // For English or if translated image doesn't exist
  const englishPath = path.join(
    process.cwd(),
    "public",
    CONTENT_DIR,
    slug,
    cleanImagePath
  )

  if (locale === DEFAULT_LOCALE) {
    return englishPath
  }

  // Check for translated image
  const translatedPath = path.join(
    process.cwd(),
    "public",
    TRANSLATED_IMAGES_DIR,
    locale,
    slug,
    cleanImagePath
  )

  return fileExists(translatedPath) ? translatedPath : englishPath
}

/**
 * Check if an image is animated (GIF, APNG, or animated WebP)
 * These should be rendered with unoptimized={true} in Next.js Image
 */
export function isAnimatedImage(imagePath: string): boolean {
  const lowerPath = imagePath.toLowerCase()
  return (
    lowerPath.endsWith(".gif") ||
    lowerPath.endsWith(".apng") ||
    (lowerPath.endsWith(".webp") && lowerPath.includes("animated"))
  )
}
