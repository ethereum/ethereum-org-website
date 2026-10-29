/**
 * Plain model for the accounts.png replacement ("An account examined"), using
 * the four fields defined on /developers/docs/accounts/: nonce, balance (in
 * wei), storageRoot and codeHash. An address leads to the account's state;
 * storageRoot is the root of the account's storage trie and codeHash the
 * hash of its EVM code. The drawing, readout and captions all read from
 * `getAccountsView`.
 *
 * Example values:
 * - EOA: the address is the page's own example (account creation section).
 *   Its storage is empty, so storageRoot is the empty trie root, and it has
 *   no code, so codeHash is keccak256 of empty input ("the hash of an empty
 *   string" on the page). Both constants are fixed by the protocol
 *   (Yellow Paper, Appendix D and section 4.1). EIP-7702 delegated EOAs
 *   carry code; the page and this figure describe the plain case.
 * - Contract: a made-up address and hashes. Its nonce is 1: since EIP-161 a
 *   contract account's nonce starts at 1, and it rises with each contract the
 *   account creates.
 */

/** viewBox of the drawing. */
export const ACCOUNTS_SIZE = { width: 420, height: 300 }

export const GWEI_PER_ETH = 1_000_000_000
export const WEI_PER_GWEI = 1_000_000_000

/** Sizes quoted in the definitions (from the page text). */
export const ADDRESS_BYTES = 20
export const ADDRESS_HEX_CHARS = 40
export const STORAGE_BITS = 256
/** EIP-161: a new contract account's nonce. */
export const CONTRACT_START_NONCE = 1

/** Empty trie root: keccak256(rlp("")). */
export const EMPTY_TRIE_ROOT =
  "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
/** keccak256 of empty input. */
export const EMPTY_CODE_HASH =
  "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"

export const ACCOUNTS_PRESET_IDS = ["eoa", "contract"] as const
export type AccountsPresetId = (typeof ACCOUNTS_PRESET_IDS)[number]

export interface AccountsPreset {
  address: string
  nonce: number
  /** Whole gwei, so the wei amount is exact (gwei × 10^9). */
  balanceGwei: number
  storageRoot: string
  codeHash: string
  /** Share of the storage tank shown full, 0-1 (0 = empty storage). */
  storageLevel: number
  hasCode: boolean
}

export const ACCOUNTS_PRESETS: Record<AccountsPresetId, AccountsPreset> = {
  eoa: {
    address: "0x5e97870f263700f46aa00d967821199b9bc5a120",
    nonce: 12,
    balanceGwei: 1_500_000_000,
    storageRoot: EMPTY_TRIE_ROOT,
    codeHash: EMPTY_CODE_HASH,
    storageLevel: 0,
    hasCode: false,
  },
  contract: {
    address: "0xf1a0d7c10a2f2e5569d9e270da97e00d9e7a4295",
    nonce: CONTRACT_START_NONCE,
    balanceGwei: 2_750_000_000,
    storageRoot:
      "0x0d4fa93a9591ff72d9d33710081de39ae28f74fcaa49cb4a897b44e7428ac74a",
    codeHash:
      "0x4bdee2d2bbe09eb20e903443ecdb7418d5fe24854533205650195ffdd52c9fea",
    storageLevel: 0.6,
    hasCode: true,
  },
}

export const ACCOUNTS_STEPS = [
  "idle",
  "address",
  "state",
  "storage",
  "code",
] as const
export type AccountsStep = (typeof ACCOUNTS_STEPS)[number]
export const ACCOUNTS_LAST_STEP = ACCOUNTS_STEPS.length - 1

/** The account state's four fields, in the page's order (top slab first). */
export const ACCOUNT_FIELDS = [
  "nonce",
  "balance",
  "storageRoot",
  "codeHash",
] as const
export type AccountField = (typeof ACCOUNT_FIELDS)[number]

/** Parts of the drawing, every one labelled. */
export const ACCOUNTS_PARTS = [
  "deck",
  "address",
  "state",
  "storageRoot",
  "codeHash",
  "storage",
  "code",
] as const
export type AccountsPart = (typeof ACCOUNTS_PARTS)[number]

export interface AccountsView {
  presetId: AccountsPresetId
  preset: AccountsPreset
  step: number
  motion: AccountsStep
  /** Fields examined in this step: their slabs light. */
  activeFields: AccountField[]
  /** Fields examined so far: their readout rows show values. */
  shownFields: AccountField[]
  addressShown: boolean
  litPart: AccountsPart | null
  captionKey: string
}

const ACTIVE_FIELDS: Record<AccountsStep, AccountField[]> = {
  idle: [],
  address: [],
  state: ["nonce", "balance"],
  storage: ["storageRoot"],
  code: ["codeHash"],
}

/** Captions that differ between an EOA and a contract account. */
const PER_PRESET: AccountsStep[] = ["address", "state", "storage", "code"]

export const accountsCaptionKey = (
  presetId: AccountsPresetId,
  motion: AccountsStep
) =>
  PER_PRESET.includes(motion)
    ? `accounts-step-${motion}-${presetId}`
    : `accounts-step-${motion}`

export const getAccountsView = (
  presetId: AccountsPresetId,
  requestedStep: number
): AccountsView => {
  const step = Math.min(Math.max(requestedStep, 0), ACCOUNTS_LAST_STEP)
  const motion = ACCOUNTS_STEPS[step]

  return {
    presetId,
    preset: ACCOUNTS_PRESETS[presetId],
    step,
    motion,
    activeFields: ACTIVE_FIELDS[motion],
    shownFields: ACCOUNTS_STEPS.slice(1, step + 1).flatMap(
      (s) => ACTIVE_FIELDS[s]
    ),
    addressShown: step >= 1,
    litPart: (
      {
        idle: null,
        address: "address",
        state: "state",
        storage: "storage",
        code: "code",
      } as const
    )[motion],
    captionKey: accountsCaptionKey(presetId, motion),
  }
}
