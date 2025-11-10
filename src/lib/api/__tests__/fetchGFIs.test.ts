import { beforeEach, describe, expect, it, vi } from "vitest"

import type { GHIssue } from "@/lib/types"

import { fetchGFIs } from "../fetchGFIs"

import { loadMockDataFile } from "./testHelpers"

describe("fetchGFIs", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.GITHUB_TOKEN_READ_ONLY = "test-token"
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{ value: GHIssue[] }>(
      "gfissues.json"
    )

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData.value,
    })

    const result = await fetchGFIs()

    expect(result).toHaveProperty("value")
    expect(result).toHaveProperty("timestamp")
    expect(Array.isArray(result.value)).toBe(true)
    expect(result.value.length).toBeGreaterThan(0)
    expect(result.value[0]).toHaveProperty("title")
    expect(result.value[0]).toHaveProperty("html_url")
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    })

    const result = await fetchGFIs()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("403")
  })

  it("should include Authorization header", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    })
    global.fetch = mockFetch

    await fetchGFIs()

    expect(mockFetch).toHaveBeenCalled()
    const callArgs = mockFetch.mock.calls[0]
    expect(callArgs.length).toBeGreaterThanOrEqual(1)
    // The second argument should be the options object with headers
    if (callArgs.length > 1) {
      expect(callArgs[1]).toHaveProperty("headers")
      expect(callArgs[1].headers).toHaveProperty("Authorization")
      expect(callArgs[1].headers.Authorization).toContain("token")
    } else {
      // If called with just URL, check if headers are in a different format
      // Actually, fetch should always be called with URL and options
      expect(callArgs.length).toBe(2)
    }
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchGFIs()

    expect(result).toHaveProperty("error")
    expect(result.error).toContain("Network error")
  })
})
