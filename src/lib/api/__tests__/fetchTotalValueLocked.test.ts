import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchTotalValueLocked } from "../fetchTotalValueLocked"

describe("fetchTotalValueLocked", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        { totalLiquidityUSD: 1000000 },
        { totalLiquidityUSD: 2000000 },
        { totalLiquidityUSD: 3000000 }, // Latest value
      ],
    })

    const result = await fetchTotalValueLocked()

    expect(typeof result).toBe("number")
    expect(result).toBe(3000000) // Should use last value
  })

  it("should throw error on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    })

    await expect(fetchTotalValueLocked()).rejects.toThrow(
      "Failed to fetch Defi Llama TVL data"
    )
  })

  it("should handle network errors", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    await expect(fetchTotalValueLocked()).rejects.toThrow("Network error")
  })
})
