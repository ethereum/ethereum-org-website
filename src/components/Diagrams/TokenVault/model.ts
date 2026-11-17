/**
 * Plain model for the tokenized vault figures, which replace
 * standards/tokens/erc-4626/map-of-erc-4626.png and the three ERC-7540 SVGs
 * (erc-4626-sync-flow, erc-7540-async-flow, request-lifecycle). One drawing:
 * an investor account and a vault contract holding the underlying asset
 * (a tank) and its share supply (a stack); the async figures add the
 * vault's request tray and the strategy it puts assets to work in.
 *
 * Sources (checked November 2026; both EIPs Final):
 * - EIP-4626: https://eips.ethereum.org/EIPS/eip-4626. max* take the
 *   receiver or owner and never revert; preview* include fees and don't
 *   depend on the caller; convertTo* exclude fees and MUST round down;
 *   deposit/mint emit Deposit, withdraw/redeem emit Withdraw. Rounding
 *   guidance (SHOULD): round in the vault's favor, so previewDeposit and
 *   previewRedeem round down, previewMint and previewWithdraw round up.
 * - EIP-7540: https://eips.ethereum.org/EIPS/eip-7540. requestDeposit
 *   transfers the assets in; requestRedeem takes control of the shares.
 *   Pending to Claimable is up to the vault (it MAY skip Pending, MUST NOT
 *   skip Claimable) and the spec defines no event for it. The claim is a
 *   separate call to deposit/mint or redeem/withdraw, which no longer move
 *   the assets or shares the request already moved. The exchange rate is
 *   up to the vault; the figures price at fulfillment, the usual choice.
 *
 * The example is a vault with no fees holding 1,050 assets for 1,000 shares
 * (1.05 assets a share, after some yield), capped at 5,000 assets; the
 * investor already holds 200 shares. Fulfillment happens at 1.06.
 */

/* ---------- Figures and parts ---------- */

export const VAULT_FIGURES = [
  "interface",
  "sync",
  "async",
  "lifecycle",
] as const
export type VaultFigure = (typeof VAULT_FIGURES)[number]

/** Every drawn part; ids match the rig's `data-part` and the label spots. */
export const VAULT_PARTS = [
  "investor",
  "vault",
  "assets",
  "shares",
  "limit",
  "rate",
  "pending",
  "claimable",
  "strategy",
] as const
export type VaultPart = (typeof VAULT_PARTS)[number]

/** The parts each figure draws. */
export const VAULT_FIGURE_PARTS: Record<VaultFigure, readonly VaultPart[]> = {
  interface: ["investor", "vault", "assets", "shares", "limit", "rate"],
  sync: ["investor", "vault", "assets", "shares"],
  async: [
    "investor",
    "vault",
    "assets",
    "shares",
    "pending",
    "claimable",
    "strategy",
  ],
  lifecycle: ["investor", "vault", "assets", "shares", "pending", "claimable"],
}

/** viewBox of each figure's drawing. */
export const VAULT_SIZE: Record<
  VaultFigure,
  { width: number; height: number }
> = {
  interface: { width: 400, height: 262 },
  sync: { width: 380, height: 250 },
  async: { width: 420, height: 314 },
  lifecycle: { width: 380, height: 290 },
}

/** Pipes: assets and shares between investor and vault, assets to the strategy. */
export const VAULT_LINKS = ["assets", "shares", "strategy"] as const
export type VaultLink = (typeof VAULT_LINKS)[number]
/** Forward runs away from the investor (toward the vault, then the strategy). */
export type VaultFlow = "forward" | "back"

export type VaultUnit = "assets" | "shares"
export interface VaultAmount {
  value: number
  unit: VaultUnit
}

/* ---------- The example vault ---------- */

const TOTAL_ASSETS = 1_050
const TOTAL_SUPPLY = 1_000
const DEPOSIT_CAP = 5_000
const INVESTOR_SHARES = 200
/** The example amounts: 100 assets in or out, or 95 shares. */
const ASSETS_IN = 100
const SHARES_IN = 95
/** Total assets per 1,000 shares when the vault fulfills a request. */
const FULFILLED_ASSETS = 1_060

