import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchEthereumMarketcap } from "../fetchEthereumMarketcap"

import { loadMockDataFile } from "./testHelpers"

describe("fetchEthereumMarketcap", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{
      value: number
      timestamp: number
    }>("ethereumMarketcap.json")

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ethereum: {
          usd_market_cap: mockData.value,
        },
      }),
    })

    const result = await fetchEthereumMarketcap()

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(result.value).toBe(mockData.value)
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchEthereumMarketcap()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("status 500")
  })

  it("should return error when market cap is missing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ethereum: {},
      }),
    })

    const result = await fetchEthereumMarketcap()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Unable to fetch ETH market cap")
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchEthereumMarketcap()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Network error")
  })
})
