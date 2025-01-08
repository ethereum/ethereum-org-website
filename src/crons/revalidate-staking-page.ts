import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

export const revalidateStakingPage = schedules.task({
  id: "revalidate-staking-page",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    await revalidatePaths(["/staking/"])
  },
})
