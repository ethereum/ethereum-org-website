import { takeSnapshot, test } from "@chromatic-com/playwright"

import { HomePage } from "./pages/HomePage"
import { WhatIsEthereumPage } from "./pages/WhatIsEthereumPage"

test.describe("Lowercase ethereum - visual regression", () => {
  test("homepage loads and renders correctly", async ({ page }, testInfo) => {
    const homePage = new HomePage(page)
    await homePage.goto()
    await homePage.waitForPageReady()
    await homePage.verifyPageLoaded()
    await takeSnapshot(page, "lowercase-ethereum-homepage", testInfo)
  })

  test("what-is-ethereum page loads and renders correctly", async ({
    page,
  }, testInfo) => {
    const whatIsEthereumPage = new WhatIsEthereumPage(page)
    await whatIsEthereumPage.goto()
    await whatIsEthereumPage.waitForPageReady()
    await whatIsEthereumPage.verifyPageLoaded()
    await takeSnapshot(page, "lowercase-ethereum-what-is-ethereum", testInfo)
  })
})
