import path from "path"
import { pathToFileURL } from "url"

import { expect, test } from "@playwright/test"

type Mod = typeof import("../../.github/scripts/listing-research.mjs")
let check: Mod["check"],
  esc: Mod["esc"],
  LISTING: Mod["LISTING"],
  publicUrl: Mod["publicUrl"],
  quoteFound: Mod["quoteFound"],
  registrableDomain: Mod["registrableDomain"],
  toText: Mod["toText"]

test.beforeAll(async () => {
  ;({ check, esc, LISTING, publicUrl, quoteFound, registrableDomain, toText } =
    await import(
      pathToFileURL(
        path.resolve(__dirname, "../../.github/scripts/listing-research.mjs")
      ).href
    ))
})

test("publicUrl rejects private, credentialed and literal-IPv6 hosts", () => {
  expect(publicUrl("tatum.io/pricing")).toBe("https://tatum.io/pricing")
  for (const u of [
    "http://127.0.0.1/",
    "http://10.1.2.3/",
    "http://172.20.0.1/",
    "http://192.168.1.1/",
    "http://169.254.169.254/latest",
    "http://100.64.0.1/",
    "http://100.127.255.255/",
    "http://0x7f000001/",
    "http://[::1]/",
    "https://user:pass@example.com/",
    "http://localhost:3000/",
    "http://metadata.google.internal/",
    "http://localhost./",
    "http://metadata.google.internal./",
    "file:///etc/passwd",
  ])
    expect(publicUrl(u), u).toBeNull()
  expect(publicUrl("http://100.128.0.1/")).not.toBeNull()
})

test("toText decodes numeric and named entities", () => {
  expect(
    toText(
      "<p>We&#8217;re &ldquo;audited&rdquo;&nbsp;&mdash; &#x27;ok&#x27; &lt;3 &amp; more&hellip;</p>"
    )
  ).toBe(`We're "audited" — 'ok' <3 & more…`)
})

test("quoteFound needs long pieces in page order", () => {
  const page = toText(
    "Our smart contracts are not yet audited. We plan an audit by Trail of Bits in 2027."
  )
  expect(quoteFound("Our smart contracts are not yet audited", page)).toBe(true)
  expect(
    quoteFound("Our smart contracts … an audit by Trail of Bits", page)
  ).toBe(true)
  expect(quoteFound("contracts are … audited", page)).toBe(false)
  expect(quoteFound("audited by Trail", page)).toBe(false)
  expect(
    quoteFound("an audit by Trail of Bits … Our smart contracts", page)
  ).toBe(false)
})

test("esc renders untrusted text inert", () => {
  const out = esc(
    "[click](https://evil.example) <img src=x onerror=alert(1)> #123 owner/repo#4 @everyone `x` www.evil.com"
  )
  expect(out).not.toMatch(/\]\(|<img|https:\/\/|www\.|`x`|@everyone|#123|#4/)
  expect(out).toContain("&lt;img")
})

test("LISTING matches listing pages and data files only", () => {
  for (const f of [
    "public/content/developers/docs/nodes-and-clients/nodes-as-a-service/index.md",
    "public/content/developers/docs/smart-contracts/security/index.md",
    "public/content/developers/docs/data-and-analytics/block-explorers/index.md",
    "public/content/staking/saas/index.md",
    "public/content/community/get-involved/index.md",
    "public/content/security/index.md",
    "src/data/wallets/wallet-data.ts",
    "src/data/networks/networks.ts",
    "src/data/staking-products.json",
  ])
    expect(LISTING.test(f), f).toBe(true)
  for (const f of [
    "public/content/roadmap/security/index.md",
    "public/content/translations/es/developers/docs/frameworks/index.md",
    "src/data/developer-docs-links.yaml",
    "src/intl/en/page-bug-bounty.json",
    "public/content/developers/docs/frameworks/index.md.bak",
  ])
    expect(LISTING.test(f), f).toBe(false)
})

test("registrableDomain keeps the site, not the subdomain", () => {
  expect(registrableDomain("docs.tatum.io")).toBe("tatum.io")
  expect(registrableDomain("www.example.co.uk")).toBe("example.co.uk")
  expect(registrableDomain("tatum.io")).toBe("tatum.io")
})

test("check re-verifies pass and fail quotes alike", async () => {
  const quote = (criterion: string, status: string, q: string) => ({
    criterion,
    status,
    quote: q,
    url: "example.com",
    source: "author",
  })
  const r = await check(
    {
      pr: "1",
      criteria: JSON.stringify([
        quote("Audited", "fail", "Our smart contracts are not yet audited"),
        quote("Live", "fail", "Launched in March 2020 on mainnet"),
        quote("Docs", "pass", "Full documentation for every endpoint"),
      ]),
    },
    async () => ({
      text: "Our smart contracts are not yet audited by any firm.",
    })
  )
  expect(r.criteria.map((c) => c.status)).toEqual([
    "fail",
    "unknown",
    "unknown",
  ])
})
