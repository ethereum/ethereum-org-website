import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

export const revalidateStablecoinsPage = schedules.task({
  id: "revalidate-stablecoins-page",
  // once a week
  cron: "0 0 * * 1",
  run: async () => {
    await revalidatePaths(["/stablecoins/"])
  },
})
