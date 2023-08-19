import Image from "next/image"
import { Flex } from "@chakra-ui/react"
import clamp from "lodash.clamp"

import { CONTENT_IMAGES_MAX_WIDTH } from "@/lib/constants"

interface MarkdownImageProps {
  src: string
  alt: string
  width: string
  height: string
  aspectRatio: string
}

const MarkdownImage = ({
  width,
  height,
  aspectRatio,
  ...rest
}: MarkdownImageProps) => {
  const imageWidth = parseFloat(width)
  const imageHeight = parseFloat(height)
  const imageAspectRatio = parseFloat(aspectRatio)

  // keep the size of the images proportional to the max width constraint on md pages
  const finalWidth = clamp(imageWidth, CONTENT_IMAGES_MAX_WIDTH)
  const finalHeight =
    imageWidth > CONTENT_IMAGES_MAX_WIDTH
      ? imageHeight * imageAspectRatio
      : imageHeight

  return (
    // display the wrapper as a `span` to avoid dom nesting warnings as mdx
    // sometimes wraps images in `p` tags
    <Flex as="span" justify="center">
      <Image width={finalWidth} height={finalHeight} loading="lazy" {...rest} />
    </Flex>
  )
}

export default MarkdownImage
