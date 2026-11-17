"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils/cn"

/**
 * Opaque bar that sticks under the site nav (h-19), its bottom border fading
 * in only once it's stuck, so it reads as part of the page until then
 */
const StickyBar = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return
    let frame = 0
    const update = () => {
      frame = 0
      const top = parseFloat(getComputedStyle(bar).top)
      setStuck(bar.getBoundingClientRect().top <= top + 0.5)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      data-stuck={stuck || undefined}
      className={cn(
        "sticky top-19 z-docked flex items-center border-b border-transparent bg-background py-2 transition-colors duration-200 data-stuck:border-border",
        className
      )}
    >
      {children}
    </div>
  )
}

export default StickyBar
