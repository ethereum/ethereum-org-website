import { beforeEach, describe, expect, it, vi } from "vitest"

import type { ExternalDataMap } from "../fetchExternalData"
import { storeExternalData } from "../storeExternalData"

// Mock storage functions
vi.mock("../clients/redisStoreFunction", () => ({
  redisStoreFunction: vi.fn(),
}))

vi.mock("../clients/supabaseStoreFunction", () => ({
  supabaseStoreFunction: vi.fn(),
}))

describe("storeExternalData", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should store data in both Redis and Supabase", async () => {
    const { redisStoreFunction } = await import("../clients/redisStoreFunction")
    const { supabaseStoreFunction } = await import(
      "../clients/supabaseStoreFunction"
    )

    vi.mocked(redisStoreFunction).mockResolvedValue(true)
    vi.mocked(supabaseStoreFunction).mockResolvedValue(true)

    const mockData: ExternalDataMap = {
      ethPrice: { value: 3000, timestamp: Date.now() },
    }

    const result = await storeExternalData(mockData)

    expect(result).toBe(true)
    expect(redisStoreFunction).toHaveBeenCalledWith(mockData)
    expect(supabaseStoreFunction).toHaveBeenCalledWith(mockData)
  })

  it("should return false when data map is empty", async () => {
    const result = await storeExternalData({})

    expect(result).toBe(false)
  })

  it("should return false when both storage methods fail", async () => {
    const { redisStoreFunction } = await import("../clients/redisStoreFunction")
    const { supabaseStoreFunction } = await import(
      "../clients/supabaseStoreFunction"
    )

    vi.mocked(redisStoreFunction).mockResolvedValue(false)
    vi.mocked(supabaseStoreFunction).mockResolvedValue(false)

    const mockData: ExternalDataMap = {
      ethPrice: { value: 3000, timestamp: Date.now() },
    }

    const result = await storeExternalData(mockData)

    expect(result).toBe(false)
  })

  it("should return false when only one storage method succeeds", async () => {
    const { redisStoreFunction } = await import("../clients/redisStoreFunction")
    const { supabaseStoreFunction } = await import(
      "../clients/supabaseStoreFunction"
    )

    vi.mocked(redisStoreFunction).mockResolvedValue(true)
    vi.mocked(supabaseStoreFunction).mockResolvedValue(false)

    const mockData: ExternalDataMap = {
      ethPrice: { value: 3000, timestamp: Date.now() },
    }

    // storeExternalData returns successRedis && successSupabase
    // So it requires both to succeed
    const result = await storeExternalData(mockData)

    expect(result).toBe(false)
  })
})
