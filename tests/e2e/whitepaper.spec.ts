import { expect, request, test } from "@playwright/test"

import { MdPage } from "./pages/MdPage"

const PAGE_URL = "/whitepaper"
const PDF_FILENAME = "Ethereum_Whitepaper_-_Buterin_2014.pdf"
const PDF_PATH = `/content/whitepaper/whitepaper-pdf/${PDF_FILENAME}`

test.describe("Whitepaper Page", () => {
  test("whitepaper PDF link is visible and has correct href", async ({
    page,
  }) => {
    const whitepaperPage = new MdPage(page, PAGE_URL)
    await whitepaperPage.goto()

    // Select by href - more robust than link text which may change
    const pdfLink = page.locator(`a[href*="${PDF_FILENAME}"]`)
    await expect(pdfLink).toBeVisible()
    await expect(pdfLink).toHaveAttribute(
      "href",
      expect.stringContaining(PDF_PATH)
    )
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
