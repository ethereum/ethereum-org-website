/**
 * Trigger.dev scheduled tasks for data fetching.
 *
 * Daily tasks run at midnight UTC.
 * Hourly tasks run every hour.
 */

import { schedules } from "@trigger.dev/sdk/v3"

import { fetchApps } from "./fetchers/fetchApps"
import { fetchBeaconChainEpoch } from "./fetchers/fetchBeaconChainEpoch"
import { fetchBeaconChainEthstore } from "./fetchers/fetchBeaconChainEthstore"
import { fetchBlobscanStats } from "./fetchers/fetchBlobscanStats"
import { fetchCalendarEvents } from "./fetchers/fetchCalendarEvents"
import { fetchCommunityPicks } from "./fetchers/fetchCommunityPicks"
import { fetchEthereumMarketcap } from "./fetchers/fetchEthereumMarketcap"
import { fetchEthereumStablecoinsMcap } from "./fetchers/fetchEthereumStablecoinsMcap"
import { fetchEthPrice } from "./fetchers/fetchEthPrice"
import { fetchEvents } from "./fetchers/fetchEvents"
import { fetchGFIs } from "./fetchers/fetchGFIs"
import { fetchGitHistory } from "./fetchers/fetchGitHistory"
import { fetchGithubRepoData } from "./fetchers/fetchGithubRepoData"
import { fetchGrowThePie } from "./fetchers/fetchGrowThePie"
import { fetchGrowThePieBlockspace } from "./fetchers/fetchGrowThePieBlockspace"
import { fetchGrowThePieMaster } from "./fetchers/fetchGrowThePieMaster"
import { fetchL2beat } from "./fetchers/fetchL2beat"
import { fetchAttestantPosts } from "./fetchers/fetchPosts"
import { fetchRSS } from "./fetchers/fetchRSS"
import { fetchStablecoinsData } from "./fetchers/fetchStablecoinsData"
import { fetchTotalEthStaked } from "./fetchers/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "./fetchers/fetchTotalValueLocked"
import { set } from "./storage"

// Task definition: storage key + fetch function
type Task = [string, () => Promise<unknown>]

const DAILY: Task[] = [
  ["fetch-apps", fetchApps],
  ["fetch-calendar-events", fetchCalendarEvents],
  ["fetch-community-picks", fetchCommunityPicks],
  ["fetch-gfis", fetchGFIs],
  ["fetch-git-history", fetchGitHistory],
  ["fetch-grow-the-pie", fetchGrowThePie],
  ["fetch-grow-the-pie-blockspace", fetchGrowThePieBlockspace],
  ["fetch-grow-the-pie-master", fetchGrowThePieMaster],
  ["fetch-l2beat", fetchL2beat],
  ["fetch-posts", fetchAttestantPosts],
  ["fetch-rss", fetchRSS],
  ["fetch-github-repo-data", fetchGithubRepoData],
  ["fetch-events", fetchEvents],
]

const HOURLY: Task[] = [
  ["fetch-beaconchain-epoch", fetchBeaconChainEpoch],
  ["fetch-beaconchain-ethstore", fetchBeaconChainEthstore],
  ["fetch-blobscan-stats", fetchBlobscanStats],
  ["fetch-ethereum-marketcap", fetchEthereumMarketcap],
  ["fetch-ethereum-stablecoins-mcap", fetchEthereumStablecoinsMcap],
  ["fetch-eth-price", fetchEthPrice],
  ["fetch-total-eth-staked", fetchTotalEthStaked],
  ["fetch-total-value-locked", fetchTotalValueLocked],
  ["fetch-stablecoins-data", fetchStablecoinsData],
]

async function runTasks(tasks: Task[]) {
  const results = await Promise.allSettled(
    tasks.map(async ([key, fetch]) => {
      console.log(`Fetching: ${key}`)
      const data = await fetch()
      await set(key, data)
      return key
    })
  )

  return results.map((r, i) => ({
    key: tasks[i][0],
    ok: r.status === "fulfilled",
    error: r.status === "rejected" ? String(r.reason) : undefined,
  }))
}

export const dailyTask = schedules.task({
  id: "daily-data-fetch",
  cron: "0 0 * * *",
  run: () => runTasks(DAILY),
})

export const hourlyTask = schedules.task({
  id: "hourly-data-fetch",
  cron: "0 * * * *",
  run: () => runTasks(HOURLY),
})

// Export keys for use in getters
export const KEYS = {
  APPS: "fetch-apps",
  CALENDAR_EVENTS: "fetch-calendar-events",
  COMMUNITY_PICKS: "fetch-community-picks",
  GFIS: "fetch-gfis",
  GIT_HISTORY: "fetch-git-history",
  GROW_THE_PIE: "fetch-grow-the-pie",
  GROW_THE_PIE_BLOCKSPACE: "fetch-grow-the-pie-blockspace",
  GROW_THE_PIE_MASTER: "fetch-grow-the-pie-master",
  L2BEAT: "fetch-l2beat",
  POSTS: "fetch-posts",
  RSS: "fetch-rss",
  GITHUB_REPO_DATA: "fetch-github-repo-data",
  BEACONCHAIN_EPOCH: "fetch-beaconchain-epoch",
  BEACONCHAIN_ETHSTORE: "fetch-beaconchain-ethstore",
  BLOBSCAN_STATS: "fetch-blobscan-stats",
  ETHEREUM_MARKETCAP: "fetch-ethereum-marketcap",
  ETHEREUM_STABLECOINS_MCAP: "fetch-ethereum-stablecoins-mcap",
  ETH_PRICE: "fetch-eth-price",
  TOTAL_ETH_STAKED: "fetch-total-eth-staked",
  TOTAL_VALUE_LOCKED: "fetch-total-value-locked",
  STABLECOINS_DATA: "fetch-stablecoins-data",
  EVENTS: "fetch-events",
} as const
