import { and, eq, gt, lt, sql } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import * as z from "zod"

import { getLesson } from "@/data/courses"

import { LESSON_TOKEN_TTL_MS, MIN_STEP_MS } from "../rules"
import { type StreakDay, streakDayInZone } from "../streak"

import { apiError, json, learnerDay, readBody, type SessionUser } from "./api"

import { getDb } from "@/lib/db"
import {
  courseLessonCompletion,
  courseLessonSession,
  courseStreakDay,
} from "@/lib/db/schema"

const startBody = z.object({ courseId: z.string(), lessonId: z.string() })
const completeBody = z.object({
  token: z.string(),
  accuracy: z.number().min(0).max(1),
})

/**
 * Adds days to the account's streak: a day already there keeps its earliest
 * and latest finish, and stays verified once the server has seen it. Fed by
 * verified finishes and by the days browsers upload.
 */
export const recordStreakDays = async (
  userId: string,
  days: StreakDay[],
  verified: boolean,
  // A transaction to join: the pool's one connection is busy inside it
  db: Pick<ReturnType<typeof getDb>, "insert"> = getDb()
) => {
  if (!days.length) return
  await db
    .insert(courseStreakDay)
    .values(
      days.map(({ day, offset, first, last }) => ({
        userId,
        day,
        utcOffset: offset,
        firstAt: new Date(first),
        lastAt: new Date(last),
        verified,
      }))
    )
    .onConflictDoUpdate({
      target: [courseStreakDay.userId, courseStreakDay.day],
      set: {
        utcOffset: sql`case when excluded.first_at < ${courseStreakDay.firstAt} then excluded.utc_offset else ${courseStreakDay.utcOffset} end`,
        firstAt: sql`least(${courseStreakDay.firstAt}, excluded.first_at)`,
        lastAt: sql`greatest(${courseStreakDay.lastAt}, excluded.last_at)`,
        verified: sql`${courseStreakDay.verified} or excluded.verified`,
      },
    })
}

const tokenCutoff = () => new Date(Date.now() - LESSON_TOKEN_TTL_MS)

/**
 * Starting a lesson hands out the token its completion has to show. Every
 * start also clears out everyone's expired tokens, so the table only holds
 * lessons started in the last day and not yet finished
 */
export const startLesson = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, startBody)
  if (!body || !getLesson(body.courseId, body.lessonId))
    return apiError("bad-request", 400)
  const token = randomUUID()
  const db = getDb()
  await db
    .insert(courseLessonSession)
    .values({ id: token, userId: user.id, ...body })
  await db
    .delete(courseLessonSession)
    .where(lt(courseLessonSession.startedAt, tokenCutoff()))
  return json({ token })
}

/**
 * Verified completion: the token from this learner's own start, under a day
 * old, after at least `MIN_STEP_MS` per step. Completing deletes the token,
 * so it works once even when two requests race. Accuracy is the browser's
 * word. The day counts for the streak, in the zone the browser reports.
 */
export const completeLesson = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, completeBody)
  if (!body) return apiError("bad-request", 400)
  const [session] = await getDb()
    .select()
    .from(courseLessonSession)
    .where(
      and(
        eq(courseLessonSession.id, body.token),
        eq(courseLessonSession.userId, user.id),
        gt(courseLessonSession.startedAt, tokenCutoff())
      )
    )
  const found = session && getLesson(session.courseId, session.lessonId)
  if (!session || !found) return apiError("invalid-token", 400)

  const now = new Date()
  const minimum = found.lesson.steps.length * MIN_STEP_MS
  if (now.getTime() - session.startedAt.getTime() < minimum)
    return apiError("too-fast", 422)

  const { timeZone } = await learnerDay(request, user)
  const completed = await getDb().transaction(async (tx) => {
    const [used] = await tx
      .delete(courseLessonSession)
      .where(eq(courseLessonSession.id, session.id))
      .returning({ id: courseLessonSession.id })
    if (!used) return false
    await tx
      .insert(courseLessonCompletion)
      .values({
        userId: user.id,
        courseId: session.courseId,
        lessonId: session.lessonId,
        verified: true,
        accuracy: body.accuracy,
        completedAt: now,
      })
      .onConflictDoUpdate({
        target: [
          courseLessonCompletion.userId,
          courseLessonCompletion.courseId,
          courseLessonCompletion.lessonId,
        ],
        set: {
          verified: true,
          accuracy: sql`greatest(${courseLessonCompletion.accuracy}, excluded.accuracy)`,
          // An imported (unverified) date isn't one the server saw
          completedAt: sql`case when ${courseLessonCompletion.verified} then ${courseLessonCompletion.completedAt} else excluded.completed_at end`,
        },
      })
    await recordStreakDays(user.id, [streakDayInZone(timeZone, now)], true, tx)
    return true
  })
  if (!completed) return apiError("invalid-token", 400)
  return json({ verified: true })
}
