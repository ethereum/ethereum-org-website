import { LucideIcon } from "lucide-react"
import type { ReactElement } from "react"

import { PhoneScreenProps } from "@/lib/types"

import type { PathId } from "./types"

export interface SimulatorPathSummary {
  primaryText: string
  secondaryText?: string
  Icon: LucideIcon | React.FC<React.SVGProps<SVGElement>>
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
  Icon: LucideIcon | React.FC<React.SVGProps<SVGElement>>
  Screen: (props: PhoneScreenProps) => JSX.Element
  explanations: Array<SimulatorExplanation>
  ctaLabels: Array<string>
  finalCtaLink: LabelHref
  nextPathId?: PathId | null
}
