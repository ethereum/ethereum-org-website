"use client"

import { useEffect, useId, useState } from "react"
import { Check, NotebookPen, Plus, RotateCcw, X } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const START = 3
const TOTAL = 5
// Copy 1 is the learner's; the rest are everyone else's
const OTHERS = [2, 3, 4]

type Event = "start" | "added" | "restored"

/**
 * Identical notebook copies, before blocks or nodes are named: a new line
 * reaches every copy, an edit to an old line stays in the learner's copy and
 * the others keep the real line.
 */
const SharedNotebookWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const int = numberFormat(useLocale())
  const baseId = useId()
  const lines = Array.from({ length: TOTAL }, (_, i) =>
    t(`page-courses-widget-notebook-line-${i + 1}`)
  )

  const [mine, setMine] = useState(() => lines.slice(0, START))
  const [event, setEvent] = useState<Event>("start")
  const [seen, setSeen] = useState({ added: false, changed: false })
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!done && seen.added && seen.changed) {
      setDone(true)
      onComplete()
    }
  }, [done, seen, onComplete])

  const count = mine.length
  const isChanged = (i: number) => mine[i] !== lines[i]
  const anyChanged = mine.some((_, i) => isChanged(i))

  const add = () => {
    setMine([...mine, lines[count]])
    setEvent("added")
    setSeen((s) => ({ ...s, added: true }))
  }

  const edit = (index: number, value: string) => {
    const next = mine.map((line, i) => (i === index ? value : line))
    setMine(next)
    if (next[index] !== lines[index]) setSeen((s) => ({ ...s, changed: true }))
    else setEvent("restored")
  }

  const restore = () => {
    setMine(lines.slice(0, count))
    setEvent("restored")
  }

  const lineNumber = (i: number) => (
    <span
      aria-hidden
      className="grid size-7 shrink-0 place-items-center rounded-full bg-(--course-soft) text-sm font-bold"
    >
      {int.format(i + 1)}
    </span>
  )

  return (
    <WidgetShell>
      <section className="flex flex-col gap-3 rounded-2xl border-2 border-b-[6px] border-(--course) bg-background p-4">
        <h3 className="m-0 flex items-center gap-2 text-md font-bold">
          <NotebookPen className={cn("size-5", courseText)} aria-hidden />
          {t("page-courses-widget-notebook-yours")}
        </h3>
        <ol className="m-0 flex list-none flex-col gap-2">
          {mine.map((value, i) => (
            <li key={i} className="m-0 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {lineNumber(i)}
                <Input
                  value={value}
                  aria-label={t("page-courses-widget-notebook-line", {
                    number: int.format(i + 1),
                  })}
                  // A disagreement, not an invalid entry: describe it instead
                  aria-describedby={
                    isChanged(i) ? `${baseId}-disagree-${i}` : undefined
                  }
                  hasError={isChanged(i)}
                  className="min-w-0 flex-1"
                  onChange={(e) => edit(i, e.target.value)}
                />
              </div>
              {isChanged(i) && (
                <span
                  id={`${baseId}-disagree-${i}`}
                  className="flex items-center gap-1 ps-9 text-sm font-semibold text-error dark:text-red-400"
                >
                  <X className="size-4 shrink-0" aria-hidden />
                  {t("page-courses-widget-notebook-disagree")}
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <ul className="m-0 grid list-none gap-3 sm:grid-cols-3">
        {OTHERS.map((number) => (
          <li
            key={number}
            className="m-0 flex flex-col gap-2 rounded-2xl border-2 border-(--course-soft) bg-background p-3"
          >
            <h3 className="m-0 text-sm font-bold text-body-medium">
              {t("page-courses-widget-notebook-copy", {
                number: int.format(number),
              })}
            </h3>
            <ol className="m-0 flex list-none flex-col gap-1 text-sm">
              {lines.slice(0, count).map((line, i) => (
                <li
                  key={i}
                  className={cn(
                    "m-0 flex items-start gap-1.5 rounded-lg px-1.5 py-0.5",
                    isChanged(i) &&
                      "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400"
                  )}
                >
                  {isChanged(i) && (
                    <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                  )}
                  <span>
                    {line}
                    {isChanged(i) && (
                      <span className="sr-only">
                        {" "}
                        ({t("page-courses-widget-notebook-real")})
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="ghost"
          onClick={add}
          disabled={count >= TOTAL}
          className={chunkyButton}
        >
          <Plus />
          {t("page-courses-widget-notebook-add")}
        </Button>
        {anyChanged && (
          <Button
            variant="ghost"
            onClick={restore}
            className={chunkyButtonSecondary}
          >
            <RotateCcw />
            {t("page-courses-widget-notebook-restore")}
          </Button>
        )}
      </div>

      <p
        role="status"
        className={cn(
          "m-0 min-h-6",
          anyChanged && "text-error dark:text-red-400"
        )}
      >
        {t(`page-courses-widget-notebook-${anyChanged ? "changed" : event}`)}
      </p>
    </WidgetShell>
  )
}

export default SharedNotebookWidget
