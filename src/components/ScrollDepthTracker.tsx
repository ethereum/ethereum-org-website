"use client"

import { useEffect, useRef } from "react"

import { trackCustomEvent } from "@/lib/utils/matomo"

const THRESHOLDS = [25, 50, 75, 100] as const

interface ScrollDepthTrackerProps {
  eventCategory: string
}

export default function ScrollDepthTracker({
  eventCategory,
}: ScrollDepthTrackerProps) {
  const firedThresholds = useRef<Set<number>>(new Set())

  useEffect(() => {
    let ticking = false
    let rafId: number | null = null

    const cleanup = () => {
      window.removeEventListener("scroll", throttledHandler)
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
      }
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollPercent = ((scrollTop + viewportHeight) / docHeight) * 100

      for (const threshold of THRESHOLDS) {
        if (
          scrollPercent >= threshold &&
          !firedThresholds.current.has(threshold)
        ) {
          firedThresholds.current.add(threshold)
          trackCustomEvent({
            eventCategory,
            eventAction: "scroll_depth",
            eventName: `${threshold}%`,
          })
        }
      }

      // Remove listener once all thresholds have been tracked
      if (firedThresholds.current.size === THRESHOLDS.length) {
        cleanup()
      }
    }

    const throttledHandler = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandler, { passive: true })
    handleScroll() // Check initial scroll position

    return cleanup
  }, [eventCategory])

  return null
}
