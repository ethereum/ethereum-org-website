/**
 * Course data holds structure only; every string comes from `page-courses.json`
 * through the key conventions documented on the types in
 * `src/data/courses/types.ts`. A missing key renders the raw key on the page,
 * and a stale one is silently shipped to every translator, so both directions
 * are checked. UI chrome (`page-courses-*`) is out of scope.
 */

import { existsSync, readFileSync } from "node:fs"
import { expect, test } from "@playwright/test"

import type { ExamStep, LessonStep } from "../../../src/data/courses"
import {
  COURSES,
  EXAM_ID,
  PROFILE_SEGMENT,
  stepKey,
  TRACKS,
} from "../../../src/data/courses"
import { ENCRYPTED_EXAM_KEY } from "../../../src/data/courses/exam-key"
import en from "../../../src/intl/en/page-courses.json"
import { checkExamKey, decryptExamKey } from "../../../src/lib/courses/exam-key"

const EXAM_KEY_FILE = ".learner-exam-key.json"

const stepSuffixes = (step: LessonStep): string[] => {
  switch (step.type) {
    case "concept":
      return Array.from({ length: step.paragraphs }, (_, i) => `p${i + 1}`)
    case "choice":
      return [
        "prompt",
        ...step.options.flatMap((id) => [`opt-${id}`, `fb-${id}`]),
        ...(step.multi ? ["explain"] : []),
      ]
    case "order":
      return ["prompt", ...step.items.map((id) => `item-${id}`), "explain"]
    case "match":
      return [
        "prompt",
        ...step.pairs.flatMap((id) => [`term-${id}`, `match-${id}`]),
        "explain",
      ]
    case "fill":
      return [
        "prompt",
        "text",
        ...[...step.blanks, ...step.extras].map((id) => `word-${id}`),
        "explain",
      ]
    case "interactive":
      return ["prompt", "explain"]
  }
}

// One attempt per exam question, so one explanation instead of per-option notes
const examSuffixes = (step: ExamStep) => [
  "prompt",
  ...step.options.map((id) => `opt-${id}`),
  "explain",
]

const trackKeys = TRACKS.flatMap(({ id }) => [
  `page-courses-track-${id}-title`,
  `page-courses-track-${id}-description`,
])

// Teasers aren't courses yet, but use course keys so the strings carry over;
// so do the callouts after a track
const teaserIds = TRACKS.flatMap(({ upcoming = [], next }) => [
  ...upcoming.map(({ id }) => id),
  ...(next ? [next.id] : []),
])

const expected = [
  ...trackKeys,
  ...teaserIds.flatMap((id) => [`${id}-title`, `${id}-description`]),
  ...COURSES.flatMap((course) => [
    `${course.id}-title`,
    `${course.id}-description`,
    ...course.lessons.flatMap((lesson) => [
      `${course.id}-${lesson.id}-title`,
      `${course.id}-${lesson.id}-summary`,
      ...lesson.steps.flatMap((step) =>
        stepSuffixes(step).map((suffix) =>
          stepKey(course.id, lesson.id, step.id, suffix)
        )
      ),
    ]),
    ...course.exam.flatMap((step) =>
      examSuffixes(step).map((suffix) =>
        stepKey(course.id, EXAM_ID, step.id, suffix)
      )
    ),
  ]),
]

const contentKeys = Object.keys(en).filter(
  (key) => !key.startsWith("page-courses-")
)

test.describe("course strings", () => {
  test("every key the course data needs exists", () => {
    const missing = expected.filter((key) => !(key in en))
    expect(missing).toEqual([])
  })

  test("no orphaned lesson strings", () => {
    const needed = new Set(expected)
    expect(contentKeys.filter((key) => !needed.has(key))).toEqual([])
  })

  test("ids are unique where they form keys", () => {
    const dupes = (ids: string[]) =>
      ids.filter((id, i) => ids.indexOf(id) !== i)
    // A teaser shares its key space with the course it becomes
    const ids = [...COURSES.map(({ id }) => id), ...teaserIds]
    expect(dupes(ids)).toEqual([])
    // Static routes beside `[course]` would shadow a course with these ids
    expect(ids).not.toContain(PROFILE_SEGMENT)
    for (const course of COURSES) {
      expect(dupes(course.lessons.map(({ id }) => id))).toEqual([])
      expect(course.lessons.map(({ id }) => id)).not.toContain(EXAM_ID)
      expect(dupes(course.exam.map(({ id }) => id))).toEqual([])
      for (const lesson of course.lessons)
        expect(dupes(lesson.steps.map(({ id }) => id))).toEqual([])
    }
  })

  test("fill-in sentences have one placeholder per blank", () => {
    const strings = en as Record<string, string>
    for (const course of COURSES)
      for (const lesson of course.lessons)
        for (const step of lesson.steps)
          if (step.type === "fill") {
            const text = strings[stepKey(course.id, lesson.id, step.id, "text")]
            const found = [...text.matchAll(/\{(b\d+)\}/g)].map((m) => m[1])
            expect(found).toEqual(step.blanks.map((_, i) => `b${i + 1}`))
            const words = [...step.blanks, ...step.extras]
            expect(new Set(words).size).toBe(words.length)
          }
  })

  test("choice answers are among the options", () => {
    for (const course of COURSES)
      for (const step of course.lessons.flatMap(({ steps }) => steps))
        if (step.type === "choice") {
          expect(step.correct.length).toBeGreaterThan(0)
          for (const id of step.correct) expect(step.options).toContain(id)
          if (!step.multi) expect(step.correct).toHaveLength(1)
        }
  })

  // The key is encrypted, so this runs only where the secret (or the
  // plaintext file) is available: question changes must update the key
  test("the mastery check key fits the questions", () => {
    const secret = process.env.LEARNER_EXAM_KEY_SECRET
    const committed = !!secret && !!ENCRYPTED_EXAM_KEY
    const file = existsSync(EXAM_KEY_FILE)
    test.skip(
      !committed && !file,
      "no LEARNER_EXAM_KEY_SECRET or .learner-exam-key.json"
    )
    const key = committed
      ? decryptExamKey(ENCRYPTED_EXAM_KEY, secret)
      : JSON.parse(readFileSync(EXAM_KEY_FILE, "utf8"))
    expect(checkExamKey(key, COURSES)).toEqual([])
  })
})
