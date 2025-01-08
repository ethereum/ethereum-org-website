import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

export const revalidateLayer2Page = schedules.task({
  id: "revalidate-layer-2-page",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    await revalidatePaths(["/layer-2/"])
  },
})
