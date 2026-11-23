"use client"

import { type ReactNode, useMemo, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { OrderStep as OrderStepData } from "@/data/courses"

import { stepPrompt } from "../theme"
import DraggableTile, { draggableTileClasses } from "../widgets/draggable-tile"
import { StepHint } from "../widgets/widget-shell"

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

const POOL = "pool"

/** A slot index or the pool, from a tile's `data-drop-target` value */
const toTarget = (value: string | null): DropTarget =>
  value === null ? null : value === POOL ? POOL : Number(value)

const OrderStep = ({
  step,
  keyFor,
  value,
  onChange,
  status,
}: OrderStepProps) => {
  const t = useTranslations("page-courses")
  const reduceMotion = useReducedMotion()
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
    const from = slots.indexOf(id)
    if (from === target) return
    const next = slots.map((s) => (s === id ? "" : s))
    if (target === "pool") return commit(next)
    if (next[target]) {
      // Slide the occupants toward the nearest gap to make room: toward the
      // slot the tile left, or (from the pool) down first, then up
      const below = next.indexOf("", target)
      const above = next.lastIndexOf("", target)
      const gap = from >= 0 ? from : below >= 0 ? below : above
      if (gap > target) next.copyWithin(target + 1, target, gap)
      else next.copyWithin(gap, gap + 1, target + 1)
    }
    next[target] = id
    commit(next)
  }

  const placeFirstEmpty = (id: string) => {
    const idx = slots.indexOf("")
    if (idx >= 0) place(id, idx)
  }

  const label = (id: string) => t(keyFor(`item-${id}`))

  // Select to move, or drag onto a slot or back to the pool. Touch drags
  // start from the grip, so a swipe across a tile still scrolls the page
  const tile = (id: string, onClick: () => void, className?: string) => (
    <DraggableTile
      // Keyed so a slot taking a new tile remounts instead of handing this
      // instance (and its layoutId) to another item
      key={id}
      layoutId={reduceMotion ? undefined : `order-${id}`}
      disabled={locked}
      onClick={onClick}
      onPlace={(target) => place(id, toTarget(target))}
      onHover={(target) => setHover(toTarget(target))}
      className={cn(draggableTileClasses, className)}
    >
      {label(id)}
    </DraggableTile>
  )

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
        data-drop-target={idx}
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
      <h2 className={cn(stepPrompt, "mb-4")}>{t(keyFor("prompt"))}</h2>
      <StepHint className="mb-6">{t("page-courses-order-hint")}</StepHint>

      <ol className="m-0 mb-6 flex list-none flex-col gap-2">
        {slots.map((id, idx) => {
          const misplaced =
            status === "incorrect" && id && step.items[idx] !== id
          return slotFrame(
            idx,
            id ? (
              tile(
                id,
                () => place(id, POOL),
                cn(
                  misplaced &&
                    "border-error bg-error-light motion-safe:animate-[course-shake_0.35s_ease-in-out] dark:bg-error-dark",
                  locked &&
                    "border-success bg-success-light dark:bg-success-dark"
                )
              )
            ) : (
              <div className="min-h-12 w-full rounded-2xl border-2 border-dashed border-border bg-background-highlight/50" />
            )
          )
        })}
      </ol>

      <div
        data-drop-target={POOL}
        className={cn(
          "flex min-h-16 flex-wrap gap-2 rounded-2xl p-2 transition-[box-shadow]",
          hover === POOL && "ring-4 ring-(--course-soft)"
        )}
      >
        {remaining.map((id) =>
          tile(id, () => placeFirstEmpty(id), "border-(--course-soft)")
        )}
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
