import { eq, sql } from "drizzle-orm"

import { XP_EXAM_PASS, XP_LESSON } from "../rules"

import { apiError, json } from "./api"

import { displayName } from "@/lib/auth/display-name"
import { getDb, hasLearnerDb } from "@/lib/db"
import { courseLessonCompletion, courseMastery, user } from "@/lib/db/schema"

const LIMIT = 50

/** Opted-in learners by verified XP, under their display names */
export const getLeaderboard = async () => {
  if (!hasLearnerDb) return apiError("not-found", 404)
  const lessons = getDb()
    .select({
      userId: courseLessonCompletion.userId,
      lessonCount: sql<number>`count(*)::int`.as("lesson_count"),
    })
    .from(courseLessonCompletion)
    .where(eq(courseLessonCompletion.verified, true))
    .groupBy(courseLessonCompletion.userId)
    .as("lessons")
  const masteries = getDb()
    .select({
      userId: courseMastery.userId,
      masteryCount: sql<number>`count(*)::int`.as("mastery_count"),
    })
    .from(courseMastery)
    .where(eq(courseMastery.verified, true))
    .groupBy(courseMastery.userId)
    .as("masteries")
  const xp = sql<number>`(coalesce(${lessons.lessonCount}, 0) * ${XP_LESSON} + coalesce(${masteries.masteryCount}, 0) * ${XP_EXAM_PASS})::int`
  const rows = await getDb()
    .select({
      name: user.name,
      xp,
      masteries: sql<number>`coalesce(${masteries.masteryCount}, 0)::int`,
    })
    .from(user)
    .leftJoin(lessons, eq(lessons.userId, user.id))
    .leftJoin(masteries, eq(masteries.userId, user.id))
    .where(sql`${user.showOnLeaderboard} is not false and ${xp} > 0`)
    .orderBy(sql`${xp} desc`)
    .limit(LIMIT)

  return json(
    rows.map(({ name, xp, masteries }) => ({
      name: displayName(name),
      xp,
      masteries,
    }))
  )
}
