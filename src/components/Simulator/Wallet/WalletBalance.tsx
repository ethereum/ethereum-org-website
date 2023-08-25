import { Box, type BoxProps, Text } from "@chakra-ui/react"
import React from "react"

interface IProps extends BoxProps {
  usdAmount?: number
}

export const WalletBalance: React.FC<IProps> = ({
  usdAmount = 0,
  ...boxProps
}) => (
  <Box {...boxProps}>
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
      }).format(usdAmount)}
    </Text>
  </Box>
)
