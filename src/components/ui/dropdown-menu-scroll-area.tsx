"use client"

import { useCallback, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils/cn"

// Decorative scroll affordance pinned to an edge of the menu. The solid
// background matches the menu surface so the chevron never overlaps list text;
// it fades in/out via opacity in step with its `hidden` flag.
const ScrollChevron = ({
  edge,
  hidden,
}: {
  edge: "top" | "bottom"
  hidden: boolean
}) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-x-0 flex h-6 items-center justify-center bg-background text-body-medium transition-opacity",
      edge === "top" ? "top-0" : "bottom-0",
      hidden && "opacity-0"
    )}
  >
    <ChevronUp className={cn("size-4", edge === "bottom" && "-scale-y-100")} />
  </div>
)

/**
 * Scrollable region for `DropdownMenuContent` that surfaces up/down chevron
 * affordances when content is clipped above/below. Rendered by
 * `<DropdownMenuContent scrollAffordance>`; the parent supplies the flex column
 * layout and capped max-height, this owns the scroll container and indicators.
 */
export const DropdownMenuScrollArea = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // Track whether the menu has content scrolled out of view above/below so we
  // can surface chevron affordances. The content is portaled and only mounted
  // while open, so a callback ref wires up measurement when it appears.
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)

  const updateScrollIndicators = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    setCanScrollUp(scrollTop > 0)
    setCanScrollDown(Math.ceil(scrollTop + clientHeight) < scrollHeight)
  }, [])

  const setScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      observerRef.current?.disconnect()
      scrollRef.current = node
      if (!node) return
      updateScrollIndicators()
      observerRef.current = new ResizeObserver(updateScrollIndicators)
      observerRef.current.observe(node)
    },
    [updateScrollIndicators]
  )

  return (
    <>
      <ScrollChevron edge="top" hidden={!canScrollUp} />

      <div
        ref={setScrollRef}
        onScroll={updateScrollIndicators}
        className={cn(
          // `scroll-py-6` keeps keyboard-focused items clear of the 1.5rem
          // (h-6) chevron bars when scrolled into view.
          "min-h-0 scroll-py-6 overflow-y-auto py-2",
          // Fade content as it scrolls under a bar: the transparent stop lands
          // at the bar's inner edge, with a 0.5rem fade band just below it.
          canScrollUp &&
            "mask-t-from-[calc(100%-2rem)] mask-t-to-[calc(100%-1.5rem)]",
          canScrollDown &&
            "mask-b-from-[calc(100%-2rem)] mask-b-to-[calc(100%-1.5rem)]"
        )}
      >
        {children}
      </div>

      <ScrollChevron edge="bottom" hidden={!canScrollDown} />
    </>
  )
}
