import { expect, test } from "@playwright/test"

import { classifyAutomation } from "../../../src/lib/utils/matomo"

const CHROME_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"

test.describe("classifyAutomation", () => {
  test("flags navigator.webdriver regardless of user agent", () => {
    expect(classifyAutomation({ webdriver: true, userAgent: CHROME_UA })).toBe(
      "webdriver"
    )
    expect(classifyAutomation({ webdriver: true, userAgent: "" })).toBe(
      "webdriver"
    )
  })

  test("flags headless user agents", () => {
    expect(
      classifyAutomation({
        webdriver: false,
        userAgent: CHROME_UA.replace("Chrome/", "HeadlessChrome/"),
      })
    ).toBe("headless-ua")
    expect(
      classifyAutomation({ webdriver: false, userAgent: "headless" })
    ).toBe("headless-ua")
  })

  test("webdriver takes precedence over the user-agent signal", () => {
    expect(
      classifyAutomation({ webdriver: true, userAgent: "HeadlessChrome/144" })
    ).toBe("webdriver")
  })

  test("leaves ordinary browsers alone", () => {
    const humanUserAgents = [
      CHROME_UA,
      "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
      // versionless Safari: the census flags this cohort by resolution, which
      // this classifier deliberately does not look at
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Safari/605.1.15",
      "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/150.0.0.0 Mobile Safari/537.36",
    ]

    for (const userAgent of humanUserAgents) {
      expect(classifyAutomation({ webdriver: false, userAgent })).toBe("human")
    }
  })
})
