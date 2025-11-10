import { beforeEach, describe, expect, it, vi } from "vitest"

import { getRedisData, storeRedis } from "../redisClient"

// Mock @upstash/redis
const mockRedisClient = {
  set: vi.fn(),
  get: vi.fn(),
  del: vi.fn(),
}

vi.mock("@upstash/redis", () => ({
  Redis: class MockRedis {
    constructor() {
      return mockRedisClient
    }
  },
}))

describe("Redis Client", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset module state
    vi.resetModules()
    process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io"
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token"
  })

  describe("storeRedis", () => {
    it("should store data successfully", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io"
      process.env.UPSTASH_REDIS_REST_TOKEN = "test-token"
      vi.resetModules()
      const { storeRedis } = await import("../redisClient")

      mockRedisClient.set.mockResolvedValue("OK")

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeRedis("testKey", testData, 3600)

      expect(result).toBe(true)
      expect(mockRedisClient.set).toHaveBeenCalledWith(
        "external-data:testKey",
        JSON.stringify(testData),
        { ex: 3600 }
      )
    })

    it("should store data without TTL", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io"
      process.env.UPSTASH_REDIS_REST_TOKEN = "test-token"
      vi.resetModules()
      const { storeRedis } = await import("../redisClient")

      mockRedisClient.set.mockResolvedValue("OK")

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeRedis("testKey", testData)

      expect(result).toBe(true)
      // When TTL is undefined, the code passes undefined as the third arg
      // But Upstash client.set can be called with 2 or 3 args
      expect(mockRedisClient.set).toHaveBeenCalled()
      const calls = vi.mocked(mockRedisClient.set).mock.calls
      expect(calls[0][0]).toBe("external-data:testKey")
      expect(calls[0][1]).toBe(JSON.stringify(testData))
      // Third arg should be undefined when no TTL
      expect(calls[0][2]).toBeUndefined()
    })

    it("should return false when Redis client is not available", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL
      delete process.env.UPSTASH_REDIS_REST_TOKEN
      vi.resetModules()
      const { storeRedis } = await import("../redisClient")

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeRedis("testKey", testData)

      expect(result).toBe(false)
    })

    it("should handle storage errors", async () => {
      mockRedisClient.set.mockRejectedValue(new Error("Redis error"))

      const testData = { value: 3000, timestamp: Date.now() }
      const result = await storeRedis("testKey", testData)

      expect(result).toBe(false)
    })
  })

  describe("getRedisData", () => {
    it("should retrieve data successfully", async () => {
      const testData = { value: 3000, timestamp: Date.now() }
      mockRedisClient.get.mockResolvedValue(JSON.stringify(testData))

      const result = await getRedisData<typeof testData>("testKey")

      expect(result).toEqual(testData)
      expect(mockRedisClient.get).toHaveBeenCalledWith("external-data:testKey")
    })

    it("should return null when key does not exist", async () => {
      mockRedisClient.get.mockResolvedValue(null)

      const result = await getRedisData("nonexistent")

      expect(result).toBeNull()
    })

    it("should return null when Redis client is not available", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL

      const result = await getRedisData("testKey")

      expect(result).toBeNull()
    })

    it("should handle retrieval errors", async () => {
      mockRedisClient.get.mockRejectedValue(new Error("Redis error"))

      const result = await getRedisData("testKey")

      expect(result).toBeNull()
    })

    it("should handle JSON parse errors", async () => {
      mockRedisClient.get.mockResolvedValue("invalid json")

      const result = await getRedisData("testKey")

      expect(result).toBeNull()
    })
  })

  describe("getRedisClient", () => {
    it("should initialize Upstash Redis when env vars are set", async () => {
      process.env.UPSTASH_REDIS_REST_URL = "https://test.upstash.io"
      process.env.UPSTASH_REDIS_REST_TOKEN = "test-token"

      // Re-import to get fresh module state
      const { getRedisClient } = await import("../redisClient")
      const client = await getRedisClient()

      expect(client).not.toBeNull()
    })

    it("should return null when env vars are not set", async () => {
      delete process.env.UPSTASH_REDIS_REST_URL
      delete process.env.UPSTASH_REDIS_REST_TOKEN

      // Re-import to get fresh module state
      const { getRedisClient } = await import("../redisClient")
      const client = await getRedisClient()

      expect(client).toBeNull()
    })
  })
})
