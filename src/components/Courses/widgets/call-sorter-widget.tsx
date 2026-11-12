"use client"

import { useState } from "react"
import { Eye, PenLine } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

type Kind = "read" | "write"

// Mixed so neighbours don't share an answer
const ACTIONS: { id: string; kind: Kind }[] = [
  { id: "balance", kind: "read" },
  { id: "send", kind: "write" },
  { id: "price", kind: "read" },
  { id: "buy", kind: "write" },
  { id: "trade", kind: "write" },
  { id: "stock", kind: "read" },
]

const KINDS = [
  { kind: "read", icon: Eye },
  { kind: "write", icon: PenLine },
] as const

const CallSorterWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const int = numberFormat(useLocale())
  const [sorted, setSorted] = useState<Record<string, Kind>>({})

  const place = (id: string, kind: Kind) => {
    const next = { ...sorted, [id]: kind }
    setSorted(next)
    if (Object.keys(next).length < ACTIONS.length) return onAnswer(null)
    const wrong = ACTIONS.filter((a) => next[a.id] !== a.kind).length
    onAnswer({
      correct: wrong === 0,
      hint: t("page-courses-widget-calls-wrong", { count: wrong }),
    })
  }

  return (
    <WidgetShell>
      <dl className="m-0 grid gap-3 sm:grid-cols-2">
        {KINDS.map(({ kind, icon: Icon }) => (
          <div
            key={kind}
            className="flex items-start gap-3 rounded-2xl bg-background p-3"
          >
            <Icon
              className={cn("mt-0.5 size-5 shrink-0", courseText)}
              aria-hidden
            />
            <div>
              <dt className="font-bold">
                {t(`page-courses-widget-calls-${kind}`)}
              </dt>
              <dd className="m-0 text-sm text-body-medium">
                {t(`page-courses-widget-calls-${kind}-note`)}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <ul className="m-0 flex list-none flex-col gap-3">
        {ACTIONS.map(({ id }) => {
          const label = t(`page-courses-widget-calls-action-${id}`)
          return (
            <li
              key={id}
              className="m-0 flex flex-col gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-semibold">{label}</span>
              <div
                role="group"
                aria-label={label}
                className="flex shrink-0 gap-2"
              >
                {KINDS.map(({ kind, icon: Icon }) => {
                  const active = sorted[id] === kind
                  return (
                    <Button
                      key={kind}
                      variant="ghost"
                      aria-pressed={active}
                      disabled={locked}
                      onClick={() => place(id, kind)}
                      className={cn(
                        chunkyTile,
                        "min-h-11 flex-1 gap-2 px-4 text-sm font-bold whitespace-nowrap text-body disabled:active:translate-y-0 disabled:active:border-b-4 sm:flex-none hover-link:!text-body [&>svg]:size-4",
                        active &&
                          "border-(--course) bg-(--course) text-white hover:bg-(--course) disabled:text-white hover-link:!text-white"
                      )}
                    >
                      <Icon aria-hidden />
                      {t(`page-courses-widget-calls-${kind}`)}
                    </Button>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>

      <p
        className={cn(
          "m-0",
          locked ? "text-green-700 dark:text-green-400" : "text-body-medium"
        )}
        aria-live="polite"
      >
        {locked
          ? t("page-courses-widget-calls-hit")
          : t("page-courses-widget-calls-progress", {
              done: int.format(Object.keys(sorted).length),
              total: int.format(ACTIONS.length),
            })}
      </p>
    </WidgetShell>
  )
}

export default CallSorterWidget
