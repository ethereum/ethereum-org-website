import React, { ReactNode } from "react"
import { Box, Center, Tooltip as ChakraTooltip } from "@chakra-ui/react"
import * as utils from "../../utils/isMobile"

export interface IProps {
  content: ReactNode
  children?: React.ReactNode
}

const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const isMobile = utils.isMobile()

  return (
    <Box title="More Info!" display="inline-block" ml={2}>
      <ChakraTooltip label={content} placement="top" hasArrow>
        <Center
          as="span"
          tabIndex={0}
          p={1}
          cursor="pointer"
          color="body.base"
          _hover={{
            color: isMobile ? "primary.hover" : "primary.base",
          }}
          _focusVisible={{
            outline: "none",
            color: "primary.base",
            border: "2px",
            borderColor: "primary.hover",
            borderRadius: "full",
          }}
          sx={{
            svg: {
              w: 3,
              h: 3,
              ml: 0,
              color: "inherit",
            },
          }}
        >
          {children}
        </Center>
      </ChakraTooltip>
    </Box>
  )
}

export default Tooltip
