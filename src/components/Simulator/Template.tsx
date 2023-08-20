import React, { useState } from "react"
import { Flex } from "@chakra-ui/react"
import { Explanation, Phone } from "./"
import type { SimulatorState } from "../../interfaces"

export const Template: React.FC = (/* { pathId } */) => {
  const pathId = "create-account" as const // TODO: Pass as prop
  const [step, setStep] = useState<number>(0)
  // TODO: Use pathId to pull simulator information, including steps/totalSteps
  const totalSteps = 7 as const
  const progressStepper = (): void => {
    setStep((step) => Math.min(step + 1, totalSteps - 1))
  }
  const regressStepper = (): void => {
    setStep((step) => Math.max(step - 1, 0))
  }
  const resetStepper = (): void => {
    setStep(0)
  }
  const state: SimulatorState = {
    pathId,
    step,
    totalSteps,
    progressStepper,
    regressStepper,
    resetStepper,
  }

  return (
    <Flex
      pt={{ base: 0, md: 8 }}
      px={{ base: 0, md: 16 }}
      w="full"
      justify="center"
      direction={{ base: "column", md: "row" }}
      gap={8}
    >
      <Explanation state={state} />
      <Phone state={state} />
    </Flex>
  )
}
