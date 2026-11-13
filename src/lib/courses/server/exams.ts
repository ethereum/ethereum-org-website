import { and, asc, eq, isNull, sql } from "drizzle-orm"
import { randomInt, randomUUID } from "node:crypto"
import * as z from "zod"

import { EXAM_PASS_MARK, getCourse } from "@/data/courses"

import { EXAM_ATTEMPTS_PER_DAY, MIN_ANSWER_MS, samePicks } from "../rules"

import { apiError, json, readBody, type SessionUser, utcDay } from "./api"
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

const nextUtcMidnight = (now = new Date()) =>
  new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  ).toISOString()

const answersFor = (attemptId: string) =>
  getDb()
    .select()
    .from(courseExamAnswer)
    .where(eq(courseExamAnswer.attemptId, attemptId))
    .orderBy(asc(courseExamAnswer.answeredAt))

const attemptsToday = async (userId: string, courseId: string) => {
  const [{ count }] = await getDb()
    .select({ count: sql<number>`count(*)::int` })
    .from(courseExamAttempt)
    .where(
      and(
        eq(courseExamAttempt.userId, userId),
        eq(courseExamAttempt.courseId, courseId),
        eq(courseExamAttempt.day, utcDay())
      )
    )
  return count
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
  const [open] = await db
    .select()
    .from(courseExamAttempt)
    .where(
      and(
        eq(courseExamAttempt.userId, user.id),
        eq(courseExamAttempt.courseId, course.id),
        eq(courseExamAttempt.day, utcDay()),
        isNull(courseExamAttempt.finishedAt)
      )
    )
  const used = await attemptsToday(user.id, course.id)
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
      attemptsLeft: EXAM_ATTEMPTS_PER_DAY - used,
    })
  }
  if (used >= EXAM_ATTEMPTS_PER_DAY)
    return apiError("limit", 429, { retryAt: nextUtcMidnight() })

  const attempt = {
    id: randomUUID(),
    userId: user.id,
    courseId: course.id,
    day: utcDay(),
    questionIds: shuffle(course.exam.map(({ id }) => id)),
  }
  await db.insert(courseExamAttempt).values(attempt)
  return json({
    attemptId: attempt.id,
    questionIds: attempt.questionIds,
    answered: [],
    attemptsLeft: EXAM_ATTEMPTS_PER_DAY - used - 1,
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

  const used = await attemptsToday(user.id, attempt.courseId)
  return json({
    score,
    passed,
    results: passed ? results : undefined,
    review: passed
      ? Object.fromEntries(attempt.questionIds.map((id) => [id, key[id]]))
      : undefined,
    attemptsLeft: Math.max(0, EXAM_ATTEMPTS_PER_DAY - used),
    retryAt: used >= EXAM_ATTEMPTS_PER_DAY ? nextUtcMidnight() : undefined,
  })
}
