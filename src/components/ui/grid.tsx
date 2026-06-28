import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

// Responsive grid for laying out a collection of items (cards, tiles, badges).
// - `columns` is the max column count at full width; the grid folds to fewer
//   columns as the viewport narrows (auto-fill). Each value maps to a static
//   class so Tailwind can detect it -- do not interpolate the count.
// - `size` sets the min item width (--grid-item-min): the floor an item shrinks
//   to before a column drops, and so the fold-aggressiveness lever. `narrow`
//   (badges) | `base` (default cards) | `wide`/`wider` (horizontal items like
//   callouts). Larger sizes wrap sooner.
// - `fit` collapses empty tracks (auto-fit) so items stretch to fill the row.
// - `balanced={2|4}` is for a FIXED set of that many items: a deterministic
//   breakpoint reflow instead of content-driven auto-fill. `4` -> `4 / 2x2 / 1`
//   (never an orphan 3-up row); `2` -> `2 / 1` at md (a breakpoint-driven
//   alternative to `columns={2}`, which folds by content width). It overrides
//   `columns` and makes `size`/`fit` inert via `!important`.
// Override --grid-item-min via className for a bespoke width.
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
    // Fixed symmetric reflow for a known set of items. `!important` overrides the
    // grid-template-columns from `columns`, so the breakpoint ladder always wins.
    // Both fold 1 -> 2 at md, matching the dominant 2-up grid pattern in-app.
    balanced: {
      2: "grid-cols-1! md:grid-cols-2!",
      4: "grid-cols-1! md:grid-cols-2! xl:grid-cols-4!",
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
>(({ className, columns, size, fit, balanced, ...props }, ref) => (
  <div
    ref={ref}
    data-label="grid"
    className={cn(gridVariants({ columns, size, fit, balanced }), className)}
    {...props}
  />
))
Grid.displayName = "Grid"

export { Grid }
