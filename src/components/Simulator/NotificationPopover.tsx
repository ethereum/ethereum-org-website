import React, { type ReactNode } from "react"
import { MdClose } from "react-icons/md"

import { Flex } from "../ui/flex"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  type PopoverContentProps,
  PopoverTrigger,
} from "../ui/popover"

type NotificationPopoverProps = Omit<
  PopoverContentProps,
  "children" | "className"
> & {
  children: ReactNode
}
export const NotificationPopover = ({
  children,
  content,
  title,
  ...restProps
}: NotificationPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="text-start">
        <div>{children}</div>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-[15rem] px-4 py-2 text-xs"
        {...restProps}
      >
        <Flex className="gap-2">
          <header className="mb-2 mt-0.5 flex-1 p-0 font-bold">
            {title || ""}
          </header>
          <PopoverClose className="absolute right-2 top-1 ms-auto flex size-6 items-center justify-center text-xl leading-none">
            <MdClose />
          </PopoverClose>
        </Flex>
        <div>{content}</div>
      </PopoverContent>
    </Popover>
  )
}
