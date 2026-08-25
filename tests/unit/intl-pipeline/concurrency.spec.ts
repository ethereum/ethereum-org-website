/**
 * Concurrency Pool Tests -- CONCURRENCY-SPEC.md Part 1
 */

import { expect, test } from "@playwright/test"

import { createTaskPool } from "../../../src/scripts/intl-pipeline/lib/utils/task-pool"

test.describe("Concurrency pool", () => {
  test("with concurrency=2 and 4 tasks, at most 2 run simultaneously", async () => {
    let activeTasks = 0
    let maxActive = 0

    const pool = createTaskPool({ concurrency: 2, delayBetweenMs: 0 })

    for (let i = 0; i < 4; i++) {
      pool.submit("ko", async () => {
        activeTasks++
        maxActive = Math.max(maxActive, activeTasks)
        await new Promise((r) => setTimeout(r, 50))
        activeTasks--
      })
    }

    await pool.drain()
    expect(maxActive).toBeLessThanOrEqual(2)
    expect(maxActive).toBeGreaterThan(0)
  })

  test("all tasks complete regardless of submission order", async () => {
    const completed: number[] = []
    const pool = createTaskPool({ concurrency: 3, delayBetweenMs: 0 })

    const delays = [30, 10, 50, 20, 40, 5]
    delays.forEach((delay, i) => {
      pool.submit("ko", async () => {
        await new Promise((r) => setTimeout(r, delay))
        completed.push(i)
      })
    })

    await pool.drain()
    expect(completed.sort()).toEqual([0, 1, 2, 3, 4, 5])
  })

  test("token stats accumulate correctly across concurrent tasks", async () => {
    const pool = createTaskPool({ concurrency: 4, delayBetweenMs: 0 })

    pool.submit("ko", async () => ({ tokens: { input: 100, output: 50 } }))
    pool.submit("ko", async () => ({ tokens: { input: 200, output: 80 } }))
    pool.submit("es", async () => ({ tokens: { input: 150, output: 60 } }))

    await pool.drain()
    const stats = pool.getStats()

    expect(stats["ko"].totalInputTokens).toBe(300)
    expect(stats["ko"].totalOutputTokens).toBe(130)
    expect(stats["es"].totalInputTokens).toBe(150)
    expect(stats["es"].totalOutputTokens).toBe(60)
  })

  test("per-language completion callback fires exactly once per language", async () => {
    const completions: string[] = []

    const pool = createTaskPool({
      concurrency: 4,
      delayBetweenMs: 0,
      onLanguageComplete: (lang) => completions.push(lang),
    })

    pool.submit("ko", async () => {
      await new Promise((r) => setTimeout(r, 10))
    })
    pool.submit("ko", async () => {
      await new Promise((r) => setTimeout(r, 20))
    })
    pool.submit("es", async () => {
      await new Promise((r) => setTimeout(r, 5))
    })

    await pool.drain()

    expect(completions).toContain("ko")
    expect(completions).toContain("es")
    expect(completions.filter((l) => l === "ko")).toHaveLength(1)
    expect(completions.filter((l) => l === "es")).toHaveLength(1)
  })
})
