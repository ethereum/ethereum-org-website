"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils/cn"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "eth-z-50 eth-w-64 eth-rounded-md eth-border eth-bg-popover eth-p-4 eth-text-popover-foreground eth-shadow-md eth-outline-none data-[state=open]:eth-animate-in data-[state=closed]:eth-animate-out data-[state=closed]:eth-fade-out-0 data-[state=open]:eth-fade-in-0 data-[state=closed]:eth-zoom-out-95 data-[state=open]:eth-zoom-in-95 data-[side=bottom]:eth-slide-in-from-top-2 data-[side=left]:eth-slide-in-from-right-2 data-[side=right]:eth-slide-in-from-left-2 data-[side=top]:eth-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardContent,HoverCardTrigger }
