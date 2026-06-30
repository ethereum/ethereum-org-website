import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils/cn"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    /** Base `bg-background` instead of `bg-background-highlight`, for when nested in an already-highlighted container. */
    nested?: boolean
  }
>(({ children, className, sideOffset = 4, nested, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      // `popover-outline` = border + lift wrapping the Arrow; no `overflow-hidden`
      // (it would clip the Arrow). See design-system skill (Floating surfaces).
      "z-popover animate-in rounded-md p-4 text-sm text-body popover-outline fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      nested ? "bg-background" : "bg-background-highlight",
      className
    )}
    {...props}
  >
    {children}
    <TooltipPrimitive.Arrow
      className={cn(
        "z-popover",
        nested ? "fill-background" : "fill-background-highlight"
      )}
    />
  </TooltipPrimitive.Content>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
