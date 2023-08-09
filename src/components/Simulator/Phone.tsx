import React from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

export const Phone: React.FC<Pick<BoxProps, "children">> = ({ children }) => {
  const BOTTOM = 4
  return (
    <Box
      h={600}
      w={{ base: "min(100%, 300px)", md: 286 }}
      border="8px"
      borderColor="body.medium"
      borderRadius="3xl"
      bg="background.base"
      mb={BOTTOM}
      position="relative"
      _after={{
        content: "''",
        h: "1.5rem",
        w: "100%",
        insetInline: 0,
        borderRadius: "100%",
        position: "absolute",
        bottom: -BOTTOM,
        filter: "blur(14px)",
        bg: "body.base",
        opacity: 0.5,
        zIndex: -1,
      }}
    >
      {children}
    </Box>
  )
}
