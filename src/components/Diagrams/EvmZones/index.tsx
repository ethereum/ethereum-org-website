import { cn } from "@/lib/utils/cn"

import { EvmZonesPlayer } from "./evm-zones-player"

export interface EvmZonesDiagramProps {
  /** Step to start on (0 = idle, 1-4), for static stories. */
  initialStep?: number
  className?: string
}

/**
 * Interactive replacement for `evm.png` ("What survives a call"): the EVM's
 * parts in their three zones (volatile machine state, immutable code,
 * persistent storage), and what each keeps once a call ends.
 */
const EvmZonesDiagram = ({ initialStep, className }: EvmZonesDiagramProps) => (
  <div className={cn("not-prose my-8", className)}>
    <EvmZonesPlayer initialStep={initialStep} />
  </div>
)

export default EvmZonesDiagram
