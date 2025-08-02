import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils/cn"

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all",
  {
    variants: {
      color: {
        disabled: "bg-disabled",
        primary: "bg-primary",
      },
    },
    defaultVariants: {
      color: "disabled",
    },
  }
)

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> &
  VariantProps<typeof progressIndicatorVariants>

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-body-light",
      color === "primary" ? "bg-background" : "bg-body-light",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={progressIndicatorVariants({ color })}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
