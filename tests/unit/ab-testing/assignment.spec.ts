import { expect, test } from "@playwright/test"

import { assignVariantIndex } from "../../../src/lib/ab-testing/assignment"
import type { ABTestConfig } from "../../../src/lib/ab-testing/types"

const config = (
  variants: { name: string; weight: number }[]
): ABTestConfig => ({
  name: "TestExperiment",
  id: "1",
  enabled: true,
  variants,
})

const evenSplit = config([
  { name: "Original", weight: 50 },
  { name: "VariantA", weight: 50 },
])

test.describe("assignVariantIndex", () => {
  test("is deterministic for the same fingerprint", () => {
    const first = assignVariantIndex(evenSplit, "visitor-abc|TestExperiment")
    for (let i = 0; i < 10; i++) {
      expect(assignVariantIndex(evenSplit, "visitor-abc|TestExperiment")).toBe(
        first
      )
    }
  })

  test("buckets a 50/50 experiment evenly", () => {
    // The first implementation used djb2 and split unevenly (#15927), so this
    // guards the distribution rather than just the return type
    const counts = [0, 0]
    const total = 10_000
    for (let i = 0; i < total; i++) {
      counts[assignVariantIndex(evenSplit, `visitor-${i}|TestExperiment`)]++
    }

    for (const count of counts) {
      expect(count / total).toBeGreaterThan(0.47)
      expect(count / total).toBeLessThan(0.53)
    }
  })

  test("decorrelates concurrent experiments when the name leads the seed", () => {
    // Two experiments running at once must randomize independently, or their
    // arms coincide and any shared metric (bounce, say) can't be attributed to
    // one of them
    let differing = 0
    for (let i = 0; i < 10_000; i++) {
      const a = assignVariantIndex(evenSplit, `ExperimentA|visitor-${i}`)
      const b = assignVariantIndex(evenSplit, `ExperimentB|visitor-${i}`)
      if (a !== b) differing++
    }
    expect(differing / 10_000).toBeGreaterThan(0.45)
    expect(differing / 10_000).toBeLessThan(0.55)
  })

  test("correlates when the name trails the seed - do not seed that way", () => {
    // FNV-1a hardly moves the bucket when only the tail of the seed differs, so
    // `${visitor}|${name}` puts the same visitors in the same arm of every
    // experiment. Pinned as a regression test because the proxy adapter still
    // seeds this way: reordering it would re-bucket a running experiment
    // mid-flight, so it has to change between tests, not during one.
    let differing = 0
    for (let i = 0; i < 10_000; i++) {
      const a = assignVariantIndex(evenSplit, `visitor-${i}|ExperimentA`)
      const b = assignVariantIndex(evenSplit, `visitor-${i}|ExperimentB`)
      if (a !== b) differing++
    }
    expect(differing / 10_000).toBeLessThan(0.05)
  })

  test("returns the original when no weight is assigned", () => {
    const noWeight = config([
      { name: "Original", weight: 0 },
      { name: "VariantA", weight: 0 },
    ])
    expect(assignVariantIndex(noWeight, "visitor-abc")).toBe(0)
  })

  test("honors a fully weighted single arm", () => {
    const allVariant = config([
      { name: "Original", weight: 0 },
      { name: "VariantA", weight: 100 },
    ])
    for (let i = 0; i < 100; i++) {
      expect(assignVariantIndex(allVariant, `visitor-${i}`)).toBe(1)
    }
  })
})
