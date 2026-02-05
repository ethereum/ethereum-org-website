/**
 * Trigger.dev scheduled tasks for data fetching.
 *
 * Daily tasks run at midnight UTC.
 * Hourly tasks run every hour.
 */

import { schedules, task, tasks } from "@trigger.dev/sdk/v3"

import { fetchApps } from "./fetchers/fetchApps"
import { fetchBeaconChain } from "./fetchers/fetchBeaconChain"
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
type TaskDef = [string, () => Promise<unknown>]

const DAILY: TaskDef[] = [
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

const HOURLY: TaskDef[] = [
  [KEYS.BEACONCHAIN, fetchBeaconChain],
  // [KEYS.BLOBSCAN_STATS, fetchBlobscanStats], // Temporarily disabled - Blobscan API is down
  [KEYS.ETHEREUM_MARKETCAP, fetchEthereumMarketcap],
  [KEYS.ETHEREUM_STABLECOINS_MCAP, fetchEthereumStablecoinsMcap],
  [KEYS.ETH_PRICE, fetchEthPrice],
  [KEYS.TOTAL_ETH_STAKED, fetchTotalEthStaked],
  [KEYS.TOTAL_VALUE_LOCKED, fetchTotalValueLocked],
  [KEYS.STABLECOINS_DATA, fetchStablecoinsData],
]

// ─── Dynamic task creation ───
function createDataTask([key, fetchFn]: TaskDef) {
  return task({
    id: key,
    retry: {
      maxAttempts: 3,
      factor: 2,
      minTimeoutInMs: 2000,
      maxTimeoutInMs: 30000,
      randomize: true,
    },
    run: async () => {
      const data = await fetchFn()
      await set(key, data)
      console.log(`✓ ${key}`)
      return { key }
    },
  })
}

const dailyFetchTasks = DAILY.map(createDataTask)
const hourlyFetchTasks = HOURLY.map(createDataTask)

// Must export for trigger.dev to discover
export const allFetchTasks = [...dailyFetchTasks, ...hourlyFetchTasks]

// ─── Scheduled orchestrators ───
export const dailyTask = schedules.task({
  id: "daily-data-fetch",
  cron: "0 0 * * *",
  run: () => Promise.all(dailyFetchTasks.map((t) => t.trigger())),
})

export const hourlyTask = schedules.task({
  id: "hourly-data-fetch",
  cron: "0 * * * *",
  run: () => Promise.all(hourlyFetchTasks.map((t) => t.trigger())),
})

// ─── Global failure handler → Discord ───
tasks.onFailure(async ({ ctx, error }) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: `Data Fetch Failed: ${ctx.task.id}`,
          color: 0xff0000,
          description: String(error).slice(0, 2000),
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  })
})
