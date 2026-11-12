"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Check, CornerDownLeft, Landmark, Wifi, WifiOff } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { chunkyTile, courseText } from "../theme"

import DraggableTile from "./draggable-tile"
import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const BUCKETS = [
  { id: "custodial", Icon: Landmark },
  { id: "hot", Icon: Wifi },
  { id: "cold", Icon: WifiOff },
] as const

type BucketId = (typeof BUCKETS)[number]["id"]

/* Fixed, mixed order so server and client render the same pool */
const ITEMS = [
  { id: "drawer", bucket: "cold" },
  { id: "exchange", bucket: "custodial" },
  { id: "phone", bucket: "hot" },
  { id: "cable", bucket: "cold" },
  { id: "friend", bucket: "custodial" },
  { id: "browser", bucket: "hot" },
] as const satisfies readonly { id: string; bucket: BucketId }[]

type ItemId = (typeof ITEMS)[number]["id"]

const POOL = "pool"
type Placement = Partial<Record<ItemId, BucketId>>

/**
 * Drag a situation onto a group, or tap it and then tap the group. Every
 * control is a native button, so drag is never required.
 */
const CustodySortWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const baseId = useId()
  const hintId = `${baseId}-hint`
  const poolRef = useRef<HTMLUListElement>(null)
  const [placement, setPlacement] = useState<Placement>({})
  const [selected, setSelected] = useState<ItemId | null>(null)
  const [announcement, setAnnouncement] = useState("")
  const [hover, setHover] = useState<string | null>(null)
  // Placing or returning a card unmounts the focused button; move focus to
  // the returned card or the next one in the pool so it isn't lost
  const refocus = useRef<ItemId | "first" | null>(null)

  const itemLabel = (id: ItemId) => t(`page-courses-widget-custody-item-${id}`)
  const bucketLabel = (id: BucketId) =>
    t(`page-courses-widget-custody-bucket-${id}`)
  const pool = ITEMS.filter(({ id }) => !placement[id])

  useEffect(() => {
    const target = refocus.current
    if (!target) return
    refocus.current = null
    poolRef.current
      ?.querySelector<HTMLButtonElement>(
        target === "first" ? "button" : `[data-item="${target}"]`
      )
      ?.focus()
  }, [placement])

  const commit = (next: Placement) => {
    setPlacement(next)
    const placed = ITEMS.filter(({ id }) => next[id])
    if (placed.length < ITEMS.length) return onAnswer(null)
    const wrong = ITEMS.filter(({ id, bucket }) => next[id] !== bucket).length
    onAnswer({
      correct: wrong === 0,
      hint: t("page-courses-widget-custody-hint", { count: wrong }),
    })
  }

  const select = (id: ItemId) => {
    const next = selected === id ? null : id
    setSelected(next)
    setAnnouncement(
      next
        ? t("page-courses-widget-custody-selected", { item: itemLabel(next) })
        : ""
    )
  }

  const place = (id: ItemId, bucket: BucketId) => {
    refocus.current = "first"
    commit({ ...placement, [id]: bucket })
    setAnnouncement(
      t("page-courses-widget-custody-placed", {
        item: itemLabel(id),
        group: bucketLabel(bucket),
      })
    )
    setSelected(null)
  }

  const unplace = (id: ItemId) => {
    const next = { ...placement }
    delete next[id]
    refocus.current = id
    commit(next)
    setAnnouncement(
      t("page-courses-widget-custody-returned", { item: itemLabel(id) })
    )
  }

  // Dropping on the pool returns a card; on a group, places or moves it
  const drop = (id: ItemId, target: string) => {
    if (target === POOL) return placement[id] && unplace(id)
    if (placement[id] !== target) place(id, target as BucketId)
  }

  const tileClasses = cn(
    chunkyTile,
    "flex min-h-12 w-full items-center gap-2 px-3 py-2 text-start text-md font-semibold text-body focus-visible:outline-4 focus-visible:outline-(--course-soft)",
    "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
  )

  return (
    <WidgetShell>
      <p id={hintId} className="m-0 text-body-medium">
        {t("page-courses-widget-custody-instructions")}
      </p>

      <div
        data-drop-target={POOL}
        className={cn(
          "flex flex-col gap-2 rounded-2xl transition-[box-shadow]",
          hover === POOL && "ring-4 ring-(--course-soft)"
        )}
      >
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-custody-pool")}
        </p>
        {pool.length ? (
          <ul ref={poolRef} className="m-0 flex list-none flex-col gap-2">
            {pool.map(({ id }) => (
              <li key={id} className="m-0">
                <DraggableTile
                  disabled={locked}
                  data-item={id}
                  aria-pressed={selected === id}
                  aria-describedby={hintId}
                  onClick={() => select(id)}
                  onPlace={(target) => drop(id, target)}
                  onHover={setHover}
                  className={cn(
                    tileClasses,
                    selected === id &&
                      "border-(--course) bg-(--course-soft) hover:bg-(--course-soft)"
                  )}
                >
                  {itemLabel(id)}
                </DraggableTile>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0 rounded-2xl border-2 border-dashed border-border p-3 text-body-medium">
            {t("page-courses-widget-custody-pool-empty")}
          </p>
        )}
      </div>

      {/* Stacked rows, not columns: the long situation cards need the width */}
      <div className="flex flex-col gap-3">
        {BUCKETS.map(({ id: bucket, Icon }) => {
          const items = ITEMS.filter(({ id }) => placement[id] === bucket)
          const target = !locked && (selected || hover === bucket)
          return (
            <section
              key={bucket}
              data-drop-target={bucket}
              aria-labelledby={`${baseId}-${bucket}`}
              className={cn(
                "relative flex min-h-24 flex-col gap-2 rounded-2xl border-2 border-dashed border-border bg-background p-3 transition-[border-color,box-shadow]",
                target && "border-(--course)",
                hover === bucket && "ring-4 ring-(--course-soft)"
              )}
            >
              {/* The whole group is the tap target once a card is picked */}
              {selected && !locked && (
                <button
                  type="button"
                  aria-label={t("page-courses-widget-custody-place", {
                    group: bucketLabel(bucket),
                  })}
                  onClick={() => place(selected, bucket)}
                  className="absolute inset-0 cursor-pointer rounded-2xl hover:bg-(--course-softer) focus-visible:outline-4 focus-visible:outline-(--course-soft)"
                />
              )}
              <h3
                id={`${baseId}-${bucket}`}
                className="pointer-events-none relative m-0 flex items-start gap-2 text-md font-bold"
              >
                <Icon
                  className={cn("mt-0.5 size-5 shrink-0", courseText)}
                  aria-hidden
                />
                {bucketLabel(bucket)}
              </h3>
              <ul className="pointer-events-none relative m-0 flex list-none flex-col gap-2">
                {items.map(({ id }) => (
                  <li key={id} className="pointer-events-auto m-0">
                    <DraggableTile
                      disabled={locked}
                      aria-describedby={hintId}
                      onClick={() => unplace(id)}
                      onPlace={(target) => drop(id, target)}
                      onHover={setHover}
                      className={cn(
                        tileClasses,
                        "text-sm",
                        locked &&
                          "border-success bg-success-light dark:bg-success-dark"
                      )}
                    >
                      <span className="flex-1">{itemLabel(id)}</span>
                      {locked ? (
                        <Check
                          className="size-4 shrink-0 text-green-700 dark:text-green-400"
                          aria-hidden
                        />
                      ) : (
                        <CornerDownLeft
                          className="size-4 shrink-0 text-body-medium"
                          aria-hidden
                        />
                      )}
                    </DraggableTile>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <p role="status" className="sr-only">
        {announcement}
      </p>

      {locked && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-custody-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default CustodySortWidget
