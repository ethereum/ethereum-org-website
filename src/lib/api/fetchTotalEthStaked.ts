import type {
  EthStoreResponse,
  MetricReturnData,
  TimestampedData,
} from "@/lib/types"

import { weiToRoundedEther } from "@/lib/utils/weiToRoundedEther"

import { BEACONCHA_IN_URL, DAYS_TO_FETCH } from "@/lib/constants"

const MS_PER_DAY = 1000 * 60 * 60 * 24
const DAY_DELTA = 5

export const fetchTotalEthStaked = async (): Promise<MetricReturnData> => {
  const { href: ethstoreLatest } = new URL(
    "api/v1/ethstore/latest",
    BEACONCHA_IN_URL
  )

  try {
    // 1- Use initial call to `latest` to fetch current Beacon Chain "day" (for use in secondary fetches)
    const ethstoreLatestResponse = await fetch(ethstoreLatest)
    if (!ethstoreLatestResponse.ok) {
      console.log(
        ethstoreLatestResponse.status,
        ethstoreLatestResponse.statusText
      )
      throw new Error("Failed to fetch Ethstore latest data")
    }

    const ethstoreJson: EthStoreResponse = await ethstoreLatestResponse.json()
    const {
      data: { day, effective_balances_sum_wei },
    } = ethstoreJson
    const valueTotalEth = weiToRoundedEther(effective_balances_sum_wei)

    const data: TimestampedData<number>[] = [
      { timestamp: new Date().getTime(), value: valueTotalEth },
    ]

    // 2- Perform multiple API calls to fetch data for the last 90 days, `getData` for caching
    for (let i = DAY_DELTA; i <= DAYS_TO_FETCH; i += DAY_DELTA) {
      const lookupDay = day - i
      const timestamp = new Date().getTime() - i * MS_PER_DAY

      const { href: ethstoreDay } = new URL(
        `api/v1/ethstore/${lookupDay}`,
        BEACONCHA_IN_URL
      )

      const ethstoreDayResponse = await fetch(ethstoreDay)
      if (!ethstoreDayResponse.ok) {
        console.log(ethstoreDayResponse.status, ethstoreDayResponse.statusText)
        throw new Error("Failed to fetch Ethstore day data")
      }

      const ethstoreDayJson: EthStoreResponse = await ethstoreDayResponse.json()
      const {
        data: { effective_balances_sum_wei: sumWei },
      } = ethstoreDayJson
      const value = weiToRoundedEther(sumWei)

      data.push({ timestamp, value })
    }

    data.sort((a, b) => a.timestamp - b.timestamp)

    return {
      data, // historical data: { timestamp: unix-milliseconds, value }
      value: valueTotalEth, // current value (number, unformatted)
    }
  } catch (error: unknown) {
    console.error((error as Error).message)
    return { error: (error as Error).message }
  }
}
