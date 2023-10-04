import React from "react"
import { Center } from "@chakra-ui/react"
import GatsbyImage from "../GatsbyImage"

import { getImage, ImageDataLike } from "../../utils/image"

interface Props {
  image?: ImageDataLike | null
  alt: string
}

const AssetDownloadImage = ({ image, alt }: Props) => {
  return (
    <Center border="1px" borderColor="white700" p={8} w="100%">
      {image && (
        <GatsbyImage
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
