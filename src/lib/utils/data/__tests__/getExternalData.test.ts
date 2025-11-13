import { beforeEach, describe, expect, it, vi } from "vitest"

import { every } from "@/lib/utils/time"

import { getExternalData } from "../getExternalData"

// Mock storage clients
vi.mock("../clients/redisClient", () => ({
  getRedisData: vi.fn(),
}))

vi.mock("../clients/supabaseClient", () => ({
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
    const { getRedisData } = await import("../clients/redisClient")
    const mockData = { value: 3000, timestamp: Date.now() }

    vi.mocked(getRedisData).mockResolvedValue(mockData)

    const result = await getExternalData(["ethPrice"], every("hour"))

    expect(result).toHaveProperty("ethPrice")
    expect(result?.ethPrice).toEqual(mockData)
    expect(getRedisData).toHaveBeenCalledWith("ethPrice", every("hour"))
  })

  it("should fallback to Supabase when Redis returns null", async () => {
    const { getRedisData } = await import("../clients/redisClient")
    const { getSupabaseData } = await import("../clients/supabaseClient")
    const mockData = { value: 3000, timestamp: Date.now() }

    vi.mocked(getRedisData).mockResolvedValue(null)
    vi.mocked(getSupabaseData).mockResolvedValue(mockData)

    const result = await getExternalData(["ethPrice"], every("hour"))

    expect(result).toHaveProperty("ethPrice")
    expect(getSupabaseData).toHaveBeenCalledWith("ethPrice", every("hour"))
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

  it("should sort keys for consistent processing", async () => {
    const { getRedisData } = await import("../clients/redisClient")
    vi.mocked(getRedisData)
      .mockResolvedValueOnce({ value: 3000, timestamp: Date.now() })
      .mockResolvedValueOnce({ value: 35000000, timestamp: Date.now() })

    await getExternalData(["ethPrice", "beaconchainEpoch"], every("hour"))

    // Keys should be sorted before processing
    expect(getRedisData).toHaveBeenCalledWith("beaconchainEpoch", every("hour"))
    expect(getRedisData).toHaveBeenCalledWith("ethPrice", every("hour"))
  })

  it("should return object with null values when no data is found", async () => {
    const { getRedisData } = await import("../clients/redisClient")
    const { getSupabaseData } = await import("../clients/supabaseClient")

    vi.mocked(getRedisData).mockResolvedValue(null)
    vi.mocked(getSupabaseData).mockResolvedValue(null)

    const result = await getExternalData(["nonexistent"], every("hour"))

    // Should return object with null value, not null itself
    expect(result).toEqual({ nonexistent: null })
  })

  it("should handle errors gracefully", async () => {
    const { getRedisData } = await import("../clients/redisClient")
    vi.mocked(getRedisData).mockRejectedValue(new Error("Redis error"))

    const result = await getExternalData(["ethPrice"], every("hour"))

    // Should return object with null value on error
    expect(result).toEqual({ ethPrice: null })
  })

  it("should handle multiple keys", async () => {
    const { getRedisData } = await import("../clients/redisClient")
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

  it("should return null when mock data map is empty and no keys requested", async () => {
    process.env.USE_MOCK_DATA = "true"
    const { loadMockDataForKeys } = await import("../loadMockData")

    vi.mocked(loadMockDataForKeys).mockResolvedValue({})

    const result = await getExternalData([], every("hour"))

    expect(result).toBeNull()
  })
})
