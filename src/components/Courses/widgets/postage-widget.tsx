"use client"

import { useState } from "react"
import { Container, Mail, Minus, Package, Plus, Stamp } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const SIZES = {
  letter: { rank: 0, Icon: Mail, iconSize: "size-6" },
  box: { rank: 1, Icon: Package, iconSize: "size-8" },
  crate: { rank: 2, Icon: Container, iconSize: "size-10" },
} as const

type Size = keyof typeof SIZES

// Two letters with very different checks inside, so value is the trap
const PARCELS: readonly { id: string; size: Size }[] = [
  { id: "letter-small", size: "letter" },
  { id: "box-huge", size: "box" },
  { id: "letter-huge", size: "letter" },
  { id: "crate-small", size: "crate" },
]

const MAX_STAMPS = 4

type Stamps = Record<string, number>

/** Which rule the stamps break, if any: same job, same stamps; bigger job, more */
const broken = (stamps: Stamps): "value" | "size" | null => {
  for (const a of PARCELS)
    for (const b of PARCELS) {
      const rankA = SIZES[a.size].rank
      const rankB = SIZES[b.size].rank
      if (rankA === rankB && stamps[a.id] !== stamps[b.id]) return "value"
      if (rankA < rankB && stamps[a.id] >= stamps[b.id]) return "size"
    }
  return null
}

/**
 * Stamp each parcel. Graded on the relationship, not exact counts: parcels
 * of one size match, and each bigger size carries more stamps.
 */
const PostageWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const [stamps, setStamps] = useState<Stamps>(() =>
    Object.fromEntries(PARCELS.map(({ id }) => [id, 0]))
  )
  const [announcement, setAnnouncement] = useState("")
  const nameOf = (id: string) => t(`page-courses-widget-postage-item-${id}`)

  const change = (id: string, by: number) => {
    const next = {
      ...stamps,
      [id]: Math.min(MAX_STAMPS, Math.max(0, stamps[id] + by)),
    }
    setStamps(next)
    setAnnouncement(
      t("page-courses-widget-postage-status", {
        parcel: nameOf(id),
        count: next[id],
      })
    )
    if (PARCELS.some(({ id }) => next[id] === 0)) return onAnswer(null)
    const rule = broken(next)
    onAnswer({
      correct: !rule,
      hint: rule ? t(`page-courses-widget-postage-hint-${rule}`) : undefined,
    })
  }

  return (
    <WidgetShell>
      <ul className="m-0 flex list-none flex-col gap-3">
        {PARCELS.map(({ id, size }) => {
          const { Icon, iconSize } = SIZES[size]
          const name = nameOf(id)
          const count = stamps[id]
          return (
            <li
              key={id}
              className={cn(
                "m-0 flex flex-wrap items-center gap-3 rounded-2xl border-2 border-border bg-background p-3",
                locked && "border-success bg-success-light dark:bg-success-dark"
              )}
            >
              <span className="flex size-12 shrink-0 items-center justify-center">
                <Icon className={cn(iconSize, courseText)} aria-hidden />
              </span>
              <div className="flex min-w-40 flex-1 flex-col gap-1">
                <span className="font-semibold">{name}</span>
                <span className="flex min-h-7 items-center gap-1">
                  {Array.from({ length: count }, (_, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className="flex size-7 items-center justify-center rounded-sm border-2 border-dashed border-(--course) bg-(--course-soft)"
                    >
                      <Stamp className={cn("size-4", courseText)} />
                    </span>
                  ))}
                  <span
                    className={cn(
                      "text-sm text-body-medium",
                      count > 0 && "sr-only"
                    )}
                  >
                    {t("page-courses-widget-postage-stamps", { count })}
                  </span>
                </span>
              </div>
              <div className="ms-auto flex gap-2">
                <Button
                  variant="ghost"
                  disabled={locked || count === 0}
                  aria-label={t("page-courses-widget-postage-remove", {
                    parcel: name,
                  })}
                  onClick={() => change(id, -1)}
                  className={cn(chunkyButtonSecondary, "px-3")}
                >
                  <Minus />
                </Button>
                <Button
                  variant="ghost"
                  disabled={locked || count === MAX_STAMPS}
                  aria-label={t("page-courses-widget-postage-add", {
                    parcel: name,
                  })}
                  onClick={() => change(id, 1)}
                  className={cn(chunkyButtonSecondary, "px-3")}
                >
                  <Plus />
                </Button>
              </div>
            </li>
          )
        })}
      </ul>

      <p role="status" className="sr-only">
        {announcement}
      </p>

      {locked && (
        <p className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-postage-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default PostageWidget
