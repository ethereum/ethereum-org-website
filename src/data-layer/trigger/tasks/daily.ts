import { schedules } from "@trigger.dev/sdk/v3"

import { dailyTasks } from "../../registry"
import { setData } from "../../storage/setter"

/**
 * Single Trigger.dev scheduled task for all daily tasks
 * Runs daily at midnight UTC and executes all daily fetch functions
 * This keeps us under the free tier limit of 10 schedules
 */
export const dailyTask = schedules.task({
  id: "daily-data-fetch",
  // Run daily at midnight UTC
  cron: "0 0 * * *",
  run: async () => {
    const results: Record<string, unknown> = {}

    // Execute all daily tasks in parallel
    const taskPromises = dailyTasks.map(async (task) => {
      try {
        console.log(`Fetching data for task: ${task.id}`)
        const data = await task.fetchFunction()
        await setData(task.id, data)
        return {
          taskId: task.id,
          success: true,
          data,
        }
      } catch (error) {
        console.error(`Error fetching data for task ${task.id}:`, error)
        return {
          taskId: task.id,
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }
      }
    })

    // Wait for all tasks to complete (success or failure)
    const settledResults = await Promise.allSettled(taskPromises)

    // Process results
    for (const result of settledResults) {
      if (result.status === "fulfilled") {
        const { taskId, success, ...rest } = result.value
        results[taskId] = { success, ...rest }
      } else {
        // This shouldn't happen since we catch errors in the map, but handle it just in case
        console.error("Unexpected error in Promise.allSettled:", result.reason)
      }
    }

    return results
  },
})
