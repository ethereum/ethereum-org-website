import { union } from "lodash"

import type {
  ChainName,
  NonEVMChainName,
  Wallet,
  WalletData,
} from "@/lib/types"

import { formatDate } from "@/lib/utils/date"
import { getLanguageCodeName } from "@/lib/utils/intl"
import { stripMarkdown } from "@/lib/utils/md"
import { capitalize } from "@/lib/utils/string"
import { slugify } from "@/lib/utils/url"
import {
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import { getWalletDevices, type WalletDeviceId } from "@/data/wallets/devices"
import {
  WALLET_PERSONA_IDS,
  WALLET_PERSONAS,
  type WalletPersonaId,
} from "@/data/wallets/personas"
import walletsData from "@/data/wallets/wallet-data"

export {
  isWalletPersonaId,
  PERSONA_TITLE_KEYS,
  WALLET_PERSONA_IDS,
  WALLET_PERSONAS,
  type WalletPersonaId,
} from "@/data/wallets/personas"

/** OS/platform names a wallet runs on, for JSON-LD `operatingSystem`. */
export function getWalletPlatforms(wallet: WalletData): string[] {
  const os: string[] = []
  if (wallet.ios) os.push("iOS")
  if (wallet.android) os.push("Android")
  if (wallet.linux) os.push("Linux")
  if (wallet.windows) os.push("Windows")
  if (wallet.macOS) os.push("macOS")
  if (wallet.chromium) os.push("Chromium (Extension)")
  if (wallet.firefox) os.push("Firefox")
  if (wallet.hardware) os.push("Hardware")
  return os
}

/**
 * Canonical mapping from a wallet to its URL slug (also its React key). Defaults
 * to `slugify(name)`; a wallet may pin an explicit `slug` to keep its URL stable
 * across a rename.
 */
export const getWalletSlug = (
  wallet: Pick<WalletData, "name" | "slug">
): string => wallet.slug ?? slugify(wallet.name)

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

export type WalletLanguageOption = {
  code: string
  name: string
  count: number
}

/**
 * Locale-aware language filter options derived from the given wallet set:
 * each distinct language with its native/localized name and a wallet count
 * relative to that set (so persona pages get subset-accurate counts). Sorted
 * alphabetically by localized name.
 */
export function getWalletLanguageOptions(
  wallets: WalletData[],
  locale: string
): WalletLanguageOption[] {
  return getWalletLanguageCodes(wallets)
    .map((code) => ({
      code,
      name: capitalize(getLanguageCodeName(code, locale) ?? code),
      count: wallets.filter((wallet) =>
        wallet.languages_supported.includes(code as never)
      ).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
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

/**
 * Resolve a single wallet by URL slug and enrich only that one. Detail views
 * need just one wallet, so this skips the shuffle + enrichment of all 49 that
 * `getCatalogWallets` does (slugs are globally unique — flat routes).
 */
export function getWalletBySlug(
  slug: string,
  locale: string
): CatalogWallet | undefined {
  const wallet = walletsData.find((entry) => getWalletSlug(entry) === slug)
  return wallet ? enrichWallet(wallet, locale) : undefined
}

/** The subset of wallets belonging to a persona (preserves catalog ordering). */
export function getWalletsByPersona(
  wallets: CatalogWallet[],
  personaId: WalletPersonaId
): CatalogWallet[] {
  return wallets.filter((wallet) => wallet.personas.includes(personaId))
}

/** Display string for the most recent `last_updated` across the given wallets (empty when none). */
export function getLastUpdatedDisplay(
  wallets: CatalogWallet[],
  locale: string
): string {
  const mostRecent = wallets
    .map((wallet) => wallet.last_updated)
    .filter((date) => date.length > 0)
    .sort()
    .at(-1)
  return mostRecent ? formatDate(mostRecent, locale) : ""
}

/** Global membership count per persona, for the persona navigation cards. */
export function getPersonaCounts(
  wallets: CatalogWallet[]
): Record<WalletPersonaId, number> {
  const counts = {} as Record<WalletPersonaId, number>
  for (const id of WALLET_PERSONA_IDS) counts[id] = 0
  for (const wallet of wallets) {
    for (const persona of wallet.personas) counts[persona] += 1
  }
  return counts
}
