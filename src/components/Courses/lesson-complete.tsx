"use client"

import { useEffect, useState } from "react"
import { Crosshair, Sparkles, Zap } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { PageLink } from "@/data/courses"

import CourseArt from "./art/course-art"
import Confetti from "./confetti"
import { LearnMoreCard } from "./learn-more"
import LevelUp, { useLevelName } from "./level-up"
import { levelFor } from "./levels"
import StreakCelebration from "./streak-celebration"
import { chunkyButton, chunkyButtonSecondary } from "./theme"
import { useCountUp } from "./use-count-up"
import type { LessonReward } from "./useCourseProgress"

interface LessonCompleteProps {
  reward: LessonReward
  accuracy: number
  courseHref: string
  nextHref?: string
  /** `nextHref` is the course check rather than a lesson */
  nextIsExam?: boolean
  /** ethereum.org page to go deeper, offered once the lesson is done */
  learnMore?: PageLink
}

// XP sparks fly from the badge down into the total bar
const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  x: (i - 4.5) * 14,
  delay: 1 + i * 0.06,
}))

const BONUS_AT = 1.25
const XP_LAND = 1.7

const tierFor = (accuracy: number, perfect: boolean) =>
  perfect
    ? "perfect"
    : accuracy >= 0.75
      ? "great"
      : accuracy >= 0.5
        ? "good"
        : "finish"

