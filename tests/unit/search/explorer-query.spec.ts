import { existsSync, readFileSync } from "fs"

import { expect, test } from "@playwright/test"

import { parseExplorerQuery, truncateHex } from "@/lib/utils/explorerQuery"

const ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
const TX = `0x${"a".repeat(64)}`
// Copied straight out of Starkscan, which displays padded but copies unpadded.
const STARKNET_UNPADDED =
  "0x27d14877cc48e478513a278cd6bfcb1bf43ef4427e5f8900fb05922559c3831"

const blockscout = (query: string) =>
  parseExplorerQuery(query)?.groups.find((g) => g.brand === "Blockscout")

test.describe("parseExplorerQuery", () => {
  test("offers every featured network when no chain is named", () => {
    // We cannot know which chain a bare value belongs to, and must never probe explorers
    // to find out -- that would leak the user's address to every one of them.
    const group = blockscout(ADDRESS)
    expect(group?.kind).toBe("address")
    expect(group?.targets.map((t) => t.name)).toEqual([
      "Ethereum Mainnet",
      "Arbitrum One",
      "Base",
      "OP Mainnet",
      "zkSync Mainnet",
      "Linea",
      "Scroll",
      "Unichain",
      "Ink",
    ])
  })

  test("narrows to one network when an EIP-3770 prefix names it", () => {
    const result = parseExplorerQuery(`base:${ADDRESS}`)
    expect(result?.groups).toHaveLength(1)
    expect(result?.groups[0].targets).toHaveLength(1)
    expect(result?.groups[0].targets[0].url).toBe(
      `https://base.blockscout.com/search-results?q=${ADDRESS}`
    )
  })

  test("accepts an uppercase prefix, which is what a paste looks like", () => {
    expect(blockscout(`BASE:${ADDRESS}`)?.targets[0].name).toBe("Base")
  })

  test("offers both Starkscan routes, because a felt does not say which it is", () => {
    // Starkscan has no unified search route, and a Starknet address and transaction hash
    // are the same shape -- guessing one sends half of these to a "not found" page.
    const starkscan = parseExplorerQuery(TX)?.groups.find(
      (g) => g.brand === "Starkscan"
    )
    expect(starkscan?.targets.map((t) => t.role)).toEqual([
      "contract",
      "transaction",
    ])
    expect(starkscan?.targets.map((t) => t.url)).toEqual([
      `https://starkscan.co/contract/${TX}`,
      `https://starkscan.co/tx/${TX}`,
    ])
  })

  test("offers Zircuit, which is on neither Blockscout nor an Etherscan family", () => {
    // EVM, so the value's length picks the route and one row is enough.
    const forAddress = parseExplorerQuery(ADDRESS)?.groups.find(
      (g) => g.brand === "Zircuit"
    )
    expect(forAddress?.targets[0].url).toBe(
      `https://explorer.zircuit.com/address/${ADDRESS}`
    )
    const forHash = parseExplorerQuery(TX)?.groups.find(
      (g) => g.brand === "Zircuit"
    )
    expect(forHash?.targets[0].url).toBe(
      `https://explorer.zircuit.com/tx/${TX}`
    )
  })

  test("orders sections Blockscout, Starknet, then Zircuit", () => {
    // A Starknet address is a field element padded to 64 hex -- the same shape as an
    // Ethereum transaction hash. Both readings are offered; the EVM one leads because a
    // transaction hash is by far the likelier paste on this site.
    // A 64-hex value is far more often an Ethereum hash than a Starknet felt.
    expect(parseExplorerQuery(TX)?.groups.map((g) => g.brand)).toEqual([
      "Blockscout",
      "Starkscan",
      "Zircuit",
    ])
    // 32 bytes may be a transaction or a block, so the kind stays open-ended.
    expect(parseExplorerQuery(TX)?.groups[0].kind).toBe("hash")
    expect(parseExplorerQuery(ADDRESS)?.groups[0].kind).toBe("address")
  })

  test("accepts an unpadded Starknet value, which is what explorers copy", () => {
    // Felts are below 2^251, so unpadded they stop at 63 hex digits and leading zeros
    // cascade at one in sixteen from there. The 56-digit floor misses 1 in 130 million.
    expect(STARKNET_UNPADDED.length).toBe(65)
    const result = parseExplorerQuery(STARKNET_UNPADDED)
    expect(result?.groups.map((g) => g.brand)).toEqual(["Starkscan"])
    expect(result?.groups[0].targets.map((t) => t.url)).toEqual([
      `https://starkscan.co/contract/${STARKNET_UNPADDED}`,
      `https://starkscan.co/tx/${STARKNET_UNPADDED}`,
    ])

    // A length that is neither an EVM shape nor a plausible felt stays out of search.
    expect(parseExplorerQuery(`0x${"c".repeat(56)}`)?.groups[0].brand).toBe(
      "Starkscan"
    )
    expect(parseExplorerQuery(`0x${"c".repeat(55)}`)).toBeNull()
    expect(parseExplorerQuery(`0x${"c".repeat(45)}`)).toBeNull()
  })

  test("does not offer Starknet for a 20-byte address", () => {
    expect(parseExplorerQuery(ADDRESS)?.groups.map((g) => g.brand)).toEqual([
      "Blockscout",
      "Zircuit",
    ])
  })

  test("routes Blockscout through search-results, which survives a miss", () => {
    // A direct /address or /tx route renders a dead end on the wrong chain; the search
    // page says so gracefully, and resolves blocks and ENS names without us classifying.
    expect(blockscout(ADDRESS)?.targets[0].url).toContain("/search-results?q=")
  })

  test("every target carries an icon we ship", () => {
    for (const group of parseExplorerQuery(TX)!.groups) {
      for (const target of group.targets) {
        expect(
          existsSync(`public/images/layer-2/${target.icon}`),
          `missing icon for ${target.name ?? target.role}: ${target.icon}`
        ).toBe(true)
      }
    }
  })

  test("falls through to normal search rather than guessing a chain", () => {
    expect(parseExplorerQuery(`solana:${ADDRESS}`)).toBeNull()
    expect(parseExplorerQuery("0xdeadbeef")).toBeNull()
    expect(parseExplorerQuery("what is gas")).toBeNull()
    expect(parseExplorerQuery("")).toBeNull()
  })

  test("matches only strict hex, so nothing unescaped can reach the renderer", () => {
    expect(parseExplorerQuery(`0x<img src=x onerror=alert(1)>`)).toBeNull()
    expect(parseExplorerQuery(`base:${ADDRESS}<script>`)).toBeNull()
  })
})

