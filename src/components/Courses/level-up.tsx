"use client"

import { ChevronsUp } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import { type Level, levelFor, ROMAN } from "./levels"

/** "Shannon II" */
export const useLevelName = () => {
  const t = useTranslations("page-courses")
  return ({ tier, step }: Level) =>
    t("page-courses-xp-level-name", {
      tier: t(`page-courses-xp-level-${tier}`),
      step: ROMAN[step - 1],
    })
}

/**
 * Shown on a completion screen when the XP just earned crossed a level. A new
 * tier also brings the card about the unit's namesake.
 */
const LevelUp = ({ before, after }: { before: number; after: number }) => {
  const t = useTranslations("page-courses")
  const levelName = useLevelName()
  const from = levelFor(before)
  const to = levelFor(after)
  if (to.number === from.number) return null
  const newTier = to.tier !== from.tier

  return (
    <div
      className={cn(
        "flex w-full max-w-sm gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-4 text-start",
        // Centred beside a single line; top-aligned when the tier fact follows
        newTier ? "items-start" : "items-center"
      )}
    >
      <ChevronsUp
        aria-hidden
        className="size-8 shrink-0 text-(--course-strong) dark:text-(--course-bright)"
      />
      <div className="flex flex-col gap-1">
        <p className="m-0 font-black">
          {t("page-courses-xp-level-up", { name: levelName(to) })}
        </p>
        {newTier && (
          <p className="m-0 text-sm text-body-medium">
            {t(`page-courses-xp-level-${to.tier}-fact`)}
          </p>
        )}
      </div>
    </div>
  )
}

export default LevelUp
