import { extname } from "path"

import NextLink from "next/link"

import { Image, type ImageProps } from "@/components/Image"
import MarkdownVideo from "@/components/Image/MarkdownVideo"

import { toPosixPath } from "@/lib/utils/relativePath"

import { CONTENT_IMAGES_MAX_WIDTH } from "@/lib/constants"

interface MarkdownImageProps extends Omit<ImageProps, "width" | "height"> {
  width: string
  height: string
  aspectRatio: string
}

const MarkdownImage = ({
  width,
  height,
  aspectRatio,
  alt,
  src,
  ...rest
}: MarkdownImageProps) => {
  const imageAspectRatio = parseFloat(aspectRatio)
  let imageWidth = parseFloat(width)
  let imageHeight = parseFloat(height)

  // Ensure that src path has forward slashes only, to avoid issues with Windows filepaths
  const transformedSrc = toPosixPath(src.toString())

  // keep the size of the images proportional to the max width constraint
  if (imageWidth > CONTENT_IMAGES_MAX_WIDTH) {
    imageWidth = CONTENT_IMAGES_MAX_WIDTH
    imageHeight = CONTENT_IMAGES_MAX_WIDTH / imageAspectRatio
  }

  // A clip src may carry a `#WxH` dimensions fragment (see `MarkdownVideo`);
  // it's presentation metadata, not part of the file path, so drop it before
  // deriving the extension.
  const srcFilePath = transformedSrc.split("#")[0]
  const fileExt = extname(srcFilePath).toLowerCase()
  const isAnimated = [".gif", ".apng", ".webp"].includes(fileExt)
  const isVideo = [".mp4", ".webm", ".mov"].includes(fileExt)

  if (isVideo) {
    // Orientation opt-in: a `-portrait` filename suffix (e.g. `clip-portrait.mp4`)
    // selects the portrait ratio; everything else is landscape. Only consulted
    // when the src declares no dimensions — see `MarkdownVideo`.
    const orientation = /-portrait\.[^.]+$/.test(srcFilePath)
      ? "portrait"
      : "landscape"
    return (
      <MarkdownVideo src={transformedSrc} alt={alt} orientation={orientation} />
    )
  }

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
          className="h-auto rounded-base"
          {...rest}
        />
      </NextLink>
    </span>
  )
}

MarkdownImage.displayName = "MarkdownImage"

export default MarkdownImage
