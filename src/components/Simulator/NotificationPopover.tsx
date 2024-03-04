import React, { type ReactNode } from "react"
import {
  Flex,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverContentProps,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react"

type NotificationPopoverProps = Omit<PopoverContentProps, "children"> &
  Pick<PopoverProps, "placement"> & {
    children: ReactNode
  }
export const NotificationPopover = ({
  placement,
  children,
  content,
  title,
  ...restProps
}: NotificationPopoverProps) => {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        bg="background.highlight"
        px={4}
        py={2}
        maxW="15rem"
        borderRadius="base"
        boxShadow="tooltip"
        fontSize="xs"
        {...restProps}
      >
        <Flex gap={2}>
          <PopoverHeader fontWeight="bold" mb={2} flex={1} mt={0.5}>
            {title || ""}
          </PopoverHeader>
          <PopoverCloseButton ms="auto" />
        </Flex>
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
