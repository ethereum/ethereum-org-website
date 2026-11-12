"use client"

import { useId, useState } from "react"
import { ShieldAlert, ShieldCheck, TriangleAlert } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * Amounts drive the bar only; the learner sees words, never numbers (the
 * course is beginner level). `null` is an unlimited approval.
 */
const BALANCE = 1_000
const SWAP = 50
const STOPS = [
  { id: "less", amount: 25 },
  { id: "exact", amount: SWAP },
  { id: "half", amount: 500 },
  { id: "all", amount: BALANCE },
  { id: "unlimited", amount: null },
] as const
const TARGET = 1
const START = 4

const ApprovalScopeWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const sliderId = useId()
  // Starts on unlimited: the default many apps ask for
  const [stop, setStop] = useState<number>(START)

  const { id: stopId, amount: approved } = STOPS[stop]
  const unlimited = approved === null
  const works = unlimited || approved >= SWAP
  const left = unlimited ? null : works ? approved - SWAP : approved

  const amountLabel = (idx: number) =>
    t(`page-courses-widget-approval-stop-${STOPS[idx].id}`)

  const handleChange = (next: number) => {
    setStop(next)
    const value = STOPS[next].amount
    onAnswer({
      correct: next === TARGET,
      hint:
        value === null
          ? t("page-courses-widget-approval-hint-unlimited")
          : value < SWAP
            ? t("page-courses-widget-approval-hint-low")
            : t("page-courses-widget-approval-hint-high"),
    })
  }

  // Share of the balance the swap uses, and what stays approved after it
  const usedPct = works ? (SWAP / BALANCE) * 100 : 0
  const leftPct = unlimited
    ? 100 - usedPct
    : works
      ? ((approved - SWAP) / BALANCE) * 100
      : 0

  const state = !works
    ? "fails"
    : unlimited
      ? "unlimited"
      : left === 0
        ? "clean"
        : "exposed"
  const NOTES = {
    fails: "fails-note",
    unlimited: "unlimited-note",
    clean: "clean",
    exposed: "exposed",
  } as const

  return (
    <WidgetShell>
      <div className="flex flex-col gap-4 rounded-2xl border-2 border-(--course-soft) bg-background p-4">
        <p className="m-0 text-sm font-bold tracking-wide text-body-medium uppercase">
          {t("page-courses-widget-approval-request")}
        </p>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="text-body-medium">
            {t("page-courses-widget-approval-spender")}
          </dt>
          <dd className="m-0 font-bold">
            {t("page-courses-widget-approval-spender-value")}
          </dd>
          <dt className="text-body-medium">
            {t("page-courses-widget-approval-swap")}
          </dt>
          <dd className="m-0 font-bold">
            {t("page-courses-widget-approval-swap-value")}
          </dd>
        </dl>

        <div className="flex flex-col gap-2">
          <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
            <span>{t("page-courses-widget-approval-label")}</span>
            <span className={cn("text-xl", courseText)}>
              {amountLabel(stop)}
            </span>
          </label>
          <input
            id={sliderId}
            type="range"
            min={0}
            max={STOPS.length - 1}
            step={1}
            value={stop}
            disabled={locked}
            aria-valuetext={amountLabel(stop)}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="w-full accent-(--course)"
          />
          {/* One tick per stop; the native thumb centres on each */}
          <div aria-hidden className="flex justify-between px-2">
            {STOPS.map(({ id }, idx) => (
              <span
                key={id}
                className={cn(
                  "flex w-0 flex-col items-center",
                  idx === stop ? "text-body" : "text-body-medium"
                )}
              >
                <span className="h-2 w-0.5 bg-current" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="m-0 text-sm font-bold text-body-medium">
          {t("page-courses-widget-approval-bar")}
        </p>
        {/* Bar is your whole balance; segments are logical so it mirrors in RTL */}
        <div
          aria-hidden
          className="flex h-5 overflow-hidden rounded-full bg-background"
        >
          <div
            className="h-full bg-(--course) transition-[width] duration-300"
            style={{ width: `${usedPct}%` }}
          />
          <div
            className="h-full bg-red-600 transition-[width] duration-300"
            style={{ width: `${leftPct}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold">
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-(--course)" />
            {t("page-courses-widget-approval-legend-used")}
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-sm bg-red-600" />
            {t("page-courses-widget-approval-legend-left")}
          </span>
        </div>
      </div>

      <dl
        aria-live="polite"
        className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1"
      >
        <dt className="text-body-medium">
          {t("page-courses-widget-approval-result")}
        </dt>
        <dd
          className={cn(
            "m-0 font-bold",
            works
              ? "text-green-700 dark:text-green-400"
              : "text-error dark:text-red-400"
          )}
        >
          {works
            ? t("page-courses-widget-approval-works")
            : t("page-courses-widget-approval-fails")}
        </dd>
        <dt className="text-body-medium">
          {t("page-courses-widget-approval-left")}
        </dt>
        <dd
          className={cn(
            "m-0 font-bold",
            works && left !== 0 && "text-error dark:text-red-400"
          )}
        >
          {t(`page-courses-widget-approval-left-${stopId}`)}
        </dd>
      </dl>

      <p
        className={cn(
          "m-0 flex items-start gap-2 rounded-2xl p-3",
          locked
            ? "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400"
            : "bg-background text-body"
        )}
      >
        {locked ? (
          <ShieldCheck className="size-5 shrink-0" aria-hidden />
        ) : state === "fails" ? (
          <TriangleAlert
            className="size-5 shrink-0 text-error dark:text-red-400"
            aria-hidden
          />
        ) : state === "clean" ? (
          <ShieldCheck
            className={cn("size-5 shrink-0", courseText)}
            aria-hidden
          />
        ) : (
          <ShieldAlert
            className="size-5 shrink-0 text-error dark:text-red-400"
            aria-hidden
          />
        )}
        {locked
          ? t("page-courses-widget-approval-hit")
          : t(`page-courses-widget-approval-${NOTES[state]}`)}
      </p>
    </WidgetShell>
  )
}

export default ApprovalScopeWidget
