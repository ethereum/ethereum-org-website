"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils/cn"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "eth-z-50 eth-overflow-hidden eth-rounded-md eth-border eth-bg-popover eth-px-3 eth-py-1.5 eth-text-sm eth-text-popover-foreground eth-shadow-md eth-animate-in eth-fade-in-0 eth-zoom-in-95 data-[state=closed]:eth-animate-out data-[state=closed]:eth-fade-out-0 data-[state=closed]:eth-zoom-out-95 data-[side=bottom]:eth-slide-in-from-top-2 data-[side=left]:eth-slide-in-from-right-2 data-[side=right]:eth-slide-in-from-left-2 data-[side=top]:eth-slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider,TooltipTrigger }
