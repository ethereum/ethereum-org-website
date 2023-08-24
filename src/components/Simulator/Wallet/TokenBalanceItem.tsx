import { Box, Flex, type FlexProps, Text } from "@chakra-ui/react"
import React from "react"
import { TokenBalance } from "./interfaces"

interface IProps extends FlexProps {
  item: TokenBalance
}
export const TokenBalanceItem: React.FC<IProps> = ({ item, ...flexProps }) => {
  const { name, ticker, amount, usdConversion, Icon } = item
  const usdValue = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount * usdConversion)
  return (
    <Flex gap={4} {...flexProps}>
      <Icon />
      <Text flex={1} fontWeight="semibold">
        {name}
      </Text>
      <Box textAlign="end" lineHeight={1.5}>
        <Text fontWeight="semibold" m={0}>
          {usdValue}
        </Text>
        <Text fontWeight="semibold" m={0} color="body.medium">
          {amount} {ticker}
        </Text>
      </Box>
    </Flex>
  )
}