/** The example's numbers, for the figures' descriptions. */
export const VAULT_EXAMPLE = {
  totalAssets: TOTAL_ASSETS,
  totalSupply: TOTAL_SUPPLY,
  rate: TOTAL_ASSETS / TOTAL_SUPPLY,
}

const mulDiv = (a: number, b: number, c: number, up = false) =>
  up ? Math.ceil((a * b) / c) : Math.floor((a * b) / c)

/** Tank level for a vault holding `assets`: the example sits mid-tank. */
const tankLevel = (assets: number) =>
  Math.round(Math.min(assets / 1_600, 1) * 100) / 100

/* ---------- ERC-4626 interface ---------- */

export const INTERFACE_PRESET_IDS = [
  "deposit",
  "mint",
  "withdraw",
  "redeem",
] as const
export type InterfacePresetId = (typeof INTERFACE_PRESET_IDS)[number]

export const INTERFACE_STEPS = [
  "idle",
  "limit",
  "quote",
  "call",
  "convert",
] as const
export type InterfaceStep = (typeof INTERFACE_STEPS)[number]
export const INTERFACE_LAST_STEP = INTERFACE_STEPS.length - 1

/** Function names per preset and step: code, never translated. */
export const INTERFACE_FUNCTIONS: Record<
  InterfacePresetId,
  Record<Exclude<InterfaceStep, "idle">, string>
> = {
  deposit: {
    limit: "maxDeposit",
    quote: "previewDeposit",
    call: "deposit",
    convert: "convertToShares",
  },
  mint: {
    limit: "maxMint",
    quote: "previewMint",
    call: "mint",
    convert: "convertToAssets",
  },
  withdraw: {
    limit: "maxWithdraw",
    quote: "previewWithdraw",
    call: "withdraw",
    convert: "convertToShares",
  },
  redeem: {
    limit: "maxRedeem",
    quote: "previewRedeem",
    call: "redeem",
    convert: "convertToAssets",
  },
}

/** Whether the preset puts tokens into the vault (deposit, mint) or takes them out. */
const INTO_VAULT: Record<InterfacePresetId, boolean> = {
  deposit: true,
  mint: true,
  withdraw: false,
  redeem: false,
}

/** The amount the reader asks for: assets for deposit and withdraw, shares otherwise. */
export const interfaceInput = (presetId: InterfacePresetId): VaultAmount =>
  presetId === "deposit" || presetId === "withdraw"
    ? { value: ASSETS_IN, unit: "assets" }
    : { value: SHARES_IN, unit: "shares" }

interface InterfaceNumbers {
  limit: VaultAmount
  /** What preview returns, and so what the call returns (no fees, same block). */
  quote: VaultAmount
  totalAssets: { before: number; after: number }
  convert: VaultAmount
}

const getInterfaceNumbers = (presetId: InterfacePresetId): InterfaceNumbers => {
  const input = interfaceInput(presetId)
  const shares = (assets: number, up = false) =>
    mulDiv(assets, TOTAL_SUPPLY, TOTAL_ASSETS, up)
  const assets = (s: number, up = false) =>
    mulDiv(s, TOTAL_ASSETS, TOTAL_SUPPLY, up)
  // Limits: the cap's headroom going in, the investor's balance going out.
  const room = DEPOSIT_CAP - TOTAL_ASSETS
  const limit: Record<InterfacePresetId, VaultAmount> = {
    deposit: { value: room, unit: "assets" },
    mint: { value: shares(room), unit: "shares" },
    withdraw: { value: assets(INVESTOR_SHARES), unit: "assets" },
    redeem: { value: INVESTOR_SHARES, unit: "shares" },
  }
  // Previews round in the vault's favor.
  const quote: Record<InterfacePresetId, VaultAmount> = {
    deposit: { value: shares(input.value), unit: "shares" },
    mint: { value: assets(input.value, true), unit: "assets" },
    withdraw: { value: shares(input.value, true), unit: "shares" },
    redeem: { value: assets(input.value), unit: "assets" },
  }
  const q = quote[presetId].value
  const [assetsMoved, sharesMoved] =
    input.unit === "assets" ? [input.value, q] : [q, input.value]
  const sign = INTO_VAULT[presetId] ? 1 : -1
  const afterAssets = TOTAL_ASSETS + sign * assetsMoved
  const afterSupply = TOTAL_SUPPLY + sign * sharesMoved
  // convertTo* always round down, at the rate after the call.
  const convert: VaultAmount =
    input.unit === "assets"
      ? {
          value: mulDiv(input.value, afterSupply, afterAssets),
          unit: "shares",
        }
      : {
          value: mulDiv(input.value, afterAssets, afterSupply),
          unit: "assets",
        }
  return {
    limit: limit[presetId],
    quote: quote[presetId],
    totalAssets: { before: TOTAL_ASSETS, after: afterAssets },
    convert,
  }
}

