import Image from "next/image"
import { Flex } from "@chakra-ui/react"

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
  const imageAspectRatio = parseFloat(aspectRatio)
  let imageWidth = parseFloat(width)
  let imageHeight = parseFloat(height)

  // keep the size of the images proportional to the max width constraint
  if (imageWidth > CONTENT_IMAGES_MAX_WIDTH) {
    imageWidth = CONTENT_IMAGES_MAX_WIDTH
    imageHeight = imageHeight * imageAspectRatio
  }

  return (
    // display the wrapper as a `span` to avoid dom nesting warnings as mdx
    // sometimes wraps images in `p` tags
    <Flex as="span" justify="center">
      <Image width={imageWidth} height={imageHeight} loading="lazy" {...rest} />
    </Flex>
  )
}

export default MarkdownImage
