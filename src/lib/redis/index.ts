// import { Redis } from "@upstash/redis"

// Initialize Redis client
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// })

import { createClient } from "redis"

const redis = createClient({
  url: `redis://localhost:6379`,
})

redis.on("error", (err) => console.log("Local Redis Client Error", err))

redis.connect()

// Configuration from environment
const MAX_MINTS_PER_MINUTE = 100
const MAX_QUEUE_LENGTH = 500
const MIN_DELAY_SECONDS = 10
const MAX_DELAY_SECONDS = 90
const MINT_WINDOW_SECONDS = 300 // 5 minutes to complete mint after delay expires

// Redis keys
const MINTED_WALLETS_KEY = "minted_wallets"
const MINT_RATE_KEY = "mint_rate"
const MINT_QUEUE_KEY = "mint_queue"

export interface QueueStatus {
  mintAllowed: boolean
  estimatedTime?: number
  delaySeconds?: number
  queuePosition?: number
  mintWindowSeconds?: number
}

// Export configuration for frontend use
export const QUEUE_CONFIG = {
  MAX_MINTS_PER_MINUTE,
  MAX_QUEUE_LENGTH,
  MIN_DELAY_SECONDS,
  MAX_DELAY_SECONDS,
  MINT_WINDOW_SECONDS,
} as const

/**
 * Check if a wallet has already minted
 */
export async function hasWalletMinted(wallet: string): Promise<boolean> {
  const hasMinted = await redis.sIsMember(
    `${MINTED_WALLETS_KEY}:${wallet.toLowerCase()}`,
    "minted"
  )
  return Boolean(hasMinted)
}

/**
 * Mark a wallet as having minted
 */
export async function markWalletAsMinted(wallet: string): Promise<void> {
  await redis.sAdd(`${MINTED_WALLETS_KEY}:${wallet.toLowerCase()}`, "minted")
  // Set expiry for 30 days to keep data manageable
  await redis.expire(
    `${MINTED_WALLETS_KEY}:${wallet.toLowerCase()}`,
    30 * 24 * 60 * 60
  )
}

/**
 * Get current mint rate for the last minute
 */
export async function getCurrentMintRate(): Promise<number> {
  const currentMinute = Math.floor(Date.now() / (60 * 1000))
  const rate = await redis.get(`${MINT_RATE_KEY}:${currentMinute}`)
  return rate ? parseInt(rate as string) : 0
}

/**
 * Increment mint rate counter
 */
export async function incrementMintRate(): Promise<void> {
  const currentMinute = Math.floor(Date.now() / (60 * 1000))
  const key = `${MINT_RATE_KEY}:${currentMinute}`

  await redis.incr(key)
  // Set expiry for 2 minutes to keep data clean
  await redis.expire(key, 120)
}

/**
 * Get current queue length
 */
export async function getQueueLength(): Promise<number> {
  const queueLength = await redis.zCard(MINT_QUEUE_KEY)
  return Number(queueLength) || 0
}

/**
 * Calculate dynamic delay based on current load and queue length
 */
export function calculateDynamicDelay(
  currentRate: number,
  queueLength: number
): number {
  const loadScore = currentRate / MAX_MINTS_PER_MINUTE
  const queueScore = queueLength / MAX_QUEUE_LENGTH
  const congestion = Math.min(1, 0.5 * loadScore + 0.5 * queueScore)

  const dynamicDelay = Math.floor(
    MIN_DELAY_SECONDS + congestion * (MAX_DELAY_SECONDS - MIN_DELAY_SECONDS)
  )

  return dynamicDelay
}

/**
 * Format time remaining in a readable way
 */
