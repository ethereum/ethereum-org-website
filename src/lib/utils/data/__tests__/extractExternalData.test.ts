import { describe, expect, it } from "vitest"

import type {
  CoinGeckoCoinMarketItem,
  CommunityPick,
  ExternalDataReturnData,
  FrameworkGitHubData,
  GHIssue,
  GrowThePieBlockspaceData,
  GrowThePieLaunchDates,
  GrowThePieRawDataItem,
  L2beatResponse,
  RSSItem,
} from "@/lib/types"
import type { CommunityEvent } from "@/lib/interfaces"

import {
  extractArray,
  extractCalendarEventsFormatted,
  extractCommunityPicks,
  extractFrameworkGitHubData,
  extractGFIssues,
  extractGrowThePieBlockspace,
  extractGrowThePieData,
  extractGrowThePieMaster,
  extractL2beatData,
  extractNestedValue,
  extractRSSFeeds,
  extractRSSItems,
  extractStablecoinsData,
  extractValue,
} from "../extractExternalData"
import type { ExternalDataMap } from "../fetchExternalData"

describe("extractValue", () => {
  it("should extract simple value from data map", () => {
    const data: ExternalDataMap = {
      ethPrice: {
        value: 3000,
        timestamp: Date.now(),
      } as ExternalDataReturnData,
    }

    const result = extractValue(data, "ethPrice", 0)
    expect(result.value).toBe(3000)
    expect(result.timestamp).toBeDefined()
    expect(typeof result.timestamp).toBe("number")
  })

  it("should return default value when key not found", () => {
    const data: ExternalDataMap = {}

    const result = extractValue(data, "ethPrice", 0)
    expect(result.value).toBe(0)
    expect(result.timestamp).toBeDefined()
  })

  it("should return default value when error present", () => {
    const data: ExternalDataMap = {
      ethPrice: { error: "API error" },
    }

    const result = extractValue(data, "ethPrice", 0)
    expect(result.value).toBe(0)
  })

  it("should return default value when data is null", () => {
    const result = extractValue(null, "ethPrice", 0)
    expect(result.value).toBe(0)
  })

  it("should work with string values", () => {
    const data: ExternalDataMap = {
      testKey: {
        value: "test",
        timestamp: Date.now(),
      } as unknown as ExternalDataReturnData,
    }

    const result = extractValue(data, "testKey", "default")
    expect(result.value).toBe("test")
  })
})

describe("extractNestedValue", () => {
  it("should extract nested value from beaconchainEpoch", () => {
    const data: ExternalDataMap = {
      beaconchainEpoch: {
        totalEthStaked: { value: 35000000, timestamp: Date.now() },
        validatorscount: { value: 1000000, timestamp: Date.now() },
      },
    }

    const result = extractNestedValue(
      data,
      "beaconchainEpoch",
      "totalEthStaked",
      0
    )
    expect(result.value).toBe(35000000)
    expect(result.timestamp).toBeDefined()
  })

  it("should return default when nested key not found", () => {
    const data: ExternalDataMap = {
      beaconchainEpoch: {
        validatorscount: { value: 1000000, timestamp: Date.now() },
      },
    }

    const result = extractNestedValue(
      data,
      "beaconchainEpoch",
      "totalEthStaked",
      0
    )
    expect(result.value).toBe(0)
  })

  it("should return default when parent key not found", () => {
    const data: ExternalDataMap = {}

    const result = extractNestedValue(
      data,
      "beaconchainEpoch",
      "totalEthStaked",
      0
    )
    expect(result.value).toBe(0)
  })

  it("should return default when parent key has error", () => {
    const data: ExternalDataMap = {
      beaconchainEpoch: { error: "API error" },
    }

    const result = extractNestedValue(
      data,
      "beaconchainEpoch",
      "totalEthStaked",
      0
    )
    expect(result.value).toBe(0)
  })
})

