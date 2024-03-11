import React, { ReactNode } from "react"
import {
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
      gutter={8}
      {...rest}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Tooltip
