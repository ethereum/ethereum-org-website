import { expect, test } from "@playwright/test"

import type { FileContributor } from "@/lib/types"

import { getAppPageLastCommitDate } from "@/lib/utils/gh"

test("getAppPageLastCommitDate returns the latest date in ISO 8601", () => {
  const contributors = [
    {
      login: "earlier",
      avatar_url: "https://example.com/earlier.png",
      html_url: "https://example.com/earlier",
      date: "2025-01-02T03:04:05Z",
    },
    {
      login: "later",
      avatar_url: "https://example.com/later.png",
      html_url: "https://example.com/later",
      date: "2026-07-08T09:10:11Z",
    },
  ] satisfies FileContributor[]

  expect(getAppPageLastCommitDate(contributors)).toBe(
    "2026-07-08T09:10:11.000Z"
  )
})

test("getAppPageLastCommitDate keeps the empty sentinel", () => {
  expect(getAppPageLastCommitDate([])).toBe("")
})
