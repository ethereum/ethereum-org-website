import React from "react"
import { Box, type BoxProps, Flex, Text } from "@chakra-ui/react"

import { getMaxFractionDigitsUsd } from "../utils"

import { AddressPill } from "./AddressPill"

type WalletBalanceProps = BoxProps & {
  usdAmount?: number
}

export const WalletBalance = ({
  usdAmount = 0,
  ...boxProps
}: WalletBalanceProps) => (
  <Box zIndex={1} {...boxProps}>
    <Text textAlign="center" color="body.medium" mb={{ base: 2, md: 4 }}>
      Your total
    </Text>
    <Text
      textAlign="center"
      fontSize={{ base: "3xl", md: "5xl" }}
      fontWeight="bold"
    >
      {Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: getMaxFractionDigitsUsd(usdAmount),
      }).format(usdAmount)}
    </Text>
    <Flex justify="center" mb={4}>
      <AddressPill />
    </Flex>
  </Box>
)
