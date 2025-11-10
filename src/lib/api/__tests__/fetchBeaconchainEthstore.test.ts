import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchBeaconchainEthstore } from "../fetchBeaconchainEthstore"

import { loadMockDataFile } from "./testHelpers"

describe("fetchBeaconchainEthstore", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
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

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(result.value).toBe(mockData.value)
    expect(typeof result.timestamp).toBe("number")
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchBeaconchainEthstore()

    expect(result).toHaveProperty("error")
    expect(typeof result.error).toBe("string")
    expect(result.error).toContain("status 500")
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchBeaconchainEthstore()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Network error")
  })
})
