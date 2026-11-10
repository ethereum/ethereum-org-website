"use client"

import { useState } from "react"
import { Check, Trophy, X, Zap } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import {
  type ChoiceStep,
  courseHref as hrefFor,
  type PageLink,
} from "@/data/courses"

import Confetti from "./confetti"
import { LearnMoreLink } from "./learn-more"
import StreakCelebration from "./streak-celebration"
import { chunkyButton, chunkyButtonSecondary } from "./theme"
import { useCountUp } from "./use-count-up"
import type { ExamReward } from "./useCourseProgress"

export interface ExamResult {
  step: ChoiceStep
  picked: string[]
  correct: boolean
}

interface ExamCompleteProps {
  reward: ExamReward
  /** Share answered right, 0-1 */
  score: number
  passMark: number
  results: ExamResult[]
  keyFor: (stepId: string, suffix: string) => string
  courseHref: string
  nextCourseId?: string
  onRetake: () => void
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
  sources,
}: ExamCompleteProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const animate = !useReducedMotion()
  const [stage, setStage] = useState<Stage>("summary")
  // The streak screen shows once, the first time the learner moves on
  const [streakSeen, setStreakSeen] = useState(!reward.streakExtended)

  const { passed } = reward
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

  const slide = (key: Stage) => ({
    key,
    initial: animate ? { opacity: 0, x: 40 } : false,
    animate: { opacity: 1, x: 0 },
    exit: animate ? { opacity: 0, x: -40 } : undefined,
  })

  const nav = passed ? (
    <>
      {nextCourseId && (
        <ButtonLink
          href={hrefFor(nextCourseId)}
          variant="ghost"
          hideArrow
          className={chunkyButton}
        >
          {t("page-courses-path-next-course")}
        </ButtonLink>
      )}
      <ButtonLink
        href={courseHref}
        variant="ghost"
        hideArrow
        className={nextCourseId ? chunkyButtonSecondary : chunkyButton}
      >
        {t("page-courses-back-to-course")}
      </ButtonLink>
    </>
  ) : (
    <>
      <Button variant="ghost" onClick={onRetake} className={chunkyButton}>
        {t("page-courses-try-again")}
      </Button>
      <ButtonLink
        href={courseHref}
        variant="ghost"
        hideArrow
        className={chunkyButtonSecondary}
      >
        {t("page-courses-back-to-course")}
      </ButtonLink>
    </>
  )

  return (
    <div className="flex flex-col items-center gap-6 pt-2 text-center">
      <AnimatePresence mode="wait" initial={false}>
        {stage === "summary" && (
          <motion.div
            {...slide("summary")}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="relative grid size-40 place-items-center">
              {passed && (
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--color-yellow-300)_0%,transparent_70%)] opacity-60"
                />
              )}
              {passed && animate && <Confetti />}
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
                className="m-0 text-lg text-body-medium"
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
                icon={<Zap className="size-6 fill-current" aria-hidden />}
                className="from-yellow-400/25 text-yellow-700 dark:text-yellow-400"
              />
              <StatCard
                value={percent.format(shown)}
                label={t("page-courses-exam-score")}
                icon={
                  passed ? (
                    <Check className="size-6" strokeWidth={3} aria-hidden />
                  ) : undefined
                }
                className={
                  passed
                    ? "from-success/25 text-green-700 dark:text-green-400"
                    : "from-(--course)/20 text-(--course-strong) dark:text-(--course-bright)"
                }
              />
            </motion.div>
          </motion.div>
        )}

        {stage === "review" && (
          <motion.div {...slide("review")} className="w-full text-start">
            <h2 className="m-0 mb-4 text-h3 font-black">
              {t("page-courses-exam-review-title")}
            </h2>
            <ol className="m-0 flex list-none flex-col gap-4">
              {results.map((result, i) => (
                <ReviewItem
                  key={result.step.id}
                  number={i + 1}
                  result={result}
                  keyFor={(suffix) => keyFor(result.step.id, suffix)}
                  source={sources?.[result.step.id]}
                />
              ))}
            </ol>
          </motion.div>
        )}

        {stage === "streak" && (
          <motion.div {...slide("streak")} className="w-full">
            <StreakCelebration streak={reward.streak} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={stage}
        className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center"
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
            <Button
              variant="ghost"
              onClick={() => setStage("review")}
              className={chunkyButtonSecondary}
            >
              {t("page-courses-exam-review")}
            </Button>
            {streakSeen ? (
              nav
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
          </>
        ) : (
          nav
        )}
      </motion.div>
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
  icon?: React.ReactNode
  className?: string
}) => (
  <div
    className={cn(
      "flex flex-col items-center gap-3 rounded-2xl border-2 border-b-4 border-border bg-linear-to-t to-transparent px-4 py-6",
      className
    )}
  >
    <span className="flex items-center gap-1.5 text-4xl leading-none font-black tabular-nums">
      <span className="text-body">{value}</span>
      {icon}
    </span>
    <span className="text-sm font-bold tracking-wide text-body-medium uppercase">
      {label}
    </span>
  </div>
)

const ReviewItem = ({
  number,
  result: { step, picked, correct },
  keyFor,
  source,
}: {
  number: number
  result: ExamResult
  keyFor: (suffix: string) => string
  source?: PageLink
}) => {
  const t = useTranslations("page-courses")
  // Only what matters: what the learner picked and what was right
  const shown = step.options.filter(
    (id) => picked.includes(id) || step.correct.includes(id)
  )

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
      <ul className="m-0 flex list-none flex-col gap-2 ps-10">
        {shown.map((id) => {
          const right = step.correct.includes(id)
          const mine = picked.includes(id)
          return (
            <li
              key={id}
              className={cn(
                "m-0 rounded-xl px-3 py-2",
                right
                  ? "bg-success-light dark:bg-success-dark"
                  : "bg-error-light dark:bg-error-dark"
              )}
            >
              <span className="block text-xs font-bold tracking-wide text-body-medium uppercase">
                {mine
                  ? t("page-courses-exam-your-answer")
                  : t("page-courses-exam-right-answer")}
              </span>
              {t(keyFor(`opt-${id}`))}
            </li>
          )
        })}
      </ul>
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
