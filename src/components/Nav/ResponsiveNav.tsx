"use client"

import { type ReactNode, useRef, useState } from "react"
import { useLocale } from "next-intl"

import { breakpointAsNumber } from "@/lib/utils/screen"

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect"
import { useMediaQuery } from "@/hooks/useMediaQuery"

type Density = "full" | "compact"
type Mode = Density | "mobile"

// Breathing room kept between the menu and the utility buttons
const MIN_GAP_PX = 24

/**
 * Picks the densest nav bar that fits: full, then compact (icon-only
 * utilities, tighter items), then the mobile menu. Labels run far longer in
 * some locales, so the choice comes from measured widths, not a breakpoint.
 * Below `lg` the mobile menu is always used.
 */
const ResponsiveNav = ({
  desktop,
  mobile,
}: {
  desktop: ReactNode
  mobile: ReactNode
}) => {
  const locale = useLocale()
  const [isLg] = useMediaQuery([`(min-width: ${breakpointAsNumber.lg}px)`])
  const containerRef = useRef<HTMLDivElement>(null)
  // Natural bar width per locale and density, recorded whenever one renders
  const widths = useRef<Record<string, Partial<Record<Density, number>>>>({})
  const [chosen, setChosen] = useState<{ mode: Mode; locale: string }>({
    mode: "full",
    locale,
  })
  const mode = chosen.locale === locale ? chosen.mode : "full"

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const measured = (widths.current[locale] ??= {})
      const bar = container.querySelector<HTMLElement>("[data-nav-bar]")
      if (bar && mode !== "mobile") {
        measured[mode] =
          Array.from(bar.children).reduce(
            (sum, child) => sum + child.scrollWidth,
            0
          ) + MIN_GAP_PX
      }
      // An unmeasured density is tried before falling back past it
      const available = container.clientWidth
      const next: Mode =
        (measured.full ?? 0) <= available
          ? "full"
          : (measured.compact ?? 0) <= available
            ? "compact"
            : "mobile"
      if (next !== mode) setChosen({ mode: next, locale })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(container)
    document.fonts?.ready.then(update)
    return () => observer.disconnect()
  }, [isLg, mode, locale])

  if (!isLg) return <div className="flex w-full justify-end">{mobile}</div>

  return (
    <div
      ref={containerRef}
      data-density={mode === "mobile" ? undefined : mode}
      className="group/navbar flex w-full min-w-0 justify-end"
    >
      {mode === "mobile" ? mobile : desktop}
    </div>
  )
}

export default ResponsiveNav
