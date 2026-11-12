"use client"

import { type ReactNode, useMemo, useRef, useState } from "react"
import { GripVertical } from "lucide-react"
import { motion, type PanInfo, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { OrderStep as OrderStepData } from "@/data/courses"

import { chunkyTile, stepPrompt } from "../theme"

import { seededShuffle } from "./shuffle"
import type { StepStatus } from "./types"

interface OrderStepProps {
  step: OrderStepData
  keyFor: (suffix: string) => string
  /** One entry per slot; "" marks an empty slot */
  value: string[]
  onChange: (value: string[]) => void
  status: StepStatus
}

export const isOrderComplete = (step: OrderStepData, value: string[]) =>
  value.length === step.items.length && value.every(Boolean)

export const isOrderCorrect = (step: OrderStepData, value: string[]) =>
  isOrderComplete(step, value) &&
  value.every((id, idx) => step.items[idx] === id)

type DropTarget = number | "pool" | null

/**
 * The slot index or pool under a page point. Skips the dragged tile: it sits
 * under the pointer and its own ancestor would otherwise match first.
 */
const dropTargetAt = (
  { x, y }: PanInfo["point"],
  dragged: HTMLElement | null
): DropTarget => {
  const hits = document.elementsFromPoint(
    x - window.scrollX,
    y - window.scrollY
  )
  for (const el of hits) {
    if (dragged?.contains(el)) continue
    const slot = (el as HTMLElement).closest<HTMLElement>("[data-order-slot]")
    if (slot) return Number(slot.dataset.orderSlot)
    if ((el as HTMLElement).closest("[data-order-pool]")) return "pool"
  }
  return null
}

interface TileProps {
  id: string
  label: string
  disabled: boolean
  className?: string
  onClick: () => void
  onDrop: (target: DropTarget) => void
  onHover: (target: DropTarget) => void
}

/** Click to move, or drag onto a slot (pointer + touch via motion's drag) */
const Tile = ({
  id,
  label,
  disabled,
  className,
  onClick,
  onDrop,
  onHover,
}: TileProps) => {
  const reduceMotion = useReducedMotion()
  // A drag ends with a click event; swallow it so a drop isn't also a click
  const dragged = useRef(false)
  const tileRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={tileRef}
      layoutId={reduceMotion ? undefined : `order-${id}`}
      drag={!disabled}
      dragSnapToOrigin
      dragElastic={1}
      dragMomentum={false}
      whileDrag={{ scale: 1.04, zIndex: 50 }}
      onDragStart={() => (dragged.current = true)}
      onDrag={(_, info) => onHover(dropTargetAt(info.point, tileRef.current))}
      onDragEnd={(_, info) => {
        onHover(null)
        onDrop(dropTargetAt(info.point, tileRef.current))
        // The trailing click (if any) fires before this timeout
        setTimeout(() => (dragged.current = false), 0)
      }}
      className={cn(
        "relative touch-none",
        !disabled && "cursor-grab active:cursor-grabbing"
      )}
    >
      <Button
        variant="ghost"
        disabled={disabled}
        onClick={() => {
          if (!dragged.current) onClick()
        }}
        className={cn(
          chunkyTile,
          "min-h-12 w-full justify-start gap-2 px-3 text-start font-semibold text-body disabled:text-body hover-link:!text-body",
          className
        )}
      >
        {!disabled && (
          <GripVertical className="!size-4 text-body-medium" aria-hidden />
        )}
        {label}
      </Button>
    </motion.div>
  )
}

const OrderStep = ({
  step,
  keyFor,
  value,
  onChange,
  status,
}: OrderStepProps) => {
  const t = useTranslations("page-courses")
  const pool = useMemo(
    () => seededShuffle(step.items, step.id),
    [step.items, step.id]
  )
  const [hover, setHover] = useState<DropTarget>(null)

  const locked = status === "correct"
  const slots = step.items.map((_, idx) => value[idx] ?? "")
  const remaining = pool.filter((id) => !slots.includes(id))

  const commit = (next: string[]) => onChange(next)

  const place = (id: string, target: DropTarget) => {
    if (target === null) return
    const next = slots.map((s) => (s === id ? "" : s))
    if (target === "pool") return commit(next)
    // Dropping onto a filled slot swaps when moving between slots, and
    // bumps the occupant back to the pool when coming from the pool
    const from = slots.indexOf(id)
    const occupant = slots[target]
    next[target] = id
    if (occupant && occupant !== id && from >= 0) next[from] = occupant
    commit(next)
  }

  const placeFirstEmpty = (id: string) => {
    const idx = slots.indexOf("")
    if (idx >= 0) place(id, idx)
  }

  const label = (id: string) => t(keyFor(`item-${id}`))

  const slotFrame = (idx: number, children: ReactNode) => (
    <li key={idx} className="m-0 flex items-center gap-3">
      <Center
        aria-hidden
        className={cn(
          "size-9 shrink-0 rounded-full text-sm font-bold transition-colors",
          slots[idx] ? "bg-(--course) text-white" : "bg-background-highlight"
        )}
      >
        {idx + 1}
      </Center>
      <div
        data-order-slot={idx}
        className={cn(
          "min-h-12 flex-1 rounded-2xl transition-[box-shadow]",
          hover === idx && "ring-4 ring-(--course-soft)"
        )}
      >
        {children}
      </div>
    </li>
  )

  return (
    <div>
      <h2 className={cn(stepPrompt, "mb-2")}>{t(keyFor("prompt"))}</h2>
      <p className="mb-6 text-body-medium">{t("page-courses-order-hint")}</p>

      <ol className="m-0 mb-6 flex list-none flex-col gap-2">
        {slots.map((id, idx) => {
          const misplaced =
            status === "incorrect" && id && step.items[idx] !== id
          return slotFrame(
            idx,
            id ? (
              <Tile
                id={id}
                label={label(id)}
                disabled={locked}
                onClick={() => place(id, "pool")}
                onDrop={(target) => place(id, target)}
                onHover={setHover}
                className={cn(
                  misplaced &&
                    "border-error bg-error-light motion-safe:animate-[course-shake_0.35s_ease-in-out] dark:bg-error-dark",
                  locked &&
                    "border-success bg-success-light dark:bg-success-dark"
                )}
              />
            ) : (
              <div className="min-h-12 w-full rounded-2xl border-2 border-dashed border-border bg-background-highlight/50" />
            )
          )
        })}
      </ol>

      <div
        data-order-pool
        className={cn(
          "flex min-h-16 flex-wrap gap-2 rounded-2xl p-2 transition-[box-shadow]",
          hover === "pool" && "ring-4 ring-(--course-soft)"
        )}
      >
        {remaining.map((id) => (
          <Tile
            key={id}
            id={id}
            label={label(id)}
            disabled={locked}
            onClick={() => placeFirstEmpty(id)}
            onDrop={(target) => place(id, target)}
            onHover={setHover}
            className="border-(--course-soft)"
          />
        ))}
      </div>

      {slots.some(Boolean) && !locked && (
        <Button variant="link" className="mt-4" onClick={() => commit([])}>
          {t("page-courses-order-reset")}
        </Button>
      )}
    </div>
  )
}

export default OrderStep
