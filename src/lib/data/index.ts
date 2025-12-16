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
  async () => {
    try {
      return await dataLayer.getEthPrice()
    } catch (error) {
      console.error(
        "[getEthPrice] Error calling dataLayer.getEthPrice():",
        error
      )
      throw error
    }
  },
  ["eth-price"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get L2BEAT scaling summary data (cached for 1 hour).
 */
export const getL2beatData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getL2beatData()
    } catch (error) {
      console.error(
        "[getL2beatData] Error calling dataLayer.getL2beatData():",
        error
      )
      throw error
    }
  },
  ["l2beat-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get apps data organized by category (cached for 24 hours).
 */
export const getAppsData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getAppsData()
    } catch (error) {
      console.error(
        "[getAppsData] Error calling dataLayer.getAppsData():",
        error
      )
      throw error
    }
  },
  ["apps-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get GrowThePie fundamentals data (cached for 1 hour).
 */
export const getGrowThePieData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getGrowThePieData()
    } catch (error) {
      console.error(
        "[getGrowThePieData] Error calling dataLayer.getGrowThePieData():",
        error
      )
      throw error
    }
  },
  ["grow-the-pie-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GrowThePie blockspace data (cached for 1 hour).
 */
export const getGrowThePieBlockspaceData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getGrowThePieBlockspaceData()
    } catch (error) {
      console.error(
        "[getGrowThePieBlockspaceData] Error calling dataLayer.getGrowThePieBlockspaceData():",
        error
      )
      throw error
    }
  },
  ["grow-the-pie-blockspace-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GrowThePie master data (cached for 24 hours).
 */
export const getGrowThePieMasterData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getGrowThePieMasterData()
    } catch (error) {
      console.error(
        "[getGrowThePieMasterData] Error calling dataLayer.getGrowThePieMasterData():",
        error
      )
      throw error
    }
  },
  ["grow-the-pie-master-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get community picks data (cached for 24 hours).
 */
export const getCommunityPicks = unstable_cache(
  async () => {
    try {
      return await dataLayer.getCommunityPicks()
    } catch (error) {
      console.error(
        "[getCommunityPicks] Error calling dataLayer.getCommunityPicks():",
        error
      )
      throw error
    }
  },
  ["community-picks"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get community calendar events (cached for 1 hour).
 */
export const getCalendarEvents = unstable_cache(
  async () => {
    try {
      return await dataLayer.getCalendarEvents()
    } catch (error) {
      console.error(
        "[getCalendarEvents] Error calling dataLayer.getCalendarEvents():",
        error
      )
      throw error
    }
  },
  ["calendar-events"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get RSS feeds from community blogs (cached for 1 hour).
 */
export const getRSSData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getRSSData()
    } catch (error) {
      console.error("[getRSSData] Error calling dataLayer.getRSSData():", error)
      throw error
    }
  },
  ["rss-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get Attestant blog posts (cached for 1 hour).
 */
export const getAttestantPosts = unstable_cache(
  async () => {
    try {
      return await dataLayer.getAttestantPosts()
    } catch (error) {
      console.error(
        "[getAttestantPosts] Error calling dataLayer.getAttestantPosts():",
        error
      )
      throw error
    }
  },
  ["attestant-posts"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get beaconchain epoch data (cached for 1 hour).
 */
export const getBeaconchainEpochData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getBeaconchainEpochData()
    } catch (error) {
      console.error(
        "[getBeaconchainEpochData] Error calling dataLayer.getBeaconchainEpochData():",
        error
      )
      throw error
    }
  },
  ["beaconchain-epoch-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get beaconchain ETH store data (cached for 1 hour).
 */
export const getBeaconchainEthstoreData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getBeaconchainEthstoreData()
    } catch (error) {
      console.error(
        "[getBeaconchainEthstoreData] Error calling dataLayer.getBeaconchainEthstoreData():",
        error
      )
      throw error
    }
  },
  ["beaconchain-ethstore-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get blobscan overall stats (cached for 1 hour).
 */
export const getBlobscanStats = unstable_cache(
  async () => {
    try {
      return await dataLayer.getBlobscanStats()
    } catch (error) {
      console.error(
        "[getBlobscanStats] Error calling dataLayer.getBlobscanStats():",
        error
      )
      throw error
    }
  },
  ["blobscan-stats"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get Ethereum market cap data (cached for 1 hour).
 */
export const getEthereumMarketcapData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getEthereumMarketcapData()
    } catch (error) {
      console.error(
        "[getEthereumMarketcapData] Error calling dataLayer.getEthereumMarketcapData():",
        error
      )
      throw error
    }
  },
  ["ethereum-marketcap-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get Ethereum stablecoins market cap data (cached for 1 hour).
 */
export const getEthereumStablecoinsMcapData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getEthereumStablecoinsMcapData()
    } catch (error) {
      console.error(
        "[getEthereumStablecoinsMcapData] Error calling dataLayer.getEthereumStablecoinsMcapData():",
        error
      )
      throw error
    }
  },
  ["ethereum-stablecoins-mcap-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GitHub good first issues (cached for 1 hour).
 */
export const getGFIs = unstable_cache(
  async () => {
    try {
      return await dataLayer.getGFIs()
    } catch (error) {
      console.error("[getGFIs] Error calling dataLayer.getGFIs():", error)
      throw error
    }
  },
  ["gfis"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GitHub commit history (cached for 1 hour).
 */
export const getGitHistory = unstable_cache(
  async () => {
    try {
      return await dataLayer.getGitHistory()
    } catch (error) {
      console.error(
        "[getGitHistory] Error calling dataLayer.getGitHistory():",
        error
      )
      throw error
    }
  },
  ["git-history"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get GitHub repository data (cached for 24 hours).
 */
export const getGithubRepoData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getGithubRepoData()
    } catch (error) {
      console.error(
        "[getGithubRepoData] Error calling dataLayer.getGithubRepoData():",
        error
      )
      throw error
    }
  },
  ["github-repo-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

/**
 * Get Ethereum stablecoins data (cached for 1 hour).
 */
export const getStablecoinsData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getStablecoinsData()
    } catch (error) {
      console.error(
        "[getStablecoinsData] Error calling dataLayer.getStablecoinsData():",
        error
      )
      throw error
    }
  },
  ["stablecoins-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get total ETH staked data (cached for 1 hour).
 */
export const getTotalEthStakedData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getTotalEthStakedData()
    } catch (error) {
      console.error(
        "[getTotalEthStakedData] Error calling dataLayer.getTotalEthStakedData():",
        error
      )
      throw error
    }
  },
  ["total-eth-staked-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

/**
 * Get total value locked (TVL) data (cached for 1 hour).
 */
export const getTotalValueLockedData = unstable_cache(
  async () => {
    try {
      return await dataLayer.getTotalValueLockedData()
    } catch (error) {
      console.error(
        "[getTotalValueLockedData] Error calling dataLayer.getTotalValueLockedData():",
        error
      )
      throw error
    }
  },
  ["total-value-locked-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)
