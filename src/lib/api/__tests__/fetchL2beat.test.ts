import { beforeEach, describe, expect, it, vi } from "vitest"

import type { L2beatResponse } from "@/lib/types"

import { fetchL2beat } from "../fetchL2beat"

import { loadMockDataFile } from "./testHelpers"

describe("fetchL2beat", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{ value: L2beatResponse }>(
      "l2beatData.json"
    )

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData.value,
    })

    const result = await fetchL2beat()

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(result.value).toHaveProperty("projects")
    expect(result.value).toHaveProperty("chart")
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    })

    const result = await fetchL2beat()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("500")
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchL2beat()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Network error")
  })
})
