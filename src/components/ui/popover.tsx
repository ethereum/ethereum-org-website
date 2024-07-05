"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils/cn"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "eth-z-50 eth-w-72 eth-rounded-md eth-border eth-bg-popover eth-p-4 eth-text-popover-foreground eth-shadow-md eth-outline-none data-[state=open]:eth-animate-in data-[state=closed]:eth-animate-out data-[state=closed]:eth-fade-out-0 data-[state=open]:eth-fade-in-0 data-[state=closed]:eth-zoom-out-95 data-[state=open]:eth-zoom-in-95 data-[side=bottom]:eth-slide-in-from-top-2 data-[side=left]:eth-slide-in-from-right-2 data-[side=right]:eth-slide-in-from-left-2 data-[side=top]:eth-slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverContent,PopoverTrigger }
