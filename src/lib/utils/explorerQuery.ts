import explorers from "@/data/explorers"

import {
  STARKNET_EXPLORER,
  STARKNET_MIN_HEX_DIGITS,
  ZIRCUIT_EXPLORER,
} from "@/lib/constants"

/**
 * A search for a raw address or hash is never answerable from site content, so offer
 * block explorers instead.
 *
 * Without a chain prefix there is no way to know which network the value belongs to, and
 * we deliberately do not probe explorers to find out -- that would hand the user's
 * address to every one of them on each keystroke. All featured networks are offered
 * instead and the user picks, which they can do because they know where they got it.
 *
 * Prefixes follow EIP-3770 (`base:0x...`), whose short names come from the same
 * chainid.network registry that generates `@/data/explorers`. EIP-3770 short names are
 * case-sensitive; this is a search box, so `BASE:` is accepted too.
 */
const EXPLORER_QUERY_RE = /^(?:([a-zA-Z0-9-]{2,32}):)?0x([0-9a-fA-F]{40,64})$/

/** Hex digit counts that mean something on an EVM chain. */
const EVM_ADDRESS_DIGITS = 40
const EVM_HASH_DIGITS = 64

/**
 * `address` is a 20-byte value, which only an account can be. `hash` is 32 bytes, which
 * may be a transaction or a block -- the copy stays open-ended rather than guessing.
 */
export type ExplorerKind = "address" | "hash"

/** A row's label when it names a lookup rather than a network. */
export type ExplorerRole = "contract" | "transaction"

export interface ExplorerTarget {
  /** Row label: a network name, unless `role` names a lookup instead */
  name?: string
  role?: ExplorerRole
  /** Filename within `public/images/layer-2/` */
  icon: string
  url: string
}

/** One section of results: an explorer brand and what it can look the value up as. */
export interface ExplorerGroup {
  brand: string
  kind: ExplorerKind
  targets: ExplorerTarget[]
}

export interface ExplorerQuery {
  /** The 0x value, without any chain prefix */
  value: string
  groups: ExplorerGroup[]
}

/**
 * `/search-results` rather than `/address` or `/tx`: the value may not exist on the
 * chosen chain, and a search page says so gracefully where a direct route renders a
 * dead end. It also resolves blocks, tokens and ENS names without us classifying them.
 */
const blockscoutUrl = (base: string, value: string) =>
  `${base}/search-results?q=${value}`

export const parseExplorerQuery = (query: string): ExplorerQuery | null => {
  const match = EXPLORER_QUERY_RE.exec(query.trim())
  if (!match) return null

  const [, prefix, hex] = match
  const value = `0x${hex}`
  const isEvmAddress = hex.length === EVM_ADDRESS_DIGITS
  const isEvmHash = hex.length === EVM_HASH_DIGITS
  const isEvm = isEvmAddress || isEvmHash
  // Unpadded Starknet values fall short of 64; see STARKNET_MIN_HEX_DIGITS for the floor.
  const isStarknet = hex.length >= STARKNET_MIN_HEX_DIGITS
  const kind: ExplorerKind = isEvmAddress ? "address" : "hash"

  if (prefix) {
    // A chain prefix is an EIP-3770 EVM short name, so it only applies to EVM shapes.
    if (!isEvm) return null
    const explorer = explorers[prefix.toLowerCase() as keyof typeof explorers]
    // An unrecognised prefix falls through to ordinary search rather than ignoring it
    // and offering every chain -- the user named one, and guessing is worse than nothing.
    if (!explorer) return null
    return {
      value,
      groups: [
        {
          brand: "Blockscout",
          kind,
          targets: [{ ...explorer, url: blockscoutUrl(explorer.url, value) }],
        },
      ],
    }
  }

  const groups: ExplorerGroup[] = []

  if (isEvm) {
    groups.push({
      brand: "Blockscout",
      kind,
      targets: Object.values(explorers).map((explorer) => ({
        ...explorer,
        url: blockscoutUrl(explorer.url, value),
      })),
    })
  }

  // After the EVM readings: a 64-hex value is far more often an Ethereum hash than a
  // Starknet felt, since Starknet is one L2 among the ten the site lists. Shorter values
  // are unambiguous -- they are not a valid EVM address or hash at all.
  //
  // Two rows because Starkscan has no unified search and a felt carries no hint of which
  // it is, so guessing one would send half of these to a "not found" page.
  if (isStarknet) {
    groups.push({
      brand: STARKNET_EXPLORER.brand,
      kind: "hash",
      targets: [
        {
          role: "contract",
          icon: STARKNET_EXPLORER.icon,
          url: `${STARKNET_EXPLORER.contractUrl}/${value}`,
        },
        {
          role: "transaction",
          icon: STARKNET_EXPLORER.icon,
          url: `${STARKNET_EXPLORER.txUrl}/${value}`,
        },
      ],
    })
  }

  // Last: Zircuit is a single network on its own explorer, so it reads as a footnote to
  // the Blockscout list rather than a peer of it.
  if (isEvm) {
    groups.push({
      brand: ZIRCUIT_EXPLORER.brand,
      kind,
      targets: [
        {
          name: ZIRCUIT_EXPLORER.name,
          icon: ZIRCUIT_EXPLORER.icon,
          url: `${isEvmAddress ? ZIRCUIT_EXPLORER.addressUrl : ZIRCUIT_EXPLORER.txUrl}/${value}`,
        },
      ],
    })
  }

  return groups.length ? { value, groups } : null
}

/**
 * Middle-truncated for display: keeps both ends, which is how a hex value is recognised.
 * Only used in the Recent list, where the row has to identify itself without the search
 * input to fall back on.
 */
export const truncateHex = (value: string, lead = 10, tail = 8) =>
  value.length <= lead + tail + 1
    ? value
    : `${value.slice(0, lead)}\u2026${value.slice(-tail)}`
