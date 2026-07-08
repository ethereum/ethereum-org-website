"use client"

import { useState } from "react"

import { SEND_RECEIVE } from "@/components/Simulator/constants"
import { Explanation } from "@/components/Simulator/Explanation"
import type { SimulatorNav } from "@/components/Simulator/interfaces"
import { Phone } from "@/components/Simulator/Phone"
import { Template } from "@/components/Simulator/Template"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import { useWalletOnboardingSimData } from "@/data/WalletSimulatorData"

type SimulatorSectionProps = {
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
}

const SimulatorSection = ({
  className,
  header,
  footer,
}: SimulatorSectionProps) => {
  const walletOnboardingSimData = useWalletOnboardingSimData()
  const sendReceiveData = walletOnboardingSimData[SEND_RECEIVE]
  const [step, setStep] = useState(0)

  const { Screen, explanations, ctaLabels, finalCtaLink } = sendReceiveData
  const totalSteps = explanations.length
  const explanation = explanations[step]
  const ctaLabel = ctaLabels[step]

  const nav: SimulatorNav = {
    step,
    totalSteps,
    progressStepper: () => setStep((s) => Math.min(s + 1, totalSteps - 1)),
    regressStepper: () => setStep((s) => Math.max(s - 1, 0)),
    openPath: () => {},
  }

  return (
    <Section className={cn("flex flex-col items-center gap-8", className)}>
      {header}

      <div className="w-full max-w-[1000px] px-6 py-12 md:px-16 lg:px-24">
        <Template>
          <Explanation
            nav={nav}
            explanation={explanation}
            nextPathSummary={null}
            nextPathId={null}
            finalCtaLink={finalCtaLink}
          />
          <Phone>
            <Screen nav={nav} ctaLabel={ctaLabel} />
          </Phone>
        </Template>
      </div>

      {footer}
    </Section>
  )
}

export default SimulatorSection
