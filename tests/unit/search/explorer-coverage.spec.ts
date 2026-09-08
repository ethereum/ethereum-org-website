import { existsSync } from "fs"

import { expect, test } from "@playwright/test"

import explorers from "@/data/explorers"

import { STARKNET_EXPLORER, ZIRCUIT_EXPLORER } from "@/lib/constants"

import { readFeaturedNetworks } from "../../../src/scripts/typesense/featured-networks"

/**
 * `/layer-2/networks` and the explorer results must offer the same networks. They used to
 * be two hand-maintained lists, so editing one silently left the other behind.
 */
const HANDLED_ELSEWHERE: Record<string, string> = {
  // Not EVM: its addresses are the same shape as an Ethereum hash, and Blockscout has no
  // instance, so it gets its own section via STARKNET_EXPLORER.
  Starknet: STARKNET_EXPLORER.brand,
  // Runs neither Blockscout nor an Etherscan-family explorer and is absent from
  // Blockscout's registry, so it gets its own section via ZIRCUIT_EXPLORER.
  "Zircuit Mainnet": ZIRCUIT_EXPLORER.brand,
}

test.describe("explorer coverage", () => {
  const featured = readFeaturedNetworks()

  test("reads the networks the L2 page renders", () => {
    // Guards the parser itself: networks.ts is read as text, so a shape change there
    // would otherwise quietly yield nothing and pass every other assertion.
    expect(featured.length).toBeGreaterThanOrEqual(10)
    expect(featured.map((n) => n.chainName)).toContain("Ethereum Mainnet")
    expect(featured.every((n) => n.name && n.icon)).toBe(true)
  })

  test("offers an explorer for every featured network", () => {
    const covered = new Set<string>(Object.values(explorers).map((e) => e.name))
    for (const { name, chainName } of featured) {
      if (chainName in HANDLED_ELSEWHERE) continue
      expect(
        covered.has(name),
        `${chainName} is on /layer-2/networks but has no block explorer in search. ` +
          `Re-run \`tsx src/scripts/update-explorers.ts\`, or document it in HANDLED_ELSEWHERE.`
      ).toBe(true)
    }
  })

  test("offers no explorer for a network the page dropped", () => {
    const featuredNames = new Set(featured.map((n) => n.name))
    for (const { name } of Object.values(explorers)) {
      expect(
        featuredNames.has(name),
        `${name} has a block explorer in search but is no longer on /layer-2/networks.`
      ).toBe(true)
    }
  })

  test("every explorer icon is an asset we ship", () => {
    for (const { name, icon } of Object.values(explorers)) {
      expect(
        existsSync(`public/images/layer-2/${icon}`),
        `${name}: ${icon}`
      ).toBe(true)
    }
  })
})
