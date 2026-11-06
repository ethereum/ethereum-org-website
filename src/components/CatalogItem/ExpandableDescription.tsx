"use client"

import { type ReactNode, useEffect, useId, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

const ExpandableDescription = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("common")
  const [isOpen, setIsOpen] = useState(false)
  const [overflows, setOverflows] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    const el = ref.current
    if (!el || isOpen) return
    const observer = new ResizeObserver(() =>
      setOverflows(el.scrollHeight > el.clientHeight)
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [isOpen])

  const isClamped = !isOpen && overflows

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        ref={ref}
        id={id}
        // Tabbing into a link hidden by the clamp expands instead of scrolling it into a hidden area
        onFocus={(e) => {
          if (!isClamped) return
          const box = e.currentTarget.getBoundingClientRect()
          if (e.target.getBoundingClientRect().bottom > box.bottom) {
            e.currentTarget.scrollTop = 0
            setIsOpen(true)
          }
        }}
        className={cn(
          !isOpen && "max-h-48 overflow-hidden",
          isClamped &&
            "relative after:absolute after:inset-x-0 after:bottom-0 after:h-16 after:bg-linear-to-t after:from-background-highlight"
        )}
      >
        {children}
      </div>
      {overflows && (
        <Button
          variant="link"
          className="!px-0"
          aria-expanded={isOpen}
          aria-controls={id}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? t("show-less") : t("show-more")}
        </Button>
      )}
    </div>
  )
}

export default ExpandableDescription
