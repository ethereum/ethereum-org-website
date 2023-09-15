import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverContentProps,
  PopoverProps,
} from "@chakra-ui/react"
import React, { type ReactNode } from "react"

interface IProps
  extends Omit<PopoverContentProps, "children">,
    Pick<PopoverProps, "placement"> {
  children: ReactNode
}
export const DemoOnlyPopover: React.FC<IProps> = ({
  placement,
  children,
  ...restProps
}) => (
  <Popover placement={placement}>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent
      bg="background.highlight"
      px={4}
      py={2}
      maxW={{ base: "calc(100vw - 3rem)", sm: "calc(100vw - 5rem)" }}
      borderRadius="base"
      boxShadow="tooltip"
      {...restProps}
    >
      <PopoverBody>Demo only! Select a preset</PopoverBody>
    </PopoverContent>
  </Popover>
)
