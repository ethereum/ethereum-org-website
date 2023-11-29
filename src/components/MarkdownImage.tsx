import { Flex } from "@chakra-ui/react"

import { Image, type ImageProps } from "@/components/Image"
import Link from "@/components/Link"

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

  return (
    // display the wrapper as a `span` to avoid dom nesting warnings as mdx
    // sometimes wraps images in `p` tags
    <Flex as="span" justify="center">
      <Link href={transformedSrc} target="_blank" rel="noopener">
        <Image
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          src={transformedSrc}
          {...rest}
        />
      </Link>
    </Flex>
  )
}

export default MarkdownImage
