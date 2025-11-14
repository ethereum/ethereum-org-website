import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchEthereumStablecoinsMcap } from "../fetchEthereumStablecoinsMcap"

describe("fetchEthereumStablecoinsMcap", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          gecko_id: "ethereum",
          totalCirculatingUSD: {
            usdt: 50000000000,
            usdc: 30000000000,
          },
        },
        {
          gecko_id: "other",
          totalCirculatingUSD: {},
        },
      ],
    })

    const result = await fetchEthereumStablecoinsMcap()

    expect(typeof result).toBe("number")
    expect(result).toBe(80000000000) // Sum of usdt + usdc
  })

  it("should return error when Ethereum data not found", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          gecko_id: "other",
          totalCirculatingUSD: {},
        },
      ],
    })

    const result = await fetchEthereumStablecoinsMcap()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Ethereum stablecoin data not found")
    }
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchEthereumStablecoinsMcap()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("500")
    }
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchEthereumStablecoinsMcap()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Network error")
    }
  })
})
