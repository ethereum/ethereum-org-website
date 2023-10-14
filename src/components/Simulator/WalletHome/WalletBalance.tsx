import { Box, type BoxProps, Text, Flex } from "@chakra-ui/react"
import React from "react"
import { getMaxFractionDigitsUsd } from "../utils"
import { AddressPill } from "./AddressPill"

interface IProps extends BoxProps {
  usdAmount?: number
}

export const WalletBalance: React.FC<IProps> = ({
  usdAmount = 0,
  ...boxProps
}) => (
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
