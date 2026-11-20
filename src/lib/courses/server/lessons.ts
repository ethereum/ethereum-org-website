import { and, eq, isNull, sql } from "drizzle-orm"
import { randomUUID } from "node:crypto"
import * as z from "zod"

import { getLesson } from "@/data/courses"

import { MIN_STEP_MS } from "../rules"

import { apiError, json, readBody, type SessionUser } from "./api"

import { getDb } from "@/lib/db"
import { courseLessonCompletion, courseLessonSession } from "@/lib/db/schema"

const startBody = z.object({ courseId: z.string(), lessonId: z.string() })
const completeBody = z.object({
  token: z.string(),
  accuracy: z.number().min(0).max(1),
})

/** Starting a lesson hands out the token its completion has to show */
export const startLesson = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, startBody)
  if (!body || !getLesson(body.courseId, body.lessonId))
    return apiError("bad-request", 400)
  const token = randomUUID()
  await getDb()
    .insert(courseLessonSession)
    .values({ id: token, userId: user.id, ...body })
  return json({ token })
}

/**
 * Verified completion: the token from this learner's own start, used once,
 * after at least `MIN_STEP_MS` per step. Accuracy is the browser's word.
 */
export const completeLesson = async (request: Request, user: SessionUser) => {
  const body = await readBody(request, completeBody)
  if (!body) return apiError("bad-request", 400)
  const db = getDb()
  const [session] = await db
    .select()
    .from(courseLessonSession)
    .where(
      and(
        eq(courseLessonSession.id, body.token),
        eq(courseLessonSession.userId, user.id),
        isNull(courseLessonSession.completedAt)
      )
    )
  const found = session && getLesson(session.courseId, session.lessonId)
  if (!session || !found) return apiError("invalid-token", 400)

  const now = new Date()
  const minimum = found.lesson.steps.length * MIN_STEP_MS
  if (now.getTime() - session.startedAt.getTime() < minimum)
    return apiError("too-fast", 422)

  await db
    .update(courseLessonSession)
    .set({ completedAt: now })
    .where(eq(courseLessonSession.id, session.id))
  await db
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
  return json({ verified: true })
}
