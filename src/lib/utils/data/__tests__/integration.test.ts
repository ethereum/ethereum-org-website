import { beforeEach, describe, expect, it, vi } from "vitest"

import { every } from "@/lib/utils/time"

import {
  extractArray,
  extractGrowThePieData,
  extractValue,
} from "../extractExternalData"
import { getExternalData } from "../getExternalData"

// Mock storage clients
vi.mock("../redisClient", () => ({
  getRedisData: vi.fn(),
}))

vi.mock("../supabaseClient", () => ({
  getSupabaseData: vi.fn(),
}))

// Mock unstable_cache
vi.mock("next/cache", () => ({
  unstable_cache: vi.fn((fn) => fn),
}))

describe("Integration: getExternalData + extractors", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    delete process.env.USE_MOCK_DATA
  })

  it("should fetch and extract simple value data", async () => {
    const { getRedisData } = await import("../redisClient")
    const mockData = { value: 3000, timestamp: Date.now() }

    vi.mocked(getRedisData).mockResolvedValue(mockData)

    const data = await getExternalData(["ethPrice"], every("hour"))
    const result = extractValue(data, "ethPrice", 0)

    expect(result.value).toBe(3000)
    expect(result.timestamp).toBeDefined()
  })

  it("should fetch and extract array data", async () => {
    const { getRedisData } = await import("../redisClient")
    const mockData = {
      value: [
        { name: "Pick 1", twitterURL: "https://example.com" },
        { name: "Pick 2", twitterURL: "https://example2.com" },
      ],
      timestamp: Date.now(),
    }

    vi.mocked(getRedisData).mockResolvedValue(mockData)

    const data = await getExternalData(["communityPicks"], every("day"))
    const result = extractArray(data, "communityPicks")

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(2)
    expect(result[0]).toHaveProperty("name")
  })

  it("should fetch and extract GrowThePie data", async () => {
    const { getRedisData } = await import("../redisClient")
    const mockData = {
      value: [
        {
          date: "2024-01-01",
          txCount: 1000000,
          txCostsMedianUsd: 2.5,
        },
      ],
      timestamp: Date.now(),
    }

    vi.mocked(getRedisData).mockResolvedValue(mockData)

    const data = await getExternalData(["growThePie"], every("hour"))
    const result = extractGrowThePieData(data)

    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    expect(result?.[0]).toHaveProperty("date")
  })

  it("should handle missing data gracefully", async () => {
    const { getRedisData } = await import("../redisClient")
    vi.mocked(getRedisData).mockResolvedValue(null)

    const data = await getExternalData(["nonexistent"], every("hour"))
    const result = extractValue(data, "nonexistent", 0)

    expect(result.value).toBe(0) // default value
  })

  it("should handle error responses", async () => {
    const { getRedisData } = await import("../redisClient")
    const errorData = { error: "API error" }

    vi.mocked(getRedisData).mockResolvedValue(errorData)

    const data = await getExternalData(["ethPrice"], every("hour"))
    const result = extractValue(data, "ethPrice", 0)

    expect(result.value).toBe(0) // default value when error
  })
})
