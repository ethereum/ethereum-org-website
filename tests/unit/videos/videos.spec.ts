/**
 * Playwright Test suite for video data access utilities.
 *
 * Tests all video utility functions to ensure they:
 * 1. Execute without errors
 * 2. Return the expected types and structures
 * 3. Handle null cases gracefully
 * 4. Validate data structure when data is present
 */

import { expect, test } from "@playwright/test"

import { getVideoBySlug, getVideos } from "@/lib/utils/videos"
import { getTranscript, getVideoMeta } from "@/lib/utils/videoTranscripts"

test.describe("Video Data Access Utilities", () => {
  test.describe("getVideos", () => {
    test("returns all videos", async () => {
      const videos = await getVideos()
      expect(Array.isArray(videos)).toBe(true)
      expect(videos).toHaveLength(42)
    })

    test("each video has required fields", async () => {
      const videos = await getVideos()
      for (const video of videos) {
        expect(typeof video.slug).toBe("string")
        expect(typeof video.youtubeId).toBe("string")
        expect(typeof video.uploadDate).toBe("string")
        expect(typeof video.duration).toBe("string")
        expect(["beginner", "intermediate", "advanced"]).toContain(
          video.educationLevel
        )
        expect(typeof video.topic).toBe("string")
        expect([
          "presentation",
          "explainer",
          "interview",
          "tutorial",
          "panel",
        ]).toContain(video.format)
        expect(video.language).toBe("en")
        expect(typeof video.author).toBe("string")
      }
    })
  })

  test.describe("getVideoBySlug", () => {
    test("returns matching video for valid slug", async () => {
      const video = await getVideoBySlug("desci-movement-juan-benet")
      expect(video).not.toBeNull()
      expect(video!.slug).toBe("desci-movement-juan-benet")
    })

    test("returns null for nonexistent slug", async () => {
      const video = await getVideoBySlug("nonexistent")
      expect(video).toBeNull()
    })
  })

  test.describe("getVideoMeta", () => {
    test("returns title and description from transcript frontmatter", async () => {
      const meta = await getVideoMeta("desci-movement-juan-benet")
      expect(typeof meta.title).toBe("string")
      expect(meta.title.length).toBeGreaterThan(0)
      expect(meta.title).toBe(
        "DeSci, independent labs, and large-scale data science"
      )
      expect(typeof meta.description).toBe("string")
      expect(meta.description.length).toBeGreaterThan(0)
    })
  })

  test.describe("getTranscript", () => {
    test("returns non-empty string for valid slug", async () => {
      const transcript = await getTranscript("desci-movement-juan-benet")
      expect(typeof transcript).toBe("string")
      expect(transcript.length).toBeGreaterThan(0)
    })

    test("throws descriptive error for nonexistent slug", async () => {
      // Now throws "No video found" error (slug validation happens first)
      await expect(getTranscript("nonexistent-video")).rejects.toThrow(
        /No video found with slug/
      )
    })

    test("validates slug exists before attempting file read", async () => {
      // Should throw error mentioning invalid slug, not file not found
      await expect(getTranscript("invalid-slug-999")).rejects.toThrow(
        /No video found with slug/
      )
    })
  })
})
