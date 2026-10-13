import { cn } from "@/lib/utils/cn"

import { GasEvmPlayer } from "./gas-evm-player"
import type { GasEvmPresetId } from "./model"

export interface GasEvmDiagramProps {
  initialPreset?: GasEvmPresetId
  /** Step to start on (0 = intrinsic gas, then one per opcode), for stories. */
  initialStep?: number
  className?: string
}

/**
 * Interactive replacement for `gas.png`: where gas goes inside the EVM. The
 * transaction pays intrinsic gas, then each opcode of a short program draws
 * its cost from the gas supply while the stack, memory and storage change.
 */
const GasEvmDiagram = ({
  initialPreset,
  initialStep,
  className,
}: GasEvmDiagramProps) => (
  <div className={cn("not-prose my-8", className)}>
    <GasEvmPlayer initialPreset={initialPreset} initialStep={initialStep} />
  </div>
)

export default GasEvmDiagram
