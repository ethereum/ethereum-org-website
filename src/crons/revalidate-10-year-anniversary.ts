import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

export const revalidate10YearAnniversary = schedules.task({
  id: "revalidate-10-year-anniversary",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    await revalidatePaths(["/10-year-anniversary/"])
  },
})
