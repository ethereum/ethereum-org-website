export interface Messages {
  [key: string]: string
}

// Wallet simulator interfaces
export interface PathOption {
  primaryText: string
  secondaryText?: string
  iconName: string
}

export interface Controller {
  progressStepper: () => void
  regressStepper: () => void
  resetStepper: () => void
  step: number
  totalSteps: number
}

export interface ControllerProps {
  controller: Controller
}
