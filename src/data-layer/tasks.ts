/**
 * Trigger.dev scheduled tasks for data fetching.
 *
 * Weekly tasks run on Sundays at midnight UTC.
 * Daily tasks run at midnight UTC.
 * Hourly tasks run every hour.
 */

import * as Sentry from "@sentry/nextjs"
import { logger, schedules, task, tasks } from "@trigger.dev/sdk/v3"

import { fetchDeveloperTools } from "./fetchers/developer-tools"
import { fetchAccountHolders } from "./fetchers/fetchAccountHolders"
import { fetchApps } from "./fetchers/fetchApps"
import { fetchBlobStats } from "./fetchers/fetchBlobStats"
import { fetchCollectibles } from "./fetchers/fetchCollectibles"
import { fetchCommunityPicks } from "./fetchers/fetchCommunityPicks"
import { fetchDefiTvlShare } from "./fetchers/fetchDefiTvlShare"
import { fetchDexVolume } from "./fetchers/fetchDexVolume"
import { fetchEthereumMarketcap } from "./fetchers/fetchEthereumMarketcap"
import { fetchEthereumStablecoinsMcap } from "./fetchers/fetchEthereumStablecoinsMcap"
import { fetchEthPrice } from "./fetchers/fetchEthPrice"
import { fetchEvents } from "./fetchers/fetchEvents"
import { fetchGasPrice } from "./fetchers/fetchGasPrice"
import { fetchGFIs } from "./fetchers/fetchGFIs"
import { fetchGitHubContributors } from "./fetchers/fetchGitHubContributors"
import { fetchGrowThePie } from "./fetchers/fetchGrowThePie"
import { fetchGrowThePieBlockspace } from "./fetchers/fetchGrowThePieBlockspace"
import { fetchGrowThePieMaster } from "./fetchers/fetchGrowThePieMaster"
import { fetchL2beat } from "./fetchers/fetchL2beat"
import { fetchL2beatActivity } from "./fetchers/fetchL2beatActivity"
import { fetchMeetupImages } from "./fetchers/fetchMeetupImages"
import { fetchQuizStats } from "./fetchers/fetchQuizStats"
import { fetchRSS } from "./fetchers/fetchRSS"
import { fetchStablecoinsData } from "./fetchers/fetchStablecoinsData"
import { fetchStakedPercentage } from "./fetchers/fetchStakedPercentage"
import { fetchTotalEthStaked } from "./fetchers/fetchTotalEthStaked"
import { fetchTotalValueSecured } from "./fetchers/fetchTotalValueSecured"
import { fetchVideoThumbnails } from "./fetchers/fetchVideoThumbnails"
import { KEYS, set } from "./storage"

// Per-task overrides for the config-wide defaults in trigger.config.ts
interface TaskOverrides {
  maxDuration?: number
}

// Task definition: storage key + fetch function + optional runtime overrides
type TaskDef = [string, () => Promise<unknown>, TaskOverrides?]

const WEEKLY: TaskDef[] = [[KEYS.GITHUB_CONTRIBUTORS, fetchGitHubContributors]]

const DAILY: TaskDef[] = [
  [KEYS.ACCOUNT_HOLDERS, fetchAccountHolders],
  [KEYS.APPS, fetchApps],
  [KEYS.BLOB_STATS, fetchBlobStats],
  [KEYS.COLLECTIBLES, fetchCollectibles],
  [KEYS.COMMUNITY_PICKS, fetchCommunityPicks],
  [KEYS.GFIS, fetchGFIs],
  [KEYS.GROW_THE_PIE, fetchGrowThePie],
  [KEYS.GROW_THE_PIE_BLOCKSPACE, fetchGrowThePieBlockspace],
  [KEYS.GROW_THE_PIE_MASTER, fetchGrowThePieMaster],
  [KEYS.L2BEAT, fetchL2beat],
  [KEYS.L2BEAT_ACTIVITY, fetchL2beatActivity],
  [KEYS.DEFI_TVL_SHARE, fetchDefiTvlShare],
  [KEYS.ETHEREUM_STABLECOINS_MCAP, fetchEthereumStablecoinsMcap],
  [KEYS.DEX_VOLUME, fetchDexVolume],
  [KEYS.TOTAL_VALUE_SECURED, fetchTotalValueSecured],
  [KEYS.MEETUP_IMAGES, fetchMeetupImages],
  [KEYS.RSS, fetchRSS],
  [KEYS.EVENTS, fetchEvents],
  // Enrichment is paced by third-party rate limits: needs wall clock, not a bigger machine
  [KEYS.DEVELOPER_TOOLS, fetchDeveloperTools, { maxDuration: 900 }],
  [KEYS.STAKED_PERCENTAGE, fetchStakedPercentage],
  [KEYS.VIDEO_THUMBNAILS, fetchVideoThumbnails],
  [KEYS.QUIZ_STATS, fetchQuizStats],
]

const HOURLY: TaskDef[] = [
  [KEYS.ETHEREUM_MARKETCAP, fetchEthereumMarketcap],
  [KEYS.ETH_PRICE, fetchEthPrice],
  [KEYS.GAS_PRICE, fetchGasPrice],
  [KEYS.TOTAL_ETH_STAKED, fetchTotalEthStaked],
  [KEYS.STABLECOINS_DATA, fetchStablecoinsData],
]

// ─── Dynamic task creation ───
function createDataTask([key, fetchFn, overrides]: TaskDef) {
  return task({
    id: key,
    retry: {
      maxAttempts: 2,
    },
    ...overrides,
    catchError: async ({ error }) => {
      logger.error(`[${key}] failed`, { error })
    },
    run: async () => {
      const data = await fetchFn()
      await set(key, data)
      logger.info(`✓ ${key}`)
      return { key }
    },
  })
}

const weeklyFetchTasks = WEEKLY.map(createDataTask)
const dailyFetchTasks = DAILY.map(createDataTask)
const hourlyFetchTasks = HOURLY.map(createDataTask)

// Must export for trigger.dev to discover
export const allFetchTasks = [
  ...weeklyFetchTasks,
  ...dailyFetchTasks,
  ...hourlyFetchTasks,
]

// ─── Scheduled orchestrators ───
export const weeklyTask = schedules.task({
  id: "weekly-data-fetch",
  cron: "0 0 * * 0", // Sundays at midnight UTC
  run: () => Promise.all(weeklyFetchTasks.map((t) => t.trigger())),
})

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

// ─── Global failure handler → Sentry + Mattermost ───
tasks.onFailure(async ({ ctx, error }) => {
  Sentry.captureException(error, {
    tags: { module: "data-layer" },
    extra: { taskId: ctx.task.id },
  })

  const webhookUrl = process.env.MATTERMOST_ALERTS_WEBHOOK_URL
  if (!webhookUrl) return

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attachments: [
        {
          title: `Data Fetch Failed: ${ctx.task.id}`,
          color: "#ff0000",
          text: String(error).slice(0, 2000),
        },
      ],
    }),
  })
})
