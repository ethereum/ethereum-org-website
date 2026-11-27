"use client"

import { useEffect, useRef, useState } from "react"
import { Crosshair, Sparkles, Zap } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { ArrowPrev } from "@/components/ui/arrow"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardParagraph } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { PageLink } from "@/data/courses"

import CourseArt from "./art/lazy-course-art"
import Confetti from "./confetti"
import { LearnMoreCard } from "./learn-more"
import LevelUp, { useLevelName } from "./level-up"
import { levelFor } from "./levels"
import StreakCelebration from "./streak-celebration"
import { chunkyButton, chunkyButtonSecondary } from "./theme"
import { useCountUp } from "./use-count-up"
import type { LessonReward } from "./useCourseProgress"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { useRouter } from "@/i18n/navigation"

interface LessonCompleteProps {
  reward: LessonReward
  accuracy: number
  /** Graded steps answered right on the first try, out of all of them */
  firstTry: { right: number; total: number }
  courseHref: string
  nextHref?: string
  /** Next lesson's title, shown under the button label */
  nextTitle?: string
  /** `nextHref` is the course check rather than a lesson */
  nextIsExam?: boolean
  /** ethereum.org page to go deeper, offered once the lesson is done */
  learnMore?: PageLink
  /** Prompt and explanation keys of the steps missed on the first try */
  missed: { prompt: string; explain: string }[]
}

// XP sparks fly from the badge down into the total bar
const SPARKS = Array.from({ length: 10 }, (_, i) => ({
  x: (i - 4.5) * 14,
  delay: 1 + i * 0.06,
}))

const BONUS_AT = 1.25
const XP_LAND = 1.7
/** When each stage's buttons appear */
const ACTIONS_AT = { summary: 2.4, streak: 2 }

/**
 * Enter takes a completion screen's main action, as it does through the
 * lesson, once `armAfter` seconds have passed (when its buttons appear). The
 * press that finished can reach this listener too, so only a later press
 * counts: no skipped screens. `stage` re-arms it for each screen
 */
