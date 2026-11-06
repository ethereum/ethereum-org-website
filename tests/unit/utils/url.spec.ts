import { expect, test } from "@playwright/test"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

const cases: Array<
  [locale: string | undefined, path: string, expected: string]
> = [
  ["en", "/", "https://ethereum.org/"],
  ["es", "/", "https://ethereum.org/es/"],
  ["en", "/latest", "https://ethereum.org/latest/"],
  ["en", "/latest/", "https://ethereum.org/latest/"],
  [
    "es",
    "/developers/tutorials/foo",
    "https://ethereum.org/es/developers/tutorials/foo/",
  ],
  ["en", "/assets/#brand", "https://ethereum.org/assets/#brand"],
  ["en", "/assets#brand", "https://ethereum.org/assets/#brand"],
  ["en", "/reports/report.pdf", "https://ethereum.org/reports/report.pdf"],
  [
    undefined,
    "/images/wallets/wallet-hero.png",
    "https://ethereum.org/images/wallets/wallet-hero.png",
  ],
  [undefined, "/wallets", "https://ethereum.org/wallets/"],
]

for (const [locale, path, expected] of cases) {
  test(`normalizeUrlForJsonLd(${locale}, ${path})`, () => {
    expect(normalizeUrlForJsonLd(locale, path)).toBe(expected)
  })
}
