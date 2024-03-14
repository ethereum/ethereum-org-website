import React, { ReactNode, useEffect } from "react"
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react"

import { isMobile } from "@/lib/utils/isMobile"

export interface IProps extends PopoverProps {
  content: ReactNode
  children?: ReactNode
}

const Tooltip: React.FC<IProps> = ({ content, children, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Close the popover when the user scrolls.
  // This is useful for mobile devices where the popover is open by clicking the
  // trigger, not hovering.
  useEffect(() => {
    let originalPosition = 0

    const handleScroll = () => {
      const delta = window.scrollY - originalPosition

      // Close the popover if the user scrolls more than 80px
      if (isOpen && Math.abs(delta) > 80) {
        onClose()
      }
    }

    // Add event listener when the popover is open
    if (isOpen) {
      window.addEventListener("scroll", handleScroll)
      originalPosition = window.scrollY
    }

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen, onClose])

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="top"
      trigger={isMobile() ? "click" : "hover"}
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
