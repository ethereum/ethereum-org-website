/**
 * Trigger.dev scheduled tasks for data fetching.
 *
 * Daily tasks run at midnight UTC.
 * Hourly tasks run every hour.
 */

import { schedules } from "@trigger.dev/sdk/v3"

import { fetchApps } from "./api/fetchApps"
import { fetchBeaconChainEpoch } from "./api/fetchBeaconChainEpoch"
import { fetchBeaconChainEthstore } from "./api/fetchBeaconChainEthstore"
import { fetchBlobscanStats } from "./api/fetchBlobscanStats"
import { fetchCalendarEvents } from "./api/fetchCalendarEvents"
import { fetchCommunityPicks } from "./api/fetchCommunityPicks"
import { fetchEthereumMarketcap } from "./api/fetchEthereumMarketcap"
import { fetchEthereumStablecoinsMcap } from "./api/fetchEthereumStablecoinsMcap"
import { fetchEthPrice } from "./api/fetchEthPrice"
import { fetchEvents } from "./api/fetchEvents"
import { fetchGFIs } from "./api/fetchGFIs"
import { fetchGitHistory } from "./api/fetchGitHistory"
import { fetchGithubRepoData } from "./api/fetchGithubRepoData"
import { fetchGrowThePie } from "./api/fetchGrowThePie"
import { fetchGrowThePieBlockspace } from "./api/fetchGrowThePieBlockspace"
import { fetchGrowThePieMaster } from "./api/fetchGrowThePieMaster"
import { fetchL2beat } from "./api/fetchL2beat"
import { fetchAttestantPosts } from "./api/fetchPosts"
import { fetchRSS } from "./api/fetchRSS"
import { fetchStablecoinsData } from "./api/fetchStablecoinsData"
import { fetchTotalEthStaked } from "./api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "./api/fetchTotalValueLocked"
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
