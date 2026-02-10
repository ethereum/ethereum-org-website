import type {
  AppData,
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

import type { BeaconChainData } from "./fetchers/fetchBeaconChain"
import type { BlobscanStats } from "./fetchers/fetchBlobscanStats"
import type { CoinGeckoCoinMarketResponse } from "./fetchers/fetchStablecoinsData"
import { get } from "./storage"
import { KEYS } from "./tasks"

export { KEYS }

export const getEthPrice = () => get<MetricReturnData>(KEYS.ETH_PRICE)
export const getL2beatData = () => get<L2beatData>(KEYS.L2BEAT)
export const getAppsData = () => get<Record<string, AppData[]>>(KEYS.APPS)
export const getGrowThePieData = () => get<GrowThePieData>(KEYS.GROW_THE_PIE)
export const getGrowThePieBlockspaceData = () => get<Record<string, BlockspaceData>>(KEYS.GROW_THE_PIE_BLOCKSPACE)
export const getGrowThePieMasterData = () => get<GrowThePieMasterData>(KEYS.GROW_THE_PIE_MASTER)
export const getCommunityPicks = () => get<CommunityPick[]>(KEYS.COMMUNITY_PICKS)
export const getCalendarEvents = () => get<CommunityEventsReturnType>(KEYS.CALENDAR_EVENTS)
export const getRSSData = () => get<RSSItem[][]>(KEYS.RSS)
export const getAttestantPosts = () => get<RSSItem[]>(KEYS.POSTS)
export const getBeaconchainData = () => get<BeaconChainData>(KEYS.BEACONCHAIN)
export const getBlobscanStats = () => get<BlobscanStats>(KEYS.BLOBSCAN_STATS)
export const getEthereumMarketcapData = () => get<MetricReturnData>(KEYS.ETHEREUM_MARKETCAP)
export const getEthereumStablecoinsMcapData = () => get<MetricReturnData>(KEYS.ETHEREUM_STABLECOINS_MCAP)
export const getGFIs = () => get<GHIssue[]>(KEYS.GFIS)
export const getGitHistory = () => get<Commit[]>(KEYS.GIT_HISTORY)
export const getGithubRepoData = () => get<Record<string, GithubRepoData>>(KEYS.GITHUB_REPO_DATA)
export const getStablecoinsData = () => get<CoinGeckoCoinMarketResponse>(KEYS.STABLECOINS_DATA)
export const getTotalEthStakedData = () => get<MetricReturnData>(KEYS.TOTAL_ETH_STAKED)
export const getTotalValueLockedData = () => get<MetricReturnData>(KEYS.TOTAL_VALUE_LOCKED)
export const getEventsData = () => get<EventItem[]>(KEYS.EVENTS)
export const getAccountHolders = () => get<MetricReturnData>(KEYS.ACCOUNT_HOLDERS)
