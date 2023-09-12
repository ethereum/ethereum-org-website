import type { IconProps } from "@chakra-ui/react"
import { IGatsbyImageData } from "gatsby-plugin-image"

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
  image: IGatsbyImageData
}
