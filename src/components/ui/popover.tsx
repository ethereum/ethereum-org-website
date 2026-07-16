import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils/cn"

const Popover = PopoverPrimitive.Root

type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>

const PopoverTrigger = PopoverPrimitive.Trigger

type PopoverContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
> & {
  /** Base `bg-background` instead of `bg-background-highlight`, for when nested in an already-highlighted container. */
  nested?: boolean
}

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    { className, children, align = "center", sideOffset = 4, nested, ...props },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // `popover-outline` = border + lift wrapping the Arrow. See design-system skill (Floating surfaces).
          "text-popover-foreground z-popover w-72 rounded p-4 outline-hidden popover-outline data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          nested ? "bg-background" : "bg-background-highlight",
          className
        )}
        {...props}
      >
        {children}
        <PopoverPrimitive.Arrow
          className={cn(
            "z-popover",
            nested ? "fill-background" : "fill-background-highlight"
          )}
        />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverClose = PopoverPrimitive.Close

PopoverClose.displayName = "PopoverClose"

export {
  Popover,
  PopoverClose,
  PopoverContent,
  type PopoverContentProps,
  type PopoverProps,
  PopoverTrigger,
}