const LessonComplete = ({
  reward,
  accuracy,
  courseHref,
  nextHref,
  nextIsExam,
  learnMore,
}: LessonCompleteProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const reduceMotion = !!useReducedMotion()
  const animate = !reduceMotion
  // The streak gets its own moment, once a day, after the lesson summary
  const [stage, setStage] = useState<"summary" | "streak">("summary")

  // The lesson's XP lands first, then a perfect run's bonus tops it up
  const baseXp = useCountUp(0, reward.xp - reward.bonus, {
    enabled: animate,
    delay: 0.5,
    duration: 600,
  })
  const bonusXp = useCountUp(0, reward.bonus, {
    enabled: animate,
    delay: BONUS_AT,
    duration: 400,
  })
  const xp = baseXp + bonusXp
  // A perfect run's bonus recolours the badge and adds the perfect mark
  const [bonusIn, setBonusIn] = useState(false)
  useEffect(() => {
    if (reward.bonus <= 0) return
    const id = setTimeout(() => setBonusIn(true), animate ? BONUS_AT * 1000 : 0)
    return () => clearTimeout(id)
  }, [reward.bonus, animate])
  const total = useCountUp(reward.totalBefore, reward.totalAfter, {
    enabled: animate,
    delay: XP_LAND,
  })
  const acc = useCountUp(0, accuracy, { enabled: animate, delay: 2 })

  const int = numberFormat(locale)
  const percent = numberFormat(locale, { style: "percent" })
  const levelName = useLevelName()
  const tier = tierFor(accuracy, reward.perfect)

  // The bar shows progress through the level reached
  const level = levelFor(reward.totalAfter)
  const fill = (n: number) =>
    level.next === null
      ? 100
      : Math.max(
          0,
          Math.min(((n - level.floor) / (level.next - level.floor)) * 100, 100)
        )

  const appear = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay },
        }
      : {}

  return (
    <div className="relative flex flex-col items-center gap-6 pt-2 text-center">
      <AnimatePresence mode="wait" initial={false}>
        {stage === "summary" ? (
          <motion.div
            key="summary"
            className="flex w-full flex-col items-center gap-6"
            exit={animate ? { opacity: 0, x: -40 } : undefined}
          >
            <div className="relative w-36">
              {animate && <Confetti />}
              <motion.div
                initial={animate ? { scale: 0.3, rotate: -20 } : false}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
              >
                <CourseArt id="diamond" />
              </motion.div>
            </div>

            <div role="status" className="flex flex-col gap-2">
              <motion.h2
                className="m-0 text-h2 font-black text-(--course-strong) dark:text-(--course-bright)"
                {...appear(0.2)}
              >
                {t(`page-courses-complete-cheer-${tier}`)}
              </motion.h2>
              <motion.p
                className="m-0 text-lg text-body-medium"
                {...appear(0.35)}
              >
                {t(`page-courses-complete-line-${tier}`)}
              </motion.p>
            </div>

            {/* XP earned: badge pops, sparks fly into the total bar, bar fills */}
            <div className="relative flex w-full max-w-sm flex-col items-center gap-10">
              <motion.div
                initial={animate ? { scale: 0, rotate: -12 } : false}
                animate={{ scale: [0, 1.25, 1], rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6, times: [0, 0.6, 1] }}
                className={cn(
                  "relative flex items-center gap-2 rounded-full border-b-[6px] px-6 py-3 transition-colors duration-300",
                  bonusIn
                    ? "border-yellow-600 bg-yellow-400 text-yellow-950"
                    : "border-(--course-strong) bg-(--course) text-white"
                )}
              >
                <Zap className="size-7 fill-current" aria-hidden />
                <span className="text-3xl font-black tabular-nums">
                  {t("page-courses-complete-xp", {
                    xp: int.format(Math.round(xp)),
                  })}
                </span>
                {bonusIn && (
                  <motion.span
                    initial={animate ? { scale: 0, rotate: -45 } : false}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 12 }}
                  >
                    <Sparkles className="size-7 fill-current" aria-hidden />
                    <span className="sr-only">
                      {t("page-courses-complete-perfect-bonus")}
                    </span>
                  </motion.span>
                )}
                {animate &&
                  SPARKS.map(({ x, delay }, i) => (
                    <motion.span
                      key={i}
                      aria-hidden
                      className="absolute top-1/2 left-1/2 text-yellow-500"
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                      animate={{
                        x: [0, x, 0],
                        y: [0, 30, 92],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.4],
                      }}
                      transition={{ delay, duration: 0.7, ease: "easeIn" }}
                    >
                      <Zap className="size-4 fill-current" />
                    </motion.span>
                  ))}
              </motion.div>

              <div className="flex w-full flex-col gap-1">
                <div className="flex justify-between text-sm font-bold">
                  <span>{levelName(level)}</span>
                  <span className="tabular-nums">
                    {int.format(Math.round(total))}
                  </span>
                </div>
                <motion.div
                  className="h-4 overflow-hidden rounded-full bg-background-highlight"
                  animate={animate ? { scale: [1, 1, 1.06, 1] } : undefined}
                  transition={{
                    delay: XP_LAND,
                    duration: 0.4,
                    times: [0, 0.01, 0.4, 1],
                  }}
                >
                  <Progress
                    aria-hidden
                    value={fill(total)}
                    className="bg-transparent *:data-[slot=progress-indicator]:bg-yellow-400 *:data-[slot=progress-indicator]:transition-none"
                  />
                </motion.div>
              </div>
            </div>

            <motion.div
              {...appear(2)}
              className="flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border-2 border-border p-4"
            >
              <Crosshair
                className="size-8 shrink-0 text-(--course-strong) dark:text-(--course-bright)"
                aria-hidden
              />
              <span className="flex flex-col items-start">
                <span className="text-2xl leading-none font-black tabular-nums">
                  {percent.format(acc)}
                </span>
                <span className="text-sm font-bold tracking-wide text-body-medium uppercase">
                  {t("page-courses-complete-accuracy")}
                </span>
              </span>
            </motion.div>

            <motion.div {...appear(2.2)} className="flex w-full justify-center">
              <LevelUp before={reward.totalBefore} after={reward.totalAfter} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="streak"
            className="w-full"
            initial={animate ? { opacity: 0, x: 40 } : false}
            animate={{ opacity: 1, x: 0 }}
          >
            <StreakCelebration streak={reward.streak} />
          </motion.div>
        )}
      </AnimatePresence>

      {stage === "summary" && reward.streakExtended ? (
        <motion.div
          key="continue"
          className="flex w-full justify-center"
          {...appear(2.4)}
        >
          <Button
            variant="ghost"
            onClick={() => setStage("streak")}
            className={cn(chunkyButton, "w-full sm:w-auto")}
          >
            {t("page-courses-continue")}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="nav"
          className="flex w-full flex-col items-center gap-6"
          {...appear(stage === "streak" ? 2 : 2.4)}
        >
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            {nextHref && (
              <ButtonLink
                href={nextHref}
                variant="ghost"
                hideArrow
                className={chunkyButton}
              >
                {nextIsExam
                  ? t("page-courses-next-exam")
                  : t("page-courses-next-lesson")}
              </ButtonLink>
            )}
            <ButtonLink
              href={courseHref}
              variant="ghost"
              hideArrow
              className={nextHref ? chunkyButtonSecondary : chunkyButton}
            >
              {t("page-courses-back-to-course")}
            </ButtonLink>
          </div>
          {learnMore && <LearnMoreCard link={learnMore} />}
        </motion.div>
      )}
    </div>
  )
}

export default LessonComplete
