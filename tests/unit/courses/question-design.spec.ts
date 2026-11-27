import { expect, test } from "@playwright/test"

import type { ChoiceStep } from "../../../src/data/courses"
import { COURSES } from "../../../src/data/courses"
import { isPrediction } from "../../../src/lib/courses/rules"
import { choiceOptionOrder } from "../../../src/lib/courses/shuffle"
import { stringSeededShuffle } from "../../../src/lib/utils/random"

const step: Pick<ChoiceStep, "id" | "options"> = {
  id: "predict",
  options: ["one", "few", "most"],
}

test.describe("choice option order", () => {
  test("is the same for the same attempt and step", () => {
    expect(choiceOptionOrder(step, "seed-a")).toEqual(
      choiceOptionOrder(step, "seed-a")
    )
  })

  test("keeps every option exactly once", () => {
    for (let i = 0; i < 200; i++)
      expect([...choiceOptionOrder(step, `s${i}`)].sort()).toEqual(
        [...step.options].sort()
      )
  })

  test("keeps the authored order without a seed", () => {
    expect(choiceOptionOrder(step, null)).toEqual(step.options)
    expect(choiceOptionOrder(step, undefined)).toEqual(step.options)
  })

  test("differs between attempts and between steps", () => {
    const orders = new Set(
      Array.from({ length: 50 }, (_, i) =>
        choiceOptionOrder(step, `attempt-${i}`).join()
      )
    )
    expect(orders.size).toBe(6)
    const byStep = new Set(
      Array.from({ length: 50 }, (_, i) =>
        choiceOptionOrder({ ...step, id: `q${i}` }, "one-attempt").join()
      )
    )
    expect(byStep.size).toBeGreaterThan(1)
  })

  test("puts each option in each position about equally often", () => {
    const runs = 6000
    const counts = step.options.map(() => [0, 0, 0])
    for (let i = 0; i < runs; i++)
      stringSeededShuffle(step.options, `s${i}`).forEach(
        (id, at) => counts[step.options.indexOf(id)][at]++
      )
    for (const row of counts)
      for (const n of row) expect(Math.abs(n / runs - 1 / 3)).toBeLessThan(0.03)
  })
})

// The server renders authored order and the seed arrives after mount, so a
// choice step first would visibly reorder on load
test("no lesson starts with a choice step", () => {
  for (const course of COURSES)
    for (const lesson of course.lessons)
      expect(lesson.steps[0].type, `${course.id}/${lesson.id}`).not.toBe(
        "choice"
      )
})

test.describe("prediction steps", () => {
  const steps = COURSES.flatMap((course) =>
    course.lessons.flatMap((lesson) =>
      lesson.steps.map((s) => ({ where: `${course.id}/${lesson.id}`, s }))
    )
  )

  test("are single-answer choice steps", () => {
    for (const { where, s } of steps.filter(({ s }) => isPrediction(s))) {
      expect(s.type, where).toBe("choice")
      if (s.type === "choice") expect(s.multi, where).toBeFalsy()
    }
  })

  test("only the ones asked before the lesson teaches the answer", () => {
    expect(
      steps.filter(({ s }) => isPrediction(s)).map(({ where }) => where)
    ).toEqual(["blockchains/hashing", "sending/fees", "sending/failed"])
  })
})
