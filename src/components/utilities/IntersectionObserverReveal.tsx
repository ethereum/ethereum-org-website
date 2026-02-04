"use client"

import { ReactNode, useState } from "react"
import { useIntersectionObserver } from "usehooks-ts"

import { cn } from "@/lib/utils/cn"

interface IntersectionObserverRevealProps {
  children: ReactNode
  threshold?: number
  className?: string
  rootMargin?: string
}

const IntersectionObserverReveal = ({
  children,
  threshold = 0,
  className,
  rootMargin,
}: IntersectionObserverRevealProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    root: null,
    rootMargin,
  })

  // once the element is visible, set a flag to prevent the element from being hidden again
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  if (isIntersecting && !hasBeenVisible) {
    setHasBeenVisible(true)
  }

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {(isIntersecting || hasBeenVisible) && (
        <div
          className={cn(
            "transition-opacity duration-700",
            isIntersecting || hasBeenVisible ? "opacity-100" : "opacity-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default IntersectionObserverReveal
