import React from "react"
import { Flex, type FlexProps } from "@chakra-ui/react"

import { type TokenBalance } from "./interfaces"
import { TokenBalanceItem } from "./TokenBalanceItem"

type TokenBalanceListProps = FlexProps & {
  tokenBalances: Array<TokenBalance>
}
export const TokenBalanceList = ({
  tokenBalances,
  ...flexProps
}: TokenBalanceListProps) => {
  return (
    <Flex direction="column" w="full" gap={4} {...flexProps}>
      {tokenBalances.map((item) => (
        <TokenBalanceItem key={item.name} item={item} />
      ))}
    </Flex>
  )
}
