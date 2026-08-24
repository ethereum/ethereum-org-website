import {
  DEVELOPER_FEATURES,
  FINANCE_FEATURES,
  LONG_TERM_FEATURES,
  NEW_TO_CRYPTO_FEATURES,
  NFTS_FEATURES,
} from "@/lib/constants"

/**
 * `id` is the URL slug for `/wallets/find-wallet/personas/[persona]`, so the
 * long-term-storage persona is `hardware` even though its keys say `hodler`.
 * Keep this module dependency-free — client components import it.
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

/** Subset of `Tag` statuses (see `src/components/ui/tag`). */
export type PersonaTagStatus =
  | "primary"
  | "accent-a"
  | "accent-b"
  | "accent-c"
  | "tag-yellow"

type PersonaStyle = {
  /** `Tag` status for the chip on wallet cards. */
  tag: PersonaTagStatus
  text: string
  border: string
  bgTint: string
}

/**
 * Chip and card colors in one place so they cannot desync. Keyed by id, not
 * array position, so reordering `WALLET_PERSONAS` is safe. Class strings must
 * stay literal for Tailwind's scanner.
 */
export const PERSONA_STYLES: Record<WalletPersonaId, PersonaStyle> = {
  "new-to-crypto": {
    tag: "primary",
    text: "text-primary",
    border: "border-primary",
    bgTint: "bg-primary/10",
  },
  developer: {
    tag: "accent-b",
    text: "text-accent-b",
    border: "border-accent-b",
    bgTint: "bg-accent-b/10",
  },
  finance: {
    tag: "accent-c",
    text: "text-accent-c",
    border: "border-accent-c",
    bgTint: "bg-accent-c/10",
  },
  hardware: {
    tag: "accent-a",
    text: "text-accent-a",
    border: "border-accent-a",
    bgTint: "bg-accent-a/10",
  },
  // No accent-d token exists, so nfts rides the warning/yellow family.
  nfts: {
    tag: "tag-yellow",
    text: "text-warning-dark dark:text-yellow-500",
    border: "border-warning-dark dark:border-yellow-500",
    bgTint: "bg-warning-dark/10 dark:bg-yellow-500/10",
  },
}

export const WALLET_PERSONA_IDS = WALLET_PERSONAS.map(
  (persona) => persona.id
) as WalletPersonaId[]

export const isWalletPersonaId = (value: string): value is WalletPersonaId =>
  WALLET_PERSONA_IDS.includes(value as WalletPersonaId)

export const PERSONA_TITLE_KEYS = Object.fromEntries(
  WALLET_PERSONAS.map((persona) => [persona.id, persona.titleKey])
) as Record<WalletPersonaId, string>

export function buildPersonaLabels(
  t: (key: string) => string
): Record<WalletPersonaId, string> {
  return Object.fromEntries(
    WALLET_PERSONAS.map((persona) => [persona.id, t(persona.titleKey)])
  ) as Record<WalletPersonaId, string>
}
