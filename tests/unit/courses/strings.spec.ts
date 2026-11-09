/**
 * Course data holds structure only; every string comes from `page-courses.json`
 * through the key conventions documented on the types in
 * `src/data/courses/types.ts`. A missing key renders the raw key on the page,
 * and a stale one is silently shipped to every translator, so both directions
 * are checked. UI chrome (`page-courses-*`) is out of scope.
 */

import { expect, test } from "@playwright/test"

import type { LessonStep } from "../../../src/data/courses"
import { COURSES, stepKey } from "../../../src/data/courses"
import en from "../../../src/intl/en/page-courses.json"

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
    case "interactive":
      return ["prompt", "explain"]
  }
}

const expected = COURSES.flatMap((course) => [
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
])

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
    expect(dupes(COURSES.map(({ id }) => id))).toEqual([])
    for (const course of COURSES) {
      expect(dupes(course.lessons.map(({ id }) => id))).toEqual([])
      for (const lesson of course.lessons)
        expect(dupes(lesson.steps.map(({ id }) => id))).toEqual([])
    }
  })

  test("choice answers are among the options", () => {
    for (const course of COURSES)
      for (const lesson of course.lessons)
        for (const step of lesson.steps)
          if (step.type === "choice") {
            expect(step.correct.length).toBeGreaterThan(0)
            for (const id of step.correct) expect(step.options).toContain(id)
            if (!step.multi) expect(step.correct).toHaveLength(1)
          }
  })
})
