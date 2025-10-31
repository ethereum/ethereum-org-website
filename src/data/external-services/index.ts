import { fetchBeaconchainEpoch } from "@/lib/api/refactor/fetchBeaconchainEpoch"
import { fetchCalendarEvents } from "@/lib/api/refactor/fetchCalendarEvents"
import { fetchEthPrice } from "@/lib/api/refactor/fetchEthPrice"
import { fetchTotalValueLocked } from "@/lib/api/refactor/fetchTotalValueLocked"

export interface ExternalService {
  name: string
  key: string
  attribution?: string // TODO: Add attribution to the service info
  cadence?: string // TODO: Add cadence to the service info (check based on the timestamp if this needs to run)
  function: () => Promise<unknown>
}

//TODO: Daily external services and Hourly external services

export const externalServices: ExternalService[] = [
  {
    name: "Beaconcha.in epoch",
    key: "beaconchainEpoch",
    function: fetchBeaconchainEpoch,
  },
  {
    name: "Calendar Events - Google Calendar",
    key: "calendarEvents",
    function: fetchCalendarEvents,
  },
  {
    name: "ETH Price - CoinGecko",
    key: "ethPrice",
    function: fetchEthPrice,
  },
  {
    name: "TVL - Defi Llama",
    key: "totalValueLocked",
    function: fetchTotalValueLocked,
  },
]
