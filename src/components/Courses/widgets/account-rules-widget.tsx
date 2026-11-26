"use client"

import { useState } from "react"
import {
  Ban,
  Check,
  Coffee,
  Contact,
  Gauge,
  KeyRound,
  ListChecks,
  type LucideIcon,
  Smartphone,
  Users,
  UserX,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chunkyTile, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const LIMIT_ETH = 1

const RULES = [
  { id: "limit", Icon: Gauge },
  { id: "approve", Icon: Users },
  { id: "allowlist", Icon: ListChecks },
  { id: "contacts", Icon: Contact },
] as const satisfies readonly { id: string; Icon: LucideIcon }[]

type RuleId = (typeof RULES)[number]["id"]
type Rules = Record<RuleId, boolean>

const OFF: Rules = {
  limit: false,
  approve: false,
  allowlist: false,
  contacts: false,
}

/** Each situation's outcome under the chosen rules, and whether it's fine */
const outcomes = (rules: Rules) => {
  const coffee = rules.approve
    ? "approve"
    : rules.allowlist
      ? "allowlist"
      : "ok"
  const thief = rules.approve
    ? "approve"
    : rules.allowlist
      ? "allowlist"
      : rules.limit
        ? "limit"
        : "all"
  const lost = rules.contacts ? "ok" : "gone"
  return [
    { id: "coffee", Icon: Coffee, result: coffee, fine: coffee === "ok" },
    { id: "thief", Icon: UserX, result: thief, fine: thief !== "all" },
    { id: "lost", Icon: Smartphone, result: lost, fine: lost === "ok" },
  ] as const
}

/**
 * Puzzle: pick rules that stop a thief and a lost key without blocking an
 * everyday payment. Only a daily limit plus recovery contacts does all three.
 */
const AccountRulesWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const amount = numberFormat(useLocale()).format(LIMIT_ETH)
  const [rules, setRules] = useState<Rules>(OFF)
  const situations = outcomes(rules)

  const toggle = (id: RuleId) => {
    const next = { ...rules, [id]: !rules[id] }
    setRules(next)
    const [coffee, thief, lost] = outcomes(next)
    onAnswer({
      correct: coffee.fine && thief.fine && lost.fine,
      hint: !coffee.fine
        ? t("page-courses-widget-account-rules-hint-strict")
        : !thief.fine
          ? t("page-courses-widget-account-rules-hint-thief")
          : t("page-courses-widget-account-rules-hint-lost"),
    })
  }

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2">
        <p className="m-0 flex items-center gap-2 text-sm font-bold tracking-wide text-body-medium uppercase">
          <KeyRound className={cn("size-4", courseText)} aria-hidden />
          {t("page-courses-widget-account-rules-rules")}
        </p>
        <ul className="m-0 grid list-none gap-2 sm:grid-cols-2">
          {RULES.map(({ id, Icon }) => {
            const on = rules[id]
            return (
              <li key={id} className="m-0">
                <Button
                  variant="ghost"
                  aria-pressed={on}
                  disabled={locked}
                  onClick={() => toggle(id)}
                  className={cn(
                    chunkyTile,
                    "h-full w-full items-start justify-start gap-3 p-3 text-start whitespace-normal text-body disabled:active:translate-y-0 disabled:active:border-b-4 hover-link:!text-body",
                    on && "border-(--course) bg-(--course-softer)"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-2",
                      on
                        ? "border-(--course) bg-(--course) text-white"
                        : "border-border"
                    )}
                  >
                    {on && <Check className="size-4" />}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-2 font-bold">
                      <Icon
                        className={cn("size-4 shrink-0", courseText)}
                        aria-hidden
                      />
                      {t(`page-courses-widget-account-rules-rule-${id}`)}
                    </span>
                    <span className="text-sm font-normal text-body-medium">
                      {t(`page-courses-widget-account-rules-rule-${id}-note`, {
                        amount,
                      })}
                    </span>
                  </span>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-account-rules-situations")}
        </p>
        <dl aria-live="polite" className="m-0 flex flex-col gap-2">
          {situations.map(({ id, Icon, result, fine }) => (
            <div
              key={id}
              className="flex flex-col gap-1 rounded-2xl bg-background p-3"
            >
              <dt className="flex items-start gap-2 font-semibold">
                <Icon
                  className={cn("mt-0.5 size-5 shrink-0", courseText)}
                  aria-hidden
                />
                {t(`page-courses-widget-account-rules-sit-${id}`)}
              </dt>
              <dd
                className={cn(
                  "m-0 flex items-start gap-2 ps-7 font-bold",
                  fine
                    ? "text-green-700 dark:text-green-400"
                    : "text-error dark:text-red-400"
                )}
              >
                {fine ? (
                  <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                ) : (
                  <Ban className="mt-0.5 size-4 shrink-0" aria-hidden />
                )}
                {t(`page-courses-widget-account-rules-${id}-${result}`, {
                  amount,
                })}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {locked && (
        <p role="status" className="m-0 text-green-700 dark:text-green-400">
          {t("page-courses-widget-account-rules-hit")}
        </p>
      )}
    </WidgetShell>
  )
}

export default AccountRulesWidget
