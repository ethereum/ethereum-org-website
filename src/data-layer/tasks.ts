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
import { fetchCalendarEvents } from "./fetchers/fetchCalendarEvents"
import { fetchCommunityPicks } from "./fetchers/fetchCommunityPicks"
import { fetchEthereumStablecoinsMcap } from "./fetchers/fetchEthereumStablecoinsMcap"
import { fetchEthereumMetrics } from "./fetchers/fetchEthereumMetrics"
import { fetchEvents } from "./fetchers/fetchEvents"
import { fetchGasPrice } from "./fetchers/fetchGasPrice"
import { fetchGFIs } from "./fetchers/fetchGFIs"
import { fetchGitHistory } from "./fetchers/fetchGitHistory"
import { fetchGitHubContributors } from "./fetchers/fetchGitHubContributors"
import { fetchGithubRepoData } from "./fetchers/fetchGithubRepoData"
import { fetchGrowThePie } from "./fetchers/fetchGrowThePie"
import { fetchGrowThePieBlockspace } from "./fetchers/fetchGrowThePieBlockspace"
import { fetchGrowThePieMaster } from "./fetchers/fetchGrowThePieMaster"
import { fetchL2beat } from "./fetchers/fetchL2beat"
import { fetchAttestantPosts } from "./fetchers/fetchPosts"
import { fetchQuizStats } from "./fetchers/fetchQuizStats"
import { fetchRSS } from "./fetchers/fetchRSS"
import { fetchStablecoinsData } from "./fetchers/fetchStablecoinsData"
import { fetchStakedPercentage } from "./fetchers/fetchStakedPercentage"
import { fetchTotalEthStaked } from "./fetchers/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "./fetchers/fetchTotalValueLocked"
import { fetchTranslationGlossary } from "./fetchers/fetchTranslationGlossary"
import { fetchVideoThumbnails } from "./fetchers/fetchVideoThumbnails"
import { set } from "./storage"

export const KEYS = {
  APPS: "fetch-apps",
  CALENDAR_EVENTS: "fetch-calendar-events",
  GITHUB_CONTRIBUTORS: "fetch-github-contributors",
  COMMUNITY_PICKS: "fetch-community-picks",
  DEVELOPER_TOOLS: "fetch-developer-tools",
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
  BLOB_STATS: "fetch-blob-stats",
  ETHEREUM_MARKETCAP: "fetch-ethereum-marketcap",
  ETHEREUM_STABLECOINS_MCAP: "fetch-ethereum-stablecoins-mcap",
  ETH_PRICE: "fetch-eth-price",
  GAS_PRICE: "fetch-gas-price",
  STAKED_PERCENTAGE: "fetch-staked-percentage",
  TOTAL_ETH_STAKED: "fetch-total-eth-staked",
  TOTAL_VALUE_LOCKED: "fetch-total-value-locked",
  STABLECOINS_DATA: "fetch-stablecoins-data",
  ACCOUNT_HOLDERS: "fetch-account-holders",
  TRANSLATION_GLOSSARY: "fetch-translation-glossary",
  VIDEO_THUMBNAILS: "fetch-video-thumbnails",
  QUIZ_STATS: "fetch-quiz-stats",
} as const

// Task definition: storage key + fetch function
type TaskDef = [string, () => Promise<unknown>]

const WEEKLY: TaskDef[] = [[KEYS.GITHUB_CONTRIBUTORS, fetchGitHubContributors]]

const DAILY: TaskDef[] = [
  [KEYS.ACCOUNT_HOLDERS, fetchAccountHolders],
  [KEYS.APPS, fetchApps],
  [KEYS.BLOB_STATS, fetchBlobStats],
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
  [KEYS.DEVELOPER_TOOLS, fetchDeveloperTools],
  [KEYS.TRANSLATION_GLOSSARY, fetchTranslationGlossary],
  [KEYS.STAKED_PERCENTAGE, fetchStakedPercentage],
  [KEYS.VIDEO_THUMBNAILS, fetchVideoThumbnails],
  [KEYS.QUIZ_STATS, fetchQuizStats],
]

const HOURLY: TaskDef[] = [
  [KEYS.ETHEREUM_STABLECOINS_MCAP, fetchEthereumStablecoinsMcap],
  [KEYS.GAS_PRICE, fetchGasPrice],
  [KEYS.TOTAL_ETH_STAKED, fetchTotalEthStaked],
  [KEYS.TOTAL_VALUE_LOCKED, fetchTotalValueLocked],
  [KEYS.STABLECOINS_DATA, fetchStablecoinsData],
]

// ─── Dynamic task creation ───
function createDataTask([key, fetchFn]: TaskDef) {
  return task({
    id: key,
    retry: {
      maxAttempts: 2,
    },
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

const ethereumMetricsFetchTask = task({
  id: KEYS.ETH_PRICE,
  retry: {
    maxAttempts: 2,
  },
  catchError: async ({ error }) => {
    logger.error(`[${KEYS.ETH_PRICE}] failed`, { error })
  },
  run: async () => {
    const { ethPrice, ethereumMarketcap } = await fetchEthereumMetrics()

    await Promise.all([
      set(KEYS.ETH_PRICE, ethPrice),
      set(KEYS.ETHEREUM_MARKETCAP, ethereumMarketcap),
    ])

    logger.info(`Stored ${KEYS.ETH_PRICE} + ${KEYS.ETHEREUM_MARKETCAP}`)
    return { keys: [KEYS.ETH_PRICE, KEYS.ETHEREUM_MARKETCAP] }
  },
})

const weeklyFetchTasks = WEEKLY.map(createDataTask)
const dailyFetchTasks = DAILY.map(createDataTask)
const hourlyFetchTasks = [ethereumMetricsFetchTask, ...HOURLY.map(createDataTask)]

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

// ─── Global failure handler → Sentry + Discord ───
tasks.onFailure(async ({ ctx, error }) => {
  Sentry.captureException(error, {
    tags: { module: "data-layer" },
    extra: { taskId: ctx.task.id },
  })

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
