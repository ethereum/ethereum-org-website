import {
  boolean,
  date,
  index,
  pgTable,
  primaryKey,
  real,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { user } from "./auth-schema"

/**
 * Course progress the server can vouch for. `verified` rows were earned
 * through the API while signed in; unverified ones were imported from the
 * browser and never count toward leaderboards or completion records.
 */

const userId = () =>
  text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })

/** A lesson started while signed in; its id is the token completion needs */
export const courseLessonSession = pgTable(
  "course_lesson_session",
  {
    id: text("id").primaryKey(),
    userId: userId(),
    courseId: text("course_id").notNull(),
    lessonId: text("lesson_id").notNull(),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
  },
  (t) => [index("course_lesson_session_user_idx").on(t.userId)]
)

export const courseLessonCompletion = pgTable(
  "course_lesson_completion",
  {
    userId: userId(),
    courseId: text("course_id").notNull(),
    lessonId: text("lesson_id").notNull(),
    verified: boolean("verified").notNull(),
    /** Best first-try accuracy, 0-1, as the browser reported it */
    accuracy: real("accuracy").notNull(),
    completedAt: timestamp("completed_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.courseId, t.lessonId] })]
)

/** A mastery check taken while signed in, graded by the server */
export const courseExamAttempt = pgTable(
  "course_exam_attempt",
  {
    id: text("id").primaryKey(),
    userId: userId(),
    courseId: text("course_id").notNull(),
    /** UTC calendar day, for the daily attempt limit */
    day: date("day").notNull(),
    /** The questions drawn for this attempt, in the order asked */
    questionIds: text("question_ids").array().notNull(),
    startedAt: timestamp("started_at").defaultNow().notNull(),
    finishedAt: timestamp("finished_at"),
    /** 0-1, set when finished */
    score: real("score"),
    passed: boolean("passed"),
  },
  (t) => [index("course_exam_attempt_user_day_idx").on(t.userId, t.day)]
)

export const courseExamAnswer = pgTable(
  "course_exam_answer",
  {
    attemptId: text("attempt_id")
      .notNull()
      .references(() => courseExamAttempt.id, { onDelete: "cascade" }),
    questionId: text("question_id").notNull(),
    optionIds: text("option_ids").array().notNull(),
    correct: boolean("correct").notNull(),
    answeredAt: timestamp("answered_at").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.attemptId, t.questionId] })]
)

/** A passed mastery check: the course trophy */
export const courseMastery = pgTable(
  "course_mastery",
  {
    userId: userId(),
    courseId: text("course_id").notNull(),
    verified: boolean("verified").notNull(),
    /** Best score, 0-1 */
    score: real("score").notNull(),
    passedAt: timestamp("passed_at").notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.courseId] })]
)
