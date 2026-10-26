import { readFileSync } from "node:fs"
import path from "node:path"
import { expect, test } from "@playwright/test"

import type { FileContributor } from "@/lib/types"

import { getAppPageDateInfo } from "@/lib/utils/contributors"
import { getAppPageLastCommitDate } from "@/lib/utils/gh"

const contributor = (login: string, date: string): FileContributor => ({
  login,
  date,
  avatar_url: "",
  html_url: "",
})

test("latest app-page commit date is an ISO timestamp with timezone", () => {
  expect(
    getAppPageLastCommitDate([
      contributor("earlier", "2026-02-24T12:00:00Z"),
      contributor("later", "2026-02-24T23:30:00-05:00"),
    ])
  ).toBe("2026-02-25T04:30:00.000Z")
})

test("missing or invalid commit dates do not become the Unix epoch", () => {
  expect(getAppPageLastCommitDate([])).toBe("")
  expect(getAppPageLastCommitDate([contributor("invalid", "not-a-date")])).toBe(
    ""
  )
})

test("app page keeps the visible date separate from its ISO timestamp", () => {
  expect(getAppPageDateInfo("en", "2026-02-24T15:45:00.000Z")).toEqual({
    lastEditLocaleTimestamp: "February 24, 2026",
    lastEditIsoTimestamp: "2026-02-24T15:45:00.000Z",
  })
})

test("app page omits both dates when contributor data is absent", () => {
  expect(getAppPageDateInfo("en", "")).toEqual({
    lastEditLocaleTimestamp: "",
    lastEditIsoTimestamp: "",
  })
})

const articlePages = [
  "ethereum-history-founder-and-ownership",
  "ethereum-vs-bitcoin",
  "gas",
  "get-eth",
  "layer-2/learn",
  "open-access",
  "open-source",
  "privacy/ethereum",
  "privacy/online",
  "privacy",
  "run-a-node",
  "staking",
  "wallets",
  "what-is-ether",
  "what-is-ethereum",
  "what-is-the-ethereum-network",
] as const

for (const page of articlePages) {
  test(`${page} uses the ISO date only in Article JSON-LD`, () => {
    const pageDir = path.join(process.cwd(), "app", "[locale]", page)
    const pageSource = readFileSync(path.join(pageDir, "page.tsx"), "utf8")
    const jsonLdSource = readFileSync(
      path.join(pageDir, "page-jsonld.tsx"),
      "utf8"
    )

    expect(pageSource).toContain("lastEditIsoTimestamp={lastEditIsoTimestamp}")
    expect(jsonLdSource).toContain(
      "dateModified: lastEditIsoTimestamp || undefined"
    )
    expect(jsonLdSource).not.toContain("dateModified: lastEditLocaleTimestamp")
  })
}
