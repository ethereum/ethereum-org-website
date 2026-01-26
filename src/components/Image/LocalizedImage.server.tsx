/**
 * Server-only Localized Image Component
 *
 * This file contains the locale-aware image component that uses filesystem
 * operations to check for translated images. It must only be imported in
 * Server Components.
 */

import { extname } from "path"

import NextLink from "next/link"

import { Image, type ImageProps } from "@/components/Image"

import { resolveImagePath } from "@/lib/utils/markdown/images"
import { toPosixPath } from "@/lib/utils/relativePath"

import { CONTENT_IMAGES_MAX_WIDTH } from "@/lib/constants"

import "server-only"

// Default dimensions for images without metadata
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 450

interface LocalizedImageProps extends Omit<ImageProps, "width" | "height"> {
  width?: string
  height?: string
  aspectRatio?: string
}

/**
 * Factory function to create a locale-aware image component.
 * Bakes locale and slug into the closure for automatic image path resolution.
 *
 * This function uses filesystem operations and must only be called from
 * Server Components.
 *
 * Usage in MDX components:
 *   const components = {
 *     img: createLocalizedImage(locale, slug),
 *   }
 */
export function createLocalizedImage(locale: string, slug: string) {
  const LocalizedImage = ({
    width,
    height,
    aspectRatio,
    alt,
    src,
    ...rest
  }: LocalizedImageProps) => {
    if (!src) return null

    const srcString = src.toString()

    // Resolve the image path with locale fallback
    const resolvedSrc = resolveImagePath(srcString, slug, locale)

    // Ensure forward slashes for consistency
    const transformedSrc = toPosixPath(resolvedSrc)

    // Use defaults if dimensions are missing or invalid
    let imageWidth = width ? parseFloat(width) : DEFAULT_WIDTH
    let imageHeight = height ? parseFloat(height) : DEFAULT_HEIGHT

    if (Number.isNaN(imageWidth)) imageWidth = DEFAULT_WIDTH
    if (Number.isNaN(imageHeight)) imageHeight = DEFAULT_HEIGHT

    const imageAspectRatio = aspectRatio
      ? parseFloat(aspectRatio)
      : imageWidth / imageHeight

    // Keep the size of the images proportional to the max width constraint
    if (imageWidth > CONTENT_IMAGES_MAX_WIDTH) {
      imageWidth = CONTENT_IMAGES_MAX_WIDTH
      imageHeight = CONTENT_IMAGES_MAX_WIDTH / imageAspectRatio
    }

    const fileExt = extname(transformedSrc).toLowerCase()
    const isAnimated = [".gif", ".apng", ".webp"].includes(fileExt)

    return (
      <span className="flex justify-center">
        <NextLink
          href={transformedSrc}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            loading="lazy"
            src={transformedSrc}
            unoptimized={isAnimated}
            className="h-auto"
            {...rest}
          />
        </NextLink>
      </span>
    )
  }

  LocalizedImage.displayName = "LocalizedImage"

  return LocalizedImage
}
