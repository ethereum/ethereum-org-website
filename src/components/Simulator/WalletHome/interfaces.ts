import { LucideIcon } from "lucide-react"
import { StaticImageData } from "next/image"

export interface TokenBalance {
  name: string
  ticker: string
  amount: number
  usdConversion: number
  Icon: LucideIcon | React.FC<React.SVGProps<SVGElement>>
}

export interface Contact {
  name: string
  lastAction: string
}

export interface NFT {
  title: string
  image: StaticImageData
}
