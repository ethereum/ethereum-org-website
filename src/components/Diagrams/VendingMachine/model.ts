/**
 * Plain model for `VendingMachineDiagram` on /smart-contracts/ ("A digital
 * vending machine"). The page's steps: choose a product, see its price, pay,
 * the machine verifies the payment, then gives you the item. The two rules
 * mirror `purchase()` in the VendingMachine example on
 * /developers/docs/smart-contracts/: `require(msg.value >= amount * 1 ether)`
 * then `require(cupcakeBalances[address(this)] >= amount)`. A failed
 * `require` reverts the whole call, so the payment goes back and the stock is
 * unchanged; the stock rule is never reached if the payment rule fails. The
 * contract keeps any overpayment, so the scenarios pay exactly or too little.
 * The contract charges 1 ether; the figure's price is illustrative and small.
 */

/** viewBox of the machine drawing. */
export const VENDING_MACHINE_SIZE = { width: 320, height: 300 }

/** Amounts in millionths of an ETH, so readout count-ups stay whole numbers. */
export const MICRO_PER_ETH = 1_000_000
/** One cupcake per purchase, at 0.001 ETH each. */
export const PRICE = 1000
export const START_STOCK = 3

export const VENDING_MACHINE_PARTS = [
  "buttons",
  "display",
  "slot",
  "stock",
  "tray",
  "rules",
] as const
export type VendingMachinePart = (typeof VENDING_MACHINE_PARTS)[number]

export const VENDING_MACHINE_STEPS = [
  "idle",
  "choose",
  "pay",
  "check",
  "outcome",
] as const
export type VendingMachineStep = (typeof VENDING_MACHINE_STEPS)[number]
export const VENDING_MACHINE_LAST_STEP = VENDING_MACHINE_STEPS.length - 1

export const VENDING_MACHINE_PRESET_IDS = [
  "enough",
  "short",
  "sold-out",
] as const
export type VendingMachinePresetId = (typeof VENDING_MACHINE_PRESET_IDS)[number]

export const VENDING_MACHINE_PRESETS: Record<
  VendingMachinePresetId,
  { paid: number; stock: number }
> = {
  enough: { paid: PRICE, stock: START_STOCK },
  short: { paid: PRICE / 2, stock: START_STOCK },
  "sold-out": { paid: PRICE, stock: 0 },
}

/** A rule's mark: not yet checked, passed, failed, or skipped after an earlier failure. */
export type RuleState = "pending" | "pass" | "fail" | "skipped"

export interface VendingMachineView {
  step: number
  motion: VendingMachineStep
  /** Caption and status key suffix. */
  key: string
  litPart: VendingMachinePart | null
  chosen: boolean
  /** Money in the slot (shown from the pay step). */
  paid: number
  rules: { paid: RuleState; stock: RuleState }
  passed: boolean
  /** The purchase went through: one cupcake in the tray. */
  released: number
  /** The call reverted: the money is back in the return cup. */
  reverted: boolean
  stockLeft: number
}

export const checkRules = (paid: number, stock: number) => {
  const paidOk = paid >= PRICE
  const stockOk = stock >= 1
  return {
    paid: paidOk ? "pass" : "fail",
    stock: !paidOk ? "skipped" : stockOk ? "pass" : "fail",
    passed: paidOk && stockOk,
  } as const
}

export const getVendingMachineView = (
  presetId: VendingMachinePresetId,
  requestedStep: number
): VendingMachineView => {
  const step = Math.min(Math.max(requestedStep, 0), VENDING_MACHINE_LAST_STEP)
  const motion = VENDING_MACHINE_STEPS[step]
  const { paid, stock } = VENDING_MACHINE_PRESETS[presetId]
  const result = checkRules(paid, stock)
  const checked = step >= 3
  const done = step >= 4
  const released = done && result.passed ? 1 : 0

  return {
    step,
    motion,
    key:
      motion === "check"
        ? `check-${result.passed ? "pass" : presetId}`
        : motion === "outcome"
          ? `outcome-${result.passed ? "pass" : "fail"}`
          : motion,
    litPart:
      motion === "choose"
        ? "buttons"
        : motion === "pay"
          ? "slot"
          : motion === "check"
            ? "rules"
            : motion === "outcome"
              ? result.passed
                ? "tray"
                : "slot"
              : null,
    chosen: step >= 1,
    paid: step >= 2 ? paid : 0,
    rules: checked
      ? { paid: result.paid, stock: result.stock }
      : { paid: "pending", stock: "pending" },
    passed: result.passed,
    released,
    reverted: done && !result.passed,
    stockLeft: stock - released,
  }
}
