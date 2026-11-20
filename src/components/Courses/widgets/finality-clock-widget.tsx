"use client"

import { useId, useState } from "react"
import { Box, Flag } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

/*
 * The payment sits in the last block before checkpoint 1. Blocks every 12 s,
 * a checkpoint every 32 slots (about 6.4 min). Each checkpoint collects votes
 * for one round; once checkpoints 1 and 2 are both backed by two-thirds of
 * staked ETH, checkpoint 1 and everything before it is final: 64 slots,
 * about 13 minutes. `votes` is the share of validators that have voted on
 * each checkpoint so far (they vote once per round, spread evenly).
 */
const STOPS = [
  { id: "now", blocks: 0, votes: [0, 0] },
  { id: "block", blocks: 1, votes: [1 / 32, 0] },
  { id: "minute", blocks: 5, votes: [5 / 32, 0] },
  { id: "checkpoint", blocks: 32, votes: [1, 1 / 32] },
  { id: "two", blocks: 64, votes: [1, 1] },
  { id: "hour", blocks: 300, votes: [1, 1] },
] as const
const TARGET = 4
// Checkpoint n arrives with block 1 + 32n
const ARRIVES = [1, 33]
const TWO_THIRDS = 2 / 3

type CheckpointState = "waiting" | "voting" | "backed"

const FinalityClockWidget = ({ onAnswer, locked }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const sliderId = useId()
  const [stop, setStop] = useState(0)

  const int = numberFormat(locale)
  const { blocks, votes } = STOPS[stop]
  const timeLabel = (idx: number) =>
    t(`page-courses-widget-finality-stop-${STOPS[idx].id}`)
  const blocksLabel =
    blocks === 0
      ? t("page-courses-widget-finality-blocks-none")
      : blocks === 1
        ? t("page-courses-widget-finality-blocks-one")
        : t("page-courses-widget-finality-blocks", {
            count: int.format(blocks),
          })

  const checkpoints = ARRIVES.map((arrives, i): CheckpointState => {
    if (blocks < arrives) return "waiting"
    return votes[i] >= TWO_THIRDS ? "backed" : "voting"
  })

  const handleChange = (next: number) => {
    setStop(next)
    onAnswer({
      correct: next === TARGET,
      hint:
        next < TARGET
          ? t("page-courses-widget-finality-early")
          : t("page-courses-widget-finality-late"),
    })
  }

  const chip = (state: CheckpointState) => (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-sm font-bold whitespace-nowrap",
        state === "backed" &&
          "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400",
        state === "voting" && "bg-warning-light text-body dark:bg-warning-dark",
        state === "waiting" && "bg-background-highlight text-body"
      )}
    >
      {t(`page-courses-widget-finality-state-${state}`)}
    </span>
  )

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2">
        <label htmlFor={sliderId} className="flex flex-col gap-1 font-bold">
          <span>{t("page-courses-widget-finality-label")}</span>
          <span className={cn("text-xl", courseText)}>
            {timeLabel(stop)}{" "}
            <span className="text-md font-semibold text-body-medium">
              ({blocksLabel})
            </span>
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
          aria-valuetext={`${timeLabel(stop)} (${blocksLabel})`}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full accent-(--course)"
        />
        {/* One tick per stop; the native thumb centres on each */}
        <div aria-hidden className="flex justify-between px-2">
          {STOPS.map(({ id }, idx) => (
            <span
              key={id}
              className={cn(
                "flex w-0 flex-col items-center gap-0.5 text-sm font-bold whitespace-nowrap",
                idx === stop ? "text-body" : "text-body-medium"
              )}
            >
              <span className="h-2 w-0.5 bg-current" />
              {t(`page-courses-widget-finality-tick-${id}`)}
            </span>
          ))}
        </div>
      </div>

      {/* Your block, then the two checkpoints after it, top to bottom */}
      <ol className="m-0 flex list-none flex-col">
        <li className="m-0 flex items-center gap-3 rounded-2xl border-2 border-(--course) bg-background p-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--course) text-white">
            <Box className="size-5" aria-hidden />
          </span>
          <span className="font-bold">
            {t("page-courses-widget-finality-yours")}
          </span>
        </li>
        {checkpoints.map((state, i) => (
          <li key={i} className="m-0 flex flex-col">
            <span
              aria-hidden
              className={cn(
                "ms-7 h-5 w-1 transition-colors",
                state === "waiting"
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-(--course)"
              )}
            />
            <div className="flex items-start gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-3">
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full",
                  state === "waiting"
                    ? "bg-background-highlight text-body-medium"
                    : "bg-(--course) text-white"
                )}
              >
                <Flag className="size-5" aria-hidden />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-bold whitespace-nowrap">
                    {t("page-courses-widget-finality-checkpoint", {
                      number: int.format(i + 1),
                    })}
                  </span>
                  {chip(state)}
                </span>
                {/* Votes so far, with the two-thirds line marked */}
                <span
                  aria-hidden
                  className="relative h-3 overflow-hidden rounded-full bg-background-highlight"
                >
                  <span
                    className={cn(
                      "absolute inset-y-0 start-0 transition-[width] duration-300 motion-reduce:transition-none",
                      state === "backed" ? "bg-green-600" : "bg-(--course)"
                    )}
                    style={{ width: `${votes[i] * 100}%` }}
                  />
                  <span
                    className="absolute inset-y-0 w-0.5 bg-body"
                    style={{ insetInlineStart: `${TWO_THIRDS * 100}%` }}
                  />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="m-0 flex items-center gap-2 text-sm text-body-medium">
        <span aria-hidden className="h-3 w-0.5 bg-body" />
        {t("page-courses-widget-finality-legend")}
      </p>

      <p role="status" className="m-0 rounded-2xl bg-background p-3">
        {t(`page-courses-widget-finality-status-${STOPS[stop].id}`)}
        {locked && <> {t("page-courses-widget-finality-hit")}</>}
      </p>
    </WidgetShell>
  )
}

export default FinalityClockWidget
