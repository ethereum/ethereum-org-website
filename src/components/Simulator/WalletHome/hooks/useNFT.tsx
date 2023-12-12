import type { NFT } from "../interfaces"

import NFTImage from "@/public/deep-panic.png"

export const useNFT = (): Array<NFT> => {
  return [
    {
      title: "Cool art",
      image: NFTImage,
    },
  ]
}
