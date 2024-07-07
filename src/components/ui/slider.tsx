"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils/cn"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "eth-relative eth-flex eth-w-full eth-touch-none eth-select-none eth-items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="eth-relative eth-h-2 eth-w-full eth-grow eth-overflow-hidden eth-rounded-full eth-bg-secondary">
      <SliderPrimitive.Range className="eth-absolute eth-h-full eth-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="eth-block eth-h-5 eth-w-5 eth-rounded-full eth-border-2 eth-border-primary eth-bg-background eth-ring-offset-background eth-transition-colors focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 disabled:eth-pointer-events-none disabled:eth-opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
