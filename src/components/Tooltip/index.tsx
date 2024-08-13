import React, { ReactNode, useEffect } from "react"
import { PopoverProps } from "@chakra-ui/react"

import { isMobile } from "@/lib/utils/isMobile"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Tooltip as RootTooltip,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip"

import { useDisclosure } from "@/hooks/useDisclosure"

export interface TooltipProps extends PopoverProps {
  content: ReactNode
  children?: ReactNode
  onBeforeOpen?: () => void
}

const Tooltip = ({
  content,
  children,
  onBeforeOpen,
  // ...rest
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

  // Mobile devices use the Popover component because it supports click/touch
  // events
  if (isMobile()) {
    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent data-testid="tooltip-popover">{content}</PopoverContent>
      </Popover>
    )
  }

  // Desktop devices use the Tooltip component because it is desined for hover
  // and focus events
  return (
    <RootTooltip open={isOpen} onOpenChange={handleOpenChange}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent data-testid="tooltip-popover">{content}</TooltipContent>
    </RootTooltip>
  )
}

export default Tooltip
