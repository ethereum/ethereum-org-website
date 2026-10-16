"use client"

import { useState } from "react"
import { useLocale } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { useLessonTranslations } from "../../use-lesson-translations"

import { SPOT_ROWS } from "./data"

/**
 * Practice reading a network log: flag the requests that leak something,
 * then check. Local state only; nothing is stored or sent.
 */
const SpotTheLeaks = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const [flagged, setFlagged] = useState<Set<number>>(new Set())
  const [checked, setChecked] = useState(false)

  const total = SPOT_ROWS.filter((row) => row.leak).length
  const found = SPOT_ROWS.filter((row, i) => row.leak && flagged.has(i)).length
  const falseAlarms = SPOT_ROWS.filter(
    (row, i) => !row.leak && flagged.has(i)
  ).length
  const formatNumber = numberFormat(locale)

  const toggle = (index: number) =>
    setFlagged((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })

  return (
    <figure
      id="today-spot"
      className="m-0 space-y-4 rounded-base border p-4 md:p-6"
    >
      <figcaption className="space-y-1">
        <span className="block font-bold">{t("today-spot-title")}</span>
        <span className="block text-sm text-body-medium">
          {t("today-spot-subtitle")}
        </span>
      </figcaption>
      <p className="m-0">{t("today-spot-instructions")}</p>

      <ol className="m-0 list-none space-y-2">
        {SPOT_ROWS.map((row, index) => {
          const isFlagged = flagged.has(index)
          const right = checked && isFlagged === row.leak
          return (
            <li
              key={row.target}
              className={cn(
                "space-y-2 rounded-lg border p-3",
                isFlagged && "border-leak bg-leak-low-contrast/40",
                checked && (right ? "border-success" : "border-error")
              )}
            >
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={isFlagged}
                    disabled={checked}
                    onChange={() => toggle(index)}
                    className="size-4 accent-primary"
                  />
                  {t("today-spot-flag")}
                </label>
                <code
                  dir="ltr"
                  className="min-w-0 flex-1 font-mono text-sm break-all"
                >
                  <span className="text-body-medium">{row.method}</span>{" "}
                  {row.target}
                </code>
              </div>
              {checked && (
                <div className="flex flex-wrap items-start gap-2 text-sm">
                  <Tag
                    size="small"
                    variant="subtle"
                    status={row.leak ? "error" : "success"}
                  >
                    {t(
                      row.leak
                        ? "today-spot-verdict-leak"
                        : "today-spot-verdict-fine"
                    )}
                  </Tag>
                  <span className="min-w-0 flex-1">
                    {t(`today-spot-row-${index + 1}-why`)}
                  </span>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-3">
        {checked ? (
          <Button
            variant="outline"
            onClick={() => {
              setFlagged(new Set())
              setChecked(false)
            }}
          >
            {t("today-spot-reset")}
          </Button>
        ) : (
          <Button onClick={() => setChecked(true)}>
            {t("today-spot-check")}
          </Button>
        )}
        <p aria-live="polite" className="m-0 font-semibold">
          {checked && (
            <>
              {t("today-spot-result", {
                found: formatNumber.format(found),
                total: formatNumber.format(total),
              })}
              {falseAlarms > 0 && (
                <> {t("today-spot-false-alarms", { count: falseAlarms })}</>
              )}
            </>
          )}
        </p>
      </div>
      <p className="m-0 text-sm text-body-medium">{t("today-spot-caption")}</p>
    </figure>
  )
}

export default SpotTheLeaks
