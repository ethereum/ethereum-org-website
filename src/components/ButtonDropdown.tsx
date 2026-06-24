"use client"

import { useCallback, useRef, useState } from "react"
import { ChevronDown, ChevronUp, Menu } from "lucide-react"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { Button } from "./ui/buttons/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { BaseLink } from "./ui/Link"

export interface ListItem {
  text: string
  href?: string
  matomo?: {
    eventCategory: string
    eventAction: string
    eventName: string
  }
  callback?: (idx: number) => void
}

export interface List {
  text: string
  ariaLabel: string
  items: Array<ListItem>
}

export type ButtonDropdownProps = {
  list: List
  className?: string
}

// Decorative scroll affordance pinned to an edge of the menu. The solid
// background matches the menu surface so the chevron never overlaps list text;
// it fades in/out via opacity in step with its `hidden` flag.
const ScrollChevron = ({
  edge,
  hidden,
}: {
  edge: "top" | "bottom"
  hidden: boolean
}) => {
  const Icon = edge === "top" ? ChevronUp : ChevronDown
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 flex h-6 items-center justify-center bg-background text-body-medium transition-opacity",
        edge === "top" ? "top-0" : "bottom-0",
        hidden && "opacity-0"
      )}
    >
      <Icon className="size-4" />
    </div>
  )
}

const ButtonDropdown = ({ list, className }: ButtonDropdownProps) => {
  const [selectedItem, setSelectedItem] = useState(list.text)

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

  const handleClick = (item: ListItem, idx: number) => {
    if (item.matomo) trackCustomEvent(item.matomo)
    item.callback?.(idx)
    setSelectedItem(item.text)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          aria-label={list.ariaLabel}
          className={cn("flex justify-between", className)}
        >
          <Menu aria-hidden />
          <span className="flex-1 text-center">{selectedItem}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="relative flex max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) flex-col p-0"
        collisionPadding={16}
        sideOffset={8}
      >
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
          {list.items.map((item, idx) => (
            <DropdownMenuItem
              key={item.text}
              className="justify-center text-center"
              onClick={() => handleClick(item, idx)}
              asChild={!!item.href}
            >
              {item.href ? (
                <BaseLink
                  href={item.href}
                  className="text-body no-underline focus-visible:outline-0"
                >
                  {item.text}
                </BaseLink>
              ) : (
                <span>{item.text}</span>
              )}
            </DropdownMenuItem>
          ))}
        </div>

        <ScrollChevron edge="bottom" hidden={!canScrollDown} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ButtonDropdown
