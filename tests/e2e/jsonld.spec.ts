import { expect, Page, test } from "@playwright/test"

type JsonLdNode = {
  "@type"?: string
  name?: string
  headline?: string
  description?: string
}

const I18N_KEY = /^[a-z0-9]+(?:-[a-z0-9]+)+$/

function expectLocalized(value: string | undefined) {
  expect(value).toEqual(expect.any(String))
  expect(value).not.toMatch(I18N_KEY)
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
  for (const { locale, path } of [
    { locale: "English", path: "/wallets/" },
    { locale: "Spanish", path: "/es/wallets/" },
  ]) {
    test(`uses ${locale} wallet translations`, async ({ page }) => {
      const webPage = await getJsonLdNode(page, path, "WebPage")
      const article = await getJsonLdNode(page, path, "Article")

      expectLocalized(webPage.name)
      expectLocalized(webPage.description)
      expectLocalized(article.headline)
      expectLocalized(article.description)
    })
  }

  for (const { locale, path } of [
    { locale: "English", path: "/quizzes/" },
    { locale: "Japanese", path: "/ja/quizzes/" },
  ]) {
    test(`uses ${locale} quiz translations`, async ({ page }) => {
      const webPage = await getJsonLdNode(page, path, "WebPage")

      expectLocalized(webPage.description)
    })
  }
})
