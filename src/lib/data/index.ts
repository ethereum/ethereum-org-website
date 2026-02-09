import { cache } from "react"
import { unstable_cache } from "next/cache"

import * as dataLayer from "@/data-layer"

import { BASE_TIME_UNIT } from "@/lib/constants"

const CACHE_REVALIDATE_HOUR = BASE_TIME_UNIT
const CACHE_REVALIDATE_DAY = BASE_TIME_UNIT * 24

function createCachedGetter<T>(
  fetcher: () => Promise<T>,
  cacheKey: string[],
  revalidate: number
) {
  const persistentCache = unstable_cache(fetcher, cacheKey, { revalidate })
  return cache(persistentCache)
}

export const getEthPrice = createCachedGetter(
  dataLayer.getEthPrice,
  ["eth-price"],
  CACHE_REVALIDATE_HOUR
)

export const getL2beatData = createCachedGetter(
  dataLayer.getL2beatData,
  ["l2beat-data"],
  CACHE_REVALIDATE_HOUR
)

export const getAppsData = createCachedGetter(
  dataLayer.getAppsData,
  ["apps-data"],
  CACHE_REVALIDATE_DAY
)

export const getGrowThePieData = createCachedGetter(
  dataLayer.getGrowThePieData,
  ["grow-the-pie-data"],
  CACHE_REVALIDATE_HOUR
)

export const getGrowThePieBlockspaceData = createCachedGetter(
  dataLayer.getGrowThePieBlockspaceData,
  ["grow-the-pie-blockspace-data"],
  CACHE_REVALIDATE_HOUR
)

export const getGrowThePieMasterData = createCachedGetter(
  dataLayer.getGrowThePieMasterData,
  ["grow-the-pie-master-data"],
  CACHE_REVALIDATE_DAY
)

export const getCommunityPicks = createCachedGetter(
  dataLayer.getCommunityPicks,
  ["community-picks"],
  CACHE_REVALIDATE_DAY
)

export const getCalendarEvents = createCachedGetter(
  dataLayer.getCalendarEvents,
  ["calendar-events"],
  CACHE_REVALIDATE_HOUR
)

export const getRSSData = createCachedGetter(
  dataLayer.getRSSData,
  ["rss-data"],
  CACHE_REVALIDATE_HOUR
)

export const getAttestantPosts = createCachedGetter(
  dataLayer.getAttestantPosts,
  ["attestant-posts"],
  CACHE_REVALIDATE_HOUR
)

export const getBeaconchainData = createCachedGetter(
  dataLayer.getBeaconchainData,
  ["beaconchain-data"],
  CACHE_REVALIDATE_HOUR
)

export const getBlobscanStats = createCachedGetter(
  dataLayer.getBlobscanStats,
  ["blobscan-stats"],
  CACHE_REVALIDATE_HOUR
)

export const getEthereumMarketcapData = createCachedGetter(
  dataLayer.getEthereumMarketcapData,
  ["ethereum-marketcap-data"],
  CACHE_REVALIDATE_HOUR
)

export const getEthereumStablecoinsMcapData = createCachedGetter(
  dataLayer.getEthereumStablecoinsMcapData,
  ["ethereum-stablecoins-mcap-data"],
  CACHE_REVALIDATE_HOUR
)

export const getGFIs = createCachedGetter(
  dataLayer.getGFIs,
  ["gfis"],
  CACHE_REVALIDATE_HOUR
)

export const getGitHistory = createCachedGetter(
  dataLayer.getGitHistory,
  ["git-history"],
  CACHE_REVALIDATE_HOUR
)

export const getGithubRepoData = createCachedGetter(
  dataLayer.getGithubRepoData,
  ["github-repo-data"],
  CACHE_REVALIDATE_DAY
)

export const getStablecoinsData = createCachedGetter(
  dataLayer.getStablecoinsData,
  ["stablecoins-data"],
  CACHE_REVALIDATE_HOUR
)

export const getTotalEthStakedData = createCachedGetter(
  dataLayer.getTotalEthStakedData,
  ["total-eth-staked-data"],
  CACHE_REVALIDATE_HOUR
)

export const getTotalValueLockedData = createCachedGetter(
  dataLayer.getTotalValueLockedData,
  ["total-value-locked-data"],
  CACHE_REVALIDATE_HOUR
)

export const getEventsData = createCachedGetter(
  dataLayer.getEventsData,
  ["events-data"],
  CACHE_REVALIDATE_DAY
)

export const getAccountHolders = createCachedGetter(
  dataLayer.getAccountHolders,
  ["account-holders"],
  CACHE_REVALIDATE_DAY
)

export const getApyRates = createCachedGetter(
  dataLayer.getApyRates,
  ["apy-rates"],
  CACHE_REVALIDATE_DAY
)
