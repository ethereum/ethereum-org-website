import { StaticImageData } from "next/image"

import type { IconBaseType } from "@/components/icons/icon-base"

export interface TokenBalance {
  name: string
  ticker: string
  amount: number
  usdConversion: number
  Icon: IconBaseType
}

export interface Contact {
  name: string
  lastAction: string
}

export interface NFT {
  title: string
  image: StaticImageData
}