/* ---------- Shared view ---------- */

export type RequestState = "pending" | "claimable" | "claimed"

/** Everything the rig draws for one figure, preset and step. */
export interface VaultRigView {
  figure: VaultFigure
  step: number
  /** Restarts one-shot motion when it changes. */
  motion: string
  flows: Partial<Record<VaultLink, VaultFlow>>
  /** Two flows in one step run one after the other. */
  secondFlow?: VaultLink
  litPart: VaultPart | null
  /** Tank level, 0-1. */
  level: number
  /** The share stack gains a layer (minted) or loses one (burned). */
  supply: "minted" | "burned" | null
  /** Where the request sits, if there is one. */
  request: RequestState | null
}

const at = <S extends string>(steps: readonly S[], step: S) =>
  steps.indexOf(step)

const clampStep = (step: number, last: number) =>
  Math.min(Math.max(step, 0), last)

/* ---------- ERC-4626 interface view ---------- */

export type FunctionScope = "account" | "global"
export type FunctionRule = "no-revert" | "preview" | "event" | "convert"

const INTERFACE_SCOPE: Record<Exclude<InterfaceStep, "idle">, FunctionScope> = {
  limit: "account",
  quote: "global",
  call: "account",
  convert: "global",
}
const INTERFACE_RULE: Record<Exclude<InterfaceStep, "idle">, FunctionRule> = {
  limit: "no-revert",
  quote: "preview",
  call: "event",
  convert: "convert",
}
const INTERFACE_LIT: Record<InterfaceStep, VaultPart | null> = {
  idle: null,
  limit: "limit",
  quote: "rate",
  call: "vault",
  convert: "rate",
}

export interface InterfaceView extends VaultRigView {
  stepId: InterfaceStep
  /** Caption key: the step, with the preset where the words differ. */
  key: string
  input: VaultAmount
  fn: string | null
  scope: FunctionScope | null
  rule: FunctionRule | null
  /** The event the call emits: Deposit or Withdraw (code). */
  event: string
  returns: VaultAmount | null
  totalAssets: number
  numbers: InterfaceNumbers
}

export const getInterfaceView = (
  presetId: InterfacePresetId,
  requestedStep: number
): InterfaceView => {
  const step = clampStep(requestedStep, INTERFACE_LAST_STEP)
  const stepId = INTERFACE_STEPS[step]
  const numbers = getInterfaceNumbers(presetId)
  const into = INTO_VAULT[presetId]
  const called = step >= at(INTERFACE_STEPS, "call")
  const returns =
    stepId === "limit"
      ? numbers.limit
      : stepId === "quote" || stepId === "call"
        ? numbers.quote
        : stepId === "convert"
          ? numbers.convert
          : null
  return {
    figure: "interface",
    step,
    stepId,
    motion: `${presetId}-${stepId}`,
    key:
      stepId === "idle" || stepId === "convert"
        ? stepId
        : `${stepId}-${presetId}`,
    flows:
      stepId === "call"
        ? into
          ? { assets: "forward", shares: "back" }
          : { shares: "forward", assets: "back" }
        : {},
    secondFlow: stepId === "call" ? (into ? "shares" : "assets") : undefined,
    litPart: INTERFACE_LIT[stepId],
    level: tankLevel(
      called ? numbers.totalAssets.after : numbers.totalAssets.before
    ),
    supply: called ? (into ? "minted" : "burned") : null,
    request: null,
    input: interfaceInput(presetId),
    fn: stepId === "idle" ? null : INTERFACE_FUNCTIONS[presetId][stepId],
    scope: stepId === "idle" ? null : INTERFACE_SCOPE[stepId],
    rule: stepId === "idle" ? null : INTERFACE_RULE[stepId],
    event: into ? "Deposit" : "Withdraw",
    returns,
    totalAssets: called
      ? numbers.totalAssets.after
      : numbers.totalAssets.before,
    numbers,
  }
}

