import { expect, request, test } from "@playwright/test"

import internalTutorialSlugs from "@/data/internalTutorials.json"

// Regression coverage for #18977: the tutorials list and the homepage savings
// carousel were loaded with `dynamic(..., { ssr: false })`, so server HTML
// carried only loading skeletons. Crawlers that don't execute JavaScript --
// Googlebot's first pass, and GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot
// at all -- therefore saw zero tutorial links and no carousel copy.
//
// Scripts are stripped before asserting because the RSC flight payload embeds
// the same hrefs and copy inside <script>self.__next_f.push(...)</script>. A
// naive search finds them there and passes even when the bug is present.

const stripScripts = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, "")

const fetchServerHtml = async (baseURL: string, path: string) => {
  const apiRequest = await request.newContext()
  try {
    const response = await apiRequest.get(baseURL + path)
    expect(response.status()).toBe(200)
    return stripScripts(await response.text())
  } finally {
    await apiRequest.dispose()
  }
}

const countMatches = (html: string, pattern: RegExp) =>
  (html.match(pattern) ?? []).length

test.describe("Lazy sections in server HTML", () => {
  test("/developers/tutorials/ ships tutorial links, not skeletons", async ({
    baseURL,
  }) => {
    const html = await fetchServerHtml(baseURL!, "/developers/tutorials/")

    // Links to individual tutorials. The hub's own self-link (nav + breadcrumb)
    // is excluded by requiring at least one path character after the slash.
    const links = new Set(
      html.match(/href="\/developers\/tutorials\/[^"/][^"]*"/g) ?? []
    )
    expect(
      links.size,
      "no individual tutorial links reached the server HTML"
    ).toBeGreaterThan(0)

    // The list renders internal + external tutorials, so assert against the
    // internal set we can enumerate at build time rather than a magic number.
    expect(links.size).toBeGreaterThanOrEqual(internalTutorialSlugs.length)

    // A specific known tutorial, to catch a page that renders links to
    // something else entirely.
    expect(html).toContain(
      `href="/developers/tutorials/${internalTutorialSlugs[0]}`
    )

    // The skeleton must not be what a crawler receives. Matched on the tag-pill
    // class the list's loading fallback used, not on `animate-pulse` -- the
    // navbar renders its own unrelated `animate-pulse-light` placeholders.
    //
    // This also catches the half-fix: dropping `ssr: false` but keeping
    // dynamic() leaves the Suspense fallback inline and streams the real list
    // into a <div hidden>, so the skeleton survives here.
    expect(
      countMatches(html, /h-8 w-24 rounded-full/g),
      "the tutorials loading skeleton is still in server HTML"
    ).toBe(0)
  })

  test("/ ships the savings carousel slides", async ({ baseURL }) => {
    const html = await fetchServerHtml(baseURL!, "/")

    const carouselStart = html.indexOf('aria-roledescription="carousel"')
    expect(carouselStart, "carousel section missing from server HTML").not.toBe(
      -1
    )

    expect(
      countMatches(html, /swiper-slide/g),
      "carousel slides missing from server HTML"
    ).toBeGreaterThanOrEqual(3)

    // Carousel CTAs are internal links; they drive crawl discovery.
    for (const href of ["/apps/categories/privacy/", "/payments/", "/defi/"]) {
      expect(html, `carousel CTA ${href} missing`).toContain(`href="${href}"`)
    }

    // The carousel's own loading fallback, identified by the height it
    // reserved. SimulatorSection keeps ssr:false, so its skeleton is expected
    // to remain -- assert on the carousel's height class specifically.
    expect(
      countMatches(html, /h-\[1000px\] md:h-\[700px\]/g),
      "the carousel loading skeleton is still in server HTML"
    ).toBe(0)
  })

  test("/apps/ carousel still server-renders (control)", async ({
    baseURL,
  }) => {
    const html = await fetchServerHtml(baseURL!, "/apps/")

    // /apps/ never had ssr:false and proves Swiper itself server-renders.
    // Guards against a regression that disables SSR library-wide.
    expect(countMatches(html, /swiper-slide/g)).toBeGreaterThan(0)
  })
})

// Publish dates are date-only strings and so parse as UTC midnight. The server
// runs in UTC; a browser behind UTC formats the same instant as the previous
// day. Before #18977 the list was client-only so only the browser's answer was
// ever shown; server-rendering it turns that divergence into a hydration
// mismatch. `timeZone: "UTC"` in tutorials.tsx pins both sides -- this asserts
// it stays pinned.
test.describe("Tutorial publish dates are timezone-stable", () => {
  const MONTH =
    "(?:January|February|March|April|May|June|July|August|September|October|November|December)"
  const DATE_RE = new RegExp(`${MONTH} \\d{1,2}, \\d{4}`, "g")

  test.use({ timezoneId: "America/Los_Angeles", locale: "en-US" })

  test("server and client agree in a timezone behind UTC", async ({
    page,
    baseURL,
  }) => {
    const serverHtml = await fetchServerHtml(baseURL!, "/developers/tutorials/")

    // Both sides key off the same thing -- the internal-tutorial card -- and
    // take that card's own first date. Scoping matters: the hero and feedback
    // sections render unrelated dates, and external-tutorial cards carry dates
    // too but link off-site, so a whole-page scan compares two different sets.
    const CARD_RE = /href="\/developers\/tutorials\/([^"/][^"]*)"/g
    const serverDates = new Map<string, string>()
    for (const match of serverHtml.matchAll(CARD_RE)) {
      const slug = match[1]
      if (serverDates.has(slug)) continue
      // A rendered card is ~2.6KB; the date sits just after the title.
      const date = serverHtml
        .slice(match.index, match.index + 3000)
        .match(DATE_RE)?.[0]
      if (date) serverDates.set(slug, date)
    }

    // Guard against passing on a page that renders no dates at all.
    expect(
      serverDates.size,
      "no publish dates on tutorial cards in server HTML"
    ).toBeGreaterThan(0)

    await page.goto("/developers/tutorials/")
    const cards = page.locator('a[href^="/developers/tutorials/"]')
    await expect(cards.first()).toBeVisible()

    const clientDates = new Map<string, string>()
    for (const card of await cards.all()) {
      const href = await card.getAttribute("href")
      const slug = href?.replace("/developers/tutorials/", "")
      if (!slug || clientDates.has(slug)) continue
      const date = (await card.textContent())?.match(DATE_RE)?.[0]
      if (date) clientDates.set(slug, date)
    }

    // Compare only the slugs both sides produced a date for.
    const shifted = [...clientDates]
      .filter(([slug]) => serverDates.has(slug))
      .filter(([slug, date]) => serverDates.get(slug) !== date)
      .map(
        ([slug, date]) =>
          `${slug}: server=${serverDates.get(slug)} browser=${date}`
      )

    expect(
      clientDates.size,
      "no dated tutorial cards found in the browser"
    ).toBeGreaterThan(0)
    expect(shifted, "publish dates shifted between server and browser").toEqual(
      []
    )
  })
})
