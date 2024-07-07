"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils/cn"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "eth-peer eth-inline-flex eth-h-6 eth-w-11 eth-shrink-0 eth-cursor-pointer eth-items-center eth-rounded-full eth-border-2 eth-border-transparent eth-transition-colors focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 focus-visible:eth-ring-offset-background disabled:eth-cursor-not-allowed disabled:eth-opacity-50 data-[state=checked]:eth-bg-primary data-[state=unchecked]:eth-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "eth-pointer-events-none eth-block eth-h-5 eth-w-5 eth-rounded-full eth-bg-background eth-shadow-lg eth-ring-0 eth-transition-transform data-[state=checked]:eth-translate-x-5 data-[state=unchecked]:eth-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
