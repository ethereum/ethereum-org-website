/**
 * Data storage - reads/writes to Netlify Blobs (prod) or local JSON files (dev).
 */

import * as fs from "fs"
import * as path from "path"

import { getStore } from "@netlify/blobs"

export const KEYS = {
  APPS: "fetch-apps",
  COLLECTIBLES: "fetch-collectibles",
  GITHUB_CONTRIBUTORS: "fetch-github-contributors",
  COMMUNITY_PICKS: "fetch-community-picks",
  DEVELOPER_TOOLS: "fetch-developer-tools",
  GFIS: "fetch-gfis",
  GROW_THE_PIE: "fetch-grow-the-pie",
  GROW_THE_PIE_BLOCKSPACE: "fetch-grow-the-pie-blockspace",
  GROW_THE_PIE_MASTER: "fetch-grow-the-pie-master",
  L2BEAT: "fetch-l2beat",
  L2BEAT_ACTIVITY: "fetch-l2beat-activity",
  DEFI_TVL_SHARE: "fetch-defi-tvl-share",
  DEX_VOLUME: "fetch-dex-volume",
  TOTAL_VALUE_SECURED: "fetch-total-value-secured",
  MEETUP_IMAGES: "fetch-meetup-images",
  RSS: "fetch-rss",
  EVENTS: "fetch-events",
  BLOB_STATS: "fetch-blob-stats",
  ETHEREUM_MARKETCAP: "fetch-ethereum-marketcap",
  ETHEREUM_STABLECOINS_MCAP: "fetch-ethereum-stablecoins-mcap",
  ETH_PRICE: "fetch-eth-price",
  GAS_PRICE: "fetch-gas-price",
  STAKED_PERCENTAGE: "fetch-staked-percentage",
  TOTAL_ETH_STAKED: "fetch-total-eth-staked",
  STABLECOINS_DATA: "fetch-stablecoins-data",
  ACCOUNT_HOLDERS: "fetch-account-holders",
  VIDEO_THUMBNAILS: "fetch-video-thumbnails",
  QUIZ_STATS: "fetch-quiz-stats",
} as const

const USE_MOCK = process.env.USE_MOCK_DATA === "true"

// Netlify Blobs store (lazy init)
let blobStore: ReturnType<typeof getStore> | null = null

function getBlobs() {
  if (blobStore) return blobStore

  const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID
  const token = process.env.NETLIFY_BLOBS_TOKEN

  if (!siteID || !token) {
    throw new Error(
      "Missing NETLIFY_SITE_ID or NETLIFY_BLOBS_TOKEN. Set USE_MOCK_DATA=true for local development."
    )
  }

  const storeName = process.env.BLOB_STORE_NAME || "data-layer"

  blobStore = getStore({
    name: storeName,
    siteID,
    token,
  } as Parameters<typeof getStore>[0])

  return blobStore
}

// Mock file path
function mockPath(key: string): string {
  return path.resolve(process.cwd(), `src/data-layer/mocks/${key}.json`)
}

/** Get data by key */
export async function get<T>(key: string): Promise<T | null> {
  if (USE_MOCK) {
    const filePath = mockPath(key)
    if (!fs.existsSync(filePath)) return null
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T
  }

  const blob = await getBlobs().get(key, { type: "text" })
  return blob ? (JSON.parse(blob) as T) : null
}

/** Store data by key */
export async function set(key: string, data: unknown): Promise<void> {
  if (USE_MOCK) {
    fs.writeFileSync(mockPath(key), JSON.stringify(data, null, 2), "utf-8")
    return
  }

  await getBlobs().set(key, JSON.stringify(data), {
    metadata: { storedAt: new Date().toISOString() },
  })
}
