"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Crosshair, Trophy, X, Zap } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { ArrowPrev } from "@/components/ui/arrow"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import type { PageLink } from "@/data/courses"

import Confetti from "./confetti"
import { LearnMoreLink } from "./learn-more"
import { useEnterAction } from "./lesson-complete"
import LevelUp from "./level-up"
import StreakCelebration from "./streak-celebration"
import { chunkyButton, chunkyButtonSecondary } from "./theme"
import { useCountUp } from "./use-count-up"
import type { ExamReward } from "./useCourseProgress"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import { useRouter } from "@/i18n/navigation"
import { courseHref as hrefFor, COURSES_HUB } from "@/lib/courses/constants"

// A passed trophy floats, and its glow breathes, for as long as it shows
const LOOP = { duration: 3, repeat: Infinity, ease: "easeInOut" } as const

/** One question to review, only after a pass: whether it was right, never
 * the right options */
export interface ExamResult {
  stepId: string
  correct: boolean
}

interface ExamCompleteProps {
  reward: ExamReward
  /** Share answered right, 0-1 */
  score: number
  passMark: number
  /** Empty after a fail: a fail reports the score only */
  results: ExamResult[]
  keyFor: (stepId: string, suffix: string) => string
  courseHref: string
  nextCourseId?: string
  onRetake: () => void
  /** Why there's no retake right now (today's attempts are used up) */
  retakeBlocked?: string
  /** Attempts left today, for the retake prompt */
  attemptsLeft?: number
  /** Page backing each question, by question id */
  sources?: Record<string, PageLink>
}

type Stage = "summary" | "review" | "streak"

