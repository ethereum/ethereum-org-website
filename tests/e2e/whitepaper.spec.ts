import { expect, request, test } from "@playwright/test"

import { MdPage } from "./pages/MdPage"

const PAGE_URL = "/whitepaper"
const PDF_LINK_TEXT = /whitepaper.*pdf/i
const PDF_PATH =
  "/content/whitepaper/whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf"

test.describe("Whitepaper Page", () => {
  test("whitepaper PDF link has correct href", async ({ page }) => {
    const whitepaperPage = new MdPage(page, PAGE_URL)
    await whitepaperPage.goto()
    await whitepaperPage.waitForPageReady()
    await whitepaperPage.verifyLinkVisible(PDF_LINK_TEXT)
    await whitepaperPage.verifyLinkHref(PDF_LINK_TEXT, PDF_PATH)
  })

  test("whitepaper PDF is accessible and served as PDF", async ({
    baseURL,
  }) => {
    const apiRequest = await request.newContext()
    const response = await apiRequest.get(baseURL + PDF_PATH)
    expect(response.status()).toBe(200)
    expect(response.headers()["content-type"]).toContain("application/pdf")
    await apiRequest.dispose()
  })
})
