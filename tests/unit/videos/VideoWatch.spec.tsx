import { expect, test } from "@playwright/test"

import { getVideoBySlug } from "@/lib/utils/videos"

/**
 * Tests the data contract that VideoWatch depends on.
 *
 * VideoWatch imports YouTube.tsx → react-lite-youtube-embed (CJS-only),
 * which breaks Playwright's ESM runner. Instead of importing the component
 * directly, we verify the data logic that drives its render decisions:
 *   - Invalid slug → null (component returns null)
 *   - Valid slug → Video object with all required fields (component renders)
 *
 * Note: title and description are sourced directly from the Video object
 * in videos.json (CC-2026-03-26 revert — NOT from transcript frontmatter).
 */
test.describe("VideoWatch Data Contract", () => {
  test("returns null for invalid slug (component would return null)", async () => {
    const video = await getVideoBySlug("invalid-slug-for-testing")
    expect(video).toBeNull()
  })

  test("returns video data for valid slug (component would render)", async () => {
    const video = await getVideoBySlug("learn-nfts-and-defi")
    expect(video).not.toBeNull()
    expect(video!.slug).toBe("learn-nfts-and-defi")
    expect(video!.youtubeId).toBe("Xdkkux6OxfM")
  })

  test("video has all fields required by VideoWatch rendering", async () => {
    const video = await getVideoBySlug("learn-nfts-and-defi")
    expect(video).not.toBeNull()

    // VideoWatch uses these fields for rendering
    expect(typeof video!.youtubeId).toBe("string") // YouTube embed
    expect(typeof video!.slug).toBe("string") // link href
    expect(typeof video!.title).toBe("string") // h3 heading
    expect(video!.title.length).toBeGreaterThan(0)
    expect(typeof video!.description).toBe("string") // paragraph text
    expect(video!.description.length).toBeGreaterThan(0)
  })
})
