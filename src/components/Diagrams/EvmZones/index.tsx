import { DiagramMessages } from "../diagram-messages"

import { EvmZonesPlayer } from "./lazy-player"

export interface EvmZonesDiagramProps {
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
  className?: string
}

/**
 * Interactive replacement for `evm.png` ("What survives a call"): the EVM's
 * parts in their three zones (volatile machine state, immutable code,
 * persistent storage), and what each keeps once a call ends.
 */
const EvmZonesDiagram = ({
  initialStep,
  fig,
  className,
}: EvmZonesDiagramProps) => (
  <DiagramMessages prefix="evm-zones">
    <EvmZonesPlayer initialStep={initialStep} fig={fig} className={className} />
  </DiagramMessages>
)

export default EvmZonesDiagram
