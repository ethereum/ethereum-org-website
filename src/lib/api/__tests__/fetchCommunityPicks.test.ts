import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchCommunityPicks } from "../fetchCommunityPicks"

import { loadMockDataFile } from "./testHelpers"

describe("fetchCommunityPicks", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.GOOGLE_API_KEY = "test-key"
    process.env.GOOGLE_SHEET_ID_DAPPS = "test-sheet-id"
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{
      value: Array<{
        name: string
        twitterURL: string
        twitterHandle: string
      }>
    }>("communityPicks.json")

    // Convert mock data back to Google Sheets format
    const headerRow = [
      "Name",
      "Twitter URL",
      "Twitter Handle",
      "App 1",
      "App 2",
      "App 3",
    ]
    const dataRows = mockData.value.map((pick) => [
      pick.name,
      pick.twitterURL,
      pick.twitterHandle,
      "", // app1Name
      "", // app2Name
      "", // app3Name
    ])

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        values: [headerRow, ...dataRows],
      }),
    })

    const result = await fetchCommunityPicks()

    expect(Array.isArray(result)).toBe(true)
    if (Array.isArray(result)) {
      expect(result.length).toBeGreaterThan(0)
      expect(result[0]).toHaveProperty("name")
      expect(result[0]).toHaveProperty("twitterURL")
    }
  })

  it("should return error when Google Sheets ID is not set", async () => {
    delete process.env.GOOGLE_SHEET_ID_DAPPS

    const result = await fetchCommunityPicks()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toBe("Google Sheets ID not set")
    }
  })

  it("should return error when Google API key is not set", async () => {
    delete process.env.GOOGLE_API_KEY

    const result = await fetchCommunityPicks()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toBe("Google API key not set")
    }
  })

  it("should return error format on API failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: "Bad Request",
    })

    const result = await fetchCommunityPicks()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Failed to fetch community picks")
    }
  })

  it("should filter out empty rows", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        values: [
          ["Name", "Twitter URL"],
          ["John Doe", "https://twitter.com/john"],
          ["", ""], // Empty row
          ["Jane Doe", "https://twitter.com/jane"],
        ],
      }),
    })

    const result = await fetchCommunityPicks()

    if (Array.isArray(result)) {
      expect(result).toHaveLength(2)
      expect(result[0].name).toBe("John Doe")
      expect(result[1].name).toBe("Jane Doe")
    }
  })

  it("should handle network errors gracefully", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"))

    const result = await fetchCommunityPicks()

    expect(typeof result === "object" && "error" in result).toBe(true)
    if (typeof result === "object" && "error" in result) {
      expect(result.error).toContain("Network error")
    }
  })
})
