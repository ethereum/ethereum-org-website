import { expect, test } from "@playwright/test"

import { getCanonicalRedirectPath } from "@/lib/utils/canonicalPath"

const options = {
  deprecatedLocales: new Set(["nl", "pt"]),
  locales: ["en", "de", "es"],
  defaultLocale: "en",
  legacySources: ["/eth", "/eth/supply", "/pdfs/:path*", "/latest/feed.xml"],
}

const cases: Array<[path: string, expected: string | null]> = [
  // Already canonical
  ["/", null],
  ["/nft/", null],
  ["/de/nft/", null],
  // Trailing slash
  ["/developers/docs/bridges", "/developers/docs/bridges/"],
  ["/de/nft", "/de/nft/"],
  ["/latest/feed", "/latest/feed/"],
  // Case and slash together: one hop
  ["/Developers/Docs/Bridges", "/developers/docs/bridges/"],
  // Default locale prefix stripped in the same hop
  ["/en", "/"],
  ["/en/", "/"],
  ["/en/nft", "/nft/"],
  ["/EN/NFT", "/nft/"],
  // Deprecated locales go straight to the English page
  ["/nl", "/"],
  ["/nl/foo", "/foo/"],
  ["/pt/developers/", "/developers/"],
  // Legacy redirect sources are left for Next's redirect (one hop)
  ["/eth", null],
  ["/eth/supply", null],
  ["/de/eth", null],
  ["/en/eth", null],
  ["/pdfs/old/file", null],
  ["/ETH", "/eth"],
  ["/nl/eth", "/eth"],
  // Not a legacy source just because it shares a prefix
  ["/ethereum", "/ethereum/"],
  ["/eth/other", "/eth/other/"],
]

test.describe("getCanonicalRedirectPath", () => {
  for (const [path, expected] of cases) {
    test(`${path} -> ${expected}`, () => {
      expect(getCanonicalRedirectPath(path, options)).toBe(expected)
    })
  }
})
