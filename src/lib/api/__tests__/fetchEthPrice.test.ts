import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchEthPrice } from "../fetchEthPrice"

import { loadMockDataFile } from "./testHelpers"

describe("fetchEthPrice", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{
      value: number
      timestamp: number
    }>("ethPrice.json")

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ethereum: {
          usd: mockData.value,
        },
      }),
    })

    const result = await fetchEthPrice()

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(result.value).toBe(mockData.value)
    expect(typeof result.timestamp).toBe("number")
  })

  it("should throw error when USD price is missing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ethereum: {},
      }),
    })

    await expect(fetchEthPrice()).rejects.toThrow(
      "Unable to fetch ETH price from CoinGecko"
    )
  })

  it("should handle network errors", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    await expect(fetchEthPrice()).rejects.toThrow("Network error")
  })
})
