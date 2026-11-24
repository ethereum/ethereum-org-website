import { expect, test } from "@playwright/test"

import { generated } from "../../../src/data/upgrades/generated"
import { staticUpgrades } from "../../../src/data/upgrades/static"

test.describe("static pre-Forkcast upgrades", () => {
  test("no static slug collides with a Forkcast slug", () => {
    // `upgrades` spreads generated over static, so a collision would silently
    // replace the hand-written entry once Forkcast starts tracking that fork.
    const collisions = Object.keys(staticUpgrades).filter(
      (slug) => slug in generated
    )
    expect(collisions).toEqual([])
  })

  test("static entries have no Forkcast link", () => {
    for (const upgrade of Object.values(staticUpgrades)) {
      expect(upgrade.sourceUrl, upgrade.slug).toBeNull()
    }
  })

  test("each key matches its entry's slug", () => {
    for (const [key, upgrade] of Object.entries(staticUpgrades)) {
      expect(upgrade.slug).toBe(key)
    }
  })
})
