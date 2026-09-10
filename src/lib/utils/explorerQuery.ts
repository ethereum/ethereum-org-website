import type { AddressFormat, SearchExplorer } from "@/data/networks/networks"

/**
 * Block explorer results for a query that site content cannot answer.
 *
 * The networks are passed in rather than imported: they live in `networks.ts` alongside
 * everything `/layer-2/networks` renders, which imports logo images and so cannot be
 * loaded outside the bundler. Keeping this module pure is also what lets it be tested
 * without the network list at all.
 */
export interface ExplorerNetwork {
  /** Nickname shown on the row, matching what /layer-2/networks calls it */
  name: string
  /** Image src for the row icon */
  icon: string
  addressFormat: AddressFormat
  explorer: SearchExplorer
}

/**
 * Prefixes follow EIP-3770 (`base:0x...`). Case-insensitive: the spec is case-sensitive
 * but this is a search box, and `BASE:` is what a paste looks like.
 */
const HEX_QUERY_RE = /^(?:([a-zA-Z0-9-]{2,32}):)?0x([0-9a-fA-F]{40,64})$/

/**
 * Restricted to `.eth` and `.id` rather than domains generally: ENS also resolves DNS
 * names its owners have imported, so "an explorer resolves it" is not a usable test, and
 * a general domain shape would fire on `ethereum.org`.
 *
 * ENS's registrar rejects a registered name shorter than three characters, so `ab.eth`
 * cannot exist -- but its owner may create a subdomain of any length, hence
 * `a.vitalik.eth`. `.id` registrars do not share that rule; `cb.id` is real.
 */
const LABEL = "[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
const ENS_LABEL = "[a-z0-9][a-z0-9-]+[a-z0-9]"
const NAME_QUERY_RE = new RegExp(
  `^(?:${LABEL}\\.)*(?:${ENS_LABEL}\\.eth|${LABEL}\\.id)$`,
  "i"
)

/**
 * Starknet addresses and hashes are field elements below 2^251, so unpadded they run to
 * at most 63 hex digits; zero-padded to 32 bytes they reach 64 and become
 * indistinguishable from an Ethereum hash. Explorers differ on padding -- Starkscan
 * displays padded but copies unpadded -- and leading zeros then cascade at one in
 * sixteen: 63 digits covers 87.5% of values, 60 is 1 in 2,000, and 56 is 1 in 130
 * million. Accepting 56 or more catches essentially every real value without reaching
 * into lengths that mean something else.
 */
const STARKNET_MIN_HEX_DIGITS = 56

const EVM_ADDRESS_DIGITS = 40
const EVM_HASH_DIGITS = 64

/**
 * `address` is 20 bytes, which only an account can be. `hash` is 32 bytes, which may be a
 * transaction or a block, so the copy stays open-ended. `name` resolves to one of those.
 */
export type ExplorerKind = "address" | "hash" | "name"

/** A row's label, when it names a lookup rather than a network. */
export type ExplorerRole = "contract" | "transaction"

export interface ExplorerTarget {
  name?: string
  role?: ExplorerRole
  icon: string
  url: string
}

export interface ExplorerGroup {
  brand: string
  kind: ExplorerKind
  targets: ExplorerTarget[]
}

export interface ExplorerQuery {
  value: string
  groups: ExplorerGroup[]
}

const hasSearchRoute = (
  e: SearchExplorer
): e is SearchExplorer & { search: string } => "search" in e

/** Which value shapes a network can look up. */
const accepts = (network: ExplorerNetwork, digits: number) =>
  network.addressFormat === "starknet"
    ? digits >= STARKNET_MIN_HEX_DIGITS
    : digits === EVM_ADDRESS_DIGITS || digits === EVM_HASH_DIGITS

const targetsFor = (
  network: ExplorerNetwork,
  value: string,
  digits: number
): ExplorerTarget[] => {
  const { explorer, icon, name } = network
  if (hasSearchRoute(explorer)) {
    return [{ name, icon, url: `${explorer.search}${value}` }]
  }
  // Starknet cannot tell a contract from a transaction by shape, so it offers both.
  // An EVM value can: 20 bytes is an account, 32 bytes is a hash.
  if (network.addressFormat === "starknet") {
    return [
      { role: "contract", icon, url: `${explorer.address}${value}` },
      { role: "transaction", icon, url: `${explorer.tx}${value}` },
    ]
  }
  const base = digits === EVM_ADDRESS_DIGITS ? explorer.address : explorer.tx
  return [{ name, icon, url: `${base}${value}` }]
}

/** One section per explorer, in the order the networks are declared. */
const group = (
  networks: ExplorerNetwork[],
  value: string,
  digits: number,
  kind: ExplorerKind
): ExplorerGroup[] => {
  const groups: ExplorerGroup[] = []
  for (const network of networks) {
    const existing = groups.find((g) => g.brand === network.explorer.brand)
    const targets = targetsFor(network, value, digits)
    if (existing) existing.targets.push(...targets)
    else
      groups.push({
        brand: network.explorer.brand,
        // Starknet's rows name the lookup, so the heading stays open-ended.
        kind: network.addressFormat === "starknet" ? "hash" : kind,
        targets,
      })
  }
  return groups
}

export const parseExplorerQuery = (
  query: string,
  networks: ExplorerNetwork[]
): ExplorerQuery | null => {
  const trimmed = query.trim()

  if (NAME_QUERY_RE.test(trimmed)) {
    // Mainnet only: ENS's registry lives there, and one row leaves room for the page
    // answer a name often has -- `vitalik.eth` finds the docs that use it as an example.
    const mainnet = networks.find((n) => n.explorer.prefix === "eth")
    if (!mainnet) return null
    return {
      value: trimmed,
      groups: [
        {
          brand: mainnet.explorer.brand,
          kind: "name",
          targets: targetsFor(mainnet, trimmed, 0),
        },
      ],
    }
  }

  const match = HEX_QUERY_RE.exec(trimmed)
  if (!match) return null
  const [, prefix, hex] = match
  const value = `0x${hex}`
  const kind: ExplorerKind =
    hex.length === EVM_ADDRESS_DIGITS ? "address" : "hash"

  if (prefix) {
    // A prefix names one chain, so guessing a different one is worse than nothing.
    const named = networks.find(
      (n) => n.explorer.prefix?.toLowerCase() === prefix.toLowerCase()
    )
    if (!named || !accepts(named, hex.length)) return null
    return { value, groups: group([named], value, hex.length, kind) }
  }

  const eligible = networks.filter((n) => accepts(n, hex.length))
  if (!eligible.length) return null
  return { value, groups: group(eligible, value, hex.length, kind) }
}

/** Middle-truncated: keeps both ends, which is how a hex value is recognized. */
export const truncateHex = (value: string, lead = 10, tail = 8) =>
  value.length <= lead + tail + 1
    ? value
    : `${value.slice(0, lead)}…${value.slice(-tail)}`
