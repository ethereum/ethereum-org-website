import { readFileSync } from "fs"

import { expect, test } from "@playwright/test"

import type { CatalogNetwork } from "@/lib/types"

import {
  filterNetwork,
  getNextNetwork,
  getRelatedNetworks,
  MATURITY_KEY,
  WALLET_KEY,
} from "@/lib/utils/networkData"

const network = (
  slug: string,
  networkType: "optimistic" | "zk",
  networkMaturity: CatalogNetwork["networkMaturity"],
  tvl: number
) => ({ slug, name: slug, networkType, networkMaturity, tvl }) as CatalogNetwork

// Listing order: maturity, then TVL.
const NETWORKS = [
  network("arbitrum", "optimistic", "maturing", 900),
  network("base", "optimistic", "maturing", 800),
  network("starknet", "zk", "maturing", 300),
  network("scroll", "zk", "maturing", 100),
  network("zksync-era", "zk", "developing", 200),
  network("linea", "zk", "emerging", 50),
]

const card = (maturity: string, walletSlugs: string[]) => ({
  name: "Base",
  description: "Optimistic rollup built with the OP Stack",
  maturity: maturity as CatalogNetwork["networkMaturity"],
  walletSlugs,
})

test.describe("filterNetwork", () => {
  test("no filters and no query keep everything", () => {
    expect(filterNetwork(card("maturing", []), {}, "")).toBe(true)
  })

  test("maturity levels combine with OR", () => {
    const state = { [MATURITY_KEY]: ["robust", "maturing"] }
    expect(filterNetwork(card("maturing", []), state, "")).toBe(true)
    expect(filterNetwork(card("emerging", []), state, "")).toBe(false)
  })

  test("wallet keeps only networks that wallet supports", () => {
    const state = { [WALLET_KEY]: "rabby" }
    expect(filterNetwork(card("maturing", ["rabby"]), state, "")).toBe(true)
    expect(filterNetwork(card("maturing", ["metamask"]), state, "")).toBe(false)
  })

  test("search matches name and description", () => {
    expect(filterNetwork(card("maturing", []), {}, "op stack")).toBe(true)
    expect(filterNetwork(card("maturing", []), {}, "starknet")).toBe(false)
  })
})

test("getNextNetwork wraps from the last to the first", () => {
  expect(getNextNetwork(NETWORKS[0], NETWORKS).slug).toBe("base")
  expect(getNextNetwork(NETWORKS[5], NETWORKS).slug).toBe("arbitrum")
})

test("related networks rank type and maturity, then type, then maturity", () => {
  const scroll = NETWORKS[3]
  expect(getRelatedNetworks(scroll, NETWORKS).map(({ slug }) => slug)).toEqual([
    "starknet",
    "zksync-era",
    "linea",
  ])
})

test("related networks skip the excluded see-next network", () => {
  const scroll = NETWORKS[3]
  expect(
    getRelatedNetworks(scroll, NETWORKS, { exclude: "starknet" }).map(
      ({ slug }) => slug
    )
  ).toEqual(["zksync-era", "linea", "arbitrum"])
})

// Read as text: networks.ts imports logo images, which don't resolve in Node.
test("network slugs are unique kebab-case", () => {
  const source = readFileSync("src/data/networks/networks.ts", "utf-8")
  const slugs = [...source.matchAll(/^ {4}slug: "([^"]+)",$/gm)].map(
    ([, slug]) => slug
  )
  expect(slugs.length).toBeGreaterThan(0)
  expect(new Set(slugs).size).toBe(slugs.length)
  for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
})
