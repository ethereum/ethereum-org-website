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

// Hover intent, per NN/g timing guidance: a pointer must rest on a trigger
// before a closed menu opens, a shorter rest switches sections, and the panel
// survives brief exits. Radix's own instant hover handling is disabled.
const OPEN_DELAY_MS = 400
const SWITCH_DELAY_MS = 120
const CLOSE_DELAY_MS = 400
// A click landing just after a hover-open confirms the open instead of toggling it shut
const HOVER_CLICK_GRACE_MS = 600

const isMouse = (event: PointerEvent) => event.pointerType === "mouse"

export const useNavMenu = () => {
  const { direction } = useRtlFlip()
  const locale = useLocale()
  const pathname = usePathname() || ""
  // Tied to the path it opened on, so navigating closes the menu
  const [open, setOpen] = useState({ key: "", path: pathname })
  const value = open.path === pathname ? open.key : ""
  const openTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hoverOpenedAt = useRef(0)

  const clearTimers = () => {
    clearTimeout(openTimer.current)
    clearTimeout(closeTimer.current)
  }

  useEffect(() => clearTimers, [])

  useEffect(() => {
    if (!value) return
    trackCustomEvent({
      eventCategory: "Desktop navigation menu",
      eventAction: "Section changed",
      eventName: `Open section: ${locale} - ${value}`,
    })
  }, [value, locale])

  const setSection = (key: string) => setOpen({ key, path: pathname })

  const closeAfter = (delay: number) => {
    clearTimers()
    closeTimer.current = setTimeout(() => setSection(""), delay)
  }

  // Focus the matching top-level item when a number key is pressed
  useKeyboardShortcut("navSections", (event) => {
    const item = document.querySelector(
      `#${MAIN_NAV_ID} > li:nth-of-type(${parseInt(event.key)}) :is(button, a)`
    )
    if (item instanceof HTMLElement) item.focus()
  })

  const triggerProps = (key: NavSectionKey) => ({
    onPointerEnter: (event: PointerEvent) => {
      if (!isMouse(event)) return
      clearTimers()
      if (value === key) return
      openTimer.current = setTimeout(
        () => {
          hoverOpenedAt.current = Date.now()
          setSection(key)
        },
        value ? SWITCH_DELAY_MS : OPEN_DELAY_MS
      )
    },
    onPointerMove: (event: PointerEvent) => event.preventDefault(),
    onPointerLeave: (event: PointerEvent) => {
      event.preventDefault()
      if (isMouse(event)) clearTimeout(openTimer.current)
    },
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
      clearTimers()
      hoverOpenedAt.current = 0
      setSection(next)
    },
    triggerProps,
    rootProps: {
      onPointerEnter: () => clearTimeout(closeTimer.current),
      onPointerLeave: (event: PointerEvent) => {
        if (isMouse(event)) closeAfter(CLOSE_DELAY_MS)
      },
    },
    /** For plain links in the bar: pointing at one dismisses an open panel */
    linkProps: {
      onPointerEnter: (event: PointerEvent) => {
        if (isMouse(event) && value) closeAfter(SWITCH_DELAY_MS)
      },
    },
    viewportProps: {
      onPointerEnter: (event: PointerEvent) => event.preventDefault(),
      onPointerLeave: (event: PointerEvent) => event.preventDefault(),
    },
  }
}
