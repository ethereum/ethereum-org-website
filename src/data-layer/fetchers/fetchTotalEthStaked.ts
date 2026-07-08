import type { MetricReturnData } from "@/lib/types"

import { fetchDuneCounter } from "./fetchDune"

// Net staked ETH (deposits − full withdrawals), from the same hildobby flows the
// percent-staked stat is built on, so the two stats stay consistent.
const DUNE_NET_STAKED_QUERY_ID = 1933035

/**
 * Fetch net ETH staked from Dune Analytics (deposits minus full withdrawals).
 * The staking page derives both the APR and the percent-staked baseline from
 * this value.
 */
export async function fetchTotalEthStaked(): Promise<MetricReturnData> {
  console.log("Starting total ETH staked data fetch from Dune Analytics")

  const value = await fetchDuneCounter(DUNE_NET_STAKED_QUERY_ID)
  const timestamp = Date.now()

  console.log("Successfully fetched total ETH staked data", {
    value,
    timestamp,
  })

  return { value, timestamp }
}
