import { Flex, type FlexProps } from "@chakra-ui/react"
import React from "react"
import { type TokenBalance } from "./interfaces"
import { TokenBalanceItem } from "."

interface IProps extends FlexProps {
  tokenBalances: Array<TokenBalance>
}
export const TokenBalanceList: React.FC<IProps> = ({
  tokenBalances,
  ...flexProps
}) => {
  return (
    <Flex direction="column" w="full" gap={4} {...flexProps}>
      {tokenBalances.map((item) => (
        <TokenBalanceItem item={item} />
      ))}
    </Flex>
  )
}
