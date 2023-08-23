import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

export const Phone: React.FC<BoxProps> = ({ children }) => (
  <Box as="figure" w="min(100%, 322px)" mx="auto">
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
      {children}
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
