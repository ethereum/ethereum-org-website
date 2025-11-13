import { every } from "@/lib/utils/time"

import { fetchApps } from "@/lib/api/fetchApps"
import { fetchAttestantPosts } from "@/lib/api/fetchAttestantPosts"
import { fetchBeaconchainEpoch } from "@/lib/api/fetchBeaconchainEpoch"
import { fetchBeaconchainEthstore } from "@/lib/api/fetchBeaconchainEthstore"
import { fetchCalendarEvents } from "@/lib/api/fetchCalendarEvents"
import { fetchCommunityPicks } from "@/lib/api/fetchCommunityPicks"
import { fetchEthereumMarketcap } from "@/lib/api/fetchEthereumMarketcap"
import { fetchEthereumStablecoinsMcap } from "@/lib/api/fetchEthereumStablecoinsMcap"
import { fetchEthPrice } from "@/lib/api/fetchEthPrice"
import { fetchFrameworkGitHubData } from "@/lib/api/fetchFrameworkGitHubData"
import { fetchGFIs } from "@/lib/api/fetchGFIs"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchGrowThePieBlockspace } from "@/lib/api/fetchGrowThePieBlockspace"
import { fetchGrowThePieMaster } from "@/lib/api/fetchGrowThePieMaster"
import { fetchL2beat } from "@/lib/api/fetchL2beat"
import { fetchBlogFeeds } from "@/lib/api/fetchRSS"
import { fetchStablecoinsData } from "@/lib/api/fetchStablecoinsData"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"

export interface ExternalService {
  name: string
  key: string
  attribution?: string // TODO: Add attribution to the service info
  function: () => Promise<unknown>
  revalidationTime: number // Revalidation time in seconds
}

// Services that should be fetched hourly
export const externalServicesHourly: ExternalService[] = [
  {
    name: "Beaconcha.in epoch",
    key: "beaconchainEpoch",
    function: fetchBeaconchainEpoch,
    revalidationTime: every("hour"),
  },
  {
    name: "Beaconcha.in ethstore (APR)",
    key: "beaconchainApr",
    function: fetchBeaconchainEthstore,
    revalidationTime: every("hour"),
  },
  {
    name: "ETH Price - CoinGecko",
    key: "ethPrice",
    function: fetchEthPrice,
    revalidationTime: every("hour"),
  },
  {
    name: "Ethereum Market Cap - CoinGecko",
    key: "ethereumMarketcap",
    function: fetchEthereumMarketcap,
    revalidationTime: every("hour"),
  },
  {
    name: "Ethereum Stablecoins Market Cap - Llama.fi",
    key: "ethereumStablecoinsMcap",
    function: fetchEthereumStablecoinsMcap,
    revalidationTime: every("hour"),
  },
  {
    name: "TVL - Defi Llama",
    key: "totalValueLocked",
    function: fetchTotalValueLocked,
    revalidationTime: every("hour"),
  },
  {
    name: "GrowThePie - Transaction Data",
    key: "growThePie",
    function: fetchGrowThePie,
    revalidationTime: every("hour"),
  },
  {
    name: "GrowThePie - Blockspace Data",
    key: "growThePieBlockspace",
    function: fetchGrowThePieBlockspace,
    revalidationTime: every("hour"),
  },
  {
    name: "GrowThePie - Master Data",
    key: "growThePieMaster",
    function: fetchGrowThePieMaster,
    revalidationTime: every("hour"),
  },
  {
    name: "L2beat - Scaling Summary",
    key: "l2beatData",
    function: fetchL2beat,
    revalidationTime: every("hour"),
  },
  {
    name: "Stablecoins Data - CoinGecko",
    key: "stablecoinsData",
    function: fetchStablecoinsData,
    revalidationTime: every("hour"),
  },
]

// Services that should be fetched daily
export const externalServicesDaily: ExternalService[] = [
  {
    name: "Calendar Events - Google Calendar",
    key: "calendarEvents",
    function: fetchCalendarEvents,
    revalidationTime: every("day"),
  },
  {
    name: "Attestant Posts",
    key: "attestantPosts",
    function: fetchAttestantPosts,
    revalidationTime: every("day"),
  },
  {
    name: "Blog Feeds",
    key: "blogFeeds",
    function: fetchBlogFeeds,
    revalidationTime: every("day"),
  },
  {
    name: "Apps - Google Sheets",
    key: "appsData",
    function: fetchApps,
    revalidationTime: every("day"),
  },
  {
    name: "Community Picks",
    key: "communityPicks",
    function: fetchCommunityPicks,
    revalidationTime: every("day"),
  },
  {
    name: "GitHub Good First Issues",
    key: "gfissues",
    function: fetchGFIs,
    revalidationTime: every("day"),
  },
  {
    name: "Framework GitHub Data",
    key: "frameworkGitHubData",
    function: fetchFrameworkGitHubData,
    revalidationTime: every("day"),
  },
]
