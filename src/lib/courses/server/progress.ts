import { eq } from "drizzle-orm"
import * as z from "zod"

import { EXAM_PASS_MARK, getCourse, getLesson } from "@/data/courses"

import { mergeProgress, type ProgressState } from "../progress"
import { examAttemptsLeft, XP_EXAM_PASS, XP_LESSON } from "../rules"

import { apiError, json, learnerDay, readBody, type SessionUser } from "./api"
import { recentAttempts } from "./exams"

import { getDb } from "@/lib/db"
import {
  courseLessonCompletion,
  courseMastery,
  courseProgressState,
} from "@/lib/db/schema"

const MAX_IMPORT = 500
const MAX_STEPS = 5000

const isoDate = z.string().max(40)

// The browser's own record, kept as sent within these bounds: it only ever
// feeds that learner's screens
const stateBody = z.object({
  version: z.literal(1),
  xp: z.number().int().min(0).max(10_000_000),
  streak: z.object({
    count: z.number().int().min(0).max(100_000),
    lastDay: isoDate.nullable(),
    lastAt: isoDate.optional(),
    lastOffset: z.number().int().min(-1440).max(1440).optional(),
  }),
  bestStreak: z.number().int().min(0).max(100_000).optional(),
  lessons: z
    .record(
      z.string().max(200),
      z.object({ completedAt: isoDate, accuracy: z.number().min(0).max(1) })
    )
    .refine((lessons) => Object.keys(lessons).length <= MAX_IMPORT),
  steps: z
    .record(
      z.string().max(300),
      z.object({
        seen: z.number().int().min(0),
        missed: z.number().int().min(0),
        lastAt: isoDate,
        lastCorrect: z.boolean(),
      })
    )
    .refine((steps) => Object.keys(steps).length <= MAX_STEPS)
    .optional(),
  exams: z
    .record(
      z.string().max(200),
      z.object({
        best: z.number().min(0).max(1),
        passedAt: isoDate.nullable(),
      })
    )
    .optional(),
}) satisfies z.ZodType<ProgressState>

const toDate = (value: string) => {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) || date > new Date() ? new Date() : date
}

/**
 * The account's progress. XP counts verified work only, the figure behind
 * leaderboards; browser-only progress shows in the UI but never here.
 */
export const getProgress = async (request: Request, user: SessionUser) => {
  const db = getDb()
  const day = await learnerDay(request, user)
  const now = new Date()
  const since = new Date(
    Math.min(day.start.getTime(), now.getTime() - 86_400_000)
  )
  const [lessons, masteries, attempts, saved] = await Promise.all([
    db
      .select()
      .from(courseLessonCompletion)
      .where(eq(courseLessonCompletion.userId, user.id)),
    db.select().from(courseMastery).where(eq(courseMastery.userId, user.id)),
    recentAttempts(user.id, since),
    db
      .select({ state: courseProgressState.state })
      .from(courseProgressState)
      .where(eq(courseProgressState.userId, user.id)),
  ])
  const startedByCourse = new Map<string, Date[]>()
  for (const { courseId, startedAt } of attempts)
    startedByCourse.set(courseId, [
      ...(startedByCourse.get(courseId) ?? []),
      startedAt,
    ])
  const verifiedXp =
    lessons.filter(({ verified }) => verified).length * XP_LESSON +
    masteries.filter(({ verified }) => verified).length * XP_EXAM_PASS
  return json({
    account: user.id,
    state: saved[0]?.state ?? null,
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
    // Only courses tried lately; any other has the full daily allowance
    attemptsLeft: Object.fromEntries(
      [...startedByCourse].map(([courseId, started]) => [
        courseId,
        examAttemptsLeft(started, day.start, day.next, now).left,
      ])
    ),
    verifiedXp,
    showOnLeaderboard: user.showOnLeaderboard ?? true,
  })
}

/**
 * Browser progress joins the account, unverified: lessons and trophies fill
 * gaps and never overwrite what the server holds, and the whole record merges
 * into the account's copy for the learner's other devices.
 */
export const importProgress = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, stateBody)
  if (!body) return apiError("bad-request", 400)

  const lessons = Object.entries(body.lessons).flatMap(
    ([key, { completedAt, accuracy }]) => {
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
    }
  )
  const masteries = Object.entries(body.exams ?? {}).flatMap(
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

  // Locked while merging, so two devices saving at once don't drop either
  const state = await db.transaction(async (tx) => {
    const [saved] = await tx
      .select({ state: courseProgressState.state })
      .from(courseProgressState)
      .where(eq(courseProgressState.userId, user.id))
      .for("update")
    const merged = saved ? mergeProgress(saved.state, body) : body
    await tx
      .insert(courseProgressState)
      .values({ userId: user.id, state: merged })
      .onConflictDoUpdate({
        target: courseProgressState.userId,
        set: { state: merged, updatedAt: new Date() },
      })
    return merged
  })
  return json({ state })
}
