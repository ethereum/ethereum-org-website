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
 * has ALL of that persona's feature flags (AND semantics). The `id` is the URL
 * slug used for persona pages (`/wallets/find-wallet/personas/[persona]`) —
 * deliberately `hardware`, never the internal `hodler` key.
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
    heroTitleKey: "page-find-wallet-new-to-crypto-hero-title",
    heroDescKey: "page-find-wallet-new-to-crypto-hero-description",
  },
  {
    id: "developer",
    features: DEVELOPER_FEATURES,
    titleKey: "page-find-wallet-developer-title",
    descKey: "page-find-wallet-developer-desc",
    heroTitleKey: "page-find-wallet-developer-hero-title",
    heroDescKey: "page-find-wallet-developer-hero-description",
  },
  {
    id: "finance",
    features: FINANCE_FEATURES,
    titleKey: "page-find-wallet-finance-title",
    descKey: "page-find-wallet-finance-desc",
    heroTitleKey: "page-find-wallet-finance-hero-title",
    heroDescKey: "page-find-wallet-finance-hero-description",
  },
  {
    id: "hardware",
    features: LONG_TERM_FEATURES,
    titleKey: "page-find-wallet-hodler-title",
    descKey: "page-find-wallet-hodler-desc",
    heroTitleKey: "page-find-wallet-hardware-hero-title",
    heroDescKey: "page-find-wallet-hardware-hero-description",
  },
  {
    id: "nfts",
    features: NFTS_FEATURES,
    titleKey: "page-find-wallet-nfts-title",
    descKey: "page-find-wallet-nfts-desc",
    heroTitleKey: "page-find-wallet-nfts-hero-title",
    heroDescKey: "page-find-wallet-nfts-hero-description",
  },
] as const

export type WalletPersonaId = (typeof WALLET_PERSONAS)[number]["id"]

/** `Tag` status variants used for wallet-card persona chips (see `src/components/ui/tag`). */
export type PersonaTagStatus =
  | "primary"
  | "accent-a"
  | "accent-b"
  | "accent-c"
  | "tag-yellow"

/**
 * Per-persona chip color for the wallet cards, mapped onto theme-aware semantic
 * tokens. Keep in sync with the `PERSONA_COLORS` map in `WalletPersonaCards` so
 * a persona's chip matches its card.
 */
export const PERSONA_TAG_STATUS: Record<WalletPersonaId, PersonaTagStatus> = {
  "new-to-crypto": "primary",
  developer: "accent-b",
  finance: "accent-c",
  hardware: "accent-a",
  nfts: "tag-yellow",
}

export const WALLET_PERSONA_IDS = WALLET_PERSONAS.map(
  (persona) => persona.id
) as WalletPersonaId[]

export const isWalletPersonaId = (value: string): value is WalletPersonaId =>
  WALLET_PERSONA_IDS.includes(value as WalletPersonaId)

/** Translation key for a persona's display title, keyed by persona id. */
export const PERSONA_TITLE_KEYS = Object.fromEntries(
  WALLET_PERSONAS.map((persona) => [persona.id, persona.titleKey])
) as Record<WalletPersonaId, string>

/**
 * Localized display title per persona id, built on the server so client
 * components (e.g. the card persona chips) get plain strings as props.
 */
export function buildPersonaLabels(
  t: (key: string) => string
): Record<WalletPersonaId, string> {
  return Object.fromEntries(
    WALLET_PERSONAS.map((persona) => [persona.id, t(persona.titleKey)])
  ) as Record<WalletPersonaId, string>
}
