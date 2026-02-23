"use client"

import { useEffect, useRef } from "react"
import { useIntersectionObserver } from "usehooks-ts"
import { Slot } from "@radix-ui/react-slot"

import { trackCustomEvent } from "@/lib/utils/matomo"

type TrackedSectionProps = {
  id: string
  eventCategory: string
  children: React.ReactNode
  asChild?: boolean
}

export function TrackedSection({
  id,
  eventCategory,
  children,
  asChild = false,
}: TrackedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.3 })
  const hasTrackedView = useRef(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Track section_view after 1 second of visibility
  useEffect(() => {
    if (isIntersecting && !hasTrackedView.current) {
      timerRef.current = setTimeout(() => {
        trackCustomEvent({
          eventCategory,
          eventAction: "section_view",
          eventName: id,
        })
        hasTrackedView.current = true
      }, 1000)
    } else if (!isIntersecting && timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isIntersecting, eventCategory, id])

  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={ref} id={id}>
      {children}
    </Comp>
  )
}
