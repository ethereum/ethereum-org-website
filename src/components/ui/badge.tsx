import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

/**
 * TODO: finish migration. Needs to implement the DS badge styles. Currently is
 * only used in the LanguagePicker component.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // TODO: remove variant once we finish the badge and tag components with DS styles
        productTable: "bg-body-light text-body font-medium uppercase",
        emerging: "bg-blue-600 text-white border-none",
        developing: "bg-blue-400 text-white border-none",
        maturing: "bg-blue-200 text-black border-none",
        robust: "bg-blue-100 text-black border-none",
        "n/a": "hidden lg:block",
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
