import * as z from "zod"

import { getStep, stepAnswerIds } from "@/data/courses"

import { LOCALES_CODES } from "@/lib/constants"

import { cleanNote, REPORT_REASONS, REPORTS_PER_HOUR } from "../report"

import { apiError, json, readBody } from "./api"

import { withinRateLimit } from "@/lib/auth/server"
import { getDb, hasLearnerDb } from "@/lib/db"
import { courseReport } from "@/lib/db/schema"

const reportBody = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  stepId: z.string(),
  locale: z.string(),
  reason: z.enum(REPORT_REASONS),
  answer: z.array(z.string().max(64)).max(20).optional(),
  note: z.string().max(2000).optional(),
})

/**
 * Saves a learner's problem report. Anyone can send one, signed in or not;
 * nothing about who sent it is kept.
 */
export const submitReport = async (request: Request) => {
  if (!hasLearnerDb) return apiError("not-found", 404)
  // JSON only, from our own pages: other sites can't post one through a
  // visitor's browser without a CORS preflight, which fails
  const site = request.headers.get("sec-fetch-site")
  if (
    !request.headers.get("content-type")?.startsWith("application/json") ||
    (site && site !== "same-origin")
  )
    return apiError("forbidden", 403)
  const body = await readBody(request, reportBody)
  const step = body && getStep(body.courseId, body.lessonId, body.stepId)
  if (!body || !step || !LOCALES_CODES.includes(body.locale))
    return apiError("bad-request", 400)
  const allowed = await withinRateLimit(request, "/courses/report", {
    window: 60 * 60,
    max: REPORTS_PER_HOUR,
  })
  if (!allowed) return apiError("rate-limited", 429)
  const { answer, note, ...where } = body
  await getDb()
    .insert(courseReport)
    .values({
      ...where,
      // The step's own ids only, so it can't carry free text; empty slots
      // stay, so a match or fill answer keeps each pick's position
      answer: answer?.some((id) => stepAnswerIds(step).includes(id))
        ? answer
            .map((id) => (stepAnswerIds(step).includes(id) ? id : ""))
            .join(",")
        : null,
      note: (note && cleanNote(note)) || null,
    })
  return json({ ok: true })
}
