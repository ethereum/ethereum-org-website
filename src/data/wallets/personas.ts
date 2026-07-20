import {
  DEVELOPER_FEATURES,
  FINANCE_FEATURES,
  LONG_TERM_FEATURES,
  NEW_TO_CRYPTO_FEATURES,
  NFTS_FEATURES,
} from "@/lib/constants"

/**
 * Canonical persona definitions — the single source of truth, derived from the
 * `*_FEATURES` lists in `constants.ts`. A wallet belongs to a persona when it
 * has ALL of that persona's feature flags (AND semantics, matching the legacy
 * `getWalletPersonas`). The `id` is the URL slug used for persona pages
 * (`/wallets/find-wallet/personas/[persona]`) — deliberately never the internal
 * `hodler` key (its slug/title is `hardware`, resolved in the revamp plan).
 *
 * Dependency-free (imports only constants) so client components can use it
 * without pulling in the server-only wallet data module.
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

/** Translation key for a persona's display title, keyed by persona id. */
export const PERSONA_TITLE_KEYS = Object.fromEntries(
  WALLET_PERSONAS.map((persona) => [persona.id, persona.titleKey])
) as Record<WalletPersonaId, string>
