"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Flame, Lightbulb, XCircle } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"

import {
  courseHref,
  EXAM_PASS_MARK,
  examHref,
  type Lesson,
  lessonHref,
  type LessonStep,
  type PageLink,
  stepKey,
} from "@/data/courses"

import ChoiceStep, {
  choiceFeedbackKey,
  isChoiceCorrect,
} from "./steps/choice-step"
import ConceptStep from "./steps/concept-step"
import FillStep, { isFillComplete, isFillCorrect } from "./steps/fill-step"
import InteractiveStep, { isGradedWidget } from "./steps/interactive-step"
import MatchStep, { isMatchComplete, isMatchCorrect } from "./steps/match-step"
import OrderStep, { isOrderComplete, isOrderCorrect } from "./steps/order-step"
import type { StepStatus } from "./steps/types"
import type { WidgetAnswer } from "./widgets/types"
import { toPercent, trackCourseEvent } from "./analytics"
import ExamComplete from "./exam-complete"
import ExitLessonButton from "./exit-lesson-button"
import LessonComplete from "./lesson-complete"
import ReportProblemButton from "./report-problem-button"
import { chunkyButton, lessonThemeStyle } from "./theme"
import {
  type ExamReward,
  type LessonReward,
  useCourseProgress,
} from "./useCourseProgress"

interface LessonPlayerProps {
  courseId: string
  /** The steps to play; a course check passes its questions as a lesson */
  lesson: Pick<Lesson, "id" | "steps">
  /** Lesson only: ethereum.org page offered on the completion screen */
  learnMore?: PageLink
  /** Course check only: page backing each question, by question id */
  sources?: Record<string, PageLink>
  nextLessonId?: string
  /**
   * Final exam: one attempt per question with the answer revealed, scored
   * against `EXAM_PASS_MARK`. `lesson.id` is `EXAM_ID`.
   */
  exam?: boolean
  /** Exam only: where Continue goes after a pass */
  nextCourseId?: string
  /** Last lesson of a course with a check: completion points to it */
  examAfter?: boolean
}

/** Answer per step type: picks, placed order, widget done, or puzzle answer */
type StepValue = string[] | boolean | WidgetAnswer

const isWidgetAnswer = (value: StepValue | undefined): value is WidgetAnswer =>
  typeof value === "object" && !Array.isArray(value)

/** Steps with a right answer; they count toward accuracy and the combo */
const isGraded = (step: LessonStep) =>
  step.type === "interactive"
    ? isGradedWidget(step.widget)
    : step.type !== "concept"

const isReady = (step: LessonStep, value: StepValue | undefined) => {
  switch (step.type) {
    case "concept":
      return true
    case "choice":
      return Array.isArray(value) && value.length > 0
    case "order":
      return Array.isArray(value) && isOrderComplete(step, value)
    case "match":
      return Array.isArray(value) && isMatchComplete(step, value)
    case "fill":
      return Array.isArray(value) && isFillComplete(step, value)
    case "interactive":
      return value === true || isWidgetAnswer(value)
  }
}

const grade = (step: LessonStep, value: StepValue | undefined) => {
  switch (step.type) {
    case "concept":
      return true
    case "interactive":
      return isWidgetAnswer(value) ? value.correct : value === true
    case "choice":
      return isChoiceCorrect(step, value as string[])
    case "order":
      return isOrderCorrect(step, value as string[])
    case "match":
      return isMatchCorrect(step, value as string[])
    case "fill":
      return isFillCorrect(step, value as string[])
  }
}

const COMBO_MIN = 3

const LESSON_CSS = `@keyframes course-shake {
  0%, 100% { transform: translateX(0) }
  25% { transform: translateX(-6px) }
  75% { transform: translateX(6px) }
}`

