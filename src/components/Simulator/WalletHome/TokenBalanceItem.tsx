import React from "react"
import { Box, Flex, type FlexProps, Text } from "@chakra-ui/react"

import { getMaxFractionDigitsUsd } from "../utils"

import { TokenBalance } from "./interfaces"

type TokenBalanceItemProps = FlexProps & {
  item: TokenBalance
}
export const TokenBalanceItem = ({
  item,
  ...flexProps
}: TokenBalanceItemProps) => {
  const { name, ticker, amount, usdConversion, Icon } = item
  const usdAmount = amount * usdConversion
  const usdValue = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: getMaxFractionDigitsUsd(usdAmount),
  }).format(usdAmount)
  const tokenAmount = Intl.NumberFormat("en", {
    maximumFractionDigits: 5,
  }).format(amount)
  return (
    <Flex gap={4} {...flexProps}>
      <Icon />
      <Text flex={1} fontWeight="medium">
        {name}
      </Text>
      <Box
        textAlign="end"
        fontSize="sm"
        lineHeight={1.5}
        fontWeight="bold"
        sx={{ p: { m: 0 } }}
      >
        <Text>{usdValue}</Text>
        <Text color="body.medium">
          {tokenAmount} {ticker}
        </Text>
      </Box>
    </Flex>
  )
}
