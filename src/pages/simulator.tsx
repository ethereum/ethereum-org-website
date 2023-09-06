import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { simulatorData } from "../components/Simulator/data"
import { StartingPoint } from "../components/Simulator"

const SimulatorPage = ({ location }) => (
  <Box w="full" py={16}>
    <StartingPoint location={location} data={simulatorData}>
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
    </StartingPoint>
  </Box>
)

export default SimulatorPage
