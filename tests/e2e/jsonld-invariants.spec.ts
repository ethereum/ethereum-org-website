import { expect, test } from "@playwright/test"

import { validateJsonLdDocument } from "@/lib/jsonld/validate"

const JSON_LD_ROUTES = [
  "/",
  "/wallets/",
  "/quizzes/",
  "/smart-contracts/",
  "/glossary/",
  "/developers/docs/intro-to-ethereum/",
  "/roadmap/",
  "/community/events/",
  "/es/wallets/",
  "/ja/quizzes/",
]

test.describe("JSON-LD invariants", () => {
  for (const route of JSON_LD_ROUTES) {
    test(`validates structured data on ${route}`, async ({ page }) => {
      await page.goto(route)

      const canonicalUrl = await page
        .locator('link[rel="canonical"]')
        .getAttribute("href")
      const rawDocuments = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) => scripts.map((script) => script.textContent))

      expect(
        rawDocuments.length,
        `${route} should publish JSON-LD`
      ).toBeGreaterThan(0)

      for (const [index, raw] of rawDocuments.entries()) {
        let document: unknown
        try {
          document = JSON.parse(raw ?? "")
        } catch (error) {
          throw new Error(
            `${route} JSON-LD script ${index} is not valid JSON: ${String(error)}`
          )
        }

        const errors = validateJsonLdDocument(
          document,
          canonicalUrl ?? undefined
        )
        expect(errors, `${route} JSON-LD script ${index}`).toEqual([])
      }
    })
  }
})