describe("extractArray", () => {
  it("should extract array from data map", () => {
    const data: ExternalDataMap = {
      communityPicks: {
        value: [
          { name: "Pick 1", twitterURL: "https://example.com" },
          { name: "Pick 2", twitterURL: "https://example2.com" },
        ] as CommunityPick[],
        timestamp: Date.now(),
      } as ExternalDataReturnData,
    }

    const result = extractArray<CommunityPick>(data, "communityPicks")
    expect(result).toHaveLength(2)
    expect(result[0]).toHaveProperty("name")
  })

  it("should return empty array when key not found", () => {
    const data: ExternalDataMap = {}

    const result = extractArray(data, "communityPicks")
    expect(result).toEqual([])
  })

  it("should return empty array when error present", () => {
    const data: ExternalDataMap = {
      communityPicks: { error: "API error" },
    }

    const result = extractArray(data, "communityPicks")
    expect(result).toEqual([])
  })

  it("should return default array when provided", () => {
    const data: ExternalDataMap = {}
    const defaultValue = [{ name: "default" }]

    const result = extractArray(data, "communityPicks", defaultValue)
    expect(result).toEqual(defaultValue)
  })
})

describe("extractGrowThePieData", () => {
  it("should extract GrowThePie data", () => {
    const data: ExternalDataMap = {
      growThePie: {
        value: [
          {
            date: "2024-01-01",
            txCount: 1000000,
            txCostsMedianUsd: 2.5,
          },
        ] as unknown as GrowThePieRawDataItem[],
        timestamp: Date.now(),
      } as unknown as ExternalDataReturnData,
    }

    const result = extractGrowThePieData(data)
    expect(result).toBeDefined()
    expect(Array.isArray(result)).toBe(true)
    expect(result?.[0]).toHaveProperty("date")
  })

  it("should return null when key not found", () => {
    const data: ExternalDataMap = {}
    const result = extractGrowThePieData(data)
    expect(result).toBeNull()
  })
})

describe("extractCommunityPicks", () => {
  it("should extract community picks array", () => {
    const data: ExternalDataMap = {
      communityPicks: {
        value: [
          { name: "Pick 1", twitterURL: "https://example.com" },
        ] as CommunityPick[],
        timestamp: Date.now(),
      },
    }

    const result = extractCommunityPicks(data)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty("name")
  })

  it("should return empty array when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractCommunityPicks(data)
    expect(result).toEqual([])
  })
})

describe("extractGFIssues", () => {
  it("should extract GitHub good first issues", () => {
    const data: ExternalDataMap = {
      gfissues: {
        value: [
          {
            title: "Test Issue",
            html_url: "https://github.com/test",
          },
        ] as GHIssue[],
        timestamp: Date.now(),
      },
    }

    const result = extractGFIssues(data)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty("title")
  })

  it("should return empty array when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractGFIssues(data)
    expect(result).toEqual([])
  })
})

describe("extractStablecoinsData", () => {
  it("should extract stablecoins data", () => {
    const data: ExternalDataMap = {
      stablecoinsData: {
        value: [
          {
            id: "tether",
            symbol: "usdt",
            name: "Tether",
          },
        ] as CoinGeckoCoinMarketItem[],
        timestamp: Date.now(),
      },
    }

    const result = extractStablecoinsData(data)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty("id")
  })

  it("should return empty array when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractStablecoinsData(data)
    expect(result).toEqual([])
  })
})

describe("extractGrowThePieBlockspace", () => {
  it("should extract blockspace data", () => {
    const data: ExternalDataMap = {
      growThePieBlockspace: {
        value: {
          ethereum: {
            nft: 100,
            defi: 200,
            social: 50,
            token_transfers: 300,
            unlabeled: 150,
          },
        } as GrowThePieBlockspaceData,
        timestamp: Date.now(),
      },
    }

    const result = extractGrowThePieBlockspace(data)
    expect(result).toHaveProperty("ethereum")
    expect(result.ethereum).toHaveProperty("nft")
  })

  it("should return empty object when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractGrowThePieBlockspace(data)
    expect(result).toEqual({})
  })
})

