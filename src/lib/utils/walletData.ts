import { union } from "lodash"

import type {
  ChainName,
  NonEVMChainName,
  Wallet,
  WalletData,
} from "@/lib/types"

import { getWalletSlug } from "@/lib/utils/getWalletSlug"
import { stripMarkdown } from "@/lib/utils/md"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import {
  DEVELOPER_FEATURES,
  FINANCE_FEATURES,
  LONG_TERM_FEATURES,
  NEW_TO_CRYPTO_FEATURES,
  NFTS_FEATURES,
} from "@/lib/constants"

export { getWalletSlug }

/**
 * Canonical persona definitions — the single source of truth, derived from the
 * `*_FEATURES` lists in `constants.ts`. A wallet belongs to a persona when it
 * has ALL of that persona's feature flags (AND semantics, matching the legacy
 * `getWalletPersonas`). The `id` is the URL slug used for persona pages
 * (`/wallets/find-wallet/personas/[persona]`) — deliberately never the internal
 * `hodler` key (its slug/title is `hardware`, resolved in the revamp plan).
 */
export const WALLET_PERSONAS = [
  {
    id: "new-to-crypto",
    features: NEW_TO_CRYPTO_FEATURES,
    titleKey: "page-find-wallet-new-to-crypto-title",
    descKey: "page-find-wallet-new-to-crypto-desc",
  },
  {
    id: "nfts",
    features: NFTS_FEATURES,
    titleKey: "page-find-wallet-nfts-title",
    descKey: "page-find-wallet-nfts-desc",
  },
  {
    id: "hardware",
    features: LONG_TERM_FEATURES,
    titleKey: "page-find-wallet-hodler-title",
    descKey: "page-find-wallet-hodler-desc",
  },
  {
    id: "finance",
    features: FINANCE_FEATURES,
    titleKey: "page-find-wallet-finance-title",
    descKey: "page-find-wallet-finance-desc",
  },
  {
    id: "developer",
    features: DEVELOPER_FEATURES,
    titleKey: "page-find-wallet-developer-title",
    descKey: "page-find-wallet-developer-desc",
  },
] as const

export type WalletPersonaId = (typeof WALLET_PERSONAS)[number]["id"]

export const WALLET_PERSONA_IDS = WALLET_PERSONAS.map(
  (persona) => persona.id
) as WalletPersonaId[]

export const isWalletPersonaId = (value: string): value is WalletPersonaId =>
  WALLET_PERSONA_IDS.includes(value as WalletPersonaId)

/**
 * The four flat device buckets drawn in the Figma revamp, derived from the raw
 * per-OS booleans on `WalletData`. Note `hardware` here means "is a hardware
 * wallet device" (the `hardware` field), distinct from the `hardware_support`
 * feature (software wallet that pairs with one).
 */
export type WalletDeviceId = "desktop" | "mobile" | "browser" | "hardware"

export const WALLET_DEVICE_IDS: WalletDeviceId[] = [
  "desktop",
  "mobile",
  "browser",
  "hardware",
]

export function getWalletDevices(
  wallet: WalletData
): Record<WalletDeviceId, boolean> {
  return {
    desktop: wallet.linux || wallet.windows || wallet.macOS,
    mobile: wallet.ios || wallet.android,
    browser: wallet.firefox || wallet.chromium,
    hardware: wallet.hardware,
  }
}

/** Persona ids a wallet qualifies for (all of a persona's features true). */
export function getWalletPersonaIds(wallet: WalletData): WalletPersonaId[] {
  return WALLET_PERSONAS.filter((persona) =>
    persona.features.every((feature) => wallet[feature as keyof WalletData])
  ).map((persona) => persona.id)
}

/**
 * The distinct chains present across the given wallets with per-chain wallet
 * counts, most-supported first. Fully derived — no curated list — so the
 * Networks filter self-maintains as wallet data evolves.
 */
export type WalletNetwork = {
  id: ChainName | NonEVMChainName
  count: number
}

export function getWalletNetworks(wallets: WalletData[]): WalletNetwork[] {
  const counts = new Map<ChainName | NonEVMChainName, number>()
  for (const wallet of wallets) {
    for (const chain of wallet.supported_chains) {
      counts.set(chain, (counts.get(chain) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id))
}

/** The distinct languages any wallet supports (deduped). */
export function getWalletLanguageCodes(wallets: WalletData[]): string[] {
  return wallets.reduce(
    (acc, wallet) => union(acc, wallet.languages_supported),
    [] as string[]
  )
}

/**
 * The catalog/detail item shape: a wallet enriched with everything the client
 * island and detail views need, all serializable (no functions/translators) so
 * it can cross the server→client boundary as props.
 */
export type CatalogWallet = Wallet & {
  slug: string
  devices: Record<WalletDeviceId, boolean>
  personas: WalletPersonaId[]
  /** Plain-text description (markdown stripped) for card/search; undefined when the wallet has none. */
  descriptionStripped?: string
}

export function enrichWallet(
  wallet: WalletData,
  locale: string
): CatalogWallet {
  return {
    ...wallet,
    slug: getWalletSlug(wallet),
    // getSupportedLanguages mutates its argument — pass a copy.
    supportedLanguages: getSupportedLanguages(
      [...wallet.languages_supported],
      locale
    ),
    devices: getWalletDevices(wallet),
    personas: getWalletPersonaIds(wallet),
    descriptionStripped: wallet.description
      ? stripMarkdown(wallet.description)
      : undefined,
  }
}

/**
 * All wallets as catalog items, in locale-aware order: wallets supporting the
 * current locale first (shuffled within group via `safeShuffle`, visual-test
 * deterministic), then the rest. Baked into SSG/ISR HTML — no hydration
 * mismatch — and persona pages inherit the ordering for free.
 */
export function getCatalogWallets(locale: string): CatalogWallet[] {
  const ordered = [
    ...getSupportedLocaleWallets(locale),
    ...getNonSupportedLocaleWallets(locale),
  ]
  return ordered.map((wallet) => enrichWallet(wallet, locale))
}

/** Resolve a wallet by its URL slug (slugs are globally unique — flat routes). */
export function findWalletBySlug(
  wallets: CatalogWallet[],
  slug: string
): CatalogWallet | undefined {
  return wallets.find((wallet) => wallet.slug === slug)
}

/** The subset of wallets belonging to a persona (preserves catalog ordering). */
export function getWalletsByPersona(
  wallets: CatalogWallet[],
  personaId: WalletPersonaId
): CatalogWallet[] {
  return wallets.filter((wallet) => wallet.personas.includes(personaId))
}
