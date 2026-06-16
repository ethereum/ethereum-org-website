import type { MetricReturnData } from "@/lib/types"

import { fetchDuneCounter } from "./fetchDune"

// "% of ETH staked" counter from hildobby's eth2-staking dashboard
// (https://dune.com/queries/1933048).
const DUNE_STAKED_PERCENTAGE_QUERY_ID = 1933048

/**
 * Fetch the share of the total ETH supply currently staked, from Dune Analytics.
 * Returns a fraction (e.g. 0.32 for 32%). The source counter may express this as
 * a percentage (31.85) or a fraction (0.3185), so normalize to a fraction.
 */
export async function fetchStakedPercentage(): Promise<MetricReturnData> {
  console.log("Starting staked percentage data fetch from Dune Analytics")

  const raw = await fetchDuneCounter(DUNE_STAKED_PERCENTAGE_QUERY_ID)
  const value = raw > 1 ? raw / 100 : raw
  const timestamp = Date.now()

  console.log("Successfully fetched staked percentage", { value, timestamp })

  return { value, timestamp }
}
