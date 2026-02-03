import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const cardGridVariants = cva("grid", {
  variants: {
    columns: {
      "fill-3": "grid-cols-fill-3",
      "fill-4": "grid-cols-fill-4",
      "fill-8": "grid-cols-fill-8",
      "fill-10": "grid-cols-fill-10",
    },
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    columns: "fill-4",
    gap: "lg",
  },
})

const CardGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardGridVariants>
>(({ className, columns, gap, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardGridVariants({ columns, gap }), className)}
    {...props}
  />
))
CardGrid.displayName = "CardGrid"

export { CardGrid, cardGridVariants }
