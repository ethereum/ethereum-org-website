import type { StaticImageData } from "next/image"
import { Center } from "@chakra-ui/react"
import { Image } from "@/components/Image"

interface AssetDownloadImageProps {
  image: StaticImageData
  alt: string
}

const AssetDownloadImage = ({ image, alt }: AssetDownloadImageProps) => (
  <Center border="1px" borderColor="white700" p={8} w="100%">
    <Image src={image} alt={alt} w="100%" alignSelf="center" />
  </Center>
)

export default AssetDownloadImage
