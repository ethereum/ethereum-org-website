import { cn } from "@/lib/utils/cn"

import { GasTxPlayer } from "./lazy-player"
import type { GasTxPresetId } from "./model"

export interface GasTxDiagramProps {
  initialPreset?: GasTxPresetId
  /** Step to start on (0-3), for static stories; idle by default. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `gas-tx.png` ("Message call"), drawn as a fuel
 * rig: a pump (externally owned account) fills a tank to the gas limit, a
 * feed pipe carries the message to an engine (contract account) that burns
 * fuel per operation, and unused fuel flows back through a meter. Out of gas,
 * the engine stalls and the contract's state is reverted.
 *
 * Server wrapper only: the controls, caption and readout are server-rendered
 * by `GasTxPlayer`; the isometric drawing is lazy-loaded on the client.
 */
const GasTxDiagram = ({
  initialPreset,
  initialStep,
  fig,
  className,
}: GasTxDiagramProps) => (
  <div className={cn("not-prose my-8", className)}>
    <GasTxPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
    />
  </div>
)

export default GasTxDiagram
