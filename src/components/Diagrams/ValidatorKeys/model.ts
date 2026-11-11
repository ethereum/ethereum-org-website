/**
 * Plain model for the validator key diagrams on
 * /developers/docs/consensus-mechanisms/pos/keys/: one rig (a source at the
 * back, three validators at the front, each carrying a signing key and a
 * withdrawal key) and two figures on it.
 *
 * - `ValidatorKeysDiagram` replaces validator-key-schematic.png: one wallet
 *   stakes 96 ETH, as three 32 ETH validators (0x00, 0x01) or one 0x02
 *   validator, each with its own keys, separate from the wallet's key. The
 *   withdrawal address is its own account: it can be the wallet or any
 *   other address.
 * - `KeyDerivationDiagram` replaces multiple-keys.png: one mnemonic derives
 *   every validator's withdrawal and signing keys.
 *
 * Sources (checked November 2026, after Pectra and Fusaka):
 * - Deposits go to the staking deposit contract; the deposit data carries the
 *   validator's BLS public key, withdrawal credentials, amount and signature
 *   (consensus-specs phase0 `DepositData`). Since Electra the beacon chain
 *   reads deposits from execution requests (EIP-6110), not eth1 voting.
 * - MIN_ACTIVATION_BALANCE = 32 ETH; MAX_EFFECTIVE_BALANCE_ELECTRA = 2048 ETH
 *   (consensus-specs electra/beacon-chain.md, EIP-7251).
 * - Withdrawal credentials' first byte: 0x00 BLS (a hash of the withdrawal
 *   public key, no withdrawals until changed), 0x01 execution address
 *   (balance above 32 ETH swept), 0x02 compounding (EIP-7251, swept only
 *   above 2048 ETH). A 0x00 validator changes to 0x01 with a
 *   `BLSToExecutionChange` signed by its withdrawal key and sent to the
 *   beacon chain (capella), not to the address. 0x01 and 0x02 validators
 *   have no BLS withdrawal key: since Pectra the withdrawal address's key
 *   requests exits (EIP-7002; partial withdrawals only for 0x02) and
 *   consolidations (EIP-7251).
 *   /developers/docs/consensus-mechanisms/pos/withdrawal-credentials/.
 * - Derivation paths (EIP-2334): withdrawal key m/12381/3600/i/0, signing key
 *   m/12381/3600/i/0/0, i the validator's index. Derivation is hardened only
 *   (EIP-2333), so a child key doesn't reveal its parent.
 *
 * The rig draws only from `ValidatorKeysRigView`, so a figure is a step list
 * here, not a new drawing.
 */

/** viewBox of the drawing. */
export const VALIDATOR_KEYS_SIZE = { width: 480, height: 300 }

/** Validators drawn: one deposit, one key pair each. */
export const VALIDATOR_COUNT = 3

/** Validator rows on the rig: all three, or the middle one alone. */
export const ALL_ROWS = [0, 1, 2] as const
const SINGLE_ROW = [1] as const

/** ETH per deposit: the activation balance (MIN_ACTIVATION_BALANCE). */
export const DEPOSIT_ETH = 32

/** The staker's whole stake: three activation balances. */
export const STAKE_ETH = VALIDATOR_COUNT * DEPOSIT_ETH

/** Effective balance cap for 0x02 credentials (EIP-7251). */
export const MAX_EFFECTIVE_BALANCE_ETH = 2048

/** EIP-2334 paths; `i` is the validator's index. Code, never translated. */
export const WITHDRAWAL_PATH = "m/12381/3600/i/0"
export const SIGNING_PATH = "m/12381/3600/i/0/0"

/** Every drawn part; ids match the rig's `data-part` and the label spots. */
export const VALIDATOR_KEYS_PARTS = [
  "wallet",
  "mnemonic",
  "master",
  "contract",
  "paths",
  "validators",
  "signing",
  "withdrawal",
  "payout",
  "balance",
] as const
export type ValidatorKeysPart = (typeof VALIDATOR_KEYS_PARTS)[number]

/** Which flow runs in a step. */
export type ValidatorKeysFlow =
  | "deposit"
  | "activate"
  | "payout"
  | "derive"
  | null

export type ValidatorKeysFigure = "deposit" | "derive"

/** Everything the rig draws. */
export interface ValidatorKeysRigView {
  figure: ValidatorKeysFigure
  step: number
  /** The step's motion, for one-shot pops. */
  motion: string
  /** The deposit figure draws the wallet, contract and withdrawal address. */
  source: "wallet" | "mnemonic"
  /** Validator rows drawn: 0x02 consolidates the stake into one. */
  rows: readonly number[]
  /** Validators drawn at full strength (dimmed until activated). */
  validatorsActive: boolean
  signingShown: boolean
  withdrawalShown: boolean
  /** Signed messages pop on the signing keys. */
  slipsShown: boolean
  /** A signed BLSToExecutionChange pops on the withdrawal keys. */
  changeShown: boolean
  /** Derivation figure: the master key m, and the paths out of it. */
  masterShown: boolean
  pathsShown: boolean
  /** Compounding: rewards stack up on each validator's balance. */
  balanceShown: boolean
  /** The withdrawal address link: not drawn (no address yet) or set. */
  link: "none" | "set"
  flow: ValidatorKeysFlow
  litPart: ValidatorKeysPart | null
}

