import { Flex, type FlexProps, Grid } from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from "react"
import { navigate } from "gatsby"
import { Explanation } from "./Explanation"
import { PathButton } from "./PathButton"
import { Phone } from "./Phone"
import { SimulatorModal } from "./SimulatorModal"
import { Template } from "./Template"
import type {
  SimulatorDetails,
  SimulatorPathSummary,
  SimulatorNav,
} from "./interfaces"
import type { PathId, SimulatorData } from "./types"
import { PATH_ID_QUERY_PARAM, SIMULATOR_ID } from "./constants"
import { trackCustomEvent } from "../../utils/matomo"
import { clearUrlParams, getValidPathId } from "./utils"

interface IProps extends Pick<FlexProps, "children"> {
  data: SimulatorData
  location: Location
}
export const Simulator: React.FC<IProps> = ({ children, data, location }) => {
  // Track step
  const [step, setStep] = useState(0) // 0-indexed to use as array index

  // Track pathID
  const params = new URLSearchParams(location.search)
  const pathIdString = params.get(PATH_ID_QUERY_PARAM)
  const pathId = getValidPathId(pathIdString)
  const simulator: SimulatorDetails | null = pathId ? data[pathId] : null
  const totalSteps: number = simulator ? simulator.explanations.length : 0

  // If pathId present, modal is open, else closed
  const isOpen = !!pathId

  // When simulator closed: log event, clear URL params and close modal
  const onClose = (): void => {
    trackCustomEvent({
      eventCategory: "simulator",
      eventAction: `${pathId}_click`,
      eventName: `close-from-step-${step + 1}`,
    })
    // Clearing URL Params will reset pathId, and close modal
    clearUrlParams(location)
  }

  // Remove URL search param if invalid pathId
  useEffect(() => {
    setStep(0)
    if (!pathId) clearUrlParams(location)
  }, [pathId])

  // Navigation helpers
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

  const openPath = (id: PathId): void => {
    // Set new pathId in navigation
    const params = new URLSearchParams()
    params.set(PATH_ID_QUERY_PARAM, id)
    const url = `?${params.toString()}#${SIMULATOR_ID}`
    navigate(url, { replace: true })
  }

  // Navigation object passed to child components
  const nav: SimulatorNav | null = pathId
    ? {
        step,
        totalSteps,
        progressStepper,
        regressStepper,
        openPath,
      }
    : null

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

  return (
    <Grid
      id={SIMULATOR_ID}
      bg="cardGradient"
      placeItems="center"
      p={{ base: 4, md: 16 }}
      w="full"
      scrollMarginTop={{ base: "5rem" }}
      scrollBehavior="smooth"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        bg="background.base"
        px={{ base: 4, md: 16 }}
        py={{ base: 8, md: 16 }}
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
      <SimulatorModal isOpen={isOpen} onClose={onClose}>
        <Template>
          {explanation ? (
            <Explanation
              nav={nav!}
              explanation={explanation}
              nextPathSummary={nextPathSummary}
              nextPathId={nextPathId ?? null}
              finalCtaLink={finalCtaLink!}
              openPath={(id: PathId) => {
                trackCustomEvent({
                  eventCategory: "simulator",
                  eventAction: `${pathId}_click`,
                  eventName: `next-lesson-${id}`,
                })
                openPath(id)
              }}
              logFinalCta={logFinalCta}
            />
          ) : (
            <Flex flex={1} minH={32} />
          )}
          {Screen && (
            <Phone>
              <Screen nav={nav!} ctaLabel={ctaLabel ?? ""} />
            </Phone>
          )}
        </Template>
      </SimulatorModal>
    </Grid>
  )
}