const LessonPlayer = ({
  courseId,
  lesson,
  nextLessonId,
  exam,
  nextCourseId,
  examAfter,
  learnMore,
  sources,
}: LessonPlayerProps) => {
  const t = useTranslations("page-courses")
  const reduceMotion = useReducedMotion()
  const { completeLesson, completeExam } = useCourseProgress()

  const [index, setIndex] = useState(0)
  const [values, setValues] = useState<Record<string, StepValue>>({})
  const [status, setStatus] = useState<StepStatus>("answering")
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({})
  const [combo, setCombo] = useState(0)
  const [reward, setReward] = useState<LessonReward | ExamReward | null>(null)
  const [accuracy, setAccuracy] = useState(1)

  const restart = () => {
    trackCourseEvent("Lesson restart", `${courseId}/${lesson.id}`)
    setIndex(0)
    setValues({})
    setStatus("answering")
    setFirstTry({})
    setCombo(0)
    setReward(null)
    window.scrollTo({ top: 0 })
  }

  const stepRef = useRef<HTMLDivElement>(null)

  const step = lesson.steps[index]
  const keyFor = (suffix: string) =>
    stepKey(courseId, lesson.id, step.id, suffix)
  const value = values[step.id]
  const setValue = (next: StepValue) =>
    setValues((prev) => ({ ...prev, [step.id]: next }))

  // Move focus with the step so screen readers announce the new content
  useEffect(() => {
    if (index > 0) stepRef.current?.focus()
  }, [index])

  const total = lesson.steps.length
  const answered = status === "correct" || (exam && status === "incorrect")
  const progressValue = reward
    ? 100
    : ((index + (answered ? 1 : 0)) / total) * 100

  const recordResult = (correct: boolean) => {
    if (step.id in firstTry) return
    trackCourseEvent(
      "Step answer",
      `${courseId}/${lesson.id}/${step.id}`,
      correct ? 1 : 0
    )
    setFirstTry((prev) => ({ ...prev, [step.id]: correct }))
    setCombo((c) => (correct ? c + 1 : 0))
  }

  const handleCheck = () => {
    const correct = grade(step, value)
    recordResult(correct)
    setStatus(correct ? "correct" : "incorrect")
  }

  // Sandbox widgets have no verdict: doing the thing unlocks Continue
  const handleWidgetComplete = () => setValue(true)

  const handleRetry = () => {
    // A single-answer pick is cleared; multi picks and placed steps stay so
    // the learner can adjust only the highlighted ones.
    if (step.type === "choice" && !step.multi) setValue([])
    setStatus("answering")
  }

  const handleEdit = (next: StepValue) => {
    setValue(next)
    if (status === "incorrect") setStatus("answering")
  }

  // Puzzle widgets report an answer; the Check button grades it
  const handleWidgetAnswer = (answer: WidgetAnswer | null) => {
    if (answer) handleEdit(answer)
    else {
      setValues((prev) => {
        const next = { ...prev }
        delete next[step.id]
        return next
      })
      if (status === "incorrect") setStatus("answering")
    }
  }

  const handleContinue = () => {
    if (index < total - 1) {
      setIndex(index + 1)
      setStatus("answering")
      return
    }
    const graded = lesson.steps.filter(isGraded)
    const results = Object.fromEntries(
      graded.map(({ id }) => [id, !!firstTry[id]])
    )
    const score = graded.length
      ? graded.filter(({ id }) => results[id]).length / graded.length
      : 1
    setAccuracy(score)
    if (exam)
      trackCourseEvent("Course check complete", courseId, toPercent(score))
    else
      trackCourseEvent(
        "Lesson complete",
        `${courseId}/${lesson.id}`,
        toPercent(score)
      )
    setReward(
      exam
        ? completeExam(courseId, score, results)
        : completeLesson(courseId, lesson.id, score, results)
    )
  }

  const canContinue =
    !reward &&
    (status === "correct" ||
      (exam && status === "incorrect") ||
      (!isGraded(step) && isReady(step, value)))
  const explored =
    step.type === "interactive" && !isGraded(step) && value === true

  // Enter triggers the footer's enabled button, whichever it is
  const footerKind: "check" | "retry" | "continue" | null = reward
    ? null
    : status === "incorrect"
      ? exam
        ? "continue"
        : "retry"
      : canContinue
        ? "continue"
        : isGraded(step) && isReady(step, value)
          ? "check"
          : null
  const footerActionRef = useRef<(() => void) | null>(null)
  useEffect(() => {
    footerActionRef.current =
      footerKind === "check"
        ? handleCheck
        : footerKind === "retry"
          ? handleRetry
          : footerKind === "continue"
            ? handleContinue
            : null
  })

  useEffect(() => {
    if (!footerKind) return
    const onEnter = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || event.repeat || event.isComposing) return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return
      const target = event.target as HTMLElement | null
      // Where Enter already means something: text entry, links, popup
      // triggers, dialogs, and the footer button itself (its native click)
      if (
        target?.closest(
          "input:not([type=range]), textarea, select, [contenteditable], a, [aria-haspopup], [role=dialog], [data-footer-actions]"
        )
      )
        return
      // While the answer can still change, a focused control (tile, widget
      // button) keeps its own Enter; radios and checkboxes don't use Enter
      if (
        footerKind !== "continue" &&
        target?.closest("button:not([role=radio]):not([role=checkbox])")
      )
        return
      // Also stops a still-focused control re-firing after Check
      event.preventDefault()
      footerActionRef.current?.()
    }
    window.addEventListener("keydown", onEnter, true)
    return () => window.removeEventListener("keydown", onEnter, true)
  }, [footerKind])

  const feedbackKey = (() => {
    if (status === "answering" || !isGraded(step)) return null
    if (exam) return keyFor("explain")
    if (step.type === "choice")
      return (
        choiceFeedbackKey(step, value as string[], keyFor) ??
        "page-courses-missed-option"
      )
    if (status === "correct") return keyFor("explain")
    if (step.type === "order") return "page-courses-order-wrong"
    if (step.type === "match") return "page-courses-match-wrong"
    if (step.type === "fill") return "page-courses-fill-wrong"
    return null
  })()
  const feedback =
    status === "incorrect" && isWidgetAnswer(value)
      ? value.hint
      : feedbackKey && t(feedbackKey)

  const showCombo =
    status === "correct" && combo >= COMBO_MIN && firstTry[step.id]

  const renderStep = () => {
    switch (step.type) {
      case "concept":
        return <ConceptStep step={step} keyFor={keyFor} />
      case "choice":
        return (
          <ChoiceStep
            step={step}
            keyFor={keyFor}
            value={(value as string[]) ?? []}
            onChange={handleEdit}
            status={status}
            reveal={exam}
          />
        )
      case "order":
        return (
          <OrderStep
            step={step}
            keyFor={keyFor}
            value={(value as string[]) ?? []}
            onChange={handleEdit}
            status={status}
          />
        )
      case "match":
        return (
          <MatchStep
            step={step}
            keyFor={keyFor}
            value={(value as string[]) ?? []}
            onChange={handleEdit}
            status={status}
          />
        )
      case "fill":
        return (
          <FillStep
            step={step}
            keyFor={keyFor}
            value={(value as string[]) ?? []}
            onChange={handleEdit}
            status={status}
          />
        )
      case "interactive":
        return (
          <InteractiveStep
            step={step}
            keyFor={keyFor}
            onComplete={handleWidgetComplete}
            onAnswer={handleWidgetAnswer}
            locked={status === "correct"}
            wrong={status === "incorrect"}
          />
        )
    }
  }

  return (
    <div
      style={lessonThemeStyle()}
      className="flex min-h-[calc(100dvh-5rem)] flex-col"
    >
      <style>{LESSON_CSS}</style>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-page pt-6 pb-10">
        <div className="flex items-center gap-3">
          <ExitLessonButton
            href={courseHref(courseId)}
            confirm={!reward && (index > 0 || Object.keys(values).length > 0)}
            onLeave={() =>
              !reward &&
              trackCourseEvent(
                "Lesson exit",
                `${courseId}/${lesson.id}/${step.id}`,
                undefined,
                { immediate: true }
              )
            }
          />
          <Progress
            shine
            value={progressValue}
            aria-label={t("page-courses-step-progress", {
              current: index + 1,
              total,
            })}
            className="flex-1 bg-background-highlight *:data-[slot=progress-indicator]:bg-(--course)"
          />
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 font-bold tabular-nums transition-colors",
              combo > 0
                ? "text-orange-700 dark:text-orange-400"
                : "text-disabled"
            )}
            aria-hidden
          >
            <Flame className="size-5" />
            {combo}
          </span>
        </div>

        <h1 className="m-0 text-sm font-bold tracking-wide text-(--course-strong) uppercase dark:text-(--course-bright)">
          {exam
            ? `${t(`${courseId}-title`)}: ${t("page-courses-exam-title")}`
            : t(`${courseId}-${lesson.id}-title`)}
        </h1>

        {reward && exam && "passed" in reward ? (
          <ExamComplete
            reward={reward}
            score={accuracy}
            passMark={EXAM_PASS_MARK}
            results={lesson.steps
              .filter((s) => s.type === "choice")
              .map((s) => ({
                step: s,
                picked: (values[s.id] as string[] | undefined) ?? [],
                correct: !!firstTry[s.id],
              }))}
            keyFor={(stepId, suffix) =>
              stepKey(courseId, lesson.id, stepId, suffix)
            }
            courseHref={courseHref(courseId)}
            nextCourseId={nextCourseId}
            sources={sources}
            onRetake={restart}
          />
        ) : reward ? (
          <LessonComplete
            reward={reward}
            accuracy={accuracy}
            courseHref={courseHref(courseId)}
            nextHref={
              nextLessonId
                ? lessonHref(courseId, nextLessonId)
                : examAfter
                  ? examHref(courseId)
                  : undefined
            }
            nextIsExam={!nextLessonId && examAfter}
            learnMore={learnMore}
          />
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.id}
              ref={stepRef}
              tabIndex={-1}
              className="outline-none"
              initial={reduceMotion ? false : { opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            >
              <span className="sr-only">
                {t("page-courses-step-progress", { current: index + 1, total })}
              </span>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {!reward && (
        <div
          aria-live="polite"
          className={cn(
            "sticky bottom-0 z-10 border-t-2 transition-colors duration-200",
            status === "answering" &&
              (explored
                ? "border-transparent bg-(--course-soft)"
                : "border-border bg-background"),
            status === "correct" &&
              "border-transparent bg-success-light dark:bg-success-dark",
            status === "incorrect" &&
              "border-transparent bg-error-light dark:bg-error-dark"
          )}
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-4 px-page py-5 md:flex-row md:items-center md:justify-between">
            <AnimatePresence mode="wait">
              {explored && (
                <motion.div
                  key="explored"
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3"
                >
                  <Lightbulb
                    className="size-8 shrink-0 text-(--course-strong) dark:text-(--course-bright)"
                    aria-hidden
                  />
                  <p className="m-0">{t(keyFor("explain"))}</p>
                </motion.div>
              )}
              {status !== "answering" && isGraded(step) && (
                <motion.div
                  key={status}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3"
                >
                  {status === "correct" ? (
                    <CheckCircle2
                      className="size-10 shrink-0 text-green-700 dark:text-green-400"
                      aria-hidden
                    />
                  ) : (
                    <XCircle
                      className="size-10 shrink-0 text-error dark:text-red-400"
                      aria-hidden
                    />
                  )}
                  <div>
                    <p
                      className={cn(
                        "m-0 flex flex-wrap items-center gap-2 text-xl font-black",
                        status === "correct"
                          ? "text-green-700 dark:text-green-400"
                          : "text-error dark:text-red-400"
                      )}
                    >
                      {status === "correct"
                        ? t("page-courses-correct")
                        : t("page-courses-incorrect")}
                      {showCombo && (
                        <motion.span
                          initial={reduceMotion ? false : { scale: 0.4 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 rounded-full bg-orange-700 px-2 py-0.5 text-sm text-white"
                        >
                          <Flame className="size-4" aria-hidden />
                          {t("page-courses-combo", { count: combo })}
                        </motion.span>
                      )}
                    </p>
                    {feedback && <p className="m-0 mt-1">{feedback}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              data-footer-actions
              className="flex shrink-0 items-center justify-end gap-3 md:ms-auto"
            >
              <ReportProblemButton
                courseId={courseId}
                lessonId={lesson.id}
                stepId={step.id}
                answer={
                  Array.isArray(value) ? value.filter(Boolean) : undefined
                }
              />
              {status === "incorrect" && exam ? (
                <Button
                  variant="ghost"
                  onClick={handleContinue}
                  className={cn(
                    chunkyButton,
                    "w-full border-red-800 bg-error md:w-auto"
                  )}
                >
                  {t("page-courses-continue")}
                </Button>
              ) : status === "incorrect" ? (
                <Button
                  variant="ghost"
                  onClick={handleRetry}
                  className={cn(
                    chunkyButton,
                    "w-full border-red-800 bg-error md:w-auto"
                  )}
                >
                  {t("page-courses-try-again")}
                </Button>
              ) : canContinue ? (
                <Button
                  variant="ghost"
                  onClick={handleContinue}
                  className={cn(
                    chunkyButton,
                    "w-full md:w-auto",
                    status === "correct" && "border-green-800 bg-green-700"
                  )}
                >
                  {t("page-courses-continue")}
                </Button>
              ) : !isGraded(step) ? (
                <Button
                  variant="ghost"
                  disabled
                  className={cn(chunkyButton, "w-full md:w-auto")}
                >
                  {t("page-courses-continue")}
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleCheck}
                  disabled={!isReady(step, value)}
                  className={cn(chunkyButton, "w-full md:w-auto")}
                >
                  {t("page-courses-check")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LessonPlayer
