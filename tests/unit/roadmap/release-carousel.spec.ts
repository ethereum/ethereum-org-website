/**
 * The `/roadmap` release carousel renders no dates or statuses of its own: each
 * entry in `releases.tsx` carries only prose, an image and an `upgradeSlug`,
 * and every fact is looked up in the Forkcast-backed store.
 *
 * That makes a typo in a slug silent. `upgrades["glamsterdm"]` is `undefined`,
 * the component falls back to rendering no facts, and the panel looks like an
 * upgrade nobody has scheduled yet rather than a bug. Same for a stage with no
 * label: the carousel always shows a tag, so a missing key would print a raw
 * `page-roadmap-...` string over the timeline.
 *
 * `releases.tsx` is read as text rather than imported because it imports PNGs,
 * which only resolve through the bundler. The slug list and its order are all
 * these assertions need, and the same approach is used for the upgrade pages in
 * `eip-tags.spec.ts`.
 */

import fs from "fs"
import path from "path"

import { expect, test } from "@playwright/test"

import { upgrades } from "../../../src/data/upgrades"
import {
  getUpgradeStage,
  UPGRADE_STAGE_LABEL_KEYS,
  UPGRADE_STAGE_TONES,
} from "../../../src/lib/utils/upgrades"

const read = (file: string) =>
  fs.readFileSync(path.join(process.cwd(), file), "utf-8")

const releasesSource = read("src/data/roadmap/releases.tsx")

const messages = JSON.parse(read("src/intl/en/page-roadmap.json")) as Record<
  string,
  string
>

/** Store slugs in the order the carousel lays them out. */
const slugs = [
  ...releasesSource.matchAll(/^\s+upgradeSlug: "([^"]+)",$/gm),
].map(([, slug]) => slug)

test.describe("release carousel data", () => {
  test("the slug list parses", () => {
    // Guards against a formatting change making every check below vacuous.
    expect(slugs.length).toBeGreaterThan(0)
  })

  test("every release resolves to an upgrade in the store", () => {
    expect(slugs.filter((slug) => !upgrades[slug])).toEqual([])
  })

  test("no upgrade is shown twice", () => {
    expect(slugs).toEqual([...new Set(slugs)])
  })

  test("shipped releases come before unshipped ones", () => {
    // `startIndex` and the timeline's shipped/upcoming gradient both count
    // shipped entries rather than locating them, so an out-of-order entry would
    // land the carousel on the wrong slide and fade the wrong connector.
    const shipped = slugs
      .filter((slug) => upgrades[slug])
      .map((slug) => getUpgradeStage(upgrades[slug]) === "live")
    expect(shipped).toEqual([...shipped].sort((a, b) => Number(b) - Number(a)))
  })

  test("no hand-maintained dates are left in the release data", () => {
    // The whole point of the store is that these cannot drift. A reintroduced
    // `displayDate` would render nowhere and quietly become a second, wrong
    // source of truth.
    for (const field of [
      "releaseDate",
      "plannedReleaseYear",
      "displayDate",
      "forkcast_href",
    ]) {
      expect(releasesSource, field).not.toContain(`${field}:`)
    }
  })
})

test.describe("upgrade stage labels", () => {
  test("every stage in the store has a label and a tone", () => {
    for (const upgrade of Object.values(upgrades)) {
      const stage = getUpgradeStage(upgrade)
      expect(
        UPGRADE_STAGE_LABEL_KEYS[stage],
        `${upgrade.slug} is at stage "${stage}"`
      ).toBeTruthy()
      expect(
        UPGRADE_STAGE_TONES[stage],
        `${upgrade.slug} is at stage "${stage}"`
      ).toBeTruthy()
    }
  })

  test("every stage label key exists in English", () => {
    const missing = Object.values(UPGRADE_STAGE_LABEL_KEYS).filter(
      (key) => !(key in messages)
    )
    expect(missing).toEqual([])
  })

  test("the EIP-count keys exist in English", () => {
    for (const key of [
      "page-roadmap-upgrade-eips-scheduled",
      "page-roadmap-upgrade-eips-included",
    ]) {
      expect(messages, key).toHaveProperty(key)
    }
  })
})
