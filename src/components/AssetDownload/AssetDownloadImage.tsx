import { ImageProps } from "next/image"

import { Image } from "../Image"
import { Center } from "../ui/flex"

interface AssetDownloadImageProps {
  image: ImageProps["src"]
  alt: string
}

const AssetDownloadImage = ({ image, alt }: AssetDownloadImageProps) => (
  <Center className="w-full border p-8">
    <Image
      src={image}
      alt={alt}
      className="w-full self-center"
      sizes="(min-width: 1280px) 300px, (min-width: 992px) calc(33vw - 1.5rem), (min-width: 640px) calc(50vw - 2.5rem), calc(100vw - 4rem)"
    />
  </Center>
)

export default AssetDownloadImage
