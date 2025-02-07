import React, { ComponentProps, ReactNode, useEffect } from "react"
import { Portal } from "@radix-ui/react-portal"

import { isMobile } from "@/lib/utils/isMobile"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Tooltip as Tooltipcomponent,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip"

import { useDisclosure } from "@/hooks/useDisclosure"
import { useIsClient } from "@/hooks/useIsClient"

export type TooltipProps = ComponentProps<typeof Popover> & {
  content: ReactNode
  children?: ReactNode
  onBeforeOpen?: () => void
  container?: HTMLElement | null
  customMatomoEvent?: {
    eventCategory: string
    eventAction: string
    eventName: string
  }
}

const Tooltip = ({
  content,
  children,
  onBeforeOpen,
  container,
  customMatomoEvent,
  ...props
}: TooltipProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isClient = useIsClient()

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
      customMatomoEvent &&
        trackCustomEvent({
          ...customMatomoEvent,
        })
    } else {
      onClose()
    }
  }

  // Avoid rendering on the server since the user can't interact with it and we
  // need to use different components depending on the device
  if (!isClient) {
    return null
  }

  // Use Popover on mobile devices since the user can't hover
  const Component = isMobile() ? Popover : Tooltipcomponent
  const Trigger = isMobile() ? PopoverTrigger : TooltipTrigger
  const Content = isMobile() ? PopoverContent : TooltipContent

  return (
    <Component
      open={isOpen}
      onOpenChange={handleOpenChange}
      delayDuration={200}
      {...props}
    >
      <Trigger className="focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover">
        {children}
      </Trigger>
      <Portal container={container}>
        <Content
          side="top"
          sideOffset={2}
          className="max-w-80 px-5 text-sm"
          data-testid="tooltip-popover"
        >
          {content}
        </Content>
      </Portal>
    </Component>
  )
}

export default Tooltip