test.describe("query length cap", () => {
  test("the vendor query cap is patched above a transaction hash", () => {
    // typesense-docsearch-react hardcodes MAX_QUERY_SIZE = 64, which
    // @algolia/autocomplete-core applies twice: as the input's maxLength attribute and
    // as `value.slice(0, maxLength)` on every keystroke. A hash is 66 characters, so
    // both have to be raised -- patching the constant is the only path, since neither
    // is reachable by prop. Without it, hashes silently truncate and never match.
    expect(TX.length).toBe(66)

    const pkg = JSON.parse(readFileSync("package.json", "utf-8"))
    const patchPath =
      pkg.pnpm?.patchedDependencies?.["typesense-docsearch-react"]
    expect(
      patchPath,
      "the query-size patch is no longer registered"
    ).toBeTruthy()

    const patched = readFileSync(
      "node_modules/typesense-docsearch-react/dist/esm/constants.js",
      "utf-8"
    )
    const size = Number(/MAX_QUERY_SIZE = (\d+)/.exec(patched)?.[1])
    expect(size).toBeGreaterThanOrEqual(TX.length)
  })
})

test.describe("truncateHex", () => {
  test("keeps both ends, so a Recent row is still recognisable", () => {
    expect(truncateHex(ADDRESS)).toBe("0xd8dA6BF2\u20267aA96045")
  })

  test("leaves a short value alone", () => {
    expect(truncateHex("0xabc")).toBe("0xabc")
  })
})
