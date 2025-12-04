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

    // Loop through all daily tasks and execute them
    for (const task of dailyTasks) {
      try {
        console.log(`Fetching data for task: ${task.id}`)
        const data = await task.fetchFunction()
        await setData(task.id, data)
        results[task.id] = { success: true, data }
      } catch (error) {
        console.error(`Error fetching data for task ${task.id}:`, error)
        results[task.id] = {
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }
      }
    }

    return results
  },
})
