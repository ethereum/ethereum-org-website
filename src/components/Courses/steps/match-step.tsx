"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { MatchStep as MatchStepData } from "@/data/courses"

import { chunkyTile, type PickResult } from "../theme"

import { seededShuffle } from "./shuffle"
import type { StepStatus } from "./types"

interface MatchStepProps {
  step: MatchStepData
  keyFor: (suffix: string) => string
  /** Match id paired with each term, in `pairs` order; "" while unpaired */
  value: string[]
  onChange: (value: string[]) => void
  status: StepStatus
}

export const isMatchComplete = (step: MatchStepData, value: string[]) =>
  step.pairs.every((_, i) => !!value[i])

export const isMatchCorrect = (step: MatchStepData, value: string[]) =>
  step.pairs.every((id, i) => value[i] === id)

type Side = "term" | "match"

const tileClasses = cn(
  chunkyTile,
  "flex h-full min-h-14 w-full items-center gap-3 p-3 text-start font-semibold focus-visible:outline-4 focus-visible:outline-(--course-soft)",
  "data-selected:border-(--course) data-selected:bg-(--course-softer) data-selected:ring-4 data-selected:ring-(--course-soft)",
  "data-[result=correct]:border-green-700 data-[result=correct]:bg-success-light dark:data-[result=correct]:border-green-400 dark:data-[result=correct]:bg-success-dark",
  "data-[result=incorrect]:border-error data-[result=incorrect]:bg-error-light data-[result=incorrect]:motion-safe:animate-[course-shake_0.35s_ease-in-out] dark:data-[result=incorrect]:border-red-400 dark:data-[result=incorrect]:bg-error-dark",
  "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
)

/** Pair number, shared by a term and the match it is paired with */
const Badge = ({
  number,
  result,
}: {
  number?: number
  result?: PickResult
}) => (
  <Center
    aria-hidden
    className={cn(
      "size-7 shrink-0 rounded-full text-xs font-bold",
      number === undefined && "border-2 border-dashed border-border",
      number !== undefined && !result && "bg-(--course) text-white",
      result === "correct" && "bg-green-700 text-white",
      result === "incorrect" && "bg-error text-white"
    )}
  >
    {number}
  </Center>
)

/**
 * Tap a term, then its match (either side first). Tapping a paired tile
 * breaks the pair and selects it, so a pair can be redone in one more tap.
 */
const MatchStep = ({
  step,
  keyFor,
  value,
  onChange,
  status,
}: MatchStepProps) => {
  const t = useTranslations("page-courses")
  const matches = useMemo(
    () => seededShuffle(step.pairs, step.id),
    [step.pairs, step.id]
  )
  const [selected, setSelected] = useState<{ side: Side; id: string } | null>(
    null
  )

  const locked = status === "correct"
  const paired = step.pairs.map((_, i) => value[i] ?? "")
  const termIndexOf = (matchId: string) => paired.indexOf(matchId)

  const resultFor = (termIndex: number): PickResult | undefined => {
    if (status === "answering" || !paired[termIndex]) return undefined
    return paired[termIndex] === step.pairs[termIndex] ? "correct" : "incorrect"
  }

  const unpair = (termIndex: number) =>
    paired.map((m, i) => (i === termIndex ? "" : m))

  const tap = (side: Side, id: string) => {
    const termIndex = side === "term" ? step.pairs.indexOf(id) : termIndexOf(id)
    if (termIndex >= 0 && paired[termIndex]) {
      onChange(unpair(termIndex))
      setSelected({ side, id })
      return
    }
    if (!selected || selected.side === side) {
      setSelected(
        selected?.side === side && selected.id === id ? null : { side, id }
      )
      return
    }
    const [termId, matchId] =
      side === "term" ? [id, selected.id] : [selected.id, id]
    const next = [...paired]
    next[step.pairs.indexOf(termId)] = matchId
    onChange(next)
    setSelected(null)
  }

  const isSelected = (side: Side, id: string) =>
    selected?.side === side && selected.id === id

  const termLabel = (id: string) => t(keyFor(`term-${id}`))
  const matchLabel = (id: string) => t(keyFor(`match-${id}`))

  return (
    <div>
      <h2 className="mb-2 text-h3 font-black">{t(keyFor("prompt"))}</h2>
      <p className="mb-6 text-body-medium">{t("page-courses-match-hint")}</p>

      <div className="grid grid-cols-2 gap-3">
        <ul className="m-0 flex list-none flex-col gap-2">
          {step.pairs.map((id, i) => {
            const result = resultFor(i)
            return (
              <li key={id} className="m-0 flex-1">
                <button
                  type="button"
                  className={tileClasses}
                  disabled={locked}
                  aria-pressed={isSelected("term", id)}
                  data-selected={isSelected("term", id) || undefined}
                  data-result={result}
                  onClick={() => tap("term", id)}
                >
                  <Badge number={i + 1} result={result} />
                  <span>{termLabel(id)}</span>
                  {paired[i] && (
                    <span className="sr-only">
                      {t("page-courses-match-paired", {
                        other: matchLabel(paired[i]),
                      })}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <ul className="m-0 flex list-none flex-col gap-2">
          {matches.map((id) => {
            const termIndex = termIndexOf(id)
            const result = termIndex >= 0 ? resultFor(termIndex) : undefined
            return (
              <li key={id} className="m-0 flex-1">
                <button
                  type="button"
                  className={tileClasses}
                  disabled={locked}
                  aria-pressed={isSelected("match", id)}
                  data-selected={isSelected("match", id) || undefined}
                  data-result={result}
                  onClick={() => tap("match", id)}
                >
                  <Badge
                    number={termIndex >= 0 ? termIndex + 1 : undefined}
                    result={result}
                  />
                  <span>{matchLabel(id)}</span>
                  {termIndex >= 0 && (
                    <span className="sr-only">
                      {t("page-courses-match-paired", {
                        other: termLabel(step.pairs[termIndex]),
                      })}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {paired.some(Boolean) && !locked && (
        <Button
          variant="link"
          className="mt-4"
          onClick={() => {
            onChange([])
            setSelected(null)
          }}
        >
          {t("page-courses-order-reset")}
        </Button>
      )}
    </div>
  )
}

export default MatchStep
