import type { MetricReturnData } from "@/lib/types"

export const FETCH_ACCOUNT_HOLDERS_TASK_ID = "fetch-account-holders"

// TODO: Replace with actual data source when available
export async function fetchAccountHolders(): Promise<MetricReturnData> {
  const accountHolders = 290_000_000
  const timestamp = Date.now()

  return { value: accountHolders, timestamp }
}
