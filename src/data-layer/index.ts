import type {
  AppData,
  BlockspaceData,
  CommunityPick,
  EthPriceData,
  EventItem,
  GHIssue,
  GitHubContributorsData,
  GrowThePieData,
  GrowThePieMasterData,
  L2beatData,
  MetricReturnData,
  RSSItem,
} from "@/lib/types"

import type { DeveloperToolsDataEnvelope } from "./fetchers/developer-tools/utils"
import type { BlobStats } from "./fetchers/fetchBlobStats"
import type { CollectiblesData } from "./fetchers/fetchCollectibles"
import type { GasPriceData } from "./fetchers/fetchGasPrice"
import type { QuizStatsData } from "./fetchers/fetchQuizStats"
import type { CoinGeckoCoinMarketResponse } from "./fetchers/fetchStablecoinsData"
import { get, KEYS } from "./storage"

export { KEYS }

export const getEthPrice = () => get<EthPriceData>(KEYS.ETH_PRICE)
export const getL2beatData = () => get<L2beatData>(KEYS.L2BEAT)
export const getAppsData = () => get<Record<string, AppData[]>>(KEYS.APPS)
export const getCollectiblesData = () => get<CollectiblesData>(KEYS.COLLECTIBLES)
export const getGrowThePieData = () => get<GrowThePieData>(KEYS.GROW_THE_PIE)
export const getGrowThePieBlockspaceData = () => get<Record<string, BlockspaceData>>(KEYS.GROW_THE_PIE_BLOCKSPACE)
export const getGrowThePieMasterData = () => get<GrowThePieMasterData>(KEYS.GROW_THE_PIE_MASTER)
export const getCommunityPicks = () => get<CommunityPick[]>(KEYS.COMMUNITY_PICKS)
export const getRSSData = () => get<RSSItem[][]>(KEYS.RSS)
export const getBlobStats = () => get<BlobStats>(KEYS.BLOB_STATS)
export const getEthereumMarketcapData = () => get<MetricReturnData>(KEYS.ETHEREUM_MARKETCAP)
export const getGasPriceData = () => get<GasPriceData>(KEYS.GAS_PRICE)
export const getGFIs = () => get<GHIssue[]>(KEYS.GFIS)
export const getStablecoinsData = () => get<CoinGeckoCoinMarketResponse>(KEYS.STABLECOINS_DATA)
export const getTotalEthStakedData = () => get<MetricReturnData>(KEYS.TOTAL_ETH_STAKED)
export const getStakedPercentageData = () => get<MetricReturnData>(KEYS.STAKED_PERCENTAGE)
export const getEventsData = () => get<EventItem[]>(KEYS.EVENTS)
export const getDeveloperToolsData = () => get<DeveloperToolsDataEnvelope>(KEYS.DEVELOPER_TOOLS)
export const getAccountHolders = () => get<MetricReturnData>(KEYS.ACCOUNT_HOLDERS)
export const getGitHubContributors = () => get<GitHubContributorsData>(KEYS.GITHUB_CONTRIBUTORS)
export const getVideoThumbnails = () => get<Record<string, string>>(KEYS.VIDEO_THUMBNAILS)
export const getQuizStats = () => get<QuizStatsData>(KEYS.QUIZ_STATS)
