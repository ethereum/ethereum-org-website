import { unstable_cache } from "next/cache"

import * as dataLayer from "@/data-layer"

import { BASE_TIME_UNIT } from "@/lib/constants"

const CACHE_REVALIDATE_HOUR = BASE_TIME_UNIT
const CACHE_REVALIDATE_DAY = BASE_TIME_UNIT * 24

export const getEthPrice = unstable_cache(
  async () => await dataLayer.getEthPrice(),
  ["eth-price"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getL2beatData = unstable_cache(
  async () => await dataLayer.getL2beatData(),
  ["l2beat-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getAppsData = unstable_cache(
  async () => await dataLayer.getAppsData(),
  ["apps-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

export const getGrowThePieData = unstable_cache(
  async () => await dataLayer.getGrowThePieData(),
  ["grow-the-pie-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getGrowThePieBlockspaceData = unstable_cache(
  async () => await dataLayer.getGrowThePieBlockspaceData(),
  ["grow-the-pie-blockspace-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getGrowThePieMasterData = unstable_cache(
  async () => await dataLayer.getGrowThePieMasterData(),
  ["grow-the-pie-master-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

export const getCommunityPicks = unstable_cache(
  async () => await dataLayer.getCommunityPicks(),
  ["community-picks"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

export const getCalendarEvents = unstable_cache(
  async () => await dataLayer.getCalendarEvents(),
  ["calendar-events"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getRSSData = unstable_cache(
  async () => await dataLayer.getRSSData(),
  ["rss-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getAttestantPosts = unstable_cache(
  async () => await dataLayer.getAttestantPosts(),
  ["attestant-posts"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getBeaconchainEpochData = unstable_cache(
  async () => await dataLayer.getBeaconchainEpochData(),
  ["beaconchain-epoch-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getBeaconchainEthstoreData = unstable_cache(
  async () => await dataLayer.getBeaconchainEthstoreData(),
  ["beaconchain-ethstore-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getBlobscanStats = unstable_cache(
  async () => await dataLayer.getBlobscanStats(),
  ["blobscan-stats"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getEthereumMarketcapData = unstable_cache(
  async () => await dataLayer.getEthereumMarketcapData(),
  ["ethereum-marketcap-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getEthereumStablecoinsMcapData = unstable_cache(
  async () => await dataLayer.getEthereumStablecoinsMcapData(),
  ["ethereum-stablecoins-mcap-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getGFIs = unstable_cache(
  async () => await dataLayer.getGFIs(),
  ["gfis"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getGitHistory = unstable_cache(
  async () => await dataLayer.getGitHistory(),
  ["git-history"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getGithubRepoData = unstable_cache(
  async () => await dataLayer.getGithubRepoData(),
  ["github-repo-data"],
  { revalidate: CACHE_REVALIDATE_DAY }
)

export const getStablecoinsData = unstable_cache(
  async () => await dataLayer.getStablecoinsData(),
  ["stablecoins-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getTotalEthStakedData = unstable_cache(
  async () => await dataLayer.getTotalEthStakedData(),
  ["total-eth-staked-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)

export const getTotalValueLockedData = unstable_cache(
  async () => await dataLayer.getTotalValueLockedData(),
  ["total-value-locked-data"],
  { revalidate: CACHE_REVALIDATE_HOUR }
)
