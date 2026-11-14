import { eq } from "drizzle-orm"
import type * as z from "zod"

import { isTimeZone, midnightInZone } from "@/lib/utils/date"

import { getSessionUser } from "@/lib/auth/server"
import { getDb, hasLearnerDb } from "@/lib/db"
import { user as userTable } from "@/lib/db/schema"

export type SessionUser = NonNullable<
  Awaited<ReturnType<typeof getSessionUser>>
>

export const json = (data: unknown, status = 200) =>
  Response.json(data, { status, headers: { "cache-control": "no-store" } })

export const apiError = (error: string, status: number, extra = {}) =>
  json({ error, ...extra }, status)

/**
 * A course API handler for signed-in learners. 404 where the deploy has no
 * learner database; 401 when signed out, so the browser keeps going on local
 * progress alone.
 */
export const withUser =
  (handler: (request: Request, user: SessionUser) => Promise<Response>) =>
  async (request: Request) => {
    if (!hasLearnerDb) return apiError("not-found", 404)
    const user = await getSessionUser(request)
    if (!user) return apiError("unauthorized", 401)
    return handler(request, user)
  }

/** The parsed JSON body, or null when it doesn't match `schema` */
export const readBody = async <T>(request: Request, schema: z.ZodType<T>) => {
  try {
    const parsed = schema.safeParse(await request.json())
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export const TIME_ZONE_HEADER = "x-time-zone"

/**
 * The learner's day: when it started and when the next starts, in the zone
 * their browser reports (kept on the account) or else the last one kept
 */
export const learnerDay = async (request: Request, user: SessionUser) => {
  const sent = request.headers.get(TIME_ZONE_HEADER)
  let timeZone =
    user.timeZone && isTimeZone(user.timeZone) ? user.timeZone : "UTC"
  if (sent && sent !== user.timeZone && isTimeZone(sent)) {
    timeZone = sent
    await getDb()
      .update(userTable)
      .set({ timeZone })
      .where(eq(userTable.id, user.id))
  }
  const now = new Date()
  return {
    timeZone,
    start: midnightInZone(timeZone, now),
    next: midnightInZone(timeZone, now, 1),
  }
}
