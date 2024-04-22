import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

type PhoneProps = Pick<BoxProps, "children">

export const Phone = ({ children }: PhoneProps) => (
  <Box as="figure" minW="min(100%, 322px)" maxW="min(100%, 322px)" mx="auto">
    {/* Phone frame */}
    <Box
      h={{ base: 480, md: 600 }}
      maxH="full"
      w="full"
      border="5px solid"
      borderColor="body.medium"
      borderRadius="3xl"
      bg="background.base"
      position="relative"
      zIndex={0}
      overflow="hidden"
    >
      {children}
    </Box>
    {/* Phone drop shadow */}
    <Box
      h={6}
      mb={-6}
      w="full"
      borderRadius="100%"
      position="relative"
      filter="blur(14px)"
      bg="black"
      opacity={0.4}
      zIndex={-1}
    />
  </Box>
)
