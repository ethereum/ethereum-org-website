import { expect, Page, test } from "@playwright/test"

const VIDEO_SLUG = "ethereum-privacy-stack-andy-guzman"

interface JsonLdNode {
  "@type"?: string
  "@graph"?: JsonLdNode[]
  [key: string]: unknown
}

const getVideoObject = async (page: Page) => {
  const documents = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts.map((script) => JSON.parse(script.textContent || "{}"))
    )

  const nodes = (documents as JsonLdNode[]).flatMap(
    (document) => document["@graph"] || [document]
  )

  return nodes.find((node) => node["@type"] === "VideoObject")
}

test.describe("Video page structured data", () => {
  const locales = [
    {
      name: "English",
      path: `/videos/${VIDEO_SLUG}/`,
      videoName:
        "The Ethereum privacy stack: private reads, networking, and the hidden leak",
      transcriptText: "A talk by Andy Guzman",
    },
    {
      name: "Spanish",
      path: `/es/videos/${VIDEO_SLUG}/`,
      videoName:
        "El stack de privacidad de Ethereum: lecturas privadas, redes y la fuga oculta",
      transcriptText: "Una charla de Andy Guzman",
    },
  ]

  for (const locale of locales) {
    test(`${locale.name} omits the transcript from JSON-LD but renders it in the page`, async ({
      page,
    }) => {
      await page.goto(locale.path)

      const videoObject = await getVideoObject(page)

      expect(videoObject).toBeDefined()
      expect(videoObject).not.toHaveProperty("transcript")
      expect(videoObject).toEqual(
        expect.objectContaining({
          name: locale.videoName,
          thumbnailUrl: "https://img.youtube.com/vi/tvAqDJXCBaA/hqdefault.jpg",
          uploadDate: "2026-02-16T00:00:00+00:00",
        })
      )
      await expect(page.locator("main")).toContainText(locale.transcriptText)
    })
  }
})
