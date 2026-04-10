"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"

import { cn } from "@/lib/utils/cn"

/**
 * Carousel - A horizontal scroll carousel with arrow navigation
 * and pagination dots. Extends edge-to-edge while keeping content aligned
 * with page boundaries.
 *
 * Navigation auto-hides when content fits without scrolling.
 *
 * CSS Variables (override via className with responsive prefixes):
 * --edge-spacing: Edge inset spacing (default: 1rem, md: 2rem)
 * --edge-mask-size: Fade distance for mask at 2xl+ (default: 2rem)
 * --edge-overflow-y-pad: Vertical padding for scrollbar/shadow (default: 1.5rem)
 *
 * @example Basic usage
 * <Carousel>
 *   <CarouselItem><Card /></CarouselItem>
 * </Carousel>
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

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override base edge spacing (default: 1rem via className). Use className for responsive values. */
  spacing?: string
  /** Override vertical padding for scrollbar/shadow overflow (default: 1.5rem via className) */
  overflowYPad?: string
  /** Override fade distance for mask effect at 2xl+ (default: 2rem via className) */
  maskSize?: string
  /** Enable snap scrolling behavior (default: true) */
  snap?: boolean
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
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
    const outerRef = React.useRef<HTMLDivElement>(null)
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [canScrollStart, setCanScrollStart] = React.useState(false)
    const [canScrollEnd, setCanScrollEnd] = React.useState(false)
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [itemCount, setItemCount] = React.useState(0)
    const [needsNavigation, setNeedsNavigation] = React.useState(false)

    const getItems = React.useCallback(
      () =>
        scrollRef.current
          ? (Array.from(scrollRef.current.children) as HTMLElement[])
          : [],
      []
    )

    const update = React.useCallback(() => {
      const el = scrollRef.current
      if (!el) return

      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      const hasOverflow = scrollWidth > clientWidth + 1

      setNeedsNavigation(hasOverflow)
      setCanScrollStart(Math.abs(scrollLeft) > 1)
      setCanScrollEnd(Math.abs(scrollLeft) < maxScroll - 1)

      const items = getItems()
      setItemCount(items.length)

      if (!hasOverflow || items.length === 0) {
        setActiveIndex(0)
        return
      }

      // Find the item closest to the scroll container's left edge
      const containerLeft = el.getBoundingClientRect().left
      let closestIdx = 0
      let closestDist = Infinity
      items.forEach((item, i) => {
        const dist = Math.abs(item.getBoundingClientRect().left - containerLeft)
        if (dist < closestDist) {
          closestDist = dist
          closestIdx = i
        }
      })
      setActiveIndex(closestIdx)
    }, [getItems])

    React.useEffect(() => {
      const el = scrollRef.current
      if (!el) return

      update()
      el.addEventListener("scroll", update, { passive: true })
      const ro = new ResizeObserver(update)
      ro.observe(el)

      return () => {
        el.removeEventListener("scroll", update)
        ro.disconnect()
      }
    }, [update])

    const scrollToItem = (index: number) => {
      const items = getItems()
      if (!items[index] || !scrollRef.current) return
      const el = scrollRef.current
      const itemLeft = items[index].offsetLeft - el.offsetLeft
      el.scrollTo({ left: itemLeft, behavior: "smooth" })
    }

    const scrollByPage = (direction: "start" | "end") => {
      // Move to next/prev item rather than a full page
      const nextIndex =
        direction === "end"
          ? Math.min(activeIndex + 1, itemCount - 1)
          : Math.max(activeIndex - 1, 0)
      scrollToItem(nextIndex)
    }

    // Build dynamic CSS var classes for non-default values
    const varClasses = cn(
      "[--edge-spacing:1rem] md:[--edge-spacing:2rem]",
      "[--edge-overflow-y-pad:1.5rem]",
      "[--edge-mask-size:2rem]",
      spacing && `[--edge-spacing:${spacing}]`,
      overflowYPad && `[--edge-overflow-y-pad:${overflowYPad}]`,
      maskSize && `[--edge-mask-size:${maskSize}]`
    )

    const arrowClasses = cn(
      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
      "text-primary transition cursor-pointer",
      "border border-transparent",
      "hover:border-border hover:text-primary-hover hover:shadow-[4px_4px_theme('colors.primary.low-contrast')]",
      "active:text-primary-hover active:shadow-none",
      "disabled:pointer-events-none disabled:text-disabled",
      "focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-primary-hover"
    )

    return (
      <div
        ref={(node) => {
          ;(outerRef as React.MutableRefObject<HTMLDivElement | null>).current =
            node
          if (typeof ref === "function") ref(node)
          else if (ref) ref.current = node
        }}
        className={cn("space-y-6", className)}
      >
        <div className={cn(wrapperClasses, varClasses)} style={style}>
          <div
            ref={scrollRef}
            className={cn(containerClasses, snap && snapClasses)}
            {...props}
          >
            {children}
          </div>
        </div>

        {needsNavigation && (
          <nav
            aria-label="Carousel navigation"
            className="flex items-center justify-center gap-10"
          >
            <button
              type="button"
              aria-label="Previous"
              disabled={!canScrollStart}
              onClick={() => scrollByPage("start")}
              className={arrowClasses}
            >
              <ChevronPrev className="size-6" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: itemCount }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to item ${i + 1}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  onClick={() => scrollToItem(i)}
                  className={cn(
                    "size-2 cursor-pointer rounded-full transition-colors",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-hover",
                    i === activeIndex
                      ? "bg-primary-hover"
                      : "border border-body-light bg-transparent hover:border-body-medium"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next"
              disabled={!canScrollEnd}
              onClick={() => scrollByPage("end")}
              className={arrowClasses}
            >
              <ChevronNext className="size-6" />
            </button>
          </nav>
        )}
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

const itemClasses = cn(
  "shrink-0 snap-start",
  "first:ms-[var(--edge-spacing)] last:me-[var(--edge-spacing)]"
)

export interface CarouselItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as child element instead of wrapper div */
  asChild?: boolean
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} className={cn(itemClasses, className)} {...props}>
        {children}
      </Comp>
    )
  }
)
CarouselItem.displayName = "CarouselItem"

export { Carousel, CarouselItem, itemClasses }
