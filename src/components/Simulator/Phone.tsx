import React from "react"
import { Box } from "@chakra-ui/react"
import type { SimulatorStateProps } from "../../interfaces"
import { CreateAccountScreens } from "."

export const Phone: React.FC<SimulatorStateProps> = ({ state }) => {
  const { pathId } = state

  // TODO: Relocate data: store component name, dynamically load component then pass state
  const screenData = {
    "create-account": <CreateAccountScreens state={state} />,
  }

  const screen = screenData[pathId]
  return (
    <Box as="figure" w="min(100%, 300px)" mx="auto">
      {/* Phone frame */}
      <Box
        h={{ base: 480, md: 600 }}
        maxH="100%"
        w="full"
        border="8px"
        borderColor="body.medium"
        borderRadius="3xl"
        bg="background.base"
        position="relative"
        zIndex={1}
        overflow="hidden"
      >
        {screen}
      </Box>
      {/* Phone drop shadow */}
      <Box
        h={6}
        w="full"
        borderRadius="100%"
        position="relative"
        filter="blur(14px)"
        bg="body.base"
        opacity={0.5}
        zIndex={-1}
      />
    </Box>
  )
}
