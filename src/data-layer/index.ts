import type {
  AppData,
  BeaconchainEpochData,
  BlobscanOverallStats,
  BlockspaceData,
  Commit,
  CommunityPick,
  EventItem,
  GHIssue,
  GithubRepoData,
  GrowThePieData,
  GrowThePieMasterData,
  L2beatData,
  MetricReturnData,
  RSSItem,
} from "@/lib/types"
import type { CommunityEventsReturnType } from "@/lib/interfaces"

import { FETCH_APPS_TASK_ID } from "./api/fetchApps"
import { FETCH_BEACONCHAIN_EPOCH_TASK_ID } from "./api/fetchBeaconChainEpoch"
import { FETCH_BEACONCHAIN_ETHSTORE_TASK_ID } from "./api/fetchBeaconChainEthstore"
import { FETCH_BLOBSCAN_STATS_TASK_ID } from "./api/fetchBlobscanStats"
import { FETCH_CALENDAR_EVENTS_TASK_ID } from "./api/fetchCalendarEvents"
import { FETCH_COMMUNITY_PICKS_TASK_ID } from "./api/fetchCommunityPicks"
import { FETCH_ETHEREUM_MARKETCAP_TASK_ID } from "./api/fetchEthereumMarketcap"
import { FETCH_ETHEREUM_STABLECOINS_MCAP_TASK_ID } from "./api/fetchEthereumStablecoinsMcap"
import { FETCH_ETH_PRICE_TASK_ID } from "./api/fetchEthPrice"
import { FETCH_EVENTS_TASK_ID } from "./api/fetchEvents"
import { FETCH_GFIS_TASK_ID } from "./api/fetchGFIs"
import { FETCH_GIT_HISTORY_TASK_ID } from "./api/fetchGitHistory"
import { FETCH_GITHUB_REPO_DATA_TASK_ID } from "./api/fetchGithubRepoData"
import { FETCH_GROW_THE_PIE_TASK_ID } from "./api/fetchGrowThePie"
import { FETCH_GROW_THE_PIE_BLOCKSPACE_TASK_ID } from "./api/fetchGrowThePieBlockspace"
import { FETCH_GROW_THE_PIE_MASTER_TASK_ID } from "./api/fetchGrowThePieMaster"
import { FETCH_L2BEAT_TASK_ID } from "./api/fetchL2beat"
import { FETCH_POSTS_TASK_ID } from "./api/fetchPosts"
import { FETCH_RSS_TASK_ID } from "./api/fetchRSS"
import {
  CoinGeckoCoinMarketResponse,
  FETCH_STABLECOINS_DATA_TASK_ID,
} from "./api/fetchStablecoinsData"
import { FETCH_TOTAL_ETH_STAKED_TASK_ID } from "./api/fetchTotalEthStaked"
import { FETCH_TOTAL_VALUE_LOCKED_TASK_ID } from "./api/fetchTotalValueLocked"
import { getData } from "./storage/getter"

/**
 * Get Ethereum price data.
 * @returns The latest ETH price in USD, or null if not available
 */
export async function getEthPrice(): Promise<MetricReturnData | null> {
  return getData<MetricReturnData>(FETCH_ETH_PRICE_TASK_ID)
}

/**
 * Get L2BEAT scaling summary data.
 * @returns L2BEAT project data including TVL, maturity, and other metrics, or null if not available
 */
export async function getL2beatData(): Promise<L2beatData | null> {
  return getData<L2beatData>(FETCH_L2BEAT_TASK_ID)
}

/**
 * Get apps data organized by category.
 * @returns Apps data grouped by category, or null if not available
 */
export async function getAppsData(): Promise<Record<string, AppData[]> | null> {
  return getData<Record<string, AppData[]>>(FETCH_APPS_TASK_ID)
}

/**
 * Get GrowThePie fundamentals data.
 * @returns Transaction counts, costs, and active addresses for Layer 2 networks, or null if not available
 */
export async function getGrowThePieData(): Promise<GrowThePieData | null> {
  return getData<GrowThePieData>(FETCH_GROW_THE_PIE_TASK_ID)
}

/**
 * Get GrowThePie blockspace data.
 * @returns Blockspace usage data (NFT, DeFi, social, token transfers, unlabeled) for each network, or null if not available
 */
export async function getGrowThePieBlockspaceData(): Promise<Record<
  string,
  BlockspaceData
> | null> {
  return getData<Record<string, BlockspaceData>>(
    FETCH_GROW_THE_PIE_BLOCKSPACE_TASK_ID
  )
}

/**
 * Get GrowThePie master data containing chain launch dates.
 * @returns Launch dates for all chains indexed by their URL key, or null if not available
 */
export async function getGrowThePieMasterData(): Promise<GrowThePieMasterData | null> {
  return getData<GrowThePieMasterData>(FETCH_GROW_THE_PIE_MASTER_TASK_ID)
}