/* ---------- Figure 1: one wallet, three validators ---------- */

export const CREDENTIAL_PRESET_IDS = ["bls", "address", "compounding"] as const
export type CredentialPresetId = (typeof CREDENTIAL_PRESET_IDS)[number]

/** First byte of the withdrawal credentials. Code, never translated. */
export const CREDENTIAL_PREFIX: Record<CredentialPresetId, string> = {
  bls: "0x00",
  address: "0x01",
  compounding: "0x02",
}

export const VALIDATOR_KEYS_STEPS = [
  "idle",
  "deposit",
  "activate",
  "sign",
  "withdraw",
] as const
export const VALIDATOR_KEYS_LAST_STEP = VALIDATOR_KEYS_STEPS.length - 1

export interface ValidatorKeysView extends ValidatorKeysRigView {
  preset: CredentialPresetId
  /** Validators (and deposits) in this scenario. */
  count: number
  deposits: number
  stakedEth: number
  active: number
  /** Withdrawal credentials' prefix after this step. */
  credentials: string
  /** The step's caption and status keys, minus the `-step-`/`-status-` part. */
  key: string
}

export const getValidatorKeysView = (
  preset: CredentialPresetId,
  requestedStep: number
): ValidatorKeysView => {
  const step = Math.min(Math.max(requestedStep, 0), VALIDATOR_KEYS_LAST_STEP)
  const motion = VALIDATOR_KEYS_STEPS[step]
  const withdraw = motion === "withdraw"
  // One 0x02 validator holds up to 2048 ETH, so the stake isn't split.
  const count = preset === "compounding" ? 1 : VALIDATOR_COUNT
  const deposits = step >= 1 ? count : 0
  const changed = withdraw && preset === "bls"

  return {
    figure: "deposit",
    preset,
    step,
    motion,
    source: "wallet",
    rows: count === 1 ? SINGLE_ROW : ALL_ROWS,
    validatorsActive: step >= 2,
    signingShown: true,
    // Only 0x00 credentials hash a BLS withdrawal key.
    withdrawalShown: preset === "bls",
    slipsShown: motion === "sign",
    changeShown: changed,
    masterShown: false,
    pathsShown: false,
    balanceShown: withdraw && preset === "compounding",
    // 0x00 sets no address until the change; 0x01 and 0x02 set it at deposit.
    link: preset === "bls" && !changed ? "none" : "set",
    flow: withdraw
      ? ({ bls: null, address: "payout", compounding: null } as const)[preset]
      : (
          {
            idle: null,
            deposit: "deposit",
            activate: "activate",
            sign: null,
          } as const
        )[motion],
    litPart: withdraw
      ? (
          {
            bls: "withdrawal",
            address: "payout",
            compounding: "balance",
          } as const
        )[preset]
      : (
          {
            idle: null,
            deposit: "contract",
            activate: "validators",
            sign: "signing",
          } as const
        )[motion],
    count,
    deposits,
    stakedEth: step >= 1 ? STAKE_ETH : 0,
    active: step >= 2 ? count : 0,
    credentials: changed
      ? CREDENTIAL_PREFIX.address
      : CREDENTIAL_PREFIX[preset],
    key: withdraw
      ? `withdraw-${preset}`
      : motion === "deposit" && preset === "compounding"
        ? "deposit-compounding"
        : motion,
  }
}

/* ---------- Figure 2: keys from one mnemonic ---------- */

export const KEY_DERIVATION_STEPS = [
  "idle",
  "seed",
  "withdrawal",
  "signing",
  "validators",
] as const
export const KEY_DERIVATION_LAST_STEP = KEY_DERIVATION_STEPS.length - 1

export interface KeyDerivationView extends ValidatorKeysRigView {
  withdrawalKeys: number
  signingKeys: number
  /** Paths reached so far, or null. */
  withdrawalPath: string | null
  signingPath: string | null
  key: string
}

export const getKeyDerivationView = (
  requestedStep: number
): KeyDerivationView => {
  const step = Math.min(Math.max(requestedStep, 0), KEY_DERIVATION_LAST_STEP)
  const motion = KEY_DERIVATION_STEPS[step]
  const withdrawalShown = step >= 2
  const signingShown = step >= 3

  return {
    figure: "derive",
    step,
    motion,
    source: "mnemonic",
    rows: ALL_ROWS,
    validatorsActive: true,
    signingShown,
    withdrawalShown,
    slipsShown: false,
    changeShown: false,
    masterShown: step >= 1,
    pathsShown: step >= 2,
    balanceShown: false,
    link: "none",
    flow: motion === "withdrawal" ? "derive" : null,
    litPart: (
      {
        idle: null,
        seed: "master",
        withdrawal: "withdrawal",
        signing: "signing",
        validators: "validators",
      } as const
    )[motion],
    withdrawalKeys: withdrawalShown ? VALIDATOR_COUNT : 0,
    signingKeys: signingShown ? VALIDATOR_COUNT : 0,
    withdrawalPath: withdrawalShown ? WITHDRAWAL_PATH : null,
    signingPath: signingShown ? SIGNING_PATH : null,
    key: motion,
  }
}
