import { IconProps } from "@chakra-ui/react"
import type { ReactElement } from "react"
import type { PathId } from "./components/Simulator/types"

export interface Messages {
  [key: string]: string
}

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  Icon: React.FC<IconProps>
}

export interface SimulatorExplanation {
  header: string
  description: ReactElement
}

export interface SimulatorState {
  pathId: PathId
  step: number
  totalSteps: number
  progressStepper: () => void
  regressStepper: () => void
  openPath: (pathId: PathId) => void
}

export interface PhoneScreenProps extends SimulatorStateProps {}
export interface SimulatorDetails {
  title: string
  Icon: React.FC<IconProps>
  Screen: React.FC<PhoneScreenProps>
  explanations: Array<SimulatorExplanation>
  ctaLabels: Array<string>
  nextPathId?: PathId | null
}

export type SimulatorData = Record<PathId, SimulatorDetails>

export interface SimulatorStateProps {
  state: SimulatorState
}
