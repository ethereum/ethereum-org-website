import { beforeEach, describe, expect, it, vi } from "vitest"

import type { CoinGeckoCoinMarketItem } from "@/lib/types"

import { fetchStablecoinsData } from "../fetchStablecoinsData"

describe("fetchStablecoinsData", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData: CoinGeckoCoinMarketItem[] = [
      {
        id: "tether",
        symbol: "usdt",
        name: "Tether",
        current_price: 1.0,
        market_cap: 100000000000,
      },
    ]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    })

    const result = await fetchStablecoinsData()

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(Array.isArray(result.value)).toBe(true)
    expect(result.value).toEqual(mockData)
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
    })

    const result = await fetchStablecoinsData()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("429")
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchStablecoinsData()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Network error")
  })
})
