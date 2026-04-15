"use client"

import { useEffect, useState } from "react"
import { useIntersectionObserver } from "usehooks-ts"

import { SEND_RECEIVE } from "@/components/Simulator/constants"
import { Explanation } from "@/components/Simulator/Explanation"
import type { SimulatorNav } from "@/components/Simulator/interfaces"
import { Phone } from "@/components/Simulator/Phone"
import { Template } from "@/components/Simulator/Template"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import { walletOnboardingSimData } from "@/data/WalletSimulatorData"

type SimulatorSectionProps = {
  className?: string
  header?: React.ReactNode
}

/**
 * Loading skeleton that matches simulator phone dimensions
 */
const SimulatorSkeleton = () => (
  <div className="mx-auto min-w-[min(100%,322px)] max-w-[min(100%,322px)]">
    <div className="h-[480px] w-full animate-pulse rounded-3xl bg-background-highlight md:h-[600px]" />
  </div>
)

const sendReceiveData = walletOnboardingSimData[SEND_RECEIVE]

const SimulatorSection = ({ className, header }: SimulatorSectionProps) => {
  const { ref: sectionRef, isIntersecting: isVisible } =
    useIntersectionObserver({
      rootMargin: "200px",
      freezeOnceVisible: true,
    })
  const [isLoaded, setIsLoaded] = useState(false)
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

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsLoaded(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <Section
      ref={sectionRef}
      className={cn("flex flex-col items-center gap-8", className)}
    >
      {header}

      <div className="w-full max-w-[1000px] px-6 py-12 md:px-16 lg:px-24">
        {!isVisible || !isLoaded ? (
          <div className="flex justify-center">
            <SimulatorSkeleton />
          </div>
        ) : (
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
        )}
      </div>
    </Section>
  )
}

export default SimulatorSection
