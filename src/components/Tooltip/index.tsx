import React, { ComponentProps, ReactNode, useEffect } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

import { useDisclosure } from "@/hooks/useDisclosure"

export type TooltipProps = ComponentProps<typeof Popover> & {
  content: ReactNode
  children?: ReactNode
  onBeforeOpen?: () => void
}

const Tooltip = ({
  content,
  children,
  onBeforeOpen,
  ...props
}: TooltipProps) => {
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

  const handleOpen = () => {
    onBeforeOpen?.()
    onOpen()
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      handleOpen()
    } else {
      onClose()
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} {...props}>
      <PopoverTrigger
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        className="focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover"
      >
        {children}
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={2}
        className="w-80 px-5 text-sm"
        data-testid="tooltip-popover"
      >
        {content}
      </PopoverContent>
    </Popover>
  )
}

export default Tooltip
