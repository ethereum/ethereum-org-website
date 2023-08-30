import { Flex, Grid, Text, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from "react"
import { PathButton, SimulatorModal, Template } from "."
import type {
  SimulatorDetails,
  SimulatorPathSummary,
  SimulatorState,
} from "./interfaces"
import type { PathId } from "./types"
import { simulatorData } from "./data"
import { PATH_IDS } from "./constants"

export const StartingPoint: React.FC = () => {
  const [step, setStep] = useState<number>(0) // 0-indexed to use as array index
  const [pathId, setPathId] = useState<PathId | null>(null)
  const { onClose, onOpen, isOpen } = useDisclosure()

  const handleClose = (): void => {
    clearUrlParams()
    onClose()
  }

  const totalSteps: number = pathId
    ? simulatorData[pathId].explanations.length
    : 0

  const PATH_ID_QUERY_PARAM = "sim" as const
  const STEP_QUERY_PARAM = "step" as const

  const clearUrlParams = (): void => {
    if (!window) return
    window.history.replaceState({}, "", window.location.pathname)
  }

  // On page load, check if URL search params contain pathId and step
  // If so, set pathId and step to those values
  useEffect(() => {
    if (!window) return
    const params = new URLSearchParams(window.location.search)
    const pathId = params.get(PATH_ID_QUERY_PARAM) as PathId | null
    if (!pathId || !PATH_IDS.includes(pathId)) {
      clearUrlParams()
      return
    }
    setPathId(pathId)
    const paramStepString = params.get(STEP_QUERY_PARAM)
    if (!paramStepString) {
      onOpen()
      return
    }
    const paramStep = parseInt(paramStepString)
    if (!paramStep) {
      onOpen()
      return
    }
    const total = simulatorData[pathId].explanations.length
    const targetStep = paramStep <= total ? paramStep - 1 : 0
    setStep(targetStep)
    onOpen()
  }, [])

  // Set URL search params for pathId and step every time they change
  useEffect(() => {
    if (!window) return
    if (!pathId) {
      clearUrlParams()
      return
    }
    const params = new URLSearchParams()
    params.set(PATH_ID_QUERY_PARAM, pathId)
    if (step) params.set(STEP_QUERY_PARAM, (step + 1).toString())
    const url = `?${params.toString()}`
    window.history.replaceState({}, "", url)
  }, [pathId, step])

  const progressStepper = (): void => {
    setStep((step) => Math.min(step + 1, totalSteps - 1))
  }

  const regressStepper = (): void => {
    setStep((step) => Math.max(step - 1, 0))
  }

  const resetStepper = (): void => {
    setStep(0)
  }

  const openPath = (pathId: PathId): void => {
    resetStepper()
    setPathId(pathId)
    onOpen()
  }

  const state: SimulatorState | null = pathId
    ? {
        pathId,
        step,
        totalSteps,
        progressStepper,
        regressStepper,
        openPath,
      }
    : null

  const simulator: SimulatorDetails | null = pathId
    ? simulatorData[pathId]
    : null

  const nextPathSummary = useMemo<SimulatorPathSummary | null>(() => {
    if (!simulator) return null
    const { nextPathId } = simulator
    if (!nextPathId) return null
    const { title, Icon } = simulatorData[nextPathId]
    return {
      primaryText: "Start next lesson",
      secondaryText: title,
      Icon,
    }
  }, [pathId])

  return (
    <Grid
      bg="cardGradient"
      placeItems="center"
      p={{ base: 4, md: 16 }}
      w="full"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        bg="background.base"
        p={{ base: 4, md: 16 }}
        alignItems="center"
        textAlign={{ base: "center", md: "start" }}
        gap={{ base: 16, md: 8, lg: 16 }}
        maxW="1000px"
        w="full"
      >
        {/* TEXT CONTENT */}
        <Flex direction="column" px={4}>
          <Text
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontStyle="italic"
            color="body.medium"
            mb={2}
          >
            Interactive explainer
          </Text>
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            lineHeight="115%"
            fontWeight="bold"
            m={0}
          >
            How to use a wallet
          </Text>
        </Flex>
        {/* Button stack for path options */}
        <Flex
          direction="column"
          gap={8}
          w={{ base: "min(100%, 320px)", md: "300px" }}
          minW={{ md: "300px" }}
        >
          {Object.keys(simulatorData).map((pathId) => {
            const sim = simulatorData[pathId]
            const pathSummary = {
              primaryText: sim.title,
              secondaryText: "How to?",
              Icon: sim.Icon,
            }
            return (
              <PathButton
                key={pathId}
                pathSummary={pathSummary}
                handleClick={() => openPath(pathId as PathId)}
              />
            )
          })}
        </Flex>
      </Flex>
      <SimulatorModal isOpen={isOpen} onClose={handleClose}>
        {state && simulator && (
          <Template
            state={state!}
            nextPathSummary={nextPathSummary}
            simulator={simulator}
            onClose={handleClose}
            openPath={openPath}
          />
        )}
      </SimulatorModal>
    </Grid>
  )
}
