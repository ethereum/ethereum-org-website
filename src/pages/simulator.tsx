import { Box } from "@chakra-ui/react"
import React from "react"
import { StartingPoint } from "../components/Simulator/index"

const SimulatorPage = ({ location }) => (
  <Box w="full" py={16}>
    <StartingPoint location={location} />
  </Box>
)

export default SimulatorPage
