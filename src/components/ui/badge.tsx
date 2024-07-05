import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const badgeVariants = cva(
  "eth-inline-flex eth-items-center eth-rounded-full eth-border eth-px-2.5 eth-py-0.5 eth-text-xs eth-font-semibold eth-transition-colors focus:eth-outline-none focus:eth-ring-2 focus:eth-ring-ring focus:eth-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "eth-border-transparent eth-bg-primary eth-text-primary-foreground hover:eth-bg-primary/80",
        secondary:
          "eth-border-transparent eth-bg-secondary eth-text-secondary-foreground hover:eth-bg-secondary/80",
        destructive:
          "eth-border-transparent eth-bg-destructive eth-text-destructive-foreground hover:eth-bg-destructive/80",
        outline: "eth-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
