import { ImageProps } from "next/image"

import { Center } from "@/components/atoms/flex"

import { Image } from "../Image"

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
