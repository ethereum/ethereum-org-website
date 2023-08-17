export interface Messages {
  [key: string]: string
}

export interface PathOption {
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
