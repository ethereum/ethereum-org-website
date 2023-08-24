import { Flex, Grid, Text, useDisclosure } from "@chakra-ui/react"
import React, { useMemo, useState } from "react"
import { PathButton, SimulatorModal, Template } from "."
import type {
  SimulatorDetails,
  SimulatorPathSummary,
  SimulatorState,
} from "../../interfaces"
import type { PathId } from "./types"
import { simulatorData } from "./data"

export const StartingPoint: React.FC = () => {
  const [step, setStep] = useState<number>(0) // Start with step zero to use as array index
  const [pathId, setPathId] = useState<PathId | null>(null)
  const disclosure = useDisclosure()

  const totalSteps: number = pathId
    ? simulatorData[pathId].explanations.length
    : 0

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
    disclosure.onOpen()
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
      <SimulatorModal disclosure={disclosure}>
        {state && simulator && (
          <Template
            state={state!}
            nextPathSummary={nextPathSummary}
            simulator={simulator}
            onClose={disclosure.onClose}
            openPath={openPath}
          />
        )}
      </SimulatorModal>
    </Grid>
  )
}
