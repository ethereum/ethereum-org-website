import { unstable_cache } from "next/cache"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { every } from "@/lib/utils/time"

import { getExternalData } from "../getExternalData"

// Mock unstable_cache
vi.mock("next/cache", () => ({
  unstable_cache: vi.fn((fn) => fn),
}))

// Mock storage clients
vi.mock("../redisClient", () => ({
  getRedisData: vi.fn(),
}))

vi.mock("../supabaseClient", () => ({
  getSupabaseData: vi.fn(),
}))

// Mock mock data loader
vi.mock("../loadMockData", () => ({
  loadMockDataForKeys: vi.fn(),
}))

describe("getExternalData", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.USE_MOCK_DATA
  })

  it("should fetch data from Redis when available", async () => {
    const { getRedisData } = await import("../redisClient")
    const mockData = { value: 3000, timestamp: Date.now() }

    vi.mocked(getRedisData).mockResolvedValue(mockData)

    const result = await getExternalData(["ethPrice"], every("hour"))

    expect(result).toHaveProperty("ethPrice")
    expect(result?.ethPrice).toEqual(mockData)
    expect(getRedisData).toHaveBeenCalledWith("ethPrice")
  })

  it("should fallback to Supabase when Redis returns null", async () => {
    const { getRedisData } = await import("../redisClient")
    const { getSupabaseData } = await import("../supabaseClient")
    const mockData = { value: 3000, timestamp: Date.now() }

    vi.mocked(getRedisData).mockResolvedValue(null)
    vi.mocked(getSupabaseData).mockResolvedValue(mockData)

    const result = await getExternalData(["ethPrice"], every("hour"))

    expect(result).toHaveProperty("ethPrice")
    expect(getSupabaseData).toHaveBeenCalledWith("ethPrice")
  })

  it("should load mock data when USE_MOCK_DATA is true", async () => {
    process.env.USE_MOCK_DATA = "true"
    // Need to reset modules to pick up the env var change
    vi.resetModules()
    const { getExternalData } = await import("../getExternalData")
    const { loadMockDataForKeys } = await import("../loadMockData")

    vi.mocked(loadMockDataForKeys).mockResolvedValue({
      ethPrice: { value: 3000, timestamp: Date.now() },
    })

    const result = await getExternalData(["ethPrice"], every("hour"))

    expect(result).toHaveProperty("ethPrice")
    expect(loadMockDataForKeys).toHaveBeenCalledWith(["ethPrice"])
  })

  it("should use unstable_cache for caching", async () => {
    const { getRedisData } = await import("../redisClient")
    vi.mocked(getRedisData).mockResolvedValue({
      value: 3000,
      timestamp: Date.now(),
    })

    await getExternalData(["ethPrice"], every("hour"))

    expect(unstable_cache).toHaveBeenCalledWith(
      expect.any(Function),
      ["external-data", "ethPrice", String(every("hour"))],
      expect.objectContaining({
        revalidate: every("hour"),
        tags: ["external-data:ethPrice"],
      })
    )
  })

  it("should sort keys for consistent cache key generation", async () => {
    const { getRedisData } = await import("../redisClient")
    vi.mocked(getRedisData).mockResolvedValue({
      value: 3000,
      timestamp: Date.now(),
    })

    await getExternalData(["ethPrice", "beaconchainEpoch"], every("hour"))

    expect(unstable_cache).toHaveBeenCalledWith(
      expect.any(Function),
      ["external-data", "beaconchainEpoch,ethPrice", String(every("hour"))],
      expect.any(Object)
    )
  })

  it("should return null when no data is found", async () => {
    const { getRedisData } = await import("../redisClient")
    const { getSupabaseData } = await import("../supabaseClient")

    vi.mocked(getRedisData).mockResolvedValue(null)
    vi.mocked(getSupabaseData).mockResolvedValue(null)

    const result = await getExternalData(["nonexistent"], every("hour"))

    expect(result).toBeNull()
  })

  it("should handle errors gracefully", async () => {
    const { getRedisData } = await import("../redisClient")
    vi.mocked(getRedisData).mockRejectedValue(new Error("Redis error"))

    const result = await getExternalData(["ethPrice"], every("hour"))

    // Should return null on error
    expect(result).toBeNull()
  })

  it("should handle multiple keys", async () => {
    const { getRedisData } = await import("../redisClient")
    vi.mocked(getRedisData)
      .mockResolvedValueOnce({ value: 3000, timestamp: Date.now() })
      .mockResolvedValueOnce({ value: 35000000, timestamp: Date.now() })

    const result = await getExternalData(
      ["ethPrice", "beaconchainEpoch"],
      every("hour")
    )

    expect(result).toHaveProperty("ethPrice")
    expect(result).toHaveProperty("beaconchainEpoch")
  })

  it("should return null when mock data map is empty", async () => {
    process.env.USE_MOCK_DATA = "true"
    const { loadMockDataForKeys } = await import("../loadMockData")

    vi.mocked(loadMockDataForKeys).mockResolvedValue({})

    const result = await getExternalData(["nonexistent"], every("hour"))

    expect(result).toBeNull()
  })
})
