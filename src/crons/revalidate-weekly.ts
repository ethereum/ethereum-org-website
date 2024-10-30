import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

const PATHS_TO_REVALIDATE = ["/stablecoins/"]

export const revalidateWeekly = schedules.task({
  id: "revalidate-weekly",
  // once a week
  cron: "0 0 * * 1",
  run: async () => {
    await revalidatePaths(PATHS_TO_REVALIDATE)
  },
})
