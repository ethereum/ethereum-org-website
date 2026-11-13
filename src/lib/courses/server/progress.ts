import { and, eq, sql } from "drizzle-orm"
import * as z from "zod"

import { EXAM_PASS_MARK, getCourse, getLesson } from "@/data/courses"

import { EXAM_ATTEMPTS_PER_DAY, XP_EXAM_PASS, XP_LESSON } from "../rules"

import { apiError, json, readBody, type SessionUser, utcDay } from "./api"

import { getDb } from "@/lib/db"
import {
  courseExamAttempt,
  courseLessonCompletion,
  courseMastery,
} from "@/lib/db/schema"

const MAX_IMPORT = 500

const importBody = z.object({
  lessons: z
    .record(
      z.string(),
      z.object({
        completedAt: z.string(),
        accuracy: z.number().min(0).max(1),
      })
    )
    .default({}),
  exams: z
    .record(
      z.string(),
      z.object({
        best: z.number().min(0).max(1),
        passedAt: z.string().nullable(),
      })
    )
    .default({}),
})

const toDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) || date > new Date() ? new Date() : date
}

/**
 * The account's progress. XP counts verified work only, the figure behind
 * leaderboards; browser-only progress shows in the UI but never here.
 */
export const getProgress = async (_: Request, user: SessionUser) => {
  const db = getDb()
  const [lessons, masteries, attempts] = await Promise.all([
    db
      .select()
      .from(courseLessonCompletion)
      .where(eq(courseLessonCompletion.userId, user.id)),
    db.select().from(courseMastery).where(eq(courseMastery.userId, user.id)),
    db
      .select({
        courseId: courseExamAttempt.courseId,
        count: sql<number>`count(*)::int`,
      })
      .from(courseExamAttempt)
      .where(
        and(
          eq(courseExamAttempt.userId, user.id),
          eq(courseExamAttempt.day, utcDay())
        )
      )
      .groupBy(courseExamAttempt.courseId),
  ])
  const verifiedXp =
    lessons.filter(({ verified }) => verified).length * XP_LESSON +
    masteries.filter(({ verified }) => verified).length * XP_EXAM_PASS
  return json({
    lessons: lessons.map(
      ({ courseId, lessonId, verified, accuracy, completedAt }) => ({
        courseId,
        lessonId,
        verified,
        accuracy,
        completedAt,
      })
    ),
    masteries: masteries.map(({ courseId, verified, score, passedAt }) => ({
      courseId,
      verified,
      score,
      passedAt,
    })),
    attemptsLeft: Object.fromEntries(
      attempts.map(({ courseId, count }) => [
        courseId,
        Math.max(0, EXAM_ATTEMPTS_PER_DAY - count),
      ])
    ),
    verifiedXp,
    showOnLeaderboard: user.showOnLeaderboard ?? true,
  })
}

/**
 * Browser progress joins the account on sign-in, unverified: it fills gaps
 * and never overwrites what the server already holds.
 */
export const importProgress = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, importBody)
  if (!body) return apiError("bad-request", 400)

  const lessons = Object.entries(body.lessons)
    .slice(0, MAX_IMPORT)
    .flatMap(([key, { completedAt, accuracy }]) => {
      const [courseId, lessonId] = key.split("/")
      return getLesson(courseId, lessonId)
        ? [
            {
              userId: user.id,
              courseId,
              lessonId,
              verified: false,
              accuracy,
              completedAt: toDate(completedAt),
            },
          ]
        : []
    })
  const masteries = Object.entries(body.exams).flatMap(
    ([courseId, { best, passedAt }]) =>
      getCourse(courseId) && passedAt && best >= EXAM_PASS_MARK
        ? [
            {
              userId: user.id,
              courseId,
              verified: false,
              score: best,
              passedAt: toDate(passedAt),
            },
          ]
        : []
  )
  const db = getDb()
  if (lessons.length)
    await db
      .insert(courseLessonCompletion)
      .values(lessons)
      .onConflictDoNothing()
  if (masteries.length)
    await db.insert(courseMastery).values(masteries).onConflictDoNothing()
  return json({ lessons: lessons.length, masteries: masteries.length })
}
