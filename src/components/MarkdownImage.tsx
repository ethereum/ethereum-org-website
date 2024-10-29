import { extname } from "path"

import { type ImageProps, TwImage } from "@/components/Image"

import { toPosixPath } from "@/lib/utils/relativePath"

import { CONTENT_IMAGES_MAX_WIDTH } from "@/lib/constants"

import InlineLink from "./ui/Link"

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

  const fileExt = extname(transformedSrc).toLowerCase()
  const isAnimated = [".gif", ".apng", ".webp"].includes(fileExt)

  return (
    // display the wrapper as a `span` to avoid dom nesting warnings as mdx
    // sometimes wraps images in `p` tags
    <span className="flex justify-center">
      <InlineLink
        href={transformedSrc}
        target="_blank"
        rel="noopener"
        locale={false}
      >
        <TwImage
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          src={transformedSrc}
          unoptimized={isAnimated}
          className="h-auto"
          {...rest}
        />
      </InlineLink>
    </span>
  )
}

export default MarkdownImage
