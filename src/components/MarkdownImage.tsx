import { Flex } from "@chakra-ui/react"

import Link from "@/components/Link"
import { Image, type ImageProps } from "@/components/Image"
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
  ...rest
}: MarkdownImageProps) => {
  const imageAspectRatio = parseFloat(aspectRatio)
  let imageWidth = parseFloat(width)
  let imageHeight = parseFloat(height)

  // keep the size of the images proportional to the max width constraint
  if (imageWidth > CONTENT_IMAGES_MAX_WIDTH) {
    imageWidth = CONTENT_IMAGES_MAX_WIDTH
    imageHeight = CONTENT_IMAGES_MAX_WIDTH / imageAspectRatio
  }

  return (
    // display the wrapper as a `span` to avoid dom nesting warnings as mdx
    // sometimes wraps images in `p` tags
    <Flex as="span" justify="center">
      <Link href={rest.src.toString()} target="_blank" rel="noopener">
        <Image
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          {...rest}
        />
      </Link>
    </Flex>
  )
}

export default MarkdownImage
