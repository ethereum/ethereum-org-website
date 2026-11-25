import { expect, test } from "@playwright/test"

import { normalizeUrlForJsonLd, slugify } from "@/lib/utils/url"

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

// Default output feeds /apps/<slug> routes, so it must not drift.
const slugCases: Array<[text: string, expected: string]> = [
  ["Governance/DAO", "governancedao"],
  ["Bridge Aave 1", "bridge-aave-1"],
  ["  Hello -- world  ", "hello-world"],
  ["我如何赚取奖励？", ""],
]

for (const [text, expected] of slugCases) {
  test(`slugify(${JSON.stringify(text)})`, () => {
    expect(slugify(text)).toBe(expected)
  })
}

const unicodeCases: Array<[text: string, expected: string]> = [
  ["Why stake?", "why-stake"],
  ["我如何赚取奖励？", "我如何赚取奖励"],
  ["Что такое ETH?", "что-такое-eth"],
  ["सत्यापनकर्ता क्या है?", "सत्यापनकर्ता-क्या-है"],
  ["?!", ""],
]

for (const [text, expected] of unicodeCases) {
  test(`slugify(${JSON.stringify(text)}, { unicode: true })`, () => {
    expect(slugify(text, { unicode: true })).toBe(expected)
  })
}
