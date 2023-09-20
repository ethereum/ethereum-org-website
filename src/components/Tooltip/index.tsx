import React, { ReactNode } from "react"
import {
  Box,
  Center,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@chakra-ui/react"

export interface IProps extends PopoverProps {
  content: ReactNode
  children?: ReactNode
}

const Tooltip: React.FC<IProps> = ({ content, children, ...rest }) => {
  return (
    <Box display="inline-block" ml={2}>
      <Popover
        placement="top"
        trigger="hover"
        strategy="fixed"
        gutter={6}
        {...rest}
      >
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
