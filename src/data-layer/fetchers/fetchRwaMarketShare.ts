import { fetchRetry } from "./fetchRetry"

// IDs and network lists mirror ethereum/institutions-subdomain lib/constants.ts
const STABLECOINS_GROUP_ID = 28
const MEASURE_ID = { rwas: 71, stablecoins: 70 } as const
const MAINNET_ID = 1
// rwa.xyz does not tag L2s by parent chain
const LAYER_2_IDS = [3, 4, 7, 10, 11, 17, 31, 33, 35, 36, 41]
// Permissioned chains, excluded like rwa.xyz's "Distributed" view
const EXCLUDED_NETWORK_IDS = [68, 13, 74]

type Category = keyof typeof MEASURE_ID

type RwaTimeseriesResponse = {
  results: { group: { id: number }; points: [string, number][] }[]
}

export type RwaMarketShareData =
  | {
      /** Ethereum L1 + L2 share of distributed tokenized assets, 0-1 */
      rwas: number
      /** Ethereum L1 + L2 share of distributed stablecoin supply, 0-1 */
      stablecoins: number
      timestamp: number
    }
  | { error: string }

const daysAgoIso = (days: number) => {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() - days)
  date.setUTCHours(0, 0, 0, 0)
  return date.toISOString()
}

const fetchEthereumShare = async (
  category: Category,
  apiKey: string
): Promise<number> => {
  const url = new URL("https://api.rwa.xyz/v4/tokens/aggregates/timeseries")
  url.searchParams.set(
    "query",
    JSON.stringify({
      filter: {
        operator: "and",
        filters: [
          {
            field: "measure_id",
            operator: "equals",
            value: MEASURE_ID[category],
          },
          { field: "date", operator: "onOrAfter", value: daysAgoIso(2) },
          {
            field: "asset_class_id",
            operator: category === "stablecoins" ? "equals" : "notEquals",
            value: STABLECOINS_GROUP_ID,
          },
        ],
      },
      aggregate: { groupBy: "network", aggregateFunction: "sum" },
      sort: { direction: "asc", field: "date" },
      pagination: { page: 1, perPage: 100 },
    })
  )

  const response = await fetchRetry(url.toString(), {
    headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
  })

  if (!response.ok) {
    throw new Error(`rwa.xyz ${category} responded with ${response.status}`)
  }

  const { results }: RwaTimeseriesResponse = await response.json()
  const latest = results
    .filter(({ group }) => !EXCLUDED_NETWORK_IDS.includes(group.id))
    .map(({ group, points }) => ({
      id: group.id,
      value: points[points.length - 1]?.[1] ?? 0,
    }))

  const total = latest.reduce((sum, { value }) => sum + value, 0)
  const ethereum = latest
    .filter(({ id }) => id === MAINNET_ID || LAYER_2_IDS.includes(id))
    .reduce((sum, { value }) => sum + value, 0)

  if (!total) throw new Error(`rwa.xyz returned no ${category} data`)

  return ethereum / total
}

/**
 * Ethereum's (L1 + L2) share of tokenized real world assets and stablecoins.
 * Requires RWA_API_KEY.
 *
 * @see https://www.rwa.xyz
 */
export async function fetchRwaMarketShare(): Promise<RwaMarketShareData> {
  const apiKey = process.env.RWA_API_KEY
  if (!apiKey) throw new Error("rwa.xyz API key not found (RWA_API_KEY)")

  const [rwas, stablecoins] = await Promise.all([
    fetchEthereumShare("rwas", apiKey),
    fetchEthereumShare("stablecoins", apiKey),
  ])

  return { rwas, stablecoins, timestamp: Date.now() }
}
