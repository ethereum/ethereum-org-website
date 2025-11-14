import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchBeaconchainEpoch } from "../fetchBeaconchainEpoch"

import { loadMockDataFile } from "./testHelpers"

describe("fetchBeaconchainEpoch", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return object with raw values on success", async () => {
    const mockData = await loadMockDataFile<{
      totalEthStaked: { value: number; timestamp: number }
      validatorscount: { value: number; timestamp: number }
    }>("beaconchainEpoch.json")

    // Convert back to gwei for API response
    const eligibleether = mockData.totalEthStaked.value * 1e9

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          eligibleether,
          validatorscount: mockData.validatorscount.value,
        },
      }),
    })

    const result = await fetchBeaconchainEpoch()

    expect(result).toHaveProperty("totalEthStaked")
    expect(result).toHaveProperty("validatorscount")
    expect(typeof result.totalEthStaked).toBe("number")
    expect(typeof result.validatorscount).toBe("number")
    expect(result.totalEthStaked).toBe(mockData.totalEthStaked.value)
    expect(result.validatorscount).toBe(mockData.validatorscount.value)
  })

  it("should convert gwei to ETH correctly", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          eligibleether: 1000000000000000000, // 1 ETH in gwei
          validatorscount: 1000,
        },
      }),
    })

    const result = await fetchBeaconchainEpoch()

    expect(result.totalEthStaked).toBe(1000000000) // 1 ETH * 1e9
  })

  it("should throw error on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    await expect(fetchBeaconchainEpoch()).rejects.toThrow(
      "Failed to fetch Beaconcha.in epoch data"
    )
  })

  it("should handle network errors", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    await expect(fetchBeaconchainEpoch()).rejects.toThrow("Network error")
  })
})
