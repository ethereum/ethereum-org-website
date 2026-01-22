/**
 * Playwright Test suite for data-layer getter functions.
 *
 * Tests all public getter functions to ensure they:
 * 1. Execute without errors
 * 2. Return the expected types and structures
 * 3. Handle null cases gracefully
 * 4. Validate data structure when data is present
 */

import { expect, test } from "@playwright/test"

import * as dataLayer from "@/data-layer"

test.describe("Data-Layer Getters", () => {
  test.describe("Price & Market Data", () => {
    test("getEthPrice returns MetricReturnData or null", async () => {
      const result = await dataLayer.getEthPrice()
      if (result !== null) {
        // MetricReturnData is ValueOrError<number> - check for value property
        if ("value" in result) {
          expect(typeof result.value).toBe("number")
          expect(result.value).toBeGreaterThan(0)
          if ("timestamp" in result) {
            expect(typeof result.timestamp).toBe("number")
          }
        } else {
          // If it's an error, validate error structure
          expect(result).toHaveProperty("error")
          expect(typeof result.error).toBe("string")
        }
      }
    })

    test("getEthereumMarketcapData returns MetricReturnData or null", async () => {
      const result = await dataLayer.getEthereumMarketcapData()
      if (result !== null && "value" in result) {
        expect(typeof result.value).toBe("number")
        expect(result.value).toBeGreaterThan(0)
      }
    })

    test("getEthereumStablecoinsMcapData returns MetricReturnData or null", async () => {
      const result = await dataLayer.getEthereumStablecoinsMcapData()
      if (result !== null && "value" in result) {
        expect(typeof result.value).toBe("number")
        expect(result.value).toBeGreaterThan(0)
      }
    })

    test("getTotalValueLockedData returns MetricReturnData or null", async () => {
      const result = await dataLayer.getTotalValueLockedData()
      if (result !== null && "value" in result) {
        expect(typeof result.value).toBe("number")
        expect(result.value).toBeGreaterThan(0)
      }
    })
  })

  test.describe("Layer 2 Data", () => {
    test("getL2beatData returns L2beatData or null", async () => {
      const result = await dataLayer.getL2beatData()
      if (result !== null) {
        expect(result).toHaveProperty("projects")
        expect(typeof result.projects).toBe("object")
        // Check that projects is a record with expected structure
        const projectKeys = Object.keys(result.projects)
        if (projectKeys.length > 0) {
          const firstProject = result.projects[projectKeys[0]]
          expect(firstProject).toHaveProperty("stage")
          expect(firstProject).toHaveProperty("tvs")
          expect(firstProject.tvs).toHaveProperty("breakdown")
          expect(firstProject.tvs.breakdown).toHaveProperty("total")
          expect(typeof firstProject.tvs.breakdown.total).toBe("number")
          expect(firstProject).toHaveProperty("risks")
          expect(Array.isArray(firstProject.risks)).toBe(true)
        }
      }
    })

    test("getGrowThePieData returns GrowThePieData or null", async () => {
      const result = await dataLayer.getGrowThePieData()
      if (result !== null) {
        expect(result).toHaveProperty("txCount")
        expect(result).toHaveProperty("txCostsMedianUsd")
        expect(result).toHaveProperty("dailyTxCosts")
        expect(result).toHaveProperty("activeAddresses")

        // Validate MetricReturnData structure - check for value property
        if ("value" in result.txCount) {
          expect(typeof result.txCount.value).toBe("number")
        }
        if ("value" in result.txCostsMedianUsd) {
          expect(typeof result.txCostsMedianUsd.value).toBe("number")
        }

        // Validate dailyTxCosts is a record
        expect(typeof result.dailyTxCosts).toBe("object")
        expect(Array.isArray(result.dailyTxCosts)).toBe(false)
      }
    })

    test("getGrowThePieBlockspaceData returns blockspace data or null", async () => {
      const result = await dataLayer.getGrowThePieBlockspaceData()
      if (result !== null) {
        expect(typeof result).toBe("object")
        expect(Array.isArray(result)).toBe(false)
        // Check structure of first entry if available
        const keys = Object.keys(result)
        if (keys.length > 0) {
          const firstEntry = result[keys[0]]
          expect(firstEntry).toHaveProperty("nft")
          expect(firstEntry).toHaveProperty("defi")
          expect(firstEntry).toHaveProperty("social")
          expect(firstEntry).toHaveProperty("token_transfers")
          expect(firstEntry).toHaveProperty("unlabeled")
          expect(typeof firstEntry.nft).toBe("number")
          expect(typeof firstEntry.defi).toBe("number")
        }
      }
    })

    test("getGrowThePieMasterData returns master data or null", async () => {
      const result = await dataLayer.getGrowThePieMasterData()
      if (result !== null) {
        expect(result).toHaveProperty("launchDates")
        expect(typeof result.launchDates).toBe("object")
        expect(Array.isArray(result.launchDates)).toBe(false)
        // Validate launchDates structure
        const launchDateKeys = Object.keys(result.launchDates)
        if (launchDateKeys.length > 0) {
          const firstDate = result.launchDates[launchDateKeys[0]]
          expect(typeof firstDate).toBe("string")
        }
      }
    })
  })

  test.describe("Apps & Community", () => {
    test("getAppsData returns apps data or null", async () => {
      const result = await dataLayer.getAppsData()
      if (result !== null) {
        expect(typeof result).toBe("object")
        expect(Array.isArray(result)).toBe(false)
        // Check that values are arrays
        const categoryKeys = Object.keys(result)
        if (categoryKeys.length > 0) {
          const firstCategory = result[categoryKeys[0]]
          expect(Array.isArray(firstCategory)).toBe(true)
          if (firstCategory.length > 0) {
            const firstApp = firstCategory[0]
            expect(firstApp).toHaveProperty("name")
            expect(firstApp).toHaveProperty("url")
            expect(typeof firstApp.name).toBe("string")
            expect(typeof firstApp.url).toBe("string")
          }
        }
      }
    })

    test("getCommunityPicks returns array or null", async () => {
      const result = await dataLayer.getCommunityPicks()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstPick = result[0]
          expect(firstPick).toHaveProperty("name")
          expect(firstPick).toHaveProperty("twitterURL")
          expect(firstPick).toHaveProperty("twitterHandle")
          expect(typeof firstPick.name).toBe("string")
          expect(typeof firstPick.twitterURL).toBe("string")
        }
      }
    })

    test("getCalendarEvents returns calendar events or null", async () => {
      const result = await dataLayer.getCalendarEvents()
      if (result !== null) {
        expect(result).toHaveProperty("pastEventData")
        expect(result).toHaveProperty("upcomingEventData")
        expect(Array.isArray(result.pastEventData)).toBe(true)
        expect(Array.isArray(result.upcomingEventData)).toBe(true)
      }
    })
  })

  test.describe("Content & RSS", () => {
    test("getRSSData returns array of RSS items or null", async () => {
      const result = await dataLayer.getRSSData()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstSource = result[0]
          expect(Array.isArray(firstSource)).toBe(true)
          if (firstSource.length > 0) {
            const firstItem = firstSource[0]
            expect(firstItem).toHaveProperty("title")
            expect(firstItem).toHaveProperty("link")
            expect(firstItem).toHaveProperty("pubDate")
            expect(typeof firstItem.title).toBe("string")
            expect(typeof firstItem.link).toBe("string")
          }
        }
      }
    })

    test("getAttestantPosts returns array of RSS items or null", async () => {
      const result = await dataLayer.getAttestantPosts()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstPost = result[0]
          expect(firstPost).toHaveProperty("title")
          expect(firstPost).toHaveProperty("link")
          expect(firstPost).toHaveProperty("pubDate")
          expect(typeof firstPost.title).toBe("string")
          expect(typeof firstPost.link).toBe("string")
        }
      }
    })
  })

  test.describe("Staking & Beaconchain", () => {
    test("getBeaconchainData returns combined data or null", async () => {
      const result = await dataLayer.getBeaconchainData()
      if (result !== null) {
        expect(result).toHaveProperty("totalEthStaked")
        expect(result).toHaveProperty("validatorscount")
        expect(result).toHaveProperty("apr")
        // Check values (MetricReturnData is a union type)
        if ("value" in result.totalEthStaked) {
          expect(typeof result.totalEthStaked.value).toBe("number")
          expect(result.totalEthStaked.value).toBeGreaterThan(0)
        }
        if ("value" in result.validatorscount) {
          expect(typeof result.validatorscount.value).toBe("number")
          expect(result.validatorscount.value).toBeGreaterThan(0)
        }
        if ("value" in result.apr) {
          expect(typeof result.apr.value).toBe("number")
          expect(result.apr.value).toBeGreaterThan(0)
        }
      }
    })

    test("getTotalEthStakedData returns MetricReturnData or null", async () => {
      const result = await dataLayer.getTotalEthStakedData()
      if (result !== null && "value" in result) {
        expect(typeof result.value).toBe("number")
        expect(result.value).toBeGreaterThan(0)
      }
    })
  })

  test.describe("Stats & Analytics", () => {
    test("getBlobscanStats returns blobscan stats or null", async () => {
      const result = await dataLayer.getBlobscanStats()
      if (result !== null) {
        expect(result).toHaveProperty("totalBlobs")
        expect(result).toHaveProperty("totalTransactions")
        expect(result).toHaveProperty("totalBlocks")
        expect(result).toHaveProperty("avgBlobFee")
        expect(result).toHaveProperty("updatedAt")
        expect(typeof result.totalBlobs).toBe("number")
        expect(typeof result.totalTransactions).toBe("number")
        expect(typeof result.avgBlobFee).toBe("number")
        expect(typeof result.updatedAt).toBe("string")
      }
    })

    test("getStablecoinsData returns data or null", async () => {
      const result = await dataLayer.getStablecoinsData()
      // StablecoinsData is unknown type, just check it's not null
      expect(result === null || typeof result === "object").toBe(true)
    })
  })

  test.describe("GitHub Data", () => {
    test("getGFIs returns array of GitHub issues or null", async () => {
      const result = await dataLayer.getGFIs()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstIssue = result[0]
          expect(firstIssue).toHaveProperty("title")
          expect(firstIssue).toHaveProperty("html_url")
          expect(firstIssue).toHaveProperty("created_at")
          expect(typeof firstIssue.title).toBe("string")
          expect(typeof firstIssue.html_url).toBe("string")
          expect(typeof firstIssue.created_at).toBe("string")
        }
      }
    })

    test("getGitHistory returns array of commits or null", async () => {
      const result = await dataLayer.getGitHistory()
      if (result !== null) {
        expect(Array.isArray(result)).toBe(true)
        if (result.length > 0) {
          const firstCommit = result[0]
          expect(firstCommit).toHaveProperty("commit")
          expect(firstCommit).toHaveProperty("author")
          expect(firstCommit.commit).toHaveProperty("author")
          expect(firstCommit.commit.author).toHaveProperty("date")
          expect(typeof firstCommit.commit.author.date).toBe("string")
          expect(firstCommit.author).toHaveProperty("login")
          expect(typeof firstCommit.author.login).toBe("string")
        }
      }
    })

    test("getGithubRepoData returns repo data or null", async () => {
      const result = await dataLayer.getGithubRepoData()
      if (result !== null) {
        expect(typeof result).toBe("object")
        expect(Array.isArray(result)).toBe(false)
        const repoKeys = Object.keys(result)
        if (repoKeys.length > 0) {
          const firstRepo = result[repoKeys[0]]
          expect(firstRepo).toHaveProperty("starCount")
          expect(firstRepo).toHaveProperty("languages")
          expect(typeof firstRepo.starCount).toBe("number")
          expect(Array.isArray(firstRepo.languages)).toBe(true)
        }
      }
    })
  })
})
