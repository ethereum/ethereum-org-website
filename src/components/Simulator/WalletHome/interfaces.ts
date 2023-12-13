import { StaticImageData } from "next/image"
import type { IconProps } from "@chakra-ui/react"

export interface TokenBalance {
  name: string
  ticker: string
  amount: number
  usdConversion: number
  Icon: React.FC<IconProps>
}

export interface Contact {
  name: string
  lastAction: string
}

export interface NFT {
  title: string
  image: StaticImageData
}
