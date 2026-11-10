import { expect, test } from "@playwright/test"

import {
  NOTE_MAX,
  reportEventName,
} from "../../../src/components/Courses/report"

const where = { courseId: "wallets", lessonId: "keys", stepId: "where" }

test.describe("reportEventName", () => {
  test("names the step, then the answer and note when present", () => {
    expect(reportEventName({ ...where, note: "" })).toBe("wallets/keys/where")
    expect(
      reportEventName({ ...where, answer: ["a", "b"], note: " Typo\n here " })
    ).toBe("wallets/keys/where | answer: a,b | Typo here")
  })

  test("caps the note", () => {
    const name = reportEventName({ ...where, note: "x".repeat(NOTE_MAX + 50) })
    expect(name).toBe(`wallets/keys/where | ${"x".repeat(NOTE_MAX)}`)
  })
})