function formatTimeRemaining(seconds: number): string {
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}min ${remainingSeconds}s`
  }
  return `${seconds}s`
}

/**
 * Add wallet to queue with unlock time
 */
export async function addToQueue(
  wallet: string,
  delaySeconds: number
): Promise<number> {
  const unlockTime = Math.floor(Date.now() / 1000) + delaySeconds

  // Add wallet to sorted set with unlock time as score
  await redis.zAdd(MINT_QUEUE_KEY, [
    { score: unlockTime, value: wallet.toLowerCase() },
  ])

  return unlockTime
}

/**
 * Remove wallet from queue
 */
export async function removeFromQueue(wallet: string): Promise<void> {
  await redis.zRem(MINT_QUEUE_KEY, wallet.toLowerCase())
}

/**
 * Check if wallet can mint (either immediately or after queue)
 */
export async function checkMintEligibility(
  wallet: string
): Promise<QueueStatus> {
  // Check if already minted
  if (await hasWalletMinted(wallet)) {
    return {
      mintAllowed: false,
    }
  }

  // Check if wallet is already in queue BEFORE cleanup
  const walletScore = await redis.zScore(MINT_QUEUE_KEY, wallet.toLowerCase())

  if (walletScore !== null) {
    const unlockTime = walletScore as number
    const currentTime = Math.floor(Date.now() / 1000)
    const windowExpireTime = unlockTime + MINT_WINDOW_SECONDS

    if (currentTime >= windowExpireTime) {
      // Mint window has expired, remove from queue and treat as new request
      await removeFromQueue(wallet)
      console.log(`⏰ Wallet ${wallet} mint window expired, removed from queue`)
      // Continue to new request logic below
    } else if (currentTime >= unlockTime) {
      // Within mint window - can mint now!
      const windowTimeRemaining = windowExpireTime - currentTime
      console.log(
        `✅ Wallet ${wallet} can mint (${formatTimeRemaining(windowTimeRemaining)} window remaining)`
      )
      return {
        mintAllowed: true,
      }
    } else {
      // Still waiting for unlock time
      const delaySeconds = unlockTime - currentTime
      console.log(
        `⏳ Wallet ${wallet} still in queue, ${formatTimeRemaining(delaySeconds)} remaining`
      )
      return {
        mintAllowed: false,
        estimatedTime: unlockTime,
        delaySeconds,
        mintWindowSeconds: MINT_WINDOW_SECONDS,
      }
    }
  }

  // Wallet is not in queue - this is a new request
  // Now do cleanup for accurate rate limiting calculations
  await cleanupExpiredQueue()

  // Increment request rate (track requests, not just completed mints)
  await incrementMintRate()

  // Get current system load (after cleanup for accurate queue length)
  const currentRate = await getCurrentMintRate()
  const queueLength = await getQueueLength()

  // New request - check if we need to queue
  if (currentRate < MAX_MINTS_PER_MINUTE) {
    // Allow immediate mint
    return {
      mintAllowed: true,
    }
  } else {
    // Need to queue
    const delaySeconds = calculateDynamicDelay(currentRate, queueLength)
    const unlockTime = await addToQueue(wallet, delaySeconds)

    // Clean up any expired entries again to get accurate queue position
    await cleanupExpiredQueue()

    // Get accurate queue position for this wallet after cleanup
    const queuePosition = await redis.zRank(
      MINT_QUEUE_KEY,
      wallet.toLowerCase()
    )
    const finalQueueLength = await getQueueLength()

    console.log(
      `🔄 Wallet ${wallet} queued at position ${queuePosition} with ${formatTimeRemaining(delaySeconds)} delay + ${formatTimeRemaining(MINT_WINDOW_SECONDS)} mint window (queue length: ${finalQueueLength})`
    )

    return {
      mintAllowed: false,
      estimatedTime: unlockTime,
      delaySeconds,
      queuePosition: queuePosition !== null ? queuePosition + 1 : undefined, // Convert to 1-based indexing
      mintWindowSeconds: MINT_WINDOW_SECONDS,
    }
  }
}

/**
 * Clean up expired queue entries (entries past their mint window)
 */
export async function cleanupExpiredQueue(): Promise<number> {
  const currentTime = Math.floor(Date.now() / 1000)

  // Remove entries where the mint window has expired (unlockTime + MINT_WINDOW_SECONDS < currentTime)
  const expiredWindowTime = currentTime - MINT_WINDOW_SECONDS
  const removedCount = await redis.zRemRangeByScore(
    MINT_QUEUE_KEY,
    0,
    expiredWindowTime
  )

  if (removedCount > 0) {
    console.log(
      `🧹 Cleaned up ${removedCount} expired queue entries (mint window closed)`
    )
  }

  return removedCount
}

/**
 * Clean up very old queue entries (safety cleanup for stuck entries)
 */
export async function cleanupStaleQueue(): Promise<number> {
  const currentTime = Math.floor(Date.now() / 1000)

  // Remove entries older than 10 minutes (safety cleanup for any stuck entries)
  const staleTime = currentTime - 10 * 60
  const removedCount = await redis.zRemRangeByScore(
    MINT_QUEUE_KEY,
    0,
    staleTime
  )

  if (removedCount > 0) {
    console.log(
      `🗑️ Cleaned up ${removedCount} stale queue entries (>10min old)`
    )
  }

  return removedCount
}

/**
 * Check if minting window is open
 */
export function isMintWindowOpen(): boolean {
  // TODO: remove this after testing
  return true

  //   const now = new Date()
  //   const startTime = new Date(
  //     process.env.MINT_START_TIME || "2024-01-01T00:00:00.000Z"
  //   )
  //   const endTime = new Date(
  //     process.env.MINT_END_TIME || "2024-01-02T00:00:00.000Z"
  //   )

  //   return now >= startTime && now <= endTime
}

export { redis }
