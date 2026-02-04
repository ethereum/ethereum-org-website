import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils/cn"

/**
 * EdgeScrollContainer - A horizontal scroll container that extends edge-to-edge
 * while keeping content aligned with page boundaries.
 *
 * CSS Variables (override via className with responsive prefixes):
 * --edge-spacing: Edge inset spacing (default: 1rem, md: 2rem)
 * --edge-mask-size: Fade distance for mask at 2xl+ (default: 2rem)
 * --edge-overflow-y-pad: Vertical padding for scrollbar/shadow (default: 1.5rem)
 *
 * @example Basic usage (1rem mobile, 2rem at md+ - matches typical page padding)
 * <EdgeScrollContainer>
 *   <EdgeScrollItem><Card /></EdgeScrollItem>
 * </EdgeScrollContainer>
 *
 * @example Custom spacing override
 * <EdgeScrollContainer className="[--edge-spacing:0.5rem] md:[--edge-spacing:1rem]">
 *   <EdgeScrollItem><Card /></EdgeScrollItem>
 * </EdgeScrollContainer>
 */

const wrapperClasses = cn(
  // Negative margin to extend to screen edges
  "-mx-[var(--edge-spacing)]",
  // Mask fade at 2xl+
  "2xl:[mask-image:linear-gradient(to_right,transparent,white_var(--edge-mask-size),white_calc(100%-var(--edge-mask-size)),transparent)]"
)

const containerClasses = cn(
  // Vertical margin-adjusted padding for overflow (scrollbar/shadows)
  "-my-[var(--edge-overflow-y-pad)] py-[var(--edge-overflow-y-pad)]",
  // Scroll container
  "flex overflow-x-auto"
)

const snapClasses = cn(
  "snap-x snap-mandatory",
  // Scroll padding for snap alignment
  "scroll-ps-[var(--edge-spacing)] scroll-pe-[var(--edge-spacing)]"
)

export interface EdgeScrollContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Override base edge spacing (default: 1rem via className). Use className for responsive values. */
  spacing?: string
  /** Override vertical padding for scrollbar/shadow overflow (default: 1.5rem via className) */
  overflowYPad?: string
  /** Override fade distance for mask effect at 2xl+ (default: 2rem via className) */
  maskSize?: string
  /** Enable snap scrolling behavior (default: true) */
  snap?: boolean
}

const EdgeScrollContainer = React.forwardRef<
  HTMLDivElement,
  EdgeScrollContainerProps
>(
  (
    {
      className,
      spacing,
      overflowYPad,
      maskSize,
      snap = true,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Build dynamic CSS var classes for non-default values
    // Defaults are set via className so responsive overrides work
    const varClasses = cn(
      // Defaults (can be overridden by className with responsive prefixes)
      "[--edge-spacing:1rem] md:[--edge-spacing:2rem]",
      "[--edge-overflow-y-pad:1.5rem]",
      "[--edge-mask-size:2rem]",
      // Custom values override defaults (non-responsive)
      spacing && `[--edge-spacing:${spacing}]`,
      overflowYPad && `[--edge-overflow-y-pad:${overflowYPad}]`,
      maskSize && `[--edge-mask-size:${maskSize}]`
    )

    return (
      <div className={cn(wrapperClasses, varClasses, className)} style={style}>
        <div
          ref={ref}
          className={cn(containerClasses, snap && snapClasses)}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
EdgeScrollContainer.displayName = "EdgeScrollContainer"

const itemClasses = cn(
  "shrink-0 snap-start",
  "first:ms-[var(--edge-spacing)] last:me-[var(--edge-spacing)]"
)

export interface EdgeScrollItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as child element instead of wrapper div */
  asChild?: boolean
}

const EdgeScrollItem = React.forwardRef<HTMLDivElement, EdgeScrollItemProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} className={cn(itemClasses, className)} {...props}>
        {children}
      </Comp>
    )
  }
)
EdgeScrollItem.displayName = "EdgeScrollItem"

export { EdgeScrollContainer, EdgeScrollItem, itemClasses }