describe("extractGrowThePieMaster", () => {
  it("should extract master data (launch dates)", () => {
    const data: ExternalDataMap = {
      growThePieMaster: {
        value: {
          ethereum: "2015-07-30",
        } as GrowThePieLaunchDates,
        timestamp: Date.now(),
      },
    }

    const result = extractGrowThePieMaster(data)
    expect(result).toHaveProperty("ethereum")
    expect(result.ethereum).toBe("2015-07-30")
  })

  it("should return empty object when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractGrowThePieMaster(data)
    expect(result).toEqual({})
  })
})

describe("extractL2beatData", () => {
  it("should extract L2beat data", () => {
    const data: ExternalDataMap = {
      l2beatData: {
        value: {
          projects: {},
        } as L2beatResponse,
        timestamp: Date.now(),
      },
    }

    const result = extractL2beatData(data)
    expect(result).toBeDefined()
    expect(result).toHaveProperty("projects")
  })

  it("should return null when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractL2beatData(data)
    expect(result).toBeNull()
  })
})

describe("extractFrameworkGitHubData", () => {
  it("should extract framework GitHub data", () => {
    const data: ExternalDataMap = {
      frameworkGitHubData: {
        value: {
          hardhat: {
            starCount: 1000,
            languages: ["TypeScript"],
          },
        } as FrameworkGitHubData,
        timestamp: Date.now(),
      },
    }

    const result = extractFrameworkGitHubData(data)
    expect(result).toBeDefined()
    expect(result).toHaveProperty("hardhat")
  })

  it("should return null when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractFrameworkGitHubData(data)
    expect(result).toBeNull()
  })
})

describe("extractCalendarEventsFormatted", () => {
  it("should extract calendar events as typed arrays", () => {
    const mockEvent: CommunityEvent = {
      title: "Test Event",
      date: "2024-01-01",
      calendarLink: "https://example.com",
    }

    const data: ExternalDataMap = {
      calendarEvents: {
        value: {
          upcomingEvents: {
            value: [mockEvent],
            timestamp: Date.now(),
          } as ExternalDataReturnData,
          pastEvents: {
            value: [],
            timestamp: Date.now(),
          } as ExternalDataReturnData,
        },
        timestamp: Date.now(),
      } as unknown as ExternalDataReturnData,
    }

    const result = extractCalendarEventsFormatted(data)
    expect(result).toHaveProperty("upcomingEventData")
    expect(result).toHaveProperty("pastEventData")
    expect(Array.isArray(result.upcomingEventData)).toBe(true)
    expect(result.upcomingEventData[0]).toHaveProperty("title")
  })

  it("should return empty arrays when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractCalendarEventsFormatted(data)
    expect(result.upcomingEventData).toEqual([])
    expect(result.pastEventData).toEqual([])
  })
})

describe("extractRSSItems", () => {
  it("should extract RSS items array", () => {
    const data: ExternalDataMap = {
      attestantPosts: {
        value: [
          {
            title: "Test Post",
            link: "https://example.com",
            pubDate: "2024-01-01",
          },
        ] as RSSItem[],
        timestamp: Date.now(),
      },
    }

    const result = extractRSSItems(data, "attestantPosts")
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty("title")
  })

  it("should return empty array when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractRSSItems(data, "attestantPosts")
    expect(result).toEqual([])
  })
})

describe("extractRSSFeeds", () => {
  it("should extract RSS feeds (array of arrays)", () => {
    const data: ExternalDataMap = {
      blogFeeds: {
        value: [
          [
            {
              title: "Post 1",
              link: "https://example.com/1",
              pubDate: "2024-01-01",
            },
          ],
          [
            {
              title: "Post 2",
              link: "https://example.com/2",
              pubDate: "2024-01-02",
            },
          ],
        ] as RSSItem[][],
        timestamp: Date.now(),
      },
    }

    const result = extractRSSFeeds(data)
    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toBeInstanceOf(Array)
    expect(result[0][0]).toHaveProperty("title")
  })

  it("should return empty array when not found", () => {
    const data: ExternalDataMap = {}
    const result = extractRSSFeeds(data)
    expect(result).toEqual([])
  })
})
