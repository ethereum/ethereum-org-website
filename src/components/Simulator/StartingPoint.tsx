import { Flex, type FlexProps, Grid } from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from "react"
import { Explanation, PathButton, Phone, SimulatorModal, Template } from "."
import type {
  SimulatorDetails,
  SimulatorPathSummary,
  SimulatorState,
} from "./interfaces"
import type { PathId, SimulatorData } from "./types"
import { PATH_ID_QUERY_PARAM } from "./constants"
import { trackCustomEvent } from "../../utils/matomo"
import { navigate } from "gatsby"
import { clearUrlParams, getValidPathId } from "./utils"

interface IProps extends Pick<FlexProps, "children"> {
  data: SimulatorData
  location: Location
}
export const StartingPoint: React.FC<IProps> = ({
  children,
  data,
  location,
}) => {
  // Track pathID
  const params = new URLSearchParams(location.search)
  const pathIdString = params.get(PATH_ID_QUERY_PARAM)
  const pathId: PathId | null = getValidPathId(pathIdString as PathId | null)

  // Track step
  const [step, setStep] = useState(0) // 0-indexed to use as array index
  const totalSteps: number = pathId ? data[pathId].explanations.length : 0

  // When simulator closed: log event, clear URL params and close modal
  const handleClose = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `close-from-step-${step + 1}`,
    })
    // Clearing URL Params will reset pathId, and close modal
    clearUrlParams(location)
  }

  // Set URL search params for pathId when it changes
  useEffect(() => {
    if (!pathId) {
      clearUrlParams(location)
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
      clearUrlParams(location)
      return
    }
    setStep((step) => Math.max(step - 1, 0))
  }

  const openPath = (pathId: PathId): void => {
    // Reset step count
    setStep(0)
    // Set new pathId in navigation
    const params = new URLSearchParams()
    params.set(PATH_ID_QUERY_PARAM, pathId)
    const url = `?${params.toString()}`
    navigate(url, { replace: true })
  }

  const state: SimulatorState | null = pathId
    ? {
        step,
        totalSteps,
        progressStepper,
        regressStepper,
        openPath,
      }
    : null

  const simulator: SimulatorDetails | null = pathId ? data[pathId] : null

  const { Screen, explanations, ctaLabels, nextPathId, finalCtaLink } =
    simulator ?? {}
  const explanation = explanations ? explanations[step] : null
  const ctaLabel = ctaLabels ? ctaLabels[step] : null

  const nextPathSummary = useMemo<SimulatorPathSummary | null>(() => {
    if (!simulator) return null
    const { nextPathId } = simulator
    if (!nextPathId) return null
    const { title, Icon } = data[nextPathId]
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

  const isOpen: boolean =
    !!state && !!pathId && !!simulator && !!explanation && !!finalCtaLink

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
          {children}
        </Flex>
        {/* Button stack for path options */}
        <Flex
          direction="column"
          gap={8}
          w={{ base: "min(100%, 320px)", md: "300px" }}
          minW={{ md: "300px" }}
        >
          {Object.keys(data).map((id) => {
            const sim = data[id]
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
        {isOpen && Screen && (
          <Template>
            <Explanation
              state={state!}
              explanation={explanation!}
              nextPathSummary={nextPathSummary}
              nextPathId={nextPathId ?? null}
              finalCtaLink={finalCtaLink!}
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
            <Phone>
              <Screen state={state!} ctaLabel={ctaLabel!} />
            </Phone>
          </Template>
        )}
      </SimulatorModal>
    </Grid>
  )
}
