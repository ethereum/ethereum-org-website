import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

// Responsive grid for laying out a collection of items (cards, tiles, badges).
// - `columns` is the max column count at full width; the grid folds to fewer
//   columns as the viewport narrows. Each value maps to a static class string
//   so Tailwind can detect it -- do not interpolate the count into the name.
// - `size` sets the min item width (--grid-item-min): the floor an item
//   shrinks to before a column drops, and so the fold-aggressiveness lever.
//   Pick by item shape -- `narrow` for small items/badges (pairs with high
//   `columns`), `base` for standard content cards (default), `wide` for
//   horizontal items like callouts (pairs with low `columns`). Larger sizes
//   wrap sooner; keep `columns` small enough that N items fit.
// - `fit` collapses empty tracks (auto-fit) so items stretch to fill the row;
//   the default keeps empty tracks (auto-fill).
// Override --grid-item-min via className for a bespoke width (`[--grid-item-min:20rem]`).
const gridVariants = cva("grid gap-4", {
  variants: {
    columns: {
      2: "grid-cols-auto-2",
      3: "grid-cols-auto-3",
      4: "grid-cols-auto-4",
      5: "grid-cols-auto-5",
      6: "grid-cols-auto-6",
      7: "grid-cols-auto-7",
      8: "grid-cols-auto-8",
      9: "grid-cols-auto-9",
      10: "grid-cols-auto-10",
      11: "grid-cols-auto-11",
      12: "grid-cols-auto-12",
    },
    size: {
      small: "[--grid-item-min:7rem]",
      narrow: "[--grid-item-min:12rem]",
      base: "[--grid-item-min:18rem]",
      wide: "[--grid-item-min:22rem]",
      wider: "[--grid-item-min:26rem]",
    },
    fit: {
      true: "[--grid-repeat:auto-fit]",
    },
  },
  defaultVariants: {
    columns: 4,
    size: "base",
  },
})

const Grid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof gridVariants>
>(({ className, columns, size, fit, ...props }, ref) => (
  <div
    ref={ref}
    data-label="grid"
    className={cn(gridVariants({ columns, size, fit }), className)}
    {...props}
  />
))
Grid.displayName = "Grid"

export { Grid }