/**
 * Get community picks data.
 * @returns Community picks data, or null if not available
 */
export async function getCommunityPicks(): Promise<CommunityPick[] | null> {
  return getData<CommunityPick[]>(FETCH_COMMUNITY_PICKS_TASK_ID)
}

/**
 * Get community calendar events.
 * @returns Past and upcoming community events, or null if not available
 */
export async function getCalendarEvents(): Promise<CommunityEventsReturnType | null> {
  return getData<CommunityEventsReturnType>(FETCH_CALENDAR_EVENTS_TASK_ID)
}

/**
 * Get RSS feeds from community blogs.
 * @returns Array of RSS items grouped by source, or null if not available
 */
export async function getRSSData(): Promise<RSSItem[][] | null> {
  return getData<RSSItem[][]>(FETCH_RSS_TASK_ID)
}

/**
 * Get Attestant blog posts.
 * @returns Array of RSS items from the Attestant blog, or null if not available
 */
export async function getAttestantPosts(): Promise<RSSItem[] | null> {
  return getData<RSSItem[]>(FETCH_POSTS_TASK_ID)
}

/**
 * Get beaconchain epoch data.
 * @returns Latest epoch data including total ETH staked and validator count, or null if not available
 */
export async function getBeaconchainEpochData(): Promise<BeaconchainEpochData | null> {
  return getData<BeaconchainEpochData>(FETCH_BEACONCHAIN_EPOCH_TASK_ID)
}

/**
 * Get beaconchain ETH store data (APR).
 * @returns ETH store APR data, or null if not available
 */
export async function getBeaconchainEthstoreData(): Promise<MetricReturnData | null> {
  return getData<MetricReturnData>(FETCH_BEACONCHAIN_ETHSTORE_TASK_ID)
}

/**
 * Get blobscan overall stats.
 * @returns Blobscan statistics including blob fees, gas usage, and transaction counts, or null if not available
 */
export async function getBlobscanStats(): Promise<BlobscanOverallStats | null> {
  return getData<BlobscanOverallStats>(FETCH_BLOBSCAN_STATS_TASK_ID)
}

/**
 * Get Ethereum market cap data.
 * @returns Ethereum market cap metric data, or null if not available
 */
export async function getEthereumMarketcapData(): Promise<MetricReturnData | null> {
  return getData<MetricReturnData>(FETCH_ETHEREUM_MARKETCAP_TASK_ID)
}

/**
 * Get Ethereum stablecoins market cap data.
 * @returns Ethereum stablecoins market cap metric data, or null if not available
 */
export async function getEthereumStablecoinsMcapData(): Promise<MetricReturnData | null> {
  return getData<MetricReturnData>(FETCH_ETHEREUM_STABLECOINS_MCAP_TASK_ID)
}

/**
 * Get GitHub good first issues.
 * @returns Array of GitHub issues labeled as "good first issue", or null if not available
 */
export async function getGFIs(): Promise<GHIssue[] | null> {
  return getData<GHIssue[]>(FETCH_GFIS_TASK_ID)
}

/**
 * Get GitHub commit history.
 * @returns Recent commit history from the repository, or null if not available
 */
export async function getGitHistory(): Promise<Commit[] | null> {
  return getData<Commit[]>(FETCH_GIT_HISTORY_TASK_ID)
}

/**
 * Get GitHub repository data for local environment frameworks.
 * @returns Star counts and languages for each repository, or null if not available
 */
export async function getGithubRepoData(): Promise<Record<
  string,
  GithubRepoData
> | null> {
  return getData<Record<string, GithubRepoData>>(FETCH_GITHUB_REPO_DATA_TASK_ID)
}

/**
 * Get Ethereum stablecoins data from CoinGecko.
 * @returns Market data for stablecoins on Ethereum, or null if not available
 */
export async function getStablecoinsData(): Promise<CoinGeckoCoinMarketResponse | null> {
  return getData<CoinGeckoCoinMarketResponse>(FETCH_STABLECOINS_DATA_TASK_ID)
}

/**
 * Get total ETH staked data.
 * @returns Total ETH staked metric data, or null if not available
 */
export async function getTotalEthStakedData(): Promise<MetricReturnData | null> {
  return getData<MetricReturnData>(FETCH_TOTAL_ETH_STAKED_TASK_ID)
}

/**
 * Get total value locked (TVL) data.
 * @returns TVL metric data, or null if not available
 */
export async function getTotalValueLockedData(): Promise<MetricReturnData | null> {
  return getData<MetricReturnData>(FETCH_TOTAL_VALUE_LOCKED_TASK_ID)
}

/**
 * Get events data from Geode Labs API.
 * @returns Array of upcoming events sorted by start time, or null if not available
 */
export async function getEventsData(): Promise<EventItem[] | null> {
  return getData<EventItem[]>(FETCH_EVENTS_TASK_ID)
}
