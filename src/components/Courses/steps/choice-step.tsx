"use client"

import { useTranslations } from "next-intl"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Center } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

import type { ChoiceStep as ChoiceStepData } from "@/data/courses"

import {
  chunkyTile,
  pickedMarker,
  pickedTile,
  type PickResult,
  stepPrompt,
} from "../theme"

import type { StepStatus } from "./types"

interface ChoiceStepProps {
  step: ChoiceStepData
  keyFor: (suffix: string) => string
  value: string[]
  onChange: (value: string[]) => void
  status: StepStatus
  /** Exam mode: one attempt, then the right answer shows */
  reveal?: boolean
}

export const isChoiceCorrect = (step: ChoiceStepData, value: string[]) =>
  value.length === step.correct.length &&
  value.every((id) => step.correct.includes(id))

/** Feedback key: the picked option's note, or the combined note for multi */
export const choiceFeedbackKey = (
  step: ChoiceStepData,
  value: string[],
  keyFor: (suffix: string) => string
) => {
  if (!step.multi) return keyFor(`fb-${value[0]}`)
  if (isChoiceCorrect(step, value)) return keyFor("explain")
  const wrongPick = value.find((id) => !step.correct.includes(id))
  return wrongPick ? keyFor(`fb-${wrongPick}`) : null
}

const optionClasses = cn(
  chunkyTile,
  "group/option flex w-full cursor-pointer items-center gap-4 p-4 text-start text-md focus-visible:outline-4 focus-visible:outline-(--course-soft)",
  pickedTile,
  "data-[result=incorrect]:motion-safe:animate-[course-shake_0.35s_ease-in-out]",
  "disabled:cursor-default disabled:active:translate-y-0 disabled:active:border-b-4"
)

const Marker = ({
  index,
  square,
  result,
}: {
  index: number
  square?: boolean
  result?: PickResult
}) => (
  <Center
    aria-hidden
    className={cn(
      "size-9 shrink-0",
      pickedMarker(result),
      square ? "rounded-lg" : "rounded-full"
    )}
  >
    {String.fromCharCode(65 + index)}
  </Center>
)

const ChoiceStep = ({
  step,
  keyFor,
  value,
  onChange,
  status,
  reveal,
}: ChoiceStepProps) => {
  const t = useTranslations("page-courses")
  const graded = status !== "answering"
  const locked = status === "correct" || (reveal && graded)

  // Only the learner's picks are marked, so a wrong answer doesn't reveal the
  // right one before they try again. With `reveal` there is no retry.
  const resultFor = (id: string): PickResult | undefined => {
    if (!graded) return undefined
    if (value.includes(id))
      return step.correct.includes(id) ? "correct" : "incorrect"
    return reveal && step.correct.includes(id) ? "correct" : undefined
  }

  const prompt = (
    <legend className="mb-6">
      <h2 className={stepPrompt}>{t(keyFor("prompt"))}</h2>
      {step.multi && (
        <span className="mt-1 block text-body-medium">
          {t("page-courses-select-all")}
        </span>
      )}
    </legend>
  )

  if (step.multi) {
    return (
      <fieldset>
        {prompt}
        <div className="flex flex-col gap-3">
          {step.options.map((id, idx) => (
            <CheckboxPrimitive.Root
              key={id}
              className={optionClasses}
              checked={value.includes(id)}
              disabled={locked}
              data-result={resultFor(id)}
              onCheckedChange={(checked) =>
                onChange(
                  checked ? [...value, id] : value.filter((v) => v !== id)
                )
              }
            >
              <Marker index={idx} square result={resultFor(id)} />
              <span>{t(keyFor(`opt-${id}`))}</span>
            </CheckboxPrimitive.Root>
          ))}
        </div>
      </fieldset>
    )
  }

  return (
    <fieldset>
      {prompt}
      <RadioGroup.Root
        className="flex flex-col gap-3"
        value={value[0] ?? ""}
        disabled={locked}
        onValueChange={(id) => onChange([id])}
      >
        {step.options.map((id, idx) => (
          <RadioGroup.Item
            key={id}
            value={id}
            className={optionClasses}
            data-result={resultFor(id)}
          >
            <Marker index={idx} result={resultFor(id)} />
            <span>{t(keyFor(`opt-${id}`))}</span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </fieldset>
  )
}

export default ChoiceStep