/* ---------- ERC-4626 synchronous deposit ---------- */

export const SYNC_STEPS = ["idle", "call", "assets", "shares"] as const
export type SyncStep = (typeof SYNC_STEPS)[number]
export const SYNC_LAST_STEP = SYNC_STEPS.length - 1

const SYNC_LIT: Record<SyncStep, VaultPart | null> = {
  idle: null,
  call: "investor",
  assets: "assets",
  shares: "shares",
}

export interface SyncView extends VaultRigView {
  stepId: SyncStep
  deposit: number
  shares: number
  /** Shares the investor has received so far. */
  received: number | null
}

export const getSyncView = (requestedStep: number): SyncView => {
  const step = clampStep(requestedStep, SYNC_LAST_STEP)
  const stepId = SYNC_STEPS[step]
  const shares = mulDiv(ASSETS_IN, TOTAL_SUPPLY, TOTAL_ASSETS)
  const filled = step >= at(SYNC_STEPS, "assets")
  const minted = step >= at(SYNC_STEPS, "shares")
  return {
    figure: "sync",
    step,
    stepId,
    motion: stepId,
    flows:
      stepId === "assets"
        ? { assets: "forward" }
        : stepId === "shares"
          ? { shares: "back" }
          : {},
    litPart: SYNC_LIT[stepId],
    level: tankLevel(TOTAL_ASSETS + (filled ? ASSETS_IN : 0)),
    supply: minted ? "minted" : null,
    request: null,
    deposit: ASSETS_IN,
    shares,
    received: minted ? shares : null,
  }
}

/* ---------- ERC-7540 asynchronous flow and request lifecycle ---------- */

export const ASYNC_PRESET_IDS = ["deposit", "redeem"] as const
export type AsyncPresetId = (typeof ASYNC_PRESET_IDS)[number]

export const ASYNC_STEPS = [
  "idle",
  "request",
  "invest",
  "fulfill",
  "claim",
] as const
export type AsyncStep = (typeof ASYNC_STEPS)[number]
export const ASYNC_LAST_STEP = ASYNC_STEPS.length - 1

export const LIFECYCLE_STEPS = ["idle", "request", "fulfill", "claim"] as const
export type LifecycleStep = (typeof LIFECYCLE_STEPS)[number]
export const LIFECYCLE_LAST_STEP = LIFECYCLE_STEPS.length - 1

/** Function names per preset: code, never translated. */
export const ASYNC_FUNCTIONS: Record<
  AsyncPresetId,
  {
    request: string
    claim: string
    pending: string
    claimable: string
    requestEvent: string
    claimEvent: string
  }
> = {
  deposit: {
    request: "requestDeposit",
    claim: "deposit",
    pending: "pendingDepositRequest",
    claimable: "claimableDepositRequest",
    requestEvent: "DepositRequest",
    claimEvent: "Deposit",
  },
  redeem: {
    request: "requestRedeem",
    claim: "redeem",
    pending: "pendingRedeemRequest",
    claimable: "claimableRedeemRequest",
    requestEvent: "RedeemRequest",
    claimEvent: "Withdraw",
  },
}

