import { IconProps } from "@chakra-ui/react"
import type { ReactElement } from "react"
import type { PathId } from "./types"

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  Icon: React.FC<IconProps>
}

export interface SimulatorExplanation {
  header: string
  description: ReactElement | null
}

export interface SimulatorState {
  pathId: PathId
  step: number
  totalSteps: number
  progressStepper: () => void
  regressStepper: () => void
  openPath: (pathId: PathId) => void
}

export interface LabelHref {
  label: string
  href: string
  isPrimary?: boolean
}

export interface PhoneScreenProps extends SimulatorStateProps {}
export interface SimulatorDetails {
  title: string
  Icon: React.FC<IconProps>
  Screen: React.FC<PhoneScreenProps>
  explanations: Array<SimulatorExplanation>
  ctaLabels: Array<string>
  finalCtaLink: LabelHref
  nextPathId?: PathId | null
}

export interface SimulatorStateProps {
  state: SimulatorState
}
