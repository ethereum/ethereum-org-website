import type { ReactElement } from "react"

export interface Messages {
  [key: string]: string
}

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  iconName: string
}

export interface SimulatorExplanation {
  header: string
  description: ReactElement
}

export type SimulatorType = "create-account" | "send-receive" | "connect-web3"

export interface SimulatorState {
  pathId: SimulatorType
  step: number
  totalSteps: number
  progressStepper: () => void
  regressStepper: () => void
  openPath: (pathId: SimulatorType) => void
}

export interface PhoneScreenProps extends SimulatorStateProps {}
export interface SimulatorDetails {
  Screen: React.FC<PhoneScreenProps>
  stepDetails: {
    explanations: Array<SimulatorExplanation>
    ctaLabels: Array<string>
  }
  pathSummary: SimulatorPathSummary
}

export type SimulatorData = Record<SimulatorType, SimulatorDetails>

export interface SimulatorStateProps {
  state: SimulatorState
}
