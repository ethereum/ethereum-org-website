import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchEthereumMarketcap } from "../fetchEthereumMarketcap"

import { loadMockDataFile } from "./testHelpers"

describe("fetchEthereumMarketcap", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return number on success", async () => {
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

    expect(typeof result).toBe("number")
    expect(result).toBe(mockData.value)
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchEthereumMarketcap()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("status 500")
    }
  })

  it("should return error when market cap is missing", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ethereum: {},
      }),
    })

    const result = await fetchEthereumMarketcap()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Unable to fetch ETH market cap")
    }
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchEthereumMarketcap()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Network error")
    }
  })
})
