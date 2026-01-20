/**
 * Trigger.dev scheduled tasks for data fetching.
 *
 * Daily tasks run at midnight UTC.
 * Hourly tasks run every hour.
 */

import { schedules } from "@trigger.dev/sdk/v3"

import { fetchApps } from "./fetchers/fetchApps"
import { fetchBeaconChain } from "./fetchers/fetchBeaconChain"
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
  EVENTS: "fetch-events",
  BEACONCHAIN: "fetch-beaconchain",
  BLOBSCAN_STATS: "fetch-blobscan-stats",
  ETHEREUM_MARKETCAP: "fetch-ethereum-marketcap",
  ETHEREUM_STABLECOINS_MCAP: "fetch-ethereum-stablecoins-mcap",
  ETH_PRICE: "fetch-eth-price",
  TOTAL_ETH_STAKED: "fetch-total-eth-staked",
  TOTAL_VALUE_LOCKED: "fetch-total-value-locked",
  STABLECOINS_DATA: "fetch-stablecoins-data",
} as const

// Task definition: storage key + fetch function
type Task = [string, () => Promise<unknown>]

const DAILY: Task[] = [
  [KEYS.APPS, fetchApps],
  [KEYS.CALENDAR_EVENTS, fetchCalendarEvents],
  [KEYS.COMMUNITY_PICKS, fetchCommunityPicks],
  [KEYS.GFIS, fetchGFIs],
  [KEYS.GIT_HISTORY, fetchGitHistory],
  [KEYS.GROW_THE_PIE, fetchGrowThePie],
  [KEYS.GROW_THE_PIE_BLOCKSPACE, fetchGrowThePieBlockspace],
  [KEYS.GROW_THE_PIE_MASTER, fetchGrowThePieMaster],
  [KEYS.L2BEAT, fetchL2beat],
  [KEYS.POSTS, fetchAttestantPosts],
  [KEYS.RSS, fetchRSS],
  [KEYS.GITHUB_REPO_DATA, fetchGithubRepoData],
  [KEYS.EVENTS, fetchEvents],
]

const HOURLY: Task[] = [
  [KEYS.BEACONCHAIN, fetchBeaconChain],
  [KEYS.BLOBSCAN_STATS, fetchBlobscanStats],
  [KEYS.ETHEREUM_MARKETCAP, fetchEthereumMarketcap],
  [KEYS.ETHEREUM_STABLECOINS_MCAP, fetchEthereumStablecoinsMcap],
  [KEYS.ETH_PRICE, fetchEthPrice],
  [KEYS.TOTAL_ETH_STAKED, fetchTotalEthStaked],
  [KEYS.TOTAL_VALUE_LOCKED, fetchTotalValueLocked],
  [KEYS.STABLECOINS_DATA, fetchStablecoinsData],
]

async function runTasks(tasks: Task[]) {
  const results = await Promise.allSettled(
    tasks.map(async ([key, fetch]) => {
      const data = await fetch()
      await set(key, data)
      console.log(`✓ ${key}`)
      return key
    })
  )

  const summary = results.map((r, i) => ({
    key: tasks[i][0],
    ok: r.status === "fulfilled",
    error: r.status === "rejected" ? String(r.reason) : undefined,
  }))

  const failed = summary.filter((s) => !s.ok)
  failed.forEach((f) => console.error(`✗ ${f.key}: ${f.error}`))

  return summary
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
