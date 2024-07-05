"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils/cn"

const labelVariants = cva(
  "eth-text-sm eth-font-medium eth-leading-none peer-disabled:eth-cursor-not-allowed peer-disabled:eth-opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
