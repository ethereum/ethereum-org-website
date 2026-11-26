import { expect, test } from "@playwright/test"

import {
  COURSES,
  EXAM_ID,
  getStep,
  stepAnswerIds,
} from "../../../src/data/courses"
import { NOTE_MAX, reportEventName } from "../../../src/lib/courses/report"

const where = { courseId: "wallets", lessonId: "keys", stepId: "where" }

test.describe("reportEventName", () => {
  test("names the step, then the answer and note when present", () => {
    expect(reportEventName({ ...where, note: "" })).toBe("wallets/keys/where")
    expect(
      reportEventName({ ...where, answer: ["a", "b"], note: " Typo\n here " })
    ).toBe("wallets/keys/where | answer: a,b | Typo here")
    expect(
      reportEventName({ ...where, answer: ["a", "", "c"], note: "" })
    ).toBe("wallets/keys/where | answer: a,,c")
    expect(reportEventName({ ...where, answer: ["", ""], note: "" })).toBe(
      "wallets/keys/where"
    )
  })

  test("caps the note", () => {
    const name = reportEventName({ ...where, note: "x".repeat(NOTE_MAX + 50) })
    expect(name).toBe(`wallets/keys/where | ${"x".repeat(NOTE_MAX)}`)
  })
})

test.describe("getStep", () => {
  const course = COURSES[0]
  const lesson = course.lessons[0]

  test("finds lesson steps and Course Mastery questions", () => {
    expect(getStep(course.id, lesson.id, lesson.steps[0].id)).toBe(
      lesson.steps[0]
    )
    expect(getStep(course.id, EXAM_ID, course.exam[0].id)).toBe(course.exam[0])
  })

  test("rejects anything else", () => {
    expect(getStep(course.id, lesson.id, "nope")).toBeUndefined()
    expect(getStep(course.id, EXAM_ID, lesson.steps[0].id)).toBeUndefined()
    expect(getStep("nope", lesson.id, lesson.steps[0].id)).toBeUndefined()
  })
})

test.describe("stepAnswerIds", () => {
  test("lists what a learner can pick on graded steps", () => {
    const steps = COURSES.flatMap((course) => [
      ...course.lessons.flatMap((lesson) => lesson.steps),
      ...course.exam,
    ])
    for (const step of steps) {
      const ids = stepAnswerIds(step)
      if (step.type === "concept" || step.type === "interactive")
        expect(ids).toEqual([])
      else expect(ids.length, step.id).toBeGreaterThan(0)
    }
  })
})
