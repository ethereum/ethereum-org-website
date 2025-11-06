import { fetchApps } from "@/lib/api/refactor/fetchApps"
import { fetchAttestantPosts } from "@/lib/api/refactor/fetchAttestantPosts"
import { fetchBeaconchainEpoch } from "@/lib/api/refactor/fetchBeaconchainEpoch"
import { fetchBeaconchainEthstore } from "@/lib/api/refactor/fetchBeaconchainEthstore"
import { fetchCalendarEvents } from "@/lib/api/refactor/fetchCalendarEvents"
import { fetchCommunityPicks } from "@/lib/api/refactor/fetchCommunityPicks"
import { fetchEthereumMarketcap } from "@/lib/api/refactor/fetchEthereumMarketcap"
import { fetchEthPrice } from "@/lib/api/refactor/fetchEthPrice"
import { fetchGrowThePie } from "@/lib/api/refactor/fetchGrowThePie"
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
    name: "Beaconcha.in ethstore (APR)",
    key: "beaconchainApr",
    function: fetchBeaconchainEthstore,
  },
  {
    name: "ETH Price - CoinGecko",
    key: "ethPrice",
    function: fetchEthPrice,
  },
  {
    name: "Ethereum Market Cap - CoinGecko",
    key: "ethereumMarketcap",
    function: fetchEthereumMarketcap,
  },
  {
    name: "TVL - Defi Llama",
    key: "totalValueLocked",
    function: fetchTotalValueLocked,
  },
  {
    name: "GrowThePie - Transaction Data",
    key: "growThePie",
    function: fetchGrowThePie,
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
  {
    name: "Community Picks",
    key: "communityPicks",
    function: fetchCommunityPicks,
  },
]
