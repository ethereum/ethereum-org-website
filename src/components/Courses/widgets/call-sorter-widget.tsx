"use client"

import { useState } from "react"
import { Equal, Eye, type LucideIcon, PenLine, RefreshCw } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Two-group sorter. `calls` sorts contract calls into reads and writes;
 * `failed` sorts what a failed payment changed, before contracts are named.
 * Each set's strings live under `page-courses-widget-{set}-`.
 */
const SETS = {
  calls: {
    kinds: [
      { kind: "read", icon: Eye },
      { kind: "write", icon: PenLine },
    ],
    // Mixed so neighbours don't share an answer
    actions: [
      { id: "balance", kind: "read" },
      { id: "send", kind: "write" },
      { id: "price", kind: "read" },
      { id: "buy", kind: "write" },
      { id: "trade", kind: "write" },
      { id: "stock", kind: "read" },
    ],
  },
  failed: {
    kinds: [
      { kind: "changed", icon: RefreshCw },
      { kind: "same", icon: Equal },
    ],
    actions: [
      { id: "eth", kind: "same" },
      { id: "fee", kind: "changed" },
      { id: "spot", kind: "same" },
      { id: "record", kind: "changed" },
      { id: "list", kind: "same" },
    ],
  },
} as const satisfies Record<
  string,
  {
    kinds: readonly { kind: string; icon: LucideIcon }[]
    actions: readonly { id: string; kind: string }[]
  }
>

type SetId = keyof typeof SETS

interface CallSorterWidgetProps extends WidgetProps {
  set?: SetId
}

const CallSorterWidget = ({
  onAnswer,
  locked,
  set = "calls",
}: CallSorterWidgetProps) => {
  const t = useTranslations("page-courses")
  const int = numberFormat(useLocale())
  const [sorted, setSorted] = useState<Record<string, string>>({})
  const { kinds, actions } = SETS[set]
  const key = (name: string) => `page-courses-widget-${set}-${name}`

  const place = (id: string, kind: string) => {
    const next = { ...sorted, [id]: kind }
    setSorted(next)
    if (Object.keys(next).length < actions.length) return onAnswer(null)
    const wrong = actions.filter((a) => next[a.id] !== a.kind).length
    onAnswer({
      correct: wrong === 0,
      hint: t(key("wrong"), { count: wrong }),
    })
  }

  return (
    <WidgetShell>
      <dl className="m-0 grid gap-3 sm:grid-cols-2">
        {kinds.map(({ kind, icon: Icon }) => (
          <div
            key={kind}
            className="flex items-start gap-3 rounded-2xl bg-background p-3"
          >
            <Icon
              className={cn("mt-0.5 size-5 shrink-0", courseText)}
              aria-hidden
            />
            <div>
              <dt className="font-bold">{t(key(kind))}</dt>
              <dd className="m-0 text-sm text-body-medium">
                {t(key(`${kind}-note`))}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <ul className="m-0 flex list-none flex-col gap-3">
        {actions.map(({ id }) => {
          const label = t(key(`action-${id}`))
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
                {kinds.map(({ kind, icon: Icon }) => {
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
                      {t(key(kind))}
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
          ? t(key("hit"))
          : t("page-courses-widget-calls-progress", {
              done: int.format(Object.keys(sorted).length),
              total: int.format(actions.length),
            })}
      </p>
    </WidgetShell>
  )
}

/** What a failed payment changed, for the Sending course */
export const FailedSorterWidget = (props: WidgetProps) => (
  <CallSorterWidget {...props} set="failed" />
)

export default CallSorterWidget
