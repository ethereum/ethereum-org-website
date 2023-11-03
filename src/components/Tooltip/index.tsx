import React, { ReactNode } from "react"
import {
  Box,
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
    <Popover
      placement="top"
      trigger="hover"
      strategy="fixed"
      gutter={6}
      {...rest}
    >
      <PopoverTrigger>
        <Box as="span" tabIndex={0}>
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Tooltip
