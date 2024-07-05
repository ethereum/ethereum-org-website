"use client"

import * as React from "react"
import { Check } from "lucide-react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils/cn"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "eth-peer eth-h-4 eth-w-4 eth-shrink-0 eth-rounded-sm eth-border eth-border-primary eth-ring-offset-background focus-visible:eth-outline-none focus-visible:eth-ring-2 focus-visible:eth-ring-ring focus-visible:eth-ring-offset-2 disabled:eth-cursor-not-allowed disabled:eth-opacity-50 data-[state=checked]:eth-bg-primary data-[state=checked]:eth-text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("eth-flex eth-items-center eth-justify-center eth-text-current")}
    >
      <Check className="eth-h-4 eth-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
