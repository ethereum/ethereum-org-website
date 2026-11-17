import type { StaticImageData } from "next/image"

import type {
  BlockspaceData,
  CatalogNetwork,
  GrowThePieData,
  GrowThePieMasterData,
  L2beatData,
  MainnetNetwork,
  MaturityLevel,
  NetworkMetrics,
} from "@/lib/types"

import type { CatalogFilterState } from "@/components/FilterableCatalog/types"
import { asArray } from "@/components/FilterableCatalog/utils"

import { networkMaturity } from "@/lib/utils/networkMaturity"
import { formatCompactNumber, numberFormat } from "@/lib/utils/numbers"
import { formatDuration } from "@/lib/utils/time"

import type { Rollup } from "@/data/networks/networks"

export const MATURITY_KEY = "maturity"
export const WALLET_KEY = "wallet"
export const NETWORK_FILTER_KEYS = [MATURITY_KEY, WALLET_KEY] as const
/** Card and modal id for Mainnet, which has no slug */
export const MAINNET_ID = "mainnet"

export const getNetworkHref = (slug: string) => `/layer-2/networks/${slug}/`

/** Display and sort order, most mature first. */
export const MATURITY_LEVELS = [
  "robust",
  "maturing",
  "developing",
  "emerging",
] as const satisfies MaturityLevel[]

export type NetworkSources = {
  l2beat: L2beatData
  growThePie: GrowThePieData
  blockspace: Record<string, BlockspaceData> | null
  master: GrowThePieMasterData | null
  ethereumMarketcap: number
}

/** A wallet reduced to what network support needs. */
export type NetworkWallet = { slug: string; chains: readonly string[] }

const metricsFor = (
  growthepieID: string,
  chainName: string,
  sources: NetworkSources,
  wallets: NetworkWallet[]
): Omit<NetworkMetrics, "tvl"> => ({
  txCosts: sources.growThePie.dailyTxCosts[growthepieID] ?? null,
  activeAddresses: sources.growThePie.activeAddresses[growthepieID] ?? null,
  launchDate:
    sources.master?.launchDates[growthepieID.replace(/_/g, "-")] ?? null,
  walletSlugs: wallets
    .filter((wallet) => wallet.chains.includes(chainName))
    .map((wallet) => wallet.slug),
})

const maturityRank = (maturity: MaturityLevel) => {
  const index = (MATURITY_LEVELS as readonly string[]).indexOf(maturity)
  return index === -1 ? MATURITY_LEVELS.length : index
}

/** Listing order: most mature first, then by value secured. */
export function compileNetworks(
  rollups: Rollup[],
  sources: NetworkSources,
  wallets: NetworkWallet[]
): CatalogNetwork[] {
  return rollups
    .map((rollup) => {
      const project = sources.l2beat.projects[rollup.l2beatID]
      return {
        ...rollup,
        ...metricsFor(rollup.growthepieID, rollup.chainName, sources, wallets),
        tvl: project.tvs.breakdown.total,
        networkMaturity: networkMaturity(project),
        blockspaceData: sources.blockspace?.[rollup.growthepieID] ?? null,
      }
    })
    .sort(
      (a, b) =>
        maturityRank(a.networkMaturity) - maturityRank(b.networkMaturity) ||
        b.tvl - a.tvl
    )
}

export function compileMainnet(
  mainnet: Pick<MainnetNetwork, "name" | "chainName" | "logo" | "feeToken"> & {
    growthepieID: string
  },
  sources: NetworkSources,
  wallets: NetworkWallet[]
): MainnetNetwork {
  return {
    name: mainnet.name,
    chainName: mainnet.chainName,
    logo: mainnet.logo,
    feeToken: mainnet.feeToken,
    ...metricsFor(mainnet.growthepieID, mainnet.chainName, sources, wallets),
    tvl: sources.ethereumMarketcap,
  }
}

/** The network after this one in listing order, wrapping to the first. */
export function getNextNetwork(
  network: CatalogNetwork,
  networks: CatalogNetwork[]
): CatalogNetwork {
  const index = networks.findIndex(({ slug }) => slug === network.slug)
  return networks[(index + 1) % networks.length]
}

/** Same type and maturity first, then same type, then same maturity; ties by value secured. */
export function getRelatedNetworks(
  network: CatalogNetwork,
  networks: CatalogNetwork[],
  { limit = 3, exclude }: { limit?: number; exclude?: string } = {}
): CatalogNetwork[] {
  const score = (other: CatalogNetwork) =>
    (other.networkType === network.networkType ? 2 : 0) +
    (other.networkMaturity === network.networkMaturity ? 1 : 0)

  return networks
    .filter(({ slug }) => slug !== network.slug && slug !== exclude)
    .sort((a, b) => score(b) - score(a) || b.tvl - a.tvl)
    .slice(0, limit)
}

/** Client payload for a card and its modal; values arrive formatted. */
export type NetworkCardData = {
  /** Absent for Mainnet, which has no detail page */
  slug?: string
  name: string
  logo: StaticImageData
  /** Absent for Mainnet */
  maturity?: MaturityLevel
  description: string
  walletSlugs: string[]
  tvl: string
  txFee: string | null
  activeAddresses: string | null
  age: string | null
  feeToken: string
  /** e.g. "32/48" */
  walletSupport: string
  walletsHref: string
  bridgeLink?: string
  applicationsLink: string
}

export function toNetworkCard(
  network: CatalogNetwork | MainnetNetwork,
  {
    locale,
    description,
    walletsTotal,
  }: { locale: string; description: string; walletsTotal: number }
): NetworkCardData {
  const isMainnet = !("slug" in network)
  return {
    ...(!isMainnet && {
      slug: network.slug,
      maturity: network.networkMaturity,
      bridgeLink: network.bridgeLink,
    }),
    name: network.name,
    logo: network.logo,
    description,
    walletSlugs: network.walletSlugs,
    tvl: numberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 3,
    }).format(network.tvl),
    txFee:
      network.txCosts === null
        ? null
        : `$${numberFormat(locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }).format(network.txCosts)}`,
    activeAddresses:
      network.activeAddresses === null
        ? null
        : formatCompactNumber(network.activeAddresses, locale),
    age: network.launchDate
      ? formatDuration(
          Date.now() - new Date(network.launchDate).getTime(),
          locale,
          { units: ["y", "mo"], round: true }
        )
      : null,
    feeToken: network.feeToken.join(", "),
    walletSupport: `${network.walletSlugs.length}/${walletsTotal}`,
    walletsHref: `/wallets/find-wallet/?networks=${encodeURIComponent(network.chainName)}`,
    applicationsLink: isMainnet ? "/apps/" : network.applicationsLink,
  }
}

export function filterNetwork(
  network: Pick<
    NetworkCardData,
    "name" | "description" | "maturity" | "walletSlugs"
  >,
  state: CatalogFilterState,
  query: string
): boolean {
  const levels = asArray(state[MATURITY_KEY])
  if (levels.length && !levels.includes(network.maturity ?? "")) return false

  const [wallet] = asArray(state[WALLET_KEY])
  if (wallet && !network.walletSlugs.includes(wallet)) return false

  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return true
  return `${network.name} ${network.description}`
    .toLowerCase()
    .includes(normalizedQuery)
}
