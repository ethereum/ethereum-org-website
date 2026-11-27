import { issueChallenge } from "@/lib/auth/challenge"
import { apiError, json } from "@/lib/courses/server/api"
import { hasLearnerDb } from "@/lib/db"

export const dynamic = "force-dynamic"

export const GET = async () =>
  hasLearnerDb ? json(await issueChallenge()) : apiError("not-found", 404)
