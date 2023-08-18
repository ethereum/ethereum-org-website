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
  const imageWidth = parseInt(width)
  const imageHeight = parseInt(height)
  const imageAspectRatio = parseInt(aspectRatio)

  const finalWidth = clamp(imageWidth, CONTENT_IMAGES_MAX_WIDTH)
  const finalHeight =
    imageWidth > CONTENT_IMAGES_MAX_WIDTH
      ? imageHeight * imageAspectRatio
      : imageHeight

  return (
    <Flex as="span" justify="center">
      <Image width={finalWidth} height={finalHeight} {...rest} />
    </Flex>
  )
}

export default MarkdownImage
