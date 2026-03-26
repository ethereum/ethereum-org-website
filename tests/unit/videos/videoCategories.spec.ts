/**
 * Playwright Test suite for VIDEO_CATEGORIES config and getVideosByCategory().
 *
 * Validates:
 * 1. VIDEO_CATEGORIES structure and shape
 * 2. getVideosByCategory single-tag matching
 * 3. getVideosByCategory multi-tag union (OR) matching
 * 4. getVideosByCategory unknown-tag returns empty
 * 5. Category shelf thresholds against live videos.json
 */

import { expect, test } from "@playwright/test"

import {
  getVideos,
  getVideosByCategory,
  VIDEO_CATEGORIES,
} from "@/lib/utils/videos"

test.describe("VIDEO_CATEGORIES config", () => {
  test("has exactly 7 entries", () => {
    expect(VIDEO_CATEGORIES).toHaveLength(7)
  })

  test("each category has key, labelKey, tags, and minVideos fields", () => {
    for (const category of VIDEO_CATEGORIES) {
      expect(typeof category.key).toBe("string")
      expect(category.key.length).toBeGreaterThan(0)
      expect(typeof category.labelKey).toBe("string")
      expect(category.labelKey).toMatch(/^page-videos-category-/)
      expect(Array.isArray(category.tags)).toBe(true)
      expect(category.tags.length).toBeGreaterThan(0)
      expect(typeof category.minVideos).toBe("number")
    }
  })

  test("minVideos is 4 for all categories at launch", () => {
    for (const category of VIDEO_CATEGORIES) {
      expect(category.minVideos).toBe(4)
    }
  })
})

test.describe("getVideosByCategory", () => {
  test("returns videos matching a single tag", async () => {
    const allVideos = await getVideos()
    const result = getVideosByCategory(allVideos, ["staking"])
    expect(result.length).toBeGreaterThan(0)
    for (const video of result) {
      const tags = video.topic.split(",").map((t) => t.trim().toLowerCase())
      expect(tags).toContain("staking")
    }
  })

  test("returns union (OR) of matches for multiple tags", async () => {
    const allVideos = await getVideos()
    const result = getVideosByCategory(allVideos, ["consensus", "blockchain"])
    expect(result.length).toBeGreaterThan(0)

    for (const video of result) {
      const tags = video.topic.split(",").map((t) => t.trim().toLowerCase())
      const hasMatch = tags.includes("consensus") || tags.includes("blockchain")
      expect(hasMatch).toBe(true)
    }

    // Union should include videos tagged with EITHER tag
    const consensusOnly = getVideosByCategory(allVideos, ["consensus"])
    const blockchainOnly = getVideosByCategory(allVideos, ["blockchain"])
    expect(result.length).toBeGreaterThanOrEqual(
      Math.max(consensusOnly.length, blockchainOnly.length)
    )
  })

  test("returns empty array for unknown tag", async () => {
    const allVideos = await getVideos()
    const result = getVideosByCategory(allVideos, ["nonexistent-tag"])
    expect(result).toEqual([])
  })

  test("deduplicates — video appears at most once even if multiple tags match", async () => {
    const allVideos = await getVideos()
    // "consensus, blockchain" video should appear once even though both tags match
    const result = getVideosByCategory(allVideos, ["consensus", "blockchain"])
    const slugs = result.map((v) => v.slug)
    const uniqueSlugs = new Set(slugs)
    expect(slugs.length).toBe(uniqueSlugs.size)
  })

  test("is case-insensitive", async () => {
    const allVideos = await getVideos()
    const lower = getVideosByCategory(allVideos, ["staking"])
    const upper = getVideosByCategory(allVideos, ["STAKING"])
    const mixed = getVideosByCategory(allVideos, ["Staking"])
    expect(lower.length).toBe(upper.length)
    expect(lower.length).toBe(mixed.length)
  })

  test("at least 6 categories return >= 4 videos from live data", async () => {
    const allVideos = await getVideos()
    let passingCount = 0
    for (const category of VIDEO_CATEGORIES) {
      const result = getVideosByCategory(allVideos, [...category.tags])
      if (result.length >= category.minVideos) {
        passingCount++
      }
    }
    // At least 6 of 7 categories meet the threshold
    // (Community Stories may be below threshold gracefully)
    expect(passingCount).toBeGreaterThanOrEqual(6)
  })
})
