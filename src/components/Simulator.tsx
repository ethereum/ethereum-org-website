import { Flex, Grid, Text } from "@chakra-ui/react"
import React from "react"
import { PathButton } from "../components/Simulator/"
import type { PathOption } from "../interfaces"

const pathOptions: Array<PathOption> = [
  {
    primaryText: "Create account",
    secondaryText: "How to?",
    iconName: "EthWalletIcon",
    onClick: () => console.log("clicked Create Account"),
  },
  {
    primaryText: "Send/receive",
    secondaryText: "How to?",
    iconName: "WalletAppIcon",
    onClick: () => console.log("clicked Send/Receive"),
  },
  {
    primaryText: "Connect to Web3",
    secondaryText: "How to?",
    iconName: "ConnectWeb3Icon",
    onClick: () => console.log("clicked Connect to Web3"),
  },
]

export const Simulator = () => (
  // OUTER CONTAINER
  <Grid bg="cardGradient" placeItems="center" p={{ base: 4, md: 16 }} w="full">
    {/* INNER CONTAINER */}
    <Flex
      direction={{ base: "column", md: "row" }}
      bg="background.base"
      py={{ base: 4, md: 16 }}
      px={{ base: 4, md: 16 }}
      alignItems="center"
      textAlign={{ base: "center", md: "start" }}
      gap={{ base: 4, lg: 16 }}
      maxW="1000px"
      w="full"
    >
      {/* TEXT CONTENT */}
      <Flex direction="column">
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontStyle="italic"
          color="body.medium"
          mb={2}
        >
          Interactive explainer
        </Text>
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          lineHeight="115%"
          fontWeight="bold"
          m={0}
        >
          How to use a wallet
        </Text>
      </Flex>
      <Flex
        direction="column"
        gap={8}
        w={{ base: "min(100%, 320px)", md: "300px" }}
      >
        {/* Button stack for path options */}
        {pathOptions.map((pathOption) => (
          <PathButton pathOption={pathOption} />
        ))}
      </Flex>
    </Flex>
  </Grid>
)
