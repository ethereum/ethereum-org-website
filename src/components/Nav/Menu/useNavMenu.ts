import {
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react"
import { useLocale } from "next-intl"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { MAIN_NAV_ID } from "@/lib/constants"

import type { NavSectionKey } from "../types"

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { useRtlFlip } from "@/hooks/useRtlFlip"
import { usePathname } from "@/i18n/navigation"

// Hover intent: a closed menu opens only after the pointer rests on a trigger
// (NN/g), but an open one switches sections at once and closes as soon as the
// pointer leaves its hover zone. Radix's own hover handling is disabled.
const OPEN_DELAY_MS = 400
const CLOSE_DELAY_MS = 50
// Cutting across another trigger on the way into the panel switches only after a pause
const AIM_DELAY_MS = 120
// A click landing just after a hover-open confirms the open instead of toggling it shut
const HOVER_CLICK_GRACE_MS = 600
// Heading is judged over the last few pixels of travel
const AIM_SAMPLE_PX = 12
const TRAIL_MAX_POINTS = 64

type Point = { x: number; y: number }

const isMouse = (event: { pointerType: string }) =>
  event.pointerType === "mouse"

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

/** Whether the pointer's heading, extended, lands on the panel's top edge */
const isHeadingIntoPanel = (
  trail: Point[],
  to: Point,
  panel: Element | null
) => {
  let from: Point | undefined
  for (let i = trail.length - 1; i >= 0 && !from; i--)
    if (distance(trail[i], to) >= AIM_SAMPLE_PX) from = trail[i]
  if (!panel || !from || to.y <= from.y) return false
  const { left, right, top } = panel.getBoundingClientRect()
  if (from.y >= top) return false
  const xAtTop = from.x + ((top - from.y) * (to.x - from.x)) / (to.y - from.y)
  return xAtTop >= left && xAtTop <= right
}

/** The trigger row, the panel, and the gap between them form one hover zone */
const isInHoverZone = (
  x: number,
  y: number,
  list: Element | null,
  panel: Element | null
) => {
  if (!list || !panel) return true
  const bar = list.getBoundingClientRect()
  const box = panel.getBoundingClientRect()
  const inBar =
    x >= bar.left && x <= bar.right && y >= bar.top && y <= bar.bottom
  const inPanelOrGap =
    x >= Math.min(bar.left, box.left) &&
    x <= Math.max(bar.right, box.right) &&
    y >= bar.bottom &&
    y <= box.bottom
  return inBar || inPanelOrGap
}

export const useNavMenu = () => {
  const { direction } = useRtlFlip()
  const locale = useLocale()
  const pathname = usePathname() || ""
  // Tied to the path it opened on, so navigating closes the menu
  const [open, setOpen] = useState({ key: "", path: pathname })
  const value = open.path === pathname ? open.key : ""
  const isOpen = value !== ""
  const listRef = useRef<HTMLUListElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hoverOpenedAt = useRef(0)
  const trail = useRef<Point[]>([])

  useEffect(
    () => () => {
      clearTimeout(openTimer.current)
      clearTimeout(closeTimer.current)
    },
    []
  )

  useEffect(() => {
    if (!value) return
    trackCustomEvent({
      eventCategory: "Desktop navigation menu",
      eventAction: "Section changed",
      eventName: `Open section: ${locale} - ${value}`,
    })
  }, [value, locale])

  useEffect(() => {
    if (!isOpen) return
    // Armed once the pointer is inside, so a keyboard-opened panel ignores a distant mouse
    let armed = false
    const cancelClose = () => {
      clearTimeout(closeTimer.current)
      closeTimer.current = undefined
    }
    const scheduleClose = (delay = CLOSE_DELAY_MS) => {
      if (!armed || closeTimer.current) return
      closeTimer.current = setTimeout(
        () => setOpen((current) => ({ ...current, key: "" })),
        delay
      )
    }
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (!isMouse(event)) return
      const point = { x: event.clientX, y: event.clientY }
      const panel = viewportRef.current
      if (isInHoverZone(point.x, point.y, listRef.current, panel)) {
        armed = true
        cancelClose()
      } else {
        // A diagonal into the panel can clip the bar beside the triggers
        const aiming = isHeadingIntoPanel(trail.current, point, panel)
        scheduleClose(aiming ? AIM_DELAY_MS : CLOSE_DELAY_MS)
      }
      const points = trail.current
      points.push(point)
      while (
        points.length > TRAIL_MAX_POINTS ||
        (points.length > 2 && distance(points[1], point) >= AIM_SAMPLE_PX)
      )
        points.shift()
    }
    // Leaving the window fires no further moves
    const onPointerOut = (event: globalThis.PointerEvent) => {
      if (isMouse(event) && !event.relatedTarget) scheduleClose()
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("pointerout", onPointerOut)
    return () => {
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerout", onPointerOut)
      cancelClose()
      trail.current = []
    }
  }, [isOpen])

  const setSection = (key: string) => setOpen({ key, path: pathname })

  // Focus the matching top-level item when a number key is pressed
  useKeyboardShortcut("navSections", (event) => {
    const item = document.querySelector(
      `#${MAIN_NAV_ID} > li:nth-of-type(${parseInt(event.key)}) :is(button, a)`
    )
    if (item instanceof HTMLElement) item.focus()
  })

  const show = (key: string) => {
    hoverOpenedAt.current = key ? Date.now() : 0
    setSection(key)
  }

  const switchTo = (key: string, event: PointerEvent) => {
    clearTimeout(openTimer.current)
    const point = { x: event.clientX, y: event.clientY }
    if (!isHeadingIntoPanel(trail.current, point, viewportRef.current))
      return show(key)
    openTimer.current = setTimeout(() => show(key), AIM_DELAY_MS)
  }

  /** Hover handling for a bar item; `key` is "" for plain links, which close the panel */
  const hoverProps = (key: string) => ({
    onPointerEnter: (event: PointerEvent) => {
      if (!isMouse(event)) return
      clearTimeout(openTimer.current)
      if (value === key) return
      if (isOpen) switchTo(key, event)
      else if (key)
        openTimer.current = setTimeout(() => show(key), OPEN_DELAY_MS)
    },
    // Re-checked while a switch waits, so stopping on the item or turning along the bar commits it
    onPointerMove: (event: PointerEvent) => {
      event.preventDefault()
      if (isMouse(event) && isOpen && value !== key) switchTo(key, event)
    },
    onPointerLeave: (event: PointerEvent) => {
      event.preventDefault()
      if (isMouse(event)) clearTimeout(openTimer.current)
    },
  })

  const triggerProps = (key: NavSectionKey) => ({
    ...hoverProps(key),
    onClick: (event: MouseEvent) => {
      const sinceHoverOpen = Date.now() - hoverOpenedAt.current
      if (value === key && sinceHoverOpen < HOVER_CLICK_GRACE_MS)
        event.preventDefault()
    },
  })

  return {
    direction,
    value,
    /** Radix-driven changes: click, keyboard, Escape, focus or click outside */
    onValueChange: (next: string) => {
      clearTimeout(openTimer.current)
      hoverOpenedAt.current = 0
      setSection(next)
    },
    triggerProps,
    listProps: { ref: listRef },
    /** For plain links in the bar: pointing at one dismisses an open panel */
    linkProps: hoverProps(""),
    viewportProps: {
      ref: viewportRef,
      onPointerEnter: (event: PointerEvent) => event.preventDefault(),
      onPointerLeave: (event: PointerEvent) => event.preventDefault(),
    },
  }
}
