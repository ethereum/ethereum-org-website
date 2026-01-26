import { extname } from "path"

import NextLink from "next/link"

import { Image, type ImageProps } from "@/components/Image"

import { toPosixPath } from "@/lib/utils/relativePath"

import { CONTENT_IMAGES_MAX_WIDTH } from "@/lib/constants"

// Default dimensions for images without metadata
const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 450

interface MarkdownImageProps extends Omit<ImageProps, "width" | "height"> {
  width?: string
  height?: string
  aspectRatio?: string
}

/**
 * Check if src is a relative path (starts with ./ or ../)
 */
function isRelativePath(src: string): boolean {
  return src.startsWith("./") || src.startsWith("../")
}

const MarkdownImage = ({
  width,
  height,
  aspectRatio,
  alt,
  src,
  ...rest
}: MarkdownImageProps) => {
  // Ensure that src path has forward slashes only, to avoid issues with Windows filepaths
  const transformedSrc = toPosixPath(src.toString())

  // For relative paths, use a simple img tag since Next.js Image doesn't support them
  if (isRelativePath(transformedSrc)) {
    return (
      <span className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt || ""}
          src={transformedSrc}
          loading="lazy"
          className="h-auto max-w-full"
        />
      </span>
    )
  }

  // Use defaults if dimensions are missing or invalid
  let imageWidth = width ? parseFloat(width) : DEFAULT_WIDTH
  let imageHeight = height ? parseFloat(height) : DEFAULT_HEIGHT

  if (Number.isNaN(imageWidth)) imageWidth = DEFAULT_WIDTH
  if (Number.isNaN(imageHeight)) imageHeight = DEFAULT_HEIGHT

  const imageAspectRatio = aspectRatio
    ? parseFloat(aspectRatio)
    : imageWidth / imageHeight

  // keep the size of the images proportional to the max width constraint
  if (imageWidth > CONTENT_IMAGES_MAX_WIDTH) {
    imageWidth = CONTENT_IMAGES_MAX_WIDTH
    imageHeight = CONTENT_IMAGES_MAX_WIDTH / imageAspectRatio
  }

  const fileExt = extname(transformedSrc).toLowerCase()
  const isAnimated = [".gif", ".apng", ".webp"].includes(fileExt)

  return (
    // display the wrapper as a `span` to avoid dom nesting warnings as mdx
    // sometimes wraps images in `p` tags
    <span className="flex justify-center">
      <NextLink href={transformedSrc} target="_blank" rel="noopener noreferrer">
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

MarkdownImage.displayName = "MarkdownImage"

export default MarkdownImage
