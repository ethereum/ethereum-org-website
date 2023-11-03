import React, { ReactNode } from "react"
import {
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
    <Popover
      placement="top"
      trigger="hover"
      strategy="fixed"
      gutter={6}
      {...rest}
    >
      <PopoverTrigger>
        <Center as="span" tabIndex={0}>
          {children}
        </Center>
      </PopoverTrigger>
      <PopoverContent minW={192}>
        <PopoverArrow />
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Tooltip
