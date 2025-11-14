import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchBeaconchainEthstore } from "../fetchBeaconchainEthstore"

import { loadMockDataFile } from "./testHelpers"

describe("fetchBeaconchainEthstore", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return number on success", async () => {
    const mockData = await loadMockDataFile<{
      value: number
      timestamp: number
    }>("beaconchainApr.json")

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          apr: mockData.value,
        },
      }),
    })

    const result = await fetchBeaconchainEthstore()

    expect(typeof result).toBe("number")
    expect(result).toBe(mockData.value)
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchBeaconchainEthstore()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(typeof result.error).toBe("string")
      expect(result.error).toContain("status 500")
    }
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchBeaconchainEthstore()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Network error")
    }
  })
})
