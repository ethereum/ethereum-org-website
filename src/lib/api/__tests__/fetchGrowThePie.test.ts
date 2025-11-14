import { beforeEach, describe, expect, it, vi } from "vitest"

import type { GrowThePieRawDataItem } from "@/lib/types"

import { fetchGrowThePie } from "../fetchGrowThePie"

import { loadMockDataFile } from "./testHelpers"

describe("fetchGrowThePie", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{ value: GrowThePieRawDataItem[] }>(
      "growThePie.json"
    )

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData.value,
    })

    const result = await fetchGrowThePie()

    expect(Array.isArray(result)).toBe(true)
    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty("date")
    }
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    })

    const result = await fetchGrowThePie()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Failed to fetch growthepie data")
    }
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchGrowThePie()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Network error")
    }
  })
})
