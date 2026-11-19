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

async function expectNoRawKeysOnPage(page: Page) {
  const strings = await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    )
    const out: string[] = []
    while (walker.nextNode()) {
      const node = walker.currentNode
      if (!node.parentElement?.closest("script, style, code, pre"))
        out.push(node.textContent?.trim() ?? "")
    }
    document
      .querySelectorAll("[aria-label]")
      .forEach((el) => out.push(el.getAttribute("aria-label")!.trim()))
    return out
  })
  expect(strings.filter((s) => I18N_KEY.test(s))).toEqual([])
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
  await expectNoRawKeysOnPage(page)

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

  for (const { locale, path } of [
    { locale: "English", path: "/videos/ethereum-privacy-stack-andy-guzman/" },
    {
      locale: "Spanish",
      path: "/es/videos/ethereum-privacy-stack-andy-guzman/",
    },
  ]) {
    test(`omits ${locale} video transcript from JSON-LD`, async ({ page }) => {
      const video = await getJsonLdNode(page, path, "VideoObject")

      expectLocalized(video.name)
      expect(video).not.toHaveProperty("transcript")
      await expect(page.locator("main")).toContainText("Andy Guzman")
    })
  }
})
