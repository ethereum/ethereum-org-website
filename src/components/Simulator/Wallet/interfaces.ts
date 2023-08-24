import type { IconProps } from "@chakra-ui/react"

export interface TokenBalance {
  name: string
  ticker: string
  amount: number
  usdConversion: number
  Icon: React.FC<IconProps>
}
