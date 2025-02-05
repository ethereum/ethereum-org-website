import React from "react"
import { motion } from "framer-motion"
import { MdArrowBack } from "react-icons/md"

import type { SimulatorNavProps } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { Button, ButtonLink } from "../ui/buttons/Button"
import { Flex } from "../ui/flex"

import type {
  LabelHref,
  SimulatorExplanation,
  SimulatorPathSummary,
} from "./interfaces"
import { MoreInfoPopover } from "./MoreInfoPopover"
import { PathButton } from "./PathButton"
import type { PathId } from "./types"

type ExplanationProps = SimulatorNavProps & {
  explanation: SimulatorExplanation
  nextPathSummary: SimulatorPathSummary | null
  nextPathId: PathId | null
  finalCtaLink: LabelHref
  openPath?: (pathId: PathId) => void
  logFinalCta?: () => void
}
export const Explanation = ({
  nav,
  explanation,
  nextPathSummary,
  nextPathId,
  finalCtaLink,
  openPath,
  logFinalCta,
}: ExplanationProps) => {
  const { regressStepper, step, totalSteps } = nav
  const { header, description } = explanation

  const isLastStep = nav.step + 1 === totalSteps

  const backButtonVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  return (
    <Flex className="z-[1] flex-1 flex-col">
      {/* Back button */}
      <Button
        variant="ghost"
        className={cn(
          "-mt-6 mb-2 w-fit ps-0 [transition-duration:10ms] md:mb-8 md:mt-0",
          step === 0 ? "pointer-events-none" : "pointer-events-auto"
        )}
        onClick={regressStepper}
        asChild
      >
        <motion.button
          initial="hidden"
          variants={backButtonVariants}
          animate={step === 0 ? "hidden" : "visible"}
        >
          <MdArrowBack size="18px" />
          Back
        </motion.button>
      </Button>
      <Flex className="gap-3 md:flex-col md:gap-2">
        {/* Step counter */}
        <div className="grid h-8 w-9 place-items-center rounded-lg bg-body-light p-2 text-xs">
          <span className="font-bold leading-none">
            {step + 1}/{totalSteps}
          </span>
        </div>
        {/* Header and description */}
        <div>
          <h3 className="mb-4 mt-0 text-xl leading-8 sm:text-2xl md:mb-8 md:text-3xl md:leading-10 lg:text-4xl">
            {header}
          </h3>
          {description && (
            <div className="relative md:hidden">
              <MoreInfoPopover isFirstStep={nav.step === 0}>
                <div>{description}</div>
              </MoreInfoPopover>
            </div>
          )}
        </div>
      </Flex>
      {description && <div className="max-md:hidden">{description}</div>}
      {/* Last step navigation buttons */}
      {isLastStep && (
        <Flex className="z-[-1] mx-auto mt-4 w-full max-w-[300px] flex-col gap-4 md:mx-0">
          {nextPathSummary && openPath && nextPathId && (
            <PathButton
              pathSummary={nextPathSummary}
              handleClick={() => openPath(nextPathId)}
            />
          )}
          <ButtonLink
            variant={finalCtaLink.isPrimary ? "solid" : "outline"}
            href={finalCtaLink.href}
            onClick={logFinalCta}
          >
            {finalCtaLink.label}
          </ButtonLink>
        </Flex>
      )}
    </Flex>
  )
}
