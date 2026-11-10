"use client"

import { type ComponentProps, useRef } from "react"
import { GripVertical } from "lucide-react"
import { motion, type PanInfo, useDragControls } from "motion/react"

import { cn } from "@/lib/utils/cn"

/**
 * The `data-drop-target` value under a page point. Skips the dragged tile:
 * it sits under the pointer and would otherwise match first.
 */
const dropTargetAt = (
  { x, y }: PanInfo["point"],
  dragged: HTMLElement | null
) => {
  for (const el of document.elementsFromPoint(
    x - window.scrollX,
    y - window.scrollY
  )) {
    if (dragged?.contains(el)) continue
    const target = (el as HTMLElement).closest<HTMLElement>(
      "[data-drop-target]"
    )
    if (target) return target.dataset.dropTarget ?? null
  }
  return null
}

interface DraggableTileProps extends ComponentProps<"button"> {
  /** Called with the `data-drop-target` the tile was released over */
  onPlace: (target: string) => void
  /** The target under the pointer while dragging, for highlighting */
  onHover: (target: string | null) => void
}

/**
 * A button that can also be dragged onto any `[data-drop-target]` element.
 * A mouse drags from anywhere; touch drags from the grip, so a swipe on the
 * card still scrolls the page. Tapping always works, so drag is optional.
 */
const DraggableTile = ({
  onPlace,
  onHover,
  onClick,
  disabled,
  className,
  children,
  ...props
}: DraggableTileProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useDragControls()
  // A drag ends with a click event; swallow it so a drop isn't also a tap
  const dragged = useRef(false)

  return (
    <motion.div
      ref={ref}
      drag={!disabled}
      dragControls={controls}
      dragListener={false}
      dragSnapToOrigin
      dragElastic={1}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 50 }}
      onDragStart={() => (dragged.current = true)}
      onDrag={(_, info) => onHover(dropTargetAt(info.point, ref.current))}
      onDragEnd={(_, info) => {
        onHover(null)
        const target = dropTargetAt(info.point, ref.current)
        if (target) onPlace(target)
        setTimeout(() => (dragged.current = false), 0)
      }}
      className={cn(
        "relative",
        !disabled && "cursor-grab active:cursor-grabbing"
      )}
    >
      <button
        type="button"
        disabled={disabled}
        onPointerDown={(event) => {
          if (!disabled && event.pointerType === "mouse") controls.start(event)
        }}
        onClick={(event) => {
          if (!dragged.current) onClick?.(event)
        }}
        className={className}
        {...props}
      >
        {!disabled && (
          <span
            aria-hidden
            className="-my-2 -ms-2 flex shrink-0 touch-none items-center self-stretch px-1"
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") controls.start(event)
            }}
          >
            <GripVertical className="size-4 text-body-medium" />
          </span>
        )}
        {children}
      </button>
    </motion.div>
  )
}

export default DraggableTile
