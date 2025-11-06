import { fetchApps } from "@/lib/api/refactor/fetchApps"
import { fetchAttestantPosts } from "@/lib/api/refactor/fetchAttestantPosts"
import { fetchBeaconchainEpoch } from "@/lib/api/refactor/fetchBeaconchainEpoch"
import { fetchCalendarEvents } from "@/lib/api/refactor/fetchCalendarEvents"
import { fetchEthPrice } from "@/lib/api/refactor/fetchEthPrice"
import { fetchBlogFeeds } from "@/lib/api/refactor/fetchRSS"
import { fetchTotalValueLocked } from "@/lib/api/refactor/fetchTotalValueLocked"

export interface ExternalService {
  name: string
  key: string
  attribution?: string // TODO: Add attribution to the service info
  function: () => Promise<unknown>
}

// Services that should be fetched hourly
export const externalServicesHourly: ExternalService[] = [
  {
    name: "Beaconcha.in epoch",
    key: "beaconchainEpoch",
    function: fetchBeaconchainEpoch,
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

// Services that should be fetched daily
export const externalServicesDaily: ExternalService[] = [
  {
    name: "Calendar Events - Google Calendar",
    key: "calendarEvents",
    function: fetchCalendarEvents,
  },
  {
    name: "Attestant Posts",
    key: "attestantPosts",
    function: fetchAttestantPosts,
  },
  {
    name: "Blog Feeds",
    key: "blogFeeds",
    function: fetchBlogFeeds,
  },
  {
    name: "Apps - Google Sheets",
    key: "appsData",
    function: fetchApps,
  },
]
