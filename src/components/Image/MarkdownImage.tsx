import { extname } from "path"

import NextLink from "next/link"

import { Image, type ImageProps } from "@/components/Image"
import MarkdownVideo from "@/components/Image/MarkdownVideo"

import { toPosixPath } from "@/lib/utils/relativePath"

import { CONTENT_IMAGES_MAX_WIDTH } from "@/lib/constants"

interface MarkdownImageProps extends Omit<ImageProps, "width" | "height"> {
  // Optional: `rehypeImg` omits these when dimensions can't be probed (e.g. a
  // video whose container it can't read), in which case the renderer falls back
  // to intrinsic sizing.
  width?: string
  height?: string
  aspectRatio?: string
}

const MarkdownImage = ({
  width,
  height,
  aspectRatio,
  alt,
  src,
  ...rest
}: MarkdownImageProps) => {
  const imageAspectRatio = parseFloat(aspectRatio ?? "")
  let imageWidth = parseFloat(width ?? "")
  let imageHeight = parseFloat(height ?? "")

  // Ensure that src path has forward slashes only, to avoid issues with Windows filepaths
  const transformedSrc = toPosixPath(src.toString())

  // keep the size of the images proportional to the max width constraint
  if (imageWidth > CONTENT_IMAGES_MAX_WIDTH) {
    imageWidth = CONTENT_IMAGES_MAX_WIDTH
    imageHeight = CONTENT_IMAGES_MAX_WIDTH / imageAspectRatio
  }

  const fileExt = extname(transformedSrc).toLowerCase()
  const isAnimated = [".gif", ".apng", ".webp"].includes(fileExt)
  const isVideo = [".mp4", ".webm", ".mov"].includes(fileExt)

  if (isVideo) {
    // Orientation opt-in: a `-portrait` filename suffix (e.g. `clip-portrait.mp4`)
    // selects the portrait ratio; everything else is landscape.
    const orientation = /-portrait\.[^.]+$/.test(transformedSrc)
      ? "portrait"
      : "landscape"
    // Intrinsic dimensions (probed in `rehypeImg`) let the video reserve layout
    // space and avoid CLS; absent (probe failed), it sizes intrinsically.
    const hasDimensions =
      Number.isFinite(imageWidth) && Number.isFinite(imageHeight)
    return (
      <MarkdownVideo
        src={transformedSrc}
        alt={alt}
        orientation={orientation}
        width={hasDimensions ? imageWidth : undefined}
        height={hasDimensions ? imageHeight : undefined}
      />
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
