import React from "react"
import { Box, BoxProps } from "@chakra-ui/react"

export type GhostCardProps = BoxProps

const GhostCard = ({ children, ...rest }: GhostCardProps) => (
  <Box position="relative" alignSelf="stretch" {...rest}>
    <Box
      zIndex="hide"
      position="absolute"
      backgroundColor="ghostCardGhost"
      bottom="2"
      insetInlineStart="2"
      border="1px solid"
      borderColor="border"
      borderRadius="2px"
      height="full"
      width="full"
    />
    <Box
      className="ghost-card-base"
      height="full"
      width="full"
      borderRadius="2px"
      zIndex={2}
      padding="6"
      background="ghostCardBackground"
      border="1px solid"
      borderColor="border"
      textAlign="start"
    >
      {children}
    </Box>
  </Box>
)

export default GhostCard
