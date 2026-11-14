"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CalendarClock, LockKeyhole, ServerOff } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils/cn"
import { formatDateTime } from "@/lib/utils/date"

import {
  courseHref,
  EXAM_ID,
  type ExamStep,
  type LessonStep,
  type PageLink,
} from "@/data/courses"

import { requestJson } from "../Account/api"
import SignInDialog from "../Account/sign-in-dialog"
import { useAccount } from "../Account/use-account"

import { syncProgress } from "./account-sync"
import type { ExamFinish, ExamSession } from "./exam-session"
import LessonPlayer from "./lesson-player"
import { chunkyButton, chunkyButtonSecondary, lessonThemeStyle } from "./theme"

import { MIN_ANSWER_MS } from "@/lib/courses/rules"

interface Attempt {
  attemptId: string
  questionIds: string[]
  answered: { questionId: string; optionIds: string[] }[]
  attemptsLeft: number
}

type Gate =
  | { kind: "loading" }
  | { kind: "ready"; attempt: Attempt }
  | { kind: "limit"; retryAt: string }
  | { kind: "unavailable" }

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface ExamGateProps {
  courseId: string
  questions: ExamStep[]
  nextCourseId?: string
  sources?: Record<string, PageLink>
}

/**
 * Course Mastery is graded by the server, so it needs an account: lessons
 * stay open to everyone, the trophy is what an account can vouch for.
 */
const ExamGate = ({
  courseId,
  questions,
  nextCourseId,
  sources,
}: ExamGateProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { status } = useAccount()
  const [gate, setGate] = useState<Gate>({ kind: "loading" })
  const lastAnswerAt = useRef(0)

  const start = useCallback(async () => {
    setGate({ kind: "loading" })
    const result = await requestJson<Attempt & { retryAt?: string }>(
      "/api/courses/exams/start",
      { courseId }
    )
    if (result.ok && result.data) {
      lastAnswerAt.current = Date.now()
      setGate({ kind: "ready", attempt: result.data })
    } else if (result.status === 429 && result.data?.retryAt)
      setGate({ kind: "limit", retryAt: result.data.retryAt })
    else setGate({ kind: "unavailable" })
  }, [courseId])

  useEffect(() => {
    if (status === "signed-in") void start()
  }, [status, start])

  const frame = (
    icon: React.ReactNode,
    title: string,
    body: string,
    actions?: React.ReactNode
  ) => (
    <main
      style={lessonThemeStyle()}
      className="mx-auto flex min-h-[60dvh] max-w-md flex-col items-center justify-center gap-4 px-page py-10 text-center"
    >
      <div className="grid size-20 place-items-center rounded-full bg-(--course-soft) text-(--course-strong) dark:text-(--course-bright)">
        {icon}
      </div>
      <h1 className="m-0 text-h3 font-black">{title}</h1>
      <p className="m-0 text-lg text-body-medium">{body}</p>
      <div className="mt-2 flex w-full flex-col gap-3">
        {actions}
        <ButtonLink
          href={courseHref(courseId)}
          variant="ghost"
          hideArrow
          className={chunkyButtonSecondary}
        >
          {t("page-courses-exam-back")}
        </ButtonLink>
      </div>
    </main>
  )

  const iconClass = "size-10"

  if (
    status === "loading" ||
    (status === "signed-in" && gate.kind === "loading")
  )
    return (
      <main className="grid min-h-[60dvh] place-items-center">
        <Spinner />
      </main>
    )

  if (status === "unavailable" || gate.kind === "unavailable")
    return frame(
      <ServerOff className={iconClass} aria-hidden />,
      t("page-courses-exam-unavailable-title"),
      t("page-courses-exam-unavailable-description")
    )

  if (status === "signed-out")
    return frame(
      <LockKeyhole className={iconClass} aria-hidden />,
      t("page-courses-exam-sign-in-title"),
      t("page-courses-exam-sign-in-description"),
      <SignInDialog
        onSignedIn={() => void syncProgress(true)}
        trigger={
          <Button variant="ghost" className={cn(chunkyButton, "w-full")}>
            {t("page-courses-exam-sign-in")}
          </Button>
        }
      />
    )

  if (gate.kind === "limit")
    return frame(
      <CalendarClock className={iconClass} aria-hidden />,
      t("page-courses-exam-limit-title"),
      t("page-courses-exam-limit-description", {
        // A date in the learner's zone, which the server counts days in
        date: formatDateTime(locale, new Date(gate.retryAt), {
          dateStyle: "medium",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })
    )

  if (gate.kind !== "ready") return null
  const { attempt } = gate
  const byId = new Map(questions.map((q) => [q.id, q]))
  // The player grades nothing itself here: `correct` stays empty
  const steps = attempt.questionIds.flatMap((id) => {
    const question = byId.get(id)
    return question ? [{ ...question, correct: [] } as LessonStep] : []
  })

  const session: ExamSession = {
    attemptsLeft: attempt.attemptsLeft,
    answered: Object.fromEntries(
      attempt.answered.map(({ questionId, optionIds }) => [
        questionId,
        optionIds,
      ])
    ),
    submit: async (questionId, optionIds) => {
      // The server refuses answers sooner than MIN_ANSWER_MS apart
      const wait = MIN_ANSWER_MS + 150 - (Date.now() - lastAnswerAt.current)
      if (wait > 0) await sleep(wait)
      for (let tries = 0; tries < 3; tries++) {
        const result = await requestJson<{ retryAfterMs?: number }>(
          "/api/courses/exams/answer",
          {
            attemptId: attempt.attemptId,
            questionId,
            optionIds,
          }
        )
        if (result.status === 425) {
          await sleep((result.data?.retryAfterMs ?? 500) + 100)
          continue
        }
        if (!result.ok) return false
        lastAnswerAt.current = Date.now()
        return true
      }
      return false
    },
    finish: async () => {
      const result = await requestJson<ExamFinish>(
        "/api/courses/exams/finish",
        { attemptId: attempt.attemptId }
      )
      if (result.ok) void syncProgress(true)
      return result.data
    },
    restart: () => void start(),
  }

  return (
    <main>
      <LessonPlayer
        key={attempt.attemptId}
        exam
        examSession={session}
        courseId={courseId}
        lesson={{ id: EXAM_ID, steps }}
        nextCourseId={nextCourseId}
        sources={sources}
      />
    </main>
  )
}

export default ExamGate