/** Brilliant-style level check result: trophy, XP and score, then review */
const ExamComplete = ({
  reward,
  score,
  passMark,
  results,
  keyFor,
  courseHref,
  nextCourseId,
  onRetake,
  retakeBlocked,
  attemptsLeft = 1,
  sources,
}: ExamCompleteProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { isRtl } = useRtlFlip()
  const animate = !useReducedMotion()
  const [stage, setStage] = useState<Stage>("summary")
  // Each screen replaces one that may have been scrolled down
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: animate ? "smooth" : "instant" })
  }, [stage, animate])
  // The streak screen shows once, the first time the learner moves on
  const [streakSeen, setStreakSeen] = useState(!reward.streakExtended)

  const { passed } = reward
  // A retake starts an attempt at once, so it asks first
  const [retakeAsked, setRetakeAsked] = useState(false)
  const retakeRef = useRef<HTMLButtonElement>(null)
  // Enter follows the screen's main button, once the buttons are in
  const router = useRouter()
  useEnterAction(
    () => {
      if (stage === "review") return setStage("summary")
      if (stage === "summary" && !streakSeen) {
        setStreakSeen(true)
        return setStage("streak")
      }
      if (passed)
        return router.push(nextCourseId ? hrefFor(nextCourseId) : COURSES_HUB)
      if (retakeBlocked) return router.push(courseHref)
      setRetakeAsked(true)
    },
    stage,
    animate ? (stage === "summary" ? 1 : 0.2) : 0
  )
  const xp = useCountUp(0, reward.xp, { enabled: animate, delay: 0.6 })
  const shown = useCountUp(0, score, { enabled: animate, delay: 0.8 })
  const int = numberFormat(locale)
  const percent = numberFormat(locale, { style: "percent" })

  const appear = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay },
        }
      : {}

  // React wants `key` passed directly, not spread, so callers add it.
  // In from the end side, out to the start, mirrored for RTL
  const slide = () => ({
    initial: animate ? { opacity: 0, x: isRtl ? -40 : 40 } : false,
    animate: { opacity: 1, x: 0 },
    exit: animate ? { opacity: 0, x: isRtl ? 40 : -40 } : undefined,
  })

  const primaryNav = passed ? (
    nextCourseId && (
      <ButtonLink
        href={hrefFor(nextCourseId)}
        variant="ghost"
        hideArrow
        className={cn(chunkyButton, "flex-col gap-0 py-2")}
      >
        {t("page-courses-path-next-course")}
        <span className="text-sm font-semibold tracking-normal normal-case opacity-90">
          {t(`${nextCourseId}-title`)}
        </span>
      </ButtonLink>
    )
  ) : retakeBlocked ? (
    <p className="m-0 text-body-medium">{retakeBlocked}</p>
  ) : (
    <Button
      variant="ghost"
      onClick={() => setRetakeAsked(true)}
      className={chunkyButton}
    >
      {t("page-courses-try-again")}
    </Button>
  )

  const backNav = passed ? (
    // Course mastered: back to the hub to pick what's next
    <ButtonLink
      href={COURSES_HUB}
      variant="ghost"
      hideArrow
      className={nextCourseId ? chunkyButtonSecondary : chunkyButton}
    >
      <ArrowPrev aria-hidden className="size-5" />
      {t("page-courses-back-to-courses")}
    </ButtonLink>
  ) : (
    <ButtonLink
      href={courseHref}
      variant="ghost"
      hideArrow
      className={chunkyButtonSecondary}
    >
      <ArrowPrev aria-hidden className="size-5" />
      {t("page-courses-back-to-course")}
    </ButtonLink>
  )

  return (
    <div className="flex flex-col items-center gap-6 pt-2 text-center">
      <AnimatePresence mode="wait" initial={false}>
        {stage === "summary" && (
          <motion.div
            key="summary"
            {...slide()}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="relative grid size-40 place-items-center">
              {passed && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--color-yellow-300)_0%,transparent_70%)] opacity-60"
                  animate={animate ? { scale: [1, 1.2, 1] } : undefined}
                  transition={LOOP}
                />
              )}
              {passed && animate && <Confetti />}
              <motion.div
                animate={passed && animate ? { y: [0, -8, 0] } : undefined}
                transition={{ ...LOOP, delay: 0.8 }}
              >
                <motion.div
                  initial={animate ? { scale: 0.3, rotate: -20 } : false}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  className={cn(
                    "relative grid size-28 place-items-center rounded-3xl [&>svg]:size-14",
                    passed
                      ? "border-b-[6px] border-yellow-600 bg-yellow-400 text-yellow-900"
                      : "border-2 border-dashed border-border bg-background text-disabled"
                  )}
                >
                  <Trophy aria-hidden />
                </motion.div>
              </motion.div>
            </div>

            <div role="status" className="flex flex-col gap-2">
              <motion.h2
                className="m-0 text-h2 font-black text-(--course-strong) dark:text-(--course-bright)"
                {...appear(0.2)}
              >
                {passed
                  ? t("page-courses-exam-passed")
                  : t("page-courses-exam-failed")}
              </motion.h2>
              <motion.p
                className="m-0 text-lg text-balance text-body-medium"
                {...appear(0.35)}
              >
                {passed
                  ? t("page-courses-exam-passed-line")
                  : t("page-courses-exam-failed-line", {
                      mark: percent.format(passMark),
                    })}
              </motion.p>
            </div>

            <motion.div
              className="grid w-full max-w-md grid-cols-2 gap-4"
              {...appear(0.5)}
            >
              <StatCard
                value={t("page-courses-complete-xp", {
                  xp: int.format(Math.round(xp)),
                })}
                label={t("page-courses-exam-xp")}
                icon={
                  <Zap
                    className="fill-yellow-400 text-yellow-600 dark:text-yellow-400"
                    aria-hidden
                  />
                }
                className="border-yellow-500"
              />
              <StatCard
                value={percent.format(shown)}
                label={t("page-courses-exam-score")}
                icon={
                  passed ? (
                    <Check strokeWidth={3} aria-hidden />
                  ) : (
                    <Crosshair aria-hidden />
                  )
                }
                className={
                  passed
                    ? "border-green-700 dark:border-green-400 [&>svg]:text-green-700 dark:[&>svg]:text-green-400"
                    : "border-error [&>svg]:text-error"
                }
              />
            </motion.div>

            <motion.div
              {...appear(0.8)}
              className="flex w-full justify-center empty:hidden"
            >
              <LevelUp
                before={reward.totalBefore}
                after={reward.totalAfter}
                className="max-w-md"
              />
            </motion.div>
          </motion.div>
        )}

        {stage === "review" && (
          <motion.div key="review" {...slide()} className="w-full text-start">
            <h2 className="m-0 mb-4 text-h3 font-black">
              {t("page-courses-exam-review-title")}
            </h2>
            <ol className="m-0 flex list-none flex-col gap-4">
              {results.map((result, i) => (
                <ReviewItem
                  key={result.stepId}
                  number={i + 1}
                  correct={result.correct}
                  keyFor={(suffix) => keyFor(result.stepId, suffix)}
                  source={sources?.[result.stepId]}
                />
              ))}
            </ol>
          </motion.div>
        )}

        {stage === "streak" && (
          <motion.div key="streak" {...slide()} className="w-full">
            <StreakCelebration streak={reward.streak} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* One column, as wide as the stat cards; the main action on top */}
      <motion.div
        key={stage}
        className={cn(
          "flex w-full max-w-md flex-col gap-3 *:w-full",
          stage === "summary" && "mt-6"
        )}
        {...appear(stage === "summary" ? 1 : 0.2)}
      >
        {stage === "review" ? (
          <Button
            variant="ghost"
            onClick={() => setStage("summary")}
            className={chunkyButtonSecondary}
          >
            {t("page-courses-exam-back-to-results")}
          </Button>
        ) : stage === "summary" ? (
          <>
            {streakSeen ? (
              primaryNav || backNav
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setStreakSeen(true)
                  setStage("streak")
                }}
                className={chunkyButton}
              >
                {t("page-courses-continue")}
              </Button>
            )}
            {results.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => setStage("review")}
                className={chunkyButtonSecondary}
              >
                {t("page-courses-exam-review")}
              </Button>
            )}
            {streakSeen && primaryNav && backNav}
          </>
        ) : (
          <>
            {primaryNav}
            {backNav}
          </>
        )}
      </motion.div>

      <Dialog
        variant="stacked"
        open={retakeAsked}
        onOpenChange={setRetakeAsked}
      >
        <DialogContent
          // Enter confirms: the second deliberate press after Try again
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            retakeRef.current?.focus()
          }}
        >
          <DialogHeader>
            <DialogTitle>{t("page-courses-exam-retake-title")}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {t("page-courses-exam-retake-description", {
              count: attemptsLeft,
            })}
          </DialogDescription>
          <DialogFooter className="flex flex-wrap justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" isSecondary>
                {t("page-courses-exam-retake-cancel")}
              </Button>
            </DialogClose>
            <Button
              ref={retakeRef}
              onClick={() => {
                setRetakeAsked(false)
                onRetake()
              }}
            >
              {t("page-courses-try-again")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

const StatCard = ({
  value,
  label,
  icon,
  className,
}: {
  value: string
  label: string
  icon: React.ReactNode
  className?: string
}) => (
  // Outline only, so the cards don't compete with the solid button below.
  // Icon above the value so both cards' values and labels line up
  <div
    className={cn(
      "flex flex-col items-center gap-2 rounded-2xl border-2 border-b-[6px] bg-background px-3 py-5 [&>svg]:size-7",
      className
    )}
  >
    {icon}
    <span className="text-3xl leading-none font-black whitespace-nowrap tabular-nums sm:text-4xl">
      {value}
    </span>
    <span className="text-sm font-bold tracking-wide text-body-medium uppercase">
      {label}
    </span>
  </div>
)

const ReviewItem = ({
  number,
  correct,
  keyFor,
  source,
}: {
  number: number
  correct: boolean
  keyFor: (suffix: string) => string
  source?: PageLink
}) => {
  const t = useTranslations("page-courses")

  return (
    <li
      className={cn(
        "m-0 flex flex-col gap-3 rounded-2xl border-2 p-4",
        correct
          ? "border-green-700 dark:border-green-400"
          : "border-error dark:border-red-400"
      )}
    >
      <p className="m-0 flex items-start gap-3 font-bold">
        <span
          className={cn(
            "grid size-7 shrink-0 place-items-center rounded-full text-white",
            correct ? "bg-green-700" : "bg-error"
          )}
        >
          {correct ? (
            <Check className="size-4" strokeWidth={3} aria-hidden />
          ) : (
            <X className="size-4" strokeWidth={3} aria-hidden />
          )}
          <span className="sr-only">
            {correct ? t("page-courses-correct") : t("page-courses-incorrect")}
          </span>
        </span>
        <span>
          <span className="sr-only">
            {t("page-courses-exam-question", { number })}:{" "}
          </span>
          {t(keyFor("prompt"))}
        </span>
      </p>
      <p className="m-0 ps-10 text-body-medium">{t(keyFor("explain"))}</p>
      {source && (
        <p className="m-0 flex flex-wrap gap-x-1.5 ps-10 text-sm">
          <span className="font-bold text-body-medium">
            {t("page-courses-exam-learn-more")}
          </span>
          <LearnMoreLink link={source} />
        </p>
      )}
    </li>
  )
}

export default ExamComplete
