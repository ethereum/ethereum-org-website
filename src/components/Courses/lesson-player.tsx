"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle2, Flame, Lightbulb, XCircle } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import type { Lang } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"
import { Progress } from "@/components/ui/progress"

import { cn } from "@/lib/utils/cn"
import { getDirection } from "@/lib/utils/direction"

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
import { useLessonSession } from "./account-sync"
import { toPercent, trackCourseEvent } from "./analytics"
import ExamComplete from "./exam-complete"
import type { ExamFinish, ExamSession } from "./exam-session"
import ExitLessonButton from "./exit-lesson-button"
import LessonComplete from "./lesson-complete"
import ReportProblemButton from "./report-problem-button"
import {
  chunkyButton,
  chunkyButtonSecondary,
  courseText,
  lessonThemeStyle,
} from "./theme"
import {
  type ExamReward,
  type LessonReward,
  useCourseProgress,
} from "./useCourseProgress"

import {
  EXAM_ATTEMPTS_PER_DAY,
  MIN_ANSWER_MS,
  samePicks,
} from "@/lib/courses/rules"

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
   * Mastery check: one attempt per question, graded by the server through
   * `examSession` (the right options never reach the browser before a pass).
   * `lesson.id` is `EXAM_ID`; steps arrive in the server's order.
   */
  exam?: boolean
  examSession?: ExamSession
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
  examSession,
}: LessonPlayerProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const reduceMotion = useReducedMotion()
  const { completeLesson, completeExam } = useCourseProgress()
  const lessonSession = useLessonSession(courseId, lesson.id, !exam)

  // A resumed mastery check picks up after the answers already saved
  const resumed = examSession?.answered ?? {}
  const [index, setIndex] = useState(() =>
    Math.min(Object.keys(resumed).length, lesson.steps.length - 1)
  )
  const [values, setValues] = useState<Record<string, StepValue>>(resumed)
  const [status, setStatus] = useState<StepStatus>("answering")
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({})
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [examFinish, setExamFinish] = useState<ExamFinish | null>(null)
  const [combo, setCombo] = useState(0)
  const [reward, setReward] = useState<LessonReward | ExamReward | null>(null)
  const [accuracy, setAccuracy] = useState(1)

  const restart = () => {
    trackCourseEvent("Lesson restart", `${courseId}/${lesson.id}`)
    if (examSession) return examSession.restart()
    void lessonSession.restart()
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
  const answered = status === "correct"
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

  // Mastery check answers save in the background, one at a time in question
  // order as the server requires, so Next never waits on the network
  const savedRef = useRef<Record<string, string[]>>(resumed)
  const valuesRef = useRef(values)
  useEffect(() => {
    valuesRef.current = values
  }, [values])
  const savingRef = useRef<Promise<boolean>>(Promise.resolve(true))

  /** Queue a save of every answer that differs from what the server holds */
  const saveAnswers = () => {
    savingRef.current = savingRef.current.then(async () => {
      if (!examSession) return true
      for (const { id } of lesson.steps) {
        const picks = valuesRef.current[id] as string[] | undefined
        // Saves go in order: nothing past an unanswered question yet
        if (!picks?.length) break
        const prev = savedRef.current[id]
        if (prev && samePicks(prev, picks)) continue
        if (!(await examSession.submit(id, picks))) return false
        savedRef.current = { ...savedRef.current, [id]: picks }
      }
      return true
    })
    return savingRef.current
  }

  const [confirming, setConfirming] = useState(false)
  const submitRef = useRef<HTMLButtonElement>(null)

  const handleExamNext = async () => {
    if (!examSession || pending) return
    setFailed(false)
    const saving = saveAnswers()
    if (index < total - 1) {
      setIndex(index + 1)
      // A failed save is retried with the next one; meanwhile, say so
      if (!(await saving)) setFailed(true)
      return
    }
    // Submitting can't be undone and uses up an attempt: confirm first
    setConfirming(true)
  }

  const handleExamSubmit = async () => {
    if (!examSession || pending) return
    setConfirming(false)
    setFailed(false)
    // Grading waits for the last saves, then covers the whole check
    setPending(true)
    try {
      if (!(await saveAnswers())) return setFailed(true)
      const result = await examSession.finish()
      if (!result) return setFailed(true)
      trackCourseEvent(
        "Course check complete",
        courseId,
        toPercent(result.score)
      )
      setAccuracy(result.score)
      setExamFinish(result)
      setReward(completeExam(courseId, result.score, result.results ?? {}))
    } finally {
      setPending(false)
    }
  }

  // Mastery check pace: Next unlocks MIN_ANSWER_MS after a question first
  // shows, the pace the server accepts. One timer per question, kept across
  // re-renders and visits; answers resumed from the server don't wait
  const isExamSession = !!examSession
  const shownAtRef = useRef<Record<string, number>>({})
  const [pace, setPace] = useState<{
    id: string
    elapsed: number
    remaining: number
  } | null>(null)
  useEffect(() => {
    if (!isExamSession) return
    const id = step.id
    if (!(id in shownAtRef.current) && valuesRef.current[id]) return
    const shownAt = (shownAtRef.current[id] ??= Date.now())
    const elapsed = Date.now() - shownAt
    const remaining = MIN_ANSWER_MS - elapsed
    if (remaining <= 0) return
    setPace({ id, elapsed, remaining })
    const timer = setTimeout(() => setPace(null), remaining)
    return () => clearTimeout(timer)
  }, [isExamSession, step.id])
  const waiting = pace?.id === step.id

  const handleExamBack = () => {
    setFailed(false)
    setIndex(index - 1)
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
    if (!exam) lessonSession.complete(score)
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
    (status === "correct" || (!isGraded(step) && isReady(step, value)))
  const explored =
    step.type === "interactive" && !isGraded(step) && value === true

  // Enter triggers the footer's enabled button, whichever it is
  const footerKind: "next" | "check" | "retry" | "continue" | null = reward
    ? null
    : examSession
      ? isReady(step, value) && !waiting
        ? "next"
        : null
      : status === "incorrect"
        ? "retry"
        : canContinue
          ? "continue"
          : isGraded(step) && isReady(step, value)
            ? "check"
            : null
  const footerActionRef = useRef<(() => void) | null>(null)
  useEffect(() => {
    footerActionRef.current =
      footerKind === "next"
        ? handleExamNext
        : footerKind === "check"
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

  // Mastery check: the arrows step back and forward (Next's rules apply),
  // mirrored for right-to-left languages
  const { isRtl } = getDirection(locale as Lang)
  const examBackRef = useRef<(() => void) | null>(null)
  useEffect(() => {
    examBackRef.current =
      isExamSession && index > 0 && !pending ? handleExamBack : null
  })
  useEffect(() => {
    if (!isExamSession || reward) return
    const onArrow = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
      if (event.repeat || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.shiftKey) return
      const target = event.target as HTMLElement | null
      if (
        target?.closest(
          "input, textarea, select, [contenteditable], [role=dialog]"
        )
      )
        return
      const forward = (event.key === "ArrowRight") !== isRtl
      const action = forward
        ? footerKind === "next"
          ? footerActionRef.current
          : null
        : examBackRef.current
      if (!action) return
      event.preventDefault()
      action()
    }
    window.addEventListener("keydown", onArrow)
    return () => window.removeEventListener("keydown", onArrow)
  }, [isExamSession, reward, footerKind, isRtl])

  const feedbackKey = (() => {
    if (status === "answering" || !isGraded(step)) return null
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

  // Footer flag: beside the main button from md; on mobile, in the verdict or
  // explanation row when there is one
  const verdictText =
    status === "correct"
      ? "text-green-700 dark:text-green-400"
      : "text-error dark:text-red-400"
  const hasFeedbackRow = explored || (status !== "answering" && isGraded(step))
  const reportFlag = (className?: string) => (
    <ReportProblemButton
      courseId={courseId}
      lessonId={lesson.id}
      stepId={step.id}
      answer={Array.isArray(value) ? value.filter(Boolean) : undefined}
      className={className}
    />
  )

  // One h1 per page: visible on the first step only (under a concept step's
  // art), screen-reader only after that so later steps keep the outline
  const titleText = exam
    ? `${t(`${courseId}-title`)}: ${t("page-courses-exam-title")}`
    : t(`${courseId}-${lesson.id}-title`)
  const titleVisible = index === 0 && !reward
  const titleInStep = titleVisible && step.type === "concept" && !step.takeaway
  const title = (
    <h1
      className={cn(
        "m-0",
        titleVisible
          ? "text-xl text-(--course-strong) dark:text-(--course-bright)"
          : "sr-only"
      )}
    >
      {titleText}
    </h1>
  )

  const renderStep = () => {
    switch (step.type) {
      case "concept":
        return (
          <ConceptStep
            step={step}
            keyFor={keyFor}
            title={titleInStep ? title : undefined}
          />
        )
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
            value={progressValue}
            aria-label={t("page-courses-step-progress", {
              current: index + 1,
              total,
            })}
            className="flex-1 bg-background-highlight *:data-[slot=progress-indicator]:bg-(--course)"
          />
          {/* No verdicts in a mastery check, so no streak to count */}
          {!exam && (
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
          )}
        </div>

        {!titleInStep && title}

        {reward && exam && "passed" in reward ? (
          <ExamComplete
            reward={reward}
            score={accuracy}
            passMark={EXAM_PASS_MARK}
            // Only a pass comes back with results to review
            results={
              examFinish?.review
                ? lesson.steps
                    .filter((s) => s.type === "choice")
                    .map((s) => ({
                      step: { ...s, correct: examFinish.review?.[s.id] ?? [] },
                      picked: (values[s.id] as string[] | undefined) ?? [],
                      correct: !!examFinish.results?.[s.id],
                    }))
                : []
            }
            retakeBlocked={
              examFinish && examFinish.attemptsLeft === 0
                ? t("page-courses-exam-limit-reached")
                : undefined
            }
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
          <div className="mx-auto flex max-w-2xl flex-col gap-4 px-page py-5">
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
                  <p className="m-0 flex-1">{t(keyFor("explain"))}</p>
                  {reportFlag(cn("-my-1 md:hidden", courseText))}
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
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "m-0 flex flex-wrap items-center gap-2 text-xl font-black",
                          verdictText
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
                      {reportFlag(cn("-my-2 md:hidden", verdictText))}
                    </div>
                    {feedback && <p className="m-0 mt-1">{feedback}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {failed && (
              <p role="alert" className="m-0 text-error dark:text-red-400">
                {t("page-courses-exam-request-failed")}
              </p>
            )}

            {/* Main button: full width on mobile, end-aligned from md */}
            <div
              data-footer-actions
              className="flex items-center justify-end gap-3"
            >
              {reportFlag(
                cn(
                  status === "answering" ? courseText : verdictText,
                  hasFeedbackRow && "max-md:hidden"
                )
              )}
              {examSession ? (
                <>
                  {index > 0 && (
                    <Button
                      variant="ghost"
                      onClick={handleExamBack}
                      disabled={pending}
                      className={cn(chunkyButtonSecondary, "w-full md:w-auto")}
                    >
                      {t("page-courses-exam-previous")}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleExamNext}
                    disabled={!isReady(step, value) || pending || waiting}
                    className={cn(
                      chunkyButton,
                      "relative w-full overflow-hidden md:w-auto"
                    )}
                  >
                    {/* Runs with the timer but shows only once an answer is
                        picked early, filling up to when Next unlocks */}
                    {waiting && pace && !reduceMotion && (
                      <motion.span
                        key={pace.id}
                        aria-hidden
                        className={cn(
                          "absolute inset-0 origin-left bg-(--course) transition-opacity rtl:origin-right",
                          isReady(step, value) ? "opacity-60" : "opacity-0"
                        )}
                        initial={{ scaleX: pace.elapsed / MIN_ANSWER_MS }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: pace.remaining / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    <span className="relative">
                      {index < total - 1
                        ? t("page-courses-exam-next")
                        : pending
                          ? t("page-courses-checking")
                          : t("page-courses-exam-submit")}
                    </span>
                  </Button>
                </>
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

      {examSession && (
        <Dialog open={confirming} onOpenChange={setConfirming}>
          <DialogContent
            // Enter confirms: the second deliberate press after Submit
            onOpenAutoFocus={(event) => {
              event.preventDefault()
              submitRef.current?.focus()
            }}
          >
            <DialogHeader>
              <DialogTitle>{t("page-courses-exam-confirm-title")}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {examSession.attemptsLeft > 0
                ? t("page-courses-exam-confirm-description", {
                    count: EXAM_ATTEMPTS_PER_DAY,
                  })
                : t("page-courses-exam-confirm-last")}
            </DialogDescription>
            <DialogFooter className="flex flex-wrap justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" isSecondary>
                  {t("page-courses-exam-keep-reviewing")}
                </Button>
              </DialogClose>
              <Button ref={submitRef} onClick={handleExamSubmit}>
                {t("page-courses-exam-submit")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default LessonPlayer
