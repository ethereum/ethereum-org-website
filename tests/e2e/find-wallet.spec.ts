import { expect, type Page, test } from "@playwright/test"

import { testData } from "./fixtures/testData"
import { FindWalletPage } from "./pages/FindWalletPage"

// Persona feature sets from `src/lib/constants.ts`; a persona is a shortcut
// that checks these in the sidebar, so the URL carries them, not its name.
const NFTS = ["connect_to_dapps", "layer_2", "nft_support"]
const FINANCE = [
  "connect_to_dapps",
  "erc_20_support",
  "gas_fee_customization",
  "hardware_support",
]
const union = (...sets: string[][]) => [...new Set(sets.flat())].sort()

const advancedParam = (page: Page) =>
  (new URL(page.url()).searchParams.get("advanced") ?? "")
    .split(",")
    .filter(Boolean)
    .sort()

test.describe("Find Wallet Page", () => {
  let findWalletPage: FindWalletPage

  test.beforeEach(async ({ page }) => {
    findWalletPage = new FindWalletPage(page)
    await findWalletPage.goto()
  })

  test("loads successfully", async () => {
    await findWalletPage.waitForPageReady()
    await findWalletPage.verifyPageLoaded()
  })

  test("persona cards filter in place and expand into the query", async ({
    page,
  }) => {
    const total = await findWalletPage.getTotalCount()

    await findWalletPage.togglePersona("NFTs")
    await findWalletPage.waitForResultsChange(total)
    const nftCount = await findWalletPage.getResultsCount()
    expect(nftCount).toBeGreaterThan(0)
    // The pathname never moves; only the base filters land in the query.
    await expect(page).toHaveURL(/\/find-wallet\/\?advanced=/)
    await expect.poll(() => advancedParam(page)).toEqual(NFTS)
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()

    // Two personas AND-combine as the union of their features.
    await findWalletPage.togglePersona("Finance")
    await expect.poll(() => advancedParam(page)).toEqual(union(NFTS, FINANCE))
    expect(await findWalletPage.getResultsCount()).toBeLessThanOrEqual(nftCount)
    await expect(findWalletPage.personaCheckbox("Finance")).toBeChecked()

    await page.reload({ waitUntil: "domcontentloaded" })
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()
    await expect(findWalletPage.personaCheckbox("Finance")).toBeChecked()

    // Unchecking Finance keeps connect_to_dapps, which NFTs still needs.
    await findWalletPage.togglePersona("Finance")
    await expect(findWalletPage.personaCheckbox("Finance")).not.toBeChecked()
    await expect.poll(() => advancedParam(page)).toEqual(NFTS)
    expect(await findWalletPage.getResultsCount()).toBe(nftCount)
  })

  test("persona card title is a real link that filters on a plain click", async ({
    page,
  }) => {
    const link = page
      .getByTestId("persona-cards-container")
      .getByRole("link", { name: /^NFTs/ })
    await expect(link).toHaveAttribute(
      "href",
      /\/wallets\/find-wallet\/personas\/nfts\/$/
    )
    await link.click()
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()
    await expect(page).toHaveURL(/\/find-wallet\/\?advanced=/)
  })

  // Persona cards derive from the base filters, so clearing those leaves
  // nothing for a card to stay checked on.
  test("reset clears a persona-driven selection", async ({ page }) => {
    const total = await findWalletPage.getTotalCount()
    await findWalletPage.togglePersona("NFTs")
    await findWalletPage.waitForResultsChange(total)

    await findWalletPage.resetFilters()
    await expect(findWalletPage.personaCheckbox("NFTs")).not.toBeChecked()
    await expect(page).toHaveURL(/\/find-wallet\/$/)
    expect(await findWalletPage.getResultsCount()).toBe(total)
  })

  test("persona deep-link pre-selects the card", async ({ page }) => {
    await page.goto("/wallets/find-wallet/personas/nfts/")
    await expect(findWalletPage.personaCheckbox("NFTs")).toBeChecked()
    const count = await findWalletPage.getResultsCount()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThan(await findWalletPage.getTotalCount())
    // The seed stays implicit: the landing URL is left exactly as shared.
    await expect(page).toHaveURL(/\/personas\/nfts\/$/)

    // Leaving the persona is recorded as a present-but-empty param, so a
    // reload does not silently re-apply it.
    await findWalletPage.togglePersona("NFTs")
    await expect(findWalletPage.personaCheckbox("NFTs")).not.toBeChecked()
    await expect(page).toHaveURL(/\/personas\/nfts\/\?advanced=$/)
    await page.reload({ waitUntil: "domcontentloaded" })
    await expect(findWalletPage.personaCheckbox("NFTs")).not.toBeChecked()
  })

  test("device filter narrows the results and lands in the URL", async ({
    page,
  }) => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleDeviceFilter("Hardware")
    await findWalletPage.waitForResultsChange(initialCount)
    expect(await findWalletPage.getResultsCount()).toBeLessThan(initialCount)
    await expect(page).toHaveURL(/\?devices=hardware$/)
  })

  test("filter deep-link applies on load", async ({ page }) => {
    await page.goto("/wallets/find-wallet/?devices=hardware")
    await expect(async () => {
      expect(await findWalletPage.getResultsCount()).toBeLessThan(
        await findWalletPage.getTotalCount()
      )
    }).toPass()
    await expect(page).toHaveURL(/\?devices=hardware$/)
  })

  // Inbound campaign tags have to outlive a toggle: matomo.js is deferred and
  // reads the URL well after the first checkbox lands.
  test("keeps inbound campaign params through a filter toggle", async ({
    page,
  }) => {
    await page.goto(
      "/wallets/find-wallet/?utm_source=newsletter&utm_campaign=wallets&gclid=abc123"
    )
    const total = await findWalletPage.getTotalCount()

    await findWalletPage.togglePersona("NFTs")
    await findWalletPage.waitForResultsChange(total)
    await expect(page).toHaveURL(/\/find-wallet\/\?/)

    const afterPersona = new URL(page.url()).searchParams
    expect(afterPersona.get("utm_source")).toBe("newsletter")
    expect(afterPersona.get("utm_campaign")).toBe("wallets")
    expect(afterPersona.get("gclid")).toBe("abc123")

    const personaCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleDeviceFilter("Hardware")
    await findWalletPage.waitForResultsChange(personaCount)

    const afterFilter = new URL(page.url()).searchParams
    expect(afterFilter.get("utm_source")).toBe("newsletter")
    expect(afterFilter.get("gclid")).toBe("abc123")
    expect(afterFilter.get("devices")).toBe("hardware")
  })

  test("advanced filter narrows the results", async () => {
    const initialCount = await findWalletPage.getResultsCount()
    await findWalletPage.toggleAdvancedFilter("Multisig")
    await findWalletPage.waitForResultsChange(initialCount)
    expect(await findWalletPage.getResultsCount()).toBeLessThan(initialCount)
  })

  // Client-side modal: the URL never changes, the card link stays crawlable.
  test("wallet card opens a detail modal and closes", async ({ page }) => {
    await findWalletPage.openWalletDetail("metamask")
    await expect(findWalletPage.detailDialog).toBeVisible()
    await expect(findWalletPage.detailDialog).toContainText("MetaMask")
    await expect(page).toHaveURL(/\/find-wallet\/$/)

    await findWalletPage.closeDialog()
    await expect(findWalletPage.detailDialog).toBeHidden()
    await expect(page).toHaveURL(/\/find-wallet\/$/)
  })

  test("wallet detail deep-link renders the standalone page", async ({
    page,
  }) => {
    await page.goto("/wallets/find-wallet/metamask/")
    await expect(
      page.getByRole("heading", { level: 1, name: "MetaMask" })
    ).toBeVisible()
    await expect(page.getByRole("dialog")).toBeHidden()
  })

  test("modal 'Full details' leads to the standalone page", async ({
    page,
  }) => {
    await findWalletPage.openWalletDetail("metamask")
    await expect(findWalletPage.detailDialog).toBeVisible()

    await findWalletPage.detailDialog
      .getByRole("link", { name: "Full details" })
      .click()

    await expect(
      page.getByRole("heading", { level: 1, name: "MetaMask" })
    ).toBeVisible()
    await expect(page.getByRole("dialog")).toBeHidden()
  })

  test("standalone page lists related wallets", async ({ page }) => {
    await page.goto("/wallets/find-wallet/metamask/")
    const related = page.locator("section").filter({
      has: page.getByRole("heading", {
        name: testData.content.headings.findWalletRelated,
      }),
    })
    await expect(related).toBeVisible()
    await expect(
      related.locator('a[href*="/find-wallet/"]').first()
    ).toBeVisible()
  })
})
