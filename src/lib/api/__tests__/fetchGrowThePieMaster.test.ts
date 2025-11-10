import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchGrowThePieMaster } from "../fetchGrowThePieMaster"

import { loadMockDataFile } from "./testHelpers"

describe("fetchGrowThePieMaster", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{
      value: Record<string, string | null>
    }>("growThePieMaster.json")

    // Convert mock data back to API format
    const chains = Object.entries(mockData.value).reduce(
      (acc, [key, launchDate]) => {
        if (launchDate) {
          acc[key] = {
            url_key: key,
            launch_date: launchDate,
          }
        }
        return acc
      },
      {} as Record<string, { url_key: string; launch_date: string }>
    )

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ chains }),
    })

    const result = await fetchGrowThePieMaster()

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(result.value).toHaveProperty("ethereum")
    expect(result.value.ethereum).toBe("2015-07-30")
  })

  it("should transform chains data to launch dates record", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        chains: {
          test: {
            url_key: "test",
            launch_date: "2020-01-01",
          },
        },
      }),
    })

    const result = await fetchGrowThePieMaster()

    expect(result.value).toEqual({ test: "2020-01-01" })
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchGrowThePieMaster()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("500")
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchGrowThePieMaster()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Network error")
  })
})
