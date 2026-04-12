/**
 * Concurrency Pool Tests -- CONCURRENCY-SPEC.md Part 1
 *
 * Tests marked test.fixme() require implementation to be wired in.
 */

import { test } from "@playwright/test"

// TODO: import { createTaskPool } from "../../src/scripts/intl-pipeline/lib/utils/task-pool"

// ===================================================================
// PART 1: Concurrency Pool (Spec lines 25-57)
// ===================================================================

test.describe("Concurrency pool", () => {
  test.fixme(
    "with concurrency=2 and 4 tasks, at most 2 run simultaneously",
    async () => {
      // Needs: createTaskPool(2)
      // Submit 4 async tasks, track peak active count
      // Assert maxActive <= 2
    }
  )

  test.fixme("all tasks complete regardless of submission order", async () => {
    // Needs: createTaskPool(3)
    // Submit 6 tasks with varying delays
    // Assert all 6 complete
  })

  test.fixme(
    "token stats accumulate correctly across concurrent tasks",
    async () => {
      // Needs: createTaskPool with token tracking
      // Submit tasks that report token usage
      // Assert per-language totals are correct
    }
  )

  test.fixme(
    "per-language completion callback fires exactly once per language",
    async () => {
      // Needs: createTaskPool with onLanguageComplete callback
      // Submit tasks for ko and es
      // Assert callback fires once for ko, once for es
      // Assert callback fires AFTER all tasks for that language complete
    }
  )
})
