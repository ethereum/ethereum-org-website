import { schedules } from "@trigger.dev/sdk/v3"

import { revalidatePaths } from "./utils"

export const revalidateFindWalletPage = schedules.task({
  id: "revalidate-find-wallet-page",
  // every day
  cron: "0 0 * * *",
  run: async () => {
    await revalidatePaths(["/wallets/find-wallet/"])
  },
})
