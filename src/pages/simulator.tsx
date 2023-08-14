import React from "react"
import {
  SimulatorModal,
  StartingPoint,
  Template,
} from "../components/Simulator/index"
import { Box, useDisclosure } from "@chakra-ui/react"

const SimulatorPage = () => {
  const disclosure = useDisclosure()
  return (
    <Box py={16} w="full">
      {/* Temporary button to trigger modal */}
      <Box
        borderRadius="xl"
        color="salmon"
        fontWeight="bold"
        m={6}
        onClick={disclosure.onOpen}
        textAlign="center"
        border="2px solid salmon"
        py={4}
        cursor="pointer"
        _hover={{
          bg: "body.light",
        }}
      >
        Open
      </Box>
      <StartingPoint />
      <SimulatorModal disclosure={disclosure}>
        <Template />
      </SimulatorModal>
    </Box>
  )
}

export default SimulatorPage
