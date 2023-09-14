import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverContentProps,
  PopoverProps,
  PopoverHeader,
  PopoverCloseButton,
  Flex,
  Portal,
} from "@chakra-ui/react"
import React, { type ReactNode } from "react"

interface IProps
  extends Omit<PopoverContentProps, "children">,
    Pick<PopoverProps, "placement"> {
  children: ReactNode
}
export const NotificationPopover: React.FC<IProps> = ({
  placement,
  children,
  content,
  title,
  ...restProps
}) => {
  return (
    <Popover placement={placement}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
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
      </Portal>
    </Popover>
  )
}
