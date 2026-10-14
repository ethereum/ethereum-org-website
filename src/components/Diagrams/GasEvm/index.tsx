import { cn } from "@/lib/utils/cn"

import { GasEvmPlayer } from "./lazy-player"
import type { GasEvmPresetId } from "./model"

export interface GasEvmDiagramProps {
  initialPreset?: GasEvmPresetId
  /** Step to start on (0 = intrinsic gas, then one per opcode), for stories. */
  initialStep?: number
  /** Figure number on the page, shown as "Fig. N" in the figure header. */
  fig?: number
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
  fig,
  className,
}: GasEvmDiagramProps) => (
  <div className={cn("not-prose my-8", className)}>
    <GasEvmPlayer
      initialPreset={initialPreset}
      initialStep={initialStep}
      fig={fig}
    />
  </div>
)

export default GasEvmDiagram
