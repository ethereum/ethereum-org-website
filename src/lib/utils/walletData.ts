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
import { numberFormat } from "@/lib/utils/numbers"
import { seededShuffle } from "@/lib/utils/random"
import { capitalize } from "@/lib/utils/string"
import { slugify } from "@/lib/utils/url"
import {
  formatWalletFees,
  getNonSupportedLocaleWallets,
  getSupportedLanguages,
  getSupportedLocaleWallets,
} from "@/lib/utils/wallets"

import {
  buildDeviceLabels,
  getDeviceLabels,
  getWalletDevices,
  type WalletDeviceId,
} from "@/data/wallets/devices"
import {
  getWalletAdvancedFlags,
  type WalletFeatureKey,
} from "@/data/wallets/features"
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

/** For JSON-LD `operatingSystem`. */
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

export const getWalletSlug = (
  wallet: Pick<WalletData, "name" | "slug">
): string => wallet.slug ?? slugify(wallet.name)

/** Slugs only — skips the shuffle and enrichment `getCatalogWallets` does. */
export const getAllWalletSlugs = (): string[] =>
  walletsData.map((wallet) => getWalletSlug(wallet))

/** A wallet qualifies for a persona when it has all of that persona's features. */
export function getWalletPersonaIds(wallet: WalletData): WalletPersonaId[] {
  return WALLET_PERSONAS.filter((persona) =>
    persona.features.every((feature) => wallet[feature as keyof WalletData])
  ).map((persona) => persona.id)
}

export type WalletNetwork = {
  id: ChainName | NonEVMChainName
  count: number
}

/** Distinct chains across the given wallets, most-supported first. */
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

/** Counts are relative to `wallets`, so persona pages get subset-accurate ones. */
export function getWalletLanguageOptions(
  wallets: WalletData[],
  locale: string
): WalletLanguageOption[] {
  return getWalletLanguageCodes(wallets)
    .map((code) => ({
      code,
      name: capitalize(getLanguageCodeName(code, locale) ?? code),
      count: wallets.filter((wallet) =>
        (wallet.languages_supported as string[]).includes(code)
      ).length,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale))
}

export type CatalogWallet = Wallet & {
  slug: string
  devices: Record<WalletDeviceId, boolean>
  personas: WalletPersonaId[]
  /** Only the enabled keys, so the client payload stays sparse. */
  advancedFlags: WalletFeatureKey[]
  descriptionStripped?: string
}

/**
 * The only wallet fields that cross to the client. A full `CatalogWallet` is
 * ~2KB serialized, 49 of them; detail views re-resolve the whole record
 * server-side via `getWalletBySlug`, so keep this to what the island reads.
 */
export type CatalogWalletCard = Pick<
  CatalogWallet,
  | "slug"
  | "name"
  | "image"
  | "devices"
  | "personas"
  | "advancedFlags"
  | "supportedLanguages"
  | "descriptionStripped"
  | "supported_chains"
  | "languages_supported"
  | "buy_crypto"
  | "withdraw_crypto"
> & {
  /** Already formatted, e.g. "Swap fee: 0.3%" — see `toCatalogCard`. */
  fees?: string
}

export const toCatalogCard = (
  wallet: CatalogWallet,
  // Fees are formatted here so the ~20 fee intl keys never reach the client.
  intl: { t: WalletTranslator; locale: string }
): CatalogWalletCard => ({
  slug: wallet.slug,
  name: wallet.name,
  image: wallet.image,
  devices: wallet.devices,
  personas: wallet.personas,
  advancedFlags: wallet.advancedFlags,
  supported_chains: wallet.supported_chains,
  supportedLanguages: wallet.supportedLanguages,
  languages_supported: wallet.languages_supported,
  buy_crypto: wallet.buy_crypto,
  withdraw_crypto: wallet.withdraw_crypto,
  // Omit the key rather than serialize a null.
  ...(wallet.descriptionStripped && {
    descriptionStripped: wallet.descriptionStripped,
  }),
  ...(wallet.fees?.length && {
    fees: formatWalletFees(wallet.fees, intl.locale, intl.t),
  }),
})

type WalletTranslator = (
  key: string,
  values?: Record<string, string | number>
) => string

/**
 * No wallet carries a `description` today, so without this the meta
 * description and JSON-LD of all 49 detail pages would be the bare wallet
 * name. Returns undefined when the data can't fill the sentence; a real
 * description always wins over this.
 */
export function buildWalletMetaDescription(
  wallet: CatalogWallet,
  t: WalletTranslator,
  locale: string
): string | undefined {
  const devices = getDeviceLabels(wallet.devices, buildDeviceLabels(t))
  const networkCount = wallet.supported_chains.length
  const languageCount = wallet.languages_supported.length
  if (!devices.length || !networkCount || !languageCount) return undefined

  const nf = numberFormat(locale)
  return t("page-find-wallet-meta-description-fallback", {
    wallet: wallet.name,
    devices: new Intl.ListFormat(locale, {
      style: "long",
      type: "conjunction",
    }).format(devices),
    // Counts drive plural selection; the formatted twins carry the locale's
    // numbering system, which ICU's `#` would bypass for ur.
    networkCount,
    networkCountFormatted: nf.format(networkCount),
    languageCount,
    languageCountFormatted: nf.format(languageCount),
  })
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
    advancedFlags: getWalletAdvancedFlags(wallet),
    descriptionStripped: wallet.description
      ? stripMarkdown(wallet.description)
      : undefined,
  }
}

/** Wallets supporting `locale` first, then the rest. */
export function getCatalogWallets(locale: string): CatalogWallet[] {
  const ordered = [
    ...getSupportedLocaleWallets(locale),
    ...getNonSupportedLocaleWallets(locale),
  ]
  return ordered.map((wallet) => enrichWallet(wallet, locale))
}

export function getWalletBySlug(
  slug: string,
  locale: string
): CatalogWallet | undefined {
  const wallet = walletsData.find((entry) => getWalletSlug(entry) === slug)
  return wallet ? enrichWallet(wallet, locale) : undefined
}

/**
 * Wallets sharing this one's personas, most personas in common first. Most
 * wallets tie on persona overlap, so the tie order is a shuffle seeded from the
 * host wallet's slug: stable across prerender and revalidation, but a different
 * six per detail page instead of the same alphabetical head everywhere.
 */
export function getRelatedWallets(
  wallet: CatalogWallet,
  locale: string,
  limit = 6
): CatalogWallet[] {
  const personas = new Set(wallet.personas)
  if (personas.size === 0) return []

  const seed = [...wallet.slug].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  )

  const scored = walletsData
    .filter((entry) => getWalletSlug(entry) !== wallet.slug)
    .map((entry) => ({
      entry,
      shared: getWalletPersonaIds(entry).filter((id) => personas.has(id))
        .length,
    }))
    .filter(({ shared }) => shared > 0)

  return seededShuffle(scored, seed)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map(({ entry }) => enrichWallet(entry, locale))
}

export function getWalletsByPersona(
  wallets: CatalogWallet[],
  personaId: WalletPersonaId
): CatalogWallet[] {
  return wallets.filter((wallet) => wallet.personas.includes(personaId))
}

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
