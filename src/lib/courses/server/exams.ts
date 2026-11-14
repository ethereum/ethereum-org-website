import { and, asc, eq, gt, gte, isNull, sql } from "drizzle-orm"
import { randomInt, randomUUID } from "node:crypto"
import * as z from "zod"

import { dayInZone } from "@/lib/utils/date"

import { EXAM_PASS_MARK, getCourse } from "@/data/courses"

import { examAttemptsLeft, MIN_ANSWER_MS, samePicks } from "../rules"

import { apiError, json, learnerDay, readBody, type SessionUser } from "./api"
import { getExamKey } from "./exam-key"

import { getDb } from "@/lib/db"
import {
  courseExamAnswer,
  courseExamAttempt,
  courseMastery,
} from "@/lib/db/schema"

const startBody = z.object({ courseId: z.string() })
const answerBody = z.object({
  attemptId: z.string(),
  questionId: z.string(),
  optionIds: z.array(z.string()).max(10),
})
const finishBody = z.object({ attemptId: z.string() })

const shuffle = <T>(items: T[]) => {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

const answersFor = (attemptId: string) =>
  getDb()
    .select()
    .from(courseExamAnswer)
    .where(eq(courseExamAnswer.attemptId, attemptId))
    .orderBy(asc(courseExamAnswer.answeredAt))

const DAY_MS = 86_400_000

/** When this learner's recent attempts at a course started (last day or so) */
export const recentAttempts = async (
  userId: string,
  since: Date,
  courseId?: string
) =>
  getDb()
    .select({
      courseId: courseExamAttempt.courseId,
      startedAt: courseExamAttempt.startedAt,
    })
    .from(courseExamAttempt)
    .where(
      and(
        eq(courseExamAttempt.userId, userId),
        gt(courseExamAttempt.startedAt, since),
        courseId ? eq(courseExamAttempt.courseId, courseId) : undefined
      )
    )

/** Attempts left today and when the next opens, for one course */
const attemptsFor = async (
  userId: string,
  courseId: string,
  day: Awaited<ReturnType<typeof learnerDay>>
) => {
  const now = new Date()
  const since = new Date(Math.min(day.start.getTime(), now.getTime() - DAY_MS))
  const rows = await recentAttempts(userId, since, courseId)
  return examAttemptsLeft(
    rows.map(({ startedAt }) => startedAt),
    day.start,
    day.next,
    now
  )
}

const ownAttempt = async (attemptId: string, userId: string) => {
  const [attempt] = await getDb()
    .select()
    .from(courseExamAttempt)
    .where(
      and(
        eq(courseExamAttempt.id, attemptId),
        eq(courseExamAttempt.userId, userId)
      )
    )
  return attempt
}

/**
 * Starts (or resumes today's unfinished) attempt: the questions in a fresh
 * order, without answers. Starting counts toward the daily limit, so walking
 * away mid-check doesn't buy a free look.
 */
export const startExam = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, startBody)
  const course = body && getCourse(body.courseId)
  if (!course?.exam.length) return apiError("bad-request", 400)
  const key = getExamKey()?.[course.id]
  if (!key) return apiError("unavailable", 503)

  const db = getDb()
  const day = await learnerDay(request, user)
  const [open] = await db
    .select()
    .from(courseExamAttempt)
    .where(
      and(
        eq(courseExamAttempt.userId, user.id),
        eq(courseExamAttempt.courseId, course.id),
        gte(courseExamAttempt.startedAt, day.start),
        isNull(courseExamAttempt.finishedAt)
      )
    )
  const { left, retryAt } = await attemptsFor(user.id, course.id, day)
  if (open) {
    const answers = await answersFor(open.id)
    return json({
      attemptId: open.id,
      questionIds: open.questionIds,
      // The picks only: whether they were right stays hidden until the end
      answered: answers.map(({ questionId, optionIds }) => ({
        questionId,
        optionIds,
      })),
      attemptsLeft: left,
    })
  }
  if (!left) return apiError("limit", 429, { retryAt: retryAt?.toISOString() })

  const attempt = {
    id: randomUUID(),
    userId: user.id,
    courseId: course.id,
    day: dayInZone(day.timeZone),
    questionIds: shuffle(course.exam.map(({ id }) => id)),
  }
  await db.insert(courseExamAttempt).values(attempt)
  return json({
    attemptId: attempt.id,
    questionIds: attempt.questionIds,
    answered: [],
    attemptsLeft: left - 1,
  })
}

