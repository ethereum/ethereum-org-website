"use client"

import { Fragment, useMemo } from "react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import type { FillStep as FillStepData } from "@/data/courses"

import { chunkyTile } from "../theme"

import { seededShuffle } from "./shuffle"
import type { StepStatus } from "./types"

interface FillStepProps {
  step: FillStepData
  keyFor: (suffix: string) => string
  /** Word id in each blank, in order; "" while empty */
  value: string[]
  onChange: (value: string[]) => void
  status: StepStatus
}

export const isFillComplete = (step: FillStepData, value: string[]) =>
  step.blanks.every((_, i) => !!value[i])

export const isFillCorrect = (step: FillStepData, value: string[]) =>
  step.blanks.every((id, i) => value[i] === id)

// Private-use character: can't occur in a translation, so splitting on it
// finds exactly the `{bN}` placeholders
const MARK = ""

const wordClasses = cn(
  chunkyTile,
  "min-h-11 px-4 py-1.5 font-semibold focus-visible:outline-4 focus-visible:outline-(--course-soft)",
  "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
)

/** Tap words into the blanks in order; tap a filled blank to empty it */
const FillStep = ({ step, keyFor, value, onChange, status }: FillStepProps) => {
  const t = useTranslations("page-courses")
  const bank = useMemo(
    () => seededShuffle([...step.blanks, ...step.extras], step.id),
    [step.blanks, step.extras, step.id]
  )

  const locked = status === "correct"
  const filled = step.blanks.map((_, i) => value[i] ?? "")
  const word = (id: string) => t(keyFor(`word-${id}`))

  const place = (id: string) => {
    const slot = filled.indexOf("")
    if (slot < 0) return
    const next = [...filled]
    next[slot] = id
    onChange(next)
  }

  const clear = (slot: number) =>
    onChange(filled.map((id, i) => (i === slot ? "" : id)))

  const parts = t(
    keyFor("text"),
    Object.fromEntries(
      step.blanks.map((_, i) => [`b${i + 1}`, `${MARK}${i}${MARK}`])
    )
  ).split(MARK)

  return (
    <div>
      <h2 className="mb-2 text-h3 font-black">{t(keyFor("prompt"))}</h2>
      <p className="mb-6 text-body-medium">{t("page-courses-fill-hint")}</p>

      <p className="mb-8 text-xl leading-[2.75]">
        {parts.map((part, k) => {
          if (k % 2 === 0) return <Fragment key={k}>{part}</Fragment>
          const slot = Number(part)
          const id = filled[slot]
          const wrong = status === "incorrect" && id && id !== step.blanks[slot]
          return (
            <button
              key={k}
              type="button"
              disabled={locked || !id}
              onClick={() => clear(slot)}
              aria-label={`${t("page-courses-fill-blank", { number: slot + 1 })}: ${
                id ? word(id) : t("page-courses-fill-empty")
              }`}
              className={cn(
                "mx-1 inline-flex min-h-10 min-w-24 items-center justify-center rounded-xl border-2 border-b-4 px-3 align-middle text-lg leading-tight font-semibold transition-colors",
                !id &&
                  "border-dashed border-border bg-background-highlight text-transparent",
                id && "border-(--course) bg-(--course-softer)",
                wrong &&
                  "border-error bg-error-light motion-safe:animate-[course-shake_0.35s_ease-in-out] dark:border-red-400 dark:bg-error-dark",
                locked &&
                  "border-green-700 bg-success-light dark:border-green-400 dark:bg-success-dark"
              )}
            >
              {id ? word(id) : " "}
            </button>
          )
        })}
      </p>

      <ul
        aria-label={t("page-courses-fill-bank")}
        className="m-0 flex list-none flex-wrap gap-2"
      >
        {bank.map((id) => {
          const used = filled.includes(id)
          return (
            <li key={id} className="m-0">
              {used ? (
                // Keeps the bank from reflowing while a word is placed
                <span
                  aria-hidden
                  className="block min-h-11 rounded-2xl border-2 border-dashed border-border bg-background-highlight px-4 py-1.5 font-semibold text-transparent"
                >
                  {word(id)}
                </span>
              ) : (
                <button
                  type="button"
                  className={wordClasses}
                  disabled={locked || !filled.includes("")}
                  onClick={() => place(id)}
                >
                  {word(id)}
                </button>
              )}
            </li>
          )
        })}
      </ul>

      {filled.some(Boolean) && !locked && (
        <Button variant="link" className="mt-4" onClick={() => onChange([])}>
          {t("page-courses-order-reset")}
        </Button>
      )}
    </div>
  )
}

export default FillStep
