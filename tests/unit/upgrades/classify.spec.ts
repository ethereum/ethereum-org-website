/**
 * Change classification tests.
 *
 * The gate decides whether a human is interrupted, so both directions are
 * pinned: a key with prose behind it must be flagged, and the high-frequency
 * data keys must stay silent. A false positive here trains everyone to ignore
 * the issue, which costs more than a missed flag.
 */

import { expect, test } from "@playwright/test"

import type {
  UpgradeData,
  UpgradeStore,
} from "../../../src/data/upgrades/types"
import { classify } from "../../../src/scripts/sync-upgrades/classify"

const upgrade = (over: Partial<UpgradeData> = {}): UpgradeData => ({
  slug: "glamsterdam",
  name: "Glamsterdam",
  status: "upcoming",
  mainnetTarget: { when: { year: 2026, quarter: 4 }, confirmed: false },
  milestones: [
    {
      kind: "devnet",
      version: 8,
      when: { year: 2026, month: 8, day: 13 },
      status: "live",
    },
  ],
  eips: [{ id: 8246, status: "scheduled", networking: false, decidedAt: null }],
  sourceUrl: "https://forkcast.org/upgrade/glamsterdam",
  ...over,
})

const store = (...list: UpgradeData[]): UpgradeStore =>
  Object.fromEntries(list.map((u) => [u.slug, u]))

test("an identical store is silent", () => {
  expect(classify(store(upgrade()), store(upgrade()))).toEqual([])
})

test("a devnet date moving is data, not news", () => {
  const moved = upgrade({
    milestones: [
      {
        kind: "devnet",
        version: 8,
        when: { year: 2026, month: 8, day: 14 },
        status: "live",
      },
    ],
  })
  expect(classify(store(upgrade()), store(moved))).toEqual([])
})

test("an ACD call landing against an existing status is data, not news", () => {
  const decided = upgrade({
    eips: [
      {
        id: 8246,
        status: "scheduled",
        networking: false,
        decidedAt: { call: "acde/240", date: "2026-08-20" },
      },
    ],
  })
  expect(classify(store(upgrade()), store(decided))).toEqual([])
})

test("the mainnet target moving is flagged with both values", () => {
  const slipped = upgrade({
    mainnetTarget: { when: { year: 2027, quarter: 1 }, confirmed: false },
  })
  expect(classify(store(upgrade()), store(slipped))).toEqual([
    "glamsterdam · mainnet target · 2026-Q4 → 2027-Q1",
  ])
})

test("a target hardening from projected to confirmed is flagged", () => {
  const confirmed = upgrade({
    mainnetTarget: { when: { year: 2026, quarter: 4 }, confirmed: true },
  })
  expect(classify(store(upgrade()), store(confirmed))).toEqual([
    "glamsterdam · mainnet target · 2026-Q4 → 2026-Q4 confirmed",
  ])
})

test("shipping is flagged — the page still says upcoming", () => {
  expect(
    classify(store(upgrade()), store(upgrade({ status: "live" })))
  ).toEqual(["glamsterdam · status · upcoming → live"])
})

test("an EIP arriving is flagged", () => {
  const added = upgrade({
    eips: [
      { id: 8246, status: "scheduled", networking: false, decidedAt: null },
      { id: 8189, status: "scheduled", networking: true, decidedAt: null },
    ],
  })
  expect(classify(store(upgrade()), store(added))).toEqual([
    "glamsterdam · +EIP-8189 · scheduled",
  ])
})

test("a descoped EIP is flagged — its section has to go", () => {
  const dropped = upgrade({ eips: [] })
  expect(classify(store(upgrade()), store(dropped))).toEqual([
    "glamsterdam · -EIP-8246 · no longer expected",
  ])
})

test("an EIP hardening to included is flagged", () => {
  const included = upgrade({
    eips: [
      { id: 8246, status: "included", networking: false, decidedAt: null },
    ],
  })
  expect(classify(store(upgrade()), store(included))).toEqual([
    "glamsterdam · EIP-8246 · scheduled → included",
  ])
})

test("a whole new upgrade is flagged — it needs a page", () => {
  const next = store(upgrade(), upgrade({ slug: "hegota", status: "planning" }))
  expect(classify(store(upgrade()), next)).toEqual([
    "hegota · new upgrade · planning",
  ])
})

test("several notable changes on one upgrade are reported separately", () => {
  const both = upgrade({
    status: "live",
    mainnetTarget: { when: { year: 2026, quarter: 4 }, confirmed: true },
  })
  expect(classify(store(upgrade()), store(both))).toHaveLength(2)
})
