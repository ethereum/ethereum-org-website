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
import { PATH_IDS, PATH_ID_QUERY_PARAM } from "./constants"
import { trackCustomEvent } from "../../utils/matomo"
import { navigate } from "gatsby"

const getValidPathId = (pathIdString: PathId | null): PathId | null => {
  if (!pathIdString) return null
  if (!PATH_IDS.includes(pathIdString)) return null
  return pathIdString as PathId
}

interface IProps {
  location: Location
}
export const StartingPoint: React.FC<IProps> = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const pathIdString = params.get(PATH_ID_QUERY_PARAM)
  const pathId: PathId | null = getValidPathId(pathIdString as PathId | null)
  const [step, setStep] = useState(0) // 0-indexed to use as array index

  const totalSteps: number = pathId
    ? simulatorData[pathId].explanations.length
    : 0

  const { onClose, onOpen, isOpen } = useDisclosure({ isOpen: !!pathId })

  const handleClose = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `close-from-step-${step + 1}`,
    })
    clearUrlParams()
    onClose()
  }

  const clearUrlParams = (): void => {
    navigate(location.pathname, { replace: true })
  }

  const setUrlPathId = (pathId: PathId): void => {
    const params = new URLSearchParams()
    params.set(PATH_ID_QUERY_PARAM, pathId)
    const url = `?${params.toString()}`
    navigate(url, { replace: true })
  }

  // Set URL search params for pathId when it changes
  useEffect(() => {
    if (!pathId) {
      clearUrlParams()
      return
    }
    const params = new URLSearchParams()
    params.set(PATH_ID_QUERY_PARAM, pathId)
    const url = `?${params.toString()}`
    navigate(url, { replace: true })
  }, [pathId])

  const progressStepper = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `progress-from-step-${step + 1}`,
    })
    setStep((step) => Math.min(step + 1, totalSteps - 1))
  }

  const regressStepper = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `back-from-step-${step + 1}`,
    })
    if (step === 0) {
      onClose()
      return
    }
    setStep((step) => Math.max(step - 1, 0))
  }

  const resetStepper = (): void => {
    setStep(0)
  }

  const openPath = (pathId: PathId): void => {
    resetStepper()
    setUrlPathId(pathId)
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

  const logFinalCta = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `find-wallet`,
    })
  }
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
          {Object.keys(simulatorData).map((id) => {
            const sim = simulatorData[id]
            const pathSummary = {
              primaryText: sim.title,
              secondaryText: "How to?",
              Icon: sim.Icon,
            }
            return (
              <PathButton
                key={id}
                pathSummary={pathSummary}
                handleClick={() => {
                  trackCustomEvent({
                    eventCategory: "simulator",
                    eventAction: `main-buttons_click`,
                    eventName: id,
                  })
                  openPath(id as PathId)
                }}
              />
            )
          })}
        </Flex>
      </Flex>
      <SimulatorModal isOpen={isOpen} onClose={handleClose}>
        {state && simulator && (
          <Template
            state={state}
            nextPathSummary={nextPathSummary}
            simulator={simulator}
            onClose={handleClose}
            openPath={(id: PathId) => {
              trackCustomEvent({
                eventCategory: "simulator",
                eventAction: `${pathId}_click`,
                eventName: `next-lession-${id}`,
              })
              openPath(id)
            }}
            logFinalCta={logFinalCta}
          />
        )}
      </SimulatorModal>
    </Grid>
  )
}
