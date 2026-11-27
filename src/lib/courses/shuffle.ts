import { stringSeededShuffle } from "@/lib/utils/random"

import type { ChoiceStep } from "@/data/courses"

/** A new seed for each lesson attempt; not a secret, only a shuffle */
export const newAttemptSeed = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

/** Options in the order one attempt shows them; no seed keeps authored order */
export const choiceOptionOrder = (
  step: Pick<ChoiceStep, "id" | "options">,
  seed: string | null | undefined
) =>
  seed ? stringSeededShuffle(step.options, `${seed}:${step.id}`) : step.options
