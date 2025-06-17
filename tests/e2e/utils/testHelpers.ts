import { expect, Page } from "@playwright/test"

import { breakpointAsNumber } from "@/lib/utils/screen"

/**
 * Test utility functions for common operations
 */

/**
 * Check if the current viewport is mobile
 */
export const isMobileViewport = (page: Page): boolean => {
  const viewport = page.viewportSize()
  return viewport ? viewport.width <= breakpointAsNumber.md : false
}

/**
 * Wait for page to be fully loaded with all network requests completed
 */
export const waitForPageReady = async (
  page: Page,
  timeout = 30000
): Promise<void> => {
  await page.waitForLoadState("networkidle", { timeout })
}

/**
 * Wait for an element to be visible with better error messaging
 */
export const waitForElementVisible = async (
  page: Page,
  selector: string,
  timeout = 10000
): Promise<void> => {
  try {
    await page.waitForSelector(selector, { state: "visible", timeout })
  } catch (error) {
    throw new Error(
      `Element "${selector}" was not visible within ${timeout}ms. ${error}`
    )
  }
}

/**
 * Scroll element into view and wait for it to be stable
 */
export const scrollToElement = async (
  page: Page,
  selector: string
): Promise<void> => {
  const element = page.locator(selector)
  await element.scrollIntoViewIfNeeded()
  await element.waitFor({ state: "visible" })
}

/**
 * Take a screenshot with timestamp for debugging
 */
export const takeDebugScreenshot = async (
  page: Page,
  name: string
): Promise<void> => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
  const filename = `debug-${name}-${timestamp}.png`
  await page.screenshot({
    path: `tests/e2e/__results__/screenshots/${filename}`,
  })
}

/**
 * Get text content with fallback for null values
 */
export const getTextContent = async (
  page: Page,
  selector: string
): Promise<string> => {
  const element = await page.locator(selector)
  const text = await element.textContent()
  return text || ""
}

/**
 * Click element with retry logic for flaky elements
 */
export const clickWithRetry = async (
  page: Page,
  selector: string,
  maxRetries = 3
): Promise<void> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.locator(selector).click({ timeout: 5000 })
      return
    } catch (error) {
      if (i === maxRetries - 1) {
        throw new Error(
          `Failed to click "${selector}" after ${maxRetries} attempts. ${error}`
        )
      }
      await page.waitForTimeout(1000) // Wait before retry
    }
  }
}

/**
 * Fill input with clear and validation
 */
export const fillInput = async (
  page: Page,
  selector: string,
  value: string
): Promise<void> => {
  const input = page.locator(selector)
  await input.clear()
  await input.fill(value)

  // Verify the value was filled correctly
  const actualValue = await input.inputValue()
  if (actualValue !== value) {
    throw new Error(
      `Failed to fill input "${selector}". Expected: "${value}", Got: "${actualValue}"`
    )
  }
}

/**
 * Wait for URL to match pattern with better error messaging
 */
export const waitForUrlMatch = async (
  page: Page,
  pattern: string | RegExp,
  timeout = 10000
): Promise<void> => {
  try {
    await expect(page).toHaveURL(pattern, { timeout })
  } catch (error) {
    const currentUrl = page.url()
    throw new Error(
      `URL did not match pattern within ${timeout}ms. Current URL: ${currentUrl}. Expected pattern: ${pattern}`
    )
  }
}

/**
 * Check if element exists without throwing error
 */
export const elementExists = async (
  page: Page,
  selector: string,
  timeout = 5000
): Promise<boolean> => {
  try {
    await page.waitForSelector(selector, { timeout })
    return true
  } catch {
    return false
  }
}

/**
 * Get element count with error handling
 */
export const getElementCount = async (
  page: Page,
  selector: string
): Promise<number> => {
  try {
    return await page.locator(selector).count()
  } catch (error) {
    throw new Error(
      `Failed to count elements for selector "${selector}". ${error}`
    )
  }
}

/**
 * Wait for element count to change
 */
export const waitForElementCountChange = async (
  page: Page,
  selector: string,
  initialCount: number,
  timeout = 10000
): Promise<number> => {
  let newCount = initialCount

  await expect(async () => {
    newCount = await getElementCount(page, selector)
    expect(newCount).not.toBe(initialCount)
  }).toPass({ timeout })

  return newCount
}

/**
 * Assert element is visible with better error message
 */
export const assertElementVisible = async (
  page: Page,
  selector: string,
  description?: string
): Promise<void> => {
  const element = page.locator(selector)
  try {
    await expect(element).toBeVisible()
  } catch (error) {
    const errorMsg = description
      ? `Expected "${description}" (${selector}) to be visible`
      : `Expected element "${selector}" to be visible`
    throw new Error(`${errorMsg}. ${error}`)
  }
}

/**
 * Assert text content matches expected value
 */
export const assertTextContent = async (
  page: Page,
  selector: string,
  expectedText: string | RegExp
): Promise<void> => {
  const element = page.locator(selector)
  await expect(element).toHaveText(expectedText)
}

/**
 * Wait for and assert page title
 */
export const assertPageTitle = async (
  page: Page,
  expectedTitle: string | RegExp
): Promise<void> => {
  await expect(page).toHaveTitle(expectedTitle)
}

/**
 * Accessibility helper: check for aria-labels
 */
export const checkAriaLabels = async (
  page: Page,
  selector: string
): Promise<void> => {
  const elements = await page.locator(selector).all()

  for (const element of elements) {
    const ariaLabel = await element.getAttribute("aria-label")
    const ariaLabelledBy = await element.getAttribute("aria-labelledby")

    if (!ariaLabel && !ariaLabelledBy) {
      const outerHTML = await element.evaluate((el) => el.outerHTML)
      throw new Error(
        `Element missing aria-label or aria-labelledby: ${outerHTML}`
      )
    }
  }
}
