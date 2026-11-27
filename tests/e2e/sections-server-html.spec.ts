import { expect, request, test } from "@playwright/test"

import internalTutorialSlugs from "@/data/internalTutorials.json"

// Regression coverage for #18977: content behind next/dynamic never reached
// crawlers that don't run JS. Scripts are stripped because the RSC payload
// repeats the same hrefs, and everything from the first streamed
// `<div hidden id="S:…">` on is cut because only a script reveals it.
const fetchVisibleHtml = async (baseURL: string, path: string) => {
  const api = await request.newContext()
  const response = await api.get(baseURL + path)
  expect(response.status()).toBe(200)
  const html = (await response.text()).replace(
    /<script\b[^>]*>[\s\S]*?<\/script>/gi,
    ""
  )
  await api.dispose()
  const streamed = html.indexOf('<div hidden id="S:')
  return streamed === -1 ? html : html.slice(0, streamed)
}

test.describe("Sections in server HTML", () => {
  test("/developers/tutorials/ links every internal tutorial", async ({
    baseURL,
  }) => {
    const html = await fetchVisibleHtml(baseURL!, "/developers/tutorials/")
    const missing = internalTutorialSlugs.filter(
      (slug) => !html.includes(`href="/developers/tutorials/${slug}/"`)
    )
    expect(missing).toEqual([])
  })

  test("/ ships the savings carousel", async ({ baseURL }) => {
    const html = await fetchVisibleHtml(baseURL!, "/")
    const start = html.indexOf('aria-roledescription="carousel"')
    expect(start).toBeGreaterThan(-1)
    const carousel = html.slice(start)
    expect(carousel.match(/swiper-slide/g)?.length).toBeGreaterThanOrEqual(3)
    for (const href of ["/privacy/", "/payments/", "/defi/"]) {
      expect(carousel).toContain(`href="${href}"`)
    }
  })
})
