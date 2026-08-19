/**
 * Content coverage tests.
 *
 * The cases pinned here are the ones that decide whether a maintainer gets a
 * useful list or weekly noise: which upgrades are in scope at all, and what
 * counts as a mention. Nothing here asserts against real page content — that
 * would fail every time someone writes a section.
 */

import { expect, test } from "@playwright/test"

import type {
  UpgradeData,
  UpgradeStore,
} from "../../../src/data/upgrades/types"
import {
  findGaps,
  mentionedEips,
  renderReport,
} from "../../../src/scripts/sync-upgrades/coverage"

const upgrade = (over: Partial<UpgradeData>): UpgradeData => ({
  slug: "example",
  name: "Example",
  status: "upcoming",
  mainnetTarget: { when: null, confirmed: false },
  milestones: [],
  eips: [{ id: 9001, status: "scheduled", networking: false, decidedAt: null }],
  sourceUrl: "https://forkcast.org/upgrade/example",
  ...over,
})

const store = (...list: UpgradeData[]): UpgradeStore =>
  Object.fromEntries(list.map((u) => [u.slug, u]))

test("a mention is matched however the prose punctuates it", () => {
  const found = mentionedEips(
    "eth/71 (or EIP-8159) pairs with EIP 7928 and EIP–2780."
  )
  expect([...found].sort()).toEqual([2780, 7928, 8159])
})

test("a three-digit number is not an EIP reference", () => {
  expect(mentionedEips("EIP-158 was withdrawn").size).toBe(0)
})

test("live upgrades are out of scope — their EIP set is frozen", () => {
  const gaps = findGaps(
    store(upgrade({ slug: "no-such-page-live", status: "live" }))
  )
  expect(gaps).toEqual([])
})

test("an upgrade with no English page is one gap, not one per EIP", () => {
  const [gap] = findGaps(
    store(
      upgrade({
        slug: "no-such-page",
        eips: [
          { id: 9001, status: "scheduled", networking: false, decidedAt: null },
          { id: 9002, status: "scheduled", networking: false, decidedAt: null },
        ],
      })
    )
  )
  expect(gap.pageMissing).toBe(true)
  expect(gap.path).toBe("public/content/roadmap/no-such-page/index.md")
  expect(renderReport([gap])).toContain("2 EIPs")
})

test("the report says so when there is nothing to write", () => {
  expect(renderReport([])).toContain("Every scheduled EIP")
})

test("a networking EIP carries the wire-protocol caveat", () => {
  const gap = {
    upgrade: upgrade({}),
    path: "public/content/roadmap/example/index.md",
    pageMissing: false,
    uncovered: [
      {
        id: 8070,
        status: "scheduled" as const,
        networking: true,
        decidedAt: null,
      },
      {
        id: 8246,
        status: "scheduled" as const,
        networking: false,
        decidedAt: null,
      },
    ],
  }
  const report = renderReport([gap])
  expect(report).toMatch(/EIP-8070.*networking/)
  expect(report).not.toMatch(/EIP-8246.*networking/)
  // The explanation is a single footnote, not repeated per row.
  expect(report.match(/wire name/g)).toHaveLength(1)
})

test("the wire-name footnote is omitted when no gap is a networking EIP", () => {
  const gap = {
    upgrade: upgrade({}),
    path: "public/content/roadmap/example/index.md",
    pageMissing: false,
    uncovered: [
      {
        id: 8246,
        status: "scheduled" as const,
        networking: false,
        decidedAt: null,
      },
    ],
  }
  expect(renderReport([gap])).not.toContain("wire name")
})
