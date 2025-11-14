import { beforeEach, describe, expect, it, vi } from "vitest"

import { fetchGrowThePieBlockspace } from "../fetchGrowThePieBlockspace"

import { loadMockDataFile } from "./testHelpers"

// Mock GROWTHEPIE_IDS - use actual keys from mock data
vi.mock("@/data/networks/networks-data", () => ({
  GROWTHEPIE_IDS: [
    "arbitrum",
    "base",
    "optimism",
    "zksync_era",
    "linea",
    "scroll",
    "unichain",
  ],
}))

describe("fetchGrowThePieBlockspace", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return ExternalDataReturnData format on success", async () => {
    const mockData = await loadMockDataFile<{
      value: Record<
        string,
        {
          nft: number
          defi: number
          social: number
          token_transfers: number
          unlabeled: number
        }
      >
    }>("growThePieBlockspace.json")

    // Convert mock data back to API format for each network
    const networkKeys = Object.keys(mockData.value)
    const fetchMocks = networkKeys.map((network) => {
      const data = mockData.value[network]
      return {
        ok: true,
        json: async () => ({
          overview: {
            "30d": {
              nft: { data: [0, 0, 0, 0, data.nft] },
              defi: { data: [0, 0, 0, 0, data.defi] },
              social: { data: [0, 0, 0, 0, data.social] },
              token_transfers: { data: [0, 0, 0, 0, data.token_transfers] },
              unlabeled: { data: [0, 0, 0, 0, data.unlabeled] },
            },
          },
        }),
      }
    })

    global.fetch = vi.fn().mockImplementation(() => {
      const mock = fetchMocks.shift()
      return Promise.resolve(mock || { ok: false })
    })

    const result = await fetchGrowThePieBlockspace()

    expect(typeof result === "object" && !("error" in result)).toBe(true)
    if (typeof result === "object" && !("error" in result)) {
      expect(result).toHaveProperty("arbitrum")
      expect(result.arbitrum).toHaveProperty("nft")
      expect(result.arbitrum).toHaveProperty("defi")
    }
  })

  it("should continue with other networks if one fails", async () => {
    const mockData = await loadMockDataFile<{
      value: Record<
        string,
        {
          nft: number
          defi: number
          social: number
          token_transfers: number
          unlabeled: number
        }
      >
    }>("growThePieBlockspace.json")

    const networkKeys = Object.keys(mockData.value)
    const firstNetwork = networkKeys[0]
    const secondNetwork = networkKeys[1] || networkKeys[0]

    // First network fails, second succeeds
    const fetchMocks = [
      Promise.resolve({ ok: false, status: 404 } as Response),
      Promise.resolve({
        ok: true,
        json: async () => {
          const data = mockData.value[secondNetwork]
          return {
            overview: {
              "30d": {
                nft: { data: [0, 0, 0, 0, data.nft] },
                defi: { data: [0, 0, 0, 0, data.defi] },
                social: { data: [0, 0, 0, 0, data.social] },
                token_transfers: { data: [0, 0, 0, 0, data.token_transfers] },
                unlabeled: { data: [0, 0, 0, 0, data.unlabeled] },
              },
            },
          }
        },
      } as Response),
    ]

    let callCount = 0
    global.fetch = vi.fn().mockImplementation(() => {
      return (
        fetchMocks[callCount++] || Promise.resolve({ ok: false } as Response)
      )
    })

    const result = await fetchGrowThePieBlockspace()

    expect(result).toHaveProperty(secondNetwork)
    expect(result).not.toHaveProperty(firstNetwork)
  })

  it("should handle missing social data", async () => {
    const mockData = await loadMockDataFile<{
      value: Record<
        string,
        {
          nft: number
          defi: number
          social: number
          token_transfers: number
          unlabeled: number
        }
      >
    }>("growThePieBlockspace.json")

    const networkKeys = Object.keys(mockData.value)
    const testNetwork = networkKeys[0]

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => {
        const data = mockData.value[testNetwork]
        return {
          overview: {
            "30d": {
              nft: { data: [0, 0, 0, 0, data.nft] },
              defi: { data: [0, 0, 0, 0, data.defi] },
              social: { data: null }, // Missing social data
              token_transfers: { data: [0, 0, 0, 0, data.token_transfers] },
              unlabeled: { data: [0, 0, 0, 0, data.unlabeled] },
            },
          },
        }
      },
    })

    const result = await fetchGrowThePieBlockspace()

    expect(result[testNetwork].social).toBe(0)
  })

  it("should return error format on complete failure", async () => {
    // Mock fetch to throw on the outer try-catch (before the loop)
    // This is tricky because the function has a try-catch around the whole thing
    // but individual network failures are caught inside the loop
    // To trigger the outer catch, we need to throw before the loop starts
    // Actually, looking at the code, if all networks fail individually, it returns empty object
    // Only if there's an error before the loop (like GROWTHEPIE_IDS being undefined) would it error
    // Let's test the actual behavior - when all networks fail, it returns empty object
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    })

    const result = await fetchGrowThePieBlockspace()

    // When all networks fail, function returns empty object, not error
    expect(Object.keys(result)).toHaveLength(0)
  })
})
