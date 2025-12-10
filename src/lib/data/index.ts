import { unstable_cache } from "next/cache"

import * as dataLayer from "@/data-layer"

import { BASE_TIME_UNIT } from "@/lib/constants"

// Cache configuration constants
const CACHE_REVALIDATE_HOUR = BASE_TIME_UNIT // 1 hour in seconds
const CACHE_REVALIDATE_DAY = BASE_TIME_UNIT * 24 // 24 hours in seconds

/**
 * Get Ethereum price data (cached for 1 hour).
 */
export const getEthPrice = unstable_cache(
  () => dataLayer.getEthPrice(),
  ["eth-price"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get L2BEAT scaling summary data (cached for 1 hour).
 */
export const getL2beatData = unstable_cache(
  () => dataLayer.getL2beatData(),
  ["l2beat-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get apps data organized by category (cached for 24 hours).
 */
export const getAppsData = unstable_cache(
  () => dataLayer.getAppsData(),
  ["apps-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get GrowThePie fundamentals data (cached for 1 hour).
 */
export const getGrowThePieData = unstable_cache(
  () => dataLayer.getGrowThePieData(),
  ["grow-the-pie-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GrowThePie blockspace data (cached for 1 hour).
 */
export const getGrowThePieBlockspaceData = unstable_cache(
  () => dataLayer.getGrowThePieBlockspaceData(),
  ["grow-the-pie-blockspace-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GrowThePie master data (cached for 24 hours).
 */
export const getGrowThePieMasterData = unstable_cache(
  () => dataLayer.getGrowThePieMasterData(),
  ["grow-the-pie-master-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get community picks data (cached for 24 hours).
 */
export const getCommunityPicks = unstable_cache(
  () => dataLayer.getCommunityPicks(),
  ["community-picks"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get community calendar events (cached for 1 hour).
 */
export const getCalendarEvents = unstable_cache(
  () => dataLayer.getCalendarEvents(),
  ["calendar-events"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get RSS feeds from community blogs (cached for 1 hour).
 */
export const getRSSData = unstable_cache(
  () => dataLayer.getRSSData(),
  ["rss-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get Attestant blog posts (cached for 1 hour).
 */
export const getAttestantPosts = unstable_cache(
  () => dataLayer.getAttestantPosts(),
  ["attestant-posts"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get beaconchain epoch data (cached for 1 hour).
 */
export const getBeaconchainEpochData = unstable_cache(
  () => dataLayer.getBeaconchainEpochData(),
  ["beaconchain-epoch-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get beaconchain ETH store data (cached for 1 hour).
 */
export const getBeaconchainEthstoreData = unstable_cache(
  () => dataLayer.getBeaconchainEthstoreData(),
  ["beaconchain-ethstore-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get blobscan overall stats (cached for 1 hour).
 */
export const getBlobscanStats = unstable_cache(
  () => dataLayer.getBlobscanStats(),
  ["blobscan-stats"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get Ethereum market cap data (cached for 1 hour).
 */
export const getEthereumMarketcapData = unstable_cache(
  () => dataLayer.getEthereumMarketcapData(),
  ["ethereum-marketcap-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get Ethereum stablecoins market cap data (cached for 1 hour).
 */
export const getEthereumStablecoinsMcapData = unstable_cache(
  () => dataLayer.getEthereumStablecoinsMcapData(),
  ["ethereum-stablecoins-mcap-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GitHub good first issues (cached for 1 hour).
 */
export const getGFIs = unstable_cache(() => dataLayer.getGFIs(), ["gfis"], {
  revalidate: CACHE_REVALIDATE_HOUR,
})

/**
 * Get GitHub commit history (cached for 1 hour).
 */
export const getGitHistory = unstable_cache(
  () => dataLayer.getGitHistory(),
  ["git-history"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GitHub repository data (cached for 24 hours).
 */
export const getGithubRepoData = unstable_cache(
  () => dataLayer.getGithubRepoData(),
  ["github-repo-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get Ethereum stablecoins data (cached for 1 hour).
 */
export const getStablecoinsData = unstable_cache(
  () => dataLayer.getStablecoinsData(),
  ["stablecoins-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get total ETH staked data (cached for 1 hour).
 */
export const getTotalEthStakedData = unstable_cache(
  () => dataLayer.getTotalEthStakedData(),
  ["total-eth-staked-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get total value locked (TVL) data (cached for 1 hour).
 */
export const getTotalValueLockedData = unstable_cache(
  () => dataLayer.getTotalValueLockedData(),
  ["total-value-locked-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)
