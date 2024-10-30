import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./revalidate"

const PATHS_TO_REVALIDATE = ["/", "/staking/", "/wallets/find-wallet/"]

export const revalidateDaily = schedules.task({
  id: "revalidate-daily",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    await revalidatePaths(PATHS_TO_REVALIDATE)
  },
})
