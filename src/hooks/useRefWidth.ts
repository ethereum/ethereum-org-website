"use client"

import { type RefObject, useCallback, useEffect, useState } from "react"

import { useEventListener } from "./useEventListener"

export const useRefWidth = (
  ref: RefObject<HTMLElement>,
  padding: number = 0
): number => {
  const [width, setWidth] = useState(0)

  const updateWidth = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setWidth(Math.max(0, rect.width - padding))
    }
  }, [ref, padding])

  // Use the internal useEventListener for window resize
  useEventListener("resize", updateWidth)

  useEffect(() => {
    // Initial measurement
    updateWidth()

    // Create ResizeObserver for more accurate monitoring
    const resizeObserver = new ResizeObserver(updateWidth)
    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref, padding, updateWidth])

  return width
}
