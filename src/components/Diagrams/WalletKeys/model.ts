/**
 * Plain model for `WalletKeysDiagram` on /wallets/: a recovery phrase, the
 * private key it makes, the public key, and the address, joined by one-way
 * arrows.
 *
 * Sources (checked November 2026):
 * - BIP-39: a 12 or 24 word mnemonic becomes a 64-byte seed (PBKDF2,
 *   HMAC-SHA512). BIP-32/BIP-44: the seed makes a master key, and each
 *   account's private key is derived along m/44'/60'/0'/0/i. The private key
 *   is 32 bytes.
 * - The public key is the private key times the secp256k1 generator point:
 *   64 bytes (x and y) uncompressed. Reversing it is the elliptic-curve
 *   discrete log problem.
 * - The address is the last 20 bytes of keccak256(public key) (yellow
 *   paper, appendix F). A hash can't be reversed.
 *
 * Simplifications: a wallet derives many accounts from one phrase (a key per
 * index i); the figure shows one account, and folds seed, master key and path
 * into the one phrase-to-private-key arrow. The hex values are made up and
 * truncated.
 */

/** viewBox of the drawing. */
export const WALLET_KEYS_SIZE = { width: 480, height: 212 }

export const PHRASE_WORDS = 12
export const PRIVATE_KEY_BYTES = 32
export const PUBLIC_KEY_BYTES = 64
export const ADDRESS_BYTES = 20

/** Made-up, truncated example values. Code, never translated or formatted. */
export const EXAMPLE_VALUES = {
  "private-key": "0x8b3f…2e91",
  "public-key": "0x04c7…5ad0",
  address: "0x71ae…9c3b",
} as const

/** The chain, left to right; arrow i joins card i to card i + 1. */
export const CARDS = ["phrase", "private-key", "public-key", "address"] as const
export type WalletKeysCard = (typeof CARDS)[number]

export const ZONES = ["secret", "shareable"] as const
export type WalletKeysZone = (typeof ZONES)[number]

/** Every part; ids match the rig's `data-part` and the label spots. */
export const WALLET_KEYS_PARTS = [...CARDS, ...ZONES] as const
export type WalletKeysPart = (typeof WALLET_KEYS_PARTS)[number]

export const PRESET_IDS = ["forward", "visibility", "backward"] as const
export type WalletKeysPresetId = (typeof PRESET_IDS)[number]

export const STEPS: Record<WalletKeysPresetId, readonly string[]> = {
  forward: ["idle", "private-key", "public-key", "address"],
  visibility: ["idle", "shareable", "secret", "phrase"],
  backward: ["idle", "address", "public-key", "private-key"],
}
export const WALLET_KEYS_LAST_STEP = 3

export interface WalletKeysView {
  preset: WalletKeysPresetId
  step: number
  /** Caption and status key: `<preset>-<step name>`. */
  key: string
  litPart: WalletKeysPart | null
  /** Cards drawn solid; the rest are dashed outlines still to be made. */
  made: number
  /** Forward arrows drawn active, and the one flowing this step. */
  arrowsLit: number
  flowArrow: number | null
  /** Backward arrows tried so far (by arrow index), each blocked. */
  blocked: number[]
  zones: Record<WalletKeysZone, boolean>
}

export const getWalletKeysView = (
  preset: WalletKeysPresetId,
  requestedStep: number
): WalletKeysView => {
  const step = Math.min(Math.max(requestedStep, 0), WALLET_KEYS_LAST_STEP)
  const name = STEPS[preset][step]
  const forward = preset === "forward"
  const lit: Record<WalletKeysPresetId, (WalletKeysPart | null)[]> = {
    forward: [null, "private-key", "public-key", "address"],
    visibility: [null, "shareable", "secret", "phrase"],
    // The card the reader tries to get back to.
    backward: [null, "public-key", "private-key", "phrase"],
  }
  return {
    preset,
    step,
    key: `${preset}-${name}`,
    litPart: lit[preset][step],
    made: forward ? step + 1 : CARDS.length,
    arrowsLit: forward ? step : 0,
    flowArrow: forward && step > 0 ? step - 1 : null,
    blocked:
      preset === "backward"
        ? Array.from({ length: step }, (_, i) => CARDS.length - 2 - i)
        : [],
    zones: {
      shareable: preset === "visibility" && step >= 1,
      secret: preset === "visibility" && step >= 2,
    },
  }
}
