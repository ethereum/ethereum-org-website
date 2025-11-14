import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchEthPrice } from "../fetchEthPrice"

import { loadMockDataFile } from "./testHelpers"

describe("fetchEthPrice", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return number on success", async () => {
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

    expect(typeof result).toBe("number")
    expect(result).toBe(mockData.value)
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