/** The request's amount, and what the investor receives at each rate. */
export const getAsyncNumbers = (presetId: AsyncPresetId) =>
  presetId === "deposit"
    ? {
        request: { value: ASSETS_IN, unit: "assets" } as VaultAmount,
        atRequest: {
          value: mulDiv(ASSETS_IN, TOTAL_SUPPLY, TOTAL_ASSETS),
          unit: "shares",
        } as VaultAmount,
        received: {
          value: mulDiv(ASSETS_IN, TOTAL_SUPPLY, FULFILLED_ASSETS),
          unit: "shares",
        } as VaultAmount,
        rateAtRequest: TOTAL_ASSETS / TOTAL_SUPPLY,
        rate: FULFILLED_ASSETS / TOTAL_SUPPLY,
      }
    : {
        request: { value: SHARES_IN, unit: "shares" } as VaultAmount,
        atRequest: {
          value: mulDiv(SHARES_IN, TOTAL_ASSETS, TOTAL_SUPPLY),
          unit: "assets",
        } as VaultAmount,
        received: {
          value: mulDiv(SHARES_IN, FULFILLED_ASSETS, TOTAL_SUPPLY),
          unit: "assets",
        } as VaultAmount,
        rateAtRequest: TOTAL_ASSETS / TOTAL_SUPPLY,
        rate: FULFILLED_ASSETS / TOTAL_SUPPLY,
      }

export interface AsyncView extends VaultRigView {
  stepId: AsyncStep
  key: string
  fn: string | null
  /** Transactions the investor has sent: one to request, one to claim. */
  transactions: number
  /** What the investor receives, once the vault has priced the request. */
  received: VaultAmount | null
  /** Amounts the vault's view functions return for this request. */
  pending: VaultAmount | null
  claimable: VaultAmount | null
}

const zero = (unit: VaultUnit): VaultAmount => ({ value: 0, unit })

const ASYNC_LIT: Record<AsyncStep, VaultPart | null> = {
  idle: null,
  request: "pending",
  invest: "strategy",
  fulfill: "claimable",
  claim: "investor",
}

/**
 * The async flow (`figure: "async"`, with the strategy step) or the request
 * lifecycle (`figure: "lifecycle"`, without it): same request, same numbers.
 */
export const getAsyncView = (
  figure: "async" | "lifecycle",
  presetId: AsyncPresetId,
  requestedStep: number
): AsyncView => {
  const steps: readonly AsyncStep[] =
    figure === "async" ? ASYNC_STEPS : LIFECYCLE_STEPS
  const step = clampStep(requestedStep, steps.length - 1)
  const stepId = steps[step]
  const reached = (s: AsyncStep) =>
    steps.includes(s) && step >= steps.indexOf(s)
  const deposit = presetId === "deposit"
  const numbers = getAsyncNumbers(presetId)
  const fns = ASYNC_FUNCTIONS[presetId]
  const requested = reached("request")
  const fulfilled = reached("fulfill")
  const claimed = reached("claim")

  // Assets in the vault: a deposit request adds them, the strategy then takes
  // them; for a redemption the strategy returns them and the claim pays out.
  let assets = TOTAL_ASSETS
  if (deposit) {
    if (requested) assets += numbers.request.value
    if (reached("invest")) assets -= numbers.request.value
  } else {
    if (reached("invest")) assets += numbers.received.value
    if (claimed) assets -= numbers.received.value
  }

  const flows: VaultRigView["flows"] =
    stepId === "request"
      ? deposit
        ? { assets: "forward" }
        : { shares: "forward" }
      : stepId === "invest"
        ? { strategy: deposit ? "forward" : "back" }
        : stepId === "claim"
          ? deposit
            ? { shares: "back" }
            : { assets: "back" }
          : {}
  const request: RequestState | null = claimed
    ? "claimed"
    : fulfilled
      ? "claimable"
      : requested
        ? "pending"
        : null

  return {
    figure,
    step,
    stepId,
    motion: `${presetId}-${stepId}`,
    key:
      figure === "lifecycle" || stepId === "idle"
        ? stepId
        : `${stepId}-${presetId}`,
    flows,
    litPart: ASYNC_LIT[stepId],
    level: tankLevel(assets),
    supply: null,
    request,
    fn:
      stepId === "request"
        ? fns.request
        : stepId === "claim"
          ? fns.claim
          : null,
    transactions: (requested ? 1 : 0) + (claimed ? 1 : 0),
    received: fulfilled ? numbers.received : null,
    pending:
      request === null
        ? null
        : request === "pending"
          ? numbers.request
          : zero(numbers.request.unit),
    claimable:
      request === null
        ? null
        : request === "claimable"
          ? numbers.request
          : zero(numbers.request.unit),
  }
}