export const useEnterAction = (
  action: () => void,
  stage: string,
  armAfter: number
) => {
  const actionRef = useRef(action)
  useEffect(() => {
    actionRef.current = action
  })
  useEffect(() => {
    const armedAt = performance.now() + armAfter * 1000
    const onEnter = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat || event.isComposing) return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return
      if (event.defaultPrevented || event.timeStamp < armedAt) return
      const target = event.target as HTMLElement | null
      // A focused control keeps its own Enter
      if (
        target?.closest(
          "a, button, input, textarea, select, [contenteditable], [role=dialog]"
        )
      )
        return
      event.preventDefault()
      actionRef.current()
    }
    window.addEventListener("keydown", onEnter)
    return () => window.removeEventListener("keydown", onEnter)
  }, [stage, armAfter])
}

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
  firstTry,
  courseHref,
  nextHref,
  nextTitle,
  nextIsExam,
  learnMore,
  missed,
}: LessonCompleteProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { isRtl } = useRtlFlip()
  const reduceMotion = !!useReducedMotion()
  const animate = !reduceMotion
  // The streak gets its own moment, once a day, after the lesson summary
  const [stage, setStage] = useState<"summary" | "streak">("summary")
  // Each screen replaces one that may have been scrolled down
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: animate ? "smooth" : "instant" })
  }, [stage, animate])

  const router = useRouter()
  const showStreak = stage === "summary" && reward.streakExtended
  useEnterAction(
    () =>
      showStreak ? setStage("streak") : router.push(nextHref ?? courseHref),
    stage,
    animate ? ACTIONS_AT[stage] : 0
  )

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
  const right = useCountUp(0, firstTry.right, { enabled: animate, delay: 2 })
  const share = firstTry.total ? firstTry.right / firstTry.total : 1
  // Same thresholds as the cheer tiers
  const accuracyFill =
    share >= 0.75
      ? "*:data-[slot=progress-indicator]:bg-success"
      : share >= 0.5
        ? "*:data-[slot=progress-indicator]:bg-warning"
        : "*:data-[slot=progress-indicator]:bg-error"

  const int = numberFormat(locale)
  const levelName = useLevelName()
  const tier = tierFor(accuracy, reward.perfect)

  // The bar shows progress through the level reached
  const level = levelFor(reward.totalAfter)
  const nextLevel = level.next === null ? null : levelFor(level.next)
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
            exit={animate ? { opacity: 0, x: isRtl ? 40 : -40 } : undefined}
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
                <div className="flex justify-between gap-2 text-sm font-bold">
                  <span>{levelName(level)}</span>
                  <span className="tabular-nums">
                    {nextLevel
                      ? t("page-courses-complete-xp-progress", {
                          xp: int.format(Math.round(total)),
                          remaining: int.format(
                            Math.max(0, nextLevel.floor - Math.round(total))
                          ),
                          name: levelName(nextLevel),
                        })
                      : t("page-courses-complete-xp-total", {
                          xp: int.format(Math.round(total)),
                        })}
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

            {/* First-try accuracy: a bar coloured by how well it went */}
            <motion.div
              {...appear(2)}
              className="flex w-full max-w-sm flex-col gap-1"
            >
              <div className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="flex items-center gap-1.5">
                  <Crosshair
                    className="size-5 shrink-0 text-(--course-strong) dark:text-(--course-bright)"
                    aria-hidden
                  />
                  {t("page-courses-complete-accuracy")}
                </span>
                <span className="tabular-nums">
                  {t("page-courses-complete-accuracy-count", {
                    right: int.format(Math.round(right)),
                    total: int.format(firstTry.total),
                  })}
                </span>
              </div>
              <Progress
                aria-hidden
                value={firstTry.total ? (right / firstTry.total) * 100 : 100}
                className={cn(
                  "bg-background-highlight *:data-[slot=progress-indicator]:transition-none",
                  accuracyFill
                )}
              />
            </motion.div>

            <motion.div
              {...appear(2.2)}
              className="flex w-full justify-center empty:hidden"
            >
              <LevelUp before={reward.totalBefore} after={reward.totalAfter} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="streak"
            className="w-full"
            initial={animate ? { opacity: 0, x: isRtl ? -40 : 40 } : false}
            animate={{ opacity: 1, x: 0 }}
          >
            <StreakCelebration streak={reward.streak} />
          </motion.div>
        )}
      </AnimatePresence>

      {showStreak ? (
        <motion.div
          key="continue"
          className="mt-6 w-full max-w-sm"
          {...appear(ACTIONS_AT.summary)}
        >
          <Button
            variant="ghost"
            onClick={() => setStage("streak")}
            className={cn(chunkyButton, "w-full")}
          >
            {t("page-courses-continue")}
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="nav"
          className={cn(
            "flex w-full flex-col items-center gap-6",
            stage === "summary" && "mt-6"
          )}
          {...appear(ACTIONS_AT[stage])}
        >
          {/* Same width as the bars above */}
          <div className="flex w-full max-w-sm flex-col gap-3">
            {nextHref && (
              <ButtonLink
                href={nextHref}
                variant="ghost"
                hideArrow
                className={cn(chunkyButton, "w-full flex-col gap-0 py-2")}
              >
                {nextIsExam
                  ? t("page-courses-next-exam")
                  : t("page-courses-next-lesson")}
                {nextTitle && (
                  <span className="text-sm font-semibold tracking-normal normal-case opacity-90">
                    {nextTitle}
                  </span>
                )}
              </ButtonLink>
            )}
            <ButtonLink
              href={courseHref}
              variant="ghost"
              hideArrow
              className={cn(
                nextHref ? chunkyButtonSecondary : chunkyButton,
                "w-full"
              )}
            >
              <ArrowPrev aria-hidden className="size-5" />
              {t("page-courses-back-to-course")}
            </ButtonLink>
          </div>
          {learnMore && <LearnMoreCard link={learnMore} />}
        </motion.div>
      )}

      {missed.length > 0 && !showStreak && (
        <motion.section
          {...appear(ACTIONS_AT[stage])}
          className="flex w-full max-w-sm flex-col gap-3 text-start"
        >
          <h3 className="m-0 text-lg font-bold">
            {t("page-courses-profile-review-title")}
          </h3>
          <ul className="m-0 flex list-none flex-col gap-3">
            {missed.map(({ prompt, explain }) => (
              <li key={prompt} className="m-0">
                <Card variant="nested" size="md" border>
                  <CardContent>
                    <CardParagraph className="m-0 font-bold">
                      {t(prompt)}
                    </CardParagraph>
                    <CardParagraph className="m-0" size="sm">
                      {t(explain)}
                    </CardParagraph>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  )
}

export default LessonComplete
