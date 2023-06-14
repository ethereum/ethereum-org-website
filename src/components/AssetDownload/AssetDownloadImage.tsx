import React from "react"
import { Center, Img } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"

import { getImage, ImageDataLike } from "../../utils/image"

interface Props {
  image?: ImageDataLike | null
  alt: string
}

const AssetDownloadImage = ({ image, alt }: Props) => {
  return (
    <Center border="1px" borderColor="white700" p={8} w="100%">
      {image && (
        <Img
          as={GatsbyImage}
          image={getImage(image)!}
          alt={alt}
          w="100%"
          alignSelf="center"
        />
      )}
    </Center>
  )
}

export default AssetDownloadImage
