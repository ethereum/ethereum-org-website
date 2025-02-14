import type { ReactElement } from "react"

import { PhoneScreenProps } from "@/lib/types"

import type { IconBaseType } from "../icons/icon-base"

import type { PathId } from "./types"

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  Icon: IconBaseType
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
  Icon: IconBaseType
  Screen: (props: PhoneScreenProps) => JSX.Element
  explanations: Array<SimulatorExplanation>
  ctaLabels: Array<string>
  finalCtaLink: LabelHref
  nextPathId?: PathId | null
}
