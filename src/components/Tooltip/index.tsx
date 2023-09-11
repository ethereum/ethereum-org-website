import React, { ReactNode } from "react"
import {
  Box,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react"
import * as utils from "../../utils/isMobile"

export interface IProps {
  content: ReactNode
  children?: React.ReactNode
}

const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const isMobile = utils.isMobile()

  return (
    <Box title="More Info!" display="inline-block" ml={2}>
      <Popover placement="top" trigger="hover" strategy="fixed" gutter={6}>
        <PopoverTrigger>
          <Center
            as="span"
            tabIndex={0}
            p={1}
            cursor="pointer"
            color="body.base"
            _hover={{
              color: "primary.base",
            }}
            _active={{
              color: "primary.hover",
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
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>{content}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}

export default Tooltip
