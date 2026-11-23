import { DiagramMessages } from "../diagram-messages"

import { VendingMachinePlayer } from "./lazy-player"
import type { VendingMachinePresetId } from "./model"

export interface VendingMachineDiagramProps {
  /** Scenario: enough money, not enough money, or sold out. */
  initialPreset?: VendingMachinePresetId
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * The vending machine on /smart-contracts/: choose a cupcake, pay, the
 * machine checks its two rules (paid at least the price, in stock), then
 * releases the cupcake or undoes the purchase and returns the money.
 */
const VendingMachineDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: VendingMachineDiagramProps) => (
  <DiagramMessages prefix="vending-machine">
    <VendingMachinePlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
      className={className}
    />
  </DiagramMessages>
)

export default VendingMachineDiagram
