import type * as z from "zod"

import { getSessionUser } from "@/lib/auth/server"
import { hasLearnerDb } from "@/lib/db"

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

/** Today's date in UTC, `YYYY-MM-DD` */
export const utcDay = (now = new Date()) => now.toISOString().slice(0, 10)