/**
 * Saves one answer, no sooner than `MIN_ANSWER_MS` after the previous save.
 * The next question or one already answered (going back to change it). Says
 * nothing about whether it's right: the whole check is graded at the end.
 */
export const answerExam = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, answerBody)
  if (!body) return apiError("bad-request", 400)
  const attempt = await ownAttempt(body.attemptId, user.id)
  if (!attempt || attempt.finishedAt) return apiError("invalid-attempt", 400)
  const right = getExamKey()?.[attempt.courseId]?.[body.questionId]
  if (!right) return apiError("unavailable", 503)

  const answers = await answersFor(attempt.id)
  const at = attempt.questionIds.indexOf(body.questionId)
  if (at < 0 || at > answers.length)
    return apiError("out-of-order", 409, {
      expected: attempt.questionIds[answers.length],
    })

  // `answersFor` sorts by save time, so the last one is the latest save
  const servedAt = answers.at(-1)?.answeredAt ?? attempt.startedAt
  const wait = MIN_ANSWER_MS - (Date.now() - servedAt.getTime())
  if (wait > 0) return apiError("too-fast", 425, { retryAfterMs: wait })

  const answer = {
    optionIds: body.optionIds,
    correct: samePicks(body.optionIds, right),
    answeredAt: new Date(),
  }
  await getDb()
    .insert(courseExamAnswer)
    .values({ attemptId: attempt.id, questionId: body.questionId, ...answer })
    .onConflictDoUpdate({
      target: [courseExamAnswer.attemptId, courseExamAnswer.questionId],
      set: answer,
    })
  return json({ saved: true })
}

/**
 * Scores the attempt (unanswered questions count as wrong). A pass records
 * the verified trophy and reveals each result and the right options for
 * review. A fail gives the score only: naming the misses would hand the next
 * attempt the answers by elimination.
 */
export const finishExam = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, finishBody)
  if (!body) return apiError("bad-request", 400)
  const attempt = await ownAttempt(body.attemptId, user.id)
  if (!attempt || attempt.finishedAt) return apiError("invalid-attempt", 400)
  const key = getExamKey()?.[attempt.courseId]
  if (!key) return apiError("unavailable", 503)

  const answers = await answersFor(attempt.id)
  const results = Object.fromEntries(
    attempt.questionIds.map((id) => [
      id,
      answers.find(({ questionId }) => questionId === id)?.correct ?? false,
    ])
  )
  const score =
    Object.values(results).filter(Boolean).length / attempt.questionIds.length
  const passed = score >= EXAM_PASS_MARK
  const now = new Date()
  const db = getDb()
  await db
    .update(courseExamAttempt)
    .set({ finishedAt: now, score, passed })
    .where(eq(courseExamAttempt.id, attempt.id))
  if (passed)
    await db
      .insert(courseMastery)
      .values({
        userId: user.id,
        courseId: attempt.courseId,
        verified: true,
        score,
        passedAt: now,
      })
      .onConflictDoUpdate({
        target: [courseMastery.userId, courseMastery.courseId],
        set: {
          verified: true,
          score: sql`greatest(${courseMastery.score}, excluded.score)`,
          passedAt: sql`case when ${courseMastery.verified} then ${courseMastery.passedAt} else excluded.passed_at end`,
        },
      })

  const day = await learnerDay(request, user)
  const { left, retryAt } = await attemptsFor(user.id, attempt.courseId, day)
  return json({
    score,
    passed,
    results: passed ? results : undefined,
    review: passed
      ? Object.fromEntries(attempt.questionIds.map((id) => [id, key[id]]))
      : undefined,
    attemptsLeft: left,
    retryAt: retryAt?.toISOString(),
  })
}
