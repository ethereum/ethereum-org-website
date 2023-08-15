import React from "react"
import { Box, BoxProps } from "@chakra-ui/react"

export interface IProps extends BoxProps {
  className?: string
}

const GhostCard: React.FC<IProps> = ({ children, className, ...rest }) => (
  <Box position="relative" alignSelf="stretch" className={className} {...rest}>
    <Box
      zIndex="hide"
      position="absolute"
      backgroundColor="ghostCardGhost"
      bottom="2"
      left="2"
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
      textAlign="left"
    >
      {children}
    </Box>
  </Box>
)

export default GhostCard
