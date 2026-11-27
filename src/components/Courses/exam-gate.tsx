"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  BookOpen,
  CalendarClock,
  LockKeyhole,
  ServerOff,
  TimerOff,
  Trophy,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/lib/utils/cn"
import { formatDateTime } from "@/lib/utils/date"
import { numberFormat } from "@/lib/utils/numbers"

import type { ExamStep, LessonStep, PageLink } from "@/data/courses"

import { requestJson } from "../Account/api"
import SignInDialog from "../Account/sign-in-dialog"
import { useAccount } from "../Account/use-account"

import { syncProgress } from "./account-sync"
import type { ExamFinish, ExamSession } from "./exam-session"
import LessonPlayer from "./lesson-player"
import { chunkyButton, chunkyButtonSecondary, lessonThemeStyle } from "./theme"

import { courseHref, EXAM_ID, EXAM_PASS_MARK } from "@/lib/courses/constants"
import { EXAM_ATTEMPT_TTL_MS, MIN_ANSWER_MS } from "@/lib/courses/rules"

interface Attempt {
  attemptId: string
  questionIds: string[]
  answered: { questionId: string; optionIds: string[] }[]
  attemptsLeft: number
}

type Gate =
  | { kind: "loading" }
  | { kind: "intro"; attemptsLeft: number }
  | { kind: "ready"; attempt: Attempt }
  | { kind: "limit"; retryAt: string }
  | { kind: "expired" }
  | { kind: "unavailable" }

/** What the server says when an attempt ran out of time */
interface Expired {
  attemptsLeft?: number
  retryAt?: string
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface ExamGateProps {
  courseId: string
  questions: ExamStep[]
  /** The course's lessons, whose titles list what Course Mastery covers */
  lessonIds: string[]
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
  lessonIds,
  nextCourseId,
  sources,
}: ExamGateProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { status, ended } = useAccount()
  const [gate, setGate] = useState<Gate>({ kind: "loading" })
  const lastAnswerAt = useRef(0)

  // Opening the page only resumes an unfinished attempt: a new one starts,
  // and counts toward the day's, from the intro's button
  const start = useCallback(
    async (resumeOnly = false) => {
      setGate({ kind: "loading" })
      const result = await requestJson<
        (Attempt | { attemptId?: never; attemptsLeft: number }) & {
          retryAt?: string
        }
      >("/api/courses/exams/start", { courseId, resumeOnly })
      const data = result.data
      if (result.ok && data?.attemptId) {
        lastAnswerAt.current = Date.now()
        setGate({ kind: "ready", attempt: data })
      } else if (result.ok && data)
        setGate({ kind: "intro", attemptsLeft: data.attemptsLeft })
      else if (result.status === 429 && data?.retryAt)
        setGate({ kind: "limit", retryAt: data.retryAt })
      else setGate({ kind: "unavailable" })
    },
    [courseId]
  )

  useEffect(() => {
    if (status === "signed-in") void start(true)
  }, [status, start])

  // Ungraded and still counted: another go if today allows, else tomorrow
  const expire = (data: Expired | null) =>
    setGate(
      data?.retryAt && !data.attemptsLeft
        ? { kind: "limit", retryAt: data.retryAt }
        : { kind: "expired" }
    )

  const frame = (
    icon: React.ReactNode,
    title: string,
    body: string,
    actions?: React.ReactNode,
    details?: React.ReactNode
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
      {details}
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
      // Signed out mid-visit (the session ended): say so
      ended
        ? t("page-courses-exam-signed-out-title")
        : t("page-courses-exam-sign-in-title"),
      ended
        ? t("page-courses-exam-signed-out-description")
        : t("page-courses-exam-sign-in-description"),
      <SignInDialog
        onSignedIn={() => void syncProgress(true)}
        trigger={
          <Button variant="ghost" className={cn(chunkyButton, "w-full")}>
            {t("page-courses-exam-sign-in")}
          </Button>
        }
      />,
      lessonIds.length > 0 && (
        <Card variant="nested" size="md" border className="w-full text-start">
          <CardContent>
            <h2 className="m-0 text-md font-bold">
              {t("page-courses-exam-topics")}
            </h2>
            <ul className="m-0 flex list-none flex-col gap-2">
              {lessonIds.map((id) => (
                <li key={id} className="m-0 flex items-start gap-2">
                  <BookOpen
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-(--course-strong) dark:text-(--course-bright)"
                  />
                  {t(`${courseId}-${id}-title`)}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )
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

  if (gate.kind === "intro")
    return frame(
      <Trophy className={iconClass} aria-hidden />,
      t("page-courses-exam-start-title"),
      t("page-courses-exam-start-description", {
        questions: questions.length,
        mark: numberFormat(locale, { style: "percent" }).format(EXAM_PASS_MARK),
        hours: EXAM_ATTEMPT_TTL_MS / 3_600_000,
        left: gate.attemptsLeft,
      }),
      <Button
        variant="ghost"
        className={cn(chunkyButton, "w-full")}
        onClick={() => void start()}
      >
        {t("page-courses-exam-start")}
      </Button>
    )

  if (gate.kind === "expired")
    return frame(
      <TimerOff className={iconClass} aria-hidden />,
      t("page-courses-exam-expired-title"),
      t("page-courses-exam-expired-description", {
        hours: EXAM_ATTEMPT_TTL_MS / 3_600_000,
      }),
      <Button
        variant="ghost"
        className={cn(chunkyButton, "w-full")}
        onClick={() => void start()}
      >
        {t("page-courses-try-again")}
      </Button>
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
        const result = await requestJson<{ retryAfterMs?: number } & Expired>(
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
        if (result.status === 410) {
          expire(result.data)
          return false
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
      if (result.status === 410) {
        expire(result.data)
        return null
      }
      if (!result.ok) return null
      void syncProgress(true)
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
