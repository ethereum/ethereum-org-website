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
import { getTranscript } from "@/lib/utils/videoTranscripts"

test.describe("Video Data Access Utilities", () => {
  test.describe("getVideos", () => {
    test("returns all videos", async () => {
      const videos = await getVideos()
      expect(Array.isArray(videos)).toBe(true)
      expect(videos).toHaveLength(37)
    })

    test("each video has required fields", async () => {
      const videos = await getVideos()
      for (const video of videos) {
        expect(typeof video.slug).toBe("string")
        expect(typeof video.youtubeId).toBe("string")
        expect(typeof video.title).toBe("string")
        expect(typeof video.description).toBe("string")
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
        expect(typeof video.transcriptPath).toBe("string")
      }
    })
  })

  test.describe("getVideoBySlug", () => {
    test("returns matching video for valid slug", async () => {
      const video = await getVideoBySlug("desci-movement-juan-benet")
      expect(video).not.toBeNull()
      expect(video!.slug).toBe("desci-movement-juan-benet")
      expect(video!.title).toBe("The DeSci movement with Juan Benet")
    })

    test("returns null for nonexistent slug", async () => {
      const video = await getVideoBySlug("nonexistent")
      expect(video).toBeNull()
    })

    test("video has title and description on the Video object", async () => {
      const video = await getVideoBySlug("desci-movement-juan-benet")
      expect(video).not.toBeNull()
      expect(typeof video!.title).toBe("string")
      expect(video!.title.length).toBeGreaterThan(0)
      expect(typeof video!.description).toBe("string")
      expect(video!.description.length).toBeGreaterThan(0)
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

    test("uses transcriptPath from video data", async () => {
      // Verifies the implementation uses video.transcriptPath from videos.json
      const video = await getVideoBySlug("desci-movement-juan-benet")
      expect(video).not.toBeNull()
      expect(video!.transcriptPath).toBe(
        "videos/desci-movement-juan-benet/transcript"
      )

      // getTranscript should resolve this path successfully
      const transcript = await getTranscript("desci-movement-juan-benet")
      expect(typeof transcript).toBe("string")
      expect(transcript.length).toBeGreaterThan(0)
    })
  })
})
