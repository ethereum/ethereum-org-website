import type { ReactElement } from "react"
import type { Icon } from "@chakra-ui/react"

import { PhoneScreenProps } from "@/lib/types"

import type { PathId } from "./types"

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  Icon: typeof Icon
}

export interface SimulatorExplanation {
  header: string
  description: ReactElement | null
}

export interface SimulatorNav {
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

export interface SimulatorDetails {
  title: string
  Icon: typeof Icon
  Screen: (props: PhoneScreenProps) => JSX.Element
  explanations: Array<SimulatorExplanation>
  ctaLabels: Array<string>
  finalCtaLink: LabelHref
  nextPathId?: PathId | null
}
