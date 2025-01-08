import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

export const revalidateHomePage = schedules.task({
  id: "revalidate-home-page",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    await revalidatePaths(["/"])
  },
})
