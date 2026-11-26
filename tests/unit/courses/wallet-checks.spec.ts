/**
 * Wallets sign in with mainnet SIWE messages for this site only, and a bad
 * address is turned away instead of breaking the request.
 */

import { createSiweMessage, parseSiweMessage } from "viem/siwe"
import { expect, test } from "@playwright/test"

import {
  SIWE_CHAIN_ID,
  siweMessageProblem,
  toWalletAddress,
} from "../../../src/lib/auth/verify-wallet"

const DOMAIN = "ethereum.org"
const ADDRESS = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
const NOW = new Date("2026-11-20T12:00:00Z")

const message = (overrides: Partial<Parameters<typeof createSiweMessage>[0]>) =>
  parseSiweMessage(
    createSiweMessage({
      address: ADDRESS,
      chainId: SIWE_CHAIN_ID,
      domain: DOMAIN,
      uri: `https://${DOMAIN}`,
      nonce: "a1b2c3d4e5f6a7b8",
      version: "1",
      issuedAt: new Date(NOW.getTime() - 60_000),
      expirationTime: new Date(NOW.getTime() + 10 * 60_000),
      ...overrides,
    })
  )

test.describe("siweMessageProblem", () => {
  test("accepts a mainnet message for this site", () => {
    expect(siweMessageProblem(message({}), DOMAIN, NOW)).toBeNull()
  })

  test("turns away other networks", () => {
    expect(siweMessageProblem(message({ chainId: 10 }), DOMAIN, NOW)).toBe(
      "chain"
    )
    expect(
      siweMessageProblem(message({ chainId: 11155111 }), DOMAIN, NOW)
    ).toBe("chain")
  })

  test("turns away another site, an old message and a weak nonce", () => {
    expect(
      siweMessageProblem(message({ domain: "evil.example" }), DOMAIN, NOW)
    ).toBe("domain")
    expect(
      siweMessageProblem(
        message({ expirationTime: new Date(NOW.getTime() - 1) }),
        DOMAIN,
        NOW
      )
    ).toBe("expired")
    expect(
      siweMessageProblem({ ...message({}), nonce: "abc" }, DOMAIN, NOW)
    ).toBe("nonce")
  })

  test("needs a real address", () => {
    expect(
      siweMessageProblem({ ...message({}), address: undefined }, DOMAIN, NOW)
    ).toBe("address")
  })
})

test.describe("toWalletAddress", () => {
  test("checksums any casing of a valid address", () => {
    expect(toWalletAddress(ADDRESS.toLowerCase())).toBe(ADDRESS)
    expect(toWalletAddress(ADDRESS)).toBe(ADDRESS)
  })

  test("returns null for anything else, instead of throwing", () => {
    expect(toWalletAddress("not an address")).toBeNull()
    expect(toWalletAddress("0x1234")).toBeNull()
    expect(toWalletAddress("")).toBeNull()
  })
})
