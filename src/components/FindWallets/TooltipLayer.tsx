"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

// One delegated tooltip for the whole wallet list. Server components render
// plain triggers (`data-tooltip-ref` pointing at a hidden content element +
// `aria-describedby` for screen readers); this layer positions a single
// floating panel for sighted hover/focus/tap. Replaces per-instance Radix
// tooltips, which dominated hydration cost on this page (~19 per wallet row).

type ActiveTooltip = {
  html: string
  triggerRect: DOMRect
}

const TOOLTIP_MAX_WIDTH = 320
const GAP = 8

const getTrigger = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof Element)) return null
  return target.closest<HTMLElement>("[data-tooltip-ref]")
}

const readContent = (trigger: HTMLElement): string | null => {
  const contentId = trigger.getAttribute("data-tooltip-ref")
  if (!contentId) return null
  return document.getElementById(contentId)?.innerHTML ?? null
}

const TooltipLayer = () => {
  const [active, setActive] = useState<ActiveTooltip | null>(null)
  const activeTriggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const show = (trigger: HTMLElement) => {
      const html = readContent(trigger)
      if (html === null) return
      activeTriggerRef.current = trigger
      setActive({ html, triggerRect: trigger.getBoundingClientRect() })
    }

    const hide = () => {
      if (!activeTriggerRef.current) return
      activeTriggerRef.current = null
      setActive(null)
    }

    // Capture phase so preventDefault() stops a parent <summary> from
    // toggling when a tooltip trigger inside it is tapped.
    const onClick = (e: MouseEvent) => {
      const trigger = getTrigger(e.target)
      if (!trigger) {
        hide()
        return
      }
      e.preventDefault()
      e.stopPropagation()
      if (activeTriggerRef.current === trigger) {
        hide()
      } else {
        show(trigger)
      }
    }

    const onPointerOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const trigger = getTrigger(e.target)
      if (trigger) show(trigger)
    }

    const onPointerOut = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      if (getTrigger(e.target) === activeTriggerRef.current) hide()
    }

    const onFocusIn = (e: FocusEvent) => {
      const trigger = getTrigger(e.target)
      if (trigger) show(trigger)
    }

    const onFocusOut = (e: FocusEvent) => {
      if (getTrigger(e.target) === activeTriggerRef.current) hide()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide()
    }

    document.addEventListener("click", onClick, true)
    document.addEventListener("pointerover", onPointerOver)
    document.addEventListener("pointerout", onPointerOut)
    document.addEventListener("focusin", onFocusIn)
    document.addEventListener("focusout", onFocusOut)
    document.addEventListener("keydown", onKeyDown)
    window.addEventListener("scroll", hide, { passive: true })

    return () => {
      document.removeEventListener("click", onClick, true)
      document.removeEventListener("pointerover", onPointerOver)
      document.removeEventListener("pointerout", onPointerOut)
      document.removeEventListener("focusin", onFocusIn)
      document.removeEventListener("focusout", onFocusOut)
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("scroll", hide)
    }
  }, [])

  if (!active) return null

  const { triggerRect } = active
  const width = Math.min(TOOLTIP_MAX_WIDTH, window.innerWidth - 16)
  const left = Math.min(
    Math.max(8, triggerRect.left + triggerRect.width / 2 - width / 2),
    window.innerWidth - width - 8
  )
  const placeBelow = triggerRect.top < 160
  const positionStyle: React.CSSProperties = placeBelow
    ? { top: triggerRect.bottom + GAP, left, width }
    : { bottom: window.innerHeight - triggerRect.top + GAP, left, width }

  return createPortal(
    <div
      role="tooltip"
      style={{ position: "fixed", ...positionStyle }}
      className="z-popover w-fit rounded-md bg-background p-4 text-sm text-body popover-outline"
      dangerouslySetInnerHTML={{ __html: active.html }}
    />,
    document.body
  )
}

export default TooltipLayer
