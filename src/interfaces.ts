import type { ReactElement } from "react"

export interface Messages {
  [key: string]: string
}

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  iconName: string
}

export interface SimulatorState {
  progressStepper: () => void
  regressStepper: () => void
  resetStepper: () => void
  step: number
  totalSteps: number
  pathId: string // TODO: Type this to list of simulators
}

export interface SimulatorStateProps {
  state: SimulatorState
}

export interface SimulatorExplanation {
  header: string
  description: ReactElement
}
export interface SimulatorDetails {
  screens: string
  stepDetails: {
    explanations: Array<SimulatorExplanation>
    ctaLabels: Array<string>
  }
  pathSummary: SimulatorPathSummary
}

export interface SimulatorData {
  [key: string]: SimulatorDetails
}
