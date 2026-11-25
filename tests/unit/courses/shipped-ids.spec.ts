/**
 * Learners' progress is keyed by course, lesson and step ids, so content can
 * change freely (new copy, new steps, new lessons) as long as ids that have
 * shipped never change. Every id ever shipped is recorded in
 * `src/data/courses/shipped-ids.json`; one leaving the course data has to
 * move to `retired` there, on purpose, in review. Retired lessons' completions
 * stay on accounts.
 *
 * New ids: `UPDATE_COURSE_IDS=1 pnpm test:unit tests/unit/courses/shipped-ids.spec.ts`
 * adds them (it never removes any).
 */

import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

import { stepHistoryKey } from "../../../src/components/Courses/step-history"
import { COURSES } from "../../../src/data/courses"
import { EXAM_ID, lessonProgressKey } from "../../../src/lib/courses/constants"

const FILE = path.resolve(
  __dirname,
  "../../../src/data/courses/shipped-ids.json"
)

interface ShippedIds {
  shipped: string[]
  retired: string[]
}

const current = COURSES.flatMap((course) => [
  `course:${course.id}`,
  ...course.lessons.flatMap((lesson) => [
    `lesson:${lessonProgressKey(course.id, lesson.id)}`,
    ...lesson.steps.map(
      (step) => `step:${stepHistoryKey(course.id, lesson.id, step.id)}`
    ),
  ]),
  ...course.exam.map(
    (question) => `step:${stepHistoryKey(course.id, EXAM_ID, question.id)}`
  ),
])

const record: ShippedIds = JSON.parse(readFileSync(FILE, "utf8"))

test.describe("shipped course ids", () => {
  test("every id in the course data is recorded", () => {
    const known = new Set([...record.shipped, ...record.retired])
    const added = current.filter((id) => !known.has(id))
    if (added.length && process.env.UPDATE_COURSE_IDS) {
      record.shipped = [...record.shipped, ...added].sort()
      writeFileSync(FILE, JSON.stringify(record, null, 2) + "\n")
      return
    }
    expect(added, "run with UPDATE_COURSE_IDS=1 to record them").toEqual([])
  })

  test("no shipped id disappears unless retired", () => {
    const now = new Set(current)
    const gone = record.shipped.filter((id) => !now.has(id))
    expect(
      gone,
      "renamed or removed ids lose learners' progress: restore them, or move them to `retired`"
    ).toEqual([])
  })

  test("a retired id isn't back in use", () => {
    const now = new Set(current)
    expect(record.retired.filter((id) => now.has(id))).toEqual([])
  })
})
