export const FETCH_APY_RATES_TASK_ID = "fetch-apy-rates"

export type ApyRatesData = {
  traditional: {
    label: string
    apy: number
  }
  ethereum: {
    label: string
    apyMin: number
    apyMax: number
  }
  timestamp: number
}

// TODO: Replace with actual data source when available
export async function fetchApyRates(): Promise<ApyRatesData> {
  const timestamp = Date.now()

  return {
    traditional: {
      label: "Traditional Savings",
      apy: 0.5,
    },
    ethereum: {
      label: "Ethereum Apps",
      apyMin: 4,
      apyMax: 8,
    },
    timestamp,
  }
}
