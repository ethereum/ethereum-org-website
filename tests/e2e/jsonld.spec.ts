import { expect, Page, test } from "@playwright/test"

import enQuizzes from "@/intl/en/learn-quizzes.json"
import enWallets from "@/intl/en/page-wallets.json"
import esWallets from "@/intl/es/page-wallets.json"
import jaQuizzes from "@/intl/ja/learn-quizzes.json"

type JsonLdNode = {
  "@type"?: string
  name?: string
  headline?: string
  description?: string
}

async function getJsonLdNode(page: Page, path: string, type: string) {
  await page.goto(path)

  const scripts = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  const nodes = scripts.flatMap((script) => {
    const data = JSON.parse(script)
    return Array.isArray(data["@graph"]) ? data["@graph"] : []
  }) as JsonLdNode[]

  const node = nodes.find(({ "@type": nodeType }) => nodeType === type)
  expect(node, `${type} JSON-LD node on ${path}`).toBeDefined()

  return node!
}

test.describe("Localized JSON-LD", () => {
  for (const { locale, path, messages } of [
    { locale: "English", path: "/wallets/", messages: enWallets },
    { locale: "Spanish", path: "/es/wallets/", messages: esWallets },
  ]) {
    test(`uses ${locale} wallet translations`, async ({ page }) => {
      const webPage = await getJsonLdNode(page, path, "WebPage")
      const article = await getJsonLdNode(page, path, "Article")

      expect(webPage.name).toBe(messages["page-wallets-meta-title"])
      expect(webPage.description).toBe(
        messages["page-wallets-meta-description"]
      )
      expect(article.headline).toBe(messages["page-wallets-title"])
      expect(article.description).toBe(
        messages["page-wallets-meta-description"]
      )
    })
  }

  for (const { locale, path, messages } of [
    { locale: "English", path: "/quizzes/", messages: enQuizzes },
    { locale: "Japanese", path: "/ja/quizzes/", messages: jaQuizzes },
  ]) {
    test(`uses ${locale} quiz translations`, async ({ page }) => {
      const webPage = await getJsonLdNode(page, path, "WebPage")

      expect(webPage.description).toBe(messages["quizzes-subtitle"])
    })
  }
})
