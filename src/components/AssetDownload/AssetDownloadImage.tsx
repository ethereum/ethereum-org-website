import { ImageProps } from "next/image"

import { Image } from "../Image"
import { Center } from "../ui/flex"

interface AssetDownloadImageProps {
  image: ImageProps["src"]
  alt: string
}

const AssetDownloadImage = ({ image, alt }: AssetDownloadImageProps) => (
  <Center className="w-full border p-8">
    <Image src={image} alt={alt} className="w-full self-center" />
  </Center>
)

export default AssetDownloadImage
